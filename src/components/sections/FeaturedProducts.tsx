import type { Product } from "../../types/product";
import { ProductCard } from "../ProductCard";

export function FeaturedProducts({
  products,
  filter,
  onFilter,
  onView,
  onAdd,
}: {
  products: Product[];
  filter: string;
  onFilter: (f: string) => void;
  onView: (p: Product) => void;
  onAdd: (p: Product) => void;
}) {
  const filters = ["Todos", "algodon", "lino", "mezclas", "denim"];
  const filtered = filter === "Todos" ? products : products.filter(p => p.categoria === filter);
  return (
    <section id="catalogo" className="py-14 lg:py-20 bg-[#F5EFE2] relative">
      {/* subtle texture */}
      <div className="absolute inset-0 pointer-events-none opacity-40" style={{ background: "radial-gradient(800px 400px at 80% 0%, rgba(26,46,42,0.04), transparent 70%)" }} />
      <div className="relative mx-auto max-w-[1280px] w-[min(1280px,calc(100%-32px))] max-sm:w-[min(1280px,calc(100%-20px))]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.16em] uppercase font-extrabold text-[#9E4D2E]">
              <span className="w-8 h-px bg-[#9E4D2E] inline-block" /> Selección Kotton
            </span>
            <h2 className="font-[Fraunces] text-[30px] sm:text-[32px] font-bold tracking-tight text-[#1A2E2A] mt-2">Productos destacados</h2>
            <p className="text-[#6B6560] text-[13px] mt-1">Curaduría textil · calidad verificada · stock en Gamarra</p>
          </div>
          <div className="flex gap-1.5 flex-wrap bg-[#FFFBF5] border border-[#DDD2BB] p-1.5 rounded-full shadow-sm w-fit">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => onFilter(f)}
                className={`px-4 py-2 rounded-full text-xs font-extrabold capitalize transition-all cursor-pointer border ${
                  filter === f ? "bg-[#1A2E2A] text-white border-[#1A2E2A] shadow-sm" : "bg-transparent text-[#6B6560] border-transparent hover:bg-[#EBE0C8] hover:text-[#1A2E2A]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 mt-7">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} onView={() => onView(p)} onAdd={() => onAdd(p)} />
          ))}
        </div>
        {filtered.length === 0 && <div className="text-center text-[#6B6560] mt-10 bg-[#FFFBF5] border border-dashed border-[#DDD2BB] rounded-2xl py-10">Sin productos en esta categoría.</div>}
        <div className="mt-8 flex justify-center">
          <span className="text-[11px] tracking-[0.08em] uppercase font-bold text-[#6B6560] bg-[#EBE0C8] border border-[#DDD2BB] px-4 py-2 rounded-full">{filtered.length} productos · precios referenciales actualizados</span>
        </div>
      </div>
    </section>
  );
}

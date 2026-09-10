import type { Category } from "../../types/product";
import { CategoryCard } from "../CategoryCard";

export function CategoriesSection({ categories, onSelect }: { categories: Category[]; onSelect: (id: string) => void }) {
  return (
    <section id="categorias" className="py-16 lg:py-20 bg-[#FFFBF5] border-y border-[#DDD2BB]">
      <div className="mx-auto max-w-[1280px] w-[min(1280px,calc(100%-32px))] max-sm:w-[min(1280px,calc(100%-20px))]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
          <div>
            <span className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.16em] uppercase font-extrabold text-[#9E4D2E]">
              <span className="w-8 h-px bg-[#9E4D2E] inline-block" /> Explora por textura
            </span>
            <h2 className="font-[Fraunces] text-[28px] sm:text-[32px] font-bold tracking-tight text-[#1A2E2A] mt-2">Categorías textiles</h2>
            <p className="text-[#6B6560] mt-1.5 max-w-[560px] text-[14px] leading-relaxed">Elige por caída, peso y sensación al tacto. Cada categoría trae su historia y aplicaciones ideales.</p>
          </div>
          <a href="#catalogo" className="hidden sm:inline-flex items-center gap-1.5 font-bold text-[13px] border border-[#DDD2BB] px-4 py-2.5 rounded-full bg-[#F5EFE2] text-[#1A2E2A] hover:bg-white hover:border-[#C9B99A] transition-colors shrink-0">
            Ver todo el catálogo <span>→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(c => (
            <CategoryCard key={c.id} cat={c} onClick={() => onSelect(c.id)} />
          ))}
        </div>

        <div className="sm:hidden mt-4 flex justify-center">
          <a href="#catalogo" className="inline-flex items-center gap-1.5 font-bold text-[13px] border border-[#DDD2BB] px-4 py-2.5 rounded-full bg-[#F5EFE2] text-[#1A2E2A] hover:bg-white transition-colors">Ver todo el catálogo →</a>
        </div>
      </div>
    </section>
  );
}

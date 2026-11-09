import type { Category } from "../../types/product";
import { CategoryCard } from "../CategoryCard";

export function CategoriesSection({
  categories,
  activeCategory = "Todos",
  onSelect,
}: {
  categories: Category[];
  activeCategory?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <section id="categorias" className="py-16 lg:py-24 bg-[#F3EFEA] border-y border-[#E6E0D6]">
      <div className="mx-auto max-w-[1280px] w-[min(1280px,calc(100%-40px))] max-sm:w-[min(1280px,calc(100%-24px))]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="max-w-[580px]">
            <h2 className="font-[Fraunces] text-[28px] sm:text-[34px] font-semibold tracking-[-0.025em] leading-[1.12] text-[#171614]">
              Familias de fibras y ligamentos
            </h2>
            <p className="text-[#5C5852] mt-2.5 text-[15px] leading-relaxed">
              Selecciona una familia textil para filtrar el muestrario según composición, gramaje, caída y comportamiento mecánico.
            </p>
          </div>
          <a
            href="#catalogo"
            onClick={() => onSelect("Todos")}
            className="inline-flex items-center gap-2 font-semibold text-[13px] border border-[#D1C9BC] px-4 py-2.5 rounded-[10px] bg-white text-[#171614] transition-colors duration-150 [@media(hover:hover)_and_(pointer:fine)]:hover:border-[#171614] w-fit shrink-0"
          >
            Ver muestrario completo
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map(c => (
            <CategoryCard
              key={c.id}
              cat={c}
              active={activeCategory === c.id}
              onClick={() => onSelect(activeCategory === c.id ? "Todos" : c.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

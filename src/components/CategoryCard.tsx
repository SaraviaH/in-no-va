import type { Category } from "../types/product";
import { resolveImage, onImageError } from "../utils/image";
import { IconArrowUpRight } from "./Icons";

export function CategoryCard({
  cat,
  active = false,
  onClick,
}: {
  cat: Category;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group relative overflow-hidden rounded-[12px] border text-left bg-white flex flex-col cursor-pointer transition-[border-color,transform] duration-200 ease-out active:scale-[0.99] ${
        active
          ? "border-[#8E3E27] ring-1 ring-[#8E3E27]"
          : "border-[#E6E0D6] [@media(hover:hover)_and_(pointer:fine)]:hover:border-[#8E3E27]/60"
      }`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F3EFEA] border-b border-[#E6E0D6]">
        <img
          src={resolveImage(cat.imagen)}
          alt={`Tejidos de ${cat.nombre}`}
          onError={onImageError}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.03]"
        />
        {active && (
          <span className="absolute top-3 left-3 bg-[#8E3E27] text-white text-[11px] font-semibold px-2.5 py-1 rounded-[6px] shadow-sm">
            Filtro activo
          </span>
        )}
      </div>
      <div className="p-4 sm:p-5 flex items-start justify-between gap-3 bg-white flex-1">
        <div>
          <h3 className="font-[Fraunces] text-[19px] font-semibold leading-snug tracking-[-0.02em] text-[#171614]">
            {cat.nombre}
          </h3>
          <p className="text-[13px] text-[#5C5852] mt-1 leading-relaxed">
            {cat.descripcion}
          </p>
        </div>
        <span className="w-8 h-8 rounded-[8px] border border-[#E6E0D6] bg-[#FAF8F5] text-[#171614] grid place-items-center shrink-0 transition-colors duration-150 [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-[#171614] [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-white [@media(hover:hover)_and_(pointer:fine)]:group-hover:border-[#171614]">
          <IconArrowUpRight size={15} />
        </span>
      </div>
    </button>
  );
}

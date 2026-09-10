import type { Category } from "../types/product";

export function CategoryCard({ cat, onClick }: { cat: Category; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-[22px] border border-[#DDD2BB] aspect-[4/3] w-full text-left bg-[#1A2E2A] shadow-[0_8px_28px_rgba(46,42,36,0.08)] hover:shadow-[0_14px_36px_rgba(46,42,36,0.13)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      <img src={cat.imagen} alt={cat.nombre} className="w-full h-full object-cover opacity-[0.92] group-hover:scale-[1.04] transition-transform duration-700 ease-out" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E2A]/85 via-[#1A2E2A]/20 to-transparent" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-[#9E4D2E]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
        <div className="inline-flex bg-[#FFFBF5]/95 text-[#1A2E2A] text-[10px] font-extrabold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full border border-white/60">{cat.id}</div>
        <div className="font-[Fraunces] text-[22px] font-bold mt-2.5 leading-none tracking-tight">{cat.nombre}</div>
        <div className="text-[13px] opacity-90 mt-1.5 leading-[1.45] line-clamp-2 font-medium">{cat.descripcion}</div>
        <div className="inline-flex items-center gap-1.5 mt-3 text-[11px] font-bold tracking-wide uppercase bg-white text-[#1A2E2A] px-3 py-1.5 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          Explorar → 
        </div>
      </div>
    </button>
  );
}

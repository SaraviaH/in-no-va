import type { Product } from "../types/product";
import { Badge } from "./Badge";
import { Button } from "./Button";

export function ProductCard({
  product,
  onView,
  onAdd,
}: {
  product: Product;
  onView: () => void;
  onAdd: () => void;
}) {
  const availabilityTone =
    product.disponibilidad === "En stock" ? "success" : product.disponibilidad === "Pocas unidades" ? "warning" : "accent";

  return (
    <div className="group bg-[#FFFBF5] rounded-[22px] overflow-hidden border border-[#DDD2BB] shadow-[0_8px_28px_rgba(46,42,36,0.08)] flex flex-col hover:shadow-[0_14px_36px_rgba(46,42,36,0.13)] hover:-translate-y-1 transition-all duration-300">
      {/* image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#EBE0C8]">
        <img src={product.imagenes[0]} alt={product.nombre} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out" />
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
          <Badge tone={availabilityTone as never}>{product.disponibilidad}</Badge>
          {product.imagenes.length > 1 && (
            <span className="bg-[#1A2E2A]/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10">
              +{product.imagenes.length} fotos
            </span>
          )}
        </div>
        {product.imagenes.length > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5 bg-white/90 backdrop-blur px-2 py-1.5 rounded-full border border-[#DDD2BB]/60 shadow-sm">
            {product.imagenes.slice(0, 4).map((_, i) => (
              <span key={i} className={`h-1.5 rounded-full block transition-all ${i === 0 ? "w-4.5 bg-[#9E4D2E]" : "w-1.5 bg-[#DDD2BB]"}`} />
            ))}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E2A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <div className="text-[11px] tracking-[0.08em] uppercase text-[#6B6560] font-bold">{product.tipo} · {product.material.split("/")[0].trim()}</div>
          <div className="font-[Fraunces] text-[17px] font-bold leading-[1.2] mt-1 text-[#1A2E2A] line-clamp-1">{product.nombre}</div>
          <div className="text-[12px] text-[#6B6560] mt-1.5 flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block shrink-0" style={{ background: product.color.toLowerCase().includes("terracota") ? "#C76B4A" : product.color.toLowerCase().includes("salvia") ? "#7A9B7D" : product.color.toLowerCase().includes("mostaza") ? "#C69A2E" : product.color.toLowerCase().includes("indigo") ? "#2F3A5A" : "#E7DDCB" }} />
            <span className="truncate">{product.caracteristicaPrincipal} · {product.color}</span>
          </div>
        </div>

        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-[20px] font-extrabold text-[#9E4D2E] tracking-tight">S/ {product.precioReferencial.toFixed(2)}</span>
          <span className="text-[11px] text-[#6B6560] font-medium">/ metro · referencial</span>
        </div>

        <div className="flex gap-2 mt-2">
          <Button variant="ghost" size="sm" className="flex-1 bg-white hover:bg-[#F5EFE2] text-[12px]" onClick={onView}>
            Ver producto
          </Button>
          <Button variant="primary" size="sm" className="flex-1 text-[12px]" onClick={onAdd}>
            Añadir
          </Button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import type { Product } from "../types/product";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { QuantitySelector } from "./QuantitySelector";
import { resolveImage, resolveImages, onImageError } from "../utils/image";

export function ProductDetail({
  product,
  onAdd,
  onAskIA,
  onClose,
}: {
  product: Product;
  onAdd: (qty: number) => void;
  onAskIA: () => void;
  onClose: () => void;
}) {
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const tone = product.disponibilidad === "En stock" ? "success" : product.disponibilidad === "Pocas unidades" ? "warning" : "accent";
  const gallery = resolveImages(product.imagenes);

  return (
    <div>
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-0">
        {/* gallery */}
        <div className="p-4 sm:p-5 bg-[#F5EFE2] lg:border-r border-b lg:border-b-0 border-[#DDD2BB]">
          <div className="bg-white rounded-[18px] overflow-hidden border border-[#DDD2BB] aspect-[4/3] shadow-sm">
            <img src={gallery[active] ?? resolveImage(product.imagenes[0])} alt={product.nombre} onError={onImageError} className="w-full h-full object-cover" />
          </div>
          {gallery.length > 1 ? (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {gallery.map((img, i) => (
                <button
                  key={img + i}
                  onClick={() => setActive(i)}
                  className={`w-[72px] h-[72px] rounded-xl overflow-hidden border-2 shrink-0 cursor-pointer transition-all ${i === active ? "border-[#9E4D2E] opacity-100 shadow-sm" : "border-[#DDD2BB] opacity-80 hover:opacity-100"}`}
                >
                  <img src={img} alt="" onError={onImageError} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          ) : (
            <div className="text-xs text-[#6B6560] mt-2.5 text-center">Imagen única · vista principal</div>
          )}
        </div>

        {/* info */}
        <div className="p-5 sm:p-6 flex flex-col gap-4">
          <div className="flex justify-between items-start gap-3">
            <div>
              <div className="flex gap-2 items-center flex-wrap">
                <Badge tone={tone as never}>{product.disponibilidad}</Badge>
                <span className="text-[11px] tracking-[0.08em] uppercase font-extrabold text-[#6B6560]">{product.categoria} · {product.tipo}</span>
              </div>
              <div className="font-[Fraunces] text-[26px] font-extrabold leading-[1.05] mt-2 text-[#1A2E2A]">{product.nombre}</div>
              <div className="text-[#6B6560] text-[13px] mt-2 leading-relaxed">{product.descripcion}</div>
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-full border border-[#DDD2BB] bg-white cursor-pointer grid place-items-center hover:bg-[#F5EFE2] transition-colors shrink-0">✕</button>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {[
              ["Material", product.material],
              ["Color", product.color],
              ["Tipo", product.tipo],
              ["Precio", `S/ ${product.precioReferencial.toFixed(2)} / metro`],
            ].map(([k, v]) => (
              <div key={k} className="bg-[#F5EFE2] border border-[#DDD2BB] rounded-xl px-3 py-2.5">
                <div className="text-[10px] tracking-[0.08em] uppercase font-extrabold text-[#6B6560]">{k}</div>
                <div className="text-[13px] font-bold mt-1 text-[#1A2E2A] leading-tight">{v}</div>
              </div>
            ))}
          </div>

          <div>
            <div className="text-xs font-extrabold tracking-[0.06em] uppercase text-[#1A2E2A]">Características</div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {product.caracteristicas.map(c => (
                <span key={c} className="bg-white border border-[#DDD2BB] rounded-full px-3 py-1.5 text-xs font-semibold text-[#2E2A24]">{c}</span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-extrabold tracking-[0.06em] uppercase text-[#1A2E2A]">Usos recomendados</div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {product.usos.map(u => (
                <span key={u} className="bg-[#1A2E2A] text-white rounded-full px-3 py-1.5 text-xs font-bold">{u}</span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#EBE0C8]/60 border border-[#DDD2BB] rounded-2xl p-3">
            <QuantitySelector value={qty} onChange={setQty} />
            <div className="ml-auto text-right">
              <div className="text-[11px] text-[#6B6560] font-bold uppercase tracking-[0.06em]">Subtotal</div>
              <div className="font-extrabold text-lg text-[#9E4D2E]">S/ {(product.precioReferencial * qty).toFixed(2)}</div>
            </div>
          </div>

          <div className="flex gap-2.5">
            <Button variant="primary" className="flex-1" onClick={() => onAdd(qty)}>Añadir al carrito</Button>
            <Button variant="secondary" className="flex-1" onClick={onAskIA}>Consultar con IA ✦</Button>
          </div>
          <div className="text-[11px] text-[#6B6560] text-center">Precio referencial · Cotización final por WhatsApp</div>
        </div>
      </div>
    </div>
  );
}

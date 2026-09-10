import { useCart } from "../hooks/useCart";
import { siteConfig } from "../config/site";
import { Button } from "./Button";
import { QuantitySelector } from "./QuantitySelector";
import { resolveImage, onImageError } from "../utils/image";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, updateQty, remove, total, totalUnits, count, whatsappLink } = useCart();

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[55] flex justify-end">
      <div onClick={onClose} className="absolute inset-0 bg-[#1A2E2A]/40 backdrop-blur-[4px]" />
      <div className="relative w-[min(440px,100%)] bg-[#FFFBF5] h-full flex flex-col shadow-[0_22px_48px_rgba(26,46,42,0.22)] border-l border-[#DDD2BB] animate-[fadeIn_0.18s_ease]">
        <div className="px-5 py-4 border-b border-[#DDD2BB] flex items-center justify-between bg-[#FFFBF5]">
          <div>
            <div className="font-[Fraunces] font-extrabold text-xl text-[#1A2E2A]">Tu cotización</div>
            <div className="text-xs text-[#6B6560]">{count} productos · {totalUnits} unidades</div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full border border-[#DDD2BB] bg-white cursor-pointer grid place-items-center hover:bg-[#F5EFE2] transition-colors">✕</button>
        </div>

        <div className="flex-1 overflow-auto p-4 flex flex-col gap-3 bg-[#F5EFE2]">
          {items.length === 0 ? (
            <div className="bg-[#FFFBF5] border border-[#DDD2BB] rounded-[18px] p-8 text-center shadow-sm">
              <div className="w-14 h-14 rounded-full bg-[#EBE0C8] grid place-items-center mx-auto text-xl border border-[#DDD2BB]">🧵</div>
              <div className="font-bold mt-4 text-[#1A2E2A]">Tu carrito está vacío</div>
              <div className="text-[13px] text-[#6B6560] mt-1.5 leading-relaxed">Explora el catálogo y añade telas para cotizar por WhatsApp en un clic.</div>
              <Button variant="ghost" className="mt-4 bg-white" onClick={onClose}>Ver catálogo</Button>
            </div>
          ) : (
            items.map(it => (
              <div key={it.product.id} className="bg-[#FFFBF5] border border-[#DDD2BB] rounded-2xl p-2.5 flex gap-2.5 items-center shadow-sm hover:border-[#C9B99A] transition-colors">
                <img src={resolveImage(it.product.imagenes[0])} alt={it.product.nombre} onError={onImageError} className="w-16 h-16 rounded-xl object-cover border border-[#DDD2BB] shrink-0 bg-white" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-[13px] truncate text-[#1A2E2A]">{it.product.nombre}</div>
                  <div className="text-[11px] text-[#6B6560]">{it.product.tipo} · S/ {it.product.precioReferencial.toFixed(2)}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <QuantitySelector value={it.quantity} onChange={n => updateQty(it.product.id, n)} size={30} />
                    <button onClick={() => remove(it.product.id)} className="ml-auto text-xs font-bold bg-transparent border-none text-[#9E4D2E] cursor-pointer hover:text-[#864128]">Eliminar</button>
                  </div>
                </div>
                <div className="font-extrabold text-[13px] text-[#9E4D2E] shrink-0">S/ {(it.product.precioReferencial * it.quantity).toFixed(2)}</div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-[#DDD2BB] bg-[#FFFBF5] flex flex-col gap-3">
          <div className="bg-[#EBE0C8]/50 border border-[#DDD2BB] rounded-xl p-3">
            <div className="flex justify-between text-[13px] text-[#2E2A24]"><span>Cantidad de productos</span><strong className="text-[#1A2E2A]">{count}</strong></div>
            <div className="flex justify-between text-[13px] mt-1 text-[#2E2A24]"><span>Total unidades</span><strong className="text-[#1A2E2A]">{totalUnits}</strong></div>
            <div className="h-px bg-[#DDD2BB] my-2.5" />
            <div className="flex justify-between items-baseline"><span className="font-extrabold text-[#1A2E2A]">Total referencial</span><span className="font-black text-lg text-[#9E4D2E]">S/ {total.toFixed(2)}</span></div>
            <div className="text-[11px] text-[#6B6560] mt-1.5 leading-relaxed">{siteConfig.whatsapp.note}</div>
          </div>

          <Button
            variant="whatsapp"
            size="lg"
            disabled={items.length === 0}
            onClick={() => {
              if (items.length === 0) return;
              window.open(whatsappLink, "_blank");
            }}
            className="w-full disabled:opacity-50"
          >
            Solicitar cotización por WhatsApp ↗
          </Button>
          <div className="text-[11px] text-center text-[#6B6560]">Te llevará a WhatsApp con el mensaje armado automáticamente.</div>
        </div>
      </div>
    </div>
  );
}

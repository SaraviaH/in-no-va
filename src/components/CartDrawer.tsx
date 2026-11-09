import { useEffect, useRef } from "react";
import { useCart } from "../hooks/useCart";
import { siteConfig } from "../config/site";
import { Button } from "./Button";
import { QuantitySelector } from "./QuantitySelector";
import { resolveImage, onImageError } from "../utils/image";
import { IconArrowUpRight, IconClose, IconSwatches, IconTrash, IconWhatsApp } from "./Icons";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, updateQty, remove, clear, total, totalUnits, count, whatsappLink } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevActive = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKey);
      prevActive?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Hoja de cotización de tejidos"
      className="fixed inset-0 z-[55] flex justify-end"
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#171614]/50 backdrop-blur-[3px] animate-[fadeIn_0.16s_ease-out]"
      />

      <div
        ref={drawerRef}
        tabIndex={-1}
        className="relative w-[min(460px,100%)] bg-[#FAF8F5] h-[100dvh] flex flex-col shadow-[0_24px_56px_rgba(23,22,20,0.24)] border-l border-[#E6E0D6] outline-none animate-[drawerEnter_0.24s_cubic-bezier(0.16,1,0.3,1)]"
      >
        {/* Cabecera del Drawer */}
        <div className="px-5 py-4 border-b border-[#E6E0D6] flex items-center justify-between bg-white">
          <div>
            <h2 className="font-[Fraunces] font-semibold text-[20px] tracking-[-0.02em] text-[#171614]">
              Hoja de cotización
            </h2>
            <p className="text-[12px] text-[#5C5852] mt-0.5 tabular-nums">
              {count} {count === 1 ? "partida seleccionada" : "partidas seleccionadas"} · {totalUnits}{" "}
              {totalUnits === 1 ? "metro lineal" : "metros lineales"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                type="button"
                onClick={clear}
                className="text-[11px] font-semibold text-[#5C5852] hover:text-[#8E3E27] px-2 py-1 rounded-[6px] cursor-pointer transition-colors"
              >
                Vaciar
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar cotización"
              className="w-9 h-9 rounded-[8px] border border-[#E6E0D6] bg-[#FAF8F5] text-[#171614] cursor-pointer grid place-items-center hover:bg-[#EAE4DC] transition-colors"
            >
              <IconClose size={17} />
            </button>
          </div>
        </div>

        {/* Lista de partidas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-3">
          {items.length === 0 ? (
            <div className="bg-white border border-[#E6E0D6] rounded-[12px] p-8 text-center my-auto">
              <div className="w-12 h-12 rounded-[10px] bg-[#F3EFEA] text-[#171614] grid place-items-center mx-auto border border-[#E6E0D6]">
                <IconSwatches size={22} />
              </div>
              <div className="font-[Fraunces] text-[18px] font-semibold mt-4 text-[#171614]">
                Tu hoja de cotización está vacía
              </div>
              <p className="text-[13px] text-[#5C5852] mt-1.5 leading-relaxed">
                Selecciona las telas y el metraje que requieres en el catálogo para generar tu orden de cotización directa hacia nuestro almacén en Gamarra.
              </p>
              <Button variant="outline" size="sm" className="mt-5" onClick={onClose}>
                Explorar muestrario
              </Button>
            </div>
          ) : (
            items.map(it => (
              <div
                key={it.product.id}
                className="bg-white border border-[#E6E0D6] rounded-[10px] p-3.5 flex gap-3.5 items-start transition-colors [@media(hover:hover)_and_(pointer:fine)]:hover:border-[#D1C9BC]"
              >
                <img
                  src={resolveImage(it.product.imagenes[0])}
                  alt={it.product.nombre}
                  onError={onImageError}
                  className="w-16 h-20 rounded-[8px] object-cover border border-[#E6E0D6] shrink-0 bg-[#F3EFEA]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold text-[14px] text-[#171614] leading-snug truncate">
                        {it.product.nombre}
                      </div>
                      <div className="text-[11px] text-[#5C5852] mt-0.5 tabular-nums">
                        {it.product.material} · S/ {it.product.precioReferencial.toFixed(2)} / m
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(it.product.id)}
                      aria-label={`Eliminar ${it.product.nombre}`}
                      className="w-7 h-7 rounded-[6px] text-[#5C5852] hover:text-[#8E3E27] hover:bg-[#F9ECE8] grid place-items-center cursor-pointer transition-colors shrink-0"
                    >
                      <IconTrash size={14} />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <QuantitySelector
                      value={it.quantity}
                      onChange={n => updateQty(it.product.id, n)}
                      size={32}
                    />
                    <div className="text-right tabular-nums">
                      <span className="text-[11px] text-[#5C5852] block">Subtotal</span>
                      <span className="font-bold text-[14px] text-[#171614]">
                        S/ {(it.product.precioReferencial * it.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pie de cotización y envío por WhatsApp */}
        <div className="p-4 sm:p-5 border-t border-[#E6E0D6] bg-white flex flex-col gap-3.5">
          <div className="bg-[#FAF8F5] border border-[#E6E0D6] rounded-[10px] p-3.5 text-[13px] tabular-nums">
            <div className="flex justify-between text-[#5C5852]">
              <span>Variedades textiles</span>
              <strong className="text-[#171614]">{count}</strong>
            </div>
            <div className="flex justify-between mt-1.5 text-[#5C5852]">
              <span>Metraje lineal total</span>
              <strong className="text-[#171614]">{totalUnits} m</strong>
            </div>
            <div className="h-px bg-[#E6E0D6] my-2.5" />
            <div className="flex justify-between items-baseline">
              <span className="font-semibold text-[#171614]">Total referencial</span>
              <span className="font-bold text-[20px] text-[#8E3E27]">
                S/ {total.toFixed(2)}
              </span>
            </div>
            <p className="text-[11px] text-[#5C5852] mt-2 leading-relaxed font-normal">
              {siteConfig.whatsapp.note}
            </p>
          </div>

          <Button
            variant="whatsapp"
            size="lg"
            disabled={items.length === 0}
            onClick={() => {
              if (items.length === 0) return;
              window.open(whatsappLink, "_blank");
            }}
            className="w-full"
          >
            <IconWhatsApp size={17} />
            <span>Enviar orden de cotización por WhatsApp</span>
            <IconArrowUpRight size={15} />
          </Button>
        </div>
      </div>
    </div>
  );
}

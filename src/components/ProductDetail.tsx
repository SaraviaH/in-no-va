import { useState } from "react";
import type { Product } from "../types/product";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { QuantitySelector } from "./QuantitySelector";
import { resolveImage, resolveImages, onImageError } from "../utils/image";
import { IconClose, IconInfo, IconSparkles } from "./Icons";

const VIEW_LABELS = ["01 Muestra", "02 Ligamento", "03 Parámetros"];
const METER_PRESETS = [1, 3, 5, 10, 25];

export function ProductDetail({
  product,
  onAdd,
  onAskIA,
  onClose,
}: {
  product: Product;
  onAdd: (qty: number) => void;
  onAskIA: (product: Product) => void;
  onClose: () => void;
}) {
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);

  const tone =
    product.disponibilidad === "En stock"
      ? "success"
      : product.disponibilidad === "Pocas unidades"
        ? "warning"
        : "accent";

  const gallery = resolveImages(product.imagenes);

  return (
    <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-0 bg-white">
      {/* Columna izquierda: Visor vertical 4:5 y selector de láminas */}
      <div className="p-5 sm:p-7 bg-[#F3EFEA] lg:border-r border-b lg:border-b-0 border-[#E6E0D6] flex flex-col">
        <div className="bg-white rounded-[12px] overflow-hidden border border-[#E6E0D6] aspect-[4/5] w-full max-w-[440px] mx-auto">
          <img
            src={gallery[active] ?? resolveImage(product.imagenes[0])}
            alt={`${product.nombre} — vista ${active + 1}`}
            onError={onImageError}
            className="w-full h-full object-cover"
          />
        </div>

        {gallery.length > 1 ? (
          <div className="flex gap-2.5 mt-4 justify-center flex-wrap">
            {gallery.map((img, i) => (
              <button
                key={img + i}
                type="button"
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 p-1.5 pr-3 rounded-[8px] border cursor-pointer transition-colors duration-150 ${
                  i === active
                    ? "bg-white border-[#8E3E27] text-[#171614]"
                    : "bg-[#FAF8F5] border-[#D1C9BC] text-[#5C5852] hover:bg-white hover:text-[#171614]"
                }`}
              >
                <img
                  src={img}
                  alt=""
                  onError={onImageError}
                  className="w-9 h-11 rounded-[5px] object-cover border border-[#E6E0D6] bg-white"
                />
                <span className="text-[12px] font-semibold tabular-nums">
                  {VIEW_LABELS[i] ?? `Vista 0${i + 1}`}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-[12px] text-[#5C5852] mt-3 text-center font-medium">
            Carta técnica de muestra y ligamento · Ref. {product.id.toUpperCase()}
          </div>
        )}
      </div>

      {/* Columna derecha: Pasaporte Técnico Textil y Calculadora de Metraje */}
      <div className="p-5 sm:p-8 flex flex-col gap-5">
        {/* Encabezado de ficha */}
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="flex gap-2 items-center flex-wrap">
              <Badge tone={tone}>{product.disponibilidad}</Badge>
              <span className="text-[11px] font-semibold text-[#5C5852] bg-[#FAF8F5] border border-[#E6E0D6] px-2 py-0.5 rounded-[5px] tabular-nums">
                REF. {product.id.toUpperCase()}
              </span>
              {product.lineasUso && product.lineasUso.length > 0 && (
                <span className="text-[11px] font-medium text-[#5C5852]">
                  {product.lineasUso.join(" · ")}
                </span>
              )}
            </div>
            <h2 className="font-[Fraunces] text-[26px] sm:text-[30px] font-semibold leading-[1.12] tracking-[-0.025em] mt-2.5 text-[#171614]">
              {product.nombre}
            </h2>
            <p className="text-[#5C5852] text-[14px] mt-2 leading-relaxed">
              {product.descripcion}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ficha técnica"
            className="w-9 h-9 rounded-[8px] border border-[#E6E0D6] bg-[#FAF8F5] text-[#171614] cursor-pointer grid place-items-center hover:bg-[#EAE4DC] transition-colors shrink-0"
          >
            <IconClose size={17} />
          </button>
        </div>

        {/* Tabla de Especificaciones Técnicas (Pasaporte Textil) */}
        <div className="border border-[#E6E0D6] rounded-[10px] overflow-hidden bg-[#FAF8F5]">
          <div className="px-4 py-2.5 bg-[#F3EFEA] border-b border-[#E6E0D6] flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-[0.06em] uppercase text-[#171614]">
              Especificación Técnica de Partida
            </span>
            <span className="text-[11px] font-medium text-[#5C5852]">
              Venta por metro lineal
            </span>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#E6E0D6] text-[13px]">
            <div className="divide-y divide-[#E6E0D6]">
              <div className="px-4 py-2.5 flex justify-between gap-3">
                <dt className="text-[#5C5852]">Composición</dt>
                <dd className="font-semibold text-[#171614] text-right">{product.material}</dd>
              </div>
              <div className="px-4 py-2.5 flex justify-between gap-3">
                <dt className="text-[#5C5852]">Ligamento</dt>
                <dd className="font-semibold text-[#171614] text-right">
                  {product.tipoTejido || product.tipo}
                </dd>
              </div>
              <div className="px-4 py-2.5 flex justify-between gap-3">
                <dt className="text-[#5C5852]">Color de partida</dt>
                <dd className="font-semibold text-[#171614] text-right">{product.color}</dd>
              </div>
            </div>

            <div className="divide-y divide-[#E6E0D6]">
              <div className="px-4 py-2.5 flex justify-between gap-3">
                <dt className="text-[#5C5852]">Gramaje nominal</dt>
                <dd className="font-semibold text-[#171614] text-right tabular-nums">
                  {product.gramaje || "Por confirmar*"}
                </dd>
              </div>
              <div className="px-4 py-2.5 flex justify-between gap-3">
                <dt className="text-[#5C5852]">Elasticidad</dt>
                <dd className="font-semibold text-[#171614] text-right">
                  {product.elasticidad || "Por confirmar*"}
                </dd>
              </div>
              <div className="px-4 py-2.5 flex justify-between gap-3">
                <dt className="text-[#5C5852]">Precio ref. / metro</dt>
                <dd className="font-bold text-[#8E3E27] text-right tabular-nums">
                  S/ {product.precioReferencial.toFixed(2)}
                </dd>
              </div>
            </div>
          </dl>
        </div>

        {/* Nota de validación de taller */}
        {product.confirmacionPendiente && (
          <div className="text-[12px] text-[#6E4F10] bg-[#FBF3E4] border border-[#E8D5B0] rounded-[8px] px-3.5 py-2.5 flex items-start gap-2.5 leading-snug">
            <IconInfo size={15} className="shrink-0 mt-0.5 text-[#9A7228]" />
            <span>
              Parámetros estándar de referencia técnica. El ancho útil de rollo y rendimiento exacto se confirman al separar el lote en nuestro almacén de Gamarra.
            </span>
          </div>
        )}

        {/* Propiedades y aplicaciones recomendadas */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <div className="text-[11px] font-bold tracking-[0.05em] uppercase text-[#5C5852]">
              Comportamiento físico
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {product.caracteristicas.map(c => (
                <span
                  key={c}
                  className="bg-white border border-[#E6E0D6] rounded-[6px] px-2.5 py-1 text-[12px] font-medium text-[#171614]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold tracking-[0.05em] uppercase text-[#5C5852]">
              Confección recomendada
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {product.usos.map(u => (
                <span
                  key={u}
                  className="bg-[#F3EFEA] border border-[#D1C9BC] text-[#171614] rounded-[6px] px-2.5 py-1 text-[12px] font-semibold"
                >
                  {u}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Calculadora de Metraje Lineal */}
        <div className="mt-auto bg-[#FAF8F5] border border-[#D1C9BC] rounded-[12px] p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[12px] font-semibold text-[#171614]">
              Selecciona metraje lineal a cotizar:
            </span>
            <div className="flex items-center gap-1">
              {METER_PRESETS.map(preset => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setQty(preset)}
                  className={`h-7 px-2.5 rounded-[6px] text-[11px] font-semibold tabular-nums cursor-pointer border transition-colors ${
                    qty === preset
                      ? "bg-[#171614] text-white border-[#171614]"
                      : "bg-white text-[#5C5852] border-[#E6E0D6] hover:border-[#171614] hover:text-[#171614]"
                  }`}
                >
                  {preset} m
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#E6E0D6]">
            <QuantitySelector value={qty} onChange={setQty} />
            <div className="text-right">
              <div className="text-[11px] text-[#5C5852] font-medium">
                Subtotal estimado ({qty} {qty === 1 ? "metro" : "metros"})
              </div>
              <div className="font-bold text-[22px] text-[#8E3E27] leading-tight tabular-nums">
                S/ {(product.precioReferencial * qty).toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción final */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <Button variant="primary" size="lg" className="flex-1" onClick={() => onAdd(qty)}>
            Añadir {qty} {qty === 1 ? "metro" : "metros"} a cotización
          </Button>
          <Button variant="outline" size="lg" onClick={() => onAskIA(product)}>
            <IconSparkles size={15} className="text-[#1C332D]" />
            Consultar a Asesor IA
          </Button>
        </div>
      </div>
    </div>
  );
}

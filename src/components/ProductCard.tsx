import type { Product } from "../types/product";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { resolveImage, onImageError } from "../utils/image";

const SWATCH_COLORS: Record<string, string> = {
  "blanco nube": "#F6F4EE",
  "arena natural": "#E3D9C6",
  terracota: "#B5573B",
  "terracota claro": "#C9785B",
  "índigo profundo": "#233147",
  "indigo profundo": "#233147",
  "mostaza dorada": "#CFA33E",
  "verde salvia": "#78927A",
  "crudo natural": "#ECE4D5",
};

function getSwatchHex(colorName: string): string {
  const key = colorName.toLowerCase().trim();
  return SWATCH_COLORS[key] ?? "#E3D9C6";
}

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
    product.disponibilidad === "En stock"
      ? "success"
      : product.disponibilidad === "Pocas unidades"
        ? "warning"
        : "accent";

  const swatchHex = getSwatchHex(product.color);

  return (
    <article className="group bg-white rounded-[12px] overflow-hidden border border-[#E6E0D6] flex flex-col transition-[border-color] duration-200 ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:border-[#8E3E27]/65">
      {/* Marco vertical 4:5 protagonista */}
      <div
        onClick={onView}
        className="relative aspect-[4/5] overflow-hidden bg-[#F3EFEA] border-b border-[#E6E0D6] cursor-pointer"
      >
        <img
          src={resolveImage(product.imagenes[0])}
          alt={`${product.nombre} — ${product.material}`}
          onError={onImageError}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.025]"
        />
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center gap-2 pointer-events-none">
          <Badge tone={availabilityTone}>{product.disponibilidad}</Badge>
          {product.gramaje && (
            <span className="bg-white/95 text-[#171614] text-[11px] font-semibold px-2.5 py-1 rounded-[6px] border border-[#E6E0D6] tabular-nums">
              {product.gramaje.split(" ")[0]} g/m²
            </span>
          )}
        </div>
      </div>

      {/* Especificación y acciones */}
      <div className="p-4 sm:p-5 flex flex-col gap-3.5 flex-1">
        <div>
          <div className="flex items-center justify-between gap-2 text-[11px] text-[#5C5852] font-medium">
            <span className="truncate">{product.material}</span>
            {product.elasticidad && (
              <span className="shrink-0 text-[#171614] bg-[#F3EFEA] px-2 py-0.5 rounded-[4px] border border-[#E6E0D6]">
                Elast. {product.elasticidad}
              </span>
            )}
          </div>

          <h3
            onClick={onView}
            className="mt-1.5 font-[Fraunces] text-[18px] font-semibold leading-[1.22] tracking-[-0.015em] text-[#171614] cursor-pointer [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#8E3E27] transition-colors line-clamp-1"
          >
            {product.nombre}
          </h3>

          {/* Muestra cromática y ligamento */}
          <div className="text-[12px] text-[#5C5852] mt-2 flex items-center gap-2">
            <span
              className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-[inset_0_1px_2px_rgba(0,0,0,0.12)] inline-block shrink-0"
              style={{ backgroundColor: swatchHex }}
              aria-hidden="true"
            />
            <span className="truncate font-medium text-[#171614]">{product.color}</span>
            <span className="text-[#D1C9BC]">·</span>
            <span className="truncate">{product.tipoTejido || product.tipo}</span>
          </div>
        </div>

        {/* Usos principales */}
        {product.usos.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto pt-1">
            {product.usos.slice(0, 2).map(uso => (
              <span
                key={uso}
                className="text-[11px] text-[#5C5852] bg-[#FAF8F5] border border-[#E6E0D6] px-2 py-0.5 rounded-[5px]"
              >
                {uso}
              </span>
            ))}
          </div>
        )}

        {/* Precio por metro lineal */}
        <div className="pt-3 border-t border-[#E6E0D6] flex items-baseline justify-between gap-2">
          <div>
            <span className="text-[19px] font-bold text-[#171614] tracking-tight tabular-nums">
              S/ {product.precioReferencial.toFixed(2)}
            </span>
            <span className="text-[12px] text-[#5C5852] font-medium ml-1">/ metro</span>
          </div>
          <span className="text-[11px] text-[#5C5852]">Ref. partida</span>
        </div>

        {/* Botones de acción */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <Button variant="ghost" size="sm" onClick={onView}>
            Ficha técnica
          </Button>
          <Button variant="primary" size="sm" onClick={onAdd}>
            Cotizar 1 m
          </Button>
        </div>
      </div>
    </article>
  );
}

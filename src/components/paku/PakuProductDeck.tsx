import { useState } from "react";
import type { Product } from "../../types/product";
import { resolveImage, onImageError } from "../../utils/image";

interface PakuProductDeckProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export function PakuProductDeck({
  products,
  onViewProduct,
  onAddToCart,
}: PakuProductDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!products || products.length === 0) return null;

  const isMultiple = products.length > 1;
  const currentProduct = products[currentIndex] || products[0];
  const imgSrc = resolveImage(currentProduct.imagenes[0]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : products.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev < products.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="mt-3 w-full bg-white border border-[#E6E0D6] rounded-2xl shadow-sm overflow-hidden text-[#171614] animate-[fadeIn_0.25s_ease-out]">
      {/* Barra superior de navegación cuando hay múltiples sugerencias */}
      {isMultiple && (
        <div className="bg-[#FAF8F5] px-3 py-2 border-b border-[#E6E0D6] flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            {products.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  idx === currentIndex
                    ? "bg-[#8E3E27] text-white shadow-xs"
                    : "bg-white text-[#5C5852] border border-[#E6E0D6] hover:text-[#171614] hover:border-[#D1C9BC]"
                }`}
              >
                {idx + 1}. {p.nombre.replace(/^(Algodón|Lino|Seda|Mezcla|Denim|Punto)\s*/i, "") || p.nombre}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Ficha anterior"
              className="w-6 h-6 rounded-md border border-[#D1C9BC] bg-white text-[#171614] hover:bg-[#F3EFEA] flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
            >
              ‹
            </button>
            <span className="text-[11px] font-semibold text-[#5C5852] px-1 tabular-nums">
              {currentIndex + 1}/{products.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Ficha siguiente"
              className="w-6 h-6 rounded-md border border-[#D1C9BC] bg-white text-[#171614] hover:bg-[#F3EFEA] flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
            >
              ›
            </button>
          </div>
        </div>
      )}

      {/* Ficha técnica desplegada del producto activo */}
      <div className="p-3.5 space-y-3">
        {/* Encabezado con imagen, títulos y precio */}
        <div className="flex gap-3 items-start">
          <button
            type="button"
            onClick={() => onViewProduct(currentProduct)}
            aria-label={`Ver detalle de ${currentProduct.nombre}`}
            className="w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border border-[#EAE4DC] shrink-0 bg-[#FAF8F5] cursor-pointer group relative shadow-xs"
          >
            <img
              src={imgSrc}
              alt={currentProduct.nombre}
              onError={onImageError}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-xs text-[9px] text-white px-1 py-0.5 rounded-xs font-medium">
              Zoom
            </span>
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap mb-1">
              <span className="text-[10px] font-bold text-[#8E3E27] uppercase tracking-wider bg-[#F9ECE8] px-2 py-0.5 rounded-full">
                {currentProduct.tipo || currentProduct.material}
              </span>
              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  currentProduct.disponibilidad === "En stock"
                    ? "bg-[#EBF3ED] text-[#24423B]"
                    : "bg-[#FBF3E4] text-[#6E4F10]"
                }`}
              >
                ● {currentProduct.disponibilidad}
              </span>
            </div>

            <h4
              onClick={() => onViewProduct(currentProduct)}
              className="font-heading font-semibold text-sm sm:text-base text-[#171614] leading-snug cursor-pointer hover:text-[#8E3E27] transition-colors truncate"
              title={currentProduct.nombre}
            >
              {currentProduct.nombre}
            </h4>

            <p className="text-[11px] text-[#5C5852] line-clamp-2 mt-1 leading-relaxed">
              {currentProduct.descripcion}
            </p>

            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="font-bold text-base sm:text-lg text-[#171614] tabular-nums">
                S/ {currentProduct.precioReferencial.toFixed(2)}
              </span>
              <span className="text-[11px] text-[#5C5852]">por metro lineal</span>
            </div>
          </div>
        </div>

        {/* Rejilla de especificaciones técnicas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC] text-[11px]">
          <div>
            <span className="text-[10px] text-[#5C5852] block font-medium">Gramaje:</span>
            <span className="font-semibold text-[#171614]">
              {currentProduct.gramaje || "160 g/m²"}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-[#5C5852] block font-medium">Ligamento:</span>
            <span className="font-semibold text-[#171614] truncate block" title={currentProduct.tipoTejido || "Punto simple"}>
              {currentProduct.tipoTejido || "Punto simple"}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-[#5C5852] block font-medium">Elasticidad:</span>
            <span className="font-semibold text-[#171614]">
              {currentProduct.elasticidad || "Baja / Natural"}
            </span>
          </div>
        </div>

        {/* Usos recomendados */}
        {currentProduct.usos && currentProduct.usos.length > 0 && (
          <div className="text-[11px] flex items-center gap-1.5 text-[#5C5852]">
            <span className="font-medium text-[#171614] shrink-0">Usos ideales:</span>
            <span className="truncate text-[#5C5852]">{currentProduct.usos.join(", ")}</span>
          </div>
        )}

        {/* Botones de acción */}
        <div className="pt-2 border-t border-[#EAE4DC] flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => onViewProduct(currentProduct)}
            className="text-xs font-semibold text-[#171614] hover:text-[#8E3E27] px-3 py-2 rounded-xl border border-[#D1C9BC] hover:border-[#171614] bg-white transition-colors cursor-pointer"
          >
            Ver ficha completa
          </button>

          <button
            type="button"
            onClick={() => onAddToCart(currentProduct)}
            className="text-xs font-semibold bg-[#8E3E27] text-white hover:bg-[#74311E] px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 flex items-center gap-1.5"
          >
            <span>+ Cotizar 1 metro</span>
            <span className="text-[10px] opacity-80">(S/ {currentProduct.precioReferencial.toFixed(2)})</span>
          </button>
        </div>
      </div>
    </div>
  );
}

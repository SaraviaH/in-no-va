import { siteConfig } from "../../config/site";
import { Button } from "../Button";
import { images } from "../../assets/images";
import { onImageError } from "../../utils/image";
import { IconArrowRight, IconSparkles } from "../Icons";

const HERO_SWATCHES = [
  { id: "p-01", name: "Pima Nube", hex: "#F6F4EE", weight: "160 g/m²" },
  { id: "p-02", name: "Lino Arena", hex: "#E3D9C6", weight: "185 g/m²" },
  { id: "p-03", name: "Modal Terracota", hex: "#B5573B", weight: "210 g/m²" },
  { id: "p-06", name: "Canalé Salvia", hex: "#78927A", weight: "245 g/m²" },
  { id: "p-04", name: "Denim Índigo", hex: "#233147", weight: "340 g/m²" },
];

export function Hero({
  onCatalog,
  onAi,
  onSelectSwatch,
}: {
  onCatalog: () => void;
  onAi: () => void;
  onSelectSwatch?: (productId: string) => void;
}) {
  return (
    <section id="inicio" className="relative bg-[#FAF8F5] border-b border-[#E6E0D6]">
      <div className="mx-auto max-w-[1280px] w-[min(1280px,calc(100%-40px))] max-sm:w-[min(1280px,calc(100%-24px))] py-10 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-[1.04fr_0.96fr] gap-10 lg:gap-14 items-center">
          {/* Columna editorial izquierda */}
          <div className="max-w-[600px]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#F3EFEA] border border-[#E6E0D6] text-[12px] font-medium text-[#5C5852]">
              <span>Muestrario Textil · Gamarra, Lima</span>
            </div>

            <h1 className="font-[Fraunces] text-[34px] sm:text-[46px] lg:text-[54px] font-semibold leading-[1.06] tracking-[-0.03em] mt-5 text-[#171614]">
              {siteConfig.texts.heroTitle}
            </h1>

            <p className="text-[#5C5852] text-[15px] sm:text-[17px] leading-[1.65] mt-5 max-w-[54ch]">
              {siteConfig.texts.heroSubtitle}
            </p>

            <div className="flex gap-3 mt-8 flex-wrap">
              <Button variant="primary" size="lg" onClick={onCatalog}>
                <span>Explorar muestrario</span>
                <IconArrowRight size={16} />
              </Button>
              <Button variant="outline" size="lg" onClick={onAi}>
                <IconSparkles size={15} className="text-[#1C332D]" />
                <span>Consultar al Asesor IA</span>
              </Button>
            </div>

            {/* Especificaciones reales del estudio (con numerales tabulares) */}
            <dl className="grid grid-cols-3 gap-4 sm:gap-6 mt-10 pt-8 border-t border-[#E6E0D6] tabular-nums">
              <div>
                <dt className="text-[11px] font-medium text-[#5C5852]">Gramajes en catálogo</dt>
                <dd className="text-[18px] sm:text-[20px] font-bold text-[#171614] mt-1">
                  85 – 340 g/m²
                </dd>
              </div>
              <div className="border-l border-[#E6E0D6] pl-4 sm:pl-6">
                <dt className="text-[11px] font-medium text-[#5C5852]">Modalidad de venta</dt>
                <dd className="text-[18px] sm:text-[20px] font-bold text-[#171614] mt-1">
                  Metro y partida
                </dd>
              </div>
              <div className="border-l border-[#E6E0D6] pl-4 sm:pl-6">
                <dt className="text-[11px] font-medium text-[#5C5852]">Precios desde</dt>
                <dd className="text-[18px] sm:text-[20px] font-bold text-[#8E3E27] mt-1">
                  S/ 28.50 / m
                </dd>
              </div>
            </dl>
          </div>

          {/* Columna derecha: Fotografía editorial de estudio + barra de muestras reales */}
          <div className="flex flex-col">
            <div className="bg-white rounded-[14px] overflow-hidden border border-[#D1C9BC]">
              <div className="aspect-[4/3] overflow-hidden bg-[#F3EFEA]">
                <img
                  src={images.hero.main}
                  alt="Rollos de algodón Pima, lino europeo, modal terracota y denim orgánico sobre mesa de atelier"
                  onError={onImageError}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Barra inferior de archivo cromático */}
              <div className="p-4 sm:p-5 bg-white border-t border-[#E6E0D6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-[12px] font-semibold text-[#171614]">
                    Carta de fibras principales
                  </div>
                  <div className="text-[11px] text-[#5C5852] mt-0.5">
                    Algodón Pima · Lino Europeo · Modal · Canalé · Sarga Índigo
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {HERO_SWATCHES.map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => (onSelectSwatch ? onSelectSwatch(s.id) : onCatalog())}
                      title={`${s.name} (${s.weight}) — Clic para abrir ficha técnica`}
                      aria-label={`Ver ficha técnica de ${s.name} (${s.weight})`}
                      className="group relative w-8 h-8 rounded-full border border-black/20 shadow-[inset_0_1px_2px_rgba(0,0,0,0.14)] cursor-pointer transition-transform duration-150 hover:scale-110"
                      style={{ backgroundColor: s.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

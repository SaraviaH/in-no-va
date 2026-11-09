import { siteConfig } from "../../config/site";
import { images } from "../../assets/images";
import { onImageError } from "../../utils/image";

export function About() {
  return (
    <section id="nosotros" className="py-16 lg:py-24 bg-[#FAF8F5]">
      <div className="mx-auto max-w-[1280px] w-[min(1280px,calc(100%-40px))] max-sm:w-[min(1280px,calc(100%-24px))] grid lg:grid-cols-[1.02fr_0.98fr] gap-10 lg:gap-14 items-center">
        {/* Composición fotográfica de atelier */}
        <div className="grid grid-cols-[1.15fr_0.85fr] gap-4 order-2 lg:order-1">
          <figure className="m-0 flex flex-col">
            <div className="rounded-[12px] aspect-[3/4] overflow-hidden border border-[#D1C9BC] bg-white">
              <img
                src={images.nosotros.telas}
                alt="Estantería de rollos textiles en el estudio Kotton"
                onError={onImageError}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="text-[11px] text-[#5C5852] mt-2 font-medium">
              Archivo de partidas clasificadas por fibra y gramaje.
            </figcaption>
          </figure>

          <div className="flex flex-col gap-4">
            <figure className="m-0">
              <div className="rounded-[12px] aspect-square overflow-hidden border border-[#D1C9BC] bg-white">
                <img
                  src={images.nosotros.textura}
                  alt="Detalle macro de urdimbre y trama de lino y algodón Pima"
                  onError={onImageError}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </figure>

            <div className="bg-[#171614] text-[#FAF8F5] rounded-[12px] p-5 flex flex-col justify-between flex-1 border border-[#171614]">
              <div>
                <div className="font-[Fraunces] font-semibold text-[32px] leading-none tracking-tight tabular-nums text-white">
                  Gamarra
                </div>
                <div className="text-[13px] text-[#D1C9BC] leading-snug mt-2">
                  Sede comercial y despacho directo a talleres de confección en Lima y provincias.
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/15 text-[11px] text-[#EAE4DC] font-medium">
                Control de lote · Venta por metro lineal
              </div>
            </div>
          </div>
        </div>

        {/* Columna editorial */}
        <div className="order-1 lg:order-2">
          <h2 className="font-[Fraunces] text-[30px] sm:text-[36px] font-semibold tracking-[-0.025em] text-[#171614] leading-[1.1]">
            {siteConfig.texts.aboutTitle}
          </h2>

          <p className="text-[#5C5852] leading-[1.7] mt-4 text-[15px] max-w-[65ch]">
            {siteConfig.texts.aboutText}
          </p>

          <dl className="mt-8 border-t border-[#E6E0D6] divide-y divide-[#E6E0D6]">
            {[
              [
                "Transparencia en composición y título",
                "Documentamos el porcentaje exacto de fibra, tipo de ligamento (Jersey, Tafetán, Sarga 3x1, Satén, Rib 2x2) y peso en g/m².",
              ],
              [
                "Asesoría técnica asistida",
                "Nuestro recomendador cruza los requerimientos mecánicos de tu prenda con las partidas disponibles en almacén.",
              ],
              [
                "Abastecimiento flexible",
                "Cotiza desde metraje para muestras y prototipos hasta partidas completas para producción en serie.",
              ],
            ].map(([title, desc]) => (
              <div key={title} className="py-4">
                <dt className="font-semibold text-[14px] text-[#171614]">{title}</dt>
                <dd className="text-[13px] text-[#5C5852] mt-1 leading-relaxed">{desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

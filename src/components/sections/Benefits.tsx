import { siteConfig } from "../../config/site";
import { IconCheck, IconSparkles, IconSwatches, IconWeave } from "../Icons";

export function Benefits() {
  const items = [
    {
      title: "Curaduría de Fibras Nobles",
      desc: "Algodón Pima peruano de fibra larga, lino europeo lavado a la piedra, mezclas con modal, sarga orgánica, canalé y seda natural.",
      metric: "6 familias textiles",
      Icon: IconSwatches,
    },
    {
      title: "Especificación de Taller",
      desc: "Cada partida detalla su gramaje (g/m²), ligamento estructural y grado de elasticidad para evitar errores de compra.",
      metric: "Fichas normalizadas",
      Icon: IconWeave,
    },
    {
      title: "Recomendación por Prenda",
      desc: "Kotton AI orienta la elección del tejido según si confeccionas línea de bebé, activewear, pijamería o sastrería veraniega.",
      metric: "Cruce técnico inmediato",
      Icon: IconSparkles,
    },
    {
      title: "Cotización Directa en Gamarra",
      desc: "Arma tu requerimiento por metro lineal en segundos y envíalo estructurado a nuestro equipo comercial vía WhatsApp.",
      metric: "Atención sin intermediarios",
      Icon: IconCheck,
    },
  ];

  return (
    <section id="beneficios" className="py-16 lg:py-24 bg-[#F3EFEA] border-y border-[#E6E0D6]">
      <div className="mx-auto max-w-[1280px] w-[min(1280px,calc(100%-40px))] max-sm:w-[min(1280px,calc(100%-24px))]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-[560px]">
            <h2 className="font-[Fraunces] text-[28px] sm:text-[34px] font-semibold tracking-[-0.025em] leading-[1.12] text-[#171614]">
              {siteConfig.texts.benefitsTitle}
            </h2>
            <p className="text-[#5C5852] text-[15px] mt-2 leading-relaxed">
              Rigor técnico en la información de cada tejido y agilidad comercial para tus producciones.
            </p>
          </div>
        </div>

        {/* Tabla arquitectónica de estándares (sin tarjetas flotantes genéricas) */}
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white border border-[#D1C9BC] rounded-[12px] divide-y md:divide-y-0 md:divide-x divide-[#E6E0D6] mt-10 overflow-hidden">
          <div className="divide-y divide-[#E6E0D6]">
            {items.slice(0, 2).map(({ title, desc, metric, Icon }) => (
              <div key={title} className="p-6 sm:p-8 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-[8px] bg-[#FAF8F5] border border-[#E6E0D6] text-[#8E3E27] grid place-items-center shrink-0">
                  <Icon size={19} />
                </div>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="font-semibold text-[16px] text-[#171614]">{title}</h3>
                    <span className="text-[11px] font-medium text-[#5C5852] bg-[#F3EFEA] px-2 py-0.5 rounded-[4px] border border-[#E6E0D6]">
                      {metric}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#5C5852] mt-2 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="divide-y divide-[#E6E0D6]">
            {items.slice(2, 4).map(({ title, desc, metric, Icon }) => (
              <div key={title} className="p-6 sm:p-8 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-[8px] bg-[#FAF8F5] border border-[#E6E0D6] text-[#1C332D] grid place-items-center shrink-0">
                  <Icon size={19} />
                </div>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="font-semibold text-[16px] text-[#171614]">{title}</h3>
                    <span className="text-[11px] font-medium text-[#5C5852] bg-[#F3EFEA] px-2 py-0.5 rounded-[4px] border border-[#E6E0D6]">
                      {metric}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#5C5852] mt-2 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

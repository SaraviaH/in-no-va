import { siteConfig } from "../../config/site";

export function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "Define la prenda o requerimiento",
      d: "Indica el tipo de prenda (bebé, deportiva, sastrería de verano o denim) y el comportamiento esperado.",
      spec: "Entrada por catálogo o Concierge IA",
    },
    {
      n: "02",
      t: "Evaluación de ligamento y gramaje",
      d: "Cruzamos tu necesidad con la composición, título de hilo, peso por metro cuadrado y elasticidad.",
      spec: "Parámetros técnicos verificados",
    },
    {
      n: "03",
      t: "Inspección de ficha y metraje",
      d: "Revisa el pasaporte técnico de cada tela y calcula el subtotal referencial según los metros lineales.",
      spec: "Cálculo desde 1 metro lineal",
    },
    {
      n: "04",
      t: "Confirmación de lote por WhatsApp",
      d: "Envía tu hoja de cotización con un clic para confirmar disponibilidad de rollo y despacho desde Gamarra.",
      spec: "Atención directa de almacén",
    },
  ];

  return (
    <section id="como-funciona" className="py-16 lg:py-24 bg-[#F3EFEA] border-y border-[#E6E0D6]">
      <div className="mx-auto max-w-[1280px] w-[min(1280px,calc(100%-40px))] max-sm:w-[min(1280px,calc(100%-24px))]">
        <div className="max-w-[620px]">
          <h2 className="font-[Fraunces] text-[28px] sm:text-[34px] font-semibold tracking-[-0.025em] leading-[1.12] text-[#171614]">
            {siteConfig.texts.howItWorksTitle}
          </h2>
          <p className="text-[#5C5852] mt-2.5 text-[15px] leading-relaxed">
            Un flujo directo pensado para diseñadores, talleres de confección y marcas independientes que requieren precisión técnica antes de cortar.
          </p>
        </div>

        {/* Grilla arquitectónica continua con divisiones de 1px */}
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-white border border-[#D1C9BC] rounded-[12px] divide-y sm:divide-y-0 sm:divide-x divide-[#E6E0D6] mt-10 overflow-hidden list-none p-0">
          {steps.map(s => (
            <li key={s.n} className="p-6 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-[Fraunces] text-[22px] font-semibold text-[#8E3E27] tabular-nums">
                    {s.n}
                  </span>
                  <span className="text-[11px] font-medium text-[#5C5852] bg-[#FAF8F5] border border-[#E6E0D6] px-2 py-0.5 rounded-[4px]">
                    Etapa {s.n}
                  </span>
                </div>
                <h3 className="font-semibold text-[16px] text-[#171614] mt-4 leading-snug">
                  {s.t}
                </h3>
                <p className="text-[13px] text-[#5C5852] mt-2 leading-relaxed">
                  {s.d}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E6E0D6] text-[11px] font-semibold text-[#1C332D]">
                {s.spec}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

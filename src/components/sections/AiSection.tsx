import { siteConfig } from "../../config/site";
import { Button } from "../Button";
import { IconArrowRight, IconSparkles } from "../Icons";

const TECHNICAL_QUERIES = [
  {
    category: "Línea Bebé / Piel Sensible",
    query: "¿Qué tela me recomiendas para enterizo de bebé recién nacido?",
    spec: "Prioriza 100% Algodón Pima hipoalergénico · 160 g/m²",
  },
  {
    category: "Activewear / Punto Elástico",
    query: "Necesito una tela con buena elasticidad para joggers y buzos",
    spec: "Evalúa mezclas con Modal/Elastano y Punto Rib · 210–245 g/m²",
  },
  {
    category: " Sastrería Veraniega / Lino",
    query: "Busco una tela fresca y transpirable para camisas y vestidos de verano",
    spec: "Selecciona fibras vegetales de ligamento tafetán · 175–185 g/m²",
  },
  {
    category: "Estructura / Denim Pesado",
    query: "Quiero confeccionar chaquetas y jeans resistentes",
    spec: "Filtra sarga 3x1 de algodón orgánico · 340 g/m² (11 oz)",
  },
];

const NAVIGATION_COMMANDS = [
  "Muéstrame las telas de algodón",
  "Busca telas para pijamas",
  "Quiero ver las telas de seda",
  "Muéstrame el carrito",
];

export function AiSection({
  onOpen,
  onAskQuery,
}: {
  onOpen: () => void;
  onAskQuery?: (q: string) => void;
}) {
  return (
    <section id="asesor-ia" className="py-12 lg:py-20 bg-[#FAF8F5]">
      <div className="mx-auto max-w-[1280px] w-[min(1280px,calc(100%-40px))] max-sm:w-[min(1280px,calc(100%-24px))]">
        <div className="bg-[#1C332D] rounded-[16px] p-6 sm:p-10 lg:p-12 grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 text-[#FAF8F5] border border-[#171614]">
          {/* Columna izquierda: Propuesta de valor técnica */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-3 py-1.5 rounded-[6px] text-[12px] font-semibold text-[#EAE4DC]">
                <IconSparkles size={14} />
                <span>Concierge Técnico · Kotton AI</span>
              </div>

              <h2 className="font-[Fraunces] text-[28px] sm:text-[34px] lg:text-[38px] font-semibold leading-[1.1] tracking-[-0.025em] mt-5 text-white">
                {siteConfig.texts.aiSectionTitle}
              </h2>

              <p className="text-[#D1C9BC] leading-relaxed mt-3.5 text-[15px] max-w-[540px]">
                {siteConfig.texts.aiSectionSubtitle}
              </p>

              <div className="flex gap-3 mt-7 flex-wrap items-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={onOpen}
                  className="bg-[#8E3E27] border-[#8E3E27]"
                >
                  <IconSparkles size={15} />
                  <span>Iniciar consulta por Voz o Texto</span>
                </Button>
              </div>

              <div className="mt-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#D1C9BC]">
                  Órdenes de navegación por voz o clic:
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {NAVIGATION_COMMANDS.map(cmd => (
                    <button
                      key={cmd}
                      type="button"
                      onClick={() => (onAskQuery ? onAskQuery(cmd) : onOpen())}
                      className="text-[11px] font-medium bg-white/10 hover:bg-white/20 text-[#FAF8F5] border border-white/15 rounded-[6px] px-2.5 py-1 cursor-pointer transition-colors"
                    >
                      “{cmd}”
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-10 pt-6 border-t border-white/15 tabular-nums">
              <div>
                <div className="font-bold text-[18px] text-white">Composición</div>
                <div className="text-[12px] text-[#D1C9BC] mt-0.5">Fibras naturales y mezclas</div>
              </div>
              <div>
                <div className="font-bold text-[18px] text-white">85–340 g/m²</div>
                <div className="text-[12px] text-[#D1C9BC] mt-0.5">Rango de gramajes</div>
              </div>
              <div>
                <div className="font-bold text-[18px] text-white">6 Familias</div>
                <div className="text-[12px] text-[#D1C9BC] mt-0.5">Cruce directo con catálogo</div>
              </div>
            </div>
          </div>

          {/* Columna derecha: Selector interactivo de consultas de confección */}
          <div className="bg-white rounded-[12px] p-5 sm:p-6 text-[#171614] border border-[#E6E0D6] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-[#E6E0D6]">
                <span className="font-semibold text-[14px] text-[#171614]">
                  Consultas frecuentes de taller
                </span>
                <span className="text-[11px] font-semibold text-[#1C332D] bg-[#EBF2EE] border border-[#C8DBD0] px-2.5 py-0.5 rounded-[5px]">
                  Clic para consultar
                </span>
              </div>

              <div className="flex flex-col gap-2.5 mt-4">
                {TECHNICAL_QUERIES.map(item => (
                  <button
                    key={item.query}
                    type="button"
                    onClick={() => (onAskQuery ? onAskQuery(item.query) : onOpen())}
                    className="group text-left bg-[#FAF8F5] border border-[#E6E0D6] rounded-[10px] p-3.5 cursor-pointer transition-[border-color,background-color] duration-150 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white [@media(hover:hover)_and_(pointer:fine)]:hover:border-[#8E3E27]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-[#8E3E27] tracking-[0.02em]">
                        {item.category}
                      </span>
                      <IconArrowRight
                        size={14}
                        className="text-[#5C5852] transition-transform duration-150 [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-[#8E3E27]"
                      />
                    </div>
                    <div className="font-semibold text-[13px] text-[#171614] mt-1 leading-snug">
                      “{item.query}”
                    </div>
                    <div className="text-[11px] text-[#5C5852] mt-1 tabular-nums">
                      {item.spec}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

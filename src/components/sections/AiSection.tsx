import { siteConfig } from "../../config/site";
import { Button } from "../Button";

export function AiSection({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="py-8 sm:py-10">
      <div className="mx-auto max-w-[1280px] w-[min(1280px,calc(100%-32px))] max-sm:w-[min(1280px,calc(100%-20px))]">
        <div className="bg-[#1A2E2A] rounded-[28px] p-6 sm:p-8 lg:p-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-8 text-white overflow-hidden relative">
          {/* decorative */}
          <div className="absolute -top-24 -right-24 w-[420px] h-[420px] bg-[#23433E] rounded-full blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-[380px] h-[380px] bg-[#9E4D2E]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-3 py-1.5 rounded-full text-[11px] font-extrabold tracking-[0.08em] uppercase backdrop-blur">
              <span className="w-2 h-2 rounded-full bg-[#2FEAA1] shadow-[0_0_0_6px_rgba(47,234,161,0.15)] animate-pulse" /> Kotton AI · Asistente Textil
            </div>
            <h2 className="font-[Fraunces] text-[28px] sm:text-[32px] lg:text-[36px] leading-[0.95] tracking-tight mt-4">{siteConfig.texts.aiSectionTitle}</h2>
            <p className="opacity-80 leading-relaxed mt-3 text-[14px] sm:text-[15px] max-w-[520px]">{siteConfig.texts.aiSectionSubtitle}</p>
            <div className="flex gap-3 mt-6 flex-wrap items-center">
              <Button variant="primary" onClick={onOpen} className="bg-[#9E4D2E] hover:bg-[#864128] border-[#9E4D2E]">Probar asistente IA ✦</Button>
              <span className="text-xs opacity-60 hidden sm:inline">Respuesta en segundos · sin registro</span>
            </div>
            <div className="flex gap-6 sm:gap-8 mt-8 border-t border-white/10 pt-6">
              {[
                ["1.2k+", "consultas/mes"],
                ["32", "telas analizadas"],
                ["4.9", "calificación"],
              ].map(([a, b]) => (
                <div key={a}>
                  <div className="font-extrabold text-[20px] leading-none">{a}</div>
                  <div className="text-[11px] opacity-60 uppercase tracking-[0.06em] mt-1 font-semibold">{b}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#FFFBF5] rounded-[22px] p-4 sm:p-5 text-[#1A2E2A] shadow-[0_16px_40px_rgba(0,0,0,0.22)] relative h-fit">
            <div className="flex items-center gap-2.5 font-extrabold text-[13px]">
              <span className="w-7 h-7 rounded-full bg-[#9E4D2E] text-white grid place-items-center text-xs">✦</span> Kotton AI
              <span className="ml-auto text-[10px] bg-[#E0EDE6] text-[#1A4D36] border border-[#B9D9C9] px-2.5 py-1 rounded-full font-bold">Sugerencias listas</span>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              {[
                "Quiero una tela fresca para blusa",
                "Necesito tela para vestido de verano",
                "Tela resistente para jeans",
              ].map(q => (
                <div key={q} className="bg-[#F5EFE2] border border-[#DDD2BB] rounded-2xl px-3.5 py-3 text-[12px] font-semibold text-[#2E2A24] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-white border border-[#DDD2BB] grid place-items-center text-[11px] shrink-0">💬</span>
                  “{q}”
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-[#1A2E2A] hover:bg-[#23433E] border-[#1A2E2A] text-white" onClick={onOpen}>Abrir chat →</Button>
            <div className="text-[11px] text-[#6B6560] text-center mt-2.5">IA entrenada en texturas · responde al instante</div>
          </div>
        </div>
      </div>
    </section>
  );
}

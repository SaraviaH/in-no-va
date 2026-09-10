import { siteConfig } from "../../config/site";

export function About() {
  return (
    <section id="nosotros" className="py-16 lg:py-20 bg-[#F5EFE2]">
      <div className="mx-auto max-w-[1280px] w-[min(1280px,calc(100%-32px))] max-sm:w-[min(1280px,calc(100%-20px))] grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="grid grid-cols-[1.15fr_0.85fr] gap-3 order-2 lg:order-1">
          <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600&auto=format&fit=crop" alt="Telas" className="rounded-[20px] aspect-[3/4] object-cover border border-[#DDD2BB] shadow-[0_10px_28px_rgba(46,42,36,0.09)]" />
          <div className="flex flex-col gap-3">
            <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop" alt="Textura" className="rounded-[20px] aspect-square object-cover border border-[#DDD2BB] shadow-sm" />
            <div className="bg-[#1A2E2A] text-white rounded-[20px] p-5 flex flex-col justify-center flex-1 border border-[#1A2E2A] shadow-[0_10px_28px_rgba(26,46,42,0.18)]">
              <div className="font-black text-[36px] leading-none tracking-tight">+8</div>
              <div className="text-[13px] opacity-80 leading-tight mt-1">años vistiendo ideas<br /><span className="font-bold opacity-100">en Gamarra</span></div>
              <div className="mt-3 w-full h-px bg-white/15" />
              <div className="text-[11px] opacity-60 mt-2 tracking-wide uppercase font-semibold">Selección curada · Asesoría humana + IA</div>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <span className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.16em] uppercase font-extrabold text-[#9E4D2E]">
            <span className="w-8 h-px bg-[#9E4D2E] inline-block" /> Nosotros
          </span>
          <h2 className="font-[Fraunces] text-[32px] sm:text-[36px] font-bold tracking-tight text-[#1A2E2A] mt-3 leading-[0.95]">{siteConfig.texts.aboutTitle}</h2>
          <p className="text-[#6B6560] leading-[1.7] mt-4 text-[15px]">{siteConfig.texts.aboutText}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            {[
              ["Selección curada", "Cada tela pasa por mano y ojo experto.", "◈"],
              ["Asesoría con IA", "Tecnología cálida que entiende tu proyecto.", "✦"],
            ].map(([t, d, icon]) => (
              <div key={t} className="bg-[#FFFBF5] border border-[#DDD2BB] rounded-2xl p-4 hover:shadow-sm hover:border-[#C9B99A] transition-colors">
                <div className="w-8 h-8 rounded-xl bg-[#EBE0C8] border border-[#DDD2BB] grid place-items-center text-[#1A2E2A] font-bold text-xs">{icon}</div>
                <div className="font-bold text-sm mt-3 text-[#1A2E2A]">{t}</div>
                <div className="text-[12px] text-[#6B6560] mt-1 leading-relaxed">{d}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-6">
            <img src="https://i.pravatar.cc/100?img=12" alt="" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" />
            <div className="text-xs leading-tight">
              <div className="font-bold text-[#1A2E2A]">Equipo Kotton Kids</div>
              <div className="text-[#6B6560]">Gamarra, La Victoria · Lima</div>
            </div>
            <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold bg-white border border-[#DDD2BB] px-3 py-1.5 rounded-full text-[#6B6560]">Atención cercana <span className="w-1.5 h-1.5 rounded-full bg-[#2FEAA1] inline-block" /></span>
          </div>
        </div>
      </div>
    </section>
  );
}

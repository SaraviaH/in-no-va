import { siteConfig } from "../../config/site";
import { Button } from "../Button";
import { images } from "../../assets/images";
import { onImageError } from "../../utils/image";

export function Hero({ onCatalog, onAi }: { onCatalog: () => void; onAi: () => void }) {
  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* subtle editorial background */}
      <div className="absolute inset-0 bg-[#F5EFE2]" />
      <div className="absolute inset-0 opacity-[0.55]" style={{ background: "radial-gradient(600px 400px at 70% 20%, rgba(26,46,42,0.06), transparent 60%), radial-gradient(800px 600px at 10% 80%, rgba(158,77,46,0.07), transparent 60%)" }} />
      <div className="relative mx-auto max-w-[1280px] w-[min(1280px,calc(100%-32px))] max-sm:w-[min(1280px,calc(100%-20px))] py-8 sm:py-12 lg:py-16">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10 items-center">
          <div className="max-w-[640px]">
            <span className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.16em] uppercase font-extrabold text-[#9E4D2E]">
              <span className="w-8 h-px bg-[#9E4D2E] inline-block" />
              Kotton Kids · Telas con intención
            </span>
            <h1 className="font-[Fraunces] text-[32px] sm:text-[42px] lg:text-[54px] leading-[0.92] tracking-[-0.03em] mt-4 text-[#1A2E2A]">
              {siteConfig.texts.heroTitle.split(" ").slice(0, 3).join(" ")}{" "}
              <span className="italic font-semibold text-[#9E4D2E] font-[Instrument_Serif]">{siteConfig.texts.heroTitle.split(" ").slice(3).join(" ")}</span>
            </h1>
            <p className="text-[#6B6560] text-[15px] sm:text-[16px] leading-[1.65] mt-4 max-w-[520px]">{siteConfig.texts.heroSubtitle}</p>

            <div className="flex gap-3 mt-6 flex-wrap">
              <Button size="lg" onClick={onCatalog} className="shadow-[0_10px_24px_rgba(158,77,46,0.24)]">Ver catálogo →</Button>
              <Button variant="ghost" size="lg" onClick={onAi} className="bg-white/80 backdrop-blur">
                <span className="w-[18px] h-[18px] rounded-full bg-[#1A2E2A] text-white grid place-items-center text-[10px]">✦</span> Hablar con IA
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-7 pt-6 border-t border-[#DDD2BB]/70">
              <div className="flex items-center gap-3">
                <span className="flex">
                  {images.ui.avatars.map((src, i) => (
                    <img key={i} src={src} alt="" onError={onImageError} className="w-8 h-8 rounded-full border-2 border-white -ml-2 first:ml-0 object-cover shadow-sm bg-white" />
                  ))}
                </span>
                <span className="text-[12px] font-bold leading-tight">+1.2k proyectos<br /><span className="font-normal text-[#6B6560]">asesorados este mes</span></span>
              </div>
              <span className="hidden sm:block w-px h-9 bg-[#DDD2BB]" />
              <div className="text-[12px] leading-tight">
                <strong className="text-[#1A2E2A]">4.9/5</strong> satisfacción<br /><span className="text-[#6B6560]">★★★★★ 320 reseñas</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 ml-auto">
                <span className="w-2 h-2 rounded-full bg-[#2FEAA1] shadow-[0_0_0_6px_rgba(47,234,161,0.18)] animate-pulse" />
                <span className="text-[11px] font-bold tracking-wide uppercase text-[#1A2E2A]">Stock verificado hoy</span>
              </div>
            </div>
          </div>

          <div className="relative lg:pl-4">
            {/* main image card - hero local */}
            <div className="rounded-[28px] overflow-hidden border border-[#DDD2BB] shadow-[0_18px_40px_rgba(46,42,36,0.13)] bg-white aspect-[4/3.15] relative">
              <img src={images.hero.main} alt="Telas Kotton - colección local" onError={onImageError} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E2A]/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* floating AI card */}
            <div className="absolute -bottom-4 sm:bottom-3 -left-1 sm:left-0 bg-[#FFFBF5] border border-[#DDD2BB] rounded-2xl p-3 shadow-[0_16px_36px_rgba(46,42,36,0.14)] w-[300px] max-w-[92%]">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#1A2E2A] text-white grid place-items-center text-xs">✦</span>
                <strong className="text-[13px] text-[#1A2E2A]">Kotton AI</strong>
                <span className="w-2 h-2 rounded-full bg-[#2FEAA1] shadow-[0_0_0_6px_rgba(47,234,161,0.18)] animate-pulse ml-1" />
                <span className="ml-auto text-[10px] bg-[#EBE0C8] border border-[#DDD2BB] px-2 py-1 rounded-full font-extrabold tracking-wide">EN VIVO</span>
              </div>
              <div className="bg-[#F5EFE2] rounded-xl p-2.5 sm:p-3 mt-2.5 text-[12px] leading-[1.5] border border-[#DDD2BB] text-[#2E2A24]">
                Para una blusa fresca te recomiendo estas opciones:
                <div className="flex gap-1.5 mt-2">
                  {[images.products["algodon-premium"][0], images.products["lino-natural"][0], images.products["mezcla-soft"][0]].map(src => (
                    <img key={src} src={src} alt="" onError={onImageError} className="w-16 h-11 rounded-lg object-cover border border-[#DDD2BB] bg-white" />
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#9E4D2E] text-white rounded-full px-3.5 py-2 font-extrabold text-xs shadow-[0_8px_20px_rgba(158,77,46,0.25)] flex items-baseline gap-1.5">
              S/ 32 <span className="font-normal opacity-90 text-[11px]">/ metro desde</span>
            </div>

            {/* decorative blur */}
            <div className="absolute -z-10 -top-6 -right-6 w-32 h-32 bg-[#EBE0C8] rounded-full blur-3xl opacity-60 hidden lg:block" />
            <div className="absolute -z-10 -bottom-8 -left-6 w-40 h-40 bg-[#DDD2BB] rounded-full blur-3xl opacity-40 hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}

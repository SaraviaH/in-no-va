import { siteConfig } from "../config/site";
import { images } from "../assets/images";
import { onImageError } from "../utils/image";

export function Footer() {
  return (
    <footer className="bg-[#1A2E2A] text-[#EBE0C8] pt-12">
      <div className="mx-auto max-w-[1280px] w-[min(1280px,calc(100%-32px))] max-sm:w-[min(1280px,calc(100%-20px))]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.95fr] gap-8 lg:gap-10">
          <div>
            <div className="flex items-center gap-2.5">
              <img src={images.logo.main} alt="Kotton Kids" onError={onImageError} className="w-9 h-9 rounded-xl object-cover shadow-md border border-white/15 bg-white" />
              <span className="font-[Fraunces] font-extrabold text-[18px] tracking-tight text-[#FFFBF5]">Kotton Kids</span>
              <span className="hidden sm:inline-flex text-[10px] leading-none tracking-[0.12em] font-bold bg-white/10 border border-white/15 px-2 py-1 rounded-full text-white/80">GAMARRA · LIMA</span>
            </div>
            <p className="opacity-75 text-[13px] leading-relaxed mt-3 max-w-[360px]">{siteConfig.texts.footerDescription}</p>
            <div className="flex gap-2 mt-5">
              {[
                ["IG", siteConfig.social.instagram],
                ["Fb", siteConfig.social.facebook],
                ["Tk", siteConfig.social.tiktok],
                ["Wa", siteConfig.social.whatsapp],
              ].map(([label, href]) => (
                <a key={label} href={href as string} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 grid place-items-center text-xs font-extrabold border border-white/15 hover:bg-[#9E4D2E] hover:border-[#9E4D2E] transition-colors">{label}</a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-extrabold text-[12px] tracking-[0.08em] uppercase opacity-90 text-[#FFFBF5]">Navegación</div>
            <div className="flex flex-col gap-2 mt-4 opacity-80 text-[13px]">
              {siteConfig.navigation.map(n => <a key={n.href} href={n.href} className="hover:text-white hover:opacity-100 transition-colors w-fit">{n.label}</a>)}
              <a href="#catalogo" className="hover:text-white transition-colors w-fit">Productos destacados</a>
            </div>
          </div>

          <div>
            <div className="font-extrabold text-[12px] tracking-[0.08em] uppercase opacity-90 text-[#FFFBF5]">Contacto</div>
            <div className="flex flex-col gap-2 mt-4 opacity-80 text-[13px] leading-relaxed">
              <span>{siteConfig.contact.address}</span>
              <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white transition-colors">{siteConfig.contact.phone}</a>
              <a href={siteConfig.social.whatsapp} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{siteConfig.contact.whatsappDisplay} (WhatsApp)</a>
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">{siteConfig.contact.email}</a>
              <span className="text-xs opacity-60">{siteConfig.contact.schedule}</span>
            </div>
          </div>

          <div>
            <div className="font-extrabold text-[12px] tracking-[0.08em] uppercase opacity-90 text-[#FFFBF5]">Boletín textil</div>
            <p className="opacity-70 text-[13px] leading-relaxed mt-4">Recibe novedades, texturas nuevas y tips de confección. Sin spam.</p>
            <div className="flex gap-2 mt-4">
              <input placeholder="Tu correo" className="flex-1 bg-white/10 border border-white/15 rounded-full px-4 py-2.5 text-white placeholder:text-white/50 outline-none text-sm focus:border-[#9E4D2E] focus:bg-white/15 transition-colors" />
              <button className="bg-[#9E4D2E] text-white border border-[#9E4D2E] rounded-full w-11 h-11 grid place-items-center font-bold cursor-pointer hover:bg-[#864128] transition-colors shrink-0">→</button>
            </div>
            <div className="flex items-center gap-2 mt-3 text-[11px] opacity-50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2FEAA1] inline-block" /> Más de 1.2k suscritos
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 py-4 flex flex-wrap gap-3 justify-between text-xs opacity-60">
          <span>© {new Date().getFullYear()} Kotton Kids. Todos los derechos reservados. Hecho con calidez en Gamarra.</span>
          <span className="flex gap-3">
            <a href={siteConfig.legal.privacy} className="hover:text-white hover:opacity-100 transition-colors">Política de privacidad</a>
            <span>·</span>
            <a href={siteConfig.legal.terms} className="hover:text-white hover:opacity-100 transition-colors">Términos y condiciones</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

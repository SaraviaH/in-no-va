import { siteConfig } from "../../config/site";
import { Button } from "../Button";

export function Contact() {
  return (
    <section id="contacto" className="py-16 lg:py-20 bg-[#F5EFE2]">
      <div className="mx-auto max-w-[1280px] w-[min(1280px,calc(100%-32px))] max-sm:w-[min(1280px,calc(100%-20px))] grid lg:grid-cols-2 gap-8">
        <div>
          <span className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.16em] uppercase font-extrabold text-[#9E4D2E]">
            <span className="w-8 h-px bg-[#9E4D2E] inline-block" /> Contacto
          </span>
          <h2 className="font-[Fraunces] text-[32px] font-bold tracking-tight text-[#1A2E2A] mt-2">Estamos en Gamarra</h2>
          <p className="text-[#6B6560] text-sm mt-2">Visítanos o escríbenos. Respuesta humana y asistencia IA disponible.</p>
          <div className="mt-5 flex flex-col gap-2.5">
            {[
              ["Dirección", siteConfig.contact.address, "📍"],
              ["Teléfono", siteConfig.contact.phone, "☎"],
              ["WhatsApp", siteConfig.contact.whatsappDisplay, "💬"],
              ["Correo", siteConfig.contact.email, "✉"],
              ["Horario", siteConfig.contact.schedule, "⏰"],
            ].map(([k, v, icon]) => (
              <div key={k} className="flex gap-3 bg-[#FFFBF5] border border-[#DDD2BB] rounded-2xl p-3 items-center hover:border-[#C9B99A] transition-colors">
                <span className="w-9 h-9 rounded-xl bg-[#EBE0C8] border border-[#DDD2BB] grid place-items-center text-sm shrink-0">{icon}</span>
                <div>
                  <div className="text-[10px] tracking-[0.08em] uppercase font-extrabold text-[#6B6560]">{k}</div>
                  <div className="font-semibold text-[13px] mt-0.5 text-[#1A2E2A]">{v}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2.5 mt-4 flex-wrap">
            <Button variant="whatsapp" onClick={() => window.open(siteConfig.social.whatsapp, "_blank")}>Escribir por WhatsApp</Button>
            <Button variant="ghost" className="bg-white" onClick={() => window.open(siteConfig.contact.mapsUrl, "_blank")}>Ver ubicación</Button>
          </div>
        </div>

        <div className="bg-[#FFFBF5] border border-[#DDD2BB] rounded-[20px] p-5 sm:p-6 shadow-[0_10px_28px_rgba(46,42,36,0.07)] h-fit">
          <div className="font-bold text-[#1A2E2A] text-[16px]">Escríbenos</div>
          <div className="text-xs text-[#6B6560] mt-1">Te respondemos en horario de tienda · también por IA 24/7</div>
          <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-3 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input placeholder="Nombre" className="border border-[#DDD2BB] rounded-xl px-3.5 py-3 bg-[#F5EFE2] outline-none text-sm placeholder:text-[#9A958F] focus:border-[#C9B99A] focus:bg-white transition-colors" />
              <input placeholder="Teléfono" className="border border-[#DDD2BB] rounded-xl px-3.5 py-3 bg-[#F5EFE2] outline-none text-sm placeholder:text-[#9A958F] focus:border-[#C9B99A] focus:bg-white transition-colors" />
            </div>
            <input placeholder="Correo / WhatsApp" className="border border-[#DDD2BB] rounded-xl px-3.5 py-3 bg-[#F5EFE2] outline-none text-sm placeholder:text-[#9A958F] focus:border-[#C9B99A] focus:bg-white transition-colors" />
            <textarea placeholder="Cuéntanos qué necesitas confeccionar..." rows={4} className="border border-[#DDD2BB] rounded-xl px-3.5 py-3 bg-[#F5EFE2] outline-none text-sm placeholder:text-[#9A958F] resize-none focus:border-[#C9B99A] focus:bg-white transition-colors" />
            <Button variant="secondary" className="w-full">Enviar mensaje</Button>
            <div className="text-[11px] text-[#6B6560] text-center flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2FEAA1] inline-block" /> Formulario visual · listo para backend (services/api.ts)
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

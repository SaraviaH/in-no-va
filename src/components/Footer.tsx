import { useState } from "react";
import { siteConfig } from "../config/site";
import { images } from "../assets/images";
import { onImageError } from "../utils/image";
import { useToast } from "../hooks/useToast";
import {
  IconArrowRight,
  IconCheck,
  IconFacebook,
  IconInstagram,
  IconTikTok,
  IconWhatsApp,
} from "./Icons";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { push } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  const handleLegalClick = (e: React.MouseEvent, docName: string) => {
    e.preventDefault();
    push(`${docName}: consulta términos vigentes de lote y despacho con nuestro estudio en Gamarra.`);
  };

  return (
    <footer className="bg-[#171614] text-[#EAE4DC] pt-16 border-t border-[#171614]">
      <div className="mx-auto max-w-[1280px] w-[min(1280px,calc(100%-40px))] max-sm:w-[min(1280px,calc(100%-24px))]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_0.75fr_0.95fr_1fr] gap-10 pb-12 border-b border-white/10">
          {/* Columna 1: Identidad */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src={images.logo.main}
                alt="Kotton Estudio Textil"
                onError={onImageError}
                className="w-9 h-9 rounded-[8px] object-cover border border-white/15 bg-[#171614]"
              />
              <div>
                <span className="font-[Fraunces] font-semibold text-[19px] tracking-[-0.02em] text-white block leading-none">
                  KOTTON
                </span>
                <span className="text-[10px] text-[#D1C9BC] tracking-[0.04em] mt-1 block">
                  Estudio Textil · Gamarra, Lima
                </span>
              </div>
            </div>

            <p className="text-[#D1C9BC] text-[13px] leading-relaxed mt-4 max-w-[340px]">
              {siteConfig.texts.footerDescription}
            </p>

            <div className="flex gap-2 mt-5">
              {[
                { label: "Instagram", href: siteConfig.social.instagram, Icon: IconInstagram },
                { label: "Facebook", href: siteConfig.social.facebook, Icon: IconFacebook },
                { label: "TikTok", href: siteConfig.social.tiktok, Icon: IconTikTok },
                { label: "WhatsApp", href: siteConfig.social.whatsapp, Icon: IconWhatsApp },
              ].map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-[8px] bg-white/8 grid place-items-center text-[#EAE4DC] border border-white/12 transition-colors duration-150 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#8E3E27] [@media(hover:hover)_and_(pointer:fine)]:hover:border-[#8E3E27] [@media(hover:hover)_and_(pointer:fine)]:hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <div className="font-semibold text-[13px] text-white">Secciones</div>
            <ul className="flex flex-col gap-1.5 mt-3 text-[13px] text-[#D1C9BC] list-none p-0 m-0">
              {siteConfig.navigation.map(n => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="hover:text-white transition-colors w-fit inline-flex items-center py-1"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Almacén y Contacto */}
          <div>
            <div className="font-semibold text-[13px] text-white">Almacén Gamarra</div>
            <div className="flex flex-col gap-1.5 mt-3 text-[13px] text-[#D1C9BC] leading-relaxed tabular-nums">
              <span className="py-0.5">{siteConfig.contact.address}</span>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="hover:text-white transition-colors w-fit inline-flex items-center py-1"
              >
                Tel: {siteConfig.contact.phone}
              </a>
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors w-fit inline-flex items-center py-1"
              >
                WhatsApp: {siteConfig.contact.whatsappDisplay}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="hover:text-white transition-colors w-fit inline-flex items-center py-1"
              >
                {siteConfig.contact.email}
              </a>
              <span className="text-[12px] text-[#D1C9BC]/70 pt-0.5">{siteConfig.contact.schedule}</span>
            </div>
          </div>

          {/* Columna 4: Boletín de Partidas */}
          <div>
            <div className="font-semibold text-[13px] text-white">Aviso de nuevas partidas</div>
            <p className="text-[#D1C9BC] text-[13px] leading-relaxed mt-4">
              Recibe actualizaciones cuando ingresen nuevos lotes de algodón Pima, lino europeo y puntos especiales a almacén.
            </p>

            {subscribed ? (
              <div className="mt-4 p-3 rounded-[8px] bg-[#1C332D] border border-white/15 text-[12px] text-white flex items-center gap-2">
                <IconCheck size={15} />
                <span>Correo registrado en el boletín técnico.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 mt-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  aria-label="Correo electrónico para boletín textil"
                  className="flex-1 bg-white/8 border border-white/15 rounded-[8px] px-3.5 h-10 text-white placeholder:text-white/45 outline-none text-[16px] sm:text-[13px] focus:border-[#8E3E27] focus:bg-white/12 transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Suscribirse al boletín"
                  className="bg-[#8E3E27] text-white border border-[#8E3E27] rounded-[8px] w-10 h-10 grid place-items-center cursor-pointer hover:bg-[#74311E] transition-colors shrink-0"
                >
                  <IconArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="py-6 flex flex-wrap gap-4 justify-between items-center text-[12px] text-[#D1C9BC]/70">
          <span>
            © {new Date().getFullYear()} KOTTON ({siteConfig.brand.legalName}). Todos los derechos reservados · Lima, Perú.
          </span>
          <span className="flex gap-4">
            <a
              href={siteConfig.legal.privacy}
              onClick={e => handleLegalClick(e, "Política de privacidad")}
              className="hover:text-white transition-colors inline-flex items-center py-1"
            >
              Política de privacidad
            </a>
            <a
              href={siteConfig.legal.terms}
              onClick={e => handleLegalClick(e, "Condiciones de cotización")}
              className="hover:text-white transition-colors inline-flex items-center py-1"
            >
              Condiciones de cotización
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

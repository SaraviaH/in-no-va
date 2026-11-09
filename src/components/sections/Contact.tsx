import { useState } from "react";
import { siteConfig } from "../../config/site";
import { Button } from "../Button";
import { images } from "../../assets/images";
import { onImageError } from "../../utils/image";
import {
  IconArrowUpRight,
  IconCheck,
  IconClock,
  IconMail,
  IconMapPin,
  IconPhone,
  IconWhatsApp,
} from "../Icons";

export function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSent(true);
  };

  return (
    <section id="contacto" className="py-16 lg:py-24 bg-[#FAF8F5]">
      <div className="mx-auto max-w-[1280px] w-[min(1280px,calc(100%-40px))] max-sm:w-[min(1280px,calc(100%-24px))] grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-14 items-start">
        {/* Columna izquierda: Información de Showroom en Gamarra */}
        <div>
          <h2 className="font-[Fraunces] text-[30px] sm:text-[36px] font-semibold tracking-[-0.025em] leading-[1.1] text-[#171614]">
            Showroom y almacén en Gamarra
          </h2>
          <p className="text-[#5C5852] text-[15px] mt-2.5 leading-relaxed">
            Visítanos para revisar muestras físicas de tejido o escríbenos para coordinar el envío de metraje y rollos a tu taller.
          </p>

          {/* Imagen de mesa de corte del estudio */}
          <div className="mt-6 rounded-[12px] overflow-hidden border border-[#D1C9BC] bg-white aspect-[16/9]">
            <img
              src={images.contacto.tienda}
              alt="Mesa de muestrario textil Kotton en Gamarra"
              onError={onImageError}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Datos estructurados de contacto */}
          <dl className="mt-6 bg-white border border-[#E6E0D6] rounded-[12px] divide-y divide-[#E6E0D6] text-[13px]">
            <div className="p-3.5 flex items-center gap-3.5">
              <span className="w-9 h-9 rounded-[8px] bg-[#FAF8F5] border border-[#E6E0D6] text-[#171614] grid place-items-center shrink-0">
                <IconMapPin size={17} />
              </span>
              <div>
                <dt className="text-[11px] font-medium text-[#5C5852]">Dirección comercial</dt>
                <dd className="font-semibold text-[#171614] mt-0.5">{siteConfig.contact.address}</dd>
              </div>
            </div>

            <div className="p-3.5 flex items-center gap-3.5">
              <span className="w-9 h-9 rounded-[8px] bg-[#FAF8F5] border border-[#E6E0D6] text-[#171614] grid place-items-center shrink-0">
                <IconPhone size={17} />
              </span>
              <div>
                <dt className="text-[11px] font-medium text-[#5C5852]">Teléfono y WhatsApp</dt>
                <dd className="font-semibold text-[#171614] mt-0.5 tabular-nums">
                  {siteConfig.contact.whatsappDisplay}
                </dd>
              </div>
            </div>

            <div className="p-3.5 flex items-center gap-3.5">
              <span className="w-9 h-9 rounded-[8px] bg-[#FAF8F5] border border-[#E6E0D6] text-[#171614] grid place-items-center shrink-0">
                <IconMail size={17} />
              </span>
              <div>
                <dt className="text-[11px] font-medium text-[#5C5852]">Correo electrónico</dt>
                <dd className="font-semibold text-[#171614] mt-0.5">{siteConfig.contact.email}</dd>
              </div>
            </div>

            <div className="p-3.5 flex items-center gap-3.5">
              <span className="w-9 h-9 rounded-[8px] bg-[#FAF8F5] border border-[#E6E0D6] text-[#171614] grid place-items-center shrink-0">
                <IconClock size={17} />
              </span>
              <div>
                <dt className="text-[11px] font-medium text-[#5C5852]">Horario de atención</dt>
                <dd className="font-semibold text-[#171614] mt-0.5 tabular-nums">
                  {siteConfig.contact.schedule}
                </dd>
              </div>
            </div>
          </dl>

          <div className="flex gap-3 mt-5 flex-wrap">
            <Button
              variant="whatsapp"
              onClick={() => window.open(siteConfig.social.whatsapp, "_blank")}
            >
              <IconWhatsApp size={16} />
              <span>Atención por WhatsApp</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open(siteConfig.contact.mapsUrl, "_blank")}
            >
              <span>Ubicación en Google Maps</span>
              <IconArrowUpRight size={15} />
            </Button>
          </div>
        </div>

        {/* Columna derecha: Formulario de consulta comercial */}
        <div className="bg-white border border-[#D1C9BC] rounded-[14px] p-6 sm:p-8">
          <h3 className="font-[Fraunces] font-semibold text-[#171614] text-[22px] tracking-[-0.02em]">
            Solicitud de muestras y partidas
          </h3>
          <p className="text-[13px] text-[#5C5852] mt-1 leading-relaxed">
            Déjanos los datos de tu taller o proyecto textil. También puedes consultar disponibilidad al instante por WhatsApp.
          </p>

          {sent ? (
            <div className="mt-6 p-6 rounded-[10px] bg-[#EBF2EE] border border-[#C8DBD0] text-[#1C332D]">
              <div className="w-9 h-9 rounded-full bg-[#1C332D] text-white grid place-items-center">
                <IconCheck size={17} />
              </div>
              <div className="font-semibold text-[16px] mt-3">
                Consulta registrada para {name}
              </div>
              <p className="text-[13px] mt-1 leading-relaxed text-[#24423B]">
                Hemos preparado tu mensaje. Si deseas atención inmediata de almacén, puedes enviarlo ahora mismo a nuestro WhatsApp comercial.
              </p>
              <div className="flex gap-2.5 mt-4 flex-wrap">
                <Button
                  variant="whatsapp"
                  size="sm"
                  onClick={() => {
                    const text = `Hola, Kotton. Soy ${name}${phone ? ` (${phone})` : ""}. Consulta: ${message}`;
                    window.open(
                      `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(text)}`,
                      "_blank"
                    );
                  }}
                >
                  <IconWhatsApp size={15} />
                  <span>Enviar ahora por WhatsApp</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSent(false);
                    setName("");
                    setPhone("");
                    setEmail("");
                    setMessage("");
                  }}
                >
                  Nueva consulta
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-[12px] font-semibold text-[#171614]">
                    Nombre o taller *
                  </span>
                  <input
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ej. Taller Textil Andino"
                    className="h-11 border border-[#D1C9BC] rounded-[8px] px-3.5 bg-[#FAF8F5] outline-none text-[16px] sm:text-[14px] text-[#171614] placeholder:text-[#5C5852]/65 focus:border-[#8E3E27] focus:bg-white transition-colors"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-[12px] font-semibold text-[#171614]">
                    Teléfono / WhatsApp
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+51 999 000 000"
                    className="h-11 border border-[#D1C9BC] rounded-[8px] px-3.5 bg-[#FAF8F5] outline-none text-[16px] sm:text-[14px] text-[#171614] placeholder:text-[#5C5852]/65 focus:border-[#8E3E27] focus:bg-white transition-colors tabular-nums"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="text-[12px] font-semibold text-[#171614]">
                  Correo electrónico
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="contacto@tumarca.pe"
                  className="h-11 border border-[#D1C9BC] rounded-[8px] px-3.5 bg-[#FAF8F5] outline-none text-[16px] sm:text-[14px] text-[#171614] placeholder:text-[#5C5852]/65 focus:border-[#8E3E27] focus:bg-white transition-colors"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-[12px] font-semibold text-[#171614]">
                  Especificación o consulta *
                </span>
                <textarea
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Indica qué tejido, gramaje o metraje necesitas cotizar..."
                  rows={4}
                  className="border border-[#D1C9BC] rounded-[8px] p-3.5 bg-[#FAF8F5] outline-none text-[16px] sm:text-[14px] text-[#171614] placeholder:text-[#5C5852]/65 resize-none focus:border-[#8E3E27] focus:bg-white transition-colors"
                />
              </label>

              <Button type="submit" variant="secondary" size="lg" className="w-full mt-1">
                Registrar solicitud comercial
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

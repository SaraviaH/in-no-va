import { siteConfig } from "../../config/site";
import { Button } from "../Button";

export function Contact() {
  return (
    <section id="contacto" className="section-pad">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="contact-grid">
          <div>
            <span className="eyebrow">Contacto</span>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 32, margin: "8px 0 0" }}>Estamos en Gamarra</h2>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["Dirección", siteConfig.contact.address],
                ["Teléfono", siteConfig.contact.phone],
                ["WhatsApp", siteConfig.contact.whatsappDisplay],
                ["Correo", siteConfig.contact.email],
                ["Horario", siteConfig.contact.schedule],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: 10, background: "#fff", border: "1px solid var(--color-border)", borderRadius: 14, padding: 12 }}>
                  <span style={{ width: 36, height: 36, borderRadius: 12, background: "var(--color-muted)", display: "grid", placeItems: "center", border: "1px solid var(--color-border)", flexShrink: 0 }}>•</span>
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 800, color: "var(--color-text-secondary)" }}>{k}</div>
                    <div style={{ fontWeight: 700, fontSize: 13, marginTop: 2 }}>{v}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <Button variant="whatsapp" onClick={() => window.open(siteConfig.social.whatsapp, "_blank")}>Escribir por WhatsApp</Button>
              <Button variant="ghost" onClick={() => window.open(siteConfig.contact.mapsUrl, "_blank")}>Ver ubicación</Button>
            </div>
          </div>

          <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: 18, padding: 16, boxShadow: "var(--shadow-soft)" }}>
            <div style={{ fontWeight: 800 }}>Escríbenos</div>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 4 }}>Te respondemos en horario de tienda.</div>
            <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
              <input placeholder="Nombre" style={{ border: "1px solid var(--color-border)", borderRadius: 12, padding: "11px 12px", background: "var(--color-background)", outline: "none" }} />
              <input placeholder="Correo / WhatsApp" style={{ border: "1px solid var(--color-border)", borderRadius: 12, padding: "11px 12px", background: "var(--color-background)", outline: "none" }} />
              <textarea placeholder="Cuéntanos qué necesitas confeccionar..." rows={4} style={{ border: "1px solid var(--color-border)", borderRadius: 12, padding: "11px 12px", background: "var(--color-background)", outline: "none", resize: "none" }} />
              <Button variant="secondary">Enviar mensaje</Button>
              <div style={{ fontSize: 11, color: "var(--color-text-secondary)", textAlign: "center" }}>Formulario visual · preparado para backend (services/api.ts)</div>
            </form>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){ .contact-grid{grid-template-columns:1fr !important} }`}</style>
    </section>
  );
}

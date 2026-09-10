import { siteConfig } from "../config/site";

export function Footer() {
  return (
    <footer style={{ background: "#1F2E2B", color: "#F5EAD6", paddingTop: 48 }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr .8fr .9fr", gap: 24 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 36, height: 36, borderRadius: 10, background: "var(--color-primary)", display: "grid", placeItems: "center", color: "#fff", fontWeight: 800 }}>KK</span>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18 }}>Kotton Kids</span>
            </div>
            <p style={{ opacity: .8, fontSize: 13, lineHeight: 1.6, marginTop: 12 }}>{siteConfig.texts.footerDescription}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              {[
                ["IG", siteConfig.social.instagram],
                ["Fb", siteConfig.social.facebook],
                ["Tk", siteConfig.social.tiktok],
                ["Wa", siteConfig.social.whatsapp],
              ].map(([label, href]) => (
                <a key={label} href={href as string} target="_blank" rel="noreferrer" style={{ width: 36, height: 36, borderRadius: 999, background: "rgba(255,255,255,.1)", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 800, border: "1px solid rgba(255,255,255,.14)" }}>{label}</a>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", opacity: .9 }}>Navegación</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12, opacity: .8, fontSize: 13 }}>
              {siteConfig.navigation.map(n => <a key={n.href} href={n.href}>{n.label}</a>)}
              <a href="#catalogo">Productos destacados</a>
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", opacity: .9 }}>Contacto</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12, opacity: .8, fontSize: 13, lineHeight: 1.5 }}>
              <span>{siteConfig.contact.address}</span>
              <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phone}</a>
              <a href={siteConfig.social.whatsapp} target="_blank" rel="noreferrer">{siteConfig.contact.whatsappDisplay} (WhatsApp)</a>
              <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
              <span>{siteConfig.contact.schedule}</span>
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", opacity: .9 }}>Boletín textil</div>
            <p style={{ opacity: .75, fontSize: 13, lineHeight: 1.6, marginTop: 12 }}>Recibe novedades, texturas nuevas y tips de confección.</p>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <input placeholder="Tu correo" style={{ flex: 1, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 999, padding: "10px 14px", color: "#fff", outline: "none" }} />
              <button style={{ background: "var(--color-primary)", color: "#fff", border: "none", borderRadius: 999, padding: "10px 16px", fontWeight: 800, cursor: "pointer" }}>→</button>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,.12)", marginTop: 28, padding: "16px 0", display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", fontSize: 12, opacity: .7 }}>
          <span>© {new Date().getFullYear()} Kotton Kids. Todos los derechos reservados.</span>
          <span style={{ display: "flex", gap: 12 }}>
            <a href={siteConfig.legal.privacy}>Política de privacidad</a>
            <span>·</span>
            <a href={siteConfig.legal.terms}>Términos y condiciones</a>
          </span>
        </div>
      </div>

      <style>{`@media(max-width:860px){ footer .container > div:first-child{grid-template-columns:1fr !important} }`}</style>
    </footer>
  );
}

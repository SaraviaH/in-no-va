import { siteConfig } from "../../config/site";

export function About() {
  return (
    <section id="nosotros" className="section-pad">
      <div className="container about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "center" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600&auto=format&fit=crop" alt="Telas" style={{ borderRadius: 18, aspectRatio: "3/4", objectFit: "cover", border: "1px solid var(--color-border)" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop" alt="Textura" style={{ borderRadius: 18, aspectRatio: "1/1", objectFit: "cover", border: "1px solid var(--color-border)" }} />
            <div style={{ background: "var(--color-secondary)", color: "#fff", borderRadius: 18, padding: 14 }}>
              <div style={{ fontWeight: 900, fontSize: 28, lineHeight: 1 }}>+8</div>
              <div style={{ fontSize: 12, opacity: .85 }}>años vistiendo ideas en Gamarra</div>
            </div>
          </div>
        </div>
        <div>
          <span className="eyebrow">Nosotros</span>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 32, margin: "8px 0 0" }}>{siteConfig.texts.aboutTitle}</h2>
          <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.7, marginTop: 10 }}>{siteConfig.texts.aboutText}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
            {[
              ["Selección curada", "Cada tela pasa por mano y ojo experto."],
              ["Asesoría con IA", "Tecnología cálida que entiende tu proyecto."],
            ].map(([t, d]) => (
              <div key={t} style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: 14, padding: 12 }}>
                <div style={{ fontWeight: 800, fontSize: 13 }}>{t}</div>
                <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 4 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){ .about-grid{grid-template-columns:1fr !important} }`}</style>
    </section>
  );
}

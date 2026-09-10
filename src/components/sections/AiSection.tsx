import { siteConfig } from "../../config/site";
import { Button } from "../Button";

export function AiSection({ onOpen }: { onOpen: () => void }) {
  return (
    <section style={{ padding: "28px 0" }}>
      <div className="container">
        <div style={{ background: "var(--color-secondary)", borderRadius: 28, padding: 24, display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 18, color: "#fff", overflow: "hidden", position: "relative" }} className="ai-grid">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.18)", padding: "6px 10px", borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" }}><span style={{ width: 8, height: 8, borderRadius: 999, background: "#2FEAA1" }} /> Kotton AI · Asistente Textil</div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 32, lineHeight: 1, margin: "14px 0 0" }}>{siteConfig.texts.aiSectionTitle}</h2>
            <p style={{ opacity: .85, lineHeight: 1.6, marginTop: 8 }}>{siteConfig.texts.aiSectionSubtitle}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
              <Button variant="primary" onClick={onOpen}>Probar asistente IA ✦</Button>
              <span style={{ fontSize: 12, opacity: .7, alignSelf: "center" }}>Respuesta en segundos · sin registro</span>
            </div>
            <div style={{ display: "flex", gap: 20, marginTop: 18 }}>
              {[
                ["1.2k+", "consultas/mes"],
                ["32", "telas analizadas"],
                ["4.9", "calificación"],
              ].map(([a, b]) => (
                <div key={a}>
                  <div style={{ fontWeight: 900, fontSize: 18 }}>{a}</div>
                  <div style={{ fontSize: 11, opacity: .7, textTransform: "uppercase", letterSpacing: ".06em" }}>{b}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: 22, padding: 14, color: "var(--color-text)", boxShadow: "var(--shadow-medium)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 800, fontSize: 13 }}>
              <span style={{ width: 28, height: 28, borderRadius: 999, background: "var(--color-primary)", color: "#fff", display: "grid", placeItems: "center" }}>✦</span> Kotton AI
              <span style={{ marginLeft: "auto", fontSize: 10, background: "#E6F4EE", color: "#1E6B4A", padding: "4px 8px", borderRadius: 999 }}>Sugerencias listas</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
              {[
                "Quiero una tela fresca para blusa",
                "Necesito tela para vestido de verano",
                "Tela resistente para jeans",
              ].map(q => (
                <div key={q} style={{ background: "var(--color-background)", border: "1px solid var(--color-border)", borderRadius: 14, padding: "10px 12px", fontSize: 12, fontWeight: 600 }}>“{q}”</div>
              ))}
            </div>
            <Button style={{ width: "100%", marginTop: 10 }} onClick={onOpen}>Abrir chat →</Button>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){ .ai-grid{grid-template-columns:1fr !important} }`}</style>
    </section>
  );
}

import { siteConfig } from "../../config/site";
import { Button } from "../Button";

export function Hero({ onCatalog, onAi }: { onCatalog: () => void; onAi: () => void }) {
  return (
    <section id="inicio" style={{ padding: "28px 0 18px" }}>
      <div className="container hero-grid" style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 24, alignItems: "center" }}>
        <div>
          <span className="eyebrow">Kotton Kids · Telas con intención</span>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(32px, 5vw, 52px)", lineHeight: .95, letterSpacing: "-.03em", margin: "14px 0 0" }}>
            {siteConfig.texts.heroTitle.split(" ").slice(0, 3).join(" ")} <span style={{ fontStyle: "italic", fontWeight: 600, color: "var(--color-primary)", fontFamily: "var(--font-accent)" }}>{siteConfig.texts.heroTitle.split(" ").slice(3).join(" ")}</span>
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: 16, lineHeight: 1.6, marginTop: 14, maxWidth: 520 }}>{siteConfig.texts.heroSubtitle}</p>

          <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
            <Button size="lg" onClick={onCatalog}>Ver catálogo →</Button>
            <Button variant="ghost" size="lg" onClick={onAi}><span style={{ width: 18, height: 18, borderRadius: 999, background: "var(--color-secondary)", color: "#fff", display: "grid", placeItems: "center", fontSize: 10 }}>✦</span> Hablar con IA</Button>
          </div>

          <div style={{ display: "flex", gap: 16, marginTop: 18, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ display: "flex" }}>
                {[1, 2, 3].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${10 + i}`} alt="" style={{ width: 30, height: 30, borderRadius: 999, border: "2px solid #fff", marginLeft: i === 1 ? 0 : -8 }} />
                ))}
              </span>
              <span style={{ fontSize: 12, fontWeight: 700 }}>+1.2k proyectos<br /><span style={{ fontWeight: 400, color: "var(--color-text-secondary)" }}>asesorados este mes</span></span>
            </div>
            <span style={{ width: 1, height: 36, background: "var(--color-border)" }} />
            <div style={{ fontSize: 12, lineHeight: 1.4 }}>
              <strong>4.9/5</strong> satisfacción<br /><span style={{ color: "var(--color-text-secondary)" }}>★★★★★ 320 reseñas</span>
            </div>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div style={{ borderRadius: 28, overflow: "hidden", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-medium)", aspectRatio: "4/3.2", background: "#fff" }}>
            <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000&auto=format&fit=crop" alt="Telas" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          {/* floating AI card */}
          <div style={{ position: "absolute", bottom: 14, left: -10, background: "#fff", border: "1px solid var(--color-border)", borderRadius: 18, padding: 12, boxShadow: "var(--shadow-medium)", width: 300, maxWidth: "92%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 28, height: 28, borderRadius: 999, background: "var(--color-secondary)", color: "#fff", display: "grid", placeItems: "center", fontSize: 12 }}>✦</span>
              <strong style={{ fontSize: 13 }}>Kotton AI</strong>
              <span className="badge-dot" style={{ marginLeft: 4 }} />
              <span style={{ marginLeft: "auto", fontSize: 10, background: "var(--color-muted)", border: "1px solid var(--color-border)", padding: "3px 7px", borderRadius: 999, fontWeight: 800 }}>EN VIVO</span>
            </div>
            <div style={{ background: "var(--color-background)", borderRadius: 12, padding: "10px 12px", marginTop: 10, fontSize: 12, lineHeight: 1.5, border: "1px solid var(--color-border)" }}>
              Para una blusa fresca te recomiendo estas opciones:
              <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                {["https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=200&auto=format&fit=crop", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=200&auto=format&fit=crop", "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=200&auto=format&fit=crop"].map(src => (
                  <img key={src} src={src} alt="" style={{ width: 64, height: 44, borderRadius: 10, objectFit: "cover", border: "1px solid var(--color-border)" }} />
                ))}
              </div>
            </div>
          </div>

          <div style={{ position: "absolute", top: 14, right: 14, background: "var(--color-primary)", color: "#fff", borderRadius: 999, padding: "8px 12px", fontWeight: 800, fontSize: 12, boxShadow: "var(--shadow-soft)" }}>
            S/ 32 <span style={{ fontWeight: 400, opacity: .9 }}>/ metro desde</span>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:900px){ .hero-grid{grid-template-columns:1fr !important} }`}</style>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    { n: "01", t: "Cuéntanos qué necesitas", d: "Describe tu proyecto, prenda o sensación que buscas." },
    { n: "02", t: "La IA interpreta tu solicitud", d: "Kotton AI entiende textura, caída y uso ideal." },
    { n: "03", t: "Consulta las opciones del catálogo", d: "Cruza tu idea con telas reales disponibles." },
    { n: "04", t: "Recibe recomendaciones", d: "Ve cards, compara y añade al carrito al instante." },
  ];
  return (
    <section id="como-funciona" className="section-pad" style={{ background: "#fff", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>Flujo inteligente</span>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 32, margin: "8px 0 0" }}>Cómo funciona</h2>
          <p style={{ color: "var(--color-text-secondary)", marginTop: 8 }}>Cliente → IA → Catálogo → Recomendaciones</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginTop: 22 }} className="how-grid">
          {steps.map(s => (
            <div key={s.n} style={{ background: "var(--color-background)", border: "1px solid var(--color-border)", borderRadius: 18, padding: 16, position: "relative" }}>
              <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: ".1em", color: "var(--color-primary)" }}>{s.n}</div>
              <div style={{ fontWeight: 800, marginTop: 6 }}>{s.t}</div>
              <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 6, lineHeight: 1.5 }}>{s.d}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 16, flexWrap: "wrap", color: "var(--color-text-secondary)", fontSize: 12, fontWeight: 700 }}>
          <span style={{ background: "var(--color-background)", border: "1px solid var(--color-border)", padding: "6px 10px", borderRadius: 999 }}>Cliente</span> → <span style={{ background: "var(--color-secondary)", color: "#fff", padding: "6px 10px", borderRadius: 999 }}>IA</span> → <span style={{ background: "#fff", border: "1px solid var(--color-border)", padding: "6px 10px", borderRadius: 999 }}>Catálogo</span> → <span style={{ background: "var(--color-primary)", color: "#fff", padding: "6px 10px", borderRadius: 999 }}>Recomendaciones</span>
        </div>
      </div>
      <style>{`@media(max-width:900px){ .how-grid{grid-template-columns:repeat(2,1fr) !important} } @media(max-width:520px){ .how-grid{grid-template-columns:1fr !important} }`}</style>
    </section>
  );
}

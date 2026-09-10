export function Benefits() {
  const items = [
    { title: "Variedad", desc: "Algodones, linos, mezclas, denim, punto y seda. Todo en un solo lugar.", icon: "◈" },
    { title: "Orientación", desc: "Kotton AI te guía según uso, clima y caída que necesitas.", icon: "✦" },
    { title: "Facilidad", desc: "Añade al carrito y cotiza por WhatsApp en un clic.", icon: "↗" },
    { title: "Innovación", desc: "Textil con mirada tech: cálido, creativo y eficiente.", icon: "⬢" },
  ];
  return (
    <section className="section-pad" style={{ background: "var(--color-surface-alt)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
      <div className="container">
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 28, textAlign: "center" }}>Por qué elegir Kotton Kids</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginTop: 18 }} className="benefits-grid">
          {items.map(b => (
            <div key={b.title} style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: 18, padding: 16, boxShadow: "var(--shadow-soft)" }}>
              <div style={{ width: 36, height: 36, borderRadius: 12, background: "var(--color-primary)", color: "#fff", display: "grid", placeItems: "center", fontWeight: 900 }}>{b.icon}</div>
              <div style={{ fontWeight: 800, marginTop: 10 }}>{b.title}</div>
              <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 4, lineHeight: 1.5 }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){ .benefits-grid{grid-template-columns:repeat(2,1fr) !important} } @media(max-width:520px){ .benefits-grid{grid-template-columns:1fr !important} }`}</style>
    </section>
  );
}

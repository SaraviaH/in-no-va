import type { Category } from "../types/product";

export function CategoryCard({ cat, onClick }: { cat: Category; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border)",
        aspectRatio: "4/3",
        cursor: "pointer",
        background: "#000",
        padding: 0,
        textAlign: "left",
        width: "100%",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <img src={cat.imagen} alt={cat.nombre} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: .92 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(43,43,43,.72) 100%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 16, color: "#fff" }}>
        <div style={{ display: "inline-flex", background: "rgba(255,255,255,.9)", color: "var(--color-text)", fontSize: 10, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", padding: "4px 8px", borderRadius: 999 }}>{cat.id}</div>
        <div style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 700, marginTop: 8 }}>{cat.nombre}</div>
        <div style={{ fontSize: 13, opacity: .9, marginTop: 2, lineHeight: 1.4 }}>{cat.descripcion}</div>
      </div>
    </button>
  );
}

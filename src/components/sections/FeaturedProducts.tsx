import type { Product } from "../../types/product";
import { ProductCard } from "../ProductCard";

export function FeaturedProducts({
  products,
  filter,
  onFilter,
  onView,
  onAdd,
}: {
  products: Product[];
  filter: string;
  onFilter: (f: string) => void;
  onView: (p: Product) => void;
  onAdd: (p: Product) => void;
}) {
  const filters = ["Todos", "algodon", "lino", "mezclas", "denim"];
  const filtered = filter === "Todos" ? products : products.filter(p => p.categoria === filter);
  return (
    <section id="catalogo" className="section-pad">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 16, flexWrap: "wrap" }}>
          <div>
            <span className="eyebrow">Selección Kotton</span>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 32, margin: "8px 0 0" }}>Productos destacados</h2>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", background: "#fff", border: "1px solid var(--color-border)", padding: 4, borderRadius: 999 }}>
            {filters.map(f => (
              <button
                key={f}
                onClick={() => onFilter(f)}
                style={{
                  padding: "7px 12px",
                  borderRadius: 999,
                  border: "1px solid transparent",
                  background: filter === f ? "var(--color-secondary)" : "transparent",
                  color: filter === f ? "#fff" : "var(--color-text-secondary)",
                  fontWeight: 800,
                  fontSize: 12,
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginTop: 18 }}>
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} onView={() => onView(p)} onAdd={() => onAdd(p)} />
          ))}
        </div>
        {filtered.length === 0 && <div style={{ textAlign: "center", color: "var(--color-text-secondary)", marginTop: 18 }}>Sin productos en esta categoría.</div>}
      </div>
      <style>{`@media(max-width:1100px){ #catalogo .container > div:last-child{grid-template-columns:repeat(3,1fr) !important} } @media(max-width:760px){ #catalogo .container > div:last-child{grid-template-columns:repeat(2,1fr) !important} } @media(max-width:520px){ #catalogo .container > div:last-child{grid-template-columns:1fr !important} }`}</style>
    </section>
  );
}

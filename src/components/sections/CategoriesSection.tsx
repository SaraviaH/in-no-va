import type { Category } from "../../types/product";
import { CategoryCard } from "../CategoryCard";

export function CategoriesSection({ categories, onSelect }: { categories: Category[]; onSelect: (id: string) => void }) {
  return (
    <section id="categorias" className="section-pad" style={{ background: "#fff", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 16, flexWrap: "wrap" }}>
          <div>
            <span className="eyebrow">Explora por textura</span>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 32, margin: "8px 0 0" }}>Categorías textiles</h2>
            <p style={{ color: "var(--color-text-secondary)", marginTop: 6, maxWidth: 520 }}>Elige por caída, peso y sensación al tacto. Cada categoría trae su historia.</p>
          </div>
          <a href="#catalogo" style={{ fontWeight: 800, fontSize: 13, border: "1px solid var(--color-border)", padding: "8px 14px", borderRadius: 999, background: "var(--color-background)" }}>Ver todo el catálogo →</a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginTop: 18 }}>
          {categories.map(c => (
            <CategoryCard key={c.id} cat={c} onClick={() => onSelect(c.id)} />
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){ #categorias .container > div:last-child{grid-template-columns:repeat(2,1fr) !important} } @media(max-width:560px){ #categorias .container > div:last-child{grid-template-columns:1fr !important} }`}</style>
    </section>
  );
}

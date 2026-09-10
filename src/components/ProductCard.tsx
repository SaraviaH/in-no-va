import type { Product } from "../types/product";
import { Badge } from "./Badge";
import { Button } from "./Button";

export function ProductCard({
  product,
  onView,
  onAdd,
}: {
  product: Product;
  onView: () => void;
  onAdd: () => void;
}) {
  const availabilityTone =
    product.disponibilidad === "En stock" ? "success" : product.disponibilidad === "Pocas unidades" ? "warning" : "accent";

  return (
    <div
      style={{
        background: "var(--color-surface)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-soft)",
        display: "flex",
        flexDirection: "column",
        transition: "transform .2s ease, box-shadow .2s ease",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-medium)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-soft)";
      }}
    >
      {/* image */}
      <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: "var(--color-muted)" }}>
        <img src={product.imagenes[0]} alt={product.nombre} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .4s ease" }} />
        {/* top bar */}
        <div style={{ position: "absolute", top: 12, left: 12, right: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Badge tone={availabilityTone as never}>{product.disponibilidad}</Badge>
          {product.imagenes.length > 1 && (
            <span style={{ background: "rgba(43,43,43,.78)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "5px 9px", borderRadius: 999, backdropFilter: "blur(6px)" }}>
              +{product.imagenes.length} fotos
            </span>
          )}
        </div>
        {/* gallery dots */}
        {product.imagenes.length > 1 && (
          <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6, background: "rgba(255,255,255,.9)", padding: "6px 8px", borderRadius: 999 }}>
            {product.imagenes.slice(0, 4).map((_, i) => (
              <span key={i} style={{ width: i === 0 ? 18 : 6, height: 6, borderRadius: 999, background: i === 0 ? "var(--color-primary)" : "#DCCAB0", display: "block" }} />
            ))}
          </div>
        )}
      </div>

      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-text-secondary)", fontWeight: 700 }}>{product.tipo} · {product.material.split("/")[0].trim()}</div>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 700, lineHeight: 1.2, marginTop: 4 }}>{product.nombre}</div>
          <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 14, height: 14, borderRadius: 999, background: product.color.toLowerCase().includes("terracota") ? "#C76B4A" : product.color.toLowerCase().includes("salvia") ? "#8BA888" : product.color.toLowerCase().includes("mostaza") ? "#D9A441" : product.color.toLowerCase().includes("indigo") ? "#2F3A5A" : "#E8D9C5", border: "1px solid rgba(0,0,0,.08)", display: "inline-block" }} />
            {product.caracteristicaPrincipal} · {product.color}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 2 }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: "var(--color-primary)" }}>S/ {product.precioReferencial.toFixed(2)}</span>
          <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>/ metro · referencial</span>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
          <Button variant="ghost" size="sm" style={{ flex: 1 }} onClick={onView}>
            Ver producto
          </Button>
          <Button variant="primary" size="sm" style={{ flex: 1 }} onClick={onAdd}>
            Añadir al carrito
          </Button>
        </div>
      </div>
    </div>
  );
}

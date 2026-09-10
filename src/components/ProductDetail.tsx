import { useState } from "react";
import type { Product } from "../types/product";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { QuantitySelector } from "./QuantitySelector";

export function ProductDetail({
  product,
  onAdd,
  onAskIA,
  onClose,
}: {
  product: Product;
  onAdd: (qty: number) => void;
  onAskIA: () => void;
  onClose: () => void;
}) {
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const tone = product.disponibilidad === "En stock" ? "success" : product.disponibilidad === "Pocas unidades" ? "warning" : "accent";

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 0 }}>
        {/* gallery */}
        <div style={{ padding: 16, background: "var(--color-background)", borderRight: "1px solid var(--color-border)" }} className="detail-gallery">
          <div style={{ background: "#fff", borderRadius: 18, overflow: "hidden", border: "1px solid var(--color-border)", aspectRatio: "4/3" }}>
            <img src={product.imagenes[active]} alt={product.nombre} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          {product.imagenes.length > 1 ? (
            <div style={{ display: "flex", gap: 8, marginTop: 10, overflowX: "auto" }}>
              {product.imagenes.map((img, i) => (
                <button
                  key={img + i}
                  onClick={() => setActive(i)}
                  style={{
                    width: 72, height: 72, borderRadius: 14, overflow: "hidden", border: i === active ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                    padding: 0, cursor: "pointer", flexShrink: 0, opacity: i === active ? 1 : .8,
                  }}
                >
                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          ) : (
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 8, textAlign: "center" }}>Imagen única · vista principal</div>
          )}
        </div>

        {/* info */}
        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <Badge tone={tone as never}>{product.disponibilidad}</Badge>
                <span style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 800, color: "var(--color-text-secondary)" }}>{product.categoria} · {product.tipo}</span>
              </div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 26, fontWeight: 800, lineHeight: 1.1, marginTop: 8 }}>{product.nombre}</div>
              <div style={{ color: "var(--color-text-secondary)", fontSize: 13, marginTop: 6 }}>{product.descripcion}</div>
            </div>
            <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 999, border: "1px solid var(--color-border)", background: "#fff", cursor: "pointer" }}>✕</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              ["Material", product.material],
              ["Color", product.color],
              ["Tipo", product.tipo],
              ["Precio", `S/ ${product.precioReferencial.toFixed(2)} / metro`],
            ].map(([k, v]) => (
              <div key={k} style={{ background: "var(--color-background)", border: "1px solid var(--color-border)", borderRadius: 14, padding: "10px 12px" }}>
                <div style={{ fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 800, color: "var(--color-text-secondary)" }}>{k}</div>
                <div style={{ fontSize: 13, fontWeight: 700, marginTop: 2 }}>{v}</div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".06em", textTransform: "uppercase" }}>Características</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
              {product.caracteristicas.map(c => (
                <span key={c} style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: 999, padding: "6px 10px", fontSize: 12, fontWeight: 600 }}>{c}</span>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".06em", textTransform: "uppercase" }}>Usos recomendados</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
              {product.usos.map(u => (
                <span key={u} style={{ background: "var(--color-secondary)", color: "#fff", borderRadius: 999, padding: "6px 10px", fontSize: 12, fontWeight: 700 }}>{u}</span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--color-surface-alt)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 12 }}>
            <QuantitySelector value={qty} onChange={setQty} />
            <div style={{ marginLeft: "auto", textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "var(--color-text-secondary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em" }}>Subtotal</div>
              <div style={{ fontWeight: 800, fontSize: 18, color: "var(--color-primary)" }}>S/ {(product.precioReferencial * qty).toFixed(2)}</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="primary" style={{ flex: 1 }} onClick={() => onAdd(qty)}>Añadir al carrito</Button>
            <Button variant="secondary" style={{ flex: 1 }} onClick={onAskIA}>Consultar con IA ✦</Button>
          </div>
          <div style={{ fontSize: 11, color: "var(--color-text-secondary)", textAlign: "center" }}>Precio referencial · Cotización final por WhatsApp</div>
        </div>
      </div>

      <style>{`@media(max-width:860px){ .detail-gallery{border-right:none !important; border-bottom:1px solid var(--color-border)} div[style*="grid-template-columns: 1.1fr .9fr"]{grid-template-columns:1fr !important} }`}</style>
    </div>
  );
}

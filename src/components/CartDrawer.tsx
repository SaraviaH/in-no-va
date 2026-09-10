import { useCart } from "../hooks/useCart";
import { siteConfig } from "../config/site";
import { Button } from "./Button";
import { QuantitySelector } from "./QuantitySelector";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, updateQty, remove, total, totalUnits, count, whatsappLink } = useCart();

  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 55, display: "flex", justifyContent: "flex-end" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(31,46,43,.45)", backdropFilter: "blur(4px)" }} />
      <div style={{ position: "relative", width: "min(440px, 100%)", background: "#fff", height: "100%", display: "flex", flexDirection: "column", boxShadow: "var(--shadow-float)", borderLeft: "1px solid var(--color-border)" }}>
        <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20 }}>Tu cotización</div>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{count} productos · {totalUnits} unidades</div>
          </div>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 999, border: "1px solid var(--color-border)", background: "#fff", cursor: "pointer" }}>✕</button>
        </div>

        <div style={{ flex: 1, overflow: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12, background: "var(--color-background)" }}>
          {items.length === 0 ? (
            <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: 18, padding: 24, textAlign: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: 999, background: "var(--color-muted)", display: "grid", placeItems: "center", margin: "0 auto", fontSize: 22, border: "1px solid var(--color-border)" }}>🧵</div>
              <div style={{ fontWeight: 800, marginTop: 12 }}>Tu carrito está vacío</div>
              <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 4 }}>Explora el catálogo y añade telas para cotizar por WhatsApp.</div>
              <Button variant="ghost" style={{ marginTop: 14 }} onClick={onClose}>Ver catálogo</Button>
            </div>
          ) : (
            items.map(it => (
              <div key={it.product.id} style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: 16, padding: 10, display: "flex", gap: 10, alignItems: "center" }}>
                <img src={it.product.imagenes[0]} alt={it.product.nombre} style={{ width: 64, height: 64, borderRadius: 12, objectFit: "cover", border: "1px solid var(--color-border)" }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{it.product.nombre}</div>
                  <div style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>{it.product.tipo} · S/ {it.product.precioReferencial.toFixed(2)}</div>
                  <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 8 }}>
                    <QuantitySelector value={it.quantity} onChange={n => updateQty(it.product.id, n)} size={30} />
                    <button onClick={() => remove(it.product.id)} style={{ marginLeft: "auto", fontSize: 12, fontWeight: 700, background: "transparent", border: "none", color: "#B65C3D", cursor: "pointer" }}>Eliminar</button>
                  </div>
                </div>
                <div style={{ fontWeight: 800, fontSize: 13, color: "var(--color-primary)" }}>S/ {(it.product.precioReferencial * it.quantity).toFixed(2)}</div>
              </div>
            ))
          )}
        </div>

        <div style={{ padding: 16, borderTop: "1px solid var(--color-border)", background: "#fff", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: "var(--color-surface-alt)", border: "1px solid var(--color-border)", borderRadius: 14, padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}><span>Cantidad de productos</span><strong>{count}</strong></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginTop: 4 }}><span>Total unidades</span><strong>{totalUnits}</strong></div>
            <div className="divider" style={{ margin: "10px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><span style={{ fontWeight: 800 }}>Total referencial</span><span style={{ fontWeight: 900, fontSize: 18, color: "var(--color-primary)" }}>S/ {total.toFixed(2)}</span></div>
            <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginTop: 6, lineHeight: 1.4 }}>{siteConfig.whatsapp.note}</div>
          </div>

          <Button
            variant="whatsapp"
            size="lg"
            disabled={items.length === 0}
            onClick={() => {
              if (items.length === 0) return;
              window.open(whatsappLink, "_blank");
            }}
            style={{ opacity: items.length === 0 ? .5 : 1 }}
          >
            Solicitar cotización por WhatsApp ↗
          </Button>
          <div style={{ fontSize: 11, textAlign: "center", color: "var(--color-text-secondary)" }}>Te llevará a WhatsApp con el mensaje armado automáticamente.</div>
        </div>
      </div>
    </div>
  );
}

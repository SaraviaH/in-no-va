import { useState } from "react";
import { siteConfig } from "../config/site";

export function Header({
  cartCount,
  onCartOpen,
  onAiOpen,
}: {
  cartCount: number;
  onCartOpen: () => void;
  onAiOpen: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(255,248,238,.88)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--color-border)" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", gap: 16, height: 64 }}>
        {/* logo */}
        <a href="#inicio" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <span style={{ width: 36, height: 36, borderRadius: 10, background: "var(--color-primary)", display: "grid", placeItems: "center", color: "#fff", fontWeight: 800, fontSize: 13, letterSpacing: ".04em" }}>KK</span>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, letterSpacing: "-.02em" }}>
            Kotton<span style={{ color: "var(--color-primary)" }}> Kids</span>
          </span>
          <span style={{ display: "none", fontSize: 11, background: "var(--color-muted)", border: "1px solid var(--color-border)", padding: "3px 7px", borderRadius: 999 }} className="desktop-badge">TEXTIL · IA</span>
        </a>

        {/* nav desktop */}
        <nav style={{ display: "flex", alignItems: "center", gap: 18, marginLeft: 24 }} className="hide-mobile">
          {siteConfig.navigation.map(n => (
            <a key={n.href} href={n.href} style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-secondary)" }}>{n.label}</a>
          ))}
        </nav>

        {/* spacer */}
        <div style={{ flex: 1 }} />

        {/* actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={onAiOpen} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid var(--color-border)", borderRadius: 999, padding: "8px 12px", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>
            <span style={{ width: 22, height: 22, borderRadius: 999, background: "var(--color-secondary)", color: "#fff", display: "grid", placeItems: "center", fontSize: 12 }}>✦</span>
            <span className="hide-mobile">Hablar con IA</span>
            <span className="show-mobile" style={{ display: "none" }}>IA</span>
          </button>

          <button onClick={onCartOpen} style={{ position: "relative", background: "var(--color-primary)", color: "#fff", border: "1px solid var(--color-primary)", borderRadius: 999, padding: "9px 14px", display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", fontWeight: 700 }}>
            <span>🛒</span>
            <span className="hide-mobile">Carrito</span>
            {cartCount > 0 && (
              <span style={{ background: "#fff", color: "var(--color-primary)", minWidth: 20, height: 20, borderRadius: 999, display: "grid", placeItems: "center", fontSize: 11, fontWeight: 800, padding: "0 5px" }}>{cartCount}</span>
            )}
          </button>

          <button onClick={() => setMobileOpen(v => !v)} style={{ display: "none", width: 40, height: 40, borderRadius: 12, border: "1px solid var(--color-border)", background: "#fff", cursor: "pointer" }} className="mobile-toggle">
            ☰
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div style={{ borderTop: "1px solid var(--color-border)", background: "#fff", padding: 12 }}>
          <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {siteConfig.navigation.map(n => (
              <a key={n.href} href={n.href} onClick={() => setMobileOpen(false)} style={{ padding: "10px 12px", borderRadius: 10, background: "var(--color-background)", fontWeight: 600, fontSize: 14 }}>{n.label}</a>
            ))}
          </nav>
        </div>
      )}

      <style>{`
        @media(max-width: 960px){ .hide-mobile{display:none !important} .mobile-toggle{display:grid !important; place-items:center} }
        @media(min-width: 961px){ .show-mobile{display:none !important} }
      `}</style>
    </header>
  );
}

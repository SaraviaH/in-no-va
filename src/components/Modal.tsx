import type { ReactNode } from "react";

export function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60, display: "grid", placeItems: "center", padding: 16 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(31,46,43,.52)", backdropFilter: "blur(6px)" }} />
      <div style={{ position: "relative", background: "var(--color-surface)", borderRadius: 22, boxShadow: "var(--shadow-float)", width: "min(960px, 100%)", maxHeight: "90vh", overflow: "auto", border: "1px solid var(--color-border)" }}>
        {children}
      </div>
    </div>
  );
}

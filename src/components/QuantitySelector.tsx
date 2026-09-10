export function QuantitySelector({ value, onChange, size = 36 }: { value: number; onChange: (n: number) => void; size?: number }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "#fff", border: "1px solid var(--color-border)", borderRadius: 999, padding: 4 }}>
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        style={{ width: size, height: size, borderRadius: 999, border: "1px solid var(--color-border)", background: "#fff", cursor: "pointer", fontSize: 16, lineHeight: 1 }}
        aria-label="Disminuir"
      >
        −
      </button>
      <span style={{ minWidth: 32, textAlign: "center", fontWeight: 700, fontSize: 14 }}>{value}</span>
      <button
        onClick={() => onChange(value + 1)}
        style={{ width: size, height: size, borderRadius: 999, background: "var(--color-primary)", color: "#fff", border: "1px solid var(--color-primary)", cursor: "pointer", fontSize: 16, lineHeight: 1 }}
        aria-label="Aumentar"
      >
        +
      </button>
    </div>
  );
}

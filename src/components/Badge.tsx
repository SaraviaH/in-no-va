export function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "success" | "warning" | "accent" }) {
  const map: Record<string, React.CSSProperties> = {
    neutral: { background: "var(--color-muted)", color: "var(--color-text)", border: "1px solid var(--color-border)" },
    success: { background: "#E6F4EE", color: "#1E6B4A", border: "1px solid #C2E6D6" },
    warning: { background: "#FFF1D6", color: "#8A5A00", border: "1px solid #F5D9A0" },
    accent: { background: "#FBE8E0", color: "#8A3A22", border: "1px solid #F0C9B8" },
  };
  return (
    <span style={{ ...map[tone], display: "inline-flex", alignItems: "center", padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase" }}>
      {children}
    </span>
  );
}

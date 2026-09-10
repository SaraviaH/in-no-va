import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "whatsapp";
type Size = "sm" | "md" | "lg";

export function Button({
  variant = "primary",
  size = "md",
  style,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  const base: React.CSSProperties = {
    borderRadius: "var(--radius-pill)",
    fontWeight: 600,
    border: "1px solid transparent",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    transition: "all .18s ease",
    lineHeight: 1,
    whiteSpace: "nowrap",
  };
  const sizes: Record<Size, React.CSSProperties> = {
    sm: { padding: "8px 14px", fontSize: 13 },
    md: { padding: "12px 20px", fontSize: 14 },
    lg: { padding: "14px 24px", fontSize: 15 },
  };
  const variants: Record<Variant, React.CSSProperties> = {
    primary: { background: "var(--color-primary)", color: "#fff", borderColor: "var(--color-primary)", boxShadow: "0 6px 18px rgba(182,92,61,.28)" },
    secondary: { background: "var(--color-secondary)", color: "#fff", borderColor: "var(--color-secondary)" },
    ghost: { background: "transparent", color: "var(--color-text)", borderColor: "var(--color-border)" },
    outline: { background: "#fff", color: "var(--color-text)", borderColor: "var(--color-border)" },
    whatsapp: { background: "#25D366", color: "#fff", borderColor: "#25D366", boxShadow: "0 6px 18px rgba(37,211,102,.3)" },
  };
  return (
    <button style={{ ...base, ...sizes[size], ...variants[variant], ...style }} {...props}>
      {children}
    </button>
  );
}

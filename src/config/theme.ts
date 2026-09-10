export const theme = {
  colors: {
    primary: "#9E4D2E", // terracota opaco profesional, menos brillante
    primaryHover: "#864128",
    secondary: "#1A2E2A", // forest profundo, sofisticado
    accent: "#C69A2E", // ámbar refinado
    background: "#F5EFE2", // crema opaco cálido, menos brillante
    surface: "#FFFBF5", // papel cálido
    surfaceAlt: "#EDE3CC", // arena opaca
    text: "#2E2A24", // tinta cálida (menos negro puro)
    textSecondary: "#6B6560",
    border: "#DDD2BB",
    muted: "#EBE0C8",
    teal: "#23433E",
    sage: "#7A9B7D",
    success: "#2E6B4F",
    warning: "#8A6A1A",
  },
  radius: {
    xs: "10px",
    sm: "14px",
    md: "18px",
    lg: "24px",
    xl: "32px",
    pill: "999px",
  },
  shadows: {
    soft: "0 8px 28px rgba(46,42,36,0.08)",
    medium: "0 14px 36px rgba(46,42,36,0.13)",
    floating: "0 22px 48px rgba(26,46,42,0.18)",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "40px",
    xxl: "64px",
  },
  fonts: {
    heading: "'Fraunces', 'Georgia', serif",
    body: "'Inter', 'DM Sans', system-ui, sans-serif",
    accent: "'Instrument Serif', Georgia, serif",
  },
} as const;

export const theme = {
  colors: {
    primary: "#B65C3D", // terracota
    primaryHover: "#9E4F34",
    secondary: "#2F5D50", // verde salvia / petróleo oscuro
    accent: "#D9A441", // amarillo mostaza
    background: "#FFF8EE", // crema / marfil
    surface: "#FFFFFF",
    surfaceAlt: "#FFF0D9",
    text: "#2B2B2B", // carbón
    textSecondary: "#6B6B6B",
    border: "#E8D9C5",
    muted: "#F5EAD6",
    teal: "#264E4B", // azul petróleo
    sage: "#8BA888",
    success: "#2F7D62",
    warning: "#D9A441",
  },
  radius: {
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "22px",
    xl: "28px",
    pill: "999px",
  },
  shadows: {
    soft: "0 6px 24px rgba(43,43,43,0.08)",
    medium: "0 10px 30px rgba(43,43,43,0.12)",
    floating: "0 18px 40px rgba(43,43,43,0.18)",
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

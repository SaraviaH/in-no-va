export const theme = {
  colors: {
    primary: "#8E3E27", // Arcilla mineral mate y profunda
    primaryHover: "#74311E", // Arcilla tostada en estado activo/hover
    secondary: "#1C332D", // Ciprés botánico de atelier
    accent: "#9A7228", // Ocre dorado sobrio para avisos técnicos
    background: "#FAF8F5", // Lienzo marfil luminoso
    surface: "#FFFFFF", // Blanco puro para fidelidad cromática de muestras
    surfaceAlt: "#F3EFEA", // Piedra textil suave para secciones alternas
    text: "#171614", // Carbón textil de alto contraste (WCAG AAA)
    textSecondary: "#5C5852", // Gris hilado para metadatos y especificaciones
    border: "#E6E0D6", // Borde hilado de 1px
    borderStrong: "#D1C9BC", // Borde acentuado en interacción
    muted: "#EAE4DC", // Arena hilada para chips y fondos secundarios
    teal: "#24423B",
    sage: "#5E7D63",
    success: "#23533D",
    warning: "#7D5B14",
  },
  radius: {
    xs: "6px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    pill: "999px",
  },
  shadows: {
    soft: "0 2px 12px rgba(23, 22, 20, 0.04)",
    medium: "0 8px 24px rgba(23, 22, 20, 0.07)",
    floating: "0 20px 44px rgba(23, 22, 20, 0.14)",
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
    heading: "'Fraunces', Georgia, serif",
    body: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
    accent: "'Fraunces', Georgia, serif",
  },
} as const;

export const siteConfig = {
  brand: {
    name: "Kotton Kids",
    tagline: "Textil · Cálido · Creativo",
    logoText: "KOTTON KIDS",
  },
  contact: {
    address: "Av. Gamarra 123, La Victoria, Lima — Perú",
    phone: "+51 977 329 720",
    whatsapp: "51977329720", // solo números, para wa.me (Perú +51)
    whatsappDisplay: "+51 977 329 720",
    email: "hola@kottonkids.pe",
    schedule: "Lun - Sáb: 9:00 - 19:00 | Dom: 10:00 - 16:00",
    mapsUrl: "https://maps.google.com/?q=Gamarra+Lima",
  },
  social: {
    instagram: "https://instagram.com/kottonkids",
    facebook: "https://facebook.com/kottonkids",
    tiktok: "https://tiktok.com/@kottonkids",
    whatsapp: "https://wa.me/51977329720",
  },
  navigation: [
    { label: "Inicio", href: "#inicio" },
    { label: "Catálogo", href: "#catalogo" },
    { label: "Categorías", href: "#categorias" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "¿Cómo funciona?", href: "#como-funciona" },
    { label: "Contacto", href: "#contacto" },
  ],
  texts: {
    heroTitle: "Encuentra la tela adecuada para tu proyecto",
    heroSubtitle:
      "Explora nuestro catálogo o conversa con nuestro asistente inteligente para encontrar una tela según lo que necesitas.",
    aiSectionTitle: "¿No sabes qué tela elegir?",
    aiSectionSubtitle:
      "Cuéntanos qué quieres confeccionar y nuestro asistente te ayudará a encontrar opciones.",
    howItWorksTitle: "Cómo funciona",
    aboutTitle: "Tejemos ideas, vestimos historias",
    aboutText:
      "En Kotton Kids seleccionamos telas con alma textil y mirada contemporánea. Desde algodones suaves hasta linos naturales y mezclas innovadoras, cada rollo cuenta una historia de color, textura y posibilidad. Creemos en la calidez del hacer manual potenciado por la inteligencia de hoy.",
    benefitsTitle: "Por qué elegir Kotton Kids",
    footerDescription:
      "Telas seleccionadas con calidez textil y precisión contemporánea. Tu proyecto, nuestra inspiración.",
  },
  legal: {
    privacy: "#",
    terms: "#",
  },
  whatsapp: {
    quotationIntro: "Hola, Kotton Kids. Quiero solicitar una cotización de los siguientes productos:",
    quotationOutro: "Quisiera conocer la disponibilidad y cotización final de estos productos.",
    note: "Los precios mostrados son referenciales. La cotización final será confirmada por Kotton Kids.",
  },
} as const;

export type SiteConfig = typeof siteConfig;

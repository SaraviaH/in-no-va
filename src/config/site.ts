export const siteConfig = {
  brand: {
    name: "Kotton",
    legalName: "Kotton Kids",
    tagline: "Estudio Textil & Tienda de Telas",
    logoText: "KOTTON",
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
    { label: "Fibras", href: "#categorias" },
    { label: "Atelier", href: "#nosotros" },
    { label: "Proceso", href: "#como-funciona" },
    { label: "Contacto", href: "#contacto" },
  ],
  texts: {
    heroTitle: "Tejidos nobles con especificación técnica para confección",
    heroSubtitle:
      "Algodón Pima peruano, linos europeos, sargas orgánicas y puntos de alta recuperación. Explora el muestrario por gramaje y ligamento o consulta con nuestro asesor textil.",
    aiSectionTitle: "Asesoría técnica según la prenda que vas a confeccionar",
    aiSectionSubtitle:
      "Indica el tipo de prenda, caída deseada o exigencia de uso. Nuestro motor cruza tu requerimiento con el gramaje, ligamento y elasticidad real de cada partida.",
    howItWorksTitle: "Del requerimiento técnico al metraje en taller",
    aboutTitle: "Curaduría textil con rigor de taller en Gamarra",
    aboutText:
      "En KOTTON seleccionamos partidas textiles verificando título de hilo, estabilidad dimensional, solidez al lavado y suavidad al tacto. Desde algodón Pima para línea de bebé hasta linos lavados a la piedra y sargas pesadas, abastecemos a marcas independientes, talleres y diseñadores con información transparente por metro lineal.",
    benefitsTitle: "Estándares de nuestro estudio textil",
    footerDescription:
      "Muestrario textil curado en Gamarra, Lima. Venta por metro lineal y despacho a talleres en todo el Perú.",
  },
  legal: {
    privacy: "#",
    terms: "#",
  },
  whatsapp: {
    quotationIntro: "Hola, Kotton. Quiero solicitar una cotización de las siguientes telas:",
    quotationOutro: "Quisiera confirmar disponibilidad de partida y cotización final por metraje.",
    note: "Los precios por metro lineal son referenciales. La cotización final y disponibilidad de lote son confirmadas directamente por nuestro equipo en Gamarra.",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Capa central de comunicación con backend.
 * Hoy usa datos mock; mañana solo cambiará la implementación interna
 * sin tocar componentes.
 */
import { products } from "../data/products";
import { categories } from "../data/categories";
import { siteConfig } from "../config/site";
import type { Product, Category } from "../types/product";

const delay = (ms = 180) => new Promise(r => setTimeout(r, ms));


export interface AssistantResponse {
  text: string;
  products?: Product[];
  detectedIntent?: string;
  matchedAttributes?: string[];
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export const api = {
  // Config
  getSiteConfig() { return siteConfig; },

  // Products
  async getProducts(): Promise<Product[]> {
    await delay();
    return products;
  },
  async getProductById(id: string): Promise<Product | undefined> {
    await delay(120);
    return products.find(p => p.id === id);
  },
  async getFeaturedProducts(): Promise<Product[]> {
    await delay();
    return products.filter(p => p.destacado);
  },
  async getProductsByCategory(catId: string): Promise<Product[]> {
    await delay();
    return products.filter(p => p.categoria === catId);
  },
  async searchProducts(query: string): Promise<Product[]> {
    await delay();
    const q = normalizeText(query);
    return products.filter(p =>
      normalizeText(p.nombre).includes(q) ||
      normalizeText(p.descripcion).includes(q) ||
      normalizeText(p.tipo).includes(q) ||
      normalizeText(p.material).includes(q)
    );
  },

  // Categories
  async getCategories(): Promise<Category[]> {
    await delay();
    return categories;
  },

  /**
   * Asistente conversacional Kotton AI (Prototipo Iteración 1-2):
   * Procesa la consulta en lenguaje natural identificando intenciones de uso de prendas,
   * parámetros técnicos requeridos (elasticidad, gramaje, composición) y consultas
   * contextuales sobre productos del catálogo.
   *
   * Nota de evolución arquitectural:
   * En esta fase inicial utiliza clasificación por reglas y ponderación de atributos.
   * Sirve de contrato desacoplado para la futura ingesta de modelos supervisados (SVM / TF-IDF)
   * o API de backend en Python.
   */
  async queryAssistant(prompt: string): Promise<AssistantResponse> {
    await delay(350);
    const q = normalizeText(prompt);

    if (q.length < 3) {
      return {
        text: "Por favor, cuéntame un poco más sobre tu proyecto o prenda para poder ayudarte a elegir la tela adecuada.",
      };
    }

    // 1. Consulta contextual directa sobre un producto específico
    const specificProduct = products.find(p => q.includes(normalizeText(p.nombre)) || (p.tipo && q.includes(normalizeText(p.tipo))));
    if (specificProduct) {
      const g = specificProduct.gramaje ? `con gramaje de ${specificProduct.gramaje}` : "";
      const e = specificProduct.elasticidad ? `elasticidad ${specificProduct.elasticidad.toLowerCase()}` : "";
      const detalles = [g, e].filter(Boolean).join(" y ");
      return {
        text: `El tejido "${specificProduct.nombre}" (${specificProduct.material}) es de ligamento ${specificProduct.tipoTejido || specificProduct.tipo}${detalles ? ` ${detalles}` : ""}. Se recomienda principalmente para: ${specificProduct.usos.join(", ")}.`,
        products: [specificProduct],
        detectedIntent: "Consulta de producto",
        matchedAttributes: [specificProduct.material, specificProduct.gramaje || "Estándar"].filter(Boolean),
      };
    }

    // 2. Intención: Línea Bebé / Recién nacido (APF2 pág. 5 y 16)
    if (q.includes("bebe") || q.includes("recien nacido") || q.includes("enterizo") || q.includes("body") || q.includes("cuna")) {
      const matches = products.filter(p => p.categoria === "algodon" || p.lineasUso?.includes("Línea Bebé") || p.id === "p-01" || p.id === "p-06");
      return {
        text: "Para prendas de bebé y recién nacido se requiere tejido 100% algodón, hipoalergénico, suave al tacto y sin rigidez para cuidar la piel sensible. Te recomiendo estas opciones:",
        products: matches.slice(0, 3),
        detectedIntent: "Línea Bebé / Infantil",
        matchedAttributes: ["100% Algodón Pima", "Hipoalergénico", "Punto suave"],
      };
    }

    // 3. Intención: Ropa Deportiva / Pantalón de buzo / Elasticidad (APF2 pág. 5)
    if (q.includes("deport") || q.includes("buzo") || q.includes("jogger") || q.includes("elastic") || q.includes("estir") || q.includes("spandex")) {
      const matches = products.filter(p => p.elasticidad === "Alta" || p.categoria === "mezclas" || p.categoria === "punto");
      return {
        text: "Para ropa deportiva, buzos o joggers se recomiendan tejidos con buena elasticidad y recuperación para acompañar el movimiento. Estas telas son las más adecuadas:",
        products: matches.slice(0, 3),
        detectedIntent: "Ropa Deportiva / Elástica",
        matchedAttributes: ["Elasticidad Alta", "Punto con elastano", "Confort térmico"],
      };
    }

    // 4. Intención: Pijamería / Ropa de descanso (APF2 pág. 5)
    if (q.includes("pijama") || q.includes("dormir") || q.includes("descanso") || q.includes("bata")) {
      const matches = products.filter(p => p.lineasUso?.includes("Pijamería") || p.id === "p-01" || p.id === "p-03");
      return {
        text: "Para pijamería y prendas de descanso buscamos telas suaves, transpirables y de tacto agradable para uso prolongado:",
        products: matches.slice(0, 3),
        detectedIntent: "Pijamería / Descanso",
        matchedAttributes: ["Transpirabilidad", "Tacto sedoso", "Libertad de movimiento"],
      };
    }

    // 5. Intención: Fresca / Verano / Calor
    if (q.includes("fresc") || q.includes("verano") || q.includes("calor") || q.includes("playa") || q.includes("ventilad")) {
      const matches = products.filter(p => p.categoria === "lino" || (p.categoria === "algodon" && p.id !== "p-04"));
      return {
        text: "Para clima cálido y prendas frescas de verano, las mejores opciones son fibras naturales transpirables como el lino y el algodón:",
        products: matches.slice(0, 3),
        detectedIntent: "Prendas Frescas / Verano",
        matchedAttributes: ["100% Lino", "Algodón transpirable", "Fibra natural"],
      };
    }

    // 6. Intención: Denim / Prendas resistentes / Jeans
    if (q.includes("jean") || q.includes("denim") || q.includes("chaqueta") || q.includes("resistente") || q.includes("overall")) {
      const matches = products.filter(p => p.categoria === "denim");
      return {
        text: "Para prendas urbanas estructuradas, casacas y pantalones resistentes, el denim de algodón orgánico es la opción indicada:",
        products: matches,
        detectedIntent: "Denim / Prendas Resistentes",
        matchedAttributes: ["Gramaje pesado", "Sarga 3x1", "Alta resistencia"],
      };
    }

    // 7. Intención: Vestido / Fiesta / Elegante / Seda
    if (q.includes("vestido") || q.includes("blusa") || q.includes("fiesta") || q.includes("noche") || q.includes("elegante") || q.includes("seda") || q.includes("satin")) {
      const matches = products.filter(p => p.categoria === "seda" || p.categoria === "lino" || p.id === "p-01");
      return {
        text: "Para blusas o vestidos con caída elegante y textura distinguida, te sugiero estas telas:",
        products: matches.slice(0, 3),
        detectedIntent: "Alta Moda / Vestidos",
        matchedAttributes: ["Caída fluida", "Seda natural", "Acabado satinado"],
      };
    }

    // 8. Intención: Ecológica / Sostenible / Tote bags / Manualidades
    if (q.includes("ecologic") || q.includes("sostenible") || q.includes("crudo") || q.includes("tote") || q.includes("bolsa") || q.includes("lienzo") || q.includes("tocuyo")) {
      const matches = products.filter(p => p.id === "p-07" || p.id === "p-04");
      return {
        text: "Para proyectos sostenibles, lienzos y bolsas ecológicas disponemos de opciones sin químicos ni blanqueadores artificiales:",
        products: matches,
        detectedIntent: "Sostenible / Ecológico",
        matchedAttributes: ["Sin químicos", "100% Orgánico", "Textura artesanal"],
      };
    }

    // 9. Manejo de consultas no comprendidas / ambiguas
    return {
      text: "No encontré telas que coincidan con esa descripción. Prueba indicándome qué prenda deseas confeccionar (por ejemplo: '¿Qué tela sirve para enterizo de bebé?', '¿Tela elástica para buzo?' o '¿Tela fresca para vestido?').",
      detectedIntent: "Consulta no clasificada",
    };
  },

  // Compatibilidad hacia atrás
  async getRecommendations(prompt: string): Promise<Product[]> {
    const res = await this.queryAssistant(prompt);
    return res.products ?? [];
  },

  // WhatsApp link generation
  buildWhatsAppLink(items: { product: Product; quantity: number }[]): string {
    const total = items.reduce((acc, it) => acc + it.product.precioReferencial * it.quantity, 0);
    const lines = items.map(
      it => `• ${it.product.nombre}: ${it.quantity} ${it.quantity === 1 ? "metro" : "metros"} (S/ ${it.product.precioReferencial.toFixed(2)} c/m)`
    );
    const msg = [
      siteConfig.whatsapp.quotationIntro,
      "",
      ...lines,
      "",
      `Total referencial: S/ ${total.toFixed(2)}`,
      "",
      siteConfig.whatsapp.quotationOutro,
    ].join("\n");
    const phone = siteConfig.contact.whatsapp;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  },
};

export type Api = typeof api;

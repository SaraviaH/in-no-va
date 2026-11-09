/**
 * Capa central de comunicación con backend y motor de Kotton AI.
 * Hoy usa datos estructurados del estudio; mañana solo cambiará la implementación interna
 * sin tocar componentes.
 */
import { products } from "../data/products";
import { categories } from "../data/categories";
import { siteConfig } from "../config/site";
import type {
  Product,
  Category,
  ProductCategoryId,
  CatalogFilterId,
  StoreSectionId,
  AssistantAction,
  AssistantNavigationContext,
} from "../types/product";

const delay = (ms = 180) => new Promise(r => setTimeout(r, ms));

export interface AssistantResponse {
  text: string;
  products?: Product[];
  detectedIntent?: string;
  matchedAttributes?: string[];
  actions?: AssistantAction[];
  pendingConfirmationAction?: AssistantAction;
}

const VALID_SECTIONS: ReadonlySet<StoreSectionId> = new Set([
  "inicio",
  "categorias",
  "catalogo",
  "asesor-ia",
  "como-funciona",
  "nosotros",
  "beneficios",
  "contacto",
]);

const VALID_CATEGORIES: ReadonlySet<CatalogFilterId> = new Set([
  "Todos",
  ...categories.map(c => c.id),
]);

const VALID_PRODUCT_IDS: ReadonlySet<string> = new Set(products.map(p => p.id));

/**
 * Valida estrictamente que una acción solicitada por Kotton AI
 * utilice únicamente identificadores reales del catálogo y parámetros seguros.
 */
export function validateAssistantAction(action: AssistantAction): boolean {
  if (!action || typeof action !== "object" || typeof action.type !== "string") {
    return false;
  }

  switch (action.type) {
    case "navigateTo":
      return VALID_SECTIONS.has(action.section);
    case "scrollToSection":
      return VALID_SECTIONS.has(action.sectionId);
    case "filterProducts":
      return VALID_CATEGORIES.has(action.category);
    case "searchProducts":
      return typeof action.query === "string" && action.query.trim().length <= 120;
    case "openProduct":
      return VALID_PRODUCT_IDS.has(action.productId);
    case "closeProduct":
    case "openCart":
    case "closeCart":
    case "clearCart":
      return true;
    case "addToCart":
      return (
        VALID_PRODUCT_IDS.has(action.productId) &&
        Number.isInteger(action.quantity) &&
        action.quantity >= 1 &&
        action.quantity <= 200
      );
    default:
      return false;
  }
}

function sanitizeActions(actions: AssistantAction[]): AssistantAction[] {
  return actions.filter(validateAssistantAction);
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

const CATEGORY_ALIASES: { id: ProductCategoryId; label: string; keywords: string[] }[] = [
  { id: "algodon", label: "Algodón", keywords: ["algodon", "pima", "crudo", "tocuyo"] },
  { id: "lino", label: "Lino", keywords: ["lino", "linos"] },
  { id: "mezclas", label: "Mezclas", keywords: ["mezcla", "mezclas", "modal"] },
  { id: "seda", label: "Seda", keywords: ["seda", "charmeuse", "saten", "satin"] },
  { id: "denim", label: "Denim", keywords: ["denim", "sarga", "twill", "indigo"] },
  { id: "punto", label: "Punto", keywords: ["punto", "canale", "rib"] },
];

function findProductInQuery(q: string): Product | undefined {
  // Coincidencia por ID explícito (ej. p-01) o por nombre/tipo
  const byId = products.find(p => q.includes(p.id.toLowerCase()));
  if (byId) return byId;

  const byFullName = products.find(p => q.includes(normalizeText(p.nombre)));
  if (byFullName) return byFullName;

  // Coincidencia por alias específicos de partida
  if (q.includes("algodon pima") || q.includes("pima nube") || q.includes("premium pima")) {
    return products.find(p => p.id === "p-01");
  }
  if (q.includes("lino natural") || q.includes("lino lavado") || q.includes("lino arena")) {
    return products.find(p => p.id === "p-02");
  }
  if (q.includes("mezcla soft") || q.includes("modal terracota")) {
    return products.find(p => p.id === "p-03");
  }
  if (q.includes("denim organico") || q.includes("denim indigo")) {
    return products.find(p => p.id === "p-04");
  }
  if (q.includes("seda charmeuse") || q.includes("charmeuse mostaza") || q.includes("charmeuse")) {
    return products.find(p => p.id === "p-05");
  }
  if (q.includes("punto canale") || q.includes("canale salvia") || q.includes("canale")) {
    return products.find(p => p.id === "p-06");
  }
  if (q.includes("algodon crudo") || q.includes("organico crudo") || q.includes("tocuyo")) {
    return products.find(p => p.id === "p-07");
  }
  if (q.includes("lino terracota")) {
    return products.find(p => p.id === "p-08");
  }
  return undefined;
}

export const api = {
  // Config
  getSiteConfig() {
    return siteConfig;
  },

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
    return products.filter(
      p =>
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
   * Asistente conversacional y agente de navegación Kotton AI (Sprint 10):
   * Procesa consultas técnicas de confección, órdenes de navegación interna y
   * contexto en vivo de la tienda devolviendo acciones tipadas y validadas.
   */
  async queryAssistant(
    prompt: string,
    context?: AssistantNavigationContext
  ): Promise<AssistantResponse> {
    await delay(300);
    const q = normalizeText(prompt);

    if (q.length < 3) {
      return {
        text: "Por favor, cuéntame un poco más sobre la prenda que deseas confeccionar o indícame a qué sección del muestrario quieres ir.",
      };
    }

    const activeProduct = context?.activeProduct ?? null;
    const mentionedProduct = findProductInQuery(q);
    const targetProduct = mentionedProduct ?? activeProduct;

    // 0A. Orden sensible: Vaciar el carrito (requiere confirmación explícita)
    if (
      (q.includes("vaciar") || q.includes("limpiar") || q.includes("borrar")) &&
      (q.includes("carrito") || q.includes("cotizacion") || q.includes("hoja"))
    ) {
      if (context && context.cartCount === 0) {
        return {
          text: "Tu hoja de cotización ya se encuentra vacía actualmente.",
          detectedIntent: "Gestión de cotización",
        };
      }
      const confirmAction: AssistantAction = {
        type: "clearCart",
        label: "Confirmar: Vaciar hoja de cotización",
        requiresConfirmation: true,
      };
      return {
        text: "Para proteger tu selección de metraje, confirma si deseas vaciar por completo la hoja de cotización actual.",
        detectedIntent: "Confirmación requerida",
        pendingConfirmationAction: validateAssistantAction(confirmAction) ? confirmAction : undefined,
      };
    }

    // 0B. Orden sensible: Agregar metraje al carrito por comando de voz/texto
    if (
      (q.includes("agrega") ||
        q.includes("anade") ||
        q.includes("añade") ||
        q.includes("sumar") ||
        q.includes("cotizar ")) &&
      targetProduct &&
      (q.includes("carrito") ||
        q.includes("cotizacion") ||
        q.includes("metro") ||
        q.includes("este producto") ||
        q.includes("esta tela") ||
        !!mentionedProduct)
    ) {
      const numMatch = q.match(/\b(\d{1,3})\s*(?:metros?|m\b)?/);
      const qty = numMatch ? Math.min(200, Math.max(1, parseInt(numMatch[1], 10))) : 1;
      const confirmAdd: AssistantAction = {
        type: "addToCart",
        productId: targetProduct.id,
        quantity: qty,
        label: `Confirmar: Añadir ${qty} m de ${targetProduct.nombre} (S/ ${(targetProduct.precioReferencial * qty).toFixed(2)})`,
        requiresConfirmation: true,
      };
      return {
        text: `He preparado la orden para añadir ${qty} ${qty === 1 ? "metro lineal" : "metros lineales"} de "${targetProduct.nombre}" (subtotal referencial S/ ${(targetProduct.precioReferencial * qty).toFixed(2)}). Confirma a continuación para agregarlo a tu hoja de cotización:`,
        products: [targetProduct],
        detectedIntent: "Cotización asistida",
        matchedAttributes: [
          targetProduct.material,
          `${qty} m`,
          `S/ ${(targetProduct.precioReferencial * qty).toFixed(2)}`,
        ],
        pendingConfirmationAction: validateAssistantAction(confirmAdd) ? confirmAdd : undefined,
      };
    }

    // 0C. Navegación: Mostrar / Abrir carrito o consultar estado de cotización
    if (
      q.includes("carrito") ||
      q.includes("mi cotizacion") ||
      q.includes("ver cotizacion") ||
      q.includes("abrir cotizacion") ||
      q.includes("hoja de cotizacion") ||
      q.includes("cuanto llevo")
    ) {
      const cartSummary =
        context && context.cartCount > 0
          ? `Tienes ${context.cartCount} ${context.cartCount === 1 ? "partida seleccionada" : "partidas seleccionadas"} (${context.cartTotalUnits} m en total) por un estimado referencial de S/ ${context.cartTotalPrice.toFixed(2)}.`
          : "Tu hoja de cotización está vacía en este momento. Puedes añadir telas desde el catálogo o desde mis recomendaciones.";
      return {
        text: `Abriendo tu hoja de cotización. ${cartSummary}`,
        detectedIntent: "Navegación · Cotización",
        matchedAttributes:
          context && context.cartCount > 0
            ? [`${context.cartCount} partidas`, `${context.cartTotalUnits} m`, `S/ ${context.cartTotalPrice.toFixed(2)}`]
            : ["Hoja vacía"],
        actions: sanitizeActions([{ type: "openCart", label: "Abrir hoja de cotización" }]),
      };
    }

    // 0D. Navegación: Regresar o ir a Inicio
    if (
      q.includes("regresa al inicio") ||
      q.includes("volver al inicio") ||
      q.includes("ir al inicio") ||
      q.includes("ir a inicio") ||
      q.includes("ve al inicio") ||
      q === "inicio" ||
      q.includes("volver arriba")
    ) {
      return {
        text: "Regresando a la portada principal del estudio textil KOTTON.",
        detectedIntent: "Navegación · Inicio",
        actions: sanitizeActions([
          { type: "closeProduct", label: "Cerrar ficha activa" },
          { type: "navigateTo", section: "inicio", label: "Ir a Inicio" },
        ]),
      };
    }

    // 0E. Contexto de producto activo: "telas similares", "parecidas a esta", "alternativas"
    if (
      q.includes("similar") ||
      q.includes("parecid") ||
      q.includes("alternativa") ||
      q.includes("otra opcion como esta") ||
      q.includes("otras telas como esta")
    ) {
      const baseProd = mentionedProduct ?? activeProduct;
      if (baseProd) {
        const similar = products.filter(
          p =>
            p.id !== baseProd.id &&
            (p.categoria === baseProd.categoria ||
              p.usos.some(u => baseProd.usos.includes(u)) ||
              (p.lineasUso && baseProd.lineasUso && p.lineasUso.some(l => baseProd.lineasUso?.includes(l))))
        );
        return {
          text: `Tomando como referencia "${baseProd.nombre}" (${baseProd.material}, ${baseProd.gramaje || "gramaje estándar"}), te sugiero estas partidas equivalentes por familia textil y aplicación de confección:`,
          products: similar.slice(0, 3),
          detectedIntent: `Alternativas a ${baseProd.nombre}`,
          matchedAttributes: [
            `Ref. actual: ${baseProd.nombre}`,
            baseProd.material,
            baseProd.gramaje || "Muestrario",
          ],
          actions: sanitizeActions([
            {
              type: "filterProducts",
              category: baseProd.categoria,
              label: `Ver familia ${baseProd.categoria}`,
            },
          ]),
        };
      }
      if (context && context.selectedCategory !== "Todos") {
        const catMatches = products.filter(p => p.categoria === context.selectedCategory);
        return {
          text: `Actualmente estás explorando la familia "${context.selectedCategory}". Aquí tienes las partidas disponibles dentro de esta categoría:`,
          products: catMatches,
          detectedIntent: "Contexto de categoría activa",
        };
      }
    }

    // 0F. Orden de abrir la ficha técnica de "este producto" o de un producto mencionado
    if (
      q.includes("abre la ficha") ||
      q.includes("abrir ficha") ||
      q.includes("ver ficha") ||
      q.includes("muestrame la ficha") ||
      q.includes("ficha tecnica") ||
      q.includes("mostrar producto") ||
      q.includes("este producto") ||
      q.includes("esta tela")
    ) {
      const prodToOpen =
        mentionedProduct ??
        activeProduct ??
        (context && context.selectedCategory !== "Todos"
          ? products.find(p => p.categoria === context.selectedCategory)
          : products[0]);

      if (prodToOpen) {
        return {
          text: `Abriendo la ficha técnica de "${prodToOpen.nombre}" (${prodToOpen.material}, ${prodToOpen.gramaje || "estándar"}, S/ ${prodToOpen.precioReferencial.toFixed(2)} / m). Puedes inspeccionar su ligamento ${prodToOpen.tipoTejido || prodToOpen.tipo} y calcular el metraje lineal.`,
          products: [prodToOpen],
          detectedIntent: "Navegación · Ficha Técnica",
          matchedAttributes: [
            `REF. ${prodToOpen.id.toUpperCase()}`,
            prodToOpen.material,
            prodToOpen.gramaje || "Estándar",
          ],
          actions: sanitizeActions([
            {
              type: "openProduct",
              productId: prodToOpen.id,
              label: `Abrir ficha: ${prodToOpen.nombre}`,
            },
          ]),
        };
      }
    }

    // 0G. Navegación a secciones institucionales (Nosotros, Proceso, Beneficios, Contacto, Categorías, Catálogo)
    if (
      q.includes("donde estan") ||
      q.includes("ubicacion") ||
      q.includes("direccion") ||
      q.includes("horario") ||
      q.includes("ir a contacto") ||
      q.includes("seccion contacto") ||
      q.includes("showroom")
    ) {
      return {
        text: `Te llevo a la sección de Contacto y Showroom. Nos encontramos en ${siteConfig.contact.address} (${siteConfig.contact.schedule}).`,
        detectedIntent: "Navegación · Contacto",
        matchedAttributes: ["Gamarra, Lima", siteConfig.contact.whatsappDisplay],
        actions: sanitizeActions([
          { type: "navigateTo", section: "contacto", label: "Ir a Contacto y Showroom" },
        ]),
      };
    }

    if (
      q.includes("como funciona") ||
      q.includes("proceso de compra") ||
      q.includes("pasos para comprar") ||
      q.includes("ir a proceso")
    ) {
      return {
        text: "Desplazando a la sección de Proceso Técnico: desde la definición de tu prenda y evaluación de gramaje hasta la confirmación de lote por WhatsApp.",
        detectedIntent: "Navegación · Proceso",
        actions: sanitizeActions([
          { type: "navigateTo", section: "como-funciona", label: "Ir a Cómo Funciona" },
        ]),
      };
    }

    if (
      q.includes("sobre nosotros") ||
      q.includes("quienes son") ||
      q.includes("ir a atelier") ||
      q.includes("seccion nosotros") ||
      q.includes("historia de kotton")
    ) {
      return {
        text: "Te dirijo a la sección de nuestro Atelier Textil en Gamarra para que conozcas nuestra curaduría de fibras y control de partidas.",
        detectedIntent: "Navegación · Atelier",
        actions: sanitizeActions([
          { type: "navigateTo", section: "nosotros", label: "Ir a Atelier / Nosotros" },
        ]),
      };
    }

    if (
      q.includes("ver categorias") ||
      q.includes("ir a categorias") ||
      q.includes("familias de fibras") ||
      q.includes("ir a fibras")
    ) {
      return {
        text: "Mostrando las 6 familias de fibras y ligamentos del estudio: Algodón, Lino, Mezclas, Seda, Denim y Punto.",
        detectedIntent: "Navegación · Familias de Fibras",
        actions: sanitizeActions([
          { type: "navigateTo", section: "categorias", label: "Ir a Familias de Fibras" },
        ]),
      };
    }

    if (
      q.includes("todas las telas") ||
      q.includes("todo el catalogo") ||
      q.includes("restablecer filtro") ||
      q.includes("mostrar todo") ||
      q.includes("abre el catalogo") ||
      q.includes("abrir catalogo") ||
      q.includes("ir al catalogo")
    ) {
      return {
        text: `Abriendo el muestrario completo de KOTTON con las ${products.length} partidas disponibles.`,
        products: products.slice(0, 3),
        detectedIntent: "Navegación · Catálogo Completo",
        matchedAttributes: [`${products.length} partidas`, "85–340 g/m²"],
        actions: sanitizeActions([
          { type: "filterProducts", category: "Todos", label: "Mostrar todas las telas" },
          { type: "searchProducts", query: "", label: "Limpiar búsqueda" },
          { type: "scrollToSection", sectionId: "catalogo", label: "Ir al Catálogo" },
        ]),
      };
    }

    // 0H. Órdenes de filtrado por categoría ("Muéstrame las telas de algodón", "Quiero ver las telas de seda", etc.)
    const hasCategoryNavigationVerb =
      q.includes("muestrame") ||
      q.includes("mostrar") ||
      q.includes("quiero ver") ||
      q.includes("ver ") ||
      q.includes("filtra") ||
      q.includes("categoria") ||
      q.includes("familia") ||
      q.includes("telas de ") ||
      q.includes("tejidos de ");

    if (hasCategoryNavigationVerb && !mentionedProduct) {
      const matchedCat = CATEGORY_ALIASES.find(c => c.keywords.some(kw => q.includes(kw)));
      if (matchedCat) {
        const catProducts = products.filter(p => p.categoria === matchedCat.id);
        return {
          text: `He filtrado el catálogo por la familia "${matchedCat.label}" (${catProducts.length} ${catProducts.length === 1 ? "partida disponible" : "partidas disponibles"}) y desplazado la vista hacia el muestrario:`,
          products: catProducts,
          detectedIntent: `Filtro · Categoría ${matchedCat.label}`,
          matchedAttributes: [
            `Familia: ${matchedCat.label}`,
            `${catProducts.length} ${catProducts.length === 1 ? "partida" : "partidas"}`,
          ],
          actions: sanitizeActions([
            {
              type: "filterProducts",
              category: matchedCat.id,
              label: `Filtrar catálogo: ${matchedCat.label}`,
            },
            { type: "searchProducts", query: "", label: "Limpiar término de búsqueda" },
            { type: "scrollToSection", sectionId: "catalogo", label: "Ir al Catálogo" },
          ]),
        };
      }
    }

    // 0I. Órdenes explícitas de búsqueda ("Busca telas para pijamas", "Buscar lino", etc.)
    const searchMatch = q.match(
      /^(?:busca|buscar|encuentra|filtrar por)\s+(?:telas?\s+(?:para|de)\s+|tejidos?\s+(?:para|de)\s+)?(.+)$/
    );
    if (searchMatch && searchMatch[1]) {
      const rawTerm = searchMatch[1]
        .replace(/^(el|la|los|las|un|una)\s+/i, "")
        .trim()
        .slice(0, 60);

      // Si el término coincide con una categoría exacta, aplicamos el filtro de categoría; si no, aplicamos búsqueda en catálogo
      const matchedCat = CATEGORY_ALIASES.find(c => c.keywords.some(kw => rawTerm === kw));
      if (matchedCat) {
        const catProducts = products.filter(p => p.categoria === matchedCat.id);
        return {
          text: `Filtrando el muestrario por la categoría "${matchedCat.label}":`,
          products: catProducts,
          detectedIntent: `Búsqueda · ${matchedCat.label}`,
          matchedAttributes: [`Categoría: ${matchedCat.label}`],
          actions: sanitizeActions([
            {
              type: "filterProducts",
              category: matchedCat.id,
              label: `Filtrar por ${matchedCat.label}`,
            },
            { type: "scrollToSection", sectionId: "catalogo", label: "Ver en catálogo" },
          ]),
        };
      }

      // Mapeo de sinónimos textiles frecuentes hacia términos reales del catálogo
      const SYNONYM_MAP: Record<string, string> = {
        pijama: "pijameria",
        pijamas: "pijameria",
        bebe: "bebe",
        bebes: "bebe",
        buzos: "buzo",
        joggers: "jogger",
        vestidos: "vestido",
        camisas: "camisa",
        blusas: "blusa",
        jeans: "jean",
        chaquetas: "chaqueta",
        bolsas: "tote",
      };

      const mappedTerm =
        SYNONYM_MAP[rawTerm] ??
        Object.entries(SYNONYM_MAP).find(([k]) => rawTerm.includes(k))?.[1] ??
        (rawTerm.endsWith("s") && rawTerm.length > 4 ? rawTerm.slice(0, -1) : rawTerm);

      // Búsqueda por uso o término en el catálogo
      const searchHits = products.filter(p => {
        const hay = normalizeText(
          [
            p.nombre,
            p.descripcion,
            p.tipo,
            p.material,
            p.color,
            p.tipoTejido ?? "",
            p.gramaje ?? "",
            ...p.usos,
            ...(p.lineasUso ?? []),
          ].join(" ")
        );
        return hay.includes(mappedTerm) || hay.includes(rawTerm);
      });

      const queryToApply = searchHits.length > 0 ? mappedTerm : rawTerm;
      return {
        text:
          searchHits.length > 0
            ? `He aplicado la búsqueda "${queryToApply}" en el catálogo (${searchHits.length} ${searchHits.length === 1 ? "partida encontrada" : "partidas encontradas"}):`
            : `He buscado "${rawTerm}" en el catálogo, pero no hay coincidencias exactas. Te sugiero restablecer el filtro o explorar nuestras 6 familias textiles.`,
        products: searchHits.slice(0, 3),
        detectedIntent: `Búsqueda en catálogo · "${queryToApply}"`,
        matchedAttributes:
          searchHits.length > 0
            ? [`Término: ${queryToApply}`, `${searchHits.length} resultados`]
            : ["Sin coincidencias exactas"],
        actions: sanitizeActions([
          { type: "filterProducts", category: "Todos", label: "Todas las categorías" },
          {
            type: "searchProducts",
            query: queryToApply,
            label: `Buscar "${queryToApply}" en catálogo`,
          },
          { type: "scrollToSection", sectionId: "catalogo", label: "Ver resultados en catálogo" },
        ]),
      };
    }

    // 1. Consulta contextual directa sobre un producto específico
    const specificProduct =
      mentionedProduct ??
      products.find(
        p => q.includes(normalizeText(p.nombre)) || (p.tipo && q.includes(normalizeText(p.tipo)))
      );
    if (specificProduct) {
      const g = specificProduct.gramaje ? `con gramaje de ${specificProduct.gramaje}` : "";
      const e = specificProduct.elasticidad
        ? `elasticidad ${specificProduct.elasticidad.toLowerCase()}`
        : "";
      const detalles = [g, e].filter(Boolean).join(" y ");
      return {
        text: `El tejido "${specificProduct.nombre}" (${specificProduct.material}) es de ligamento ${specificProduct.tipoTejido || specificProduct.tipo}${detalles ? ` ${detalles}` : ""}. Se recomienda principalmente para: ${specificProduct.usos.join(", ")}.`,
        products: [specificProduct],
        detectedIntent: "Consulta de producto",
        matchedAttributes: [specificProduct.material, specificProduct.gramaje || "Estándar"].filter(
          Boolean
        ),
        actions: sanitizeActions([
          {
            type: "openProduct",
            productId: specificProduct.id,
            label: `Abrir ficha: ${specificProduct.nombre}`,
          },
        ]),
      };
    }

    // 2. Intención: Línea Bebé / Recién nacido (APF2 pág. 5 y 16)
    if (
      q.includes("bebe") ||
      q.includes("recien nacido") ||
      q.includes("enterizo") ||
      q.includes("body") ||
      q.includes("cuna")
    ) {
      const matches = products.filter(
        p =>
          p.categoria === "algodon" ||
          p.lineasUso?.includes("Línea Bebé") ||
          p.id === "p-01" ||
          p.id === "p-06"
      );
      return {
        text: "Para prendas de bebé y recién nacido se requiere tejido 100% algodón, hipoalergénico, suave al tacto y sin rigidez para cuidar la piel sensible. Te recomiendo estas opciones:",
        products: matches.slice(0, 3),
        detectedIntent: "Línea Bebé / Infantil",
        matchedAttributes: ["100% Algodón Pima", "Hipoalergénico", "Punto suave"],
        actions: sanitizeActions([
          { type: "filterProducts", category: "algodon", label: "Filtrar catálogo: Algodón" },
          { type: "scrollToSection", sectionId: "catalogo", label: "Ver en catálogo" },
        ]),
      };
    }

    // 3. Intención: Ropa Deportiva / Pantalón de buzo / Elasticidad (APF2 pág. 5)
    if (
      q.includes("deport") ||
      q.includes("buzo") ||
      q.includes("jogger") ||
      q.includes("elastic") ||
      q.includes("estir") ||
      q.includes("spandex")
    ) {
      const matches = products.filter(
        p => p.elasticidad === "Alta" || p.categoria === "mezclas" || p.categoria === "punto"
      );
      return {
        text: "Para ropa deportiva, buzos o joggers se recomiendan tejidos con buena elasticidad y recuperación para acompañar el movimiento. Estas telas son las más adecuadas:",
        products: matches.slice(0, 3),
        detectedIntent: "Ropa Deportiva / Elástica",
        matchedAttributes: ["Elasticidad Alta", "Punto con elastano", "Confort térmico"],
        actions: sanitizeActions([
          { type: "filterProducts", category: "mezclas", label: "Filtrar catálogo: Mezclas" },
          { type: "scrollToSection", sectionId: "catalogo", label: "Ver en catálogo" },
        ]),
      };
    }

    // 4. Intención: Pijamería / Ropa de descanso (APF2 pág. 5)
    if (q.includes("pijama") || q.includes("dormir") || q.includes("descanso") || q.includes("bata")) {
      const matches = products.filter(
        p => p.lineasUso?.includes("Pijamería") || p.id === "p-01" || p.id === "p-03"
      );
      return {
        text: "Para pijamería y prendas de descanso buscamos telas suaves, transpirables y de tacto agradable para uso prolongado:",
        products: matches.slice(0, 3),
        detectedIntent: "Pijamería / Descanso",
        matchedAttributes: ["Transpirabilidad", "Tacto sedoso", "Libertad de movimiento"],
        actions: sanitizeActions([
          { type: "searchProducts", query: "dormir", label: "Ver telas de descanso en catálogo" },
          { type: "scrollToSection", sectionId: "catalogo", label: "Ir al catálogo" },
        ]),
      };
    }

    // 5. Intención: Fresca / Verano / Calor
    if (
      q.includes("fresc") ||
      q.includes("verano") ||
      q.includes("calor") ||
      q.includes("playa") ||
      q.includes("ventilad") ||
      q.includes("lino")
    ) {
      const matches = products.filter(
        p => p.categoria === "lino" || (p.categoria === "algodon" && p.id !== "p-04")
      );
      return {
        text: "Para clima cálido y prendas frescas de verano, las mejores opciones son fibras naturales transpirables como el lino y el algodón:",
        products: matches.slice(0, 3),
        detectedIntent: "Prendas Frescas / Verano",
        matchedAttributes: ["100% Lino", "Algodón transpirable", "Fibra natural"],
        actions: sanitizeActions([
          { type: "filterProducts", category: "lino", label: "Filtrar catálogo: Lino" },
          { type: "scrollToSection", sectionId: "catalogo", label: "Ver en catálogo" },
        ]),
      };
    }

    // 6. Intención: Denim / Prendas resistentes / Jeans
    if (
      q.includes("jean") ||
      q.includes("denim") ||
      q.includes("chaqueta") ||
      q.includes("resistente") ||
      q.includes("overall")
    ) {
      const matches = products.filter(p => p.categoria === "denim");
      return {
        text: "Para prendas urbanas estructuradas, casacas y pantalones resistentes, el denim de algodón orgánico es la opción indicada:",
        products: matches,
        detectedIntent: "Denim / Prendas Resistentes",
        matchedAttributes: ["Gramaje pesado", "Sarga 3x1", "Alta resistencia"],
        actions: sanitizeActions([
          { type: "filterProducts", category: "denim", label: "Filtrar catálogo: Denim" },
          { type: "scrollToSection", sectionId: "catalogo", label: "Ver en catálogo" },
        ]),
      };
    }

    // 7. Intención: Vestido / Fiesta / Elegante / Seda
    if (
      q.includes("vestido") ||
      q.includes("blusa") ||
      q.includes("fiesta") ||
      q.includes("noche") ||
      q.includes("elegante") ||
      q.includes("seda") ||
      q.includes("satin")
    ) {
      const matches = products.filter(
        p => p.categoria === "seda" || p.categoria === "lino" || p.id === "p-01"
      );
      return {
        text: "Para blusas o vestidos con caída elegante y textura distinguida, te sugiero estas telas:",
        products: matches.slice(0, 3),
        detectedIntent: "Alta Moda / Vestidos",
        matchedAttributes: ["Caída fluida", "Seda natural", "Acabado satinado"],
        actions: sanitizeActions([
          { type: "filterProducts", category: "seda", label: "Filtrar catálogo: Seda" },
          { type: "scrollToSection", sectionId: "catalogo", label: "Ver en catálogo" },
        ]),
      };
    }

    // 8. Intención: Ecológica / Sostenible / Tote bags / Manualidades
    if (
      q.includes("ecologic") ||
      q.includes("sostenible") ||
      q.includes("crudo") ||
      q.includes("tote") ||
      q.includes("bolsa") ||
      q.includes("lienzo") ||
      q.includes("tocuyo")
    ) {
      const matches = products.filter(p => p.id === "p-07" || p.id === "p-04");
      return {
        text: "Para proyectos sostenibles, lienzos y bolsas ecológicas disponemos de opciones sin químicos ni blanqueadores artificiales:",
        products: matches,
        detectedIntent: "Sostenible / Ecológico",
        matchedAttributes: ["Sin químicos", "100% Orgánico", "Textura artesanal"],
        actions: sanitizeActions([
          { type: "openProduct", productId: "p-07", label: "Ver Algodón Orgánico Crudo" },
        ]),
      };
    }

    // 9. Manejo de consultas no comprendidas / ambiguas (con sugerencia contextual si hay producto activo)
    const contextHint = activeProduct
      ? ` Veo que tienes abierta la ficha de "${activeProduct.nombre}"; puedes preguntarme "¿Qué telas similares tienes?" o decir "Cotizar 5 metros de esta tela".`
      : " También puedes darme órdenes de navegación como 'Muéstrame las telas de algodón', 'Busca telas para pijamas', 'Muéstrame el carrito' o 'Regresa al inicio'.";

    return {
      text: `No encontré telas que coincidan con esa descripción. Prueba indicándome qué prenda deseas confeccionar (por ejemplo: '¿Qué tela sirve para enterizo de bebé?' o '¿Tela elástica para buzo?').${contextHint}`,
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
      it =>
        `• ${it.product.nombre}: ${it.quantity} ${it.quantity === 1 ? "metro" : "metros"} (S/ ${it.product.precioReferencial.toFixed(2)} c/m)`
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

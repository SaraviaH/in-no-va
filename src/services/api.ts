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
    const q = query.toLowerCase();
    return products.filter(p =>
      p.nombre.toLowerCase().includes(q) ||
      p.descripcion.toLowerCase().includes(q) ||
      p.tipo.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q)
    );
  },

  // Categories
  async getCategories(): Promise<Category[]> {
    await delay();
    return categories;
  },

  // IA - mock recommendation
  async getRecommendations(prompt: string): Promise<Product[]> {
    await delay(500);
    const q = prompt.toLowerCase();
    if (q.includes("fresca") || q.includes("verano") || q.includes("calor")) {
      return products.filter(p => p.categoria === "lino" || p.categoria === "algodon").slice(0, 3);
    }
    if (q.includes("vestido") || q.includes("blusa")) {
      return products.filter(p => ["lino","seda","algodon"].includes(p.categoria)).slice(0, 3);
    }
    if (q.includes("jean") || q.includes("denim")) {
      return products.filter(p => p.categoria === "denim").slice(0, 3);
    }
    // default random 3
    return products.slice(0, 3);
  },

  // WhatsApp link generation
  buildWhatsAppLink(items: { product: Product; quantity: number }[]): string {
    const total = items.reduce((acc, it) => acc + it.product.precioReferencial * it.quantity, 0);
    const lines = items.map(it => `${it.product.nombre} — ${it.quantity} ${it.quantity === 1 ? "unidad" : "unidades"} (S/ ${it.product.precioReferencial.toFixed(2)} c/u)`);
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

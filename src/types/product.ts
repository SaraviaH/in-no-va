export type ProductCategoryId = "algodon" | "lino" | "mezclas" | "seda" | "denim" | "punto";

import type { ImageSource } from "./image";

export interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: string;
  material: string; // Composición textil (ej. 100% Algodón Pima)
  color: string;
  caracteristicas: string[];
  precioReferencial: number;
  disponibilidad: "En stock" | "Pocas unidades" | "Bajo pedido";
  imagenes: ImageSource[];
  categoria: ProductCategoryId;
  usos: string[];
  destacado?: boolean;
  caracteristicaPrincipal?: string;

  // Atributos técnicos normalizados según APF2 (Iteración 1 y 2)
  gramaje?: string; // e.g. "160 g/m²"
  elasticidad?: "Alta" | "Media" | "Baja" | "Nula" | "Rígida";
  tipoTejido?: string; // e.g. "Punto Jersey", "Plano / Tafetán", "Sarga / Twill"
  lineasUso?: string[]; // e.g. ["Línea Bebé", "Pijamería", "Ropa Deportiva"]
  confirmacionPendiente?: boolean; // Señala datos sujetos a validación de taller
}

export interface Category {
  id: ProductCategoryId;
  nombre: string;
  descripcion: string;
  imagen: ImageSource;
  count?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  products?: Product[];
  timestamp: number;
  detectedIntent?: string; // e.g. "Línea Bebé", "Prenda Fresca / Verano"
  matchedAttributes?: string[]; // e.g. ["100% Algodón", "Gramaje liviano"]
}

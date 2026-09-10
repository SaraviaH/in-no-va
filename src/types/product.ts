export type ProductCategoryId = "algodon" | "lino" | "mezclas" | "seda" | "denim" | "punto";

import type { ImageSource } from "./image";

export interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: string;
  material: string;
  color: string;
  caracteristicas: string[];
  precioReferencial: number;
  disponibilidad: "En stock" | "Pocas unidades" | "Bajo pedido";
  imagenes: ImageSource[];
  categoria: ProductCategoryId;
  usos: string[];
  destacado?: boolean;
  caracteristicaPrincipal?: string;
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
}

import type { Category } from "../types/product";

export const categories: Category[] = [
  {
    id: "algodon",
    nombre: "Algodón",
    descripcion: "Suave, transpirable y versátil para todo el año.",
    imagen: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "lino",
    nombre: "Lino",
    descripcion: "Fresco, natural y con caída elegante.",
    imagen: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "mezclas",
    nombre: "Mezclas",
    descripcion: "Innovación textil con confort y resistencia.",
    imagen: "https://images.unsplash - invalid placeholder replace below"
      .replace(" - invalid placeholder replace below",""),
    // fix image
  },
  {
    id: "seda",
    nombre: "Seda",
    descripcion: "Brillo sutil y tacto exquisito.",
    imagen: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "denim",
    nombre: "Denim",
    descripcion: "Resistente, atemporal y urbano.",
    imagen: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "punto",
    nombre: "Punto",
    descripcion: "Elástico, acogedor y moderno.",
    imagen: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop",
  },
];

// Correct mezclas image override (since typo above)
categories[2].imagen = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop";

import type { Category } from "../types/product";
import { images } from "../assets/images";

export const categories: Category[] = [
  {
    id: "algodon",
    nombre: "Algodón",
    descripcion: "Suave, transpirable y versátil para todo el año.",
    imagen: images.categories.algodon,
  },
  {
    id: "lino",
    nombre: "Lino",
    descripcion: "Fresco, natural y con caída elegante.",
    imagen: images.categories.lino,
  },
  {
    id: "mezclas",
    nombre: "Mezclas",
    descripcion: "Innovación textil con confort y resistencia.",
    imagen: images.categories.mezclas,
  },
  {
    id: "seda",
    nombre: "Seda",
    descripcion: "Brillo sutil y tacto exquisito.",
    imagen: images.categories.seda,
  },
  {
    id: "denim",
    nombre: "Denim",
    descripcion: "Resistente, atemporal y urbano.",
    imagen: images.categories.denim,
  },
  {
    id: "punto",
    nombre: "Punto",
    descripcion: "Elástico, acogedor y moderno.",
    imagen: images.categories.punto,
  },
];

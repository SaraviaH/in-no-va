import { useState } from "react";
import "./styles/globals.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Hero } from "./components/sections/Hero";
import { CategoriesSection } from "./components/sections/CategoriesSection";
import { FeaturedProducts } from "./components/sections/FeaturedProducts";
import { AiSection } from "./components/sections/AiSection";
import { HowItWorks } from "./components/sections/HowItWorks";
import { About } from "./components/sections/About";
import { Benefits } from "./components/sections/Benefits";
import { Contact } from "./components/sections/Contact";
import { CartDrawer } from "./components/CartDrawer";
import { AiBubble } from "./components/AiBubble";
import { Modal } from "./components/Modal";
import { ProductDetail } from "./components/ProductDetail";
import { products } from "./data/products";
import { categories } from "./data/categories";
import { useCart } from "./hooks/useCart";
import { useToast } from "./hooks/useToast";
import type { Product } from "./types/product";

export default function App() {
  const { add, count } = useCart();
  const { push } = useToast();
  const [filter, setFilter] = useState("Todos");
  const [selected, setSelected] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const handleAdd = (p: Product, qty = 1) => {
    add(p, qty);
    push(`Añadido: ${p.nombre} × ${qty}`);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F5EFE2] selection:bg-[#EBE0C8] selection:text-[#1A2E2A]">
      <Header cartCount={count} onCartOpen={() => setCartOpen(true)} onAiOpen={() => setAiOpen(true)} />

      <main className="flex-1">
        <Hero onCatalog={() => scrollTo("catalogo")} onAi={() => setAiOpen(true)} />

        <CategoriesSection
          categories={categories}
          onSelect={id => {
            setFilter(id);
            scrollTo("catalogo");
          }}
        />

        <FeaturedProducts
          products={products}
          filter={filter}
          onFilter={setFilter}
          onView={setSelected}
          onAdd={p => handleAdd(p, 1)}
        />

        <AiSection onOpen={() => setAiOpen(true)} />
        <HowItWorks />
        <About />
        <Benefits />
        <Contact />
      </main>

      <Footer />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <AiBubble
        open={aiOpen}
        onToggle={() => setAiOpen(v => !v)}
        onViewProduct={p => setSelected(p)}
        onAddToCart={p => handleAdd(p, 1)}
      />

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <ProductDetail
            product={selected}
            onClose={() => setSelected(null)}
            onAdd={qty => {
              handleAdd(selected, qty);
              setSelected(null);
              setCartOpen(true);
            }}
            onAskIA={() => {
              setSelected(null);
              setAiOpen(true);
            }}
          />
        )}
      </Modal>
    </div>
  );
}

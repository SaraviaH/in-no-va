import { useCallback, useEffect, useMemo, useState } from "react";
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
import { validateAssistantAction } from "./services/api";
import type {
  Product,
  StoreSectionId,
  AssistantAction,
  AssistantNavigationContext,
} from "./types/product";

const OBSERVED_SECTIONS: StoreSectionId[] = [
  "inicio",
  "categorias",
  "catalogo",
  "asesor-ia",
  "como-funciona",
  "nosotros",
  "beneficios",
  "contacto",
];

export default function App() {
  const { add, clear, count, totalUnits, total } = useCart();
  const { push } = useToast();
  const [filter, setFilter] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState<StoreSectionId>("inicio");

  const scrollTo = useCallback((id: StoreSectionId) => {
    setCurrentSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id as StoreSectionId;
            if (OBSERVED_SECTIONS.includes(id)) {
              setCurrentSection(id);
            }
          }
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: 0.05 }
    );

    for (const secId of OBSERVED_SECTIONS) {
      const el = document.getElementById(secId);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const handleAdd = useCallback(
    (p: Product, qty = 1) => {
      add(p, qty);
      push(`Añadido a cotización: ${p.nombre} (${qty} m)`);
    },
    [add, push]
  );

  const handleExecuteAssistantAction = useCallback(
    (action: AssistantAction) => {
      if (!validateAssistantAction(action)) return;

      switch (action.type) {
        case "navigateTo":
          scrollTo(action.section);
          break;
        case "scrollToSection":
          scrollTo(action.sectionId);
          break;
        case "filterProducts":
          setFilter(action.category);
          break;
        case "searchProducts":
          setSearchQuery(action.query);
          break;
        case "openProduct": {
          const prod = products.find(p => p.id === action.productId);
          if (prod) setSelected(prod);
          break;
        }
        case "closeProduct":
          setSelected(null);
          break;
        case "openCart":
          setCartOpen(true);
          break;
        case "closeCart":
          setCartOpen(false);
          break;
        case "addToCart": {
          const prod = products.find(p => p.id === action.productId);
          if (prod) {
            handleAdd(prod, action.quantity);
            setCartOpen(true);
          }
          break;
        }
        case "clearCart":
          clear();
          push("Hoja de cotización vaciada");
          break;
      }
    },
    [scrollTo, handleAdd, clear, push]
  );

  const navigationContext = useMemo<AssistantNavigationContext>(
    () => ({
      currentSection,
      selectedCategory: filter,
      searchQuery,
      activeProduct: selected,
      cartCount: count,
      cartTotalUnits: totalUnits,
      cartTotalPrice: total,
      cartOpen,
    }),
    [currentSection, filter, searchQuery, selected, count, totalUnits, total, cartOpen]
  );

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#FAF8F5] text-[#171614] selection:bg-[#EAE4DC] selection:text-[#171614]">
      <Header
        cartCount={count}
        onCartOpen={() => setCartOpen(true)}
        onAiOpen={() => setAiOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={q => {
          setSearchQuery(q);
        }}
      />

      <main className="flex-1">
        <Hero
          onCatalog={() => scrollTo("catalogo")}
          onAi={() => setAiOpen(true)}
          onSelectSwatch={id => {
            const found = products.find(p => p.id === id);
            if (found) setSelected(found);
            else scrollTo("catalogo");
          }}
        />

        <CategoriesSection
          categories={categories}
          activeCategory={filter}
          onSelect={id => {
            setFilter(id);
            scrollTo("catalogo");
          }}
        />

        <FeaturedProducts
          products={products}
          filter={filter}
          onFilter={setFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onView={setSelected}
          onAdd={p => handleAdd(p, 1)}
        />

        <AiSection
          onOpen={() => setAiOpen(true)}
          onAskQuery={q => {
            setAiQuery(q);
            setAiOpen(true);
          }}
        />
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
        initialQuery={aiQuery}
        onClearInitialQuery={() => setAiQuery(null)}
        navigationContext={navigationContext}
        onExecuteAction={handleExecuteAssistantAction}
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
            onAskIA={prod => {
              setSelected(null);
              setAiQuery(`Cuéntame sobre la tela ${prod.nombre} y para qué prendas se recomienda`);
              setAiOpen(true);
            }}
          />
        )}
      </Modal>
    </div>
  );
}

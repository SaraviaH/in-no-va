import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product, CartItem } from "../types/product";
import { api } from "../services/api";

type CartContextType = {
  items: CartItem[];
  add: (p: Product, qty?: number) => void;
  remove: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clear: () => void;
  count: number;
  totalUnits: number;
  total: number;
  whatsappLink: string;
};

const CartCtx = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = (product: Product, qty = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.product.id === product.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qty };
        return copy;
      }
      return [...prev, { product, quantity: qty }];
    });
  };
  const remove = (id: string) => setItems(prev => prev.filter(i => i.product.id !== id));
  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) return remove(id);
    setItems(prev => prev.map(i => i.product.id === id ? { ...i, quantity: qty } : i));
  };
  const clear = () => setItems([]);

  const { count, totalUnits, total } = useMemo(() => ({
    count: items.length,
    totalUnits: items.reduce((a, b) => a + b.quantity, 0),
    total: items.reduce((a, b) => a + b.product.precioReferencial * b.quantity, 0),
  }), [items]);

  const whatsappLink = useMemo(() => api.buildWhatsAppLink(items), [items]);

  return (
    <CartCtx.Provider value={{ items, add, remove, updateQty, clear, count, totalUnits, total, whatsappLink }}>
      {children}
    </CartCtx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}

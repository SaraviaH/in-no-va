import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { CartProvider } from "./hooks/useCart";
import { ToastProvider } from "./hooks/useToast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </CartProvider>
  </StrictMode>
);

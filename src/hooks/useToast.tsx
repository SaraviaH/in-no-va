import { createContext, useContext, useState, type ReactNode } from "react";

type Toast = { id: string; msg: string };
const Ctx = createContext<{ push: (msg: string) => void; toasts: Toast[] } | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = (msg: string) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts(t => [...t, { id, msg }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2600);
  };
  return (
    <Ctx.Provider value={{ push, toasts }}>
      {children}
      <div style={{ position: "fixed", bottom: 92, left: "50%", transform: "translateX(-50%)", zIndex: 9999, display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
        {toasts.map(t => (
          <div key={t.id} style={{ background: "#2B2B2B", color: "#fff", padding: "10px 18px", borderRadius: 999, fontSize: 13, boxShadow: "0 10px 30px rgba(0,0,0,.2)", whiteSpace: "nowrap" }}>
            {t.msg}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}
export function useToast() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useToast necesita provider");
  return c;
}

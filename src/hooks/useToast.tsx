import { createContext, useContext, useState, type ReactNode } from "react";
import { IconCheck } from "../components/Icons";

type Toast = { id: string; msg: string };
const Ctx = createContext<{ push: (msg: string) => void; toasts: Toast[] } | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = (msg: string) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts(t => [...t, { id, msg }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2800);
  };
  return (
    <Ctx.Provider value={{ push, toasts }}>
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 items-center pointer-events-none w-[calc(100vw-24px)] max-w-[440px]"
      >
        {toasts.map(t => (
          <div
            key={t.id}
            className="bg-[#171614] text-[#FAF8F5] px-3.5 py-2.5 rounded-[10px] text-[12px] sm:text-[13px] shadow-[0_12px_32px_rgba(23,22,20,0.24)] border border-white/10 font-medium flex items-center gap-2 animate-[modalEnter_0.2s_cubic-bezier(0.16,1,0.3,1)] tabular-nums max-w-full"
          >
            <span className="w-4 h-4 rounded-full bg-[#8E3E27] text-white grid place-items-center shrink-0">
              <IconCheck size={11} />
            </span>
            <span className="truncate">{t.msg}</span>
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

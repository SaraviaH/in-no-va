import { useState, useRef, useEffect } from "react";
import { Button } from "./Button";
import type { Product, ChatMessage } from "../types/product";
import { api } from "../services/api";
import { resolveImage, onImageError } from "../utils/image";
import { images } from "../assets/images";

export function AiBubble({
  open,
  onToggle,
  onViewProduct,
  onAddToCart,
  initialQuery,
  onClearInitialQuery,
}: {
  open: boolean;
  onToggle: () => void;
  onViewProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  initialQuery?: string | null;
  onClearInitialQuery?: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "m1",
      role: "assistant",
      text: "¡Hola! Soy Kotton AI. ¿Qué prenda o tela buscas confeccionar hoy? Cuéntame tu proyecto y te ayudo a evaluar opciones según su tejido y características.",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const send = async (text: string) => {
    const cleanText = text.trim().slice(0, 250);
    if (!cleanText) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).slice(2),
      role: "user",
      text: cleanText,
      timestamp: Date.now(),
    };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setLoading(true);

    const result = await api.queryAssistant(cleanText);
    const botMsg: ChatMessage = {
      id: Math.random().toString(36).slice(2),
      role: "assistant",
      text: result.text,
      products: result.products,
      detectedIntent: result.detectedIntent,
      matchedAttributes: result.matchedAttributes,
      timestamp: Date.now(),
    };
    setMessages(m => [...m, botMsg]);
    setLoading(false);
  };

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // Manejo de consulta contextual cuando el usuario pulsa "Consultar con IA ✦" desde la ficha de un producto
  useEffect(() => {
    if (initialQuery && open) {
      const timer = setTimeout(() => {
        send(initialQuery);
        onClearInitialQuery?.();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [initialQuery, open, onClearInitialQuery]);

  const suggestions = [
    "Enterizo recién nacido",
    "Tela que estire para buzo",
    "Tela fresca de verano",
    "Pijamería",
  ];

  return (
    <>
      <button
        onClick={onToggle}
        aria-label="Abrir Kotton AI"
        className={`fixed right-[18px] bottom-[18px] z-[45] w-[58px] h-[58px] rounded-full border cursor-pointer grid place-items-center text-[22px] shadow-[0_16px_36px_rgba(26,46,42,0.22)] transition-all hover:scale-[1.03] active:scale-[0.98] ${open ? "bg-white text-[#1A2E2A] border-[#DDD2BB]" : "bg-[#1A2E2A] text-white border-[#1A2E2A] hover:bg-[#23433E]"}`}
      >
        {open ? "✕" : "✦"}
        {!open && <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#2FEAA1] border-2 border-white shadow-[0_0_0_6px_rgba(47,234,161,0.2)]" />}
      </button>

      {open && (
        <div className="fixed right-[18px] bottom-[86px] z-[45] w-[min(380px,calc(100%-24px))] h-[min(560px,calc(100dvh-110px))] bg-[#FFFBF5] rounded-[22px] border border-[#DDD2BB] shadow-[0_22px_48px_rgba(26,46,42,0.22)] overflow-hidden flex flex-col animate-[fadeIn_0.18s_ease]">
          <div className="bg-[#1A2E2A] text-white px-3.5 py-3.5 flex items-center gap-2.5">
            <img src={images.ui.aiAvatar} alt="Kotton AI" onError={onImageError} className="w-9 h-9 rounded-full border border-white/20 bg-white object-cover shrink-0" />
            <div>
              <div className="font-extrabold text-sm flex items-center gap-1.5">Kotton AI <span className="w-2 h-2 rounded-full bg-[#2FEAA1] shadow-[0_0_0_5px_rgba(47,234,161,0.18)] animate-pulse inline-block" /></div>
              <div className="text-[11px] opacity-80">Asistente textil · en línea</div>
            </div>
            <button onClick={onToggle} className="ml-auto w-8 h-8 rounded-full border border-white/20 bg-white/10 text-white grid place-items-center cursor-pointer hover:bg-white/20 transition-colors">✕</button>
          </div>

          <div ref={listRef} className="flex-1 overflow-auto p-3 flex flex-col gap-2.5 bg-[#F5EFE2]">
            {messages.map(m => (
              <div key={m.id} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`max-w-[85%] px-3 py-2.5 text-[13px] leading-relaxed shadow-sm border ${m.role === "user" ? "bg-[#9E4D2E] text-white border-[#9E4D2E] rounded-[18px_18px_4px_18px]" : "bg-white text-[#1A2E2A] border-[#DDD2BB] rounded-[18px_18px_18px_4px]"}`}>
                  {m.detectedIntent && m.detectedIntent !== "Consulta no clasificada" && (
                    <div className="text-[10px] tracking-wider uppercase font-extrabold text-[#9E4D2E] mb-1 flex items-center gap-1">
                      <span>✦ {m.detectedIntent}</span>
                    </div>
                  )}
                  <div>{m.text}</div>
                  {m.matchedAttributes && m.matchedAttributes.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5 pt-1.5 border-t border-[#DDD2BB]/60">
                      {m.matchedAttributes.map(att => (
                        <span key={att} className="text-[10px] bg-[#F5EFE2] text-[#6B6560] px-1.5 py-0.5 rounded-md font-semibold">
                          {att}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {m.products && m.products.length > 0 && (
                  <div className="flex flex-col gap-2 mt-2 w-full">
                    {m.products.map(p => (
                      <div key={p.id} className="bg-white border border-[#DDD2BB] rounded-xl p-2 flex gap-2 items-center shadow-sm">
                        <img src={resolveImage(p.imagenes[0])} alt={p.nombre} onError={onImageError} className="w-[52px] h-[52px] rounded-lg object-cover border border-[#DDD2BB] shrink-0 bg-white" />
                        <div className="flex-1 min-w-0">
                          <div className="font-extrabold text-xs truncate text-[#1A2E2A]">{p.nombre}</div>
                          <div className="text-[11px] text-[#6B6560] truncate">{p.tipoTejido || p.tipo}{p.gramaje ? ` · ${p.gramaje}` : ""} · S/ {p.precioReferencial.toFixed(2)}</div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <button onClick={() => onViewProduct(p)} className="text-[11px] font-extrabold bg-white border border-[#DDD2BB] rounded-full px-2.5 py-1 cursor-pointer hover:bg-[#F5EFE2] transition-colors text-[#1A2E2A]">Ver</button>
                          <button onClick={() => onAddToCart(p)} className="text-[11px] font-extrabold bg-[#9E4D2E] text-white border border-[#9E4D2E] rounded-full px-2.5 py-1 cursor-pointer hover:bg-[#864128] transition-colors">Añadir</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="bg-white border border-[#DDD2BB] rounded-[18px_18px_18px_4px] px-3 py-2.5 text-[13px] w-fit shadow-sm flex items-center gap-1.5">
                <span className="inline-flex gap-1"><span className="animate-[pulseDot_1s_infinite]">●</span><span className="animate-[pulseDot_1s_0.2s_infinite]">●</span><span className="animate-[pulseDot_1s_0.4s_infinite]">●</span></span> Kotton AI está evaluando opciones...
              </div>
            )}
          </div>

          <div className="px-2.5 py-2 flex gap-1.5 flex-wrap border-t border-[#DDD2BB] bg-[#FFFBF5]">
            {suggestions.map(s => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-[11px] font-bold bg-[#F5EFE2] border border-[#DDD2BB] rounded-full px-2.5 py-1.5 cursor-pointer hover:bg-white hover:border-[#C9B99A] transition-colors text-[#2E2A24]"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="p-2.5 flex gap-2 border-t border-[#DDD2BB] bg-[#FFFBF5]">
            <input
              value={input}
              maxLength={250}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send(input)}
              placeholder="Escribe lo que necesitas..."
              className="flex-1 border border-[#DDD2BB] rounded-full px-3.5 py-2.5 outline-none text-[13px] bg-[#F5EFE2] placeholder:text-[#9A958F] focus:border-[#C9B99A] focus:bg-white transition-colors"
            />
            <Button variant="primary" size="sm" onClick={() => send(input)} disabled={!input.trim()} className="shrink-0 disabled:opacity-50">
              Enviar ↑
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

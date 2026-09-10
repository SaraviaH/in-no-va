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
}: {
  open: boolean;
  onToggle: () => void;
  onViewProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "m1", role: "assistant", text: "¡Hola! Soy Kotton AI. ¿Qué tipo de tela estás buscando hoy? Cuéntame tu proyecto y te ayudo a elegir.", timestamp: Date.now() },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const suggestions = ["Quiero una tela fresca", "Necesito tela para un vestido", "Ayúdame a elegir", "Ver telas recomendadas"];

  const send = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: Math.random().toString(36).slice(2), role: "user", text, timestamp: Date.now() };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setLoading(true);
    const products = await api.getRecommendations(text);
    const assistantText =
      text.toLowerCase().includes("fresca")
        ? "Para una prenda fresca te recomiendo estas opciones livianas y transpirables:"
        : text.toLowerCase().includes("vestido")
          ? "Para vestido te sugiero telas con buena caída y textura elegante:"
          : "Estas opciones combinan muy bien con lo que buscas:";
    const botMsg: ChatMessage = { id: Math.random().toString(36).slice(2), role: "assistant", text: assistantText, products, timestamp: Date.now() };
    setMessages(m => [...m, botMsg]);
    setLoading(false);
  };

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
                <div className={`max-w-[82%] px-3 py-2.5 text-[13px] leading-relaxed shadow-sm border ${m.role === "user" ? "bg-[#9E4D2E] text-white border-[#9E4D2E] rounded-[18px_18px_4px_18px]" : "bg-white text-[#1A2E2A] border-[#DDD2BB] rounded-[18px_18px_18px_4px]"}`}>
                  {m.text}
                </div>

                {m.products && (
                  <div className="flex flex-col gap-2 mt-2 w-full">
                    {m.products.map(p => (
                      <div key={p.id} className="bg-white border border-[#DDD2BB] rounded-xl p-2 flex gap-2 items-center shadow-sm">
                        <img src={resolveImage(p.imagenes[0])} alt={p.nombre} onError={onImageError} className="w-[52px] h-[52px] rounded-lg object-cover border border-[#DDD2BB] shrink-0 bg-white" />
                        <div className="flex-1 min-w-0">
                          <div className="font-extrabold text-xs truncate text-[#1A2E2A]">{p.nombre}</div>
                          <div className="text-[11px] text-[#6B6560]">{p.tipo} · S/ {p.precioReferencial.toFixed(2)}</div>
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
                <span className="inline-flex gap-1"><span className="animate-[pulseDot_1s_infinite]">●</span><span className="animate-[pulseDot_1s_0.2s_infinite]">●</span><span className="animate-[pulseDot_1s_0.4s_infinite]">●</span></span> Kotton AI está pensando...
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

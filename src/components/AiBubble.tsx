import { useState, useRef, useEffect } from "react";
import { Button } from "./Button";
import type { Product, ChatMessage } from "../types/product";
import { api } from "../services/api";

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
    { id: "m1", role: "assistant", text: "Hola, soy Kotton AI. ¿Qué tipo de tela estás buscando?", timestamp: Date.now() },
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
      {/* bubble button */}
      <button
        onClick={onToggle}
        aria-label="Abrir Kotton AI"
        style={{
          position: "fixed",
          right: 18,
          bottom: 18,
          zIndex: 45,
          width: 58,
          height: 58,
          borderRadius: 999,
          border: "1px solid var(--color-border)",
          background: open ? "#fff" : "var(--color-secondary)",
          color: open ? "var(--color-text)" : "#fff",
          boxShadow: "var(--shadow-float)",
          cursor: "pointer",
          display: "grid",
          placeItems: "center",
          fontSize: 22,
        }}
      >
        {open ? "✕" : "✦"}
        {!open && <span style={{ position: "absolute", top: -2, right: -2, width: 14, height: 14, borderRadius: 999, background: "#2FEAA1", border: "2px solid #fff", boxShadow: "0 0 0 6px rgba(47,234,161,.2)" }} />}
      </button>

      {/* chat window */}
      {open && (
        <div
          style={{
            position: "fixed",
            right: 18,
            bottom: 86,
            zIndex: 45,
            width: "min(380px, calc(100% - 24px))",
            height: "min(560px, calc(100dvh - 110px))",
            background: "#fff",
            borderRadius: 22,
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-float)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* header */}
          <div style={{ background: "var(--color-secondary)", color: "#fff", padding: "14px 14px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 36, height: 36, borderRadius: 999, background: "#fff", color: "var(--color-secondary)", display: "grid", placeItems: "center", fontWeight: 900 }}>✦</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>Kotton AI <span className="badge-dot" /></div>
              <div style={{ fontSize: 11, opacity: .85 }}>Asistente textil · en línea</div>
            </div>
            <button onClick={onToggle} style={{ marginLeft: "auto", width: 30, height: 30, borderRadius: 999, border: "1px solid rgba(255,255,255,.3)", background: "rgba(255,255,255,.15)", color: "#fff", cursor: "pointer" }}>✕</button>
          </div>

          {/* messages */}
          <div ref={listRef} style={{ flex: 1, overflow: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 10, background: "#FFFBF5" }}>
            {messages.map(m => (
              <div key={m.id} style={{ display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div
                  style={{
                    maxWidth: "82%",
                    background: m.role === "user" ? "var(--color-primary)" : "#fff",
                    color: m.role === "user" ? "#fff" : "var(--color-text)",
                    border: m.role === "assistant" ? "1px solid var(--color-border)" : "1px solid var(--color-primary)",
                    borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    padding: "10px 12px",
                    fontSize: 13,
                    lineHeight: 1.5,
                    boxShadow: "var(--shadow-soft)",
                  }}
                >
                  {m.text}
                </div>

                {m.products && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8, width: "100%" }}>
                    {m.products.map(p => (
                      <div key={p.id} style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: 14, padding: 8, display: "flex", gap: 8, alignItems: "center" }}>
                        <img src={p.imagenes[0]} alt={p.nombre} style={{ width: 52, height: 52, borderRadius: 10, objectFit: "cover" }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 800, fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.nombre}</div>
                          <div style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>{p.tipo} · S/ {p.precioReferencial.toFixed(2)}</div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          <button onClick={() => onViewProduct(p)} style={{ fontSize: 11, fontWeight: 800, background: "#fff", border: "1px solid var(--color-border)", borderRadius: 999, padding: "6px 8px", cursor: "pointer" }}>Ver</button>
                          <button onClick={() => onAddToCart(p)} style={{ fontSize: 11, fontWeight: 800, background: "var(--color-primary)", color: "#fff", border: "1px solid var(--color-primary)", borderRadius: 999, padding: "6px 8px", cursor: "pointer" }}>Añadir</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "18px 18px 18px 4px", padding: "10px 12px", fontSize: 13, width: "fit-content" }}>
                <span style={{ display: "inline-flex", gap: 4 }}><span style={{ animation: "pulseDot 1s infinite" }}>●</span><span style={{ animation: "pulseDot 1s .2s infinite" }}>●</span><span style={{ animation: "pulseDot 1s .4s infinite" }}>●</span></span> Kotton AI está pensando...
              </div>
            )}
          </div>

          {/* suggestions */}
          <div style={{ padding: "8px 10px", display: "flex", gap: 6, flexWrap: "wrap", borderTop: "1px solid var(--color-border)", background: "#fff" }}>
            {suggestions.map(s => (
              <button
                key={s}
                onClick={() => send(s)}
                style={{ fontSize: 11, fontWeight: 700, background: "var(--color-background)", border: "1px solid var(--color-border)", borderRadius: 999, padding: "6px 10px", cursor: "pointer" }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* input */}
          <div style={{ padding: 10, display: "flex", gap: 8, borderTop: "1px solid var(--color-border)", background: "#fff" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send(input)}
              placeholder="Escribe lo que necesitas..."
              style={{ flex: 1, border: "1px solid var(--color-border)", borderRadius: 999, padding: "10px 14px", outline: "none", fontSize: 13, background: "var(--color-background)" }}
            />
            <Button variant="primary" size="sm" onClick={() => send(input)} disabled={!input.trim()} style={{ opacity: !input.trim() ? .5 : 1 }}>
              Enviar ↑
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

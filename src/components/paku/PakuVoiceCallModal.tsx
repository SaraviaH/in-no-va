import { useState, useEffect } from "react";
import type { Product, ChatMessage } from "../../types/product";
import { resolveImage, onImageError } from "../../utils/image";
import { PakuSprite, type PakuActivity } from "./PakuSprite";
import {
  IconClose,
  IconMic,
  IconMicOff,
  IconPhoneOff,
  IconSparkles,
  IconVolume,
  IconVolumeMute,
} from "../Icons";
import type { useVoiceAssistant } from "../../hooks/useVoiceAssistant";

export interface PakuVoiceCallModalProps {
  open: boolean;
  onClose: () => void;
  voice: ReturnType<typeof useVoiceAssistant>;
  messages: ChatMessage[];
  loading: boolean;
  onSendQuery: (text: string) => void;
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const TEST_PROMPTS = [
  "Muéstrame telas de algodón premium",
  "Algodón franela para casacas",
  "Lino rústico lavado",
  "Jersey gamuza suave",
];

export function PakuVoiceCallModal({
  open,
  onClose,
  voice,
  messages,
  loading,
  onSendQuery,
  onViewProduct,
  onAddToCart,
}: PakuVoiceCallModalProps) {
  const [callDuration, setCallDuration] = useState(0);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [prevAssistantMsgId, setPrevAssistantMsgId] = useState<string | undefined>(undefined);

  // Timer de duración de llamada
  useEffect(() => {
    if (!open) return;
    const startTime = Date.now();
    const timer = setInterval(() => {
      setCallDuration(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [open]);

  // Al abrir la llamada, encender el modo de voz y activar escucha si STT está disponible
  useEffect(() => {
    if (open) {
      if (!voice.voiceModeEnabled) {
        voice.setVoiceModeEnabled(true);
      }
      if (voice.isSttSupported && voice.status === "idle") {
        voice.startListening();
      }
    } else {
      voice.stopSpeaking();
      voice.stopListening();
    }
  }, [open, voice]);

  // Obtener último mensaje de usuario y de asistente
  const lastUserMsg = [...messages].reverse().find(m => m.role === "user");
  const lastAssistantMsg = [...messages].reverse().find(m => m.role === "assistant");
  const callProducts = lastAssistantMsg?.products ?? [];

  // Ajustar índice de producto seleccionado al cambiar de mensaje
  if (lastAssistantMsg?.id !== prevAssistantMsgId) {
    setPrevAssistantMsgId(lastAssistantMsg?.id);
    setActiveProductIndex(0);
  }

  const handleEndCall = () => {
    voice.stopSpeaking();
    voice.stopListening();
    onClose();
  };

  if (!open) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const isSpeaking = voice.status === "speaking";
  const isListening = voice.status === "listening";
  const isProcessing = loading || voice.status === "processing";

  let pakuActivity: PakuActivity = "idle";
  if (isSpeaking) {
    pakuActivity = "speaking";
  } else if (isListening) {
    pakuActivity = "listening";
  } else if (isProcessing) {
    pakuActivity = "thinking";
  }

  const activeProduct = callProducts[activeProductIndex];
  const userSpeechText = voice.interimTranscript || lastUserMsg?.text;
  const assistantReplyText =
    lastAssistantMsg?.text ||
    "¡Hola! Soy Paku. Te escucho por voz. ¿Qué tela o prenda estás buscando confeccionar?";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Llamada de voz interactiva con Paku"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
    >
      <div className="relative w-full max-w-[460px] max-h-[92vh] flex flex-col bg-[#FAF8F5] border border-[#E6E0D6] rounded-3xl shadow-2xl overflow-hidden text-[#171614]">
        {/* Cabecera de la llamada */}
        <div className="bg-[#1C332D] text-white px-5 py-3.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <div>
              <h2 className="text-[13px] font-bold tracking-wide flex items-center gap-1.5">
                <span>Llamada de Voz con Paku</span>
                <span className="text-[10px] font-normal px-1.5 py-0.2 rounded-full bg-white/20 text-[#FAF8F5]">
                  AI Live
                </span>
              </h2>
              <p className="text-[11px] text-white/70 font-mono">
                {formatTime(callDuration)} · Asesor Textil Kotton
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={voice.toggleMute}
              title={voice.isMuted ? "Activar altavoz de Paku" : "Silenciar voz de Paku"}
              className={`p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ${
                voice.isMuted ? "text-amber-300" : ""
              }`}
            >
              {voice.isMuted ? <IconVolumeMute size={17} /> : <IconVolume size={17} />}
            </button>
            <button
              type="button"
              onClick={handleEndCall}
              aria-label="Cerrar llamada"
              className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <IconClose size={18} />
            </button>
          </div>
        </div>

        {/* Cuerpo scrollable de la llamada */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* Escenario central: Burbuja circular animada */}
          <div className="flex flex-col items-center justify-center pt-2 pb-1 relative">
            {/* Anillos de ondas expansivas de llamada */}
            {(isListening || isSpeaking) && (
              <>
                <div
                  className="absolute w-44 h-44 rounded-full border-2 border-[#8E3E27]/30 animate-[callRipple_2.4s_infinite] pointer-events-none"
                  style={{ animationDelay: "0s" }}
                />
                <div
                  className="absolute w-44 h-44 rounded-full border-2 border-[#1C332D]/25 animate-[callRipple_2.4s_infinite] pointer-events-none"
                  style={{ animationDelay: "0.8s" }}
                />
                <div
                  className="absolute w-44 h-44 rounded-full border-2 border-[#8E3E27]/20 animate-[callRipple_2.4s_infinite] pointer-events-none"
                  style={{ animationDelay: "1.6s" }}
                />
              </>
            )}

            {/* Orbe circular principal de la llamada */}
            <div
              className={`relative z-10 w-36 h-36 sm:w-40 sm:h-40 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                isSpeaking
                  ? "bg-gradient-to-b from-[#F7EFE9] to-[#EAE0D5] border-4 border-[#8E3E27] shadow-[#8E3E27]/25 animate-[callPulse_1.8s_infinite]"
                  : isListening
                    ? "bg-gradient-to-b from-[#EBF2EE] to-[#DDE8E1] border-4 border-[#1C332D] shadow-[#1C332D]/25 animate-[callPulse_1.4s_infinite]"
                    : isProcessing
                      ? "bg-gradient-to-b from-[#FDF6E2] to-[#F7EAC7] border-4 border-[#C89B3C] shadow-[#C89B3C]/20 animate-pulse"
                      : "bg-[#F3EFEA] border-4 border-[#D1C9BC] shadow-sm"
              }`}
            >
              {/* Sprite animado de Paku dentro del orbe */}
              <div className="w-28 h-28 flex items-center justify-center overflow-hidden">
                <PakuSprite activity={pakuActivity} className="w-full h-full object-contain" />
              </div>

              {/* Pequeña insignia de estado en el borde inferior del orbe */}
              <div className="absolute -bottom-2.5 px-3 py-0.5 rounded-full text-[10px] font-bold tracking-wide shadow-xs bg-[#171614] text-white flex items-center gap-1.5">
                {isSpeaking ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-[#8E3E27] animate-ping" />
                    <span>Paku hablando...</span>
                  </>
                ) : isListening ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Escuchando...</span>
                  </>
                ) : isProcessing ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    <span>Pensando...</span>
                  </>
                ) : (
                  <span>Listo para hablar</span>
                )}
              </div>
            </div>

            {/* Ecualizador de barras sonoras animadas */}
            <div className="flex items-center gap-1.5 mt-5 h-6">
              {[0, 1, 2, 3, 4].map(idx => (
                <span
                  key={idx}
                  className={`w-1 rounded-full transition-all duration-200 ${
                    isSpeaking
                      ? "bg-[#8E3E27] animate-[eqBar_0.8s_ease-in-out_infinite]"
                      : isListening
                        ? "bg-[#1C332D] animate-[eqBar_0.6s_ease-in-out_infinite]"
                        : "bg-[#D1C9BC] h-2"
                  }`}
                  style={{
                    animationDelay: `${idx * 0.15}s`,
                    height: isSpeaking || isListening ? undefined : "6px",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Diálogo en vivo: Transcripción del usuario y respuesta de Paku */}
          <div className="space-y-2">
            {userSpeechText && (
              <div className="bg-white/80 border border-[#E6E0D6] rounded-2xl p-3 text-[12px] text-[#171614] shadow-2xs">
                <div className="text-[10px] uppercase font-bold text-[#8E3E27] tracking-wider mb-0.5 flex items-center gap-1">
                  <IconMic size={11} />
                  <span>Dijiste:</span>
                </div>
                <p className="italic text-[#33312E]">«{userSpeechText}»</p>
              </div>
            )}

            <div className="bg-[#FAF4EE] border border-[#ECD9CE] rounded-2xl p-3.5 text-[12.5px] text-[#171614] shadow-2xs">
              <div className="text-[10px] uppercase font-bold text-[#1C332D] tracking-wider mb-1 flex items-center gap-1">
                <IconSparkles size={11} />
                <span>Paku Asesor:</span>
              </div>
              <p className="leading-relaxed">{assistantReplyText}</p>
            </div>
          </div>

          {/* Ficha técnica o modal de producto recomendado en vivo */}
          {activeProduct && (
            <div className="bg-white border-2 border-[#8E3E27]/30 rounded-2xl p-3 shadow-md animate-[fadeIn_0.25s_ease-out]">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F0EBE3]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#8E3E27]" />
                  <span className="text-[11px] font-bold text-[#8E3E27] uppercase tracking-wider">
                    Ficha Técnica Recomendada
                  </span>
                </div>
                {callProducts.length > 1 && (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveProductIndex(prev =>
                          prev > 0 ? prev - 1 : callProducts.length - 1
                        )
                      }
                      className="w-5 h-5 rounded bg-[#FAF8F5] border border-[#D1C9BC] text-[10px] font-bold text-[#171614] flex items-center justify-center cursor-pointer hover:bg-[#EAE4DC]"
                      aria-label="Producto anterior"
                    >
                      ‹
                    </button>
                    <span className="text-[10px] font-mono text-[#5C5852] px-1">
                      {activeProductIndex + 1}/{callProducts.length}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveProductIndex(prev =>
                          prev < callProducts.length - 1 ? prev + 1 : 0
                        )
                      }
                      className="w-5 h-5 rounded bg-[#FAF8F5] border border-[#D1C9BC] text-[10px] font-bold text-[#171614] flex items-center justify-center cursor-pointer hover:bg-[#EAE4DC]"
                      aria-label="Producto siguiente"
                    >
                      ›
                    </button>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <div className="w-16 h-20 rounded-xl overflow-hidden bg-[#FAF8F5] border border-[#E6E0D6] shrink-0">
                  <img
                    src={resolveImage(activeProduct.imagenes[0])}
                    alt={activeProduct.nombre}
                    onError={onImageError}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-[13px] font-bold text-[#171614] leading-tight truncate">
                    {activeProduct.nombre}
                  </h4>
                  <p className="text-[11px] text-[#5C5852] mt-0.5 line-clamp-1">
                    {activeProduct.material}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {activeProduct.gramaje && (
                      <span className="px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-[#E6E0D6] text-[10px] text-[#171614] font-medium">
                        {activeProduct.gramaje}
                      </span>
                    )}
                    <span className="px-1.5 py-0.5 rounded bg-[#EBF2EE] text-[#1C332D] text-[10px] font-bold">
                      S/ {activeProduct.precioReferencial.toFixed(2)}/m
                    </span>
                  </div>

                  {/* Acciones para ver modal o cotizar */}
                  <div className="flex items-center gap-2 mt-2.5">
                    <button
                      type="button"
                      onClick={() => onViewProduct(activeProduct)}
                      className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#8E3E27] hover:bg-[#74311E] text-white text-[11px] font-bold transition-colors cursor-pointer text-center"
                    >
                      Ver ficha completa
                    </button>
                    <button
                      type="button"
                      onClick={() => onAddToCart(activeProduct)}
                      className="py-1.5 px-2.5 rounded-lg bg-[#1C332D] hover:bg-[#152722] text-white text-[11px] font-bold transition-colors cursor-pointer"
                    >
                      + Cotizar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sugerencias de prueba rápida de voz */}
          <div className="pt-1">
            <p className="text-[10px] uppercase font-bold text-[#5C5852] tracking-wider mb-1.5">
              Temas de prueba rápida:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {TEST_PROMPTS.map(prompt => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => onSendQuery(prompt)}
                  disabled={isProcessing}
                  className="text-[11px] font-medium bg-white border border-[#D1C9BC] hover:border-[#8E3E27] hover:text-[#8E3E27] rounded-full px-2.5 py-1 text-[#171614] transition-colors cursor-pointer disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Barra inferior de controles de la llamada */}
        <div className="bg-[#FAF8F5] border-t border-[#E6E0D6] px-5 py-3.5 flex items-center justify-around">
          {/* Botón Silenciar / Desilenciar Micrófono */}
          <button
            type="button"
            onClick={() => {
              if (voice.status === "listening") {
                voice.stopListening();
              } else {
                voice.startListening();
              }
            }}
            title={
              voice.status === "listening"
                ? "Pausar escucha de micrófono"
                : "Activar micrófono para hablar"
            }
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
              voice.status === "listening"
                ? "text-[#8E3E27]"
                : "text-[#5C5852] hover:text-[#171614]"
            }`}
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center border shadow-xs transition-colors ${
                voice.status === "listening"
                  ? "bg-[#8E3E27] text-white border-[#8E3E27]"
                  : "bg-white text-[#171614] border-[#D1C9BC]"
              }`}
            >
              {voice.status === "listening" ? <IconMic size={20} /> : <IconMicOff size={20} />}
            </div>
            <span className="text-[10px] font-bold">
              {voice.status === "listening" ? "Escuchando" : "Hablar"}
            </span>
          </button>

          {/* Botón Colgar / Finalizar Llamada */}
          <button
            type="button"
            onClick={handleEndCall}
            aria-label="Finalizar llamada de voz"
            className="flex flex-col items-center gap-1 group cursor-pointer"
          >
            <div className="w-13 h-13 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-all">
              <IconPhoneOff size={24} />
            </div>
            <span className="text-[10px] font-bold text-red-600">Finalizar</span>
          </button>
        </div>
      </div>
    </div>
  );
}

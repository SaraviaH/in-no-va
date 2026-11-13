import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "./Button";
import type {
  Product,
  ChatMessage,
  AssistantAction,
  AssistantNavigationContext,
} from "../types/product";
import { api, validateAssistantAction } from "../services/api";
import { useVoiceAssistant, type VoiceStatus } from "../hooks/useVoiceAssistant";
import { PakuSprite, type PakuActivity, type PakuReaction } from "./paku/PakuSprite";
import { PakuProductDeck } from "./paku/PakuProductDeck";
import { PakuVoiceCallModal } from "./paku/PakuVoiceCallModal";
import { usePakuRoaming } from "./paku/usePakuRoaming";
import {
  IconCheck,
  IconClose,
  IconCompass,
  IconMic,
  IconMicOff,
  IconPause,
  IconPhone,
  IconPlay,
  IconSend,
  IconSparkles,
  IconStop,
  IconVolume,
  IconVolumeMute,
} from "./Icons";

const SECTION_LABELS: Record<string, string> = {
  inicio: "Inicio",
  categorias: "Fibras",
  catalogo: "Catálogo",
  "asesor-ia": "Asesor IA",
  "como-funciona": "Proceso",
  nosotros: "Atelier",
  beneficios: "Estándares",
  contacto: "Contacto",
};

const VOICE_STATUS_META: Record<
  VoiceStatus,
  { label: string; sublabel: string; badgeClass: string; dotClass: string }
> = {
  idle: {
    label: "Inactivo",
    sublabel: "Pulsa el micrófono para dictar una consulta u orden de navegación",
    badgeClass: "bg-[#FAF8F5] text-[#171614] border-[#D1C9BC]",
    dotClass: "bg-[#5C5852]",
  },
  listening: {
    label: "Escuchando",
    sublabel: "Habla ahora · Transcribiendo tu voz a texto...",
    badgeClass: "bg-[#F9ECE8] text-[#74311E] border-[#E6C5BA]",
    dotClass: "bg-[#8E3E27] animate-[pulseSubtle_0.9s_infinite]",
  },
  processing: {
    label: "Procesando",
    sublabel: "Interpretando intención textil y acción de navegación...",
    badgeClass: "bg-[#FBF3E4] text-[#6E4F10] border-[#E8D5B0]",
    dotClass: "bg-[#9A7228] animate-[pulseSubtle_0.9s_infinite]",
  },
  speaking: {
    label: "Respondiendo",
    sublabel: "Reproduciendo respuesta hablada (Web Speech TTS)",
    badgeClass: "bg-[#EBF2EE] text-[#1C332D] border-[#C8DBD0]",
    dotClass: "bg-[#23533D] animate-[pulseSubtle_0.9s_infinite]",
  },
  error: {
    label: "Error de micrófono",
    sublabel: "Verifica los permisos de micrófono del navegador",
    badgeClass: "bg-[#F9ECE8] text-[#74311E] border-[#E6C5BA]",
    dotClass: "bg-[#8E3E27]",
  },
  unsupported: {
    label: "Sin compatibilidad STT",
    sublabel: "Este navegador no incluye reconocimiento de voz nativo; usa órdenes rápidas o texto",
    badgeClass: "bg-[#FBF3E4] text-[#6E4F10] border-[#E8D5B0]",
    dotClass: "bg-[#9A7228]",
  },
};

export function AiBubble({
  open,
  covered,
  browsing,
  reaction,
  onReact,
  onToggle,
  onViewProduct,
  onAddToCart,
  initialQuery,
  onClearInitialQuery,
  navigationContext,
  onExecuteAction,
}: {
  open: boolean;
  covered: boolean;
  browsing: boolean;
  reaction: PakuReaction | null;
  onReact: (pose: PakuReaction["pose"]) => void;
  onToggle: () => void;
  onViewProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  initialQuery?: string | null;
  onClearInitialQuery?: () => void;
  navigationContext?: AssistantNavigationContext;
  onExecuteAction?: (action: AssistantAction) => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "m1",
      role: "assistant",
      text: "¡Hola! Soy Paku, el asesor textil de Kotton. Cuéntame qué prenda quieres confeccionar o pídeme ver telas, buscar en el catálogo o abrir tu cotización.",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmedMsgIds, setConfirmedMsgIds] = useState<Record<string, "confirmed" | "cancelled">>({});
  const [isCallOpen, setIsCallOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const roamingRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef(navigationContext);
  const panelVisible = open && !covered;
  const roaming = usePakuRoaming(roamingRef, !open && !covered && !isCallOpen, reaction);
  const launcherReaction = reaction && reaction.createdAt >= (roaming.attention?.createdAt ?? 0)
    ? reaction
    : roaming.attention;

  useEffect(() => {
    contextRef.current = navigationContext;
  }, [navigationContext]);

  const sendRef = useRef<(text: string, fromVoice?: boolean) => Promise<void>>(async () => {});

  const voice = useVoiceAssistant({
    onFinalTranscript: transcript => {
      void sendRef.current(transcript, true);
    },
  });

  const executeValidatedActions = useCallback(
    (actions?: AssistantAction[]) => {
      if (!actions || !onExecuteAction) return;
      for (const action of actions) {
        if (validateAssistantAction(action) && !("requiresConfirmation" in action && action.requiresConfirmation)) {
          onExecuteAction(action);
        }
      }
    },
    [onExecuteAction]
  );

  const send = useCallback(
    async (text: string, fromVoice = false) => {
      const cleanText = text.trim().slice(0, 250);
      if (!cleanText) return;

      const userMsg: ChatMessage = {
        id: Math.random().toString(36).slice(2),
        role: "user",
        text: cleanText,
        timestamp: Date.now(),
        fromVoice,
      };
      setMessages(m => [...m, userMsg]);
      setInput("");
      setLoading(true);
      if (fromVoice || voice.voiceModeEnabled) {
        voice.setStatus("processing");
      }

      const result = await api.queryAssistant(cleanText, contextRef.current);
      const botId = Math.random().toString(36).slice(2);
      const botMsg: ChatMessage = {
        id: botId,
        role: "assistant",
        text: result.text,
        products: result.products,
        detectedIntent: result.detectedIntent,
        matchedAttributes: result.matchedAttributes,
        actions: result.actions,
        pendingConfirmationAction: result.pendingConfirmationAction,
        timestamp: Date.now(),
      };
      setMessages(m => [...m, botMsg]);
      setLoading(false);

      // Ejecutar acciones autorizadas de navegación que no requieran confirmación manual
      executeValidatedActions(result.actions);

      // Si vino por voz o el modo de voz está activo, sintetizar respuesta hablada
      if ((fromVoice || voice.voiceModeEnabled) && !voice.isMuted) {
        voice.speak(result.text, botId);
      } else if (voice.status === "processing") {
        voice.setStatus(voice.isSttSupported ? "idle" : "unsupported");
      }
    },
    [executeValidatedActions, voice]
  );

  useEffect(() => {
    sendRef.current = send;
  }, [send]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, voice.interimTranscript]);

  useEffect(() => {
    if (initialQuery && panelVisible) {
      const timer = setTimeout(() => {
        void send(initialQuery, false);
        onClearInitialQuery?.();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [initialQuery, panelVisible, onClearInitialQuery, send]);

  const closePanel = useCallback(() => {
    onToggle();
    setTimeout(() => {
      launcherRef.current?.focus({ preventScroll: true });
    }, 50);
  }, [onToggle]);

  useEffect(() => {
    if (panelVisible) panelRef.current?.focus({ preventScroll: true });
  }, [panelVisible]);

  useEffect(() => {
    if (!panelVisible) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [panelVisible, closePanel]);

  const handleConfirmPendingAction = (msgId: string, action: AssistantAction) => {
    if (!validateAssistantAction(action)) return;
    setConfirmedMsgIds(prev => ({ ...prev, [msgId]: "confirmed" }));
    onExecuteAction?.(action);
  };

  const handleCancelPendingAction = (msgId: string) => {
    setConfirmedMsgIds(prev => ({ ...prev, [msgId]: "cancelled" }));
  };

  const suggestions = navigationContext?.activeProduct
    ? [
        "¿Qué telas similares tienes?",
        `Cotizar 5 metros de ${navigationContext.activeProduct.nombre}`,
        "Muéstrame el carrito",
        "Regresa al inicio",
      ]
    : [
        "Muéstrame las telas de algodón",
        "Busca telas para pijamas",
        "Quiero ver las telas de seda",
        "Muéstrame el carrito",
        "Regresa al inicio",
      ];

  const statusMeta = VOICE_STATUS_META[voice.status];
  const isListeningOrSpeaking = voice.status === "listening" || voice.status === "speaking";
  let pakuActivity: PakuActivity = messages.length > 1 ? "reply" : "idle";
  if (voice.status === "speaking" && !voice.isPaused) pakuActivity = "speaking";
  if (loading) pakuActivity = "thinking";
  if (voice.status === "listening") pakuActivity = "listening";

  if (covered) return null;

  return (
    <>
      {!open ? (
        <div
          key="mascot"
          ref={roamingRef}
          className="fixed right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 sm:right-6 sm:bottom-6"
        >
          <button
            ref={launcherRef}
            type="button"
            onClick={onToggle}
            onPointerEnter={event => {
              if (event.pointerType === "mouse") onReact("wave");
            }}
            onFocus={event => {
              if (event.currentTarget.matches(":focus-visible")) onReact("wave");
            }}
            aria-label="Conversar con Paku, asesor textil"
            aria-expanded={false}
            aria-haspopup="dialog"
            className="cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8E3E27] flex flex-col items-end gap-1.5 transition-transform duration-200 active:scale-95 group"
          >
            {/* Bocadillo interactivo visible en móvil y desktop */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E6E0D6] bg-white/95 backdrop-blur-xs px-3.5 py-1.5 text-xs font-semibold text-[#1C332D] shadow-[0_6px_20px_rgba(23,22,20,0.12)] group-hover:border-[#8E3E27]/50 transition-colors">
              <span>¡Hola! Soy Paku</span>
              <span className="hidden sm:inline text-[#8E3E27] font-normal">· ¿Te ayudo con tus telas?</span>
            </span>

            <PakuSprite
              activity={roaming.activity}
              ambient={roaming.activity === "idle"}
              browsing={browsing}
              reaction={launcherReaction}
              className="block h-[84px] w-auto sm:h-[120px] drop-shadow-[0_10px_22px_rgba(23,22,20,0.2)]"
            />
          </button>
        </div>
      ) : (
        <div
          key="chat"
          ref={panelRef}
          id="paku-panel"
          role="dialog"
          aria-label="Paku, asesor textil"
          tabIndex={-1}
          className="fixed left-3 right-3 sm:left-auto sm:right-6 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 sm:bottom-6 sm:w-[420px] max-w-[calc(100vw-24px)] h-[min(640px,calc(100dvh-2rem-env(safe-area-inset-bottom)))] bg-white rounded-[20px] border border-[#D1C9BC] shadow-[0_24px_56px_rgba(23,22,20,0.22)] overflow-hidden flex flex-col origin-bottom-right animate-[modalEnter_0.2s_cubic-bezier(0.16,1,0.3,1)]"
        >
          {/* Cabecera sobria de atelier con conmutador de Modo Voz */}
          <div className="bg-[#1C332D] text-[#FAF8F5] px-4 py-3 flex items-center gap-2.5 border-b border-white/10">
            <span className="flex h-12 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F3EFEA]">
              <PakuSprite activity={pakuActivity} reaction={reaction?.pose === "happy" ? reaction : null} className="block h-11 w-auto" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-[14px] leading-tight truncate">
                Paku · Asesor textil
              </div>
              <div className="text-[11px] text-[#D1C9BC] mt-0.5 truncate">
                Asesor técnico y control de muestrario
              </div>
            </div>

            <button
              type="button"
              onClick={voice.toggleVoiceMode}
              aria-pressed={voice.voiceModeEnabled}
              aria-label={voice.voiceModeEnabled ? "Desactivar modo de voz" : "Activar modo de voz"}
              className={`h-8 px-2.5 rounded-[8px] border text-[11px] font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors shrink-0 ${
                voice.voiceModeEnabled
                  ? "bg-[#8E3E27] text-white border-[#8E3E27]"
                  : "bg-white/10 text-[#FAF8F5] border-white/15 hover:bg-white/20"
              }`}
            >
              <IconMic size={13} />
              <span>{voice.voiceModeEnabled ? "Voz activa" : "Modo Voz"}</span>
            </button>

            <button
              type="button"
              onClick={closePanel}
              aria-label="Cerrar ventana de chat"
              className="w-8 h-8 rounded-[8px] border border-white/15 bg-white/10 text-white grid place-items-center cursor-pointer hover:bg-white/20 transition-colors shrink-0"
            >
              <IconClose size={16} />
            </button>
          </div>

          {/* Barra de Contexto de Navegación en Vivo */}
          {navigationContext && (
            <div className="px-3.5 py-1.5 bg-[#F3EFEA] border-b border-[#E6E0D6] flex items-center justify-between gap-2 text-[11px] text-[#5C5852] tabular-nums">
              <div className="flex items-center gap-1.5 min-w-0 truncate">
                <IconCompass size={13} className="text-[#8E3E27] shrink-0" />
                <span className="truncate">
                  {navigationContext.activeProduct ? (
                    <>
                      Ficha: <strong className="text-[#171614]">{navigationContext.activeProduct.nombre}</strong>
                    </>
                  ) : (
                    <>
                      Vista:{" "}
                      <strong className="text-[#171614]">
                        {SECTION_LABELS[navigationContext.currentSection] ?? navigationContext.currentSection}
                      </strong>
                      {navigationContext.selectedCategory !== "Todos" && (
                        <> · Filtro: <strong className="text-[#8E3E27]">{navigationContext.selectedCategory}</strong></>
                      )}
                      {navigationContext.searchQuery && (
                        <> · Búsqueda: “{navigationContext.searchQuery}”</>
                      )}
                    </>
                  )}
                </span>
              </div>
              <span className="shrink-0 font-medium text-[#171614]">
                Cotización: {navigationContext.cartCount} ({navigationContext.cartTotalUnits} m)
              </span>
            </div>
          )}

          {/* Apartado de Conversación por Voz (Cabina de Voz Atelier) */}
          {voice.voiceModeEnabled && (
            <div
              aria-label="Panel de conversación por voz"
              className="px-3.5 py-3 bg-white border-b border-[#E6E0D6] flex flex-col gap-2.5 animate-[fadeIn_0.16s_ease-out]"
            >
              <div className="flex items-center justify-between gap-2">
                <div
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] border text-[11px] font-semibold ${statusMeta.badgeClass}`}
                >
                  <span className={`w-2 h-2 rounded-full ${statusMeta.dotClass}`} />
                  <span>Estado: {statusMeta.label}</span>
                </div>

                {/* Indicador visual de ondas de audio (5 barras compuestas por GPU) */}
                <div
                  aria-hidden="true"
                  className="flex items-center gap-1 h-5 px-2 rounded-[6px] bg-[#FAF8F5] border border-[#E6E0D6]"
                >
                  {[0, 1, 2, 3, 4].map(idx => (
                    <span
                      key={idx}
                      style={{
                        animationDelay: `${idx * 110}ms`,
                      }}
                      className={`w-1 h-3.5 rounded-full origin-center transition-transform ${
                        voice.status === "listening"
                          ? "bg-[#8E3E27] animate-[voiceWave_0.75s_ease-in-out_infinite]"
                          : voice.status === "speaking" && !voice.isPaused
                            ? "bg-[#1C332D] animate-[voiceWave_0.65s_ease-in-out_infinite]"
                            : "bg-[#D1C9BC] scale-y-[0.35]"
                      }`}
                    />
                  ))}
                </div>

                {/* Controles de audio: Silenciar, Pausar/Reanudar, Detener */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={voice.toggleMute}
                    aria-label={voice.isMuted ? "Activar respuestas habladas" : "Silenciar respuestas habladas"}
                    title={voice.isMuted ? "Activar voz de respuesta" : "Silenciar voz de respuesta"}
                    className={`w-7 h-7 rounded-[6px] border grid place-items-center cursor-pointer transition-colors ${
                      voice.isMuted
                        ? "bg-[#F9ECE8] text-[#8E3E27] border-[#E6C5BA]"
                        : "bg-[#FAF8F5] text-[#171614] border-[#E6E0D6] hover:border-[#171614]"
                    }`}
                  >
                    {voice.isMuted ? <IconVolumeMute size={14} /> : <IconVolume size={14} />}
                  </button>

                  {voice.status === "speaking" && (
                    <>
                      <button
                        type="button"
                        onClick={voice.isPaused ? voice.resumeSpeaking : voice.pauseSpeaking}
                        aria-label={voice.isPaused ? "Reanudar lectura por voz" : "Pausar lectura por voz"}
                        title={voice.isPaused ? "Reanudar" : "Pausar"}
                        className="w-7 h-7 rounded-[6px] border border-[#E6E0D6] bg-[#FAF8F5] text-[#171614] grid place-items-center cursor-pointer hover:border-[#171614]"
                      >
                        {voice.isPaused ? <IconPlay size={12} /> : <IconPause size={12} />}
                      </button>
                      <button
                        type="button"
                        onClick={voice.stopSpeaking}
                        aria-label="Interrumpir reproducción de voz"
                        title="Detener reproducción"
                        className="w-7 h-7 rounded-[6px] border border-[#E6C5BA] bg-[#F9ECE8] text-[#8E3E27] grid place-items-center cursor-pointer hover:bg-[#8E3E27] hover:text-white transition-colors"
                      >
                        <IconStop size={12} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Transcripción en curso o mensaje de estado/error */}
              {voice.interimTranscript ? (
                <div className="text-[12px] text-[#171614] bg-[#FAF8F5] border border-[#D1C9BC] rounded-[8px] px-3 py-1.5 italic">
                  “{voice.interimTranscript}”
                </div>
              ) : voice.errorMessage ? (
                <div className="text-[11px] text-[#74311E] bg-[#F9ECE8] border border-[#E6C5BA] rounded-[8px] px-3 py-1.5 leading-snug">
                  {voice.errorMessage}
                </div>
              ) : (
                <div className="text-[11px] text-[#5C5852] leading-snug flex items-center justify-between gap-2">
                  <span>{statusMeta.sublabel}</span>
                </div>
              )}

              {/* Acción principal de micrófono + nota honesta sobre Web Speech API */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#E6E0D6]">
                <span className="text-[10px] text-[#5C5852]">
                  Modo de voz por turnos · Web Speech API (STT/TTS) del navegador
                </span>
                {voice.isSttSupported ? (
                  <button
                    type="button"
                    onClick={
                      voice.status === "listening" ? voice.stopListening : voice.startListening
                    }
                    className={`h-8 px-3 rounded-[8px] text-[12px] font-semibold inline-flex items-center gap-1.5 cursor-pointer border transition-colors ${
                      voice.status === "listening"
                        ? "bg-[#171614] text-white border-[#171614]"
                        : "bg-[#8E3E27] text-white border-[#8E3E27] hover:bg-[#74311E]"
                    }`}
                  >
                    {voice.status === "listening" ? (
                      <>
                        <IconStop size={12} />
                        <span>Detener escucha</span>
                      </>
                    ) : (
                      <>
                        <IconMic size={13} />
                        <span>Hablar con Paku</span>
                      </>
                    )}
                  </button>
                ) : (
                  <span className="text-[11px] font-semibold text-[#6E4F10]">
                    Usa las órdenes rápidas o el teclado
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Historial de conversación */}
          <div
            ref={listRef}
            className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-[#FAF8F5]"
          >
            {messages.map(m => {
              const isSpeakingThis =
                voice.status === "speaking" && voice.speakingMessageId === m.id;
              const confirmationState = confirmedMsgIds[m.id];

              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[90%] px-3.5 py-2.5 text-[13px] leading-relaxed border ${
                      m.role === "user"
                        ? "bg-[#171614] text-[#FAF8F5] border-[#171614] rounded-[12px_12px_2px_12px]"
                        : "bg-white text-[#171614] border-[#E6E0D6] rounded-[12px_12px_12px_2px]"
                    }`}
                  >
                    {m.role === "user" && m.fromVoice && (
                      <div className="text-[10px] text-[#D1C9BC] mb-0.5 flex items-center gap-1 font-medium">
                        <IconMic size={10} />
                        <span>Orden por voz</span>
                      </div>
                    )}

                    {m.role === "assistant" && (
                      <div className="flex items-center justify-between gap-2 mb-1">
                        {m.detectedIntent && m.detectedIntent !== "Consulta no clasificada" ? (
                          <div className="text-[10px] tracking-[0.05em] uppercase font-bold text-[#8E3E27] flex items-center gap-1">
                            <IconSparkles size={11} />
                            <span>{m.detectedIntent}</span>
                          </div>
                        ) : (
                          <span className="text-[10px] font-semibold text-[#5C5852]">
                            Paku
                          </span>
                        )}

                        {voice.isTtsSupported && (
                          <button
                            type="button"
                            onClick={() =>
                              isSpeakingThis ? voice.stopSpeaking() : voice.speak(m.text, m.id)
                            }
                            aria-label={
                              isSpeakingThis ? "Detener lectura en voz alta" : "Escuchar respuesta en voz alta"
                            }
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-[5px] border inline-flex items-center gap-1 cursor-pointer transition-colors ${
                              isSpeakingThis
                                ? "bg-[#F9ECE8] text-[#8E3E27] border-[#E6C5BA]"
                                : "bg-[#FAF8F5] text-[#5C5852] border-[#E6E0D6] hover:text-[#171614] hover:border-[#171614]"
                            }`}
                          >
                            {isSpeakingThis ? (
                              <>
                                <IconStop size={10} />
                                <span>Detener</span>
                              </>
                            ) : (
                              <>
                                <IconVolume size={11} />
                                <span>Escuchar</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    )}

                    <div>{m.text}</div>

                    {/* Atributos técnicos detectados */}
                    {m.matchedAttributes && m.matchedAttributes.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-[#E6E0D6]">
                        {m.matchedAttributes.map(att => (
                          <span
                            key={att}
                            className="text-[10px] bg-[#F3EFEA] text-[#5C5852] border border-[#E6E0D6] px-2 py-0.5 rounded-[4px] font-semibold"
                          >
                            {att}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Acciones de navegación ejecutadas por el agente */}
                    {m.actions && m.actions.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-[#E6E0D6] flex flex-wrap gap-1.5">
                        {m.actions.map((act, idx) => (
                          <button
                            key={act.type + idx}
                            type="button"
                            onClick={() => onExecuteAction?.(act)}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold bg-[#EBF2EE] text-[#1C332D] border border-[#C8DBD0] px-2.5 py-1 rounded-[6px] cursor-pointer hover:bg-[#1C332D] hover:text-white transition-colors"
                          >
                            <IconCompass size={12} />
                            <span>{act.label}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Confirmación de acciones sensibles (ej. vaciar carrito o añadir metraje) */}
                    {m.pendingConfirmationAction && (
                      <div className="mt-2.5 p-2.5 rounded-[8px] bg-[#FAF8F5] border border-[#D1C9BC]">
                        {confirmationState === "confirmed" ? (
                          <div className="text-[11px] font-semibold text-[#1C332D] flex items-center gap-1.5">
                            <IconCheck size={13} />
                            <span>Acción autorizada y ejecutada correctamente.</span>
                          </div>
                        ) : confirmationState === "cancelled" ? (
                          <div className="text-[11px] font-medium text-[#5C5852]">
                            Acción cancelada por el usuario.
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2">
                            <div className="text-[11px] font-semibold text-[#171614]">
                              {m.pendingConfirmationAction.label}
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  handleConfirmPendingAction(m.id, m.pendingConfirmationAction!)
                                }
                                className="h-7 px-3 rounded-[6px] bg-[#8E3E27] text-white text-[11px] font-semibold cursor-pointer hover:bg-[#74311E] transition-colors"
                              >
                                Confirmar acción
                              </button>
                              <button
                                type="button"
                                onClick={() => handleCancelPendingAction(m.id)}
                                className="h-7 px-3 rounded-[6px] bg-white border border-[#D1C9BC] text-[#5C5852] text-[11px] font-semibold cursor-pointer hover:text-[#171614] transition-colors"
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Ficha técnica desplegada o visor interactivo de fichas conmutable */}
                  {m.products && m.products.length > 0 && (
                    <PakuProductDeck
                      products={m.products}
                      onViewProduct={onViewProduct}
                      onAddToCart={onAddToCart}
                    />
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="bg-white border border-[#E6E0D6] rounded-[12px_12px_12px_2px] px-3.5 py-2.5 text-[12px] text-[#5C5852] w-fit flex items-center gap-2">
                <span className="inline-flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8E3E27] animate-[pulseSubtle_1s_infinite]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8E3E27] animate-[pulseSubtle_1s_0.2s_infinite]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8E3E27] animate-[pulseSubtle_1s_0.4s_infinite]" />
                </span>
                <span>Evaluando intención y contexto de tienda...</span>
              </div>
            )}
          </div>

          {/* Sugerencias rápidas de navegación y consulta contextual */}
          <div className="px-3 py-2 flex gap-1.5 overflow-x-auto border-t border-[#E6E0D6] bg-white">
            {suggestions.map(s => (
              <button
                key={s}
                type="button"
                onClick={() => void send(s, false)}
                className="text-[11px] font-semibold bg-[#FAF8F5] border border-[#E6E0D6] rounded-[6px] px-2.5 py-1.5 cursor-pointer hover:border-[#8E3E27] transition-colors text-[#171614] whitespace-nowrap shrink-0"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Campo de entrada (16px en móvil para evitar zoom automático en iOS) */}
          <form
            onSubmit={e => {
              e.preventDefault();
              void send(input, false);
            }}
            className="p-2.5 flex gap-2 border-t border-[#E6E0D6] bg-white items-center min-w-0"
          >
            {/* Botón de llamada interactiva con Paku */}
            <button
              type="button"
              onClick={() => setIsCallOpen(true)}
              aria-label="Iniciar llamada de voz interactiva con Paku"
              title="Llamada de voz con Paku (Burbuja animada)"
              className="shrink-0 h-10 w-10 rounded-[8px] border border-[#1C332D] bg-[#1C332D] text-white hover:bg-[#8E3E27] hover:border-[#8E3E27] grid place-items-center cursor-pointer transition-colors shadow-2xs"
            >
              <IconPhone size={16} />
            </button>

            <button
              type="button"
              onClick={() => {
                if (!voice.voiceModeEnabled) {
                  voice.setVoiceModeEnabled(true);
                }
                if (voice.status === "listening") {
                  voice.stopListening();
                } else {
                  voice.startListening();
                }
              }}
              aria-label={
                voice.status === "listening"
                  ? "Detener micrófono"
                  : "Hablar por micrófono con Paku"
              }
              title={
                voice.isSttSupported
                  ? "Hablar con Paku (solicita permiso de micrófono)"
                  : "Abrir panel de voz"
              }
              className={`shrink-0 h-10 w-10 rounded-[8px] border grid place-items-center cursor-pointer transition-colors ${
                voice.status === "listening"
                  ? "bg-[#8E3E27] text-white border-[#8E3E27]"
                  : isListeningOrSpeaking
                    ? "bg-[#1C332D] text-white border-[#1C332D]"
                    : "bg-[#FAF8F5] text-[#171614] border-[#D1C9BC] hover:border-[#8E3E27]"
              }`}
            >
              {voice.isSttSupported ? <IconMic size={16} /> : <IconMicOff size={16} />}
            </button>

            <input
              value={input}
              maxLength={250}
              onChange={e => setInput(e.target.value)}
              placeholder="Escribe o dicta: 'Muéstrame las telas de algodón'..."
              aria-label="Consulta u orden de navegación para el asesor textil"
              className="flex-1 min-w-0 border border-[#D1C9BC] rounded-[8px] px-3 py-2 outline-none text-[16px] sm:text-[13px] bg-[#FAF8F5] text-[#171614] placeholder:text-[#5C5852]/75 focus:border-[#8E3E27] focus:bg-white transition-colors"
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!input.trim()}
              className="shrink-0 h-10 w-10 !p-0"
              aria-label="Enviar consulta"
            >
              <IconSend size={15} />
            </Button>
          </form>
        </div>
      )}

      {/* Modal / Vista de llamada de voz interactiva con animación circular y ficha técnica */}
      <PakuVoiceCallModal
        open={isCallOpen}
        onClose={() => setIsCallOpen(false)}
        voice={voice}
        messages={messages}
        loading={loading}
        onSendQuery={text => void send(text, true)}
        onViewProduct={onViewProduct}
        onAddToCart={onAddToCart}
      />
    </>
  );
}

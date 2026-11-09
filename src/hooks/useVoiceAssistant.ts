import { useCallback, useEffect, useRef, useState } from "react";

export type VoiceStatus =
  | "idle"
  | "listening"
  | "processing"
  | "speaking"
  | "error"
  | "unsupported";

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message?: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

function getSpeechRecognitionConstructor(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

function cleanTextForSpeech(text: string): string {
  return text
    .replace(/S\/\s*(\d+(?:\.\d+)?)/g, "$1 soles")
    .replace(/g\/m²/g, "gramos por metro cuadrado")
    .replace(/[“”"•·]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function useVoiceAssistant({
  onFinalTranscript,
}: {
  onFinalTranscript: (transcript: string) => void;
}) {
  const [isSttSupported] = useState<boolean>(() => !!getSpeechRecognitionConstructor());
  const [isTtsSupported] = useState<boolean>(
    () => typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window
  );

  const [voiceModeEnabled, setVoiceModeEnabled] = useState(false);
  const [status, setStatus] = useState<VoiceStatus>(() =>
    getSpeechRecognitionConstructor() ? "idle" : "unsupported"
  );
  const [interimTranscript, setInterimTranscript] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const finalBufferRef = useRef<string>("");
  const onFinalRef = useRef(onFinalTranscript);

  useEffect(() => {
    onFinalRef.current = onFinalTranscript;
  }, [onFinalTranscript]);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPaused(false);
    setSpeakingMessageId(null);
    setStatus(prev => (prev === "speaking" ? (isSttSupported ? "idle" : "unsupported") : prev));
  }, [isSttSupported]);

  const pauseSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, []);

  const resumeSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, []);

  const speak = useCallback(
    (rawText: string, messageId?: string) => {
      if (!isTtsSupported || isMuted) {
        setStatus(prev => (prev === "processing" ? (isSttSupported ? "idle" : "unsupported") : prev));
        return;
      }

      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(cleanTextForSpeech(rawText));
        utterance.lang = "es-PE";
        utterance.rate = 1.02;
        utterance.pitch = 1.0;

        const voices = window.speechSynthesis.getVoices();
        const spanishVoice =
          voices.find(v => v.lang.toLowerCase().startsWith("es-pe")) ??
          voices.find(v => v.lang.toLowerCase().startsWith("es-mx") || v.lang.toLowerCase().startsWith("es-es")) ??
          voices.find(v => v.lang.toLowerCase().startsWith("es"));
        if (spanishVoice) {
          utterance.voice = spanishVoice;
        }

        utterance.onstart = () => {
          setIsPaused(false);
          setSpeakingMessageId(messageId ?? "active");
          setStatus("speaking");
        };

        utterance.onend = () => {
          setIsPaused(false);
          setSpeakingMessageId(null);
          setStatus(isSttSupported ? "idle" : "unsupported");
        };

        utterance.onerror = () => {
          setIsPaused(false);
          setSpeakingMessageId(null);
          setStatus(isSttSupported ? "idle" : "unsupported");
        };

        setSpeakingMessageId(messageId ?? "active");
        setStatus("speaking");
        window.speechSynthesis.speak(utterance);
      } catch {
        setSpeakingMessageId(null);
        setStatus(isSttSupported ? "idle" : "unsupported");
      }
    },
    [isTtsSupported, isMuted, isSttSupported]
  );

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore if already stopped
      }
    }
  }, []);

  const startListening = useCallback(() => {
    // Interrumpir cualquier síntesis activa antes de escuchar al usuario
    stopSpeaking();
    setErrorMessage(null);
    setInterimTranscript("");
    finalBufferRef.current = "";

    const Ctor = getSpeechRecognitionConstructor();
    if (!Ctor) {
      setStatus("unsupported");
      setErrorMessage(
        "Tu navegador no admite reconocimiento de voz nativo (Web Speech API). Puedes usar las órdenes rápidas de voz o escribir tu consulta abajo."
      );
      return;
    }

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // Ignore
        }
      }

      const recognition = new Ctor();
      recognition.lang = "es-PE";
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setErrorMessage(null);
        setStatus("listening");
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interim = "";
        let finalText = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const res = event.results[i];
          if (res.isFinal) {
            finalText += res[0].transcript;
          } else {
            interim += res[0].transcript;
          }
        }
        if (finalText) {
          finalBufferRef.current = (finalBufferRef.current + " " + finalText).trim();
        }
        setInterimTranscript((finalBufferRef.current + " " + interim).trim());
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        const code = event.error;
        if (code === "not-allowed" || code === "service-not-allowed") {
          setStatus("error");
          setErrorMessage(
            "Permiso de micrófono denegado. Autoriza el acceso al micrófono en la barra del navegador para hablar con Kotton AI."
          );
        } else if (code === "audio-capture") {
          setStatus("error");
          setErrorMessage("No se detectó ningún micrófono conectado en tu dispositivo.");
        } else if (code === "no-speech") {
          setStatus("idle");
          setErrorMessage("No detectamos voz. Pulsa el micrófono e intenta hablar cerca del dispositivo.");
        } else if (code === "aborted") {
          setStatus("idle");
        } else {
          setStatus("error");
          setErrorMessage("No se pudo completar el reconocimiento de voz en este intento.");
        }
      };

      recognition.onend = () => {
        const captured = finalBufferRef.current.trim();
        setInterimTranscript("");
        finalBufferRef.current = "";
        if (captured) {
          setStatus("processing");
          onFinalRef.current(captured);
        } else {
          setStatus(prev => (prev === "listening" ? "idle" : prev));
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setStatus("error");
      setErrorMessage("No fue posible iniciar el micrófono del navegador.");
    }
  }, [stopSpeaking]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      if (next && typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        setIsPaused(false);
        setSpeakingMessageId(null);
      }
      return next;
    });
  }, []);

  const toggleVoiceMode = useCallback(() => {
    setVoiceModeEnabled(prev => {
      const next = !prev;
      if (!next) {
        stopListening();
        stopSpeaking();
      }
      return next;
    });
  }, [stopListening, stopSpeaking]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // Ignore
        }
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    isSttSupported,
    isTtsSupported,
    voiceModeEnabled,
    setVoiceModeEnabled,
    toggleVoiceMode,
    status,
    setStatus,
    interimTranscript,
    errorMessage,
    setErrorMessage,
    isMuted,
    toggleMute,
    isPaused,
    speakingMessageId,
    startListening,
    stopListening,
    speak,
    pauseSpeaking,
    resumeSpeaking,
    stopSpeaking,
  };
}


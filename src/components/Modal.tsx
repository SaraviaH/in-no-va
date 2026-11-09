import { useEffect, useRef, type ReactNode } from "react";

export function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevActive = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKey);
      prevActive?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Detalle técnico de tela"
      className="fixed inset-0 z-[60] grid place-items-center p-3 sm:p-6"
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#171614]/55 backdrop-blur-[3px] animate-[fadeIn_0.16s_ease-out]"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative bg-white rounded-[16px] shadow-[0_24px_56px_rgba(23,22,20,0.22)] w-[min(1020px,100%)] max-h-[90dvh] overflow-y-auto border border-[#E6E0D6] outline-none animate-[modalEnter_0.22s_cubic-bezier(0.16,1,0.3,1)]"
      >
        {children}
      </div>
    </div>
  );
}

import type { ReactNode } from "react";

export function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-3 sm:p-6">
      <div onClick={onClose} className="absolute inset-0 bg-[#1A2E2A]/60 backdrop-blur-[6px]" />
      <div className="relative bg-[#FFFBF5] rounded-[22px] shadow-[0_22px_48px_rgba(26,46,42,0.22)] w-[min(960px,100%)] max-h-[90vh] overflow-auto border border-[#DDD2BB] animate-[fadeIn_0.2s_ease]">
        {children}
      </div>
    </div>
  );
}

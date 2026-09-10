import { useState } from "react";
import { siteConfig } from "../config/site";

export function Header({
  cartCount,
  onCartOpen,
  onAiOpen,
}: {
  cartCount: number;
  onCartOpen: () => void;
  onAiOpen: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-[#FFFBF5]/85 backdrop-blur-xl border-b border-[#DDD2BB] supports-[backdrop-filter]:bg-[#FFFBF5]/75">
      <div className="mx-auto max-w-[1280px] w-[min(1280px,calc(100%-32px))] max-sm:w-[min(1280px,calc(100%-20px))] flex items-center gap-4 h-[68px]">
        {/* logo */}
        <a href="#inicio" className="flex items-center gap-2.5 shrink-0 group">
          <span className="w-9 h-9 rounded-xl bg-[#9E4D2E] grid place-items-center text-white font-extrabold text-[13px] tracking-wide shadow-[0_6px_16px_rgba(158,77,46,0.28)] group-hover:bg-[#864128] transition-colors">KK</span>
          <span className="font-[Fraunces] font-extrabold text-[19px] tracking-[-0.02em] text-[#1A2E2A]">
            Kotton<span className="text-[#9E4D2E]"> Kids</span>
          </span>
          <span className="hidden lg:inline-flex text-[10px] leading-none tracking-[0.14em] font-bold bg-[#EBE0C8] border border-[#DDD2BB] px-2.5 py-1.5 rounded-full text-[#6B6560]">TEXTIL · IA</span>
        </a>

        {/* nav desktop */}
        <nav className="hidden lg:flex items-center gap-1 ml-6">
          {siteConfig.navigation.map(n => (
            <a key={n.href} href={n.href} className="px-3.5 py-2 rounded-full text-[13px] font-semibold text-[#6B6560] hover:text-[#1A2E2A] hover:bg-[#EBE0C8]/70 transition-colors">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex-1" />

        {/* actions */}
        <div className="flex items-center gap-2">
          <button onClick={onAiOpen} className="inline-flex items-center gap-2 bg-white border border-[#DDD2BB] rounded-full px-3 py-2 sm:px-4 sm:py-2.5 cursor-pointer font-bold text-[13px] text-[#2E2A24] hover:bg-[#F5EFE2] hover:border-[#C9B99A] transition-colors shadow-sm">
            <span className="w-[22px] h-[22px] rounded-full bg-[#1A2E2A] text-white grid place-items-center text-[11px]">✦</span>
            <span className="hidden sm:inline">Hablar con IA</span>
            <span className="sm:hidden">IA</span>
          </button>

          <button onClick={onCartOpen} className="relative bg-[#9E4D2E] text-white border border-[#9E4D2E] rounded-full px-3 sm:px-4 py-2 sm:py-2.5 inline-flex items-center gap-2 cursor-pointer font-bold text-[13px] hover:bg-[#864128] hover:border-[#864128] transition-colors shadow-[0_6px_18px_rgba(158,77,46,0.28)]">
            <span className="text-[15px]">🛒</span>
            <span className="hidden sm:inline">Carrito</span>
            {cartCount > 0 && (
              <span className="bg-white text-[#9E4D2E] min-w-[20px] h-5 rounded-full grid place-items-center text-[11px] font-extrabold px-1.5 leading-none">{cartCount}</span>
            )}
          </button>

          <button onClick={() => setMobileOpen(v => !v)} aria-label="Menú" className="lg:hidden w-10 h-10 rounded-xl border border-[#DDD2BB] bg-white grid place-items-center cursor-pointer hover:bg-[#F5EFE2] transition-colors">
            <span className="text-[18px] leading-none">{mobileOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-[#DDD2BB] bg-[#FFFBF5] px-4 py-3 animate-[fadeIn_0.18s_ease]">
          <nav className="flex flex-col gap-1.5">
            {siteConfig.navigation.map(n => (
              <a key={n.href} href={n.href} onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl bg-[#F5EFE2] border border-[#DDD2BB] font-semibold text-sm text-[#2E2A24] hover:bg-white transition-colors">{n.label}</a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

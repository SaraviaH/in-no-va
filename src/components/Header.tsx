import { useState } from "react";
import { siteConfig } from "../config/site";
import { images } from "../assets/images";
import { onImageError } from "../utils/image";
import { IconBag, IconClose, IconMenu, IconSearch, IconSparkles } from "./Icons";

export function Header({
  cartCount,
  onCartOpen,
  onAiOpen,
  searchQuery = "",
  onSearchChange,
}: {
  cartCount: number;
  onCartOpen: () => void;
  onAiOpen: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleSearchInput = (value: string) => {
    onSearchChange?.(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
    setMobileSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/92 backdrop-blur-md border-b border-[#E6E0D6]">
      {/* Barra superior informativa de atelier */}
      <div className="bg-[#171614] text-[#EAE4DC] text-[11px] border-b border-white/10">
        <div className="mx-auto max-w-[1280px] w-[min(1280px,calc(100%-40px))] max-sm:w-[min(1280px,calc(100%-24px))] h-8 flex items-center justify-between gap-4">
          <span className="truncate font-medium tracking-[0.01em]">
            Gamarra, Lima · Venta de tejidos por metro lineal y partida
          </span>
          <div className="hidden md:flex items-center gap-5 text-[#D1C9BC] shrink-0 tabular-nums">
            <span>{siteConfig.contact.schedule}</span>
            <span className="text-white/25">|</span>
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="hover:text-white transition-colors duration-150"
            >
              {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Barra principal de navegación */}
      <div className="mx-auto max-w-[1280px] w-[min(1280px,calc(100%-40px))] max-sm:w-[min(1280px,calc(100%-24px))] flex items-center gap-2 sm:gap-5 h-[68px]">
        {/* Marca */}
        <a href="#inicio" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group">
          <img
            src={images.logo.main}
            alt="Kotton Estudio Textil"
            onError={onImageError}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-[8px] object-cover border border-[#E6E0D6] bg-[#171614]"
          />
          <div className="flex flex-col">
            <span className="font-[Fraunces] font-semibold text-[18px] sm:text-[20px] leading-none tracking-[-0.03em] text-[#171614]">
              KOTTON
            </span>
            <span className="text-[10px] text-[#5C5852] tracking-[0.04em] mt-0.5 font-medium">
              Estudio Textil
            </span>
          </div>
        </a>

        {/* Navegación Desktop */}
        <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-1 ml-4">
          {siteConfig.navigation.map(n => (
            <a
              key={n.href}
              href={n.href}
              className="px-3 py-2 rounded-[8px] text-[13px] font-medium text-[#5C5852] transition-colors duration-150 [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#171614] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#F3EFEA]"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex-1" />

        {/* Buscador rápido en Desktop */}
        {onSearchChange && (
          <form
            onSubmit={handleSearchSubmit}
            role="search"
            className="hidden md:flex items-center relative w-[220px] xl:w-[260px]"
          >
            <IconSearch size={15} className="absolute left-3 text-[#5C5852] pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={e => handleSearchInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Escape") handleSearchInput("");
              }}
              placeholder="Buscar tela, fibra o uso..."
              aria-label="Buscar telas en el catálogo"
              className="w-full h-9 pl-9 pr-8 rounded-[8px] bg-white border border-[#E6E0D6] text-[13px] text-[#171614] placeholder:text-[#5C5852]/75 focus:outline-none focus:border-[#8E3E27] transition-colors duration-150"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => handleSearchInput("")}
                aria-label="Limpiar búsqueda"
                className="absolute right-2 w-5 h-5 rounded-full grid place-items-center text-[#5C5852] hover:text-[#171614] cursor-pointer"
              >
                <IconClose size={13} />
              </button>
            )}
          </form>
        )}

        {/* Acciones principales */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {onSearchChange && (
            <button
              type="button"
              onClick={() => {
                setMobileSearchOpen(v => !v);
                setMobileOpen(false);
              }}
              aria-label="Buscar telas"
              aria-expanded={mobileSearchOpen}
              className="md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] border border-[#E6E0D6] bg-white grid place-items-center text-[#171614] cursor-pointer active:scale-[0.97] transition-transform duration-150"
            >
              <IconSearch size={16} />
            </button>
          )}

          <button
            type="button"
            onClick={onAiOpen}
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-white border border-[#D1C9BC] rounded-[10px] h-9 sm:h-10 px-2.5 sm:px-3.5 cursor-pointer font-semibold text-[12px] sm:text-[13px] text-[#171614] select-none active:scale-[0.98] transition-[transform,background-color,border-color] duration-150 ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#F3EFEA] [@media(hover:hover)_and_(pointer:fine)]:hover:border-[#171614]"
          >
            <span className="w-5 h-5 rounded-[6px] bg-[#1C332D] text-[#FAF8F5] grid place-items-center shrink-0">
              <IconSparkles size={12} />
            </span>
            <span className="hidden sm:inline">Asesor Textil</span>
            <span className="sm:hidden">IA</span>
          </button>

          <button
            type="button"
            onClick={onCartOpen}
            aria-label={`Abrir cotización (${cartCount} productos)`}
            className="relative bg-[#171614] text-[#FAF8F5] border border-[#171614] rounded-[10px] h-9 sm:h-10 px-2.5 sm:px-4 inline-flex items-center gap-1.5 sm:gap-2 cursor-pointer font-semibold text-[12px] sm:text-[13px] select-none active:scale-[0.98] transition-[transform,background-color,border-color] duration-150 ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#8E3E27] [@media(hover:hover)_and_(pointer:fine)]:hover:border-[#8E3E27]"
          >
            <IconBag size={15} />
            <span className="hidden sm:inline">Cotización</span>
            {cartCount > 0 && (
              <span className="bg-[#8E3E27] text-white min-w-[18px] h-[18px] sm:min-w-[20px] sm:h-5 rounded-[5px] sm:rounded-[6px] grid place-items-center text-[10px] sm:text-[11px] font-bold px-1 leading-none tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileOpen(v => !v);
              setMobileSearchOpen(false);
            }}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] border border-[#E6E0D6] bg-white grid place-items-center text-[#171614] cursor-pointer active:scale-[0.97] transition-transform duration-150"
          >
            {mobileOpen ? <IconClose size={17} /> : <IconMenu size={17} />}
          </button>
        </div>
      </div>

      {/* Buscador desplegable en Móvil (font-size 16px para evitar auto-zoom en iOS) */}
      {mobileSearchOpen && onSearchChange && (
        <div className="md:hidden border-t border-[#E6E0D6] bg-[#FAF8F5] px-4 py-3 animate-[fadeIn_0.16s_ease-out]">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <IconSearch size={17} className="absolute left-3.5 text-[#5C5852] pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={e => handleSearchInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Escape") {
                  if (searchQuery) handleSearchInput("");
                  else setMobileSearchOpen(false);
                }
              }}
              placeholder="Buscar algodón Pima, lino, canalé, bebé..."
              autoFocus
              className="w-full h-11 pl-10 pr-10 rounded-[10px] bg-white border border-[#D1C9BC] text-[16px] text-[#171614] placeholder:text-[#5C5852]/75 focus:outline-none focus:border-[#8E3E27]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => handleSearchInput("")}
                aria-label="Limpiar búsqueda"
                className="absolute right-3 w-6 h-6 rounded-full grid place-items-center text-[#5C5852]"
              >
                <IconClose size={15} />
              </button>
            )}
          </form>
        </div>
      )}

      {/* Menú de navegación Móvil */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#E6E0D6] bg-[#FAF8F5] px-4 py-4 animate-[fadeIn_0.16s_ease-out]">
          <nav aria-label="Menú móvil" className="flex flex-col gap-1">
            {siteConfig.navigation.map(n => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMobileOpen(false)}
                className="px-3.5 py-3 rounded-[10px] font-semibold text-[14px] text-[#171614] active:bg-[#EAE4DC] transition-colors flex items-center justify-between"
              >
                <span>{n.label}</span>
                <span className="text-[11px] text-[#5C5852] font-normal">Ir</span>
              </a>
            ))}
          </nav>
          <div className="mt-3 pt-3 border-t border-[#E6E0D6] flex items-center justify-between text-[12px] text-[#5C5852]">
            <span>{siteConfig.contact.address}</span>
            <a href={`tel:${siteConfig.contact.phone}`} className="font-semibold text-[#171614] tabular-nums">
              {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

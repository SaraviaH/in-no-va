import { useMemo, useState } from "react";
import type { Product } from "../../types/product";
import { ProductCard } from "../ProductCard";
import { IconClose, IconSearch } from "../Icons";

const CATEGORY_FILTERS: { id: string; label: string }[] = [
  { id: "Todos", label: "Todas las telas" },
  { id: "algodon", label: "Algodón" },
  { id: "lino", label: "Lino" },
  { id: "mezclas", label: "Mezclas" },
  { id: "denim", label: "Denim" },
  { id: "seda", label: "Seda" },
  { id: "punto", label: "Punto" },
];

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export function FeaturedProducts({
  products,
  filter,
  onFilter,
  searchQuery = "",
  onSearchChange,
  onView,
  onAdd,
  onQuoteIntent,
}: {
  products: Product[];
  filter: string;
  onFilter: (f: string) => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  onView: (p: Product) => void;
  onAdd: (p: Product) => void;
  onQuoteIntent: () => void;
}) {
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const filtered = useMemo(() => {
    const q = normalize(searchQuery);
    const stem =
      q === "pijama" || q === "pijamas"
        ? "pijameria"
        : q.endsWith("s") && q.length > 4
          ? q.slice(0, -1)
          : q;
    const base = products.filter(p => {
      const matchesCategory = filter === "Todos" || p.categoria === filter;
      if (!matchesCategory) return false;
      if (!q) return true;
      const haystack = normalize(
        [
          p.nombre,
          p.descripcion,
          p.tipo,
          p.material,
          p.color,
          p.tipoTejido ?? "",
          p.gramaje ?? "",
          ...p.usos,
          ...(p.lineasUso ?? []),
        ].join(" ")
      );
      return haystack.includes(q) || haystack.includes(stem);
    });

    if (sortBy === "price-asc") {
      return [...base].sort((a, b) => a.precioReferencial - b.precioReferencial);
    }
    if (sortBy === "price-desc") {
      return [...base].sort((a, b) => b.precioReferencial - a.precioReferencial);
    }
    return base;
  }, [products, filter, searchQuery, sortBy]);

  return (
    <section id="catalogo" className="py-16 lg:py-24 bg-[#FAF8F5]">
      <div className="mx-auto max-w-[1280px] w-[min(1280px,calc(100%-40px))] max-sm:w-[min(1280px,calc(100%-24px))]">
        {/* Cabecera del catálogo */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E6E0D6]">
          <div className="max-w-[600px]">
            <h2 className="font-[Fraunces] text-[30px] sm:text-[36px] font-semibold tracking-[-0.025em] leading-[1.1] text-[#171614]">
              Muestrario y catálogo de tejidos
            </h2>
            <p className="text-[#5C5852] text-[15px] mt-2 leading-relaxed">
              Especificaciones de composición, título de hilo y gramaje verificadas para confección. Precios referenciales por metro lineal.
            </p>
          </div>

          {/* Buscador y selector de orden en catálogo */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {onSearchChange && (
              <div className="relative flex-1 sm:w-[250px]">
                <IconSearch size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5C5852] pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={e => onSearchChange(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Escape") onSearchChange("");
                  }}
                  placeholder="Filtrar por prenda, fibra o g/m²..."
                  aria-label="Filtrar catálogo por prenda, fibra o gramaje"
                  className="w-full h-10 pl-9 pr-8 rounded-[10px] bg-white border border-[#D1C9BC] text-[16px] sm:text-[13px] text-[#171614] placeholder:text-[#5C5852]/75 focus:outline-none focus:border-[#8E3E27]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange("")}
                    aria-label="Borrar filtro de búsqueda"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5C5852] hover:text-[#171614] cursor-pointer"
                  >
                    <IconClose size={14} />
                  </button>
                )}
              </div>
            )}

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              aria-label="Ordenar productos"
              className="h-10 px-3.5 rounded-[10px] bg-white border border-[#D1C9BC] text-[13px] font-medium text-[#171614] focus:outline-none focus:border-[#8E3E27] cursor-pointer"
            >
              <option value="featured">Orden: Curaduría Kotton</option>
              <option value="price-asc">Precio: Menor a mayor</option>
              <option value="price-desc">Precio: Mayor a menor</option>
            </select>
          </div>
        </div>

        {/* Barra de filtros por familia textil (incluye las 6 categorías) */}
        <div className="flex items-center justify-between gap-4 flex-wrap mt-6">
          <div role="tablist" aria-label="Filtrar por categoría de fibra" className="flex gap-1.5 flex-wrap">
            {CATEGORY_FILTERS.map(cat => {
              const isSelected = filter === cat.id;
              const count =
                cat.id === "Todos"
                  ? products.length
                  : products.filter(p => p.categoria === cat.id).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onFilter(cat.id)}
                  className={`h-9 px-3.5 rounded-[8px] text-[13px] font-semibold transition-colors duration-150 cursor-pointer border inline-flex items-center gap-1.5 select-none ${
                    isSelected
                      ? "bg-[#171614] text-[#FAF8F5] border-[#171614]"
                      : "bg-white text-[#5C5852] border-[#E6E0D6] [@media(hover:hover)_and_(pointer:fine)]:hover:border-[#171614] [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#171614]"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[11px] tabular-nums ${
                      isSelected ? "text-[#D1C9BC]" : "text-[#5C5852]/75"
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-[12px] font-medium text-[#5C5852] tabular-nums">
            Mostrando <strong className="text-[#171614]">{filtered.length}</strong> de {products.length} partidas
          </div>
        </div>

        {/* Grilla de tarjetas de producto */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-8">
            {filtered.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onView={() => onView(p)}
                onAdd={() => onAdd(p)}
                onQuoteIntent={onQuoteIntent}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 bg-white border border-[#E6E0D6] rounded-[12px] p-10 text-center max-w-[520px] mx-auto">
            <div className="font-[Fraunces] text-[20px] font-semibold text-[#171614]">
              No encontramos tejidos con ese criterio
            </div>
            <p className="text-[14px] text-[#5C5852] mt-2 leading-relaxed">
              Prueba restableciendo los filtros de categoría o consulta a nuestro asesor técnico indicando la prenda que deseas confeccionar.
            </p>
            <button
              type="button"
              onClick={() => {
                onFilter("Todos");
                onSearchChange?.("");
              }}
              className="mt-5 h-10 px-4 rounded-[8px] bg-[#171614] text-white text-[13px] font-semibold cursor-pointer hover:bg-[#8E3E27] transition-colors"
            >
              Restablecer muestrario completo
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

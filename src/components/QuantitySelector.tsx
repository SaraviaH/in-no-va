import { IconMinus, IconPlus } from "./Icons";

export function QuantitySelector({
  value,
  onChange,
  size = 36,
  unit = "m",
}: {
  value: number;
  onChange: (n: number) => void;
  size?: number;
  unit?: string;
}) {
  return (
    <div className="inline-flex items-center gap-1 bg-white border border-[#D1C9BC] rounded-[10px] p-1 select-none">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="rounded-[7px] bg-[#FAF8F5] text-[#171614] cursor-pointer grid place-items-center transition-[transform,background-color] duration-150 ease-out active:scale-[0.95] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#EAE4DC]"
        style={{ width: size, height: size }}
        aria-label="Disminuir metraje"
      >
        <IconMinus size={14} />
      </button>
      <span className="min-w-[46px] px-1.5 text-center font-semibold text-[13px] text-[#171614] tabular-nums">
        {value} {unit}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="rounded-[7px] bg-[#171614] text-white cursor-pointer grid place-items-center transition-[transform,background-color] duration-150 ease-out active:scale-[0.95] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#8E3E27]"
        style={{ width: size, height: size }}
        aria-label="Aumentar metraje"
      >
        <IconPlus size={14} />
      </button>
    </div>
  );
}

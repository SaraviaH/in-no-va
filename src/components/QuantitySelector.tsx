export function QuantitySelector({ value, onChange, size = 36 }: { value: number; onChange: (n: number) => void; size?: number }) {
  return (
    <div className="inline-flex items-center gap-1 bg-white border border-[#DDD2BB] rounded-full p-1 shadow-sm">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className="rounded-full border border-[#DDD2BB] bg-white cursor-pointer leading-none hover:bg-[#F5EFE2] transition-colors grid place-items-center font-bold text-[#1A2E2A]"
        style={{ width: size, height: size, fontSize: 16 }}
        aria-label="Disminuir"
      >
        −
      </button>
      <span className="min-w-8 text-center font-bold text-sm text-[#1A2E2A]">{value}</span>
      <button
        onClick={() => onChange(value + 1)}
        className="rounded-full bg-[#9E4D2E] text-white border border-[#9E4D2E] cursor-pointer leading-none hover:bg-[#864128] transition-colors grid place-items-center font-bold"
        style={{ width: size, height: size, fontSize: 16 }}
        aria-label="Aumentar"
      >
        +
      </button>
    </div>
  );
}

import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "whatsapp";
type Size = "sm" | "md" | "lg";

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  style,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; className?: string }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold select-none transition-[transform,background-color,border-color,color] duration-150 ease-out leading-none whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8E3E27] disabled:opacity-45 disabled:pointer-events-none active:scale-[0.98]";

  const sizes: Record<Size, string> = {
    sm: "h-9 px-3.5 text-[13px]",
    md: "h-11 px-5 text-[14px]",
    lg: "h-12 px-6 text-[15px]",
  };

  const variants: Record<Variant, string> = {
    primary:
      "bg-[#8E3E27] text-white border border-[#8E3E27] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#74311E] [@media(hover:hover)_and_(pointer:fine)]:hover:border-[#74311E]",
    secondary:
      "bg-[#171614] text-[#FAF8F5] border border-[#171614] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#2C2A26] [@media(hover:hover)_and_(pointer:fine)]:hover:border-[#2C2A26]",
    ghost:
      "bg-transparent text-[#171614] border border-[#E6E0D6] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#F3EFEA] [@media(hover:hover)_and_(pointer:fine)]:hover:border-[#D1C9BC]",
    outline:
      "bg-white text-[#171614] border border-[#D1C9BC] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#FAF8F5] [@media(hover:hover)_and_(pointer:fine)]:hover:border-[#171614]",
    whatsapp:
      "bg-[#1C332D] text-white border border-[#1C332D] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#142621] [@media(hover:hover)_and_(pointer:fine)]:hover:border-[#142621]",
  };

  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} style={style} {...props}>
      {children}
    </button>
  );
}

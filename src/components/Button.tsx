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
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 leading-none whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E4D2E]/30 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
  const sizes: Record<Size, string> = {
    sm: "px-4 py-2 text-[13px]",
    md: "px-5 py-3 text-[14px]",
    lg: "px-7 py-3.5 text-[15px]",
  };
  const variants: Record<Variant, string> = {
    primary: "bg-[#9E4D2E] text-white border border-[#9E4D2E] shadow-[0_8px_20px_rgba(158,77,46,0.25)] hover:bg-[#864128] hover:border-[#864128] hover:shadow-[0_10px_24px_rgba(158,77,46,0.3)]",
    secondary: "bg-[#1A2E2A] text-white border border-[#1A2E2A] hover:bg-[#23433E] hover:border-[#23433E] shadow-[0_8px_20px_rgba(26,46,42,0.18)]",
    ghost: "bg-transparent text-[#2E2A24] border border-[#DDD2BB] hover:bg-white hover:border-[#C9B99A] hover:shadow-sm",
    outline: "bg-[#FFFBF5] text-[#2E2A24] border border-[#DDD2BB] hover:bg-white hover:shadow-sm",
    whatsapp: "bg-[#1E9E5A] text-white border border-[#1E9E5A] shadow-[0_8px_20px_rgba(30,158,90,0.22)] hover:bg-[#178A4E] hover:border-[#178A4E]",
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} style={style} {...props}>
      {children}
    </button>
  );
}

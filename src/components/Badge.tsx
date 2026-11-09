import type { ReactNode } from "react";

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "accent";
}) {
  const map: Record<string, string> = {
    neutral: "bg-[#F3EFEA] text-[#171614] border-[#E6E0D6]",
    success: "bg-[#EBF2EE] text-[#1C332D] border-[#C8DBD0]",
    warning: "bg-[#FBF3E4] text-[#6E4F10] border-[#E8D5B0]",
    accent: "bg-[#F9ECE8] text-[#74311E] border-[#E6C5BA]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-[11px] font-semibold tracking-[0.02em] border leading-none ${map[tone]}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          tone === "success"
            ? "bg-[#23533D]"
            : tone === "warning"
              ? "bg-[#9A7228]"
              : tone === "accent"
                ? "bg-[#8E3E27]"
                : "bg-[#5C5852]"
        }`}
      />
      {children}
    </span>
  );
}

export function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "success" | "warning" | "accent" }) {
  const map: Record<string, string> = {
    neutral: "bg-[#EBE0C8] text-[#2E2A24] border-[#DDD2BB]",
    success: "bg-[#E0EDE6] text-[#1A4D36] border-[#B9D9C9]",
    warning: "bg-[#FFF1D4] text-[#7A5A12] border-[#E9D5A3]",
    accent: "bg-[#FBE8E0] text-[#7A2E1A] border-[#E9C2B3]",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase border ${map[tone]}`}>
      {children}
    </span>
  );
}

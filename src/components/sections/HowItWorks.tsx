export function HowItWorks() {
  const steps = [
    { n: "01", t: "Cuéntanos qué necesitas", d: "Describe tu proyecto, prenda o sensación que buscas.", icon: "◐" },
    { n: "02", t: "La IA interpreta tu solicitud", d: "Kotton AI entiende textura, caída y uso ideal.", icon: "✦" },
    { n: "03", t: "Consulta las opciones del catálogo", d: "Cruza tu idea con telas reales disponibles.", icon: "▦" },
    { n: "04", t: "Recibe recomendaciones", d: "Ve cards, compara y añade al carrito al instante.", icon: "✧" },
  ];
  return (
    <section id="como-funciona" className="py-16 lg:py-20 bg-[#FFFBF5] border-y border-[#DDD2BB]">
      <div className="mx-auto max-w-[1280px] w-[min(1280px,calc(100%-32px))] max-sm:w-[min(1280px,calc(100%-20px))]">
        <div className="text-center max-w-[640px] mx-auto">
          <span className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.16em] uppercase font-extrabold text-[#9E4D2E] justify-center">
            <span className="w-6 h-px bg-[#9E4D2E] inline-block" /> Flujo inteligente <span className="w-6 h-px bg-[#9E4D2E] inline-block" />
          </span>
          <h2 className="font-[Fraunces] text-[32px] font-bold tracking-tight text-[#1A2E2A] mt-3">Cómo funciona</h2>
          <p className="text-[#6B6560] mt-2 text-[14px]">Cliente → IA → Catálogo → Recomendaciones · Todo en segundos</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {steps.map(s => (
            <div key={s.n} className="group bg-[#F5EFE2] border border-[#DDD2BB] rounded-[18px] p-5 hover:bg-white hover:shadow-[0_10px_28px_rgba(46,42,36,0.08)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#EBE0C8] rounded-bl-[40px] opacity-0 group-hover:opacity-60 transition-opacity" />
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-[#1A2E2A] text-white grid place-items-center text-[13px] font-bold">{s.icon}</span>
                <span className="text-[11px] font-black tracking-[0.12em] text-[#9E4D2E]">{s.n}</span>
              </div>
              <div className="font-bold text-[#1A2E2A] mt-4 leading-tight">{s.t}</div>
              <div className="text-[13px] text-[#6B6560] mt-2 leading-relaxed">{s.d}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-7 flex-wrap text-xs font-bold text-[#6B6560]">
          <span className="bg-[#F5EFE2] border border-[#DDD2BB] px-3 py-1.5 rounded-full text-[#1A2E2A]">Cliente</span>
          <span className="text-[#C9B99A]">→</span>
          <span className="bg-[#1A2E2A] text-white px-3 py-1.5 rounded-full">IA</span>
          <span className="text-[#C9B99A]">→</span>
          <span className="bg-white border border-[#DDD2BB] px-3 py-1.5 rounded-full text-[#1A2E2A]">Catálogo</span>
          <span className="text-[#C9B99A]">→</span>
          <span className="bg-[#9E4D2E] text-white px-3 py-1.5 rounded-full">Recomendaciones</span>
        </div>
      </div>
    </section>
  );
}

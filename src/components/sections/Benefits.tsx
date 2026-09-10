export function Benefits() {
  const items = [
    { title: "Variedad", desc: "Algodones, linos, mezclas, denim, punto y seda. Todo en un solo lugar.", icon: "◈", accent: "bg-[#9E4D2E]" },
    { title: "Orientación", desc: "Kotton AI te guía según uso, clima y caída que necesitas.", icon: "✦", accent: "bg-[#1A2E2A]" },
    { title: "Facilidad", desc: "Añade al carrito y cotiza por WhatsApp en un clic.", icon: "↗", accent: "bg-[#C69A2E]" },
    { title: "Innovación", desc: "Textil con mirada tech: cálido, creativo y eficiente.", icon: "⬢", accent: "bg-[#23433E]" },
  ];
  return (
    <section className="py-16 lg:py-20 bg-[#EBE0C8]/50 border-y border-[#DDD2BB]">
      <div className="mx-auto max-w-[1280px] w-[min(1280px,calc(100%-32px))] max-sm:w-[min(1280px,calc(100%-20px))]">
        <h2 className="font-[Fraunces] text-[26px] sm:text-[30px] font-bold text-center tracking-tight text-[#1A2E2A]">Por qué elegir Kotton Kids</h2>
        <p className="text-center text-[#6B6560] text-sm mt-2 max-w-[560px] mx-auto">Calidez textil + precisión contemporánea. Pensado para creadores, diseñadores y talleres que valoran el detalle.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {items.map(b => (
            <div key={b.title} className="bg-[#FFFBF5] border border-[#DDD2BB] rounded-[20px] p-5 shadow-[0_8px_28px_rgba(46,42,36,0.06)] hover:shadow-[0_12px_32px_rgba(46,42,36,0.10)] hover:-translate-y-1 transition-all duration-300 group">
              <div className={`w-10 h-10 rounded-xl ${b.accent} text-white grid place-items-center font-black text-sm shadow-sm group-hover:scale-110 transition-transform`}>{b.icon}</div>
              <div className="font-bold mt-4 text-[#1A2E2A]">{b.title}</div>
              <div className="text-[13px] text-[#6B6560] mt-1.5 leading-relaxed">{b.desc}</div>
              <div className="mt-3 w-8 h-px bg-[#DDD2BB] group-hover:w-12 group-hover:bg-[#9E4D2E] transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

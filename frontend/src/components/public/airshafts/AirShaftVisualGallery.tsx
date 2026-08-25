"use client";

import ScrollReveal from "@/components/public/ScrollReveal";
import Container from "@/components/public/ui/Container";

const visuals = [
  { src: "data:image/webp;base64,UklGRsQPAABXRUJQVlA4WAoAAAAQAAAASwEAAJoAAAABAA==", title: "Airshaft Construction", text: "Precision engineered pneumatic airshaft assembly for secure roll clamping and web handling." },
  { src: "data:image/webp;base64,UklGRsQPAABXRUJQVlA4WAoAAAAQAAAASwEAAJoAAAABAA==", title: "Differential Airshaft", text: "Multi-section differential configuration for controlled winding and independent roll tension." },
  { src: "data:image/webp;base64,UklGRsQPAABXRUJQVlA4WAoAAAAQAAAASwEAAJoAAAABAA==", title: "Keyed Airshaft", text: "Keyed shaft configuration designed for positive torque transmission and secure roll handling." },
];

export default function AirShaftVisualGallery() {
  return (
    <section className="relative overflow-hidden bg-[#0E1729] py-20 sm:py-28">
      <div aria-hidden className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-[#4274D9]/15 blur-[140px]" />
      <Container className="relative">
        <ScrollReveal>
          <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-[#95CCDD]">Airshaft visuals</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-black leading-[.9] tracking-[-.04em] text-white sm:text-6xl">BUILT FOR THE <span className="text-[#95CCDD]">WEB HANDLING PROCESS.</span></h2>
        </ScrollReveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {visuals.map((visual, index) => (
            <ScrollReveal key={visual.title} delay={index * 90}>
              <article className="group overflow-hidden rounded-3xl border border-white/10 bg-[#13213A] p-4 shadow-[0_20px_70px_rgba(0,0,0,.18)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#F36A21]/55">
                <div className="aspect-[12/5] overflow-hidden rounded-2xl border border-[#95CCDD]/15 bg-[#0B1220]">
                  <img src={visual.src} alt={visual.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{visual.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{visual.text}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

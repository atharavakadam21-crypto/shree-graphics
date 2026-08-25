"use client";

import Image from "next/image";
import ScrollReveal from "@/components/public/ScrollReveal";
import Container from "@/components/public/ui/Container";

const visuals = [
  { src: "/images/airshafts/airshaft-standard.svg", title: "Airshaft construction", text: "A visual overview of the shaft assembly and expanding elements." },
  { src: "/images/airshafts/airshaft-differential.svg", title: "Differential configuration", text: "A configuration suited to controlled multi-roll winding applications." },
  { src: "/images/airshafts/airshaft-keyed.svg", title: "Keyed configuration", text: "A precision-oriented shaft arrangement for secure roll handling." },
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
              <article className="group overflow-hidden rounded-3xl border border-white/10 bg-[#0B1220]/70 p-4 backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#95CCDD]/35">
                <div className="relative aspect-[12/5] overflow-hidden rounded-2xl border border-white/8 bg-[#08101F]">
                  <Image src={visual.src} alt={visual.title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-contain p-3 transition duration-500 group-hover:scale-105" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{visual.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{visual.text}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

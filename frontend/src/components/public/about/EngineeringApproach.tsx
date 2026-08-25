"use client";

import ScrollReveal from "@/components/public/ScrollReveal";

const principles = [
  { number: "01", title: "PRECISION", description: "Machine construction and process control are approached with attention to dimensional accuracy, alignment and repeatable operation." },
  { number: "02", title: "RELIABILITY", description: "Industrial equipment must work consistently in production. The engineering approach prioritises dependable operation and serviceability." },
  { number: "03", title: "APPLICATION", description: "The machine exists to solve a production problem. Process requirements remain central to the way equipment is configured and developed." },
];

export default function EngineeringApproach() {
  return (
    <section className="relative overflow-hidden border-y border-[#4274D9]/15 bg-[#0B1220] py-24 sm:py-32 lg:py-40">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute -left-32 top-0 h-[32rem] w-[32rem] rounded-full bg-[#4274D9]/14 blur-[150px]" />
        <div className="absolute bottom-0 right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[#95CCDD]/10 blur-[140px]" />
      </div>
      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[0.3fr_0.7fr]">
          <ScrollReveal><div className="sticky top-24 self-start"><p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#95CCDD]">03 / Engineering</p><h2 className="mt-8 max-w-sm text-4xl font-semibold leading-[0.9] tracking-[-0.05em] text-white sm:text-5xl">ENGINEERED<br />AROUND<br /><span className="text-[#95CCDD]">THE PROCESS.</span></h2></div></ScrollReveal>
          <div className="border-t border-white/10">
            {principles.map((item,index)=><ScrollReveal key={item.number} delay={index*100}><article className="grid gap-8 border-b border-white/10 py-10 transition-colors hover:bg-white/[0.025] sm:grid-cols-[90px_1fr_1.2fr] sm:items-start sm:px-5"><span className="font-mono text-[10px] tracking-[0.2em] text-[#95CCDD]">{item.number}</span><h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">{item.title}</h3><p className="max-w-lg text-sm leading-7 text-slate-400">{item.description}</p></article></ScrollReveal>)}
          </div>
        </div>
      </div>
    </section>
  );
}

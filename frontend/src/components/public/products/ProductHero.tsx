import ScrollReveal from "@/components/public/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import TechnicalGrid from "@/components/ui/TechnicalGrid";

export default function ProductHero() {
  return <section className="relative min-h-[72svh] overflow-hidden border-b border-[#95CCDD]/15 bg-[#0B1220]">
    <div aria-hidden className="absolute -left-32 top-0 h-[38rem] w-[38rem] rounded-full bg-[#4274D9]/22 blur-[160px]"/>
    <div aria-hidden className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-[#F36A21]/12 blur-[130px]"/>
    <TechnicalGrid className="relative min-h-[72svh]">
      <div className="mx-auto flex min-h-[72svh] max-w-[1600px] items-end px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24"><div className="grid w-full gap-12 lg:grid-cols-[1fr_280px] lg:items-end">
        <ScrollReveal><SectionLabel number="01">Machine catalogue / Shree Graphics</SectionLabel><h1 className="mt-9 max-w-6xl text-[clamp(4rem,10vw,9rem)] font-semibold uppercase leading-[0.78] tracking-[-0.075em] text-white">Machine<br/><span className="ml-[7vw] bg-gradient-to-r from-[#95CCDD] via-white to-[#F36A21] bg-clip-text text-transparent">Systems.</span></h1><p className="mt-10 max-w-xl border-l-2 border-[#F36A21] pl-4 text-sm leading-7 text-slate-300">Industrial machinery engineered for label printing, converting, slitting, die cutting and production environments.</p></ScrollReveal>
        <ScrollReveal delay={150}><div className="border-l border-[#95CCDD]/20 pl-5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#95CCDD]/70"><div className="border-b border-[#95CCDD]/15 pb-5"><span className="text-[#F36A21]">INDEX</span><p className="mt-2 text-slate-400">SG / MACHINE DATABASE</p></div><div className="border-b border-[#95CCDD]/15 py-5"><p>Systems</p><p className="mt-2 text-slate-200">Production equipment</p></div><div className="border-b border-[#95CCDD]/15 py-5"><p>Status</p><p className="mt-2 flex items-center gap-2 text-[#95CCDD]"><span className="h-1.5 w-1.5 rounded-full bg-[#F36A21]"/>Operational</p></div><div className="pt-5"><p>Availability</p><p className="mt-2 text-slate-200">Direct enquiry</p></div></div></ScrollReveal>
      </div></div>
    </TechnicalGrid>
  </section>;
}

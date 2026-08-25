import ScrollReveal from "@/components/public/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import TechnicalGrid from "@/components/ui/TechnicalGrid";

export default function ProductHero() {
  return <section className="relative min-h-[72svh] overflow-hidden border-b border-[#95CCDD]/20 bg-[#13213A]">
    <div aria-hidden className="absolute inset-0 bg-[linear-gradient(120deg,#101E38_0%,#19325B_48%,#0F1C33_100%)]"/>
    <div aria-hidden className="absolute -left-24 top-[-8rem] h-[42rem] w-[42rem] rounded-full bg-[#4274D9]/35 blur-[150px]"/>
    <div aria-hidden className="absolute right-[-8rem] bottom-[-10rem] h-[34rem] w-[34rem] rounded-full bg-[#F36A21]/18 blur-[140px]"/>
    <TechnicalGrid className="relative min-h-[72svh]">
      <div className="mx-auto flex min-h-[72svh] max-w-[1600px] items-end px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24"><div className="grid w-full gap-12 lg:grid-cols-[1fr_280px] lg:items-end">
        <ScrollReveal><SectionLabel number="01">Our Products / Shree Graphics</SectionLabel><h1 className="mt-9 max-w-6xl text-[clamp(4rem,10vw,9rem)] font-semibold uppercase leading-[0.78] tracking-[-0.075em] text-white">Our<br/><span className="ml-[7vw] bg-gradient-to-r from-white via-[#95CCDD] to-[#F36A21] bg-clip-text text-transparent">Products.</span></h1><p className="mt-10 max-w-xl border-l-2 border-[#F36A21] bg-[#0B1220]/20 py-2 pl-4 text-sm leading-7 text-slate-100">Explore Shree Graphics products for label printing, converting, slitting, die cutting and production environments.</p></ScrollReveal>
        <ScrollReveal delay={150}><div className="rounded-2xl border border-[#95CCDD]/20 bg-[#0B1220]/30 p-5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#95CCDD]/80 backdrop-blur-md"><div className="border-b border-[#95CCDD]/20 pb-5"><span className="text-[#F36A21]">INDEX</span><p className="mt-2 text-slate-300">SG / PRODUCT CATALOGUE</p></div><div className="border-b border-[#95CCDD]/20 py-5"><p>Products</p><p className="mt-2 text-white">Production equipment</p></div><div className="border-b border-[#95CCDD]/20 py-5"><p>Status</p><p className="mt-2 flex items-center gap-2 text-[#95CCDD]"><span className="h-1.5 w-1.5 rounded-full bg-[#F36A21]"/>Operational</p></div><div className="pt-5"><p>Availability</p><p className="mt-2 text-white">Direct enquiry</p></div></div></ScrollReveal>
      </div></div>
    </TechnicalGrid>
  </section>;
}

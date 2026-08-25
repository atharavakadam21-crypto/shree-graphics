"use client";

import { useState } from "react";
import { ArrowRight, Crosshair, Gauge, MoveUpRight } from "lucide-react";
import ScrollReveal from "@/components/public/ScrollReveal";

const BLUE = "#4274D9";
const ICE = "#95CCDD";
const ORANGE = "#F36A21";

const principles = [
  { number: "01", title: "APPLICATION", text: "Machinery is developed around the material, converting process and production requirement.", icon: Crosshair },
  { number: "02", title: "ENGINEERING", text: "Mechanical systems are planned with practical operation, maintainability and machine integration in mind.", icon: Gauge },
  { number: "03", title: "RELIABILITY", text: "A machine should remain dependable throughout the work it is designed to perform.", icon: MoveUpRight },
];

export default function TechnicalStatement() {
  const [active, setActive] = useState(0);
  const current = principles[active];
  const CurrentIcon = current.icon;

  return <section id="philosophy" className="relative overflow-hidden border-y border-[#95CCDD]/20 bg-[linear-gradient(135deg,#0B1220_0%,#101B31_52%,#13213A_100%)] py-20 sm:py-24 lg:py-32">
    <div aria-hidden className="pointer-events-none absolute inset-0 opacity-35" style={{ backgroundImage:"linear-gradient(to right,rgba(149,204,221,.055) 1px,transparent 1px),linear-gradient(to bottom,rgba(149,204,221,.055) 1px,transparent 1px)", backgroundSize:"72px 72px" }} />
    <div aria-hidden className="pointer-events-none absolute -right-24 top-1/3 h-[460px] w-[460px] rounded-full bg-[#4274D9]/20 blur-[130px]" />
    <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-[#F36A21]/10 blur-[120px]" />
    <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
      <ScrollReveal delay={0}><div className="mb-12 flex items-center justify-between border-b border-[#95CCDD]/20 pb-5"><div className="flex items-center gap-3"><span className="h-px w-8 bg-[#F36A21]"/><span className="font-mono text-[9px] font-bold uppercase tracking-[.22em] text-[#F36A21]">05 / Engineering Philosophy</span></div><span className="hidden font-mono text-[8px] uppercase tracking-[.18em] text-[#95CCDD]/55 sm:block">SHREE GRAPHICS / SG</span></div></ScrollReveal>
      <ScrollReveal delay={120}><div className="grid gap-12 lg:grid-cols-[1fr_330px] lg:gap-16"><div><div className="mb-7 flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#F36A21]/50 bg-[#F36A21]/10"><CurrentIcon size={15} className="text-[#F36A21]"/></span><span className="font-mono text-[8px] font-bold uppercase tracking-[.18em] text-[#95CCDD]/60">{current.number} / {current.title}</span></div><h2 className="max-w-6xl font-display text-4xl font-black uppercase leading-[.9] tracking-[-.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.6rem]">MACHINERY<br/><span className="text-[#95CCDD]">SHOULD SERVE</span><br/><span className="text-[#F36A21]">THE PROCESS.</span></h2><div className="mt-8 max-w-2xl border-l-2 border-[#4274D9] pl-5 sm:mt-10 sm:pl-6"><p className="text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">At Shree Graphics, machinery begins with the application. The objective is not simply to produce equipment, but to create a practical system that fits the customer's converting requirement.</p></div></div>
      <div className="lg:pt-4"><div className="overflow-hidden rounded-2xl border border-[#95CCDD]/20 bg-[#13213A]/80 shadow-[0_20px_70px_rgba(0,0,0,.18)] backdrop-blur-xl"><div className="flex min-h-[54px] items-center justify-between border-b border-[#95CCDD]/15 px-5"><span className="font-mono text-[8px] font-bold uppercase tracking-[.18em] text-[#95CCDD]/70">Design Principles</span><span className="font-mono text-[8px] text-[#F36A21]">{current.number}</span></div>{principles.map((principle,index)=>{const Icon=principle.icon;const selected=active===index;return <button key={principle.number} type="button" onClick={()=>setActive(index)} className={`group relative flex min-h-[82px] w-full items-center gap-4 border-b border-[#95CCDD]/10 px-5 text-left transition-all duration-300 ${selected?"bg-[#4274D9]/12":"hover:bg-white/[.035]"}`}><span className="font-mono text-[8px]" style={{color:selected?ORANGE:"#95CCDD"}}>{principle.number}</span><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border" style={{borderColor:selected?`${ORANGE}88`:`${ICE}44`}}><Icon size={13} style={{color:selected?ORANGE:BLUE}}/></span><span className={`font-display text-base font-bold uppercase ${selected?"text-white":"text-slate-300"}`}>{principle.title}</span>{selected&&<span className="absolute bottom-0 left-0 h-px w-full bg-[#F36A21]"/>}</button>})}<div className="p-5"><div className="mb-3 font-mono text-[8px] uppercase tracking-[.16em] text-[#95CCDD]/55">Principle / {current.number}</div><p className="text-sm leading-6 text-slate-300">{current.text}</p></div></div></div></div></ScrollReveal>
      <ScrollReveal delay={240}><div className="mt-14 grid gap-6 border-y border-[#95CCDD]/15 py-6 sm:mt-20 sm:grid-cols-3">{[["01","Understand","Application first",ORANGE],["02","Engineer","Build the system",BLUE],["03","Deliver","Ready for production",ORANGE]].map(([n,title,sub,color],i)=><div key={String(n)} className={`flex items-center gap-4 ${i?"sm:border-l sm:border-[#95CCDD]/15 sm:pl-6":""}`}><span className="font-display text-3xl font-black" style={{color:String(color)}}>{n}</span><div><div className="font-display text-base font-bold uppercase text-white">{title}</div><div className="mt-1 font-mono text-[7px] uppercase tracking-[.14em] text-[#95CCDD]/60">{sub}</div></div></div>)}</div></ScrollReveal>
      <ScrollReveal delay={360}><div className="mt-12 flex flex-col gap-6 sm:mt-16 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-3xl"><div className="font-mono text-[8px] font-bold uppercase tracking-[.2em] text-[#F36A21]">THE SHREE GRAPHICS APPROACH</div><blockquote className="mt-4 font-display text-2xl font-bold uppercase leading-[.95] text-slate-100 sm:text-3xl lg:text-4xl">Precision is not a feature added at the end. It is part of how the machine is conceived.</blockquote></div><a href="/about" className="group inline-flex min-h-11 shrink-0 items-center gap-4 font-mono text-[9px] font-bold uppercase tracking-[.17em] text-[#95CCDD] transition-colors hover:text-white"><span>Our engineering approach</span><ArrowRight size={15} className="text-[#F36A21] transition-transform duration-300 group-hover:translate-x-2"/></a></div></ScrollReveal>
    </div>
  </section>;
}

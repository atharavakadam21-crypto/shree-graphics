"use client";

import Image from "next/image";
import { ArrowLeft, Bot, X } from "lucide-react";

interface AssistantHeaderProps { title:string; subtitle?:string; onBack?:()=>void; onClose:()=>void; }

export default function AssistantHeader({ title, subtitle, onBack, onClose }: AssistantHeaderProps) {
  return <header className="flex items-start justify-between border-b border-white/[0.09] bg-white/[0.025] px-4 py-3.5 sm:px-5 sm:py-4">
    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
      {onBack&&<button type="button" onClick={onBack} aria-label="Back" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-slate-400 transition hover:border-[#95CCDD]/50 hover:text-white sm:h-10 sm:w-10"><ArrowLeft size={17}/></button>}
      <div className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border border-[#95CCDD]/45 bg-[#0A1324] p-1 shadow-[0_0_24px_rgba(66,116,217,.2)] sm:h-14 sm:w-14"><Image src="/logo/sg-logo.png" alt="Shree Graphics" fill sizes="(max-width:639px) 44px, 56px" className="object-contain p-1" priority/><span className="absolute -bottom-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full border border-[#0B1220] bg-[#F36A21] text-white"><Bot size={9}/></span></div>
      <div className="min-w-0"><p className="text-[8px] font-semibold uppercase tracking-[.18em] text-[#95CCDD] sm:text-[9px] sm:tracking-[.22em]">Shree Graphics AI</p><h2 className="mt-1 truncate text-sm font-semibold tracking-tight text-white sm:text-base">{title}</h2>{subtitle&&<p className="mt-1 line-clamp-2 max-w-[220px] text-[10px] leading-4 text-slate-400 sm:max-w-[260px] sm:text-xs sm:leading-5">{subtitle}</p>}</div>
    </div>
    <button type="button" onClick={onClose} aria-label="Close assistant" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-slate-400 transition hover:border-[#95CCDD]/50 hover:text-white sm:h-10 sm:w-10"><X size={18}/></button>
  </header>;
}

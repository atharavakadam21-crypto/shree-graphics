"use client";

import { Bot, Sparkles } from "lucide-react";
import AssistantHeader from "./AssistantHeader";
import AssistantMenu from "./AssistantMenu";
import MachineFinder from "./wizard/MachineFinder";
import type { AssistantView } from "./Assistant";

interface AssistantPanelProps { view:AssistantView; onViewChange:(view:AssistantView)=>void; onClose:()=>void; }

export default function AssistantPanel({ view,onViewChange,onClose }:AssistantPanelProps){
 return <div className="fixed inset-x-2.5 bottom-[calc(0.5rem+env(safe-area-inset-bottom))] z-[100] flex max-h-[min(720px,calc(100svh-1rem))] min-h-[420px] flex-col overflow-hidden rounded-[1.5rem] border border-white/12 bg-[#0B1220]/[0.97] shadow-[0_24px_80px_rgba(0,0,0,.55)] backdrop-blur-2xl sm:inset-auto sm:bottom-7 sm:right-7 sm:min-h-0 sm:w-[440px] sm:max-h-[min(760px,calc(100svh-3.5rem))] sm:rounded-[2rem] sm:shadow-[0_30px_100px_rgba(0,0,0,.55)]">
   <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[#4274D9]/18 blur-[85px] sm:h-56 sm:w-56"/>
   <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[#F36A21]/10 blur-[70px]"/>
   <div className="relative flex min-h-0 flex-1 flex-col">
    {view==="menu"?<><AssistantHeader title="Engineering Support" subtitle="Your digital guide to Shree Graphics machinery." onClose={onClose}/><div className="min-h-0 flex-1 overflow-y-auto overscroll-contain"><AssistantMenu onFinder={()=>onViewChange("finder")}/></div></>:<><AssistantHeader title="Machine Finder" subtitle="Answer a few questions and we'll guide you toward the relevant machine." onBack={()=>onViewChange("menu")} onClose={onClose}/><div className="min-h-0 flex-1 overflow-y-auto overscroll-contain"><MachineFinder/></div></>}
    <div className="flex shrink-0 items-center justify-between border-t border-white/[0.08] bg-white/[0.025] px-4 py-2.5 sm:px-5 sm:py-3"><div className="flex items-center gap-2"><Bot size={12} className="text-[#95CCDD]"/><p className="font-mono text-[7px] uppercase tracking-[.16em] text-slate-500 sm:text-[8px] sm:tracking-[.2em]">SHREE GRAPHICS / AI SUPPORT</p></div><Sparkles size={12} className="text-[#F36A21]"/></div>
   </div>
 </div>;
}

"use client";

import AssistantHeader from "./AssistantHeader";
import AssistantMenu from "./AssistantMenu";
import MachineFinder from "./wizard/MachineFinder";
import type { AssistantView } from "./Assistant";

interface AssistantPanelProps { view: AssistantView; onViewChange: (view: AssistantView) => void; onClose: () => void; }

export default function AssistantPanel({ view,onViewChange,onClose }: AssistantPanelProps) {
  return (
    <div className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-[100] max-h-[calc(100svh-1.5rem)] overflow-hidden rounded-[2rem] border border-white/12 bg-[#0B1220]/95 shadow-[0_30px_100px_rgba(0,0,0,.55)] backdrop-blur-2xl sm:inset-auto sm:bottom-7 sm:right-7 sm:w-[440px]">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#4274D9]/18 blur-[90px]" />
      <div className="relative">
        {view === "menu" ? <><AssistantHeader title="Engineering Support" subtitle="Your digital guide to Shree Graphics machinery." onClose={onClose}/><div className="max-h-[calc(100svh-180px)] overflow-y-auto"><AssistantMenu onFinder={() => onViewChange("finder")}/></div></> : <><AssistantHeader title="Machine Finder" subtitle="Answer a few questions and we'll guide you toward the relevant machine." onBack={() => onViewChange("menu")} onClose={onClose}/><div className="max-h-[calc(100svh-180px)] overflow-y-auto"><MachineFinder/></div></>}
        <div className="border-t border-white/10 bg-white/[0.025] px-5 py-3"><p className="font-mono text-[8px] uppercase tracking-[0.2em] text-slate-500">SHREE GRAPHICS / ENGINEERING SUPPORT</p></div>
      </div>
    </div>
  );
}

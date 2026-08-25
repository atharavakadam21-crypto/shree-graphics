"use client";

import { Sparkles } from "lucide-react";
import AssistantItem from "./AssistantItem";
import { assistantActions } from "./assistantData";

interface AssistantMenuProps { onFinder: () => void; }

export default function AssistantMenu({ onFinder }: AssistantMenuProps) {
  return (
    <div>
      <div className="border-b border-white/[0.08] px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#4274D9]/35 bg-[#4274D9]/10 text-[#95CCDD]"><Sparkles size={16}/></span>
          <div><p className="font-mono text-[8px] font-bold uppercase tracking-[.17em] text-[#F36A21]">How can I help?</p><p className="mt-1.5 max-w-sm text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">Find the right product, explore spare parts, contact our team, or navigate Shree Graphics.</p></div>
        </div>
      </div>
      <div>{assistantActions.map((action,index)=><AssistantItem key={action.id} id={action.id} number={String(index+1).padStart(2,"0")} title={action.title} description={action.description} accent={action.id==="finder"} onClick={()=>{if(action.id==="finder"){onFinder();return;}action.action();}}/>)}</div>
    </div>
  );
}

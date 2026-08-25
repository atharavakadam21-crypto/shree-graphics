"use client";

import { Bot } from "lucide-react";

interface AssistantButtonProps {
  onClick?: () => void;
  label?: string;
}

export default function AssistantButton({ onClick, label = "Shree AI" }: AssistantButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open Shree AI assistant"
      className="group fixed bottom-5 right-5 z-[100] flex items-center gap-3 rounded-full border border-white/15 bg-[#0B1220]/90 px-3 py-3 text-left shadow-[0_18px_55px_rgba(0,0,0,.35)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#95CCDD]/60 hover:shadow-[0_20px_65px_rgba(66,116,217,.25)] sm:bottom-7 sm:right-7"
    >
      <span className="relative grid h-11 w-11 place-items-center rounded-full border border-[#95CCDD]/45 bg-gradient-to-br from-[#4274D9] to-[#1D315E] text-white shadow-inner shadow-white/10">
        <Bot size={20} strokeWidth={1.8} />
        <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#0B1220] bg-[#95CCDD]" />
      </span>
      <span className="hidden pr-2 sm:block">
        <span className="block text-[9px] font-semibold uppercase tracking-[.18em] text-[#95CCDD]">Engineering assistant</span>
        <span className="mt-0.5 block text-sm font-semibold text-white">{label}</span>
      </span>
    </button>
  );
}

"use client";

import type { ComponentType } from "react";
import { ArrowUpRight, Boxes, Cpu, Info, Phone, Search, Wrench } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const icons: Record<string, ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  finder: Search,
  products: Boxes,
  parts: Wrench,
  engineer: Cpu,
  call: Phone,
  about: Info,
};

interface AssistantItemProps {
  id?: string;
  number: string;
  title: string;
  description: string;
  onClick: () => void;
  accent?: boolean;
}

export default function AssistantItem({ id = "", number, title, description, onClick, accent = false }: AssistantItemProps) {
  const Icon = icons[id] ?? Cpu;
  const isWhatsapp = id === "whatsapp";
  return (
    <button type="button" onClick={onClick} className={`group relative flex w-full items-center gap-3 border-b border-white/[0.07] px-4 py-3.5 text-left transition-all duration-300 last:border-b-0 hover:bg-white/[0.035] sm:gap-4 sm:px-5 sm:py-4 ${accent ? "bg-[#4274D9]/[0.045]" : ""}`}>
      <span className={`absolute bottom-0 left-0 top-0 w-[2px] transition-transform duration-300 ${accent ? "scale-y-100 bg-[#F36A21]" : "scale-y-0 bg-[#4274D9] group-hover:scale-y-100"}`} />
      <span className="hidden w-5 shrink-0 font-mono text-[8px] tracking-[.08em] text-[#95CCDD]/55 sm:block">{number}</span>
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border transition-all duration-300 sm:h-11 sm:w-11 ${isWhatsapp ? "border-[#25D366]/45 bg-[#25D366]/10 text-[#25D366]" : accent ? "border-[#F36A21]/45 bg-[#F36A21]/10 text-[#F36A21]" : "border-[#95CCDD]/20 bg-[#0B1220]/55 text-[#95CCDD] group-hover:border-[#4274D9]/60 group-hover:bg-[#4274D9]/10"}`}>
        {isWhatsapp ? <FaWhatsapp size={19} aria-label="WhatsApp" /> : <Icon size={17} strokeWidth={1.8} />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.07em] text-slate-100 transition-colors group-hover:text-white sm:text-xs">{title}</span>
        <span className="mt-1 block line-clamp-2 text-[10px] leading-4 text-slate-500 sm:text-[11px] sm:leading-5">{description}</span>
      </span>
      <ArrowUpRight size={16} className={`shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isWhatsapp ? "text-[#25D366]/55 group-hover:text-[#25D366]" : "text-[#95CCDD]/40 group-hover:text-[#F36A21]"}`} />
    </button>
  );
}

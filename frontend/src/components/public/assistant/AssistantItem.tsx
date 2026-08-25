"use client";

import type { ComponentType } from "react";
import { ArrowUpRight, Boxes, Cpu, Info, Phone, Search, Wrench } from "lucide-react";

const icons: Record<string, ComponentType<{ size?: number; strokeWidth?: number }>> = {
  finder: Search,
  products: Boxes,
  parts: Wrench,
  engineer: Cpu,
  call: Phone,
  about: Info,
};

function WhatsAppIcon({ size = 19 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M19.11 17.53c-.27-.14-1.57-.77-1.82-.86-.24-.09-.42-.14-.6.14-.18.27-.69.86-.85 1.04-.16.18-.31.2-.58.07-1.6-.8-2.65-1.43-3.7-3.25-.28-.49.28-.46.8-1.53.09-.18.05-.34-.02-.48-.07-.14-.6-1.44-.82-1.97-.21-.51-.43-.44-.6-.45h-.51c-.18 0-.47.07-.72.34-.25.27-.94.92-.94 2.24s.96 2.6 1.1 2.78c.13.18 1.88 2.87 4.55 4.03.63.27 1.12.43 1.5.55.63.2 1.2.17 1.65.1.5-.07 1.57-.64 1.79-1.25.22-.62.22-1.15.15-1.25-.07-.11-.25-.18-.52-.32Z" />
      <path fillRule="evenodd" d="M16 3.2a12.8 12.8 0 0 0-10.99 19.36L3.2 28.8l6.39-1.67A12.8 12.8 0 1 0 16 3.2Zm0 2.33a10.47 10.47 0 0 1 8.9 15.98 10.47 10.47 0 0 1-13.9 3.8l-.5-.27-3.79.99.99-3.69-.29-.52A10.47 10.47 0 1 1 16 5.53Z" clipRule="evenodd" />
    </svg>
  );
}

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
        {isWhatsapp ? <WhatsAppIcon size={20} /> : <Icon size={17} strokeWidth={1.8} />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.07em] text-slate-100 transition-colors group-hover:text-white sm:text-xs">{title}</span>
        <span className="mt-1 block line-clamp-2 text-[10px] leading-4 text-slate-500 sm:text-[11px] sm:leading-5">{description}</span>
      </span>
      <ArrowUpRight size={16} className={`shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isWhatsapp ? "text-[#25D366]/55 group-hover:text-[#25D366]" : "text-[#95CCDD]/40 group-hover:text-[#F36A21]"}`} />
    </button>
  );
}

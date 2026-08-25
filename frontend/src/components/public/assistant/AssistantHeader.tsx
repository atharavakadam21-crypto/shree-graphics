"use client";

import Image from "next/image";

interface AssistantHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  onClose: () => void;
}

export default function AssistantHeader({ title, subtitle, onBack, onClose }: AssistantHeaderProps) {
  return (
    <header className="flex items-start justify-between border-b border-white/10 bg-white/[0.025] px-5 py-4">
      <div className="flex min-w-0 items-start gap-3">
        {onBack && <button type="button" onClick={onBack} aria-label="Back" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-slate-400 transition hover:border-[#95CCDD]/50 hover:text-white">←</button>}
        <div className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full border border-[#95CCDD]/45 bg-[#0A1324] p-1 shadow-[0_0_28px_rgba(66,116,217,.2)]">
          <Image src="/logo/sg-logo.png" alt="Shree Graphics" fill sizes="56px" className="object-contain p-1" priority />
        </div>
        <div className="min-w-0 pt-0.5">
          <p className="text-[9px] font-semibold uppercase tracking-[.22em] text-[#95CCDD]">Shree Graphics AI</p>
          <h2 className="mt-1 truncate text-base font-semibold tracking-tight text-white">{title}</h2>
          {subtitle && <p className="mt-1 max-w-[260px] text-xs leading-5 text-slate-400">{subtitle}</p>}
        </div>
      </div>
      <button type="button" onClick={onClose} aria-label="Close assistant" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-lg text-slate-400 transition hover:border-[#95CCDD]/50 hover:text-white">×</button>
    </header>
  );
}

"use client";

interface AssistantItemProps {
  number: string;
  title: string;
  description: string;
  onClick: () => void;
  accent?: boolean;
}

export default function AssistantItem({
  number,
  title,
  description,
  onClick,
  accent = false,
}: AssistantItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex min-h-[72px] w-full items-center gap-4 border-b border-zinc-800 px-5 py-4 text-left transition-colors hover:border-zinc-700 hover:bg-white/[0.025]"
    >
      <span
        className={`font-mono text-[9px] ${
          accent ? "text-cyan-400" : "text-zinc-700"
        }`}
      >
        {number}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-xs font-medium uppercase tracking-[0.08em] text-zinc-200 transition-colors group-hover:text-white">
          {title}
        </span>

        <span className="mt-1 block text-[11px] leading-5 text-zinc-600">
          {description}
        </span>
      </span>

      <span className="text-zinc-700 transition-all group-hover:translate-x-1 group-hover:text-cyan-400">
        →
      </span>
    </button>
  );
}

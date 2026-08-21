"use client";

interface OptionCardProps {
  label: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export default function OptionCard({
  label,
  description,
  selected,
  onClick,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full border px-4 py-4 text-left transition-all ${
        selected
          ? "border-cyan-500/70 bg-cyan-500/[0.07]"
          : "border-zinc-800 bg-[#0a0b0b] hover:border-zinc-600"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center border ${
            selected
              ? "border-cyan-400 bg-cyan-400"
              : "border-zinc-700"
          }`}
        >
          {selected && (
            <span className="h-1.5 w-1.5 bg-black" />
          )}
        </span>

        <span>
          <span className="block text-xs font-medium text-zinc-200">
            {label}
          </span>

          <span className="mt-1 block text-[10px] leading-5 text-zinc-600">
            {description}
          </span>
        </span>
      </div>
    </button>
  );
}

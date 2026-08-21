"use client";

interface AssistantHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  onClose: () => void;
}

export default function AssistantHeader({
  title,
  subtitle,
  onBack,
  onClose,
}: AssistantHeaderProps) {
  return (
    <header className="flex items-start justify-between border-b border-zinc-800 px-5 py-4">
      <div className="flex items-start gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="flex min-h-10 min-w-10 items-center justify-center border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white"
          >
            ←
          </button>
        )}

        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-cyan-400" />
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-cyan-400">
              SHREE GRAPHICS AI
            </p>
          </div>

          <h2 className="mt-2 text-base font-semibold tracking-tight text-white">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-1 max-w-[280px] text-xs leading-5 text-zinc-500">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close assistant"
        className="flex min-h-10 min-w-10 items-center justify-center border border-zinc-800 text-lg text-zinc-500 transition-colors hover:border-zinc-600 hover:text-white"
      >
        ×
      </button>
    </header>
  );
}

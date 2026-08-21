"use client";

interface ResultCardProps {
  machineName: string;
  reason: string;
  slug?: string;
  onRestart: () => void;
}

export default function ResultCard({
  machineName,
  reason,
  slug,
  onRestart,
}: ResultCardProps) {
  return (
    <div className="p-5">
      <div className="border-l-2 border-cyan-500 bg-cyan-500/[0.04] p-5">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-400">
          Recommended direction
        </p>

        <h3 className="mt-4 text-2xl font-semibold leading-none tracking-[-0.04em] text-white">
          {machineName}
        </h3>

        <p className="mt-4 text-xs leading-6 text-zinc-500">
          {reason}
        </p>

        {slug && (
          <a
            href={`/products/${slug}`}
            className="mt-6 flex min-h-11 items-center justify-between border border-cyan-500/50 px-4 text-[10px] font-medium uppercase tracking-[0.15em] text-cyan-400 transition-colors hover:bg-cyan-500 hover:text-black"
          >
            <span>View Machine</span>
            <span>↗</span>
          </a>
        )}
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="mt-3 flex min-h-11 w-full items-center justify-center border border-zinc-800 text-[10px] uppercase tracking-[0.15em] text-zinc-500 transition-colors hover:border-zinc-600 hover:text-white"
      >
        Start Again
      </button>
    </div>
  );
}

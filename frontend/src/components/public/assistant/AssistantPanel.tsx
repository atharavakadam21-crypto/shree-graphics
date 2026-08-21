"use client";

import AssistantHeader from "./AssistantHeader";
import AssistantMenu from "./AssistantMenu";
import MachineFinder from "./wizard/MachineFinder";
import type { AssistantView } from "./Assistant";

interface AssistantPanelProps {
  view: AssistantView;
  onViewChange: (view: AssistantView) => void;
  onClose: () => void;
}

export default function AssistantPanel({
  view,
  onViewChange,
  onClose,
}: AssistantPanelProps) {
  return (
    <div className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-[80] max-h-[calc(100svh-1.5rem)] overflow-hidden border border-zinc-800 bg-[#080909]/[.98] shadow-[0_30px_100px_rgba(0,0,0,.7)] backdrop-blur-2xl sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[420px]">
      {view === "menu" ? (
        <>
          <AssistantHeader
            title="Engineering Support"
            subtitle="Your digital guide to Shree Graphics machinery."
            onClose={onClose}
          />

          <div className="max-h-[calc(100svh-180px)] overflow-y-auto">
            <AssistantMenu
              onFinder={() => onViewChange("finder")}
            />
          </div>
        </>
      ) : (
        <>
          <AssistantHeader
            title="Machine Finder"
            subtitle="Answer a few questions and we'll guide you toward the relevant machine."
            onBack={() => onViewChange("menu")}
            onClose={onClose}
          />

          <div className="max-h-[calc(100svh-180px)] overflow-y-auto">
            <MachineFinder />
          </div>
        </>
      )}

      <div className="border-t border-zinc-900 px-5 py-3">
        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-zinc-700">
          SHREE GRAPHICS / INDUSTRIAL MACHINERY
        </p>
      </div>
    </div>
  );
}

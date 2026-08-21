"use client";

import AssistantItem from "./AssistantItem";
import { assistantActions } from "./assistantData";

interface AssistantMenuProps {
  onFinder: () => void;
}

export default function AssistantMenu({
  onFinder,
}: AssistantMenuProps) {
  return (
    <div>
      <div className="border-b border-zinc-800 px-5 py-5">
        <p className="max-w-sm text-sm leading-6 text-zinc-400">
          I can help you find the right machine, explore spare parts,
          contact sales, or navigate the Shree Graphics website.
        </p>
      </div>

      <div>
        {assistantActions.map((action, index) => (
          <AssistantItem
            key={action.id}
            number={String(index + 1).padStart(2, "0")}
            title={action.title}
            description={action.description}
            accent={action.id === "finder"}
            onClick={() => {
              if (action.id === "finder") {
                onFinder();
                return;
              }

              action.action();
            }}
          />
        ))}
      </div>
    </div>
  );
}

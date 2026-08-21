"use client";

import OptionCard from "./OptionCard";

interface QuestionCardProps {
  question: string;
  description: string;
  options: {
    id: string;
    label: string;
    description: string;
  }[];
  selected?: string;
  onSelect: (id: string) => void;
}

export default function QuestionCard({
  question,
  description,
  options,
  selected,
  onSelect,
}: QuestionCardProps) {
  return (
    <div className="p-5">
      <p className="text-sm font-medium leading-6 text-zinc-200">
        {question}
      </p>

      <p className="mt-2 text-[11px] leading-5 text-zinc-600">
        {description}
      </p>

      <div className="mt-5 grid gap-2">
        {options.map((option) => (
          <OptionCard
            key={option.id}
            label={option.label}
            description={option.description}
            selected={selected === option.id}
            onClick={() => onSelect(option.id)}
          />
        ))}
      </div>
    </div>
  );
}

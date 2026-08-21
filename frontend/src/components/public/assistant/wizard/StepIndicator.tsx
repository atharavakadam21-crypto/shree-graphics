interface StepIndicatorProps {
  current: number;
  total: number;
}

export default function StepIndicator({
  current,
  total,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-2 px-5 pt-5">
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className={`h-[2px] flex-1 ${
            index <= current ? "bg-cyan-500" : "bg-zinc-800"
          }`}
        />
      ))}

      <span className="ml-2 shrink-0 font-mono text-[9px] text-zinc-600">
        {String(current + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
      </span>
    </div>
  );
}

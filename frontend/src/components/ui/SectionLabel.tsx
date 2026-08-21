interface SectionLabelProps {
  number: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({
  number,
  children,
  className = "",
}: SectionLabelProps) {
  return (
    <div
      className={`flex items-center gap-3 border-l-2 border-cyan-500 pl-3 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-400 ${className}`}
    >
      <span className="text-cyan-500">{number}</span>
      <span>{children}</span>
    </div>
  );
}
import ScrollReveal from "@/components/public/ScrollReveal";

interface ProductSpecificationTableProps {
  specifications: Record<string, unknown>;
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) {
    return "—";
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}

export default function ProductSpecificationTable({
  specifications,
}: ProductSpecificationTableProps) {
  const entries = Object.entries(specifications);

  return (
    <ScrollReveal>
      <div className="border-t border-zinc-800">
        {entries.length === 0 ? (
          <div className="border-b border-zinc-800 py-8 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">
            Technical specifications available on enquiry.
          </div>
        ) : (
          entries.map(([label, value], index) => (
            <div
              key={label}
              className="grid gap-3 border-b border-zinc-900 py-5 sm:grid-cols-[1fr_1fr]"
            >
              <div className="flex items-start gap-4">
                <span className="font-mono text-[9px] text-cyan-500">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                  {label.replaceAll("_", " ")}
                </span>
              </div>

              <span className="font-mono text-xs text-zinc-200 sm:text-right">
                {formatValue(value)}
              </span>
            </div>
          ))
        )}
      </div></ScrollReveal>   
    
  );
}
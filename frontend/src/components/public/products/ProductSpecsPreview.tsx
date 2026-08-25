interface ProductSpecsPreviewProps { specifications: Record<string, unknown>; }

export default function ProductSpecsPreview({ specifications }: ProductSpecsPreviewProps) {
  const entries = Object.entries(specifications).slice(0, 4);
  if (entries.length === 0) return <div className="border-t border-[#95CCDD]/15 py-4 font-mono text-[9px] uppercase tracking-[0.14em] text-[#95CCDD]/60">Specifications available on enquiry</div>;
  return <div className="border-t border-[#95CCDD]/15">{entries.map(([label, value]) => <div key={label} className="grid grid-cols-[1fr_auto] gap-4 border-b border-[#95CCDD]/10 py-3 font-mono text-[9px] uppercase tracking-[0.1em]"><span className="truncate text-[#95CCDD]/65">{label.replaceAll("_", " ")}</span><span className="max-w-[150px] truncate text-right text-slate-200">{typeof value === "object" ? JSON.stringify(value) : String(value)}</span></div>)}</div>;
}

import type { Machine } from "@/lib/types";
import ProductCard from "./ProductCard";

interface ProductGridProps { machines: Machine[]; }

export default function ProductGrid({ machines }: ProductGridProps) {
  if (machines.length === 0) {
    return <div className="rounded-3xl border border-[#95CCDD]/20 bg-[#13213A]/80 p-10 text-center shadow-[0_24px_80px_rgba(3,8,20,.25)] backdrop-blur-xl">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#95CCDD]">No machine systems available</p>
    </div>;
  }
  return <div className="grid gap-7 lg:grid-cols-2 lg:gap-10">
    {machines.map((machine, index) => <ProductCard key={machine.id} machine={machine} index={index}/>) }
  </div>;
}

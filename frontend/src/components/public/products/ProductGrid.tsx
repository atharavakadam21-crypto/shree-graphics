import type { Machine } from "@/lib/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  machines: Machine[];
}

export default function ProductGrid({
  machines,
}: ProductGridProps) {
  if (machines.length === 0) {
    return (
      <div className="border border-zinc-800 p-10 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-600">
          No machine systems available
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-7 lg:grid-cols-2 lg:gap-10">
      {machines.map((machine, index) => (
        <ProductCard
          key={machine.id}
          machine={machine}
          index={index}
        />
      ))}
    </div>
  );
}
import Image from "next/image";
import Link from "next/link";
import type { Machine } from "@/lib/types";
import ScrollReveal from "@/components/public/ScrollReveal";
import ProductSpecsPreview from "./ProductSpecsPreview";

interface ProductCardProps {
  machine: Machine;
  index: number;
}

export default function ProductCard({
  machine,
  index,
}: ProductCardProps) {
  const image =
    machine.images?.length > 0
      ? machine.images[0]
      : "/images/logo.png";

  return (
    <ScrollReveal
      delay={(index % 3) * 100}
      className={
        index % 3 === 1
          ? "lg:mt-16"
          : index % 3 === 2
            ? "lg:mt-32"
            : ""
      }
    >
      <Link
        href={`/products/${machine.slug}`}
        className="group block min-h-11"
      >
        <article className="border border-zinc-800 bg-[#080808] transition-colors duration-500 hover:border-zinc-600">
          <div className="relative min-h-[280px] overflow-hidden border-b border-zinc-800 bg-[#0b0b0b] sm:min-h-[360px]">
            <Image
              src={image}
              alt={machine.name}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-contain p-12 grayscale opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
            />

            <div className="absolute left-5 top-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em]">
              <span className="text-cyan-500">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="text-zinc-700">
                / SYSTEM
              </span>
            </div>

            {machine.featured && (
              <div className="absolute right-5 top-5 border-l-2 border-cyan-500 pl-2 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-400">
                Featured
              </div>
            )}

            {!machine.is_active && (
              <div className="absolute bottom-5 left-5 border border-zinc-700 bg-black/70 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-500">
                Currently unavailable
              </div>
            )}
          </div>

          <div className="p-6 sm:p-7">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600">
                  Industrial machinery
                </p>

                <h2 className="mt-4 text-2xl font-medium uppercase leading-tight tracking-tight text-white">
                  {machine.name}
                </h2>
              </div>

              <span className="mt-1 text-lg text-cyan-500 transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </div>

            {machine.short_description && (
              <p className="mt-5 border-l-2 border-zinc-800 pl-4 text-sm leading-6 text-zinc-500 transition-colors group-hover:border-cyan-500">
                {machine.short_description}
              </p>
            )}

            <div className="mt-7">
              <ProductSpecsPreview
                specifications={machine.specifications}
              />
            </div>

            <div className="mt-5 flex min-h-11 items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em]">
              <span className="text-zinc-600">
                Technical details
              </span>

              <span className="text-zinc-400 transition-colors group-hover:text-cyan-400">
                Open →
              </span>
            </div>
          </div>
        </article>
      </Link>
    </ScrollReveal>  
  );
}
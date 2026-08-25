import Image from "next/image";
import Link from "next/link";
import type { Machine } from "@/lib/types";
import ScrollReveal from "@/components/public/ScrollReveal";
import ProductSpecsPreview from "./ProductSpecsPreview";

interface ProductCardProps { machine: Machine; index: number; }

export default function ProductCard({ machine, index }: ProductCardProps) {
  const image = machine.images?.length > 0 ? machine.images[0] : "/images/logo.png";
  return <ScrollReveal delay={(index % 3) * 100} className={index % 3 === 1 ? "lg:mt-16" : index % 3 === 2 ? "lg:mt-32" : ""}>
    <Link href={`/products/${machine.slug}`} className="group block min-h-11">
      <article className="overflow-hidden rounded-[1.75rem] border border-[#95CCDD]/20 bg-[#13213A]/85 shadow-[0_24px_70px_rgba(3,8,20,.22)] transition-all duration-500 hover:-translate-y-1 hover:border-[#F36A21]/60">
        <div className="relative min-h-[280px] overflow-hidden border-b border-[#95CCDD]/15 bg-[#0D1930] sm:min-h-[360px]">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(66,116,217,.28),transparent_60%)]"/>
          <Image src={image} alt={machine.name} fill sizes="(max-width: 1024px) 100vw, 45vw" className="relative object-contain p-12 opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"/>
          <div className="absolute left-5 top-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em]"><span className="text-[#F36A21]">{String(index + 1).padStart(2, "0")}</span><span className="text-[#95CCDD]/70">/ SYSTEM</span></div>
          {machine.featured && <div className="absolute right-5 top-5 border-l-2 border-[#F36A21] pl-2 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-200">Featured</div>}
          {!machine.is_active && <div className="absolute bottom-5 left-5 rounded-full border border-[#F36A21]/40 bg-[#0B1220]/85 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-300">Currently unavailable</div>}
        </div>
        <div className="p-6 sm:p-7"><div className="flex items-start justify-between gap-5"><div><p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#95CCDD]/70">Industrial machinery</p><h2 className="mt-4 text-2xl font-medium uppercase leading-tight tracking-tight text-white">{machine.name}</h2></div><span className="mt-1 text-lg text-[#F36A21] transition-transform duration-300 group-hover:translate-x-1">↗</span></div>
          {machine.short_description && <p className="mt-5 border-l-2 border-[#4274D9] pl-4 text-sm leading-6 text-slate-300 transition-colors group-hover:border-[#F36A21]">{machine.short_description}</p>}
          <div className="mt-7"><ProductSpecsPreview specifications={machine.specifications}/></div>
          <div className="mt-5 flex min-h-11 items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em]"><span className="text-[#95CCDD]/65">Technical details</span><span className="text-slate-300 transition-colors group-hover:text-[#F36A21]">Open →</span></div>
        </div>
      </article>
    </Link>
  </ScrollReveal>;
}

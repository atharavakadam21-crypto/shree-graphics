import Image from "next/image";
import type { Machine } from "@/lib/types";
import ScrollReveal from "@/components/public/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";

interface ProductDetailHeroProps {
  machine: Machine;
}

export default function ProductDetailHero({
  machine,
}: ProductDetailHeroProps) {
  const image =
    machine.images?.length > 0
      ? machine.images[0]
      : "/images/logo.png";

  return (
    <section className="relative min-h-[90svh] overflow-hidden bg-[#060606]">
      <div className="mx-auto flex min-h-[90svh] max-w-[1600px] items-end px-5 pb-12 pt-32 sm:px-8 lg:px-12 lg:pb-20">
        <div className="grid w-full gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <ScrollReveal>
            <SectionLabel number="01">
              Machine system / technical profile
            </SectionLabel>

            <div className="mt-9 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
              <span className="text-cyan-500">SYSTEM</span>
              <span className="mx-3">/</span>
              {machine.id.slice(0, 8)}
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-semibold uppercase leading-[0.8] tracking-[-0.065em] text-white sm:text-7xl lg:text-8xl">
              {machine.name}
            </h1>

            {machine.short_description && (
              <p className="mt-9 max-w-xl border-l-2 border-cyan-500 pl-4 text-sm leading-7 text-zinc-400">
                {machine.short_description}
              </p>
            )}
          </ScrollReveal> 
          <ScrollReveal delay={150}>
            <div className="relative min-h-[380px] overflow-hidden border border-zinc-800 bg-[#0a0a0a] sm:min-h-[520px] lg:min-h-[600px]">
              <Image
                src={image}
                alt={machine.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain p-12 grayscale opacity-70 sm:p-20"
              />

              <div className="absolute left-5 top-5 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600">
                SG / MACHINE
              </div>

              <div className="absolute right-5 top-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em]">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                <span className="text-zinc-500">
                  {machine.is_active ? "Active" : "Unavailable"}
                </span>
              </div>

              <div className="absolute bottom-5 left-5 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-700">
                PRODUCT / DETAIL
              </div>
            </div>
          </ScrollReveal> 
        </div>
      </div>
    </section>
  );
}
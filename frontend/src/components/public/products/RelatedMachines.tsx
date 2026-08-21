import Image from "next/image";
import Link from "next/link";
import type { Machine } from "@/lib/types";
import ScrollReveal from "@/components/public/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";

interface RelatedMachinesProps {
  machines: Machine[];
}

export default function RelatedMachines({
  machines,
}: RelatedMachinesProps) {
  if (machines.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#070707] py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <ScrollReveal>
          <SectionLabel number="05">
            Other machine systems
          </SectionLabel>
        </ScrollReveal>  

        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {machines.map((machine, index) => {
            const image =
              machine.images?.length > 0
                ? machine.images[0]
                : "/images/logo.png";

            return (
              <ScrollReveal
                key={machine.id}
                delay={index * 100}
                className={
                  index === 1
                    ? "lg:mt-12"
                    : index === 2
                      ? "lg:mt-24"
                      : ""
                }
              >
                <Link
                  href={`/products/${machine.slug}`}
                  className="group block"
                >
                  <article className="border border-zinc-800 bg-[#090909]">
                    <div className="relative h-64 overflow-hidden border-b border-zinc-800 bg-[#0b0b0b]">
                      <Image
                        src={image}
                        alt={machine.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain p-10 grayscale opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                      />

                      <span className="absolute left-5 top-5 font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="p-6">
                      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-600">
                        Industrial system
                      </p>

                      <h3 className="mt-4 text-xl font-medium uppercase leading-tight tracking-tight text-white">
                        {machine.name}
                      </h3>

                      <div className="mt-6 flex min-h-11 items-center justify-between border-t border-zinc-900 pt-4 font-mono text-[9px] uppercase tracking-[0.14em]">
                        <span className="text-zinc-600">
                          View system
                        </span>

                        <span className="text-cyan-500 transition-transform group-hover:translate-x-1">
                          ↗
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>   
            );
          })}
        </div>
      </div>
    </section>
  );
}
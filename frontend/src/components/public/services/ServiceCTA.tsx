import Link from "next/link";

import ScrollReveal from "@/components/public/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import TechnicalGrid from "@/components/ui/TechnicalGrid";

export default function ServiceCTA() {
  return (
    <section className="border-y border-zinc-900 bg-[#060606]">
      <TechnicalGrid>
        <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
          <ScrollReveal>
            <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:items-end">
              <div>
                <SectionLabel number="03">
                  Next operation
                </SectionLabel>

                <h2 className="mt-9 max-w-6xl text-5xl font-semibold uppercase leading-[0.82] tracking-[-0.065em] text-white sm:text-6xl lg:text-8xl">
                  Have a
                  <br />
                  requirement?
                </h2>
              </div>

              <div>
                <p className="border-l-2 border-cyan-500 pl-5 text-sm leading-7 text-zinc-500">
                  Tell us what you are manufacturing, converting or
                  trying to improve. We can start from the application
                  and work toward the machine.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <Link
                    href="/contact"
                    className="flex min-h-14 items-center justify-between border border-cyan-500 px-5 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-cyan-500/5"
                  >
                    Send enquiry

                    <span className="text-cyan-500">
                      →
                    </span>
                  </Link>

                  <Link
                    href="/products"
                    className="flex min-h-14 items-center justify-between border border-zinc-800 px-5 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white"
                  >
                    Explore machines

                    <span>↗</span>
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>   
        </div>
      </TechnicalGrid>
    </section>
  );
}
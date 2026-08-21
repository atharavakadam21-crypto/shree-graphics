import ScrollReveal from "@/components/public/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import TechnicalGrid from "@/components/ui/TechnicalGrid";

export default function ProductHero() {
  return (
    <section className="relative min-h-[72svh] overflow-hidden border-b border-zinc-900 bg-[#060606]">
      <TechnicalGrid className="min-h-[72svh]">
        <div className="mx-auto flex min-h-[72svh] max-w-[1600px] items-end px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
          <div className="grid w-full gap-12 lg:grid-cols-[1fr_280px] lg:items-end">
            <ScrollReveal>
              <SectionLabel number="01">
                Machine catalogue / Shree Graphics
              </SectionLabel>

              <h1 className="mt-9 max-w-6xl text-[clamp(4rem,10vw,9rem)] font-semibold uppercase leading-[0.78] tracking-[-0.075em] text-white">
                Machine
                <br />
                <span className="ml-[7vw] text-zinc-600">
                  Systems.
                </span>
              </h1>

              <p className="mt-10 max-w-xl border-l-2 border-cyan-500 pl-4 text-sm leading-7 text-zinc-400">
                Industrial machinery engineered for label printing,
                converting, slitting, die cutting and production
                environments.
              </p>
            </ScrollReveal>   

            <ScrollReveal delay={150}>
              <div className="border-l border-zinc-800 pl-5 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600">
                <div className="border-b border-zinc-900 pb-5">
                  <span className="text-cyan-500">INDEX</span>
                  <p className="mt-2 text-zinc-500">
                    SG / MACHINE DATABASE
                  </p>
                </div>

                <div className="border-b border-zinc-900 py-5">
                  <p>Systems</p>
                  <p className="mt-2 text-zinc-400">
                    Production equipment
                  </p>
                </div>

                <div className="border-b border-zinc-900 py-5">
                  <p>Status</p>
                  <p className="mt-2 flex items-center gap-2 text-cyan-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                    Operational
                  </p>
                </div>

                <div className="pt-5">
                  <p>Availability</p>
                  <p className="mt-2 text-zinc-400">
                    Direct enquiry
                  </p>
                </div>
              </div>
            </ScrollReveal>  
          </div>
        </div>
      </TechnicalGrid>
    </section>
  );
}
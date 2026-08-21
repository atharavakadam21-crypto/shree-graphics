"use client";

import ScrollReveal from "@/components/public/ScrollReveal";
import ScrollMotion from "../ScrollMotion";

export default function CompanyStory() {
  return (
    <section className="border-b border-zinc-900 bg-[#070707] py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[0.25fr_0.75fr]">
          <ScrollReveal>
            <div className="border-l border-zinc-700 pl-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-500">
                02 / Our Story
              </p>

              <p className="mt-6 max-w-[210px] text-xs leading-6 text-zinc-600">
                Manufacturing is not only about building a machine. It is
                about understanding the process it has to perform.
              </p>
            </div>
          </ScrollReveal>   
          <div>
            <ScrollReveal>
              <p className="max-w-5xl text-3xl font-medium leading-tight tracking-[-0.04em] text-zinc-200 sm:text-4xl lg:text-5xl">
                Shree Graphics develops and manufactures machinery for the
                label converting and printing industry, with a focus on
                practical engineering, dependable operation and production
                requirements.
              </p>
            </ScrollReveal>   

            <div className="mt-20 grid gap-12 border-t border-zinc-800 pt-10 sm:grid-cols-2">
              <ScrollMotion speed={0.06}> <ScrollReveal delay={100}>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">
                  Approach
                </p>

                <p className="mt-5 max-w-md text-sm leading-7 text-zinc-500">
                  Machines are developed around real manufacturing workflows,
                  material handling requirements and the demands of continuous
                  production.
                </p>
              </ScrollReveal>     </ScrollMotion>

              <ScrollReveal delay={180}>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">
                  Focus
                </p>

                <p className="mt-5 max-w-md text-sm leading-7 text-zinc-500">
                  From printing and die cutting to slitting, rewinding and
                  specialised systems, the objective remains the same:
                  reliable machinery that performs its intended process.
                </p>
              </ScrollReveal>   
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
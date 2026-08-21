"use client";

import ScrollReveal from "@/components/public/ScrollReveal";

const capabilities = [
  "Flexographic Printing",
  "Micro Slitting",
  "Rotary Die Cutting",
  "Label Converting",
  "Inspection & Rewinding",
  "Paper Core Cutting",
  "Custom SPM Systems",
  "Machine Repair & Service",
];

export default function CapabilitiesStrip() {
  return (
    <section className="border-b border-zinc-900 bg-[#080808] py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[0.3fr_0.7fr]">
          <ScrollReveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-500">
              04 / Capabilities
            </p>

            <p className="mt-6 max-w-xs text-sm leading-7 text-zinc-600">
              A range of machinery and engineering capabilities supporting
              label and printing production environments.
            </p>
          </ScrollReveal>  

          <div>
            <ScrollReveal>
              <h2 className="max-w-4xl text-4xl font-semibold leading-[0.9] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
                MACHINES
                <br />
                FOR THE
                <br />
                CONVERTING FLOOR.
              </h2>
            </ScrollReveal>   

            <div className="mt-16 grid border-t border-zinc-800 sm:grid-cols-2">
              {capabilities.map((capability, index) => (
                <ScrollReveal key={capability} delay={index * 60}>
                  <div className="group flex min-h-[92px] items-center justify-between border-b border-zinc-800 px-4 py-6 transition-colors hover:border-cyan-500/50">
                    <div className="flex items-center gap-5">
                      <span className="font-mono text-[9px] text-zinc-700">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-sm font-medium text-zinc-300 transition-colors group-hover:text-white">
                        {capability}
                      </span>
                    </div>

                    <span className="text-cyan-500 opacity-0 transition-opacity group-hover:opacity-100">
                      +
                    </span>
                  </div>
                </ScrollReveal>   
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
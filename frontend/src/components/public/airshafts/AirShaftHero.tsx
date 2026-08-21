"use client";

import Link from "next/link";
import { ArrowDownRight, Wrench, Factory, Settings2 } from "lucide-react";
import ScrollReveal from "@/components/public/ScrollReveal";
import ScrollMotion from "../ScrollMotion";
export default function AirShaftHero() {
  return (
    <section className="relative min-h-[calc(100svh-80px)] overflow-hidden border-b border-zinc-800/80 bg-[#050507]">
      {/* Technical background grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.055]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ffffff 1px, transparent 1px),
              linear-gradient(to bottom, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      {/* Navy technical accent */}
      <div className="pointer-events-none absolute right-[-12%] top-[18%] h-[520px] w-[520px] border border-[#2E1A6B]/40">
        <div className="absolute inset-8 border border-[#2E1A6B]/30" />
        <div className="absolute inset-16 border border-[#2E1A6B]/20" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-80px)] max-w-7xl flex-col justify-between px-4 py-8 sm:px-6 lg:px-8">
        {/* Technical status */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/70 pb-4 font-mono text-[10px] uppercase tracking-wider text-zinc-500 sm:text-xs">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 border border-[#F5820C]/30 bg-[#F5820C]/5 px-2.5 py-1 text-[#F5820C]">
                <span className="h-1.5 w-1.5 bg-[#F5820C]" />
                Airshaft Systems
              </span>

              <span className="hidden sm:inline">
                Manufacturing // Repair // Components
              </span>
            </div>

            <span className="text-zinc-600">
              SG / AS-01
            </span>
          </div>
        </ScrollReveal>   

        {/* Main hero */}
        <div className="grid flex-1 grid-cols-1 items-center gap-10 py-12 lg:grid-cols-12 lg:gap-16 lg:py-16">
          {/* Left */}
          <div className="lg:col-span-7">
            <ScrollMotion speed={0.06}> <ScrollReveal delay={100}>
              <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5820C] sm:text-xs">
                <span className="h-px w-8 bg-[#F5820C]" />
                Industrial Web Handling Components
              </div>
            </ScrollReveal>    </ScrollMotion>

            <ScrollReveal delay={160}>
              <h1 className="font-display text-[clamp(3.25rem,9vw,8.5rem)] font-black uppercase leading-[0.82] tracking-[-0.045em] text-white">
                AIR
                <br />
                <span className="text-zinc-500">SHAFT</span>
                <br />
                <span className="text-[#F5820C]">SYSTEMS.</span>
              </h1>
            </ScrollReveal> 
            <ScrollReveal delay={240}>
              <div className="mt-8 max-w-xl border-l-2 border-[#2E1A6B] pl-5 sm:pl-6">
                <p className="text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                  Airshaft manufacturing, repair and component supply for
                  printing, slitting and converting machinery.
                </p>
              </div>
            </ScrollReveal>   

            <ScrollReveal delay={320}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="flex min-h-11 items-center justify-center gap-3 bg-[#F5820C] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black transition-colors duration-200 hover:bg-white"
                >
                  Request Airshaft Service
                  <ArrowDownRight size={15} />
                </Link>

                <a
                  href="#airshaft-types"
                  className="flex min-h-11 items-center justify-center border border-zinc-700 px-6 py-3 font-mono text-xs uppercase tracking-wider text-zinc-300 transition-colors duration-200 hover:border-[#2E1A6B] hover:text-white"
                >
                  Explore Types
                </a>
              </div>
            </ScrollReveal>   
          </div>

          {/* Right technical illustration */}
          <div className="relative lg:col-span-5">
            <ScrollReveal delay={220}>
              <div className="relative mx-auto aspect-square w-full max-w-[520px] border border-zinc-800 bg-[#08080b]">
                {/* Drawing labels */}
                <div className="absolute left-4 top-4 font-mono text-[9px] uppercase tracking-widest text-zinc-600">
                  Technical View
                </div>

                <div className="absolute right-4 top-4 font-mono text-[9px] text-[#2E1A6B]">
                  AS / 001
                </div>

                {/* Main shaft illustration */}
                <div className="absolute inset-0 flex items-center justify-center px-8">
                  <div className="relative w-full">
                    {/* shaft body */}
                    <div className="relative h-16 border border-zinc-500 bg-zinc-900 sm:h-20">
                      {/* shaft center line */}
                      <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-[#F5820C]/50" />

                      {/* expanding lugs */}
                      <div className="absolute left-[18%] top-1/2 flex -translate-y-1/2 gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <div
                            key={index}
                            className="h-10 w-2 border border-[#F5820C] bg-[#F5820C]/20 sm:h-14"
                          />
                        ))}
                      </div>

                      <div className="absolute left-[54%] top-1/2 flex -translate-y-1/2 gap-1">
                        {Array.from({ length: 4 }).map((_, index) => (
                          <div
                            key={index}
                            className="h-10 w-2 border border-[#2E1A6B] bg-[#2E1A6B]/30 sm:h-14"
                          />
                        ))}
                      </div>

                      {/* end journals */}
                      <div className="absolute -left-5 top-1/2 h-10 w-5 -translate-y-1/2 border border-zinc-500 bg-zinc-800 sm:h-14" />
                      <div className="absolute -right-5 top-1/2 h-10 w-5 -translate-y-1/2 border border-zinc-500 bg-zinc-800 sm:h-14" />
                    </div>

                    {/* dimension line */}
                    <div className="relative mt-8 flex items-center">
                      <div className="h-px flex-1 bg-zinc-700" />
                      <span className="mx-3 font-mono text-[9px] text-zinc-500">
                        AIRSHAFT ASSEMBLY
                      </span>
                      <div className="h-px flex-1 bg-zinc-700" />
                    </div>
                  </div>
                </div>

                {/* Corner markers */}
                <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-[#F5820C]" />
                <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-[#F5820C]" />
                <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-[#2E1A6B]" />
                <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-[#2E1A6B]" />

                {/* Bottom metadata */}
                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 border-t border-zinc-800 pt-3 font-mono">
                  <div>
                    <p className="text-[8px] uppercase text-zinc-600">
                      Build
                    </p>
                    <p className="mt-1 text-[10px] text-zinc-300">
                      CUSTOM
                    </p>
                  </div>

                  <div>
                    <p className="text-[8px] uppercase text-zinc-600">
                      Service
                    </p>
                    <p className="mt-1 text-[10px] text-zinc-300">
                      REPAIR
                    </p>
                  </div>

                  <div>
                    <p className="text-[8px] uppercase text-zinc-600">
                      Parts
                    </p>
                    <p className="mt-1 text-[10px] text-[#F5820C]">
                      AVAILABLE
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>   
          </div>
        </div>

        {/* Bottom capabilities */}
        <ScrollReveal delay={380}>
          <div className="grid grid-cols-1 border-t border-zinc-800/70 sm:grid-cols-3">
            <div className="flex min-h-20 items-center gap-4 border-b border-zinc-800/70 py-4 sm:border-b-0 sm:border-r sm:px-5">
              <Factory className="shrink-0 text-[#F5820C]" size={19} />
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">
                  01 // Manufacturing
                </p>
                <p className="mt-1 text-xs font-semibold uppercase text-zinc-200">
                  New Airshaft Builds
                </p>
              </div>
            </div>

            <div className="flex min-h-20 items-center gap-4 border-b border-zinc-800/70 py-4 sm:border-b-0 sm:border-r sm:px-5">
              <Wrench className="shrink-0 text-[#2E1A6B]" size={19} />
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">
                  02 // Workshop
                </p>
                <p className="mt-1 text-xs font-semibold uppercase text-zinc-200">
                  Repair & Reconditioning
                </p>
              </div>
            </div>

            <div className="flex min-h-20 items-center gap-4 py-4 sm:px-5">
              <Settings2 className="shrink-0 text-[#F5820C]" size={19} />
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">
                  03 // Components
                </p>
                <p className="mt-1 text-xs font-semibold uppercase text-zinc-200">
                  Individual Spare Parts
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>   
      </div>
    </section>
  );
}
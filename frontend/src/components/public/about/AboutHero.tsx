"use client";

import Image from "next/image";

import ScrollReveal from "@/components/public/ScrollReveal";

export default function AboutHero() {
  return (
    <section className="relative min-h-svh overflow-hidden border-b border-zinc-900 bg-[#060606]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="mx-auto flex min-h-svh max-w-[1600px] items-end px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
        <div className="grid w-full gap-14 lg:grid-cols-[0.28fr_0.72fr] lg:items-end">
          <ScrollReveal>
            <div className="border-l-2 border-cyan-500 pl-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-500">
                01 / Company
              </p>

              <p className="mt-5 max-w-[220px] text-sm leading-7 text-zinc-500">
                Engineering machinery for label converting and industrial
                printing applications.
              </p>
            </div>
          </ScrollReveal>   
          <div className="relative">
            <ScrollReveal>
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                Shree Graphics / Engineering Division
              </p>

              <h1 className="max-w-6xl text-6xl font-semibold leading-[0.82] tracking-[-0.07em] text-white sm:text-7xl lg:text-8xl xl:text-[9rem]">
                BUILT
                <br />
                FOR
                <br />
                PRECISION.
              </h1>
            </ScrollReveal>   

            <ScrollReveal delay={150}>
              <div className="relative mt-10 ml-auto max-w-2xl border border-zinc-800 bg-[#090909] p-2 sm:mt-14">
                <div className="relative aspect-[16/8] overflow-hidden">
                  <Image
                    src="/gallery/DSC_1889.JPG"
                    alt="Shree Graphics manufacturing environment"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover opacity-75"
                  />

                  <div className="absolute inset-0 bg-black/20" />

                  <div className="absolute bottom-4 left-4">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white">
                      SHREE GRAPHICS / PRODUCTION
                    </span>
                  </div>

                  <div className="absolute right-4 top-4 font-mono text-[9px] text-cyan-500">
                    01
                  </div>
                </div>
              </div>
            </ScrollReveal>   
          </div>
        </div>
      </div>
    </section>
  );
}
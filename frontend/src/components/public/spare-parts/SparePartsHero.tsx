"use client";

import Link from "next/link";
import { ArrowDownRight, ArrowRight, Wrench } from "lucide-react";

export default function SparePartsHero() {
  return (
    <section className="relative min-h-[calc(100svh-80px)] overflow-hidden border-b border-zinc-800/80">
      {/* Technical background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(46,26,107,0.20),transparent_35%)]" />

        <div className="absolute right-[8%] top-[20%] h-72 w-72 rounded-full bg-[#2E1A6B]/10 blur-[120px]" />

        <div className="absolute bottom-0 left-[15%] h-48 w-48 rounded-full bg-[#F5820C]/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-16">
        {/* Top technical line */}
        <div className="mb-12 flex flex-col gap-4 border-b border-zinc-800/80 pb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#F5820C] shadow-[0_0_12px_rgba(245,130,12,0.7)]" />
            <span>SHREE GRAPHICS / PARTS DIVISION</span>
          </div>

          <div className="flex gap-6">
            <span>INDUSTRIAL COMPONENTS</span>
            <span className="text-[#2E1A6B]">/</span>
            <span>MAHARASHTRA / INDIA</span>
          </div>
        </div>

        <div className="grid min-h-[calc(100svh-220px)] grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Main typography */}
          <div className="lg:col-span-8">
            <div className="mb-6 flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#F5820C]">
              <span className="h-px w-12 bg-[#F5820C]" />
              Precision replacement components
            </div>

            <h1 className="font-display text-[clamp(3.4rem,8vw,8rem)] font-black uppercase leading-[0.84] tracking-[-0.055em] text-white">
              KEEP
              <br />

              <span className="text-zinc-500">YOUR</span>

              <br />

              <span className="relative inline-block text-white">
                MACHINE
                <span className="absolute -right-3 top-[12%] h-4 w-4 rounded-full bg-[#F5820C] shadow-[0_0_25px_rgba(245,130,12,0.55)] sm:-right-5 sm:h-5 sm:w-5" />
              </span>

              <br />

              <span className="text-[#2E1A6B] drop-shadow-[0_0_20px_rgba(46,26,107,0.25)]">
                RUNNING.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
              Genuine and replacement components for Shree Graphics machinery.
              Tell us what your machine needs and our team will help identify
              the right part or replacement requirement.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#parts-request"
                className="group inline-flex min-h-12 items-center justify-center gap-4 bg-[#F5820C] px-7 font-mono text-xs font-bold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:bg-orange-400 hover:shadow-[0_0_30px_rgba(245,130,12,0.18)]"
              >
                Request a Part
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="#parts-range"
                className="group inline-flex min-h-12 items-center justify-center gap-4 border border-[#2E1A6B] bg-[#2E1A6B]/10 px-7 font-mono text-xs font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#2E1A6B]/25 hover:border-[#4933a1]"
              >
                Explore Parts
                <ArrowDownRight
                  size={16}
                  className="text-[#F5820C] transition-transform duration-300 group-hover:translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* Technical panel */}
          <div className="lg:col-span-4">
            <div className="relative border border-zinc-800 bg-[#08080c]/90">
              {/* Corner details */}
              <div className="absolute -left-px -top-px h-12 w-12 border-l border-t border-[#F5820C]" />
              <div className="absolute -bottom-px -right-px h-12 w-12 border-b border-r border-[#2E1A6B]" />

              <div className="border-b border-zinc-800 px-6 py-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center border border-[#F5820C]/50 bg-[#F5820C]/5">
                      <Wrench size={18} className="text-[#F5820C]" />
                    </div>

                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                        Parts Desk
                      </p>

                      <p className="mt-1 font-mono text-xs font-bold uppercase tracking-wider text-white">
                        SG / SPARES
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-[9px] text-zinc-600">
                    01 / 03
                  </span>
                </div>
              </div>

              <div className="space-y-0">
                {[
                  ["01", "Machine Parts"],
                  ["02", "Replacement Components"],
                  ["03", "Custom Requirements"],
                ].map(([number, title], index) => (
                  <div
                    key={number}
                    className="group flex items-center justify-between border-b border-zinc-800/80 px-6 py-5 transition-colors duration-300 hover:bg-[#2E1A6B]/10"
                  >
                    <div className="flex items-center gap-5">
                      <span className="font-mono text-[9px] text-[#F5820C]">
                        {number}
                      </span>

                      <span className="text-sm font-semibold text-zinc-300 transition-colors group-hover:text-white">
                        {title}
                      </span>
                    </div>

                    <ArrowRight
                      size={14}
                      className="text-zinc-700 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#F5820C]"
                    />
                  </div>
                ))}
              </div>

              <div className="px-6 py-6">
                <p className="font-mono text-[10px] uppercase leading-5 tracking-wider text-zinc-600">
                  MACHINE SUPPORT
                  <br />
                  COMPONENT IDENTIFICATION
                  <br />
                  REQUIREMENT ASSISTANCE
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom indicators */}
        <div className="mt-10 grid grid-cols-2 border-t border-zinc-800/80 sm:grid-cols-4">
          {[
            "Machine Parts",
            "Maintenance",
            "Replacement",
            "Technical Support",
          ].map((item, index) => (
            <div
              key={item}
              className="border-r border-zinc-800/80 px-4 py-4 first:pl-0 last:border-r-0"
            >
              <span className="mb-1 block font-mono text-[9px] text-zinc-600">
                0{index + 1}
              </span>

              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
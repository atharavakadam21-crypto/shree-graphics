"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Cog,
  Package,
  Printer,
  Scissors,
  Wrench,
} from "lucide-react";

import ScrollReveal from "@/components/public/ScrollReveal";
const NAVY = "#2E1A6B";
const ORANGE = "#F5820C";

const systems = [
  {
    number: "01",
    title: "Flexographic Printing",
    icon: Printer,
  },
  {
    number: "02",
    title: "Micro Slitting",
    icon: Scissors,
  },
  {
    number: "03",
    title: "Rotary Die Cutting",
    icon: Cog,
  },
  {
    number: "04",
    title: "Paper Core Cutting",
    icon: Package,
  },
];

export default function HeroSection() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });


  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();

    setMouse({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  }

  function handleMouseLeave() {
    setMouse({ x: 0, y: 0 });
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100svh] overflow-hidden border-b border-white/10 bg-[#07080B]"
    >
      {/* =========================================================
          BACKGROUND GRID
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(255,255,255,0.07) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255,255,255,0.07) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* Navy architectural glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-[20%] h-[520px] w-[520px] rounded-full blur-[130px] opacity-20"
        style={{
          backgroundColor: NAVY,
          transform: `
            translate3d(
              ${mouse.x * -28}px,
              ${mouse.y * -28}px,
              0
            )
          `,
          transition:
            "transform 700ms cubic-bezier(.22,1,.36,1)",
        }}
      />

      {/* Very subtle orange glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 left-[35%] h-[420px] w-[420px] rounded-full blur-[130px] opacity-[0.07]"
        style={{
          backgroundColor: ORANGE,
        }}
      />

      {/* Technical vertical construction line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-[7%] top-0 hidden w-px bg-white/[0.045] lg:block"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-[7%] top-0 hidden w-px bg-white/[0.045] lg:block"
      />

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-6 pt-5 sm:px-8 sm:pb-8 lg:px-10">

        {/* =======================================================
            TOP STATUS
        ======================================================= */}

        <ScrollReveal delay={0}>
        <div
          className="flex min-h-11 items-center justify-between border-b border-white/10 pb-3"
        >
          <div className="flex items-center gap-3">
            <span
              className="relative flex h-2 w-2 shrink-0"
              style={{ color: ORANGE }}
            >
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50"
                style={{ backgroundColor: ORANGE }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: ORANGE }}
              />
            </span>

            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-300 sm:text-[10px]">
              Shree Graphics
            </span>

            <span className="hidden text-zinc-700 sm:inline">
              /
            </span>

            <span className="hidden font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-600 md:inline">
              Printing & Converting Machinery
            </span>
          </div>

          <div className="hidden items-center gap-4 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600 sm:flex">
            <span>Maharashtra</span>

            <span style={{ color: ORANGE }}>•</span>

            <span>India</span>
          </div>
        </div>
        </ScrollReveal>

        {/* =======================================================
            MAIN HERO
        ======================================================= */}

        <div className="grid min-h-[calc(100svh-105px)] grid-cols-1 items-center gap-10 py-9 md:py-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:py-10">

          {/* =====================================================
              LEFT / TEXT
          ===================================================== */}

          <ScrollReveal delay={100}>
          <div className="relative z-20">

            {/* Eyebrow */}

            <div
              className="mb-5 flex items-center gap-3 sm:mb-7"
            >
              <span
                className="h-[2px] w-9 sm:w-11"
                style={{ backgroundColor: ORANGE }}
              />

              <span
                className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] sm:text-[10px]"
                style={{ color: ORANGE }}
              >
                Precision Engineering
              </span>

              <span className="font-mono text-[8px] text-zinc-600">
                SG / 01
              </span>
            </div>

            {/* =================================================
                HEADLINE

                Mobile deliberately uses a much smaller scale.
                It is allowed to occupy multiple lines naturally.
            ================================================= */}

            <h1
              className="font-display font-black uppercase tracking-[-0.045em]"
            >
              {/* PRINTING */}

              <span className="relative block text-5xl leading-[0.84] text-[#F4F1EB] sm:text-6xl md:text-7xl lg:text-[clamp(4.2rem,6.2vw,6.5rem)]">
                PRINTING
                <span
                  className="ml-1 inline-block text-3xl align-middle sm:text-4xl lg:text-5xl"
                  style={{ color: ORANGE }}
                >
                  .
                </span>
              </span>

              {/* SLITTING */}

              <span className="relative mt-1 block text-5xl leading-[0.84] text-zinc-500 sm:text-6xl md:text-7xl lg:text-[clamp(4.2rem,6.2vw,6.5rem)]">
                SLITTING
                <span
                  className="ml-1 inline-block text-3xl align-middle sm:text-4xl lg:text-5xl"
                  style={{ color: ORANGE }}
                >
                  .
                </span>
              </span>

              {/* CONVERTING */}

              <span className="relative mt-1 block text-5xl leading-[0.84] text-[#F4F1EB] sm:text-6xl md:text-7xl lg:text-[clamp(4.2rem,6.2vw,6.5rem)]">
                CONVERTING
                <span
                  className="ml-1 inline-block text-3xl align-middle sm:text-4xl lg:text-5xl"
                  style={{ color: ORANGE }}
                >
                  .
                </span>
              </span>
            </h1>

            {/* Description */}

            <p
              className="mt-6 max-w-xl text-sm leading-6 text-zinc-400 sm:mt-8 sm:text-base sm:leading-7"
            >
              Shree Graphics manufactures and supplies
              industrial machinery for printing, slitting,
              die cutting, paper core cutting and related
              converting applications.
            </p>

            {/* =================================================
                CTA BUTTONS
            ================================================= */}

            <div
              className="mt-7 flex flex-col gap-3 xs:flex-row sm:mt-8"
            >
              <Link
                href="/products"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-7 px-6 font-mono text-[10px] font-bold uppercase tracking-[0.17em] text-black transition-all duration-300 hover:gap-9 sm:w-auto"
                style={{
                  backgroundColor: ORANGE,
                }}
              >
                <span>Explore Machines</span>

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-2"
                />
              </Link>

              <Link
                href="/spare-parts"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-3 border px-6 font-mono text-[10px] font-bold uppercase tracking-[0.17em] text-zinc-200 transition-all duration-300 sm:w-auto"
                style={{
                  borderColor: `${NAVY}CC`,
                  backgroundColor: `${NAVY}18`,
                }}
              >
                <Wrench
                  size={15}
                  style={{ color: ORANGE }}
                />

                <span>Spare Parts</span>

                <ArrowUpRight
                  size={14}
                  style={{ color: ORANGE }}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* =================================================
                SERVICE STRIP
            ================================================= */}

            <div
              className="mt-9 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-white/10 pt-5 sm:mt-11 sm:grid-cols-4"
            >
              {[
                "Machinery",
                "Spare Parts",
                "Service",
                "Engineering",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-2"
                >
                  <span
                    className="h-1 w-1 shrink-0 rounded-full"
                    style={{
                      backgroundColor:
                        index % 2 === 0 ? ORANGE : NAVY,
                    }}
                  />

                  <span className="font-mono text-[8px] uppercase tracking-[0.13em] text-zinc-600">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
          </ScrollReveal>

          {/* =====================================================
              RIGHT / IMAGE + SYSTEMS
          ===================================================== */}

          <ScrollReveal delay={180}>
          <div
            className="relative"
          >
            {/* IMAGE */}

            <div
              className="relative transition-transform duration-500 ease-out"
              style={{
                transform: `
                  translate3d(
                    ${mouse.x * 10}px,
                    ${mouse.y * 10}px,
                    0
                  )
                `,
              }}
            >
              {/* Orange corner */}

              <div
                className="absolute -right-2 -top-2 z-20 h-12 w-12 border-r border-t sm:-right-3 sm:-top-3 sm:h-14 sm:w-14"
                style={{ borderColor: ORANGE }}
              />

              {/* Navy corner */}

              <div
                className="absolute -bottom-2 -left-2 z-20 h-12 w-12 border-b border-l sm:-bottom-3 sm:-left-3 sm:h-14 sm:w-14"
                style={{ borderColor: `${NAVY}CC` }}
              />

              <div className="relative aspect-[1.25/1] overflow-hidden border border-white/10 bg-[#0B0C10]">
                <Image
                  src="/gallery/turret-diecutting-machine.jpg"
                  alt="Shree Graphics industrial machinery"
                  fill
                  priority
                  sizes="(max-width: 767px) 100vw, (max-width: 1024px) 90vw, 55vw"
                  className="object-cover object-center transition-transform duration-[1400ms] ease-out hover:scale-[1.035]"
                />

                {/* Dark image treatment */}

                <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/45 via-transparent to-transparent" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#07080B]/70 via-transparent to-transparent" />

                {/* Navy image tint */}

                <div
                  className="absolute inset-0 opacity-[0.10] mix-blend-screen"
                  style={{
                    backgroundColor: NAVY,
                  }}
                />

                {/* Image label */}

                <div className="absolute left-4 top-4 flex items-center gap-2 border border-white/10 bg-black/65 px-3 py-2 backdrop-blur-md sm:left-5 sm:top-5">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: ORANGE }}
                  />

                  <span className="font-mono text-[8px] uppercase tracking-[0.17em] text-zinc-300">
                    Machine / Factory
                  </span>
                </div>

                {/* Image bottom information */}

                <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
                  <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-zinc-500">
                    SHREE GRAPHICS
                  </div>

                  <div className="mt-1 font-display text-lg font-bold uppercase text-white sm:text-xl">
                    Industrial Machinery
                  </div>
                </div>

                {/* Scan line */}

                <div
                  className="pointer-events-none absolute left-0 right-0 top-0 h-px animate-[scan_5s_linear_infinite]"
                  style={{
                    backgroundColor: ORANGE,
                    boxShadow: `0 0 15px ${ORANGE}`,
                  }}
                />
              </div>
            </div>

            {/* =================================================
                INDUSTRIAL SYSTEMS
                Below image — NEVER overlays it.
            ================================================= */}

            <div
              className={`relative z-20 mt-4 border bg-[#0A0B10] transition-all delay-500 duration-900 sm:mt-5`}
              style={{
                borderColor: `${NAVY}B3`,
              }}
            >
              {/* Header */}

              <div
                className="flex items-center justify-between border-b px-4 py-4 sm:px-5"
                style={{
                  borderColor: `${NAVY}66`,
                }}
              >
                <div>
                  <div
                    className="font-mono text-[8px] font-bold uppercase tracking-[0.22em]"
                    style={{ color: ORANGE }}
                  >
                    What We Build
                  </div>

                  <div className="mt-1 font-display text-base font-bold uppercase text-white sm:text-lg">
                    Industrial Systems
                  </div>
                </div>

                <span
                  className="font-mono text-[8px]"
                  style={{ color: `${NAVY}CC` }}
                >
                  SG / 01
                </span>
              </div>

              {/* 2 × 2 desktop/mobile grid */}

              <div className="grid grid-cols-2 min-[380px]:grid-cols-2 max-[379px]:grid-cols-1">
                {systems.map((system, index) => {
                  const Icon = system.icon;

                  return (
                    <Link
                      href="/products"
                      key={system.number}
                      className="group flex min-h-[68px] items-center gap-2 border-b border-white/[0.07] px-3 py-3 transition-all duration-300 hover:bg-white/[0.025] sm:min-h-[74px] sm:gap-3 sm:px-5"
                    >
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center border transition-all duration-300 group-hover:bg-orange-500/[0.08]"
                        style={{
                          borderColor: `${NAVY}99`,
                        }}
                      >
                        <Icon
                          size={14}
                          style={{ color: ORANGE }}
                          className="transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div
                          className="font-mono text-[7px]"
                          style={{ color: ORANGE }}
                        >
                          {system.number}
                        </div>

                        <div className="mt-0.5 truncate text-[10px] font-medium text-zinc-300 transition-colors group-hover:text-white sm:text-[11px]">
                          {system.title}
                        </div>
                      </div>

                      <ArrowUpRight
                        size={12}
                        className="shrink-0 text-zinc-700 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                        style={{
                          color: undefined,
                        }}
                      />
                    </Link>
                  );
                })}
              </div>

              {/* Footer */}

              <Link
                href="/products"
                className="group flex min-h-11 items-center justify-between px-4 py-3 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:text-white sm:px-5"
              >
                <span>View all machinery</span>

                <ArrowRight
                  size={14}
                  style={{ color: ORANGE }}
                  className="transition-transform duration-300 group-hover:translate-x-2"
                />
              </Link>
            </div>
          </div>
          </ScrollReveal>
        </div>

        {/* =======================================================
            BOTTOM LINE
        ======================================================= */}

        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <span className="font-mono text-[7px] uppercase tracking-[0.17em] text-zinc-700 sm:text-[8px]">
            Precision / Production / Reliability
          </span>

          <span
            className="font-mono text-[7px] uppercase tracking-[0.17em] sm:text-[8px]"
            style={{ color: `${NAVY}CC` }}
          >
            SG — 2026
          </span>
        </div>
      </div>

      {/* =========================================================
          ANIMATION
      ========================================================= */}

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(0);
            opacity: 0;
          }

          10% {
            opacity: 1;
          }

          50% {
            opacity: 0.7;
          }

          90% {
            opacity: 1;
          }

          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}

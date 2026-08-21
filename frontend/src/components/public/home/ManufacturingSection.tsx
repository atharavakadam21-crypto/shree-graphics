"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  Cog,
  Factory,
  Gauge,
  Settings2,
  Wrench,
} from "lucide-react";

import ScrollReveal from "@/components/public/ScrollReveal";
const NAVY = "#2E2582";
const ORANGE = "#EF7B00";

type Process = {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: typeof Factory;
  points: string[];
};

const processes: Process[] = [
  {
    id: "design",
    number: "01",
    title: "Design & Engineering",
    shortTitle: "DESIGN",
    description:
      "Machine requirements are translated into practical mechanical systems with attention to the intended converting application.",
    icon: Settings2,
    points: [
      "Application-focused machine planning",
      "Mechanical system development",
      "Component and assembly planning",
    ],
  },
  {
    id: "fabrication",
    number: "02",
    title: "Fabrication & Machining",
    shortTitle: "FABRICATION",
    description:
      "Machine structures and components move through fabrication and machining according to the required design and application.",
    icon: Factory,
    points: [
      "Machine frame fabrication",
      "Component machining",
      "Mechanical assembly preparation",
    ],
  },
  {
    id: "assembly",
    number: "03",
    title: "Machine Assembly",
    shortTitle: "ASSEMBLY",
    description:
      "Mechanical, electrical and motion-control elements are brought together to form a complete working machine.",
    icon: Cog,
    points: [
      "Mechanical assembly",
      "Drive and control integration",
      "System-level setup",
    ],
  },
  {
    id: "testing",
    number: "04",
    title: "Testing & Delivery",
    shortTitle: "TESTING",
    description:
      "The completed machine is checked, configured and prepared for delivery according to the customer's requirements.",
    icon: Gauge,
    points: [
      "Functional checks",
      "Application configuration",
      "Final preparation and dispatch",
    ],
  },
];

export default function ManufacturingSection() {
  const [activeProcess, setActiveProcess] = useState("design");

  const active =
    processes.find((process) => process.id === activeProcess) ??
    processes[0];

  return (
    <section
      id="manufacturing"
      className="relative overflow-hidden border-b border-white/10 bg-[#08090D] py-20 sm:py-24 lg:py-28"
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(255,255,255,0.10) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255,255,255,0.10) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "72px 72px",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-250px] left-[-150px] h-[500px] w-[500px] rounded-full opacity-[0.06] blur-[130px]"
        style={{
          backgroundColor: NAVY,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* ===================================================
            HEADER
        =================================================== */}

        <ScrollReveal delay={0}>
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span
                className="h-px w-8"
                style={{
                  backgroundColor: ORANGE,
                }}
              />

              <span
                className="font-mono text-[9px] font-bold uppercase tracking-[0.22em]"
                style={{
                  color: ORANGE,
                }}
              >
                04 / Manufacturing
              </span>
            </div>

            <h2 className="font-display text-4xl font-black uppercase leading-[0.9] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              FROM CONCEPT
              <br />
              <span className="text-zinc-500">
                TO MACHINE.
              </span>
            </h2>
          </div>

          <div
            className="border-l-2 pl-5"
            style={{
              borderColor: NAVY,
            }}
          >
            <p className="text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
              A structured manufacturing workflow brings
              engineering, fabrication, assembly and testing
              together around the customer's application.
            </p>
          </div>

        </div>
        </ScrollReveal>

        {/* ===================================================
            PROCESS NAVIGATION
        =================================================== */}

        <ScrollReveal delay={100}>
        <div className="mt-12 grid border-y border-white/10 md:grid-cols-4">

          {processes.map((process, index) => {
            const active =
              process.id === activeProcess;

            const Icon = process.icon;

            return (
              <button
                key={process.id}
                type="button"
                onClick={() =>
                  setActiveProcess(process.id)
                }
                className={`group relative min-h-[112px] border-white/10 p-5 text-left transition-all duration-300 md:min-h-[145px] ${
                  index !== 0
                    ? "border-t md:border-l md:border-t-0"
                    : ""
                } ${
                  active
                    ? "bg-white/[0.025]"
                    : "hover:bg-white/[0.015]"
                }`}
              >

                {/* active indicator */}

                <span
                  className={`absolute bottom-0 left-0 h-[2px] transition-all duration-500 ${
                    active
                      ? "w-full"
                      : "w-0 group-hover:w-1/2"
                  }`}
                  style={{
                    backgroundColor: ORANGE,
                  }}
                />

                <div className="flex items-start justify-between">

                  <span
                    className="font-mono text-[8px] font-bold tracking-[0.15em]"
                    style={{
                      color: active
                        ? ORANGE
                        : "#52525B",
                    }}
                  >
                    {process.number}
                  </span>

                  <Icon
                    size={17}
                    className="transition-transform duration-300 group-hover:scale-110"
                    style={{
                      color: active
                        ? ORANGE
                        : `${NAVY}CC`,
                    }}
                  />

                </div>

                <div className="mt-7">

                  <div
                    className={`font-display text-xl font-bold uppercase leading-none transition-colors duration-300 ${
                      active
                        ? "text-white"
                        : "text-zinc-500 group-hover:text-zinc-300"
                    }`}
                  >
                    {process.shortTitle}
                  </div>

                  <div className="mt-2 font-mono text-[7px] uppercase tracking-[0.14em] text-zinc-700">
                    PROCESS / {process.number}
                  </div>

                </div>

              </button>
            );
          })}

        </div>
        </ScrollReveal>

        {/* ===================================================
            ACTIVE PROCESS DETAIL
        =================================================== */}

        <ScrollReveal delay={180}>
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">

          {/* LEFT INDEX PANEL */}

          <div
            className="relative overflow-hidden border bg-[#0A0B10] p-6 sm:p-8"
            style={{
              borderColor: `${NAVY}99`,
            }}
          >

            {/* large number */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-5 -top-12 select-none font-display text-[190px] font-black leading-none opacity-[0.07]"
              style={{
                color: NAVY,
              }}
            >
              {active.number}
            </div>

            <div className="relative z-10">

              <div className="flex items-center justify-between">

                <div
                  className="flex h-12 w-12 items-center justify-center border"
                  style={{
                    borderColor: `${ORANGE}66`,
                  }}
                >
                  <active.icon
                    size={20}
                    style={{
                      color: ORANGE,
                    }}
                  />
                </div>

                <span className="font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-zinc-600">
                  SG / WORKFLOW
                </span>

              </div>

              <div className="mt-10">

                <div
                  className="font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
                  style={{
                    color: ORANGE,
                  }}
                >
                  STEP {active.number}
                </div>

                <h3 className="mt-3 max-w-md font-display text-3xl font-black uppercase leading-[0.92] text-white sm:text-4xl">
                  {active.title}
                </h3>

                <p className="mt-5 max-w-lg text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
                  {active.description}
                </p>

              </div>

              {/* process marker */}

              <div className="mt-10">

                <div className="mb-2 flex items-center justify-between font-mono text-[7px] uppercase tracking-[0.16em] text-zinc-600">
                  <span>WORKFLOW POSITION</span>
                  <span>
                    {active.number} / 04
                  </span>
                </div>

                <div className="flex gap-1">

                  {processes.map((process) => (
                    <div
                      key={process.id}
                      className="h-1 flex-1 transition-all duration-500"
                      style={{
                        backgroundColor:
                          process.number <= active.number
                            ? ORANGE
                            : "#27272A",
                      }}
                    />
                  ))}

                </div>

              </div>

            </div>
          </div>

          {/* RIGHT DETAILS */}

          <div
            className="border bg-[#090A0F]"
            style={{
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >

            <div className="flex min-h-[58px] items-center justify-between border-b border-white/10 px-5 sm:px-7">

              <div className="flex items-center gap-3">

                <span
                  className="h-1.5 w-1.5 rounded-full animate-pulse"
                  style={{
                    backgroundColor: ORANGE,
                  }}
                />

                <span className="font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-zinc-400">
                  Process Breakdown
                </span>

              </div>

              <span
                className="font-mono text-[8px] uppercase tracking-[0.16em]"
                style={{
                  color: `${NAVY}DD`,
                }}
              >
                {active.shortTitle}
              </span>

            </div>

            <div className="divide-y divide-white/[0.07]">

              {active.points.map((point, index) => (
                <div
                  key={point}
                  className="group flex min-h-[86px] items-center gap-5 px-5 transition-colors duration-300 hover:bg-white/[0.02] sm:px-7"
                >

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 transition-colors duration-300 group-hover:border-orange-500/30">

                    <span
                      className="font-mono text-[8px]"
                      style={{
                        color:
                          index === 0
                            ? ORANGE
                            : `${NAVY}DD`,
                      }}
                    >
                      0{index + 1}
                    </span>

                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="font-display text-lg font-bold uppercase leading-none text-zinc-300 transition-colors duration-300 group-hover:text-white sm:text-xl">
                      {point}
                    </div>

                    <div className="mt-2 font-mono text-[7px] uppercase tracking-[0.13em] text-zinc-700">
                      SHREE GRAPHICS / PROCESS
                    </div>

                  </div>

                  <Check
                    size={15}
                    className="shrink-0 opacity-40 transition-all duration-300 group-hover:opacity-100"
                    style={{
                      color: ORANGE,
                    }}
                  />

                </div>
              ))}

            </div>

            {/* bottom strip */}

            <div className="border-t border-white/10 px-5 py-5 sm:px-7">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3">

                  <Wrench
                    size={14}
                    style={{
                      color: NAVY,
                    }}
                  />

                  <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-zinc-600">
                    Application-focused engineering
                  </span>

                </div>

                <span
                  className="font-mono text-[8px] font-bold uppercase tracking-[0.15em]"
                  style={{
                    color: ORANGE,
                  }}
                >
                  STEP {active.number} ACTIVE
                </span>

              </div>

            </div>

          </div>
        </div>
        </ScrollReveal>

        {/* ===================================================
            BOTTOM TRUST / PROCESS BAR
        =================================================== */}

        <ScrollReveal delay={280}>
        <div className="mt-8 grid border border-white/10 sm:grid-cols-3">

          <div className="flex min-h-[88px] items-center gap-4 p-5 sm:px-6">

            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center border"
              style={{
                borderColor: `${ORANGE}55`,
              }}
            >
              <Settings2
                size={15}
                style={{
                  color: ORANGE,
                }}
              />
            </div>

            <div>
              <div className="font-display text-base font-bold uppercase text-zinc-300">
                Engineering
              </div>

              <div className="mt-1 font-mono text-[7px] uppercase tracking-[0.12em] text-zinc-600">
                Application focused
              </div>
            </div>

          </div>

          <div className="flex min-h-[88px] items-center gap-4 border-t border-white/10 p-5 sm:border-l sm:border-t-0 sm:px-6">

            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center border"
              style={{
                borderColor: `${NAVY}88`,
              }}
            >
              <Factory
                size={15}
                style={{
                  color: NAVY,
                }}
              />
            </div>

            <div>
              <div className="font-display text-base font-bold uppercase text-zinc-300">
                Manufacturing
              </div>

              <div className="mt-1 font-mono text-[7px] uppercase tracking-[0.12em] text-zinc-600">
                Fabrication & assembly
              </div>
            </div>

          </div>

          <div className="flex min-h-[88px] items-center gap-4 border-t border-white/10 p-5 sm:border-l sm:border-t-0 sm:px-6">

            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center border"
              style={{
                borderColor: `${ORANGE}55`,
              }}
            >
              <Gauge
                size={15}
                style={{
                  color: ORANGE,
                }}
              />
            </div>

            <div>
              <div className="font-display text-base font-bold uppercase text-zinc-300">
                Quality Check
              </div>

              <div className="mt-1 font-mono text-[7px] uppercase tracking-[0.12em] text-zinc-600">
                Functional verification
              </div>
            </div>

          </div>

        </div>
        </ScrollReveal>

        {/* ===================================================
            CTA
        =================================================== */}

        <ScrollReveal delay={360}>
        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">

          <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-zinc-600">
            Design / Fabrication / Assembly / Testing
          </div>

          <a
            href="/contact"
            className="group inline-flex min-h-11 items-center gap-4 font-mono text-[9px] font-bold uppercase tracking-[0.17em] text-zinc-400 transition-colors hover:text-white"
          >
            <span>Talk to Shree Graphics</span>

            <ArrowRight
              size={15}
              style={{
                color: ORANGE,
              }}
              className="transition-transform duration-300 group-hover:translate-x-2"
            />
          </a>

        </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
"use client";

import { useState } from "react";
import {
  ArrowRight,
  Crosshair,
  Gauge,
  MoveUpRight,
} from "lucide-react";

import ScrollReveal from "@/components/public/ScrollReveal";

const NAVY = "#2E2582";
const ORANGE = "#EF7B00";

const principles = [
  {
    number: "01",
    title: "APPLICATION",
    text: "Machinery is developed around the material, converting process and production requirement.",
    icon: Crosshair,
  },
  {
    number: "02",
    title: "ENGINEERING",
    text: "Mechanical systems are planned with practical operation, maintainability and machine integration in mind.",
    icon: Gauge,
  },
  {
    number: "03",
    title: "RELIABILITY",
    text: "A machine should remain dependable throughout the work it is designed to perform.",
    icon: MoveUpRight,
  },
];

export default function TechnicalStatement() {
  const [active, setActive] = useState(0);

  const current = principles[active];
  const CurrentIcon = current.icon;

  return (
    <section
      id="philosophy"
      className="relative overflow-hidden border-b border-white/10 bg-[#07080B] py-20 sm:py-24 lg:py-32"
    >
      {/* =====================================================
          TECHNICAL GRID
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(255,255,255,0.12) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255,255,255,0.12) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "72px 72px",
        }}
      />

      {/* =====================================================
          NAVY STRUCTURAL ACCENT
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-full w-[1px] opacity-60"
        style={{
          backgroundColor: NAVY,
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full opacity-[0.045] blur-[110px]"
        style={{
          backgroundColor: NAVY,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* ===================================================
            TOP LABEL
        =================================================== */}

        <ScrollReveal delay={0}>
        <div className="mb-12 flex items-center justify-between border-b border-white/10 pb-5">

          <div className="flex items-center gap-3">

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
              05 / Engineering Philosophy
            </span>

          </div>

          <span className="hidden font-mono text-[8px] uppercase tracking-[0.18em] text-zinc-700 sm:block">
            SHREE GRAPHICS / SG
          </span>

        </div>
        </ScrollReveal>

        {/* ===================================================
            MAIN STATEMENT
        =================================================== */}

        <ScrollReveal delay={120}>
        <div className="grid gap-12 lg:grid-cols-[1fr_330px] lg:gap-16">

          {/* LEFT */}

          <div>

            <div className="mb-7 flex items-center gap-3">

              <span
                className="flex h-8 w-8 items-center justify-center border"
                style={{
                  borderColor: `${ORANGE}66`,
                }}
              >
                <CurrentIcon
                  size={14}
                  style={{
                    color: ORANGE,
                  }}
                />
              </span>

              <span className="font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-zinc-600">
                {current.number} / {current.title}
              </span>

            </div>

            <h2 className="max-w-6xl font-display text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.6rem]">

              MACHINERY
              <br />

              <span className="text-zinc-500">
                SHOULD SERVE
              </span>

              <br />

              <span
                className="transition-colors duration-500"
                style={{
                  color: ORANGE,
                }}
              >
                THE PROCESS.
              </span>

            </h2>

            <div className="mt-8 max-w-2xl border-l-2 pl-5 sm:mt-10 sm:pl-6"
              style={{
                borderColor: NAVY,
              }}
            >

              <p className="text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
                At Shree Graphics, machinery begins with the
                application. The objective is not simply to
                produce equipment, but to create a practical
                system that fits the customer's converting
                requirement.
              </p>

            </div>

          </div>

          {/* =================================================
              PRINCIPLE PANEL
          ================================================= */}

          <div className="lg:pt-4">

            <div
              className="border bg-[#0A0B10]"
              style={{
                borderColor: `${NAVY}99`,
              }}
            >

              <div className="flex min-h-[54px] items-center justify-between border-b border-white/10 px-5">

                <span className="font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                  Design Principles
                </span>

                <span
                  className="font-mono text-[8px]"
                  style={{
                    color: ORANGE,
                  }}
                >
                  {current.number}
                </span>

              </div>

              {/* PRINCIPLE BUTTONS */}

              <div>

                {principles.map((principle, index) => {

                  const Icon = principle.icon;

                  const selected =
                    active === index;

                  return (
                    <button
                      key={principle.number}
                      type="button"
                      onClick={() => setActive(index)}
                      className={`group relative flex min-h-[82px] w-full items-center gap-4 border-b border-white/[0.07] px-5 text-left transition-all duration-300 ${
                        selected
                          ? "bg-white/[0.025]"
                          : "hover:bg-white/[0.015]"
                      }`}
                    >

                      <span
                        className="font-mono text-[8px]"
                        style={{
                          color: selected
                            ? ORANGE
                            : "#52525B",
                        }}
                      >
                        {principle.number}
                      </span>

                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center border transition-colors duration-300"
                        style={{
                          borderColor: selected
                            ? `${ORANGE}66`
                            : `${NAVY}55`,
                        }}
                      >
                        <Icon
                          size={13}
                          style={{
                            color: selected
                              ? ORANGE
                              : "#71717A",
                          }}
                        />
                      </div>

                      <span
                        className={`font-display text-base font-bold uppercase transition-colors duration-300 ${
                          selected
                            ? "text-white"
                            : "text-zinc-500 group-hover:text-zinc-300"
                        }`}
                      >
                        {principle.title}
                      </span>

                      <span
                        className={`absolute bottom-0 left-0 h-[1px] transition-all duration-500 ${
                          selected
                            ? "w-full"
                            : "w-0 group-hover:w-1/3"
                        }`}
                        style={{
                          backgroundColor: ORANGE,
                        }}
                      />

                    </button>
                  );
                })}

              </div>

              {/* ACTIVE DESCRIPTION */}

              <div className="p-5">

                <div className="mb-3 font-mono text-[8px] uppercase tracking-[0.16em] text-zinc-700">
                  Principle / {current.number}
                </div>

                <p className="text-sm leading-6 text-zinc-400">
                  {current.text}
                </p>

              </div>

            </div>

          </div>
        </div>
        </ScrollReveal>

        {/* ===================================================
            STATEMENT BAR
        =================================================== */}

        <ScrollReveal delay={240}>
        <div className="mt-14 border-y border-white/10 py-6 sm:mt-20">

          <div className="grid gap-6 sm:grid-cols-3">

            <div className="flex items-center gap-4">

              <span
                className="font-display text-3xl font-black"
                style={{
                  color: ORANGE,
                }}
              >
                01
              </span>

              <div>
                <div className="font-display text-base font-bold uppercase text-zinc-300">
                  Understand
                </div>

                <div className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-zinc-700">
                  Application first
                </div>
              </div>

            </div>

            <div className="flex items-center gap-4 sm:border-l sm:border-white/10 sm:pl-6">

              <span
                className="font-display text-3xl font-black"
                style={{
                  color: NAVY,
                }}
              >
                02
              </span>

              <div>
                <div className="font-display text-base font-bold uppercase text-zinc-300">
                  Engineer
                </div>

                <div className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-zinc-700">
                  Build the system
                </div>
              </div>

            </div>

            <div className="flex items-center gap-4 sm:border-l sm:border-white/10 sm:pl-6">

              <span
                className="font-display text-3xl font-black"
                style={{
                  color: ORANGE,
                }}
              >
                03
              </span>

              <div>
                <div className="font-display text-base font-bold uppercase text-zinc-300">
                  Deliver
                </div>

                <div className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-zinc-700">
                  Ready for production
                </div>
              </div>

            </div>

          </div>

        </div>
        </ScrollReveal>

        {/* ===================================================
            BOTTOM QUOTE
        =================================================== */}

        <ScrollReveal delay={360}>
        <div className="mt-12 flex flex-col gap-6 sm:mt-16 lg:flex-row lg:items-end lg:justify-between">

          <div className="max-w-3xl">

            <div
              className="font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
              style={{
                color: ORANGE,
              }}
            >
              THE SHREE GRAPHICS APPROACH
            </div>

            <blockquote className="mt-4 font-display text-2xl font-bold uppercase leading-[0.95] text-zinc-300 sm:text-3xl lg:text-4xl">
              Precision is not a feature added at the end.
              It is part of how the machine is conceived.
            </blockquote>

          </div>

          <a
            href="/about"
            className="group inline-flex min-h-11 shrink-0 items-center gap-4 font-mono text-[9px] font-bold uppercase tracking-[0.17em] text-zinc-500 transition-colors hover:text-white"
          >
            <span>Our engineering approach</span>

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
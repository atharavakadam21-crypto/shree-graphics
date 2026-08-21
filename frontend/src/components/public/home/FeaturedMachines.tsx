"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Cog,
  Layers3,
  Scissors,
} from "lucide-react";

import ScrollReveal from "@/components/public/ScrollReveal";
const NAVY = "#2E2582";
const ORANGE = "#EF7B00";

type Category = "ALL" | "PRINTING" | "DIE CUTTING" | "SLITTING";

type Machine = {
  id: string;
  category: Exclude<Category, "ALL">;
  name: string;
  description: string;
  image: string;
  label: string;
  icon: typeof Cog;
};

const machines: Machine[] = [
  {
    id: "01",
    category: "DIE CUTTING",
    name: "Rotary Label Die Cutting Machine",
    description:
      "Rotary converting equipment designed for label die-cutting applications with configurations adapted to customer requirements.",
    image: "/gallery/turret-diecutting-machine.jpg",
    label: "LABEL CONVERTING",
    icon: Cog,
  },
  {
    id: "02",
    category: "DIE CUTTING",
    name: "A4 Sheet Rotary Label Die Cutting Machine",
    description:
      "Sheet-fed rotary label die cutting system with online slitting and an electronic web alignment system.",
    image: "/gallery/turret-diecutting-machine.jpg",
    label: "SHEET CONVERTING",
    icon: Cog,
  },
  {
    id: "03",
    category: "PRINTING",
    name: "Flexo Printing Machine",
    description:
      "Flexographic printing equipment with electronic web alignment, die-cutting capability and configurable drying options.",
    image: "/gallery/two-color-flexo-printing-machine.jpg",
    label: "FLEXOGRAPHIC PRINTING",
    icon: Layers3,
  },
  {
    id: "04",
    category: "SLITTING",
    name: "Micro Slitting Machine",
    description:
      "Precision roll converting equipment designed for slitting applications across paper, film and other suitable materials.",
    image: "/gallery/DSC_1889.JPG",
    label: "ROLL CONVERTING",
    icon: Scissors,
  },
];

const filters: { id: Category; label: string }[] = [
  { id: "ALL", label: "All Machinery" },
  { id: "PRINTING", label: "Printing" },
  { id: "DIE CUTTING", label: "Die Cutting" },
  { id: "SLITTING", label: "Slitting" },
];

export default function FeaturedMachines() {
  const [activeFilter, setActiveFilter] =
    useState<Category>("ALL");

  const [activeMachine, setActiveMachine] =
    useState("01");

  const filteredMachines = useMemo(() => {
    if (activeFilter === "ALL") {
      return machines;
    }

    return machines.filter(
      (machine) => machine.category === activeFilter
    );
  }, [activeFilter]);

  const selectedMachine =
    filteredMachines.find(
      (machine) => machine.id === activeMachine
    ) ?? filteredMachines[0];

  function changeFilter(filter: Category) {
    setActiveFilter(filter);

    const firstMachine =
      filter === "ALL"
        ? machines[0]
        : machines.find(
            (machine) => machine.category === filter
          );

    if (firstMachine) {
      setActiveMachine(firstMachine.id);
    }
  }

  return (
    <section
      id="featured-machines"
      className="relative overflow-hidden border-b border-white/10 bg-[#07080B] py-20 sm:py-24 lg:py-28"
    >
      {/* =====================================================
          BACKGROUND GRID
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
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

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-220px] top-[20%] h-[500px] w-[500px] rounded-full opacity-[0.055] blur-[130px]"
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
                03 / Featured Machinery
              </span>
            </div>

            <h2 className="font-display text-4xl font-black uppercase leading-[0.9] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              BUILT AROUND
              <br />
              <span className="text-zinc-500">
                YOUR PROCESS.
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
              Explore selected machinery from the Shree
              Graphics range. From flexographic printing
              to label converting and micro slitting,
              each system can be configured around the
              application.
            </p>
          </div>
        </div>
        </ScrollReveal>

        {/* ===================================================
            FILTER BAR
        =================================================== */}

        <ScrollReveal delay={100}>
        <div className="mt-10 overflow-x-auto border-y border-white/10">
          <div className="flex min-w-max">

            {filters.map((filter, index) => {
              const active =
                filter.id === activeFilter;

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() =>
                    changeFilter(filter.id)
                  }
                  className="group relative flex min-h-12 items-center gap-3 px-4 font-mono text-[9px] font-bold uppercase tracking-[0.16em] transition-colors duration-300 sm:px-6"
                  style={{
                    color: active
                      ? "#FFFFFF"
                      : "#71717A",
                  }}
                >
                  <span
                    className="text-[7px]"
                    style={{
                      color: active
                        ? ORANGE
                        : "#52525B",
                    }}
                  >
                    0{index + 1}
                  </span>

                  {filter.label}

                  <span
                    className={`absolute bottom-0 left-4 right-4 h-[2px] origin-left transition-transform duration-300 sm:left-6 sm:right-6 ${
                      active
                        ? "scale-x-100"
                        : "scale-x-0"
                    }`}
                    style={{
                      backgroundColor: ORANGE,
                    }}
                  />
                </button>
              );
            })}

          </div>
        </div>
        </ScrollReveal>

        {/* ===================================================
            MAIN FEATURED MACHINE
        =================================================== */}

        {selectedMachine && (
          <ScrollReveal delay={180}>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">

            {/* =================================================
                MACHINE IMAGE
            ================================================= */}

            <div className="group relative min-h-[360px] overflow-hidden border border-white/10 bg-[#050609] sm:min-h-[480px] lg:min-h-[570px]">

              {/* corner brackets */}

              <span
                className="absolute left-0 top-0 z-20 h-12 w-12 border-l-2 border-t-2"
                style={{
                  borderColor: ORANGE,
                }}
              />

              <span
                className="absolute bottom-0 right-0 z-20 h-12 w-12 border-b-2 border-r-2"
                style={{
                  borderColor: NAVY,
                }}
              />

              <Image
                src={selectedMachine.image}
                alt={selectedMachine.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.045]"
              />

              {/* dark treatment */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/20" />

              {/* subtle navy tint */}

              <div
                className="absolute inset-0 opacity-[0.08] mix-blend-screen"
                style={{
                  backgroundColor: NAVY,
                }}
              />

              {/* =================================================
                  TOP LABEL
              ================================================= */}

              <div className="absolute left-4 right-4 top-4 flex items-center justify-between sm:left-6 sm:right-6 sm:top-6">

                <div className="flex items-center gap-2 border border-white/10 bg-black/70 px-3 py-2 backdrop-blur-md">

                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: ORANGE,
                    }}
                  />

                  <span className="font-mono text-[8px] font-bold uppercase tracking-[0.17em] text-zinc-300">
                    {selectedMachine.label}
                  </span>

                </div>

                <span className="font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-zinc-600">
                  MACHINE / {selectedMachine.id}
                </span>

              </div>

              {/* =================================================
                  MACHINE TITLE
              ================================================= */}

              <div className="absolute bottom-6 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8">

                <div
                  className="mb-3 font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
                  style={{
                    color: ORANGE,
                  }}
                >
                  SHREE GRAPHICS
                </div>

                <h3 className="max-w-3xl font-display text-3xl font-black uppercase leading-[0.9] tracking-[-0.02em] text-white sm:text-4xl md:text-5xl">
                  {selectedMachine.name}
                </h3>

              </div>

              {/* moving scan line */}

              <div
                className="pointer-events-none absolute left-0 right-0 top-1/2 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-60"
                style={{
                  backgroundColor: ORANGE,
                }}
              />

            </div>

            {/* =================================================
                MACHINE INFORMATION
            ================================================= */}

            <div
              className="flex flex-col border bg-[#0A0B10]"
              style={{
                borderColor: `${NAVY}99`,
              }}
            >

              {/* header */}

              <div className="border-b border-white/10 p-6 sm:p-8">

                <div className="flex items-center justify-between">

                  <div
                    className="flex h-11 w-11 items-center justify-center border"
                    style={{
                      borderColor: `${ORANGE}66`,
                    }}
                  >
                    <selectedMachine.icon
                      size={19}
                      style={{
                        color: ORANGE,
                      }}
                    />
                  </div>

                  <span
                    className="font-mono text-[8px] font-bold uppercase tracking-[0.18em]"
                    style={{
                      color: `${NAVY}DD`,
                    }}
                  >
                    SELECTED SYSTEM
                  </span>

                </div>

                <div className="mt-7">

                  <div
                    className="font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
                    style={{
                      color: ORANGE,
                    }}
                  >
                    {selectedMachine.category}
                  </div>

                  <h3 className="mt-3 font-display text-2xl font-black uppercase leading-[0.95] text-white sm:text-3xl">
                    {selectedMachine.name}
                  </h3>

                  <p className="mt-5 text-sm leading-6 text-zinc-400">
                    {selectedMachine.description}
                  </p>

                </div>
              </div>

              {/* machine selector */}

              <div className="flex-1">

                <div className="border-b border-white/10 px-6 py-4 sm:px-8">

                  <span className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                    Explore Machinery
                  </span>

                </div>

                {filteredMachines.map((machine) => {

                  const active =
                    machine.id ===
                    selectedMachine.id;

                  const Icon = machine.icon;

                  return (
                    <button
                      key={machine.id}
                      type="button"
                      onClick={() =>
                        setActiveMachine(machine.id)
                      }
                      className="group flex min-h-[72px] w-full items-center gap-3 border-b border-white/[0.07] px-6 text-left transition-all duration-300 hover:bg-white/[0.025] sm:px-8"
                    >

                      <span
                        className="w-5 shrink-0 font-mono text-[8px]"
                        style={{
                          color: active
                            ? ORANGE
                            : "#52525B",
                        }}
                      >
                        {machine.id}
                      </span>

                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center border transition-colors duration-300"
                        style={{
                          borderColor: active
                            ? `${ORANGE}66`
                            : `${NAVY}55`,
                        }}
                      >
                        <Icon
                          size={13}
                          style={{
                            color: active
                              ? ORANGE
                              : "#71717A",
                          }}
                        />
                      </div>

                      <span
                        className={`min-w-0 flex-1 text-xs font-medium transition-colors ${
                          active
                            ? "text-white"
                            : "text-zinc-500 group-hover:text-zinc-300"
                        }`}
                      >
                        {machine.name}
                      </span>

                      <ChevronRight
                        size={14}
                        className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                        style={{
                          color: active
                            ? ORANGE
                            : "#3F3F46",
                        }}
                      />

                    </button>
                  );
                })}

              </div>

              {/* CTA */}

              <div className="grid grid-cols-2 gap-3 p-6 sm:p-8">

                <Link
                  href="/products"
                  className="group flex min-h-12 items-center justify-center gap-2 border border-white/15 px-4 font-mono text-[8px] font-bold uppercase tracking-[0.13em] text-zinc-300 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.025] hover:text-white"
                >
                  <span>All Machines</span>

                  <ArrowUpRight
                    size={13}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>

                <Link
                  href="/contact"
                  className="group flex min-h-12 items-center justify-center gap-2 border px-4 font-mono text-[8px] font-bold uppercase tracking-[0.13em] text-white transition-all duration-300 hover:bg-white/[0.035]"
                  style={{
                    borderColor: `${ORANGE}AA`,
                  }}
                >
                  <span>Enquire</span>

                  <ArrowRight
                    size={13}
                    style={{
                      color: ORANGE,
                    }}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

              </div>

            </div>
          </div>
          </ScrollReveal>
        )}

        {/* ===================================================
            MACHINE CATEGORY STRIP
        =================================================== */}

        <ScrollReveal delay={260}>
        <div className="mt-8 grid grid-cols-2 border border-white/10 sm:grid-cols-4">

          {[
            {
              number: "01",
              title: "Printing",
              description: "Flexographic systems",
            },
            {
              number: "02",
              title: "Die Cutting",
              description: "Label converting",
            },
            {
              number: "03",
              title: "Slitting",
              description: "Roll conversion",
            },
            {
              number: "04",
              title: "Specialised",
              description: "Custom requirements",
            },
          ].map((item, index) => (
            <div
              key={item.number}
              className={`group min-h-[105px] p-4 transition-colors duration-300 hover:bg-white/[0.02] sm:p-5 ${
                index % 2 !== 0
                  ? "border-l border-white/10"
                  : ""
              } ${
                index >= 2
                  ? "border-t border-white/10 sm:border-t-0"
                  : ""
              } ${
                index === 0
                  ? "sm:border-l-0"
                  : ""
              }`}
            >

              <div className="flex items-center justify-between">

                <span
                  className="font-mono text-[8px]"
                  style={{
                    color:
                      index % 2 === 0
                        ? ORANGE
                        : `${NAVY}DD`,
                  }}
                >
                  {item.number}
                </span>

                <ArrowUpRight
                  size={13}
                  className="text-zinc-700 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  style={{
                    color:
                      index % 2 === 0
                        ? ORANGE
                        : NAVY,
                  }}
                />

              </div>

              <div className="mt-4 font-display text-lg font-bold uppercase leading-none text-zinc-300 sm:text-xl">
                {item.title}
              </div>

              <div className="mt-2 font-mono text-[8px] uppercase tracking-[0.12em] text-zinc-600">
                {item.description}
              </div>

            </div>
          ))}

        </div>
        </ScrollReveal>

        {/* ===================================================
            BOTTOM LINK
        =================================================== */}

        <ScrollReveal delay={360}>
        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">

          <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-zinc-600">
            Machinery / Printing / Converting / Slitting
          </div>

          <Link
            href="/products"
            className="group inline-flex min-h-11 items-center gap-4 font-mono text-[9px] font-bold uppercase tracking-[0.17em] text-zinc-400 transition-colors hover:text-white"
          >
            <span>View complete machinery range</span>

            <ArrowRight
              size={15}
              style={{
                color: ORANGE,
              }}
              className="transition-transform duration-300 group-hover:translate-x-2"
            />
          </Link>

        </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
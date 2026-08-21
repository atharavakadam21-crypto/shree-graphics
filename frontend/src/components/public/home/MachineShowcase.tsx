"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Cog,
  Layers3,
  Scissors,
  Settings2,
} from "lucide-react";

import ScrollReveal from "@/components/public/ScrollReveal";
const NAVY = "#2E2582";
const ORANGE = "#EF7B00";

type Machine = {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  icon: typeof Cog;
  tag: string;
};

const machines: Machine[] = [
  {
    id: "01",
    category: "DIE CUTTING",
    title: "Turret Rotary Table Top Label Die Cutting Machine",
    description:
      "Compact rotary label die cutting machinery designed for efficient label converting applications.",
    image: "/gallery/turret-diecutting-machine.jpg",
    icon: Cog,
    tag: "LABEL CONVERTING",
  },
  {
    id: "02",
    category: "FLEXOGRAPHIC PRINTING",
    title: "Two Color Flexo Printing Machine",
    description:
      "Flexographic printing equipment for producing printed labels and flexible packaging materials.",
    image: "/gallery/two-color-flexo-printing-machine.jpg",
    icon: Layers3,
    tag: "PRINTING",
  },
  {
    id: "03",
    category: "SLITTING",
    title: "Micro Slitting Machine",
    description:
      "Precision slitting machinery for converting rolls into narrower finished webs.",
    image: "/gallery/DSC_1889.JPG",
    icon: Scissors,
    tag: "ROLL CONVERTING",
  },
  {
    id: "04",
    category: "CORE CUTTING",
    title: "Paper Core Cutting Machine",
    description:
      "Dedicated machinery for accurate paper core cutting applications across converting operations.",
    image: "/gallery/DSC_1889.JPG",
    icon: Settings2,
    tag: "CORE PROCESSING",
  },
];

const categories = [
  {
    id: "ALL",
    label: "All Machinery",
  },
  {
    id: "PRINTING",
    label: "Printing",
  },
  {
    id: "CONVERTING",
    label: "Converting",
  },
  {
    id: "SLITTING",
    label: "Slitting",
  },
];

export default function MachineShowcase() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [activeMachine, setActiveMachine] = useState(0);

  const filteredMachines =
    activeCategory === "ALL"
      ? machines
      : machines.filter((machine) => {
          if (activeCategory === "PRINTING") {
            return machine.category === "FLEXOGRAPHIC PRINTING";
          }

          if (activeCategory === "SLITTING") {
            return machine.category === "SLITTING";
          }

          return (
            machine.category === "DIE CUTTING" ||
            machine.category === "CORE CUTTING"
          );
        });

  const selectedMachine =
    filteredMachines[activeMachine] ?? filteredMachines[0];

  return (
    <section
      id="machines"
      className="relative overflow-hidden border-b border-white/10 bg-[#08090D] py-20 sm:py-24 lg:py-28"
    >
      {/* =====================================================
          BACKGROUND CONSTRUCTION
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(255,255,255,0.08) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255,255,255,0.08) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-220px] top-[20%] h-[500px] w-[500px] rounded-full opacity-[0.07] blur-[130px]"
        style={{
          backgroundColor: NAVY,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* ===================================================
            SECTION HEADER
        =================================================== */}

        <ScrollReveal delay={0}>
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span
                className="h-px w-8"
                style={{ backgroundColor: ORANGE }}
              />

              <span
                className="font-mono text-[9px] font-bold uppercase tracking-[0.22em]"
                style={{ color: ORANGE }}
              >
                01 / Machinery
              </span>
            </div>

            <h2 className="max-w-4xl font-display text-4xl font-black uppercase leading-[0.9] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              MACHINES BUILT
              <br />
              <span className="text-zinc-500">
                FOR THE JOB.
              </span>
            </h2>
          </div>

          <div className="border-l-2 pl-5" style={{ borderColor: NAVY }}>
            <p className="text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
              Explore the Shree Graphics machinery range
              covering printing, slitting, die cutting,
              paper core cutting and specialised
              converting applications.
            </p>
          </div>
        </div>
        </ScrollReveal>

        {/* ===================================================
            CATEGORY FILTER
        =================================================== */}

        <ScrollReveal delay={100}>
        <div className="mt-10 overflow-x-auto border-y border-white/10">
          <div className="flex min-w-max items-center">
            {categories.map((category, index) => {
              const active = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category.id);
                    setActiveMachine(0);
                  }}
                  className="group relative flex min-h-12 items-center gap-2 px-4 font-mono text-[9px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 sm:px-6"
                  style={{
                    color: active ? "#FFFFFF" : "#71717A",
                  }}
                >
                  <span
                    className="text-[7px]"
                    style={{
                      color: active ? ORANGE : "#52525B",
                    }}
                  >
                    0{index + 1}
                  </span>

                  {category.label}

                  <span
                    className={`absolute bottom-0 left-4 right-4 h-[2px] origin-left transition-transform duration-300 sm:left-6 sm:right-6 ${
                      active ? "scale-x-100" : "scale-x-0"
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
            FEATURED MACHINE
        =================================================== */}

        {selectedMachine && (
          <ScrollReveal delay={180}>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            {/* IMAGE */}

            <div className="group relative min-h-[300px] overflow-hidden border border-white/10 bg-[#050609] sm:min-h-[420px] lg:min-h-[520px]">
              {/* Corner markers */}

              <span
                className="absolute left-0 top-0 z-20 h-10 w-10 border-l-2 border-t-2"
                style={{ borderColor: ORANGE }}
              />

              <span
                className="absolute bottom-0 right-0 z-20 h-10 w-10 border-b-2 border-r-2"
                style={{ borderColor: NAVY }}
              />

              <Image
                src={selectedMachine.image}
                alt={selectedMachine.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
              />

              {/* Image treatment */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />

              <div
                className="absolute inset-0 opacity-[0.08] mix-blend-screen"
                style={{ backgroundColor: NAVY }}
              />

              {/* Image label */}

              <div className="absolute left-4 top-4 flex items-center gap-2 border border-white/10 bg-black/65 px-3 py-2 backdrop-blur-md sm:left-6 sm:top-6">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: ORANGE }}
                />

                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-zinc-300">
                  {selectedMachine.tag}
                </span>
              </div>

              {/* Image bottom */}

              <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
                <div className="mb-2 font-mono text-[8px] uppercase tracking-[0.2em] text-zinc-500">
                  MACHINE {selectedMachine.id}
                </div>

                <div className="max-w-xl font-display text-2xl font-bold uppercase leading-none text-white sm:text-3xl lg:text-4xl">
                  {selectedMachine.title}
                </div>
              </div>
            </div>

            {/* INFORMATION PANEL */}

            <div
              className="flex flex-col border bg-[#0B0C11]"
              style={{
                borderColor: `${NAVY}99`,
              }}
            >
              <div className="border-b border-white/10 p-5 sm:p-7">
                <div className="mb-5 flex items-center justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center border"
                    style={{
                      borderColor: `${ORANGE}66`,
                      color: ORANGE,
                    }}
                  >
                    <selectedMachine.icon size={18} />
                  </div>

                  <span
                    className="font-mono text-[8px] uppercase tracking-[0.2em]"
                    style={{ color: `${NAVY}CC` }}
                  >
                    SG / {selectedMachine.id}
                  </span>
                </div>

                <div
                  className="mb-3 font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: ORANGE }}
                >
                  {selectedMachine.category}
                </div>

                <h3 className="font-display text-2xl font-bold uppercase leading-[0.95] text-white sm:text-3xl">
                  {selectedMachine.title}
                </h3>

                <p className="mt-5 text-sm leading-6 text-zinc-400">
                  {selectedMachine.description}
                </p>
              </div>

              {/* MACHINE INDEX */}

              <div className="flex-1">
                <div className="border-b border-white/10 px-5 py-4 sm:px-7">
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-zinc-600">
                    Explore Machinery
                  </span>
                </div>

                <div>
                  {filteredMachines.map((machine, index) => {
                    const active =
                      machine.id === selectedMachine.id;

                    const Icon = machine.icon;

                    return (
                      <button
                        key={machine.id}
                        type="button"
                        onClick={() => setActiveMachine(index)}
                        className={`group flex min-h-[68px] w-full items-center gap-3 border-b border-white/[0.07] px-5 text-left transition-all duration-300 sm:px-7 ${
                          active
                            ? "bg-white/[0.035]"
                            : "hover:bg-white/[0.02]"
                        }`}
                      >
                        <span
                          className="font-mono text-[8px]"
                          style={{
                            color: active
                              ? ORANGE
                              : "#52525B",
                          }}
                        >
                          {machine.id}
                        </span>

                        <div
                          className="flex h-8 w-8 shrink-0 items-center justify-center border"
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
                          className={`min-w-0 flex-1 truncate text-xs font-medium transition-colors ${
                            active
                              ? "text-white"
                              : "text-zinc-500 group-hover:text-zinc-300"
                          }`}
                        >
                          {machine.title}
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
              </div>

              {/* CTA */}

              <div className="p-5 sm:p-7">
                <Link
                  href="/products"
                  className="group flex min-h-12 w-full items-center justify-between border px-5 font-mono text-[9px] font-bold uppercase tracking-[0.17em] text-white transition-all duration-300 hover:bg-white/[0.025]"
                  style={{
                    borderColor: `${ORANGE}99`,
                  }}
                >
                  <span>View Machine Range</span>

                  <ArrowUpRight
                    size={15}
                    style={{ color: ORANGE }}
                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
          </ScrollReveal>
        )}

        {/* ===================================================
            MACHINE RANGE STRIP
        =================================================== */}

        <ScrollReveal delay={260}>
        <div className="mt-10 grid grid-cols-2 border border-white/10 sm:grid-cols-4">
          {[
            {
              number: "01",
              label: "Printing",
            },
            {
              number: "02",
              label: "Slitting",
            },
            {
              number: "03",
              label: "Die Cutting",
            },
            {
              number: "04",
              label: "Core Cutting",
            },
          ].map((item, index) => (
            <div
              key={item.number}
              className={`flex min-h-[76px] items-center gap-3 px-4 sm:px-6 ${
                index !== 0
                  ? "border-l border-white/10"
                  : ""
              } ${
                index >= 2
                  ? "border-t border-white/10 sm:border-t-0"
                  : ""
              }`}
            >
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

              <span className="font-display text-sm font-bold uppercase text-zinc-300 sm:text-base">
                {item.label}
              </span>
            </div>
          ))}
        </div>
        </ScrollReveal>

        {/* ===================================================
            BOTTOM LINK
        =================================================== */}

        <div className="mt-8 flex justify-end">
          <Link
            href="/products"
            className="group inline-flex min-h-11 items-center gap-4 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:text-white"
          >
            <span>Explore complete machinery range</span>

            <ArrowRight
              size={15}
              style={{ color: ORANGE }}
              className="transition-transform duration-300 group-hover:translate-x-2"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import {
  ArrowRight,
  CircleDot,
  Layers3,
  MoveHorizontal,
  Settings2,
  Wrench,
} from "lucide-react";
import ScrollReveal from "@/components/public/ScrollReveal";

type ShaftType = {
  id: string;
  code: string;
  name: string;
  shortName: string;
  description: string;
  applications: string[];
  icon: typeof CircleDot;
  accent: "orange" | "navy";
};

const shaftTypes: ShaftType[] = [
  {
    id: "lug",
    code: "AS-01",
    name: "Lug / Expanding Lug Airshaft",
    shortName: "LUG SHAFT",
    description:
      "Air-operated expanding lugs provide a positive grip on the core for winding and unwinding applications.",
    applications: [
      "Printing machinery",
      "Slitting & rewinding",
      "Converting machinery",
    ],
    icon: Settings2,
    accent: "orange",
  },
  {
    id: "bladder",
    code: "AS-02",
    name: "Bladder / Air Expanding Shaft",
    shortName: "BLADDER SHAFT",
    description:
      "An air-expanding shaft design using internal bladder elements to engage the roll core during operation.",
    applications: [
      "Web handling",
      "Rewinding systems",
      "Printing applications",
    ],
    icon: CircleDot,
    accent: "navy",
  },
  {
    id: "differential",
    code: "AS-03",
    name: "Differential Airshaft",
    shortName: "DIFFERENTIAL",
    description:
      "Designed for applications where multiple rolls need controlled winding behaviour across the same shaft.",
    applications: [
      "Multi-roll slitting",
      "Slitter rewinders",
      "Variable-tension winding",
    ],
    icon: Layers3,
    accent: "orange",
  },
  {
    id: "friction",
    code: "AS-04",
    name: "Slip-On / Friction Shaft",
    shortName: "FRICTION SHAFT",
    description:
      "A friction-based shaft arrangement designed for controlled engagement with the roll core.",
    applications: [
      "Converting equipment",
      "Rewinding applications",
      "Special-purpose machinery",
    ],
    icon: MoveHorizontal,
    accent: "navy",
  },
  {
    id: "cantilever",
    code: "AS-05",
    name: "Cantilever Airshaft",
    shortName: "CANTILEVER",
    description:
      "A cantilever configuration intended for machinery where quick roll loading and unloading is required.",
    applications: [
      "Slitting systems",
      "Rewinding machinery",
      "Quick-change applications",
    ],
    icon: Wrench,
    accent: "orange",
  },
];

function TechnicalShaftIllustration({
  type,
}: {
  type: ShaftType;
}) {
  return (
    <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden border border-zinc-800 bg-[#08080b] sm:min-h-[390px]">
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Drawing information */}
      <div className="absolute left-4 top-4 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600">
        Technical Configuration
      </div>

      <div className="absolute right-4 top-4 font-mono text-[9px] text-zinc-600">
        {type.code}
      </div>

      {/* Shaft drawing */}
      <div className="relative z-10 w-[78%] sm:w-[72%]">
        <div className="relative h-14 border border-zinc-500 bg-zinc-900 sm:h-20">
          {/* center line */}
          <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-zinc-600" />

          {/* core */}
          <div className="absolute left-[15%] top-1/2 h-8 w-[70%] -translate-y-1/2 border border-zinc-700 bg-zinc-950 sm:h-11" />

          {/* expanding elements */}
          <div className="absolute left-[20%] top-1/2 flex -translate-y-1/2 gap-1">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`h-9 w-2 border sm:h-12 ${
                  type.accent === "orange"
                    ? "border-[#F5820C] bg-[#F5820C]/15"
                    : "border-[#2E1A6B] bg-[#2E1A6B]/30"
                }`}
              />
            ))}
          </div>

          <div className="absolute left-[65%] top-1/2 flex -translate-y-1/2 gap-1">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className={`h-9 w-2 border sm:h-12 ${
                  type.accent === "orange"
                    ? "border-[#F5820C] bg-[#F5820C]/15"
                    : "border-[#2E1A6B] bg-[#2E1A6B]/30"
                }`}
              />
            ))}
          </div>

          {/* journals */}
          <div className="absolute -left-5 top-1/2 h-8 w-5 -translate-y-1/2 border border-zinc-500 bg-zinc-800 sm:h-12" />
          <div className="absolute -right-5 top-1/2 h-8 w-5 -translate-y-1/2 border border-zinc-500 bg-zinc-800 sm:h-12" />
        </div>

        {/* dimension line */}
        <div className="mt-9 flex items-center gap-3">
          <span className="h-px flex-1 bg-zinc-700" />

          <span
            className={`font-mono text-[8px] uppercase tracking-[0.16em] ${
              type.accent === "orange"
                ? "text-[#F5820C]"
                : "text-[#2E1A6B]"
            }`}
          >
            {type.shortName}
          </span>

          <span className="h-px flex-1 bg-zinc-700" />
        </div>
      </div>

      {/* Corner marks */}
      <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-[#F5820C]" />
      <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-[#2E1A6B]" />
      <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-[#2E1A6B]" />
      <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-[#F5820C]" />

      <div className="absolute bottom-4 left-4 font-mono text-[8px] uppercase tracking-wider text-zinc-700">
        SHREE GRAPHICS // AIRSHAFT SYSTEM
      </div>
    </div>
  );
}

export default function AirShaftTypes() {
  const [activeType, setActiveType] = useState("lug");

  const selected =
    shaftTypes.find((shaft) => shaft.id === activeType) ??
    shaftTypes[0];

  const Icon = selected.icon;

  return (
    <section
      id="airshaft-types"
      className="relative overflow-hidden border-b border-zinc-800/80 bg-[#050507] py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <ScrollReveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-[#F5820C]">
                <span className="h-px w-8 bg-[#F5820C]" />
                02 / Airshaft Range
              </div>

              <h2 className="font-display text-4xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-6xl lg:text-7xl">
                SELECT YOUR
                <br />
                <span className="text-zinc-600">AIRSHAFT</span>
                <br />
                <span className="text-[#2E1A6B]">CONFIGURATION.</span>
              </h2>
            </div>

            <div className="border-l border-[#F5820C] pl-5 lg:col-span-4">
              <p className="text-sm leading-7 text-zinc-400">
                Explore the shaft configurations we manufacture,
                repair and support for printing, slitting and
                converting applications.
              </p>
            </div>
          </div>
        </ScrollReveal>  

        {/* Type selector */}
        <ScrollReveal delay={120}>
          <div className="mt-14 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {shaftTypes.map((shaft, index) => {
              const isActive = activeType === shaft.id;

              return (
                <button
                  key={shaft.id}
                  type="button"
                  onClick={() => setActiveType(shaft.id)}
                  aria-pressed={isActive}
                  className={`group relative flex min-h-16 items-center gap-3 border px-4 py-3 text-left transition-all duration-250 ${
                    isActive
                      ? shaft.accent === "orange"
                        ? "border-[#F5820C] bg-[#F5820C]/5"
                        : "border-[#2E1A6B] bg-[#2E1A6B]/10"
                      : "border-zinc-800 bg-[#09090d] hover:border-zinc-600"
                  }`}
                >
                  <span
                    className={`font-mono text-[9px] ${
                      isActive
                        ? shaft.accent === "orange"
                          ? "text-[#F5820C]"
                          : "text-[#2E1A6B]"
                        : "text-zinc-600"
                    }`}
                  >
                    0{index + 1}
                  </span>

                  <span
                    className={`text-xs font-bold uppercase tracking-wide ${
                      isActive
                        ? "text-white"
                        : "text-zinc-500 group-hover:text-zinc-300"
                    }`}
                  >
                    {shaft.shortName}
                  </span>

                  {isActive && (
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] w-full ${
                        shaft.accent === "orange"
                          ? "bg-[#F5820C]"
                          : "bg-[#2E1A6B]"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </ScrollReveal>  

        {/* Selected shaft */}
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* Illustration */}
          <ScrollReveal
            key={`${selected.id}-illustration`}
            delay={80}
            className="lg:col-span-7"
          >
            <TechnicalShaftIllustration type={selected} />
          </ScrollReveal>  
          {/* Details */}
          <ScrollReveal
            key={`${selected.id}-details`}
            delay={140}
            className="lg:col-span-5"
          >
            <div className="flex h-full min-h-[300px] flex-col border border-zinc-800 bg-[#09090d] p-6 sm:p-8 lg:min-h-[390px]">

              <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center border ${
                      selected.accent === "orange"
                        ? "border-[#F5820C]/40 bg-[#F5820C]/5"
                        : "border-[#2E1A6B]/50 bg-[#2E1A6B]/10"
                    }`}
                  >
                    <Icon
                      size={17}
                      className={
                        selected.accent === "orange"
                          ? "text-[#F5820C]"
                          : "text-[#2E1A6B]"
                      }
                    />
                  </div>

                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600">
                      {selected.code}
                    </span>

                    <h3 className="mt-1 text-lg font-bold uppercase leading-tight text-white sm:text-xl">
                      {selected.name}
                    </h3>
                  </div>
                </div>

                <span className="font-mono text-[9px] uppercase text-zinc-700">
                  ACTIVE
                </span>
              </div>

              <div className="flex-1 pt-6">
                <p className="text-sm leading-7 text-zinc-400 sm:text-base">
                  {selected.description}
                </p>

                <div className="mt-8">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                    Typical Applications
                  </span>

                  <div className="mt-3 space-y-2">
                    {selected.applications.map((application) => (
                      <div
                        key={application}
                        className="flex items-center gap-3 border-b border-zinc-800/70 pb-2 text-sm text-zinc-300"
                      >
                        <span
                          className={`h-1.5 w-1.5 ${
                            selected.accent === "orange"
                              ? "bg-[#F5820C]"
                              : "bg-[#2E1A6B]"
                          }`}
                        />

                        {application}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-zinc-800 pt-5">
  <a
    href="/contact"
    className="group relative flex min-h-12 w-full items-center justify-between overflow-hidden border border-[#F5820C] bg-[#F5820C] px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-black transition-all duration-300 hover:border-[#2E1A6B] hover:bg-[#2E1A6B] hover:text-white"
  >
    {/* Hover sweep */}
    <span className="absolute inset-y-0 left-0 w-0 bg-white/10 transition-all duration-300 group-hover:w-full" />

    <span className="relative z-10 flex items-center gap-3">
      <span className="h-1.5 w-1.5 bg-black transition-colors duration-300 group-hover:bg-white" />
      Discuss This Configuration
    </span>

    <span className="relative z-10 flex h-7 w-7 items-center justify-center border border-black/30 transition-all duration-300 group-hover:translate-x-1 group-hover:border-white/40">
      <ArrowRight
        size={14}
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      />
    </span>
  </a>
</div>

            </div>
          </ScrollReveal>   
        </div>
      </div>
    </section>
  );
}
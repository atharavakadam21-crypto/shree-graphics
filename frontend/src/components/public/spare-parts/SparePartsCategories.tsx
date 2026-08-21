"use client";

import { useState } from "react";
import {
  ArrowRight,
  Box,
  Cog,
  Cylinder,
  Gauge,
  Scissors,
  Settings2,
  Wrench,
  Zap,
} from "lucide-react";
import ScrollReveal from "@/components/public/ScrollReveal";

const categories = [
  {
    id: "mechanical",
    number: "01",
    title: "Mechanical Components",
    description:
      "Components used across machine assemblies, drive systems and mechanical mechanisms.",
    icon: Cog,
    accent: "orange",
    items: [
      "Gears & Drive Components",
      "Bearings",
      "Bushes & Mechanical Hardware",
      "Couplings",
    ],
  },
  {
    id: "shafts",
    number: "02",
    title: "Shafts & Rollers",
    description:
      "Replacement requirements for shafts, rollers and rotating machine assemblies.",
    icon: Cylinder,
    accent: "navy",
    items: [
      "Machine Shafts",
      "Rollers",
      "Core Shafts",
      "Air Shaft Components",
    ],
  },
  {
    id: "slitting",
    number: "03",
    title: "Slitting Components",
    description:
      "Components for micro-slitting and material cutting applications.",
    icon: Scissors,
    accent: "orange",
    items: [
      "Slitting Knives",
      "Knife Holders",
      "Cutting Components",
      "Slitting Accessories",
    ],
  },
  {
    id: "pneumatic",
    number: "04",
    title: "Pneumatic Components",
    description:
      "Replacement components used in pneumatic machine assemblies and controls.",
    icon: Gauge,
    accent: "navy",
    items: [
      "Pneumatic Fittings",
      "Valves",
      "Cylinders",
      "Air Line Components",
    ],
  },
  {
    id: "electrical",
    number: "05",
    title: "Electrical & Controls",
    description:
      "Electrical and control-system replacement requirements for machinery.",
    icon: Zap,
    accent: "orange",
    items: [
      "Sensors",
      "Switches",
      "Control Components",
      "Electrical Accessories",
    ],
  },
  {
    id: "custom",
    number: "06",
    title: "Custom Requirements",
    description:
      "Can't identify the component? Send us your machine details and requirement.",
    icon: Wrench,
    accent: "navy",
    items: [
      "Custom Components",
      "Drawing-Based Parts",
      "Replacement Fabrication",
      "Identification Assistance",
    ],
  },
];

export default function SparePartsCategories() {
  const [active, setActive] = useState("mechanical");

  const activeCategory =
    categories.find((category) => category.id === active) ?? categories[0];

  const ActiveIcon = activeCategory.icon;

  return (
    <section
      id="parts-range"
      className="relative overflow-hidden border-b border-zinc-800/80 bg-[#07070b] py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <ScrollReveal>
          <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="mb-4 flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#F5820C]">
                <span className="h-px w-10 bg-[#F5820C]" />
                02 / Parts Range
              </div>

              <h2 className="font-display text-4xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-6xl lg:text-7xl">
                FIND THE
                <br />
                <span className="text-zinc-600">RIGHT COMPONENT.</span>
              </h2>
            </div>

            <p className="border-l border-[#2E1A6B] pl-5 text-sm leading-7 text-zinc-400 lg:col-span-4">
              Select a requirement below. If you are unsure what part you
              need, simply send us the machine details and our team can help
              identify the requirement.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Category selector */}
          <div className="lg:col-span-5">
            <div className="border border-zinc-800">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = active === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActive(category.id)}
                    className={`group flex min-h-[78px] w-full items-center justify-between border-b border-zinc-800 px-5 text-left transition-all duration-300 last:border-b-0 ${
                      isActive
                        ? "bg-[#F5820C]/10"
                        : "hover:bg-[#2E1A6B]/10"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center border transition-colors ${
                          isActive
                            ? "border-[#F5820C] text-[#F5820C]"
                            : "border-zinc-800 text-zinc-600 group-hover:border-[#2E1A6B] group-hover:text-[#2E1A6B]"
                        }`}
                      >
                        <Icon size={18} />
                      </div>

                      <div>
                        <span
                          className={`mb-1 block font-mono text-[9px] tracking-[0.2em] ${
                            isActive
                              ? "text-[#F5820C]"
                              : "text-zinc-600"
                          }`}
                        >
                          {category.number}
                        </span>

                        <span
                          className={`text-sm font-semibold sm:text-base ${
                            isActive ? "text-white" : "text-zinc-400"
                          }`}
                        >
                          {category.title}
                        </span>
                      </div>
                    </div>

                    <ArrowRight
                      size={16}
                      className={`transition-all duration-300 ${
                        isActive
                          ? "translate-x-0 text-[#F5820C]"
                          : "-translate-x-2 text-zinc-700 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active category */}
          <div className="lg:col-span-7">
            <div className="relative min-h-full border border-[#2E1A6B]/70 bg-[#09090e] p-6 sm:p-8 lg:p-10">
              <div className="absolute right-0 top-0 h-24 w-24 border-l border-b border-[#2E1A6B]/40" />

              <div className="mb-8 flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center border border-[#F5820C]/60 bg-[#F5820C]/5">
                  <ActiveIcon size={24} className="text-[#F5820C]" />
                </div>

                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                  SG / PARTS / {activeCategory.number}
                </span>
              </div>

              <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5820C]">
                Selected Requirement
              </p>

              <h3 className="font-display text-3xl font-black uppercase leading-none text-white sm:text-5xl">
                {activeCategory.title}
              </h3>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                {activeCategory.description}
              </p>

              <div className="mt-9 grid grid-cols-1 gap-px border border-zinc-800 bg-zinc-800 sm:grid-cols-2">
                {activeCategory.items.map((item, index) => (
                  <div
                    key={item}
                    className="group flex items-center gap-3 bg-[#09090e] px-4 py-4 transition-colors hover:bg-[#2E1A6B]/10"
                  >
                    <span className="font-mono text-[9px] text-[#F5820C]">
                      0{index + 1}
                    </span>

                    <span className="text-sm text-zinc-300 transition-colors group-hover:text-white">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-3 border-t border-zinc-800 pt-6">
                <Box size={15} className="text-[#2E1A6B]" />

                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600">
                  Availability depends on machine / requirement
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Compatibility strip */}
        <ScrollReveal delay={120}>
          <div className="mt-8 grid grid-cols-1 border border-zinc-800 sm:grid-cols-3">
            {[
              {
                icon: Settings2,
                title: "Machine Details",
                text: "Model / machine information",
              },
              {
                icon: Gauge,
                title: "Requirement",
                text: "Part name or description",
              },
              {
                icon: Wrench,
                title: "Technical Help",
                text: "Our team can assist identification",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex gap-4 border-b border-zinc-800 p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
                >
                  <Icon size={18} className="mt-1 shrink-0 text-[#2E1A6B]" />

                  <div>
                    <p className="text-sm font-semibold text-zinc-200">
                      {item.title}
                    </p>

                    <p className="mt-1 text-xs text-zinc-600">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
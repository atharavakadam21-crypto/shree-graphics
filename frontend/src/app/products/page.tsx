import Link from "next/link";

import Footer from "@/components/public/Footer";
import Header from "@/components/public/Header";
import ScrollReveal from "@/components/public/ScrollReveal";

import ProductHero from "@/components/public/products/ProductHero";
import ProductGrid from "@/components/public/products/ProductGrid";
import ProductSpecsPreview from "@/components/public/products/ProductSpecsPreview";

import SectionLabel from "@/components/ui/SectionLabel";
import TechnicalGrid from "@/components/ui/TechnicalGrid";

import type { Machine } from "@/lib/types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

async function getMachines(): Promise<Machine[]> {
  try {
    const response = await fetch(`${API_URL}/api/machines`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        "Failed to fetch machines:",
        response.status,
        response.statusText
      );

      return [];
    }

    const result = (await response.json()) as {
      success: boolean;
      data?: Machine[];
    };

    if (!result.success || !result.data) {
      return [];
    }

    return result.data;
  } catch (error) {
    console.error("Failed to load machines:", error);

    return [];
  }
}

export default async function ProductsPage() {
  const machines = await getMachines();

  const featuredMachine =
    machines.find((machine) => machine.featured) ??
    machines[0] ??
    null;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#060606] text-white">
      <Header />

      <ProductHero />

      {/* MACHINE INDEX */}
      <section className="bg-[#070707] py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
            <ScrollReveal>
              <SectionLabel number="02">
                Machine index
              </SectionLabel>

              <p className="mt-7 max-w-xs text-sm leading-7 text-zinc-600">
                Explore machine systems engineered for label
                production, printing, slitting, die cutting,
                rewinding and material conversion.
              </p>

              <div className="mt-8 hidden border-l border-zinc-800 pl-5 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-600 lg:block">
                <p>01 / Flexographic</p>
                <p className="mt-3">02 / Slitting</p>
                <p className="mt-3">03 / Die cutting</p>
                <p className="mt-3">04 / Rewinding</p>
                <p className="mt-3">05 / Core cutting</p>
                <p className="mt-3">06 / Custom systems</p>
              </div>
            </ScrollReveal>

            <ProductGrid machines={machines} />
          </div>
        </div>
      </section>

      {/* FEATURED MACHINE */}
      {featuredMachine && (
        <section className="border-y border-zinc-900 bg-[#060606] py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <ScrollReveal>
              <SectionLabel number="03">
                Featured system
              </SectionLabel>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <div className="mt-12 grid border border-zinc-800 lg:grid-cols-[1fr_420px]">
                {/* IMAGE / SYSTEM VISUAL */}
                <div className="relative min-h-[420px] overflow-hidden bg-[#0a0a0a] sm:min-h-[560px]">
                  {featuredMachine.images?.[0] ? (
                    <img
                      src={featuredMachine.images[0]}
                      alt={featuredMachine.name}
                      className="absolute inset-0 h-full w-full object-contain p-10 opacity-90 transition-transform duration-700 hover:scale-[1.03] sm:p-16"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute h-56 w-56 border border-orange-500/20 sm:h-80 sm:w-80" />

                      <div className="absolute h-40 w-40 border border-zinc-700 sm:h-56 sm:w-56" />

                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-700">
                        SG / SYSTEM
                      </span>
                    </div>
                  )}

                  <div className="absolute left-5 top-5 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                    FEATURED / 001
                  </div>

                  <div className="absolute bottom-5 right-5 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                    ACTIVE SYSTEM
                  </div>
                </div>

                {/* INFORMATION */}
                <div className="flex flex-col justify-between border-t border-zinc-800 bg-[#090909] p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-orange-500">
                      Featured machine
                    </p>

                    <h2 className="mt-6 text-4xl font-semibold uppercase leading-[0.88] tracking-[-0.05em] text-white sm:text-5xl">
                      {featuredMachine.name}
                    </h2>

                    <p className="mt-7 border-l-2 border-orange-500 pl-4 text-sm leading-7 text-zinc-500">
                      {featuredMachine.description ||
                        featuredMachine.short_description ||
                        "Technical information for this machine is available on enquiry."}
                    </p>

                    <div className="mt-8">
                      <ProductSpecsPreview
                        specifications={
                          featuredMachine.specifications
                        }
                      />
                    </div>
                  </div>

                  <Link
                    href={`/products/${featuredMachine.slug}`}
                    className="mt-10 flex min-h-12 items-center justify-between border border-zinc-700 px-5 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:border-orange-500 hover:text-orange-400"
                  >
                    Explore system

                    <span className="text-orange-500">
                      ↗
                    </span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>   
          </div>
        </section>
      )}

      {/* EMPTY STATE */}
      {!featuredMachine && (
        <section className="border-y border-zinc-900 bg-[#060606] py-24 sm:py-32">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="border border-zinc-800 p-10 text-center sm:p-16">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-600">
                No machine systems available
              </p>

              <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-zinc-500">
                Machine systems are currently being updated.
                Please contact Shree Graphics for the latest
                manufacturing and converting solutions.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ENQUIRY CTA */}
      <section className="bg-[#070707] py-24 sm:py-32 lg:py-40">
        <TechnicalGrid>
          <div className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 lg:px-12">
            <ScrollReveal>
              <div className="grid gap-12 lg:grid-cols-[1fr_300px] lg:items-end">
                <div>
                  <SectionLabel number="04">
                    Production requirement
                  </SectionLabel>

                  <h2 className="mt-9 max-w-5xl text-5xl font-semibold uppercase leading-[0.82] tracking-[-0.06em] text-white sm:text-6xl lg:text-8xl">
                    Need a system
                    <br />
                    for your
                    <br />
                    process?
                  </h2>
                </div>

                <div>
                  <p className="border-l-2 border-orange-500 pl-4 text-sm leading-7 text-zinc-500">
                    Tell us about your material, application
                    and production requirement and discuss the
                    appropriate machine configuration.
                  </p>

                  <Link
                    href="/contact"
                    className="mt-8 flex min-h-12 items-center justify-between border border-zinc-700 px-5 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:border-orange-500 hover:text-orange-400"
                  >
                    Start enquiry

                    <span className="text-orange-500">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </TechnicalGrid>
      </section>

      <Footer />
    </main>
  );
}
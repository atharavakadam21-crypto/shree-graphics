import ScrollReveal from "@/components/public/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";

export default function GalleryHero() {
  return (
    <section className="relative min-h-[70svh] overflow-hidden border-b border-zinc-900 bg-[#060606]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.1]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[70svh] max-w-[1600px] items-end px-5 pb-14 pt-32 sm:px-8 lg:px-12 lg:pb-20">
        <div className="grid w-full gap-14 lg:grid-cols-[1fr_360px] lg:items-end">
          <ScrollReveal>
            <SectionLabel number="01">
              Gallery / Visual archive
            </SectionLabel>

            <h1 className="mt-9 max-w-6xl text-6xl font-semibold uppercase leading-[0.78] tracking-[-0.07em] text-white sm:text-7xl lg:text-8xl">
              Inside
              <br />
              the
              <br />
              build.
            </h1>
          </ScrollReveal>   

          <ScrollReveal delay={140}>
            <div className="border-l-2 border-cyan-500 pl-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                SG / VISUAL ARCHIVE
              </p>

              <p className="mt-5 text-sm leading-7 text-zinc-400">
                Machines, production environments and engineering
                details from the work behind Shree Graphics.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-zinc-800 pt-5">
                <div>
                  <span className="block font-mono text-[8px] uppercase tracking-[0.16em] text-zinc-700">
                    Archive
                  </span>

                  <span className="mt-2 block text-xs uppercase text-zinc-400">
                    Factory
                  </span>
                </div>

                <div>
                  <span className="block font-mono text-[8px] uppercase tracking-[0.16em] text-zinc-700">
                    Focus
                  </span>

                  <span className="mt-2 block text-xs uppercase text-zinc-400">
                    Machines
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>   
        </div>
      </div>
    </section>
  );
}
import ScrollReveal from "@/components/public/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";

export default function ContactHero() {
  return (
    <section className="relative min-h-[70svh] overflow-hidden border-b border-zinc-900 bg-[#060606]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
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
        <div className="grid w-full gap-12 lg:grid-cols-[1fr_360px] lg:items-end">
          <ScrollReveal>
            <SectionLabel number="01">
              Contact / Engineering enquiry
            </SectionLabel>

            <h1 className="mt-9 max-w-6xl text-6xl font-semibold uppercase leading-[0.78] tracking-[-0.07em] text-white sm:text-7xl lg:text-8xl">
              Let's build
              <br />
              the right
              <br />
              system.
            </h1>
          </ScrollReveal>   

          <ScrollReveal delay={140}>
            <div className="border-l-2 border-cyan-500 pl-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                SG / ENQUIRY CHANNEL
              </p>

              <p className="mt-5 text-sm leading-7 text-zinc-400">
                Tell us about your production requirement, material,
                application or machine requirement. Our team can
                discuss the appropriate system with you.
              </p>

              <div className="mt-7 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-700">
                RESPONSE / DIRECT
              </div>
            </div>
          </ScrollReveal>   
        </div>
      </div>
    </section>
  );
}
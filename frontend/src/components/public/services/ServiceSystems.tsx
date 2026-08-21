import ScrollReveal from "@/components/public/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";

const services = [
  {
    number: "01",
    title: "Machine Manufacturing",
    description:
      "Industrial machinery engineered for label converting and printing applications, with production requirements considered from the machine level upward.",
    tags: [
      "Machine building",
      "Production systems",
      "Label converting",
    ],
  },
  {
    number: "02",
    title: "Machine Repair",
    description:
      "Repair and restoration support for existing machinery, helping extend equipment life and return production systems to reliable operation.",
    tags: [
      "Troubleshooting",
      "Repair",
      "Refurbishment",
    ],
  },
  {
    number: "03",
    title: "Spare Parts",
    description:
      "Replacement and supporting components for machine maintenance, servicing and ongoing production requirements.",
    tags: [
      "Replacement parts",
      "Machine components",
      "Maintenance",
    ],
  },
  {
    number: "04",
    title: "Custom Machinery",
    description:
      "Engineering support for requirements that fall outside a standard machine configuration, with the system shaped around the application.",
    tags: [
      "Custom systems",
      "Application driven",
      "Engineering",
    ],
  },
];

export default function ServiceSystems() {
  return (
    <section className="bg-[#070707] py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[260px_1fr]">
          <ScrollReveal>
            <SectionLabel number="02">
              Engineering systems
            </SectionLabel>

            <p className="mt-7 max-w-xs text-sm leading-7 text-zinc-600">
              A machine is only one part of a production environment.
              Our service capability is built around the equipment
              before, during and after operation.
            </p>
          </ScrollReveal>

          <div className="border-t border-zinc-800">
            {services.map((service, index) => (
              <ScrollReveal
                key={service.number}
                delay={index * 90}
              >
                <article className="group grid gap-8 border-b border-zinc-800 py-10 md:grid-cols-[80px_1fr_240px] md:gap-10 lg:py-14">
                  <div className="flex items-start justify-between md:block">
                    <span className="font-mono text-[9px] text-cyan-500">
                      {service.number}
                    </span>

                    <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-zinc-800 md:hidden">
                      SG / SERVICE
                    </span>
                  </div>

                  <div>
                    <div className="mb-5 h-px w-10 bg-zinc-800 transition-all duration-500 group-hover:w-20 group-hover:bg-cyan-500" />

                    <h2 className="max-w-2xl text-3xl font-medium uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                      {service.title}
                    </h2>

                    <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-600">
                      {service.description}
                    </p>
                  </div>

                  <div className="border-l border-zinc-800 pl-5">
                    <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-zinc-700">
                      Service scope
                    </p>

                    <ul className="mt-5 space-y-3">
                      {service.tags.map((tag) => (
                        <li
                          key={tag}
                          className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.1em] text-zinc-500"
                        >
                          <span className="h-1 w-1 bg-cyan-500" />
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  MapPin,
  Phone,
} from "lucide-react";

const NAVY = "#2E1A6B";
const ORANGE = "#F5820C";

const navigation = [
  {
    label: "Machines",
    href: "/products",
  },
  {
    label: "Spare Parts",
    href: "/spare-parts",
  },
  {
    label: "Airshafts",
    href: "/airshafts",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
  {
    label: "About",
    href: "/about",
  },
];

const systems = [
  "Flexographic Printing",
  "Micro Slitting",
  "Rotary Die Cutting",
  "Paper Core Cutting",
  "Airshaft Manufacturing",
  "Airshaft Repair",
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#05060A] font-mono text-xs text-zinc-500">

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[minmax(0,2.2fr)_minmax(150px,1fr)_minmax(180px,1fr)_minmax(250px,1.25fr)] lg:gap-12">

          {/* =================================================
              BRAND
          ================================================= */}

          <div className="min-w-0">

            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <div
                className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border"
                style={{
                  borderColor: `${ORANGE}99`,
                  backgroundColor: NAVY,
                }}
              >
                <Image
                  src="/logo/sg-logo.png"
                  alt="Shree Graphics"
                  fill
                  priority
                  sizes="48px"
                  className="object-contain"
                />
              </div>

              <div className="min-w-0">
                <div className="font-display text-xl font-black uppercase tracking-[0.07em] text-white">
                  Shree Graphics
                </div>

                <div className="mt-1 whitespace-nowrap text-[7px] uppercase tracking-[0.18em] text-zinc-600">
                  Printing &amp; Converting Machinery
                </div>
              </div>
            </Link>

            <p className="mt-8 max-w-xl text-sm leading-7 text-zinc-400">
              Shree Graphics manufactures and supplies
              industrial machinery, spare parts and
              related engineering solutions for printing
              and converting applications.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span
                className="h-px w-8"
                style={{
                  backgroundColor: ORANGE,
                }}
              />

              <span className="text-[8px] uppercase tracking-[0.2em] text-zinc-700">
                Precision / Production / Reliability
              </span>
            </div>
          </div>

          {/* =================================================
              NAVIGATION
          ================================================= */}

          <div className="min-w-0">

            <span
              className="mb-6 block text-[8px] font-bold uppercase tracking-[0.2em]"
              style={{
                color: ORANGE,
              }}
            >
              Navigate
            </span>

            <nav>
              <ul className="space-y-4">

                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.13em] text-zinc-500 transition-colors duration-150 hover:text-white"
                    >
                      <span
                        className="h-px w-0 transition-all duration-150 group-hover:w-3"
                        style={{
                          backgroundColor: ORANGE,
                        }}
                      />

                      <span>
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}

              </ul>
            </nav>
          </div>

          {/* =================================================
              SYSTEMS
          ================================================= */}

          <div className="min-w-0">

            <span
              className="mb-6 block text-[8px] font-bold uppercase tracking-[0.2em]"
              style={{
                color: NAVY,
              }}
            >
              Systems
            </span>

            <ul className="space-y-4">

              {systems.map((system) => (
                <li
                  key={system}
                  className="text-[10px] uppercase tracking-[0.1em] text-zinc-500"
                >
                  {system}
                </li>
              ))}

            </ul>
          </div>

          {/* =================================================
              CONTACT
          ================================================= */}

          <div className="min-w-0">

            <span
              className="mb-6 block text-[8px] font-bold uppercase tracking-[0.2em]"
              style={{
                color: ORANGE,
              }}
            >
              Contact
            </span>

            <div className="space-y-6">

              {/* PHONE */}

              <a
                href="tel:+919820698449"
                className="group flex items-start gap-3"
              >
                <Phone
                  size={14}
                  className="mt-0.5 shrink-0"
                  style={{
                    color: ORANGE,
                  }}
                />

                <span className="text-[10px] leading-5 text-zinc-500 transition-colors duration-150 group-hover:text-white">
                  +91 9820698449
                </span>
              </a>

              {/* ADDRESS */}

              <div className="flex items-start gap-3">

                <MapPin
                  size={14}
                  className="mt-0.5 shrink-0"
                  style={{
                    color: NAVY,
                  }}
                />

                <span className="text-[10px] leading-5 text-zinc-500">
                  Godown No. C-9,
                  <br />
                  C Building, JK Warehouse Complex,
                  <br />
                  Old Agra Road,
                  <br />
                  Opp. Union Bank of India,
                  <br />
                  Kalher, Bhiwandi,
                  <br />
                  Maharashtra 421302
                </span>

              </div>

              {/* ENQUIRY */}

              <Link
                href="/contact"
                className="group flex min-h-12 w-full items-center justify-between border px-4 transition-all duration-150 hover:-translate-y-px hover:bg-orange-500/[0.035]"
                style={{
                  borderColor: `${NAVY}CC`,
                }}
              >
                <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-300">
                  Start an enquiry
                </span>

                <ArrowUpRight
                  size={14}
                  style={{
                    color: ORANGE,
                  }}
                  className="transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

            </div>
          </div>

        </div>
      </div>

      {/* =====================================================
          TRUST BAR
      ===================================================== */}

      <div
        className="border-y px-6 py-4 sm:px-8 lg:px-10"
        style={{
          borderColor: `${NAVY}99`,
          backgroundColor: `${NAVY}20`,
        }}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[8px] uppercase tracking-[0.16em]">

            <span className="text-zinc-400">
              Machinery
            </span>

            <span style={{ color: ORANGE }}>
              •
            </span>

            <span className="text-zinc-400">
              Spare Parts
            </span>

            <span style={{ color: ORANGE }}>
              •
            </span>

            <span className="text-zinc-400">
              Airshafts
            </span>

            <span style={{ color: ORANGE }}>
              •
            </span>

            <span className="text-zinc-400">
              Engineering Support
            </span>

          </div>

          <span className="text-[8px] uppercase tracking-[0.16em] text-zinc-600">
            Maharashtra / India
          </span>

        </div>
      </div>

      {/* =====================================================
          COPYRIGHT
      ===================================================== */}

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-5 text-[8px] uppercase tracking-[0.14em] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">

        <span className="text-zinc-600">
          © {new Date().getFullYear()} Shree Graphics. All rights reserved.
        </span>

        <span className="text-zinc-700">
          Printing / Converting / Engineering
        </span>

      </div>

    </footer>
  );
}
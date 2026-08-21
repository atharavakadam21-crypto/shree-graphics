"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";

const NAVY = "#2E1A6B";
const ORANGE = "#F5820C";

const navigation = [
  {
    number: "01",
    label: "Machines",
    href: "/products",
  },
  {
    number: "02",
    label: "Spare Parts",
    href: "/spare-parts",
  },
  {
    number: "03",
    label: "Airshafts",
    href: "/airshafts",
  },
  {
    number: "04",
    label: "Services",
    href: "/services",
  },
  {
    number: "05",
    label: "Gallery",
    href: "/gallery",
  },
  {
    number: "06",
    label: "About",
    href: "/about",
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      /*
       * Keep the header visible near the top.
       */
      if (currentScrollY <= 24) {
        setHidden(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      /*
       * Never hide while mobile navigation is open.
       */
      if (mobileOpen) {
        setHidden(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      /*
       * Scroll down -> hide.
       * Scroll up -> reveal.
       */
      if (currentScrollY > lastScrollY.current + 4) {
        setHidden(true);
      } else if (currentScrollY < lastScrollY.current - 4) {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={[
        "fixed left-0 right-0 top-0 z-[70]",
        "border-b border-white/10",
        "bg-[#07080B]/95 backdrop-blur-xl",
        "transition-transform duration-200 ease-out",
        hidden
          ? "-translate-y-full"
          : "translate-y-0",
      ].join(" ")}
    >
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:min-h-[88px] lg:px-10">

        {/* =====================================================
            LOGO
        ===================================================== */}

       <Link
  href="/"
  onClick={() => setMobileOpen(false)}
  className="group flex min-h-11 items-center gap-3"
>
  <div
    className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border sm:h-12 sm:w-12"
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

  <div className="hidden sm:block">
    <div className="font-display text-lg font-black uppercase tracking-[0.08em] text-white">
      Shree Graphics
    </div>

    <div className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.2em] text-zinc-600">
      Printing & Converting Machinery
    </div>
  </div>
</Link>

        {/* =====================================================
            DESKTOP NAV
        ===================================================== */}

        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.number}
              href={item.href}
              className="group flex min-h-11 items-center gap-2 px-3 font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-zinc-500 transition-colors duration-200 hover:text-white lg:px-4"
            >
              <span
                className="text-[7px]"
                style={{
                  color: `${NAVY}CC`,
                }}
              >
                {item.number}
              </span>

              <span>{item.label}</span>

              <span
                className="h-px w-0 transition-all duration-200 group-hover:w-3"
                style={{
                  backgroundColor: ORANGE,
                }}
              />
            </Link>
          ))}
        </nav>

        {/* =====================================================
            PRIMARY CTA
        ===================================================== */}

        <Link
          href="/contact"
          className="sg-primary-cta group hidden min-h-12 items-center gap-4 border px-5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-white md:flex"
          style={{
            borderColor: `${ORANGE}99`,
          }}
        >
          <span>Enquire</span>

          <ArrowUpRight
            size={15}
            style={{
              color: ORANGE,
            }}
          />
        </Link>

        {/* =====================================================
            MOBILE MENU
        ===================================================== */}

        <button
          type="button"
          aria-label={
            mobileOpen
              ? "Close navigation"
              : "Open navigation"
          }
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
          className="flex min-h-11 min-w-11 items-center justify-center border border-white/10 text-zinc-300 transition-colors duration-200 hover:border-orange-500 hover:text-white md:hidden"
          style={{
            backgroundColor: mobileOpen
              ? `${NAVY}30`
              : "transparent",
          }}
        >
          {mobileOpen ? (
            <X size={21} />
          ) : (
            <Menu size={21} />
          )}
        </button>
      </div>

      {/* =======================================================
          MOBILE NAV
      ======================================================= */}

      <div
        className={`overflow-hidden border-t transition-all duration-200 md:hidden ${
          mobileOpen
            ? "max-h-[calc(100svh-76px)] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
        style={{
          borderColor: `${NAVY}80`,
          backgroundColor: "#08090D",
        }}
      >
        <div className="mx-auto max-w-7xl px-5 pb-6 pt-4 sm:px-8">

          <div className="mb-4 flex items-center justify-between">
            <span
              className="font-mono text-[8px] font-bold uppercase tracking-[0.22em]"
              style={{
                color: ORANGE,
              }}
            >
              Navigation
            </span>

            <span className="font-mono text-[8px] text-zinc-700">
              SG / MOBILE
            </span>
          </div>

          <nav className="border-t border-white/10">
            {navigation.map((item) => (
              <Link
                key={item.number}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="group flex min-h-14 items-center gap-4 border-b border-white/[0.07] transition-colors duration-200 hover:bg-white/[0.025]"
              >
                <span
                  className="w-6 font-mono text-[8px]"
                  style={{
                    color: ORANGE,
                  }}
                >
                  {item.number}
                </span>

                <span className="flex-1 font-display text-xl font-bold uppercase text-zinc-300 transition-colors duration-200 group-hover:text-white">
                  {item.label}
                </span>

                <ArrowUpRight
                  size={16}
                  className="text-zinc-600 transition-all duration-200 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            ))}
          </nav>

          {/* Mobile enquiry */}

          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="sg-primary-cta mt-4 flex min-h-12 items-center justify-between border px-4 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-white"
            style={{
              borderColor: `${ORANGE}99`,
              backgroundColor: `${ORANGE}08`,
            }}
          >
            <span>Start an Enquiry</span>

            <ArrowUpRight
              size={16}
              style={{
                color: ORANGE,
              }}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Cog,
  Mail,
  MessageSquare,
  Phone,
  Send,
  Wrench,
  Loader2,
} from "lucide-react";

import { api } from "@/lib/api";

const ORANGE = "#F5820C";
import ScrollReveal from "@/components/public/ScrollReveal";
const NAVY = "#2E1A6B";

type ActionId = "machines" | "parts" | "enquiry";

const actions = [
  {
    id: "machines" as const,
    number: "01",
    title: "Explore Machines",
    description:
      "Explore our printing, converting, cutting and slitting machinery.",
    icon: Cog,
  },
  {
    id: "parts" as const,
    number: "02",
    title: "Spare Parts",
    description:
      "Find components and replacement parts for your machinery.",
    icon: Wrench,
  },
  {
    id: "enquiry" as const,
    number: "03",
    title: "Send Enquiry",
    description:
      "Tell our team what you need and we'll get back to you.",
    icon: MessageSquare,
  },
];

export default function HomeCTA() {
  const [activeAction, setActiveAction] =
    useState<ActionId>("enquiry");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  function updateField(
    field: keyof typeof form,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSubmitted(false);

    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!form.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!form.phone.trim()) {
      setError("Please enter your mobile number.");
      return;
    }

    if (!form.message.trim()) {
      setError("Please tell us about your requirement.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post("/api/inquiries", {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: form.company.trim() || null,
        message: form.message.trim(),
        machine_id: null,
      });

      if (!response.success) {
        throw new Error(
          response.message ?? "Failed to submit enquiry"
        );
      }

      setSubmitted(true);

      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      console.error("Inquiry submission failed:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit your enquiry. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-b border-white/10 bg-[#07080C] py-20 sm:py-24 lg:py-28"
    >
      {/* Technical grid */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(255,255,255,0.18) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255,255,255,0.18) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Navy atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-120px] top-[20%] h-[420px] w-[420px] rounded-full opacity-[0.08] blur-[120px]"
        style={{
          backgroundColor: NAVY,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <ScrollReveal delay={0}>
        <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-end">

          <div>

            <div className="mb-6 flex items-center gap-3">

              <span
                className="h-[2px] w-10"
                style={{
                  backgroundColor: ORANGE,
                }}
              />

              <span
                className="font-mono text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{
                  color: ORANGE,
                }}
              >
                06 / Start a Conversation
              </span>

            </div>

            <h2 className="max-w-5xl font-display text-5xl font-black uppercase leading-[0.9] tracking-[-0.035em] text-white sm:text-6xl md:text-7xl lg:text-[78px]">

              HAVE A
              <br />

              <span className="text-zinc-500">
                MACHINE
              </span>

              <br />

              REQUIREMENT?

            </h2>

          </div>

          <div
            className="border-l-2 pl-5 sm:pl-7"
            style={{
              borderColor: NAVY,
            }}
          >
            <p className="text-base leading-7 text-zinc-400 sm:text-lg">
              Looking for a machine, spare part or technical
              assistance? Tell us what you need and our team
              will help you find the right solution.
            </p>
          </div>

        </div>
        </ScrollReveal>

        {/* =====================================================
            MAIN AREA
        ===================================================== */}

        <ScrollReveal delay={120}>
        <div className="mt-14 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">

          {/* ===================================================
              REQUIREMENT SELECTOR
          =================================================== */}

          <div className="border border-white/10 bg-[#090A0F]">

            <div className="flex min-h-[64px] items-center justify-between border-b border-white/10 px-5 sm:px-7">

              <div className="flex items-center gap-3">

                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: ORANGE,
                  }}
                />

                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-300">
                  Select Your Requirement
                </span>

              </div>

              <span className="font-mono text-[10px] text-zinc-600">
                SG / 06
              </span>

            </div>

            {actions.map((action) => {
              const Icon = action.icon;
              const selected =
                activeAction === action.id;

              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => {
                    setActiveAction(action.id);
                    setSubmitted(false);
                    setError("");
                  }}
                  className={`group relative flex min-h-[128px] w-full items-center gap-4 border-b border-white/[0.08] px-5 text-left transition-all duration-300 sm:min-h-[145px] sm:px-7 ${
                    selected
                      ? "bg-white/[0.035]"
                      : "hover:bg-white/[0.018]"
                  }`}
                >

                  <span
                    className={`absolute bottom-0 left-0 top-0 w-[3px] origin-center transition-transform duration-300 ${
                      selected
                        ? "scale-y-100"
                        : "scale-y-0 group-hover:scale-y-50"
                    }`}
                    style={{
                      backgroundColor: ORANGE,
                    }}
                  />

                  <span
                    className="w-7 shrink-0 font-mono text-[11px] font-bold"
                    style={{
                      color: selected
                        ? ORANGE
                        : "#52525B",
                    }}
                  >
                    {action.number}
                  </span>

                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center border transition-all duration-300 sm:h-14 sm:w-14"
                    style={{
                      borderColor: selected
                        ? ORANGE
                        : `${NAVY}99`,
                    }}
                  >
                    <Icon
                      size={21}
                      style={{
                        color: selected
                          ? ORANGE
                          : "#71717A",
                      }}
                    />
                  </div>

                  <div className="min-w-0">

                    <div
                      className={`font-display text-2xl font-bold uppercase leading-none transition-colors sm:text-[28px] ${
                        selected
                          ? "text-white"
                          : "text-zinc-500 group-hover:text-zinc-300"
                      }`}
                    >
                      {action.title}
                    </div>

                    <div className="mt-2 max-w-[320px] text-sm leading-5 text-zinc-600 sm:text-[15px]">
                      {action.description}
                    </div>

                  </div>

                  <ArrowRight
                    size={19}
                    className={`ml-auto shrink-0 transition-all duration-300 ${
                      selected
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    }`}
                    style={{
                      color: ORANGE,
                    }}
                  />

                </button>
              );
            })}

          </div>

          {/* ===================================================
              RIGHT PANEL
          =================================================== */}

          <div
            className="relative overflow-hidden border bg-[#090A0F] p-6 sm:p-8 lg:p-10"
            style={{
              borderColor: `${NAVY}99`,
            }}
          >

            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-[-20px] top-[-35px] font-display text-[150px] font-black leading-none opacity-[0.055] sm:text-[190px]"
              style={{
                color: NAVY,
              }}
            >
              06
            </div>

            <div className="relative z-10">

              {/* =================================================
                  ENQUIRY
              ================================================= */}

              {activeAction === "enquiry" && (
                <>
                  <div className="flex items-start gap-4">

                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center border"
                      style={{
                        borderColor: ORANGE,
                      }}
                    >
                      <MessageSquare
                        size={23}
                        style={{
                          color: ORANGE,
                        }}
                      />
                    </div>

                    <div>

                      <div
                        className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
                        style={{
                          color: ORANGE,
                        }}
                      >
                        Selected / Enquiry
                      </div>

                      <h3 className="mt-2 font-display text-4xl font-black uppercase leading-none text-white sm:text-5xl">
                        SEND ENQUIRY
                      </h3>

                    </div>

                  </div>

                  <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
                    Share your requirement with us. Give us
                    your contact details and our team will get
                    back to you.
                  </p>

                  {submitted ? (
                    <div className="mt-8 border border-emerald-500/30 bg-emerald-500/[0.04] p-6 sm:p-8">

                      <CheckCircle2
                        size={32}
                        className="text-emerald-400"
                      />

                      <h4 className="mt-5 font-display text-3xl font-bold uppercase text-white">
                        ENQUIRY RECEIVED
                      </h4>

                      <p className="mt-3 text-base leading-7 text-zinc-400">
                        Thank you. Your enquiry has been
                        submitted successfully. Our team will
                        contact you using the details provided.
                      </p>

                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="mt-6 min-h-11 border border-white/10 px-5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 transition-colors hover:border-white/30 hover:text-white"
                      >
                        Send Another Enquiry
                      </button>

                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="mt-8"
                    >

                      {/* NAME / COMPANY */}

                      <div className="grid gap-5 sm:grid-cols-2">

                        <FormField
                          label="Full Name"
                          required
                        >
                          <input
                            required
                            value={form.name}
                            onChange={(event) =>
                              updateField(
                                "name",
                                event.target.value
                              )
                            }
                            placeholder="Your full name"
                            className="contact-input"
                          />
                        </FormField>

                        <FormField label="Company Name">
                          <input
                            value={form.company}
                            onChange={(event) =>
                              updateField(
                                "company",
                                event.target.value
                              )
                            }
                            placeholder="Your company"
                            className="contact-input"
                          />
                        </FormField>

                      </div>

                      {/* EMAIL / PHONE */}

                      <div className="mt-5 grid gap-5 sm:grid-cols-2">

                        <FormField
                          label="Email Address"
                          required
                        >
                          <input
                            required
                            type="email"
                            value={form.email}
                            onChange={(event) =>
                              updateField(
                                "email",
                                event.target.value
                              )
                            }
                            placeholder="you@company.com"
                            className="contact-input"
                          />
                        </FormField>

                        <FormField
                          label="Mobile Number"
                          required
                        >
                          <input
                            required
                            type="tel"
                            value={form.phone}
                            onChange={(event) =>
                              updateField(
                                "phone",
                                event.target.value
                              )
                            }
                            placeholder="+91 XXXXX XXXXX"
                            className="contact-input"
                          />
                        </FormField>

                      </div>

                      {/* MESSAGE */}

                      <div className="mt-5">

                        <FormField
                          label="Your Requirement"
                          required
                        >
                          <textarea
                            required
                            rows={5}
                            value={form.message}
                            onChange={(event) =>
                              updateField(
                                "message",
                                event.target.value
                              )
                            }
                            placeholder="Tell us about the machine, material, application or technical requirement..."
                            className="contact-input min-h-[140px] resize-none py-4"
                          />
                        </FormField>

                      </div>

                      {/* ERROR */}

                      {error && (
                        <div className="mt-4 border border-red-500/30 bg-red-500/[0.04] px-4 py-3 text-sm leading-6 text-red-400">
                          {error}
                        </div>
                      )}

                      {/* SUBMIT */}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group mt-5 flex min-h-14 w-full items-center justify-center gap-3 px-6 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                        style={{
                          backgroundColor: ORANGE,
                        }}
                      >

                        {isSubmitting ? (
                          <>
                            <Loader2
                              size={18}
                              className="animate-spin"
                            />

                            Sending Enquiry...
                          </>
                        ) : (
                          <>
                            <Send size={18} />

                            Submit Enquiry

                            <ArrowRight
                              size={18}
                              className="transition-transform duration-300 group-hover:translate-x-2"
                            />
                          </>
                        )}

                      </button>

                      <p className="mt-4 text-xs leading-5 text-zinc-600">
                        Your enquiry will be sent directly to
                        the Shree Graphics enquiry system.
                      </p>

                    </form>
                  )}
                </>
              )}

              {/* =================================================
                  MACHINES
              ================================================= */}

              {activeAction === "machines" && (
                <ChoicePanel
                  icon={Cog}
                  label="Selected / Machinery"
                  title="OUR MACHINES"
                  description="Explore Shree Graphics machinery for printing, slitting, die cutting, paper core cutting and converting applications."
                  href="/products"
                  color={NAVY}
                />
              )}

              {/* =================================================
                  SPARE PARTS
              ================================================= */}

              {activeAction === "parts" && (
                <ChoicePanel
                  icon={Wrench}
                  label="Selected / Spare Parts"
                  title="SPARE PARTS"
                  description="Looking for a replacement component, spare part or machine support? Explore our spare-parts section or contact our team."
                  href="/spare-parts"
                  color={ORANGE}
                />
              )}

            </div>
          </div>
        </div>
        </ScrollReveal>

        {/* =====================================================
            DIRECT CONTACT BAR
        ===================================================== */}

        <ScrollReveal delay={240}>
        <div className="mt-6 grid border border-white/10 bg-[#090A0F] sm:grid-cols-2 lg:grid-cols-3">

          {/* PHONE */}

          <a
            href="tel:+919820698449"
            className="group flex min-h-[105px] items-center gap-4 border-b border-white/10 px-5 transition-colors hover:bg-white/[0.025] sm:px-7 lg:border-b-0 lg:border-r"
          >

            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center border"
              style={{
                borderColor: `${NAVY}CC`,
              }}
            >
              <Phone
                size={18}
                style={{
                  color: "#5B4EDB",
                }}
              />
            </div>

            <div>

              <div className="font-mono text-[9px] font-bold uppercase tracking-[0.17em] text-zinc-600">
                Direct Contact
              </div>

              <div className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
                +91 98206 98449
              </div>

            </div>

            <ArrowRight
              size={17}
              className="ml-auto transition-transform duration-300 group-hover:translate-x-2"
              style={{
                color: ORANGE,
              }}
            />

          </a>

          {/* EMAIL */}

          <a
            href="mailto:info@shreegraphicsltd.com"
            className="group flex min-h-[105px] items-center gap-4 border-b border-white/10 px-5 transition-colors hover:bg-white/[0.025] sm:px-7 lg:border-b-0 lg:border-r"
          >

            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center border"
              style={{
                borderColor: `${ORANGE}99`,
              }}
            >
              <Mail
                size={18}
                style={{
                  color: ORANGE,
                }}
              />
            </div>

            <div className="min-w-0">

              <div className="font-mono text-[9px] font-bold uppercase tracking-[0.17em] text-zinc-600">
                Email Us
              </div>

              <div className="mt-1 truncate font-display text-lg font-bold text-white sm:text-xl">
                info@shreegraphicsltd.com
              </div>

            </div>

            <ArrowRight
              size={17}
              className="ml-auto shrink-0 transition-transform duration-300 group-hover:translate-x-2"
              style={{
                color: ORANGE,
              }}
            />

          </a>

          {/* AI */}

          <Link
            href="#"
            className="group flex min-h-[105px] items-center gap-4 px-5 transition-colors hover:bg-white/[0.025] sm:px-7"
          >

            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center border"
              style={{
                borderColor: `${ORANGE}99`,
              }}
            >
              <Bot
                size={18}
                style={{
                  color: ORANGE,
                }}
              />
            </div>

            <div>

              <div className="font-mono text-[9px] font-bold uppercase tracking-[0.17em] text-zinc-600">
                Need Help Choosing?
              </div>

              <div className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
                Talk to Shree AI
              </div>

            </div>

            <ArrowRight
              size={17}
              className="ml-auto transition-transform duration-300 group-hover:translate-x-2"
              style={{
                color: ORANGE,
              }}
            />

          </Link>

        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ===========================================================
   FORM FIELD
=========================================================== */

function FormField({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">

      <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">
        {label}

        {required && (
          <span className="ml-1 text-orange-500">
            *
          </span>
        )}
      </span>

      {children}

    </label>
  );
}

/* ===========================================================
   CHOICE PANEL
=========================================================== */

function ChoicePanel({
  icon: Icon,
  label,
  title,
  description,
  href,
  color,
}: {
  icon: typeof Cog;
  label: string;
  title: string;
  description: string;
  href: string;
  color: string;
}) {
  return (
    <div>

      <div
        className="flex h-14 w-14 items-center justify-center border"
        style={{
          borderColor: color,
        }}
      >
        <Icon
          size={24}
          style={{
            color,
          }}
        />
      </div>

      <div
        className="mt-7 font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
        style={{
          color,
        }}
      >
        {label}
      </div>

      <h3 className="mt-3 font-display text-5xl font-black uppercase leading-none text-white sm:text-6xl">
        {title}
      </h3>

      <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
        {description}
      </p>

      <Link
        href={href}
        className="group mt-9 flex min-h-14 w-full items-center justify-between border px-5 transition-all duration-300 hover:bg-white/[0.025] sm:px-6"
        style={{
          borderColor: `${color}88`,
        }}
      >

        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-300">
          Continue to {title}
        </span>

        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-2"
          style={{
            color,
          }}
        />

      </Link>

    </div>
  );
}
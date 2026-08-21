"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Phone,
  Send,
} from "lucide-react";

import { api } from "@/lib/api";
import ScrollReveal from "@/components/public/ScrollReveal";

export default function SparePartsCTA() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    machine: "",
    part: "",
    message: "",
  });

  const updateField = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setIsSubmitting(true);
    setError("");

    try {
      const response = await api.post("/api/inquiries", {
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        company: form.company || null,
        message: [
          "SPARE PART REQUEST",
          "",
          `Machine / Model: ${form.machine || "Not specified"}`,
          `Part / Component: ${form.part || "Not specified"}`,
          "",
          form.message,
        ].join("\n"),
      });

      if (!response.success) {
        throw new Error(
          response.message ?? "Unable to submit your request."
        );
      }

      setSubmitted(true);

      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        machine: "",
        part: "",
        message: "",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="parts-request"
      className="relative overflow-hidden border-b border-zinc-800/80 py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_70%_30%,rgba(46,26,107,0.16),transparent_55%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <ScrollReveal>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#F5820C]">
              <span className="h-px w-10 bg-[#F5820C]" />
              03 / Parts Request
            </div>

            <h2 className="max-w-4xl font-display text-4xl font-black uppercase leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl">
              DON'T KNOW THE
              <br />
              <span className="text-zinc-600">PART NUMBER?</span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400">
              No problem. Send us the machine details and describe the part
              you need. Our team can review your requirement and contact you.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Contact information */}
          <div className="lg:col-span-4">
            <div className="border border-[#2E1A6B]/70 bg-[#08080d]">
              <div className="border-b border-zinc-800 p-6">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5820C]">
                  Direct Support
                </p>

                <h3 className="mt-3 font-display text-3xl font-bold uppercase text-white">
                  Talk to the Parts Desk.
                </h3>
              </div>

              <div className="divide-y divide-zinc-800">
                <a
                  href="tel:+919820698449"
                  className="group flex min-h-20 items-center gap-4 px-6 transition-colors hover:bg-[#2E1A6B]/10"
                >
                  <div className="flex h-11 w-11 items-center justify-center border border-[#2E1A6B]">
                    <Phone
                      size={17}
                      className="text-[#2E1A6B]"
                    />
                  </div>

                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600">
                      Call
                    </span>

                    <span className="mt-1 block text-sm font-semibold text-zinc-200">
                      +91 98206 98449
                    </span>
                  </div>

                  <ArrowRight
                    size={15}
                    className="ml-auto text-zinc-700 transition-transform group-hover:translate-x-1 group-hover:text-[#F5820C]"
                  />
                </a>

                <a
                  href="mailto:info@shreegraphicsltd.com"
                  className="group flex min-h-20 items-center gap-4 px-6 transition-colors hover:bg-[#2E1A6B]/10"
                >
                  <div className="flex h-11 w-11 items-center justify-center border border-[#F5820C]">
                    <Mail
                      size={17}
                      className="text-[#F5820C]"
                    />
                  </div>

                  <div className="min-w-0">
                    <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600">
                      Email
                    </span>

                    <span className="mt-1 block truncate text-sm font-semibold text-zinc-200">
                      info@shreegraphicsltd.com
                    </span>
                  </div>

                  <ArrowRight
                    size={15}
                    className="ml-auto shrink-0 text-zinc-700 transition-transform group-hover:translate-x-1 group-hover:text-[#F5820C]"
                  />
                </a>
              </div>

              <div className="border-t border-zinc-800 p-6">
                <p className="font-mono text-[9px] uppercase leading-5 tracking-[0.16em] text-zinc-600">
                  For faster identification,
                  <br />
                  include machine model,
                  <br />
                  photos or old part details.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            {submitted ? (
              <div className="flex min-h-[500px] flex-col items-center justify-center border border-[#2E1A6B] bg-[#08080d] px-6 text-center sm:px-10">
                <div className="flex h-16 w-16 items-center justify-center border border-[#F5820C] bg-[#F5820C]/5">
                  <CheckCircle2
                    size={28}
                    className="text-[#F5820C]"
                  />
                </div>

                <p className="mt-7 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#F5820C]">
                  Request Received
                </p>

                <h3 className="mt-3 font-display text-4xl font-black uppercase text-white sm:text-5xl">
                  WE'LL CHECK IT.
                </h3>

                <p className="mt-5 max-w-lg text-sm leading-7 text-zinc-400">
                  Your spare-parts requirement has been sent to the Shree
                  Graphics team. We will review the details and contact you.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 min-h-11 border border-zinc-700 px-6 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-300 transition-colors hover:border-[#F5820C] hover:text-white"
                >
                  Send Another Request
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="border border-zinc-800 bg-[#08080d] p-6 sm:p-8 lg:p-10"
              >
                <div className="mb-8 flex items-center justify-between border-b border-zinc-800 pb-5">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                      Request Form
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-white">
                      Tell us what you need.
                    </h3>
                  </div>

                  <Send
                    size={18}
                    className="text-[#F5820C]"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Your Name"
                    required
                    value={form.name}
                    onChange={(value) =>
                      updateField("name", value)
                    }
                    placeholder="Enter your name"
                  />

                  <Field
                    label="Company"
                    value={form.company}
                    onChange={(value) =>
                      updateField("company", value)
                    }
                    placeholder="Company name"
                  />

                  <Field
                    label="Email"
                    required
                    type="email"
                    value={form.email}
                    onChange={(value) =>
                      updateField("email", value)
                    }
                    placeholder="you@company.com"
                  />

                  <Field
                    label="Phone"
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(value) =>
                      updateField("phone", value)
                    }
                    placeholder="+91"
                  />

                  <Field
                    label="Machine / Model"
                    value={form.machine}
                    onChange={(value) =>
                      updateField("machine", value)
                    }
                    placeholder="e.g. Micro Slitting Machine"
                  />

                  <Field
                    label="Part / Component"
                    value={form.part}
                    onChange={(value) =>
                      updateField("part", value)
                    }
                    placeholder="e.g. knife holder"
                  />
                </div>

                <div className="mt-5">
                  <label className="mb-2 block font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                    Requirement / Description *
                  </label>

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
                    placeholder="Describe the part you need, quantity, machine details, or anything visible on the old component..."
                    className="w-full resize-none border border-zinc-800 bg-[#050507] px-4 py-4 text-sm text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-[#F5820C]"
                  />
                </div>

                {error && (
                  <div
                    role="alert"
                    className="mt-5 border border-red-900/60 bg-red-950/20 px-4 py-3 text-sm text-red-300"
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group mt-6 flex min-h-12 w-full items-center justify-center gap-4 bg-[#F5820C] px-6 font-mono text-xs font-bold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting
                    ? "TRANSMITTING REQUEST..."
                    : "SEND PART REQUEST"}

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-700">
                  Your requirement will be sent securely to our inquiry system.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: FieldProps) {
  return (
    <div>
      <label className="mb-2 block font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-500">
        {label}
        {required && <span className="ml-1 text-[#F5820C]">*</span>}
      </label>

      <input
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-h-12 w-full border border-zinc-800 bg-[#050507] px-4 text-sm text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-[#F5820C]"
      />
    </div>
  );
}
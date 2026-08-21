"use client";

import { FormEvent, useState } from "react";

import { api } from "@/lib/api";

import MachineSelector from "./MachineSelector";

interface MachineOption {
  id: string;
  name: string;
}

interface InquiryFormProps {
  machines: MachineOption[];
}

export default function InquiryForm({
  machines,
}: InquiryFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    machine_id: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const [error, setError] = useState("");

  function updateField(
    field: keyof typeof form,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("sending");
    setError("");

    try {
      await api.post("/api/inquiries", {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        company: form.company.trim() || null,
        message: form.message.trim(),
        machine_id: form.machine_id || null,
      });

      setStatus("success");

      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        machine_id: "",
        message: "",
      });
    } catch (err) {
      console.error("Inquiry submission error:", err);

      setStatus("error");

      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit your enquiry. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="border border-zinc-800 bg-[#090909] p-8 sm:p-12 lg:p-16">
        <div className="flex min-h-[480px] flex-col justify-between">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-500">
              Enquiry received
            </span>

            <h2 className="mt-8 max-w-3xl text-5xl font-semibold uppercase leading-[0.82] tracking-[-0.06em] text-white sm:text-6xl">
              Thank
              <br />
              you.
            </h2>

            <p className="mt-8 max-w-xl border-l-2 border-cyan-500 pl-4 text-sm leading-7 text-zinc-500">
              Your enquiry has been submitted successfully. Our
              team can review your requirement and continue the
              conversation directly.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-12 flex min-h-12 w-fit items-center border border-zinc-700 px-6 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:border-cyan-500"
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="border border-zinc-800 bg-[#090909] p-6 sm:p-9 lg:p-12"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-3 block font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600"
          >
            Name *
          </label>

          <input
            id="name"
            name="name"
            required
            value={form.name}
            onChange={(event) =>
              updateField("name", event.target.value)
            }
            placeholder="Your name"
            className="min-h-12 w-full border border-zinc-800 bg-[#080808] px-4 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-cyan-500"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-3 block font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600"
          >
            Email *
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={(event) =>
              updateField("email", event.target.value)
            }
            placeholder="you@company.com"
            className="min-h-12 w-full border border-zinc-800 bg-[#080808] px-4 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-cyan-500"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-3 block font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600"
          >
            Phone
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={(event) =>
              updateField("phone", event.target.value)
            }
            placeholder="+91"
            className="min-h-12 w-full border border-zinc-800 bg-[#080808] px-4 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-cyan-500"
          />
        </div>

        <div>
          <label
            htmlFor="company"
            className="mb-3 block font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600"
          >
            Company
          </label>

          <input
            id="company"
            name="company"
            value={form.company}
            onChange={(event) =>
              updateField("company", event.target.value)
            }
            placeholder="Company name"
            className="min-h-12 w-full border border-zinc-800 bg-[#080808] px-4 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-cyan-500"
          />
        </div>

        <div className="lg:col-span-2">
          <MachineSelector
            machines={machines}
            value={form.machine_id}
            onChange={(value) =>
              updateField("machine_id", value)
            }
          />
        </div>

        <div className="lg:col-span-2">
          <label
            htmlFor="message"
            className="mb-3 block font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600"
          >
            Requirement *
          </label>

          <textarea
            id="message"
            name="message"
            required
            value={form.message}
            onChange={(event) =>
              updateField("message", event.target.value)
            }
            placeholder="Tell us about your application, material, machine requirement or production process."
            className="min-h-44 w-full resize-y border border-zinc-800 bg-[#080808] p-4 text-sm leading-7 text-white outline-none placeholder:text-zinc-700 focus:border-cyan-500"
          />
        </div>
      </div>

      {status === "error" && (
        <div className="mt-6 border-l-2 border-red-500 pl-4 font-mono text-[10px] uppercase tracking-[0.12em] text-red-400">
          {error}
        </div>
      )}

      <div className="mt-8 flex flex-col justify-between gap-5 border-t border-zinc-800 pt-7 sm:flex-row sm:items-center">
        <p className="max-w-md font-mono text-[9px] uppercase leading-5 tracking-[0.12em] text-zinc-700">
          Required fields are marked with *. Your requirement
          helps us understand the appropriate machine system.
        </p>

        <button
          type="submit"
          disabled={status === "sending"}
          className="flex min-h-14 items-center justify-between border border-cyan-500 px-6 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-cyan-500/5 disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-56"
        >
          {status === "sending"
            ? "Submitting..."
            : "Submit enquiry"}

          <span className="ml-8 text-cyan-500">
            →
          </span>
        </button>
      </div>
    </form>
  );
}
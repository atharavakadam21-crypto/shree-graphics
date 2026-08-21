"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  RefreshCw,
  MessageSquare,
  Building2,
  User,
  Clock3,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { api } from "@/lib/api";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  machine_id: string | null;
  status: "new" | "contacted" | "closed";
  created_at: string;
  updated_at: string;
}

const statusStyles = {
  new: {
    label: "New",
    className:
      "border-orange-500/30 bg-orange-500/10 text-orange-400",
  },
  contacted: {
    label: "Contacted",
    className:
      "border-indigo-400/30 bg-indigo-400/10 text-indigo-300",
  },
  closed: {
    label: "Closed",
    className:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  },
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(date: string) {
  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function InquiryTable() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const loadInquiries = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await api.get<Inquiry[]>(
        "/api/inquiries"
      );

      if (!response.data) {
        throw new Error(
          "Inquiries were not returned by the server."
        );
      }

      setInquiries(response.data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to load inquiries."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadInquiries();
  }, []);

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
    return (
      <div className="border border-zinc-200 bg-white shadow-sm">
        <div className="border-b border-zinc-200 px-6 py-5">
          <div className="h-5 w-40 animate-pulse bg-zinc-100" />
          <div className="mt-2 h-4 w-64 animate-pulse bg-zinc-100" />
        </div>

        <div className="space-y-3 p-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse bg-zinc-100"
            />
          ))}
        </div>
      </div>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {
    return (
      <div
        role="alert"
        className="border border-red-200 bg-red-50 p-6"
      >
        <div className="text-sm font-semibold text-red-700">
          Unable to load inquiries
        </div>

        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>

        <button
          type="button"
          onClick={() => void loadInquiries()}
          className="mt-4 inline-flex min-h-11 items-center gap-2 border border-red-300 bg-white px-4 text-sm font-semibold text-red-700 transition hover:bg-red-100"
        >
          <RefreshCw size={16} />
          Retry
        </button>
      </div>
    );
  }

  /* =========================================================
     EMPTY
  ========================================================= */

  if (inquiries.length === 0) {
    return (
      <div className="border border-zinc-200 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center border border-zinc-200 bg-zinc-50">
          <MessageSquare
            size={24}
            className="text-zinc-400"
          />
        </div>

        <h2 className="mt-5 text-xl font-bold text-zinc-900">
          No inquiries yet
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
          Website enquiries will appear here when customers
          submit the enquiry form.
        </p>

        <button
          type="button"
          onClick={() => void loadInquiries()}
          className="mt-6 inline-flex min-h-11 items-center gap-2 border border-zinc-300 px-5 text-sm font-semibold text-zinc-700 transition hover:border-[#2E1A6B] hover:text-[#2E1A6B]"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>
    );
  }

  /* =========================================================
     TABLE
  ========================================================= */

  return (
    <div className="overflow-hidden border border-zinc-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex flex-col gap-4 border-b border-zinc-200 px-5 py-5 sm:px-6 md:flex-row md:items-center md:justify-between">

        <div>
          <div className="flex items-center gap-3">

            <span className="h-2 w-2 rounded-full bg-[#F5820C]" />

            <h2 className="text-xl font-bold tracking-tight text-zinc-900">
              Customer Inquiries
            </h2>

          </div>

          <p className="mt-1 text-sm text-zinc-500">
            Website enquiries and customer contact requests
          </p>
        </div>

        <button
          type="button"
          onClick={() => void loadInquiries()}
          className="inline-flex min-h-11 items-center justify-center gap-2 border border-zinc-300 px-4 text-sm font-semibold text-zinc-700 transition hover:border-[#2E1A6B] hover:text-[#2E1A6B]"
        >
          <RefreshCw size={16} />
          Refresh
        </button>

      </div>

      {/* Desktop table */}

      <div className="hidden overflow-x-auto lg:block">

        <table className="min-w-full">

          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50">

              <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-500">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-500">
                Contact
              </th>

              <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-500">
                Requirement
              </th>

              <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-500">
                Status
              </th>

              <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-500">
                Received
              </th>

              <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-500">
                Actions
              </th>

            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-100">

            {inquiries.map((inquiry) => {

              const status =
                statusStyles[inquiry.status];

              return (
                <tr
                  key={inquiry.id}
                  className="group transition-colors hover:bg-[#2E1A6B]/[0.025]"
                >

                  {/* Customer */}

                  <td className="min-w-[210px] px-6 py-5">

                    <div className="flex items-start gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#2E1A6B]/20 bg-[#2E1A6B]/5">
                        <User
                          size={17}
                          className="text-[#2E1A6B]"
                        />
                      </div>

                      <div className="min-w-0">

                        <p className="text-base font-bold text-zinc-900">
                          {inquiry.name}
                        </p>

                        {inquiry.company && (
                          <div className="mt-1 flex items-center gap-1.5 text-sm text-zinc-500">
                            <Building2 size={13} />
                            <span className="truncate">
                              {inquiry.company}
                            </span>
                          </div>
                        )}

                      </div>

                    </div>

                  </td>

                  {/* Contact */}

                  <td className="min-w-[230px] px-6 py-5">

                    <a
                      href={`mailto:${inquiry.email}`}
                      className="block text-sm font-semibold text-zinc-700 transition hover:text-[#2E1A6B]"
                    >
                      {inquiry.email}
                    </a>

                    {inquiry.phone && (
                      <a
                        href={`tel:${inquiry.phone}`}
                        className="mt-2 flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-[#F5820C]"
                      >
                        <Phone size={14} />
                        {inquiry.phone}
                      </a>
                    )}

                  </td>

                  {/* Requirement */}

                  <td className="max-w-[360px] px-6 py-5">

                    <p
                      className={`text-sm leading-6 text-zinc-600 ${
                        expandedId === inquiry.id
                          ? ""
                          : "line-clamp-2"
                      }`}
                    >
                      {inquiry.message}
                    </p>

                    {inquiry.message.length > 100 && (
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedId(
                            expandedId === inquiry.id
                              ? null
                              : inquiry.id
                          )
                        }
                        className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#2E1A6B] hover:text-[#F5820C]"
                      >
                        {expandedId === inquiry.id ? (
                          <>
                            Less
                            <ChevronUp size={13} />
                          </>
                        ) : (
                          <>
                            Read more
                            <ChevronDown size={13} />
                          </>
                        )}
                      </button>
                    )}

                  </td>

                  {/* Status */}

                  <td className="whitespace-nowrap px-6 py-5">

                    <span
                      className={`inline-flex items-center gap-2 border px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${status.className}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {status.label}
                    </span>

                  </td>

                  {/* Date */}

                  <td className="whitespace-nowrap px-6 py-5">

                    <div className="flex items-center gap-2 text-sm font-medium text-zinc-600">
                      <Clock3
                        size={14}
                        className="text-zinc-400"
                      />
                      {formatDate(inquiry.created_at)}
                    </div>

                    <div className="mt-1 pl-5 text-xs text-zinc-400">
                      {formatTime(inquiry.created_at)}
                    </div>

                  </td>

                  {/* Actions */}

                  <td className="whitespace-nowrap px-6 py-5 text-right">

                    <div className="flex justify-end gap-2">

                      {inquiry.phone && (
                        <a
                          href={`tel:${inquiry.phone}`}
                          title="Call customer"
                          className="inline-flex h-10 w-10 items-center justify-center border border-zinc-200 text-zinc-500 transition hover:border-[#F5820C] hover:bg-[#F5820C]/5 hover:text-[#F5820C]"
                        >
                          <Phone size={16} />
                        </a>
                      )}

                      <a
                        href={`mailto:${inquiry.email}`}
                        title="Email customer"
                        className="inline-flex h-10 w-10 items-center justify-center border border-zinc-200 text-zinc-500 transition hover:border-[#2E1A6B] hover:bg-[#2E1A6B]/5 hover:text-[#2E1A6B]"
                      >
                        <Mail size={16} />
                      </a>

                    </div>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

      {/* =====================================================
          MOBILE CARDS
      ===================================================== */}

      <div className="divide-y divide-zinc-200 lg:hidden">

        {inquiries.map((inquiry) => {

          const status =
            statusStyles[inquiry.status];

          const expanded =
            expandedId === inquiry.id;

          return (
            <article
              key={inquiry.id}
              className="p-5 transition-colors hover:bg-zinc-50 sm:p-6"
            >

              {/* Customer */}

              <div className="flex items-start gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#2E1A6B]/20 bg-[#2E1A6B]/5">
                  <User
                    size={18}
                    className="text-[#2E1A6B]"
                  />
                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex flex-wrap items-center gap-3">

                    <h3 className="text-lg font-bold text-zinc-900">
                      {inquiry.name}
                    </h3>

                    <span
                      className={`inline-flex items-center gap-1.5 border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${status.className}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {status.label}
                    </span>

                  </div>

                  {inquiry.company && (
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-zinc-500">
                      <Building2 size={13} />
                      {inquiry.company}
                    </div>
                  )}

                </div>

              </div>

              {/* Contact */}

              <div className="mt-5 grid gap-2">

                <a
                  href={`mailto:${inquiry.email}`}
                  className="flex min-h-11 items-center gap-3 border border-zinc-200 px-3 text-sm font-medium text-zinc-700 hover:border-[#2E1A6B] hover:text-[#2E1A6B]"
                >
                  <Mail size={16} />
                  <span className="truncate">
                    {inquiry.email}
                  </span>
                </a>

                {inquiry.phone && (
                  <a
                    href={`tel:${inquiry.phone}`}
                    className="flex min-h-11 items-center gap-3 border border-zinc-200 px-3 text-sm font-medium text-zinc-700 hover:border-[#F5820C] hover:text-[#F5820C]"
                  >
                    <Phone size={16} />
                    {inquiry.phone}
                  </a>
                )}

              </div>

              {/* Message */}

              <div className="mt-5 border-l-2 border-[#2E1A6B]/30 bg-zinc-50 p-4">

                <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">
                  <MessageSquare size={13} />
                  Requirement
                </div>

                <p
                  className={`text-sm leading-6 text-zinc-600 ${
                    expanded ? "" : "line-clamp-3"
                  }`}
                >
                  {inquiry.message}
                </p>

                {inquiry.message.length > 150 && (
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedId(
                        expanded ? null : inquiry.id
                      )
                    }
                    className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#2E1A6B]"
                  >
                    {expanded
                      ? "Show less"
                      : "Read full enquiry"}

                    {expanded ? (
                      <ChevronUp size={13} />
                    ) : (
                      <ChevronDown size={13} />
                    )}
                  </button>
                )}

              </div>

              {/* Footer */}

              <div className="mt-5 flex flex-col gap-4 border-t border-zinc-200 pt-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <Clock3 size={14} />
                  {formatDate(inquiry.created_at)}
                  <span className="text-zinc-300">
                    •
                  </span>
                  {formatTime(inquiry.created_at)}
                </div>

                <div className="flex gap-2">

                  {inquiry.phone && (
                    <a
                      href={`tel:${inquiry.phone}`}
                      className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 border border-[#F5820C]/40 px-4 text-xs font-bold uppercase tracking-wide text-[#F5820C] transition hover:bg-[#F5820C]/5 sm:flex-none"
                    >
                      <Phone size={15} />
                      Call
                    </a>
                  )}

                  <a
                    href={`mailto:${inquiry.email}`}
                    className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 border border-[#2E1A6B]/40 px-4 text-xs font-bold uppercase tracking-wide text-[#2E1A6B] transition hover:bg-[#2E1A6B]/5 sm:flex-none"
                  >
                    <Mail size={15} />
                    Email
                  </a>

                </div>

              </div>

            </article>
          );
        })}

      </div>

      {/* Footer */}

      <div className="border-t border-zinc-200 bg-zinc-50 px-5 py-4 sm:px-6">

        <p className="text-sm font-medium text-zinc-500">
          Showing{" "}
          <span className="font-bold text-zinc-800">
            {inquiries.length}
          </span>{" "}
          {inquiries.length === 1
            ? "inquiry"
            : "inquiries"}
        </p>

      </div>

    </div>
  );
}
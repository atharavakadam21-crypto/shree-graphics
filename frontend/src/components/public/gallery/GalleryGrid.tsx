"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Play, X } from "lucide-react";
import type { GalleryCategory, GalleryEvent, GalleryItem } from "@/lib/types";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

const tabs: Array<{ value: GalleryCategory; label: string }> = [
  { value: "machine", label: "Machines" },
  { value: "airshaft", label: "Airshafts" },
  { value: "spare_part", label: "Spare Parts" },
  { value: "exhibition", label: "Exhibitions" },
];

export default function GalleryGrid() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [events, setEvents] = useState<GalleryEvent[]>([]);
  const [active, setActive] = useState<GalleryCategory>("machine");
  const [eventId, setEventId] = useState<string | null>(null);
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/gallery`).then((r) => r.json()),
      fetch(`${API}/api/gallery/events`).then((r) => r.json()),
    ])
      .then(([gallery, exhibitionEvents]) => {
        setItems(gallery.data ?? []);
        setEvents(exhibitionEvents.data ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  const media = useMemo(
    () => items.filter((item) => active === "exhibition" ? item.event_id === eventId : item.category === active),
    [items, active, eventId]
  );

  const openTab = (value: GalleryCategory) => {
    setActive(value);
    setEventId(null);
  };

  return (
    <section className="pb-16 pt-5 sm:pb-28 sm:pt-8">
      <div className="mx-auto max-w-[1800px] px-3 sm:px-6 lg:px-10">
        <header className="mb-5 flex items-end justify-between gap-3 sm:mb-8">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.26em] text-sky-200/70 sm:text-[10px]">Shree Graphics</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:mt-2 sm:text-4xl">Gallery</h1>
          </div>
          <span className="hidden h-px flex-1 bg-white/10 sm:block" />
        </header>

        <nav aria-label="Gallery categories" className="sticky top-2 z-20 mb-5 overflow-hidden rounded-xl border border-white/10 bg-[#0f1b31]/95 p-1.5 shadow-xl backdrop-blur sm:mb-7 sm:rounded-2xl sm:p-2">
          <div className="flex gap-1.5 overflow-x-auto pb-0.5 [-webkit-overflow-scrolling:touch] sm:gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => openTab(tab.value)}
                aria-pressed={active === tab.value}
                className={`min-h-11 shrink-0 rounded-lg px-3.5 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f58a1f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1b31] sm:rounded-xl sm:px-5 sm:py-2.5 ${active === tab.value ? "bg-[#f58a1f] text-white shadow-lg" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {loading ? (
          <div className="grid min-h-[48vh] place-items-center text-sm text-slate-400" role="status">Loading gallery…</div>
        ) : active === "exhibition" && !eventId ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {events.map((event, index) => {
              const cover = items.find((item) => item.event_id === event.id)?.media_url ?? event.cover_url;
              return (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => setEventId(event.id)}
                  className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-[#111d33] text-left transition hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f58a1f] sm:aspect-[4/5] sm:rounded-2xl"
                >
                  {cover ? <img src={cover} alt="" className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-100" /> : <div className="h-full bg-gradient-to-br from-[#20395f] to-[#101a2d]" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07101f] via-[#07101f]/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#f58a1f] sm:text-[10px]">Exhibition {String(index + 1).padStart(2, "0")}</span>
                    <h2 className="mt-1 text-xl font-semibold text-white sm:mt-2 sm:text-2xl">{event.name}</h2>
                    {event.description && <p className="mt-1 line-clamp-2 text-xs text-slate-300 sm:mt-2 sm:text-sm">{event.description}</p>}
                  </div>
                </button>
              );
            })}
            {events.length === 0 && <EmptyState text="Exhibition moments will appear here." />}
          </div>
        ) : (
          <>
            {active === "exhibition" && eventId && (
              <button type="button" onClick={() => setEventId(null)} className="mb-4 inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f58a1f]">
                <ArrowLeft size={17} aria-hidden="true" /> All exhibitions
              </button>
            )}
            <div className="columns-2 gap-2 sm:columns-2 sm:gap-4 lg:columns-3 xl:columns-4">
              {media.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelected(item)}
                  aria-label={`Open ${item.media_type}${item.title ? `: ${item.title}` : ""}`}
                  className="group relative mb-2 block w-full break-inside-avoid overflow-hidden rounded-lg border border-white/10 bg-[#111d33] text-left transition hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f58a1f] sm:mb-4 sm:rounded-2xl"
                >
                  {item.media_type === "video" ? (
                    <video src={item.media_url} muted playsInline preload="metadata" className={`w-full object-cover transition duration-500 group-hover:scale-[1.025] ${index % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"}`} />
                  ) : (
                    <img src={item.media_url} alt={item.title ?? "Shree Graphics gallery"} loading="lazy" className="w-full object-cover transition duration-500 group-hover:scale-[1.025]" />
                  )}
                  {item.media_type === "video" && <span aria-hidden="true" className="absolute left-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[#0b1220] shadow sm:left-4 sm:top-4 sm:h-11 sm:w-11"><Play size={16} fill="currentColor" /></span>}
                </button>
              ))}
              {media.length === 0 && <EmptyState text="No media here yet." />}
            </div>
          </>
        )}
      </div>

      {selected && (
        <div role="dialog" aria-modal="true" aria-label="Media viewer" className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020711]/95 p-2 sm:p-8" onClick={() => setSelected(null)}>
          <button type="button" onClick={() => setSelected(null)} aria-label="Close media viewer" className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f58a1f] sm:right-5 sm:top-5"><X size={21} /></button>
          <div className="flex max-h-full w-full max-w-6xl items-center justify-center" onClick={(event) => event.stopPropagation()}>
            {selected.media_type === "video" ? <video src={selected.media_url} controls autoPlay playsInline className="max-h-[92vh] max-w-full rounded-lg" /> : <img src={selected.media_url} alt={selected.title ?? "Gallery"} className="max-h-[92vh] max-w-full rounded-lg object-contain" />}
          </div>
        </div>
      )}
    </section>
  );
}

function EmptyState({ text }: { text: string }) {
  return <div className="col-span-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-16 text-center text-sm text-slate-400 sm:rounded-2xl sm:py-20">{text}</div>;
}

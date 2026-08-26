"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ArrowLeft, ChevronRight, Images, Package, Play, Settings2, Wrench, X } from "lucide-react";
import type { GalleryCategory, GalleryEvent, GalleryItem } from "@/lib/types";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

const tabs: Array<{ value: GalleryCategory; label: string; short: string; Icon: typeof Images }> = [
  { value: "machine", label: "Machines", short: "Machines", Icon: Settings2 },
  { value: "airshaft", label: "Airshafts", short: "Airshafts", Icon: Wrench },
  { value: "spare_part", label: "Spare Parts", short: "Parts", Icon: Package },
  { value: "exhibition", label: "Exhibitions", short: "Exhibitions", Icon: Images },
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
    ]).then(([gallery, exhibitionEvents]) => {
      setItems(gallery.data ?? []);
      setEvents(exhibitionEvents.data ?? []);
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  const media = useMemo(() => items.filter((item) => active === "exhibition" ? item.event_id === eventId : item.category === active), [items, active, eventId]);
  const activeLabel = tabs.find((tab) => tab.value === active)?.label ?? "Gallery";
  const openTab = (value: GalleryCategory) => { setActive(value); setEventId(null); };

  return (
    <section className="relative overflow-hidden pb-12 pt-4 sm:pb-24 sm:pt-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_18%_5%,rgba(56,112,180,0.22),transparent_58%)]" />
      <div className="relative mx-auto max-w-[1800px] px-3 sm:px-6 lg:px-10">
        <header className="mb-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#172944]/85 to-[#0c1628]/90 p-5 shadow-2xl shadow-black/10 sm:mb-8 sm:rounded-3xl sm:p-9">
          <div className="flex items-end justify-between gap-4"><div><div className="mb-2 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.28em] text-sky-200/70 sm:text-[10px]"><span className="h-px w-6 bg-[#f58a1f]" /> Shree Graphics / Visual Archive</div><h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">Gallery<span className="text-[#f58a1f]">.</span></h1><p className="mt-2 max-w-xl text-sm leading-6 text-slate-400 sm:mt-3 sm:text-base">Explore our machinery, precision airshafts, spare parts and moments from industry exhibitions.</p></div><div className="hidden min-w-36 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 text-right sm:block"><p className="text-2xl font-semibold text-white">{items.length}</p><p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-500">Media items</p></div></div>
        </header>

        <nav aria-label="Gallery categories" className="sticky top-2 z-20 -mx-1 mb-5 rounded-2xl border border-white/10 bg-[#101d32]/95 p-1.5 shadow-xl shadow-black/20 backdrop-blur-xl sm:mb-7 sm:rounded-3xl sm:p-2"><div className="flex snap-x snap-mandatory gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-2">{tabs.map(({ value, label, short, Icon }) => { const count = value === "exhibition" ? events.length : items.filter((item) => item.category === value).length; const isActive = active === value; return <button key={value} type="button" onClick={() => openTab(value)} aria-label={label} aria-pressed={isActive} className={`flex min-h-14 min-w-[116px] snap-start items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f58a1f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101d32] sm:min-w-0 sm:flex-1 sm:justify-center sm:rounded-2xl sm:px-5 ${isActive ? "bg-gradient-to-br from-[#ff9b38] to-[#ef7912] text-white shadow-lg shadow-orange-950/30" : "text-slate-400 hover:bg-white/[0.06] hover:text-white"}`}><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${isActive ? "bg-white/15" : "bg-white/[0.05]"}`}><Icon size={16} aria-hidden="true" /></span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold">{short}</span><span className={`mt-0.5 block text-[10px] ${isActive ? "text-white/70" : "text-slate-600"}`}>{count} {value === "exhibition" ? "events" : "items"}</span></span></button>; })}</div></nav>

        {loading ? <LoadingState /> : active === "exhibition" && !eventId ? <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">{events.map((event, index) => { const cover = items.find((item) => item.event_id === event.id)?.media_url ?? event.cover_url; return <button key={event.id} type="button" onClick={() => setEventId(event.id)} className="group relative min-h-56 overflow-hidden rounded-2xl border border-white/10 bg-[#111e34] text-left shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-[#f58a1f]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f58a1f] sm:min-h-80 sm:rounded-3xl">{cover ? <img src={cover} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-100" /> : <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,#28466f,transparent_50%),linear-gradient(135deg,#172842,#0c1423)]" />}<div className="absolute inset-0 bg-gradient-to-t from-[#07101f] via-[#07101f]/35 to-transparent" /><div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur">Event {String(index + 1).padStart(2, "0")}</div><div className="absolute inset-x-0 bottom-0 p-5 sm:p-6"><h2 className="text-2xl font-semibold text-white sm:text-3xl">{event.name}</h2>{event.description && <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-300">{event.description}</p>}<span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#ff9b38]">View collection <ChevronRight size={16} /></span></div></button>; })}{events.length === 0 && <EmptyState icon={<Images size={28} />} title="No exhibitions yet" text="New exhibition collections will appear here as soon as they are added." />}</div> : <>{active === "exhibition" && eventId && <button type="button" onClick={() => setEventId(null)} className="mb-4 inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f58a1f]"><ArrowLeft size={17} aria-hidden="true" /> All exhibitions</button>}<div className="mb-4 flex items-end justify-between gap-3 px-1 sm:mb-5"><div><p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#f58a1f]">Collection</p><h2 className="mt-1 text-xl font-semibold text-white sm:text-2xl">{active === "exhibition" && eventId ? events.find((event) => event.id === eventId)?.name ?? "Exhibition" : activeLabel}</h2></div><span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-slate-400">{media.length} {media.length === 1 ? "item" : "items"}</span></div>{media.length ? <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">{media.map((item, index) => <MediaCard key={item.id} item={item} index={index} onOpen={() => setSelected(item)} />)}</div> : <EmptyState icon={active === "machine" ? <Settings2 size={30} /> : active === "airshaft" ? <Wrench size={30} /> : <Package size={30} />} title={`No ${activeLabel.toLowerCase()} yet`} text="This collection is ready. New photos and videos added from the admin panel will appear here automatically." />}</>}</>}
      </div>
      {selected && <div role="dialog" aria-modal="true" aria-label="Media viewer" className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020711]/[0.97] p-3 backdrop-blur-sm sm:p-8" onClick={() => setSelected(null)}><button type="button" onClick={() => setSelected(null)} aria-label="Close media viewer" className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f58a1f]"><X size={21} /></button><div className="flex max-h-full w-full max-w-6xl items-center justify-center" onClick={(event) => event.stopPropagation()}>{selected.media_type === "video" ? <video src={selected.media_url} controls autoPlay playsInline className="max-h-[88vh] max-w-full rounded-xl shadow-2xl" /> : <img src={selected.media_url} alt={selected.title ?? "Gallery"} className="max-h-[88vh] max-w-full rounded-xl object-contain shadow-2xl" />}</div></div>}
    </section>
  );
}

function MediaCard({ item, index, onOpen }: { item: GalleryItem; index: number; onOpen: () => void }) { const featured = index === 0; return <button type="button" onClick={onOpen} aria-label={`Open ${item.media_type}${item.title ? `: ${item.title}` : ""}`} className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111d33] text-left shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-0.5 hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f58a1f] sm:rounded-3xl ${featured ? "col-span-2" : "col-span-1"}`}><div className={`relative overflow-hidden ${featured ? "aspect-[16/9] sm:aspect-[16/8]" : index % 3 === 0 ? "aspect-[4/5]" : "aspect-square"}`}>{item.media_type === "video" ? <video src={item.media_url} muted playsInline preload="metadata" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /> : <img src={item.media_url} alt={item.title ?? "Shree Graphics gallery"} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />}{featured && <div className="absolute inset-0 bg-gradient-to-t from-[#07101f]/80 via-transparent to-transparent" />}{item.media_type === "video" && <span aria-hidden="true" className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[#0b1220] shadow"><Play size={15} fill="currentColor" /></span>}{featured && item.title && <span className="absolute inset-x-0 bottom-0 p-4 text-base font-semibold text-white sm:p-6 sm:text-xl">{item.title}</span>}</div></button>; }
function EmptyState({ icon, title, text }: { icon: ReactNode; title: string; text: string }) { return <div className="col-span-full overflow-hidden rounded-2xl border border-dashed border-sky-200/15 bg-[linear-gradient(135deg,rgba(37,64,102,0.24),rgba(10,18,32,0.5))] p-6 sm:rounded-3xl sm:p-10"><div className="mx-auto flex max-w-md flex-col items-center text-center"><div className="grid h-14 w-14 place-items-center rounded-2xl border border-[#f58a1f]/20 bg-[#f58a1f]/10 text-[#ff9b38]">{icon}</div><h3 className="mt-4 text-lg font-semibold text-white">{title}</h3><p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">{text}</p></div></div>; }
function LoadingState() { return <div className="grid min-h-[42vh] place-items-center"><div className="flex flex-col items-center gap-4 text-sm text-slate-400"><span className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#f58a1f]" />Loading visual archive…</div></div>; }

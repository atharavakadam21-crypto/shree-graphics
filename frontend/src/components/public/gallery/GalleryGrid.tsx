"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ArrowLeft, ChevronRight, Images, Package, Play, Settings2, Wrench, X } from "lucide-react";
import type { GalleryCategory, GalleryEvent, GalleryItem } from "@/lib/types";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const tabs = [
  { value: "machine", label: "Machines", Icon: Settings2 },
  { value: "airshaft", label: "Airshafts", Icon: Wrench },
  { value: "spare_part", label: "Spare Parts", Icon: Package },
  { value: "exhibition", label: "Exhibitions", Icon: Images },
] as const;

export default function GalleryGrid() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [events, setEvents] = useState<GalleryEvent[]>([]);
  const [active, setActive] = useState<GalleryCategory>("machine");
  const [eventId, setEventId] = useState<string | null>(null);
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetch(`${API}/api/gallery`).then(r => r.json()), fetch(`${API}/api/gallery/events`).then(r => r.json())])
      .then(([gallery, exhibitionEvents]) => {
        setItems(gallery.data ?? []);
        setEvents(exhibitionEvents.data ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selected) return;
    const close = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [selected]);

  const media = useMemo(() => items.filter(item => active === "exhibition" ? item.event_id === eventId : item.category === active), [items, active, eventId]);
  const activeLabel = tabs.find(t => t.value === active)?.label ?? "Gallery";
  const selectTab = (value: GalleryCategory) => { setActive(value); setEventId(null); };

  return <section className="relative overflow-hidden pb-12 pt-4 sm:pb-24 sm:pt-8">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_18%_5%,rgba(56,112,180,0.22),transparent_58%)]" />
    <div className="relative mx-auto max-w-[1800px] px-3 sm:px-6 lg:px-10">
      <header className="mb-4 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#172944]/85 to-[#0c1628]/90 p-5 sm:mb-8 sm:rounded-3xl sm:p-9">
        <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.28em] text-sky-200/70">Shree Graphics / Visual Archive</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">Gallery<span className="text-[#f58a1f]">.</span></h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">Explore our machinery, precision airshafts, spare parts and moments from industry exhibitions.</p>
      </header>

      <nav aria-label="Gallery categories" className="sticky top-2 z-20 -mx-1 mb-5 rounded-2xl border border-white/10 bg-[#101d32]/95 p-1.5 backdrop-blur-xl sm:mb-7">
        <div className="flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map(({ value, label, Icon }) => {
            const isActive = active === value;
            const count = value === "exhibition" ? events.length : items.filter(i => i.category === value).length;
            return <button key={value} type="button" onClick={() => selectTab(value)} aria-pressed={isActive} className={`flex min-h-14 min-w-[130px] flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f58a1f] ${isActive ? "bg-gradient-to-br from-[#ff9b38] to-[#ef7912] text-white" : "text-slate-400 hover:bg-white/[0.06] hover:text-white"}`}>
              <Icon size={17} aria-hidden="true" /><span>{label}</span><small className="text-xs opacity-65">{count}</small>
            </button>;
          })}
        </div>
      </nav>

      {loading ? <LoadingState /> : active === "exhibition" && !eventId ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {events.map((event, index) => <EventCard key={event.id} event={event} index={index} cover={items.find(i => i.event_id === event.id)?.media_url ?? event.cover_url} onOpen={() => setEventId(event.id)} />)}
          {events.length === 0 && <EmptyState icon={<Images size={28} />} title="No exhibitions yet" text="New exhibition collections will appear here as soon as they are added." />}
        </div>
      ) : (
        <>
          {active === "exhibition" && eventId && <button type="button" onClick={() => setEventId(null)} className="mb-4 inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 px-3 text-sm font-semibold text-slate-300 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f58a1f]"><ArrowLeft size={17} />All exhibitions</button>}
          <div className="mb-4 flex items-end justify-between gap-3 px-1"><div><p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#f58a1f]">Collection</p><h2 className="mt-1 text-xl font-semibold text-white sm:text-2xl">{active === "exhibition" && eventId ? events.find(e => e.id === eventId)?.name ?? "Exhibition" : activeLabel}</h2></div><span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-slate-400">{media.length} items</span></div>
          {media.length ? <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">{media.map((item, index) => <MediaCard key={item.id} item={item} index={index} onOpen={() => setSelected(item)} />)}</div> : <EmptyState icon={active === "machine" ? <Settings2 size={30} /> : active === "airshaft" ? <Wrench size={30} /> : <Package size={30} />} title={`No ${activeLabel.toLowerCase()} yet`} text="This collection is ready. New photos and videos added from the admin panel will appear here automatically." />}
        </>
      )}
    </div>
    {selected && <div role="dialog" aria-modal="true" aria-label="Media viewer" className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020711]/[0.97] p-3 backdrop-blur-sm sm:p-8" onClick={() => setSelected(null)}><button type="button" aria-label="Close media viewer" onClick={() => setSelected(null)} className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/10 text-white"><X size={21} /></button><div onClick={e => e.stopPropagation()}>{selected.media_type === "video" ? <video src={selected.media_url} controls autoPlay playsInline className="max-h-[88vh] max-w-full rounded-xl" /> : <img src={selected.media_url} alt={selected.title ?? "Gallery"} className="max-h-[88vh] max-w-full rounded-xl object-contain" />}</div></div>}
  </section>;
}

function EventCard({ event, index, cover, onOpen }: { event: GalleryEvent; index: number; cover?: string | null; onOpen: () => void }) { return <button type="button" onClick={onOpen} className="group relative min-h-56 overflow-hidden rounded-2xl border border-white/10 bg-[#111e34] text-left sm:min-h-80 sm:rounded-3xl">{cover ? <img src={cover} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105" /> : <div className="absolute inset-0 bg-[linear-gradient(135deg,#172842,#0c1423)]" />}<div className="absolute inset-0 bg-gradient-to-t from-[#07101f] via-[#07101f]/35 to-transparent" /><div className="absolute left-4 top-4 text-[9px] font-bold uppercase tracking-[0.2em] text-white/80">Event {String(index + 1).padStart(2, "0")}</div><div className="absolute inset-x-0 bottom-0 p-5"><h2 className="text-2xl font-semibold text-white">{event.name}</h2><span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#ff9b38]">View collection <ChevronRight size={16} /></span></div></button>; }
function MediaCard({ item, index, onOpen }: { item: GalleryItem; index: number; onOpen: () => void }) { const featured = index === 0; return <button type="button" onClick={onOpen} aria-label={`Open ${item.media_type}`} className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111d33] text-left ${featured ? "col-span-2" : "col-span-1"}`}><div className={`relative overflow-hidden ${featured ? "aspect-[16/9]" : "aspect-square"}`}>{item.media_type === "video" ? <video src={item.media_url} muted playsInline preload="metadata" className="h-full w-full object-cover" /> : <img src={item.media_url} alt={item.title ?? "Shree Graphics gallery"} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}{item.media_type === "video" && <span className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[#0b1220]"><Play size={15} fill="currentColor" /></span>}</div></button>; }
function EmptyState({ icon, title, text }: { icon: ReactNode; title: string; text: string }) { return <div className="col-span-full rounded-2xl border border-dashed border-sky-200/15 bg-[linear-gradient(135deg,rgba(37,64,102,0.24),rgba(10,18,32,0.5))] p-8 sm:rounded-3xl sm:p-10"><div className="mx-auto flex max-w-md flex-col items-center text-center"><div className="grid h-14 w-14 place-items-center rounded-2xl border border-[#f58a1f]/20 bg-[#f58a1f]/10 text-[#ff9b38]">{icon}</div><h3 className="mt-4 text-lg font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{text}</p></div></div>; }
function LoadingState() { return <div className="grid min-h-[42vh] place-items-center text-sm text-slate-400">Loading visual archive…</div>; }

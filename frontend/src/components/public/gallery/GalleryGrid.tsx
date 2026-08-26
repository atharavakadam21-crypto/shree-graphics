"use client";

import { useEffect, useMemo, useState } from "react";
import { Play } from "lucide-react";
import ScrollReveal from "@/components/public/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import type { GalleryCategory, GalleryItem } from "@/lib/types";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const categories: Array<{ value: "all" | GalleryCategory; label: string }> = [
  { value: "all", label: "All" }, { value: "machine", label: "Machines" }, { value: "airshaft", label: "Airshafts" }, { value: "spare_part", label: "Spare Parts" }, { value: "exhibition", label: "Exhibitions" }
];

export default function GalleryGrid() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [active, setActive] = useState<"all" | GalleryCategory>("all");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  useEffect(() => { let mounted = true; fetch(`${API}/api/gallery`).then((response) => response.json()).then((body) => { if (mounted) setItems(body.data ?? []); }).catch(() => { if (mounted) setItems([]); }).finally(() => { if (mounted) setLoading(false); }); return () => { mounted = false; }; }, []);
  const filtered = useMemo(() => active === "all" ? items : items.filter((item) => item.category === active), [active, items]);

  return <section className="py-24 sm:py-32 lg:py-40"><div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12"><div className="grid gap-14 lg:grid-cols-[260px_1fr]"><ScrollReveal><SectionLabel number="02">Visual archive</SectionLabel><p className="mt-7 max-w-xs text-sm leading-7 text-slate-300">Explore machines, airshafts, spare parts and exhibitions from Shree Graphics.</p></ScrollReveal><div><div className="mb-8 flex flex-wrap gap-2">{categories.map((category) => <button key={category.value} type="button" onClick={() => setActive(category.value)} className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${active === category.value ? "border-[#4274D9] bg-[#4274D9] text-white" : "border-white/15 bg-white/5 text-slate-300 hover:bg-white/10"}`}>{category.label}</button>)}</div>{loading ? <p className="py-16 text-slate-400">Loading gallery...</p> : filtered.length === 0 ? <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center text-slate-400">No media has been added to this gallery section yet.</div> : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((item, index) => <ScrollReveal key={item.id} delay={Math.min(index * 70, 280)}><button type="button" onClick={() => setSelected(item)} className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#101B31] text-left"><>{item.media_type === "video" ? <video src={item.media_url} muted preload="metadata" className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100" /> : <img src={item.media_url} alt={item.title ?? "Shree Graphics gallery"} className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />}</><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B1220] to-transparent p-5 pt-16"><span className="text-xs font-medium text-white">{item.title ?? categories.find((entry) => entry.value === item.category)?.label}</span></div>{item.media_type === "video" && <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-[#0B1220]"><Play size={16} fill="currentColor" /></span>}</button></ScrollReveal>)}</div>}</div></div></div>{selected && <div role="dialog" aria-modal="true" className="fixed inset-0 z-[100] grid place-items-center bg-black/85 p-4" onClick={() => setSelected(null)}><div className="relative max-h-[90vh] w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>{selected.media_type === "video" ? <video src={selected.media_url} controls autoPlay className="max-h-[90vh] w-full rounded-xl" /> : <img src={selected.media_url} alt={selected.title ?? "Gallery item"} className="max-h-[90vh] w-full rounded-xl object-contain" />}<button type="button" onClick={() => setSelected(null)} className="absolute right-3 top-3 rounded-full bg-black/70 px-4 py-2 text-sm text-white">Close</button></div></div>}</section>;
}
'use client';

import { ChangeEvent, DragEvent, useEffect, useState } from 'react';
import { ImagePlus, Loader2, Trash2, Video } from 'lucide-react';
import type { GalleryCategory, GalleryItem } from '@/lib/types';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';
const categories: Array<{ value: GalleryCategory; label: string }> = [
  { value: 'machine', label: 'Machines' }, { value: 'airshaft', label: 'Airshafts' }, { value: 'spare_part', label: 'Spare Parts' }, { value: 'exhibition', label: 'Exhibitions' }
];

export default function AdminGalleryPage() {
  const [category, setCategory] = useState<GalleryCategory>('machine');
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [message, setMessage] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/api/gallery?category=${category}&admin=true`, { credentials: 'include' });
      const body = await response.json();
      setItems(body.data ?? []);
    } catch { setMessage('Unable to load gallery items.'); }
    finally { setLoading(false); }
  };
  useEffect(() => { void load(); }, [category]);

  const upload = async (files: FileList | File[]) => {
    const selected = Array.from(files).filter((file) => file.type.startsWith('image/') || file.type.startsWith('video/'));
    if (!selected.length) { setMessage('Choose image or video files.'); return; }
    setUploading(true); setMessage('');
    try {
      const form = new FormData(); selected.forEach((file) => form.append('media', file));
      const uploaded = await fetch(`${API}/api/uploads/gallery-media`, { method: 'POST', credentials: 'include', body: form });
      const uploadBody = await uploaded.json();
      if (!uploaded.ok) throw new Error(uploadBody.message ?? 'Upload failed');
      for (const media of uploadBody.data) {
        const created = await fetch(`${API}/api/gallery`, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ category, media_type: media.media_type, media_url: media.url, sort_order: items.length }) });
        if (!created.ok) throw new Error('Media uploaded but could not be saved to gallery');
      }
      setMessage(`${selected.length} file(s) added to ${categories.find((entry) => entry.value === category)?.label}.`);
      await load();
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Upload failed'); }
    finally { setUploading(false); }
  };
  const onInput = (event: ChangeEvent<HTMLInputElement>) => { if (event.target.files) void upload(event.target.files); event.target.value = ''; };
  const onDrop = (event: DragEvent<HTMLDivElement>) => { event.preventDefault(); setDragging(false); void upload(event.dataTransfer.files); };
  const remove = async (id: string) => { if (!confirm('Remove this gallery item?')) return; const response = await fetch(`${API}/api/gallery/${id}`, { method: 'DELETE', credentials: 'include' }); if (!response.ok) { setMessage('Unable to remove gallery item.'); return; } await load(); };

  return <main className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 sm:py-10"><div className="mx-auto max-w-7xl">
    <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Content</p><h1 className="mt-1 text-3xl font-bold text-gray-900">Gallery</h1><p className="mt-2 text-gray-600">Upload and manage the images and videos shown on the public website.</p>
    <div className="mt-8 flex flex-wrap gap-2">{categories.map((entry) => <button key={entry.value} type="button" onClick={() => setCategory(entry.value)} className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${category === entry.value ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-200'}`}>{entry.label}</button>)}</div>
    <div onDragEnter={(event) => { event.preventDefault(); setDragging(true); }} onDragOver={(event) => event.preventDefault()} onDragLeave={() => setDragging(false)} onDrop={onDrop} className={`mt-6 rounded-2xl border-2 border-dashed p-8 text-center transition sm:p-12 ${dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}>
      <ImagePlus className="mx-auto h-10 w-10 text-gray-400" /><h2 className="mt-4 text-lg font-bold text-gray-900">Drag & drop images or videos here</h2><p className="mt-2 text-sm text-gray-500">Up to 10 files at once. Images and MP4, WebM or MOV videos are supported.</p>
      <label className="mt-5 inline-flex cursor-pointer rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"><input className="sr-only" type="file" multiple accept="image/*,video/mp4,video/webm,video/quicktime" onChange={onInput} />{uploading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Uploading...</> : 'Select files'}</label>
    </div>
    {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    {loading ? <div className="py-16 text-center text-gray-500">Loading gallery...</div> : items.length === 0 ? <div className="py-16 text-center text-gray-500">No media in this category yet.</div> : <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => <article key={item.id} className="overflow-hidden rounded-xl bg-white shadow-sm"><div className="relative aspect-video bg-gray-100">{item.media_type === 'video' ? <><video src={item.media_url} className="h-full w-full object-cover" controls /><span className="absolute left-3 top-3 rounded bg-black/70 p-2 text-white"><Video size={16} /></span></> : <img src={item.media_url} alt={item.title ?? 'Gallery item'} className="h-full w-full object-cover" />}</div><div className="flex items-center justify-between p-3"><span className="text-sm text-gray-500">{item.media_type}</span><button type="button" onClick={() => void remove(item.id)} className="rounded-lg p-2 text-red-600 hover:bg-red-50" aria-label="Delete gallery item"><Trash2 size={18} /></button></div></article>)}</div>}
  </div></main>;
}
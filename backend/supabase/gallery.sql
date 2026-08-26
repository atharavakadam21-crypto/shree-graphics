create extension if not exists "pgcrypto";

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('machine','airshaft','spare_part','exhibition')),
  media_type text not null check (media_type in ('image','video')),
  media_url text not null,
  thumbnail_url text,
  title text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists gallery_items_category_order_idx on public.gallery_items (category, sort_order, created_at desc);

create or replace function public.set_gallery_items_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists gallery_items_updated_at on public.gallery_items;
create trigger gallery_items_updated_at
before update on public.gallery_items
for each row execute function public.set_gallery_items_updated_at();

-- Run this file in the Supabase SQL Editor before using the gallery API.
-- Create a public Storage bucket named `gallery-media` in Supabase Storage.
-- The backend uses the service-role Supabase client for authenticated uploads.
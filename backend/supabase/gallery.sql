create extension if not exists "pgcrypto";

create table if not exists public.gallery_events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  cover_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('machine','airshaft','spare_part','exhibition')),
  event_id uuid references public.gallery_events(id) on delete cascade,
  media_type text not null check (media_type in ('image','video')),
  media_url text not null,
  thumbnail_url text,
  title text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.gallery_items add column if not exists event_id uuid references public.gallery_events(id) on delete cascade;
alter table public.gallery_items add column if not exists thumbnail_url text;
alter table public.gallery_items add column if not exists is_active boolean not null default true;

create index if not exists gallery_items_category_order_idx on public.gallery_items (category, sort_order, created_at desc);
create index if not exists gallery_items_event_order_idx on public.gallery_items (event_id, sort_order, created_at desc);
create index if not exists gallery_events_order_idx on public.gallery_events (sort_order, created_at desc);

create or replace function public.set_gallery_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists gallery_items_updated_at on public.gallery_items;
create trigger gallery_items_updated_at before update on public.gallery_items for each row execute function public.set_gallery_updated_at();

drop trigger if exists gallery_events_updated_at on public.gallery_events;
create trigger gallery_events_updated_at before update on public.gallery_events for each row execute function public.set_gallery_updated_at();

-- Run this file in Supabase SQL Editor. Create a public Storage bucket named gallery-media.

-- Wiihappy Gen — quote request storage
-- Apply with: supabase db push (or mcp__Supabase__apply_migration once a project is connected)

create extension if not exists pgcrypto;

create table if not exists public.devis (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'nouveau' check (status in ('nouveau', 'en_cours', 'traite', 'archive')),

  op_type text not null check (op_type in ('Import', 'Export')),
  name text not null,
  whatsapp text,
  email text,
  category text not null,
  description text not null,
  quantity text,
  budget text,
  country text,
  transport text check (transport in ('Aérien', 'Maritime')),
  attachment_paths text[] not null default '{}',

  -- which page/CTA the request originated from (e.g. "importation", "categories-vehicules")
  source_page text
);

alter table public.devis enable row level security;

-- Public quote form: anyone can submit a request, nobody (anon) can read/update/delete.
-- Staff access goes through the service role (admin back office), which bypasses RLS.
create policy "Anyone can submit a devis"
  on public.devis for insert
  to anon
  with check (true);

-- Storage bucket for quote attachments (photos, spec sheets). Private: uploads are
-- write-only for the public form; reading back requires a signed URL from the back office.
insert into storage.buckets (id, name, public, file_size_limit)
values ('devis-attachments', 'devis-attachments', false, 10485760) -- 10 MB per file
on conflict (id) do nothing;

create policy "Anyone can upload a devis attachment"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'devis-attachments');

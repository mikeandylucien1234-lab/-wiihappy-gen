-- Wiihappy Gen — quick "call me back" lead capture ("Laissez-nous vous appeler")
--
-- Deliberately lighter than reservations: no date/time picker, just
-- name + WhatsApp + email. Public can insert; only staff can read.

create table if not exists public.callback_requests (
  id uuid primary key default gen_random_uuid(),
  nom_complet text not null,
  whatsapp text not null,
  email text not null,
  statut text not null default 'nouveau' check (statut in ('nouveau', 'contacte', 'annule')),
  created_at timestamptz not null default now()
);

create index if not exists callback_requests_created_at_idx on public.callback_requests (created_at desc);

alter table public.callback_requests enable row level security;

create policy "Anyone can request a callback"
  on public.callback_requests for insert
  to anon, authenticated
  with check (true);

create policy "Staff can view callback requests"
  on public.callback_requests for select
  to authenticated
  using (private.is_admin_user());

create policy "Admin and Agent can update callback status"
  on public.callback_requests for update
  to authenticated
  using (private.admin_role() in ('Admin', 'Agent'))
  with check (private.admin_role() in ('Admin', 'Agent'));

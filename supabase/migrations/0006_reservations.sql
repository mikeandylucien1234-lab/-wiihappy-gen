-- Wiihappy Gen — call booking system ("Réserver votre appel")
--
-- Public can insert a reservation (anon booking, no account needed) but cannot
-- read any reservation row — personal contact info stays admin-only. To let the
-- booking UI still gray out already-taken slots without exposing who booked them,
-- get_booked_slots() below is a narrow SECURITY DEFINER RPC that returns only
-- (date_appel, heure_appel) pairs, nothing else.

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  nom_complet text not null,
  whatsapp text not null,
  email text not null,
  motif text not null check (motif in ('Importation', 'Exportation', 'Sourcing personnalisé', 'Question générale')),
  notes text,
  date_appel date not null,
  heure_appel time not null,
  statut text not null default 'en_attente' check (statut in ('en_attente', 'confirme', 'annule', 'effectue')),
  created_at timestamptz not null default now(),
  unique (date_appel, heure_appel)
);

create index if not exists reservations_date_idx on public.reservations (date_appel, heure_appel);

alter table public.reservations enable row level security;

create policy "Anyone can request a call reservation"
  on public.reservations for insert
  to anon, authenticated
  with check (true);

create policy "Staff can view all reservations"
  on public.reservations for select
  to authenticated
  using (private.is_admin_user());

create policy "Admin and Agent can update reservation status"
  on public.reservations for update
  to authenticated
  using (private.admin_role() in ('Admin', 'Agent'))
  with check (private.admin_role() in ('Admin', 'Agent'));

-- Public, privacy-safe slot-availability check: only ever returns date+time,
-- never who booked it. Excludes cancelled reservations so a freed slot reopens.
create or replace function public.get_booked_slots(p_start date, p_end date)
returns table (date_appel date, heure_appel time)
language sql
security definer
set search_path = public
stable
as $$
  select date_appel, heure_appel
  from public.reservations
  where date_appel between p_start and p_end
    and statut != 'annule';
$$;

grant execute on function public.get_booked_slots(date, date) to anon, authenticated;

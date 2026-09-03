-- Wiihappy Gen — client accounts, devis ownership, and gated payment info

-- 1. Link devis to an optional owning user (null = anonymous submission)
alter table public.devis
  add column if not exists user_id uuid references auth.users(id) on delete set null;

create index if not exists devis_user_id_idx on public.devis (user_id);

-- 2. Extend the status lifecycle so a devis can be accepted/refused — "accepté" is what
-- gates the payment info section in the client account area.
alter table public.devis drop constraint if exists devis_status_check;
alter table public.devis
  add constraint devis_status_check
  check (status in ('nouveau', 'en_cours', 'accepte', 'refuse', 'traite', 'archive'));

-- 3. Replace the anon-only insert policy: anonymous submissions must have no user_id,
-- authenticated submissions must be self-attributed (never spoof another user's id).
drop policy if exists "Anyone can submit a devis" on public.devis;

create policy "Anonymous can submit a devis without an account"
  on public.devis for insert
  to anon
  with check (user_id is null);

create policy "Authenticated users can submit their own devis"
  on public.devis for insert
  to authenticated
  with check (user_id = auth.uid());

-- 4. A logged-in client can only ever see their own devis. Anonymous (user_id null)
-- rows stay invisible to everyone via the API — no select policy grants them.
create policy "Authenticated users can view their own devis"
  on public.devis for select
  to authenticated
  using (user_id = auth.uid());

-- 5. Payment info lives in its own table so RLS can gate it independently of the
-- devis row itself: visible only once the related devis is accepted, and only to
-- its owner. Staff/admin management goes through the service role (no insert/update/
-- delete policy for anon or authenticated).
create table if not exists public.paiements (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  devis_id uuid not null references public.devis(id) on delete cascade,
  amount numeric(12, 2) not null,
  currency text not null default 'EUR',
  reference text,
  iban text,
  bic text,
  instructions text,
  due_date date
);

create index if not exists paiements_devis_id_idx on public.paiements (devis_id);

alter table public.paiements enable row level security;

create policy "Client can view payment info only for their accepted devis"
  on public.paiements for select
  to authenticated
  using (
    exists (
      select 1 from public.devis d
      where d.id = paiements.devis_id
        and d.user_id = auth.uid()
        and d.status = 'accepte'
    )
  );

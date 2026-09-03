-- Wiihappy Gen — admin back-office: staff roles, admin visibility on devis, internal notes

-- 1. Staff roster. id mirrors auth.users(id) so a staff member is also a normal
-- Supabase Auth user (they sign up/in the same way clients do); this table is what
-- promotes an account to staff and assigns its role.
create table if not exists public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  role text not null check (role in ('Admin', 'Agent', 'Lecture seule')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

-- 2. SECURITY DEFINER helpers so RLS policies (here and on devis/storage) can check
-- "is the caller staff, and with which role" without querying admin_users directly —
-- a policy that subqueries its own table recurses into itself under RLS; wrapping the
-- check in a SECURITY DEFINER function (which bypasses RLS internally) avoids that.
--
-- They live in `private`, not `public`: PostgREST only exposes the `public` schema by
-- default, so this keeps them out of /rest/v1/rpc/... entirely (a client could otherwise
-- call admin_role()/is_admin_user() directly — harmless since they only report the
-- caller's own status, but the database linter flags it, and there's no reason to
-- expose it). RLS policies still need anon/authenticated to hold EXECUTE, since a
-- policy runs with the querying role's own privileges — that's granted below, and is
-- unrelated to whether the function is reachable over the API.
create schema if not exists private;
revoke all on schema private from anon, authenticated;
grant usage on schema private to anon, authenticated;

create or replace function private.admin_role()
returns text
language sql
security definer
set search_path = public
stable
as $$
  select role from public.admin_users where id = auth.uid() and active limit 1;
$$;

create or replace function private.is_admin_user()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select private.admin_role() is not null;
$$;

grant execute on function private.admin_role() to anon, authenticated;
grant execute on function private.is_admin_user() to anon, authenticated;

-- 3. Staff can see the roster (needed for the Équipe module); nobody else can.
create policy "Staff can view the admin roster"
  on public.admin_users for select
  to authenticated
  using (private.is_admin_user());

-- 4. Admin visibility on devis: staff see every devis, not just their own — this is
-- additive to (not a replacement of) the client-owner policy from migration 0002.
create policy "Staff can view all devis"
  on public.devis for select
  to authenticated
  using (private.is_admin_user());

-- Only Admin/Agent can change a devis (status, etc.) — "Lecture seule" is read-only.
create policy "Admin and Agent can update any devis"
  on public.devis for update
  to authenticated
  using (private.admin_role() in ('Admin', 'Agent'))
  with check (private.admin_role() in ('Admin', 'Agent'));

-- 5. Internal notes thread per devis — never exposed to the client-facing app.
create table if not exists public.devis_notes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  devis_id uuid not null references public.devis(id) on delete cascade,
  author_id uuid references auth.users(id) on delete set null,
  author_name text not null,
  body text not null
);

create index if not exists devis_notes_devis_id_idx on public.devis_notes (devis_id);

alter table public.devis_notes enable row level security;

create policy "Staff can view devis notes"
  on public.devis_notes for select
  to authenticated
  using (private.is_admin_user());

create policy "Admin and Agent can add devis notes"
  on public.devis_notes for insert
  to authenticated
  with check (private.admin_role() in ('Admin', 'Agent'));

-- 6. Staff can read back devis attachments (uploads were write-only until now — no
-- SELECT policy existed on storage.objects at all, not even for the uploader).
create policy "Staff can view devis attachments"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'devis-attachments' and private.is_admin_user());

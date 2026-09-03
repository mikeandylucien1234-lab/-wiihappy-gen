-- Wiihappy Gen — remaining admin modules: paiements admin access, roster management,
-- staff invites, categories, multilingual content, site settings, notifications.

-- 1. Paiements: staff can see every payment; only Admin/Agent can create or edit one
-- (payment info is prepared by staff once a devis is accepted, matching the gated
-- section already shown to clients on /mon-compte).
create policy "Staff can view all paiements"
  on public.paiements for select
  to authenticated
  using (private.is_admin_user());

create policy "Admin and Agent can create paiements"
  on public.paiements for insert
  to authenticated
  with check (private.admin_role() in ('Admin', 'Agent'));

create policy "Admin and Agent can update paiements"
  on public.paiements for update
  to authenticated
  using (private.admin_role() in ('Admin', 'Agent'))
  with check (private.admin_role() in ('Admin', 'Agent'));

-- 2. Roster management: only 'Admin' (not 'Agent') can change a teammate's role or
-- activate/deactivate them.
create policy "Admin can update the roster"
  on public.admin_users for update
  to authenticated
  using (private.admin_role() = 'Admin')
  with check (private.admin_role() = 'Admin');

-- 3. Staff invites. A new hire doesn't have an admin_users row (and thus no way to
-- pass the /admin guard) until they exist in auth.users — so an Admin invites by
-- email first, and a trigger promotes the matching account the moment they sign up.
create table if not exists public.admin_invites (
  email text primary key,
  role text not null check (role in ('Admin', 'Agent', 'Lecture seule')),
  invited_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.admin_invites enable row level security;

create policy "Admin can manage invites"
  on public.admin_invites for all
  to authenticated
  using (private.admin_role() = 'Admin')
  with check (private.admin_role() = 'Admin');

create or replace function private.handle_new_user_admin_invite()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  matched public.admin_invites%rowtype;
begin
  select * into matched from public.admin_invites where email = new.email;
  if found then
    insert into public.admin_users (id, name, email, role, active)
    values (new.id, coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)), new.email, matched.role, true)
    on conflict (id) do nothing;
    delete from public.admin_invites where email = new.email;
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_admin_invite on auth.users;
create trigger on_auth_user_created_admin_invite
  after insert on auth.users
  for each row execute function private.handle_new_user_admin_invite();

-- 4. Product categories — public read (the quote form and landing page need them),
-- staff-only write.
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  label text not null,
  slug text not null unique,
  placeholder_label text,
  sort_order int not null default 0,
  active boolean not null default true
);

alter table public.categories enable row level security;

create policy "Anyone can view active categories"
  on public.categories for select
  to anon, authenticated
  using (active);

create policy "Staff can view all categories"
  on public.categories for select
  to authenticated
  using (private.is_admin_user());

create policy "Admin and Agent can manage categories"
  on public.categories for all
  to authenticated
  using (private.admin_role() in ('Admin', 'Agent'))
  with check (private.admin_role() in ('Admin', 'Agent'));

insert into public.categories (label, slug, placeholder_label, sort_order) values
  ('Véhicules', 'vehicules', 'Véhicules', 1),
  ('Alimentation', 'alimentation', 'Alimentation', 2),
  ('Habillement', 'habillement', 'Habillement', 3),
  ('Autre', 'autre', 'Sourcing sur-mesure', 4)
on conflict (slug) do nothing;

-- 5. Multilingual content blocks — public read, staff-only write. Seeded with a
-- handful of the landing page's real copy as a working example of the mechanism;
-- the public site doesn't consume this table yet (still static copy) — that wiring
-- is a follow-up once the module itself is validated.
create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  key text not null,
  locale text not null check (locale in ('fr', 'en', 'es')),
  value text not null,
  unique (key, locale)
);

alter table public.site_content enable row level security;

create policy "Anyone can view site content"
  on public.site_content for select
  to anon, authenticated
  using (true);

create policy "Admin and Agent can manage site content"
  on public.site_content for all
  to authenticated
  using (private.admin_role() in ('Admin', 'Agent'))
  with check (private.admin_role() in ('Admin', 'Agent'));

insert into public.site_content (key, locale, value) values
  ('hero.eyebrow', 'fr', 'SOURCING & LOGISTIQUE INTERNATIONALE'),
  ('hero.eyebrow', 'en', 'INTERNATIONAL SOURCING & LOGISTICS'),
  ('hero.eyebrow', 'es', 'SOURCING Y LOGÍSTICA INTERNACIONAL'),
  ('hero.title', 'fr', 'Développons votre business à l''international avec un partenaire de confiance'),
  ('hero.title', 'en', 'Grow your business internationally with a trusted partner'),
  ('hero.title', 'es', 'Haga crecer su negocio a nivel internacional con un socio de confianza'),
  ('footer.tagline', 'fr', 'Courtage et sourcing international — véhicules, agroalimentaire, textile, électronique.'),
  ('footer.tagline', 'en', 'International brokerage and sourcing — vehicles, agrifood, textile, electronics.'),
  ('footer.tagline', 'es', 'Corretaje y sourcing internacional — vehículos, agroalimentario, textil, electrónica.')
on conflict (key, locale) do nothing;

-- 6. Site settings — a small fixed set of public key/value pairs (contact info etc.),
-- public read, staff-only update. No insert/delete from the client: the key set is
-- fixed and seeded here.
create table if not exists public.site_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

create policy "Anyone can view site settings"
  on public.site_settings for select
  to anon, authenticated
  using (true);

create policy "Admin and Agent can update site settings"
  on public.site_settings for update
  to authenticated
  using (private.admin_role() in ('Admin', 'Agent'))
  with check (private.admin_role() in ('Admin', 'Agent'));

insert into public.site_settings (key, value) values
  ('phone', '56 9 12567898'),
  ('whatsapp', '+56 9 123 456'),
  ('hours', 'Lun-Sam 08:00 - 20:00'),
  ('contact_email', 'contact@wiihappy.com')
on conflict (key) do nothing;

-- 7. Notifications — a shared staff feed (not per-user targeted), auto-populated
-- whenever a new devis comes in.
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  type text not null default 'devis_nouveau',
  title text not null,
  body text,
  devis_id uuid references public.devis(id) on delete cascade,
  read boolean not null default false
);

alter table public.notifications enable row level security;

create policy "Staff can view notifications"
  on public.notifications for select
  to authenticated
  using (private.is_admin_user());

create policy "Staff can mark notifications read"
  on public.notifications for update
  to authenticated
  using (private.is_admin_user())
  with check (private.is_admin_user());

create or replace function private.notify_new_devis()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.notifications (type, title, body, devis_id)
  values ('devis_nouveau', 'Nouveau devis', new.name || ' — ' || new.op_type || ' / ' || new.category, new.id);
  return new;
end;
$$;

drop trigger if exists on_devis_created_notify on public.devis;
create trigger on_devis_created_notify
  after insert on public.devis
  for each row execute function private.notify_new_devis();

-- Wiihappy Gen — email notifications (Resend, via Edge Functions)
--
-- Two Edge Functions (supabase/functions/): send-devis-notification (new devis email)
-- and check-stale-devis (24h-unactioned alert, run hourly by pg_cron below). Both
-- need the RESEND_API_KEY secret set on the project (Project Settings > Edge
-- Functions > Secrets) before mail actually sends — see supabase/functions/README.md.
--
-- Postgres calls both functions over HTTP via pg_net, authenticated with the
-- project's anon key (public by design — it's already shipped in the client bundle;
-- verify_jwt=true on the functions just confirms the caller holds *a* valid
-- Supabase-issued token, not that it's privileged). Each function then uses its own
-- auto-injected SUPABASE_SERVICE_ROLE_KEY to read/write devis with the access it
-- actually needs — no extra secret had to be minted or stored for that hop.

create extension if not exists pg_net with schema extensions;
create extension if not exists pg_cron with schema extensions;

-- 1. Track whether a "still unactioned after 24h" alert has already fired for a
-- devis, so the hourly cron doesn't re-alert on the same one every run.
alter table public.devis add column if not exists stale_alert_sent_at timestamptz;

-- 2. New devis -> email the team immediately.
create or replace function private.trigger_devis_email_notification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform net.http_post(
    url := 'https://khgrbjrrgpjzchxobvty.supabase.co/functions/v1/send-devis-notification',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoZ3JianJyZ3BqemNoeG9idnR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzOTI5NjMsImV4cCI6MjEwMzk2ODk2M30.2fDSKCrM9fxM16zsDdNjYiu1f2BKBJ4Udj6ekARMNo0'
    ),
    body := jsonb_build_object('devis_id', new.id)
  );
  return new;
end;
$$;

drop trigger if exists on_devis_created_email on public.devis;
create trigger on_devis_created_email
  after insert on public.devis
  for each row execute function private.trigger_devis_email_notification();

-- 3. Hourly: ask check-stale-devis to look for anything left untouched 24h+ and
-- alert on it. The function itself is idempotent (stale_alert_sent_at guards
-- against repeat alerts) — this just needs to run often enough that "24h+" is
-- caught reasonably promptly, not exactly on the hour.
select cron.schedule(
  'check-stale-devis-hourly',
  '0 * * * *',
  $$
  select net.http_post(
    url := 'https://khgrbjrrgpjzchxobvty.supabase.co/functions/v1/check-stale-devis',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoZ3JianJyZ3BqemNoeG9idnR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzOTI5NjMsImV4cCI6MjEwMzk2ODk2M30.2fDSKCrM9fxM16zsDdNjYiu1f2BKBJ4Udj6ekARMNo0'
    ),
    body := '{}'::jsonb
  );
  $$
);

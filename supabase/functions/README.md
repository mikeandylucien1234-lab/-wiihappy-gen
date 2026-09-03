# Edge Functions — email notifications

Two functions, both deployed and wired to the database already:

- **send-devis-notification** — called by a trigger on `public.devis` (AFTER
  INSERT). Emails the team as soon as a devis is submitted.
- **check-stale-devis** — called hourly by a `pg_cron` job. Emails the team
  once per devis when it's been `nouveau` for more than 24h, then marks it
  (`stale_alert_sent_at`) so it doesn't re-alert every hour.

Both send through [Resend](https://resend.com) to **contact@wiihappy.com**,
from `notifications@wiihappy.com`.

## Required setup: the RESEND_API_KEY secret

Neither function can send mail yet — confirmed by inserting a real devis and
reading back `net._http_response`: the trigger fired, the HTTP call reached
the function, the function ran and hit `RESEND_API_KEY is not configured for
this project`. Everything else works; only the key is missing.

Set it once, project-wide (both functions read the same secret):

```
supabase secrets set RESEND_API_KEY=re_xxxxxxxx --project-ref khgrbjrrgpjzchxobvty
```

Or in the dashboard: **Project Settings → Edge Functions → Secrets**.

Since `notifications@wiihappy.com` is the From address, the `wiihappy.com`
domain needs to be verified in Resend (Domains → wiihappy.com → DNS records)
or sends will fail/land in spam.

## Why Postgres can call these without a stored secret

Both functions are deployed with `verify_jwt = true` (the default). The
`pg_net.http_post` calls from the trigger and the cron job authenticate with
the project's **anon key** — that's fine because it's already public (shipped
in the client bundle); `verify_jwt` only confirms the caller holds *some*
valid Supabase-issued token, not that it's privileged. Each function then
uses its own auto-injected `SUPABASE_SERVICE_ROLE_KEY` (every Edge Function
gets one automatically, no setup needed) to actually read/write `devis`.

## Testing after setting the key

```sql
insert into public.devis (op_type, name, category, description, transport, status)
values ('Import', 'Test', 'Véhicules', 'test', 'Maritime', 'nouveau');

select status_code, content, created
from net._http_response
order by created desc limit 1;
```

`status_code` should be `200` instead of `500`, and the email should land at
contact@wiihappy.com within a few seconds. Delete the test row afterward.

To manually trigger the stale-devis check without waiting for the cron:

```sql
select net.http_post(
  url := 'https://khgrbjrrgpjzchxobvty.supabase.co/functions/v1/check-stale-devis',
  headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer <anon key>'),
  body := '{}'::jsonb
);
```

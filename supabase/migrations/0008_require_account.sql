-- Require an account to submit a devis, call reservation, or callback request.
-- Previously these were open to anon inserts; now only authenticated users can write.

drop policy if exists "Anonymous can submit a devis without an account" on public.devis;

drop policy if exists "Anyone can request a call reservation" on public.reservations;
create policy "Authenticated users can request a call reservation"
  on public.reservations for insert
  to authenticated
  with check (true);

drop policy if exists "Anyone can request a callback" on public.callback_requests;
create policy "Authenticated users can request a callback"
  on public.callback_requests for insert
  to authenticated
  with check (true);

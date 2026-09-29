-- EnglishRule: progressi di studio per utente.
-- Eseguire una volta nel SQL Editor del progetto Supabase.

create table if not exists public.progress (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  doc        jsonb       not null default '{}'::jsonb,
  version    bigint      not null default 1,
  updated_at timestamptz not null default now()
);

-- aggiorna updated_at a ogni scrittura
create or replace function public.touch_progress() returns trigger
language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists progress_touch on public.progress;
create trigger progress_touch before update on public.progress
  for each row execute function public.touch_progress();

-- ogni utente vede e modifica solo la propria riga
alter table public.progress enable row level security;

drop policy if exists "progress_select_own" on public.progress;
create policy "progress_select_own" on public.progress
  for select using (auth.uid() = user_id);

drop policy if exists "progress_insert_own" on public.progress;
create policy "progress_insert_own" on public.progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "progress_update_own" on public.progress;
create policy "progress_update_own" on public.progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- aggiornamenti in tempo reale tra dispositivi aperti contemporaneamente
do $$
begin
  alter publication supabase_realtime add table public.progress;
exception when duplicate_object then null;
end $$;

-- Rafforzamenti (vedi migrations/20260930000000_hardening.sql per il dettaglio)
alter table public.progress drop constraint if exists progress_doc_is_object;
alter table public.progress add constraint progress_doc_is_object check (jsonb_typeof(doc) = 'object');
alter table public.progress drop constraint if exists progress_doc_size;
alter table public.progress add constraint progress_doc_size check (pg_column_size(doc) <= 1048576);

create or replace function public.progress_guard() returns trigger
language plpgsql as $$
begin
  if new.user_id <> old.user_id then raise exception 'user_id non modificabile'; end if;
  if new.version <= old.version then raise exception 'la versione deve aumentare'; end if;
  return new;
end $$;
drop trigger if exists progress_guard on public.progress;
create trigger progress_guard before update on public.progress
  for each row execute function public.progress_guard();

revoke all on public.progress from anon;

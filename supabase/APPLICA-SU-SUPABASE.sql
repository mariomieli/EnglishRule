-- EnglishRule: da incollare UNA VOLTA nel SQL Editor di Supabase (Run). Contiene le due migrazioni, nell'ordine.
-- Prima un controllo: nessuna riga di 'progress' deve superare 1 MB (altrimenti il vincolo fallirebbe).
-- select user_id, pg_column_size(doc) from public.progress where pg_column_size(doc) > 1048576;

-- Rafforzamento della tabella progress (da eseguire nel SQL Editor di Supabase).
-- Verificato dall'esterno prima di questa migrazione: con la sola chiave pubblica non si legge nulla
-- e non si può scrivere (le policy RLS reggono). Qui si aggiungono limiti di forma e di dimensione.

-- il documento deve essere un oggetto JSON di dimensione ragionevole (un utente non può riempire il database)
alter table public.progress drop constraint if exists progress_doc_is_object;
alter table public.progress add constraint progress_doc_is_object check (jsonb_typeof(doc) = 'object');

alter table public.progress drop constraint if exists progress_doc_size;
alter table public.progress add constraint progress_doc_size check (pg_column_size(doc) <= 1048576);

-- la versione può solo crescere (il controllo ottimistico di concorrenza dell'app si basa su questo)
create or replace function public.progress_guard() returns trigger
language plpgsql as $$
begin
  if new.user_id <> old.user_id then
    raise exception 'user_id non modificabile';
  end if;
  if new.version <= old.version then
    raise exception 'la versione deve aumentare';
  end if;
  return new;
end $$;

drop trigger if exists progress_guard on public.progress;
create trigger progress_guard before update on public.progress
  for each row execute function public.progress_guard();

-- difesa in profondità: gli utenti non autenticati non hanno alcun permesso sulla tabella
revoke all on public.progress from anon;

-- ============================================================

-- Statistiche anonime di utilizzo (da eseguire nel SQL Editor di Supabase).
-- Principi: nessun identificativo di utente o dispositivo, nessun cookie, nessun testo libero.
-- Il client invia solo nome dell'evento e pochi numeri (lezione, indice esercizio, punteggio).
-- Chiunque può INSERIRE; nessuno può LEGGERE dall'API pubblica: si consulta dal dashboard di Supabase.

create table if not exists public.events (
  id      bigint generated always as identity primary key,
  at      timestamptz not null default now(),
  session text        not null check (char_length(session) between 4 and 24), -- casuale, vive solo finché la pagina è aperta
  name    text        not null check (name in (
            'onboarding_done', 'lesson_start', 'lesson_done', 'session_abandon',
            'exercise_wrong', 'placement_done', 'review_start', 'review_done', 'answer_disputed')),
  props   jsonb       not null default '{}'::jsonb
          check (jsonb_typeof(props) = 'object' and pg_column_size(props) <= 512),
  app     text        check (char_length(app) <= 20)
);

alter table public.events enable row level security;

drop policy if exists "events_insert_anyone" on public.events;
create policy "events_insert_anyone" on public.events
  for insert to anon, authenticated with check (true);

-- nessuna policy di lettura, e nessun permesso oltre all'inserimento
revoke all on public.events from anon, authenticated;
grant insert on public.events to anon, authenticated;

create index if not exists events_name_at_idx on public.events (name, at desc);

-- Dove si bloccano gli utenti: avvii, completamenti e abbandoni per lezione (ultimi 90 giorni).
create or replace view public.events_lesson_funnel as
select
  props->>'lesson' as lesson,
  count(*) filter (where name = 'lesson_start')     as avvii,
  count(*) filter (where name = 'lesson_done')      as completate,
  count(*) filter (where name = 'session_abandon')  as abbandonate,
  round(100.0 * count(*) filter (where name = 'session_abandon')
        / nullif(count(*) filter (where name = 'lesson_start'), 0)) as abbandono_pct,
  round(avg((props->>'score')::numeric) filter (where name = 'lesson_done')) as punteggio_medio
from public.events
where at > now() - interval '90 days' and props ? 'lesson'
group by 1
order by abbandono_pct desc nulls last;

-- Esercizi che sbagliano più spesso (utile per correggere esercizi ambigui).
create or replace view public.events_hard_exercises as
select props->>'lesson' as lesson, (props->>'index')::int as esercizio, props->>'type' as tipo, count(*) as errori
from public.events
where name = 'exercise_wrong' and at > now() - interval '90 days'
group by 1, 2, 3
order by errori desc
limit 100;

revoke all on public.events_lesson_funnel, public.events_hard_exercises from anon, authenticated;

-- Conservazione: cancellare gli eventi più vecchi di 180 giorni (da schedulare, es. con pg_cron):
--   delete from public.events where at < now() - interval '180 days';

-- Risposte scritte che l'utente ritiene giuste anche se il confronto le ha rifiutate: servono a
-- scoprire le varianti valide da aggiungere agli esercizi di traduzione e correzione.
create or replace view public.events_disputed_answers as
select props->>'lesson' as lesson, (props->>'index')::int as esercizio, props->>'type' as tipo, count(*) as contestazioni
from public.events
where name = 'answer_disputed' and at > now() - interval '90 days'
group by 1, 2, 3
order by contestazioni desc
limit 100;

revoke all on public.events_disputed_answers from anon, authenticated;

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
            'exercise_wrong', 'placement_done', 'review_start', 'review_done')),
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

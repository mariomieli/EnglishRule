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

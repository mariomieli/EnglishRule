import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { mergeDocs, sameDoc, sanitize, type Doc } from './doc';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** null se il cloud non è configurato: l'app funziona solo in locale. */
export const supabase: SupabaseClient | null = url && key ? createClient(url, key, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }) : null;

/** Provider di login attivi, letti dalla configurazione di Supabase: attivare Google non richiede un nuovo deploy. */
let providers: Promise<{ google: boolean }> | null = null;
export function authProviders() {
  providers ??= fetch(`${url}/auth/v1/settings`, { headers: { apikey: key! } })
    .then((r) => r.json())
    .then((s) => ({ google: !!s?.external?.google || import.meta.env.VITE_AUTH_GOOGLE === 'true' }))
    .catch(() => ({ google: import.meta.env.VITE_AUTH_GOOGLE === 'true' }));
  return providers;
}

/** URL a cui tornare dopo conferma email, reset password o login Google. */
export const redirectUrl = () => `${window.location.origin}${import.meta.env.BASE_URL}account`;

interface Row {
  doc: unknown;
  version: number;
}

async function pull(userId: string): Promise<Row | null> {
  const { data, error } = await supabase!.from('progress').select('doc, version').eq('user_id', userId).maybeSingle();
  if (error) throw error;
  return data as Row | null;
}

/**
 * Sincronizza il documento locale con quello nel cloud.
 * Controllo di concorrenza ottimistico: si scrive solo se la versione nel cloud è ancora
 * quella letta; se un altro dispositivo ha scritto nel frattempo si rilegge, si fonde e si riprova.
 * Poiché la fusione non perde mai dati, nessun aggiornamento concorrente viene sovrascritto.
 * Restituisce il documento fuso da applicare in locale.
 */
export async function syncDoc(userId: string, local: Doc): Promise<Doc> {
  for (let attempt = 0; attempt < 6; attempt++) {
    const row = await pull(userId);
    const remote = row ? sanitize(row.doc) : null;
    const merged = remote ? mergeDocs(local, remote) : local;
    if (remote && sameDoc(merged, remote)) return merged; // il cloud contiene già tutto

    if (!row) {
      const { error } = await supabase!.from('progress').insert({ user_id: userId, doc: merged, version: 1 });
      if (!error) return merged;
      if (error.code === '23505') continue; // un altro dispositivo ha creato la riga ora: riprova
      throw error;
    }

    const { data, error } = await supabase!
      .from('progress')
      .update({ doc: merged, version: row.version + 1 })
      .eq('user_id', userId)
      .eq('version', row.version)
      .select('version');
    if (error) throw error;
    if (data && data.length) return merged;
    // conflitto di versione: qualcun altro ha scritto, riproviamo con i dati aggiornati
    await new Promise((r) => setTimeout(r, 150 * (attempt + 1) + Math.random() * 200));
  }
  throw new Error('Sincronizzazione non riuscita dopo vari tentativi');
}

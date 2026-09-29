/**
 * Statistiche anonime di utilizzo.
 * - Nessun cookie e nessun identificativo salvato: l'id di sessione è casuale e vive solo in memoria.
 * - Nessun testo libero: solo nome dell'evento e pochi numeri (lezione, indice esercizio, punteggio).
 * - Rispetta "Do Not Track" e "Global Privacy Control"; l'utente può disattivarle dal profilo.
 * - Se il cloud non è configurato non parte nessuna richiesta.
 * Gli eventi vanno nella tabella `events` di Supabase (vedi supabase/migrations/…_events.sql).
 */

export type EventName = 'onboarding_done' | 'lesson_start' | 'lesson_done' | 'session_abandon' | 'exercise_wrong' | 'placement_done' | 'review_start' | 'review_done';
export type EventProps = Record<string, string | number | boolean>;

interface Row {
  session: string;
  name: EventName;
  props: EventProps;
  app: string;
}

const OPT_KEY = 'er-analytics';
const MAX_QUEUE = 30;
const MAX_PER_SESSION = 300;
const FLUSH_MS = 8000;

const url = import.meta.env?.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env?.VITE_SUPABASE_ANON_KEY as string | undefined;

let cfg = { url, key, app: 'web-1' };
let queue: Row[] = [];
let sent = 0;
let timer: ReturnType<typeof setTimeout> | undefined;
const session = Math.random().toString(36).slice(2, 12);

/** Solo per i test: sostituisce la configurazione e azzera lo stato. */
export function _configure(c: Partial<typeof cfg>) {
  cfg = { ...cfg, ...c };
  queue = [];
  sent = 0;
  clearTimeout(timer);
  timer = undefined;
}

const read = (): string | null => {
  try {
    return localStorage.getItem(OPT_KEY);
  } catch {
    return null;
  }
};

/** Il browser chiede di non essere tracciato? */
export function browserSaysNo(): boolean {
  const nav = typeof navigator === 'undefined' ? undefined : (navigator as Navigator & { globalPrivacyControl?: boolean; msDoNotTrack?: string });
  return !!nav && (nav.doNotTrack === '1' || nav.msDoNotTrack === '1' || nav.globalPrivacyControl === true);
}

export const analyticsEnabled = () => !!cfg.url && !!cfg.key && read() !== 'off' && !browserSaysNo();

export function setAnalytics(on: boolean) {
  try {
    if (on) localStorage.removeItem(OPT_KEY);
    else localStorage.setItem(OPT_KEY, 'off');
  } catch {
    /* ignora */
  }
  if (!on) queue = [];
}

/** Tiene solo valori semplici e corti: niente testo libero può finire negli eventi. */
export function cleanProps(p: EventProps): EventProps {
  const out: EventProps = {};
  for (const [k, v] of Object.entries(p).slice(0, 8)) {
    if (typeof v === 'number' && Number.isFinite(v)) out[k] = v;
    else if (typeof v === 'boolean') out[k] = v;
    else if (typeof v === 'string') out[k] = v.slice(0, 40);
  }
  return out;
}

export async function flush() {
  clearTimeout(timer);
  timer = undefined;
  if (!queue.length || !cfg.url || !cfg.key) return;
  const batch = queue;
  queue = [];
  try {
    await fetch(`${cfg.url}/rest/v1/events`, {
      method: 'POST',
      headers: { apikey: cfg.key, Authorization: `Bearer ${cfg.key}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify(batch),
      keepalive: true,
    });
  } catch {
    /* le statistiche non devono mai disturbare l'app: se falliscono si perdono */
  }
}

export function track(name: EventName, props: EventProps = {}) {
  if (!analyticsEnabled() || sent >= MAX_PER_SESSION) return;
  sent++;
  queue.push({ session, name, props: cleanProps(props), app: cfg.app });
  if (queue.length >= MAX_QUEUE) void flush();
  else timer ??= setTimeout(() => void flush(), FLUSH_MS);
}

if (typeof document !== 'undefined') {
  // chiusura o cambio scheda: si spedisce ciò che resta
  document.addEventListener('visibilitychange', () => document.visibilityState === 'hidden' && void flush());
}

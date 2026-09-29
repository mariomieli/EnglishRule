/**
 * Documento dei progressi sincronizzabile tra dispositivi.
 *
 * Ogni campo ha una regola di fusione (merge) commutativa, associativa e idempotente:
 * due dispositivi possono lavorare offline in parallelo e, comunque si incrocino le
 * sincronizzazioni, il risultato finale è lo stesso e non si perde nulla.
 *
 * - xp: contatore per giorno e per dispositivo (G-counter). Il totale è la somma:
 *   gli XP fatti su due telefoni nello stesso giorno si sommano, mai contati due volte.
 * - completed / seen: massimo (miglior punteggio, stelle, volte visto).
 * - mistakes: ogni errore ha data di registrazione e data di "risolto";
 *   vince l'evento più recente (un errore risolto su un dispositivo sparisce anche sugli altri).
 * - srs: ripetizione dilazionata per esercizio; vince l'ultima risposta (last-writer-wins).
 * - theoryRead: unione.
 * - impostazioni: vince la modifica più recente (last-writer-wins) campo per campo.
 */
import type { LevelId } from '../../data/types';

export type Theme = 'dark' | 'light';
/** Preferenza dell'utente: 'system' segue il tema del dispositivo. */
export type ThemePref = Theme | 'system';

export interface LessonProgress {
  best: number; // percentuale 0-100
  stars: number; // 0-3
  attempts: number;
  lastAt: number;
}

export interface MistakeEntry {
  lessonId: string;
  index: number;
  count: number;
  at: number; // ultima volta sbagliato
  cleared?: number; // ultima volta risolto
}

/** Scheda di ripetizione dilazionata (Leitner) di un singolo esercizio. */
export interface SrsCard {
  lessonId: string;
  index: number;
  step: number; // scatola 0..SRS_DAYS.length-1
  due: number; // ms: da quando va ripassato
  at: number; // ultima risposta
}

/** Giorni di attesa per scatola: sbagliato = 0 (subito), poi 1, 3, 7, 14, 30, 60, 120. */
export const SRS_DAYS = [0, 1, 3, 7, 14, 30, 60, 120];
const DAY_MS = 86400000;

export function nextSrs(prev: SrsCard | undefined, lessonId: string, index: number, ok: boolean, now: number): SrsCard {
  const step = ok ? Math.min((prev?.step ?? 0) + 1, SRS_DAYS.length - 1) : 0;
  return { lessonId, index, step, due: now + SRS_DAYS[step] * DAY_MS, at: Math.max(now, (prev?.at ?? 0) + 1) };
}

export const isDue = (c: SrsCard, now: number) => c.due <= now;

export interface Settings {
  theme: ThemePref;
  sound: boolean;
  dailyGoal: number;
  placement: LevelId | null;
}

export type Stamped<T> = { v: T; at: number };

export interface Doc {
  epoch?: number; // data dell'ultimo "azzera progressi": i dati di epoche precedenti vengono scartati
  completed: Record<string, LessonProgress>;
  speaking?: Record<string, LessonProgress>; // scenari di conversazione
  srs?: Record<string, SrsCard>; // ripetizione dilazionata, chiave "lezione#indice"
  theoryRead: Record<string, number>;
  mistakes: Record<string, MistakeEntry>;
  seen: Record<string, Record<string, number>>;
  xp: Record<string, Record<string, number>>; // giorno -> dispositivo -> XP
  settings: { [K in keyof Settings]?: Stamped<Settings[K]> };
}

export const DEFAULT_SETTINGS: Settings = { theme: 'system', sound: true, dailyGoal: 50, placement: null };

export const emptyDoc = (): Doc => ({ completed: {}, theoryRead: {}, mistakes: {}, seen: {}, xp: {}, settings: {} });

const keys = (...objs: (object | undefined)[]) => [...new Set(objs.flatMap((o) => (o ? Object.keys(o) : [])))];
const max = (a?: number, b?: number) => Math.max(a ?? 0, b ?? 0);

function mergeMap<T>(a: Record<string, T> | undefined, b: Record<string, T> | undefined, f: (x: T | undefined, y: T | undefined) => T): Record<string, T> {
  const out: Record<string, T> = {};
  for (const k of keys(a, b).sort()) out[k] = f(a?.[k], b?.[k]);
  return out;
}

/** Ordine totale deterministico per rompere i pareggi. */
const stable = (x: unknown) => JSON.stringify(x);

function lww<T>(a?: Stamped<T>, b?: Stamped<T>): Stamped<T> | undefined {
  if (!a) return b;
  if (!b) return a;
  if (a.at !== b.at) return a.at > b.at ? a : b;
  return stable(a.v) >= stable(b.v) ? a : b;
}

export function mergeDocs(a: Doc, b: Doc): Doc {
  // un azzeramento più recente vince su tutto ciò che è stato fatto prima
  if ((a.epoch ?? 0) !== (b.epoch ?? 0)) return (a.epoch ?? 0) > (b.epoch ?? 0) ? a : b;
  const settings: Doc['settings'] = {};
  for (const k of keys(a.settings, b.settings).sort() as (keyof Settings)[]) {
    const v = lww(a.settings?.[k] as Stamped<unknown> | undefined, b.settings?.[k] as Stamped<unknown> | undefined);
    if (v) (settings as Record<string, Stamped<unknown>>)[k] = v;
  }
  const progress = (x?: LessonProgress, y?: LessonProgress): LessonProgress => ({
    best: max(x?.best, y?.best),
    stars: max(x?.stars, y?.stars),
    attempts: max(x?.attempts, y?.attempts),
    lastAt: max(x?.lastAt, y?.lastAt),
  });
  const out: Doc = {
    completed: mergeMap(a.completed, b.completed, progress),
    theoryRead: mergeMap(a.theoryRead, b.theoryRead, (x, y) => max(x, y)),
    mistakes: mergeMap(a.mistakes, b.mistakes, (x, y) => {
      const base = (x ?? y)!;
      const cleared = max(x?.cleared, y?.cleared);
      const m: MistakeEntry = { lessonId: base.lessonId, index: base.index, count: max(x?.count, y?.count), at: max(x?.at, y?.at) };
      if (cleared) m.cleared = cleared;
      return m;
    }),
    seen: mergeMap(a.seen, b.seen, (x, y) => mergeMap(x, y, (p, q) => max(p, q))),
    xp: mergeMap(a.xp, b.xp, (x, y) => mergeMap(x, y, (p, q) => max(p, q))),
    settings,
  };
  if (a.speaking || b.speaking) out.speaking = mergeMap(a.speaking, b.speaking, progress);
  if (a.srs || b.srs)
    out.srs = mergeMap(a.srs, b.srs, (x, y) => {
      if (!x) return y!;
      if (!y) return x;
      if (x.at !== y.at) return x.at > y.at ? x : y;
      return stable(x) >= stable(y) ? x : y;
    });
  if (a.epoch) out.epoch = a.epoch; // epoche uguali: stesso valore da entrambi i lati
  return out;
}

/** Uguaglianza strutturale indipendente dall'ordine delle chiavi. */
export function sameDoc(a: Doc, b: Doc) {
  return canonical(a) === canonical(b);
}

export function canonical(x: unknown): string {
  if (Array.isArray(x)) return `[${x.map(canonical).join(',')}]`;
  if (x && typeof x === 'object')
    return `{${Object.keys(x)
      .filter((k) => (x as Record<string, unknown>)[k] !== undefined)
      .sort()
      .map((k) => `${JSON.stringify(k)}:${canonical((x as Record<string, unknown>)[k])}`)
      .join(',')}}`;
  return JSON.stringify(x);
}

/** Rende sicuro un documento letto da storage o rete (campi mancanti o di tipo errato). */
export function sanitize(raw: unknown): Doc {
  const d = emptyDoc();
  if (!raw || typeof raw !== 'object') return d;
  const r = raw as Partial<Doc>;
  const obj = <T,>(x: T | undefined) => (x && typeof x === 'object' && !Array.isArray(x) ? x : undefined);
  const out: Doc = {
    completed: obj(r.completed) ?? d.completed,
    theoryRead: obj(r.theoryRead) ?? d.theoryRead,
    mistakes: obj(r.mistakes) ?? d.mistakes,
    seen: obj(r.seen) ?? d.seen,
    xp: obj(r.xp) ?? d.xp,
    settings: obj(r.settings) ?? d.settings,
  };
  if (obj(r.speaking)) out.speaking = r.speaking;
  if (obj(r.srs)) out.srs = r.srs;
  if (typeof r.epoch === "number" && r.epoch > 0) out.epoch = r.epoch;
  return out;
}

/* ---------------- Valori derivati ---------------- */

export const isActiveMistake = (m: MistakeEntry) => !m.cleared || m.at > m.cleared;

export function settingsOf(d: Doc): Settings {
  return {
    theme: d.settings.theme?.v ?? DEFAULT_SETTINGS.theme,
    sound: d.settings.sound?.v ?? DEFAULT_SETTINGS.sound,
    dailyGoal: d.settings.dailyGoal?.v ?? DEFAULT_SETTINGS.dailyGoal,
    placement: d.settings.placement?.v ?? DEFAULT_SETTINGS.placement,
  };
}

export function xpByDay(d: Doc): Record<string, number> {
  const out: Record<string, number> = {};
  for (const [day, dev] of Object.entries(d.xp)) out[day] = Object.values(dev).reduce((a, n) => a + n, 0);
  return out;
}

const dayNum = (day: string) => Math.round(new Date(day + 'T12:00:00Z').getTime() / 86400000);

/** Serie di giorni consecutivi calcolata dai giorni con XP: sempre coerente tra dispositivi. */
export function streakOf(byDay: Record<string, number>): { count: number; last: string | null; best: number } {
  const days = Object.keys(byDay)
    .filter((k) => byDay[k] > 0 && k !== '1970-01-01')
    .sort();
  if (!days.length) return { count: 0, last: null, best: 0 };
  let best = 1;
  let run = 1;
  for (let i = 1; i < days.length; i++) {
    run = dayNum(days[i]) - dayNum(days[i - 1]) === 1 ? run + 1 : 1;
    best = Math.max(best, run);
  }
  return { count: run, last: days[days.length - 1], best };
}

/* ---------------- Migrazione dal vecchio formato locale ---------------- */

interface LegacyState {
  xp?: number;
  completed?: Record<string, LessonProgress>;
  theoryRead?: Record<string, true>;
  mistakes?: Record<string, { lessonId: string; index: number; count: number; at: number }>;
  seen?: Record<string, Record<string, number>>;
  xpByDay?: Record<string, number>;
  dailyGoal?: number;
  theme?: Theme;
  sound?: boolean;
  placement?: LevelId | null;
}

export function fromLegacy(s: LegacyState, deviceId: string, now = Date.now()): Doc {
  const d = emptyDoc();
  d.completed = s.completed ?? {};
  for (const k of Object.keys(s.theoryRead ?? {})) d.theoryRead[k] = now;
  for (const [k, m] of Object.entries(s.mistakes ?? {})) d.mistakes[k] = { ...m };
  d.seen = s.seen ?? {};
  for (const [day, n] of Object.entries(s.xpByDay ?? {})) d.xp[day] = { [deviceId]: n };
  // XP senza giorno (non dovrebbe succedere): li attribuiamo a un giorno fittizio per non perderli
  const counted = Object.values(s.xpByDay ?? {}).reduce((a, n) => a + n, 0);
  if ((s.xp ?? 0) > counted) d.xp['1970-01-01'] = { [deviceId]: (s.xp ?? 0) - counted };
  if (s.theme) d.settings.theme = { v: s.theme, at: 1 };
  if (s.sound !== undefined) d.settings.sound = { v: s.sound, at: 1 };
  if (s.dailyGoal) d.settings.dailyGoal = { v: s.dailyGoal, at: 1 };
  if (s.placement) d.settings.placement = { v: s.placement, at: 1 };
  return d;
}

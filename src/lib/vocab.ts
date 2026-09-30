import type { LevelId } from '../data/types';
import { flatten, type VocabWord } from '../data/vocab/types';
import { isDue, type SrsCard } from './sync/doc';
import { looseKey, shuffle } from './utils';

export const VOCAB_LEVELS: LevelId[] = ['A1', 'A2', 'B1'];
export const NEW_PER_DAY = 5;
export const MAX_REVIEWS = 15;

const cache: Partial<Record<LevelId, Promise<VocabWord[]>>> = {};

/** Le parole di un livello si scaricano solo quando servono. */
export function loadVocab(level: LevelId): Promise<VocabWord[]> {
  cache[level] ??=
    level === 'A1'
      ? import('../data/vocab/a1').then((m) => flatten('A1', m.A1_THEMES))
      : level === 'A2'
        ? import('../data/vocab/a2').then((m) => flatten('A2', m.A2_THEMES))
        : import('../data/vocab/b1').then((m) => flatten('B1', m.B1_THEMES));
  return cache[level]!;
}

/** Il suggerimento tra parentesi (es. "cold (illness)") si mostra ma non si legge ad alta voce né si digita. */
export const spoken = (en: string) => en.replace(/\s*\(.*?\)\s*/g, ' ').trim();

export type Kind = 'to-it' | 'to-en' | 'type';

export interface Item {
  word: VocabWord;
  isNew: boolean;
  kind: Kind;
  options: string[]; // solo per le scelte
}

export type Status = 'new' | 'learning' | 'known';

export const statusOf = (c?: SrsCard): Status => (!c ? 'new' : c.step >= 3 ? 'known' : 'learning');

const startOfDay = (now: number) => {
  const d = new Date(now);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

/** Parole nuove già iniziate oggi (su qualsiasi dispositivo). */
export const introducedToday = (cards: Record<string, SrsCard>, now = Date.now()) => Object.values(cards).filter((c) => (c.since ?? 0) >= startOfDay(now)).length;

export function overview(words: VocabWord[], cards: Record<string, SrsCard>, now = Date.now()) {
  let known = 0;
  let learning = 0;
  let due = 0;
  for (const w of words) {
    const c = cards[w.id];
    if (!c) continue;
    if (statusOf(c) === 'known') known++;
    else learning++;
    if (isDue(c, now)) due++;
  }
  const fresh = words.length - known - learning;
  const quota = Math.max(0, NEW_PER_DAY - introducedToday(cards, now));
  return { known, learning, due, fresh, newToday: Math.min(quota, fresh), total: words.length };
}

const kindFor = (c?: SrsCard): Kind => ((c?.streak ?? 0) >= 3 ? 'type' : (c?.streak ?? 0) >= 1 ? 'to-en' : 'to-it');

export function optionsFor(word: VocabWord, words: VocabWord[], kind: Kind, seed: number): string[] {
  if (kind === 'type') return [];
  const key = (w: VocabWord) => (kind === 'to-it' ? w.it : spoken(w.en));
  const correct = key(word);
  const same = words.filter((w) => w.id !== word.id && w.theme === word.theme);
  const rest = words.filter((w) => w.id !== word.id && w.theme !== word.theme);
  const pool = [...shuffle(same, seed), ...shuffle(rest, seed + 1)];
  const out: string[] = [];
  for (const w of pool) {
    const k = key(w);
    if (k !== correct && !out.includes(k)) out.push(k);
    if (out.length === 3) break;
  }
  return shuffle([correct, ...out], seed + 2);
}

/** Sessione: prima i ripassi scaduti (i più in ritardo per primi), poi le parole nuove nell'ordine dei temi. */
export function buildSession(words: VocabWord[], cards: Record<string, SrsCard>, opts: { extra?: boolean; now?: number } = {}): Item[] {
  const now = opts.now ?? Date.now();
  const due = words
    .filter((w) => cards[w.id] && isDue(cards[w.id], now))
    .sort((a, b) => cards[a.id].due - cards[b.id].due)
    .slice(0, MAX_REVIEWS);
  const quota = opts.extra ? NEW_PER_DAY : Math.max(0, NEW_PER_DAY - introducedToday(cards, now));
  const fresh = words.filter((w) => !cards[w.id]).slice(0, quota);
  const seed = now % 9973;
  const item = (w: VocabWord, isNew: boolean, i: number): Item => {
    const kind = isNew ? 'to-it' : kindFor(cards[w.id]);
    return { word: w, isNew, kind, options: optionsFor(w, words, kind, seed + i) };
  };
  return [...fresh.map((w, i) => item(w, true, i)), ...due.map((w, i) => item(w, false, i + 50))];
}

/** Risposta scritta: ignora maiuscole e punteggiatura. */
export const sameAnswer = (given: string, word: VocabWord) => looseKey(given) === looseKey(spoken(word.en));

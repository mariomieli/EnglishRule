import type { Exercise } from '../data/types';
import { normalize } from './utils';

export type Answer = number | string | string[] | boolean | { mistakes: number } | null;

export function isComplete(ex: Exercise, a: Answer): boolean {
  if (a === null || a === undefined) return false;
  switch (ex.type) {
    case 'fill':
      return typeof a === 'string' && a.trim().length > 0;
    case 'order':
      return Array.isArray(a) && a.length === ex.words.length;
    default:
      return true;
  }
}

export function evaluate(ex: Exercise, a: Answer): boolean {
  switch (ex.type) {
    case 'mcq':
      return a === ex.answer;
    case 'fill':
      return typeof a === 'string' && ex.answers.some((x) => normalize(x) === normalize(a));
    case 'order': {
      if (!Array.isArray(a)) return false;
      const got = normalize(a.join(' '));
      return [ex.words.join(' '), ...(ex.alternatives ?? [])].some((s) => normalize(s) === got);
    }
    case 'judge':
      return a === ex.isCorrect;
    case 'match':
      return typeof a === 'object' && a !== null && !Array.isArray(a) && a.mistakes === 0;
  }
}

/** Testo della soluzione da mostrare nel feedback. */
export function solution(ex: Exercise): string | null {
  switch (ex.type) {
    case 'mcq':
      return ex.options[ex.answer];
    case 'fill':
      return ex.prompt.replace(/_{2,}/, `==${ex.answers[0]}==`);
    case 'order':
      return ex.words.join(' ');
    case 'judge':
      return ex.isCorrect ? 'La frase è corretta.' : ex.correction ?? null;
    case 'match':
      return null;
  }
}

export const typeLabel: Record<Exercise['type'], { label: string; icon: string }> = {
  mcq: { label: 'Scegli la risposta', icon: '🎯' },
  fill: { label: 'Completa la frase', icon: '✍️' },
  order: { label: 'Riordina le parole', icon: '🧩' },
  judge: { label: 'Giusta o sbagliata?', icon: '⚖️' },
  match: { label: 'Abbina le coppie', icon: '🔗' },
};

/** Risposta dell'utente in forma di testo, per confrontarla con la soluzione nel feedback. */
export function given(ex: Exercise, a: Answer): string | null {
  switch (ex.type) {
    case 'mcq':
      return typeof a === 'number' ? ex.options[a] ?? null : null;
    case 'fill':
      return typeof a === 'string' && a.trim() ? ex.prompt.replace(/_{2,}/, `==${a.trim()}==`) : null;
    case 'order':
      return Array.isArray(a) ? a.join(' ') : null;
    case 'judge':
      return typeof a === 'boolean' ? (a ? 'Hai detto: corretta' : 'Hai detto: sbagliata') : null;
    case 'match':
      return null;
  }
}

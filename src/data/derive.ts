import type { Exercise } from './types';
import { plain } from '../lib/utils';

/**
 * Esercizi aggiuntivi generati dai contenuti già scritti, aggiunti in coda a quelli della lezione
 * (così gli indici degli esercizi esistenti non cambiano mai):
 * - dettato: dagli esercizi "riordina" (la frase intera è nota);
 * - traduzione italiano -> inglese: dagli esercizi "riordina" che hanno la traduzione;
 * - correzione: dagli esercizi "giusta o sbagliata" con frase sbagliata e correzione.
 * La derivazione è deterministica: non cambiare l'ordine, altrimenti si sfasano progressi ed errori salvati.
 */
export function deriveExercises(base: Exercise[]): Exercise[] {
  const orders = base.filter((e): e is Extract<Exercise, { type: 'order' }> => e.type === 'order');
  const wrongs = base.filter((e): e is Extract<Exercise, { type: 'judge' }> => e.type === 'judge' && !e.isCorrect && !!e.correction);
  const out: Exercise[] = [];
  for (const o of [orders[0], orders[2]]) {
    if (!o) continue;
    const text = o.words.join(' ');
    out.push({ type: 'listen', text, translation: o.translation, explain: o.translation ? `Significa: “${o.translation}”. ${o.explain}` : o.explain });
  }
  for (const o of [orders[1], orders[2]]) {
    if (!o?.translation) continue;
    out.push({ type: 'translate', it: o.translation, answers: [o.words.join(' '), ...(o.alternatives ?? [])], explain: o.explain });
  }
  for (const j of wrongs.slice(0, 2)) {
    out.push({ type: 'correct', sentence: plain(j.sentence), answers: [plain(j.correction!)], explain: j.explain });
  }
  return out;
}

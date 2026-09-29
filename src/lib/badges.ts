import { LESSONS, lessonsByLevel } from '../data';
import { LEVELS } from '../data/levels';
import type { State } from './store';

export interface Badge {
  id: string;
  e: string;
  t: string;
  desc: string;
  cur: number; // progresso attuale
  goal: number; // valore che sblocca il traguardo
  ok: boolean;
}

const make = (id: string, e: string, t: string, desc: string, cur: number, goal: number): Badge => ({ id, e, t, desc, cur: Math.min(cur, goal), goal, ok: cur >= goal });

/** Tutti i traguardi, calcolati dallo stato: nessun dato in più da salvare o sincronizzare. */
export function badgesOf(s: State): Badge[] {
  const done = Object.keys(s.completed).length;
  const perfect = Object.values(s.completed).filter((c) => c.best === 100).length;
  const goalDays = Object.values(s.xpByDay).filter((x) => x >= s.dailyGoal).length;
  const speaking = Object.keys(s.speaking).length;
  const solid = Object.values(s.srs).filter((c) => c.step >= 4).length;
  const levelDone = (lv: string) => {
    const ls = lessonsByLevel(lv as never);
    return ls.length > 0 && ls.every((l) => s.completed[l.id]);
  };
  return [
    make('l1', '🌟', 'Prima lezione', 'Completa una lezione', done, 1),
    make('l10', '📚', '10 lezioni', 'Completa 10 lezioni', done, 10),
    make('l30', '🏛️', '30 lezioni', 'Completa 30 lezioni', done, 30),
    make('lall', '🎓', 'Tutte le lezioni', `Completa tutte le ${LESSONS.length} lezioni`, done, LESSONS.length),
    make('p1', '💯', 'Punteggio perfetto', 'Ottieni 100% in una lezione', perfect, 1),
    make('p10', '🏅', '10 punteggi perfetti', 'Ottieni 100% in 10 lezioni', perfect, 10),
    make('place', '🎯', 'Test di livello', 'Fai il test di livello', s.placement ? 1 : 0, 1),
    make('s3', '🔥', 'Serie di 3 giorni', 'Studia 3 giorni di fila', s.streak.best, 3),
    make('s7', '⚡', 'Serie di 7 giorni', 'Studia 7 giorni di fila', s.streak.best, 7),
    make('s14', '🌈', 'Serie di 14 giorni', 'Studia 14 giorni di fila', s.streak.best, 14),
    make('s30', '🌋', 'Serie di 30 giorni', 'Studia 30 giorni di fila', s.streak.best, 30),
    make('s100', '☄️', 'Serie di 100 giorni', 'Studia 100 giorni di fila', s.streak.best, 100),
    make('g7', '🎯', 'Obiettivo per 7 giorni', 'Raggiungi l\'obiettivo giornaliero in 7 giorni', goalDays, 7),
    make('g30', '🏆', 'Obiettivo per 30 giorni', 'Raggiungi l\'obiettivo giornaliero in 30 giorni', goalDays, 30),
    make('x1', '💎', '1.000 XP', 'Guadagna 1.000 XP', s.xp, 1000),
    make('x5', '👑', '5.000 XP', 'Guadagna 5.000 XP', s.xp, 5000),
    make('x15', '🚀', '15.000 XP', 'Guadagna 15.000 XP', s.xp, 15000),
    make('sp1', '🎙️', 'Prima conversazione', 'Completa una conversazione di speaking', speaking, 1),
    make('sp10', '🗣️', '10 conversazioni', 'Completa 10 conversazioni di speaking', speaking, 10),
    make('r10', '🧠', '10 esercizi consolidati', 'Porta 10 esercizi a 14 giorni o più di ripasso', solid, 10),
    make('r100', '🧬', '100 esercizi consolidati', 'Porta 100 esercizi a 14 giorni o più di ripasso', solid, 100),
    ...LEVELS.map((l) => make(`lv-${l.id}`, l.emoji, `Livello ${l.id} completo`, `Completa tutte le lezioni del livello ${l.id}`, levelDone(l.id) ? 1 : 0, 1)),
  ];
}

export const unlockedIds = (s: State) => new Set(badgesOf(s).filter((b) => b.ok).map((b) => b.id));

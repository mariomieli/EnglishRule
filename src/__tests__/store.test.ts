import { describe, expect, it } from 'vitest';
import { currentStreak, reviewQueue, starsFor, today, upcomingReviews, view, type State } from '../lib/store/derived';
import { addXpTo, clearMistakeIn, completeOnboardingIn, finishLessonIn, markSeenIn, recordAnswerIn, recordMistakeIn, resetDoc, setSettingIn } from '../lib/store/reducers';
import { emptyDoc, isActiveMistake, nextSrs, srsMultiplier, xpByDay } from '../lib/sync/doc';

const ago = (n: number) => today(new Date(Date.now() - n * 86400000));
const baseState = (): State => view(emptyDoc(), 'dark');

describe('trasformazioni del documento (reducers)', () => {
  it('gli XP si sommano per giorno e per dispositivo', () => {
    let d = addXpTo(emptyDoc(), '2026-10-01', 'tel', 10);
    d = addXpTo(d, '2026-10-01', 'tel', 5);
    d = addXpTo(d, '2026-10-01', 'pc', 7);
    expect(xpByDay(d)['2026-10-01']).toBe(22);
  });

  it('un errore si registra, si risolve e ritorna attivo se sbagliato di nuovo', () => {
    let d = recordMistakeIn(emptyDoc(), 'l', 3, 100);
    expect(isActiveMistake(d.mistakes['l#3'])).toBe(true);
    d = clearMistakeIn(d, 'l', 3, 200);
    expect(isActiveMistake(d.mistakes['l#3'])).toBe(false);
    d = recordMistakeIn(d, 'l', 3, 150); // anche con orologio "indietro": deve comunque essere dopo la risoluzione
    expect(isActiveMistake(d.mistakes['l#3'])).toBe(true);
    expect(d.mistakes['l#3'].count).toBe(1);
    d = recordMistakeIn(d, 'l', 3, 400);
    expect(d.mistakes['l#3'].count).toBe(2);
  });

  it('clearMistake non fa nulla se non c\'è un errore attivo', () => {
    const d = emptyDoc();
    expect(clearMistakeIn(d, 'l', 1, 5)).toBe(d);
  });

  it('la risposta aggiorna la scheda di ripasso', () => {
    let d = recordAnswerIn(emptyDoc(), 'l', 2, true, 1000);
    expect(d.srs!['l#2'].step).toBe(1);
    d = recordAnswerIn(d, 'l', 2, false, 2000);
    expect(d.srs!['l#2'].step).toBe(0);
  });

  it('markSeen conta le volte', () => {
    let d = markSeenIn(emptyDoc(), 'l', [0, 1]);
    d = markSeenIn(d, 'l', [1]);
    expect(d.seen.l).toEqual({ 0: 1, 1: 2 });
  });

  it('il completamento conserva il migliore e conta i tentativi', () => {
    let d = finishLessonIn(emptyDoc(), 'l', 90, 3, 10);
    d = finishLessonIn(d, 'l', 60, 1, 20);
    expect(d.completed.l).toEqual({ best: 90, stars: 3, attempts: 2, lastAt: 20 });
  });

  it('onboarding e azzeramento', () => {
    let d = completeOnboardingIn(emptyDoc(), { goal: 100, level: 'B1' }, 50);
    expect(d.settings.onboarded?.v).toBe(true);
    expect(d.settings.dailyGoal?.v).toBe(100);
    expect(d.settings.placement?.v).toBe('B1');
    d = setSettingIn(d, 'theme', 'light', 60);
    const r = resetDoc(addXpTo(d, '2026-10-01', 'x', 5), 999);
    expect(r.epoch).toBe(999);
    expect(Object.keys(r.xp)).toHaveLength(0);
    expect(r.settings.theme?.v).toBe('light');
    expect(r.settings.onboarded).toBeUndefined();
  });
});

describe('vista derivata', () => {
  it('somma gli XP, mostra solo gli errori attivi e risolve il tema', () => {
    let d = addXpTo(emptyDoc(), '2026-10-01', 'a', 10);
    d = addXpTo(d, '2026-10-02', 'a', 15);
    d = recordMistakeIn(d, 'l', 1, 100);
    d = recordMistakeIn(d, 'l', 2, 100);
    d = clearMistakeIn(d, 'l', 2, 200);
    const s = view(d, 'light');
    expect(s.xp).toBe(25);
    expect(Object.keys(s.mistakes)).toEqual(['l#1']);
    expect(s.theme).toBe('light'); // 'system' segue il dispositivo
    expect(view(setSettingIn(d, 'theme', 'dark', 1), 'light').theme).toBe('dark');
  });

  it('starsFor', () => {
    expect([100, 90, 89, 70, 69, 50, 49].map(starsFor)).toEqual([3, 3, 2, 2, 1, 1, 0]);
  });
});

describe('serie attuale', () => {
  const st = (last: string | null, count: number, freezes: number): State => ({ ...baseState(), streak: { count, last, best: count, freezes } });
  it('viva se si è studiato oggi o ieri', () => {
    expect(currentStreak(st(today(), 4, 0))).toBe(4);
    expect(currentStreak(st(ago(1), 4, 0))).toBe(4);
  });
  it('con un giorno saltato regge solo se c\'è un congelamento', () => {
    expect(currentStreak(st(ago(2), 4, 1))).toBe(4);
    expect(currentStreak(st(ago(2), 4, 0))).toBe(0);
  });
  it('dopo tre giorni o più è persa, e senza studio è zero', () => {
    expect(currentStreak(st(ago(3), 9, 2))).toBe(0);
    expect(currentStreak(st(null, 0, 0))).toBe(0);
  });
});

describe('coda di ripasso', () => {
  it('prima gli errori più sbagliati, poi le schede scadute più in ritardo, senza doppioni né schede non scadute', () => {
    let d = emptyDoc();
    d = recordMistakeIn(d, 'l', 1, 100);
    d = recordMistakeIn(d, 'l', 2, 100);
    d = recordMistakeIn(d, 'l', 2, 200); // 2 errori
    d = recordAnswerIn(d, 'l', 1, true, 1000); // scheda dell'errore attivo: non deve comparire due volte
    d.srs = {
      ...d.srs,
      'l#5': { lessonId: 'l', index: 5, step: 2, due: 5000, at: 1 },
      'l#6': { lessonId: 'l', index: 6, step: 2, due: 3000, at: 1 },
      'l#7': { lessonId: 'l', index: 7, step: 2, due: 99_999_999, at: 1 }, // non ancora scaduta
    };
    const q = reviewQueue(view(d, 'dark'), 10_000).map((m) => `${m.lessonId}#${m.index}`);
    expect(q).toEqual(['l#2', 'l#1', 'l#6', 'l#5']);
  });
});

describe('intervalli adattivi', () => {
  const DAY = 86400000;
  it('gli esercizi sbagliati spesso tornano prima, quelli sempre giusti più tardi', () => {
    expect(srsMultiplier(0, 0)).toBe(1);
    expect(srsMultiplier(1, 5)).toBeCloseTo(0.85);
    expect(srsMultiplier(9, 0)).toBe(0.55 > 0.5 ? 0.55 : 0.5); // al massimo 3 errori contano
    expect(srsMultiplier(0, 4)).toBe(1.3);
  });

  it('due schede allo stesso passo: quella con errori scade prima', () => {
    // scheda A: mai sbagliata, 4 giuste di fila; scheda B: sbagliata una volta poi giuste
    let a = nextSrs(undefined, 'l', 1, true, 0);
    for (let i = 0; i < 4; i++) a = nextSrs(a, 'l', 1, true, 0);
    let b = nextSrs(undefined, 'l', 2, false, 0);
    for (let i = 0; i < 5; i++) b = nextSrs(b, 'l', 2, true, 0);
    expect(a.step).toBe(b.step);
    expect(b.due).toBeLessThan(a.due);
    expect(a.due).toBeCloseTo(30 * DAY * 1.3, -3); // 5 giuste: passo 5 = 30 giorni, x1,3
    expect(b.lapses).toBe(1);
    expect(a.streak).toBe(5);
  });

  it('uno sbaglio azzera la serie e riporta subito a oggi', () => {
    const a = nextSrs(nextSrs(undefined, 'l', 1, true, 0), 'l', 1, false, 5000);
    expect(a.streak).toBe(0);
    expect(a.step).toBe(0);
    expect(a.due).toBe(5000);
  });

  it('anteprima dei ripassi in arrivo', () => {
    const now = new Date('2026-10-10T10:00:00').getTime();
    const day = 86400000;
    const d = emptyDoc();
    const card = (due: number) => ({ lessonId: 'l', index: 0, step: 1, due, at: 1 });
    d.srs = { 'l#0': card(now - 1000), 'l#1': card(now + 3 * 3600000), 'l#2': card(now + day), 'l#3': card(now + 4 * day), 'l#4': card(now + 30 * day) };
    const up = upcomingReviews(view(d, 'dark'), now);
    expect(up).toEqual({ tomorrow: 2, week: 1, later: 1 }); // la scaduta non conta: è già nella coda di oggi
  });
});

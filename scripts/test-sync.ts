// Test delle regole di fusione dei progressi: `npm run test:sync`
import { canonical, emptyDoc, isActiveMistake, mergeDocs, sameDoc, streakOf, xpByDay, type Doc } from '../src/lib/sync/doc';

let fails = 0;
const ok = (cond: boolean, msg: string) => {
  if (!cond) {
    fails++;
    console.log('  FALLITO:', msg);
  }
};

// generatore casuale di documenti "realistici"
let seed = 42;
const rnd = (n: number) => ((seed = (seed * 1103515245 + 12345) % 2 ** 31), seed % n);
function randomDoc(dev: string): Doc {
  const d = emptyDoc();
  for (let i = 0; i < 8; i++) {
    const l = `l${rnd(5)}`;
    d.completed[l] = { best: rnd(101), stars: rnd(4), attempts: rnd(5), lastAt: rnd(1000) };
    d.theoryRead[l] = rnd(1000);
    if (rnd(2)) d.speaking = { ...(d.speaking ?? {}), [`sp-${l}`]: { best: rnd(101), stars: rnd(4), attempts: rnd(3), lastAt: rnd(1000) } };
    const k = `${l}#${rnd(25)}`;
    d.mistakes[k] = { lessonId: l, index: 0, count: 1 + rnd(3), at: rnd(1000), ...(rnd(2) ? { cleared: rnd(1000) } : {}) };
    d.seen[l] = { ...(d.seen[l] ?? {}), [rnd(25)]: rnd(4) };
    d.xp[`2026-09-${10 + rnd(10)}`] = { [dev]: rnd(200) };
  }
  if (rnd(2)) d.settings.theme = { v: rnd(2) ? 'dark' : 'light', at: rnd(1000) };
  if (rnd(2)) d.settings.dailyGoal = { v: [30, 50, 100][rnd(3)], at: rnd(1000) };
  return d;
}

for (let t = 0; t < 300; t++) {
  const a = randomDoc('A'), b = randomDoc('B'), c = randomDoc('C');
  if (rnd(4) === 0) a.epoch = 1 + rnd(3);
  if (rnd(4) === 0) b.epoch = 1 + rnd(3);
  ok(sameDoc(mergeDocs(a, b), mergeDocs(b, a)), 'commutativa');
  ok(sameDoc(mergeDocs(mergeDocs(a, b), c), mergeDocs(a, mergeDocs(b, c))), 'associativa');
  ok(sameDoc(mergeDocs(a, a), a), 'idempotente');
  ok(sameDoc(mergeDocs(mergeDocs(a, b), b), mergeDocs(a, b)), 'riapplicare non cambia nulla');
}

// scenario: due dispositivi offline lo stesso giorno
const base = emptyDoc();
const phone = mergeDocs(base, { ...emptyDoc(), xp: { '2026-09-29': { phone: 40 } } });
const laptop = mergeDocs(base, { ...emptyDoc(), xp: { '2026-09-29': { laptop: 30 } } });
let server = mergeDocs(emptyDoc(), phone);
server = mergeDocs(server, laptop);
server = mergeDocs(server, phone); // il telefono risincronizza: niente doppio conteggio
ok(xpByDay(server)['2026-09-29'] === 70, `XP sommati tra dispositivi senza doppio conteggio (atteso 70, ottenuto ${xpByDay(server)['2026-09-29']})`);

// il telefono continua a studiare: il suo contatore cresce, il totale si aggiorna
const phone2 = mergeDocs(phone, { ...emptyDoc(), xp: { '2026-09-29': { phone: 55 } } });
ok(xpByDay(mergeDocs(server, phone2))['2026-09-29'] === 85, 'crescita del contatore di un dispositivo');

// errore risolto su un dispositivo, poi sbagliato di nuovo sull'altro
const m = { lessonId: 'x', index: 1, count: 1, at: 100 };
const resolved = { ...emptyDoc(), mistakes: { 'x#1': { ...m, cleared: 200 } } };
const again = { ...emptyDoc(), mistakes: { 'x#1': { ...m, at: 300 } } };
ok(!isActiveMistake(mergeDocs({ ...emptyDoc(), mistakes: { 'x#1': m } }, resolved).mistakes['x#1']), 'errore risolto sparisce ovunque');
ok(isActiveMistake(mergeDocs(resolved, again).mistakes['x#1']), 'errore rifatto dopo la risoluzione torna attivo');

// miglior punteggio: vince il migliore, qualunque dispositivo sincronizzi per ultimo
const p1 = { ...emptyDoc(), completed: { l: { best: 90, stars: 3, attempts: 2, lastAt: 10 } } };
const p2 = { ...emptyDoc(), completed: { l: { best: 60, stars: 1, attempts: 3, lastAt: 20 } } };
const pm = mergeDocs(p2, p1).completed.l;
ok(pm.best === 90 && pm.stars === 3 && pm.attempts === 3, 'miglior punteggio conservato');

// impostazioni: vince la modifica più recente
const s1 = { ...emptyDoc(), settings: { theme: { v: 'light' as const, at: 500 } } };
const s2 = { ...emptyDoc(), settings: { theme: { v: 'dark' as const, at: 400 } } };
ok(mergeDocs(s2, s1).settings.theme?.v === 'light' && mergeDocs(s1, s2).settings.theme?.v === 'light', 'impostazione più recente vince');

// azzeramento: vince su tutto ciò che è precedente, anche arrivando da un altro dispositivo
const wiped = { ...emptyDoc(), epoch: 1000 };
const oldPhone = { ...emptyDoc(), xp: { '2026-09-29': { phone: 99 } } };
ok(xpByDay(mergeDocs(oldPhone, wiped))['2026-09-29'] === undefined && xpByDay(mergeDocs(wiped, oldPhone))['2026-09-29'] === undefined, 'azzeramento propagato');
const after = mergeDocs(wiped, { ...emptyDoc(), epoch: 1000, xp: { '2026-09-30': { phone: 10 } } });
ok(xpByDay(mergeDocs(after, oldPhone))['2026-09-30'] === 10, 'progressi dopo l\'azzeramento conservati');

// serie di giorni
ok(streakOf({ '2026-09-27': 10, '2026-09-28': 5, '2026-09-29': 20 }).count === 3, 'serie 3 giorni');
ok(streakOf({ '2026-09-25': 10, '2026-09-28': 5, '2026-09-29': 20 }).best === 2, 'serie interrotta');
ok(streakOf({ '2026-10-31': 10, '2026-11-01': 5 }).count === 2, 'serie a cavallo del cambio ora/mese');

console.log(fails ? `${fails} test falliti` : 'OK: tutte le proprietà di fusione verificate (1.200 casi casuali + scenari)');
void canonical;
process.exit(fails ? 1 : 0);

import { words } from './speech-eval';

export type WordStatus = 'ok' | 'near' | 'miss';

export interface WordResult {
  word: string;
  status: WordStatus;
  heard?: string; // cosa ha capito il riconoscimento al posto della parola (se qualcosa)
}

const lev = (a: string, b: string) => {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...new Array<number>(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
};
/** 1 = uguali, 0 = niente in comune. */
export const wordSim = (a: string, b: string) => 1 - lev(a, b) / Math.max(a.length, b.length, 1);

/**
 * Allineamento parola per parola tra frase attesa e frase detta, con sostituzioni:
 * distingue le parole giuste, quelle quasi giuste (suono vicino) e quelle mancate,
 * e dice cosa è stato capito al posto di una parola.
 */
export function alignWords(target: string, said: string): WordResult[] {
  const a = words(target);
  const b = words(said);
  const sub = (x: string, y: string) => (x === y ? 0 : wordSim(x, y) >= 0.5 ? 1 - wordSim(x, y) : 1.2);
  const dp = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0));
  for (let i = 1; i <= a.length; i++) dp[i][0] = i;
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + sub(a[i - 1], b[j - 1]));
  const out: WordResult[] = a.map((word) => ({ word, status: 'miss' as WordStatus }));
  let i = a.length;
  let j = b.length;
  while (i > 0 && j > 0) {
    if (Math.abs(dp[i][j] - (dp[i - 1][j - 1] + sub(a[i - 1], b[j - 1]))) < 1e-9) {
      const s = wordSim(a[i - 1], b[j - 1]);
      out[i - 1] = a[i - 1] === b[j - 1] ? { word: a[i - 1], status: 'ok' } : { word: a[i - 1], status: s >= 0.5 ? 'near' : 'miss', heard: b[j - 1] };
      i--;
      j--;
    } else if (Math.abs(dp[i][j] - (dp[i - 1][j] + 1)) < 1e-9) i--;
    else j--;
  }
  return out;
}

const RULES: { test: RegExp; tip: string }[] = [
  { test: /th/, tip: 'th: metti la punta della lingua tra i denti e soffia (come una "s" o "z" con la lingua fuori). Non dire "t", "d" o "f".' },
  { test: /^h/, tip: 'h iniziale: si pronuncia con un soffio d\'aria dalla gola. In italiano è muta, in inglese no.' },
  { test: /^wh/, tip: 'wh: si legge come una "w" (labbra arrotondate), non "ch" né "v".' },
  { test: /^w/, tip: 'w: labbra arrotondate come per dire "u" e poi la vocale. Non è una "v".' },
  { test: /^kn|^wr|^gn/, tip: 'La prima lettera è muta: kn si legge "n", wr si legge "r", gn si legge "n".' },
  { test: /ough|augh/, tip: '-ough/-augh si pronuncia in molti modi (though, through, enough, thought): va imparata parola per parola.' },
  { test: /igh/, tip: '-igh: la gh è muta, si legge "ai" (night, light).' },
  { test: /tion$|sion$/, tip: '-tion si legge "scion" (/ʃən/), non "tsione".' },
  { test: /sh/, tip: 'sh: come la "sc" di "scena".' },
  { test: /ch/, tip: 'ch: di solito come la "c" di "cena". Fanno eccezione parole come "school" o "chemistry" (k).' },
  { test: /..ed$/, tip: '-ed finale: dopo t o d si dice "id" (wanted), dopo suoni sordi "t" (worked), negli altri casi "d" (played). Non si pronuncia mai "ed".' },
  { test: /ee|ea/, tip: 'ee/ea: vocale lunga /iː/ (sheep, eat). Non confonderla con la "i" breve di "ship", "it".' },
  { test: /oo/, tip: 'oo: può essere lunga /uː/ (food) o breve /ʊ/ (book): attenzione alla durata.' },
  { test: /[aeiou]r$|[aeiou]r[^aeiou]/, tip: 'r: in inglese si pronuncia con la lingua indietro, senza farla vibrare come in italiano.' },
  { test: /mb$/, tip: 'mb finale: la "b" è muta (climb, bomb).' },
  { test: /[^aeiouy' ]$/, tip: 'Consonante finale: non aggiungere una vocale ("dog", non "doga"). Chiudi la parola sulla consonante.' },
];

/** Consigli di pronuncia per chi parla italiano, in base alle lettere della parola mancata. */
export function tipsFor(word: string, max = 2): string[] {
  const w = word.toLowerCase();
  const out: string[] = [];
  for (const r of RULES) {
    if (r.test.test(w)) out.push(r.tip);
    if (out.length >= max) break;
  }
  return out;
}

/** Parole da riascoltare: mancate o quasi giuste, senza doppioni, massimo `max`. */
export function problemWords(res: WordResult[], max = 3): WordResult[] {
  const seen = new Set<string>();
  return res
    .filter((r) => r.status !== 'ok' && r.word.length > 1 && !seen.has(r.word) && !!seen.add(r.word))
    .sort((a, b) => Number(b.status === 'miss') - Number(a.status === 'miss'))
    .slice(0, max);
}

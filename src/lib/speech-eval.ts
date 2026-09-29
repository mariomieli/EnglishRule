// Valutazione delle risposte parlate (testo riconosciuto dal microfono o digitato).

const NUM = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];

// "I'd known" = I had known, "I'd like" = I would like: decide la parola che segue
const PARTICIPLE = /^(\w+ed|been|known|done|gone|seen|had|told|got|gotten|made|left|found|thought|brought|bought|taught|caught|heard|met|lost|won|kept|sent|spent|felt|come|become|said|paid|given|taken|written|eaten|forgotten|spoken|broken|chosen|driven|fallen|flown|grown|ridden|risen|shown|stolen|sworn|thrown|woken|worn|better)$/;

/** Minuscole, niente punteggiatura, contrazioni espanse, numeri piccoli in lettere. */
export function normSpeech(s: string): string {
  return ` ${s
    .toLowerCase()
    .replace(/[‘’ʼ`´]/g, "'")
    .replace(/\*\*|==|\*/g, '')
    .replace(/\bcan't\b/g, 'can not')
    .replace(/\bcannot\b/g, 'can not')
    .replace(/\bwon't\b/g, 'will not')
    .replace(/\bshan't\b/g, 'shall not')
    .replace(/n't\b/g, ' not')
    .replace(/\b(it|that|there|here|what|where|who|he|she)'s\b(\s+(\w+))?/g, (_m, p, sp, w) => `${p}${w && PARTICIPLE.test(w) && w !== 'need' ? ' has' : ' is'}${sp ?? ''}`)
    .replace(/'m\b/g, ' am')
    .replace(/'re\b/g, ' are')
    .replace(/'ve\b/g, ' have')
    .replace(/'ll\b/g, ' will')
    .replace(/'d\b(\s+(\w+))?/g, (_m, sp, w) => (w ? `${PARTICIPLE.test(w) && w !== 'need' ? ' had' : ' would'}${sp}` : ' would'))
    .replace(/\b(\d{1,2})\b/g, (m, d) => (Number(d) <= 20 ? NUM[Number(d)] : m))
    .replace(/[^a-z0-9' ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()} `;
}

export const words = (s: string) => normSpeech(s).trim().split(' ').filter(Boolean);

const has = (text: string, phrase: string) => text.includes(normSpeech(phrase));

/** Esito di una risposta "reply": ogni gruppo di parole chiave deve essere presente. */
export function checkReply(said: string, keywords: string[][], answers: string[]) {
  const t = normSpeech(said);
  const groups = keywords.map((g) => g.some((alt) => has(t, alt)));
  const bySimilarity = answers.some((a) => similarity(said, a) >= 0.85);
  return { ok: groups.every(Boolean) || bySimilarity, groups };
}

/** Allineamento parola per parola (LCS) tra frase attesa e frase detta. */
export function alignRepeat(target: string, said: string) {
  const a = words(target);
  const b = words(said);
  const dp = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--) for (let j = b.length - 1; j >= 0; j--) dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const hit = new Array<boolean>(a.length).fill(false);
  for (let i = 0, j = 0; i < a.length && j < b.length; ) {
    if (a[i] === b[j]) {
      hit[i] = true;
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }
  const score = a.length ? Math.round((hit.filter(Boolean).length / a.length) * 100) : 0;
  return { words: a, hit, score };
}

export function similarity(x: string, y: string) {
  const { score } = alignRepeat(y, x);
  const extra = Math.max(0, words(x).length - words(y).length);
  return Math.max(0, score / 100 - extra * 0.05);
}

/** Quali strutture-obiettivo compaiono in una risposta libera. */
export function checkTargets(said: string, targets: { label: string; patterns: string[] }[]) {
  const t = normSpeech(said);
  return targets.map((tg) => ({ label: tg.label, used: tg.patterns.some((p) => has(t, p)) }));
}

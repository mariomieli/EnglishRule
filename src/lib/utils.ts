export function shuffle<T>(arr: T[], seed?: number): T[] {
  const a = [...arr];
  let r = seed ?? Math.random() * 1e9;
  const rand = () => {
    r = (r * 9301 + 49297) % 233280;
    return r / 233280;
  };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor((seed === undefined ? Math.random() : rand()) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Mescola garantendo che il risultato sia diverso dall'originale (se possibile). */
export function shuffleDifferent<T>(arr: T[]): T[] {
  if (arr.length < 2) return [...arr];
  for (let t = 0; t < 12; t++) {
    const s = shuffle(arr);
    if (s.some((x, i) => x !== arr[i])) return s;
  }
  return [...arr].reverse();
}

/** Normalizza una risposta: minuscole, apostrofi dritti, spazi compatti, niente punteggiatura finale. */
export const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[‘’ʼ`´]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .replace(/\s*([,.!?;:])\s*/g, '$1 ')
    .replace(/[.!?]+\s*$/, '')
    .trim();

/** Rimuove il markup inline (**, *, ==) per confronti e sintesi vocale. */
export const plain = (s: string) => s.replace(/\*\*|==|\*/g, '');

export const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));

export const pct = (a: number, b: number) => (b === 0 ? 0 : Math.round((a / b) * 100));

import type { LevelId } from '../types';

/** [inglese, italiano, frase d'esempio, traduzione della frase] */
export type WordRow = [en: string, it: string, ex: string, exIt: string];

export interface VocabTheme {
  id: string;
  title: string;
  words: WordRow[];
}

export interface VocabWord {
  id: string; // "a1-apple"
  level: LevelId;
  theme: string;
  themeTitle: string;
  en: string;
  it: string;
  ex: string;
  exIt: string;
}

export const wordId = (level: LevelId, en: string) => `${level.toLowerCase()}-${en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

export function flatten(level: LevelId, themes: VocabTheme[]): VocabWord[] {
  return themes.flatMap((t) => t.words.map(([en, it, ex, exIt]) => ({ id: wordId(level, en), level, theme: t.id, themeTitle: t.title, en, it, ex, exIt })));
}

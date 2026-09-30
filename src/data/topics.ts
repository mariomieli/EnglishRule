/** Grande argomento grammaticale di una lezione: dà icona e colore coerenti, al posto di un'emoji diversa per ogni lezione. */
export type TopicId = 'tempi' | 'frasi' | 'nomi' | 'modali' | 'condizionali' | 'passivo' | 'complesse' | 'confronti' | 'preposizioni' | 'phrasal' | 'stile';

export interface Topic {
  id: TopicId;
  label: string;
  short: string; // etichetta breve per i filtri
  color: string;
}

export const TOPICS: Topic[] = [
  { id: 'tempi', label: 'Verbi e tempi', short: 'Tempi', color: '#6366f1' },
  { id: 'frasi', label: 'Frasi e domande', short: 'Frasi', color: '#0ea5e9' },
  { id: 'nomi', label: 'Nomi e determinanti', short: 'Nomi', color: '#10b981' },
  { id: 'modali', label: 'Verbi modali', short: 'Modali', color: '#f59e0b' },
  { id: 'condizionali', label: 'Condizionali e ipotesi', short: 'Ipotesi', color: '#a855f7' },
  { id: 'passivo', label: 'Passivo e discorso riportato', short: 'Passivo', color: '#ec4899' },
  { id: 'complesse', label: 'Frasi complesse', short: 'Complesse', color: '#14b8a6' },
  { id: 'confronti', label: 'Confronti e collegamenti', short: 'Confronti', color: '#f97316' },
  { id: 'preposizioni', label: 'Preposizioni', short: 'Preposizioni', color: '#3b82f6' },
  { id: 'phrasal', label: 'Phrasal verbs', short: 'Phrasal verbs', color: '#0891b2' },
  { id: 'stile', label: 'Stile e sfumature', short: 'Stile', color: '#e11d48' },
];

const BY_LESSON: Record<string, TopicId> = {
  'a1-to-be': 'tempi',
  'a1-pronouns-possessives': 'nomi',
  'a1-articles': 'nomi',
  'a1-plurals-demonstratives': 'nomi',
  'a1-present-simple': 'tempi',
  'a1-there-is-are': 'frasi',
  'a1-can': 'modali',
  'a1-imperative-prepositions-place': 'preposizioni',
  'a1-present-continuous': 'tempi',
  'a1-question-words': 'frasi',
  'a2-was-were': 'tempi',
  'a2-past-simple': 'tempi',
  'a2-past-continuous': 'tempi',
  'a2-countable-uncountable': 'nomi',
  'a2-comparatives-superlatives': 'confronti',
  'a2-future-forms': 'tempi',
  'a2-present-perfect': 'tempi',
  'a2-adverbs-frequency-manner': 'confronti',
  'a2-prepositions-time': 'preposizioni',
  'a2-must-have-to-should': 'modali',
  'b1-present-perfect-vs-past': 'tempi',
  'b1-present-perfect-continuous': 'tempi',
  'b1-past-perfect': 'tempi',
  'b1-zero-first-conditional': 'condizionali',
  'b1-second-conditional': 'condizionali',
  'b1-passive-present-past': 'passivo',
  'b1-reported-speech': 'passivo',
  'b1-defining-relative-clauses': 'complesse',
  'b1-gerund-infinitive': 'complesse',
  'b1-used-to': 'tempi',
  'b1-phrasal-verbs-basics': 'phrasal',
  'b2-third-mixed-conditionals': 'condizionali',
  'b2-wish-if-only': 'condizionali',
  'b2-advanced-passive': 'passivo',
  'b2-causative': 'passivo',
  'b2-reporting-verbs': 'passivo',
  'b2-future-continuous-perfect': 'tempi',
  'b2-non-defining-relative-clauses': 'complesse',
  'b2-modals-deduction': 'modali',
  'b2-contrast-linkers': 'confronti',
  'b2-advanced-quantifiers': 'nomi',
  'b2-phrasal-verbs-three-word': 'phrasal',
  'c1-inversion': 'complesse',
  'c1-cleft-sentences': 'complesse',
  'c1-participle-clauses': 'complesse',
  'c1-past-modals': 'modali',
  'c1-unreal-past': 'condizionali',
  'c1-ellipsis-substitution': 'complesse',
  'c1-emphasis': 'complesse',
  'c1-articles-nominalisation': 'nomi',
  'c1-advanced-future': 'tempi',
  'c1-advanced-relatives': 'complesse',
  'c1-phrasal-verbs-figurative': 'phrasal',
  'c2-conditional-inversion': 'condizionali',
  'c2-if-alternatives': 'condizionali',
  'c2-hedging-distancing': 'stile',
  'c2-tense-politeness': 'stile',
  'c2-mandative-subjunctive': 'stile',
  'c2-advanced-comparatives': 'confronti',
  'c2-discourse-markers': 'confronti',
  'c2-idiomatic-grammar': 'stile',
  'c2-advanced-passive': 'passivo',
  'c2-aspect-nuances': 'tempi',
};

export const topicById = (id: TopicId) => TOPICS.find((t) => t.id === id)!;

/** Argomento di una lezione (le lezioni nuove senza voce nella tabella ricadono su "Verbi e tempi"). */
export const topicOf = (lessonId: string): Topic => topicById(BY_LESSON[lessonId] ?? 'tempi');

const lum = (hex: string) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};

/** Colore del testo (bianco o quasi nero) con il contrasto migliore sul colore pieno dell'argomento. */
export const onColor = (hex: string) => {
  const l = lum(hex);
  const vsWhite = 1.05 / (l + 0.05);
  const vsDark = (l + 0.05) / (lum('#16123a') + 0.05);
  return vsWhite >= vsDark ? '#ffffff' : '#16123a';
};

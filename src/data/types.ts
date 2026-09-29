// Schema dei contenuti didattici. Spiegazioni in italiano, esempi ed esercizi in inglese.
// Nei campi di testo si può usare markup inline: **grassetto**, *corsivo*, ==evidenziato==.

export type LevelId = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface Example {
  en: string; // frase inglese (markup inline ammesso, es. "She ==goes== to school.")
  it?: string; // traduzione italiana
}

export type TheoryBlock =
  | { type: 'text'; body: string }
  | { type: 'rule'; title: string; body: string } // regola chiave, messa in evidenza
  | { type: 'formula'; parts: string[] } // es. ["Soggetto", "+ have/has", "+ participio passato"]
  | { type: 'examples'; title?: string; items: Example[] }
  | { type: 'table'; title?: string; headers: string[]; rows: string[][] }
  | { type: 'tip'; body: string } // trucco / consiglio
  | { type: 'warning'; body: string } // errore tipico degli italiani
  | { type: 'compare'; left: { label: string; items: string[] }; right: { label: string; items: string[] } };

export type Exercise =
  // scelta multipla: answer = indice dell'opzione corretta
  | { type: 'mcq'; prompt: string; options: string[]; answer: number; explain: string }
  // completamento: nel prompt il buco è "___" (uno solo). answers = tutte le risposte accettate (case-insensitive, spazi normalizzati)
  | { type: 'fill'; prompt: string; answers: string[]; hint?: string; explain: string }
  // riordina le parole: words = frase corretta già in ordine (verrà mescolata). Punteggiatura finale attaccata all'ultima parola.
  // alternatives = altre frasi complete accettate (se esistono ordini alternativi validi)
  | { type: 'order'; words: string[]; alternatives?: string[]; translation?: string; explain: string }
  // la frase è corretta? se isCorrect=false, correction = versione giusta
  | { type: 'judge'; sentence: string; isCorrect: boolean; correction?: string; explain: string }
  // abbina coppie (3-5 coppie): left[i] va con right[i] (verranno mescolate)
  | { type: 'match'; prompt: string; pairs: [string, string][]; explain: string };

export interface Lesson {
  id: string; // slug univoco, es. "a1-to-be"
  level: LevelId;
  title: string; // es. "Il verbo To Be"
  subtitle: string; // es. "am, is, are: il verbo più importante"
  icon: string; // una emoji
  minutes: number; // durata stimata
  tags: string[]; // parole chiave per la ricerca, es. ["be", "essere", "am", "is"]
  theory: TheoryBlock[];
  exercises: Exercise[]; // 8-10 esercizi, tipi misti
}

export interface PlacementQuestion {
  level: LevelId;
  prompt: string; // con "___" per il buco
  options: string[];
  answer: number;
}

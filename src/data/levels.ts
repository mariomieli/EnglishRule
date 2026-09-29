import type { LevelId } from './types';

export interface LevelMeta {
  id: LevelId;
  name: string;
  tagline: string;
  description: string;
  from: string; // colore gradiente
  to: string;
  emoji: string;
}

export const LEVELS: LevelMeta[] = [
  { id: 'A1', name: 'Principiante', tagline: 'Le fondamenta', description: 'To be, present simple, articoli, pronomi: tutto ciò che serve per le prime frasi.', from: '#22d3a6', to: '#3ddc84', emoji: '🌱' },
  { id: 'A2', name: 'Elementare', tagline: 'Racconta il passato', description: 'Past simple, futuro, comparativi e i primi passi nel present perfect.', from: '#38bdf8', to: '#22d3ee', emoji: '🚲' },
  { id: 'B1', name: 'Intermedio', tagline: 'Parla con sicurezza', description: 'Present perfect vs past, condizionali, passivo e discorso indiretto.', from: '#6366f1', to: '#818cf8', emoji: '🧭' },
  { id: 'B2', name: 'Intermedio superiore', tagline: 'Sfumature e precisione', description: 'Third conditional, wish, causativo, modali di deduzione e connettivi.', from: '#a855f7', to: '#d946ef', emoji: '🚀' },
  { id: 'C1', name: 'Avanzato', tagline: 'Stile ed enfasi', description: 'Inversione, cleft sentences, participle clauses e modali avanzati.', from: '#f43f5e', to: '#fb7185', emoji: '🎯' },
  { id: 'C2', name: 'Padronanza', tagline: 'Come un madrelingua', description: 'Congiuntivo formale, hedging, strutture idiomatiche e coesione del discorso.', from: '#f59e0b', to: '#fbbf24', emoji: '👑' },
];

export const levelById = (id: string) => LEVELS.find((l) => l.id === id);

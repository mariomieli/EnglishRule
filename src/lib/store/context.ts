import type { User } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';
import type { LevelId } from '../../data/types';
import type { ThemePref } from '../sync/doc';
import type { State } from './derived';
import type { SyncInfo } from './useCloud';

export interface Actions {
  addXp: (n: number) => void;
  finishLesson: (id: string, score: number) => { stars: number; improved: boolean };
  finishSpeaking: (id: string, score: number) => { stars: number; improved: boolean };
  markTheory: (id: string) => void;
  recordAnswer: (lessonId: string, index: number, ok: boolean) => void;
  recordMistake: (lessonId: string, index: number) => void;
  clearMistake: (lessonId: string, index: number) => void;
  markSeen: (lessonId: string, indices: number[]) => void;
  setTheme: (t: ThemePref) => void;
  toggleSound: () => void;
  setPlacement: (l: LevelId) => void;
  completeOnboarding: (o: { goal?: number; level?: LevelId }) => void;
  setDailyGoal: (n: number) => void;
  setAutoCheck: (on: boolean) => void;
  setAdvanceMs: (ms: number) => void;
  reset: () => void;
  syncNow: () => Promise<void>;
  signOut: () => Promise<void>;
}

export interface Ctx extends Actions {
  state: State;
  user: User | null;
  cloud: boolean;
  sync: SyncInfo;
  ready: boolean;
}

export const StoreCtx = createContext<Ctx>(null!);

export const useStore = () => useContext(StoreCtx);

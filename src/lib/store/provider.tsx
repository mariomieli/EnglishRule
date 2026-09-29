import type { User } from '@supabase/supabase-js';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { LevelId } from '../../data/types';
import { supabase } from '../sync/cloud';
import { settingsOf, type Doc, type Settings, type ThemePref } from '../sync/doc';
import { starsFor, systemTheme, today, view, type State, type Theme } from './derived';
import { DOC_KEY, THEME_KEY, deviceId, loadSaved, store, type Saved } from './persist';
import { addXpTo, clearMistakeIn, completeOnboardingIn, finishLessonIn, finishSpeakingIn, markSeenIn, markTheoryIn, recordAnswerIn, recordMistakeIn, resetDoc, setSettingIn } from './reducers';
import { useCloud, type SyncInfo } from './useCloud';

interface Actions {
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
  reset: () => void;
  syncNow: () => Promise<void>;
  signOut: () => Promise<void>;
}

interface Ctx extends Actions {
  state: State;
  user: User | null;
  cloud: boolean;
  sync: SyncInfo;
  ready: boolean;
}

const StoreCtx = createContext<Ctx>(null!);
const now = () => Date.now();

export function StoreProvider({ children }: { children: ReactNode }) {
  const dev = useMemo(deviceId, []);
  const [saved, setSaved] = useState<Saved>(() => loadSaved(dev));
  const docRef = useRef(saved.doc);
  docRef.current = saved.doc;
  const { user, sync, ready, syncNow, signOut } = useCloud(saved, setSaved);

  // tema del dispositivo, aggiornato se l'utente lo cambia mentre l'app è aperta
  const [sys, setSys] = useState<Theme>(systemTheme);
  useEffect(() => {
    const mq = matchMedia('(prefers-color-scheme: light)');
    const on = () => setSys(mq.matches ? 'light' : 'dark');
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const state = useMemo(() => view(saved.doc, sys), [saved.doc, sys]);

  // persistenza locale (sempre: l'app funziona anche offline e senza account)
  useEffect(() => {
    store.set(DOC_KEY, JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    document.documentElement.dataset.theme = state.theme;
    // salviamo solo una scelta esplicita: senza, al prossimo avvio vale il tema del dispositivo
    if (state.themePref === 'system') store.remove(THEME_KEY);
    else store.set(THEME_KEY, state.themePref);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', state.theme === 'dark' ? '#0b0a1a' : '#f6f4ff');
  }, [state.theme, state.themePref]);

  const update = useCallback((f: (d: Doc) => Doc) => setSaved((s) => ({ ...s, doc: f(s.doc) })), []);
  const setSetting = useCallback(<K extends keyof Settings>(k: K, v: Settings[K]) => update((d) => setSettingIn(d, k, v, now())), [update]);

  const actions = useMemo<Omit<Actions, 'syncNow' | 'signOut'>>(() => {
    const finish = (kind: 'completed' | 'speaking', id: string, score: number) => {
      const stars = starsFor(score);
      const before = kind === 'completed' ? docRef.current.completed[id] : docRef.current.speaking?.[id];
      const improved = !before || score > before.best;
      update((d) => (kind === 'completed' ? finishLessonIn(d, id, score, stars, now()) : finishSpeakingIn(d, id, score, stars, now())));
      return { stars, improved };
    };
    return {
      addXp: (n) => update((d) => addXpTo(d, today(), dev, n)),
      finishLesson: (id, score) => finish('completed', id, score),
      finishSpeaking: (id, score) => finish('speaking', id, score),
      markTheory: (id) => update((d) => markTheoryIn(d, id, now())),
      recordAnswer: (lessonId, index, ok) => update((d) => recordAnswerIn(d, lessonId, index, ok, now())),
      recordMistake: (lessonId, index) => update((d) => recordMistakeIn(d, lessonId, index, now())),
      clearMistake: (lessonId, index) => update((d) => clearMistakeIn(d, lessonId, index, now())),
      markSeen: (lessonId, indices) => update((d) => markSeenIn(d, lessonId, indices)),
      setTheme: (t) => setSetting('theme', t),
      toggleSound: () => setSetting('sound', !settingsOf(docRef.current).sound),
      setPlacement: (l) => setSetting('placement', l),
      completeOnboarding: (o) => update((d) => completeOnboardingIn(d, o, now())),
      setDailyGoal: (n) => setSetting('dailyGoal', n),
      // nuova "epoca": l'azzeramento si propaga a tutti i dispositivi e vince sui dati precedenti
      reset: () => update((d) => resetDoc(d, now())),
    };
  }, [update, setSetting, dev]);

  return <StoreCtx.Provider value={{ state, user, cloud: !!supabase, sync, ready, ...actions, syncNow, signOut }}>{children}</StoreCtx.Provider>;
}

export const useStore = () => useContext(StoreCtx);

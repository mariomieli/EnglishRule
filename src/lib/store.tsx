import type { Session, User } from '@supabase/supabase-js';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { LevelId } from '../data/types';
import { supabase } from './sync/cloud';
import {
  canonical,
  emptyDoc,
  fromLegacy,
  isActiveMistake,
  mergeDocs,
  sanitize,
  settingsOf,
  streakOf,
  xpByDay,
  type Doc,
  type LessonProgress,
  type Settings,
  type Theme,
} from './sync/doc';
import { syncDoc } from './sync/cloud';

export type { LessonProgress, Theme };

export interface Mistake {
  lessonId: string;
  index: number;
  count: number;
  at: number;
}

/** Vista derivata dal documento sincronizzato, usata dalle pagine. */
export interface State {
  xp: number;
  completed: Record<string, LessonProgress>;
  speaking: Record<string, LessonProgress>;
  theoryRead: Record<string, true>;
  mistakes: Record<string, Mistake>;
  seen: Record<string, Record<number, number>>;
  streak: { count: number; last: string | null; best: number };
  xpByDay: Record<string, number>;
  dailyGoal: number;
  theme: Theme;
  sound: boolean;
  placement: LevelId | null;
}

export type SyncStatus = 'local' | 'syncing' | 'synced' | 'offline' | 'error';

const DOC_KEY = 'er-doc';
const LEGACY_KEY = 'er-state';
const DEVICE_KEY = 'er-device';
const THEME_KEY = 'er-theme';

export const today = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const dayDiff = (a: string, b: string) =>
  Math.round((new Date(b + 'T12:00:00').getTime() - new Date(a + 'T12:00:00').getTime()) / 86400000);

const store = {
  get: (k: string) => {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set: (k: string, v: string) => {
    try {
      localStorage.setItem(k, v);
    } catch {
      /* storage pieno o non disponibile */
    }
  },
};

function deviceId() {
  let id = store.get(DEVICE_KEY);
  if (!id) {
    id = (crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`).slice(0, 13);
    store.set(DEVICE_KEY, id);
  }
  return id;
}

interface Saved {
  owner: string | null; // utente a cui appartengono i dati locali (null = ospite)
  doc: Doc;
}

function loadSaved(dev: string): Saved {
  try {
    const raw = store.get(DOC_KEY);
    if (raw) {
      const p = JSON.parse(raw);
      return { owner: p.owner ?? null, doc: sanitize(p.doc) };
    }
    const legacy = store.get(LEGACY_KEY);
    if (legacy) return { owner: null, doc: fromLegacy(JSON.parse(legacy), dev) };
  } catch {
    /* dati corrotti: si riparte puliti */
  }
  return { owner: null, doc: emptyDoc() };
}

/** Serie valida solo se l'ultimo giorno di studio è oggi o ieri. */
export function currentStreak(s: State) {
  if (!s.streak.last) return 0;
  return dayDiff(s.streak.last, today()) <= 1 ? s.streak.count : 0;
}

export const starsFor = (score: number) => (score >= 90 ? 3 : score >= 70 ? 2 : score >= 50 ? 1 : 0);

function view(doc: Doc): State {
  const byDay = xpByDay(doc);
  const s = settingsOf(doc);
  const mistakes: Record<string, Mistake> = {};
  for (const [k, m] of Object.entries(doc.mistakes)) if (isActiveMistake(m)) mistakes[k] = { lessonId: m.lessonId, index: m.index, count: m.count, at: m.at };
  const theoryRead: Record<string, true> = {};
  for (const k of Object.keys(doc.theoryRead)) theoryRead[k] = true;
  return {
    xp: Object.values(byDay).reduce((a, n) => a + n, 0),
    completed: doc.completed,
    speaking: doc.speaking ?? {},
    theoryRead,
    mistakes,
    seen: doc.seen as State['seen'],
    streak: streakOf(byDay),
    xpByDay: byDay,
    ...s,
  };
}

interface Actions {
  addXp: (n: number) => void;
  finishLesson: (id: string, score: number) => { stars: number; improved: boolean };
  finishSpeaking: (id: string, score: number) => { stars: number; improved: boolean };
  markTheory: (id: string) => void;
  recordMistake: (lessonId: string, index: number) => void;
  clearMistake: (lessonId: string, index: number) => void;
  markSeen: (lessonId: string, indices: number[]) => void;
  setTheme: (t: Theme) => void;
  toggleSound: () => void;
  setPlacement: (l: LevelId) => void;
  setDailyGoal: (n: number) => void;
  reset: () => void;
  syncNow: () => Promise<void>;
  signOut: () => Promise<void>;
}

interface Ctx extends Actions {
  state: State;
  user: User | null;
  cloud: boolean;
  sync: { status: SyncStatus; at: number | null; error: string | null };
}

const StoreCtx = createContext<Ctx>(null!);

export function StoreProvider({ children }: { children: ReactNode }) {
  const dev = useMemo(deviceId, []);
  const [saved, setSaved] = useState<Saved>(() => loadSaved(dev));
  const [user, setUser] = useState<User | null>(null);
  const [sync, setSync] = useState<Ctx['sync']>({ status: 'local', at: null, error: null });
  const docRef = useRef(saved.doc);
  docRef.current = saved.doc;
  const userRef = useRef<User | null>(null);
  userRef.current = user;
  const lastSynced = useRef<string | null>(null);
  const inFlight = useRef<Promise<void> | null>(null);
  const again = useRef(false);

  const state = useMemo(() => view(saved.doc), [saved.doc]);

  // persistenza locale (sempre: l'app funziona anche offline e senza account)
  useEffect(() => {
    store.set(DOC_KEY, JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    document.documentElement.dataset.theme = state.theme;
    store.set(THEME_KEY, state.theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', state.theme === 'dark' ? '#0b0a1a' : '#f6f4ff');
  }, [state.theme]);

  const update = useCallback((f: (d: Doc) => Doc) => setSaved((s) => ({ ...s, doc: f(s.doc) })), []);
  const now = () => Date.now();
  const setSetting = useCallback(<K extends keyof Settings>(k: K, v: Settings[K]) => update((d) => ({ ...d, settings: { ...d.settings, [k]: { v, at: now() } } })), [update]);

  /* ---------------- Sincronizzazione ---------------- */

  const syncNow = useCallback(async () => {
    const u = userRef.current;
    if (!supabase || !u) return;
    if (inFlight.current) {
      again.current = true;
      return inFlight.current;
    }
    if (!navigator.onLine) {
      setSync((s) => ({ ...s, status: 'offline' }));
      return;
    }
    const run = (async () => {
      do {
        again.current = false;
        setSync((s) => ({ ...s, status: 'syncing' }));
        try {
          const merged = await syncDoc(u.id, docRef.current);
          if (userRef.current?.id !== u.id) return; // l'utente è cambiato durante la sincronizzazione
          lastSynced.current = canonical(merged);
          // si fonde con lo stato attuale: ciò che è stato fatto durante la sincronizzazione resta
          setSaved((s) => ({ owner: u.id, doc: mergeDocs(s.doc, merged) }));
          setSync({ status: 'synced', at: Date.now(), error: null });
        } catch (e) {
          setSync((s) => ({ ...s, status: navigator.onLine ? 'error' : 'offline', error: e instanceof Error ? e.message : String(e) }));
          again.current = false;
        }
      } while (again.current);
    })();
    inFlight.current = run;
    try {
      await run;
    } finally {
      inFlight.current = null;
    }
  }, []);

  // sessione utente
  useEffect(() => {
    if (!supabase) return;
    const apply = (session: Session | null) => {
      const u = session?.user ?? null;
      setUser((prev) => (prev?.id === u?.id ? prev : u));
    };
    supabase.auth.getSession().then(({ data }) => apply(data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, session) => apply(session));
    return () => data.subscription.unsubscribe();
  }, []);

  // cambio utente: i dati locali di un altro account non si mescolano mai
  useEffect(() => {
    if (!supabase) return;
    if (!user) {
      setSync({ status: 'local', at: null, error: null });
      return;
    }
    setSaved((s) => {
      if (s.owner && s.owner !== user.id) return { owner: user.id, doc: keepTheme(s.doc) };
      // progressi fatti da ospite: vengono aggiunti all'account
      return { owner: user.id, doc: s.doc };
    });
    lastSynced.current = null;
    setTimeout(() => void syncNow(), 0);
  }, [user, syncNow]);

  // modifiche locali: sincronizza dopo una breve pausa
  useEffect(() => {
    if (!user || !supabase) return;
    if (lastSynced.current === canonical(saved.doc)) return;
    const t = setTimeout(() => void syncNow(), 1200);
    return () => clearTimeout(t);
  }, [saved.doc, user, syncNow]);

  // ritorno sull'app, rete di nuovo disponibile, controllo periodico
  useEffect(() => {
    if (!user || !supabase) return;
    const onVis = () => void syncNow();
    const onOffline = () => setSync((s) => ({ ...s, status: 'offline' }));
    window.addEventListener('focus', onVis);
    window.addEventListener('online', onVis);
    window.addEventListener('offline', onOffline);
    document.addEventListener('visibilitychange', onVis);
    const iv = setInterval(() => document.visibilityState === 'visible' && void syncNow(), 60_000);
    return () => {
      window.removeEventListener('focus', onVis);
      window.removeEventListener('online', onVis);
      window.removeEventListener('offline', onOffline);
      document.removeEventListener('visibilitychange', onVis);
      clearInterval(iv);
    };
  }, [user, syncNow]);

  // tempo reale: se un altro dispositivo aggiorna i progressi, li riceviamo subito
  useEffect(() => {
    if (!user || !supabase) return;
    let t: ReturnType<typeof setTimeout>;
    const ch = supabase
      .channel(`progress-${user.id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'progress', filter: `user_id=eq.${user.id}` }, () => {
        clearTimeout(t);
        t = setTimeout(() => void syncNow(), 400);
      })
      .subscribe();
    return () => {
      clearTimeout(t);
      void supabase!.removeChannel(ch);
    };
  }, [user, syncNow]);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await syncNow().catch(() => {});
    await supabase.auth.signOut();
    // il dispositivo torna "ospite" e pulito: i dati restano al sicuro nell'account
    setSaved((s) => ({ owner: null, doc: keepTheme(s.doc) }));
    lastSynced.current = null;
  }, [syncNow]);

  /* ---------------- Azioni di studio ---------------- */

  const addXp = useCallback(
    (n: number) =>
      update((d) => {
        const day = today();
        const cur = d.xp[day] ?? {};
        return { ...d, xp: { ...d.xp, [day]: { ...cur, [dev]: (cur[dev] ?? 0) + n } } };
      }),
    [update, dev],
  );

  const finishLesson = useCallback(
    (id: string, score: number) => {
      const stars = starsFor(score);
      const before = docRef.current.completed[id];
      const improved = !before || score > before.best;
      update((d) => {
        const prev = d.completed[id];
        return {
          ...d,
          completed: {
            ...d.completed,
            [id]: { best: Math.max(prev?.best ?? 0, score), stars: Math.max(prev?.stars ?? 0, stars), attempts: (prev?.attempts ?? 0) + 1, lastAt: now() },
          },
        };
      });
      return { stars, improved };
    },
    [update],
  );

  const finishSpeaking = useCallback(
    (id: string, score: number) => {
      const stars = starsFor(score);
      const before = docRef.current.speaking?.[id];
      const improved = !before || score > before.best;
      update((d) => {
        const prev = d.speaking?.[id];
        return {
          ...d,
          speaking: {
            ...(d.speaking ?? {}),
            [id]: { best: Math.max(prev?.best ?? 0, score), stars: Math.max(prev?.stars ?? 0, stars), attempts: (prev?.attempts ?? 0) + 1, lastAt: now() },
          },
        };
      });
      return { stars, improved };
    },
    [update],
  );

  const actions = useMemo<Omit<Actions, 'syncNow' | 'signOut'>>(
    () => ({
      addXp,
      finishLesson,
      finishSpeaking,
      markTheory: (id) => update((d) => (d.theoryRead[id] ? d : { ...d, theoryRead: { ...d.theoryRead, [id]: now() } })),
      recordMistake: (lessonId, index) =>
        update((d) => {
          const k = `${lessonId}#${index}`;
          const m = d.mistakes[k];
          const active = m && isActiveMistake(m);
          return { ...d, mistakes: { ...d.mistakes, [k]: { ...m, lessonId, index, count: (active ? m.count : 0) + 1, at: Math.max(now(), (m?.cleared ?? 0) + 1) } } };
        }),
      clearMistake: (lessonId, index) =>
        update((d) => {
          const k = `${lessonId}#${index}`;
          const m = d.mistakes[k];
          if (!m || !isActiveMistake(m)) return d;
          return { ...d, mistakes: { ...d.mistakes, [k]: { ...m, cleared: Math.max(now(), m.at + 1) } } };
        }),
      markSeen: (lessonId, indices) =>
        update((d) => {
          const cur = { ...(d.seen[lessonId] ?? {}) };
          indices.forEach((i) => (cur[i] = (cur[i] ?? 0) + 1));
          return { ...d, seen: { ...d.seen, [lessonId]: cur } };
        }),
      setTheme: (t) => setSetting('theme', t),
      toggleSound: () => setSetting('sound', !settingsOf(docRef.current).sound),
      setPlacement: (l) => setSetting('placement', l),
      setDailyGoal: (n) => setSetting('dailyGoal', n),
      // nuova "epoca": l'azzeramento si propaga a tutti i dispositivi e vince sui dati precedenti
      reset: () => setSaved((s) => ({ ...s, doc: { ...keepTheme(s.doc), epoch: now() } })),
    }),
    [addXp, finishLesson, finishSpeaking, update, setSetting],
  );

  return <StoreCtx.Provider value={{ state, user, cloud: !!supabase, sync, ...actions, syncNow, signOut }}>{children}</StoreCtx.Provider>;
}

function keepTheme(d: Doc): Doc {
  const e = emptyDoc();
  if (d.settings.theme) e.settings.theme = d.settings.theme;
  return e;
}

export const useStore = () => useContext(StoreCtx);

import type { Session, User } from '@supabase/supabase-js';
import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { canonical, mergeDocs } from '../sync/doc';
import { supabase, syncDoc } from '../sync/cloud';
import { keepTheme, type Saved } from './persist';

export type SyncStatus = 'local' | 'syncing' | 'synced' | 'offline' | 'error';
export interface SyncInfo {
  status: SyncStatus;
  at: number | null;
  error: string | null;
}

const LOCAL: SyncInfo = { status: 'local', at: null, error: null };

/**
 * Account e sincronizzazione con il cloud: sessione utente, fusione dei progressi,
 * aggiornamenti in tempo reale tra dispositivi. Senza cloud configurato non fa nulla.
 */
export function useCloud(saved: Saved, setSaved: Dispatch<SetStateAction<Saved>>) {
  const [user, setUser] = useState<User | null>(null);
  const [sync, setSync] = useState<SyncInfo>({ status: 'local', at: null, error: null });
  const [ready, setReady] = useState(!supabase); // sessione utente già letta (per non mostrare l'onboarding a chi ha un account)
  const docRef = useRef(saved.doc);
  const userRef = useRef<User | null>(null);
  useEffect(() => {
    docRef.current = saved.doc;
    userRef.current = user;
  }, [saved.doc, user]);
  const lastSynced = useRef<string | null>(null);
  const inFlight = useRef<Promise<void> | null>(null);
  const again = useRef(false);

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
  }, [setSaved]);

  // sessione utente
  useEffect(() => {
    if (!supabase) return;
    const apply = (session: Session | null) => {
      const u = session?.user ?? null;
      setUser((prev) => (prev?.id === u?.id ? prev : u));
    };
    supabase.auth.getSession().then(({ data }) => {
      apply(data.session);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_e, session) => apply(session));
    return () => data.subscription.unsubscribe();
  }, []);

  // cambio utente: i dati locali di un altro account non si mescolano mai
  useEffect(() => {
    if (!supabase) return;
    if (!user) return;
    setSaved((s) => {
      if (s.owner && s.owner !== user.id) return { owner: user.id, doc: keepTheme(s.doc) };
      // progressi fatti da ospite: vengono aggiunti all'account
      return { owner: user.id, doc: s.doc };
    });
    lastSynced.current = null;
    setTimeout(() => void syncNow(), 0);
  }, [user, syncNow, setSaved]);

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
  }, [user, syncNow, setSaved]);

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
    setSync(LOCAL);
    // il dispositivo torna "ospite" e pulito: i dati restano al sicuro nell'account
    setSaved((s) => ({ owner: null, doc: keepTheme(s.doc) }));
    lastSynced.current = null;
  }, [syncNow, setSaved]);

  // senza account lo stato è sempre "locale" (derivato, non salvato)
  return { user, sync: user ? sync : LOCAL, ready, syncNow, signOut };
}

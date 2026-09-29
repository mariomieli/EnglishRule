import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogoLockup, Page } from '../components/ui';
import { useStore } from '../lib/store';
import { authProviders, redirectUrl, supabase } from '../lib/sync/cloud';

type Mode = 'login' | 'signup' | 'forgot' | 'recovery';

const ERRORS: Record<string, string> = {
  'Invalid login credentials': 'Email o password non corretti.',
  'Email not confirmed': "Devi prima confermare l'email: controlla la posta (anche nello spam).",
  'User already registered': 'Esiste già un account con questa email. Prova ad accedere.',
  'Password should be at least 6 characters.': 'La password deve avere almeno 6 caratteri.',
};
const tr = (m: string) => ERRORS[m] ?? (/rate limit/i.test(m) ? 'Troppi tentativi, riprova tra qualche minuto.' : /network|fetch/i.test(m) ? 'Connessione assente. Riprova quando sei online.' : m);

export function Account() {
  const { user, cloud } = useStore();
  const [mode, setMode] = useState<Mode>('login');

  useEffect(() => {
    if (!supabase) return;
    // link "reimposta password" dalla email
    const { data } = supabase.auth.onAuthStateChange((e) => e === 'PASSWORD_RECOVERY' && setMode('recovery'));
    return () => data.subscription.unsubscribe();
  }, []);

  if (!cloud)
    return (
      <Page>
        <div className="container narrow">
          <div className="card empty-state">
            <div className="e">☁️</div>
            <h2>Account non ancora disponibili</h2>
            <p className="muted">I tuoi progressi sono salvati su questo dispositivo.</p>
          </div>
        </div>
      </Page>
    );

  return (
    <Page>
      <div className="container narrow" style={{ maxWidth: 480 }}>
        <div style={{ textAlign: 'center', marginBottom: 18 }}>
          <LogoLockup />
        </div>
        {user && mode !== 'recovery' ? <SignedIn /> : <AuthForm mode={mode} setMode={setMode} />}
      </div>
    </Page>
  );
}

function SignedIn() {
  const { user, sync, syncNow, signOut, state } = useStore();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const label = { local: 'Solo su questo dispositivo', syncing: 'Sincronizzazione in corso…', synced: 'Tutto sincronizzato', offline: 'Offline: sincronizzo appena torni online', error: 'Errore di sincronizzazione' }[sync.status];
  const color = { local: 'var(--text-3)', syncing: 'var(--accent)', synced: 'var(--good)', offline: 'var(--warn)', error: 'var(--bad)' }[sync.status];
  return (
    <motion.div className="card center-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <motion.div className="avatar big" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }}>
        {(user!.email ?? '?')[0].toUpperCase()}
      </motion.div>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '14px 0 4px' }}>Il tuo account</h1>
      <p className="muted" style={{ margin: 0, wordBreak: 'break-all' }}>{user!.email}</p>

      <div className="sync-box">
        <span className={`sync-dot ${sync.status}`} style={{ background: color }} />
        <div style={{ textAlign: 'left', flex: 1 }}>
          <div style={{ fontWeight: 700, color }}>{label}</div>
          <div className="faint" style={{ fontSize: '.84rem' }}>
            {sync.at ? `Ultima sincronizzazione: ${new Date(sync.at).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}` : 'I progressi vengono salvati nel tuo account'}
            {sync.status === 'error' && sync.error && <> · {tr(sync.error)}</>}
          </div>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => void syncNow()} disabled={sync.status === 'syncing'}>
          Aggiorna
        </button>
      </div>

      <p className="faint" style={{ fontSize: '.88rem', margin: '0 0 20px' }}>
        {state.xp.toLocaleString('it-IT')} XP · {Object.keys(state.completed).length} lezioni completate. Accedi con la stessa email da telefono, tablet o computer: i progressi si uniscono automaticamente.
      </p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/profile" className="btn btn-primary">
          Vai al profilo
        </Link>
        <button
          className="btn btn-ghost"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            await signOut();
            setBusy(false);
            navigate('/');
          }}
        >
          {busy ? 'Uscita…' : 'Esci'}
        </button>
      </div>
    </motion.div>
  );
}

function AuthForm({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const navigate = useNavigate();
  const [googleEnabled, setGoogle] = useState(false);
  useEffect(() => {
    authProviders().then((p) => setGoogle(p.google));
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setMsg(null);
    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        navigate('/');
      } else if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({ email: email.trim(), password, options: { emailRedirectTo: redirectUrl() } });
        if (error) throw error;
        if (data.session) navigate('/');
        else setMsg({ ok: true, text: `Ti abbiamo inviato un'email a ${email.trim()}: apri il link per confermare l'account.` });
      } else if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: redirectUrl() });
        if (error) throw error;
        setMsg({ ok: true, text: 'Se esiste un account con questa email, riceverai un link per reimpostare la password.' });
      } else {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        setMsg({ ok: true, text: 'Password aggiornata.' });
        setTimeout(() => setMode('login'), 800);
      }
    } catch (err) {
      setMsg({ ok: false, text: tr(err instanceof Error ? err.message : String(err)) });
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setMsg(null);
    const { error } = await supabase!.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: redirectUrl() } });
    if (error) setMsg({ ok: false, text: tr(error.message) });
  };

  const title = { login: 'Bentornato', signup: 'Crea il tuo account', forgot: 'Password dimenticata', recovery: 'Nuova password' }[mode];
  const sub = {
    login: 'Accedi per ritrovare i tuoi progressi su ogni dispositivo.',
    signup: 'Gratis. I progressi fatti finora su questo dispositivo verranno salvati nel tuo account.',
    forgot: 'Inserisci la tua email: ti mandiamo un link per sceglierne una nuova.',
    recovery: 'Scegli la nuova password per il tuo account.',
  }[mode];

  return (
    <motion.div className="card" style={{ padding: 30 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      {(mode === 'login' || mode === 'signup') && (
        <div className="seg" style={{ width: '100%', marginBottom: 22 }} role="tablist">
          {(['login', 'signup'] as const).map((m) => (
            <button key={m} role="tab" aria-selected={mode === m} className={mode === m ? 'on' : ''} style={{ flex: 1, position: 'relative' }} onClick={() => (setMode(m), setMsg(null))}>
              {m === 'login' ? 'Accedi' : 'Registrati'}
            </button>
          ))}
        </div>
      )}
      <AnimatePresence mode="wait">
        <motion.div key={mode} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{title}</h1>
          <p className="muted" style={{ margin: '6px 0 22px', fontSize: '.95rem' }}>
            {sub}
          </p>

          {googleEnabled && (mode === 'login' || mode === 'signup') && (
            <>
              <button className="btn btn-ghost btn-block" onClick={google} type="button">
                <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
                  <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
                  <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                  <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
                  <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
                </svg>
                Continua con Google
              </button>
              <div className="divider">oppure</div>
            </>
          )}

          <form onSubmit={submit} className="auth-form">
            {mode !== 'recovery' && (
              <label>
                <span>Email</span>
                <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nome@esempio.it" />
              </label>
            )}
            {mode !== 'forgot' && (
              <label>
                <span>{mode === 'recovery' ? 'Nuova password' : 'Password'}</span>
                <div style={{ position: 'relative' }}>
                  <input
                    type={show ? 'text' : 'password'}
                    required
                    minLength={mode === 'login' ? undefined : 8}
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={mode === 'login' ? '••••••••' : 'Almeno 8 caratteri'}
                  />
                  <button type="button" className="pw-toggle" onClick={() => setShow(!show)} aria-label={show ? 'Nascondi password' : 'Mostra password'}>
                    {show ? '🙈' : '👁️'}
                  </button>
                </div>
              </label>
            )}
            <AnimatePresence>
              {msg && (
                <motion.div className={`form-msg ${msg.ok ? 'ok' : 'err'}`} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} role={msg.ok ? 'status' : 'alert'}>
                  {msg.text}
                </motion.div>
              )}
            </AnimatePresence>
            <button className="btn btn-primary btn-block" disabled={busy}>
              {busy ? 'Attendi…' : { login: 'Accedi', signup: 'Crea account', forgot: 'Invia link', recovery: 'Salva password' }[mode]}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 18, fontSize: '.9rem' }}>
            {mode === 'login' && (
              <button className="link-btn" onClick={() => (setMode('forgot'), setMsg(null))}>
                Password dimenticata?
              </button>
            )}
            {mode === 'forgot' && (
              <button className="link-btn" onClick={() => (setMode('login'), setMsg(null))}>
                ← Torna all'accesso
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
      <p className="faint" style={{ fontSize: '.8rem', textAlign: 'center', margin: '20px 0 0' }}>
        Puoi usare EnglishRule anche senza account: i progressi restano su questo dispositivo.
      </p>
    </motion.div>
  );
}

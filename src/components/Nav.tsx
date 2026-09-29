import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LESSONS } from '../data';
import { currentStreak, useStore } from '../lib/store';
import { normalize } from '../lib/utils';
import { IBook, IHome, IMic, IMoon, IRepeat, ISearch, ISun, ITarget, IUser } from './Icons';
import { LevelBadge } from './ui';

const LINKS = [
  { to: '/', label: 'Home', icon: IHome, end: true },
  { to: '/levels', label: 'Livelli', icon: IBook },
  { to: '/speaking', label: 'Speaking', icon: IMic },
  { to: '/review', label: 'Ripasso', icon: IRepeat },
  { to: '/test', label: 'Test', icon: ITarget, desktopOnly: true },
  { to: '/profile', label: 'Profilo', icon: IUser },
];

export function TopBar({ onSearch }: { onSearch: () => void }) {
  const { state, setTheme, user, cloud, sync } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const streak = currentStreak(state);
  const mistakes = Object.keys(state.mistakes).length;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <header className={`topbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to="/" className="brand" aria-label="EnglishRule, home">
          <motion.span className="logo" whileHover={{ rotate: -12, scale: 1.08 }} transition={{ type: 'spring', stiffness: 400 }}>
            <svg width="20" height="20" viewBox="0 0 64 64" aria-hidden>
              <path d="M42 19H24v26h18M24 32h14" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
          <span>EnglishRule</span>
        </Link>
        <nav className="nav-links" aria-label="Principale">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {({ isActive }) => (
                <>
                  {isActive && <motion.span layoutId="nav-pill" className="pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  {l.label}
                  {l.to === '/review' && mistakes > 0 && <span style={{ marginLeft: 6, fontSize: '.72rem', padding: '1px 7px', borderRadius: 99, background: 'var(--accent-2)', color: 'white' }}>{mistakes}</span>}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="spacer" />
        <button className="search-trigger" onClick={onSearch}>
          <ISearch width={16} height={16} /> Cerca argomento <kbd>⌘K</kbd>
        </button>
        <span className="chip" title="Giorni consecutivi di studio">
          <motion.span animate={streak > 0 ? { scale: [1, 1.25, 1] } : {}} transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.6 }}>
            🔥
          </motion.span>
          {streak}
        </span>
        <span className="chip hide-mobile" title="Punti esperienza">
          ⚡ {state.xp.toLocaleString('it-IT')}
        </span>
        <button className="icon-btn" onClick={onSearch} aria-label="Cerca" style={{ display: 'none' }} data-mobile-search>
          <ISearch />
        </button>
        {cloud &&
          (user ? (
            <Link to="/account" className="avatar" aria-label="Il tuo account" title={user.email}>
              {(user.email ?? '?')[0].toUpperCase()}
              <span className="badge-dot" style={{ background: sync.status === 'synced' ? 'var(--good)' : sync.status === 'error' ? 'var(--bad)' : sync.status === 'offline' ? 'var(--warn)' : 'var(--accent)' }} />
            </Link>
          ) : (
            <Link to="/account" className="btn btn-primary btn-sm hide-mobile">
              Accedi
            </Link>
          ))}
        <button className="icon-btn" onClick={() => setTheme(state.theme === 'dark' ? 'light' : 'dark')} aria-label={state.theme === 'dark' ? 'Tema chiaro' : 'Tema scuro'}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={state.theme} initial={{ rotate: -90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.25 }} style={{ display: 'grid' }}>
              {state.theme === 'dark' ? <ISun /> : <IMoon />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </header>
  );
}

export function TabBar() {
  const { state } = useStore();
  const mistakes = Object.keys(state.mistakes).length;
  return (
    <nav className="tabbar" aria-label="Principale">
      {LINKS.filter((l) => !l.desktopOnly).map((l) => (
        <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}>
          {({ isActive }) => (
            <>
              {isActive && <motion.span layoutId="tab-pill" className="pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span style={{ position: 'relative' }}>
                <l.icon />
                {l.to === '/review' && mistakes > 0 && <span style={{ position: 'absolute', top: -4, right: -8, minWidth: 16, height: 16, borderRadius: 99, background: 'var(--accent-2)', color: 'white', fontSize: 10, display: 'grid', placeItems: 'center', padding: '0 4px' }}>{mistakes > 9 ? '9+' : mistakes}</span>}
              </span>
              {l.label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const loc = useLocation();

  useEffect(() => onClose(), [loc.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (open) {
      setQ('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  const results = useMemo(() => {
    const n = normalize(q);
    if (!n) return LESSONS.slice(0, 8);
    const words = n.split(' ');
    return LESSONS.map((l) => {
      const hay = normalize([l.title, l.subtitle, l.level, ...l.tags].join(' '));
      const score = words.reduce((s, w) => s + (hay.includes(w) ? 1 : 0), 0) + (normalize(l.title).includes(n) ? 2 : 0);
      return { l, score };
    })
      .filter((x) => x.score >= words.length)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((x) => x.l);
  }, [q]);

  const go = (id: string) => {
    navigate(`/lesson/${id}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
          <motion.div className="palette" role="dialog" aria-label="Cerca lezioni" initial={{ y: -20, scale: 0.96, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: -10, scale: 0.98, opacity: 0 }} transition={{ type: 'spring', stiffness: 380, damping: 30 }}>
            <input
              ref={inputRef}
              placeholder="Cerca: present perfect, articoli, condizionali..."
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setActive(0);
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  setActive((a) => Math.min(results.length - 1, a + 1));
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  setActive((a) => Math.max(0, a - 1));
                } else if (e.key === 'Enter' && results[active]) go(results[active].id);
                else if (e.key === 'Escape') onClose();
              }}
              aria-label="Cerca"
            />
            <div className="results">
              {results.length === 0 && <div className="empty">Nessun argomento trovato per “{q}”</div>}
              {results.map((l, i) => (
                <button key={l.id} className={`res ${i === active ? 'active' : ''}`} onMouseEnter={() => setActive(i)} onClick={() => go(l.id)}>
                  <span className="e">{l.icon}</span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <div className="t">{l.title}</div>
                    <div className="s">{l.subtitle}</div>
                  </span>
                  <LevelBadge id={l.level} size={30} />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

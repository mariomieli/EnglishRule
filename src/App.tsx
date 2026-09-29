import { AnimatePresence, MotionConfig } from 'framer-motion';
import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { CommandPalette, TabBar, TopBar } from './components/Nav';
import { AnimatedBackground } from './components/ui';
import { prefetchAllLessons } from './data';
import { StoreProvider, useStore } from './lib/store';
import { Home } from './pages/Home';

// le altre pagine si scaricano quando servono
const Levels = lazy(() => import('./pages/Level').then((m) => ({ default: m.Levels })));
const LevelPage = lazy(() => import('./pages/Level').then((m) => ({ default: m.LevelPage })));
const LessonPage = lazy(() => import('./pages/Level').then((m) => ({ default: m.LessonPage })));
const Account = lazy(() => import('./pages/Account').then((m) => ({ default: m.Account })));
const Placement = lazy(() => import('./pages/Placement').then((m) => ({ default: m.Placement })));
const LessonPractice = lazy(() => import('./pages/Practice').then((m) => ({ default: m.LessonPractice })));
const ReviewPractice = lazy(() => import('./pages/Practice').then((m) => ({ default: m.ReviewPractice })));
const Profile = lazy(() => import('./pages/Profile').then((m) => ({ default: m.Profile })));
const Review = lazy(() => import('./pages/Profile').then((m) => ({ default: m.Review })));
const SpeakingHub = lazy(() => import('./pages/Speaking').then((m) => ({ default: m.SpeakingHub })));
const SpeakingSession = lazy(() => import('./pages/Speaking').then((m) => ({ default: m.SpeakingSession })));
const Onboarding = lazy(() => import('./pages/Onboarding').then((m) => ({ default: m.Onboarding })));

function PageLoading() {
  return (
    <main className="container narrow" aria-busy="true" aria-live="polite">
      <p className="muted" style={{ textAlign: 'center', padding: '80px 0' }}>Carico…</p>
    </main>
  );
}

function Shell() {
  const location = useLocation();
  const [search, setSearch] = useState(false);
  // durante esercizi e test nascondiamo la navigazione per concentrarsi
  const { state, user, sync, ready } = useStore();
  // primo avvio: solo dalla home, e non per chi ha già progressi o un account ancora in sincronizzazione
  const settled = !user || sync.status === 'synced' || sync.status === 'offline' || sync.status === 'error';
  const firstRun = ready && settled && !state.onboarded && state.xp === 0 && Object.keys(state.completed).length === 0 && !state.placement;
  const focus = /\/practice$/.test(location.pathname) || /^\/speaking\/.+/.test(location.pathname);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k' && !focus) {
        e.preventDefault();
        setSearch((s) => !s);
      }
      if (e.key === '/' && !(e.target instanceof HTMLInputElement) && !focus) {
        e.preventDefault();
        setSearch(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [focus]);

  // a caricamento finito, in un momento di calma: scarica il resto (livelli e pagine) per l'uso offline
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const run = () => {
      if (conn?.saveData) return;
      void prefetchAllLessons();
      for (const load of [() => import('./pages/Level'), () => import('./pages/Practice'), () => import('./pages/Profile'), () => import('./pages/Speaking'), () => import('./pages/Placement'), () => import('./pages/Account')]) void load().catch(() => undefined);
    };
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(run, { timeout: 10000 });
      return () => cancelIdleCallback(id);
    }
    const t = setTimeout(run, 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  if (firstRun && location.pathname === '/')
    return (
      <div className="app">
        <AnimatedBackground />
        <Suspense fallback={<PageLoading />}>
          <Onboarding />
        </Suspense>
      </div>
    );

  return (
    <div className="app">
      <AnimatedBackground />
      <a
        className="skip-link"
        href="#contenuto"
        onClick={(e) => {
          e.preventDefault();
          const target = document.querySelector<HTMLElement>('main');
          target?.setAttribute('tabindex', '-1');
          target?.focus();
        }}
      >
        Vai al contenuto
      </a>
      {!focus && <TopBar onSearch={() => setSearch(true)} />}
      <Suspense fallback={<PageLoading />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/levels" element={<Levels />} />
          <Route path="/level/:id" element={<LevelPage />} />
          <Route path="/lesson/:id" element={<LessonPage />} />
          <Route path="/lesson/:id/practice" element={<LessonPractice />} />
          <Route path="/review" element={<Review />} />
          <Route path="/review/practice" element={<ReviewPractice />} />
          <Route path="/test" element={<Placement />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/speaking" element={<SpeakingHub />} />
          <Route path="/speaking/:id" element={<SpeakingSession />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
      </Suspense>
      {!focus && <TabBar />}
      <CommandPalette open={search} onClose={() => setSearch(false)} />
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <StoreProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Shell />
        </BrowserRouter>
      </StoreProvider>
    </MotionConfig>
  );
}

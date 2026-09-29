import { AnimatePresence, MotionConfig } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { CommandPalette, TabBar, TopBar } from './components/Nav';
import { AnimatedBackground } from './components/ui';
import { StoreProvider, useStore } from './lib/store';
import { Onboarding } from './pages/Onboarding';
import { Home } from './pages/Home';
import { LessonPage, LevelPage, Levels } from './pages/Level';
import { Account } from './pages/Account';
import { Placement } from './pages/Placement';
import { LessonPractice, ReviewPractice } from './pages/Practice';
import { Profile, Review } from './pages/Profile';
import { SpeakingHub, SpeakingSession } from './pages/Speaking';

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  if (firstRun && location.pathname === '/')
    return (
      <div className="app">
        <AnimatedBackground />
        <Onboarding />
      </div>
    );

  return (
    <div className="app">
      <AnimatedBackground />
      {!focus && <TopBar onSearch={() => setSearch(true)} />}
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

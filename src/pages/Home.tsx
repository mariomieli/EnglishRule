import type { CSSProperties } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { IArrow, ITarget } from '../components/Icons';
import { Counter, LevelBadge, Page } from '../components/ui';
import { rise, stagger } from '../lib/motion';
import { LESSONS, lessonsByLevel } from '../data';
import { LEVELS, type LevelMeta } from '../data/levels';
import logoMark from '../assets/logo-mark.png';
import { currentStreak, today, useStore } from '../lib/store';
import { pct } from '../lib/utils';

const WORDS = [
  { t: 'have been', x: '2%', y: '12%', d: 0 },
  { t: 'would have', x: '62%', y: '4%', d: 0.6 },
  { t: 'Had I known', x: '70%', y: '70%', d: 1.2 },
  { t: 'is/are', x: '-4%', y: '66%', d: 1.8 },
  { t: 'used to', x: '38%', y: '88%', d: 2.4 },
];

export function Home() {
  const { state } = useStore();
  const done = Object.keys(state.completed).length;
  const streak = currentStreak(state);
  const todayXp = state.xpByDay[today()] ?? 0;

  // prossima lezione consigliata: la prima non completata a partire dal livello del test
  const startLevel = state.placement ?? 'A1';
  const startIdx = LESSONS.findIndex((l) => l.level === startLevel);
  const next = [...LESSONS.slice(Math.max(0, startIdx)), ...LESSONS.slice(0, Math.max(0, startIdx))].find((l) => !state.completed[l.id]) ?? LESSONS[0];
  const isNew = done === 0 && !state.placement;
  const { user, cloud } = useStore();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <Page>
      <div className="container">
        <section className="hero" ref={heroRef}>
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={rise} className="eyebrow" style={{ marginBottom: 16 }}>
              ✨ Grammatica inglese · dal livello A1 al C2
            </motion.div>
            <motion.h1 variants={rise}>
              {isNew ? (
                <>
                  L'inglese, <br />
                  <span className="gradient-text">finalmente chiaro.</span>
                </>
              ) : (
                <>
                  Bentornato! <br />
                  <span className="gradient-text">Si riparte.</span>
                </>
              )}
            </motion.h1>
            <motion.p variants={rise} className="lead">
              {LESSONS.length} lezioni spiegate in italiano, esempi con pronuncia ed esercizi interattivi che si adattano ai tuoi errori. Dalle basi del <em>to be</em> al congiuntivo formale.
            </motion.p>
            <motion.div variants={rise} className="hero-cta">
              <Link to={`/lesson/${next.id}`} className="btn btn-primary">
                {isNew ? 'Inizia da zero' : 'Continua a imparare'} <IArrow />
              </Link>
              <Link to="/test" className="btn btn-ghost">
                <ITarget /> {state.placement ? `Il tuo livello: ${state.placement}` : 'Scopri il tuo livello'}
              </Link>
            </motion.div>
            {cloud && !user && (
              <motion.div variants={rise}>
                <Link to="/account" className="card login-card">
                  <span className="avatar">☁️</span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <strong>Accedi o crea un account</strong>
                    <span className="faint" style={{ display: 'block', fontSize: '.85rem' }}>
                      Salva i progressi e ritrovali su ogni dispositivo
                    </span>
                  </span>
                  <span className="btn btn-primary btn-sm">Accedi</span>
                </Link>
              </motion.div>
            )}
          </motion.div>

          <motion.div className="hero-visual" style={{ y: yVisual, opacity }} aria-hidden>
            <HeroVisual />
          </motion.div>
        </section>

        <motion.div className="stats-row" variants={stagger} initial="hidden" animate="show">
          {[
            { ico: '🔥', val: streak, lbl: `${streak === 1 ? 'giorno di fila' : 'giorni di fila'}${state.streak.freezes ? ` · ❄️ ${state.streak.freezes} ${state.streak.freezes === 1 ? 'congelamento' : 'congelamenti'}` : ''}` },
            { ico: '⚡', val: state.xp, lbl: 'XP totali' },
            { ico: '📚', val: done, lbl: `lezioni su ${LESSONS.length}` },
            { ico: '🎯', val: Math.min(100, pct(todayXp, state.dailyGoal)), lbl: `obiettivo di oggi (${todayXp}/${state.dailyGoal} XP)`, suffix: '%' },
          ].map((s) => (
            <motion.div key={s.lbl} variants={rise} className="card stat" whileHover={{ y: -4 }}>
              <div className="ico">{s.ico}</div>
              <div>
                <div className="val">
                  <Counter to={s.val} />
                  {s.suffix}
                </div>
                <div className="lbl">{s.lbl}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Link to={`/lesson/${next.id}`} className="card continue-card" style={{ display: 'flex' }}>
            <span className="glow" />
            <div className="emoji">{next.icon}</div>
            <div className="grow">
              <div className="eyebrow">{isNew ? 'Prima lezione' : 'Prossima lezione consigliata'} · {next.level}</div>
              <h3>{next.title}</h3>
              <div className="muted" style={{ fontSize: '.92rem' }}>
                {next.subtitle}
              </div>
            </div>
            <span className="btn btn-primary btn-sm">
              Vai <IArrow width={16} />
            </span>
          </Link>
        </motion.div>

        <div className="section-title">
          <div>
            <div className="eyebrow">Il percorso</div>
            <h2>Sei livelli, un obiettivo</h2>
          </div>
          <Link to="/levels" className="muted hide-mobile" style={{ fontWeight: 600 }}>
            Vedi tutti →
          </Link>
        </div>
        <motion.div className="levels-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
          {LEVELS.map((lv) => (
            <LevelCard key={lv.id} lv={lv} recommended={state.placement === lv.id} />
          ))}
        </motion.div>

        <div className="section-title">
          <div>
            <div className="eyebrow">Il metodo</div>
            <h2>Perché funziona</h2>
          </div>
        </div>
        <motion.div className="features" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
          {[
            { i: '🇮🇹', t: 'Spiegato per italiani', d: 'Ogni lezione evidenzia gli errori tipici di chi parla italiano, con confronti diretti tra le due lingue.' },
            { i: '🧠', t: 'Impari dagli errori', d: "Gli esercizi sbagliati tornano alla fine della sessione e finiscono nel Ripasso, finché non li padroneggi." },
            { i: '🎙️', t: 'Parla davvero', d: 'Dialoghi in situazioni reali per ogni livello: rispondi a voce, il microfono riconosce ciò che dici e ti corregge.' },
            { i: '🧩', t: '5 tipi di esercizi', d: 'Scelta multipla, completamento, riordino, giusto/sbagliato e abbinamenti: mai noioso.' },
            { i: '🔥', t: 'Serie e obiettivi', d: 'XP, stelle, combo e serie giornaliera ti aiutano a studiare un po’ ogni giorno.' },
            { i: '📱', t: 'Ovunque tu sia', d: 'Pensata per mobile e desktop, con scorciatoie da tastiera e tema chiaro o scuro.' },
          ].map((f) => (
            <motion.div key={f.t} variants={rise} className="card feature" whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300 } }}>
              <div className="ico">{f.i}</div>
              <h3>{f.t}</h3>
              <p>{f.d}</p>
            </motion.div>
          ))}
        </motion.div>

        {!state.placement && (
          <motion.div className="card test-banner" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div>
              <h2>Non sai da dove partire?</h2>
              <p>Fai il test di livello: si adatta alle tue risposte, circa 8 domande e 2 minuti. Ti diciamo dove sei nel quadro europeo.</p>
            </div>
            <Link to="/test" className="btn btn-primary">
              Inizia il test <IArrow />
            </Link>
          </motion.div>
        )}

        <footer className="footer">
          <img src={logoMark} alt="" height={28} style={{ display: 'block', margin: '0 auto 8px', height: 28, width: 'auto' }} />
          EnglishRule · Livelli secondo il Quadro Comune Europeo di Riferimento (QCER) · {user ? 'I tuoi progressi sono sincronizzati con il tuo account' : cloud ? 'Senza account i progressi restano su questo dispositivo: accedi per ritrovarli ovunque' : 'I tuoi progressi restano su questo dispositivo'}</footer>
      </div>
    </Page>
  );
}

function HeroVisual() {
  return (
    <>
      <motion.div className="orbit" animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="orbit o2" animate={{ rotate: -360 }} transition={{ duration: 45, repeat: Infinity, ease: 'linear' }} />
      <div className="orbit o3" />
      {LEVELS.map((lv, i) => {
        const a = (i / LEVELS.length) * Math.PI * 2 - Math.PI / 2;
        return (
          <motion.div
            key={lv.id}
            style={{ position: 'absolute', left: `${50 + Math.cos(a) * 42}%`, top: `${50 + Math.sin(a) * 42}%`, x: '-50%', y: '-50%' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: ['-50%', '-62%', '-50%'] }}
            transition={{ scale: { delay: 0.4 + i * 0.1, type: 'spring' }, opacity: { delay: 0.4 + i * 0.1 }, y: { duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut' } }}
          >
            <LevelBadge id={lv.id} size={52} />
          </motion.div>
        );
      })}
      <motion.div className="hero-core" initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 160, damping: 12, delay: 0.2 }}>
        <motion.span animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.6, repeat: Infinity }}>
          Aa
        </motion.span>
      </motion.div>
      {WORDS.map((w) => (
        <motion.div
          key={w.t}
          className="floating-word"
          style={{ left: w.x, top: w.y }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -12, 0] }}
          transition={{ opacity: { delay: 0.8 + w.d / 3 }, y: { duration: 4, delay: w.d, repeat: Infinity, ease: 'easeInOut' } }}
        >
          {w.t}
        </motion.div>
      ))}
    </>
  );
}

export function LevelCard({ lv, recommended }: { lv: LevelMeta; recommended?: boolean }) {
  const { state } = useStore();
  const lessons = lessonsByLevel(lv.id);
  const done = lessons.filter((l) => state.completed[l.id]).length;
  const p = pct(done, lessons.length);

  // tilt 3D al passaggio del mouse
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 });
  const bg = useTransform([mx, my], ([x, y]: number[]) => `radial-gradient(400px circle at ${x * 100}% ${y * 100}%, ${lv.from}33, transparent 60%)`);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  return (
    <motion.div variants={rise} style={{ perspective: 900 }}>
      <motion.div
        style={{ rotateX: rx, rotateY: ry }}
        onMouseMove={onMove}
        onMouseLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
        whileTap={{ scale: 0.98 }}
      >
        <Link to={`/level/${lv.id}`} className="card level-card">
          <motion.span className="shine" style={{ background: bg }} />
          <span className="bigletter" style={{ color: lv.from }}>
            {lv.id}
          </span>
          {recommended && <span className="rec">Il tuo livello</span>}
          <div className="top">
            <LevelBadge id={lv.id} size={52} />
            <div>
              <div className="eyebrow eyebrow-lv" style={{ '--lv': lv.from } as CSSProperties}>
                {lv.tagline}
              </div>
              <h3>
                {lv.name} {lv.emoji}
              </h3>
            </div>
          </div>
          <p>{lv.description}</p>
          <div>
            <div className="foot" style={{ marginBottom: 8 }}>
              <span>{lessons.length} lezioni</span>
              <span>
                {done}/{lessons.length} completate
              </span>
            </div>
            <div className="progress" style={{ height: 8 }}>
              <motion.div style={{ background: `linear-gradient(90deg, ${lv.from}, ${lv.to})` }} initial={{ width: 0 }} whileInView={{ width: `${p}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} />
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

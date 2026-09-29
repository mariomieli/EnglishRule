import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState, type CSSProperties } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IArrow, IBack, IClock } from '../components/Icons';
import { Theory } from '../components/Theory';
import { TOPICS, topicOf, type TopicId } from '../data/topics';
import { LevelBadge, Page, ProgressRing, Stars } from '../components/ui';
import { rise, stagger } from '../lib/motion';
import { lessonById, lessonNumber, lessonsByLevel, nextLesson } from '../data';
import { useLesson } from '../data/useLesson';
import { LEVELS, levelById } from '../data/levels';
import { scenariosByLevel } from '../data/speaking';
import { ScenarioGrid } from './Speaking';
import { SESSION_SIZE } from '../lib/pick';
import { useStore } from '../lib/store';
import { pct } from '../lib/utils';
import { LevelCard } from './Home';

export function Levels() {
  const { state } = useStore();
  return (
    <Page>
      <div className="container">
        <motion.div variants={stagger} initial="hidden" animate="show" style={{ marginBottom: 28 }}>
          <motion.div variants={rise} className="eyebrow">
            Quadro Comune Europeo
          </motion.div>
          <motion.h1 variants={rise} style={{ fontSize: 'clamp(2.2rem,5vw,3.4rem)', fontWeight: 800, marginTop: 6 }}>
            Tutti i <span className="gradient-text">livelli</span>
          </motion.h1>
          <motion.p variants={rise} className="muted" style={{ maxWidth: 560 }}>
            Puoi aprire qualsiasi lezione quando vuoi. L'ordine consigliato va da A1 a C2: ogni livello dà per scontato quello precedente.
          </motion.p>
        </motion.div>
        <motion.div className="levels-grid" variants={stagger} initial="hidden" animate="show">
          {LEVELS.map((lv) => (
            <LevelCard key={lv.id} lv={lv} recommended={state.placement === lv.id} />
          ))}
        </motion.div>
      </div>
    </Page>
  );
}

export function LevelPage() {
  const { id = '' } = useParams();
  const lv = levelById(id);
  const { state } = useStore();
  const [topic, setTopic] = useState<TopicId | 'all'>('all');
  if (!lv) return <Page><div className="container narrow"><div className="card empty-state"><div className="e">🧭</div><h2>Livello non trovato</h2><Link to="/levels" className="btn btn-primary">Tutti i livelli</Link></div></div></Page>;

  const lessons = lessonsByLevel(lv.id);
  const done = lessons.filter((l) => state.completed[l.id]).length;
  const firstTodo = lessons.findIndex((l) => !state.completed[l.id]);
  const vars = { '--lv-from': lv.from, '--lv-to': lv.to } as CSSProperties;
  const minutes = lessons.reduce((a, l) => a + l.minutes, 0);
  const stars = lessons.reduce((a, l) => a + (state.completed[l.id]?.stars ?? 0), 0);
  const topics = TOPICS.map((t) => ({ t, n: lessons.filter((l) => topicOf(l.id).id === t.id).length })).filter((x) => x.n > 0);
  const shown = lessons.map((l, i) => ({ l, i })).filter(({ l }) => topic === 'all' || topicOf(l.id).id === topic);

  return (
    <Page>
      <div className="container" style={vars}>
        <Link to="/levels" className="back">
          <IBack /> Tutti i livelli
        </Link>
        <motion.div className="card level-hero" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(600px circle at 0% 0%, ${lv.from}30, transparent 60%)`, pointerEvents: 'none' }} />
          <LevelBadge id={lv.id} size={80} />
          <div className="grow">
            <div className="eyebrow eyebrow-lv" style={{ '--lv': lv.from } as CSSProperties}>
              {lv.tagline}
            </div>
            <h1>
              {lv.name} {lv.emoji}
            </h1>
            <p className="desc">{lv.description}</p>
            <div className="hero-stats">
              <span className="chip">{lessons.length} lezioni</span>
              <span className="chip">
                <IClock width={14} height={14} /> circa {minutes} min
              </span>
              <span className="chip">⭐ {stars}/{lessons.length * 3}</span>
            </div>
          </div>
          <ProgressRing value={pct(done, lessons.length)} from={lv.from} to={lv.to} label={`${done}/${lessons.length}`} />
        </motion.div>

        <div className="topic-filters" role="group" aria-label="Filtra per argomento">
          <button className={`topic-filter ${topic === 'all' ? 'on' : ''}`} onClick={() => setTopic('all')} aria-pressed={topic === 'all'}>
            Tutte <span>{lessons.length}</span>
          </button>
          {topics.map(({ t, n }) => (
            <button key={t.id} className={`topic-filter ${topic === t.id ? 'on' : ''}`} style={{ '--topic': t.color } as CSSProperties} onClick={() => setTopic(t.id)} aria-pressed={topic === t.id}>
              {t.short} <span>{n}</span>
            </button>
          ))}
        </div>

        <div className="road-wrap">
          {topic === 'all' && (
            <div className="road-line" aria-hidden>
              <motion.div initial={{ height: 0 }} animate={{ height: `${pct(done, lessons.length)}%` }} transition={{ duration: 1.2, delay: 0.4 }} />
            </div>
          )}
          <motion.div className={`road ${topic === 'all' ? '' : 'flat'}`} variants={stagger} initial="hidden" animate="show" key={topic}>
            {shown.map(({ l, i }) => {
              const p = state.completed[l.id];
              const isNext = i === firstTodo;
              const t = topicOf(l.id);
              return (
                <motion.div key={l.id} variants={rise} className="road-item">
                  <span className={`road-dot ${p ? 'done' : ''} ${isNext ? 'next' : ''}`} aria-hidden />
                  <Link to={`/lesson/${l.id}`} className={`road-card ${p ? 'done' : ''} ${isNext ? 'next' : ''}`} data-n={i + 1} style={{ '--topic': t.color } as CSSProperties}>
                    <div className="road-node">
                      <span className="num">{i + 1}</span>
                      {p && <span className="check">✓</span>}
                    </div>
                    <div className="info">
                      <div className="road-top">
                        <span>Lezione {i + 1}</span>
                        {isNext && <span className="road-next">Consigliata</span>}
                      </div>
                      <h3>{l.title}</h3>
                      <div className="sub">{l.subtitle}</div>
                      <div className="road-foot">
                        <span className="topic-chip">{t.label}</span>
                        {p ? (
                          <Stars n={p.stars} />
                        ) : (
                          <span className="mins">
                            <IClock width={14} height={14} /> {l.minutes} min
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {scenariosByLevel(lv.id).length > 0 && (
          <>
            <div className="section-title">
              <div>
                <div className="eyebrow eyebrow-lv" style={{ '--lv': lv.from } as CSSProperties}>
                  Conversazione
                </div>
                <h2>🎙️ Speaking {lv.id}</h2>
              </div>
              <Link to="/speaking" className="muted hide-mobile" style={{ fontWeight: 600 }}>
                Tutti i dialoghi →
              </Link>
            </div>
            <ScenarioGrid list={scenariosByLevel(lv.id)} />
          </>
        )}
      </div>
    </Page>
  );
}

export function LessonPage() {
  const { id = '' } = useParams();
  const lesson = lessonById(id);
  const { lesson: body, failed } = useLesson(lesson ? id : undefined);
  const { state, markTheory } = useStore();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!lesson || !body) return;
    // la teoria è "letta" quando si arriva in fondo alla pagina
    return scrollYProgress.on('change', (v) => v > 0.92 && markTheory(lesson.id));
  }, [lesson, body, scrollYProgress, markTheory]);

  if (!lesson) return <Page><div className="container narrow"><div className="card empty-state"><div className="e">🔍</div><h2>Lezione non trovata</h2><Link to="/levels" className="btn btn-primary">Tutti i livelli</Link></div></div></Page>;

  const lv = levelById(lesson.level)!;
  const prog = state.completed[lesson.id];
  const nxt = nextLesson(lesson.id);
  const counts = lesson.exerciseCount;

  return (
    <Page>
      <motion.div className="read-progress" style={{ scaleX }} />
      <div className="container narrow">
        <Link to={`/level/${lv.id}`} className="back">
          <IBack /> Livello {lv.id} · {lv.name}
        </Link>
        <motion.div className="lesson-header" variants={stagger} initial="hidden" animate="show">
          <motion.div variants={rise} className="emoji" whileHover={{ rotate: [0, -10, 10, 0] }}>
            {lessonNumber(lesson.id)}
          </motion.div>
          <motion.div variants={rise} style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
              <LevelBadge id={lv.id} size={28} />
              <span className="chip" style={{ padding: '4px 10px', fontSize: '.78rem' }}>
                <IClock width={14} height={14} /> {lesson.minutes} min
              </span>
              {prog && (
                <span className="chip" style={{ padding: '4px 10px', fontSize: '.78rem' }}>
                  <Stars n={prog.stars} /> {prog.best}%
                </span>
              )}
            </div>
            <h1>{lesson.title}</h1>
            <div className="sub">{lesson.subtitle}</div>
          </motion.div>
        </motion.div>

        {body ? (
          <Theory blocks={body.theory} />
        ) : (
          <div className="card empty-state" style={{ margin: '24px 0' }}>
            <div className="e">{failed ? '📡' : '⏳'}</div>
            <h3>{failed ? 'Impossibile caricare la lezione: controlla la connessione.' : 'Carico la teoria…'}</h3>
          </div>
        )}

        <motion.div className="card cta-bar" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div>
            <h3 style={{ fontSize: '1.3rem' }}>Pronto a metterti alla prova?</h3>
            <div className="muted" style={{ fontSize: '.92rem' }}>
              {Math.min(SESSION_SIZE, counts)} esercizi a sessione{counts > SESSION_SIZE ? `, pescati da ${counts} sempre diversi` : ''} · gli errori tornano alla fine
            </div>
          </div>
          <Link to={`/lesson/${lesson.id}/practice`} className="btn btn-primary">
            {prog ? 'Esercitati di nuovo' : 'Inizia gli esercizi'} <IArrow />
          </Link>
        </motion.div>

        {nxt && (
          <div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-end' }}>
            <Link to={`/lesson/${nxt.id}`} className="muted" style={{ fontWeight: 600, fontSize: '.92rem' }}>
              Lezione successiva: {nxt.title} →
            </Link>
          </div>
        )}
      </div>
    </Page>
  );
}

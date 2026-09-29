import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { IArrow, IRepeat } from '../components/Icons';
import { Counter, LevelBadge, Page } from '../components/ui';
import { rise, stagger } from '../lib/motion';
import { LESSONS, lessonById, lessonsByLevel } from '../data';
import { LEVELS } from '../data/levels';
import { currentStreak, reviewQueue, today, useStore } from '../lib/store';
import { badgesOf } from '../lib/badges';
import { pct } from '../lib/utils';

export function Review() {
  const { state } = useStore();
  const list = reviewQueue(state);
  const errors = Object.keys(state.mistakes).length;
  const scheduled = Object.keys(state.srs).length;
  const byLesson = new Map<string, number>();
  list.forEach((m) => byLesson.set(m.lessonId, (byLesson.get(m.lessonId) ?? 0) + 1));

  return (
    <Page>
      <div className="container narrow">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={rise} className="eyebrow">
            Ripetizione dilazionata
          </motion.div>
          <motion.h1 variants={rise} style={{ fontSize: 'clamp(2.2rem,5vw,3.2rem)', fontWeight: 800, margin: '6px 0 10px' }}>
            <span className="gradient-text">Ripasso</span> di oggi
          </motion.h1>
          <motion.p variants={rise} className="muted">
            Gli esercizi sbagliati tornano subito. Quelli giusti ricompaiono a intervalli crescenti (1, 3, 7, 14, 30 giorni...) proprio quando stai per dimenticarli.
          </motion.p>
        </motion.div>

        {list.length === 0 ? (
          <motion.div className="card empty-state" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ marginTop: 24 }}>
            <motion.div className="e" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2.4 }}>
              🧘
            </motion.div>
            <h2>Tutto pulito!</h2>
            <p className="muted">Nulla da ripassare ora. {scheduled > 0 ? `${scheduled} esercizi sono in programma per i prossimi giorni.` : 'Continua con le lezioni.'}</p>
            <Link to="/levels" className="btn btn-primary" style={{ marginTop: 10 }}>
              Vai alle lezioni
            </Link>
          </motion.div>
        ) : (
          <>
            <motion.div className="card cta-bar" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div className="display" style={{ fontSize: '2.6rem', fontWeight: 800 }}>
                  <Counter to={list.length} />
                </div>
                <div>
                  <h3>{list.length === 1 ? 'esercizio da ripassare oggi' : 'esercizi da ripassare oggi'}</h3>
                  <div className="muted" style={{ fontSize: '.9rem' }}>
                    {errors > 0 ? `${errors} errori aperti · ` : ''}{list.length - errors > 0 ? `${list.length - errors} in scadenza · ` : ''}sessioni da massimo 12
                  </div>
                </div>
              </div>
              <Link to="/review/practice" className="btn btn-primary">
                <IRepeat /> Inizia il ripasso
              </Link>
            </motion.div>
            <div className="section-title" style={{ marginTop: 36 }}>
              <h2 style={{ fontSize: '1.3rem' }}>Argomenti da rinforzare</h2>
            </div>
            <motion.div className="path" style={{ marginTop: 0 }} variants={stagger} initial="hidden" animate="show">
              {[...byLesson.entries()].map(([id, n]) => {
                const l = lessonById(id);
                if (!l) return null;
                return (
                  <motion.div key={id} variants={rise}>
                    <Link to={`/lesson/${id}`} className="lesson-row">
                      <div className="lesson-node">{l.icon}</div>
                      <div className="info">
                        <h3>{l.title}</h3>
                        <div className="sub">
                          {n} {n === 1 ? 'errore' : 'errori'} · rileggi la teoria
                        </div>
                      </div>
                      <div className="meta">
                        <LevelBadge id={l.level} size={30} />
                        <IArrow width={18} />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </>
        )}
      </div>
    </Page>
  );
}

export function Profile() {
  const { state, setTheme, toggleSound, setDailyGoal, reset, user, cloud, sync } = useStore();
  const done = Object.keys(state.completed).length;
  const streak = currentStreak(state);
  const days = Array.from({ length: 7 }, (_, k) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - k));
    const key = today(d);
    return { key, label: d.toLocaleDateString('it-IT', { weekday: 'short' }).slice(0, 3), xp: state.xpByDay[key] ?? 0 };
  });
  const max = Math.max(state.dailyGoal, ...days.map((d) => d.xp));
  const bs = badgesOf(state);
  const avg = done ? Math.round(Object.values(state.completed).reduce((a, c) => a + c.best, 0) / done) : 0;

  return (
    <Page>
      <div className="container">
        <motion.div variants={stagger} initial="hidden" animate="show" style={{ marginBottom: 24 }}>
          <motion.div variants={rise} className="eyebrow">
            I tuoi progressi
          </motion.div>
          <motion.h1 variants={rise} style={{ fontSize: 'clamp(2.2rem,5vw,3.2rem)', fontWeight: 800, marginTop: 6 }}>
            Il tuo <span className="gradient-text">profilo</span>
          </motion.h1>
        </motion.div>

        <motion.div className="stats-row" style={{ marginTop: 0 }} variants={stagger} initial="hidden" animate="show">
          {[
            { ico: '⚡', val: state.xp, lbl: 'XP totali' },
            { ico: '🔥', val: streak, lbl: `serie attuale · record ${state.streak.best}${state.streak.freezes ? ` · ❄️ ${state.streak.freezes}` : ''}` },
            { ico: '📚', val: done, lbl: `lezioni su ${LESSONS.length}` },
            { ico: '🎯', val: avg, lbl: 'punteggio medio %' },
          ].map((s) => (
            <motion.div key={s.lbl} variants={rise} className="card stat">
              <div className="ico">{s.ico}</div>
              <div>
                <div className="val">
                  <Counter to={s.val} />
                </div>
                <div className="lbl">{s.lbl}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {cloud && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Link to="/account" className="card cta-bar" style={{ marginTop: 18, padding: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
                <span className="avatar">{user ? (user.email ?? '?')[0].toUpperCase() : '☁️'}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis' }}>{user ? user.email : 'Salva i progressi nel cloud'}</div>
                  <div className="faint" style={{ fontSize: '.85rem' }}>
                    {user ? { local: '', syncing: 'Sincronizzazione in corso…', synced: 'Sincronizzato su tutti i tuoi dispositivi', offline: 'Offline: sincronizzo appena torni online', error: 'Errore di sincronizzazione' }[sync.status] : 'Accedi per ritrovarli su telefono, tablet e computer'}
                  </div>
                </div>
              </div>
              <span className="btn btn-ghost btn-sm">{user ? 'Account' : 'Accedi'}</span>
            </Link>
          </motion.div>
        )}

        <div className="profile-grid" style={{ marginTop: 18 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <motion.div className="card" style={{ padding: 24 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Ultimi 7 giorni</h3>
                <span className="faint" style={{ fontSize: '.85rem', fontWeight: 600 }}>
                  obiettivo {state.dailyGoal} XP/giorno
                </span>
              </div>
              <div className="week">
                {days.map((d, k) => (
                  <div className="day" key={d.key}>
                    <span className="n">{d.xp || ''}</span>
                    <motion.div className={`bar ${d.xp ? '' : 'empty'}`} initial={{ height: 0 }} animate={{ height: `${Math.max(4, (d.xp / max) * 100)}%` }} transition={{ delay: 0.3 + k * 0.06, type: 'spring', stiffness: 120, damping: 16 }} style={d.xp >= state.dailyGoal ? { boxShadow: '0 0 18px -2px var(--accent-2)' } : undefined} />
                    <span className="d">{d.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div className="card" style={{ padding: 24 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h3 style={{ marginBottom: 8 }}>Avanzamento per livello</h3>
              {LEVELS.map((lv) => {
                const ls = lessonsByLevel(lv.id);
                const d = ls.filter((l) => state.completed[l.id]).length;
                return (
                  <Link to={`/level/${lv.id}`} key={lv.id} className="lv-progress" style={{ '--lv-from': lv.from, '--lv-to': lv.to } as CSSProperties}>
                    <LevelBadge id={lv.id} size={36} />
                    <div className="progress">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${pct(d, ls.length)}%` }} transition={{ duration: 1, delay: 0.4 }} />
                    </div>
                    <span className="faint" style={{ fontWeight: 700, fontSize: '.85rem', minWidth: 44, textAlign: 'right' }}>
                      {d}/{ls.length}
                    </span>
                  </Link>
                );
              })}
            </motion.div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <motion.div className="card" style={{ padding: 24 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <h3 style={{ marginBottom: 14 }}>
                Traguardi <span className="faint" style={{ fontSize: '.9rem' }}>{bs.filter((b) => b.ok).length}/{bs.length}</span>
              </h3>
              <div className="badges">
                {bs.map((b, k) => (
                  <motion.div key={b.id} title={b.desc} className={`badge-item ${b.ok ? '' : 'locked'}`} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + k * 0.04, type: 'spring' }} whileHover={b.ok ? { rotate: [0, -6, 6, 0], scale: 1.06 } : undefined}>
                    <div className="e">{b.e}</div>
                    <div className="t">{b.t}</div>
                    {!b.ok && b.cur > 0 && <div className="faint" style={{ fontSize: '.7rem', marginTop: 2 }}>{b.cur.toLocaleString('it-IT')}/{b.goal.toLocaleString('it-IT')}</div>}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div className="card" style={{ padding: '10px 24px' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <div className="setting">
                <div>
                  <div style={{ fontWeight: 700 }}>Tema</div>
                  <div className="faint" style={{ fontSize: '.85rem' }}>Auto segue l'impostazione del dispositivo</div>
                </div>
                <div className="seg">
                  <button className={state.themePref === 'system' ? 'on' : ''} onClick={() => setTheme('system')}>📱 Auto</button>
                  <button className={state.themePref === 'light' ? 'on' : ''} onClick={() => setTheme('light')}>☀️ Chiaro</button>
                  <button className={state.themePref === 'dark' ? 'on' : ''} onClick={() => setTheme('dark')}>🌙 Scuro</button>
                </div>
              </div>
              <div className="setting">
                <div>
                  <div style={{ fontWeight: 700 }}>Effetti sonori</div>
                  <div className="faint" style={{ fontSize: '.85rem' }}>Suoni per risposte giuste e sbagliate</div>
                </div>
                <button className={`switch ${state.sound ? 'on' : ''}`} onClick={toggleSound} role="switch" aria-checked={state.sound} aria-label="Effetti sonori">
                  <motion.span layout className="knob" transition={{ type: 'spring', stiffness: 600, damping: 32 }} />
                </button>
              </div>
              <div className="setting">
                <div>
                  <div style={{ fontWeight: 700 }}>Obiettivo giornaliero</div>
                  <div className="faint" style={{ fontSize: '.85rem' }}>XP da guadagnare ogni giorno</div>
                </div>
                <div className="seg">
                  {[30, 50, 100, 150].map((n) => (
                    <button key={n} className={state.dailyGoal === n ? 'on' : ''} onClick={() => setDailyGoal(n)}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <div className="setting">
                <div>
                  <div style={{ fontWeight: 700 }}>Azzera i progressi</div>
                  <div className="faint" style={{ fontSize: '.85rem' }}>Cancella XP, lezioni ed errori salvati{user ? ' su tutti i tuoi dispositivi' : ''}</div>
                </div>
                <button className="btn btn-ghost btn-sm" style={{ color: 'var(--bad)' }} onClick={() => confirm(user ? 'Vuoi davvero cancellare tutti i progressi del tuo account, su tutti i dispositivi? Non si può annullare.' : 'Vuoi davvero cancellare tutti i progressi? Non si può annullare.') && reset()}>
                  Azzera
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Page>
  );
}

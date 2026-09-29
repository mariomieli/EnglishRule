import { motion } from 'framer-motion';
import type { TheoryBlock } from '../data/types';
import { IAlert, IBulb, IKey } from './Icons';
import { Rich, RichBlock } from './Rich';
import { SpeakButton } from './ui';

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

export function Theory({ blocks }: { blocks: TheoryBlock[] }) {
  return (
    <div className="theory">
      {blocks.map((b, i) => (
        <motion.div key={i} {...reveal}>
          <Block b={b} />
        </motion.div>
      ))}
    </div>
  );
}

function Block({ b }: { b: TheoryBlock }) {
  switch (b.type) {
    case 'text':
      return (
        <div className="tb text">
          <RichBlock text={b.body} />
        </div>
      );
    case 'rule':
      return (
        <div className="tb rule">
          <div className="tb-title">
            <IKey /> <Rich text={b.title} />
          </div>
          <RichBlock text={b.body} />
        </div>
      );
    case 'formula':
      return (
        <div className="tb">
          <div className="eyebrow" style={{ marginBottom: 12 }}>
            Struttura
          </div>
          <div className="formula">
            {b.parts.map((p, i) => (
              <motion.span
                key={i}
                className="part"
                initial={{ opacity: 0, scale: 0.7, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.12, type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Rich text={p} />
              </motion.span>
            ))}
          </div>
        </div>
      );
    case 'examples':
      return (
        <div className="tb">
          <div className="tb-title">💬 {b.title ?? 'Esempi'}</div>
          <div className="examples">
            {b.items.map((ex, i) => (
              <motion.div
                key={i}
                className="example"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
              >
                <SpeakButton text={ex.en} />
                <div className="body">
                  <div className="en">
                    <span lang="en">
                      <Rich text={ex.en} />
                    </span>
                  </div>
                  {ex.it && <div className="it">{ex.it}</div>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      );
    case 'table':
      return (
        <div className="tb">
          {b.title && <div className="tb-title">📋 {b.title}</div>}
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  {b.headers.map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((r, i) => (
                  <tr key={i}>
                    {r.map((c, j) => (
                      <td key={j}>
                        <Rich text={c} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case 'tip':
      return (
        <div className="tb tip">
          <div className="tb-title">
            <IBulb /> Trucco
          </div>
          <RichBlock text={b.body} />
        </div>
      );
    case 'warning':
      return (
        <div className="tb warning">
          <div className="tb-title">
            <IAlert /> Attenzione
          </div>
          <RichBlock text={b.body} />
        </div>
      );
    case 'compare':
      return (
        <div className="compare">
          {[b.left, b.right].map((col, i) => (
            <div className="col" key={i}>
              <h4>
                <Rich text={col.label} />
              </h4>
              <ul>
                {col.items.map((it, j) => (
                  <li key={j}>
                    <Rich text={it} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
  }
}

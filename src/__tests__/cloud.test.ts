import type { SupabaseClient } from '@supabase/supabase-js';
import { describe, expect, it } from 'vitest';
import { syncDoc } from '../lib/sync/cloud';
import { emptyDoc, mergeDocs, sameDoc, xpByDay, type Doc } from '../lib/sync/doc';

/** Finto Supabase in memoria con la stessa semantica che usa l'app: select, insert e update condizionato alla versione. */
function fakeDb(opts: { onBeforeUpdate?: () => void; failInsertOnce?: boolean } = {}) {
  const rows = new Map<string, { doc: Doc; version: number }>();
  let failInsert = !!opts.failInsertOnce;
  const calls = { select: 0, insert: 0, update: 0 };
  const db = {
    from: () => ({
      select: () => ({
        eq: (_c: string, userId: string) => ({
          maybeSingle: async () => {
            calls.select++;
            const r = rows.get(userId);
            return { data: r ? { doc: r.doc, version: r.version } : null, error: null };
          },
        }),
      }),
      insert: async (row: { user_id: string; doc: Doc; version: number }) => {
        calls.insert++;
        if (failInsert) {
          failInsert = false;
          rows.set(row.user_id, { doc: emptyDoc(), version: 1 }); // un altro dispositivo ha creato la riga un attimo prima
          return { error: { code: '23505', message: 'duplicate' } };
        }
        if (rows.has(row.user_id)) return { error: { code: '23505', message: 'duplicate' } };
        rows.set(row.user_id, { doc: row.doc, version: row.version });
        return { error: null };
      },
      update: (patch: { doc: Doc; version: number }) => ({
        eq: (_c1: string, userId: string) => ({
          eq: (_c2: string, version: number) => ({
            select: async () => {
              calls.update++;
              opts.onBeforeUpdate?.();
              const r = rows.get(userId);
              if (!r || r.version !== version) return { data: [], error: null };
              rows.set(userId, { doc: patch.doc, version: patch.version });
              return { data: [{ version: patch.version }], error: null };
            },
          }),
        }),
      }),
    }),
  } as unknown as SupabaseClient;
  return { db, rows, calls };
}

const withXp = (dev: string, day: string, n: number): Doc => ({ ...emptyDoc(), xp: { [day]: { [dev]: n } } });

describe('sincronizzazione con il cloud (finto Supabase)', () => {
  it('prima sincronizzazione: crea la riga con il documento locale', async () => {
    const { db, rows } = fakeDb();
    const merged = await syncDoc('u1', withXp('tel', '2026-10-01', 10), db);
    expect(xpByDay(merged)['2026-10-01']).toBe(10);
    expect(rows.get('u1')?.version).toBe(1);
  });

  it('due dispositivi: i progressi si fondono senza doppio conteggio', async () => {
    const { db, rows } = fakeDb();
    await syncDoc('u1', withXp('tel', '2026-10-01', 10), db);
    const fromPc = await syncDoc('u1', withXp('pc', '2026-10-01', 7), db);
    expect(xpByDay(fromPc)['2026-10-01']).toBe(17);
    const again = await syncDoc('u1', withXp('tel', '2026-10-01', 10), db); // il telefono risincronizza
    expect(xpByDay(again)['2026-10-01']).toBe(17);
    expect(rows.get('u1')!.version).toBeGreaterThanOrEqual(2);
  });

  it('se il cloud contiene già tutto non riscrive nulla', async () => {
    const { db, calls } = fakeDb();
    const d = withXp('tel', '2026-10-01', 10);
    await syncDoc('u1', d, db);
    const before = calls.update + calls.insert;
    await syncDoc('u1', d, db);
    expect(calls.update + calls.insert).toBe(before);
  });

  it('conflitto di versione: riprova con i dati aggiornati e non perde nulla', async () => {
    let injected = false;
    const ctx = fakeDb();
    const rowsRef = ctx.rows;
    await syncDoc('u1', withXp('tel', '2026-10-01', 10), ctx.db);
    // un altro dispositivo scrive proprio mentre il primo sta aggiornando
    const raced = fakeDb({
      onBeforeUpdate: () => {
        if (injected) return;
        injected = true;
        const r = raced.rows.get('u1')!;
        raced.rows.set('u1', { doc: mergeDocs(r.doc, withXp('pc', '2026-10-01', 5)), version: r.version + 1 });
      },
    });
    raced.rows.set('u1', { ...rowsRef.get('u1')! });
    const merged = await syncDoc('u1', withXp('tablet', '2026-10-01', 3), raced.db);
    expect(xpByDay(merged)['2026-10-01']).toBe(18); // 10 + 5 + 3
    expect(xpByDay(raced.rows.get('u1')!.doc)['2026-10-01']).toBe(18);
    expect(injected).toBe(true);
  });

  it('due dispositivi creano la riga insieme: il secondo si fonde con il primo', async () => {
    const { db, rows } = fakeDb({ failInsertOnce: true });
    const merged = await syncDoc('u1', withXp('tel', '2026-10-01', 4), db);
    expect(xpByDay(merged)['2026-10-01']).toBe(4);
    expect(sameDoc(rows.get('u1')!.doc, merged)).toBe(true);
  });

  it('un errore del server viene segnalato e non altera i dati', async () => {
    const db = {
      from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: null, error: new Error('boom') }) }) }) }),
    } as unknown as SupabaseClient;
    await expect(syncDoc('u1', emptyDoc(), db)).rejects.toThrow('boom');
  });

  it('utenti diversi non si vedono a vicenda', async () => {
    const { db } = fakeDb();
    await syncDoc('a', withXp('tel', '2026-10-01', 10), db);
    const b = await syncDoc('b', withXp('pc', '2026-10-01', 2), db);
    expect(xpByDay(b)['2026-10-01']).toBe(2);
  });
});

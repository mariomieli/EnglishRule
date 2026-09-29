import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { _configure, cleanProps, flush, setAnalytics, track } from '../lib/analytics';

const calls: { url: string; init: RequestInit }[] = [];
beforeEach(() => {
  calls.length = 0;
  vi.stubGlobal('fetch', vi.fn(async (url: string, init: RequestInit) => (calls.push({ url, init }), new Response(null, { status: 201 }))));
  const mem: Record<string, string> = {};
  vi.stubGlobal('localStorage', { getItem: (k: string) => mem[k] ?? null, setItem: (k: string, v: string) => void (mem[k] = v), removeItem: (k: string) => void delete mem[k] });
  _configure({ url: 'https://x.supabase.co', key: 'anon' });
});
afterEach(() => vi.unstubAllGlobals());

describe('statistiche anonime', () => {
  it('spedisce un lotto con nome, proprietà e sessione, senza identificativi di utente', async () => {
    track('lesson_start', { lesson: 'a1-to-be', mode: 'lesson' });
    track('exercise_wrong', { lesson: 'a1-to-be', index: 3, type: 'mcq' });
    await flush();
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe('https://x.supabase.co/rest/v1/events');
    const body = JSON.parse(calls[0].init.body as string);
    expect(body).toHaveLength(2);
    expect(body[0]).toMatchObject({ name: 'lesson_start', props: { lesson: 'a1-to-be', mode: 'lesson' }, app: 'web-1' });
    expect(Object.keys(body[0]).sort()).toEqual(['app', 'name', 'props', 'session']);
    expect(body[0].session).toBe(body[1].session);
    expect((calls[0].init.headers as Record<string, string>).apikey).toBe('anon');
  });

  it('senza cloud configurato non parte nulla', async () => {
    _configure({ url: undefined, key: undefined });
    track('lesson_start', { lesson: 'x' });
    await flush();
    expect(calls).toHaveLength(0);
  });

  it('se l\'utente le disattiva non parte nulla e la coda si svuota', async () => {
    track('lesson_start', { lesson: 'x' });
    setAnalytics(false);
    track('lesson_start', { lesson: 'y' });
    await flush();
    expect(calls).toHaveLength(0);
    setAnalytics(true);
    track('lesson_start', { lesson: 'z' });
    await flush();
    expect(calls).toHaveLength(1);
  });

  it('rispetta Do Not Track e Global Privacy Control', async () => {
    vi.stubGlobal('navigator', { doNotTrack: '1' });
    track('lesson_start', { lesson: 'x' });
    await flush();
    expect(calls).toHaveLength(0);
    vi.stubGlobal('navigator', { globalPrivacyControl: true });
    track('lesson_start', { lesson: 'x' });
    await flush();
    expect(calls).toHaveLength(0);
  });

  it('tiene solo valori semplici e corti', () => {
    const p = cleanProps({ a: 'x'.repeat(100), b: 5, c: true, d: NaN, e: { nested: 1 } as never, f: undefined as never });
    expect(p).toEqual({ a: 'x'.repeat(40), b: 5, c: true });
  });

  it('un errore di rete non solleva eccezioni', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('offline'); }));
    track('lesson_start', { lesson: 'x' });
    await expect(flush()).resolves.toBeUndefined();
  });

  it('limita gli eventi per sessione', async () => {
    for (let i = 0; i < 400; i++) track('exercise_wrong', { lesson: 'l', index: i });
    await flush();
    const total = calls.reduce((n, c) => n + JSON.parse(c.init.body as string).length, 0);
    expect(total).toBe(300);
  });
});

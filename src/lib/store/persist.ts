import { emptyDoc, fromLegacy, sanitize, type Doc } from '../sync/doc';

export const DOC_KEY = 'er-doc';
export const LEGACY_KEY = 'er-state';
export const DEVICE_KEY = 'er-device';
export const THEME_KEY = 'er-theme';

export const store = {
  get: (k: string) => {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  remove: (k: string) => {
    try {
      localStorage.removeItem(k);
    } catch {
      /* ignora */
    }
  },
  set: (k: string, v: string) => {
    try {
      localStorage.setItem(k, v);
    } catch {
      /* storage pieno o non disponibile */
    }
  },
};

export function deviceId() {
  let id = store.get(DEVICE_KEY);
  if (!id) {
    id = (crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`).slice(0, 13);
    store.set(DEVICE_KEY, id);
  }
  return id;
}

export interface Saved {
  owner: string | null; // utente a cui appartengono i dati locali (null = ospite)
  doc: Doc;
}

export function loadSaved(dev: string): Saved {
  try {
    const raw = store.get(DOC_KEY);
    if (raw) {
      const p = JSON.parse(raw);
      return { owner: p.owner ?? null, doc: sanitize(p.doc) };
    }
    const legacy = store.get(LEGACY_KEY);
    if (legacy) return { owner: null, doc: fromLegacy(JSON.parse(legacy), dev) };
  } catch {
    /* dati corrotti: si riparte puliti */
  }
  return { owner: null, doc: emptyDoc() };
}

export function keepTheme(d: Doc): Doc {
  const e = emptyDoc();
  if (d.settings.theme) e.settings.theme = d.settings.theme;
  return e;
}

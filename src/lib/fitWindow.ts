/**
 * Adattamento della finestra.
 * - Desktop (mouse e puntatore preciso): sotto la larghezza di progetto la pagina non si riorganizza ma si rimpicciolisce
 *   tutta in proporzione (CSS `zoom` sull'elemento radice). Le regole responsive per schermi stretti valgono solo sui dispositivi
 *   touch (vedi `(hover: none)` in index.css), quindi su desktop il layout resta sempre quello largo.
 * - Touch: lo zoom con le dita è bloccato (oltre al meta viewport, serve per iOS che lo ignora).
 */
const DESIGN_WIDTH = 1200;

const desktop = () => typeof matchMedia !== 'undefined' && matchMedia('(hover: hover) and (pointer: fine)').matches;

function apply() {
  const root = document.documentElement;
  const z = desktop() ? Math.min(1, window.innerWidth / DESIGN_WIDTH) : 1;
  if (z >= 0.999) {
    root.style.removeProperty('zoom');
    root.style.setProperty('--z', '1');
    root.style.setProperty('--vw', '1vw');
    root.style.setProperty('--vh', '1vh');
    return;
  }
  root.style.setProperty('zoom', String(z));
  root.style.setProperty('--z', String(z));
  // dentro l'elemento rimpicciolito le unità di vista vanno riportate alla larghezza e all'altezza di progetto
  root.style.setProperty('--vw', `${DESIGN_WIDTH / 100}px`);
  root.style.setProperty('--vh', `${window.innerHeight / z / 100}px`);
}

export function fitWindow() {
  apply();
  window.addEventListener('resize', apply);
  if (desktop()) return;
  // niente pizzico per ingrandire su iOS (Safari ignora user-scalable=no)
  const stop = (e: Event) => e.preventDefault();
  document.addEventListener('gesturestart', stop);
  document.addEventListener('gesturechange', stop);
  document.addEventListener('gestureend', stop);
}

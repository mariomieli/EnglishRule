// Applica il tema prima del primo disegno, per evitare il lampo di colore sbagliato.
try {
  var t = localStorage.getItem('er-theme');
  document.documentElement.dataset.theme = t || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
} catch {
  /* storage non disponibile: vale il tema del dispositivo */
}

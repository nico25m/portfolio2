'use strict';

// Eseguito subito, dall'head, per evitare il lampo del tema sbagliato.
(function applySavedTheme() {
  const root = document.documentElement;
  root.classList.add('js');

  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      root.dataset.theme = saved;
    }
  } catch (error) {
    // Storage bloccato (es. navigazione privata): si segue il tema di sistema.
  }
})();

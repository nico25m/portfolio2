'use strict';

const root = document.documentElement;

/* ---------- Tema chiaro/scuro ---------- */
function initTheme() {
  const button = document.querySelector('#theme-toggle');
  if (!button) return;

  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const isDark = () => (root.dataset.theme ? root.dataset.theme === 'dark' : media.matches);
  const syncButton = () => button.setAttribute('aria-pressed', String(isDark()));

  button.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch (error) {
      // Storage non disponibile: la scelta vale solo per questa visita.
    }
    syncButton();
  });

  media.addEventListener('change', syncButton);
  syncButton();
}

/* ---------- Menu mobile ---------- */
function initMenu() {
  const toggle = document.querySelector('#menu-toggle');
  const nav = document.querySelector('#site-nav');
  if (!toggle || !nav) return;

  const desktop = window.matchMedia('(min-width: 48em)');
  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Chiudi' : 'Menu';
    nav.dataset.open = String(open);
  };

  toggle.addEventListener('click', () => setOpen(!isOpen()));

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  desktop.addEventListener('change', () => setOpen(false));
  setOpen(false);
}

/* ---------- Filtro dei progetti ---------- */
function initProjectFilter() {
  const group = document.querySelector('.filters');
  const buttons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.project');
  const status = document.querySelector('#filter-status');
  const emptyState = document.querySelector('#projects-empty');
  if (!group || buttons.length === 0) return;

  const applyFilter = (filter) => {
    let visible = 0;

    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
    });

    items.forEach((item) => {
      const show = filter === 'all' || item.dataset.status === filter;
      item.hidden = !show;
      if (show) visible += 1;
    });

    emptyState.hidden = visible > 0;
    status.textContent = visible === 1 ? '1 progetto mostrato' : `${visible} progetti mostrati`;
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => applyFilter(button.dataset.filter));
  });

  group.hidden = false; // senza JavaScript i pulsanti non servono e restano nascosti
}

/* ---------- Form di contatto ---------- */
function getErrorMessage(field) {
  const { validity } = field;

  if (validity.valueMissing) return 'Questo campo è obbligatorio.';
  if (validity.typeMismatch) return 'Inserisci un indirizzo email valido, ad esempio nome@esempio.it.';
  if (validity.tooShort) return `Servono almeno ${field.minLength} caratteri (ne hai scritti ${field.value.length}).`;
  if (validity.tooLong) return `Puoi scrivere al massimo ${field.maxLength} caratteri.`;
  return field.validationMessage || 'Il valore inserito non è valido.';
}

function validateField(field) {
  // Un campo di soli spazi non deve superare il controllo "required".
  field.setCustomValidity(field.value.trim() === '' ? 'Questo campo è obbligatorio.' : '');

  const errorBox = document.getElementById(`${field.id}-error`);
  const valid = field.checkValidity();

  errorBox.textContent = valid ? '' : getErrorMessage(field);
  if (valid) {
    field.removeAttribute('aria-invalid');
  } else {
    field.setAttribute('aria-invalid', 'true');
  }
  return valid;
}

function buildMailtoUrl(recipient, { name, email, message }) {
  const subject = `Messaggio dal portfolio di ${name}`;
  const body = `${message}\n\n${name} <${email}>`;
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function initContactForm() {
  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#form-status');
  if (!form || !status) return;

  const fields = [...form.querySelectorAll('input, textarea')];

  const showStatus = (state, text) => {
    status.dataset.state = state;
    status.textContent = text;
  };

  fields.forEach((field) => {
    field.addEventListener('blur', () => {
      if (field.value !== '') validateField(field);
    });
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validateField(field);
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    showStatus('', '');

    const invalidFields = fields.filter((field) => !validateField(field));
    if (invalidFields.length > 0) {
      showStatus('error', 'Ci sono campi da correggere. Controlla i messaggi sotto ai campi evidenziati.');
      invalidFields[0].focus();
      return;
    }

    const recipient = form.dataset.recipient;
    const url = buildMailtoUrl(recipient, {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      message: form.elements.message.value.trim(),
    });

    // I programmi di posta non accettano indirizzi mailto molto lunghi.
    if (url.length > 1900) {
      showStatus('error', 'Il messaggio è troppo lungo per essere preparato in questo modo. Accorcialo oppure scrivimi direttamente a ' + recipient + '.');
      return;
    }

    try {
      window.location.href = url;
      showStatus('ok', 'Ho aperto il tuo programma di posta con il messaggio pronto. Se non si apre nulla, scrivimi a ' + recipient + '.');
    } catch (error) {
      showStatus('error', 'Non riesco ad aprire il programma di posta. Scrivimi direttamente a ' + recipient + '.');
    }
  });
}

/* ---------- Footer ---------- */
function initYear() {
  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
}

initTheme();
initMenu();
initProjectFilter();
initContactForm();
initYear();

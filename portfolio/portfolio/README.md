# Portfolio personale

Sito portfolio statico che presenta chi sono, cosa so fare e i progetti che realizzo durante il percorso di studio. Solo HTML, CSS e JavaScript "vanilla": nessun framework, nessuna dipendenza, nessuno step di build.

**Sito online:** https://TUO-USERNAME.github.io/NOME-REPOSITORY/  <!-- sostituisci dopo la pubblicazione -->

**Screenshot:** aggiungi qui una schermata a 360 px e una a desktop, ad esempio `docs/screenshot-mobile.png` e `docs/screenshot-desktop.png`, e collegale con `![Versione mobile](docs/screenshot-mobile.png)`.

## Funzionalità

- Header con navigazione, sezioni "Chi sono", "Progetti", "Contatti" e footer
- Layout mobile-first con Flexbox e Grid, senza scroll orizzontale da 360 px
- Tema chiaro/scuro con variabili CSS: parte da `prefers-color-scheme`, la scelta manuale viene ricordata
- Menu mobile a scomparsa e filtro dei progetti per stato, entrambi usabili da tastiera
- Form di contatto con `label`, validazione nativa e messaggi di errore in italiano
- Immagini SVG con testo alternativo descrittivo

## Avvio in locale

Non serve installare nulla.

1. Clona il repository: `git clone https://github.com/TUO-USERNAME/NOME-REPOSITORY.git`
2. Apri `index.html` nel browser, oppure avvia un server locale dalla cartella del progetto: `python3 -m http.server 8000` e vai su http://localhost:8000

## Pubblicazione su GitHub Pages

1. Carica i file nella radice di un repository pubblico.
2. Su GitHub apri **Settings → Pages**.
3. In **Build and deployment** scegli **Deploy from a branch**, branch `main`, cartella `/ (root)`.
4. Dopo circa un minuto il sito è online: copia il link in questo README.

## Struttura

```
.
├── index.html            # pagina unica, HTML semantico
├── css/style.css         # variabili, temi, componenti, layout
├── js/theme.js           # applica il tema salvato prima del render
├── js/main.js            # menu, tema, filtro progetti, form
├── assets/img/           # immagini SVG e favicon
└── README.md
```

## Scelte tecniche

- **Mobile-first.** Gli stili base valgono per 360 px; un solo breakpoint (`48em`) aggiunge navigazione orizzontale e colonne.
- **Miglioramento progressivo.** Senza JavaScript il menu resta visibile, i pulsanti inutili sono nascosti e il sito è comunque leggibile. `theme.js` aggiunge la classe `js` all'elemento `html`.
- **Tema.** Le variabili dei colori sono in `:root`. Il tema scuro è definito due volte (media query di sistema e `data-theme="dark"`) perché il CSS non permette di condividere il blocco.
- **Form.** Il sito è statico e non ha un server: all'invio valido si apre il programma di posta con un `mailto:` già compilato. Il modulo usa la Constraint Validation API con `novalidate`, così i messaggi di errore sono nel DOM, collegati con `aria-describedby` e leggibili dagli screen reader. I campi di soli spazi vengono rifiutati.
- **Nessun dato dell'utente in `innerHTML`.** Tutto il testo dinamico passa da `textContent`; l'URL `mailto:` è costruito con `encodeURIComponent`.

## Accessibilità

- Skip link, landmark (`header`, `nav`, `main`, `footer`) e gerarchia dei titoli h1 → h2 → h3
- Focus visibile su ogni elemento interattivo
- Menu con `aria-expanded` / `aria-controls`, chiusura con Esc; filtri con `aria-pressed` e conteggio annunciato in una regione `role="status"`
- Contrasto dei colori verificato per entrambi i temi; bersagli dei pulsanti di almeno 44 px di altezza
- `scroll-behavior: smooth` attivo solo se l'utente non ha chiesto meno animazioni

## Sicurezza

- `Content-Security-Policy` nel `<meta>`: solo risorse dello stesso dominio, niente script inline
- Link esterni con `target="_blank"` e `rel="noopener noreferrer"`
- Nessun segreto nel repository; `.gitignore` esclude i file `.env`
- Input validato lato client (i controlli lato client migliorano l'esperienza ma non sostituiscono quelli di un server, che qui non esiste)

## Da personalizzare prima della consegna

- [ ] Sostituire "Nome Cognome" in `index.html` (title, brand, hero, footer)
- [ ] Sostituire `tuo.nome@example.com` (attributo `data-recipient` del form e link email)
- [ ] Sostituire i link GitHub e LinkedIn
- [ ] Sostituire `avatar.svg` con la propria immagine, aggiornando `alt`, `width` e `height`
- [ ] Riscrivere i testi di "Chi sono" e le descrizioni dei progetti
- [ ] Inserire link al sito online e screenshot in questo README

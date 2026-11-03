// it: dizionario UI italiano — forma chiavi identica a en (tests/seo.test.ts fa un confronto ricorsivo).
// Registro informale ("tu"), coerente con il resto del sito. "KeyCheats" e i segnaposto {n}/{count}/{query}/{category} restano intatti.
const it = {
  brand: "KeyCheats",
  tagline: "Cheatsheet di scorciatoie che restano esatti.",
  metaDesc: "Cheatsheet di scorciatoie cercabili e stampabili per VS Code, macOS, Windows, Chrome e GitHub. Descrizioni vere, tasti Mac ⇄ Windows — tutto nel browser.",

  nav: {
    tools: "Tutti gli strumenti",
    categories: "Categorie",
    about: "Chi siamo",
    menu: "Menu",
    language: "Lingua",
  },

  home: {
    heroTitle: "Ogni scorciatoia che conta — cercabile, stampabile, mai superata",
    heroSub: "{n} cheatsheet con descrizioni vere, tasti in base al tuo OS e ricerca istantanea. Niente pubblicità, niente registrazione.",
    browseAll: "Sfoglia tutti gli strumenti",
    pinned: "Fissati",
    pin: "Fissa in alto",
    unpin: "Rimuovi dai fissati",
    popular: "Popolari adesso",
    categoriesTitle: "Categorie",
    featuredTitle: "Strumenti popolari",
    trustLocal: "I file restano sul tuo dispositivo",
    trustFree: "Gratis, senza account",
    trustFast: "Istantaneo, funziona offline",
    rotating: [
      "VS Code, macOS, Windows, Chrome, GitHub — ogni scheda verificata sulla documentazione ufficiale",
      "Passa da Mac a Windows e i tasti si scambiano da soli",
      "Cerca tra oltre 125 scorciatoie per nome, descrizione o tasto",
      "Stampa una referencia pulita per la scrivania con un clic",
    ],
    statsLabels: { tools: "strumenti", languages: "lingue", uploads: "upload", accounts: "account" },
    eyebrow: "Gratis per sempre",
    heroCtaSecondary: "Come funziona",
    statsTools: "{n} strumenti",
    statsLanguages: "{n} lingue",
    statsUploads: "0 upload",
    statsAccounts: "0 account",
    categoriesSub: "Una scheda per app: ogni scorciatoia raggruppata, descritta e cercabile.",
    popularSub: "Gli strumenti che le persone aprono più spesso.",
    privacyTitle: "Le tue scorciatoie non lasciano mai il browser.",
    privacySub: "Nessun upload, nessun server. Le schede sono dati e JavaScript che girano nel tuo browser — non è una promessa privacy, è come sono costruite.",
    privacyPoint1T: "Elaborazione locale",
    privacyPoint1D: "Ricerca, rilevamento dell'OS, rendering dei tasti e controllo dei conflitti girano in memoria, sul tuo dispositivo. Nulla viene trasmesso.",
    privacyPoint2T: "Nessun account",
    privacyPoint2D: "Niente registrazione, niente email, niente cronologia salvata. Apri uno strumento e usalo.",
    privacyPoint3T: "Onesti per costruzione",
    privacyPoint3D:
      "Se qualcosa non si può davvero fare nel browser, lo diciamo invece di fingere il contrario.",
    privacyLink: "Leggi la nota privacy completa",
    endTitle: "Trova il tasto. Premerlo. Torna al lavoro.",
    endSub: "Cercabile, stampabile, in 15 lingue.",
  },

  tools: {
    title: "Tutti gli strumenti",
    subtitle: "Cerca tra {count} strumenti gratuiti nel browser. Nessun upload, nessuna registrazione.",
    filterPlaceholder: "Cerca strumenti…",
    count: "{count} strumenti",
    empty: "Nessuno strumento corrisponde a “{query}”.",
  },

  categories: {
    pdf: { name: "PDF", desc: "Unisci, dividi, converti e modifica file PDF senza caricarli da nessuna parte." },
    image: { name: "Immagini", desc: "Comprimi, ridimensiona, ritaglia e converti immagini direttamente nel tuo browser." },
    text: { name: "Testo", desc: "Conta, pulisci, ordina e trasforma il testo all'istante, mentre scrivi." },
    developer: { name: "Sviluppo", desc: "Cheatsheet di scorciatoie, visualizzazione dei tasti e controllo dei duplicati per il lavoro quotidiano da tastiera." },
    seo: { name: "SEO", desc: "Meta tag, markup schema, anteprima SERP e altri aiuti per la SEO on-page." },
    security: { name: "Sicurezza", desc: "Password, hash e ricerche — generati e verificati sul tuo dispositivo." },
    utility: { name: "Utilità", desc: "Convertitori di unità, calcolatori e aiuti per la vita di tutti i giorni." },
  },

  tool: {
    howTo: "Come si usa",
    faq: "Domande frequenti",
    related: "Strumenti correlati",
    nextStep: "Passaggi successivi",
    copyLink: "Copia link",
    privacyNote:
      "Questo strumento gira interamente nel tuo browser. I tuoi dati non lasciano mai il dispositivo: non vengono caricati su nessun server.",
    inCategory: "Altri in {category}",
    backToCategory: "Tutti gli strumenti {category}",
  },

  common: {
    openTool: "Apri strumento",
    copy: "Copia",
    copied: "Copiato",
    download: "Scarica",
    reset: "Reimposta",
    swap: "Inverti",
    clear: "Svuota",
    error: "Qualcosa è andato storto. Controlla i dati inseriti e riprova.",
    input: "Input",
    output: "Risultato",
    settings: "Opzioni",
    dropFiles: "Trascina qui i file o clicca per sceglierli",
    dropFile: "Trascina qui un file o clicca per sceglierlo",
    processing: "Elaborazione…",
    fileSize: "Dimensione",
    sample: "Prova un esempio",
    uppercase: "MAIUSCOLO",
  },

  unit: {
    from: "Da",
    to: "A",
    amount: "Quantità",
    result: "Risultato",
    common: "Conversioni comuni",
    formula: "Formula",
    allUnits: "Tutte le unità",
  },

  text: {
    stats: {
      words: "Parole",
      characters: "Caratteri",
      charsNoSpaces: "Senza spazi",
      sentences: "Frasi",
      paragraphs: "Paragrafi",
      lines: "Righe",
      readingTime: "Tempo di lettura",
      readingMinutes: "{n} min di lettura",
    },
  },

  footer: {
    line: "Ogni scorciatoia passa dalla tua tastiera — ogni scheda gira nel tuo browser.",
    privacy: "Privacy",
    terms: "Termini",
    about: "Chi siamo",
    badges: "Badge",
    language: "Lingua",
  },

  badge: {
    title: "Badge KeyCheats",
    desc: "Metti un badge KeyCheats sul tuo sito, nel README o nella documentazione. Rimanda qui e dice che queste schede restano esatte e girano interamente nel browser.",
    voluntary: "L'incorporamento è del tutto volontario: scegli un badge se il progetto ti piace. Non serve alcun permesso.",
    md: "Markdown (README)",
    html: "HTML (sito web)",
    thanks: "Grazie per spargere la voce: ogni incorporamento aiuta più persone a scoprire strumenti che rispettano i loro file.",
  },

    embed: {
    title: "Incorpora questo strumento",
    desc: "Metti questo strumento sul tuo sito con una riga: gira nel browser del visitatore.",
  },

    mcp: {
    title: "Server MCP — strumenti accessibili all'IA",
    desc1: "KeyCheats include un server MCP (Model Context Protocol): assistenti IA come Claude o Cursor possono cercare nel dataset delle scorciatoie, trovare duplicati e renderizzare i tasti — la stessa logica testata del sito, senza reimplementarla.",
    desc2: "I tool eseguono le funzioni pure del sito sullo stesso dataset curato (VS Code, macOS, Windows, Chrome, GitHub). L'esecuzione avviene via npx sulla macchina del client IA — nulla viene inviato ai nostri server.",
    toolsTitle: "Strumenti eseguibili ({n})",
    requiresNode: "Richiede Node.js 18+. Il server gira localmente via stdio; solo le chiamate che fai vengono calcolate sulla tua macchina.",
    privacy: "Richiede Node.js 18+. Il server gira localmente via stdio; solo le chiamate che fai vengono calcolate sulla tua macchina.",
  },

    notFound: {
    title: "Pagina non trovata",
    body: "Lo strumento che cerchi non esiste. Sfoglia invece tutti gli strumenti.",
    home: "Vai alla homepage",
  },
};

export default it;

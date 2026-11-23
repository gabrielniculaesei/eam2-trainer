/* Avvio: tema, home (cella in stile notebook di calcolo + blocco "oggi"),
   sezioni non ancora pronte, pagina non trovata. */
(function () {
  "use strict";
  const { $, esc, md, typeset, toast } = window.UI;
  const STORE = window.STORE, ROUTER = window.ROUTER;

  /* ======================== tema ======================== */
  function currentTheme() {
    return STORE.setting("theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }
  function applyTheme() {
    const t = currentTheme();
    document.documentElement.dataset.theme = t;
    const b = $("#themeToggle");
    b.textContent = t === "dark" ? "quaderno" : "lavagna";
    b.setAttribute("aria-label", t === "dark" ? "passa al tema chiaro (quaderno)" : "passa al tema scuro (lavagna)");
    b.title = b.getAttribute("aria-label");
  }
  function toggleTheme() { STORE.setting("theme", currentTheme() === "dark" ? "light" : "dark"); applyTheme(); }
  $("#themeToggle").addEventListener("click", toggleTheme);
  applyTheme();

  /* ======================== "oggi" ======================== */
  function daysTo(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    const target = new Date(y, m - 1, d);
    const now = new Date(); now.setHours(0, 0, 0, 0);
    return Math.round((target - now) / STORE.DAY);
  }

  function todayInfo() {
    const T = window.STATS.byTopic();
    const pi = STORE.setting("piDate");
    const n = daysTo(pi);
    const wrong = Object.values(T).reduce((x, o) => x + o.wrong, 0);
    const piTopics = Object.entries(window.TOPICS).filter(([t, o]) => window.CAPITOLI_PI.includes(o.cap) && T[t].total);
    const weak = piTopics.filter(([t]) => T[t].a >= 3 && T[t].c / T[t].a < 0.7)
      .sort((a, b) => T[a[0]].c / T[a[0]].a - T[b[0]].c / T[b[0]].a).slice(0, 3);
    const untouched = piTopics.filter(([t]) => !T[t].seen).slice(0, 3);
    const done = STORE.data.days[STORE.dayKey()] || 0;
    const cards = window.FLASHCARD ? window.FLASHCARD.dueCount() : 0;
    return { pi, n, wrong, weak, untouched, done, T, cards };
  }

  function todayHtml() {
    const o = todayInfo();
    const items = [];
    if (o.cards) items.push(`<a href="#/dimostrazioni?due=1">ripassa <strong>${o.cards}</strong> dimostrazion${o.cards === 1 ? "e" : "i"}</a> (scadute o mai viste)`);
    if (o.wrong) items.push(`<a href="#/quiz?wrong=1">rifai le <strong>${o.wrong}</strong> domand${o.wrong === 1 ? "a sbagliata" : "e sbagliate"}</a> l'ultima volta`);
    o.weak.forEach(([t, x]) => items.push(`ripassa <a href="#/quiz?topic=${t}">${esc(x.label)}</a> (${Math.round(o.T[t].c / o.T[t].a * 100)}% di risposte giuste)`));
    o.untouched.forEach(([t, x]) => items.push(`non hai ancora provato <a href="#/quiz?topic=${t}">${esc(x.label)}</a>`));
    if (o.n >= 0 && o.n <= 7) items.push(`negli ultimi giorni conta il formato: allenati sui <a href="#/quiz?type=cloze">completamenti</a> e sulle <a href="#/quiz?type=multi">domande con più risposte</a>, come nella prova`);
    if (!items.length) items.push(`fai un <a href="#/quiz">quiz misto</a> da 10 domande`);
    const big = o.n > 0 ? o.n : o.n === 0 ? "oggi" : "✓";
    const lbl = o.n > 1 ? "giorni alla P.I." : o.n === 1 ? "giorno alla P.I." : o.n === 0 ? "è il giorno della P.I." : "P.I. passata";
    return `
      <div class="countdown"><div class="num">${big}</div><div class="lbl">${lbl}</div></div>
      <div>
        <h2 style="margin-bottom:.2rem">Oggi</h2>
        <p class="dim small" style="margin:0">${o.done ? `Hai già dato ${o.done} rispost${o.done === 1 ? "a" : "e"} oggi. ` : ""}Cosa ripassare:</p>
        <ul>${items.map(i => `<li>${i}</li>`).join("")}</ul>
        <label class="dim small">data della P.I.: <input type="date" class="date-edit" id="piDate" value="${esc(o.pi)}"></label>
      </div>`;
  }

  function todayText() {
    const o = todayInfo();
    const lines = [];
    lines.push(o.n > 0 ? `Mancano <strong>${o.n}</strong> giorni alla P.I. (${o.pi.split("-").reverse().join("/")}).` : o.n === 0 ? "La P.I. è oggi. In bocca al lupo!" : "La data della P.I. è passata: puoi cambiarla nel blocco \"Oggi\".");
    if (o.cards) lines.push(`${o.cards} dimostrazioni da ripassare: <a href="#/dimostrazioni?due=1">flashcard</a>.`);
    if (o.wrong) lines.push(`${o.wrong} domande sbagliate da rifare: <a href="#/quiz?wrong=1">quiz degli errori</a>.`);
    if (o.weak.length) lines.push("Argomenti deboli: " + o.weak.map(([t, x]) => `<a href="#/quiz?topic=${t}">${esc(x.label)}</a>`).join(", ") + ".");
    if (o.untouched.length) lines.push("Mai provati: " + o.untouched.map(([t, x]) => `<a href="#/quiz?topic=${t}">${esc(x.label)}</a>`).join(", ") + ".");
    return lines.join("<br>");
  }

  /* ======================== cella notebook ======================== */
  const NB = { n: 0, cells: [], hist: [], hpos: 0 };

  const SECTIONS = {
    quiz: { to: "quiz", d: "domande in stile prova, con spiegazione" },
    teoria: { to: "teoria", d: "teoremi, definizioni e metodi, con le dimostrazioni passo passo" },
    esercizi: { to: "esercizi", d: "tracce d'esame svolte e generatori di varianti" },
    grafici: { to: "grafici", d: "grafici interattivi: somme di Riemann, funzione integrale, valore assoluto" },
    simula: { to: "esame", d: "simulazione della P.I. col timer e voto indicativo" },
    dimostrazioni: { to: "dimostrazioni", d: "flashcard delle dimostrazioni, con ripasso dilazionato" },
    stats: { to: "stats", d: "andamento per argomento, export e import" }
  };
  const ALIASES = { esame: "simula", simulazione: "simula", dim: "dimostrazioni", flashcard: "dimostrazioni", statistiche: "stats", help: "aiuto", "?": "aiuto", today: "oggi", clear: "pulisci" };

  function findTopic(s) {
    s = s.toLowerCase().trim();
    if (!s) return null;
    if (window.TOPICS[s]) return s;
    const T = Object.entries(window.TOPICS);
    // prima le chiavi, poi gli inizi di parola dell'etichetta, solo alla fine "contiene"
    const hit = T.find(([t]) => t.startsWith(s)) ||
      T.find(([, o]) => o.label.toLowerCase().split(/[\s']+/).some(w => w.startsWith(s))) ||
      T.find(([, o]) => o.label.toLowerCase().includes(s));
    return hit ? hit[0] : null;
  }

  function run(raw) {
    const line = raw.trim();
    if (!line) return null;
    const [w0, ...rest] = line.split(/\s+/);
    const cmd = ALIASES[w0.toLowerCase()] || w0.toLowerCase();
    const arg = rest.join(" ");
    if (cmd === "pulisci") { NB.cells = []; NB.n = 0; return "__clear"; }
    if (cmd === "aiuto") {
      return `Comandi disponibili (oppure clicca una scheda sotto):<ul>${Object.entries(SECTIONS).map(([k, v]) => `<li><code>${k}</code>: ${v.d}</li>`).join("")}
        <li><code>quiz razionali</code>: quiz su un argomento (anche <code>quiz cauchy</code>, <code>quiz wronskiano</code>...)</li>
        <li><code>oggi</code>: conto alla rovescia e cosa ripassare</li>
        <li><code>argomenti</code>: elenco degli argomenti</li>
        <li><code>tema</code>: quaderno o lavagna · <code>info</code> · <code>pulisci</code></li></ul>`;
    }
    if (cmd === "oggi") return todayText();
    if (cmd === "info") {
      return `EAM2 Trainer: allenamento per la <strong>prova intermedia</strong> di Elementi di Analisi Matematica 2 (integrali ed equazioni differenziali). Domande e soluzioni seguono metodi e notazioni delle lezioni; ogni calcolo è verificato con sympy.<br>
        <span class="dim">Progetto di studenti, non ufficiale: fa fede il materiale della docente. Trovi un errore? Usa "Segnala un errore" sotto ogni domanda.</span>`;
    }
    if (cmd === "tema") { toggleTheme(); return `Tema: ${currentTheme() === "dark" ? "lavagna" : "quaderno"}.`; }
    if (cmd === "argomenti") {
      return Object.entries(window.CAPITOLI).map(([c, l]) => `<strong>${c}. ${esc(l)}</strong>: ` +
        Object.entries(window.TOPICS).filter(([, o]) => String(o.cap) === c).map(([t]) => `<code>${t}</code>`).join(" ")).join("<br>");
    }
    if (SECTIONS[cmd]) {
      if (cmd === "quiz" && arg) {
        const t = findTopic(arg);
        if (!t) return `Argomento "${esc(arg)}" non trovato. Digita <code>argomenti</code> per l'elenco.`;
        setTimeout(() => ROUTER.go("quiz", { topic: t }), 250);
        return `Apro un quiz su <strong>${esc(window.TOPICS[t].label)}</strong>…`;
      }
      setTimeout(() => ROUTER.go(SECTIONS[cmd].to), 250);
      return `Apro <strong>${cmd}</strong>…`;
    }
    const t = findTopic(line);
    if (t) return `Forse cercavi <code>quiz ${t}</code> (${esc(window.TOPICS[t].label)})?`;
    return `Comando sconosciuto: <code>${esc(w0)}</code>. Digita <code>aiuto</code>.`;
  }

  function cellsHtml() {
    return NB.cells.map(c => `
      <div class="nb-cell"><span class="nb-label">In[${c.n}]:=</span><span class="nb-echo">${esc(c.in)}</span></div>
      <div class="nb-cell"><span class="nb-label out">Out[${c.n}]=</span><div class="nb-result">${c.out}</div></div>`).join("");
  }

  /* ======================== home ======================== */
  const APPS = [
    ["teoria", "teoria", "teoremi, definizioni e metodi in box da libro, con analogie ed esempi", 3],
    ["quiz", "quiz", "tutti i tipi di domanda della prova, con spiegazione di ogni opzione", 0],
    ["esercizi", "esercizi", "tracce d'esame svolte nello stile della docente, risposta controllata", 4],
    ["grafici", "grafici", "somme di Riemann, funzione integrale, primitive con valore assoluto", 6],
    ["esame", "simula", "la P.I. 2026/27 in 6 quesiti e 90 minuti, con voto indicativo", 4],
    ["dimostrazioni", "dimostrazioni", "flashcard delle dimostrazioni: riordina i passi, completa, ripeti", 3],
    ["stats", "stats", "andamento per argomento, errori da rifare, export dei dati", 0]
  ];

  function home(main) {
    if (!NB.cells.length) {
      NB.n = 1;
      NB.cells.push({ n: 1, in: "oggi", out: todayText() });
    }
    main.innerHTML = `
      <section class="hero">
        <h1>Allenati per la P.I. di <span class="i">Analisi 2</span></h1>
        <p class="lead">Integrali ed equazioni differenziali, con le domande, i metodi e la notazione delle lezioni. Scrivi un comando nella cella o scegli una sezione.</p>
      </section>
      <div class="card today" id="todayBox">${todayHtml()}</div>
      <div class="nb" id="nb">
        <div class="nb-out" id="nbOut" aria-live="polite">${cellsHtml()}</div>
        <form class="nb-line" id="nbForm" autocomplete="off">
          <label class="nb-label" for="nbIn" id="nbLabel">In[${NB.n + 1}]:=</label>
          <input id="nbIn" class="nb-in" autocapitalize="none" autocorrect="off" spellcheck="false" placeholder="aiuto" aria-describedby="nbHint">
        </form>
        <div class="nb-hint" id="nbHint">Prova <code>quiz razionali</code>, <code>oggi</code>, <code>aiuto</code>. Frecce su/giù per la cronologia.</div>
      </div>
      <nav class="apps" aria-label="Sezioni">
        ${APPS.map(([to, cmd, d, phase]) => `<a class="app" href="#/${to}"><span class="app-cmd">${cmd}</span><span class="app-desc">${d}</span>${phase && !READY.has(to) ? `<span class="soon">in arrivo</span>` : ""}</a>`).join("")}
      </nav>`;

    const out = $("#nbOut", main), inp = $("#nbIn", main);
    out.scrollTop = out.scrollHeight;
    $("#nbForm", main).addEventListener("submit", e => {
      e.preventDefault();
      const v = inp.value;
      if (!v.trim()) return;
      NB.hist.push(v); NB.hpos = NB.hist.length;
      const res = run(v);
      inp.value = "";
      if (res === "__clear") { out.innerHTML = ""; }
      else {
        NB.n++;
        NB.cells.push({ n: NB.n, in: v, out: res });
        if (NB.cells.length > 30) NB.cells.shift();
        out.innerHTML = cellsHtml();
        typeset(out);
        out.scrollTop = out.scrollHeight;
      }
      $("#nbLabel", main).textContent = `In[${NB.n + 1}]:=`;
    });
    inp.addEventListener("keydown", e => {
      if (e.key === "ArrowUp" && NB.hpos > 0) { NB.hpos--; inp.value = NB.hist[NB.hpos]; e.preventDefault(); }
      if (e.key === "ArrowDown") { NB.hpos = Math.min(NB.hist.length, NB.hpos + 1); inp.value = NB.hist[NB.hpos] || ""; e.preventDefault(); }
    });
    bindDate(main);
    // niente autofocus sui telefoni: aprirebbe la tastiera appena caricata la pagina
    if (!window.UI.coarse()) inp.focus({ preventScroll: true });
  }
  function bindDate(main) {
    $("#piDate", main).addEventListener("change", e => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(e.target.value)) return;
      STORE.setting("piDate", e.target.value);
      $("#todayBox", main).innerHTML = todayHtml();
      bindDate(main);
      toast("Data della P.I. aggiornata.");
    });
  }

  /* sezioni pronte (le altre in home mostrerebbero "in arrivo") */
  const READY = new Set(["quiz", "stats", "teoria", "dimostrazioni", "esercizi", "esame", "grafici"]);

  ROUTER.register("home", home);
  ROUTER.register("notfound", main => {
    main.innerHTML = `<h1>Pagina non trovata</h1><p>Il link non corrisponde a nessuna sezione. <a href="#/">Torna alla home</a>.</p>`;
  });

  ROUTER.start();
})();

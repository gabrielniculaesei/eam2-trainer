/* Vista "esercizi": tracce d'esame, esercizi delle lezioni e dei fogli della
   docente, generatori di varianti. Ogni esercizio: testo, risposta controllata
   da js/expr.js, passi della soluzione da scoprire uno alla volta, autovalutazione.
   Route: #/esercizi, #/esercizi/<id>, #/esercizi/<idGeneratore>?seed=123 */
(function () {
  "use strict";
  const { $, $$, esc, md, typeset, topicLabel, reportLink } = window.UI;

  const all = () => window.ESERCIZI || [];
  const byId = id => all().find(e => e.id === id);
  const gens = () => window.GENERATORI || [];
  const genById = id => gens().find(g => g.id === id);

  const SELF = [
    { k: "giusto", l: "giusto", s: 1 },
    { k: "calcolo", l: "errore di calcolo", s: 0.5 },
    { k: "metodo", l: "errore di metodo", s: 0 },
    { k: "nonsvolto", l: "non svolto", s: 0 }
  ];

  function fonte(e) {
    const s = e.src || "";
    if (/^P\.I\.|Simulazione|Esempio di prova/.test(s)) return "pi";
    if (/^Appello|^Recupero/.test(s)) return "appelli";
    if (/^Foglio|foglio/.test(s)) return "fogli";
    return "lezioni";
  }
  const FONTI = { pi: "prove intermedie", appelli: "appelli", fogli: "fogli della docente", lezioni: "lezioni e dispense" };

  /* ---------- widget di risposta (usato anche dalla simulazione) ---------- */
  const HINT = String.raw`Scrivi per esempio <code>2x^2 - 3x + 1</code>, <code>e^(2x)(x-1)/4</code>, <code>sqrt(x+1)</code>, <code>log(x^2+4)</code>, <code>arctan(x/2)</code>, <code>|x-1|</code>, <code>pi</code>. Moltiplicazione implicita ammessa.`;

  function fieldLabel(f) {
    if (f.kind === "prim") return (f.label || "una primitiva") + " <span class='dim small'>(la costante non conta)</span>";
    if (f.kind === "ode") return (f.label || "un integrale particolare") + " <span class='dim small'>(controllato sostituendolo nell'equazione)</span>";
    return f.label;
  }

  /* values: array di stringhe; onChange(values) a ogni modifica */
  function answerForm(box, ex, opts) {
    opts = opts || {};
    const values = (opts.values || []).slice();
    const fields = ex.answer.fields;
    if (!fields.length) { box.innerHTML = `<p class="dim small">Questo esercizio non ha una risposta da controllare in automatico: svolgilo su carta e confronta con la soluzione.</p>`; return { values: () => [], check: () => null }; }
    box.innerHTML = `<div class="answer-fields">${fields.map((f, i) => `
      <div class="af" data-i="${i}">
        <label class="af-label" for="af-${ex.id}-${i}">${md(fieldLabel(f))}</label>
        <div class="af-row">
          <span class="af-pre">${f.kind === "number" ? "=" : "="}</span>
          <input id="af-${ex.id}-${i}" class="af-in no-math" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" value="${esc(values[i] || "")}" ${opts.disabled ? "disabled" : ""}>
          <span class="af-mark" aria-live="polite"></span>
        </div>
        <div class="af-prev" aria-hidden="true"></div>
      </div>`).join("")}
      <p class="dim small af-hint">${HINT}</p></div>`;
    typeset(box);
    const preview = (i) => {
      const inp = $(`#af-${CSS.escape(ex.id)}-${i}`, box), prev = $(`.af[data-i="${i}"] .af-prev`, box);
      const v = inp.value.trim();
      if (!v) { prev.innerHTML = ""; return; }
      try { prev.innerHTML = `$${window.EXPR.toTeX(v)}$`; prev.classList.remove("bad"); typeset(prev); }
      catch (e) { prev.textContent = e.message; prev.classList.add("bad"); }
    };
    fields.forEach((f, i) => {
      const inp = $(`#af-${CSS.escape(ex.id)}-${i}`, box);
      inp.addEventListener("input", () => { values[i] = inp.value; preview(i); if (opts.onChange) opts.onChange(values.slice()); });
      preview(i);
    });
    return {
      values: () => values.slice(),
      /* controlla e marca i campi; restituisce { score, ok: [bool] } */
      check() {
        const ok = fields.map((f, i) => window.EXPR.checkField(f, values[i]));
        ok.forEach((r, i) => {
          const m = $(`.af[data-i="${i}"] .af-mark`, box);
          m.textContent = r.ok ? "giusto" : (r.msg === "vuoto" ? "vuoto" : "no");
          m.className = "af-mark " + (r.ok ? "ok" : "ko");
          m.title = r.msg;
        });
        return { score: ok.filter(r => r.ok).length / fields.length, ok: ok.map(r => r.ok), msgs: ok.map(r => r.msg) };
      }
    };
  }

  function stepsHtml(ex, upto) {
    const n = upto == null ? ex.steps.length : upto;
    return `<ol class="ex-steps">${ex.steps.slice(0, n).map(s => `<li>${md(s)}</li>`).join("")}</ol>`;
  }

  function headHtml(ex) {
    return `<div class="q-meta">
        <span class="tag type">${esc(FONTI[fonte(ex)] || "esercizio")}</span>
        <span class="tag">${esc(topicLabel(ex.topic))}</span>
        ${ex.daVerificare ? `<span class="tag warn" title="testo letto da un PDF o con un refuso nell'originale">testo da verificare</span>` : ""}
        ${ex.gen ? `<span class="tag">variante generata</span>` : ""}
        <span class="src">${esc(ex.src)}</span>
      </div>
      <div class="q-text">${md(ex.text)}</div>
      ${ex.nota ? `<div class="warnbox"><div class="thm-h">Attenzione</div>${md(ex.nota)}</div>` : ""}`;
  }

  /* ---------- pagina di un esercizio ---------- */
  function exercisePage(main, ex, ctx) {
    const st = window.STORE.data.ex[ex.id];
    main.innerHTML = `
      <nav class="crumbs"><a href="#/esercizi">Esercizi</a> › ${esc(topicLabel(ex.topic))}</nav>
      <h1>${ex.gen ? esc(ex.title) : "Esercizio"}</h1>
      <article class="card q-card">
        ${headHtml(ex)}
        ${ex.gen ? `<p class="small dim">Variante n. ${ex.seed}: <a href="#/esercizi/${ex.gen}?seed=${ex.seed}">link a questa variante</a> · <a href="#/esercizi/${ex.gen}" id="exNew">nuova variante</a></p>` : ""}
        <div id="exForm"></div>
        <div class="q-actions">
          ${ex.answer.fields.length ? `<button class="btn" id="exCheck">verifica la risposta</button>` : ""}
          <button class="btn ghost" id="exStep">mostra il primo passo</button>
          <button class="btn ghost" id="exAll">mostra tutta la soluzione</button>
        </div>
        <div id="exFb" class="fb" aria-live="polite"></div>
        <div id="exSteps"></div>
        <div class="self-eval card" id="exSelf">
          <span class="dim small">Com'è andata?${st ? ` <span class="badge">già fatto ${st.a} volt${st.a === 1 ? "a" : "e"}</span>` : ""}</span>
          <div class="row">${SELF.map(o => `<button class="btn small ghost" data-self="${o.k}">${o.l}</button>`).join("")}</div>
        </div>
        <p class="small">${reportLink(ex.id, "un esercizio")}</p>
      </article>
      <div class="row small">${ctx.prev ? `<a href="#/esercizi/${ctx.prev}">← precedente</a>` : ""}<span class="spacer"></span>${ctx.next ? `<a href="#/esercizi/${ctx.next}">successivo →</a>` : ""}</div>`;
    const form = answerForm($("#exForm", main), ex);
    let shown = 0;
    const steps = $("#exSteps", main);
    const showSteps = n => {
      shown = Math.min(ex.steps.length, n);
      steps.innerHTML = `<div class="thm dimo sol"><div class="thm-h">Soluzione${shown < ex.steps.length ? ` (passo ${shown} di ${ex.steps.length})` : ""}</div>${stepsHtml(ex, shown)}</div>`;
      typeset(steps);
      $("#exStep", main).textContent = shown < ex.steps.length ? "mostra il passo successivo" : "soluzione completa";
      $("#exStep", main).disabled = shown >= ex.steps.length;
      $("#exAll", main).classList.toggle("hidden", shown >= ex.steps.length);
    };
    $("#exStep", main).addEventListener("click", () => showSteps(shown + 1));
    $("#exAll", main).addEventListener("click", () => showSteps(ex.steps.length));
    if ($("#exCheck", main)) $("#exCheck", main).addEventListener("click", () => {
      const r = form.check();
      const fb = $("#exFb", main);
      const n = ex.answer.fields.length;
      fb.innerHTML = `<div class="verdict-bar ${r.score >= 1 ? "ok" : r.score > 0 ? "part" : "ko"}"><span>${r.score >= 1 ? "Risposta giusta" : r.score > 0 ? "In parte giusta" : "Non ancora"}</span><span>${n > 1 ? `${r.ok.filter(Boolean).length} su ${n}` : ""}</span></div>
        ${r.score < 1 ? `<p class="small dim">Un campo segnato "no" non coincide con la soluzione nei punti di controllo. Ricontrolla i conti, oppure scopri un passo alla volta.</p>` : ""}`;
      if (r.score >= 1) window.STORE.recordEx(ex.id, 1);
    });
    $$("[data-self]", main).forEach(b => b.addEventListener("click", () => {
      const o = SELF.find(s => s.k === b.dataset.self);
      window.STORE.recordEx(ex.gen || ex.id, o.s);
      window.UI.toast(`Registrato: ${o.l}.`);
      $$("[data-self]", main).forEach(x => { x.disabled = true; });
      if (shown < ex.steps.length) showSteps(ex.steps.length);
    }));
    if (ex.gen && $("#exNew", main)) $("#exNew", main).addEventListener("click", e => { e.preventDefault(); window.ROUTER.go("esercizi", { seed: window.RNG.randomSeed() }, [ex.gen]); });
  }

  /* ---------- elenco ---------- */
  let F = { cap: null, fonte: null, topic: null, todo: false };
  function listPage(main, params) {
    if (params.topic && window.TOPICS[params.topic]) F = { cap: window.TOPICS[params.topic].cap, fonte: null, topic: params.topic, todo: false };
    main.innerHTML = `<h1>Esercizi</h1>
      <p class="lead">Tracce delle prove e degli appelli, esercizi delle lezioni e dei fogli della docente, svolti con il metodo visto a lezione. Ogni passaggio è verificato con il calcolo simbolico. Scrivi la risposta e controllala, oppure scopri la soluzione un passo alla volta.</p>
      <div id="genBox"></div>
      <div class="card" id="eFilters">
        <span class="field-label">Capitolo</span><div class="chips" id="eCap"></div>
        <span class="field-label">Fonte</span><div class="chips" id="eFonte"></div>
        <span class="field-label">Argomento</span><div class="chips" id="eTopic"></div>
        <label class="check"><input type="checkbox" id="eTodo"> solo quelli che non ho ancora fatto</label>
      </div>
      <div id="eList"></div>`;
    if (gens().length) {
      $("#genBox", main).innerHTML = `<div class="card"><h2>Generatori di varianti</h2><p class="dim small">Esercizi dello stesso tipo delle prove con numeri sempre nuovi, costruiti in modo che i conti vengano puliti. Ogni variante ha un link condivisibile.</p>
        <div class="apps">${gens().map(g => `<a class="app" href="#/esercizi/${g.id}"><span class="app-cmd">${esc(g.short || g.id)}</span><span class="app-desc">${md(g.title)}</span></a>`).join("")}</div></div>`;
    }
    const chip = (l, on, a) => `<button type="button" class="chip" aria-pressed="${on}" ${a}>${l}</button>`;
    const filtered = () => all().filter(e => (F.cap === null || e.cap === F.cap) && (!F.fonte || fonte(e) === F.fonte) && (!F.topic || e.topic === F.topic) && (!F.todo || !window.STORE.data.ex[e.id]));
    function draw() {
      $("#eCap", main).innerHTML = chip("tutti", F.cap === null, 'data-cap=""') + [1, 2].map(c => chip(`${c}. ${esc(window.CAPITOLI[c])}`, F.cap === c, `data-cap="${c}"`)).join("");
      $("#eFonte", main).innerHTML = chip("tutte", !F.fonte, 'data-fonte=""') + Object.entries(FONTI).map(([k, l]) => chip(l, F.fonte === k, `data-fonte="${k}"`)).join("");
      const tps = [...new Set(all().filter(e => F.cap === null || e.cap === F.cap).map(e => e.topic))];
      $("#eTopic", main).innerHTML = chip("tutti", !F.topic, 'data-topic=""') + tps.map(t => chip(`${esc(topicLabel(t))}<span class="n">${all().filter(e => e.topic === t).length}</span>`, F.topic === t, `data-topic="${t}"`)).join("");
      $("#eTodo", main).checked = F.todo;
      const list = filtered();
      const groups = {};
      list.forEach(e => { (groups[e.topic] = groups[e.topic] || []).push(e); });
      $("#eList", main).innerHTML = Object.entries(groups).map(([t, es]) => `<section class="card"><h2>${esc(topicLabel(t))}</h2><ul class="ex-list">${es.map(e => {
        const s = window.STORE.data.ex[e.id];
        return `<li><a href="#/esercizi/${e.id}"><span class="ex-src">${esc(e.src)}</span><span class="ex-text">${md(e.text)}</span>
          <span class="ex-st">${s ? (s.last >= 1 ? '<span class="t-done">✓</span>' : '<span class="tag">fatto</span>') : ""}${e.daVerificare ? '<span class="tag warn">da verificare</span>' : ""}</span></a></li>`;
      }).join("")}</ul></section>`).join("") || `<p class="notice">Nessun esercizio con questi filtri.</p>`;
      typeset($("#eList", main));
    }
    $("#eFilters", main).addEventListener("click", e => {
      const b = e.target.closest(".chip"); if (!b) return;
      if ("cap" in b.dataset) { F.cap = b.dataset.cap === "" ? null : +b.dataset.cap; F.topic = null; }
      if ("fonte" in b.dataset) F.fonte = b.dataset.fonte || null;
      if ("topic" in b.dataset) F.topic = b.dataset.topic || null;
      draw();
    });
    $("#eTodo", main).addEventListener("change", e => { F.todo = e.target.checked; draw(); });
    draw();
  }

  /* generatore di domande: si gioca come nel quiz, con varianti infinite */
  function mcqPage(main, g, v, seed) {
    const q = Object.assign({ id: `${g.id}-${seed}`, cap: g.cap, topic: g.topic }, v);
    main.innerHTML = `
      <nav class="crumbs"><a href="#/esercizi">Esercizi</a> › generatori</nav>
      <h1>${md(g.title)}</h1>
      <div id="gq"></div>
      <div class="row small"><span class="dim">Variante n. ${seed} · <a href="#/esercizi/${g.id}?seed=${seed}">link a questa variante</a></span><span class="spacer"></span>
        <button class="btn" id="gNew">nuova variante</button></div>`;
    window.QUIZ.mount($("#gq", main), q, { mode: "practice", onReveal(sc) { window.STORE.recordEx(g.id, sc); } });
    $("#gNew", main).addEventListener("click", () => window.ROUTER.go("esercizi", { seed: window.RNG.randomSeed() }, [g.id]));
  }

  function view(main, params, rest) {
    if (rest && rest[0]) {
      const g = genById(rest[0]);
      if (g) {
        const seed = +params.seed || window.RNG.randomSeed();
        if (!params.seed) window.ROUTER.replace("esercizi", { seed }, [g.id]);
        const v = g.gen(window.RNG.create(seed));
        if (g.mcq) return mcqPage(main, g, v, seed);
        const ex = Object.assign({ id: `${g.id}-${seed}`, cap: g.cap, topic: g.topic, src: "Variante generata", gen: g.id, seed, title: g.title }, v);
        return exercisePage(main, ex, {});
      }
      const ex = byId(rest[0]);
      if (ex) {
        const list = all(), i = list.indexOf(ex);
        return exercisePage(main, ex, { prev: list[i - 1] && list[i - 1].id, next: list[i + 1] && list[i + 1].id });
      }
    }
    listPage(main, params);
  }

  window.ESERCIZI_UI = { answerForm, stepsHtml, headHtml, byId, fonte, SELF };
  window.ROUTER.register("esercizi", view);
})();

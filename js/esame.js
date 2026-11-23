/* Vista "esame": simulazione della prova.
   Formati: P.I. 2026/27 (6 quesiti), P.I. 2025 (compito A o B: teorema + esercizio),
   esame completo capp. 1-2 (teorema + esercizio). Timer, ripresa dopo il
   ricaricamento (anche dei testi scritti), correzione separata teoria/tecnica,
   voto indicativo con le fasce del syllabus. Route: #/esame */
(function () {
  "use strict";
  const { $, $$, esc, md, typeset, topicLabel } = window.UI;
  const QZ = () => window.QUIZ, EX = () => window.ESERCIZI_UI, TH = () => window.TEORIA_UI;

  const FORMATI = {
    pi2627: { l: "P.I. 2026/27 (sei quesiti)", d: "Sei quesiti pescati da tutto il programma, con la forma dell'esempio pubblicato: teorici (dimostrazioni guidate, risposte multiple, implicazioni, enunciati) e tecnici (esercizi da svolgere, domande di calcolo). Ogni simulazione è diversa.", min: 90 },
    pi2025: { l: "P.I. 2025 (compito A o B)", d: "Un teorema da enunciare e dimostrare e un esercizio. Compito A: teorema sulle equazioni differenziali e primitiva con valore assoluto. Compito B: teorema sugli integrali e problema di Cauchy.", min: 90 },
    completo: { l: "Esame completo (capp. 1-2)", d: "Come l'esame di chi non supera la P.I., limitato ai primi due capitoli: un teorema e un esercizio pescati da tutto il programma.", min: 90 }
  };

  let S = null;        // simulazione in corso
  let tick = null;
  let saveTimer = null;
  const ctls = {};     // controller delle domande e dei form

  const rng = () => window.RNG.create(window.RNG.randomSeed());
  const okEx = e => !e.daVerificare && e.answer.fields.length > 0;

  function pick(list, r) { return list.length ? r.pick(list) : null; }
  const P = (x, part) => x ? Object.assign(x, { part }) : null;

  /* ---------- costruzione della prova ---------- */
  function build(fmt, opt) {
    const r = rng();
    const Q = QZ().all().filter(q => !q.daVerificare && window.CAPITOLI_PI.includes(q.cap));
    const E = (window.ESERCIZI || []).filter(okEx);
    const G = window.GENERATORI || [];
    const exItem = (topics, genIds) => {
      const gs = G.filter(g => genIds.includes(g.id));
      if (gs.length && r.next() < 0.4) return { k: "ex", gen: r.pick(gs).id, seed: window.RNG.randomSeed() };
      const e = pick(E.filter(e => topics.includes(e.topic)), r);
      return e ? { k: "ex", id: e.id } : null;
    };
    const qItem = (pred, genIds) => {
      const gs = G.filter(g => genIds && genIds.includes(g.id) && g.mcq);
      if (gs.length && r.next() < 0.35) return { k: "gq", gen: r.pick(gs).id, seed: window.RNG.randomSeed() };
      const q = pick(Q.filter(pred), r);
      return q ? { k: "q", id: q.id } : null;
    };
    const thms = cap => TH().proofs().filter(n => cap == null || n._cap.cap === cap);
    let items = [];
    if (fmt === "pi2627") {
      items = buildPI(r, Q, E, G, thms(null));
    } else if (fmt === "pi2025") {
      const A = opt.compito === "A";
      items = [
        { k: "thm", id: r.pick(thms(A ? 2 : 1)).id, part: "T" },
        P(A ? exItem(["valore_assoluto"], ["gen-abs-poly", "gen-abs-exp"]) : exItem(["cauchy"], ["gen-pc2"]), "E")
      ];
    } else {
      items = [
        { k: "thm", id: r.pick(thms(null)).id, part: "T" },
        P(exItem(["valore_assoluto", "cauchy", "definiti", "somiglianza", "primo_ordine", "seno_coseno"], ["gen-abs-poly", "gen-abs-exp", "gen-pc2"]), "E")
      ];
    }
    items = items.filter(Boolean);
    const label = fmt === "pi2025" ? `P.I. 2025, compito ${opt.compito}` : FORMATI[fmt].l;
    return { kind: "esame", fmt, label, items, ans: {}, texts: {}, start: Date.now(), dur: (opt.min || FORMATI[fmt].min) * 60000, done: false };
  }

  /* P.I. in sei quesiti pescati da tutto il programma, con la forma dell'esempio
     della docente ma senza fissare gli argomenti: 3 o 4 teorici (almeno una
     dimostrazione guidata o un'implicazione), gli altri tecnici (almeno un
     esercizio da svolgere), entrambi i capitoli, mai due quesiti sullo stesso
     argomento. */
  const THEORY_T = ["cloze", "impl", "vf", "multi"];
  const isTheory = q => THEORY_T.includes(q.type) || (q.type === "mcq" && !q.chk);
  const isTech = q => q.type === "mcq" && !!q.chk;
  function buildPI(r, Q, E, G, thms) {
    const used = new Set(), caps = { 1: 0, 2: 0 }, types = {};
    const nT = r.next() < 0.5 ? 3 : 4, nE = 6 - nT;
    const capOk = c => {
      const left = 6 - caps[1] - caps[2];
      const other = c === 1 ? 2 : 1;
      return caps[other] > 0 || left > 2 || caps[c] === 0;   // lascia posto all'altro capitolo
    };
    const take = (cands, mk) => {
      let c = cands.filter(o => !used.has(o.topic) && capOk(o.cap));
      if (!c.length) c = cands.filter(o => !used.has(o.topic));
      if (!c.length) return null;
      const o = r.pick(c);
      used.add(o.topic); caps[o.cap] = (caps[o.cap] || 0) + 1;
      return mk(o);
    };
    const q = (pred, part) => take(Q.filter(pred).filter(x => (types[x.type] || 0) < 2), o => { types[o.type] = (types[o.type] || 0) + 1; return { k: "q", id: o.id, part }; });
    const T = [], X = [];
    // teorici
    T.push(q(x => x.type === "cloze" || x.type === "impl", "T"));
    if (r.next() < 0.25) T.push(take(thms.map(n => ({ id: n.id, topic: n.topic, cap: n._cap.cap })), o => ({ k: "thm", id: o.id, part: "T" })));
    while (T.filter(Boolean).length < nT) { const it = q(isTheory, "T"); if (!it) break; T.push(it); }
    // tecnici: almeno un esercizio da svolgere, poi esercizi o domande di calcolo
    const exCands = E.concat(G.filter(g => !g.mcq).map(g => ({ topic: g.topic, cap: g.cap, gen: g.id })));
    const ex = () => take(exCands, o => o.gen ? { k: "ex", gen: o.gen, seed: window.RNG.randomSeed(), part: "E" } : { k: "ex", id: o.id, part: "E" });
    const tq = () => {
      const gq = G.filter(g => g.mcq && !used.has(g.topic));
      if (gq.length && r.next() < 0.3) return take(gq.map(g => ({ topic: g.topic, cap: g.cap, gen: g.id })), o => ({ k: "gq", gen: o.gen, seed: window.RNG.randomSeed(), part: "E" }));
      return q(isTech, "E");
    };
    X.push(ex());
    while (X.filter(Boolean).length < nE) { const it = r.next() < 0.5 ? ex() : tq(); X.push(it || ex()); if (X.length > 8) break; }
    // ordine come nelle prove: teoria e tecnica alternate, si comincia dalla teoria
    const t = T.filter(Boolean), x = X.filter(Boolean), out = [];
    while (t.length || x.length) { if (t.length) out.push(t.shift()); if (t.length > x.length) out.push(t.shift()); if (x.length) out.push(x.shift()); }
    return out.slice(0, 6);
  }

  /* l'oggetto da mostrare per un elemento (domanda, esercizio, generatore) */
  function resolve(it) {
    if (it.k === "q") return QZ().byId(it.id);
    if (it.k === "gq") { const g = window.GENERATORI.find(g => g.id === it.gen); return Object.assign({ id: `${g.id}-${it.seed}`, cap: g.cap, topic: g.topic, src: "Variante generata" }, g.gen(window.RNG.create(it.seed))); }
    if (it.k === "ex" && it.gen) { const g = window.GENERATORI.find(g => g.id === it.gen); return Object.assign({ id: `${g.id}-${it.seed}`, cap: g.cap, topic: g.topic, src: "Variante generata", gen: g.id, seed: it.seed, title: g.title }, g.gen(window.RNG.create(it.seed))); }
    if (it.k === "ex") return EX().byId(it.id);
    if (it.k === "thm") return TH().byId(it.id);
  }

  function save(now) {
    if (!S) return;
    clearTimeout(saveTimer);
    if (S.done) return;
    const doit = () => window.STORE.setSession(S);
    if (now) doit(); else saveTimer = setTimeout(doit, 300);
  }

  /* ---------- schermata iniziale ---------- */
  function setup(host) {
    stopTick();
    const ses = window.STORE.getSession("esame");
    const resumable = ses && ses.kind === "esame" && !ses.done && Array.isArray(ses.items);
    const hist = window.STORE.data.exams.slice(-6).reverse();
    host.innerHTML = `<div class="ex-setup">
      ${resumable ? `<div class="notice resume"><span>Hai una simulazione in corso (${esc(ses.label)}), ${remaining(ses) > 0 ? "tempo residuo " + fmtTime(remaining(ses)) : "tempo scaduto"}.</span>
        <span class="row"><button class="btn small" id="sResume">riprendi</button><button class="btn small ghost" id="sDrop">abbandona</button></span></div>` : ""}
      <p class="lead">Simula la prova in condizioni reali: tempo, niente spiegazioni fino alla consegna, poi correzione con le soluzioni. Il voto è <strong>indicativo</strong>: fa fede la correzione della docente.</p>
      <div class="fmt-grid">${Object.entries(FORMATI).map(([k, f]) => `
        <label class="fmt card"><input type="radio" name="fmt" value="${k}" ${k === "pi2627" ? "checked" : ""}>
          <span class="fmt-l">${esc(f.l)}</span><span class="fmt-d">${esc(f.d)}</span></label>`).join("")}</div>
      <div class="card">
        <div id="optAB" class="hidden"><span class="field-label">Compito</span><div class="chips"><button type="button" class="chip" aria-pressed="true" data-c="A">A</button><button type="button" class="chip" aria-pressed="false" data-c="B">B</button></div></div>
        <span class="field-label">Durata</span>
        <div class="chips" id="optMin">${[45, 90, 120].map(m => `<button type="button" class="chip" aria-pressed="${m === 90}" data-m="${m}">${m} minuti</button>`).join("")}</div>
        <div class="row" style="margin-top:1rem"><button class="btn" id="sStart">inizia la simulazione</button></div>
      </div>
      ${hist.length ? `<div class="card"><h2>Storico</h2><table class="hist"><thead><tr><th>data</th><th>formato</th><th>teoria</th><th>tecnica</th><th>esito</th></tr></thead><tbody>${hist.map(h => `<tr><td>${esc(new Date(h.ts).toLocaleDateString("it-IT"))}</td><td>${esc(h.label)}</td><td>${Math.round(h.pT * 100)}%</td><td>${Math.round(h.pE * 100)}%</td><td>${esc(h.esito)}</td></tr>`).join("")}</tbody></table></div>` : ""}
    </div>`;
    let compito = "A", min = 90;
    const box = $(".ex-setup", host);
    const sync = () => {
      const fmt = $("input[name=fmt]:checked", box).value;
      $("#optAB", box).classList.toggle("hidden", fmt !== "pi2025");
    };
    $$("input[name=fmt]", box).forEach(i => i.addEventListener("change", sync));
    box.addEventListener("click", e => {
      const b = e.target.closest(".chip"); if (!b) return;
      if (b.dataset.c) { compito = b.dataset.c; $$("[data-c]", box).forEach(c => c.setAttribute("aria-pressed", c === b)); }
      if (b.dataset.m) { min = +b.dataset.m; $$("[data-m]", box).forEach(c => c.setAttribute("aria-pressed", c === b)); }
    });
    $("#sStart", box).addEventListener("click", async () => {
      if (resumable && !(await window.UI.confirm("Iniziare una nuova simulazione? Quella in corso verrà abbandonata.", "inizia"))) return;
      S = build($("input[name=fmt]:checked", box).value, { compito, min });
      save(true);
      run(host);
    });
    if (resumable) {
      $("#sResume", box).addEventListener("click", () => { S = ses; run(host); });
      $("#sDrop", box).addEventListener("click", () => { window.STORE.clearSession("esame"); setup(host); });
    }
  }

  /* ---------- prova in corso ---------- */
  const remaining = s => s.start + s.dur - Date.now();
  function fmtTime(ms) {
    const t = Math.max(0, Math.round(ms / 1000));
    const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = t % 60;
    return (h ? h + ":" + String(m).padStart(2, "0") : m) + ":" + String(s).padStart(2, "0");
  }
  function stopTick() { if (tick) clearInterval(tick); tick = null; }

  function itemHtml(it, i) {
    const o = resolve(it);
    const n = i + 1;
    if (it.k === "q" || it.k === "gq") return `<section class="ex-item" data-i="${i}"><div class="qhost" id="it${i}"></div></section>`;
    if (it.k === "ex") return `<section class="ex-item card q-card" data-i="${i}">
      <div class="q-meta"><span class="tag">Quesito ${n}</span><span class="tag type">esercizio</span><span class="tag">${esc(topicLabel(o.topic))}</span></div>
      <div class="q-text">${md(o.text)}</div>
      <div class="exform" id="it${i}"></div>
      <label class="field-label" for="tx${i}">Svolgimento (facoltativo, resta salvato)</label>
      <textarea class="answer-area" id="tx${i}" rows="5" placeholder="conti, passaggi...">${esc(S.texts[i] || "")}</textarea>
    </section>`;
    return `<section class="ex-item card q-card" data-i="${i}">
      <div class="q-meta"><span class="tag">Quesito ${n}</span><span class="tag type">teorema</span></div>
      <div class="q-text">Enunciare e dimostrare: <strong>${esc(o.label)}</strong>.</div>
      <textarea class="answer-area" id="tx${i}" rows="12" placeholder="Ip., Ts., Dim. ...">${esc(S.texts[i] || "")}</textarea>
      <p class="dim small">Dopo la consegna confronterai il tuo testo con i passi della dimostrazione.</p>
    </section>`;
  }

  function run(host) {
    stopTick();
    host.innerHTML = `
      <div class="exam-bar" role="region" aria-label="tempo">
        <span class="exam-title">${esc(S.label)}</span><span class="spacer"></span>
        <span class="exam-time" id="eTime"></span><span class="sr-only" aria-live="polite" id="eTimeSr"></span>
      </div>
      <div id="eItems">${S.items.map(itemHtml).join("")}</div>
      <div class="row end" style="margin-top:1rem"><button class="btn" id="eSubmit">consegna</button></div>`;
    S.items.forEach((it, i) => {
      if (it.k === "q" || it.k === "gq") {
        ctls[i] = QZ().mount($("#it" + i, host), resolve(it), { mode: "exam", number: i + 1, answer: S.ans[i], onChange(a) { S.ans[i] = a; save(); } });
      } else if (it.k === "ex") {
        ctls[i] = EX().answerForm($("#it" + i, host), resolve(it), { values: S.ans[i] || [], onChange(v) { S.ans[i] = v; save(); } });
      }
      const ta = $("#tx" + i, host);
      if (ta) ta.addEventListener("input", () => { S.texts[i] = ta.value; save(); });
    });
    typeset(host);
    window.ROUTER.setGuard({ view: "esame", active: () => !!(S && !S.done), message: "Hai una simulazione in corso. Puoi uscire e riprenderla più tardi (il tempo continua a scorrere). Uscire?" });
    let lastMin = null;
    const upd = () => {
      const r = remaining(S);
      const t = $("#eTime", host); if (!t) return stopTick();
      t.textContent = fmtTime(r);
      t.classList.toggle("low", r < 10 * 60000);
      const m = Math.ceil(r / 60000);
      if (m !== lastMin && (m % 10 === 0 || m <= 5)) { $("#eTimeSr", host).textContent = `mancano ${m} minuti`; }
      lastMin = m;
      if (r <= 0) { stopTick(); window.UI.toast("Tempo scaduto: la prova è stata consegnata."); submit(host); }
    };
    upd();
    tick = setInterval(upd, 1000);
    $("#eSubmit", host).addEventListener("click", async () => {
      const ok = await window.UI.confirm("Consegnare la prova? Dopo la consegna vedrai correzione e soluzioni.", "consegna");
      if (ok) submit(host);
    });
  }

  /* ---------- correzione ---------- */
  function submit(host) {
    stopTick();
    S.done = true;
    S.grade = {};
    S.items.forEach((it, i) => {
      if (it.k === "q" || it.k === "gq") S.grade[i] = QZ().score(resolve(it), S.ans[i] == null ? QZ().emptyAnswer(resolve(it)) : S.ans[i]);
      else if (it.k === "ex") {
        const ex = resolve(it);
        const vals = S.ans[i] || [];
        const r = ex.answer.fields.map((f, j) => window.EXPR.checkField(f, vals[j]).ok);
        S.grade[i] = r.length ? r.filter(Boolean).length / r.length : 0;
        S.auto = S.auto || {}; S.auto[i] = S.grade[i];
      } else S.grade[i] = 0;
    });
    S.checks = {};
    window.STORE.clearSession("esame");
    window.ROUTER.setGuard(null);
    review(host);
  }

  function totals() {
    const part = p => { const idx = S.items.map((it, i) => it.part === p ? i : -1).filter(i => i >= 0); return idx.length ? idx.reduce((a, i) => a + (S.grade[i] || 0), 0) / idx.length : 0; };
    const pT = part("T"), pE = part("E");
    let esito, voto = null;
    if (pT < 0.6 || pE < 0.6) esito = "non superata";
    else {
      const avg = (pT + pE) / 2;
      voto = avg >= 0.98 ? "30 e lode" : String(Math.min(30, 18 + Math.round((avg - 0.6) / 0.4 * 12)));
      esito = "voto indicativo " + voto;
    }
    const n = voto === "30 e lode" ? 31 : +voto;
    const fascia = voto == null ? "Serve un sufficiente margine di correttezza sia nella parte teorica sia in quella tecnica (soglia indicativa: 60% ciascuna)."
      : n <= 23 ? "Fascia 18-23: padronanza minima, esercizi semplici."
      : n <= 27 ? "Fascia 24-27: buona padronanza, pochi errori."
      : "Fascia 28-30 e lode: tutto il programma, esposizione completa, esercizi senza errori.";
    return { pT, pE, esito, voto, fascia };
  }

  function review(host) {
    host.innerHTML = `<div class="rv">
      <div class="card result-card" id="rSum"></div>
      <div id="rItems">${S.items.map((it, i) => reviewItem(it, i)).join("")}</div>
      <div class="row"><button class="btn" id="rSave">registra nello storico</button><button class="btn ghost" id="rNew">nuova simulazione</button></div></div>`;
    const rv = $(".rv", host);
    S.items.forEach((it, i) => {
      if (it.k === "q" || it.k === "gq") {
        QZ().mount($("#rq" + i, host), resolve(it), { mode: "exam", number: i + 1, answer: S.ans[i] == null ? QZ().emptyAnswer(resolve(it)) : S.ans[i], revealed: true });
      } else if (it.k === "ex") {
        const f = EX().answerForm($("#rq" + i, host), resolve(it), { values: S.ans[i] || [], disabled: true });
        f.check && resolve(it).answer.fields.length && f.check();
      }
    });
    const draw = () => {
      const t = totals();
      $("#rSum", host).innerHTML = `<h2>${esc(S.label)}: ${esc(t.esito)}</h2>
        <div class="stat-grid"><div class="stat"><div class="v">${Math.round(t.pT * 100)}%</div><div class="l">parte teorica</div></div>
        <div class="stat"><div class="v">${Math.round(t.pE * 100)}%</div><div class="l">parte tecnica</div></div></div>
        <p class="small">${esc(t.fascia)}</p>
        <p class="dim small">Esercizi e teoremi: correggi qui sotto con le soluzioni (spunta i passi scritti, autovaluta l'esercizio). I totali si aggiornano.</p>`;
    };
    rv.addEventListener("change", e => {
      const c = e.target.closest("input[data-step]"); if (!c) return;
      const i = +c.dataset.i;
      const boxes = $$(`input[data-i="${i}"][data-step]`, host);
      S.grade[i] = boxes.filter(b => b.checked).length / boxes.length;
      draw();
    });
    rv.addEventListener("click", e => {
      const b = e.target.closest("[data-selfi]"); if (!b) return;
      const i = +b.dataset.selfi, o = EX().SELF.find(s => s.k === b.dataset.self);
      S.grade[i] = Math.max(S.auto ? S.auto[i] || 0 : 0, o.s);
      $$(`[data-selfi="${i}"]`, host).forEach(x => x.setAttribute("aria-pressed", x === b));
      draw();
    });
    $("#rSave", host).addEventListener("click", () => {
      const t = totals();
      window.STORE.data.exams.push({ ts: Date.now(), label: S.label, pT: t.pT, pE: t.pE, esito: t.esito });
      if (window.STORE.data.exams.length > 50) window.STORE.data.exams.shift();
      S.items.forEach((it, i) => { if (it.k === "q") window.STORE.recordQ(it.id, S.grade[i]); if (it.k === "ex" && it.id) window.STORE.recordEx(it.id, S.grade[i]); });
      window.STORE.save();
      window.UI.toast("Risultato registrato.");
      $("#rSave", host).disabled = true;
    });
    $("#rNew", host).addEventListener("click", () => { S = null; setup(host); window.scrollTo(0, 0); });
    draw();
    typeset(host);
    window.scrollTo(0, 0);
  }

  function reviewItem(it, i) {
    const o = resolve(it);
    if (it.k === "q" || it.k === "gq") return `<section class="ex-item"><div id="rq${i}"></div></section>`;
    if (it.k === "ex") return `<section class="ex-item card q-card">
      ${EX().headHtml(o).replace('<div class="q-meta">', `<div class="q-meta"><span class="tag">Quesito ${i + 1}</span>`)}
      <div id="rq${i}"></div>
      ${S.texts[i] ? `<details><summary class="small">il tuo svolgimento</summary><pre class="mine">${esc(S.texts[i])}</pre></details>` : ""}
      <div class="thm dimo sol"><div class="thm-h">Soluzione</div>${EX().stepsHtml(o)}</div>
      <div class="self-eval"><span class="dim small">Autovalutazione (se non hai scritto la risposta o vuoi correggerla):</span>
        <div class="row">${EX().SELF.map(s => `<button type="button" class="chip" aria-pressed="false" data-selfi="${i}" data-self="${s.k}">${s.l}</button>`).join("")}</div></div>
    </section>`;
    return `<section class="ex-item card q-card">
      <div class="q-meta"><span class="tag">Quesito ${i + 1}</span><span class="tag type">teorema</span></div>
      <h3>${esc(o.label)}</h3>
      ${S.texts[i] ? `<details open><summary class="small">il tuo testo</summary><pre class="mine">${esc(S.texts[i])}</pre></details>` : `<p class="dim">Non hai scritto nulla.</p>`}
      ${TH().enunciatoHtml(o)}
      <div class="box"><div class="box-h">Spunta i passi che hai scritto (ognuno vale uguale)</div>
        <ul class="checklist">${o.dim.map((s, k) => `<li><label class="check"><input type="checkbox" data-i="${i}" data-step="${k}"><span>${md(s.passo)}<span class="why"><span>perché:</span> ${md(s.perche || "")}</span></span></label></li>`).join("")}</ul></div>
    </section>`;
  }

  function view(main) {
    main.innerHTML = `<h1>Simulazione della prova</h1><div id="exHost"></div>`;
    const host = $("#exHost", main);
    if (S && !S.done) run(host);
    else setup(host);
    return () => { stopTick(); save(true); };
  }

  window.ESAME = { build, totals: () => S && totals() };
  window.ROUTER.register("esame", view);
})();

/* Vista "dimostrazioni": i teoremi da saper dimostrare (★), divisi per
   capitolo e sezione. Per ognuno: studialo nella teoria (con grafico e
   collegamenti) e allenati in quattro modi: leggi e ripeti, riordina i passi,
   completa (cloze), scrivi e confronta (checklist dei passi). Si può anche fare
   una serie di più teoremi, prima quelli da ripassare.
   Route: #/dimostrazioni, ?id=t-media (un teorema), ?sec=s-proprieta, ?mode=riordina */
(function () {
  "use strict";
  const { $, $$, esc, md, typeset, topicLabel } = window.UI;
  const T = () => window.TEORIA_UI;

  const MODES = {
    leggi: { l: "leggi e ripeti", d: "leggi l'enunciato, ripeti la dimostrazione a voce o su carta, poi confronta" },
    riordina: { l: "riordina i passi", d: "i passi della dimostrazione sono mescolati: rimettili in ordine" },
    completa: { l: "completa", d: "la dimostrazione con gli spazi vuoti da riempire, come nei quesiti di completamento" },
    scrivi: { l: "scrivi e confronta", d: "scrivi la dimostrazione, poi spunta i passi che hai scritto" }
  };

  /* esito dell'ultimo tentativo: "sapevo", "da ripassare", "mai provata" */
  function status(id) {
    const s = window.STORE.data.cards[id];
    if (!s) return "mai provata";
    return s.last ? "sapevo" : "da ripassare";
  }
  const RANK = { "da ripassare": 0, "mai provata": 1, "sapevo": 2 };
  const ordered = list => list.slice().sort((a, b) => RANK[status(a.id)] - RANK[status(b.id)]);

  let F = { mode: "leggi", cap: null, sec: null };
  let S = null;
  let onKey = null;

  function view(main, params) {
    main.innerHTML = `<h1>Dimostrazioni</h1><div id="fcHost"></div>`;
    const host = $("#fcHost", main);
    if (params.mode && MODES[params.mode]) F.mode = params.mode;
    F.sec = params.sec || null;
    onKey = null;
    const keyH = e => { if (onKey && !(e.metaKey || e.ctrlKey || e.altKey) && !window.UI.typing(e)) onKey(e); };
    document.addEventListener("keydown", keyH);
    if (params.id && T().byId(params.id)) start(host, [params.id]);
    else setup(host);
    return () => document.removeEventListener("keydown", keyH);
  }

  const pool = () => T().proofs().filter(n => (F.cap === null || n._cap.cap === F.cap) && (!F.sec || n._sec.id === F.sec));

  function setup(host) {
    onKey = null; S = null;
    const chip = (l, on, a) => `<button type="button" class="chip" aria-pressed="${on}" ${a}>${l}</button>`;
    const badge = st => `<span class="tag ${st === "sapevo" ? "ok" : st === "da ripassare" ? "warn" : ""}">${st}</span>`;
    host.innerHTML = `<div class="fc-setup">
      <p class="lead">Le dimostrazioni da saper scrivere, nell'ordine del programma. Per capirne una aprila nella <strong>teoria</strong> (grafico, perché di ogni passo, collegamenti), poi allenati: prima <strong>riordina</strong> e <strong>completa</strong>, alla fine <strong>scrivila</strong> da solo.</p>
      <div class="card">
        <span class="field-label">Modalità</span>
        <div class="chips" id="fcMode">${Object.entries(MODES).map(([k, m]) => chip(m.l, F.mode === k, `data-mode="${k}"`)).join("")}</div>
        <p class="dim small" id="fcModeD" style="margin:.4rem 0 0">${MODES[F.mode].d}</p>
        <span class="field-label">Capitolo</span>
        <div class="chips" id="fcCap">${chip("tutti", F.cap === null, 'data-cap=""')}${[1, 2].map(c => chip(`${c}. ${esc(window.CAPITOLI[c])}`, F.cap === c, `data-cap="${c}"`)).join("")}</div>
        <div class="row" style="margin-top:1rem"><button class="btn" id="fcStart">allenati su tutte in serie</button><span class="badge" id="fcCount"></span></div>
        <p class="dim small" style="margin:.4rem 0 0">In serie vengono prima quelle da ripassare, poi quelle mai provate.</p>
      </div>
      <div id="fcList"></div></div>`;
    function drawList() {
      const list = pool();
      const secs = [];
      list.forEach(n => { let g = secs.find(x => x.sec.id === n._sec.id); if (!g) secs.push(g = { sec: n._sec, cap: n._cap, items: [] }); g.items.push(n); });
      $("#fcList", host).innerHTML = (F.sec ? `<p class="small"><a href="#/dimostrazioni" id="fcAll">← tutte le dimostrazioni</a></p>` : "") +
        (secs.map(g => `<section class="card"><h2>${g.cap.cap}. ${esc(g.sec.label)}</h2>
        <ul class="proof-list">${g.items.map(n => `<li>
          <div class="proof-top"><a href="#/teoria/${n.id}" class="proof-name">${esc(n.label)}</a>${badge(status(n.id))}</div>
          ${n.idea ? `<p class="dim small proof-idea">${md(n.idea)}</p>` : ""}
          <div class="row proof-act">
            <a class="btn small" href="#/teoria/${n.id}">studia${n.grafico && window.GRAFICI && window.GRAFICI[n.grafico] ? " (con grafico)" : ""}</a>
            ${Object.entries(MODES).filter(([k]) => k !== "completa" || n.cloze).map(([k, m]) => `<a class="btn small ghost" href="#/dimostrazioni?id=${n.id}&mode=${k}">${esc(m.l)}</a>`).join("")}
          </div></li>`).join("")}</ul></section>`).join("") || `<p class="notice">Nessuna dimostrazione in questa sezione.</p>`);
      $("#fcCount", host).textContent = `${list.length} dimostrazion${list.length === 1 ? "e" : "i"}`;
      typeset($("#fcList", host));
    }
    $(".fc-setup", host).addEventListener("click", e => {
      const b = e.target.closest(".chip"); if (!b) return;
      if (b.dataset.mode) { F.mode = b.dataset.mode; $("#fcModeD", host).textContent = MODES[F.mode].d; $$("#fcMode .chip", host).forEach(c => c.setAttribute("aria-pressed", c === b)); }
      if ("cap" in b.dataset) { F.cap = b.dataset.cap === "" ? null : +b.dataset.cap; F.sec = null; $$("#fcCap .chip", host).forEach(c => c.setAttribute("aria-pressed", c === b)); drawList(); }
    });
    $("#fcStart", host).addEventListener("click", () => { const l = ordered(pool()).map(n => n.id); if (l.length) start(host, l); });
    drawList();
  }

  function start(host, ids) {
    S = { ids, idx: 0, results: [] };
    card(host);
  }

  function header(n) {
    return `<div class="qnav"><button type="button" class="btn ghost small" id="fcExit">esci</button>
      <div class="progress"><span style="width:${S.idx / S.ids.length * 100}%"></span></div>
      <span class="count">${S.idx + 1} / ${S.ids.length}</span></div>
      <div class="card q-card">
        <div class="q-meta"><span class="tag type">${esc(MODES[F.mode].l)}</span><span class="tag">${esc(topicLabel(n.topic))}</span><span class="tag">${status(n.id)}</span>
          <span class="spacer"></span><a class="small" href="#/teoria/${n.id}">studia nella teoria</a></div>
        <h2>${esc(n.label)}</h2>
        ${T().enunciatoHtml(n)}
        <div id="fcBody"></div>
        <div class="fb" id="fcFb" aria-live="polite"></div>
      </div>`;
  }

  function card(host) {
    const n = T().byId(S.ids[S.idx]);
    host.innerHTML = header(n);
    $("#fcExit", host).addEventListener("click", () => setup(host));
    const body = $("#fcBody", host), fb = $("#fcFb", host);
    const mode = F.mode === "completa" && !n.cloze ? "leggi" : F.mode;
    ({ leggi, riordina, completa, scrivi })[mode](n, body, fb, host);
    typeset(host);
  }

  /* pulsanti di autovalutazione: registra e passa al teorema successivo */
  function grade(host, fb, n, suggestion) {
    fb.insertAdjacentHTML("beforeend", `<div class="row" style="margin-top:1rem">
      <button class="btn" id="fcOk">la sapevo <kbd>1</kbd></button>
      <button class="btn ghost" id="fcKo">da ripassare <kbd>2</kbd></button>
      ${suggestion != null ? `<span class="dim small">${esc(suggestion)}</span>` : ""}</div>`);
    const go = ok => {
      window.STORE.recordCard(n.id, ok);
      S.results.push({ id: n.id, ok });
      S.idx++;
      if (S.idx >= S.ids.length) finish(host); else { card(host); window.scrollTo(0, 0); }
    };
    $("#fcOk", fb).addEventListener("click", () => go(true));
    $("#fcKo", fb).addEventListener("click", () => go(false));
    $("#fcOk", fb).focus({ preventScroll: true });
    onKey = e => { if (e.key === "1") { e.preventDefault(); go(true); } if (e.key === "2") { e.preventDefault(); go(false); } };
  }

  function showProof(n, fb) {
    fb.innerHTML = T().dimHtml(n);
    typeset(fb);
  }

  function leggi(n, body, fb, host) {
    body.innerHTML = `<p class="dim">Ripeti la dimostrazione (a voce o su carta), poi confronta.</p>
      <button class="btn" id="fcShow">mostra la dimostrazione <kbd>Spazio</kbd></button>`;
    const show = () => { $("#fcShow", body).remove(); showProof(n, fb); grade(host, fb, n); };
    $("#fcShow", body).addEventListener("click", show);
    onKey = e => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); show(); } };
  }

  function riordina(n, body, fb, host) {
    const rng = window.RNG.create(window.RNG.randomSeed());
    let order = rng.shuffle(n.dim.map((_, i) => i));
    if (order.every((v, i) => v === i) && order.length > 1) order = order.slice(1).concat(order[0]);
    const picked = [];
    body.innerHTML = `<p class="dim">Clicca i passi nell'ordine giusto (o premi il numero). Clicca un passo già scelto per toglierlo.</p>
      <ol class="reorder-picked" id="rPicked"></ol>
      <div class="reorder-pool" id="rPool"></div>
      <div class="row" style="margin-top:.8rem"><button class="btn" id="rCheck" disabled>verifica</button></div>`;
    function draw() {
      $("#rPicked", body).innerHTML = picked.map(i => `<li><button type="button" class="opt" data-i="${i}"><span class="opt-body">${md(n.dim[i].passo)}</span></button></li>`).join("");
      $("#rPool", body).innerHTML = order.filter(i => !picked.includes(i)).map((i, k) =>
        `<button type="button" class="opt" data-i="${i}"><span class="opt-letter">${k + 1}</span><span class="opt-body">${md(n.dim[i].passo)}</span></button>`).join("");
      $("#rCheck", body).disabled = picked.length !== order.length;
      typeset(body);
    }
    body.addEventListener("click", e => {
      const b = e.target.closest(".opt"); if (!b || b.disabled) return;
      const i = +b.dataset.i;
      if (b.closest("#rPicked")) picked.splice(picked.indexOf(i), 1); else picked.push(i);
      draw();
    });
    const check = () => {
      if (picked.length !== order.length) return;
      const okPos = picked.map((v, k) => v === k);
      const allOk = okPos.every(Boolean);
      $$("#rPicked .opt", body).forEach((b, k) => { b.disabled = true; b.classList.add(okPos[k] ? "correct" : "wrong"); });
      $("#rCheck", body).remove();
      fb.innerHTML = `<div class="verdict-bar ${allOk ? "ok" : "ko"}"><span>${allOk ? "Ordine giusto" : "Ordine sbagliato"}</span><span>${okPos.filter(Boolean).length} passi su ${okPos.length} al posto giusto</span></div>
        ${allOk ? "" : `<p class="dim">L'ordine corretto, con il perché di ogni passo:</p>`}`;
      if (!allOk) fb.insertAdjacentHTML("beforeend", T().dimHtml(n));
      typeset(fb);
      grade(host, fb, n, allOk ? "suggerito: la sapevo" : "suggerito: da ripassare");
    };
    $("#rCheck", body).addEventListener("click", check);
    onKey = e => {
      if (/^[1-9]$/.test(e.key)) { const pool = order.filter(i => !picked.includes(i)); const i = pool[+e.key - 1]; if (i != null) { e.preventDefault(); picked.push(i); draw(); } }
      if (e.key === "Enter" && picked.length === order.length) { e.preventDefault(); check(); }
      if (e.key === "Backspace" && picked.length) { e.preventDefault(); picked.pop(); draw(); }
    };
    draw();
  }

  function completa(n, body, fb, host) {
    const q = window.QUIZ.byId(n.cloze);
    body.innerHTML = `<div id="clHost"></div>`;
    const ctl = window.QUIZ.mount($("#clHost", body), q, {
      mode: "practice",
      onReveal(sc) {
        window.STORE.recordQ(q.id, sc);
        grade(host, fb, n, sc >= 0.8 ? "suggerito: la sapevo" : "suggerito: da ripassare");
      }
    });
    onKey = e => {
      if (e.key === "Enter") { e.preventDefault(); ctl.confirm(); return; }
      if (ctl.key(e)) e.preventDefault();
    };
  }

  const drafts = {};
  function scrivi(n, body, fb, host) {
    body.innerHTML = `<p class="dim">Scrivi la dimostrazione (anche schematica). Poi confronta con i passi e spunta quelli che hai scritto.</p>
      <textarea id="wTxt" class="answer-area" rows="8" placeholder="Dimostrazione...">${esc(drafts[n.id] || "")}</textarea>
      <div class="row" style="margin-top:.6rem"><button class="btn" id="wCmp">confronta</button></div>`;
    const ta = $("#wTxt", body);
    ta.addEventListener("input", () => { drafts[n.id] = ta.value; });
    if (!window.UI.coarse()) ta.focus({ preventScroll: true });
    onKey = null;
    $("#wCmp", body).addEventListener("click", () => {
      $("#wCmp", body).remove();
      fb.innerHTML = `<div class="box"><div class="box-h">Spunta i passi che hai scritto</div>
        <ul class="checklist">${n.dim.map((s, i) => `<li><label class="check"><input type="checkbox" data-i="${i}"><span>${md(s.passo)}<span class="why"><span>perché:</span> ${md(s.perche || "")}</span></span></label></li>`).join("")}</ul>
        <div class="row"><button class="btn" id="wReg">registra</button><span class="badge" id="wScore">0 / ${n.dim.length}</span></div></div>`;
      typeset(fb);
      const boxes = $$("input[type=checkbox]", fb);
      const sc = () => boxes.filter(b => b.checked).length;
      boxes.forEach(b => b.addEventListener("change", () => { $("#wScore", fb).textContent = `${sc()} / ${n.dim.length}`; }));
      $("#wReg", fb).addEventListener("click", () => {
        const ok = sc() / n.dim.length >= 0.75;
        $("#wReg", fb).remove();
        grade(host, fb, n, `${sc()} passi su ${n.dim.length}: suggerito ${ok ? "la sapevo" : "da ripassare"}`);
      });
    });
  }

  function finish(host) {
    onKey = null;
    const ok = S.results.filter(r => r.ok).length;
    const ko = S.results.filter(r => !r.ok);
    host.innerHTML = `<div class="card"><div class="result-score">${ok} / ${S.results.length}</div><p class="dim">dimostrazioni sapute</p>
      ${ko.length ? `<p>Da ripassare (riaprile nella teoria e rifai il riordino):</p><ul>${ko.map(r => `<li><a href="#/teoria/${r.id}">${esc(T().byId(r.id).label)}</a></li>`).join("")}</ul>` : "<p>Tutte sapute. Prova la modalità <strong>scrivi e confronta</strong>, la più vicina alla prova.</p>"}
      <div class="row"><button class="btn" id="fcAgain">torna all'elenco</button><a class="btn ghost" href="#/">home</a></div></div>`;
    $("#fcAgain", host).addEventListener("click", () => setup(host));
    S = null;
  }

  window.FLASHCARD = { status };
  window.ROUTER.register("dimostrazioni", view);
})();

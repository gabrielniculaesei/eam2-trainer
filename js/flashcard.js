/* Vista "dimostrazioni": flashcard dei teoremi ★ con ripasso dilazionato
   (Leitner, box 1-5). Quattro modalità: leggi e ripeti, riordina i passi,
   completa (cloze), scrivi e confronta (checklist dei passi).
   Route: #/dimostrazioni, ?id=t-media (una carta), ?due=1 (solo scadute e nuove), ?mode=... */
(function () {
  "use strict";
  const { $, $$, esc, md, typeset, topicLabel } = window.UI;
  const T = () => window.TEORIA_UI;

  const MODES = {
    leggi: { l: "leggi e ripeti", d: "leggi l'enunciato, ripeti la dimostrazione a voce o su carta, poi confronta" },
    riordina: { l: "riordina i passi", d: "i passi della dimostrazione sono mescolati: rimettili in ordine" },
    completa: { l: "completa", d: "la dimostrazione con gli spazi vuoti, come nel quesito 1 della prova" },
    scrivi: { l: "scrivi e confronta", d: "scrivi la dimostrazione, poi spunta i passi che hai scritto" }
  };
  const SIZES = [10, 20, 0];

  function status(id) {
    const s = window.STORE.data.cards[id];
    if (!s) return "nuova";
    return s.due <= Date.now() ? "scaduta" : "in pari";
  }
  function dueCount() {
    return T().proofs().filter(n => status(n.id) !== "in pari").length;
  }
  /* priorità: scadute (le più vecchie prima), poi nuove, poi le altre per box crescente */
  function ordered(list) {
    const st = window.STORE.data.cards;
    const w = n => { const s = st[n.id]; if (!s) return 1e15; if (s.due <= Date.now()) return s.due; return 2e15 + s.box * 1e13 + s.due; };
    return list.slice().sort((a, b) => w(a) - w(b));
  }

  let F = { mode: "leggi", size: 10, dueOnly: true, cap: null };
  let S = null;
  let onKey = null;

  function view(main, params) {
    main.innerHTML = `<h1>Dimostrazioni</h1><div id="fcHost"></div>`;
    const host = $("#fcHost", main);
    if (params.mode && MODES[params.mode]) F.mode = params.mode;
    onKey = null;
    const keyH = e => { if (onKey && !(e.metaKey || e.ctrlKey || e.altKey) && !window.UI.typing(e)) onKey(e); };
    document.addEventListener("keydown", keyH);
    if (params.id && T().byId(params.id)) start(host, [params.id]);
    else if (params.due === "1") { F.dueOnly = true; startFiltered(host); }
    else setup(host);
    return () => document.removeEventListener("keydown", keyH);
  }

  function pool() {
    return T().proofs().filter(n => F.cap === null || n._cap.cap === F.cap)
      .filter(n => !F.dueOnly || status(n.id) !== "in pari");
  }

  function startFiltered(host) {
    let list = ordered(pool()).map(n => n.id);
    if (F.size) list = list.slice(0, F.size);
    if (!list.length) { setup(host, "Nessuna carta da ripassare oggi: sei in pari. Togli il filtro per ripassare comunque."); return; }
    start(host, list);
  }

  function setup(host, msg) {
    onKey = null; S = null;
    const all = T().proofs();
    const st = window.STORE.data.cards;
    const boxes = [0, 0, 0, 0, 0, 0];
    all.forEach(n => { boxes[st[n.id] ? st[n.id].box : 0]++; });
    const chip = (l, on, a) => `<button type="button" class="chip" aria-pressed="${on}" ${a}>${l}</button>`;
    host.innerHTML = `<div class="fc-setup">
      <p class="lead">Le ${all.length} dimostrazioni da saper scrivere (★). Ogni carta torna quando serve: subito se la sbagli, dopo 1, 3, 7, 14, 30 giorni se la sai.</p>
      ${msg ? `<p class="notice">${esc(msg)}</p>` : ""}
      <div class="stat-grid">
        <div class="stat"><div class="v">${dueCount()}</div><div class="l">da ripassare oggi (scadute + nuove)</div></div>
        <div class="stat"><div class="v">${boxes[0]}</div><div class="l">mai viste</div></div>
        <div class="stat"><div class="v">${boxes[4] + boxes[5]}</div><div class="l">consolidate (box 4-5)</div></div>
      </div>
      <div class="card">
        <span class="field-label">Modalità</span>
        <div class="chips" id="fcMode">${Object.entries(MODES).map(([k, m]) => chip(m.l, F.mode === k, `data-mode="${k}"`)).join("")}</div>
        <p class="dim small" id="fcModeD" style="margin:.4rem 0 0">${MODES[F.mode].d}</p>
        <span class="field-label">Capitolo</span>
        <div class="chips" id="fcCap">${chip("tutti", F.cap === null, 'data-cap=""')}${chip("1. Integrali", F.cap === 1, 'data-cap="1"')}${chip("2. Equazioni differenziali", F.cap === 2, 'data-cap="2"')}</div>
        <span class="field-label">Quante carte</span>
        <div class="chips" id="fcSize">${SIZES.map(n => chip(n ? String(n) : "tutte", F.size === n, `data-size="${n}"`)).join("")}</div>
        <label class="check"><input type="checkbox" id="fcDue" ${F.dueOnly ? "checked" : ""}> solo scadute e nuove</label>
        <div class="row" style="margin-top:1rem"><button class="btn" id="fcStart">inizia</button><span class="badge" id="fcCount"></span></div>
      </div>
      <div class="card"><h2>Tutte le carte</h2><ul class="t-list">${ordered(all).map(n => {
        const s = st[n.id];
        return `<li><a href="#/dimostrazioni?id=${n.id}"><span class="t-kind">${s ? "box " + s.box : "nuova"}</span><span class="t-label">${esc(n.label)}</span><span class="dim small">${status(n.id)}</span></a></li>`;
      }).join("")}</ul></div></div>`;
    const count = () => { $("#fcCount", host).textContent = `${Math.min(F.size || 999, pool().length)} carte`; };
    $(".fc-setup", host).addEventListener("click", e => {
      const b = e.target.closest(".chip"); if (!b) return;
      if (b.dataset.mode) { F.mode = b.dataset.mode; $("#fcModeD", host).textContent = MODES[F.mode].d; $$("#fcMode .chip", host).forEach(c => c.setAttribute("aria-pressed", c === b)); }
      if ("cap" in b.dataset) { F.cap = b.dataset.cap === "" ? null : +b.dataset.cap; $$("#fcCap .chip", host).forEach(c => c.setAttribute("aria-pressed", c === b)); }
      if ("size" in b.dataset) { F.size = +b.dataset.size; $$("#fcSize .chip", host).forEach(c => c.setAttribute("aria-pressed", c === b)); }
      count();
    });
    $("#fcDue", host).addEventListener("change", e => { F.dueOnly = e.target.checked; count(); });
    $("#fcStart", host).addEventListener("click", () => startFiltered(host));
    count();
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
        <div class="q-meta"><span class="tag type">${esc(MODES[F.mode].l)}</span><span class="tag">${esc(topicLabel(n.topic))}</span><span class="tag">${status(n.id)}</span></div>
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

  /* pulsanti di autovalutazione: registra e passa alla carta successiva */
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
    host.innerHTML = `<div class="card"><div class="result-score">${ok} / ${S.results.length}</div><p class="dim">carte sapute in questa sessione</p>
      ${ko.length ? `<p>Torneranno domani:</p><ul>${ko.map(r => `<li><a href="#/teoria/${r.id}">${esc(T().byId(r.id).label)}</a></li>`).join("")}</ul>` : "<p>Tutte sapute. Le rivedrai fra qualche giorno.</p>"}
      <div class="row"><button class="btn" id="fcAgain">nuova sessione</button><a class="btn ghost" href="#/">home</a></div></div>`;
    $("#fcAgain", host).addEventListener("click", () => setup(host));
    S = null;
  }

  window.FLASHCARD = { dueCount, status };
  window.ROUTER.register("dimostrazioni", view);
})();

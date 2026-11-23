/* Motore delle domande (tutti i tipi) e vista "quiz".
   QUIZ.mount(el, q, opts) disegna una domanda e restituisce un controller:
   lo usano il quiz, la simulazione d'esame e il ripasso.
   - mode "practice": correzione subito dopo la risposta
   - mode "exam": la scelta è solo "selezionata" (stile neutro), la correzione
     arriva quando l'esame chiama controller.reveal()                         */
(function () {
  "use strict";
  const { $, $$, esc, md, typeset, topicLabel, diffDots, reportLink } = window.UI;
  const LET = "ABCDEFGH";

  /* =============== logica pura (testata in tests/quiz.test.mjs) =============== */

  function emptyAnswer(q) {
    switch (q.type) {
      case "multi": return [];
      case "vf": return q.items.map(() => null);
      case "cloze": return q.gaps.map(() => null);
      default: return null;
    }
  }

  /* multi: tutto giusto = 1; altrimenti (giuste scelte - sbagliate scelte) / giuste, mai sotto 0 */
  function scoreMulti(correct, picked) {
    const C = new Set(correct);
    let good = 0, bad = 0;
    new Set(picked).forEach(i => { if (C.has(i)) good++; else bad++; });
    if (good === C.size && bad === 0) return 1;
    return Math.max(0, (good - bad) / C.size);
  }

  function score(q, ans) {
    switch (q.type) {
      case "mcq": case "impl": return ans === q.correct ? 1 : 0;
      case "errore": return ans === q.wrong ? 1 : 0;
      case "multi": return scoreMulti(q.correct, ans || []);
      case "vf": return q.items.filter((it, i) => ans && ans[i] === it.v).length / q.items.length;
      case "cloze": return q.gaps.filter((g, i) => ans && ans[i] === g.correct).length / q.gaps.length;
      default: return 0;
    }
  }

  function isComplete(q, ans) {
    switch (q.type) {
      case "multi": return Array.isArray(ans) && ans.length > 0;
      case "vf": case "cloze": return Array.isArray(ans) && ans.every(a => a !== null && a !== undefined);
      default: return ans !== null && ans !== undefined;
    }
  }

  /* serve conferma esplicita (pulsante "verifica") o basta un clic? */
  const needsConfirm = q => ["multi", "vf", "cloze"].includes(q.type);

  /* Spezza il testo di un completamento in modo che i segnaposto {{n}} non
     finiscano dentro una formula: "$$ {{1}} \le \int f \le {{2}} $$" diventa
     un blocco con frammenti di formula separati dai riquadri. */
  function splitCloze(text) {
    const gapHtml = n => `<button type="button" class="gap empty" data-g="${n - 1}"><span class="gn">${n}</span><span class="gv">scegli</span></button>`;
    const fixMath = (src, disp) => src.split(/(\{\{\d+\}\})/).map(part => {
      const m = part.match(/^\{\{(\d+)\}\}$/);
      if (m) return gapHtml(+m[1]);
      if (!part.trim()) return " ";
      return disp ? `$\\displaystyle ${part}$` : `$${part}$`;
    }).join("");
    let out = text.replace(/\$\$([\s\S]+?)\$\$/g, (all, inner) =>
      /\{\{\d+\}\}/.test(inner) ? `<span class="cloze-display" style="display:block;text-align:center;margin:.5em 0">${fixMath(inner, true)}</span>` : all);
    out = out.replace(/(^|[^$])\$([^$]+?)\$(?!\$)/g, (all, pre, inner) =>
      /\{\{\d+\}\}/.test(inner) ? pre + fixMath(inner, false) : all);
    return out.replace(/\{\{(\d+)\}\}/g, (a, n) => gapHtml(+n));
  }

  /* ordine delle opzioni di ogni spazio: mescolato ma fisso per domanda
     (le opzioni dei completamenti non sono citate per lettera nelle spiegazioni) */
  function clozeOrder(q) {
    let h = 2166136261;
    for (const c of q.id) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
    return q.gaps.map((g, i) => window.RNG.create((h >>> 0) + i * 7919).shuffle(g.opts.map((_, k) => k)));
  }

  /* =============== disegno di una domanda =============== */

  function mount(root, q, opts) {
    opts = opts || {};
    const mode = opts.mode || "practice";
    let ans = opts.answer != null ? JSON.parse(JSON.stringify(opts.answer)) : emptyAnswer(q);
    let revealed = false;
    let cur = 0; // voce corrente per vf e completamento (tasti)
    let ord = null; // completamento: ordine di visualizzazione delle opzioni

    const typeLabel = (window.QTYPES || {})[q.type] || q.type;
    root.innerHTML = `
      <article class="card q-card" data-id="${esc(q.id)}">
        <div class="q-meta">
          ${opts.number ? `<span class="tag">Quesito ${opts.number}</span>` : ""}
          <span class="tag type">${esc(typeLabel)}</span>
          <span class="tag">${esc(topicLabel(q.topic))}</span>
          <span class="diff" title="difficoltà ${q.diff || 1} su 3" aria-label="difficoltà ${q.diff || 1} su 3">${diffDots(q.diff)}</span>
          ${q.daVerificare ? `<span class="tag warn">da confermare a lezione</span>` : ""}
          ${q.src ? `<span class="src">${esc(q.src)}</span>` : ""}
        </div>
        <div class="q-text">${md(q.q)}</div>
        <div class="q-body"></div>
        <div class="q-actions">
          ${mode === "practice" && needsConfirm(q) ? `<button type="button" class="btn q-confirm" disabled>verifica</button>` : ""}
          <span class="kbd-hint">${hint()}</span>
        </div>
        <div class="fb" aria-live="polite"></div>
      </article>`;
    const body = $(".q-body", root);
    const fb = $(".fb", root);
    const confirmBtn = $(".q-confirm", root);
    if (confirmBtn) confirmBtn.addEventListener("click", () => confirm());

    function hint() {
      if (mode !== "practice") return "";
      switch (q.type) {
        case "mcq": case "impl": case "errore": return `<kbd>1</kbd>-<kbd>${(q.options || q.steps).length}</kbd> rispondi · <kbd>Invio</kbd> prossima`;
        case "multi": return `<kbd>1</kbd>-<kbd>${q.options.length}</kbd> seleziona · <kbd>Invio</kbd> verifica`;
        case "vf": return `<kbd>V</kbd> / <kbd>F</kbd> sulla voce evidenziata · <kbd>Invio</kbd> verifica`;
        case "cloze": return `<kbd>1</kbd>-<kbd>4</kbd> scegli per lo spazio evidenziato · <kbd>Invio</kbd> verifica`;
      }
      return "";
    }

    /* ---------- corpo per tipo ---------- */
    if (q.type === "mcq" || q.type === "impl" || q.type === "multi" || q.type === "errore") {
      const list = q.type === "errore" ? q.steps : q.options;
      body.innerHTML = `<ol class="opts" role="list">${list.map((o, i) => `
        <li><button type="button" class="opt${q.type === "multi" ? " multi" : ""}" data-i="${i}" aria-pressed="false">
          ${q.type === "errore" ? `<span class="step-n">passo ${i + 1}</span>` : `<span class="opt-letter" aria-hidden="true">${LET[i]}</span>`}
          <span class="opt-body">${q.type === "errore" ? "" : `<span class="sr-only">${LET[i]}) </span>`}${md(o)}</span>
          <span class="mark"></span>
        </button></li>`).join("")}</ol>`;
      $$(".opt", body).forEach(b => b.addEventListener("click", () => pick(+b.dataset.i)));
    } else if (q.type === "vf") {
      body.innerHTML = `<div class="vf">${q.items.map((it, i) => `
        <div class="vf-item" data-i="${i}">
          <div class="vf-row">
            <div class="vf-s">${md(it.s)}</div>
            <div class="vf-btns" role="radiogroup" aria-label="voce ${i + 1}: vero o falso">
              <button type="button" class="vf-btn" role="radio" aria-checked="false" data-v="1" title="vero">V</button>
              <button type="button" class="vf-btn" role="radio" aria-checked="false" data-v="0" title="falso">F</button>
            </div>
          </div>
          <div class="vf-why hidden"></div>
        </div>`).join("")}</div>`;
      $$(".vf-item", body).forEach(item => {
        const i = +item.dataset.i;
        $$(".vf-btn", item).forEach(b => b.addEventListener("click", () => setVF(i, b.dataset.v === "1")));
      });
    } else if (q.type === "cloze") {
      ord = clozeOrder(q);
      body.innerHTML = `
        <div class="cloze-text">${md(splitCloze(q.text))}</div>
        <div class="pickers">${q.gaps.map((g, i) => `
          <div class="picker" data-g="${i}">
            <div class="picker-h">Spazio ${i + 1}</div>
            <div class="chips" role="radiogroup" aria-label="spazio ${i + 1}">${ord[i].map(k =>
              `<button type="button" class="chip" role="radio" aria-checked="false" aria-pressed="false" data-k="${k}">${md(g.opts[k])}</button>`).join("")}</div>
          </div>`).join("")}</div>`;
      $$(".gap", body).forEach(b => b.addEventListener("click", () => {
        if (revealed) return;
        cur = +b.dataset.g; paint();
        const p = $(`.picker[data-g="${cur}"]`, body);
        p.scrollIntoView({ block: "nearest", behavior: "smooth" });
        const first = $(".chip", p); if (first) first.focus({ preventScroll: true });
      }));
      $$(".picker", body).forEach(p => {
        const g = +p.dataset.g;
        $$(".chip", p).forEach(c => c.addEventListener("click", () => setGap(g, +c.dataset.k)));
      });
    }

    /* ---------- interazioni ---------- */
    function changed() {
      paint();
      if (opts.onChange) opts.onChange(ans);
    }

    function pick(i) {
      if (revealed) return;
      if (q.type === "multi") {
        const s = new Set(ans); s.has(i) ? s.delete(i) : s.add(i);
        ans = [...s].sort((a, b) => a - b);
        changed();
        return;
      }
      ans = i;
      changed();
      if (mode === "practice") reveal();
    }

    function setVF(i, v) {
      if (revealed) return;
      ans[i] = v;
      const next = ans.findIndex((a, k) => k > i && a === null);
      cur = next >= 0 ? next : (ans.indexOf(null) >= 0 ? ans.indexOf(null) : i);
      changed();
    }

    function setGap(g, k) {
      if (revealed) return;
      ans[g] = k;
      const next = ans.findIndex((a, j) => j > g && a === null);
      cur = next >= 0 ? next : (ans.indexOf(null) >= 0 ? ans.indexOf(null) : g);
      changed();
      // riempi il riquadro nel testo con la scelta, con la formula disegnata
      const gap = $(`.gap[data-g="${g}"]`, body);
      gap.classList.remove("empty");
      $(".gv", gap).innerHTML = md(q.gaps[g].opts[k]);
      typeset(gap);
    }

    function paint() {
      if (q.type === "mcq" || q.type === "impl" || q.type === "multi" || q.type === "errore") {
        const sel = q.type === "multi" ? new Set(ans) : new Set(ans === null ? [] : [ans]);
        $$(".opt", body).forEach(b => {
          const i = +b.dataset.i;
          b.setAttribute("aria-pressed", sel.has(i) ? "true" : "false");
          b.classList.toggle("selected", mode === "exam" && sel.has(i) && !revealed);
        });
      } else if (q.type === "vf") {
        $$(".vf-item", body).forEach(item => {
          const i = +item.dataset.i;
          item.classList.toggle("current", !revealed && mode === "practice" && i === cur);
          $$(".vf-btn", item).forEach(b => b.setAttribute("aria-checked", ans[i] === (b.dataset.v === "1") ? "true" : "false"));
        });
      } else if (q.type === "cloze") {
        $$(".picker", body).forEach(p => {
          const g = +p.dataset.g;
          p.classList.toggle("active", !revealed && g === cur);
          $$(".chip", p).forEach(c => {
            const on = ans[g] === +c.dataset.k;
            c.setAttribute("aria-checked", on ? "true" : "false");
            c.setAttribute("aria-pressed", on ? "true" : "false");
          });
        });
        $$(".gap", body).forEach(b => b.classList.toggle("active", !revealed && +b.dataset.g === cur));
      }
      if (confirmBtn) confirmBtn.disabled = revealed || !isComplete(q, ans);
    }

    function confirm() {
      if (revealed || !isComplete(q, ans)) return false;
      reveal();
      return true;
    }

    /* ---------- correzione ---------- */
    function reveal() {
      if (revealed) return;
      revealed = true;
      const sc = score(q, ans);
      body.querySelectorAll("button").forEach(b => { b.disabled = true; });
      if (confirmBtn) confirmBtn.classList.add("hidden");
      const hintEl = $(".kbd-hint", root); if (hintEl) hintEl.innerHTML = mode === "practice" ? `<kbd>Invio</kbd> prossima` : "";

      let extra = "";
      if (q.type === "mcq" || q.type === "impl" || q.type === "multi" || q.type === "errore") {
        const right = q.type === "multi" ? new Set(q.correct) : new Set([q.type === "errore" ? q.wrong : q.correct]);
        const sel = q.type === "multi" ? new Set(ans) : new Set(ans === null ? [] : [ans]);
        $$(".opt", body).forEach(b => {
          const i = +b.dataset.i, mark = $(".mark", b);
          b.classList.remove("selected");
          if (q.type === "errore") {
            if (right.has(i)) { b.classList.add(sel.has(i) ? "correct" : "missed"); mark.textContent = "errore qui"; }
            else if (sel.has(i)) { b.classList.add("wrong"); mark.textContent = "corretto"; }
            return;
          }
          if (right.has(i) && sel.has(i)) { b.classList.add("correct"); mark.textContent = "giusta"; }
          else if (right.has(i)) { b.classList.add("missed"); mark.textContent = q.type === "multi" ? "mancava" : "era questa"; }
          else if (sel.has(i)) { b.classList.add("wrong"); mark.textContent = "sbagliata"; }
        });
        if (q.type === "impl") {
          extra = `<div class="box dim-box"><div class="box-h">Dimostrazione dell'implicazione vera</div>${md(q.dim)}</div>
                   <div class="box counter"><div class="box-h">Controesempio per l'altra</div>${md(q.controesempio)}</div>`;
        }
        if (q.type === "errore") {
          extra = `<div class="box fix"><div class="box-h">L'errore è nel passo ${q.wrong + 1}: correzione</div>${md(q.fix)}</div>`;
        }
      } else if (q.type === "vf") {
        $$(".vf-item", body).forEach(item => {
          const i = +item.dataset.i, it = q.items[i], ok = ans[i] === it.v;
          item.classList.remove("current");
          item.classList.add(ok ? "ok" : "ko");
          const why = $(".vf-why", item);
          why.classList.remove("hidden");
          why.innerHTML = `<span class="verdict">${it.v ? "Vera" : "Falsa"}${ok ? "" : (ans[i] === null ? " (non risposta)" : ", avevi risposto " + (ans[i] ? "vera" : "falsa"))}.</span> ${md(it.why)}`;
        });
      } else if (q.type === "cloze") {
        q.gaps.forEach((g, i) => {
          const ok = ans[i] === g.correct;
          const gap = $(`.gap[data-g="${i}"]`, body);
          gap.classList.add(ok ? "correct" : "wrong");
          if (!ok) {
            gap.classList.remove("empty");
            $(".gv", gap).innerHTML = md(g.opts[g.correct]);
            gap.title = "risposta giusta";
          }
          $$(`.picker[data-g="${i}"] .chip`, body).forEach(c => {
            const k = +c.dataset.k;
            if (k === g.correct) c.classList.add("correct");
            else if (k === ans[i]) c.classList.add("wrong");
          });
        });
        $$(".picker,.gap", body).forEach(x => x.classList.remove("active"));
      }

      const cls = sc >= 1 ? "ok" : sc <= 0 ? "ko" : "part";
      let verdict = sc >= 1 ? "Giusto" : sc <= 0 ? "Sbagliato" : "Parzialmente giusto";
      let detail = "";
      if (q.type === "vf") detail = `${q.items.filter((it, i) => ans[i] === it.v).length} voci su ${q.items.length}`;
      if (q.type === "cloze") detail = `${q.gaps.filter((g, i) => ans[i] === g.correct).length} spazi su ${q.gaps.length}`;
      if (q.type === "multi") detail = "giuste: " + q.correct.map(i => LET[i]).join(", ");
      if (q.type === "mcq" && sc < 1) detail = "risposta giusta: " + LET[q.correct];
      if (q.type === "impl" && sc < 1) detail = "risposta giusta: " + LET[q.correct];
      fb.innerHTML = `
        <div class="verdict-bar ${cls}"><span>${verdict}</span><span>${esc(detail)}</span></div>
        ${extra}
        ${q.expl ? `<div class="expl">${md(q.expl)}</div>` : ""}
        <p class="small" style="margin-top:.7rem">${reportLink(q.id, "una domanda")} · <a class="report" href="#/quiz?id=${encodeURIComponent(q.id)}">link alla domanda</a></p>`;
      typeset(fb);
      typeset(body);
      if (opts.onReveal) opts.onReveal(sc, ans);
    }

    /* tasti: restituisce true se il tasto è stato gestito */
    function key(e) {
      if (revealed) return false;
      const k = e.key;
      if (/^[1-9]$/.test(k)) {
        const n = +k - 1;
        if (q.type === "mcq" || q.type === "impl" || q.type === "multi") { if (n < q.options.length) { pick(n); return true; } }
        if (q.type === "errore") { if (n < q.steps.length) { pick(n); return true; } }
        if (q.type === "cloze") { if (n < q.gaps[cur].opts.length) { setGap(cur, ord[cur][n]); return true; } }
      }
      if (q.type === "vf" && (k === "v" || k === "V" || k === "f" || k === "F")) { setVF(cur, k.toLowerCase() === "v"); return true; }
      if ((q.type === "vf" || q.type === "cloze") && (k === "ArrowDown" || k === "ArrowUp")) {
        const n = q.type === "vf" ? q.items.length : q.gaps.length;
        cur = (cur + (k === "ArrowDown" ? 1 : n - 1)) % n; paint(); return true;
      }
      return false;
    }

    paint();
    // risposta già data (ripresa di un esame): ridisegna anche i riquadri del completamento
    if (q.type === "cloze") ans.forEach((k, g) => { if (k !== null) { const gap = $(`.gap[data-g="${g}"]`, body); gap.classList.remove("empty"); $(".gv", gap).innerHTML = md(q.gaps[g].opts[k]); } });
    if (opts.revealed) reveal();

    return {
      q,
      get answer() { return ans; },
      get revealed() { return revealed; },
      canConfirm: () => !revealed && isComplete(q, ans),
      confirm, reveal, key,
      score: () => score(q, ans)
    };
  }

  /* =============== vista "quiz" =============== */

  const all = () => window.QUESTIONS || [];
  let byIdMap = null;
  function byId(id) {
    if (!byIdMap) { byIdMap = new Map(); all().forEach(q => byIdMap.set(q.id, q)); }
    return byIdMap.get(id);
  }

  const QTY = [10, 20, 40, 0]; // 0 = tutte
  let F = null; // filtri della schermata iniziale
  let S = null; // quiz in corso
  let ctl = null;

  function defaultFilters() {
    return { caps: new Set(), topics: new Set(), types: new Set(), diffs: new Set(), qty: 10, onlyWrong: false, shuffle: true };
  }

  function pool(f) {
    const st = window.STORE.data.q;
    return all().filter(q =>
      (!f.caps.size || f.caps.has(q.cap)) &&
      (!f.topics.size || f.topics.has(q.topic)) &&
      (!f.types.size || f.types.has(q.type)) &&
      (!f.diffs.size || f.diffs.has(q.diff || 1)) &&
      (!f.onlyWrong || (st[q.id] && st[q.id].last < 1)));
  }

  function saveSession() {
    if (!S) return;
    window.STORE.setSession({ kind: "quiz", ids: S.ids, idx: S.idx, answered: S.answered, results: S.results, ts: Date.now() });
  }

  function view(main, params) {
    main.innerHTML = `<h1>Quiz</h1><div id="quizHost"></div>`;
    const host = $("#quizHost", main);

    const onKey = e => {
      if (!S || !ctl || e.metaKey || e.ctrlKey || e.altKey || window.UI.typing(e)) return;
      if (e.key === "Enter") {
        const t = document.activeElement;
        const inBody = t && t.closest && t.closest(".q-body") && t.tagName === "BUTTON";
        if (!ctl.revealed && inBody) return;          // Invio su un'opzione la seleziona (clic nativo)
        e.preventDefault();                            // niente clic nativo: un solo avanzamento
        if (ctl.revealed) next(host); else ctl.confirm();
        return;
      }
      if (ctl.key(e)) e.preventDefault();
    };
    document.addEventListener("keydown", onKey);

    if (params.id) {
      const q = byId(params.id);
      if (q) { start(host, [q.id]); return () => document.removeEventListener("keydown", onKey); }
    }
    F = F || defaultFilters();
    if (params.topic && window.TOPICS[params.topic]) { F = defaultFilters(); F.topics.add(params.topic); F.caps.add(window.TOPICS[params.topic].cap); }
    if (params.cap && window.CAPITOLI[params.cap] != null) { F = defaultFilters(); F.caps.add(+params.cap); }
    if (params.type && window.QTYPES[params.type]) { F.types.add(params.type); }
    if (params.wrong === "1") F.onlyWrong = true;

    // rientrando nella vista si passa sempre dal banner di ripresa: la sessione
    // salvata sa se la domanda corrente era già stata contata
    S = null; ctl = null;
    const ses = window.STORE.getSession("quiz");
    if (ses && ses.kind === "quiz" && Array.isArray(ses.ids) && ses.ids.length && ses.ids.every(byId)) setup(host, ses);
    else setup(host, null);

    return () => document.removeEventListener("keydown", onKey);
  }

  function setup(host, ses) {
    S = null; ctl = null;
    const caps = Object.keys(window.CAPITOLI).map(Number).filter(c => all().some(q => q.cap === c));
    host.innerHTML = `<div class="q-setup">
      ${ses ? `<div class="notice resume"><span>Hai un quiz in corso: domanda ${Math.min(ses.idx + (ses.answered ? 2 : 1), ses.ids.length)} di ${ses.ids.length}.</span>
        <span class="row"><button class="btn small" id="qResume">riprendi</button><button class="btn small ghost" id="qDrop">ricomincia</button></span></div>` : ""}
      <p class="lead">Domande nello stile della prova: risposta multipla, più risposte giuste, vero o falso, completamento di dimostrazioni, implicazioni con controesempio, trova l'errore. Dopo ogni risposta c'è la spiegazione, anche delle opzioni sbagliate.</p>
      <div class="card">
        <span class="field-label">Capitolo</span>
        <div class="chips" id="fCap"></div>
        <span class="field-label">Argomento</span>
        <div class="chips" id="fTopic"></div>
        <span class="field-label">Tipo di domanda</span>
        <div class="chips" id="fType"></div>
        <span class="field-label">Difficoltà</span>
        <div class="chips" id="fDiff"></div>
        <span class="field-label">Quante domande</span>
        <div class="chips" id="fQty"></div>
        <label class="check"><input type="checkbox" id="fWrong"> solo quelle che ho sbagliato l'ultima volta</label>
        <label class="check"><input type="checkbox" id="fShuffle"> ordine casuale</label>
        <div class="row" style="margin-top:1rem">
          <button class="btn" id="qStart">inizia</button>
          <span class="badge" id="qCount"></span>
        </div>
      </div></div>`;

    const chip = (label, on, extra) => `<button type="button" class="chip" aria-pressed="${on}" ${extra || ""}>${label}</button>`;
    const toggle = (set, v) => { set.has(v) ? set.delete(v) : set.add(v); };

    function draw() {
      const capBox = $("#fCap", host), topBox = $("#fTopic", host), typBox = $("#fType", host), difBox = $("#fDiff", host), qtyBox = $("#fQty", host);
      capBox.innerHTML = chip("tutti", !F.caps.size, 'data-cap=""') + caps.map(c => chip(`${c ? c + ". " : ""}${esc(window.CAPITOLI[c])}`, F.caps.has(c), `data-cap="${c}"`)).join("");
      const tAvail = Object.entries(window.TOPICS).filter(([t, o]) => (!F.caps.size || F.caps.has(o.cap)));
      const cnt = t => pool(Object.assign({}, F, { topics: new Set([t]) })).length;
      topBox.innerHTML = chip("tutti", !F.topics.size, 'data-topic=""') + tAvail.map(([t, o]) => {
        const n = cnt(t);
        if (!n && !F.topics.has(t)) return "";
        return chip(`${esc(o.label)}<span class="n">${n}</span>`, F.topics.has(t), `data-topic="${t}"`);
      }).join("");
      typBox.innerHTML = chip("tutti", !F.types.size, 'data-type=""') + Object.entries(window.QTYPES)
        .filter(([t]) => all().some(q => q.type === t)).map(([t, l]) => chip(esc(l), F.types.has(t), `data-type="${t}"`)).join("");
      difBox.innerHTML = chip("tutte", !F.diffs.size, 'data-diff=""') + [1, 2, 3].map(d => chip(`${diffDots(d)} ${["base", "medio", "da 30 e lode"][d - 1]}`, F.diffs.has(d), `data-diff="${d}"`)).join("");
      qtyBox.innerHTML = QTY.map(n => chip(n ? String(n) : "tutte", F.qty === n, `data-qty="${n}"`)).join("");
      $("#fWrong", host).checked = F.onlyWrong;
      $("#fShuffle", host).checked = F.shuffle;
      const n = pool(F).length, take = F.qty ? Math.min(F.qty, n) : n;
      $("#qCount", host).textContent = n ? `${take} domand${take === 1 ? "a" : "e"} su ${n} disponibili` : "nessuna domanda con questi filtri";
      $("#qStart", host).disabled = !n;
    }

    $(".q-setup", host).addEventListener("click", e => {
      const b = e.target.closest(".chip"); if (!b) return;
      if ("cap" in b.dataset) { if (b.dataset.cap === "") F.caps.clear(); else toggle(F.caps, +b.dataset.cap); F.topics.forEach(t => { if (F.caps.size && !F.caps.has(window.TOPICS[t].cap)) F.topics.delete(t); }); }
      else if ("topic" in b.dataset) { if (b.dataset.topic === "") F.topics.clear(); else toggle(F.topics, b.dataset.topic); }
      else if ("type" in b.dataset) { if (b.dataset.type === "") F.types.clear(); else toggle(F.types, b.dataset.type); }
      else if ("diff" in b.dataset) { if (b.dataset.diff === "") F.diffs.clear(); else toggle(F.diffs, +b.dataset.diff); }
      else if ("qty" in b.dataset) F.qty = +b.dataset.qty;
      draw();
    });
    $("#fWrong", host).addEventListener("change", e => { F.onlyWrong = e.target.checked; draw(); });
    $("#fShuffle", host).addEventListener("change", e => { F.shuffle = e.target.checked; });
    $("#qStart", host).addEventListener("click", () => {
      let ids = pool(F).map(q => q.id);
      if (F.shuffle) ids = window.RNG.shuffle(ids);
      if (F.qty) ids = ids.slice(0, F.qty);
      start(host, ids);
    });
    if (ses) {
      $("#qResume", host).addEventListener("click", () => {
        S = { ids: ses.ids, idx: ses.idx, answered: false, results: ses.results || [] };
        // la domanda era già stata risposta (e contata): si riparte dalla successiva
        if (ses.answered) S.idx++;
        if (S.idx >= S.ids.length) finish(host); else { saveSession(); playCurrent(host); }
      });
      $("#qDrop", host).addEventListener("click", () => { window.STORE.clearSession("quiz"); setup(host, null); });
    }
    draw();
    typeset(host);
  }

  function start(host, ids) {
    S = { ids, idx: 0, answered: false, results: [] };
    saveSession();
    playCurrent(host);
  }

  function playCurrent(host) {
    const q = byId(S.ids[S.idx]);
    const n = S.ids.length;
    const pts = S.results.reduce((a, r) => a + r.score, 0);
    host.innerHTML = `
      <div class="qnav">
        <button type="button" class="btn ghost small" id="qExit">esci</button>
        <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="${n}" aria-valuenow="${S.idx}"><span style="width:${(S.idx / n) * 100}%"></span></div>
        <span class="count">${S.idx + 1} / ${n} · ${window.UI.fmtNum(pts)} pt</span>
      </div>
      <div id="qHost"></div>
      <div class="row end hidden" id="qNextRow"><button type="button" class="btn" id="qNext">${S.idx + 1 < n ? "prossima" : "vedi il risultato"} →</button></div>`;
    $("#qExit", host).addEventListener("click", () => { window.STORE.clearSession("quiz"); S = null; ctl = null; setup(host, null); });
    $("#qNext", host).addEventListener("click", () => next(host));
    ctl = mount($("#qHost", host), q, {
      mode: "practice",
      onReveal(sc) {
        S.results.push({ id: q.id, score: sc });
        S.answered = true;
        window.STORE.recordQ(q.id, sc);
        saveSession();
        const row = $("#qNextRow", host);
        row.classList.remove("hidden");
        $("#qNext", host).focus({ preventScroll: true });
      }
    });
    typeset(host);
  }

  function next(host) {
    if (!S || !S.answered) return;
    S.idx++; S.answered = false;
    if (S.idx >= S.ids.length) { finish(host); return; }
    saveSession();
    playCurrent(host);
    window.scrollTo(0, 0);
  }

  function finish(host) {
    window.STORE.clearSession("quiz");
    const res = S.results;
    const n = res.length;
    const pts = res.reduce((a, r) => a + r.score, 0);
    const wrong = res.filter(r => r.score < 1);
    host.innerHTML = `
      <div class="card">
        <div class="row">
          <div><div class="result-score">${n ? Math.round(pts / n * 100) : 0}%</div>
          <div class="dim">${window.UI.fmtNum(pts)} punti su ${n} domande</div></div>
          <div class="spacer"></div>
          <div class="row">
            ${wrong.length ? `<button class="btn" id="qRedo">rifai solo queste (${wrong.length})</button>` : ""}
            <button class="btn ghost" id="qNew">nuovo quiz</button>
          </div>
        </div>
      </div>
      ${wrong.length ? `<h2>Da rivedere</h2><ul class="review-list">${wrong.map(r => {
        const q = byId(r.id);
        return `<li><div class="rv-h"><span class="tag type">${esc(window.QTYPES[q.type])}</span><span class="tag">${esc(topicLabel(q.topic))}</span>
          <span class="dim">${Math.round(r.score * 100)}%</span><span class="spacer"></span><a href="#/quiz?id=${encodeURIComponent(q.id)}">rifai</a></div>
          <div class="rv-q">${md(q.q)}</div></li>`;
      }).join("")}</ul>` : `<p class="notice">Tutto giusto. Prova un quiz su un altro argomento o una simulazione d'esame.</p>`}`;
    const ids = wrong.map(r => r.id);
    if (wrong.length) $("#qRedo", host).addEventListener("click", () => start(host, ids));
    $("#qNew", host).addEventListener("click", () => { S = null; setup(host, null); });
    S = null; ctl = null;
    typeset(host);
  }

  window.QUIZ = { mount, clozeOrder, score, scoreMulti, isComplete, emptyAnswer, splitCloze, byId, all, pool, view };
  if (window.ROUTER) window.ROUTER.register("quiz", view);
})();

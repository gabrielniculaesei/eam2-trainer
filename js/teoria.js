/* Vista "teoria": albero capitolo -> sezione -> nodo, ricerca, "ripassato",
   barra di avanzamento; pagina del nodo con i box da libro.
   Route: #/teoria, #/teoria/<idNodo>, #/teoria?q=media */
(function () {
  "use strict";
  const { $, $$, esc, md, typeset, reportLink, topicLabel } = window.UI;

  const KIND = { teorema: "Teorema", definizione: "Definizione", proprieta: "Proprietà", metodo: "Metodo", esempio: "Esempio", osservazione: "Osservazione" };

  /* capitoli nell'ordine 1, 2, ..., poi i prerequisiti */
  function chapters() {
    return (window.TEORIA || []).slice().sort((a, b) => (a.cap || 99) - (b.cap || 99));
  }

  /* elenco piatto dei nodi con capitolo e sezione */
  let flat = null;
  function nodes() {
    if (flat) return flat;
    flat = [];
    chapters().forEach(ch => (ch.children || []).forEach(sec => (sec.children || []).forEach(n => {
      flat.push(Object.assign({}, n, { _cap: ch, _sec: sec }));
    })));
    return flat;
  }
  const byId = id => nodes().find(n => n.id === id);
  const proofs = () => nodes().filter(n => n.dimRichiesta);

  const strip = s => String(s || "").replace(/<[^>]+>/g, " ").replace(/\\[a-zA-Z]+/g, " ").replace(/[${}^_]/g, " ").toLowerCase();
  function haystack(n) {
    return strip([n.label, n.idea, n.testo, n.enunciato && n.enunciato.ip, n.enunciato && n.enunciato.ts, topicLabel(n.topic)].join(" "));
  }

  /* ---------- pagina del nodo ---------- */
  function enunciatoHtml(n) {
    if (!n.enunciato) return "";
    const formal = n.kind === "teorema" || n.kind === "proprieta";
    const head = KIND[n.kind] || "Enunciato";
    return `<div class="thm${n.kind === "definizione" ? " def" : ""}${n.kind === "osservazione" || n.kind === "esempio" ? " oss" : ""}">
      <div class="thm-h">${head}${n.dimRichiesta ? " ★" : ""}</div>
      ${formal ? `<p><span class="ipts">Ip.</span>${md(n.enunciato.ip)}</p><p><span class="ipts">Ts.</span>${md(n.enunciato.ts)}</p>`
        : `<p>${md(n.enunciato.ip)}</p><p>${md(n.enunciato.ts)}</p>`}
    </div>`;
  }

  function dimHtml(n, open) {
    if (!n.dim || !n.dim.length) return "";
    return `<div class="thm dimo">
      <div class="thm-h">Dimostrazione</div>
      <ol class="dim-steps">${n.dim.map(s => `<li><div>${md(s.passo)}</div>${s.perche ? `<div class="why"><span>perché:</span> ${md(s.perche)}</div>` : ""}</li>`).join("")}</ol>
    </div>`;
  }

  function videoHtml(n) {
    const V = window.VIDEO || {};
    const list = (n.video || []).filter(v => V[v]);
    if (!list.length) return "";
    return `<div class="box"><div class="box-h">Video consigliati</div><ul class="plain">${list.map(v => {
      const o = V[v], id = v.replace(/^yt:/, "");
      return `<li><a href="https://www.youtube.com/watch?v=${esc(id)}${o.da ? "&t=" + o.da + "s" : ""}" target="_blank" rel="noopener">${esc(o.titolo)}</a> <span class="dim">(${esc(o.canale)}${o.da ? ", da " + Math.floor(o.da / 60) + ":" + String(o.da % 60).padStart(2, "0") : ""})</span></li>`;
    }).join("")}</ul><p class="dim small" style="margin:.3rem 0 0">I video servono per capire: notazione e dimostrazioni da scrivere sono quelle della docente.</p></div>`;
  }

  function nodePage(main, n) {
    const done = !!window.STORE.data.teoria[n.id];
    const all = nodes(), i = all.indexOf(all.find(x => x.id === n.id));
    const prev = all[i - 1], next = all[i + 1];
    const capLbl = n._cap.cap ? `${n._cap.cap}. ${esc(n._cap.label)}` : esc(n._cap.label);
    main.innerHTML = `
      <nav class="crumbs" aria-label="Percorso"><a href="#/teoria">Teoria</a> › <a href="#/teoria?cap=${n._cap.cap}">${capLbl}</a> › <span>${esc(n._sec.label)}</span></nav>
      <h1>${esc(n.label)}</h1>
      <div class="q-meta">
        <span class="tag type">${esc(KIND[n.kind] || n.kind)}</span>
        <span class="tag">${esc(topicLabel(n.topic))}</span>
        ${n.dimRichiesta ? `<span class="tag star" title="dimostrazione da saper scrivere">★ dimostrazione richiesta</span>` : ""}
        ${n.daVerificare ? `<span class="tag warn">da confermare a lezione</span>` : ""}
      </div>
      <div class="content">
        ${n.idea ? `<p class="idea"><span class="idea-h">L'idea</span> ${md(n.idea)}</p>` : ""}
        ${enunciatoHtml(n)}
        ${n.testo ? `<div class="testo">${md(n.testo)}</div>` : ""}
        ${dimHtml(n)}
        ${n.esempio ? `<div class="thm oss"><div class="thm-h">Esempio</div>${md(n.esempio)}</div>` : ""}
        ${n.esame ? `<div class="exambox"><div class="thm-h">All'esame</div>${md(n.esame)}</div>` : ""}
        ${n.errori && n.errori.length ? `<div class="warnbox"><div class="thm-h">Attenzione</div><ul class="plain-list">${n.errori.map(e => `<li>${md(e)}</li>`).join("")}</ul></div>` : ""}
        ${videoHtml(n)}
      </div>
      <div class="card node-actions">
        <label class="check" style="margin:0"><input type="checkbox" id="tDone" ${done ? "checked" : ""}> ripassato</label>
        <span class="spacer"></span>
        ${n.dimRichiesta ? `<a class="btn small" href="#/dimostrazioni?id=${n.id}">flashcard</a>` : ""}
        ${n.cloze ? `<a class="btn small ghost" href="#/quiz?id=${n.cloze}">completa la dimostrazione</a>` : ""}
        ${n.grafico && window.GRAFICI && window.GRAFICI[n.grafico] ? `<a class="btn small ghost" href="#/grafici/${n.grafico}">grafico interattivo</a>` : ""}
        <a class="btn small ghost" href="#/quiz?topic=${n.topic}">quiz sull'argomento</a>
      </div>
      <div class="row small">
        ${prev ? `<a href="#/teoria/${prev.id}">← ${esc(prev.label)}</a>` : ""}
        <span class="spacer"></span>
        ${next ? `<a href="#/teoria/${next.id}">${esc(next.label)} →</a>` : ""}
      </div>
      <p class="small" style="margin-top:1rem">${reportLink(n.id, "un nodo di teoria")}</p>`;
    $("#tDone", main).addEventListener("change", e => window.STORE.setTheoryDone(n.id, e.target.checked));
  }

  /* ---------- albero ---------- */
  function treePage(main, params) {
    const q = (params.q || "").trim().toLowerCase();
    const capF = params.cap != null && params.cap !== "" ? +params.cap : null;
    main.innerHTML = `
      <h1>Teoria</h1>
      <p class="lead">Teoremi, definizioni e metodi dei capitoli 1 e 2, con l'idea intuitiva, l'enunciato con ipotesi e tesi, la dimostrazione passo per passo (e il perché di ogni passo), dove è uscito all'esame e gli errori tipici. ★ = dimostrazione da saper scrivere.</p>
      <div class="card">
        <div class="row"><div class="progress" style="flex:1" id="tProg"><span></span></div><span class="badge" id="tProgL"></span></div>
        <div class="row" style="margin-top:.8rem">
          <input type="search" id="tSearch" class="search" placeholder="cerca (media, Wronskiano, sostituzione...)" value="${esc(params.q || "")}" aria-label="cerca nella teoria">
        </div>
        <div class="chips" style="margin-top:.6rem" id="tCaps"></div>
      </div>
      <div id="tTree"></div>`;
    const tree = $("#tTree", main);
    let cur = capF;

    function draw() {
      const st = window.STORE.data.teoria;
      const all = nodes();
      const doneN = all.filter(n => st[n.id]).length;
      $("#tProg span", main).style.width = (all.length ? doneN / all.length * 100 : 0) + "%";
      $("#tProgL", main).textContent = `${doneN} / ${all.length} ripassati`;
      $("#tCaps", main).innerHTML = `<button type="button" class="chip" aria-pressed="${cur === null}" data-cap="">tutti</button>` +
        chapters().map(ch => `<button type="button" class="chip" aria-pressed="${cur === ch.cap}" data-cap="${ch.cap}">${ch.cap ? ch.cap + ". " : ""}${esc(ch.label)}</button>`).join("");
      const term = $("#tSearch", main).value.trim().toLowerCase();
      tree.innerHTML = chapters().filter(ch => cur === null || ch.cap === cur).map(ch => {
        const secs = (ch.children || []).map(sec => {
          const ns = (sec.children || []).filter(n => !term || haystack(byId(n.id)).includes(term));
          if (!ns.length) return "";
          return `<div class="t-sec"><h3>${esc(sec.label)}${sec.daVerificare ? ` <span class="tag warn">da confermare</span>` : ""}</h3>
            <ul class="t-list">${ns.map(n => `<li><a href="#/teoria/${n.id}" class="${st[n.id] ? "done" : ""}">
              <span class="t-kind">${esc((KIND[n.kind] || "").slice(0, 3))}</span>
              <span class="t-label">${esc(n.label)}${n.dimRichiesta ? ' <span class="star" title="dimostrazione richiesta">★</span>' : ""}</span>
              ${st[n.id] ? '<span class="t-done" aria-label="ripassato">✓</span>' : ""}</a></li>`).join("")}</ul></div>`;
        }).join("");
        if (!secs) return "";
        return `<section class="card t-cap"><h2>${ch.cap ? "Capitolo " + ch.cap + ": " : ""}${esc(ch.label)}</h2>${term ? "" : `<p class="dim">${md(ch.intro || "")}</p>`}${secs}</section>`;
      }).join("") || `<p class="notice">Nessun risultato per "${esc(term)}".</p>`;
      typeset(tree);
    }
    $("#tSearch", main).addEventListener("input", () => { draw(); window.ROUTER.replace("teoria", { q: $("#tSearch", main).value, cap: cur }); });
    $("#tCaps", main).addEventListener("click", e => {
      const b = e.target.closest(".chip"); if (!b) return;
      cur = b.dataset.cap === "" ? null : +b.dataset.cap; draw();
      window.ROUTER.replace("teoria", { q: $("#tSearch", main).value, cap: cur });
    });
    draw();
  }

  function view(main, params, rest) {
    if (rest && rest[0]) {
      const n = byId(rest[0]);
      if (n) return nodePage(main, n);
    }
    treePage(main, params);
  }

  window.TEORIA_UI = { nodes, byId, proofs, enunciatoHtml, dimHtml, KIND };
  window.ROUTER.register("teoria", view);
})();

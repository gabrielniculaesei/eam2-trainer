/* Vista "teoria": il libro dei capitoli 1 e 2.
   Indice capitolo -> sezione -> nodo, ricerca; pagina del nodo con i box da
   libro, il grafico interattivo dentro la pagina, la dimostrazione da scoprire
   un passo alla volta e i collegamenti: nei testi i nomi di teoremi e
   definizioni diventano link, e in fondo ci sono "usa" (con i richiami delle
   definizioni) e "serve per".
   Route: #/teoria, #/teoria/<idNodo>, #/teoria?q=media, #/teoria?cap=1 */
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

  /* ---------- collegamenti ----------
     Espressioni con cui i testi citano un nodo. Si cerca la più lunga per prima,
     così "teorema di derivazione della funzione integrale" non diventa
     "funzione integrale". Solo testo fuori dalle formule e dai tag. */
  const ALIAS = {
    "d-primitiva": ["definizione di primitiva"],
    "t-caratt-primitive": ["caratterizzazione delle primitive", "due primitive differiscono per una costante"],
    "t-senza-primitive": ["funzione senza primitive"],
    "d-somme": ["somme inferiori e superiori", "somma inferiore e superiore", "somme di Riemann", "somma inferiore", "somma superiore"],
    "t-contigue": ["teorema sulle somme contigue", "somme contigue"],
    "d-integrale": ["definizione di integrale", "integrabile secondo Riemann"],
    "t-additiva": ["proprietà additiva", "additività"],
    "t-distributiva": ["linearità dell'integrale"],
    "t-monotonia": ["proprietà di monotonia", "monotonia dell'integrale"],
    "t-media": ["teorema della media", "proprietà della media"],
    "d-funzione-integrale": ["definizione di funzione integrale", "funzione integrale", "funzioni integrali"],
    "t-due-funzint": ["due funzioni integrali differiscono"],
    "t-derivazione": ["teorema di derivazione della funzione integrale", "derivazione della funzione integrale", "teorema di derivazione"],
    "t-fondamentale": ["teorema fondamentale del calcolo integrale", "teorema fondamentale"],
    "t-formula-fond": ["formula fondamentale del calcolo integrale", "formula fondamentale"],
    "d-peano-jordan": ["Peano-Jordan"],
    "t-rettangoloide": ["area del rettangoloide", "rettangoloide"],
    "o-aree": ["dominio normale", "domini normali"],
    "d-indefinito": ["integrale indefinito"],
    "t-omogeneita": ["proprietà di omogeneità", "omogeneità"],
    "t-distributiva-indef": ["decomposizione in somma"],
    "t-parti": ["integrazione per parti", "formula di integrazione per parti"],
    "t-sost1": ["prima formula di integrazione per sostituzione", "prima formula di sostituzione", "prima formula"],
    "t-sost2": ["seconda formula di integrazione per sostituzione", "seconda formula di sostituzione", "seconda formula"],
    "m-trigonometrici": ["polinomi trigonometrici"],
    "m-razionali": ["fratti semplici", "funzioni razionali fratte"],
    "d-eqdiff": ["problema di Cauchy", "integrale generale"],
    "d-lineare": ["equazione lineare", "equazioni lineari"],
    "t-osservazioni-primo": ["struttura delle soluzioni"],
    "t-omog-primo": ["integrale generale dell'omogenea del primo ordine"],
    "t-variazione": ["variazione della costante"],
    "o-malthus": ["modello di Malthus", "Malthus"],
    "t-esistenza-unicita": ["teorema di esistenza e unicità", "esistenza e unicità", "unicità del problema di Cauchy"],
    "o-proprieta-n": ["proprietà delle soluzioni"],
    "m-sovrapposizione": ["principio di sovrapposizione", "sovrapposizione"],
    "t-wronskiano": ["teorema sul Wronskiano", "Wronskiano"],
    "d-indipendenti": ["soluzioni indipendenti", "linearmente indipendenti"],
    "t-caratteristica": ["equazione caratteristica", "eq. caratteristica"],
    "m-somiglianza": ["metodo di somiglianza"],
    "m-seno-coseno": ["parte reale e parte immaginaria"],
    "d-separabili": ["variabili separabili"],
    "r-complessi": ["numeri complessi", "formula di Eulero"],
    "r-lagrange": ["teorema di Lagrange", "conseguenza di Lagrange", "funzioni a derivata nulla", "derivata nulla"],
    "r-weierstrass": ["teorema di Weierstrass", "Weierstrass", "teorema dei valori intermedi", "valori intermedi", "teorema degli zeri"],
    "r-heine": ["Heine-Cantor", "uniformemente continua", "uniforme continuità"],
    "r-separati": ["caratterizzazione dei contigui", "caratterizzazione degli insiemi contigui", "insiemi contigui", "insiemi separati", "elemento di separazione"],
    "r-composta": ["derivata della funzione composta", "funzione composta"],
    "r-determinanti": ["regola di Cramer"]
  };
  let RX = null, AL = null;
  function aliasRx() {
    if (RX) return RX;
    AL = [];
    Object.entries(ALIAS).forEach(([id, list]) => { if (byId(id)) list.forEach(a => AL.push([a.toLowerCase(), id])); });
    AL.sort((a, b) => b[0].length - a[0].length);
    const q = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    RX = new RegExp(`(?<![\\p{L}])(${AL.map(a => q(a[0])).join("|")})(?![\\p{L}])`, "giu");
    return RX;
  }
  const aliasId = m => (AL.find(a => a[0] === m.toLowerCase()) || [])[1];

  /* parti di testo fuori da formule e tag (le formule non vanno toccate) */
  const SPLIT = /(\$\$[\s\S]*?\$\$|\$[^$]*\$|<[^>]+>)/;
  function textParts(s) { return String(s || "").split(SPLIT).filter((p, i) => i % 2 === 0); }

  function texts(n) {
    const t = [n.idea, n.testo, n.esempio, n.esame];
    if (n.enunciato) t.push(n.enunciato.ip, n.enunciato.ts);
    (n.dim || []).forEach(d => t.push(d.passo, d.perche));
    (n.errori || []).forEach(e => t.push(e));
    return t.filter(Boolean);
  }
  /* nodi citati da n (esplicitamente con "usa" o riconosciuti nel testo) */
  function refsOf(n) {
    const rx = aliasRx(), out = new Set(n.usa || []);
    texts(n).forEach(s => textParts(s).forEach(p => { for (const m of p.matchAll(rx)) { const id = aliasId(m[1]); if (id) out.add(id); } }));
    out.delete(n.id);
    return [...out].filter(byId);
  }
  let BACK = null;
  function backrefs(id) {
    if (!BACK) {
      BACK = {};
      nodes().forEach(n => refsOf(n).forEach(r => { (BACK[r] = BACK[r] || []).push(n.id); }));
    }
    return BACK[id] || [];
  }

  /* trasforma in link le citazioni nel testo (una volta per nodo e per pagina) */
  function linker(selfId) {
    const seen = new Set([selfId]);
    const rx = aliasRx();
    return s => md(String(s || "").split(SPLIT).map((p, i) => i % 2 ? p : p.replace(rx, (m) => {
      const id = aliasId(m);
      if (!id || seen.has(id)) return m;
      seen.add(id);
      const t = byId(id);
      return `<a class="xref" href="#/teoria/${id}" title="${esc((KIND[t.kind] || "") + ": " + t.label)}">${m}</a>`;
    })).join(""));
  }

  /* ---------- box da libro ---------- */
  function enunciatoHtml(n, L) {
    L = L || md;
    if (!n.enunciato) return "";
    const formal = n.kind === "teorema" || n.kind === "proprieta";
    const head = KIND[n.kind] || "Enunciato";
    return `<div class="thm${n.kind === "definizione" ? " def" : ""}${n.kind === "osservazione" || n.kind === "esempio" ? " oss" : ""}">
      <div class="thm-h">${head}${n.dimRichiesta ? " ★" : ""}</div>
      ${formal ? `<p><span class="ipts">Ip.</span>${L(n.enunciato.ip)}</p><p><span class="ipts">Ts.</span>${L(n.enunciato.ts)}</p>`
        : `<p>${L(n.enunciato.ip)}</p><p>${L(n.enunciato.ts)}</p>`}
    </div>`;
  }

  function dimHtml(n, L, steps) {
    L = L || md;
    if (!n.dim || !n.dim.length) return "";
    return `<div class="thm dimo"${steps ? ' id="dimBox"' : ""}>
      <div class="thm-h row" style="gap:.6rem">Dimostrazione<span class="spacer"></span>
        ${steps && n.dim.length > 2 ? `<button type="button" class="btn small ghost" id="dimStep" aria-pressed="false">un passo alla volta</button>` : ""}</div>
      <ol class="dim-steps">${n.dim.map(s => `<li><div>${L(s.passo)}</div>${s.perche ? `<div class="why"><span>perché:</span> ${L(s.perche)}</div>` : ""}</li>`).join("")}</ol>
      ${steps ? `<div class="row hidden" id="dimCtl"><button type="button" class="btn small" id="dimNext">passo successivo</button><span class="dim small" id="dimCount"></span></div>` : ""}
    </div>`;
  }

  /* modalità "un passo alla volta": si prova a indovinare il passo, poi lo si scopre */
  function bindSteps(main) {
    const b = $("#dimStep", main);
    if (!b) return;
    const items = $$("#dimBox .dim-steps > li", main);
    let k = items.length;
    const draw = () => {
      items.forEach((li, i) => li.classList.toggle("hidden", i >= k));
      $("#dimCount", main).textContent = `${k} di ${items.length}` + (k < items.length ? ": come prosegue? Pensaci, poi scopri il passo." : ": dimostrazione completa ∎");
      $("#dimNext", main).disabled = k >= items.length;
    };
    b.addEventListener("click", () => {
      const on = b.getAttribute("aria-pressed") !== "true";
      b.setAttribute("aria-pressed", on);
      b.textContent = on ? "mostra tutta" : "un passo alla volta";
      $("#dimCtl", main).classList.toggle("hidden", !on);
      k = on ? 1 : items.length;
      draw();
      if (!on) items.forEach(li => li.classList.remove("hidden"));
    });
    $("#dimNext", main).addEventListener("click", () => { k = Math.min(items.length, k + 1); draw(); items[k - 1].scrollIntoView({ block: "nearest", behavior: "smooth" }); });
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

  /* "usa" con i richiami (enunciato apribile) e "serve per" */
  function linksHtml(n) {
    const out = refsOf(n).map(byId), back = backrefs(n.id).map(byId).filter(Boolean);
    if (!out.length && !back.length) return "";
    const tag = t => `<span class="t-kind">${esc((KIND[t.kind] || "").slice(0, 3))}</span>`;
    const recall = t => t.enunciato ? `<details class="recall"><summary>${tag(t)} ${esc(t.label)}</summary>
        <div class="recall-body">${enunciatoHtml(t)}<a class="small" href="#/teoria/${t.id}">vai alla pagina →</a></div></details>`
      : `<div class="recall"><a href="#/teoria/${t.id}">${tag(t)} ${esc(t.label)}</a></div>`;
    return `<section class="links">
      ${out.length ? `<div><div class="box-h">Usa</div>${out.map(recall).join("")}</div>` : ""}
      ${back.length ? `<div><div class="box-h">Serve per</div><ul class="plain-list">${back.map(t => `<li><a href="#/teoria/${t.id}">${tag(t)} ${esc(t.label)}</a></li>`).join("")}</ul></div>` : ""}
    </section>`;
  }

  function grafHtml(n) {
    const g = n.grafico && window.GRAFICI && window.GRAFICI[n.grafico];
    if (!g) return "";
    return `<details class="gx-inline" open><summary><span class="thm-h">Grafico interattivo</span> ${esc(g.title)}</summary>
      <div id="gxNode"></div><p class="small" style="margin:.4rem 0 0"><a href="#/grafici/${n.grafico}">apri a tutta pagina</a></p></details>`;
  }

  /* ---------- pagina del nodo ---------- */
  function nodePage(main, n) {
    const done = !!window.STORE.data.teoria[n.id];
    const all = nodes(), i = all.findIndex(x => x.id === n.id);
    const prev = all[i - 1], next = all[i + 1];
    const capLbl = n._cap.cap ? `${n._cap.cap}. ${esc(n._cap.label)}` : esc(n._cap.label);
    const L = linker(n.id);
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
        ${n.idea ? `<p class="idea"><span class="idea-h">L'idea</span> ${L(n.idea)}</p>` : ""}
        ${enunciatoHtml(n, L)}
        ${n.testo ? `<div class="testo">${L(n.testo)}</div>` : ""}
        ${grafHtml(n)}
        ${dimHtml(n, L, true)}
        ${n.esempio ? `<div class="thm oss"><div class="thm-h">Esempio</div>${L(n.esempio)}</div>` : ""}
        ${n.esame ? `<div class="exambox"><div class="thm-h">All'esame</div>${L(n.esame)}</div>` : ""}
        ${n.errori && n.errori.length ? `<div class="warnbox"><div class="thm-h">Attenzione</div><ul class="plain-list">${n.errori.map(e => `<li>${L(e)}</li>`).join("")}</ul></div>` : ""}
        ${linksHtml(n)}
        ${videoHtml(n)}
      </div>
      <div class="card node-actions">
        <label class="check" style="margin:0"><input type="checkbox" id="tDone" ${done ? "checked" : ""}> studiato</label>
        <span class="spacer"></span>
        ${n.dimRichiesta ? `<a class="btn small" href="#/dimostrazioni?id=${n.id}">allenati a scriverla</a>` : ""}
        ${n.cloze ? `<a class="btn small ghost" href="#/quiz?id=${n.cloze}">completa la dimostrazione</a>` : ""}
        ${n.topic && window.QUIZ.all().some(q => q.topic === n.topic) ? `<a class="btn small ghost" href="#/quiz?topic=${n.topic}">domande</a>` : ""}
        ${n.topic && (window.ESERCIZI || []).some(e => e.topic === n.topic) ? `<a class="btn small ghost" href="#/esercizi?topic=${n.topic}">esercizi</a>` : ""}
      </div>
      <div class="row small">
        ${prev ? `<a href="#/teoria/${prev.id}">← ${esc(prev.label)}</a>` : ""}
        <span class="spacer"></span>
        ${next ? `<a href="#/teoria/${next.id}">${esc(next.label)} →</a>` : ""}
      </div>
      <p class="small" style="margin-top:1rem">${reportLink(n.id, "un nodo di teoria")}</p>`;
    $("#tDone", main).addEventListener("change", e => window.STORE.setTheoryDone(n.id, e.target.checked));
    bindSteps(main);
    const gx = $("#gxNode", main);
    if (gx) window.GRAFICI[n.grafico].mount(gx);
  }

  /* ---------- indice ---------- */
  function treePage(main, params) {
    const capF = params.cap != null && params.cap !== "" ? +params.cap : null;
    main.innerHTML = `
      <h1>Teoria</h1>
      <p class="lead">Il programma dei capitoli 1 e 2 come un libro: per ogni argomento l'idea intuitiva, definizioni ed enunciati con ipotesi e tesi, il grafico interattivo, la dimostrazione passo per passo con il perché di ogni passo, e i collegamenti a quello che usa e a quello per cui serve.</p>
      <div class="card">
        <input type="search" id="tSearch" class="search" placeholder="cerca (media, Wronskiano, sostituzione...)" value="${esc(params.q || "")}" aria-label="cerca nella teoria">
        <div class="chips" style="margin-top:.6rem" id="tCaps"></div>
        <p class="dim small" style="margin:.5rem 0 0"><span class="t-kind">Def</span> definizione · <span class="t-kind">Teo</span> teorema · <span class="t-kind">Pro</span> proprietà · <span class="t-kind">Met</span> metodo · <span class="t-kind">Oss</span> osservazione · ★ dimostrazione da saper scrivere · <span class="gx-dot" aria-hidden="true">◔</span> con grafico</p>
      </div>
      <div id="tTree"></div>`;
    const tree = $("#tTree", main);
    let cur = capF;
    const hasG = n => n.grafico && window.GRAFICI && window.GRAFICI[n.grafico];

    function draw() {
      const st = window.STORE.data.teoria;
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
              <span class="t-label">${esc(n.label)}${n.dimRichiesta ? ' <span class="star" title="dimostrazione richiesta">★</span>' : ""}${hasG(n) ? ' <span class="gx-dot" title="con grafico interattivo">◔</span>' : ""}</span>
              ${st[n.id] ? '<span class="t-done" aria-label="studiato">✓</span>' : ""}</a></li>`).join("")}</ul></div>`;
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

  window.TEORIA_UI = { nodes, byId, proofs, enunciatoHtml, dimHtml, linker, refsOf, backrefs, KIND };
  window.ROUTER.register("teoria", view);
})();

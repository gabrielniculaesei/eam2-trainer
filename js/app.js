/* Avvio: home (com'è la prova, come studiare un argomento, programma con i
   collegamenti a teoria, esercizi e quiz), pagina non trovata. */
(function () {
  "use strict";
  const { esc, typeset } = window.UI;
  const ROUTER = window.ROUTER;

  /* sezioni del programma (capitoli della P.I.) con gli argomenti che contengono */
  function programma() {
    return (window.TEORIA || []).filter(ch => window.CAPITOLI_PI.includes(ch.cap)).sort((a, b) => a.cap - b.cap).map(ch => ({
      cap: ch.cap, label: ch.label,
      secs: (ch.children || []).map(sec => {
        const nodes = sec.children || [];
        const topics = [...new Set(nodes.map(n => n.topic).filter(Boolean))];
        return {
          id: sec.id, label: sec.label, first: nodes[0] && nodes[0].id, topics,
          star: nodes.filter(n => n.dimRichiesta).length,
          graf: nodes.find(n => n.grafico && window.GRAFICI && window.GRAFICI[n.grafico]),
          daVerificare: !!sec.daVerificare || nodes.every(n => n.daVerificare)
        };
      })
    }));
  }

  const countEx = topics => (window.ESERCIZI || []).filter(e => topics.includes(e.topic)).length +
    (window.GENERATORI || []).filter(g => topics.includes(g.topic) && !g.mcq).length;
  const countQ = topics => window.QUIZ.all().filter(q => topics.includes(q.topic)).length;

  function resumeHtml() {
    const out = [];
    const q = window.STORE.getSession("quiz"), e = window.STORE.getSession("esame");
    if (e && !e.done && Array.isArray(e.items)) out.push(`<a class="btn small" href="#/esame">riprendi la simulazione</a>`);
    if (q && Array.isArray(q.ids) && q.idx < q.ids.length) out.push(`<a class="btn small ghost" href="#/quiz">riprendi il quiz</a>`);
    return out.length ? `<div class="row" style="margin:.2rem 0 1.2rem">${out.join("")}</div>` : "";
  }

  function home(main) {
    const P = programma();
    main.innerHTML = `
      <section class="hero">
        <h1>Allenati per la P.I. di <span class="i">Analisi 2</span></h1>
        <p class="lead">Integrali ed equazioni differenziali: teoria con grafici e collegamenti, dimostrazioni da imparare a scrivere, esercizi svolti nello stile delle lezioni, domande e simulazioni della prova.</p>
      </section>
      ${resumeHtml()}

      <div class="home-grid">
        <section class="card">
          <h2>Com'è la prova intermedia</h2>
          <ul class="plain-list">
            <li>In aula, <strong>90 minuti</strong>, al massimo <strong>sei quesiti</strong> sui capitoli 1 (integrali) e 2 (equazioni differenziali).</li>
            <li><strong>Quesiti teorici</strong>: dimostrazioni guidate da completare, risposte multiple (anche con più risposte giuste), implicazioni da dimostrare o smentire con un controesempio, enunciati.</li>
            <li><strong>Quesiti tecnici</strong>: esercizi come quelli svolti a lezione e nel foglio della docente (primitive, integrali definiti, equazioni lineari, problemi di Cauchy, ...).</li>
            <li>Si supera se sono sufficienti <strong>sia</strong> la parte teorica <strong>sia</strong> quella tecnica.</li>
          </ul>
          <p class="notice small">L'esempio di prova pubblicato mostra la <strong>forma</strong> dei quesiti, non gli argomenti: può uscire <strong>qualunque parte</strong> delle dispense e delle lezioni. Per questo la simulazione pesca da tutto il programma.</p>
          <a class="btn small" href="#/esame">simula la prova</a>
        </section>

        <section class="card">
          <h2>Come studiare un argomento</h2>
          <ol class="steps">
            <li><a href="#/teoria"><strong>Capisci</strong></a>: l'idea intuitiva, poi definizioni ed enunciati con ipotesi e tesi, e il grafico che li fa vedere.</li>
            <li><a href="#/dimostrazioni"><strong>Dimostra</strong></a>: segui la dimostrazione passo per passo, poi riordinala, completala e scrivila da solo.</li>
            <li><a href="#/esercizi"><strong>Calcola</strong></a>: esercizi svolti con il metodo della docente, poi varianti nuove con la risposta controllata.</li>
            <li><a href="#/quiz"><strong>Verifica</strong></a>: domande nello stile della prova, con la spiegazione di ogni risposta.</li>
          </ol>
        </section>
      </div>

      <h2 class="prog-h">Programma della P.I.</h2>
      ${P.map(ch => `<section class="card prog">
        <h3 class="prog-cap">Capitolo ${ch.cap}: ${esc(ch.label)}</h3>
        <ul class="prog-list">${ch.secs.map(s => `<li>
          <a class="prog-name" href="#/teoria/${s.first}">${esc(s.label)}</a>
          ${s.daVerificare ? `<span class="tag warn">da confermare a lezione</span>` : ""}
          <span class="prog-links">
            ${s.graf ? `<a href="#/teoria/${s.graf.id}">grafico</a>` : ""}
            ${s.star ? `<a href="#/dimostrazioni?sec=${s.id}">★ ${s.star} dimostrazion${s.star === 1 ? "e" : "i"}</a>` : ""}
            ${countEx(s.topics) ? `<a href="#/esercizi?topic=${s.topics.join(",")}">esercizi</a>` : ""}
            ${countQ(s.topics) ? `<a href="#/quiz?topic=${s.topics.join(",")}">quiz</a>` : ""}
          </span></li>`).join("")}</ul>
      </section>`).join("")}
      <p class="dim small">Servono i numeri complessi o un teorema di Analisi 1? Vedi i <a href="#/teoria?cap=0">prerequisiti</a>.</p>`;
    typeset(main);
  }

  ROUTER.register("home", home);
  ROUTER.register("notfound", main => {
    main.innerHTML = `<h1>Pagina non trovata</h1><p>Il link non corrisponde a nessuna sezione. <a href="#/">Torna alla home</a>.</p>`;
  });

  ROUTER.start();
})();

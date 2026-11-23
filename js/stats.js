/* Vista "stats": andamento per capitolo e argomento, export/import, azzera. */
(function () {
  "use strict";
  const { $, esc, pct, fmtNum } = window.UI;

  /* aggregati per topic: tentativi, punti, domande viste, totale domande */
  function byTopic() {
    const st = window.STORE.data.q;
    const out = {};
    Object.keys(window.TOPICS).forEach(t => { out[t] = { a: 0, c: 0, seen: 0, total: 0, wrong: 0 }; });
    (window.QUESTIONS || []).forEach(q => {
      const o = out[q.topic]; if (!o) return;
      o.total++;
      const s = st[q.id];
      if (s && s.a) { o.a += s.a; o.c += s.c; o.seen++; if (s.last < 1) o.wrong++; }
    });
    return out;
  }

  function color(acc) { return acc >= .75 ? "var(--ok)" : acc >= .5 ? "var(--warn)" : "var(--err)"; }

  function view(main) {
    const d = window.STORE.data;
    const T = byTopic();
    const qs = Object.values(d.q);
    const tot = (window.QUESTIONS || []).length;
    const seen = qs.filter(s => s.a).length;
    const a = qs.reduce((x, s) => x + s.a, 0), c = qs.reduce((x, s) => x + s.c, 0);
    const wrong = Object.values(T).reduce((x, o) => x + o.wrong, 0);
    const today = d.days[window.STORE.dayKey()] || 0;
    const nDays = Object.keys(d.days).length;

    const caps = Object.keys(window.CAPITOLI).map(Number).sort((x, y) => (x || 99) - (y || 99));
    const capHtml = caps.map(cap => {
      const rows = Object.entries(window.TOPICS).filter(([t, o]) => o.cap === cap && T[t].total);
      if (!rows.length) return "";
      return `<h3 class="cap-h">${cap ? cap + ". " : ""}${esc(window.CAPITOLI[cap])}</h3><div class="bars">${rows.map(([t, o]) => {
        const s = T[t], acc = s.a ? s.c / s.a : 0;
        return `<div class="bar-row">
          <a href="#/quiz?topic=${t}" title="quiz su questo argomento">${esc(o.label)}</a>
          <div class="bar" title="${s.seen} domande viste su ${s.total}"><span style="width:${s.a ? Math.max(3, acc * 100) : 0}%;background:${color(acc)}"></span></div>
          <span class="bar-v">${s.a ? pct(acc) : "-"} · ${s.seen}/${s.total}</span>
        </div>`;
      }).join("")}</div>`;
    }).join("");

    const exams = d.exams.slice(-8).reverse();
    main.innerHTML = `
      <h1>Progressi</h1>
      <div class="stat-grid">
        <div class="stat"><div class="v">${seen}<span class="dim small"> / ${tot}</span></div><div class="l">domande viste</div></div>
        <div class="stat"><div class="v">${a ? pct(c / a) : "-"}</div><div class="l">risposte giuste (media)</div></div>
        <div class="stat"><div class="v">${today}</div><div class="l">risposte oggi</div></div>
        <div class="stat"><div class="v">${nDays}</div><div class="l">giorni di allenamento</div></div>
      </div>
      ${wrong ? `<p class="notice">Hai <strong>${wrong}</strong> domand${wrong === 1 ? "a" : "e"} sbagliat${wrong === 1 ? "a" : "e"} l'ultima volta. <a href="#/quiz?wrong=1">Rifalle ora</a>.</p>` : ""}
      <div class="card">
        <h2>Per argomento</h2>
        <p class="dim small">Barra = percentuale di risposte giuste; a destra le domande viste sul totale. Clicca un argomento per allenarti.</p>
        ${capHtml}
      </div>
      ${exams.length ? `<div class="card"><h2>Simulazioni</h2><ul>${exams.map(x => `<li>${esc(new Date(x.ts).toLocaleDateString("it-IT"))}: ${esc(x.label || "simulazione")}, ${esc(x.esito || "")}</li>`).join("")}</ul></div>` : ""}
      <div class="card">
        <h2>I tuoi dati</h2>
        <p class="dim small">Il progresso resta solo in questo browser. Esportalo per spostarlo su un altro dispositivo.</p>
        <div class="row">
          <button class="btn ghost" id="sExport">esporta (JSON)</button>
          <label class="btn ghost" for="sImport" tabindex="0">importa…</label>
          <input type="file" id="sImport" accept="application/json,.json" class="sr-only">
          <span class="spacer"></span>
          <button class="btn danger" id="sReset">azzera statistiche</button>
        </div>
      </div>`;

    $("#sExport", main).addEventListener("click", () => {
      const blob = new Blob([window.STORE.exportJSON()], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url; link.download = `eam2-trainer-${window.STORE.dayKey()}.json`;
      document.body.appendChild(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
    const inp = $("#sImport", main);
    $('label[for="sImport"]', main).addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); inp.click(); } });
    inp.addEventListener("change", async () => {
      const f = inp.files && inp.files[0]; if (!f) return;
      try {
        window.STORE.importJSON(await f.text());
        window.UI.toast("Progresso importato.");
        window.ROUTER.refresh();
      } catch (e) { window.UI.toast("Import non riuscito: " + e.message, 4000); }
    });
    $("#sReset", main).addEventListener("click", async () => {
      const ok = await window.UI.confirm("Azzerare tutte le statistiche, le flashcard e lo storico? L'operazione non si può annullare (esporta prima, se vuoi tenerle).", "azzera");
      if (!ok) return;
      window.STORE.reset();
      window.UI.toast("Progressi azzerati.");
      window.ROUTER.refresh();
    });
  }

  window.STATS = { byTopic, view };
  window.ROUTER.register("stats", view);
})();

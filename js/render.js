/* Helper di interfaccia: DOM, escape, mini-markdown, KaTeX, toast, dialoghi,
   pulsante "Segnala un errore". Nessuna logica di dominio qui. */
(function () {
  "use strict";

  const REPO = "gabrielniculaesei/eam2-trainer";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => [...(root || document).querySelectorAll(sel)];
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* I testi dei dati sono HTML + LaTeX scritti da noi: qui si aggiunge solo
     **grassetto** (evidenziatore). Il LaTeX non usa mai "**". */
  function md(s) {
    return String(s == null ? "" : s).replace(/\*\*([\s\S]+?)\*\*/g, "<strong>$1</strong>");
  }

  const DELIMS = [
    { left: "$$", right: "$$", display: true },
    { left: "$", right: "$", display: false }
  ];
  function typeset(el) {
    if (!el || typeof window.renderMathInElement !== "function") return;
    try {
      window.renderMathInElement(el, {
        delimiters: DELIMS,
        throwOnError: false,
        ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code", "option", "input"],
        ignoredClasses: ["nb-in", "no-math"]
      });
    } catch (e) { console.warn("KaTeX:", e); }
  }

  /* crea un elemento da una stringa HTML (un solo nodo radice) */
  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function topicLabel(t) { return (window.TOPICS[t] || {}).label || t; }
  function capLabel(c) { return window.CAPITOLI[c] || ("Capitolo " + c); }
  function diffDots(d) { d = d || 1; return "●".repeat(d) + "○".repeat(3 - d); }

  /* link a una issue GitHub precompilata con l'id del contenuto */
  function reportHref(id, what) {
    const title = `[${id}] Errore in ${what || "una domanda"}`;
    const body = [
      `**Contenuto**: \`${id}\``,
      `**Pagina**: ${location.href}`,
      "",
      "**Cosa non va** (testo, calcolo, notazione, spiegazione...):",
      "",
      "",
      "**Come dovrebbe essere** (se lo sai, con la fonte: lezione, dispensa, prova):",
      ""
    ].join("\n");
    return `https://github.com/${REPO}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}&labels=contenuti`;
  }
  function reportLink(id, what) {
    return `<a class="report" href="${esc(reportHref(id, what))}" target="_blank" rel="noopener">Segnala un errore</a>`;
  }

  function toast(msg, ms) {
    const box = $("#toasts"); if (!box) return;
    const t = el(`<div class="toast" role="status">${esc(msg)}</div>`);
    box.appendChild(t);
    setTimeout(() => t.remove(), ms || 2600);
  }

  /* conferma accessibile (dialog nativo); fallback su window.confirm */
  function confirmDialog(msg, yes) {
    const d = $("#confirmDialog");
    if (!d || typeof d.showModal !== "function") return Promise.resolve(window.confirm(msg));
    $(".dialog-msg", d).textContent = msg;
    $('button[value="yes"]', d).textContent = yes || "conferma";
    return new Promise(res => {
      d.addEventListener("close", () => res(d.returnValue === "yes"), { once: true });
      d.showModal();
    });
  }

  /* true se il tasto premuto va ignorato perché si sta scrivendo */
  function typing(e) {
    const t = e.target;
    if (!t || !t.tagName) return false;
    return t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName);
  }

  /* dispositivo touch: niente autofocus sui campi (aprirebbe la tastiera) */
  const coarse = () => { try { return matchMedia("(pointer: coarse)").matches; } catch (e) { return false; } };

  function pct(x) { return Math.round(x * 100) + "%"; }
  function fmtNum(x) { return (Math.round(x * 100) / 100).toString().replace(".", ","); }

  window.UI = {
    REPO, $, $$, esc, md, typeset, el, topicLabel, capLabel, diffDots,
    reportHref, reportLink, toast, confirm: confirmDialog, typing, coarse, pct, fmtNum
  };
})();

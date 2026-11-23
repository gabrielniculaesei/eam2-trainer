// Lint dei contenuti: schema delle domande, id univoci, topic validi, indici,
// ogni formula renderizzata da KaTeX con throwOnError, niente trattino lungo,
// notazione della docente, bilanciamento della risposta giusta fra A-D e bias
// di lunghezza. Esce con codice 1 se trova errori. Uso: node tools/lint_data.mjs
import katex from "katex";
import { loadData, orphanDataFiles } from "./load_data.mjs";

const errors = [];
const warnings = [];
const err = (id, msg) => errors.push(`${id}: ${msg}`);
const warn = (id, msg) => warnings.push(`${id}: ${msg}`);

const W = loadData();
const TOPICS = W.TOPICS, CAPITOLI = W.CAPITOLI, QTYPES = W.QTYPES;
const QUESTIONS = W.QUESTIONS || [];

for (const f of orphanDataFiles()) err(f, "file dati non caricato da index.html");

/* ---------------- testo e formule ---------------- */
const EM_DASH = String.fromCharCode(0x2014); // trattino lungo, vietato nei testi
const decode = s => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ");

function mathSegments(s) {
  const out = [];
  let i = 0;
  while (i < s.length) {
    if (s[i] === "\\" && s[i + 1] === "$") { i += 2; continue; }
    if (s.startsWith("$$", i)) {
      const j = s.indexOf("$$", i + 2);
      if (j < 0) throw new Error("$$ non chiuso");
      out.push({ tex: s.slice(i + 2, j), display: true }); i = j + 2; continue;
    }
    if (s[i] === "$") {
      const j = s.indexOf("$", i + 1);
      if (j < 0) throw new Error("$ non chiuso");
      out.push({ tex: s.slice(i + 1, j), display: false }); i = j + 1; continue;
    }
    i++;
  }
  return out;
}

function checkText(id, field, s) {
  if (typeof s !== "string") return;
  if (s.includes(EM_DASH)) err(id, `${field}: contiene il trattino lungo (U+2014)`);
  if (/\\ln\b|\bln\s*\(/.test(s)) err(id, `${field}: usa "log", non "ln" (notazione della docente)`);
  let segs;
  try { segs = mathSegments(s.replace(/\{\{\d+\}\}/g, "\\square ")); }
  catch (e) { err(id, `${field}: ${e.message}`); return; }
  for (const { tex, display } of segs) {
    if (/<[a-zA-Z!/]/.test(tex)) err(id, `${field}: "<" seguito da una lettera dentro una formula viene letto come tag HTML: metti uno spazio o usa \\lt (${tex.slice(0, 40)})`);
    try { katex.renderToString(decode(tex), { throwOnError: true, displayMode: display, strict: "ignore" }); }
    catch (e) { err(id, `${field}: KaTeX: ${e.message.split("\n")[0]} in "${tex.slice(0, 60)}"`); }
  }
}

function walkStrings(id, obj, path) {
  if (typeof obj === "string") return checkText(id, path, obj);
  if (Array.isArray(obj)) return obj.forEach((v, i) => walkStrings(id, v, `${path}[${i}]`));
  if (obj && typeof obj === "object") for (const [k, v] of Object.entries(obj)) if (k !== "chk") walkStrings(id, v, path ? `${path}.${k}` : k);
}

/* ---------------- schema delle domande ---------------- */
const isInt = n => Number.isInteger(n);
const nonEmpty = s => typeof s === "string" && s.trim().length > 0;
const ids = new Set();

for (const q of QUESTIONS) {
  const id = q.id || "(senza id)";
  if (!nonEmpty(q.id)) err(id, "manca l'id");
  else if (!/^c\d-[a-z0-9]+-\d{3}$/.test(q.id)) err(id, "id non nel formato cN-argomento-NNN");
  if (ids.has(q.id)) err(id, "id duplicato"); ids.add(q.id);
  if (!(q.cap in CAPITOLI)) err(id, `capitolo ${q.cap} inesistente`);
  if (!TOPICS[q.topic]) err(id, `topic "${q.topic}" inesistente`);
  else if (TOPICS[q.topic].cap !== q.cap) err(id, `topic "${q.topic}" è del capitolo ${TOPICS[q.topic].cap}, non ${q.cap}`);
  if (!QTYPES[q.type]) err(id, `tipo "${q.type}" sconosciuto`);
  if (![1, 2, 3].includes(q.diff)) err(id, "diff deve essere 1, 2 o 3");
  if (!nonEmpty(q.src)) err(id, "manca src (fonte)");
  if (!nonEmpty(q.q)) err(id, "manca il testo q");
  if (!nonEmpty(q.expl)) err(id, "manca la spiegazione expl");
  if ("chk" in q && !nonEmpty(q.chk)) err(id, "chk vuoto");
  if (TOPICS[q.topic] && TOPICS[q.topic].daVerificare && !q.daVerificare) warn(id, "topic da verificare: aggiungi daVerificare: true");

  const opts = q.options;
  const dupes = a => new Set(a).size !== a.length;
  switch (q.type) {
    case "mcq":
      if (!Array.isArray(opts) || opts.length !== 4) err(id, "mcq: servono 4 opzioni (A-D)");
      if (!isInt(q.correct) || !opts || q.correct < 0 || q.correct >= opts.length) err(id, "mcq: correct fuori intervallo");
      if (opts && dupes(opts)) err(id, "opzioni duplicate");
      break;
    case "multi":
      if (!Array.isArray(opts) || opts.length < 4 || opts.length > 8) err(id, "multi: da 4 a 8 opzioni");
      if (!Array.isArray(q.correct) || !q.correct.length) err(id, "multi: correct deve essere un array non vuoto");
      else {
        if (q.correct.some(i => !isInt(i) || i < 0 || i >= opts.length)) err(id, "multi: indice fuori intervallo");
        if (new Set(q.correct).size !== q.correct.length) err(id, "multi: indici ripetuti");
        if (q.correct.length === opts.length) err(id, "multi: tutte giuste non ha senso");
      }
      if (opts && dupes(opts)) err(id, "opzioni duplicate");
      break;
    case "vf":
      if (!Array.isArray(q.items) || q.items.length < 2 || q.items.length > 8) err(id, "vf: da 2 a 8 voci");
      else q.items.forEach((it, i) => {
        if (!nonEmpty(it.s)) err(id, `vf: voce ${i} senza testo`);
        if (typeof it.v !== "boolean") err(id, `vf: voce ${i} senza v booleano`);
        if (!nonEmpty(it.why)) err(id, `vf: voce ${i} senza why`);
      });
      break;
    case "cloze": {
      if (!nonEmpty(q.text)) { err(id, "cloze: manca text"); break; }
      if (!Array.isArray(q.gaps) || !q.gaps.length) { err(id, "cloze: mancano gaps"); break; }
      const found = [...q.text.matchAll(/\{\{(\d+)\}\}/g)].map(m => +m[1]);
      q.gaps.forEach((g, i) => {
        const n = found.filter(k => k === i + 1).length;
        if (n !== 1) err(id, `cloze: il segnaposto {{${i + 1}}} compare ${n} volte`);
        if (!Array.isArray(g.opts) || g.opts.length < 2) err(id, `cloze: spazio ${i + 1} con meno di 2 opzioni`);
        else {
          if (!isInt(g.correct) || g.correct < 0 || g.correct >= g.opts.length) err(id, `cloze: spazio ${i + 1} correct fuori intervallo`);
          if (dupes(g.opts)) err(id, `cloze: spazio ${i + 1} con opzioni duplicate`);
        }
      });
      if (found.some(k => k < 1 || k > q.gaps.length)) err(id, "cloze: segnaposto senza spazio corrispondente");
      break;
    }
    case "impl":
      if (!Array.isArray(opts) || opts.length !== 2) err(id, "impl: servono 2 opzioni");
      if (![0, 1].includes(q.correct)) err(id, "impl: correct deve essere 0 o 1");
      if (!nonEmpty(q.dim)) err(id, "impl: manca dim");
      if (!nonEmpty(q.controesempio)) err(id, "impl: manca controesempio");
      break;
    case "errore":
      if (!Array.isArray(q.steps) || q.steps.length < 3) err(id, "errore: servono almeno 3 passi");
      if (!isInt(q.wrong) || !q.steps || q.wrong < 0 || q.wrong >= q.steps.length) err(id, "errore: wrong fuori intervallo");
      if (!nonEmpty(q.fix)) err(id, "errore: manca fix");
      break;
  }
  walkStrings(id, q, "");
}

/* ---------------- teoria ---------------- */
const KINDS = new Set(["teorema", "definizione", "proprieta", "metodo", "esempio", "osservazione"]);
const qById = new Map(QUESTIONS.map(q => [q.id, q]));
const VIDEO = W.VIDEO || {};
const tIds = new Set();
let nNodes = 0, nStar = 0;
for (const ch of W.TEORIA || []) {
  if (!(ch.cap in CAPITOLI)) err(ch.id, `capitolo ${ch.cap} inesistente`);
  if (tIds.has(ch.id)) err(ch.id, "id duplicato nella teoria"); tIds.add(ch.id);
  walkStrings(ch.id, { intro: ch.intro }, "");
  for (const sec of ch.children || []) {
    if (tIds.has(sec.id)) err(sec.id, "id duplicato nella teoria"); tIds.add(sec.id);
    if (!TOPICS[sec.topic]) err(sec.id, `topic "${sec.topic}" inesistente`);
    for (const n of sec.children || []) {
      nNodes++;
      const id = n.id || "(nodo senza id)";
      if (tIds.has(id)) err(id, "id duplicato nella teoria"); tIds.add(id);
      if (!nonEmpty(n.label)) err(id, "manca label");
      if (!TOPICS[n.topic]) err(id, `topic "${n.topic}" inesistente`);
      else if (TOPICS[n.topic].cap !== ch.cap) err(id, `topic "${n.topic}" non è del capitolo ${ch.cap}`);
      if (!KINDS.has(n.kind)) err(id, `kind "${n.kind}" non valido`);
      if (!n.idea && !n.enunciato && !n.testo) err(id, "nodo vuoto (servono idea, enunciato o testo)");
      if (n.enunciato && (!nonEmpty(n.enunciato.ip) || !nonEmpty(n.enunciato.ts))) err(id, "enunciato senza ip o ts");
      (n.dim || []).forEach((s, i) => { if (!nonEmpty(s.passo)) err(id, `dim: passo ${i + 1} vuoto`); });
      if (n.dimRichiesta) {
        nStar++;
        if (!n.dim || n.dim.length < 2) err(id, "dimostrazione richiesta ma senza passi");
        if (!n.cloze) err(id, "dimostrazione richiesta ma senza completamento (cloze)");
      }
      if (n.cloze && (!qById.has(n.cloze) || qById.get(n.cloze).type !== "cloze")) err(id, `cloze "${n.cloze}" inesistente`);
      (n.video || []).forEach(v => { if (!VIDEO[v]) err(id, `video "${v}" non in data/video.js`); });
      if (n.topic && TOPICS[n.topic] && TOPICS[n.topic].daVerificare && !n.daVerificare) warn(id, "topic da verificare: aggiungi daVerificare: true");
      walkStrings(id, n, "");
    }
  }
}

/* ---------------- esercizi ---------------- */
const FIELD_KINDS = new Set(["expr", "number", "prim", "ode"]);
const eIds = new Set();
for (const e of W.ESERCIZI || []) {
  const id = e.id || "(esercizio senza id)";
  if (eIds.has(id) || ids.has(id)) err(id, "id duplicato"); eIds.add(id);
  if (!(e.cap in CAPITOLI)) err(id, `capitolo ${e.cap} inesistente`);
  if (!TOPICS[e.topic]) err(id, `topic "${e.topic}" inesistente`);
  else if (TOPICS[e.topic].cap !== e.cap) err(id, `topic "${e.topic}" non è del capitolo ${e.cap}`);
  if (!nonEmpty(e.src)) err(id, "manca src");
  if (!nonEmpty(e.text)) err(id, "manca il testo");
  if (!Array.isArray(e.steps) || !e.steps.length) err(id, "mancano i passi");
  if (!e.answer || !Array.isArray(e.answer.fields)) err(id, "manca answer.fields");
  else e.answer.fields.forEach((f, i) => {
    if (!FIELD_KINDS.has(f.kind)) err(id, `campo ${i}: kind "${f.kind}" sconosciuto`);
    if ((f.kind === "expr" || f.kind === "prim") && (!nonEmpty(f.expr) || !Array.isArray(f.dom))) err(id, `campo ${i}: servono expr e dom`);
    if (f.kind === "number" && !nonEmpty(f.value)) err(id, `campo ${i}: serve value`);
    if (f.kind === "ode" && (!Array.isArray(f.co) || !nonEmpty(f.rhs))) err(id, `campo ${i}: servono co e rhs`);
  });
  walkStrings(id, { text: e.text, steps: e.steps, nota: e.nota, labels: (e.answer && e.answer.fields || []).map(f => f.label) }, "");
}

/* ---------------- bilanciamento e bias di lunghezza (mcq a 4 opzioni) ---------------- */
// lunghezza "visiva": i comandi LaTeX contano come un carattere
const vlen = s => String(s).replace(/\\(displaystyle|dfrac|tfrac|frac|left|right|mathbb|operatorname|,|;|!)/g, "").replace(/\\[a-zA-Z]+/g, "x").replace(/[\s${}]/g, "").length;
const mcq = QUESTIONS.filter(q => q.type === "mcq" && Array.isArray(q.options) && q.options.length === 4 && [0, 1, 2, 3].includes(q.correct));
const pos = [0, 0, 0, 0];
let longest = 0;
for (const q of mcq) {
  pos[q.correct]++;
  const L = q.options.map(vlen);
  const max = Math.max(...L);
  if (L[q.correct] === max && L.filter(l => l === max).length === 1) longest++;
}
const n = mcq.length;
const share = pos.map(p => n ? p / n : 0);
const biasPct = n ? longest / n : 0;
const MIN_N = 20;
if (n >= MIN_N) {
  share.forEach((s, i) => {
    if (s > 0.35) err("bilanciamento", `la risposta giusta è "${"ABCD"[i]}" nel ${Math.round(s * 100)}% delle mcq (massimo 35%)`);
    if (s < 0.15) err("bilanciamento", `la risposta giusta è "${"ABCD"[i]}" solo nel ${Math.round(s * 100)}% delle mcq (minimo 15%)`);
  });
  if (biasPct > 0.4) err("bias di lunghezza", `la giusta è la più lunga nel ${Math.round(biasPct * 100)}% delle mcq (massimo 40%)`);
}

/* ---------------- riepilogo ---------------- */
const byType = {};
QUESTIONS.forEach(q => { byType[q.type] = (byType[q.type] || 0) + 1; });
console.log(`Domande: ${QUESTIONS.length} (${Object.entries(byType).map(([k, v]) => `${k} ${v}`).join(", ")})`);
console.log(`MCQ a 4 opzioni: ${n}; giusta in A/B/C/D: ${pos.join("/")} (${share.map(s => Math.round(s * 100) + "%").join(" ")}); giusta = più lunga: ${Math.round(biasPct * 100)}%`);
console.log(`Con chk (verifica sympy): ${QUESTIONS.filter(q => q.chk).length}`);
console.log(`Teoria: ${nNodes} nodi, ${nStar} dimostrazioni richieste (★)`);
console.log(`Esercizi: ${(W.ESERCIZI || []).length} (${(W.ESERCIZI || []).filter(e => e.daVerificare).length} con testo da verificare), controlli sympy dei passi: ${(W.ESERCIZI || []).reduce((a, e) => a + (e.stepChk || []).length, 0)}`);
warnings.forEach(w => console.log("  avviso  " + w));
if (errors.length) {
  errors.forEach(e => console.error("  ERRORE  " + e));
  console.error(`\nlint_data: ${errors.length} errori`);
  process.exit(1);
}
console.log("lint_data: ok");

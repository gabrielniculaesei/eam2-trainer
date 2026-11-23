// Verifica dei generatori: N seed ciascuno (predefinito 300) con controlli numerici,
// KaTeX su ogni testo, e 20 varianti per generatore esportate in tools/out/gen_chk.json
// per il controllo sympy (python3 tools/check_bank.py tools/out/gen_chk.json).
// Uso: node tools/verify_generators.mjs [N]
import katex from "katex";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { loadFiles, dataFiles, ROOT } from "./load_data.mjs";

const N = Number(process.argv[2] || 300);
const W = loadFiles(["js/rng.js", "js/cas.js", "js/expr.js", ...dataFiles()]);
const X = W.EXPR;
const errors = [];
const fail = (id, seed, msg) => { if (errors.length < 60) errors.push(`${id} seed ${seed}: ${msg}`); };

function mathSegments(s) {
  const out = []; let i = 0;
  while (i < s.length) {
    if (s.startsWith("$$", i)) { const j = s.indexOf("$$", i + 2); if (j < 0) throw new Error("$$ non chiuso"); out.push([s.slice(i + 2, j), true]); i = j + 2; continue; }
    if (s[i] === "$") { const j = s.indexOf("$", i + 1); if (j < 0) throw new Error("$ non chiuso"); out.push([s.slice(i + 1, j), false]); i = j + 1; continue; }
    i++;
  }
  return out;
}
function texOk(s) {
  for (const [t, d] of mathSegments(s)) katex.renderToString(t, { throwOnError: true, displayMode: d, strict: "ignore" });
}
function strings(o, acc = []) {
  if (typeof o === "string") acc.push(o);
  else if (Array.isArray(o)) o.forEach(v => strings(v, acc));
  else if (o && typeof o === "object") for (const [k, v] of Object.entries(o)) if (!["verify", "chk", "expr", "value", "rhs", "dom"].includes(k)) strings(v, acc);
  return acc;
}

const f = s => X.compile(s).f;
const close = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(a), Math.abs(b));
const d1 = (g, x, h = 1e-5) => (g(x + h) - g(x - h)) / (2 * h);
function simpson(g, a, b, n = 2000) {
  if (a === b) return 0;
  const h = (b - a) / n; let s = g(a) + g(b);
  for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * g(a + i * h);
  return s * h / 3;
}
const pts = dom => X.points(dom);

function check(g, v, seed) {
  const id = g.id;
  try { strings(v).forEach(texOk); } catch (e) { return fail(id, seed, "KaTeX: " + e.message.split("\n")[0]); }
  const V = v.verify;
  if (!V) return fail(id, seed, "manca verify");
  if (v.type === "mcq" || v.type === "multi") {
    if (new Set(v.options).size !== v.options.length) return fail(id, seed, "opzioni duplicate");
    if (v.type === "mcq" && (v.options.length !== 4 || !(v.correct >= 0 && v.correct < 4))) return fail(id, seed, "mcq: servono 4 opzioni e un indice valido");
  } else {
    for (const fl of v.answer.fields) {
      const ref = fl.kind === "number" ? fl.value : fl.expr;
      const r = X.checkField(fl, ref);
      if (!r.ok) return fail(id, seed, `la risposta di riferimento non passa il proprio controllo (${r.msg})`);
    }
  }
  switch (V.kind) {
    case "prim": {
      const fx = f(V.f);
      for (const b of V.branches) {
        const F = f(b.expr);
        for (const x of pts(b.dom)) if (!close(d1(F, x), fx(x), 1e-5)) return fail(id, seed, `F' != f in x = ${x.toFixed(3)} (${d1(F, x)} vs ${fx(x)})`);
      }
      V.cuts.forEach((c, i) => {
        const a = f(V.branches[i].expr)(c), b = f(V.branches[i + 1].expr)(c);
        if (!close(a, b, 1e-9)) fail(id, seed, `discontinua in ${c}`);
      });
      if (!close(f(V.branches[V.j].expr)(V.x0), V.y0, 1e-9)) fail(id, seed, "condizione F(x0) = y0 non soddisfatta");
      break;
    }
    case "primsingle": {
      const F = f(V.expr), fx = f(V.f);
      for (const x of pts(V.dom)) if (!close(d1(F, x), fx(x), 1e-5)) return fail(id, seed, "F' != f");
      break;
    }
    case "defint": {
      const fx = f(V.f);
      const lo = Math.min(V.a, V.b), hi = Math.max(V.a, V.b);
      // spezza nei punti di raccordo interi per la precisione
      let s = 0; for (let k = lo; k < hi; k++) s += simpson(fx, k, k + 1);
      if (V.a > V.b) s = -s;
      if (!close(s, V.value, 1e-8)) fail(id, seed, `integrale numerico ${s} != ${V.value}`);
      break;
    }
    case "ode": {
      const r = X.solvesOde(V.y, V.co, V.rhs, [-1.5, 1.5]);
      if (!r.ok) return fail(id, seed, "residuo dell'equazione non nullo: " + r.msg);
      const y = f(V.y);
      if (!close(y(V.x0), V.vals[0], 1e-9)) fail(id, seed, "y(0) sbagliato");
      if (!close(d1(y, V.x0), V.vals[1], 1e-6)) fail(id, seed, "y'(0) sbagliato");
      break;
    }
    case "derivint": {
      const ft = s => X.compile(s.replace(/\bt\b/g, "x")).f;
      const fn = ft(V.f), lo = f(String(V.lo)), up = f(String(V.up));
      const F = x => simpson(fn, lo(x), up(x), 4000);
      const num = d1(F, V.x, 1e-4), want = f(V.correct)(V.x);
      if (!close(num, want, 1e-5)) fail(id, seed, `derivata numerica ${num} != ${want}`);
      break;
    }
    case "forma": {
      const roots = [], disc = V.a * V.a - 4 * V.b;
      if (V.options.indexOf(V.right) !== v.correct) fail(id, seed, "indice della risposta giusta");
      const P = a => a * a + V.a * a + V.b;
      const s = P(V.h) === 0 ? (2 * V.h + V.a === 0 ? 2 : 1) : 0;
      if (s !== V.s) fail(id, seed, `s = ${V.s} ma la molteplicità di h è ${s}`);
      void roots; void disc;
      break;
    }
    case "multi": {
      if (!V.correct.length || V.correct.length >= V.n) fail(id, seed, "numero di risposte giuste");
      break;
    }
    case "omog": {
      for (const y of V.basis) { const r = X.solvesOde(y, [1, V.a, V.b], "0", [-1, 1]); if (!r.ok) fail(id, seed, `${y} non risolve l'omogenea`); }
      break;
    }
    default: fail(id, seed, "verify.kind sconosciuto: " + V.kind);
  }
}

const gens = W.GENERATORI || [];
const chks = [];
const t0 = Date.now();
for (const g of gens) {
  const before = errors.length;
  for (let seed = 1; seed <= N; seed++) {
    let v;
    try { v = g.gen(W.RNG.create(seed * 7919 + 13)); }
    catch (e) { fail(g.id, seed, "eccezione: " + e.message); continue; }
    check(g, v, seed);
    if (seed <= 20 && v.chk) chks.push({ id: `${g.id}#${seed}`, chk: v.chk });
  }
  console.log(`  ${errors.length === before ? "ok " : "NO "} ${g.id.padEnd(15)} ${N} varianti`);
}
mkdirSync(join(ROOT, "tools", "out"), { recursive: true });
writeFileSync(join(ROOT, "tools", "out", "gen_chk.json"), JSON.stringify(chks, null, 1));
console.log(`verify_generators: ${gens.length} generatori, ${gens.length * N} varianti in ${((Date.now() - t0) / 1000).toFixed(1)} s; ${chks.length} controlli sympy esportati`);
if (errors.length) { errors.forEach(e => console.error("  ERRORE  " + e)); process.exit(1); }

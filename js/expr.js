/* Parser delle risposte scritte dallo studente e confronto numerico.
   Sintassi: numeri (anche 0,5), frazioni, + - * / ^ (anche **), parentesi,
   moltiplicazione implicita (2x, 3(x+1), x e^x), costanti e, pi (π),
   funzioni sqrt log ln exp sin cos tan arctan (atan) arcsin abs, |x|.
   "sin 2x" vale sin(2x); "e^2x" vale e^(2x); "sin x cos x" vale sin(x)·cos(x).
   Confronto: tolleranza relativa 1e-6 in 5 punti dell'intervallo giusto. */
(function () {
  "use strict";

  const FUNCS = {
    sqrt: Math.sqrt, log: Math.log, ln: Math.log, exp: Math.exp, sin: Math.sin, cos: Math.cos, tan: Math.tan,
    arctan: Math.atan, atan: Math.atan, arcsin: Math.asin, asin: Math.asin, arccos: Math.acos, acos: Math.acos,
    abs: Math.abs, Abs: Math.abs
  };
  const CONSTS = { e: Math.E, E: Math.E, pi: Math.PI, "π": Math.PI };
  const NAMES = [...Object.keys(FUNCS), ...Object.keys(CONSTS), "x"].sort((a, b) => b.length - a.length);
  const TEX_F = { sqrt: null, log: "\\log", ln: "\\log", exp: null, sin: "\\sin", cos: "\\cos", tan: "\\tan", arctan: "\\arctan", atan: "\\arctan", arcsin: "\\arcsin", asin: "\\arcsin", arccos: "\\arccos", acos: "\\arccos", abs: null, Abs: null };

  class ExprError extends Error { }

  function tokenize(src) {
    const s = String(src).replace(/[·×]/g, "*").replace(/[−–]/g, "-").replace(/÷/g, "/").replace(/\*\*/g, "^").replace(/²/g, "^2").replace(/³/g, "^3");
    const out = [];
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      const num = s.slice(i).match(/^\d+(?:[.,]\d+)?|^[.,]\d+/);
      if (num) { out.push({ t: "num", v: parseFloat(num[0].replace(",", ".")) }); i += num[0].length; continue; }
      if ("+-*/^()|".includes(c)) { out.push({ t: "op", v: c }); i++; continue; }
      if (/[A-Za-zπ]/.test(c)) {
        const name = NAMES.find(n => s.startsWith(n, i));
        if (!name) throw new ExprError(`simbolo sconosciuto: "${s.slice(i).match(/^[A-Za-zπ]+/)[0]}"`);
        out.push({ t: "id", v: name }); i += name.length; continue;
      }
      throw new ExprError(`carattere non valido: "${c}"`);
    }
    return out;
  }

  /* ---------- parser a discesa ricorsiva ---------- */
  function parse(src) {
    const tk = tokenize(src);
    if (!tk.length) throw new ExprError("risposta vuota");
    let p = 0, absDepth = 0;
    const peek = () => tk[p];
    const isOp = (v) => tk[p] && tk[p].t === "op" && tk[p].v === v;
    const eat = (v) => { if (!isOp(v)) throw new ExprError(v === ")" ? "manca una parentesi chiusa" : `atteso "${v}"`); p++; };

    function startsPrimary(t) {
      if (!t) return false;
      if (t.t === "num" || t.t === "id") return true;
      if (t.t === "op" && t.v === "(") return true;
      if (t.t === "op" && t.v === "|" && absDepth === 0) return true;
      return false;
    }

    function expr() {
      let a = term();
      while (isOp("+") || isOp("-")) { const op = tk[p++].v; a = { k: "bin", op, a, b: term() }; }
      return a;
    }
    function term() {
      let a = unary();
      for (;;) {
        if (isOp("*") || isOp("/")) { const op = tk[p++].v; a = { k: "bin", op, a, b: unary() }; continue; }
        if (startsPrimary(peek())) { a = { k: "bin", op: "*", a, b: power() }; continue; }
        return a;
      }
    }
    function unary() {
      if (isOp("-")) { p++; return { k: "neg", a: unary() }; }
      if (isOp("+")) { p++; return unary(); }
      return power();
    }
    /* "2x" dentro un esponente o un argomento senza parentesi resta unito */
    function absorbX(n) {
      if (n.k === "num" && peek() && peek().t === "id" && peek().v === "x") { p++; return { k: "bin", op: "*", a: n, b: { k: "x" } }; }
      if (n.k === "neg" && n.a.k === "num" && peek() && peek().t === "id" && peek().v === "x") { p++; return { k: "neg", a: { k: "bin", op: "*", a: n.a, b: { k: "x" } } }; }
      return n;
    }
    function power() {
      const base = primary();
      if (isOp("^")) { p++; const e = absorbX(unary()); return { k: "bin", op: "^", a: base, b: e }; }
      return base;
    }
    function primary() {
      const t = peek();
      if (!t) throw new ExprError("espressione incompleta");
      if (t.t === "num") { p++; return { k: "num", v: t.v }; }
      if (t.t === "op" && t.v === "(") { p++; const e = expr(); eat(")"); return e; }
      if (t.t === "op" && t.v === "|") {
        p++; absDepth++; const e = expr(); absDepth--;
        if (!isOp("|")) throw new ExprError("manca la barra di chiusura del valore assoluto");
        p++; return { k: "call", f: "abs", a: e };
      }
      if (t.t === "id") {
        p++;
        if (t.v === "x") return { k: "x" };
        if (t.v in CONSTS) return { k: "const", v: t.v };
        // funzione: f(...), f^2(...) oppure f x
        let ex = null;
        if (isOp("^")) { p++; ex = primary(); }
        let arg;
        if (isOp("(")) { p++; arg = expr(); eat(")"); }
        else if (startsPrimary(peek())) arg = absorbX(power());
        else throw new ExprError(`manca l'argomento di ${t.v}`);
        const c = { k: "call", f: t.v, a: arg };
        return ex ? { k: "bin", op: "^", a: c, b: ex } : c;
      }
      throw new ExprError(t.v === ")" ? "parentesi chiusa in più" : `"${t.v}" fuori posto`);
    }

    const tree = expr();
    if (p < tk.length) throw new ExprError(tk[p].v === ")" ? "parentesi chiusa in più" : `"${tk[p].v}" fuori posto`);
    return tree;
  }

  function evaluate(n, x) {
    switch (n.k) {
      case "num": return n.v;
      case "x": return x;
      case "const": return CONSTS[n.v];
      case "neg": return -evaluate(n.a, x);
      case "call": return FUNCS[n.f](evaluate(n.a, x));
      case "bin": {
        const a = evaluate(n.a, x), b = evaluate(n.b, x);
        switch (n.op) {
          case "+": return a + b; case "-": return a - b; case "*": return a * b; case "/": return a / b;
          case "^": return Math.pow(a, b);
        }
      }
    }
    return NaN;
  }

  function compile(src) {
    const tree = parse(src);
    return { tree, f: x => evaluate(tree, x), hasX: JSON.stringify(tree).includes('"k":"x"') };
  }

  /* ---------- LaTeX per l'anteprima ---------- */
  const PREC = { "+": 1, "-": 1, "*": 2, "/": 2, "^": 4 };
  function tex(n, parentPrec) {
    parentPrec = parentPrec || 0;
    let s, prec = 9;
    switch (n.k) {
      case "num": s = String(n.v).replace(".", "{,}"); break;
      case "x": s = "x"; break;
      case "const": s = n.v === "pi" || n.v === "π" ? "\\pi" : "e"; break;
      case "neg": s = "-" + tex(n.a, 3); prec = 3; break;
      case "call": {
        const a = tex(n.a, 0);
        if (n.f === "sqrt") s = `\\sqrt{${a}}`;
        else if (n.f === "abs" || n.f === "Abs") s = `\\left|${a}\\right|`;
        else if (n.f === "exp") s = `e^{${a}}`;
        else s = `${TEX_F[n.f]}\\left(${a}\\right)`;
        break;
      }
      case "bin":
        prec = PREC[n.op];
        if (n.op === "/") { s = `\\dfrac{${tex(n.a, 0)}}{${tex(n.b, 0)}}`; prec = 9; }
        else if (n.op === "^") s = `${tex(n.a, 5)}^{${tex(n.b, 0)}}`;
        else if (n.op === "*") {
          const a = tex(n.a, 2), b = tex(n.b, 2.5);
          const dot = /^[\d{]/.test(b) || (n.b.k === "num") ? "\\cdot " : (n.a.k === "num" ? "" : "\\,");
          s = a + dot + b;
        } else s = `${tex(n.a, 1)} ${n.op} ${tex(n.b, n.op === "-" ? 1.5 : 1)}`;
    }
    return prec < parentPrec ? `\\left(${s}\\right)` : s;
  }
  function toTeX(src) { return tex(parse(src)); }

  /* ---------- confronti ---------- */
  const FRACS = [0.11, 0.29, 0.47, 0.63, 0.86];
  function points(dom) { const [a, b] = dom || [-2, 2]; return FRACS.map(t => a + (b - a) * t); }
  const close = (u, v, tol) => Math.abs(u - v) <= (tol || 1e-6) * Math.max(1, Math.abs(u), Math.abs(v));

  function result(ok, msg) { return { ok, msg: msg || "" }; }

  /* stessa funzione nei 5 punti */
  function sameFunction(input, ref, dom) {
    let u, r;
    try { u = compile(input); } catch (e) { return result(false, e.message); }
    r = compile(ref);
    let n = 0;
    for (const x of points(dom)) {
      const rv = r.f(x); if (!isFinite(rv)) continue;
      const uv = u.f(x);
      if (!isFinite(uv) || !close(uv, rv)) return result(false, "non coincide con la soluzione");
      n++;
    }
    return n >= 3 ? result(true) : result(false, "impossibile controllare in questo intervallo");
  }

  /* primitiva: la differenza con quella di riferimento deve essere costante */
  function sameUpToConstant(input, ref, dom) {
    let u;
    try { u = compile(input); } catch (e) { return result(false, e.message); }
    const r = compile(ref);
    if (!u.hasX) return result(false, "la risposta non dipende da x");
    const d = [];
    let scale = 1;
    for (const x of points(dom)) {
      const rv = r.f(x), uv = u.f(x);
      if (!isFinite(rv)) continue;
      if (!isFinite(uv)) return result(false, "non è definita in tutto l'intervallo");
      d.push(uv - rv); scale = Math.max(scale, Math.abs(rv), Math.abs(uv));
    }
    if (d.length < 3) return result(false, "impossibile controllare in questo intervallo");
    const ok = d.every(v => Math.abs(v - d[0]) <= 1e-6 * scale);
    return ok ? result(true) : result(false, "la derivata non coincide con la funzione integranda");
  }

  function sameNumber(input, ref) {
    let u;
    try { u = compile(input); } catch (e) { return result(false, e.message); }
    if (u.hasX) return result(false, "il risultato è un numero: non deve contenere x");
    const uv = u.f(0), rv = compile(ref).f(0);
    return close(uv, rv) ? result(true) : result(false, "valore diverso");
  }

  /* integrale particolare: residuo dell'equazione y^(n) + c1 y^(n-1) + ... + cn y = rhs
     calcolato con differenze finite centrate (co = [1, c1, ..., cn]) */
  function derivs(f, x, n) {
    const h = n >= 3 ? 2e-3 : 1e-3;
    const v = [f(x)];
    if (n >= 1) v.push((f(x + h) - f(x - h)) / (2 * h));
    if (n >= 2) v.push((f(x + h) - 2 * f(x) + f(x - h)) / (h * h));
    if (n >= 3) v.push((f(x + 2 * h) - 2 * f(x + h) + 2 * f(x - h) - f(x - 2 * h)) / (2 * h * h * h));
    return v;
  }
  function solvesOde(input, co, rhs, dom) {
    let u;
    try { u = compile(input); } catch (e) { return result(false, e.message); }
    const g = compile(rhs);
    const n = co.length - 1;
    let ok = 0;
    for (const x of points(dom)) {
      const d = derivs(u.f, x, n);
      if (d.some(v => !isFinite(v))) return result(false, "non è definita in tutto l'intervallo");
      let lhs = 0, scale = 1;
      for (let i = 0; i <= n; i++) { lhs += co[i] * d[n - i]; scale = Math.max(scale, Math.abs(co[i] * d[n - i])); }
      const r = g.f(x);
      scale = Math.max(scale, Math.abs(r));
      if (Math.abs(lhs - r) > 2e-4 * scale) return result(false, "sostituita nell'equazione non dà il termine noto");
      ok++;
    }
    return ok >= 3 ? result(true) : result(false, "impossibile controllare");
  }

  /* campo di risposta di un esercizio: { kind, expr | value | co+rhs, dom } */
  function checkField(field, input) {
    if (!String(input || "").trim()) return result(false, "vuoto");
    switch (field.kind) {
      case "expr": return sameFunction(input, field.expr, field.dom);
      case "prim": return sameUpToConstant(input, field.expr, field.dom);
      case "number": return sameNumber(input, field.value);
      case "ode": return solvesOde(input, field.co, field.rhs, field.dom);
    }
    return result(false, "tipo di risposta sconosciuto");
  }

  window.EXPR = { tokenize, parse, compile, evaluate, toTeX, points, sameFunction, sameUpToConstant, sameNumber, solvesOde, checkField, ExprError };
})();

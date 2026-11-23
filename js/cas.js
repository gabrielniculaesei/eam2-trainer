/* Piccolo calcolo simbolico esatto per i generatori di esercizi.
   - Frac: frazioni (numeri interi piccoli, sempre ridotte)
   - Poly: polinomi in x a coefficienti Frac (array, indice = grado)
   - EP (esponenziale per polinomio): somma di termini e^{lam x + nu} p(x)
   - EC (costante con esponenziali): somma di c * e^{mu}, mu razionale
   Ogni oggetto ha tex() per i passi e str() per expr.js e sympy (P('...')). */
(function () {
  "use strict";

  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };

  /* ---------------- frazioni ---------------- */
  class Frac {
    constructor(n, d) {
      if (d === undefined) d = 1;
      if (!Number.isInteger(n) || !Number.isInteger(d) || d === 0) throw new Error(`Frac non valida ${n}/${d}`);
      if (d < 0) { n = -n; d = -d; }
      const g = gcd(n, d);
      this.n = n / g; this.d = d / g;
      if (!Number.isSafeInteger(this.n) || !Number.isSafeInteger(this.d)) throw new Error("Frac fuori scala");
    }
    add(o) { o = F(o); return new Frac(this.n * o.d + o.n * this.d, this.d * o.d); }
    sub(o) { o = F(o); return new Frac(this.n * o.d - o.n * this.d, this.d * o.d); }
    mul(o) { o = F(o); return new Frac(this.n * o.n, this.d * o.d); }
    div(o) { o = F(o); if (!o.n) throw new Error("divisione per zero"); return new Frac(this.n * o.d, this.d * o.n); }
    neg() { return new Frac(-this.n, this.d); }
    eq(o) { o = F(o); return this.n === o.n && this.d === o.d; }
    get zero() { return this.n === 0; }
    get one() { return this.n === 1 && this.d === 1; }
    get int() { return this.d === 1; }
    sign() { return Math.sign(this.n); }
    abs() { return new Frac(Math.abs(this.n), this.d); }
    val() { return this.n / this.d; }
    /* LaTeX: \frac{n}{d}; con "dfrac" più grande nei testi */
    tex(big) { if (this.d === 1) return String(this.n); const f = big ? "\\dfrac" : "\\frac"; return (this.n < 0 ? "-" : "") + `${f}{${Math.abs(this.n)}}{${this.d}}`; }
    str() { return this.d === 1 ? String(this.n) : `(${this.n}/${this.d})`; }
  }
  const F = (n, d) => n instanceof Frac ? n : new Frac(n, d);
  const ZERO = F(0), ONE = F(1);

  /* ---------------- polinomi ---------------- */
  class Poly {
    constructor(c) { this.c = (c || []).map(v => F(v)); this.trim(); }
    trim() { while (this.c.length && this.c[this.c.length - 1].zero) this.c.pop(); return this; }
    static x(n) { const c = Array(n + 1).fill(ZERO); c[n] = ONE; return new Poly(c); }
    get deg() { return this.c.length - 1; }
    get zero() { return this.c.length === 0; }
    co(i) { return this.c[i] || ZERO; }
    add(o) { const n = Math.max(this.c.length, o.c.length); return new Poly(Array.from({ length: n }, (_, i) => this.co(i).add(o.co(i)))); }
    sub(o) { return this.add(o.scale(-1)); }
    scale(k) { k = F(k); return new Poly(this.c.map(v => v.mul(k))); }
    mul(o) {
      if (this.zero || o.zero) return new Poly([]);
      const r = Array(this.c.length + o.c.length - 1).fill(ZERO);
      this.c.forEach((a, i) => o.c.forEach((b, j) => { r[i + j] = r[i + j].add(a.mul(b)); }));
      return new Poly(r);
    }
    shiftX(k) { return new Poly(Array(k).fill(ZERO).concat(this.c)); }   // moltiplica per x^k
    deriv() { return new Poly(this.c.slice(1).map((v, i) => v.mul(i + 1))); }
    integ() { return new Poly([ZERO].concat(this.c.map((v, i) => v.div(i + 1)))); }
    at(x) { x = F(x); let r = ZERO; for (let i = this.c.length - 1; i >= 0; i--) r = r.mul(x).add(this.c[i]); return r; }
    num(x) { let r = 0; for (let i = this.c.length - 1; i >= 0; i--) r = r * x + this.c[i].val(); return r; }
    eq(o) { return this.sub(o).zero; }
    /* LaTeX con le potenze decrescenti, come si scrive a mano */
    tex(v) {
      v = v || "x";
      if (this.zero) return "0";
      let s = "";
      for (let i = this.c.length - 1; i >= 0; i--) {
        const a = this.c[i]; if (a.zero) continue;
        const mon = i === 0 ? "" : i === 1 ? v : `${v}^{${i}}`;
        const abs = a.abs();
        let coef = abs.one && i > 0 ? "" : abs.tex();
        if (!abs.int && i > 0) coef = abs.tex();
        const sgn = a.sign() < 0 ? "-" : "+";
        s += (s ? ` ${sgn} ` : (sgn === "-" ? "-" : "")) + coef + mon;
      }
      return s;
    }
    str() {
      if (this.zero) return "0";
      return "(" + this.c.map((a, i) => a.zero ? null : `${a.str()}*x**${i}`).filter(Boolean).join(" + ") + ")";
    }
    get terms() { return this.c.filter(v => !v.zero).length; }
  }
  const P = c => new Poly(c);

  /* ---------------- costanti c * e^{mu} ---------------- */
  class EC {
    constructor() { this.m = new Map(); }
    static of(c, mu) { const e = new EC(); e.addTerm(F(mu || 0), F(c)); return e; }
    key(mu) { return mu.n + "/" + mu.d; }
    addTerm(mu, c) {
      mu = F(mu); c = F(c);
      const k = this.key(mu);
      const cur = this.m.get(k);
      const nv = cur ? cur.c.add(c) : c;
      if (nv.zero) this.m.delete(k); else this.m.set(k, { mu, c: nv });
      return this;
    }
    add(o) { const r = this.clone(); for (const t of o.m.values()) r.addTerm(t.mu, t.c); return r; }
    sub(o) { return this.add(o.scale(-1)); }
    scale(k) { const r = new EC(); for (const t of this.m.values()) r.addTerm(t.mu, t.c.mul(k)); return r; }
    clone() { const r = new EC(); for (const t of this.m.values()) r.addTerm(t.mu, t.c); return r; }
    get zero() { return this.m.size === 0; }
    num() { let s = 0; for (const t of this.m.values()) s += t.c.val() * Math.exp(t.mu.val()); return s; }
    sorted() { return [...this.m.values()].sort((a, b) => a.mu.val() - b.mu.val()); }
    tex() {
      if (this.zero) return "0";
      let s = "";
      for (const t of this.sorted()) {
        const ex = t.mu.zero ? "" : t.mu.one ? "e" : `e^{${t.mu.tex()}}`;
        const a = t.c.abs();
        let body;
        if (!ex) body = a.tex();
        else if (a.one) body = ex;
        else if (a.int) body = a.n + ex;
        else body = `\\frac{${a.n === 1 ? "" : a.n}${ex}}{${a.d}}`;
        s += (s ? (t.c.sign() < 0 ? " - " : " + ") : (t.c.sign() < 0 ? "-" : "")) + body;
      }
      return s;
    }
    str() { return this.zero ? "0" : "(" + this.sorted().map(t => `${t.c.str()}*exp(${t.mu.str()})`).join(" + ") + ")"; }
  }

  /* ---------------- esponenziale per polinomio ---------------- */
  /* termine: { lam: Frac, nu: Frac, p: Poly } = e^{lam x + nu} p(x) */
  class EP {
    constructor(terms) { this.t = []; (terms || []).forEach(t => this.push(t.lam, t.nu, t.p)); }
    push(lam, nu, p) {
      lam = F(lam); nu = F(nu || 0);
      if (p.zero) return this;
      const old = this.t.find(t => t.lam.eq(lam) && t.nu.eq(nu));
      if (old) { old.p = old.p.add(p); this.t = this.t.filter(t => !t.p.zero); }
      else this.t.push({ lam, nu, p });
      return this;
    }
    static of(lam, p, nu) { return new EP([{ lam: F(lam), nu: F(nu || 0), p }]); }
    add(o) { const r = this.clone(); o.t.forEach(t => r.push(t.lam, t.nu, t.p)); return r; }
    sub(o) { return this.add(o.scale(-1)); }
    scale(k) { return new EP(this.t.map(t => ({ lam: t.lam, nu: t.nu, p: t.p.scale(k) }))); }
    clone() { return new EP(this.t.map(t => ({ lam: t.lam, nu: t.nu, p: new Poly(t.p.c) }))); }
    get zero() { return this.t.length === 0; }
    deriv() { return new EP(this.t.map(t => ({ lam: t.lam, nu: t.nu, p: t.p.scale(t.lam).add(t.p.deriv()) }))); }
    /* primitiva: per lam != 0, q = sum_k (-1)^k p^(k) / lam^(k+1) */
    integ() {
      return new EP(this.t.map(t => {
        if (t.lam.zero) return { lam: t.lam, nu: t.nu, p: t.p.integ() };
        let q = new Poly([]), d = t.p, sgn = 1, pw = t.lam;
        while (!d.zero) { q = q.add(d.scale(F(sgn).div(pw))); d = d.deriv(); sgn = -sgn; pw = pw.mul(t.lam); }
        return { lam: t.lam, nu: t.nu, p: q };
      }));
    }
    /* valore esatto in un punto razionale: costante EC */
    at(x) { x = F(x); const r = new EC(); this.t.forEach(t => r.addTerm(t.lam.mul(x).add(t.nu), t.p.at(x))); return r; }
    num(x) { return this.t.reduce((s, t) => s + Math.exp(t.lam.val() * x + t.nu.val()) * t.p.num(x), 0); }
    eq(o) { return this.sub(o).zero; }
    tex() {
      if (this.zero) return "0";
      const parts = this.t.slice().sort((u, v) => v.lam.val() - u.lam.val() || v.nu.val() - u.nu.val()).map(t => {
        const ex = t.lam.zero && t.nu.zero ? "" : `e^{${expTex(t.lam, t.nu)}}`;
        if (!ex) return t.p.tex();
        if (t.p.terms === 1) {
          const i = t.p.c.findIndex(v => !v.zero), a = t.p.c[i], A = a.abs();
          const mon = i === 0 ? "" : i === 1 ? "x" : `x^{${i}}`;
          const body = A.int ? (A.one ? "" : A.n) + mon + ex : `\\frac{${A.n === 1 ? "" : A.n}${mon}${ex}}{${A.d}}`;
          return (a.sign() < 0 ? "-" : "") + body;
        }
        return `${ex}\\left(${t.p.tex()}\\right)`;
      });
      return parts.reduce((acc, q, i) => i === 0 ? q : acc + plus(q), "");
    }
    str() { return this.zero ? "0" : this.t.map(t => `exp(${t.lam.str()}*x + ${t.nu.str()})*${t.p.str()}`).join(" + "); }
  }
  function expTex(lam, nu) {
    const lx = lam.zero ? "" : lam.one ? "x" : lam.eq(-1) ? "-x" : `${lam.tex()}x`;
    if (nu.zero) return lx || "0";
    if (!lx) return nu.tex();
    return lx + (nu.sign() < 0 ? " - " : " + ") + nu.abs().tex();
  }

  /* ---------------- sistemi lineari esatti (Gauss) ---------------- */
  function solve(A, b) {
    const n = A.length;
    const M = A.map((r, i) => r.map(v => F(v)).concat([F(b[i])]));
    for (let c = 0; c < n; c++) {
      let p = c; while (p < n && M[p][c].zero) p++;
      if (p === n) throw new Error("sistema singolare");
      [M[c], M[p]] = [M[p], M[c]];
      for (let r = 0; r < n; r++) {
        if (r === c || M[r][c].zero) continue;
        const f = M[r][c].div(M[c][c]);
        M[r] = M[r].map((v, j) => v.sub(M[c][j].mul(f)));
      }
    }
    return M.map((r, i) => r[n].div(r[i]));
  }

  /* ---------------- utilità di stampa ---------------- */
  /* "+ termine" o "- termine" per accodare un LaTeX che può iniziare con "-" */
  const plus = s => (s.trim().startsWith("-") ? " - " + s.trim().slice(1).trim() : " + " + s);
  const LET = ["a", "b", "c", "d", "e"];

  window.CAS = { Frac, F, ZERO, ONE, Poly, P, EP, EC, solve, gcd, plus, expTex, LET };
})();

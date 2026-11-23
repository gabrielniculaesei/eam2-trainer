/* Generatori del capitolo 2 (stesso schema di generatori_integrali.js). */
(function () {
  "use strict";

  /* equazione caratteristica scelta al contrario: radici intere */
  function pickRoots(r) {
    if (r.next() < 0.3) { const a = r.int(-3, 3); return { roots: [a, a], double: true }; }
    const a = r.int(-3, 3); const b = r.intNot(-3, 3, [a]);
    return { roots: [Math.min(a, b), Math.max(a, b)], double: false };
  }
  const coeffs = R => ({ a: -(R[0] + R[1]), b: R[0] * R[1] });
  function eqLHS(a, b) {
    let s = "y''";
    if (a) s += (a < 0 ? " - " : " + ") + (Math.abs(a) === 1 ? "" : Math.abs(a)) + "y'";
    if (b) s += (b < 0 ? " - " : " + ") + (Math.abs(b) === 1 ? "" : Math.abs(b)) + "y";
    return s;
  }
  function charTex(a, b) {
    let s = "\\alpha^2";
    if (a) s += (a < 0 ? " - " : " + ") + (Math.abs(a) === 1 ? "" : Math.abs(a)) + "\\alpha";
    if (b) s += (b < 0 ? " - " : " + ") + Math.abs(b);
    return s + " = 0";
  }
  const expT = h => h === 0 ? "" : `e^{${h === 1 ? "" : h === -1 ? "-" : h}x}`;
  /* forma x^s (a x^m + ... ) con lettere, espansa come si scrive a mano */
  function formTex(h, s, m) {
    const L = ["a", "b", "c", "d"];
    const terms = [];
    for (let j = 0; j <= m; j++) {
      const deg = s + m - j;
      terms.push(L[j] + (deg === 0 ? "" : deg === 1 ? "x" : `x^${deg}`));
    }
    const poly = terms.join(" + ");
    if (h === 0) return `y(x) = ${poly}`;
    if (m === 0) return `y(x) = ${poly}${expT(h)}`;
    return `y(x) = ${expT(h)}(${poly})`;
  }

  /* integrale particolare esatto di y'' + a y' + b y = e^{hx} p(x) */
  function particular(a, b, h, p, s) {
    const { F, P, Poly, solve } = window.CAS;
    const m = p.deg;
    const L = u => u.deriv().deriv().add(u.deriv().scale(2 * h + a)).add(u.scale(h * h + a * h + b));
    const cols = Array.from({ length: m + 1 }, (_, j) => L(Poly.x(s + j)));
    const A = Array.from({ length: m + 1 }, (_, d) => cols.map(c => c.co(d)));
    const q = solve(A, Array.from({ length: m + 1 }, (_, d) => p.co(d)));
    return { q: new Poly(q), cols };
  }

  (window.GENERATORI = window.GENERATORI || []).push(

  /* ------------------------------------------------------------------ */
  { id: "gen-pc2", cap: 2, topic: "cauchy", short: "problema di Cauchy",
    title: String.raw`Problema di Cauchy $y'' + ay' + by = e^{hx}p(x)$`,
    gen(r) {
      const { F, P, EP, Poly, solve, plus } = window.CAS;
      const RR = pickRoots(r), R = RR.roots;
      const { a, b } = coeffs(R);
      const u = r.next();
      const h = u < 0.55 ? r.pick(R) : r.intNot(-3, 3, R);
      const s = R.filter(x => x === h).length;
      const m = r.next() < 0.75 ? 1 : (r.next() < 0.5 ? 0 : 2);
      const pc = [r.int(-3, 3), r.pick([1, 2, 1, 3])];
      const p = m === 0 ? P([r.pick([1, 2, 3, -1, 4])]) : m === 1 ? P(pc) : P([r.int(-2, 3), r.int(-2, 2), 1]);
      const { q, cols } = particular(a, b, h, p, s);
      const ybar = EP.of(h, q.shiftX(s));
      const ys = RR.double ? [EP.of(R[0], P([1])), EP.of(R[0], P([0, 1]))] : [EP.of(R[0], P([1])), EP.of(R[1], P([1]))];
      const K = [F(r.pick([1, -1, 2, -2, 1, 3])).div(r.pick([1, 1, 1, 2, 4])), F(r.pick([1, -1, 2, -2, 3])).div(r.pick([1, 1, 2]))];
      const y = ys[0].scale(K[0]).add(ys[1].scale(K[1])).add(ybar);
      const at0 = e => e.at(0).sorted().reduce((acc, t) => acc.add(t.c), F(0));   // in x = 0 gli esponenziali valgono 1
      const y0 = at0(y), y1 = at0(y.deriv());
      // testo nello stile delle tracce: a volte p(x)/e^{kx}
      const rhs = (h < 0 && r.next() < 0.5)
        ? String.raw`\dfrac{${p.tex()}}{e^{${-h === 1 ? "" : -h}x}}`
        : h === 0 ? p.tex() : (p.terms === 1 && p.deg === 0 ? `${p.co(0).eq(1) ? "" : p.co(0).tex()}${expT(h)}` : `${expT(h)}(${p.tex()})`);
      const L = ["a", "b", "c"];
      const lhsSym = Array.from({ length: m + 1 }, (_, d) => cols.map((c, j) => ({ c: c.co(d), l: L[m - j] })).filter(t => !t.c.zero));
      const symPoly = lhsSym.map((ts, d) => ({ d, t: ts })).reverse().map(({ d, t }) => {
        if (!t.length) return null;
        const inner = t.map((x, i) => {
          const A = x.c.abs(); const coef = A.one ? "" : A.tex();
          return (i ? (x.c.sign() < 0 ? " - " : " + ") : (x.c.sign() < 0 ? "-" : "")) + coef + x.l;
        }).join("");
        const mon = d === 0 ? "" : d === 1 ? "x" : `x^{${d}}`;
        return t.length > 1 && d > 0 ? `(${inner})${mon}` : inner + mon;
      }).filter(Boolean).join(" + ").replace(/\+ -/g, "- ");
      const hom = RR.double ? `(k_1 + k_2x)${expT(R[0]) || ""}` : `k_1${expT(R[0]) || ""} + k_2${expT(R[1]) || ""}`.replace("k_1 +", "k_1 +");
      const yb0 = at0(ybar), yb1 = at0(ybar.deriv());
      // combinazione c1 k_1 + c2 k_2 scritta a mano
      const lin = (c1, c2) => [[c1, "k_1"], [c2, "k_2"]].filter(([c]) => c !== 0)
        .map(([c, k], i) => (c < 0 ? (i ? " - " : "-") : (i ? " + " : "")) + (Math.abs(c) === 1 ? "" : Math.abs(c)) + k).join("");
      const tail = v => v.zero ? "" : plus(v.tex());
      const eq1 = `${lin(1, RR.double ? 0 : 1)}${tail(yb0)} = ${y0.tex()}`;
      const eq2 = `${lin(R[0], RR.double ? 1 : R[1])}${tail(yb1)} = ${y1.tex()}`;
      const steps = [
        String.raw`**Omogenea associata**: $${eqLHS(a, b)} = 0$. Equazione caratteristica $${charTex(a, b)}$: ${RR.double ? `$\\alpha = ${R[0]}$ (doppia)` : `$\\alpha = ${R[0]}$, $\\alpha = ${R[1]}$`}. Integrale generale dell'omogenea: $${hom}$.`,
        String.raw`**Integrale particolare**: termine noto $e^{hx}p(x)$ con $h = ${h}$, $m = ${p.deg}$; $${h}$ ${s ? "è" : "non è"} radice${s ? (s === 2 ? " doppia" : " semplice") : ""} dell'equazione caratteristica, quindi $s = ${s}$: si cerca $\bar ${formTex(h, s, m).replace("y(x) =", "y =")}$.`,
        String.raw`Derivando, sostituendo${h ? ` e semplificando $${expT(h)}$` : ""} si ottiene $${symPoly} = ${p.tex()}$; per il principio di identità dei polinomi ${Array.from({ length: m + 1 }, (_, i) => `$${L[i]} = ${q.co(m - i).tex()}$`).join(", ")}. Quindi $\bar y = ${ybar.tex()}$.`,
        String.raw`**Integrale generale**: $y(x) = ${hom}${plus(ybar.tex())}$.`,
        String.raw`**Condizioni iniziali** (sull'integrale generale della completa): $y(0)$: $${eq1}$; $y'(0)$: $${eq2}$. Quindi $k_1 = ${K[0].tex()}$, $k_2 = ${K[1].tex()}$.`,
        String.raw`**Soluzione**: $y(x) = ${y.tex()}$.`
      ];
      const rhsStr = EP.of(h, p).str();
      return {
        text: String.raw`Risolvere il problema di Cauchy $$\begin{cases} ${eqLHS(a, b)} = ${rhs} \\ y(0) = ${y0.tex()} \\ y'(0) = ${y1.tex()} \end{cases}$$`,
        steps, answer: { fields: [{ label: "y(x)", kind: "expr", expr: y.str(), dom: [-1.5, 1.5] }] },
        verify: { kind: "ode", co: [1, a, b], rhs: rhsStr, y: y.str(), x0: 0, vals: [y0.val(), y1.val()] },
        chk: `simplify(diff(P('${y.str()}'), x, 2) + (${a})*diff(P('${y.str()}'), x) + (${b})*P('${y.str()}') - P('${rhsStr}')) == 0 and simplify(P('${y.str()}').subs(x, 0) - Rational('${y0.n}/${y0.d}')) == 0 and simplify(diff(P('${y.str()}'), x).subs(x, 0) - Rational('${y1.n}/${y1.d}')) == 0`
      };
    } },

  /* ------------------------------------------------------------------ */
  { id: "gen-forma", cap: 2, topic: "somiglianza", short: "forma di ȳ", mcq: true,
    title: String.raw`Di che tipo è un integrale particolare (metodo di somiglianza)`,
    gen(r) {
      const { P } = window.CAS;
      const RR = pickRoots(r), R = RR.roots;
      const { a, b } = coeffs(R);
      const h = r.next() < 0.6 ? r.pick(R) : r.intNot(-3, 3, R);
      const s = R.filter(x => x === h).length;
      const m = r.pick([0, 1, 1, 2]);
      const p = m === 0 ? P([r.pick([1, 2, 3, 5])]) : m === 1 ? P([r.int(-3, 3), r.pick([1, 2, 3])]) : P([r.int(-2, 3), 0, 1]);
      const rhs = h === 0 ? p.tex() : (h < 0 && r.next() < 0.5 ? String.raw`\dfrac{${p.tex()}}{e^{${-h === 1 ? "" : -h}x}}` : (m === 0 ? `${p.co(0).eq(1) ? "" : p.co(0).tex()}${expT(h)}` : `${expT(h)}(${p.tex()})`));
      const right = formTex(h, s, m);
      const cand = [
        formTex(h, s === 0 ? 1 : s - 1, m),                      // s sbagliato
        formTex(h, 0, m + s),                                     // grado "giusto" ma senza x^s
        formTex(h === 0 ? R[0] || 1 : -h, s, m),                  // esponente sbagliato
        formTex(h, s, m + 1),                                     // grado sbagliato
        formTex(h, s + 1, m)
      ].filter((v, i, A) => v !== right && A.indexOf(v) === i);
      const wrong = r.shuffle(cand).slice(0, 3);
      const all = r.shuffle([right, ...wrong]);
      const rootsT = RR.double ? `$${R[0]}$ (doppia)` : `$${R[0]}$ e $${R[1]}$`;
      return {
        type: "mcq", diff: s ? 2 : 1, src: "Variante generata (stile esempio di prova 2026/27, quesito 5)",
        q: String.raw`Una soluzione dell'equazione differenziale $${eqLHS(a, b)} = ${rhs}$ è del tipo`,
        options: all.map(o => `$${o}$`), correct: all.indexOf(right),
        expl: String.raw`Equazione caratteristica $${charTex(a, b)}$, radici ${rootsT}. Termine noto $e^{hx}p(x)$ con $h = ${h}$ e $m = ${m}$ (grado di $p$). ${s ? `$h = ${h}$ è radice${s === 2 ? " doppia" : ""}, quindi $s = ${s}$` : `$h = ${h}$ non è radice, quindi $s = 0$`}: si cerca $\bar y = ${h ? expT(h) : ""}x^s q(x)$ con $q$ polinomio completo di grado $${m}$, cioè $${right}$.
        <br>Le altre opzioni sbagliano $s$ (il fattore $x^s$), l'esponente $h$ oppure il grado del polinomio.`,
        verify: { kind: "forma", a, b, h, s, m, right, options: all },
        chk: (() => {
          const Ls = ["A", "B", "C", "D"].slice(0, m + 1);
          const q = Ls.map((l, j) => `Symbol('${l}')*x**${m - j}`).join(" + ");
          const Y = `exp(${h}*x)*x**${s}*(${q})`;
          return `len(solve(Poly(expand(simplify((diff(${Y},x,2) + (${a})*diff(${Y},x) + (${b})*${Y})/exp(${h}*x) - P('${p.str()}'))), x).coeffs(), [${Ls.map(l => `Symbol('${l}')`).join(", ")}], dict=True)) == 1`;
        })()
      };
    } },

  /* ------------------------------------------------------------------ */
  { id: "gen-lineari", cap: 2, topic: "generalita", short: "individua le lineari", mcq: true,
    title: String.raw`Individuare le equazioni lineari in un elenco`,
    gen(r) {
      const COEF = [String.raw`3`, String.raw`(\sin x)`, String.raw`2x^3`, String.raw`(\tan x)`, String.raw`e^x`, String.raw`(\log x)`, String.raw`\dfrac{x^2}{1+4x^2}`, String.raw`x`, String.raw`|x|`, String.raw`\sqrt{x}`];
      const RHS = [String.raw`\log x`, String.raw`x\log x`, String.raw`\dfrac{1}{\log x}`, String.raw`e^x\sin x`, "0", String.raw`|x|\sin x`, "2x", String.raw`\cos x`, "x^2"];
      const NL = [
        [String.raw`y^2`, String.raw`$y^2$ non è di primo grado`], [String.raw`\sqrt{y}`, String.raw`$\sqrt y$`], [String.raw`\cos y'`, String.raw`$\cos y'$`],
        [String.raw`yy'`, String.raw`il prodotto $yy'$`], [String.raw`e^y`, String.raw`$e^y$`], [String.raw`(y'')^2`, String.raw`$(y'')^2$`],
        [String.raw`\dfrac{x}{y}`, String.raw`$\frac xy$`], [String.raw`\sin(xy')`, String.raw`$\sin(xy')$`], [String.raw`y''y'`, String.raw`il prodotto $y''y'$`],
        [String.raw`\log y`, String.raw`$\log y$`], [String.raw`|y|`, String.raw`$|y|$`]
      ];
      const D = ["y", "y'", "y''", "y'''"];
      const sign = () => r.next() < 0.4 ? " - " : " + ";
      function linear() {
        const n = r.pick([1, 2, 2, 3]);
        let s = D[n];
        for (let k = n - 1; k >= 0; k--) if (r.next() < 0.65) s += sign() + r.pick(COEF) + D[k];
        if (s === D[n]) s += " + " + r.pick(COEF) + "y";
        return s + " = " + r.pick(RHS);
      }
      function nonlinear() {
        const n = r.pick([1, 2, 2, 3]);
        const [t, why] = r.pick(NL);
        let s = D[n];
        if (r.next() < 0.6) s += sign() + r.pick(COEF) + D[n - 1];
        s += sign() + t;
        return [s + " = " + r.pick(RHS), why];
      }
      const nLin = r.pick([2, 2, 3]);
      const items = [];
      const seen = new Set();
      for (let guard = 0; items.length < 5 && guard < 200; guard++) {
        const lin = items.filter(it => it.lin).length < nLin;
        const [s, why] = lin ? [linear()] : nonlinear();
        if (seen.has(s)) continue;
        seen.add(s); items.push({ s, lin, why });
      }
      const mixed = r.shuffle(items);
      const LET = "ABCDE";
      const correct = mixed.map((it, i) => it.lin ? i : -1).filter(i => i >= 0);
      return {
        type: "multi", diff: 1, src: "Variante generata (stile esempio di prova 2026/27, quesito 4)",
        q: "Fra le seguenti equazioni differenziali individuare quelle lineari.",
        options: mixed.map(it => `$${it.s}$`), correct,
        expl: String.raw`Un'equazione è lineare se $y$ e le sue derivate compaiono al **primo grado**, ciascuna moltiplicata per una funzione della sola $x$; coefficienti e termine noto possono essere funzioni qualsiasi di $x$.<br>Lineari: ${correct.map(i => LET[i]).join(", ")}. ` + mixed.map((it, i) => it.lin ? "" : `${LET[i]}) ${it.why}. `).join(""),
        verify: { kind: "multi", n: 5, correct, options: mixed.map(it => it.s) }
      };
    } },

  /* ------------------------------------------------------------------ */
  { id: "gen-omog", cap: 2, topic: "coeff_costanti", short: "integrale generale omogenea", mcq: true,
    title: String.raw`Integrale generale di un'omogenea del secondo ordine`,
    gen(r) {
      const kind = r.pick(["dist", "doppia", "compl"]);
      let a, b, right, wrong, descr, basis;
      const E = (k) => k === 0 ? "" : `e^{${k === 1 ? "" : k === -1 ? "-" : k}x}`;
      if (kind === "dist") {
        const x1 = r.int(-3, 3), x2 = r.intNot(-3, 3, [x1]);
        a = -(x1 + x2); b = x1 * x2;
        right = `k_1${E(x1) || ""} + k_2${E(x2) || ""}`;
        wrong = [`k_1${E(-x1) || ""} + k_2${E(-x2) || ""}`, `(k_1 + k_2x)${E(x1) || ""}`, `k_1${E(x1) || ""} + k_2x${E(x2) || ""}`];
        descr = `radici reali distinte $${x1}$ e $${x2}$`;
        basis = [`exp(${x1}*x)`, `exp(${x2}*x)`];
      } else if (kind === "doppia") {
        const x1 = r.intNot(-3, 3, [0]);
        a = -2 * x1; b = x1 * x1;
        right = `(k_1 + k_2x)${E(x1)}`;
        wrong = [`k_1${E(x1)} + k_2${E(-x1)}`, `k_1${E(x1)}`, `(k_1 + k_2x)${E(-x1)}`];
        descr = `radice doppia $${x1}$: servono $e^{\\alpha x}$ e $xe^{\\alpha x}$`;
        basis = [`exp(${x1}*x)`, `x*exp(${x1}*x)`];
      } else {
        const be = r.int(-2, 2), ga = r.int(1, 3);
        a = -2 * be; b = be * be + ga * ga;
        const g = ga === 1 ? "" : ga;
        right = `${E(be) ? E(be) : ""}(k_1\\cos ${g}x + k_2\\sin ${g}x)`;
        wrong = [`k_1${E(be + ga) || ""} + k_2${E(be - ga) || ""}`, `${E(be) || ""}(\\cos ${g}x + i\\sin ${g}x)`, `${E(-be) || ""}(k_1\\cos ${g}x + k_2\\sin ${g}x)`];
        if (be === 0) wrong[2] = `k_1\\cos ${g}x + k_2x\\sin ${g}x`;
        descr = `radici complesse $${be} \\pm ${g}i$: soluzioni $e^{\\beta x}\\cos\\gamma x$, $e^{\\beta x}\\sin\\gamma x$`;
        basis = [`exp(${be}*x)*cos(${ga}*x)`, `exp(${be}*x)*sin(${ga}*x)`];
      }
      wrong = wrong.filter((w, i, A) => w !== right && A.indexOf(w) === i);
      const all = r.shuffle([right, ...wrong.slice(0, 3)]);
      return {
        type: "mcq", diff: kind === "compl" ? 2 : 1, src: "Variante generata (stile Lezione 29/10)",
        q: String.raw`L'integrale generale dell'equazione $${eqLHS(a, b)} = 0$ è`,
        options: all.map(o => `$y(x) = ${o}$`), correct: all.indexOf(right),
        expl: String.raw`Equazione caratteristica $${charTex(a, b)}$: ${descr}. Quindi $y(x) = ${right}$.`,
        verify: { kind: "omog", a, b, basis, options: all },
        chk: basis.map(y => `simplify(diff(P('${y}'), x, 2) + (${a})*diff(P('${y}'), x) + (${b})*P('${y}')) == 0`).join(" and ")
      };
    } }
  );
})();

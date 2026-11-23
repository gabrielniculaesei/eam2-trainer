/* Generatori del capitolo 1. gen(rng) restituisce { text, steps, answer } (esercizio)
   oppure { type: "mcq", q, options, correct, expl } (domanda), più:
   - verify: dati per tools/verify_generators.mjs (controlli numerici su 300 seed)
   - chk: controllo sympy (P('...') legge le espressioni) per tools/check_bank.py
   Le varianti sono costruite al contrario: prima le costanti "belle", poi i dati. */
(window.GENERATORI = window.GENERATORI || []).push(

/* ------------------------------------------------------------------ */
{ id: "gen-abs-poly", cap: 1, topic: "valore_assoluto", short: "|x - a| + p(x)",
  title: String.raw`Primitiva con condizione di $s|x-a| + p(x)$ o $s|x^2-a^2| + p(x)$`,
  gen(r) {
    const { F, P, Poly, plus } = window.CAS;
    const quad = r.next() < 0.4;
    const s = r.pick([1, 1, 2, -1, 3]);
    const p = P([r.int(-3, 3), r.int(-3, 3), r.pick([0, 0, 1, 2, -1, 3])]);
    let cuts, br, labels, absTex, absStr;
    const sc = s === 1 ? "" : s === -1 ? "-" : String(s);
    if (!quad) {
      const a = r.int(-3, 3);
      cuts = [F(a)];
      const xa = P([-a, 1]);                      // x - a
      br = [xa.scale(-s).add(p), xa.scale(s).add(p)];
      labels = [`x < ${a}`, String.raw`x \ge ${a}`];
      absTex = `${sc}|${a === 0 ? "x" : P([-a, 1]).tex()}|`;
      absStr = `${s}*Abs(x - (${a}))`;
    } else {
      const A = r.int(1, 3);
      cuts = [F(-A), F(A)];
      const q = P([-A * A, 0, 1]);                // x^2 - A^2
      br = [q.scale(s).add(p), q.scale(-s).add(p), q.scale(s).add(p)];
      labels = [`x < ${-A}`, String.raw`${-A} \le x < ${A}`, String.raw`x \ge ${A}`];
      absTex = `${sc}|x^2 - ${A * A}|`;
      absStr = `${s}*Abs(x**2 - ${A * A})`;
    }
    const n = br.length;
    const G = br.map(b => b.integ());
    const x0 = F(r.pick([0, 0, 0, 1, -1, 2]));
    const j = cuts.filter(c => x0.val() >= c.val()).length;
    const kj = F(r.int(-5, 5) || 1);              // costante finale del ramo di x0
    const y0 = G[j].at(x0).add(kj);
    const d = [F(0)];
    cuts.forEach((c, i) => d.push(d[i].add(G[i].at(c)).sub(G[i + 1].at(c))));
    const k1 = kj.sub(d[j]);
    const Fs = G.map((g, i) => g.add(P([k1.add(d[i])])));
    const fTex = absTex + (p.zero ? "" : plus(p.tex()));
    const fStr = `${absStr} + ${p.str()}`;
    const steps = [];
    steps.push(String.raw`**Scriviamo $f$ a tratti**: $$f(x) = \begin{cases} ${br.map((b, i) => `${b.tex()} & ${labels[i]}`).join(String.raw` \\ `)} \end{cases}$$`);
    steps.push(String.raw`**Primitive dei singoli rami**, ognuna con la sua costante: ` + G.map((g, i) => String.raw`per $${labels[i]}$: $${g.tex()} + k_${i + 1}$`).join("; ") + ".");
    cuts.forEach((c, i) => {
      const jump = G[i].at(c).sub(G[i + 1].at(c));
      steps.push(String.raw`**Continuità in $x = ${c.tex()}$** ($F$ è derivabile, quindi continua): $${G[i].at(c).tex()} + k_${i + 1} = ${G[i + 1].at(c).tex()} + k_${i + 2}$, quindi $k_${i + 2} = k_${i + 1}${jump.zero ? "" : plus(jump.tex())}$.`);
    });
    steps.push(String.raw`**Condizione** $F(${x0.tex()}) = ${y0.tex()}$: $x_0 = ${x0.tex()}$ sta nel ramo $${labels[j]}$, quindi $${G[j].at(x0).tex()} + k_${j + 1} = ${y0.tex()}$, cioè $k_${j + 1} = ${kj.tex()}$` + (j ? String.raw` e $k_1 = ${k1.tex()}$.` : "."));
    steps.push(String.raw`**Risultato**: $$F(x) = \begin{cases} ${Fs.map((f, i) => `${f.tex()} & ${labels[i]}`).join(String.raw` \\ `)} \end{cases}$$`);
    const lo = i => i === 0 ? cuts[0].val() - 3 : cuts[i - 1].val() + 0.05;
    const hi = i => i === n - 1 ? cuts[n - 2].val() + 3 : cuts[i].val() - 0.05;
    const fields = Fs.map((f, i) => ({ label: `F(x) per $${labels[i]}$`, kind: "expr", expr: f.str(), dom: [lo(i), hi(i)] }));
    const chk = [
      ...Fs.map((f, i) => `simplify(diff(P('${f.str()}'), x) - P('${br[i].str()}')) == 0`),
      ...cuts.map((c, i) => `simplify(P('${Fs[i].str()}').subs(x, Rational('${c.n}/${c.d}')) - P('${Fs[i + 1].str()}').subs(x, Rational('${c.n}/${c.d}'))) == 0`),
      `simplify(P('${Fs[j].str()}').subs(x, Rational('${x0.n}/${x0.d}')) - Rational('${y0.n}/${y0.d}')) == 0`
    ].join(" and ");
    return {
      text: String.raw`Determinare la primitiva $F$ in $]-\infty,+\infty[$ della funzione $f(x) = ${fTex}$ tale che $F(${x0.tex()}) = ${y0.tex()}$.`,
      steps, answer: { fields },
      verify: { kind: "prim", f: fStr, branches: fields.map(f => ({ expr: f.expr, dom: f.dom })), cuts: cuts.map(c => c.val()), x0: x0.val(), y0: y0.val(), j },
      chk
    };
  } },

/* ------------------------------------------------------------------ */
{ id: "gen-abs-exp", cap: 1, topic: "valore_assoluto", short: "|x - a| e^{bx}",
  title: String.raw`Primitiva con condizione di $|x-a|e^{bx}$, $e^{|x-a|+bx}$ o $x^2e^{|x^3|+c}$`,
  gen(r) {
    const { F, P, EP, EC, plus } = window.CAS;
    const fam = r.pick(["absexp", "absexp", "expabs", "x2exp"]);
    let cut, br, G, fTex, fStr, brTex, metodo, cC = null;
    if (fam === "absexp") {
      const a = r.int(-2, 3), b = r.pick([1, 2, 2, 3, 4, -2]);
      cut = F(a);
      br = [EP.of(b, P([a, -1])), EP.of(b, P([-a, 1]))];
      G = br.map(e => e.integ());
      fTex = `|${a === 0 ? "x" : P([-a, 1]).tex()}|e^{${b === 1 ? "" : b === -1 ? "-" : b}x}`;
      fStr = `Abs(x - (${a}))*exp(${b}*x)`;
      metodo = "per parti, con FF il polinomio";
    } else if (fam === "expabs") {
      const a = r.pick([-3, -2, -1, 1, 2, 3]), b = r.pick([2, 3, -2, -3]);
      cut = F(a);
      br = [EP.of(b - 1, P([1]), a), EP.of(b + 1, P([1]), -a)];
      G = br.map(e => e.integ());
      fTex = `e^{|${P([-a, 1]).tex()}| ${b < 0 ? "-" : "+"} ${Math.abs(b)}x}`;
      fStr = `exp(Abs(x - (${a})) + ${b}*x)`;
      metodo = "si semplifica l'esponente su ciascun ramo";
    } else {
      const c = r.int(0, 3);
      cC = c;
      cut = F(0);
      const cube = x => F(x).mul(F(x)).mul(F(x));
      const ce = c ? `${c} - x^{3}` : "-x^{3}";
      G = [{ at: x => EC.of(F(-1, 3), F(c).sub(cube(x))), tex: () => String.raw`-\frac{1}{3}e^{${ce}}`, str: () => `(-1/3)*exp(${c} - x**3)` },
           { at: x => EC.of(F(1, 3), cube(x).add(F(c))), tex: () => String.raw`\frac{1}{3}e^{x^{3}${c ? " + " + c : ""}}`, str: () => `(1/3)*exp(x**3 + ${c})` }];
      brTex = [String.raw`x^2e^{${ce.replace("x^{3}", "x^3")}}`, String.raw`x^2e^{x^3${c ? " + " + c : ""}}`];
      fTex = String.raw`x^2e^{|x^3|${c ? " + " + c : ""}}`;
      fStr = `x**2*exp(Abs(x**3) + ${c})`;
      metodo = "prima formula di sostituzione con $t = \\pm x^3$";
    }
    const labels = [`x < ${cut.tex()}`, String.raw`x \ge ${cut.tex()}`];
    const tex = (e, i) => e ? e.tex() : brTex[i];
    const gtex = g => g.tex(), gstr = g => g.str();
    const x0 = F(r.pick(fam === "absexp" ? [0, 0, 1, -1] : [0, 1, -1, 2])).add(fam === "absexp" && r.next() < 0.3 ? F(1, 2) : 0);
    const j = x0.val() >= cut.val() ? 1 : 0;
    // come nelle tracce: la condizione è un solo termine "pulito" (F(1/2) = e, F(0) = 2e^2)
    const g0 = G[j].at(x0).sorted();
    const mu = g0.length === 1 ? g0[0].mu : F(0);
    const y0 = EC.of(F(r.pick([1, 2, 3, 4, 3, 5])).div(r.pick([1, 1, 1, 2, 3])), mu);
    const kj = y0.sub(G[j].at(x0));
    const jump = G[0].at(cut).sub(G[1].at(cut));          // k2 = k1 + jump
    const k1 = j ? kj.sub(jump) : kj, k2 = k1.add(jump);
    const ks = [k1, k2];
    const steps = [
      String.raw`**Scriviamo $f$ a tratti**: $$f(x) = \begin{cases} ${tex(br && br[0], 0)} & ${labels[0]} \\ ${tex(br && br[1], 1)} & ${labels[1]} \end{cases}$$`,
      String.raw`**Primitive dei singoli rami** (${metodo}): per $${labels[0]}$: $${gtex(G[0])} + k_1$; per $${labels[1]}$: $${gtex(G[1])} + k_2$.`,
      String.raw`**Continuità in $x = ${cut.tex()}$**: $${G[0].at(cut).tex()} + k_1 = ${G[1].at(cut).tex()} + k_2$, quindi $k_2 = k_1${jump.zero ? "" : plus(jump.tex())}$.`,
      String.raw`**Condizione** $F(${x0.tex()}) = ${y0.tex()}$: $x_0 = ${x0.tex()}$ sta nel ramo $${labels[j]}$, quindi $${G[j].at(x0).tex()} + k_${j + 1} = ${y0.tex()}$, cioè $k_${j + 1} = ${kj.tex()}$` + (j ? String.raw` e $k_1 = ${k1.tex()}$.` : "."),
      String.raw`**Risultato**: $$F(x) = \begin{cases} ${gtex(G[0])}${plus(k1.tex())} & ${labels[0]} \\ ${gtex(G[1])}${plus(k2.tex())} & ${labels[1]} \end{cases}$$`
    ];
    const exprs = G.map((g, i) => `${gstr(g)} + ${ks[i].str()}`);
    const fields = exprs.map((e, i) => ({ label: `F(x) per $${labels[i]}$`, kind: "expr", expr: e, dom: i ? [cut.val() + 0.05, cut.val() + 1.5] : [cut.val() - 2, cut.val() - 0.05] }));
    const brStr = br ? br.map(e => e.str()) : [`x**2*exp(${cC} - x**3)`, `x**2*exp(x**3 + ${cC})`];
    const X = v => `Rational('${v.n}/${v.d}')`;
    const chk = [
      ...exprs.map((e, i) => `simplify(diff(P('${e}'), x) - P('${brStr[i]}')) == 0`),
      `simplify(P('${exprs[0]}').subs(x, ${X(cut)}) - P('${exprs[1]}').subs(x, ${X(cut)})) == 0`,
      `simplify(P('${exprs[j]}').subs(x, ${X(x0)}) - P('${y0.str()}')) == 0`
    ].join(" and ");
    return {
      text: String.raw`Determinare la primitiva $F$ in $]-\infty,+\infty[$ della funzione $f(x) = ${fTex}$ tale che $F(${x0.tex()}) = ${y0.tex()}$.`,
      steps, answer: { fields },
      verify: { kind: "prim", f: fStr, branches: fields.map(f => ({ expr: f.expr, dom: f.dom })), cuts: [cut.val()], x0: x0.val(), y0: y0.num(), j },
      chk
    };
  } },

/* ------------------------------------------------------------------ */
{ id: "gen-def-abs", cap: 1, topic: "definiti", short: "∫ |x - c| p(x)",
  title: String.raw`Integrale definito di $|x - c|\,p(x)$`,
  gen(r) {
    const { F, P, plus } = window.CAS;
    const c = r.int(-2, 2);
    let a = c - r.int(1, 3), b = c + r.int(1, 3);
    if (r.next() < 0.3) [a, b] = [b, a];                       // estremi "al contrario"
    const p = P([r.pick([-2, -1, 1, 2, 3]), r.pick([1, 1, 2, -1])]);  // p(x) = p0 + p1 x
    const xc = P([-c, 1]);
    const left = xc.scale(-1).mul(p), right = xc.mul(p);       // per x < c e x >= c
    const GL = left.integ(), GR = right.integ();
    const lo = Math.min(a, b), hi = Math.max(a, b), sgn = a < b ? 1 : -1;
    const val = GL.at(c).sub(GL.at(lo)).add(GR.at(hi).sub(GR.at(c))).mul(sgn);
    const absT = `|${c === 0 ? "x" : xc.tex()}|`;
    const pT = `(${p.tex()})`;
    const steps = [
      String.raw`Il valore assoluto cambia formula in $x = ${c}$, che sta fra gli estremi: per la **proprietà additiva** $$\int_{${a}}^{${b}} ${absT}${pT}\,dx = \int_{${a}}^{${c}} \ldots\,dx + \int_{${c}}^{${b}} \ldots\,dx.$$`,
      String.raw`Per $x < ${c}$: $${absT}${pT} = ${left.tex()}$, con primitiva $${GL.tex()}$. Per $x > ${c}$: $${absT}${pT} = ${right.tex()}$, con primitiva $${GR.tex()}$.`,
      String.raw`**Formula fondamentale** su ciascun pezzo (con gli estremi nell'ordine dato${a > b ? ", anche se $a > b$" : ""}).`,
      String.raw`Risultato: $${val.tex()}$.`
    ];
    return {
      text: String.raw`Calcolare $$\int_{${a}}^{${b}} ${absT}${pT}\,dx.$$`,
      steps, answer: { fields: [{ label: "valore dell'integrale", kind: "number", value: val.str() }] },
      verify: { kind: "defint", f: `Abs(x - (${c}))*${p.str()}`, a, b, value: val.val() },
      chk: `integrate(Abs(x - (${c}))*P('${p.str()}'), (x, ${a}, ${b})) == Rational('${val.n}/${val.d}')`
    };
  } },

/* ------------------------------------------------------------------ */
{ id: "gen-parti", cap: 1, topic: "parti", short: "∫ x^n e^{bx}",
  title: String.raw`Integrale per parti $\int x^n e^{bx}\,dx$`,
  gen(r) {
    const { F, P, EP } = window.CAS;
    const n = r.pick([1, 2, 2, 3]), b = r.pick([1, 2, -1, 3, -2]);
    const c = r.pick([1, 1, 2, 3]);
    const f = EP.of(b, P(Array(n).fill(0).concat([c])));
    const G = f.integ();
    const bT = b === 1 ? "" : b === -1 ? "-" : String(b);
    return {
      text: String.raw`Calcolare $$\int ${c === 1 ? "" : c}x^{${n}}e^{${bT}x}\,dx.$$`,
      steps: [
        String.raw`Per parti con **FF** $= ${c === 1 ? "" : c}x^{${n}}$ (il grado scende a ogni passo) e **FD** $= e^{${bT}x}$, di cui una primitiva è $\frac{e^{${bT}x}}{${b}}$.`,
        String.raw`Si ripete ${n} volt${n === 1 ? "a" : "e"}, finché il polinomio diventa una costante.`,
        String.raw`Risultato: $${G.tex()} + k$.`
      ],
      answer: { fields: [{ label: "una primitiva", kind: "prim", expr: G.str(), dom: [-1.5, 1.5] }] },
      verify: { kind: "primsingle", f: f.str(), expr: G.str(), dom: [-1.5, 1.5] },
      chk: `simplify(diff(P('${G.str()}'), x) - P('${f.str()}')) == 0`
    };
  } },

/* ------------------------------------------------------------------ */
{ id: "gen-deriv-int", cap: 1, topic: "funzione_integrale", short: "d/dx ∫", mcq: true,
  title: String.raw`Derivata di una funzione integrale con estremi variabili`,
  gen(r) {
    const FS = [
      { tex: s => String.raw`\frac{\sin ${s}}{${s}}`, str: s => `sin(${s})/(${s})`, nm: String.raw`\frac{\sin t}{t}`, pos: true },
      { tex: s => `e^{${sq(s)}}`, str: s => `exp((${s})**2)`, nm: "e^{t^2}" },
      { tex: s => String.raw`\log(1 + ${sq(s)})`, str: s => `log(1 + (${s})**2)`, nm: String.raw`\log(1+t^2)` },
      { tex: s => String.raw`\sqrt{1 + ${q4(s)}}`, str: s => `sqrt(1 + (${s})**4)`, nm: String.raw`\sqrt{1+t^4}` }
    ];
    function sq(s) { return s === "x" ? "x^2" : /^x\^\{?\d/.test(s) ? s.replace(/x\^\{?(\d+)\}?/, (m, k) => `x^{${2 * k}}`) : `(${s})^2`; }
    function q4(s) { return s === "x" ? "x^4" : /^x\^\{?\d/.test(s) ? s.replace(/x\^\{?(\d+)\}?/, (m, k) => `x^{${4 * k}}`) : `(${s})^4`; }
    const ENDS = [
      { tex: "x^2", str: "x**2", d: "2x", ds: "2*x" }, { tex: "x^3", str: "x**3", d: "3x^2", ds: "3*x**2" },
      { tex: String.raw`\cos x`, str: "cos(x)", d: String.raw`(-\sin x)`, ds: "(-sin(x))" },
      { tex: String.raw`\log x`, str: "log(x)", d: String.raw`\frac1x`, ds: "(1/x)", pos: true },
      { tex: "e^x", str: "exp(x)", d: "e^x", ds: "exp(x)" }
    ];
    const f = r.pick(FS);
    const kind = r.pick(["cb", "cb", "bc", "bb"]);
    const c = { tex: String(r.pick([0, 1, 2])), str: null };
    let lo, up;
    // e^{t^2} con estremi che crescono in fretta darebbe numeri enormi e innaturali
    const ends = f.nm === "e^{t^2}" ? ENDS.filter(e => e.str !== "exp(x)" && e.str !== "x**3") : ENDS;
    const two = r.shuffle(ends).slice(0, 2);
    if (kind === "cb") { lo = c; up = two[0]; }
    else if (kind === "bc") { lo = two[0]; up = c; }
    else { lo = two[0]; up = two[1]; }
    if (f.pos && (lo.tex === "0" || up.tex === "0")) { if (lo.tex === "0") lo = { tex: "1", str: null }; else up = { tex: "1", str: null }; }
    const T = e => f.tex(e.tex);
    const term = (e, withD) => withD && e.d !== "1" ? `${T(e)}\\cdot ${e.d}` : T(e);
    const S = e => e.str ? `${f.str(e.str)}*${e.ds}` : "0";
    let correct, wrong, correctStr;
    if (kind === "cb") {
      correct = term(up, true); correctStr = S(up);
      wrong = [T(up), `-${term(up, true)}`, `${term(up, true)} - ${f.tex(c.tex)}`];
    } else if (kind === "bc") {
      correct = `-${term(lo, true)}`; correctStr = `-(${S(lo)})`;
      wrong = [term(lo, true), `-${T(lo)}`, `${f.tex(c.tex)} - ${term(lo, true)}`];
    } else {
      correct = `${term(up, true)} - ${term(lo, true)}`; correctStr = `${S(up)} - (${S(lo)})`;
      wrong = [`${T(up)} - ${T(lo)}`, `${term(lo, true)} - ${term(up, true)}`, `${term(up, true)} + ${term(lo, true)}`];
    }
    const all = r.shuffle([correct, ...wrong]);
    const opts = all.map(o => `$${o}$`);
    const dom = (lo.pos || up.pos || f.pos) ? "x > 1" : "x \\in \\mathbb{R}";
    const Fx = String.raw`\displaystyle\int_{${lo.tex}}^{${up.tex}} ${f.nm.replace(/t/g, "t")}\,dt`;
    return {
      type: "mcq", diff: kind === "bb" ? 2 : 1, src: "Variante generata (stile Lezione 08/10)",
      q: String.raw`Sia $F(x) = ${Fx}$ per $${dom}$. Allora $F'(x) =$`,
      options: opts, correct: all.indexOf(correct),
      expl: String.raw`Regola: $\frac{d}{dx}\int_{a(x)}^{b(x)} f(t)\,dt = f(b(x))\,b'(x) - f(a(x))\,a'(x)$ (si spezza in un punto fisso e si deriva ogni pezzo come funzione composta). Un estremo costante non contribuisce; l'estremo **inferiore** entra col segno meno. Gli errori tipici sono dimenticare la derivata della funzione interna, sbagliare il segno o sommare invece di sottrarre.`,
      verify: { kind: "derivint", f: f.str("t"), lo: lo.str || lo.tex, up: up.str || up.tex, correct: correctStr, x: (lo.pos || up.pos || f.pos) ? 1.7 : 0.6 },
      chk: `simplify(diff(Integral(${f.str("t")}, (t, ${lo.str || lo.tex}, ${up.str || up.tex})), x) - P('${correctStr}')) == 0`
    };
  } }
);

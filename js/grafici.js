/* Vista "grafici": simulazioni interattive collegate ai nodi di teoria.
   Ogni grafico: guida "cosa stai guardando", controlli da tastiera (slider,
   punti trascinabili con le frecce), descrizione testuale aggiornata (aria-live).
   Route: #/grafici, #/grafici/<id> */
(function () {
  "use strict";
  const { $, $$, esc, md, typeset } = window.UI;
  const PL = () => window.PLOT;
  const fmt = (v, d) => window.PLOT.fmt(v, d);

  function frame(el, g) {
    el.innerHTML = `
      <div class="idea"><span class="idea-h">Cosa stai guardando</span>${md(g.guida)}</div>
      <div class="gx-controls" id="gxCtl"></div>
      <figure class="gx-fig" id="gxFig"></figure>
      <div class="gx-read card" id="gxRead" aria-live="polite"></div>`;
    return { ctl: $("#gxCtl", el), fig: $("#gxFig", el), read: $("#gxRead", el) };
  }
  function chooser(host, items, onPick, label) {
    const w = document.createElement("div");
    w.className = "chips gx-choose";
    w.setAttribute("role", "group"); w.setAttribute("aria-label", label || "funzione");
    w.innerHTML = items.map((it, i) => `<button type="button" class="chip" aria-pressed="${i === 0}" data-i="${i}">${it.label}</button>`).join("");
    host.appendChild(w);
    w.addEventListener("click", e => { const b = e.target.closest(".chip"); if (!b) return; $$(".chip", w).forEach(c => c.setAttribute("aria-pressed", c === b)); onPick(+b.dataset.i); });
    typeset(w);
    return w;
  }
  const btn = (host, label, fn, cls) => { const b = document.createElement("button"); b.type = "button"; b.className = "btn small " + (cls || ""); b.innerHTML = label; b.addEventListener("click", fn); host.appendChild(b); return b; };
  const row = host => { const d = document.createElement("div"); d.className = "row gx-row"; host.appendChild(d); return d; };
  const sub = (fig, cls) => { const d = document.createElement("div"); d.className = "gx-plot " + (cls || ""); fig.appendChild(d); return d; };

  const G = {};

  /* ======================= somme di Riemann ======================= */
  G["g-riemann"] = {
    title: "Somme di Riemann", topic: "riemann", nodo: "t-contigue",
    guida: String.raw`Una decomposizione $D$ divide $[a,b]$ in intervalli. In ognuno, il rettangolo **pieno** è alto quanto il **minimo** di $f$ (somma inferiore $s(f,D)$), quello **tratteggiato** quanto il **massimo** (somma superiore $S(f,D)$). Aumentando il numero di intervalli la differenza $S - s$ va a zero: è la contiguità, e l'unico numero che sta fra tutte le somme è l'integrale.`,
    mount(el) {
      const FN = [
        { label: String.raw`$\frac{x^2}{2} + \frac12$ in $[0,2]$`, f: x => x * x / 2 + 0.5, a: 0, b: 2, v: [-0.2, 2.2, -0.3, 3] },
        { label: String.raw`$1 + \sin x$ in $[0,\pi]$`, f: x => 1 + Math.sin(x), a: 0, b: Math.PI, v: [-0.2, 3.4, -0.3, 2.3] },
        { label: String.raw`$x^3 - 2x + 1$ in $[-1,2]$`, f: x => x ** 3 - 2 * x + 1, a: -1, b: 2, v: [-1.3, 2.3, -1, 5.5] }
      ];
      const u = frame(el, this);
      let k = 0, n = 6, rnd = false, show = "both";
      chooser(u.ctl, FN, i => { k = i; draw(); });
      const r1 = row(u.ctl);
      PL().slider(r1, { label: "intervalli", min: 1, max: 60, step: 1, value: n, format: v => String(v), onInput: v => { n = v; draw(); } });
      const r2 = row(u.ctl);
      chooser(r2, [{ label: "inferiori e superiori" }, { label: "solo inferiori" }, { label: "solo superiori" }], i => { show = ["both", "low", "up"][i]; draw(); }, "rettangoli");
      const ck = document.createElement("label"); ck.className = "check"; ck.innerHTML = `<input type="checkbox"> decomposizione non uniforme`; r2.appendChild(ck);
      ck.querySelector("input").addEventListener("change", e => { rnd = e.target.checked; draw(); });
      const p = PL().create(sub(u.fig), { xmin: -1, xmax: 1, ymin: -1, ymax: 1, aria: "somme di Riemann" });
      function draw() {
        const F = FN[k];
        p.setView({ xmin: F.v[0], xmax: F.v[1], ymin: F.v[2], ymax: F.v[3] });
        p.clear(); p.axes();
        let pts = [F.a];
        if (rnd && n > 1) { const r = window.RNG.create(1000 + n); const cuts = Array.from({ length: n - 1 }, () => F.a + (F.b - F.a) * (0.03 + 0.94 * r.next())).sort((x, y) => x - y); pts = pts.concat(cuts); }
        else for (let i = 1; i < n; i++) pts.push(F.a + (F.b - F.a) * i / n);
        pts.push(F.b);
        let s = 0, S = 0, amp = 0;
        for (let i = 1; i < pts.length; i++) {
          const { m, M } = PL().minmax(F.f, pts[i - 1], pts[i], 40);
          const w = pts[i] - pts[i - 1]; s += m * w; S += M * w; amp = Math.max(amp, w);
          if (show !== "low") p.rect(pts[i - 1], pts[i], 0, M, "pl-up");
          if (show !== "up") p.rect(pts[i - 1], pts[i], 0, m, "pl-low");
        }
        p.fn(F.f, { from: F.a - 0.15, to: F.b + 0.15 });
        const I = PL().simpson(F.f, F.a, F.b, 600);
        u.read.innerHTML = md(`<div class="gx-stats"><span>$s(f,D) = ${fmt(s, 4)}$</span><span>$\\int_a^b f = ${fmt(I, 4)}$</span><span>$S(f,D) = ${fmt(S, 4)}$</span><span>$S - s = ${fmt(S - s, 4)}$</span><span>ampiezza $|D| = ${fmt(amp, 3)}$</span></div>
          <p class="small dim">Sempre $s(f,D) \\le \\int_a^b f(x)\\,dx \\le S(f,D)$. Con ${n} intervall${n === 1 ? "o" : "i"} lo scarto è ${fmt(S - s, 3)}.</p>`);
        typeset(u.read);
      }
      draw();
    }
  };

  /* ======================= funzione integrale ======================= */
  G["g-funz-int"] = {
    title: "Funzione integrale", topic: "funzione_integrale", nodo: "t-derivazione",
    guida: String.raw`In alto, l'area con segno fra $x_0 = 0$ e $x$ (**blu** dove $f > 0$, **rossa** dove $f < 0$). In basso, il grafico di $F(x) = \int_0^x f(t)\,dt$: il suo valore è quell'area. La **tangente** a $F$ ha pendenza $f(x)$: il rapporto incrementale $\frac{F(x+h) - F(x)}{h}$ (la striscia tratteggiata) tende a $f(x)$ quando $h \to 0$. È il teorema di derivazione della funzione integrale.`,
    mount(el) {
      const FN = [
        { label: String.raw`$\sin x$`, f: Math.sin, xr: [-1, 7], yr: [-1.5, 1.5], Fr: [-0.5, 2.5] },
        { label: String.raw`$x^2 - 1$`, f: x => x * x - 1, xr: [-2.5, 2.5], yr: [-1.5, 5.5], Fr: [-3, 3] },
        { label: String.raw`$e^{-x^2}$ (senza primitive elementari)`, f: x => Math.exp(-x * x), xr: [-3, 3], yr: [-0.3, 1.3], Fr: [-1.1, 1.1] }
      ];
      const u = frame(el, this);
      let k = 0, X = 1.5, h = 0.5;
      chooser(u.ctl, FN, i => { k = i; X = Math.min(X, FN[k].xr[1] - 0.6); xs.input.min = FN[k].xr[0]; xs.input.max = FN[k].xr[1] - 0.2; xs.set(X); draw(); });
      const r = row(u.ctl);
      const xs = PL().slider(r, { label: "$x$", min: FN[0].xr[0], max: FN[0].xr[1] - 0.2, step: 0.05, value: X, onInput: v => { X = v; draw(); } });
      PL().slider(r, { label: "$h$", min: 0.02, max: 1.2, step: 0.02, value: h, onInput: v => { h = v; draw(); } });
      typeset(u.ctl);
      const top = PL().create(sub(u.fig), { xmin: -1, xmax: 1, ymin: -1, ymax: 1, height: 230, aria: "grafico di f con area accumulata" });
      const bot = PL().create(sub(u.fig), { xmin: -1, xmax: 1, ymin: -1, ymax: 1, height: 230, aria: "grafico della funzione integrale F" });
      function draw() {
        const F = FN[k], f = F.f;
        const Fx = x => PL().simpson(f, 0, x, 200);
        top.setView({ xmin: F.xr[0], xmax: F.xr[1], ymin: F.yr[0], ymax: F.yr[1] });
        bot.setView({ xmin: F.xr[0], xmax: F.xr[1], ymin: F.Fr[0], ymax: F.Fr[1] });
        top.clear(); top.axes({ ylabel: "f" }); bot.clear(); bot.axes({ ylabel: "F" });
        top.area(f, 0, X);
        const ratio = (Fx(X + h) - Fx(X)) / h;
        top.rect(X, X + h, 0, ratio, "pl-ratio");
        top.fn(f); top.vline(0, "pl-mark faint"); top.dot(X, f(X));
        bot.fn(Fx, { cls: "faint", samples: 160 });
        bot.fn(Fx, { from: Math.min(0, X), to: Math.max(0, X), samples: 120 });
        const y = Fx(X), m = f(X);
        bot.line(X - 1, y - m, X + 1, y + m, "pl-tangent");
        bot.dot(X, y);
        u.read.innerHTML = md(`<div class="gx-stats"><span>$F(${fmt(X, 2)}) = ${fmt(y)}$</span><span>$f(${fmt(X, 2)}) = ${fmt(m)}$</span><span>$\\frac{F(x+h) - F(x)}{h} = ${fmt(ratio)}$</span></div>
          <p class="small dim">Riduci $h$: il rapporto incrementale si avvicina a $f(x)$, la pendenza della tangente in basso.</p>`);
        typeset(u.read);
      }
      draw();
    }
  };

  /* ======================= primitive con valore assoluto ======================= */
  G["g-abs"] = {
    title: "Primitive con valore assoluto", topic: "valore_assoluto", nodo: "m-valore-assoluto",
    guida: String.raw`In alto $f$, scritta a tratti. In basso una primitiva per ogni ramo, **ognuna con la sua costante** $k_i$ (muovi gli slider: ogni ramo trasla in verticale da solo). Una primitiva su tutto $\mathbb{R}$ è derivabile, quindi **continua**: premi "incolla" e le costanti si legano, i rami si raccordano. Poi la condizione $F(x_0) = y_0$ (il punto arancione, trascinabile anche con le frecce) fissa l'ultima costante, **sul ramo che contiene $x_0$**.`,
    mount(el) {
      const EX = [
        { label: String.raw`$|x+2| + 3x$, $F(0) = 5$`, cuts: [-2], f: [x => 2 * x - 2, x => 4 * x + 2], G: [x => x * x - 2 * x, x => 2 * x * x + 2 * x],
          tex: [String.raw`x^2 - 2x`, String.raw`2x^2 + 2x`], x0: 0, y0: 5, xr: [-4.5, 1.5], fr: [-12, 9], Fr: [-6, 28] },
        { label: String.raw`$|x^2-1| + 3x^2 + x$, $F(0) = 4$`, cuts: [-1, 1], f: [x => 4 * x * x + x - 1, x => 2 * x * x + x + 1, x => 4 * x * x + x - 1],
          G: [x => 4 / 3 * x ** 3 + x * x / 2 - x, x => 2 / 3 * x ** 3 + x * x / 2 + x, x => 4 / 3 * x ** 3 + x * x / 2 - x],
          tex: [String.raw`\tfrac43x^3 + \tfrac12x^2 - x`, String.raw`\tfrac23x^3 + \tfrac12x^2 + x`, String.raw`\tfrac43x^3 + \tfrac12x^2 - x`], x0: 0, y0: 4, xr: [-2, 2], fr: [-2, 18], Fr: [-8, 18] },
        { label: String.raw`$|x-1|e^{2x}$, $F(\frac12) = e$`, cuts: [1], f: [x => (1 - x) * Math.exp(2 * x), x => (x - 1) * Math.exp(2 * x)],
          G: [x => (3 - 2 * x) * Math.exp(2 * x) / 4, x => (2 * x - 3) * Math.exp(2 * x) / 4], tex: [String.raw`\tfrac{(3-2x)e^{2x}}{4}`, String.raw`\tfrac{(2x-3)e^{2x}}{4}`],
          x0: 0.5, y0: Math.E, xr: [-2, 1.7], fr: [-0.5, 7], Fr: [-1.5, 9] }
      ];
      const u = frame(el, this);
      let k = 0, ks = [], E, sliders = [], hnd = null, anim = null;
      chooser(u.ctl, EX, i => { k = i; reset(); });
      const ksBox = document.createElement("div"); ksBox.className = "row gx-row"; u.ctl.appendChild(ksBox);
      const acts = row(u.ctl);
      btn(acts, "1. incolla i rami (continuità)", () => glue(), "");
      btn(acts, "2. imponi $F(x_0) = y_0$", () => condition(), "");
      btn(acts, "ricomincia", () => reset(), "ghost");
      typeset(acts);
      const top = PL().create(sub(u.fig), { xmin: -1, xmax: 1, ymin: -1, ymax: 1, height: 200, aria: "grafico di f a tratti" });
      const bot = PL().create(sub(u.fig), { xmin: -1, xmax: 1, ymin: -1, ymax: 1, height: 300, aria: "primitive dei rami con le loro costanti" });
      const branch = i => [i === 0 ? -Infinity : E.cuts[i - 1], i === E.cuts.length ? Infinity : E.cuts[i]];
      const ramo = x => E.cuts.filter(c => x >= c).length;
      function reset() {
        E = EX[k]; ks = E.f.map(() => 0); E.yy = E.y0;
        ksBox.innerHTML = "";
        sliders = ks.map((v, i) => PL().slider(ksBox, { label: `$k_${i + 1}$`, min: -15, max: 15, step: 0.05, value: 0, onInput: val => { ks[i] = val; draw(); } }));
        typeset(ksBox);
        top.setView({ xmin: E.xr[0], xmax: E.xr[1], ymin: E.fr[0], ymax: E.fr[1] });
        bot.setView({ xmin: E.xr[0], xmax: E.xr[1], ymin: E.Fr[0], ymax: E.Fr[1] });
        bot.clear("points"); hnd = null; draw();
      }
      const jumps = () => E.cuts.map((c, i) => (E.G[i + 1](c) + ks[i + 1]) - (E.G[i](c) + ks[i]));
      function animateTo(target) {
        if (anim) cancelAnimationFrame(anim);
        const from = ks.slice(), t0 = performance.now(), dur = PL().reduced() ? 0 : 700;
        const step = now => {
          const t = dur ? Math.min(1, (now - t0) / dur) : 1, e = t * (2 - t);
          ks = from.map((v, i) => v + (target[i] - v) * e);
          sliders.forEach((s, i) => s.set(+ks[i].toFixed(2)));
          draw();
          if (t < 1) anim = requestAnimationFrame(step);
        };
        anim = requestAnimationFrame(step);
      }
      function glue() {
        const t = ks.slice();
        E.cuts.forEach((c, i) => { t[i + 1] = t[i] + E.G[i](c) - E.G[i + 1](c); });
        animateTo(t);
      }
      function condition() {
        const t = ks.slice();
        E.cuts.forEach((c, i) => { t[i + 1] = t[i] + E.G[i](c) - E.G[i + 1](c); });
        const j = ramo(E.x0), d = E.yy - (E.G[j](E.x0) + t[j]);
        animateTo(t.map(v => v + d));
      }
      function draw() {
        top.clear(); top.axes({ ylabel: "f" }); bot.clear("areas", "rects", "curves", "marks"); bot.axes({ ylabel: "F" });
        E.f.forEach((fi, i) => { const [a, b] = branch(i); top.fn(fi, { from: Math.max(a, E.xr[0]), to: Math.min(b, E.xr[1]), cls: i % 2 ? "c2" : "" }); });
        E.cuts.forEach(c => { top.vline(c); bot.vline(c); });
        E.G.forEach((g, i) => { const [a, b] = branch(i); bot.fn(x => g(x) + ks[i], { from: Math.max(a, E.xr[0]), to: Math.min(b, E.xr[1]), cls: i % 2 ? "c2" : "" }); });
        E.cuts.forEach((c, i) => { bot.dot(c, E.G[i](c) + ks[i], "pl-dot hollow", 4, "marks"); bot.dot(c, E.G[i + 1](c) + ks[i + 1], "pl-dot hollow", 4, "marks"); });
        bot.vline(E.x0, "pl-mark faint");
        if (!hnd) hnd = bot.handle(E.x0, E.yy, { lockX: true, label: "punto (x0, y0): frecce su e giù", step: 0.1, onDrag: (x, y) => { E.yy = y; draw(); } });
        const J = jumps(), j = ramo(E.x0), Fx0 = E.G[j](E.x0) + ks[j];
        const cont = J.every(v => Math.abs(v) < 0.02), cond = Math.abs(Fx0 - E.yy) < 0.02;
        u.read.innerHTML = md(`<div class="gx-stats">${E.cuts.map((c, i) => `<span class="${Math.abs(J[i]) < 0.02 ? "ok" : "ko"}">salto in $x = ${fmt(c)}$: $${fmt(J[i], 2)}$</span>`).join("")}
          <span class="${cond ? "ok" : "ko"}">$F(${fmt(E.x0)}) = ${fmt(Fx0, 2)}$, richiesto $y_0 = ${fmt(E.yy, 2)}$</span></div>
          <p class="small">${cont ? (cond ? "**Fatto**: i rami si raccordano e la condizione è soddisfatta. Questa è la primitiva cercata." : "I rami si raccordano: ora la condizione fissa l'ultima costante (passo 2).") : "I rami non si raccordano: con questi $k_i$ la funzione ha un salto, quindi non è continua e non può essere una primitiva su tutto $\\mathbb{R}$ (passo 1)."}</p>
          <p class="small dim">Rami: ${E.tex.map((t, i) => `$${t} + k_${i + 1}$`).join(", ")}.</p>`);
        typeset(u.read);
      }
      reset();
    }
  };

  /* ======================= teorema della media ======================= */
  G["g-media"] = {
    title: "Teorema della media", topic: "proprieta", nodo: "t-media",
    guida: String.raw`L'area sotto il grafico in $[a,b]$ è uguale a quella del **rettangolo tratteggiato** di base $b - a$ e altezza $\mu = \frac{1}{b-a}\int_a^b f$ (il valore medio). Le linee orizzontali sono il minimo $m$ e il massimo $M$: $\mu$ sta sempre fra le due. I punti verdi sono i $c$ con $f(c) = \mu$: esistono per i valori intermedi, e possono essere più di uno.`,
    mount(el) {
      const FN = [
        { label: "$x^2$", f: x => x * x, xr: [-0.5, 3.5], yr: [-1, 10], lim: [0, 3] },
        { label: String.raw`$1 + \sin x$`, f: x => 1 + Math.sin(x), xr: [-0.5, 7], yr: [-0.5, 2.5], lim: [0, 6.5] },
        { label: "$x^3 - 3x + 3$", f: x => x ** 3 - 3 * x + 3, xr: [-2.3, 2.3], yr: [-1, 7], lim: [-2, 2] }
      ];
      const u = frame(el, this);
      let k = 0, a = 0, b = 2;
      chooser(u.ctl, FN, i => { k = i; a = FN[k].lim[0]; b = (FN[k].lim[0] + FN[k].lim[1]) / 2 + 0.7; sa.input.min = sb.input.min = FN[k].lim[0]; sa.input.max = sb.input.max = FN[k].lim[1]; sa.set(a); sb.set(b); draw(); });
      const r = row(u.ctl);
      const sa = PL().slider(r, { label: "$a$", min: 0, max: 3, step: 0.05, value: a, onInput: v => { a = Math.min(v, b - 0.1); draw(); } });
      const sb = PL().slider(r, { label: "$b$", min: 0, max: 3, step: 0.05, value: b, onInput: v => { b = Math.max(v, a + 0.1); draw(); } });
      typeset(u.ctl);
      const p = PL().create(sub(u.fig), { xmin: -1, xmax: 1, ymin: -1, ymax: 1, aria: "teorema della media" });
      function draw() {
        const F = FN[k], f = F.f;
        p.setView({ xmin: F.xr[0], xmax: F.xr[1], ymin: F.yr[0], ymax: F.yr[1] });
        p.clear(); p.axes();
        const I = PL().simpson(f, a, b, 400), mu = I / (b - a), { m, M } = PL().minmax(f, a, b, 400);
        p.area(f, a, b);
        p.rect(a, b, 0, mu, "pl-meanrect");
        p.fn(f);
        p.hline(m, "pl-mark faint"); p.hline(M, "pl-mark faint");
        p.text(F.xr[1], m, " m", "pl-label", "end"); p.text(F.xr[1], M, " M", "pl-label", "end");
        const cs = [];
        const N = 600;
        for (let i = 0; i < N; i++) {
          const x1 = a + (b - a) * i / N, x2 = a + (b - a) * (i + 1) / N;
          const g1 = f(x1) - mu, g2 = f(x2) - mu;
          if (g1 === 0 || g1 * g2 < 0) cs.push(g1 === 0 ? x1 : x1 - g1 * (x2 - x1) / (g2 - g1));
        }
        cs.forEach(c => { p.dot(c, mu, "pl-dot c"); p.line(c, 0, c, mu, "pl-mark faint", true); });
        u.read.innerHTML = md(`<div class="gx-stats"><span>$\\int_a^b f = ${fmt(I)}$</span><span>$\\mu = ${fmt(mu)}$</span><span>$m = ${fmt(m)}$, $M = ${fmt(M)}$</span><span>${cs.length} punt${cs.length === 1 ? "o" : "i"} $c$: ${cs.map(c => "$" + fmt(c, 2) + "$").join(", ")}</span></div>
          <p class="small dim">Controllo della prima versione: $m(b-a) = ${fmt(m * (b - a))} \\le ${fmt(I)} \\le ${fmt(M * (b - a))} = M(b-a)$.</p>`);
        typeset(u.read);
      }
      draw();
    }
  };

  /* ======================= omogenee del secondo ordine ======================= */
  G["g-caratt"] = {
    title: "Omogenee del secondo ordine", topic: "coeff_costanti", nodo: "t-tre-casi",
    guida: String.raw`Muovi $a$ e $b$ in $y'' + ay' + by = 0$. A sinistra le radici dell'equazione caratteristica nel **piano complesso**; a destra le due soluzioni di base. Il segno di $\Delta = a^2 - 4b$ decide il caso: due esponenziali ($\Delta > 0$), $e^{\alpha x}$ e $xe^{\alpha x}$ ($\Delta = 0$), oscillazioni $e^{\beta x}\cos\gamma x$, $e^{\beta x}\sin\gamma x$ ($\Delta < 0$). Il Wronskiano non si annulla mai.`,
    mount(el) {
      const u = frame(el, this);
      let a = -1, b = -2;
      const r = row(u.ctl);
      PL().slider(r, { label: "$a$", min: -4, max: 4, step: 0.5, value: a, onInput: v => { a = v; draw(); } });
      PL().slider(r, { label: "$b$", min: -4, max: 6, step: 0.25, value: b, onInput: v => { b = v; draw(); } });
      typeset(u.ctl);
      u.fig.classList.add("gx-two");
      const cp = PL().create(sub(u.fig, "small"), { xmin: -4.2, xmax: 4.2, ymin: -3.2, ymax: 3.2, width: 320, height: 260, aria: "radici nel piano complesso" });
      const sp = PL().create(sub(u.fig), { xmin: -2, xmax: 3, ymin: -4, ymax: 4, width: 420, height: 260, aria: "soluzioni di base" });
      const c1 = v => (Math.abs(v) === 1 ? "" : fmt(Math.abs(v)));           // coefficiente senza "1"
      const ex = v => (Math.abs(v) < 1e-12 ? "" : `e^{${v === 1 ? "" : v === -1 ? "-" : fmt(v, 3)}x}`);
      function draw() {
        const D = a * a - 4 * b;
        cp.clear(); cp.axes({ xlabel: "Re", ylabel: "Im" }); sp.clear(); sp.axes();
        let y1, y2, txt, W;
        if (D > 1e-12) {
          const r1 = (-a - Math.sqrt(D)) / 2, r2 = (-a + Math.sqrt(D)) / 2;
          cp.dot(r1, 0, "pl-dot c", 6); cp.dot(r2, 0, "pl-dot c", 6);
          y1 = x => Math.exp(r1 * x); y2 = x => Math.exp(r2 * x);
          txt = String.raw`$\Delta = ${fmt(D, 2)} > 0$: radici reali distinte $\alpha_1 = ${fmt(r1, 3)}$, $\alpha_2 = ${fmt(r2, 3)}$; soluzioni $e^{\alpha_1x}$, $e^{\alpha_2x}$.`;
          W = String.raw`W(x) = (\alpha_2 - \alpha_1)e^{(\alpha_1+\alpha_2)x} = ${fmt(r2 - r1, 3)}${ex(r1 + r2)}`;
        } else if (Math.abs(D) <= 1e-12) {
          const r0 = -a / 2;
          cp.dot(r0, 0, "pl-dot c", 8);
          y1 = x => Math.exp(r0 * x); y2 = x => x * Math.exp(r0 * x);
          txt = String.raw`$\Delta = 0$: radice doppia $\alpha = ${fmt(r0, 3)}$; soluzioni $e^{\alpha x}$, $xe^{\alpha x}$.`;
          W = String.raw`W(x) = e^{2\alpha x} = ${ex(2 * r0) || "1"}`;
        } else {
          const be = -a / 2, ga = Math.sqrt(-D) / 2;
          cp.dot(be, ga, "pl-dot c", 6); cp.dot(be, -ga, "pl-dot c", 6);
          y1 = x => Math.exp(be * x) * Math.cos(ga * x); y2 = x => Math.exp(be * x) * Math.sin(ga * x);
          txt = String.raw`$\Delta = ${fmt(D, 2)} < 0$: radici complesse $\beta \pm i\gamma$ con $\beta = ${fmt(be, 3)}$, $\gamma = ${fmt(ga, 3)}$; soluzioni $e^{\beta x}\cos\gamma x$, $e^{\beta x}\sin\gamma x$.`;
          W = String.raw`W(x) = \gamma e^{2\beta x} = ${fmt(ga, 3)}${ex(2 * be)}`;
        }
        sp.fn(y1); sp.fn(y2, { cls: "c2" });
        u.read.innerHTML = md(`<p>Equazione $y''${a ? (a < 0 ? " - " : " + ") + c1(a) + "y'" : ""}${b ? (b < 0 ? " - " : " + ") + c1(b) + "y" : ""} = 0$, caratteristica $\\alpha^2${a ? (a < 0 ? " - " : " + ") + c1(a) + "\\alpha" : ""}${b ? (b < 0 ? " - " : " + ") + fmt(Math.abs(b)) : ""} = 0$.</p><p>${txt}</p><p>$${W} \\ne 0$.</p>
          <p class="small dim">Curve: blu la prima soluzione, rossa la seconda.</p>`);
        typeset(u.read);
      }
      draw();
    }
  };

  /* ======================= funzione senza primitive ======================= */
  G["g-segno"] = {
    title: "Una funzione senza primitive", topic: "primitive", nodo: "t-senza-primitive",
    guida: String.raw`$f$ vale $-1$ per $x < 0$ e $1$ per $x \ge 0$. Su ciascun ramo una primitiva è $-x + k_1$ oppure $x + k_2$. Per essere una primitiva su tutto $\mathbb{R}$ deve essere continua in $0$: incollando si ottiene $|x| + k$, che però ha uno **spigolo** in $0$ (derivata sinistra $-1$, destra $1$): non è derivabile. Nessuna scelta delle costanti funziona.`,
    mount(el) {
      const u = frame(el, this);
      let k1 = 1.5, k2 = -0.5;
      const r = row(u.ctl);
      const s1 = PL().slider(r, { label: "$k_1$", min: -3, max: 3, step: 0.05, value: k1, onInput: v => { k1 = v; draw(); } });
      const s2 = PL().slider(r, { label: "$k_2$", min: -3, max: 3, step: 0.05, value: k2, onInput: v => { k2 = v; draw(); } });
      btn(row(u.ctl), "incolla in $x = 0$", () => { k2 = k1; s2.set(k2); draw(); });
      typeset(u.ctl);
      const top = PL().create(sub(u.fig), { xmin: -3, xmax: 3, ymin: -1.8, ymax: 1.8, height: 160, aria: "f a gradino" });
      const bot = PL().create(sub(u.fig), { xmin: -3, xmax: 3, ymin: -3, ymax: 5, height: 260, aria: "primitive dei due rami" });
      function draw() {
        top.clear(); top.axes(); bot.clear(); bot.axes();
        top.fn(() => -1, { from: -3, to: -0.001 }); top.fn(() => 1, { from: 0, to: 3, cls: "c2" }); top.dot(0, 1); top.dot(0, -1, "pl-dot hollow");
        bot.fn(x => -x + k1, { from: -3, to: 0 }); bot.fn(x => x + k2, { from: 0, to: 3, cls: "c2" });
        const glued = Math.abs(k1 - k2) < 0.03;
        u.read.innerHTML = md(glued ? `<p>Continua in $0$: è $|x| + ${fmt(k1, 2)}$. Ma la derivata sinistra in $0$ è $-1$ e quella destra è $1$: **non è derivabile**, quindi non è una primitiva in $\\mathbb{R}$.</p>` : `<p>Salto in $0$ di $${fmt(k2 - k1, 2)}$: non è nemmeno continua. Prova a incollare.</p>`);
        typeset(u.read);
      }
      draw();
      void s1;
    }
  };

  /* ======================= Malthus ======================= */
  G["g-malthus"] = {
    title: "Modello di Malthus", topic: "malthus", nodo: "o-malthus",
    guida: String.raw`La soluzione di $N' = \varepsilon N$, $N(0) = N_0$ è $N(t) = N_0e^{\varepsilon t}$. Con $\varepsilon > 0$ crescita esponenziale, con $\varepsilon < 0$ estinzione, con $\varepsilon = 0$ popolazione costante.`,
    mount(el) {
      const u = frame(el, this);
      let eps = 0.2, N0 = 50;
      const r = row(u.ctl);
      PL().slider(r, { label: String.raw`$\varepsilon$`, min: -0.5, max: 0.5, step: 0.05, value: eps, onInput: v => { eps = v; draw(); } });
      PL().slider(r, { label: "$N_0$", min: 10, max: 150, step: 5, value: N0, format: v => String(v), onInput: v => { N0 = v; draw(); } });
      typeset(u.ctl);
      const p = PL().create(sub(u.fig), { xmin: -0.5, xmax: 10, ymin: -20, ymax: 400, aria: "modello di Malthus" });
      function draw() {
        p.clear(); p.axes({ xlabel: "t", ylabel: "N" });
        p.fn(t => N0 * Math.exp(eps * t), { from: 0, to: 10 });
        p.dot(0, N0);
        u.read.innerHTML = md(`<p>$N(t) = ${N0}e^{${fmt(eps, 2)}t}$; dopo $10$ unità di tempo $N(10) = ${fmt(N0 * Math.exp(10 * eps), 1)}$.</p>`);
        typeset(u.read);
      }
      draw();
    }
  };

  /* ======================= misura di Peano-Jordan ======================= */
  G["g-misura"] = {
    title: "Plurirettangoli e misura di Peano-Jordan", topic: "misura", nodo: "d-peano-jordan",
    guida: String.raw`Una griglia di quadretti di lato $h$ copre il piano. I quadretti **pieni** stanno tutti dentro l'insieme: formano un plurirettangolo **interno**. Quelli **tratteggiati** toccano l'insieme: con i pieni formano un plurirettangolo **esterno**. Raffinando la griglia le due aree si avvicinano: l'insieme è misurabile perché l'estremo superiore delle aree interne coincide con l'estremo inferiore di quelle esterne.`,
    mount(el) {
      const SH = [
        { label: String.raw`rettangoloide di $1 + \sin x$ in $[0,\pi]$`, a: 0, b: Math.PI, lo: () => 0, hi: x => 1 + Math.sin(x), exact: Math.PI + 2, ex: String.raw`\pi + 2`, v: [-0.3, 3.5, -0.3, 2.3] },
        { label: "cerchio di raggio 1", a: -1, b: 1, lo: x => -Math.sqrt(Math.max(0, 1 - x * x)), hi: x => Math.sqrt(Math.max(0, 1 - x * x)), exact: Math.PI, ex: String.raw`\pi`, v: [-1.4, 1.4, -1.2, 1.2] }
      ];
      const u = frame(el, this);
      let k = 0, n = 4;
      chooser(u.ctl, SH, i => { k = i; draw(); }, "insieme");
      PL().slider(row(u.ctl), { label: "quadretti per unità", min: 1, max: 30, step: 1, value: n, format: v => `${v} (h = ${fmt(1 / v, 3)})`, onInput: v => { n = v; draw(); } });
      const p = PL().create(sub(u.fig), { xmin: -1, xmax: 1, ymin: -1, ymax: 1, height: 340, aria: "plurirettangoli interni ed esterni" });
      function draw() {
        const S = SH[k], h = 1 / n;
        p.setView({ xmin: S.v[0], xmax: S.v[1], ymin: S.v[2], ymax: S.v[3] });
        p.clear(); p.axes();
        let inner = 0, outer = 0;
        const i0 = Math.floor(S.a / h - 1e-9), i1 = Math.ceil(S.b / h + 1e-9);
        for (let i = i0; i < i1; i++) {
          const x0 = i * h, x1 = x0 + h;
          const A = Math.max(x0, S.a), B = Math.min(x1, S.b);
          if (B <= A) continue;
          const full = x0 >= S.a - 1e-12 && x1 <= S.b + 1e-12;      // colonna tutta sopra [a, b]
          const lo = PL().minmax(S.lo, A, B, 40), hi = PL().minmax(S.hi, A, B, 40);
          // celle esterne: toccano [min lo, max hi]; interne: dentro [max lo, min hi] e colonna piena
          const jo0 = Math.floor(lo.m / h + 1e-9), jo1 = Math.ceil(hi.M / h - 1e-9);
          const ji0 = Math.ceil(lo.M / h - 1e-9), ji1 = Math.floor(hi.m / h + 1e-9);
          for (let j = jo0; j < jo1; j++) {
            const y0 = j * h, inside = full && j >= ji0 && j < ji1;
            p.rect(x0, x1, y0, y0 + h, inside ? "pl-low" : "pl-up");
            outer += h * h; if (inside) inner += h * h;
          }
        }
        p.fn(S.hi, { from: S.a, to: S.b }); if (k === 1) p.fn(S.lo, { from: S.a, to: S.b });
        u.read.innerHTML = md(`<div class="gx-stats"><span>area interna $= ${fmt(inner, 4)}$</span><span>area esterna $= ${fmt(outer, 4)}$</span><span>differenza $= ${fmt(outer - inner, 4)}$</span></div>
          <p>La misura è l'unico numero compreso fra tutte le aree interne e tutte le esterne: qui $${S.ex} \\approx ${fmt(S.exact, 4)}$. ${n < 6 ? "Aumenta i quadretti: la differenza si riduce." : "La differenza è ormai piccola: viene dai quadretti lungo il bordo, che hanno area totale sempre più piccola."}</p>`);
        typeset(u.read);
      }
      draw();
    }
  };

  /* ======================= Wronskiano ======================= */
  G["g-wronsk"] = {
    title: "Wronskiano di due funzioni", topic: "wronskiano", nodo: "t-wronskiano",
    guida: String.raw`In alto due funzioni $y_1$ (blu) e $y_2$ (rossa), in basso il loro Wronskiano $W(x) = y_1y_2' - y_2y_1'$. Per **soluzioni di una stessa omogenea** a coefficienti continui $W$ è identicamente nullo (soluzioni dipendenti) oppure **mai nullo** (indipendenti). L'ultima coppia mostra che per funzioni qualsiasi può succedere altro.`,
    mount(el) {
      const C = [
        { label: String.raw`$e^x$, $xe^x$`, y1: x => Math.exp(x), d1: x => Math.exp(x), y2: x => x * Math.exp(x), d2: x => (1 + x) * Math.exp(x), W: String.raw`e^{2x}`, v: [-3, 1.5, -1.5, 5], wv: [-0.5, 8],
          txt: String.raw`Soluzioni di $y'' - 2y' + y = 0$ (radice $1$ doppia). $W = e^{2x}$ non si annulla mai: sono **indipendenti**.` },
        { label: String.raw`$\cos 2x$, $\sin 2x$`, y1: x => Math.cos(2 * x), d1: x => -2 * Math.sin(2 * x), y2: x => Math.sin(2 * x), d2: x => 2 * Math.cos(2 * x), W: "2", v: [-3.2, 3.2, -1.5, 1.5], wv: [-0.5, 3],
          txt: String.raw`Soluzioni di $y'' + 4y = 0$. $W \equiv 2$, costante e diverso da zero: **indipendenti**.` },
        { label: String.raw`$e^x$, $2e^x$`, y1: x => Math.exp(x), d1: x => Math.exp(x), y2: x => 2 * Math.exp(x), d2: x => 2 * Math.exp(x), W: "0", v: [-3, 1.5, -0.5, 8], wv: [-1, 1],
          txt: String.raw`$y_2 = 2y_1$: le funzioni sono **dipendenti** e $W \equiv 0$ in ogni punto.` },
        { label: String.raw`$x$, $x^2$`, y1: x => x, d1: () => 1, y2: x => x * x, d2: x => 2 * x, W: "x^2", v: [-2, 2, -2, 4], wv: [-0.5, 4],
          txt: String.raw`$W = x^2$ si annulla **solo** in $0$: per il teorema, $x$ e $x^2$ **non** possono essere soluzioni di una stessa omogenea $y'' + a(x)y' + b(x)y = 0$ con $a$, $b$ continue in un intervallo che contiene $0$.` }
      ];
      const u = frame(el, this);
      let k = 0;
      chooser(u.ctl, C, i => { k = i; draw(); }, "coppia di funzioni");
      const top = PL().create(sub(u.fig), { xmin: -1, xmax: 1, ymin: -1, ymax: 1, height: 240, aria: "le due funzioni" });
      const bot = PL().create(sub(u.fig), { xmin: -1, xmax: 1, ymin: -1, ymax: 1, height: 170, aria: "il Wronskiano" });
      function draw() {
        const c = C[k];
        top.setView({ xmin: c.v[0], xmax: c.v[1], ymin: c.v[2], ymax: c.v[3] });
        bot.setView({ xmin: c.v[0], xmax: c.v[1], ymin: c.wv[0], ymax: c.wv[1] });
        top.clear(); top.axes(); bot.clear(); bot.axes({ ylabel: "W" });
        top.fn(c.y1); top.fn(c.y2, { cls: "c2" });
        const W = x => c.y1(x) * c.d2(x) - c.y2(x) * c.d1(x);
        bot.area(W, c.v[0], c.v[1]); bot.fn(W, { cls: "c2" });
        u.read.innerHTML = md(`<p>$W(x) = \\begin{vmatrix} y_1 & y_2 \\\\ y_1' & y_2' \\end{vmatrix} = ${c.W}$.</p><p>${c.txt}</p>`);
        typeset(u.read);
      }
      draw();
    }
  };

  /* ======================= campo di direzioni (primo ordine) ======================= */
  G["g-campo"] = {
    title: "Campo di direzioni e problema di Cauchy", topic: "primo_ordine", nodo: "t-omog-primo",
    guida: String.raw`In ogni punto $(x, y)$ un trattino ha la pendenza che l'equazione impone a una soluzione che passa di lì. Le soluzioni (in grigio, una per ogni $k$) seguono i trattini e **non si incrociano mai**. Trascina il punto $(x_0, y_0)$: la curva blu è l'**unica** soluzione del problema di Cauchy con $y(x_0) = y_0$.`,
    mount(el) {
      const EQ = [
        { label: String.raw`$y' + 2y = 0$`, F: (x, y) => -2 * y, y: (x, k) => k * Math.exp(-2 * x), k: (x0, y0) => y0 * Math.exp(2 * x0), gen: String.raw`y = k\,e^{-2x}` },
        { label: String.raw`$y' + y = x$`, F: (x, y) => x - y, y: (x, k) => x - 1 + k * Math.exp(-x), k: (x0, y0) => (y0 - x0 + 1) * Math.exp(x0), gen: String.raw`y = x - 1 + k\,e^{-x}` },
        { label: String.raw`$y' + 2xy = x$`, F: (x, y) => x - 2 * x * y, y: (x, k) => 0.5 + k * Math.exp(-x * x), k: (x0, y0) => (y0 - 0.5) * Math.exp(x0 * x0), gen: String.raw`y = \tfrac12 + k\,e^{-x^2}` }
      ];
      const u = frame(el, this);
      let e = 0, x0 = 0, y0 = 1;
      chooser(u.ctl, EQ, i => { e = i; draw(); }, "equazione");
      typeset(u.ctl);
      const p = PL().create(sub(u.fig), { xmin: -3, xmax: 3, ymin: -3, ymax: 3, height: 380, aria: "campo di direzioni" });
      let hd = null;
      function draw() {
        const E = EQ[e];
        p.clear("areas", "rects", "curves", "marks"); p.axes();
        const L = 0.13;
        for (let x = -2.75; x <= 2.8; x += 0.5) for (let y = -2.75; y <= 2.8; y += 0.5) {
          const m = E.F(x, y), d = L / Math.sqrt(1 + m * m);
          p.line(x - d, y - m * d, x + d, y + m * d, "pl-mark faint");
        }
        [-3, -2, -1, -0.5, 0.5, 1, 2, 3].forEach(c => p.fn(x => E.y(x, c), { cls: "faint" }));
        const k = E.k(x0, y0);
        p.fn(x => E.y(x, k));
        if (!hd) hd = p.handle(x0, y0, { label: "punto iniziale", snap: 0.25, onDrag: (x, y) => { x0 = Math.max(-2.75, Math.min(2.75, x)); y0 = Math.max(-2.75, Math.min(2.75, y)); draw(); } });
        u.read.innerHTML = md(`<p>Integrale generale: $${E.gen}$, $k \\in \\mathbb{R}$.</p><p>Problema di Cauchy con $y(${fmt(x0, 2)}) = ${fmt(y0, 2)}$: si impone la condizione e si trova $k = ${fmt(k, 3)}$. Una sola curva passa per il punto: è il teorema di **esistenza e unicità**.</p>`);
        typeset(u.read);
      }
      draw();
    }
  };

  /* ======================= somiglianza: quando serve x^s ======================= */
  G["g-somiglianza"] = {
    title: "Metodo di somiglianza: il fattore x^s", topic: "somiglianza", nodo: "m-somiglianza",
    guida: String.raw`Il termine noto è $f(x) = e^{hx}p(x)$ con $p$ di grado $m$. Sull'asse reale ci sono le radici dell'equazione caratteristica (punti verdi) e $h$ (il punto arancione, trascinabile). Se $h$ non è radice, $s = 0$; se cade su una radice, $s$ è la sua **molteplicità**. L'integrale particolare si cerca nella forma $\bar y = x^s e^{hx} q(x)$, con $q$ di grado $m$.`,
    mount(el) {
      const u = frame(el, this);
      let r1 = 1, r2 = 2, h = 3, m = 1;
      const r = row(u.ctl);
      PL().slider(r, { label: String.raw`radice $\alpha_1$`, min: -3, max: 3, step: 0.5, value: r1, onInput: v => { r1 = v; draw(); } });
      PL().slider(r, { label: String.raw`radice $\alpha_2$`, min: -3, max: 3, step: 0.5, value: r2, onInput: v => { r2 = v; draw(); } });
      chooser(u.ctl, [{ label: "$m = 0$" }, { label: "$m = 1$" }, { label: "$m = 2$" }], i => { m = i; draw(); }, "grado di p");
      $$(".gx-choose .chip", u.ctl).forEach((c, i) => c.setAttribute("aria-pressed", i === m));
      typeset(u.ctl);
      const p = PL().create(sub(u.fig), { xmin: -3.5, xmax: 3.5, ymin: -1, ymax: 1, height: 130, aria: "radici e h sull'asse reale" });
      let hd = null;
      const q = ["a", "ax + b", "ax^2 + bx + c"];
      const sgn = v => v < 0 ? `+ ${fmt(-v, 2)}` : v > 0 ? `- ${fmt(v, 2)}` : "";
      function draw() {
        p.clear("areas", "rects", "curves", "marks"); p.axes();
        p.dot(r1, 0, "pl-dot c", 7, "marks"); p.dot(r2, 0, "pl-dot c", r1 === r2 ? 11 : 7, "marks");
        if (!hd) hd = p.handle(h, 0, { label: "h", lockY: true, snap: 0.5, clampX: [-3, 3], onDrag: x => { h = x; draw(); } });
        const s = (h === r1 ? 1 : 0) + (h === r2 ? 1 : 0);
        const car = r1 === r2 ? `(\\alpha ${sgn(r1)})^2` : `(\\alpha ${sgn(r1)})(\\alpha ${sgn(r2)})`;
        const hx = h === 0 ? "" : `e^{${h === 1 ? "" : h === -1 ? "-" : fmt(h, 2)}x}`;
        const pf = m === 0 ? "" : m === 1 ? "x" : "x^2";
        const form = `${s === 0 ? "" : s === 1 ? "x" : "x^2"}${hx}${m === 0 && !s && !hx ? "a" : m === 0 ? "\\,a" : `(${q[m]})`}`;
        u.read.innerHTML = md(`<p>Equazione caratteristica $${car} = 0$. Termine noto del tipo $f(x) = ${(pf + (pf && hx ? "\\," : "") + hx) || "1"}$ (cioè $h = ${fmt(h, 2)}$, $m = ${m}$).</p>
          <p>${s === 0 ? `$h$ non è radice: $s = 0$.` : s === 1 ? `$h$ è radice **semplice**: $s = 1$.` : `$h$ è radice **doppia**: $s = 2$.`} Si cerca $\\bar y = ${form}$.</p>
          <p class="small dim">${s ? "Senza il fattore $x^s$ la forma risolverebbe (in parte) l'omogenea e i coefficienti non si troverebbero." : "Trascina $h$ su una radice per vedere quando serve il fattore $x$."}</p>`);
        typeset(u.read);
      }
      draw();
    }
  };

  /* ======================= vista ======================= */
  function view(main, params, rest) {
    const id = rest && rest[0];
    if (id && G[id]) {
      const g = G[id];
      const nodo = window.TEORIA_UI && window.TEORIA_UI.byId(g.nodo);
      main.innerHTML = `<nav class="crumbs"><a href="#/grafici">Grafici</a></nav><h1>${esc(g.title)}</h1><div id="gx"></div>
        <div class="row small">${nodo ? `<a href="#/teoria/${nodo.id}">teoria: ${esc(nodo.label)}</a>` : ""}<span class="spacer"></span><a href="#/quiz?topic=${g.topic}">quiz sull'argomento</a></div>`;
      g.mount($("#gx", main));
      return;
    }
    main.innerHTML = `<h1>Grafici</h1>
      <p class="lead">Simulazioni interattive per vedere quello che le dimostrazioni dicono a parole. Funzionano con mouse, dita e tastiera (slider e frecce).</p>
      <div class="apps">${Object.entries(G).map(([k, g]) => `<a class="app" href="#/grafici/${k}"><span class="app-cmd">${esc(g.title)}</span><span class="app-desc">${md(g.guida.split(". ")[0])}.</span></a>`).join("")}</div>`;
  }

  window.GRAFICI = G;
  window.ROUTER.register("grafici", view);
})();

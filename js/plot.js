/* Grafici in SVG scritto a mano: assi, griglia, curve (con gestione delle
   discontinuità), aree con segno, rettangoli, punti trascinabili, slider.
   I colori vengono dalle variabili CSS (--curve, --area-pos, ...): i grafici
   seguono il tema chiaro/scuro senza codice in più. */
(function () {
  "use strict";
  const NS = "http://www.w3.org/2000/svg";
  const el = (tag, attrs, parent) => {
    const e = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs || {})) if (v != null) e.setAttribute(k, v);
    if (parent) parent.appendChild(e);
    return e;
  };
  const reduced = () => { try { return matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; } };
  const fmt = (v, d) => (Math.abs(v) < 1e-10 ? 0 : v).toFixed(d == null ? 3 : d).replace(/\.?0+$/, "").replace(".", ",").replace(/^-0$/, "0");

  function niceStep(span) {
    const raw = span / 8, p = Math.pow(10, Math.floor(Math.log10(raw)));
    const m = raw / p;
    return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p;
  }

  function create(host, o) {
    const W = o.width || 600, H = o.height || 320, pad = { l: 34, r: 12, t: 12, b: 24 };
    let xmin = o.xmin, xmax = o.xmax, ymin = o.ymin, ymax = o.ymax;
    const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, class: "plot", role: "img", "aria-label": o.aria || "grafico", preserveAspectRatio: "xMidYMid meet" });
    host.appendChild(svg);
    const layers = {};
    ["grid", "areas", "rects", "curves", "marks", "points"].forEach(n => { layers[n] = el("g", { class: "pl-" + n }, svg); });
    const clip = el("clipPath", { id: "clip" + Math.random().toString(36).slice(2) }, el("defs", {}, svg));
    el("rect", { x: pad.l, y: pad.t, width: W - pad.l - pad.r, height: H - pad.t - pad.b }, clip);
    ["areas", "rects", "curves"].forEach(n => layers[n].setAttribute("clip-path", `url(#${clip.id})`));

    const sx = x => pad.l + (x - xmin) / (xmax - xmin) * (W - pad.l - pad.r);
    const sy = y => pad.t + (ymax - y) / (ymax - ymin) * (H - pad.t - pad.b);
    const ix = px => xmin + (px - pad.l) / (W - pad.l - pad.r) * (xmax - xmin);
    const iy = py => ymax - (py - pad.t) / (H - pad.t - pad.b) * (ymax - ymin);
    const clampY = y => Math.max(ymin - (ymax - ymin), Math.min(ymax + (ymax - ymin), y));

    function axes(opt) {
      opt = opt || {};
      const g = layers.grid; g.innerHTML = "";
      const sxp = niceStep(xmax - xmin), syp = niceStep(ymax - ymin);
      for (let x = Math.ceil(xmin / sxp) * sxp; x <= xmax + 1e-9; x += sxp) {
        el("line", { x1: sx(x), x2: sx(x), y1: pad.t, y2: H - pad.b, class: "pl-gridline" }, g);
        if (Math.abs(x) > 1e-9) el("text", { x: sx(x), y: Math.min(H - pad.b + 14, Math.max(pad.t + 12, sy(0) + 14)), class: "pl-tick", "text-anchor": "middle" }, g).textContent = fmt(x, 2);
      }
      for (let y = Math.ceil(ymin / syp) * syp; y <= ymax + 1e-9; y += syp) {
        el("line", { x1: pad.l, x2: W - pad.r, y1: sy(y), y2: sy(y), class: "pl-gridline" }, g);
        if (Math.abs(y) > 1e-9) el("text", { x: Math.max(pad.l - 4, Math.min(W - pad.r - 4, sx(0) - 5)), y: sy(y) + 4, class: "pl-tick", "text-anchor": "end" }, g).textContent = fmt(y, 2);
      }
      if (ymin <= 0 && ymax >= 0) el("line", { x1: pad.l, x2: W - pad.r, y1: sy(0), y2: sy(0), class: "pl-axis" }, g);
      if (xmin <= 0 && xmax >= 0) el("line", { x1: sx(0), x2: sx(0), y1: pad.t, y2: H - pad.b, class: "pl-axis" }, g);
      if (opt.xlabel) el("text", { x: W - pad.r - 2, y: sy(0) - 6, class: "pl-axlabel", "text-anchor": "end" }, g).textContent = opt.xlabel;
      if (opt.ylabel) el("text", { x: sx(0) + 6, y: pad.t + 10, class: "pl-axlabel" }, g).textContent = opt.ylabel;
    }

    /* curva y = f(x) su [a, b]: si spezza dove f non è finita o salta */
    function fn(f, opt) {
      opt = opt || {};
      const a = opt.from != null ? opt.from : xmin, b = opt.to != null ? opt.to : xmax;
      const n = opt.samples || 400;
      let d = "", pen = false, prev = null;
      const jump = (ymax - ymin) * 0.8;
      for (let i = 0; i <= n; i++) {
        const x = a + (b - a) * i / n, y = f(x);
        if (!isFinite(y) || (prev != null && Math.abs(y - prev) > jump)) { pen = false; prev = isFinite(y) ? y : null; if (!isFinite(y)) continue; }
        d += (pen ? "L" : "M") + sx(x).toFixed(2) + " " + sy(clampY(y)).toFixed(2);
        pen = true; prev = y;
      }
      return el("path", { d, class: "pl-curve " + (opt.cls || ""), "stroke-dasharray": opt.dashed ? "6 5" : null }, layers[opt.layer || "curves"]);
    }

    /* area con segno fra il grafico e l'asse x, da a a b */
    function area(f, a, b, opt) {
      opt = opt || {};
      if (a > b) [a, b] = [b, a];
      const n = opt.samples || 200;
      let cur = null, pts = [];
      const flush = () => {
        if (pts.length > 1) {
          const d = "M" + sx(pts[0][0]) + " " + sy(0) + pts.map(p => "L" + sx(p[0]).toFixed(2) + " " + sy(clampY(p[1])).toFixed(2)).join("") + "L" + sx(pts[pts.length - 1][0]) + " " + sy(0) + "Z";
          el("path", { d, class: (cur >= 0 ? "pl-pos" : "pl-neg") + " " + (opt.cls || "") }, layers.areas);
        }
        pts = [];
      };
      for (let i = 0; i <= n; i++) {
        const x = a + (b - a) * i / n, y = f(x);
        if (!isFinite(y)) continue;
        const s = y >= 0 ? 1 : -1;
        if (cur !== null && s !== cur) { pts.push([x, 0]); flush(); pts.push([x, 0]); }
        cur = s; pts.push([x, y]);
      }
      flush();
    }

    function rect(x0, x1, y0, y1, cls) {
      return el("rect", { x: sx(Math.min(x0, x1)), y: sy(Math.max(y0, y1)), width: Math.abs(sx(x1) - sx(x0)), height: Math.abs(sy(y0) - sy(y1)), class: cls || "pl-rect" }, layers.rects);
    }
    function line(x1, y1, x2, y2, cls, dashed) {
      return el("line", { x1: sx(x1), y1: sy(clampY(y1)), x2: sx(x2), y2: sy(clampY(y2)), class: cls || "pl-mark", "stroke-dasharray": dashed ? "5 4" : null }, layers.marks);
    }
    function vline(x, cls) { return el("line", { x1: sx(x), x2: sx(x), y1: pad.t, y2: H - pad.b, class: cls || "pl-mark", "stroke-dasharray": "4 4" }, layers.marks); }
    function hline(y, cls) { return el("line", { y1: sy(y), y2: sy(y), x1: pad.l, x2: W - pad.r, class: cls || "pl-mark", "stroke-dasharray": "4 4" }, layers.marks); }
    function text(x, y, s, cls, anchor) { const t = el("text", { x: sx(x), y: sy(y), class: cls || "pl-label", "text-anchor": anchor || "start" }, layers.marks); t.textContent = s; return t; }
    function dot(x, y, cls, r, layer) { return el("circle", { cx: sx(x), cy: sy(clampY(y)), r: r || 4.5, class: cls || "pl-dot" }, layers[layer || "points"]); }

    /* punto trascinabile (mouse, touch, tastiera con le frecce) */
    function handle(x, y, opt) {
      const g = el("g", { class: "pl-handle", tabindex: 0, role: "slider", "aria-label": opt.label || "punto", "aria-valuenow": fmt(y) }, layers.points);
      el("circle", { r: 16, class: "pl-hit" }, g);
      el("circle", { r: 7, class: "pl-knob" }, g);
      let cx = x, cy = y;
      const place = () => { g.setAttribute("transform", `translate(${sx(cx)},${sy(clampY(cy))})`); g.setAttribute("aria-valuenow", fmt(opt.lockX ? cy : cx)); };
      const set = (nx, ny, emit) => {
        if (opt.lockX) nx = cx; if (opt.lockY) ny = cy;
        if (opt.clampX) nx = Math.max(opt.clampX[0], Math.min(opt.clampX[1], nx));
        if (opt.snap) { nx = Math.round(nx / opt.snap) * opt.snap; ny = Math.round(ny / opt.snap) * opt.snap; }
        cx = nx; cy = ny; place(); if (emit && opt.onDrag) opt.onDrag(cx, cy);
      };
      const toSvg = ev => { const pt = svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY; return pt.matrixTransform(svg.getScreenCTM().inverse()); };
      g.addEventListener("pointerdown", ev => { ev.preventDefault(); g.setPointerCapture(ev.pointerId); g.classList.add("drag"); });
      g.addEventListener("pointermove", ev => { if (!g.hasPointerCapture(ev.pointerId)) return; const p = toSvg(ev); set(ix(p.x), iy(p.y), true); });
      g.addEventListener("pointerup", ev => { g.releasePointerCapture(ev.pointerId); g.classList.remove("drag"); });
      g.addEventListener("keydown", ev => {
        const st = opt.step || (opt.lockX ? (ymax - ymin) / 100 : (xmax - xmin) / 100);
        const k = ev.key; let dx = 0, dy = 0;
        if (k === "ArrowLeft") dx = -st; else if (k === "ArrowRight") dx = st; else if (k === "ArrowUp") dy = st; else if (k === "ArrowDown") dy = -st; else return;
        ev.preventDefault();
        if (opt.lockX) { dy = dy || dx; dx = 0; } if (opt.lockY) { dx = dx || dy; dy = 0; }
        set(cx + dx, cy + dy, true);
      });
      place();
      return { set: (nx, ny) => set(nx, ny, false), get: () => [cx, cy], el: g };
    }

    function clear(...names) { (names.length ? names : ["areas", "rects", "curves", "marks", "points"]).forEach(n => { layers[n].innerHTML = ""; }); }
    function setView(v) { if (v.xmin != null) xmin = v.xmin; if (v.xmax != null) xmax = v.xmax; if (v.ymin != null) ymin = v.ymin; if (v.ymax != null) ymax = v.ymax; }
    return { svg, axes, fn, area, rect, line, vline, hline, text, dot, handle, clear, setView, sx, sy, get view() { return { xmin, xmax, ymin, ymax }; } };
  }

  /* slider accessibile con etichetta e valore */
  function slider(host, o) {
    const id = "sl" + Math.random().toString(36).slice(2);
    const w = document.createElement("div");
    w.className = "pl-slider";
    w.innerHTML = `<label for="${id}">${o.label}</label><input type="range" id="${id}" min="${o.min}" max="${o.max}" step="${o.step}" value="${o.value}"><output for="${id}"></output>`;
    host.appendChild(w);
    const inp = w.querySelector("input"), out = w.querySelector("output");
    const show = () => { out.textContent = o.format ? o.format(+inp.value) : fmt(+inp.value, 2); };
    inp.addEventListener("input", () => { show(); o.onInput(+inp.value); });
    show();
    return { get value() { return +inp.value; }, set(v) { inp.value = v; show(); }, input: inp };
  }

  /* integrale numerico (Simpson) e minimo/massimo campionati */
  function simpson(f, a, b, n) {
    n = n || 400; if (a === b) return 0;
    const h = (b - a) / n; let s = f(a) + f(b);
    for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h);
    return s * h / 3;
  }
  function minmax(f, a, b, n) {
    n = n || 60; let m = Infinity, M = -Infinity, xm = a, xM = a;
    for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n, y = f(x); if (y < m) { m = y; xm = x; } if (y > M) { M = y; xM = x; } }
    return { m, M, xm, xM };
  }

  window.PLOT = { create, slider, simpson, minmax, fmt, reduced };
})();

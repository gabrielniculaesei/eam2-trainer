import { test } from "node:test";
import assert from "node:assert/strict";
import { browser } from "./helpers.mjs";

const W = browser(["js/rng.js", "js/cas.js", "js/expr.js"]);
const { F, P, EP, EC, solve } = W.CAS;

test("frazioni ridotte e aritmetica esatta", () => {
  assert.equal(F(6, -8).tex(), "-\\frac{3}{4}");
  assert.ok(F(1, 3).add(F(1, 6)).eq(F(1, 2)));
  assert.ok(F(2, 3).mul(F(3, 4)).eq(F(1, 2)));
  assert.throws(() => F(1, 0));
});

test("polinomi: derivata, primitiva, valore", () => {
  const p = P([1, -2, 3]);              // 3x^2 - 2x + 1
  assert.equal(p.tex(), "3x^{2} - 2x + 1");
  assert.ok(p.integ().deriv().eq(p));
  assert.ok(p.at(2).eq(F(9)));
});

test("esponenziale per polinomio: la derivata della primitiva è la funzione", () => {
  for (const lam of [1, 2, -3, F(1, 2)]) {
    const f = EP.of(lam, P([2, -1, 1]));
    assert.ok(f.integ().deriv().eq(f), `lam = ${lam}`);
  }
  const G = EP.of(2, P([1, -1])).integ();   // primitiva di (1-x)e^{2x}
  const g = W.EXPR.compile(G.str()).f;
  assert.ok(Math.abs(g(0.5) - G.num(0.5)) < 1e-12);
});

test("costanti con esponenziali", () => {
  const c = EC.of(F(1, 2), 1).add(EC.of(F(1, 2), 1)).add(EC.of(3, 0));
  assert.equal(c.tex(), "3 + e");
  assert.ok(Math.abs(c.num() - (3 + Math.E)) < 1e-12);
});

test("sistemi lineari esatti", () => {
  const [a, b] = solve([[1, 1], [3, -3]], [1, 1]);
  assert.ok(a.eq(F(2, 3)) && b.eq(F(1, 3)));
});

test("stesso seed, stessa variante (link condivisibili)", async () => {
  const { loadFiles, dataFiles } = await import("../tools/load_data.mjs");
  const D = loadFiles(["js/rng.js", "js/cas.js", "js/expr.js", ...dataFiles()]);
  for (const g of D.GENERATORI) {
    const a = g.gen(D.RNG.create(4242)), b = g.gen(D.RNG.create(4242));
    assert.equal(JSON.stringify(a), JSON.stringify(b), g.id);
  }
});

import { test } from "node:test";
import assert from "node:assert/strict";
import { browser } from "./helpers.mjs";
import { loadFiles } from "../tools/load_data.mjs";

const W = browser(["js/expr.js"]);
const X = W.EXPR;
const ev = (s, x) => X.compile(s).f(x);
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-9 * Math.max(1, Math.abs(b)), `${a} != ${b}`);

test("aritmetica, precedenze, potenze a destra", () => {
  near(ev("1+2*3", 0), 7);
  near(ev("2^3^2", 0), 512);
  near(ev("-x^2", 3), -9);
  near(ev("(1/2)*4", 0), 2);
  near(ev("3/4x", 2), 1.5);          // (3/4)·x come si legge di solito
  near(ev("0,5 + 1", 0), 1.5);
  near(ev("2**3", 0), 8);
});

test("moltiplicazione implicita e costanti", () => {
  near(ev("2x", 3), 6);
  near(ev("3(x+1)", 1), 6);
  near(ev("xe^x", 1), Math.E);
  near(ev("x^2 e^x", 1), Math.E);
  near(ev("2pi", 0), 2 * Math.PI);
  near(ev("π/2", 0), Math.PI / 2);
  near(ev("E^2", 0), Math.E ** 2);
});

test("funzioni, anche senza parentesi", () => {
  near(ev("sin x cos x", 0.3), Math.sin(0.3) * Math.cos(0.3));
  near(ev("sin 2x", 0.3), Math.sin(0.6));
  near(ev("e^2x", 0.3), Math.exp(0.6));
  near(ev("e^-3x", 0.3), Math.exp(-0.9));
  near(ev("sin^2 x", 0.3), Math.sin(0.3) ** 2);
  near(ev("log(x^2+4)", 1), Math.log(5));
  near(ev("ln x", 2), Math.log(2));
  near(ev("arctan(x/2)", 1), Math.atan(0.5));
  near(ev("sqrt(x+3)", 1), 2);
  near(ev("|x-1|", -1), 2);
  near(ev("2|x|+1", -3), 7);
  near(ev("exp(2*x)", 1), Math.exp(2));
});

test("errori leggibili", () => {
  assert.throws(() => X.parse("(x+1"), /parentesi/);
  assert.throws(() => X.parse("x+1)"), /parentesi/);
  assert.throws(() => X.parse("y+1"), /sconosciuto/);
  assert.throws(() => X.parse(""), /vuota/);
  assert.throws(() => X.parse("sin"), /argomento/);
});

test("confronti: funzione, primitiva, numero, equazione differenziale", () => {
  assert.equal(X.sameFunction("(3-2x)e^(2x)/4 + e/2", "(3 - 2*x)*exp(2*x)/4 + E/2", [-2, 1]).ok, true);
  assert.equal(X.sameFunction("(3-2x)e^(2x)/4 + e", "(3 - 2*x)*exp(2*x)/4 + E/2", [-2, 1]).ok, false);
  assert.equal(X.sameUpToConstant("x^3/3 + 7", "x**3/3", [-2, 2]).ok, true);
  assert.equal(X.sameUpToConstant("x^3", "x**3/3", [-2, 2]).ok, false);
  assert.equal(X.sameNumber("16/15 log 2 - 3/5 log 3", "16*log(2)/15 - 3*log(3)/5").ok, true);
  assert.equal(X.sameNumber("1/3", "0.3333").ok, false);
  // y'' - 9y = 2 e^{-3x}: un integrale particolare è -x e^{-3x}/3 (anche + omogenea)
  assert.equal(X.solvesOde("-x e^(-3x)/3", [1, 0, -9], "2*exp(-3*x)", [-1.5, 1.5]).ok, true);
  assert.equal(X.solvesOde("-x e^(-3x)/3 + 5e^(3x)", [1, 0, -9], "2*exp(-3*x)", [-1.5, 1.5]).ok, true);
  assert.equal(X.solvesOde("x e^(-3x)/3", [1, 0, -9], "2*exp(-3*x)", [-1.5, 1.5]).ok, false);
  assert.equal(X.solvesOde("3/8 + e^(2x)(3/4 x^2 - 5/4 x + 5/8)", [1, -4, 4, 0], "3*exp(2*x)", [-1, 1]).ok, true);
});

test("anteprima LaTeX", () => {
  assert.equal(X.toTeX("x^2"), "x^{2}");
  assert.ok(X.toTeX("sqrt(x)/2").includes("\\sqrt{x}"));
  assert.ok(X.toTeX("|x-1|").includes("\\left|"));
});

test("ogni risposta degli esercizi si legge col parser e passa il proprio controllo", () => {
  const D = loadFiles(["data/esercizi_tracce.js", "data/esercizi_lezioni.js"]);
  let n = 0;
  for (const e of D.ESERCIZI) for (const f of e.answer.fields) {
    const ref = f.kind === "number" ? f.value : f.expr;
    const r = W.EXPR.checkField(f, ref);
    assert.ok(r.ok, `${e.id} / ${f.label}: ${r.msg}`);
    n++;
  }
  assert.ok(n > 100);
});

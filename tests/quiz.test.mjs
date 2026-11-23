import { test } from "node:test";
import assert from "node:assert/strict";
import { browser } from "./helpers.mjs";

const W = browser(["data/topics.js", "js/rng.js", "js/render.js", "js/quiz.js"]);
const Q = W.QUIZ;

test("multi: tutto giusto vale 1, penalità per le scelte sbagliate, mai sotto 0", () => {
  assert.equal(Q.scoreMulti([0, 4], [0, 4]), 1);
  assert.equal(Q.scoreMulti([0, 4], [4, 0]), 1);
  assert.equal(Q.scoreMulti([0, 4], [0]), 0.5);
  assert.equal(Q.scoreMulti([0, 4], [0, 1]), 0);
  assert.equal(Q.scoreMulti([0, 4], [1, 2, 3]), 0);
  assert.equal(Q.scoreMulti([2, 3, 5], [2, 3]), 2 / 3);
  assert.equal(Q.scoreMulti([2, 3, 5], [2, 3, 5, 0]), 2 / 3);
});

test("punteggi dei vari tipi", () => {
  assert.equal(Q.score({ type: "mcq", correct: 2 }, 2), 1);
  assert.equal(Q.score({ type: "mcq", correct: 2 }, 1), 0);
  assert.equal(Q.score({ type: "impl", correct: 1 }, 1), 1);
  assert.equal(Q.score({ type: "errore", wrong: 3 }, 3), 1);
  const vf = { type: "vf", items: [{ v: true }, { v: false }, { v: false }, { v: true }] };
  assert.equal(Q.score(vf, [true, false, true, true]), 0.75);
  const cl = { type: "cloze", gaps: [{ correct: 0 }, { correct: 1 }] };
  assert.equal(Q.score(cl, [0, 0]), 0.5);
  assert.equal(Q.score(cl, [0, 1]), 1);
});

test("risposta completa solo quando tutto è compilato", () => {
  const vf = { type: "vf", items: [{ v: true }, { v: false }] };
  assert.equal(Q.isComplete(vf, Q.emptyAnswer(vf)), false);
  assert.equal(Q.isComplete(vf, [true, null]), false);
  assert.equal(Q.isComplete(vf, [true, false]), true);
  assert.equal(Q.isComplete({ type: "multi" }, []), false);
  assert.equal(Q.isComplete({ type: "mcq" }, 0), true);
  assert.equal(Q.isComplete({ type: "mcq" }, null), false);
});

test("completamento: i segnaposto escono dalle formule", () => {
  const html = Q.splitCloze(String.raw`Si ha $$ {{1}} \le \int_a^b f \le {{2}} $$ con $D = $ {{3}}.`);
  assert.equal((html.match(/class="gap/g) || []).length, 3);
  assert.ok(!/\$\$/.test(html), "non restano $$ con riquadri dentro");
  assert.ok(html.includes(String.raw`$\displaystyle  \le \int_a^b f \le $`));
  assert.ok(html.includes("$D = $"));
  const inl = Q.splitCloze(String.raw`vale $x = {{1}} + 1$.`);
  assert.ok(inl.includes('data-g="0"') && inl.includes("$ + 1$"));
});

test("completamento: ordine delle opzioni mescolato, stabile e completo", () => {
  const q = { id: "c1-cloze-001", gaps: [{ opts: ["a", "b", "c", "d"] }, { opts: ["a", "b", "c"] }] };
  const o1 = Q.clozeOrder(q), o2 = Q.clozeOrder(q);
  assert.deepEqual(o1, o2);
  assert.deepEqual([...o1[0]].sort(), [0, 1, 2, 3]);
  assert.deepEqual([...o1[1]].sort(), [0, 1, 2]);
});

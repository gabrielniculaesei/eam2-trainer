import { test } from "node:test";
import assert from "node:assert/strict";
import { browser } from "./helpers.mjs";

const W = browser(["js/rng.js"]);

test("stesso seed, stessa sequenza", () => {
  const a = W.RNG.create(12345), b = W.RNG.create(12345);
  const sa = Array.from({ length: 20 }, () => a.int(-10, 10));
  const sb = Array.from({ length: 20 }, () => b.int(-10, 10));
  assert.deepEqual(sa, sb);
});

test("seed diversi, sequenze diverse", () => {
  const a = W.RNG.create(1), b = W.RNG.create(2);
  assert.notDeepEqual(Array.from({ length: 10 }, () => a.next()), Array.from({ length: 10 }, () => b.next()));
});

test("int resta negli estremi e li raggiunge", () => {
  const r = W.RNG.create(7);
  const seen = new Set();
  for (let i = 0; i < 2000; i++) { const v = r.int(-2, 2); assert.ok(v >= -2 && v <= 2); seen.add(v); }
  assert.equal(seen.size, 5);
});

test("shuffle è una permutazione", () => {
  const r = W.RNG.create(99);
  const a = [1, 2, 3, 4, 5, 6, 7, 8];
  assert.deepEqual([...r.shuffle(a)].sort((x, y) => x - y), a);
});

test("intNot evita i valori esclusi", () => {
  const r = W.RNG.create(5);
  for (let i = 0; i < 200; i++) assert.notEqual(r.intNot(-1, 1, 0), 0);
});

import { test } from "node:test";
import assert from "node:assert/strict";
import { browser, memoryStorage } from "./helpers.mjs";

function fresh(init) {
  const localStorage = memoryStorage(init);
  const W = browser(["js/store.js"], { localStorage });
  return { W, localStorage };
}

test("parte da uno stato vuoto valido", () => {
  const { W } = fresh();
  assert.equal(W.STORE.data.v, 1);
  assert.equal(W.STORE.data.settings.piDate, "2026-12-01");
  assert.deepEqual(Object.keys(W.STORE.data.q), []);
});

test("migrate ripara dati rovinati senza lanciare", () => {
  const { W } = fresh();
  const m = W.STORE.migrate({ q: [], exams: "x", settings: { piDate: "ieri", theme: "dark" } });
  assert.equal(Array.isArray(m.exams), true);
  assert.equal(typeof m.q, "object");
  assert.equal(m.settings.piDate, "2026-12-01");
  assert.equal(m.settings.theme, "dark");
  assert.equal(W.STORE.migrate(null).v, 1);
  assert.equal(W.STORE.migrate("ciao").v, 1);
});

test("JSON non valido nello storage: si riparte puliti", () => {
  const { W } = fresh({ eam2_trainer_v1: "{rotto" });
  assert.equal(W.STORE.data.v, 1);
});

test("recordQ accumula tentativi, punti e cronologia", () => {
  const { W, localStorage } = fresh();
  W.STORE.recordQ("c1-x-001", 1);
  W.STORE.recordQ("c1-x-001", 0.5);
  W.STORE.recordQ("c1-x-001", 0);
  W.STORE.recordQ("c1-x-001", 1);
  const s = W.STORE.data.q["c1-x-001"];
  assert.equal(s.a, 4);
  assert.equal(s.c, 2.5);
  assert.equal(s.last, 1);
  assert.equal(s.h, "001");
  assert.ok(JSON.parse(localStorage.getItem("eam2_trainer_v1")).q["c1-x-001"]);
});

test("flashcard: Leitner sale con le giuste, torna a 1 con le sbagliate", () => {
  const { W } = fresh();
  W.STORE.recordCard("t-media", true);
  W.STORE.recordCard("t-media", true);
  assert.equal(W.STORE.data.cards["t-media"].box, 2);
  W.STORE.recordCard("t-media", false);
  assert.equal(W.STORE.data.cards["t-media"].box, 1);
  assert.ok(W.STORE.data.cards["t-media"].due > Date.now());
});

test("azzera cancella anche la sessione in corso e tiene le impostazioni", () => {
  const { W, localStorage } = fresh();
  W.STORE.setting("theme", "dark");
  W.STORE.recordQ("c1-x-001", 1);
  W.STORE.setSession({ kind: "quiz", ids: ["a"], idx: 0 });
  W.STORE.reset();
  assert.equal(localStorage.getItem("eam2_trainer_session"), null);
  assert.deepEqual(Object.keys(W.STORE.data.q), []);
  assert.equal(W.STORE.data.settings.theme, "dark");
});

test("export e import fanno il giro completo", () => {
  const a = fresh();
  a.W.STORE.recordQ("c2-y-002", 1);
  const dump = a.W.STORE.exportJSON();
  const b = fresh();
  b.W.STORE.importJSON(dump);
  assert.equal(b.W.STORE.data.q["c2-y-002"].a, 1);
  assert.throws(() => b.W.STORE.importJSON('{"pippo":1}'));
});

test("sessioni separate per quiz ed esame", () => {
  const { W } = fresh();
  W.STORE.setSession({ kind: "quiz", ids: ["a"], idx: 0 });
  W.STORE.setSession({ kind: "esame", items: [], done: false });
  assert.equal(W.STORE.getSession("quiz").ids[0], "a");
  assert.equal(W.STORE.getSession("esame").done, false);
  W.STORE.clearSession("quiz");
  assert.equal(W.STORE.getSession("quiz"), null);
  assert.ok(W.STORE.getSession("esame"));
});

test("legge anche il vecchio formato con una sola sessione", () => {
  const { W } = fresh({ eam2_trainer_session: JSON.stringify({ kind: "quiz", ids: ["z"], idx: 2 }) });
  assert.equal(W.STORE.getSession("quiz").idx, 2);
});

import { test } from "node:test";
import assert from "node:assert/strict";
import { loadData, orphanDataFiles } from "../tools/load_data.mjs";

const W = loadData();

test("i dati si caricano e gli id sono univoci", () => {
  const ids = W.QUESTIONS.map(q => q.id);
  assert.ok(ids.length >= 47);
  assert.equal(new Set(ids).size, ids.length);
});

test("tutti i 47 id della banca iniziale sono presenti", async (t) => {
  const { readFileSync, existsSync } = await import("node:fs");
  const file = new URL("../seed/seed_domande.js", import.meta.url);
  if (!existsSync(file)) return t.skip("seed/ non presente (file interno, fuori dal repository)");
  const seed = readFileSync(file, "utf8");
  const seedIds = [...seed.matchAll(/\bid: "([^"]+)"/g)].map(m => m[1]);
  assert.equal(seedIds.length, 47);
  const have = new Set(W.QUESTIONS.map(q => q.id));
  seedIds.forEach(id => assert.ok(have.has(id), id));
});

test("ogni topic ha un capitolo esistente", () => {
  Object.entries(W.TOPICS).forEach(([t, o]) => assert.ok(o.cap in W.CAPITOLI, t));
});

test("nessun file dati dimenticato fuori da index.html", () => {
  assert.deepEqual(orphanDataFiles(), []);
});

test("ogni script caricato da index.html è JavaScript valido", async () => {
  const vm = await import("node:vm");
  const { readFileSync } = await import("node:fs");
  const { indexScripts, ROOT } = await import("../tools/load_data.mjs");
  for (const s of indexScripts().filter(s => !s.startsWith("vendor/"))) {
    assert.doesNotThrow(() => new vm.Script(readFileSync(`${ROOT}/${s}`, "utf8"), { filename: s }), s);
  }
});

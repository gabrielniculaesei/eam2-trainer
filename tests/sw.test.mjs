import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sw = readFileSync(join(root, "sw.js"), "utf8");
const html = readFileSync(join(root, "index.html"), "utf8");
const assets = new Set([...sw.matchAll(/^\s*"\.\/([^"]+)",?$/gm)].map(m => m[1]));

function walk(dir) {
  return readdirSync(join(root, dir)).flatMap(n => {
    const rel = dir + "/" + n;
    return statSync(join(root, rel)).isDirectory() ? walk(rel) : [rel];
  });
}

test("sw.js: ogni file locale citato da index.html è precaricato", () => {
  const refs = [...html.matchAll(/(?:src|href)="([^"#:]+)"/g)].map(m => m[1]).filter(r => !r.startsWith("//"));
  assert.ok(refs.length > 20);
  for (const r of refs) assert.ok(assets.has(r), `manca in ASSETS: ${r}`);
});

test("sw.js: ASSETS copre tutte le cartelle dell'app e punta a file esistenti", () => {
  for (const dir of ["css", "js", "data", "vendor", "img"])
    for (const f of walk(dir)) assert.ok(assets.has(f), `manca in ASSETS: ${f}`);
  for (const a of assets) assert.doesNotThrow(() => statSync(join(root, a)), `file inesistente: ${a}`);
});

// Carica i file dati come fa il browser (stesso ordine di index.html) in un
// contesto vm isolato e restituisce l'oggetto window risultante.
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/* script elencati in index.html, nell'ordine */
export function indexScripts() {
  const html = readFileSync(join(ROOT, "index.html"), "utf8");
  return [...html.matchAll(/<script[^>]*\bsrc="([^"]+)"/g)].map(m => m[1]);
}

export function dataFiles() {
  return indexScripts().filter(s => s.startsWith("data/"));
}

export function loadFiles(files, extra) {
  const ctx = vm.createContext(Object.assign({ console, URLSearchParams, setTimeout, clearTimeout }, extra || {}));
  ctx.window = ctx;
  for (const f of files) {
    vm.runInContext(readFileSync(join(ROOT, f), "utf8"), ctx, { filename: f });
  }
  return ctx;
}

export function loadData() {
  return loadFiles(dataFiles());
}

/* file presenti in data/ ma non caricati da index.html (dimenticanze) */
export function orphanDataFiles() {
  const loaded = new Set(dataFiles());
  return readdirSync(join(ROOT, "data")).filter(f => f.endsWith(".js")).map(f => "data/" + f).filter(f => !loaded.has(f));
}

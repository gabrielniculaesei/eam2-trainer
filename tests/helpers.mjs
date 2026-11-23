// Carica i moduli del browser in un contesto vm con un window finto.
import { loadFiles } from "../tools/load_data.mjs";

/* localStorage in memoria, per provare store.js */
export function memoryStorage(init) {
  const m = new Map(Object.entries(init || {}));
  return {
    getItem: k => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: k => m.delete(k),
    _map: m
  };
}

export function browser(files, extra) {
  return loadFiles(files, extra);
}

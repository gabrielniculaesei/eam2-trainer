// Esporta in tools/out/bank_chk.json tutti i controlli sympy (campo chk) di
// domande ed esercizi, per tools/check_bank.py. Uso: node tools/export_bank.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { loadData, ROOT } from "./load_data.mjs";

const W = loadData();
const out = [];
for (const q of W.QUESTIONS || []) if (q.chk) out.push({ id: q.id, chk: q.chk });
for (const e of W.ESERCIZI || []) {
  if (e.chk) out.push({ id: e.id, chk: e.chk });
  (e.stepChk || []).forEach((c, i) => out.push({ id: `${e.id}#passo${i + 1}`, chk: c }));
}
const dir = join(ROOT, "tools", "out");
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "bank_chk.json"), JSON.stringify(out, null, 1));
console.log(`export_bank: ${out.length} controlli in tools/out/bank_chk.json`);

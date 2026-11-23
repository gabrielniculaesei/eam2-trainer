// Copia KaTeX (css, js, auto-render, font woff2) da node_modules in vendor/katex.
// Uso: pnpm vendor
import { cpSync, mkdirSync, readdirSync, rmSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "node_modules", "katex", "dist");
const dst = join(root, "vendor", "katex");
if (!existsSync(src)) { console.error("KaTeX non trovato: esegui prima pnpm install"); process.exit(1); }
rmSync(dst, { recursive: true, force: true });
mkdirSync(join(dst, "fonts"), { recursive: true });
mkdirSync(join(dst, "contrib"), { recursive: true });
for (const f of ["katex.min.css", "katex.min.js"]) cpSync(join(src, f), join(dst, f));
cpSync(join(src, "contrib", "auto-render.min.js"), join(dst, "contrib", "auto-render.min.js"));
// solo woff2: tutti i browser moderni lo supportano e il CSS lo elenca per primo
let n = 0;
for (const f of readdirSync(join(src, "fonts"))) {
  if (f.endsWith(".woff2")) { cpSync(join(src, "fonts", f), join(dst, "fonts", f)); n++; }
}
console.log(`KaTeX copiato in vendor/katex (${n} font woff2)`);

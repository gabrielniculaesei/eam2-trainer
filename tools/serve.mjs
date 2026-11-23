// Server statico minimo per lo sviluppo (nessuna dipendenza). Uso: pnpm serve [porta]
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.argv[2] || process.env.PORT || 5173);
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json",
  ".woff2": "font/woff2", ".ico": "image/x-icon", ".md": "text/plain; charset=utf-8"
};
const BLOCKED = ["materiale", "node_modules", ".git"];

createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (path.endsWith("/")) path += "index.html";
    const file = normalize(join(root, path));
    const rel = file.slice(root.length + 1);
    if (!file.startsWith(root) || BLOCKED.some(b => rel === b || rel.startsWith(b + "/"))) {
      res.writeHead(403); return res.end("vietato");
    }
    const s = await stat(file);
    if (!s.isFile()) throw new Error("not file");
    res.writeHead(200, { "Content-Type": TYPES[extname(file)] || "application/octet-stream", "Cache-Control": "no-cache" });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }); res.end("non trovato");
  }
}).listen(port, () => console.log(`EAM2 Trainer su http://localhost:${port}/`));

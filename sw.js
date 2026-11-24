/* Service worker: rende il sito utilizzabile offline (es. in aereo).
   - all'installazione scarica tutti i file dell'app (circa 1,7 MB);
   - poi risponde rete-prima: se la rete c'è (e risponde in fretta) prende la
     versione nuova e aggiorna la copia, altrimenti usa quella salvata.
   Quando aggiungi o rinomini un file, aggiornalo in ASSETS (il test
   tests/sw.test.mjs controlla che index.html e ASSETS restino allineati)
   e cambia VERSION per far scartare la vecchia copia. */
const VERSION = "v1";
const CACHE = "eam2-" + VERSION;
const NET_TIMEOUT_MS = 3000; // con wifi di bordo lento meglio la copia locale

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/style.css",
  "./data/cloze.js",
  "./data/cloze_teoremi.js",
  "./data/errori.js",
  "./data/esercizi_lezioni.js",
  "./data/esercizi_tracce.js",
  "./data/generatori_integrali.js",
  "./data/generatori_ode.js",
  "./data/implicazioni.js",
  "./data/mcq_cap1_banca.js",
  "./data/mcq_cap1_seed.js",
  "./data/mcq_cap2_banca.js",
  "./data/mcq_cap2_seed.js",
  "./data/prerequisiti.js",
  "./data/teoria_cap1.js",
  "./data/teoria_cap2.js",
  "./data/teorici_banca.js",
  "./data/topics.js",
  "./data/vf.js",
  "./data/video.js",
  "./img/logo.svg",
  "./img/og.png",
  "./js/app.js",
  "./js/cas.js",
  "./js/esame.js",
  "./js/esercizi.js",
  "./js/expr.js",
  "./js/flashcard.js",
  "./js/grafici.js",
  "./js/plot.js",
  "./js/quiz.js",
  "./js/render.js",
  "./js/rng.js",
  "./js/router.js",
  "./js/stats.js",
  "./js/store.js",
  "./js/teoria.js",
  "./vendor/katex/contrib/auto-render.min.js",
  "./vendor/katex/fonts/KaTeX_AMS-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Caligraphic-Bold.woff2",
  "./vendor/katex/fonts/KaTeX_Caligraphic-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Fraktur-Bold.woff2",
  "./vendor/katex/fonts/KaTeX_Fraktur-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Main-Bold.woff2",
  "./vendor/katex/fonts/KaTeX_Main-BoldItalic.woff2",
  "./vendor/katex/fonts/KaTeX_Main-Italic.woff2",
  "./vendor/katex/fonts/KaTeX_Main-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Math-BoldItalic.woff2",
  "./vendor/katex/fonts/KaTeX_Math-Italic.woff2",
  "./vendor/katex/fonts/KaTeX_SansSerif-Bold.woff2",
  "./vendor/katex/fonts/KaTeX_SansSerif-Italic.woff2",
  "./vendor/katex/fonts/KaTeX_SansSerif-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Script-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Size1-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Size2-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Size3-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Size4-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Typewriter-Regular.woff2",
  "./vendor/katex/katex.min.css",
  "./vendor/katex/katex.min.js",
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith("eam2-") && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function networkFirst(req) {
  const cacheKey = req.mode === "navigate" ? "./index.html" : req;
  return new Promise(resolve => {
    let settled = false;
    const fromCache = () => caches.match(cacheKey, { ignoreSearch: true });
    const fallback = () => fromCache().then(hit => { if (!settled && hit) { settled = true; resolve(hit); } return hit; });
    const timer = setTimeout(fallback, NET_TIMEOUT_MS);
    fetch(req).then(res => {
      clearTimeout(timer);
      if (res.ok && res.type === "basic") {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(cacheKey, copy));
      }
      if (!settled) { settled = true; resolve(res); }
    }).catch(() => {
      clearTimeout(timer);
      fallback().then(hit => { if (!hit && !settled) { settled = true; resolve(Response.error()); } });
    });
  });
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  if (new URL(req.url).origin !== self.location.origin) return; // YouTube ecc.: solo online
  e.respondWith(networkFirst(req));
});

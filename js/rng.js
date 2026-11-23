/* PRNG con seed (mulberry32): ogni variante generata è riproducibile
   e condivisibile via URL (#/esercizi/gen-abs?seed=12345). */
(function () {
  "use strict";

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function create(seed) {
    const s = (Number(seed) >>> 0) || 1;
    const next = mulberry32(s);
    const r = {
      seed: s,
      next,
      /* intero in [a, b] estremi inclusi */
      int(a, b) { return a + Math.floor(next() * (b - a + 1)); },
      /* intero in [a, b] diverso da quelli in `not` */
      intNot(a, b, not) {
        const ex = [].concat(not);
        for (let i = 0; i < 200; i++) { const v = r.int(a, b); if (!ex.includes(v)) return v; }
        throw new Error("intNot: nessun valore disponibile");
      },
      pick(arr) { return arr[Math.floor(next() * arr.length)]; },
      sign() { return next() < 0.5 ? -1 : 1; },
      shuffle(arr) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(next() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
        return a;
      }
    };
    return r;
  }

  function randomSeed() { return 1 + Math.floor(Math.random() * 999999999); }

  /* mescolamento non riproducibile, per l'ordine delle domande nei quiz */
  function shuffle(arr) { return create(randomSeed()).shuffle(arr); }

  window.RNG = { create, randomSeed, shuffle, mulberry32 };
})();

/* Persistenza in localStorage con schema versionato.
   Chiavi: eam2_trainer_v1 (progresso) ed eam2_trainer_session (quiz o esame in corso).
   Ogni accesso è in try/catch: con storage bloccato l'app funziona, senza memoria. */
(function () {
  "use strict";

  const KEY = "eam2_trainer_v1";
  const SKEY = "eam2_trainer_session";
  const VERSION = 1;
  const DAY = 86400000;
  /* Leitner: box 1..5 -> giorni prima del prossimo ripasso */
  const SRS_DAYS = [0, 1, 3, 7, 14, 30];
  const DEFAULT_PI = "2026-12-01";

  function fresh() {
    return {
      v: VERSION,
      q: {},        // domande: id -> { a: tentativi, c: punti, last: ultimo punteggio 0..1, h: ultimi esiti "011", ts }
      cards: {},    // flashcard: id -> { a, c, box, due, last, ts }
      ex: {},       // esercizi: id -> { a, c, last, ts }
      teoria: {},   // nodi segnati come ripassati: id -> ts
      exams: [],    // storico simulazioni
      days: {},     // attività per giorno: "2026-11-23" -> risposte date
      settings: { theme: null, piDate: DEFAULT_PI }
    };
  }

  const isObj = o => o && typeof o === "object" && !Array.isArray(o);

  /* porta qualunque oggetto salvato allo schema corrente (mai lancia) */
  function migrate(o) {
    const base = fresh();
    if (!isObj(o)) return base;
    const s = Object.assign(base, o);
    for (const k of ["q", "cards", "ex", "teoria", "days"]) if (!isObj(s[k])) s[k] = {};
    if (!Array.isArray(s.exams)) s.exams = [];
    s.settings = Object.assign(fresh().settings, isObj(o.settings) ? o.settings : {});
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(s.settings.piDate))) s.settings.piDate = DEFAULT_PI;
    // (qui andranno le migrazioni da v1 a v2, quando servirà)
    s.v = VERSION;
    return s;
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? migrate(JSON.parse(raw)) : fresh();
    } catch (e) { return fresh(); }
  }

  let data = load();

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(data)); return true; } catch (e) { return false; }
  }

  function dayKey(d) {
    d = d || new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function bumpDay() { const k = dayKey(); data.days[k] = (data.days[k] || 0) + 1; }

  /* punteggio in [0, 1]: 1 = tutto giusto */
  function recordQ(id, score) {
    const s = data.q[id] || { a: 0, c: 0, h: "" };
    s.a++; s.c = Math.round((s.c + score) * 1000) / 1000;
    s.last = score; s.ts = Date.now();
    s.h = ((s.h || "") + (score >= 1 ? "1" : "0")).slice(-3);
    data.q[id] = s; bumpDay(); save();
  }

  function recordCard(id, ok) {
    const s = data.cards[id] || { a: 0, c: 0, box: 0 };
    s.a++; if (ok) s.c++;
    s.box = ok ? Math.min(5, (s.box || 0) + 1) : 1;
    s.due = Date.now() + SRS_DAYS[s.box] * DAY;
    s.last = ok ? 1 : 0; s.ts = Date.now();
    data.cards[id] = s; bumpDay(); save();
  }

  function recordEx(id, score) {
    const s = data.ex[id] || { a: 0, c: 0 };
    s.a++; s.c = Math.round((s.c + score) * 1000) / 1000; s.last = score; s.ts = Date.now();
    data.ex[id] = s; bumpDay(); save();
  }

  function setTheoryDone(id, done) {
    if (done) data.teoria[id] = Date.now(); else delete data.teoria[id];
    save();
  }

  function setting(k, v) {
    if (v === undefined) return data.settings[k];
    data.settings[k] = v; save(); return v;
  }

  /* ---------- sessioni in corso: una per tipo ("quiz", "esame") nella stessa chiave ---------- */
  function sessions() {
    try {
      const raw = localStorage.getItem(SKEY);
      const o = raw ? JSON.parse(raw) : {};
      if (o && o.kind) return { [o.kind]: o };       // formato vecchio: una sola sessione
      return isObj(o) ? o : {};
    } catch (e) { return {}; }
  }
  function getSession(kind) { const m = sessions(); return (kind ? m[kind] : m.quiz || m.esame) || null; }
  function setSession(s) {
    try { const m = sessions(); m[s.kind || "quiz"] = s; localStorage.setItem(SKEY, JSON.stringify(m)); } catch (e) { }
  }
  function clearSession(kind) {
    try {
      if (!kind) { localStorage.removeItem(SKEY); return; }
      const m = sessions(); delete m[kind];
      if (Object.keys(m).length) localStorage.setItem(SKEY, JSON.stringify(m)); else localStorage.removeItem(SKEY);
    } catch (e) { }
  }

  /* ---------- export / import / azzera ---------- */
  function exportJSON() {
    return JSON.stringify({ app: "eam2-trainer", exported: new Date().toISOString(), data }, null, 1);
  }
  function importJSON(text) {
    const o = JSON.parse(text);
    const payload = o && o.app === "eam2-trainer" ? o.data : o;
    if (!isObj(payload) || !("q" in payload || "cards" in payload || "settings" in payload)) {
      throw new Error("Il file non sembra un salvataggio di EAM2 Trainer.");
    }
    data = migrate(payload); save();
    return data;
  }
  function reset() {
    const keep = data.settings;
    data = fresh(); data.settings = keep; save(); clearSession();
  }

  window.STORE = {
    KEY, SKEY, VERSION, DAY, SRS_DAYS,
    get data() { return data; },
    fresh, migrate, save, dayKey,
    recordQ, recordCard, recordEx, setTheoryDone, setting,
    getSession, setSession, clearSession,
    exportJSON, importJSON, reset
  };
})();

/* Routing con hash: #/vista/parte?param=valore. Ogni sezione e ogni
   domanda ha un link. Le viste si registrano con ROUTER.register(nome, fn):
   fn(main, params, rest) disegna la vista e può restituire una funzione di pulizia. */
(function () {
  "use strict";

  const routes = {};
  let cleanup = null;
  let guard = null;      // { view, active(), message } per non abbandonare un esame per sbaglio
  let lastHash = "";
  let rendering = false;

  function register(name, fn) { routes[name] = fn; }

  function parse(hash) {
    const h = (hash == null ? location.hash : hash).replace(/^#\/?/, "");
    const [path, qs] = h.split("?");
    const parts = (path || "").split("/").filter(Boolean).map(decodeURIComponent);
    const params = {};
    new URLSearchParams(qs || "").forEach((v, k) => { params[k] = v; });
    return { name: parts[0] || "home", rest: parts.slice(1), params };
  }

  function href(name, params, rest) {
    let h = "#/" + (name === "home" ? "" : encodeURIComponent(name));
    if (rest && rest.length) h += "/" + rest.map(encodeURIComponent).join("/");
    const qs = new URLSearchParams();
    Object.entries(params || {}).forEach(([k, v]) => { if (v != null && v !== "") qs.set(k, v); });
    const s = qs.toString();
    return s ? h + "?" + s : h;
  }

  function go(name, params, rest) {
    const h = href(name, params, rest);
    if (location.hash === h) render(); else location.hash = h;
  }

  /* aggiorna l'URL senza ridisegnare (es. filtri scelti, seed generato) */
  function replace(name, params, rest) {
    const h = href(name, params, rest);
    try { history.replaceState(null, "", h); } catch (e) { }
    lastHash = location.hash;
  }

  function setGuard(g) { guard = g; }

  async function render() {
    if (rendering) return;
    const r = parse();
    if (guard && guard.active() && r.name !== guard.view) {
      rendering = true;
      const ok = await window.UI.confirm(guard.message || "Vuoi davvero uscire?", "esci");
      rendering = false;
      if (!ok) { try { history.replaceState(null, "", lastHash || "#/" + guard.view); } catch (e) { } return; }
      if (guard.leave) guard.leave();
      guard = null;
    }
    lastHash = location.hash;
    if (cleanup) { try { cleanup(); } catch (e) { } cleanup = null; }
    const name = routes[r.name] ? r.name : "notfound";
    const main = document.getElementById("main");
    main.innerHTML = "";
    document.querySelectorAll(".nav a").forEach(a => {
      const on = a.dataset.view === r.name;
      a.classList.toggle("active", on);
      if (on) { a.setAttribute("aria-current", "page"); a.scrollIntoView({ block: "nearest", inline: "nearest" }); }
      else a.removeAttribute("aria-current");
    });
    const out = routes[name](main, r.params, r.rest);
    if (typeof out === "function") cleanup = out;
    window.UI.typeset(main);
    window.scrollTo(0, 0);
    const h1 = main.querySelector("h1");
    document.title = (h1 && r.name !== "home" ? h1.textContent.trim() + " · " : "") + "EAM2 Trainer";
  }

  window.addEventListener("hashchange", render);

  window.ROUTER = { register, parse, href, go, replace, setGuard, start: render, refresh: render };
})();

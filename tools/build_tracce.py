"""Costruisce data/esercizi_tracce.js e data/esercizi_lezioni.js.

Per ogni esercizio calcola con sympy tutti i passaggi nello schema della docente
(primitive per tratti + continuita' + condizione; omogenea associata +
somiglianza + condizioni di Cauchy), li confronta con le soluzioni gia'
verificate a mano e con sympy (campo `atteso`) e scrive i dati.
Se un controllo fallisce lo script si ferma: il contenuto non entra.
Uso: python3 tools/build_tracce.py
"""
import json
import re as rx
import os
import sys

import sympy
from sympy import (Abs, E, I, Poly, expand_log, Rational, S, Symbol, atan, cos, diff, exp, expand, im, integrate,
                   latex, linsolve, log, nsimplify, oo, pi, re, roots, simplify, sin, sqrt, symbols, sympify)

x = Symbol("x", real=True)
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
K = symbols("k1 k2 k3 k4")
COEF = symbols("a b c d")


def L(e):
    """LaTeX nella notazione della docente (log, arctan, \cos 2x senza parentesi inutili)."""
    s = latex(e, inv_trig_style="full", ln_notation=False).replace(r"\operatorname{atan}", r"\arctan")
    out, i = "", 0
    while True:
        m = rx.search(r"\\(sin|cos|log|arctan)\{\\left\(", s[i:])
        if not m:
            out += s[i:]
            break
        a = i + m.start()
        j = i + m.end()
        depth = 1
        k = j
        while depth:
            if s.startswith(r"\left(", k):
                depth += 1; k += 6
            elif s.startswith(r"\right)", k):
                depth -= 1; k += 7
            else:
                k += 1
        inner = s[j:k - 7].strip()
        k += 1  # la graffa di chiusura
        name = m.group(1)
        if name in ("sin", "cos") and not rx.search(r"[+\-]|\\frac", inner):
            out += s[i:a] + "\\" + name + " " + inner + " "
        else:
            out += s[i:a] + "\\" + name + r"\left(" + inner + r"\right)"
        i = k
    return out.replace(r"\left(", "(").replace(r"\right)", ")")


def nice(c):
    """costante leggibile: logaritmi espansi e frazioni raccolte"""
    return nsimplify(expand_log(simplify(c), force=True)) if c.free_symbols == set() and c.has(log) else simplify(c)


def P(e):
    """Stringa per js/expr.js e per P('...') di check_bank.py."""
    return str(e)


def same(a, b):
    return simplify(expand(a - b)) == 0 or simplify(a - b) == 0


def need(cond, msg):
    if not cond:
        sys.exit("CONTROLLO FALLITO: " + msg)


def chk_deriv(F, f):
    return f"simplify(diff(P('{P(F)}'), x) - (P('{P(f)}'))) == 0"


def chk_eq(a, b):
    return f"simplify(P('{P(a)}') - (P('{P(b)}'))) == 0"


def num_dom(lo, hi):
    """intervallo numerico finito dentro (lo, hi) per i controlli in 5 punti"""
    lo_n = float(lo) if lo != -oo else None
    hi_n = float(hi) if hi != oo else None
    if lo_n is None and hi_n is None:
        return [-2.0, 2.0]
    if lo_n is None:
        return [hi_n - 3, hi_n - 0.05]
    if hi_n is None:
        return [lo_n + 0.05, lo_n + 3]
    w = hi_n - lo_n
    return [lo_n + 0.02 * w, hi_n - 0.02 * w]


def interval_tex(lo, hi):
    a = r"-\infty" if lo == -oo else L(lo)
    b = r"+\infty" if hi == oo else L(hi)
    return (r"]" if lo == -oo else "[") + a + ", " + b + (r"[" if hi == oo else "]")


# ---------------------------------------------------------------------------
# A. Primitive (con valore assoluto) e condizione F(x0) = y0
# ---------------------------------------------------------------------------
def primitiva(spec):
    f = spec["f"]
    lo, hi = spec.get("int", (-oo, oo))
    cuts = spec.get("cuts", [])
    labels = spec["labels"]
    x0, y0 = spec["x0"], spec["y0"]
    pts = [lo] + cuts + [hi]
    n = len(pts) - 1
    need(len(labels) == n, spec["id"] + ": etichette")

    def mid(i):
        a, b = pts[i], pts[i + 1]
        if a == -oo:
            return b - 1
        if b == oo:
            return a + 1
        return (a + b) / 2

    branches, prims = [], []
    for i in range(n):
        m = mid(i)
        fi = f.replace(Abs, lambda arg: arg if arg.subs(x, m) > 0 else -arg)
        fi = simplify(fi)
        # primitiva data a mano (se sympy sceglie un ramo complesso del logaritmo), sempre verificata
        Gi = spec["prims"][i] if "prims" in spec else simplify(integrate(fi, x))
        if Gi.is_polynomial(x):
            Gi = expand(Gi)
        if fi.is_polynomial(x):
            fi = expand(fi)
        need(same(diff(Gi, x), fi), spec["id"] + f": primitiva del ramo {i}")
        branches.append(fi)
        prims.append(Gi)

    steps, chks = [], []
    dom_txt = interval_tex(lo, hi)
    if n > 1:
        cases = r" \\ ".join(f"{L(branches[i])} & {labels[i]}" for i in range(n))
        steps.append(rf"**Scriviamo $f$ a tratti**, studiando il segno dell'argomento del valore assoluto: $$f(x) = \begin{{cases}} {cases} \end{{cases}}$$")
        par = lambda e: ("(" + L(e) + ")") if e.is_Add else L(e)
        pr = "; ".join(rf"per ${labels[i]}$: $\displaystyle\int {par(branches[i])}\,dx = {L(prims[i])} + k_{i+1}$" for i in range(n))
        meth = spec.get("metodo")
        steps.append(rf"**Primitive dei singoli rami**, ognuna con la sua costante{(' (' + meth + ')') if meth else ''}: {pr}.")
    else:
        meth = spec.get("metodo")
        steps.append(rf"**Primitive** di $f$ in ${dom_txt}${(' (' + meth + ')') if meth else ''}: $\displaystyle\int f(x)\,dx = {L(prims[0])} + k$.")
    for i in range(n):
        chks.append(chk_deriv(prims[i], branches[i]))

    # costanti: k_{i+1} = k_1 + d_i
    d = [S(0)]
    for i, c in enumerate(cuts):
        jump = simplify(prims[i].subs(x, c) + d[i] - prims[i + 1].subs(x, c))
        d.append(jump)
        steps.append(rf"**Continuità in $x = {L(c)}$**: $F$ è derivabile in ${dom_txt}$, quindi continua; i limiti dei due rami devono coincidere: ${L(prims[i].subs(x, c))} + k_{i+1} = {L(prims[i+1].subs(x, c))} + k_{i+2}$ {('(nel ramo di sinistra $k_' + str(i + 1) + ' = k_1 + ' + L(d[i]) + '$)') if i > 0 and d[i] != 0 else ''}, da cui $k_{i+2} = k_1 {'+' if not str(jump).startswith('-') else ''} {L(jump)}$.")
    # ramo che contiene x0 (estremi secondo le etichette: x0 sul taglio va nel ramo indicato da spec)
    j = spec.get("ramo_x0")
    if j is None:
        j = next(i for i in range(n) if (pts[i] == -oo or x0 >= pts[i]) and (pts[i + 1] == oo or x0 < pts[i + 1] or (i == n - 1 and x0 <= pts[i + 1])))
    k1v = simplify(y0 - prims[j].subs(x, x0) - d[j])
    Fs = [prims[i] + nice(k1v + d[i]) for i in range(n)]
    if n > 1:
        steps.append(rf"**Condizione** $F({L(x0)}) = {L(y0)}$: il punto $x_0 = {L(x0)}$ sta nel ramo ${labels[j]}$, quindi ${L(prims[j].subs(x, x0))} + k_{j+1} = {L(y0)}$, cioè $k_{j+1} = {L(nice(k1v + d[j]))}$" + (rf" e $k_1 = {L(nice(k1v))}$." if j else "."))
    else:
        steps.append(rf"**Condizione** $F({L(x0)}) = {L(y0)}$: ${L(prims[0].subs(x, x0))} + k = {L(y0)}$, quindi $k = {L(k1v)}$.")
    chks.append(chk_eq(Fs[j].subs(x, x0), y0))
    # confronto con la soluzione verificata
    att = spec.get("atteso")
    if att is not None:
        need(len(att) == n, spec["id"] + ": numero di rami atteso")
        for i in range(n):
            need(same(Fs[i], att[i]), f"{spec['id']}: ramo {i} diverso dall'atteso ({Fs[i]} vs {att[i]})")
            chks.append(chk_eq(Fs[i], att[i]))
    for i in range(n):
        need(same(diff(Fs[i], x), branches[i]), spec["id"] + f": derivata del ramo {i}")
    need(same(Fs[j].subs(x, x0), y0), spec["id"] + ": condizione")
    for i, c in enumerate(cuts):
        need(same(Fs[i].subs(x, c), Fs[i + 1].subs(x, c)), spec["id"] + ": continuita'")
    disp = spec.get("disp")
    if n > 1:
        cases = r" \\[1mm] ".join(f"{disp[i] if disp else L(Fs[i])} & {labels[i]}" for i in range(n))
        steps.append(rf"**Risultato**: $$F(x) = \begin{{cases}} {cases} \end{{cases}}$$ Controllo: $F({L(x0)}) = {L(y0)}$ e i rami coincidono nei punti di raccordo.")
    else:
        steps.append(rf"**Risultato**: $F(x) = {disp[0] if disp else L(Fs[0])}$.")
    fields = []
    for i in range(n):
        fields.append({"label": (f"F(x) per ${labels[i]}$" if n > 1 else "F(x)"), "kind": "expr", "expr": P(Fs[i]), "dom": num_dom(pts[i], pts[i + 1])})
    return steps, {"fields": fields}, chks


# ---------------------------------------------------------------------------
# B/C. Equazioni lineari a coefficienti costanti (somiglianza, Cauchy)
# ---------------------------------------------------------------------------
def deriv_name(k):
    return "y" + "'" * k if k <= 3 else f"y^{{({k})}}"


def eq_tex(co, rhs_tex):
    """co = [1, a1, ..., an] per y^(n) + a1 y^(n-1) + ... + an y"""
    n = len(co) - 1
    out = ""
    for i, c in enumerate(co):
        k = n - i
        if c == 0:
            continue
        term = deriv_name(k)
        if out == "":
            out = (("-" if c == -1 else "") if abs(c) == 1 else L(c)) + term
        else:
            sgn = " - " if c < 0 else " + "
            out += sgn + ("" if abs(c) == 1 else L(abs(c))) + term
    return out + " = " + rhs_tex


def char_tex(co):
    a = Symbol(r"\alpha")
    return L(sum(c * a ** (len(co) - 1 - i) for i, c in enumerate(co)))


def basis(co):
    a = Symbol("a")
    pol = sum(c * a ** (len(co) - 1 - i) for i, c in enumerate(co))
    rts = roots(Poly(pol, a))
    need(sum(rts.values()) == len(co) - 1, "radici")
    sols, desc = [], []
    for r, m in sorted(rts.items(), key=lambda t: (float(re(t[0])), float(im(t[0])))):
        if im(r) < 0:
            continue
        if im(r) == 0:
            for j in range(m):
                sols.append(x ** j * exp(r * x))
            desc.append(rf"$\alpha = {L(r)}$" + (f" (molteplicità {m})" if m > 1 else ""))
        else:
            b, g = re(r), im(r)
            for j in range(m):
                sols.append(x ** j * exp(b * x) * cos(g * x))
                sols.append(x ** j * exp(b * x) * sin(g * x))
            desc.append(rf"$\alpha = {(L(b) + ' ') if b != 0 else ''}\pm {L(g) if g != 1 else ''}i$")
    return sols, desc, rts


def Lop(co, y):
    n = len(co) - 1
    return sum(c * diff(y, x, n - i) for i, c in enumerate(co))


def particolare(co, term, rts):
    """term = (p, h, parte) con parte None, 're' o 'im'. Restituisce (ybar reale, passi)."""
    p, h, part = term
    m = Poly(p, x).degree()
    s = rts.get(h, 0)
    cs = COEF[: m + 1]
    q = sum(cs[i] * x ** (m - i) for i in range(m + 1))
    yb = exp(h * x) * x ** s * q
    eqn = expand(simplify(Lop(co, yb) / exp(h * x)))
    lhs_poly = Poly(eqn, x)
    sol = linsolve([lhs_poly.coeff_monomial(x ** k) - Poly(p, x).coeff_monomial(x ** k) for k in range(m + s + 2)], cs)
    vals = list(sol)[0]
    sub = dict(zip(cs, vals))
    ybar_c = yb.subs(sub)
    need(simplify(expand(Lop(co, ybar_c) - p * exp(h * x))) == 0, "residuo integrale particolare")
    if part is None:
        ybar = ybar_c
    else:
        bfreq = im(h)
        ybar_complex = expand(ybar_c, complex=True)
        ybar = simplify(re(ybar_complex) if part == "re" else im(ybar_complex))
        target = re(expand(p * exp(h * x), complex=True)) if part == "re" else im(expand(p * exp(h * x), complex=True))
        need(simplify(expand(Lop(co, ybar) - target)) == 0, "residuo parte reale/immaginaria")
    hs = "h = " + L(h)
    is_root = s > 0
    steps = []
    if part is not None:
        trig = r"\cos" if part == "re" else r"\sin"
        steps.append(rf"Il termine ${L(p) + ' ' if p != 1 else ''}{trig} {L(im(h)) if im(h) != 1 else ''}x$ è la **parte {'reale' if part == 're' else 'immaginaria'}** di ${L(p) if p != 1 else ''}e^{{{L(h)}x}}$: risolviamo con termine noto $e^{{{L(h)}x}}{('(' + L(p) + ')') if p != 1 else ''}$ e poi prendiamo la parte {'reale' if part == 're' else 'immaginaria'}.")
    steps.append(rf"Termine noto del tipo $e^{{hx}}p(x)$ con ${hs}$, $m = {m}$. ${L(h)}$ {'è' if is_root else 'non è'} radice dell'equazione caratteristica{(' (con molteplicità ' + str(s) + ')') if is_root else ''}, quindi $s = {s}$: si cerca $\bar y = {L(yb)}$.")
    sol_tex = ", ".join(f"{L(c)} = {L(v)}" for c, v in zip(cs, vals))
    lhs_tex = L(collect_poly(eqn))
    semp = (rf"Derivando, sostituendo e semplificando $e^{{{L(h * x)}}}$" if h != 0 else "Derivando e sostituendo")
    steps.append(semp + rf" si ottiene ${lhs_tex} = {L(p)}$; per il principio di identità dei polinomi ${sol_tex}$. Quindi $\bar y = {L(ybar_c if part is None else ybar_c)}$" + (rf", e la parte {'reale' if part == 're' else 'immaginaria'} è ${L(ybar)}$." if part else "."))
    return ybar, steps, f"simplify(expand({Lop_str(co, ybar)} - (P('{P(p * exp(h * x)) if part is None else P(re(expand(p * exp(h * x), complex=True)) if part == 're' else im(expand(p * exp(h * x), complex=True)))}')))) == 0"


def collect_poly(e):
    return Poly(e, x).as_expr()


def Lop_str(co, y):
    n = len(co) - 1
    return " + ".join(f"({c})*diff(P('{P(y)}'), x, {n - i})" for i, c in enumerate(co) if c != 0)


def lineare(spec):
    co = spec["co"]
    n = len(co) - 1
    terms = spec["rhs"]
    rhs_expr = sum((p * exp(h * x) if part is None else (re(expand(p * exp(h * x), complex=True)) if part == "re" else im(expand(p * exp(h * x), complex=True)))) for p, h, part in terms)
    rhs_expr = simplify(rhs_expr)
    sols, desc, rts = basis(co)
    steps, chks = [], []
    hom = " + ".join(f"k_{i+1}{L(s_)}" if s_ != 1 else f"k_{i+1}" for i, s_ in enumerate(sols))
    steps.append(rf"**Omogenea associata**: ${eq_tex(co, '0')}$. Equazione caratteristica ${char_tex(co)} = 0$: " + ", ".join(desc) + rf". Integrale generale dell'omogenea: ${hom}$.")
    ybar = S(0)
    if len(terms) > 1:
        steps.append(r"**Integrale particolare** per **sovrapposizione**: il termine noto è una somma, si cerca un integrale particolare per ciascun addendo e si sommano.")
    for t in terms:
        yb, st, ck = particolare(co, t, rts)
        if len(terms) == 1:
            st[0] = "**Integrale particolare** (metodo di somiglianza). " + st[0]
        steps += st
        chks.append(ck)
        ybar += yb
    ybar = simplify(ybar)
    need(simplify(expand(Lop(co, ybar) - rhs_expr)) == 0, spec["id"] + ": residuo")
    Ks = K[:n]
    y = sum(Ks[i] * sols[i] for i in range(n)) + ybar
    if terms:
        lb = L(ybar)
        tail = (" " + lb) if lb.lstrip().startswith("-") else (" + " + lb)
        steps.append(rf"**Integrale generale** della completa: $y(x) = {hom}{tail}$.")
    else:
        steps.append(rf"L'equazione è omogenea: l'integrale generale è $y(x) = {hom}$.")
    out = {"steps": steps, "chks": chks, "ybar": ybar, "sols": sols}
    if "x0" in spec:
        x0, vals = spec["x0"], spec["vals"]
        eqs = [simplify(diff(y, x, j).subs(x, x0)) - vals[j] for j in range(n)]
        solk = list(linsolve(eqs, Ks))[0]
        ysol = simplify(y.subs(dict(zip(Ks, solk))))
        conds = ", ".join(rf"${deriv_name(j)}({L(x0)}) = {L(simplify(eqs[j] + vals[j]))} = {L(vals[j])}$" for j in range(n))
        steps.append(rf"**Condizioni iniziali** (sull'integrale generale della completa): {conds}. Risolvendo il sistema: " + ", ".join(f"$k_{i+1} = {L(v)}$" for i, v in enumerate(solk)) + ".")
        for j in range(n):
            need(simplify(diff(ysol, x, j).subs(x, x0) - vals[j]) == 0, spec["id"] + f": condizione {j}")
        need(simplify(expand(Lop(co, ysol) - rhs_expr)) == 0, spec["id"] + ": residuo soluzione")
        if "atteso" in spec:
            need(same(ysol, spec["atteso"]), f"{spec['id']}: soluzione diversa dall'atteso ({ysol})")
            chks.append(chk_eq(ysol, spec["atteso"]))
        chks.append(f"simplify(expand({Lop_str(co, ysol)} - (P('{P(rhs_expr)}')))) == 0")
        disp = spec.get("disp") or L(ysol)
        steps.append(rf"**Soluzione** del problema di Cauchy: $y(x) = {disp}$.")
        out["ysol"] = ysol
    return out


def cauchy(spec):
    o = lineare(spec)
    steps, chks = o["steps"], o["chks"]
    fields = [{"label": "y(x)", "kind": "expr", "expr": P(o["ysol"]), "dom": [-1.5, 1.5] if spec["x0"] == 0 else [float(spec["x0"]) - 1, float(spec["x0"]) + 1]}]
    if "integrale" in spec:
        a, b, att = spec["integrale"]
        val = simplify(integrate(o["ysol"], (x, a, b)))
        need(same(val, att), spec["id"] + ": integrale")
        steps.append(rf"**Integrale della soluzione**: prima una primitiva, poi la formula fondamentale: $\displaystyle\int_{{{L(a)}}}^{{{L(b)}}} y(x)\,dx = {L(att)}$.")
        chks.append(chk_eq(integrate(o["ysol"], (x, a, b)), att))
        fields.append({"label": rf"$\int_{{{L(a)}}}^{{{L(b)}}} y(x)\,dx$", "kind": "number", "value": P(att)})
    return steps, {"fields": fields}, chks


def generale(spec):
    o = lineare(spec)
    co = spec["co"]
    rhs = simplify(sum((p * exp(h * x) if part is None else (re(expand(p * exp(h * x), complex=True)) if part == "re" else im(expand(p * exp(h * x), complex=True)))) for p, h, part in spec["rhs"]))
    fields = [{"label": r"un integrale particolare $\bar y(x)$", "kind": "ode", "co": [float(c) for c in co], "rhs": P(rhs), "dom": [-1.5, 1.5], "expr": P(o["ybar"])}]
    return o["steps"], {"fields": fields}, o["chks"]


def manuale(spec):
    for c in spec.get("verifica", []):
        need(eval(c, {**vars(sympy), **globals(), "x": x, "t": Symbol("t", real=True)}), spec["id"] + ": " + c)
    return spec["steps"], {"fields": spec["fields"]}, spec.get("chk", [])


# ---------------------------------------------------------------------------
# dati
# ---------------------------------------------------------------------------
R = Rational
from tracce_specs import LEZIONI, TRACCE  # noqa: E402  (stesse cartelle)


def build(specs):
    out = []
    for sp in specs:
        kind = sp["tipo"]
        fn = {"primitiva": primitiva, "cauchy": cauchy, "generale": generale, "manuale": manuale}[kind]
        steps, answer, chks = fn(sp)
        e = {"id": sp["id"], "cap": sp["cap"], "topic": sp["topic"], "src": sp["src"], "text": sp["text"],
             "steps": steps, "answer": answer, "stepChk": chks}
        for k in ("daVerificare", "nota", "diff", "esame"):
            if k in sp:
                e[k] = sp[k]
        out.append(e)
        print(f"  ok  {sp['id']}  ({len(steps)} passi, {len(chks)} controlli)")
    return out


def js_str(s):
    if ("\\" in s or "$" in s) and "`" not in s and "${" not in s:
        return "String.raw`" + s + "`"
    return json.dumps(s, ensure_ascii=False)


def js_val(v, ind=0):
    pad = " " * ind
    if isinstance(v, str):
        return js_str(v)
    if isinstance(v, bool):
        return "true" if v else "false"
    if isinstance(v, (int, float)):
        return json.dumps(v)
    if isinstance(v, list):
        if all(isinstance(t, (int, float)) for t in v):
            return "[" + ", ".join(json.dumps(t) for t in v) + "]"
        return "[\n" + ",\n".join(pad + "  " + js_val(t, ind + 2) for t in v) + "\n" + pad + "]"
    if isinstance(v, dict):
        return "{ " + (",\n" + pad + "  ").join(f"{k}: {js_val(t, ind + 2)}" for k, t in v.items()) + " }"
    raise TypeError(type(v))


def write(path, title, items):
    body = ",\n\n".join(js_val(e) for e in items)
    with open(os.path.join(ROOT, path), "w", encoding="utf-8") as f:
        f.write(f"/* {title}\n   FILE GENERATO da tools/build_tracce.py (non modificare a mano: cambia tools/tracce_specs.py).\n"
                "   Ogni passaggio e' calcolato e verificato con sympy; stepChk viene ricontrollato da pnpm verify. */\n"
                f"(window.ESERCIZI = window.ESERCIZI || []).push(\n\n{body}\n\n);\n")
    print(f"scritto {path} ({len(items)} esercizi)")


if __name__ == "__main__":
    print("Tracce d'esame:")
    write("data/esercizi_tracce.js", "Esercizi d'esame (P.I., simulazioni, appelli) dei capitoli 1 e 2, con soluzione a passi.", build(TRACCE))
    print("Esercizi delle lezioni:")
    write("data/esercizi_lezioni.js", "Esercizi svolti a lezione e nelle dispense (versione corretta dove alla lavagna c'era un errore di calcolo).", build(LEZIONI))

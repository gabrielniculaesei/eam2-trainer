"""Esegue con sympy i controlli `chk` esportati da tools/export_bank.mjs.

Ogni chk e' un'espressione Python valutata con:
    from sympy import *; x, t = symbols('x t', real=True)
e deve valere True. P('espressione') legge una stringa con frazioni esatte. Uso: python3 tools/check_bank.py [file.json]
Si puo' anche controllare una singola espressione:
    python3 tools/check_bank.py -e "integrate(x, (x, 0, 1)) == Rational(1, 2)"
"""
import json
import os
import signal
import sys

import sympy
from sympy import *  # noqa: F401,F403  (lo spazio dei nomi dei chk)

x, t = symbols("x t", real=True)
TIMEOUT = 60


class Timeout(Exception):
    pass


def _alarm(signum, frame):
    raise Timeout()


def namespace():
    ns = {k: getattr(sympy, k) for k in dir(sympy) if not k.startswith("_")}
    ns.update({"x": x, "t": t, "sympy": sympy})
    # P('...'): espressione letta con frazioni esatte e con le x, t reali di sopra
    ns["P"] = lambda s: sympy.sympify(s, locals={"x": x, "t": t, "E": sympy.E})
    return ns


def run_one(code):
    """Restituisce (ok, messaggio)."""
    ns = namespace()
    signal.signal(signal.SIGALRM, _alarm)
    signal.alarm(TIMEOUT)
    try:
        try:
            res = eval(code, ns)
        except SyntaxError:
            # piu' istruzioni: l'ultima riga deve assegnare `ok`
            exec(code, ns)
            res = ns.get("ok")
        ok = res is True or res == sympy.true
        return ok, "" if ok else f"vale {res!r}, non True"
    except Timeout:
        return False, f"oltre {TIMEOUT} s"
    except Exception as e:  # noqa: BLE001
        return False, f"{type(e).__name__}: {e}"
    finally:
        signal.alarm(0)


def main():
    if len(sys.argv) > 2 and sys.argv[1] == "-e":
        ok, msg = run_one(sys.argv[2])
        print("True" if ok else f"FALLITO: {msg}")
        sys.exit(0 if ok else 1)
    path = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), "out", "bank_chk.json")
    with open(path, encoding="utf-8") as f:
        items = json.load(f)
    failed = 0
    for it in items:
        ok, msg = run_one(it["chk"])
        if not ok:
            failed += 1
            print(f"  FALLITO  {it['id']}: {msg}\n           {it['chk']}")
    print(f"check_bank: {len(items) - failed}/{len(items)} controlli sympy veri")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()

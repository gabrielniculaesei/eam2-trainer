/* Trova l'errore: svolgimenti con un passaggio sbagliato.
   Schema: CONTRIBUTING.md. Ogni calcolo ha un campo chk (sympy) controllato da pnpm verify. */
(window.QUESTIONS = window.QUESTIONS || []).push(

{ id: "c1-err-001",
  cap: 1,
  topic: "valore_assoluto",
  type: "errore",
  diff: 2,
  src: "Lezione 15/10, es. 4 (errore di calcolo alla lavagna)",
  q: String.raw`Si cerca $F$ primitiva in $]-\infty,+\infty[$ di $f(x) = |x^2-1| + 3x^2 + x$ con $F(0) = 4$. In quale passaggio c'è un errore?`,
  steps: [
    String.raw`$f(x) = 4x^2 + x - 1$ per $x \le -1$ o $x \ge 1$; $f(x) = 2x^2 + x + 1$ per $-1 < x < 1$.`,
    String.raw`Primitive per tratti: $\frac43x^3 + \frac12x^2 - x + k_1$; $\frac23x^3 + \frac12x^2 + x + k_2$; $\frac43x^3 + \frac12x^2 - x + k_3$.`,
    String.raw`Continuità in $-1$ e in $1$: $k_2 = k_1 + \frac43$, $k_3 = k_1 + \frac83$.`,
    String.raw`$F(0) = 4$: $0 \in\, ]-1,1[$, quindi $k_1 + \frac43 = 4$, da cui $k_1 = \frac{13}{3}$.`,
    String.raw`Quindi sul ramo centrale $F(x) = \frac23x^3 + \frac12x^2 + x + \frac{17}{3}$.`
  ],
  wrong: 3,
  fix: String.raw`$k_1 = 4 - \frac43 = \frac83$, non $\frac{13}{3}$. Sul ramo centrale $F(x) = \frac23x^3 + \frac12x^2 + x + 4$ (controllo veloce: $F(0)$ è la costante del ramo che contiene $0$, e deve valere $4$).`,
  expl: String.raw`Il metodo è giusto, l'errore è di aritmetica. **Controllo rapido**: dopo aver trovato $F$, calcola $F(x_0)$ e verifica che valga $y_0$.`,
  chk: "Rational(4) - Rational(4,3) == Rational(8,3)" },

{ id: "c2-err-001",
  cap: 2,
  topic: "cauchy",
  type: "errore",
  diff: 2,
  src: "Lezione 29/10, es. 5 (errore alla lavagna)",
  q: String.raw`Si risolve il problema di Cauchy $y'' - y' = 3x + 1$, $y(1) = \frac12$, $y'(1) = -10$. In quale passaggio c'è l'errore?`,
  steps: [
    String.raw`Omogenea associata $y'' - y' = 0$, eq. caratteristica $\alpha^2 - \alpha = 0$, radici $\alpha = 0$ e $\alpha = 1$.`,
    String.raw`Integrale generale dell'omogenea: $y(x) = k_1 + k_2x$.`,
    String.raw`$f(x) = 3x + 1$: $h = 0$, $s = 1$, $m = 1$; si cerca $\bar y = x(ax + b)$.`,
    String.raw`Sostituendo: $2a - 2ax - b = 3x + 1$, quindi $a = -\frac32$, $b = -4$.`,
    String.raw`Si impongono le condizioni all'integrale generale e si ricavano $k_1, k_2$.`
  ],
  wrong: 1,
  fix: String.raw`Le radici $0$ e $1$ danno le soluzioni $e^{0x} = 1$ e $e^{x}$: l'integrale generale dell'omogenea è $k_1 + k_2e^x$ (il termine $x$ comparirebbe solo con la radice $0$ **doppia**). La soluzione corretta del PC è $y = -\frac32x^2 - 4x + 9 - 3e^{x-1}$.`,
  expl: String.raw`Errore tipico: confondere "radice nulla" con "radice doppia". Una radice $\alpha$ di molteplicità $1$ dà solo $e^{\alpha x}$.`,
  chk: "simplify(diff(-Rational(3,2)*x**2-4*x+9-3*exp(x-1),x,2) - diff(-Rational(3,2)*x**2-4*x+9-3*exp(x-1),x) - (3*x+1)) == 0" }

);

/* Capitolo 2 (equazioni differenziali): risposta multipla e più risposte giuste, dalla banca iniziale verificata.
   Schema: CONTRIBUTING.md. Ogni calcolo ha un campo chk (sympy) controllato da pnpm verify. */
(window.QUESTIONS = window.QUESTIONS || []).push(

{ id: "c2-gen-001",
  cap: 2,
  topic: "generalita",
  type: "multi",
  diff: 1,
  src: "Esempio di prova 2026/27, quesito 4",
  q: "Fra le seguenti equazioni differenziali individuare quelle lineari.",
  options: [
    String.raw`$y'' + 3(\sin x)y' - y = \log x$`,
    String.raw`$y'' + \cos y' - y^2 = 0$`,
    String.raw`$y'' - 2y' + \sqrt{y} = 2x$`,
    String.raw`$y''y' = y$`,
    String.raw`$y'' - 2x^3y' + (\tan x)y = \dfrac{1}{\log x}$`
  ],
  correct: [0, 4],
  expl: String.raw`Un'equazione è lineare se è di **primo grado** rispetto a $y, y', y''$: i coefficienti e il termine noto possono essere funzioni qualunque di $x$ ($\sin x$, $\tan x$, $\frac{1}{\log x}$ vanno bene).
  <br>B) $\cos y'$ e $y^2$ non sono di primo grado. C) $\sqrt y$. D) il prodotto $y''y'$.` },

{ id: "c2-gen-002",
  cap: 2,
  topic: "generalita",
  type: "multi",
  diff: 2,
  src: "P.I. 24/11/2023, primo turno",
  q: "Tra le seguenti equazioni differenziali individuare quelle lineari.",
  options: [
    String.raw`$y'' - 3y' = e^y$`,
    String.raw`$y'' + 3xy + y^2 = 0$`,
    String.raw`$y'' - 3xy' = e^x$`,
    String.raw`$y' + \dfrac{x^2y}{1+4x^2} = |x|\sin x$`,
    String.raw`$y' + \sin x\sin y = x^2$`,
    String.raw`$y'' = -y + x\log x$`
  ],
  correct: [2, 3, 5],
  expl: String.raw`C, D, F sono di primo grado in $y$ e nelle sue derivate (in D il coefficiente è $\frac{x^2}{1+4x^2}$ e il termine noto $|x|\sin x$: funzioni di $x$, quindi va bene; F si scrive $y'' + y = x\log x$).
  <br>A) $e^y$. B) $y^2$. E) $\sin y$.` },

{ id: "c2-gen-003",
  cap: 2,
  topic: "generalita",
  type: "mcq",
  diff: 1,
  src: "Lezione 22/10, problema di Cauchy",
  q: String.raw`Quante condizioni iniziali ha il problema di Cauchy relativo all'equazione $y''' + x^2y' - y = e^x$?`,
  options: [
    "1",
    "2",
    "3",
    "4"
  ],
  correct: 2,
  expl: String.raw`Tante condizioni quanto è l'**ordine** dell'equazione: qui l'ordine è $3$, quindi si assegnano $y(x_0)$, $y'(x_0)$, $y''(x_0)$.` },

{ id: "c2-somi-001",
  cap: 2,
  topic: "somiglianza",
  type: "mcq",
  diff: 2,
  src: "Esempio di prova 2026/27, quesito 5",
  q: String.raw`Una soluzione dell'equazione differenziale $y'' - 2y' - 3y = xe^{3x}$ è del tipo`,
  options: [
    String.raw`$y(x) = e^{3x}(ax^2 + bx)$`,
    String.raw`$y(x) = e^{3x}(ax + b)$`,
    String.raw`$y(x) = ax + b$`,
    String.raw`$y(x) = e^{ax+b}$`
  ],
  correct: 0,
  expl: String.raw`Eq. caratteristica $\alpha^2 - 2\alpha - 3 = 0$: radici $3$ e $-1$. Termine noto $e^{hx}p(x)$ con $h = 3$, $m = 1$. $h = 3$ è radice semplice, quindi $s = 1$: si cerca $\bar y = e^{3x}x(ax + b) = e^{3x}(ax^2 + bx)$.
  <br>B) È la forma con $s = 0$: sostituendola, la parte con $e^{3x}$ si annulla e non si riesce a ottenere $xe^{3x}$.`,
  chk: "solve(Poly(expand(simplify((diff(exp(3*x)*(Symbol('a')*x**2+Symbol('b')*x),x,2)-2*diff(exp(3*x)*(Symbol('a')*x**2+Symbol('b')*x),x)-3*exp(3*x)*(Symbol('a')*x**2+Symbol('b')*x))/exp(3*x)-x)),x).coeffs(),[Symbol('a'),Symbol('b')]) == {Symbol('a'): Rational(1,8), Symbol('b'): Rational(-1,16)}" },

{ id: "c2-somi-002",
  cap: 2,
  topic: "somiglianza",
  type: "mcq",
  diff: 2,
  src: "Esercizi sulle equazioni differenziali, n. 4",
  q: String.raw`Una soluzione dell'equazione differenziale $y'' - 2y' - 3y = \dfrac{x+1}{e^x}$ è del tipo`,
  options: [
    String.raw`$y(x) = e^x(ax + b)$`,
    String.raw`$y(x) = e^{-x}(ax + b)$`,
    String.raw`$y(x) = e^x(ax^2 + bx)$`,
    String.raw`$y(x) = e^{-x}(ax^2 + bx)$`
  ],
  correct: 3,
  expl: String.raw`$\frac{x+1}{e^x} = e^{-x}(x+1)$: $h = -1$, $m = 1$. Le radici dell'eq. caratteristica sono $3$ e $-1$: $h$ è radice semplice, $s = 1$. Quindi $\bar y = e^{-x}x(ax+b)$.
  <br>A, C) Esponente sbagliato: $\frac{1}{e^x} = e^{-x}$. B) Dimentica il fattore $x^s$ con $s = 1$.` },

{ id: "c2-somi-003",
  cap: 2,
  topic: "somiglianza",
  type: "mcq",
  diff: 3,
  src: "Esercizi sulle equazioni differenziali, n. 4",
  q: String.raw`Una soluzione dell'equazione differenziale $y''' - y'' - 2y' = x^2 + 3$ è del tipo`,
  options: [
    String.raw`$y(x) = ax^3 + bx^2 + cx$`,
    String.raw`$y(x) = k$`,
    String.raw`$y(x) = ax^2 + bx + c$`,
    String.raw`$y(x) = ax + b$`
  ],
  correct: 0,
  expl: String.raw`Eq. caratteristica $\alpha^3 - \alpha^2 - 2\alpha = \alpha(\alpha - 2)(\alpha + 1) = 0$. Termine noto $e^{0x}(x^2 + 3)$: $h = 0$, $m = 2$. $0$ è radice semplice, $s = 1$: $\bar y = x(ax^2 + bx + c)$.
  <br>C) È la forma con $s = 0$: manca il fattore $x$, perché nell'equazione non compare $y$ (la costante $c$ sparirebbe derivando).`,
  chk: "solve(Poly(expand(diff(x*(Symbol('a')*x**2+Symbol('b')*x+Symbol('c')),x,3)-diff(x*(Symbol('a')*x**2+Symbol('b')*x+Symbol('c')),x,2)-2*diff(x*(Symbol('a')*x**2+Symbol('b')*x+Symbol('c')),x)-(x**2+3)),x).coeffs(),[Symbol('a'),Symbol('b'),Symbol('c')]) == {Symbol('a'): Rational(-1,6), Symbol('b'): Rational(1,4), Symbol('c'): Rational(-9,4)}" },

{ id: "c2-coef-001",
  cap: 2,
  topic: "coeff_costanti",
  type: "mcq",
  diff: 1,
  src: "Esercizi sulle equazioni differenziali, n. 3 (testo corretto: nel foglio l'opzione C ha un refuso)",
  q: String.raw`La funzione $f(x) = xe^{2x}$ è soluzione della seguente equazione differenziale:`,
  options: [
    String.raw`$y' - 2y = 0$`,
    String.raw`$y'' - 2y = 0$`,
    String.raw`$y'' - 4y' + 4y = 0$`,
    String.raw`$y'' - 2y' = 0$`
  ],
  correct: 2,
  expl: String.raw`$xe^{2x}$ compare fra le soluzioni quando $2$ è radice **doppia** dell'eq. caratteristica: $(\alpha - 2)^2 = \alpha^2 - 4\alpha + 4$. Verifica: $y' = e^{2x}(2x+1)$, $y'' = e^{2x}(4x + 4)$, e $y'' - 4y' + 4y = e^{2x}(4x + 4 - 8x - 4 + 4x) = 0$.
  <br>A) ammette solo $ke^{2x}$. B) radici $\pm\sqrt2$. D) radici $0$ e $2$, soluzioni $k_1 + k_2e^{2x}$.`,
  chk: "simplify(diff(x*exp(2*x),x,2) - 4*diff(x*exp(2*x),x) + 4*x*exp(2*x)) == 0" },

{ id: "c2-coef-002",
  cap: 2,
  topic: "coeff_costanti",
  type: "mcq",
  diff: 1,
  src: "Lezione 29/10, esercizio 6",
  q: String.raw`L'integrale generale dell'equazione $y''' - 4y'' + 4y' = 0$ è`,
  options: [
    String.raw`$y(x) = k_1e^{2x} + k_2xe^{2x}$`,
    String.raw`$y(x) = k_1 + k_2e^{2x} + k_3xe^{2x}$`,
    String.raw`$y(x) = k_1 + k_2e^{2x} + k_3e^{-2x}$`,
    String.raw`$y(x) = k_1x + k_2e^{2x} + k_3xe^{2x}$`
  ],
  correct: 1,
  expl: String.raw`$\alpha^3 - 4\alpha^2 + 4\alpha = \alpha(\alpha - 2)^2 = 0$: radice $0$ semplice (dà la costante $k_1 = k_1e^{0x}$) e radice $2$ doppia (dà $e^{2x}$ e $xe^{2x}$). L'ordine è $3$, quindi servono **tre** soluzioni indipendenti.
  <br>A) Ne ha solo due. C) $-2$ non è radice. D) La radice $0$ è semplice: dà $1$, non $x$.` },

{ id: "c2-coef-003",
  cap: 2,
  topic: "coeff_costanti",
  type: "mcq",
  diff: 1,
  src: "Lezione 29/10, esercizio 10",
  q: String.raw`L'integrale generale dell'equazione $y'' + y' + 2y = 0$ è`,
  options: [
    String.raw`$y(x) = k_1e^{-\frac12x}\cos\frac{\sqrt7}{2}x + k_2e^{-\frac12x}\sin\frac{\sqrt7}{2}x$`,
    String.raw`$y(x) = k_1\cos\frac{\sqrt7}{2}x + k_2\sin\frac{\sqrt7}{2}x$`,
    String.raw`$y(x) = k_1e^{\frac{\sqrt7}{2}x}\cos\frac12x + k_2e^{\frac{\sqrt7}{2}x}\sin\frac12x$`,
    String.raw`$y(x) = k_1e^{-\frac12x} + k_2xe^{-\frac12x}$`
  ],
  correct: 0,
  expl: String.raw`$\alpha^2 + \alpha + 2 = 0$ ha $\Delta = -7 < 0$: radici $\beta \pm i\gamma$ con $\beta = -\frac12$, $\gamma = \frac{\sqrt7}{2}$. Le soluzioni sono $e^{\beta x}\cos\gamma x$ e $e^{\beta x}\sin\gamma x$.
  <br>B) Manca $e^{\beta x}$. C) Parte reale e immaginaria scambiate. D) È il caso $\Delta = 0$.`,
  chk: "simplify(diff(exp(-x/2)*cos(sqrt(7)*x/2),x,2)+diff(exp(-x/2)*cos(sqrt(7)*x/2),x)+2*exp(-x/2)*cos(sqrt(7)*x/2)) == 0" },

{ id: "c2-sincos-001",
  cap: 2,
  topic: "seno_coseno",
  type: "mcq",
  diff: 2,
  src: "Dispensa cap. 2, esempio 2 (punto 4); Lezione 03/11",
  q: String.raw`Per trovare un integrale particolare di $y'' + y = 2x\cos x$ con il metodo visto a lezione si risolve $y'' + y = 2xe^{ix}$, si trova un integrale particolare $\bar y$ e si prende`,
  options: [
    String.raw`la parte reale di $\bar y$`,
    String.raw`la parte immaginaria di $\bar y$`,
    String.raw`il modulo di $\bar y$`,
    String.raw`$\bar y + \overline{\bar y}$`
  ],
  correct: 0,
  expl: String.raw`$\cos x$ è la **parte reale** di $e^{ix} = \cos x + i\sin x$. Per la proprietà sui termini noti complessi, se $\bar y = z + iw$ risolve l'equazione con termine noto $2x\cos x + i\,2x\sin x$, allora $z$ (parte reale) risolve quella con $2x\cos x$. Con $\sin$ si prenderebbe la parte immaginaria.
  <br>Qui $h = i$ è radice ($s = 1$): si ottiene $\bar y = x(ax+b)e^{ix}$ e la parte reale è $\frac12x^2\sin x + \frac12x\cos x$.`,
  chk: "simplify(diff(x**2*sin(x)/2+x*cos(x)/2,x,2) + (x**2*sin(x)/2+x*cos(x)/2) - 2*x*cos(x)) == 0" },

{ id: "c2-struct-001",
  cap: 2,
  topic: "struttura",
  type: "mcq",
  diff: 1,
  src: "Esempio di prova 2026/27, quesito 6",
  q: String.raw`Siano: $y_1$ una soluzione dell'equazione differenziale $y'' + ay' + by = f(x)$ e $y_2$ una soluzione dell'equazione differenziale $y'' + ay' + by = g(x)$. La funzione $y(x) = y_1(x) - y_2(x)$`,
  options: [
    String.raw`è soluzione dell'equazione differenziale $y'' + ay' + by = 0$`,
    String.raw`è soluzione dell'equazione differenziale $y'' + ay' + by = f(x) - g(x)$`,
    String.raw`è soluzione dell'equazione differenziale $y'' + ay' + by = f(x)$`,
    String.raw`è soluzione dell'equazione differenziale $y'' + ay' + by = g(x)$`
  ],
  correct: 1,
  expl: String.raw`Per linearità: $y'' + ay' + by = (y_1'' + ay_1' + by_1) - (y_2'' + ay_2' + by_2) = f(x) - g(x)$ (principio di sovrapposizione con $c_1 = 1$, $c_2 = -1$).
  <br>A) Sarebbe vero solo se $f = g$ (caso "completa meno completa").` },

{ id: "c2-primo-001",
  cap: 2,
  topic: "primo_ordine",
  type: "mcq",
  diff: 1,
  src: "Lezione 22/10, esempio 1",
  q: String.raw`L'integrale generale dell'equazione omogenea $y' + (\sin x)y = 0$ è`,
  options: [
    String.raw`$y(x) = ke^{-\cos x}$, $k \in \mathbb{R}$`,
    String.raw`$y(x) = e^{\cos x} + k$, $k \in \mathbb{R}$`,
    String.raw`$y(x) = ke^{\cos x}$, $k > 0$`,
    String.raw`$y(x) = ke^{\cos x}$, $k \in \mathbb{R}$`
  ],
  correct: 3,
  expl: String.raw`Con $a(x) = \sin x$ una primitiva è $A(x) = -\cos x$, e l'integrale generale dell'omogenea è $ke^{-A(x)} = ke^{\cos x}$.
  <br>A) Segno di $A$ sbagliato. B) La costante moltiplica, non si somma. C) $k$ è un qualunque reale: $k = 0$ dà la soluzione nulla, $k < 0$ soluzioni negative.`,
  chk: "simplify(diff(exp(cos(x)),x) + sin(x)*exp(cos(x))) == 0" },

{ id: "c2-malthus-001",
  cap: 2,
  topic: "malthus",
  type: "mcq",
  diff: 1,
  src: "Lezione 27/10, modello di Malthus",
  q: String.raw`Nel modello di Malthus $N'(t) = \varepsilon N(t)$, $N(0) = N_0$, con potenziale biologico $\varepsilon < 0$ si ha`,
  options: [
    String.raw`$N(t) = N_0 + \varepsilon t$`,
    String.raw`$N(t) = N_0e^{\varepsilon t}$ e $\lim_{t\to+\infty}N(t) = +\infty$`,
    String.raw`$N(t) = e^{\varepsilon t} + N_0$`,
    String.raw`$N(t) = N_0e^{\varepsilon t}$ e $\lim_{t\to+\infty}N(t) = 0$`
  ],
  correct: 3,
  expl: String.raw`È l'equazione lineare omogenea $y' - \varepsilon y = 0$: $N(t) = ke^{\varepsilon t}$ e $N(0) = N_0$ dà $k = N_0$. Con $\varepsilon < 0$ l'esponenziale tende a $0$: la popolazione si estingue.` }

);

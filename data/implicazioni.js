/* Implicazioni: quale è vera, dimostrazione e controesempio per l'altra.
   Schema: CONTRIBUTING.md. Ogni calcolo ha un campo chk (sympy) controllato da pnpm verify. */
(window.QUESTIONS = window.QUESTIONS || []).push(

{ id: "c1-impl-001",
  cap: 1,
  topic: "primitive",
  type: "impl",
  diff: 2,
  src: "Stile docente (implicazione + controesempio); Lezione 13/10",
  q: String.raw`Sia $f : (a,b) \to \mathbb{R}$. Dire quale delle seguenti implicazioni è vera e provare con un controesempio che l'altra è falsa.
  <br>i) se $f$ è continua in $(a,b)$, allora $f$ è dotata di primitive in $(a,b)$
  <br>ii) se $f$ è dotata di primitive in $(a,b)$, allora $f$ è continua in $(a,b)$`,
  options: [
    "i) è vera, ii) è falsa",
    "ii) è vera, i) è falsa"
  ],
  correct: 0,
  dim: String.raw`i) è il **teorema fondamentale del calcolo integrale**: se $f$ è continua, la funzione integrale $\int_{x_0}^x f(t)\,dt$ è derivabile con derivata $f$ (teorema di derivazione della funzione integrale), quindi è una primitiva.`,
  controesempio: String.raw`$f(x) = 2x\sin\frac1x - \cos\frac1x$ per $x \ne 0$, $f(0) = 0$. Non è continua in $0$ (non esiste $\lim_{x\to0}\cos\frac1x$), ma $F(x) = x^2\sin\frac1x$, $F(0) = 0$, è una primitiva in $\mathbb{R}$: per $x \ne 0$ si deriva, in $0$ il rapporto incrementale è $x\sin\frac1x \to 0 = f(0)$.`,
  expl: "La continuità è condizione **sufficiente**, non necessaria, per avere primitive.",
  chk: "simplify(diff(x**2*sin(1/x),x) - (2*x*sin(1/x) - cos(1/x))) == 0" },

{ id: "c1-impl-002",
  cap: 1,
  topic: "proprieta",
  type: "impl",
  diff: 1,
  src: "Stile docente; monotonia (Lezione 06/10)",
  q: String.raw`Sia $f$ continua in $[a,b]$. Dire quale delle seguenti implicazioni è vera e provare con un controesempio che l'altra è falsa.
  <br>i) se $\int_a^b f(x)\,dx \ge 0$, allora $f(x) \ge 0$ per ogni $x \in [a,b]$
  <br>ii) se $f(x) \ge 0$ per ogni $x \in [a,b]$, allora $\int_a^b f(x)\,dx \ge 0$`,
  options: [
    "i) è vera, ii) è falsa",
    "ii) è vera, i) è falsa"
  ],
  correct: 1,
  dim: String.raw`ii) è la prima proprietà di monotonia: per ogni decomposizione $D$ i minimi $m_i$ sono $\ge 0$, quindi $0 \le s(f,D) \le \int_a^b f(x)\,dx$.`,
  controesempio: String.raw`$f(x) = x$ in $[-1,2]$: $\int_{-1}^2 x\,dx = \frac32 \ge 0$, ma $f(-1) = -1 < 0$.`,
  expl: "L'integrale \"media\" i valori: valori negativi possono essere compensati da valori positivi.",
  chk: "integrate(x,(x,-1,2)) == Rational(3,2)" },

{ id: "c2-impl-001",
  cap: 2,
  topic: "wronskiano",
  type: "impl",
  diff: 2,
  src: "Stile docente; Lezione 27/10",
  q: String.raw`Siano $y_1, y_2$ due funzioni derivabili in $(\alpha,\beta)$ e $W = y_1y_2' - y_2y_1'$. Dire quale delle seguenti implicazioni è vera e provare con un controesempio che l'altra è falsa.
  <br>i) se $y_1, y_2$ sono soluzioni di $y'' + a_1(x)y' + a_2(x)y = 0$ ($a_1, a_2$ continue) e $W(x_0) = 0$ per un $x_0$, allora $W \equiv 0$
  <br>ii) per due funzioni derivabili qualsiasi, se $W(x_0) = 0$ per un $x_0$, allora $W \equiv 0$`,
  options: [
    "i) è vera, ii) è falsa",
    "ii) è vera, i) è falsa"
  ],
  correct: 0,
  dim: String.raw`i) Per soluzioni dell'equazione, $W' = -a_1W$, quindi $W = ke^{-A_1(x)}$: se si annulla in un punto è $k = 0$, cioè $W \equiv 0$.`,
  controesempio: String.raw`$y_1 = x$, $y_2 = x^2$ in $\mathbb{R}$: $W = x\cdot 2x - x^2\cdot 1 = x^2$, che si annulla in $0$ ma non altrove. (Non sono soluzioni di una stessa equazione lineare del secondo ordine a coefficienti continui in un intervallo che contiene $0$.)`,
  expl: "La proprietà \"nullo ovunque o mai nullo\" vale **per le soluzioni** dell'equazione, non per funzioni qualsiasi.",
  chk: "simplify(x*diff(x**2,x) - x**2*diff(x,x) - x**2) == 0" }

);

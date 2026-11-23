/* Implicazioni con controesempio, "trova l'errore" e batterie vero/falso.
   Schema: CONTRIBUTING.md. Ogni calcolo ha un campo chk (sympy) controllato da pnpm verify. */
(window.QUESTIONS = window.QUESTIONS || []).push(

/* ---------------- implicazioni ---------------- */

{ id: "c1-impl-003",
  cap: 1,
  topic: "proprieta",
  type: "impl",
  diff: 2,
  src: "Stile docente (implicazione + controesempio); monotonia e permanenza del segno",
  q: String.raw`Sia $f$ continua in $[a,b]$. Dire quale delle seguenti implicazioni è vera e provare con un controesempio che l'altra è falsa.
  <br>i) se $f(x) \ge 0$ per ogni $x \in [a,b]$ e $\int_a^b f(x)\,dx = 0$, allora $f(x) = 0$ per ogni $x \in [a,b]$
  <br>ii) se $\int_a^b f(x)\,dx = 0$, allora $f(x) = 0$ per ogni $x \in [a,b]$`,
  options: [
    "i) è vera, ii) è falsa",
    "ii) è vera, i) è falsa"
  ],
  correct: 0,
  dim: String.raw`Per assurdo sia $f(x_0) > 0$ in un punto $x_0$. Per la **permanenza del segno** (f continua) esiste un intervallo $[\alpha,\beta] \subseteq [a,b]$, con $\alpha < \beta$, in cui $f(x) > \frac{f(x_0)}{2}$. Per l'additività e la monotonia ($f \ge 0$ fuori da $[\alpha,\beta]$):
  $$\int_a^b f(x)\,dx \ge \int_\alpha^\beta f(x)\,dx \ge \frac{f(x_0)}{2}(\beta - \alpha) > 0,$$
  contro l'ipotesi.`,
  controesempio: String.raw`$f(x) = x$ in $[-1,1]$: $\int_{-1}^1 x\,dx = 0$, ma $f(1) = 1 \ne 0$. Le parti positive e negative si compensano.`,
  expl: String.raw`Il segno costante è essenziale: senza $f \ge 0$ l'integrale nullo può venire da una **compensazione** fra aree positive e negative.`,
  chk: "integrate(x, (x, -1, 1)) == 0" },

{ id: "c1-impl-004",
  cap: 1,
  topic: "riemann",
  type: "impl",
  diff: 2,
  src: "Stile docente; integrabilità delle funzioni continue",
  q: String.raw`Sia $f : [a,b] \to \mathbb{R}$ limitata. Dire quale delle seguenti implicazioni è vera e provare con un controesempio che l'altra è falsa.
  <br>i) se $f$ è integrabile secondo Riemann in $[a,b]$, allora $f$ è continua in $[a,b]$
  <br>ii) se $f$ è continua in $[a,b]$, allora $f$ è integrabile secondo Riemann in $[a,b]$`,
  options: [
    "i) è vera, ii) è falsa",
    "ii) è vera, i) è falsa"
  ],
  correct: 1,
  dim: String.raw`ii) è il teorema di integrabilità delle funzioni continue: per **Heine-Cantor** $f$ è uniformemente continua, quindi per ogni $\varepsilon > 0$ esiste una decomposizione $D$ con $S(f,D) - s(f,D) < \varepsilon$. Le somme inferiori e superiori sono allora **contigue** e l'elemento di separazione è unico.`,
  controesempio: String.raw`$f(x) = 0$ per $0 \le x < 1$, $f(x) = 1$ per $1 \le x \le 2$. Non è continua in $1$, ma è integrabile: per $D = \{0; 1 - \delta; 1; 2\}$ le somme differiscono solo sull'intervallo $[1-\delta, 1]$, dove $M_i - m_i = 1$, quindi $S(f,D) - s(f,D) = \delta$, piccolo quanto si vuole. L'integrale vale $1$.`,
  expl: "La continuità è condizione **sufficiente** per l'integrabilità, non necessaria: un salto non impedisce di avvicinare le somme." },

{ id: "c1-impl-005",
  cap: 1,
  topic: "funzione_integrale",
  type: "impl",
  diff: 3,
  src: "Stile docente; teorema di derivazione della funzione integrale",
  q: String.raw`Sia $f$ integrabile in ogni intervallo chiuso e limitato di $\mathbb{R}$ e $F(x) = \int_0^x f(t)\,dt$. Dire quale delle seguenti implicazioni è vera e provare con un controesempio che l'altra è falsa.
  <br>i) se $f$ è continua in $\mathbb{R}$, allora $F$ è derivabile in $\mathbb{R}$ e $F' = f$
  <br>ii) se $F$ è derivabile in $\mathbb{R}$, allora $f$ è continua in $\mathbb{R}$`,
  options: [
    "i) è vera, ii) è falsa",
    "ii) è vera, i) è falsa"
  ],
  correct: 0,
  dim: String.raw`i) è il **teorema di derivazione della funzione integrale**: il rapporto incrementale $\frac{F(x+h) - F(x)}{h} = \frac1h\int_x^{x+h} f(t)\,dt$ è, per il teorema della media, uguale a $f(c_h)$ con $c_h$ fra $x$ e $x+h$; per $h \to 0$ si ha $c_h \to x$ e, per la continuità, $f(c_h) \to f(x)$.`,
  controesempio: String.raw`$f(x) = 2x\sin\frac1x - \cos\frac1x$ per $x \ne 0$, $f(0) = 0$: è limitata vicino a $0$ e ha una sola discontinuità, quindi è integrabile, e $F(x) = x^2\sin\frac1x$ (con $F(0) = 0$) è derivabile in tutto $\mathbb{R}$. Ma $f$ non è continua in $0$, perché $\cos\frac1x$ non ha limite.`,
  expl: "La continuità della funzione integranda è un'ipotesi del teorema, non una conseguenza della derivabilità della funzione integrale.",
  chk: "simplify(diff(x**2*sin(1/x), x) - (2*x*sin(1/x) - cos(1/x))) == 0" },

{ id: "c2-impl-002",
  cap: 2,
  topic: "wronskiano",
  type: "impl",
  diff: 2,
  src: "Stile docente; Wronskiano e indipendenza",
  q: String.raw`Siano $y_1$, $y_2$ funzioni derivabili nell'intervallo $I$ e $W$ il loro Wronskiano. Dire quale delle seguenti implicazioni è vera e provare con un controesempio che l'altra è falsa.
  <br>i) se $W(x_0) \ne 0$ in un punto $x_0 \in I$, allora $y_1$ e $y_2$ sono linearmente indipendenti in $I$
  <br>ii) se $y_1$ e $y_2$ sono linearmente indipendenti in $I$, allora $W(x) \ne 0$ per ogni $x \in I$`,
  options: [
    "i) è vera, ii) è falsa",
    "ii) è vera, i) è falsa"
  ],
  correct: 0,
  dim: String.raw`Per assurdo siano dipendenti: esistono $(c_1, c_2) \ne (0,0)$ con $c_1y_1 + c_2y_2 = 0$ in $I$. Derivando, $c_1y_1' + c_2y_2' = 0$. In $x_0$ il sistema lineare omogeneo nelle incognite $c_1, c_2$ ha una soluzione non nulla, quindi il suo determinante $W(x_0)$ è $0$: **assurdo**.`,
  controesempio: String.raw`$y_1 = x$, $y_2 = x^2$ in $\mathbb{R}$: sono indipendenti (non sono proporzionali), ma $W(x) = x\cdot 2x - x^2 = x^2$ si annulla in $0$. Non c'è contraddizione con il teorema sul Wronskiano, che vale per **soluzioni** di una stessa omogenea.`,
  expl: String.raw`$W \ne 0$ in un punto basta per l'indipendenza di funzioni qualsiasi; il viceversa vale solo per le soluzioni di un'omogenea $y'' + a(x)y' + b(x)y = 0$.`,
  chk: "simplify(x*diff(x**2, x) - x**2*diff(x, x) - x**2) == 0" },

{ id: "c2-impl-003",
  cap: 2,
  topic: "struttura",
  type: "impl",
  diff: 1,
  src: "Stile docente; struttura delle soluzioni",
  q: String.raw`Si considerano l'equazione $y'' + a(x)y' + b(x)y = f(x)$, con $f$ non identicamente nulla, e la sua omogenea associata. Dire quale delle seguenti implicazioni è vera e provare con un controesempio che l'altra è falsa.
  <br>i) se $y_1 - y_2$ è soluzione dell'omogenea associata, allora $y_1$ e $y_2$ sono soluzioni dell'equazione completa
  <br>ii) se $y_1$ e $y_2$ sono soluzioni dell'equazione completa, allora $y_1 - y_2$ è soluzione dell'omogenea associata`,
  options: [
    "i) è vera, ii) è falsa",
    "ii) è vera, i) è falsa"
  ],
  correct: 1,
  dim: String.raw`Detto $L(y) = y'' + a(x)y' + b(x)y$, l'operatore $L$ è **lineare**: $L(y_1 - y_2) = L(y_1) - L(y_2) = f - f = 0$.`,
  controesempio: String.raw`$y_1 = y_2 = 0$: la differenza è la funzione nulla, che risolve l'omogenea, ma $L(0) = 0 \ne f$, quindi $y_1$ e $y_2$ non risolvono la completa.`,
  expl: "Sapere che la differenza risolve l'omogenea dice solo che $y_1$ e $y_2$ risolvono la **stessa** equazione $L(y) = g$, non quale." },

/* ---------------- trova l'errore ---------------- */

{ id: "c1-err-002",
  cap: 1,
  topic: "parti",
  type: "errore",
  diff: 2,
  src: "Lezione 3 (errore di calcolo alla lavagna)",
  q: String.raw`Si calcola $\int x^4e^x\,dx$ integrando più volte per parti. In quale passaggio c'è un errore?`,
  steps: [
    String.raw`FF $= x^4$, FD $= e^x\,dx$: $\int x^4e^x\,dx = x^4e^x - 4\int x^3e^x\,dx$.`,
    String.raw`Allo stesso modo $\int x^3e^x\,dx = x^3e^x - 3\int x^2e^x\,dx$ e $\int x^2e^x\,dx = e^x(x^2 - 2x + 2) + k$.`,
    String.raw`Quindi $\int x^3e^x\,dx = e^x(x^3 - 3x^2 + 6x - 6) + k$.`,
    String.raw`In conclusione $\int x^4e^x\,dx = e^x(x^4 - 4x^3 + 24x - 24) + k$.`
  ],
  wrong: 3,
  fix: String.raw`$x^4 - 4(x^3 - 3x^2 + 6x - 6) = x^4 - 4x^3 + 12x^2 - 24x + 24$: manca il termine $12x^2$. Il risultato è $e^x(x^4 - 4x^3 + 12x^2 - 24x + 24) + k$.`,
  expl: String.raw`Controllo veloce: derivando $e^x\,p(x)$ si ottiene $e^x(p + p')$, che deve essere $x^4e^x$. Con il termine mancante $p + p'$ contiene $-12x^2$.`,
  chk: "simplify(diff(exp(x)*(x**4 - 4*x**3 + 12*x**2 - 24*x + 24), x) - x**4*exp(x)) == 0 and simplify(diff(exp(x)*(x**4 - 4*x**3 + 24*x - 24), x) - x**4*exp(x)) != 0" },

{ id: "c1-err-003",
  cap: 1,
  topic: "definiti",
  type: "errore",
  diff: 1,
  src: "Errore tipico negli integrali definiti",
  q: String.raw`Si calcola $\int_0^2 x\,e^{x^2}\,dx$. In quale passaggio c'è un errore?`,
  steps: [
    String.raw`Prima la primitiva, con la prima formula di sostituzione ($g(x) = x^2$, $g'(x) = 2x$).`,
    String.raw`$\int x\,e^{x^2}\,dx = \frac12\left[\int e^t\,dt\right]_{t = x^2} = \frac12e^{x^2} + k$.`,
    String.raw`Formula fondamentale: $\int_0^2 x\,e^{x^2}\,dx = \left[\frac12e^{x^2}\right]_0^2 = \frac12e^4$.`
  ],
  wrong: 2,
  fix: String.raw`In $0$ la primitiva vale $\frac12e^0 = \frac12$, non $0$: il risultato è $\frac12e^4 - \frac12 = \frac{e^4 - 1}{2}$.`,
  expl: String.raw`Si sottrae **sempre** il valore nell'estremo inferiore: $e^0 = 1$.`,
  chk: "integrate(x*exp(x**2), (x, 0, 2)) == (exp(4) - 1)/2" },

{ id: "c1-err-004",
  cap: 1,
  topic: "razionali",
  type: "errore",
  diff: 2,
  src: "Errore tipico nelle funzioni razionali (fattore davanti all'arcotangente)",
  q: String.raw`Si calcola $\displaystyle\int \frac{dx}{x^2 + 4x + 8}$. In quale passaggio c'è un errore?`,
  steps: [
    String.raw`Il denominatore ha $\Delta = 16 - 32 < 0$: si completa il quadrato.`,
    String.raw`$x^2 + 4x + 8 = (x + 2)^2 + 4 = (x+2)^2 + 2^2$.`,
    String.raw`Con la sostituzione $t = x + 2$ l'integrale diventa $\left[\int \frac{dt}{t^2 + 2^2}\right]_{t = x+2}$.`,
    String.raw`Quindi $\int \frac{dx}{x^2 + 4x + 8} = \arctan\frac{x+2}{2} + k$.`
  ],
  wrong: 3,
  fix: String.raw`$\int \frac{dt}{t^2 + \gamma^2} = \frac1\gamma\arctan\frac t\gamma + k$: manca il fattore $\frac12$. Il risultato è $\frac12\arctan\frac{x+2}{2} + k$.`,
  expl: String.raw`Derivando $\arctan\frac{x+2}{2}$ si ottiene $\frac{1/2}{1 + \frac{(x+2)^2}{4}} = \frac{2}{x^2 + 4x + 8}$: il doppio dell'integranda.`,
  chk: "simplify(diff(atan((x + 2)/2)/2, x) - 1/(x**2 + 4*x + 8)) == 0" },

{ id: "c2-err-002",
  cap: 2,
  topic: "somiglianza",
  type: "errore",
  diff: 2,
  src: "Lezione 8 (errore di calcolo alla lavagna)",
  q: String.raw`Si cerca un integrale particolare di $y'' + 5y' + 4y = x\,e^{-x}$. In quale passaggio c'è un errore?`,
  steps: [
    String.raw`Eq. caratteristica $\alpha^2 + 5\alpha + 4 = (\alpha + 1)(\alpha + 4) = 0$: radici $-1$ e $-4$.`,
    String.raw`$h = -1$ è radice semplice, $s = 1$, $m = 1$: si cerca $\bar y = x(ax + b)\,e^{-x}$.`,
    String.raw`Sostituendo nell'equazione si ottiene $(6ax + 2a + 3b)\,e^{-x} = x\,e^{-x}$.`,
    String.raw`Uguagliando i coefficienti: $6a = 1$, $2a + 3b = 0$, quindi $a = \frac16$ e $b = \frac19$.`
  ],
  wrong: 3,
  fix: String.raw`Da $2a + 3b = 0$ con $a = \frac16$ si ha $3b = -\frac13$, cioè $b = -\frac19$. L'integrale particolare è $\bar y = x\left(\frac x6 - \frac19\right)e^{-x}$.`,
  expl: "Il metodo è giusto, l'errore è di segno. Controllo: sostituisci $\\bar y$ e verifica che resti $xe^{-x}$.",
  chk: "simplify(diff(x*(x/6 - Rational(1, 9))*exp(-x), x, 2) + 5*diff(x*(x/6 - Rational(1, 9))*exp(-x), x) + 4*x*(x/6 - Rational(1, 9))*exp(-x) - x*exp(-x)) == 0" },

{ id: "c2-err-003",
  cap: 2,
  topic: "seno_coseno",
  type: "errore",
  diff: 2,
  src: "Lezione 9 (errore alla lavagna sull'omogenea)",
  q: String.raw`Si cerca l'integrale generale di $y'' + y = \cos 2x + \sin x$. In quale passaggio c'è un errore?`,
  steps: [
    String.raw`Eq. caratteristica $\alpha^2 + 1 = 0$: radici $\pm i$.`,
    String.raw`Integrale generale dell'omogenea: $y = \cos x + i\sin x$.`,
    String.raw`Sovrapposizione: per $\cos 2x$ ($h = 2i$, non radice, $s = 0$) si trova $\bar y_1 = -\frac13\cos 2x$.`,
    String.raw`Per $\sin x$ ($h = i$, radice semplice, $s = 1$) si trova $\bar y_2 = -\frac x2\cos x$.`
  ],
  wrong: 1,
  fix: String.raw`Le radici $\pm i$ ($\beta = 0$, $\gamma = 1$) danno le soluzioni reali indipendenti $\cos x$ e $\sin x$: l'integrale generale dell'omogenea è $k_1\cos x + k_2\sin x$. Quello della completa è $y = k_1\cos x + k_2\sin x - \frac13\cos 2x - \frac x2\cos x$.`,
  expl: String.raw`$\cos x + i\sin x = e^{ix}$ è **una** soluzione complessa, non l'integrale generale (che è un insieme di funzioni reali con due costanti).`,
  chk: "(lambda y: simplify(diff(y, x, 2) + y - cos(2*x) - sin(x)) == 0)(Symbol('k1')*cos(x) + Symbol('k2')*sin(x) - cos(2*x)/3 - x*cos(x)/2)" },

{ id: "c2-err-004",
  cap: 2,
  topic: "primo_ordine",
  type: "errore",
  diff: 1,
  src: "Errore tipico nel primo ordine (segno di A)",
  q: String.raw`Si cerca l'integrale generale di $y' + 2xy = x$. In quale passaggio c'è un errore?`,
  steps: [
    String.raw`$a(x) = 2x$, una primitiva è $A(x) = x^2$.`,
    String.raw`Integrale generale dell'omogenea: $y = k\,e^{x^2}$.`,
    String.raw`Variazione della costante: $k'(x) = x\,e^{-x^2}$, quindi $k(x) = -\frac12e^{-x^2}$.`,
    String.raw`Integrale particolare $-\frac12e^{-x^2}e^{x^2} = -\frac12$, quindi $y = k\,e^{x^2} - \frac12$.`
  ],
  wrong: 1,
  fix: String.raw`L'omogenea $y' + a(x)y = 0$ ha integrale generale $k\,e^{-A(x)} = k\,e^{-x^2}$. Con la variazione della costante $k'(x) = x\,e^{x^2}$, $k(x) = \frac12e^{x^2}$, e l'integrale generale è $y = k\,e^{-x^2} + \frac12$.`,
  expl: String.raw`Controllo rapido: $y = -\frac12$ non risolve l'equazione ($0 - x \ne x$), mentre $y = \frac12$ sì.`,
  chk: "simplify(diff(Symbol('k')*exp(-x**2) + Rational(1, 2), x) + 2*x*(Symbol('k')*exp(-x**2) + Rational(1, 2)) - x) == 0" },

/* ---------------- vero o falso ---------------- */

{ id: "c1-vf-003",
  cap: 1,
  topic: "funzione_integrale",
  type: "vf",
  diff: 2,
  src: "Stile docente (affermazioni a), b), c)...)",
  q: String.raw`Sia $f$ continua in $\mathbb{R}$ e $F(x) = \int_0^x f(t)\,dt$. Per ciascuna delle seguenti affermazioni dire se è vera o falsa.`,
  items: [
    { s: String.raw`a) $F$ è derivabile in $\mathbb{R}$ e $F'(x) = f(x)$`,
      v: true,
      why: "È il teorema di derivazione della funzione integrale ($f$ è continua)." },
    { s: String.raw`b) $F(0) = 0$`,
      v: true,
      why: String.raw`$F(0) = \int_0^0 f(t)\,dt = 0$ per definizione.` },
    { s: String.raw`c) se $f(x) \ge 0$ per ogni $x$, allora $F$ è crescente`,
      v: true,
      why: String.raw`$F' = f \ge 0$ in un intervallo.` },
    { s: String.raw`d) se $f$ è pari, allora $F$ è pari`,
      v: false,
      why: String.raw`Con $t = -s$: $F(-x) = \int_0^{-x} f(t)\,dt = -\int_0^x f(-s)\,ds = -F(x)$. Se $f$ è pari, $F$ è **dispari** (es. $f = 1$, $F = x$).` },
    { s: String.raw`e) $\int_0^{x^2} f(t)\,dt$ ha derivata $f(x^2)$`,
      v: false,
      why: String.raw`È $F(x^2)$: la derivata è $f(x^2)\cdot 2x$.` },
    { s: String.raw`f) detta $G(x) = \int_1^x f(t)\,dt$, si ha $F(x) - G(x) = \int_0^1 f(t)\,dt$ per ogni $x$`,
      v: true,
      why: String.raw`Per l'additività $F(x) = \int_0^1 f + \int_1^x f = \int_0^1 f + G(x)$.` }
  ],
  expl: "Due funzioni integrali della stessa $f$ differiscono per una costante; la derivata con un estremo composto richiede la derivata della funzione composta.",
  chk: "simplify(diff(Integral(cos(t), (t, 0, x**2)), x) - 2*x*cos(x**2)) == 0" },

{ id: "c1-vf-004",
  cap: 1,
  topic: "indefinito",
  type: "vf",
  diff: 1,
  src: "Stile docente (affermazioni a), b), c)...)",
  q: "Per ciascuna delle seguenti affermazioni dire se è vera o falsa (le funzioni sono derivabili con derivata continua dove serve).",
  items: [
    { s: String.raw`a) $\int f(g(x))\,g'(x)\,dx = \left[\int f(t)\,dt\right]_{t=g(x)}$`,
      v: true,
      why: "È la prima formula di integrazione per sostituzione." },
    { s: String.raw`b) $\int f'(x)\,g(x)\,dx = f(x)g(x) - \int f(x)\,g'(x)\,dx$`,
      v: true,
      why: String.raw`È la formula di integrazione per parti con FF $= g$ e FD $= f'(x)\,dx$.` },
    { s: String.raw`c) $\int f(x)g(x)\,dx = \int f(x)\,dx \cdot \int g(x)\,dx$`,
      v: false,
      why: String.raw`Falso: per esempio $\int x\cdot x\,dx = \frac{x^3}{3} + k$, mentre $\frac{x^2}{2}\cdot\frac{x^2}{2} = \frac{x^4}{4}$.` },
    { s: String.raw`d) $\int \frac{dx}{x^2 + 9} = \frac13\arctan\frac x3 + k$`,
      v: true,
      why: String.raw`$\int\frac{dx}{x^2 + \gamma^2} = \frac1\gamma\arctan\frac x\gamma + k$ con $\gamma = 3$.` },
    { s: String.raw`e) in $\mathbb{R}\setminus\{0\}$ si ha $\int \frac{dx}{x} = \log x + k$`,
      v: false,
      why: String.raw`$\log x$ non è definito per $x < 0$: serve $\log|x|$ (e in $\mathbb{R}\setminus\{0\}$, che non è un intervallo, le costanti possono essere diverse sulle due semirette).` },
    { s: String.raw`f) $\int e^{3x}\,dx = 3e^{3x} + k$`,
      v: false,
      why: String.raw`$D(3e^{3x}) = 9e^{3x}$. Il risultato giusto è $\frac13e^{3x} + k$.` }
  ],
  expl: "Prima di rispondere, **deriva** il secondo membro: è il controllo più rapido per un integrale indefinito.",
  chk: "simplify(diff(atan(x/3)/3, x) - 1/(x**2 + 9)) == 0 and simplify(diff(exp(3*x)/3, x) - exp(3*x)) == 0" },

{ id: "c2-vf-003",
  cap: 2,
  topic: "somiglianza",
  type: "vf",
  diff: 2,
  src: "Stile docente (affermazioni a), b), c)...)",
  q: String.raw`Si considera l'equazione $y'' - 4y' + 4y = f(x)$. Per ciascuna delle seguenti affermazioni dire se è vera o falsa.`,
  items: [
    { s: "a) l'equazione caratteristica ha la radice doppia $2$",
      v: true,
      why: String.raw`$\alpha^2 - 4\alpha + 4 = (\alpha - 2)^2$.` },
    { s: String.raw`b) l'integrale generale dell'omogenea associata è $k_1e^{2x} + k_2e^{2x}$`,
      v: false,
      why: String.raw`È una sola soluzione, $(k_1 + k_2)e^{2x}$. Con radice doppia le soluzioni indipendenti sono $e^{2x}$ e $xe^{2x}$.` },
    { s: String.raw`c) se $f(x) = e^{2x}$ si cerca $\bar y = a\,x^2e^{2x}$`,
      v: true,
      why: String.raw`$h = 2$ è radice doppia, quindi $s = 2$; $m = 0$.` },
    { s: String.raw`d) se $f(x) = x$ si cerca $\bar y = x(ax + b)$`,
      v: false,
      why: String.raw`$h = 0$ non è radice: $s = 0$ e $\bar y = ax + b$.` },
    { s: String.raw`e) se $f(x) = e^{-2x}$ si cerca $\bar y = a\,e^{-2x}$`,
      v: true,
      why: String.raw`$h = -2$ non è radice: $s = 0$, $m = 0$.` },
    { s: String.raw`f) se $y_1$, $y_2$ sono soluzioni con $f(x) = e^{2x}$, allora $y_1 - y_2 = (k_1 + k_2x)e^{2x}$ per opportuni $k_1$, $k_2$`,
      v: true,
      why: "La differenza risolve l'omogenea, quindi è combinazione lineare di $e^{2x}$ e $xe^{2x}$." }
  ],
  expl: "Per decidere $s$ si confronta $h$ con le radici dell'equazione caratteristica, contando la molteplicità.",
  chk: "simplify(diff(Rational(1, 2)*x**2*exp(2*x), x, 2) - 4*diff(Rational(1, 2)*x**2*exp(2*x), x) + 4*Rational(1, 2)*x**2*exp(2*x) - exp(2*x)) == 0" },

{ id: "c2-vf-004",
  cap: 2,
  topic: "generalita",
  type: "vf",
  diff: 1,
  src: "Stile docente (affermazioni a), b), c)...)",
  q: "Per ciascuna delle seguenti affermazioni dire se è vera o falsa.",
  items: [
    { s: "a) la funzione identicamente nulla è soluzione di ogni equazione lineare omogenea",
      v: true,
      why: String.raw`Sostituendo $y = 0$ ogni termine si annulla.` },
    { s: String.raw`b) la funzione identicamente nulla è soluzione di $y'' + y = x$`,
      v: false,
      why: String.raw`Si otterrebbe $0 = x$, falso per $x \ne 0$.` },
    { s: String.raw`c) il problema di Cauchy $y'' + xy' + y = 0$, $y(0) = 1$, $y'(0) = 0$ ha una e una sola soluzione definita in $\mathbb{R}$`,
      v: true,
      why: String.raw`I coefficienti $x$ e $1$ sono continui in $\mathbb{R}$: il teorema di esistenza e unicità dà una soluzione unica in tutto $\mathbb{R}$.` },
    { s: "d) se $y_1$ e $y_2$ risolvono lo stesso problema di Cauchy per un'equazione lineare a coefficienti continui, allora $y_1 = y_2$",
      v: true,
      why: "È l'unicità." },
    { s: String.raw`e) l'equazione $y'' + (y')^2 = 0$ è lineare`,
      v: false,
      why: String.raw`$(y')^2$ non è di primo grado.` },
    { s: String.raw`f) $y = e^x$ è soluzione del problema di Cauchy $y' = y$, $y(0) = 2$`,
      v: false,
      why: String.raw`Risolve l'equazione, ma $y(0) = 1 \ne 2$. La soluzione è $2e^x$.` }
  ],
  expl: "Una soluzione di un problema di Cauchy deve verificare **sia** l'equazione **sia** le condizioni iniziali." }

);

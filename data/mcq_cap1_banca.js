/* Capitolo 1 (integrali): risposta multipla e più risposte giuste, nello stile delle prove.
   Schema: CONTRIBUTING.md. Ogni calcolo ha un campo chk (sympy) controllato da pnpm verify. */
(window.QUESTIONS = window.QUESTIONS || []).push(

/* ---------------- primitive ---------------- */

{ id: "c1-prim-002",
  cap: 1,
  topic: "primitive",
  type: "mcq",
  diff: 1,
  src: "Definizione di primitiva (stile esempio di prova 2026/27)",
  q: String.raw`Sia $F$ una primitiva di $f$ nell'intervallo $(a,b)$ e sia $c \ne 0$ una costante. Quale delle seguenti funzioni è ancora una primitiva di $f$ in $(a,b)$?`,
  options: [
    String.raw`$c\,F(x)$`,
    String.raw`$F(x) + c$`,
    String.raw`$F(x) + cx$`,
    String.raw`$F(x + c)$`
  ],
  correct: 1,
  expl: String.raw`$D(F(x) + c) = F'(x) = f(x)$: aggiungere una **costante** non cambia la derivata.
  <br>A) $D(cF) = cf$: è una primitiva di $cf$, non di $f$ (salvo $c = 1$).
  <br>C) $D(F + cx) = f + c$: è una primitiva di $f + c$.
  <br>D) $D(F(x+c)) = f(x+c)$, che in generale è un'altra funzione (e $x + c$ potrebbe uscire da $(a,b)$).`,
  chk: "simplify(diff(Function('F')(x) + Symbol('c'), x) - diff(Function('F')(x), x)) == 0" },

{ id: "c1-prim-003",
  cap: 1,
  topic: "primitive",
  type: "mcq",
  diff: 1,
  src: "Caratterizzazione delle primitive in un intervallo",
  q: String.raw`Siano $F$ e $G$ due primitive della stessa funzione $f$ nell'intervallo $(a,b)$. Allora`,
  options: [
    String.raw`$F - G$ è costante in $(a,b)$, ma solo se $f$ è continua`,
    String.raw`$F + G$ è una primitiva di $f$ in $(a,b)$`,
    String.raw`$F - G$ è costante in $(a,b)$`,
    String.raw`$F = G$, perché la primitiva di una funzione è unica`
  ],
  correct: 2,
  expl: String.raw`$D(F - G) = f - f = 0$ in tutto $(a,b)$; una funzione con derivata nulla in un **intervallo** è costante (corollario del teorema di Lagrange).
  <br>A) La continuità di $f$ non serve: basta che $F$ e $G$ siano primitive.
  <br>B) $D(F + G) = 2f$: è primitiva di $2f$.
  <br>D) Le primitive sono infinite: $F$ e $F + 1$ sono entrambe primitive.` },

{ id: "c1-prim-004",
  cap: 1,
  topic: "primitive",
  type: "mcq",
  diff: 2,
  src: "Primitive su un insieme che non è un intervallo",
  q: String.raw`Sia $f(x) = \dfrac1x$ in $\mathbb{R}\setminus\{0\}$ e sia $F(x) = \log|x| + 1$ per $x < 0$, $F(x) = \log|x| + 2$ per $x > 0$. Allora $F$`,
  options: [
    String.raw`non è una primitiva di $f$: le primitive di $f$ sono soltanto le funzioni $\log|x| + k$, $k \in \mathbb{R}$`,
    String.raw`è una primitiva di $f$ soltanto in $]0,+\infty[$`,
    String.raw`non è una primitiva, perché ha costanti diverse sulle due semirette`,
    String.raw`è una primitiva di $f$ in $\mathbb{R}\setminus\{0\}$`
  ],
  correct: 3,
  expl: String.raw`In ogni punto $x \ne 0$ si ha $F'(x) = \frac1x$, quindi $F$ è una primitiva. Il fatto che "due primitive differiscono per una costante" vale **solo in un intervallo**, e $\mathbb{R}\setminus\{0\}$ non lo è: su ciascuna semiretta la costante può essere diversa.
  <br>A) e C) sono lo stesso errore: applicare la caratterizzazione delle primitive fuori da un intervallo.
  <br>B) $F$ è primitiva anche in $]-\infty,0[$.`,
  chk: "simplify(diff(log(-x) + 1, x) - 1/x) == 0 and simplify(diff(log(x) + 2, x) - 1/x) == 0" },

{ id: "c1-prim-005",
  cap: 1,
  topic: "primitive",
  type: "mcq",
  diff: 2,
  src: "Primitiva con condizione tramite la funzione integrale",
  q: String.raw`Sia $f$ continua in $\mathbb{R}$. La primitiva $F$ di $f$ tale che $F(2) = 5$ è`,
  options: [
    String.raw`$F(x) = 5 + \displaystyle\int_2^x f(t)\,dt$`,
    String.raw`$F(x) = \displaystyle\int_2^x f(t)\,dt$`,
    String.raw`$F(x) = 2 + \displaystyle\int_5^x f(t)\,dt$`,
    String.raw`$F(x) = 5\displaystyle\int_2^x f(t)\,dt$`
  ],
  correct: 0,
  expl: String.raw`$\int_2^x f(t)\,dt$ è una primitiva (teorema di derivazione della funzione integrale) e vale $0$ in $x = 2$; aggiungendo $5$ si ottiene ancora una primitiva, con $F(2) = 5$.
  <br>B) Vale $0$ in $2$, non $5$.
  <br>C) $F(2) = 2 + \int_5^2 f(t)\,dt$, che in generale non è $5$: sono stati scambiati i ruoli di $x_0$ e $y_0$.
  <br>D) Vale $0$ in $2$ ed è primitiva di $5f$.` },

/* ---------------- integrale di Riemann ---------------- */

{ id: "c1-riemann-003",
  cap: 1,
  topic: "riemann",
  type: "mcq",
  diff: 2,
  src: "Somme inferiori e superiori, decomposizioni più fini",
  q: String.raw`Sia $f$ limitata in $[a,b]$, $D$ una decomposizione di $[a,b]$ e $D'$ una decomposizione più fine di $D$ (cioè $D \subseteq D'$). Allora`,
  options: [
    String.raw`$s(f,D') \le s(f,D)$ e $S(f,D') \ge S(f,D)$`,
    String.raw`$s(f,D') = s(f,D)$ e $S(f,D') = S(f,D)$`,
    String.raw`$s(f,D) \le s(f,D') \le S(f,D') \le S(f,D)$`,
    String.raw`$S(f,D') \le s(f,D)$`
  ],
  correct: 2,
  expl: String.raw`Aggiungendo punti, ogni intervallo si spezza in intervalli più piccoli: su un intervallo più piccolo l'estremo inferiore **non diminuisce** e l'estremo superiore **non aumenta**. Raffinando, le somme inferiori crescono e quelle superiori calano.
  <br>A) È il verso opposto.
  <br>B) Vale per esempio se $f$ è costante, non in generale.
  <br>D) Ogni somma inferiore è minore o uguale di ogni somma superiore, quindi $s(f,D) \le S(f,D')$.` },

{ id: "c1-riemann-004",
  cap: 1,
  topic: "riemann",
  type: "mcq",
  diff: 3,
  src: "Integrabilità delle funzioni continue (dispense, cap. 1)",
  q: String.raw`Nella dimostrazione del fatto che una funzione continua in $[a,b]$ è integrabile secondo Riemann, il teorema di Heine-Cantor serve a`,
  options: [
    String.raw`rendere $S(f,D) - s(f,D)$ minore di qualunque $\varepsilon > 0$, scegliendo una decomposizione di ampiezza abbastanza piccola`,
    String.raw`garantire che $f$ abbia minimo e massimo in ogni intervallo $[x_{i-1}, x_i]$`,
    String.raw`dimostrare che ogni somma inferiore è minore o uguale di ogni somma superiore`,
    String.raw`garantire che l'integrale sia non negativo quando $f \ge 0$`
  ],
  correct: 0,
  expl: String.raw`Heine-Cantor: $f$ continua in $[a,b]$ è **uniformemente continua**, quindi esiste $\delta$ tale che su ogni intervallo di ampiezza $< \delta$ l'oscillazione $M_i - m_i$ è $< \frac{\varepsilon}{b-a}$. Sommando, $S(f,D) - s(f,D) < \varepsilon$.
  <br>B) Questo è il teorema di **Weierstrass**.
  <br>C) Vale per ogni funzione limitata, senza continuità.
  <br>D) È la proprietà di monotonia, che non c'entra.` },

{ id: "c1-riemann-005",
  cap: 1,
  topic: "riemann",
  type: "mcq",
  diff: 1,
  src: "Convenzioni sugli estremi di integrazione",
  q: String.raw`Siano $a < b$ e $f$ integrabile in $[a,b]$. Per definizione $\displaystyle\int_b^a f(x)\,dx$ è`,
  options: [
    "non definito, perché l'estremo inferiore è maggiore di quello superiore",
    String.raw`uguale a $\displaystyle\int_a^b f(x)\,dx$`,
    String.raw`uguale a $\displaystyle\int_a^b |f(x)|\,dx$`,
    String.raw`uguale a $-\displaystyle\int_a^b f(x)\,dx$`
  ],
  correct: 3,
  expl: String.raw`Si **pone** $\int_b^a f(x)\,dx = -\int_a^b f(x)\,dx$ (e $\int_a^a f(x)\,dx = 0$). Con questa convenzione la proprietà additiva vale per qualunque ordine dei punti.
  <br>A) È definito proprio da questa convenzione.
  <br>B) Manca il segno meno.
  <br>C) Il valore assoluto non c'entra.` },

{ id: "c1-riemann-006",
  cap: 1,
  topic: "riemann",
  type: "mcq",
  diff: 1,
  src: "Somme inferiori e superiori su un esempio numerico",
  q: String.raw`Sia $f(x) = x$ in $[0,2]$ e $D = \{0; 1; 2\}$. Allora`,
  options: [
    String.raw`$s(f,D) = 0$ e $S(f,D) = 4$`,
    String.raw`$s(f,D) = 1$ e $S(f,D) = 3$`,
    String.raw`$s(f,D) = 1$ e $S(f,D) = 2$`,
    String.raw`$s(f,D) = 2$ e $S(f,D) = 2$`
  ],
  correct: 1,
  expl: String.raw`Gli intervalli sono $[0,1]$ e $[1,2]$, di ampiezza $1$. Minimi: $0$ e $1$, quindi $s(f,D) = 0 + 1 = 1$. Massimi: $1$ e $2$, quindi $S(f,D) = 1 + 2 = 3$. Come deve essere, $1 \le \int_0^2 x\,dx = 2 \le 3$.
  <br>A) Sono le somme per la decomposizione banale $\{0; 2\}$.
  <br>C) $2$ è l'integrale, non la somma superiore.
  <br>D) Le somme coincidono con l'integrale solo per funzioni costanti.`,
  chk: "0*1 + 1*1 == 1 and 1*1 + 2*1 == 3 and integrate(x, (x, 0, 2)) == 2" },

/* ---------------- proprietà ---------------- */

{ id: "c1-prop-002",
  cap: 1,
  topic: "proprieta",
  type: "mcq",
  diff: 2,
  src: "Teorema della media su un esempio",
  q: String.raw`Sia $f(x) = x^2$ in $[0,3]$. Il punto $c \in [0,3]$ dato dal teorema della media è`,
  options: [
    String.raw`$c = \frac32$`,
    String.raw`$c = 3$`,
    String.raw`$c = \sqrt3$`,
    String.raw`$c = 9$`
  ],
  correct: 2,
  expl: String.raw`La media integrale è $\frac{1}{3}\int_0^3 x^2\,dx = \frac13 \cdot 9 = 3$. Si cerca $c$ con $f(c) = c^2 = 3$, cioè $c = \sqrt3 \in [0,3]$.
  <br>A) Il punto medio dell'intervallo non c'entra (lo sarebbe per $f$ lineare).
  <br>B) $3$ è il valore medio $f(c)$, non il punto $c$.
  <br>D) $9$ è l'integrale, e non sta nemmeno in $[0,3]$.`,
  chk: "integrate(x**2, (x, 0, 3))/3 == 3 and sqrt(3)**2 == 3" },

{ id: "c1-prop-003",
  cap: 1,
  topic: "proprieta",
  type: "mcq",
  diff: 2,
  src: "Teorema della media: unicità del punto",
  q: String.raw`Sia $f$ continua in $[a,b]$. Il punto $c \in [a,b]$ tale che $\int_a^b f(x)\,dx = f(c)(b-a)$`,
  options: [
    "esiste, ma in generale non è unico",
    "esiste ed è unico",
    String.raw`è sempre il punto medio $\frac{a+b}{2}$`,
    String.raw`esiste solo se $f$ è monotona in $[a,b]$`
  ],
  correct: 0,
  expl: String.raw`L'esistenza viene da Weierstrass e dal teorema dei valori intermedi, che **non** danno l'unicità. Esempio: $f(x) = \sin x$ in $[0, 2\pi]$ ha integrale $0$, e $f(c) = 0$ per $c = 0, \pi, 2\pi$.
  <br>C) Vale per le funzioni lineari, non in generale.
  <br>D) Basta la continuità.`,
  chk: "integrate(sin(x), (x, 0, 2*pi)) == 0" },

{ id: "c1-prop-004",
  cap: 1,
  topic: "proprieta",
  type: "mcq",
  diff: 1,
  src: "Proprietà della media (esempio di prova 2026/27, quesito 1)",
  q: String.raw`Sia $f$ continua in $[a,b]$ con minimo $m$ e massimo $M$. Allora`,
  options: [
    String.raw`$m \le \displaystyle\int_a^b f(x)\,dx \le M$`,
    String.raw`$\displaystyle\int_a^b m\,dx \le \int_a^b f(x)\,dx$ solo se $m \ge 0$`,
    String.raw`$m(b-a) < \displaystyle\int_a^b f(x)\,dx < M(b-a)$`,
    String.raw`$m(b-a) \le \displaystyle\int_a^b f(x)\,dx \le M(b-a)$`
  ],
  correct: 3,
  expl: String.raw`Con la decomposizione $D = \{a; b\}$: $m(b-a) = s(f,D) \le \int_a^b f(x)\,dx \le S(f,D) = M(b-a)$.
  <br>A) Manca la lunghezza $b - a$ dell'intervallo (è giusta la versione divisa per $b - a$).
  <br>B) La monotonia vale qualunque sia il segno di $m$.
  <br>C) Le disuguaglianze non sono strette: se $f$ è costante valgono le uguaglianze.` },

{ id: "c1-prop-005",
  cap: 1,
  topic: "proprieta",
  type: "mcq",
  diff: 1,
  src: "Proprietà additiva",
  q: String.raw`Sia $f$ integrabile in $[-1,4]$, con $\displaystyle\int_{-1}^4 f(x)\,dx = 7$ e $\displaystyle\int_2^4 f(x)\,dx = 3$. Allora $\displaystyle\int_{-1}^2 f(x)\,dx =$`,
  options: [
    "$10$",
    "$4$",
    "$-4$",
    "$-10$"
  ],
  correct: 1,
  expl: String.raw`Additività: $\int_{-1}^4 f = \int_{-1}^2 f + \int_2^4 f$, quindi $\int_{-1}^2 f = 7 - 3 = 4$.
  <br>A) Le due quantità sono state sommate invece che sottratte.
  <br>C) e D) Errori di segno.`,
  chk: "Rational(7) - 3 == 4" },

{ id: "c1-prop-006",
  cap: 1,
  topic: "proprieta",
  type: "mcq",
  diff: 1,
  src: "Linearità e scambio degli estremi",
  q: String.raw`Sia $\displaystyle\int_1^5 f(x)\,dx = 6$. Allora $\displaystyle\int_5^1 2f(x)\,dx =$`,
  options: [
    "$12$",
    "$3$",
    "$-12$",
    "$-3$"
  ],
  correct: 2,
  expl: String.raw`Scambiando gli estremi cambia il segno, e la costante $2$ si porta fuori: $\int_5^1 2f(x)\,dx = -2\int_1^5 f(x)\,dx = -12$.
  <br>A) Manca il cambio di segno.
  <br>B) e D) La costante va moltiplicata, non divisa.`,
  chk: "-2*6 == -12" },

/* ---------------- funzione integrale ---------------- */

{ id: "c1-funzint-005",
  cap: 1,
  topic: "funzione_integrale",
  type: "mcq",
  diff: 1,
  src: "Teorema di derivazione della funzione integrale",
  q: String.raw`Sia $F(x) = \displaystyle\int_0^x \cos(t^2)\,dt$. Allora $F'(x) =$`,
  options: [
    String.raw`$\cos(x^2)$`,
    String.raw`$\cos(x^2) - 1$`,
    String.raw`$-2x\sin(x^2)$`,
    String.raw`$2x\cos(x^2)$`
  ],
  correct: 0,
  expl: String.raw`$t \mapsto \cos(t^2)$ è continua e l'estremo superiore è proprio $x$: $F'(x) = \cos(x^2)$. Non serve (e non si sa) calcolare una primitiva di $\cos(t^2)$.
  <br>B) Il punto iniziale $0$ dà un termine costante, che derivando sparisce.
  <br>C) È la derivata di $\cos(x^2)$, non di $F$.
  <br>D) Il fattore $2x$ comparirebbe con estremo superiore $x^2$.`,
  chk: "simplify(diff(Integral(cos(t**2), (t, 0, x)), x) - cos(x**2)) == 0" },

{ id: "c1-funzint-006",
  cap: 1,
  topic: "funzione_integrale",
  type: "mcq",
  diff: 2,
  src: "Derivata della funzione integrale con estremi variabili",
  q: String.raw`Sia $F(x) = \displaystyle\int_x^{x^2} e^{-t^2}\,dt$. Allora $F'(x) =$`,
  options: [
    String.raw`$e^{-x^4} - e^{-x^2}$`,
    String.raw`$2x\,e^{-x^4} + e^{-x^2}$`,
    String.raw`$2x\,e^{-x^4}$`,
    String.raw`$2x\,e^{-x^4} - e^{-x^2}$`
  ],
  correct: 3,
  expl: String.raw`Si spezza in $0$: $F(x) = \int_0^{x^2} e^{-t^2}\,dt - \int_0^x e^{-t^2}\,dt$. Il primo pezzo è una funzione integrale composta con $x^2$: derivata $e^{-x^4}\cdot 2x$. Il secondo ha derivata $e^{-x^2}$.
  <br>A) Manca la derivata $2x$ dell'estremo superiore.
  <br>B) Errore di segno sull'estremo inferiore: $D\int_x^0 = -f(x)$.
  <br>C) È stato dimenticato l'estremo inferiore variabile.`,
  chk: "simplify(diff(Integral(exp(-t**2), (t, x, x**2)), x) - (2*x*exp(-x**4) - exp(-x**2))) == 0" },

{ id: "c1-funzint-007",
  cap: 1,
  topic: "funzione_integrale",
  type: "mcq",
  diff: 2,
  src: "Due funzioni integrali della stessa funzione",
  q: String.raw`Sia $f$ continua in $\mathbb{R}$, $F(x) = \displaystyle\int_2^x f(t)\,dt$ e $G(x) = \displaystyle\int_{-1}^x f(t)\,dt$. Allora`,
  options: [
    String.raw`$F = G$, perché hanno la stessa derivata`,
    String.raw`$F - G$ è costante e vale $-\displaystyle\int_{-1}^2 f(t)\,dt$`,
    String.raw`$F - G = f$`,
    String.raw`$F - G$ è costante e vale $\displaystyle\int_{-1}^2 f(t)\,dt$`
  ],
  correct: 1,
  expl: String.raw`Per l'additività $G(x) = \int_{-1}^2 f(t)\,dt + \int_2^x f(t)\,dt = \int_{-1}^2 f(t)\,dt + F(x)$, quindi $F - G = -\int_{-1}^2 f(t)\,dt$.
  <br>A) Stessa derivata significa differenza **costante**, non uguaglianza.
  <br>C) $F - G$ è costante, non $f$.
  <br>D) Il segno è sbagliato: $G$ "contiene" il pezzo da $-1$ a $2$, quindi $F - G$ è il suo opposto.` },

{ id: "c1-funzint-008",
  cap: 1,
  topic: "funzione_integrale",
  type: "mcq",
  diff: 2,
  src: "Studio di una funzione integrale",
  q: String.raw`Sia $F(x) = \displaystyle\int_0^x (t^2 - 4)\,e^t\,dt$. Nel punto $x = 2$ la funzione $F$ ha`,
  options: [
    "un massimo relativo",
    "un flesso a tangente orizzontale",
    "un minimo relativo",
    "un punto in cui non è derivabile"
  ],
  correct: 2,
  expl: String.raw`Per il teorema di derivazione $F'(x) = (x^2 - 4)e^x$: è negativa in $]-2,2[$ e positiva per $x > 2$. Quindi $F$ decresce prima di $2$ e cresce dopo: **minimo relativo**.
  <br>A) Il segno di $F'$ cambia da $-$ a $+$, non da $+$ a $-$.
  <br>B) Ci sarebbe un flesso se $F'$ non cambiasse segno.
  <br>D) $F$ è derivabile ovunque, perché l'integranda è continua.`,
  chk: "((x**2 - 4)*exp(x)).subs(x, Rational(3, 2)) < 0 and ((x**2 - 4)*exp(x)).subs(x, Rational(5, 2)) > 0" },

/* ---------------- misura e aree ---------------- */

{ id: "c1-misura-001",
  cap: 1,
  topic: "misura",
  type: "mcq",
  diff: 1,
  src: "Area del rettangoloide di una funzione negativa",
  q: String.raw`Sia $f$ continua in $[a,b]$ con $f(x) \le 0$ per ogni $x$. L'area della regione compresa fra il grafico di $f$ e l'asse $x$, per $x \in [a,b]$, è`,
  options: [
    String.raw`$-\displaystyle\int_a^b f(x)\,dx$`,
    String.raw`$\displaystyle\int_a^b f(x)\,dx$`,
    String.raw`$\displaystyle\int_b^a |f(x)|\,dx$`,
    String.raw`non definita, perché la regione sta sotto l'asse $x$`
  ],
  correct: 0,
  expl: String.raw`La regione è simmetrica (rispetto all'asse $x$) del rettangoloide di $-f \ge 0$, che ha area $\int_a^b (-f(x))\,dx = -\int_a^b f(x)\,dx$.
  <br>B) È un numero $\le 0$: un'area non può essere negativa.
  <br>C) $\int_b^a |f| = -\int_a^b |f| = \int_a^b f \le 0$: stesso errore di B.
  <br>D) L'insieme è misurabile come ogni rettangoloide di una funzione continua.` },

{ id: "c1-misura-002",
  cap: 1,
  topic: "misura",
  type: "mcq",
  diff: 2,
  src: "Area di un dominio normale",
  q: String.raw`L'area della regione limitata compresa fra i grafici di $y = x^2$ e $y = x$ è`,
  options: [
    String.raw`$\frac12$`,
    String.raw`$\frac16$`,
    String.raw`$\frac13$`,
    String.raw`$-\frac16$`
  ],
  correct: 1,
  expl: String.raw`Le curve si incontrano in $x = 0$ e $x = 1$, e in $[0,1]$ si ha $x^2 \le x$. È il dominio normale $\{0 \le x \le 1,\ x^2 \le y \le x\}$, di area $\int_0^1 (x - x^2)\,dx = \frac12 - \frac13 = \frac16$.
  <br>A) e C) Sono le aree sotto una sola delle due curve.
  <br>D) Sottrarre nell'ordine sbagliato dà un numero negativo: si sottrae sempre la funzione che sta **sotto**.`,
  chk: "integrate(x - x**2, (x, 0, 1)) == Rational(1, 6)" },

{ id: "c1-misura-003",
  cap: 1,
  topic: "misura",
  type: "mcq",
  diff: 2,
  src: "Area con funzione di segno variabile",
  q: String.raw`L'area della regione compresa fra il grafico di $f(x) = x^3$, l'asse $x$ e le rette $x = -1$ e $x = 2$ è`,
  options: [
    String.raw`$\frac{15}{4}$`,
    String.raw`$4$`,
    String.raw`$-\frac{17}{4}$`,
    String.raw`$\frac{17}{4}$`
  ],
  correct: 3,
  expl: String.raw`$f < 0$ in $]-1,0[$ e $f > 0$ in $]0,2[$: si spezza in $0$. Area $= -\int_{-1}^0 x^3\,dx + \int_0^2 x^3\,dx = \frac14 + 4 = \frac{17}{4}$.
  <br>A) $\int_{-1}^2 x^3\,dx = \frac{15}{4}$: la parte negativa è stata sottratta invece che sommata.
  <br>B) È solo la parte con $x \ge 0$.
  <br>C) Un'area non è negativa.`,
  chk: "integrate(Abs(x**3), (x, -1, 2)) == Rational(17, 4) and integrate(x**3, (x, -1, 2)) == Rational(15, 4)" },

{ id: "c1-misura-004",
  cap: 1,
  topic: "misura",
  type: "mcq",
  diff: 1,
  src: "Definizione di insieme misurabile secondo Peano-Jordan",
  q: String.raw`Un insieme limitato $E \subset \mathbb{R}^2$ si dice misurabile secondo Peano-Jordan se`,
  options: [
    "è contenuto in un rettangolo, così che le aree dei plurirettangoli che lo contengono sono limitate",
    "è l'unione di un numero finito di rettangoli con i lati paralleli agli assi",
    "l'estremo superiore delle aree dei plurirettangoli contenuti in E coincide con l'estremo inferiore delle aree dei plurirettangoli contenenti E",
    "la sua frontiera è formata da un numero finito di segmenti"
  ],
  correct: 2,
  expl: String.raw`Si confrontano le aree dei plurirettangoli **interni** e quelle dei plurirettangoli **esterni**: se l'estremo superiore delle prime coincide con l'estremo inferiore delle seconde, il valore comune è la misura di $E$.
  <br>A) Ogni insieme limitato lo è, anche quelli non misurabili.
  <br>B) Questi sono i plurirettangoli: sono misurabili, ma non sono gli unici (un cerchio è misurabile).
  <br>D) Il cerchio è misurabile e la sua frontiera non è fatta di segmenti.` },

/* ---------------- integrale indefinito e metodi ---------------- */

{ id: "c1-indef-003",
  cap: 1,
  topic: "indefinito",
  type: "mcq",
  diff: 1,
  src: "Integrali immediati e linearità",
  q: String.raw`$\displaystyle\int (3x^2 + \cos x)\,dx =$`,
  options: [
    String.raw`$x^3 + \sin x + k$, $k \in \mathbb{R}$`,
    String.raw`$x^3 - \sin x + k$, $k \in \mathbb{R}$`,
    String.raw`$6x - \sin x + k$, $k \in \mathbb{R}$`,
    String.raw`$x^3 + \sin x$`
  ],
  correct: 0,
  expl: String.raw`Per la linearità si integrano i due addendi: $\int 3x^2\,dx = x^3 + k$ e $\int\cos x\,dx = \sin x + k$.
  <br>B) $D(-\sin x) = -\cos x$.
  <br>C) È stata fatta la derivata, non la primitiva.
  <br>D) È **una** primitiva, ma l'integrale indefinito è l'**insieme** di tutte: manca $+ k$.`,
  chk: "simplify(diff(x**3 + sin(x), x) - (3*x**2 + cos(x))) == 0" },

{ id: "c1-parti-002",
  cap: 1,
  topic: "parti",
  type: "mcq",
  diff: 1,
  src: "Integrazione per parti, caso base",
  q: String.raw`Integrando per parti con FF $= x$ e FD $= \cos x\,dx$ si ottiene $\displaystyle\int x\cos x\,dx =$`,
  options: [
    String.raw`$x\sin x - \cos x + k$`,
    String.raw`$\frac{x^2}{2}\sin x + k$`,
    String.raw`$x\sin x + \cos x + k$`,
    String.raw`$-x\sin x + \cos x + k$`
  ],
  correct: 2,
  expl: String.raw`$\int x\cos x\,dx = x\sin x - \int \sin x\,dx = x\sin x + \cos x + k$. Controllo: $D(x\sin x + \cos x) = \sin x + x\cos x - \sin x = x\cos x$.
  <br>A) Errore di segno: $-\int\sin x\,dx = +\cos x$.
  <br>B) Non si integrano separatamente i due fattori.
  <br>D) La primitiva del FD è $\sin x$, non $-\sin x$.`,
  chk: "simplify(diff(x*sin(x) + cos(x), x) - x*cos(x)) == 0" },

{ id: "c1-parti-003",
  cap: 1,
  topic: "parti",
  type: "mcq",
  diff: 2,
  src: "Integrazione per parti con fattore differenziale dx",
  q: String.raw`Per calcolare $\displaystyle\int \log x\,dx$ in $]0,+\infty[$ conviene integrare per parti con`,
  options: [
    String.raw`FF $= 1$ e FD $= \log x\,dx$`,
    String.raw`FF $= \log x$ e FD $= dx$, e si ottiene $x\log x - x + k$`,
    String.raw`la sostituzione $t = \log x$ invece che per parti, perché $\log x$ non è un prodotto`,
    String.raw`FF $= x$ e FD $= \frac{\log x}{x}\,dx$`
  ],
  correct: 1,
  expl: String.raw`Si vede $\log x$ come $\log x \cdot 1$: FF $= \log x$ (si sa derivare), FD $= dx$ (si sa integrare). $\int\log x\,dx = x\log x - \int x\cdot\frac1x\,dx = x\log x - x + k$.
  <br>A) Bisognerebbe conoscere già una primitiva di $\log x$.
  <br>C) Per parti funziona anche con un "fattore" uguale a $1$.
  <br>D) Si complica: serve una primitiva di $\frac{\log x}{x}$ e poi resta $\int \frac{\log^2 x}{2}\,dx$.`,
  chk: "simplify(diff(x*log(x) - x, x) - log(x)) == 0" },

{ id: "c1-parti-004",
  cap: 1,
  topic: "parti",
  type: "mcq",
  diff: 2,
  src: "Integrazione per parti \"ciclica\"",
  q: String.raw`Integrando due volte per parti si ottiene $\displaystyle\int e^x\sin x\,dx =$`,
  options: [
    "nulla: si torna all'integrale di partenza e il metodo non porta a un risultato",
    String.raw`$e^x(\sin x - \cos x) + k$`,
    String.raw`$\dfrac{e^x(\sin x + \cos x)}{2} + k$`,
    String.raw`$\dfrac{e^x(\sin x - \cos x)}{2} + k$`
  ],
  correct: 3,
  expl: String.raw`Detto $I$ l'integrale, due integrazioni per parti danno $I = e^x\sin x - e^x\cos x - I$. Si **ricava** $I$: $2I = e^x(\sin x - \cos x)$, quindi $I = \frac{e^x(\sin x - \cos x)}{2} + k$.
  <br>A) Tornare all'integrale di partenza è proprio ciò che permette di ricavarlo, purché il coefficiente non sia $1$.
  <br>B) Manca la divisione per $2$.
  <br>C) Errore di segno nella seconda integrazione.`,
  chk: "simplify(diff(exp(x)*(sin(x) - cos(x))/2, x) - exp(x)*sin(x)) == 0" },

{ id: "c1-sost-003",
  cap: 1,
  topic: "sostituzione",
  type: "mcq",
  diff: 1,
  src: "Prima formula di integrazione per sostituzione",
  q: String.raw`$\displaystyle\int \frac{2x}{1 + x^2}\,dx =$`,
  options: [
    String.raw`$\log(1 + x^2) + k$`,
    String.raw`$2\arctan x + k$`,
    String.raw`$\log|2x| + k$`,
    String.raw`$x^2\log(1 + x^2) + k$`
  ],
  correct: 0,
  expl: String.raw`Con $g(x) = 1 + x^2$ si ha $g'(x) = 2x$: $\int \frac{g'(x)}{g(x)}\,dx = \left[\int \frac{dt}{t}\right]_{t = 1+x^2} = \log|1 + x^2| + k = \log(1+x^2) + k$, perché $1 + x^2 > 0$.
  <br>B) $2\arctan x$ è una primitiva di $\frac{2}{1+x^2}$: il fattore $x$ è stato perso.
  <br>C) Non si "integrano" separatamente numeratore e denominatore.
  <br>D) $x^2$ non si porta fuori dall'integrale: non è una costante.`,
  chk: "simplify(diff(log(1 + x**2), x) - 2*x/(1 + x**2)) == 0" },

{ id: "c1-sost-004",
  cap: 1,
  topic: "sostituzione",
  type: "mcq",
  diff: 2,
  src: "Seconda formula di integrazione per sostituzione",
  q: String.raw`In $]0,+\infty[$ si ha $\displaystyle\int \frac{dx}{\sqrt{x}\,(1 + x)} =$`,
  options: [
    String.raw`$\arctan\sqrt{x} + k$`,
    String.raw`$\log(1 + x) + k$`,
    String.raw`$2\arctan\sqrt{x} + k$`,
    String.raw`$2\sqrt{x}\,\arctan x + k$`
  ],
  correct: 2,
  expl: String.raw`Si pone $x = g(t) = t^2$ con $t > 0$ ($g$ invertibile, $g'(t) = 2t$): $\left[\int \frac{2t}{t(1+t^2)}\,dt\right]_{t = \sqrt x} = \left[2\arctan t\right]_{t=\sqrt x} = 2\arctan\sqrt x + k$.
  <br>A) Manca il fattore $g'(t) = 2t$ (resta $2$ dopo la semplificazione).
  <br>B) È stato ignorato il fattore $\frac{1}{\sqrt x}$.
  <br>D) $\frac{1}{\sqrt x}$ e $\frac{1}{1+x}$ non si integrano separatamente.`,
  chk: "simplify(diff(2*atan(sqrt(x)), x) - 1/(sqrt(x)*(1 + x))) == 0" },

{ id: "c1-trig-002",
  cap: 1,
  topic: "trigonometrici",
  type: "mcq",
  diff: 1,
  src: "Potenze pari di seno e coseno",
  q: String.raw`$\displaystyle\int \sin^2 x\,dx =$`,
  options: [
    String.raw`$\dfrac{\sin^3 x}{3} + k$`,
    String.raw`$\dfrac{x}{2} - \dfrac{\sin 2x}{4} + k$`,
    String.raw`$\dfrac{x}{2} + \dfrac{\sin 2x}{4} + k$`,
    String.raw`$\dfrac{1 - \cos 2x}{2} + k$`
  ],
  correct: 1,
  expl: String.raw`Con la formula di bisezione $\sin^2 x = \frac{1 - \cos 2x}{2}$: $\int \sin^2 x\,dx = \frac x2 - \frac{\sin 2x}{4} + k$.
  <br>A) $D\left(\frac{\sin^3x}{3}\right) = \sin^2x\cos x$: manca il fattore $\cos x$.
  <br>C) Il segno è quello della primitiva di $\cos^2 x$.
  <br>D) È l'integranda riscritta, non una sua primitiva.`,
  chk: "simplify(diff(x/2 - sin(2*x)/4, x) - sin(x)**2) == 0" },

{ id: "c1-trig-003",
  cap: 1,
  topic: "trigonometrici",
  type: "mcq",
  diff: 2,
  src: "Primitive che differiscono per una costante",
  q: String.raw`Uno studente trova $\displaystyle\int \sin x\cos x\,dx = \frac{\sin^2 x}{2} + k$, un altro trova $-\dfrac{\cos^2 x}{2} + k$. Allora`,
  options: [
    "ha ragione solo il primo, perché la primitiva di sin x cos x è unica",
    String.raw`hanno ragione entrambi solo se si sceglie $k = 0$`,
    "uno dei due ha sbagliato un segno",
    String.raw`hanno ragione entrambi: le due funzioni differiscono per la costante $\frac12$`
  ],
  correct: 3,
  expl: String.raw`$\frac{\sin^2 x}{2} - \left(-\frac{\cos^2 x}{2}\right) = \frac{\sin^2x + \cos^2x}{2} = \frac12$: sono due primitive della stessa funzione e gli insiemi $\{F + k\}$ coincidono.
  <br>A) Le primitive sono infinite.
  <br>B) Gli insiemi coincidono per ogni scelta, perché $k$ varia in tutto $\mathbb{R}$.
  <br>C) Le derivate sono entrambe $\sin x\cos x$.`,
  chk: "simplify(diff(sin(x)**2/2, x) - sin(x)*cos(x)) == 0 and simplify(diff(-cos(x)**2/2, x) - sin(x)*cos(x)) == 0 and simplify(sin(x)**2/2 + cos(x)**2/2) == Rational(1, 2)" },

{ id: "c1-trig-004",
  cap: 1,
  topic: "trigonometrici",
  type: "mcq",
  diff: 2,
  src: "Potenze dispari di seno e coseno",
  q: String.raw`Per calcolare $\displaystyle\int \sin^5 x\,dx$ conviene`,
  options: [
    String.raw`scrivere $\sin^5 x = (1 - \cos^2 x)^2\sin x$ e porre $t = \cos x$`,
    String.raw`usare due volte la formula $\sin^2 x = \frac{1 - \cos 2x}{2}$, come per le potenze pari`,
    String.raw`porre $t = \tan x$`,
    String.raw`integrare per parti con FF $= \sin^4 x$, una sola volta`
  ],
  correct: 0,
  expl: String.raw`Con l'esponente **dispari** si isola un fattore $\sin x$ e il resto si scrive in funzione di $\cos x$: $\int (1 - \cos^2x)^2\sin x\,dx = -\left[\int (1 - t^2)^2\,dt\right]_{t = \cos x}$, un polinomio.
  <br>B) Le formule di bisezione servono per gli esponenti **pari**.
  <br>C) Porta a una funzione razionale molto più complicata.
  <br>D) Una sola integrazione per parti non chiude il conto.`,
  chk: "simplify(diff(-(cos(x) - 2*cos(x)**3/3 + cos(x)**5/5), x) - sin(x)**5) == 0" },

{ id: "c1-raz-004",
  cap: 1,
  topic: "razionali",
  type: "mcq",
  diff: 1,
  src: "Integrale con denominatore di secondo grado irriducibile",
  q: String.raw`$\displaystyle\int \frac{dx}{x^2 + 7} =$`,
  options: [
    String.raw`$\arctan\dfrac{x}{\sqrt7} + k$`,
    String.raw`$\dfrac17\arctan\dfrac{x}{7} + k$`,
    String.raw`$\dfrac{1}{\sqrt7}\arctan\dfrac{x}{\sqrt7} + k$`,
    String.raw`$\log(x^2 + 7) + k$`
  ],
  correct: 2,
  expl: String.raw`$\int \frac{dx}{x^2 + \gamma^2} = \frac{1}{\gamma}\arctan\frac{x}{\gamma} + k$, qui con $\gamma = \sqrt7$.
  <br>A) Manca il fattore $\frac{1}{\gamma}$ davanti all'arcotangente (errore frequente).
  <br>B) $\gamma$ è $\sqrt7$, non $7$.
  <br>D) Il logaritmo verrebbe con $2x$ al numeratore.`,
  chk: "simplify(diff(atan(x/sqrt(7))/sqrt(7), x) - 1/(x**2 + 7)) == 0" },

{ id: "c1-raz-005",
  cap: 1,
  topic: "razionali",
  type: "mcq",
  diff: 2,
  src: "Completamento del quadrato (caso discriminante negativo)",
  q: String.raw`$\displaystyle\int \frac{dx}{x^2 + 2x + 5} =$`,
  options: [
    String.raw`$\dfrac12\arctan\dfrac{x+1}{2} + k$`,
    String.raw`$\arctan\dfrac{x+1}{2} + k$`,
    String.raw`$\dfrac12\arctan\dfrac{x-1}{2} + k$`,
    String.raw`$\dfrac14\arctan\dfrac{x+1}{4} + k$`
  ],
  correct: 0,
  expl: String.raw`$\Delta < 0$: si completa il quadrato, $x^2 + 2x + 5 = (x+1)^2 + 4$. Con $\gamma = 2$: $\int \frac{dx}{(x+1)^2 + 2^2} = \frac12\arctan\frac{x+1}{2} + k$.
  <br>B) Manca $\frac1\gamma$.
  <br>C) Errore di segno nel completamento del quadrato.
  <br>D) $\gamma^2 = 4$, quindi $\gamma = 2$, non $4$.`,
  chk: "simplify(diff(atan((x + 1)/2)/2, x) - 1/(x**2 + 2*x + 5)) == 0" },

{ id: "c1-raz-006",
  cap: 1,
  topic: "razionali",
  type: "mcq",
  diff: 2,
  src: "Fratti semplici (caso discriminante positivo)",
  q: String.raw`$\displaystyle\int \frac{dx}{(x-1)(x+2)} =$`,
  options: [
    String.raw`$\log|x-1| + \log|x+2| + k$`,
    String.raw`$\dfrac13\log|(x-1)(x+2)| + k$`,
    String.raw`$3\log\left|\dfrac{x-1}{x+2}\right| + k$`,
    String.raw`$\dfrac13\log\left|\dfrac{x-1}{x+2}\right| + k$`
  ],
  correct: 3,
  expl: String.raw`$\frac{1}{(x-1)(x+2)} = \frac{A}{x-1} + \frac{B}{x+2}$ con $A = \frac13$, $B = -\frac13$. Quindi l'integrale è $\frac13\log|x-1| - \frac13\log|x+2| + k = \frac13\log\left|\frac{x-1}{x+2}\right| + k$.
  <br>A) Si "spezza" la frazione come se $\frac{1}{ab} = \frac1a + \frac1b$: falso.
  <br>B) Il segno di $B$ è sbagliato.
  <br>C) Il coefficiente è $\frac13$, non $3$.`,
  chk: "simplify(diff(log((x - 1)/(x + 2))/3, x) - 1/((x - 1)*(x + 2))) == 0" },

{ id: "c1-raz-007",
  cap: 1,
  topic: "razionali",
  type: "mcq",
  diff: 2,
  src: "Funzioni razionali non proprie",
  q: String.raw`Per integrare $\dfrac{x^3}{x^2 - 1}$, prima di decomporre in fratti semplici`,
  options: [
    String.raw`non serve nulla: si scrive subito $\dfrac{x^3}{x^2-1} = \dfrac{A}{x-1} + \dfrac{B}{x+1}$`,
    String.raw`si divide: $\dfrac{x^3}{x^2 - 1} = x + \dfrac{x}{x^2 - 1}$`,
    String.raw`si divide: $\dfrac{x^3}{x^2 - 1} = x - \dfrac{x}{x^2 - 1}$`,
    "si conclude che non esistono primitive elementari, perché il numeratore ha grado maggiore del denominatore"
  ],
  correct: 1,
  expl: String.raw`La funzione non è **propria** (grado del numeratore $\ge$ grado del denominatore): si divide. $x^3 = x(x^2 - 1) + x$, quindi $\frac{x^3}{x^2-1} = x + \frac{x}{x^2-1}$.
  <br>A) I fratti semplici valgono solo per funzioni proprie.
  <br>C) Errore di segno nel resto.
  <br>D) Ogni funzione razionale ha primitive elementari: si fa la divisione.`,
  chk: "simplify(x + x/(x**2 - 1) - x**3/(x**2 - 1)) == 0" },

{ id: "c1-rad-001",
  cap: 1,
  topic: "radicali",
  type: "mcq",
  diff: 2,
  src: "Razionalizzazione (esercizio delle lezioni)",
  q: String.raw`Per calcolare $\displaystyle\int \sqrt{\frac{x+3}{x-1}}\,dx$ si usa la sostituzione`,
  options: [
    String.raw`$x = \sin t$, per eliminare la radice`,
    String.raw`$t = x + 3$, cioè $x = t - 3$`,
    String.raw`$t = \sqrt{\dfrac{x+3}{x-1}}$, cioè $x = \dfrac{t^2+3}{t^2-1}$`,
    String.raw`$t = \dfrac{x+3}{x-1}$, cioè $x = \dfrac{t+3}{t-1}$`
  ],
  correct: 2,
  expl: String.raw`Si pone uguale a $t$ **tutta la radice**: da $t^2 = \frac{x+3}{x-1}$ si ricava $x(t^2 - 1) = t^2 + 3$, cioè $x = \frac{t^2+3}{t^2-1}$, e l'integrale diventa razionale in $t$.
  <br>A) e B) La radice resta.
  <br>D) Così $\sqrt t$ resta sotto radice: non si è razionalizzato nulla.`,
  chk: "simplify(((t**2 + 3)/(t**2 - 1) + 3)/((t**2 + 3)/(t**2 - 1) - 1) - t**2) == 0" },

{ id: "c1-rad-002",
  cap: 1,
  topic: "radicali",
  type: "mcq",
  diff: 2,
  src: "Dominio di una funzione irrazionale (errore alla lavagna)",
  q: String.raw`La funzione $\sqrt{\dfrac{x+3}{x-1}}$ è definita in`,
  options: [
    String.raw`$]-\infty,-3] \cup\, ]1,+\infty[$`,
    String.raw`$]-\infty,3]$`,
    String.raw`$[-3,1[$`,
    String.raw`$]1,+\infty[$`
  ],
  correct: 0,
  expl: String.raw`Serve $\frac{x+3}{x-1} \ge 0$ con $x \ne 1$: numeratore e denominatore concordi, cioè $x \le -3$ oppure $x > 1$. Le primitive si cercano poi in **uno** dei due intervalli.
  <br>B) È l'errore fatto alla lavagna: il dominio va ricalcolato con lo studio del segno.
  <br>C) È l'insieme in cui la frazione è $\le 0$.
  <br>D) Manca la semiretta $]-\infty,-3]$.`,
  chk: "solveset((x + 3)/(x - 1) >= 0, x, S.Reals) == Union(Interval(-oo, -3), Interval.open(1, oo))" },

{ id: "c1-abs-002",
  cap: 1,
  topic: "valore_assoluto",
  type: "mcq",
  diff: 2,
  src: "Primitiva di un valore assoluto",
  q: String.raw`La primitiva $F$ di $f(x) = |x - 1|$ in $]-\infty,+\infty[$ tale che $F(1) = 0$ è`,
  options: [
    String.raw`$F(x) = \dfrac{(x-1)^2}{2}$`,
    String.raw`$F(x) = \left|\dfrac{x^2}{2} - x\right|$`,
    String.raw`$F(x) = \dfrac{(x-1)\,|x-1|}{2} + 1$`,
    String.raw`$F(x) = \dfrac{(x-1)\,|x-1|}{2}$`
  ],
  correct: 3,
  expl: String.raw`Per $x \ge 1$: $f = x - 1$, primitiva $\frac{(x-1)^2}{2} + k_2$. Per $x < 1$: $f = 1 - x$, primitiva $-\frac{(x-1)^2}{2} + k_1$. Continuità in $1$: $k_1 = k_2$; $F(1) = 0$: $k_1 = k_2 = 0$. In una sola formula, $F(x) = \frac{(x-1)|x-1|}{2}$.
  <br>A) Per $x < 1$ ha derivata $x - 1 < 0$, non $|x-1|$.
  <br>B) In $x = 1$ vale $\frac12$, e non è derivabile in $0$ e in $2$.
  <br>C) È una primitiva, ma $F(1) = 1$.`,
  chk: "simplify(diff(-(x - 1)**2/2, x) - (1 - x)) == 0 and simplify(diff((x - 1)**2/2, x) - (x - 1)) == 0" },

{ id: "c1-abs-003",
  cap: 1,
  topic: "valore_assoluto",
  type: "mcq",
  diff: 2,
  src: "Esempio di prova 2026/27, quesito 3 (verifica veloce)",
  q: String.raw`Sia $F$ la primitiva in $]-\infty,+\infty[$ di $f(x) = |x+2| + 3x$ tale che $F(0) = 5$. Allora $F(-3) =$`,
  options: [
    "$20$",
    "$16$",
    "$17$",
    "$12$"
  ],
  correct: 1,
  expl: String.raw`Per $x < -2$: $f = 2x - 2$, $F = x^2 - 2x + k_1$. Per $x \ge -2$: $f = 4x + 2$, $F = 2x^2 + 2x + k_2$. Continuità in $-2$: $8 + k_1 = 4 + k_2$. Poiché $0 \ge -2$, $F(0) = k_2 = 5$, quindi $k_1 = 1$. $F(-3) = 9 + 6 + 1 = 16$.
  <br>A) Si è usato $k_1 = 5$: la condizione va imposta sul **ramo che contiene** $0$.
  <br>C) Si è usato il ramo per $x \ge -2$ in $x = -3$.
  <br>D) Errore di segno: $-2\cdot(-3) = +6$.`,
  chk: "(x**2 - 2*x + 1).subs(x, -3) == 16 and (x**2 - 2*x + 1).subs(x, -2) == (2*x**2 + 2*x + 5).subs(x, -2) and simplify(diff(x**2 - 2*x, x) - (-(x + 2) + 3*x)) == 0 and simplify(diff(2*x**2 + 2*x, x) - ((x + 2) + 3*x)) == 0" },

/* ---------------- integrali definiti ---------------- */

{ id: "c1-def-002",
  cap: 1,
  topic: "definiti",
  type: "mcq",
  diff: 1,
  src: "Formula fondamentale del calcolo integrale",
  q: String.raw`$\displaystyle\int_0^{\pi} \sin x\,dx =$`,
  options: [
    "$0$",
    "$-2$",
    "$2$",
    "$1$"
  ],
  correct: 2,
  expl: String.raw`Una primitiva è $-\cos x$: $\left[-\cos x\right]_0^{\pi} = -\cos\pi + \cos 0 = 1 + 1 = 2$.
  <br>A) Vale $0$ l'integrale su $[0, 2\pi]$.
  <br>B) Si è usata $\cos x$ come primitiva di $\sin x$.
  <br>D) Si è valutata solo $-\cos\pi$.`,
  chk: "integrate(sin(x), (x, 0, pi)) == 2" },

{ id: "c1-def-003",
  cap: 1,
  topic: "definiti",
  type: "mcq",
  diff: 2,
  src: "Prima la primitiva, poi la formula fondamentale",
  q: String.raw`$\displaystyle\int_1^e \frac{\log x}{x}\,dx =$`,
  options: [
    String.raw`$\frac12$`,
    "$1$",
    String.raw`$\frac{e}{2}$`,
    String.raw`$\frac{e^2}{2}$`
  ],
  correct: 0,
  expl: String.raw`Prima la primitiva (prima formula di sostituzione con $g = \log x$): $\int \frac{\log x}{x}\,dx = \frac{\log^2 x}{2} + k$. Poi la formula fondamentale: $\left[\frac{\log^2x}{2}\right]_1^e = \frac12 - 0$.
  <br>B) Manca il $\frac12$ della primitiva di $t$.
  <br>C) e D) Gli estremi vanno messi in $\log^2 x$, non in $x$.`,
  chk: "integrate(log(x)/x, (x, 1, E)) == Rational(1, 2)" },

{ id: "c1-def-004",
  cap: 1,
  topic: "definiti",
  type: "mcq",
  diff: 2,
  src: "Integrale di una funzione dispari su un intervallo simmetrico",
  q: String.raw`$\displaystyle\int_{-2}^{2} x^3\cos x\,dx =$`,
  options: [
    String.raw`$2\displaystyle\int_0^2 x^3\cos x\,dx$`,
    String.raw`non si può calcolare, perché $x^3\cos x$ non ha primitive elementari`,
    String.raw`$16\cos 2$`,
    "$0$"
  ],
  correct: 3,
  expl: String.raw`$f(x) = x^3\cos x$ è **dispari** ($f(-x) = -f(x)$) e l'intervallo è simmetrico rispetto a $0$: i contributi di $[-2,0]$ e $[0,2]$ si annullano.
  <br>A) Questa regola vale per le funzioni **pari**.
  <br>B) Ha primitive elementari (tre integrazioni per parti), ma non servono.
  <br>C) Non si "porta fuori" $\cos x$ calcolandolo in un estremo.`,
  chk: "integrate(x**3*cos(x), (x, -2, 2)) == 0" },

{ id: "c1-def-005",
  cap: 1,
  topic: "definiti",
  type: "mcq",
  diff: 2,
  src: "Integrale definito con sostituzione",
  q: String.raw`$\displaystyle\int_0^1 x\,e^{x^2}\,dx =$`,
  options: [
    String.raw`$e - 1$`,
    String.raw`$\dfrac{e - 1}{2}$`,
    String.raw`$\dfrac{e}{2}$`,
    String.raw`$\dfrac{e^2 - 1}{2}$`
  ],
  correct: 1,
  expl: String.raw`Prima la primitiva: $\int x\,e^{x^2}\,dx = \frac12\left[\int e^t\,dt\right]_{t = x^2} = \frac12e^{x^2} + k$. Poi $\left[\frac12e^{x^2}\right]_0^1 = \frac{e}{2} - \frac12$.
  <br>A) Manca il fattore $\frac12$ (si è dimenticato che $g'(x) = 2x$).
  <br>C) È stato dimenticato il valore nell'estremo $0$: $e^0 = 1$, non $0$.
  <br>D) In $e^{x^2}$ si mette $x = 1$, non $x^2 = 2$.`,
  chk: "integrate(x*exp(x**2), (x, 0, 1)) == (E - 1)/2" },

/* ---------------- più risposte giuste ---------------- */

{ id: "c1-prim-006",
  cap: 1,
  topic: "primitive",
  type: "multi",
  diff: 1,
  src: "Stile esempio di prova 2026/27 (più risposte giuste)",
  q: String.raw`Fra le seguenti funzioni individuare quelle che sono primitive di $f(x) = 2\sin x\cos x$ in $\mathbb{R}$.`,
  options: [
    String.raw`$\sin^2 x$`,
    String.raw`$-\cos^2 x$`,
    String.raw`$\cos^2 x$`,
    String.raw`$-\dfrac{\cos 2x}{2}$`,
    String.raw`$\dfrac{\sin 2x}{2}$`,
    String.raw`$2\sin x\cos x + k$`
  ],
  correct: [0, 1, 3],
  expl: String.raw`$D(\sin^2x) = 2\sin x\cos x$; $D(-\cos^2x) = 2\cos x\sin x$; $D\left(-\frac{\cos 2x}{2}\right) = \sin 2x = 2\sin x\cos x$. Le tre differiscono per costanti.
  <br>C) Ha derivata $-2\sin x\cos x$. E) Ha derivata $\cos 2x$. F) È la funzione stessa più una costante, non una primitiva.`,
  chk: "all(simplify(diff(F, x) - 2*sin(x)*cos(x)) == 0 for F in [sin(x)**2, -cos(x)**2, -cos(2*x)/2]) and all(simplify(diff(F, x) - 2*sin(x)*cos(x)) != 0 for F in [cos(x)**2, sin(2*x)/2])" },

{ id: "c1-sost-005",
  cap: 1,
  topic: "sostituzione",
  type: "multi",
  diff: 2,
  src: "Riconoscere la prima formula di sostituzione",
  q: String.raw`Fra i seguenti integrali individuare quelli che si calcolano direttamente con la **prima** formula di integrazione per sostituzione, riconoscendo nell'integranda la forma $f(g(x))\,g'(x)$.`,
  options: [
    String.raw`$\displaystyle\int 2x\cos(x^2)\,dx$`,
    String.raw`$\displaystyle\int e^{\sin x}\cos x\,dx$`,
    String.raw`$\displaystyle\int x\,e^x\,dx$`,
    String.raw`$\displaystyle\int \frac{\log x}{x}\,dx$`,
    String.raw`$\displaystyle\int x^2\cos x\,dx$`
  ],
  correct: [0, 1, 3],
  expl: String.raw`A) $g = x^2$, $f = \cos$. B) $g = \sin x$, $f = \exp$. D) $g = \log x$, $g' = \frac1x$, $f(t) = t$.
  <br>C) ed E) sono prodotti di un polinomio per una funzione che si sa integrare: si fanno **per parti**.`,
  chk: "simplify(diff(sin(x**2), x) - 2*x*cos(x**2)) == 0 and simplify(diff(exp(sin(x)), x) - exp(sin(x))*cos(x)) == 0 and simplify(diff(log(x)**2/2, x) - log(x)/x) == 0" },

{ id: "c1-riemann-007",
  cap: 1,
  topic: "riemann",
  type: "multi",
  diff: 2,
  src: "Definizione di integrale di Riemann",
  q: String.raw`Sia $f$ limitata in $[a,b]$. Fra le seguenti affermazioni individuare quelle vere.`,
  options: [
    String.raw`$s(f,D) \le S(f,D)$ per ogni decomposizione $D$ di $[a,b]$`,
    String.raw`$s(f,D) \le S(f,D')$ per ogni coppia di decomposizioni $D$, $D'$ di $[a,b]$`,
    String.raw`se $f$ è integrabile in $[a,b]$, allora $f$ è continua in $[a,b]$`,
    String.raw`$f$ è integrabile se e solo se esiste un unico elemento di separazione fra l'insieme delle somme inferiori e quello delle somme superiori`,
    String.raw`se $f$ è integrabile, esiste una decomposizione $D$ con $s(f,D) = S(f,D)$`
  ],
  correct: [0, 1, 3],
  expl: String.raw`A) In ogni intervallo l'estremo inferiore è $\le$ di quello superiore. B) Si confrontano entrambe con le somme della decomposizione $D \cup D'$. D) È la definizione: gli insiemi sono sempre separati, e $f$ è integrabile quando sono contigui.
  <br>C) Falso: una funzione a gradino con un salto è integrabile ma non continua. E) Falso in generale: succede solo per le funzioni costanti.` },

{ id: "c1-funzint-009",
  cap: 1,
  topic: "funzione_integrale",
  type: "multi",
  diff: 2,
  src: "Funzioni integrali e primitive",
  q: String.raw`Sia $f$ continua in $\mathbb{R}$. Fra le seguenti funzioni individuare quelle che sono primitive di $f$ in $\mathbb{R}$.`,
  options: [
    String.raw`$\displaystyle\int_0^x f(t)\,dt$`,
    String.raw`$\displaystyle\int_x^0 f(t)\,dt$`,
    String.raw`$\displaystyle\int_5^x f(t)\,dt + 3$`,
    String.raw`$\displaystyle\int_0^{2x} f(t)\,dt$`,
    String.raw`$\displaystyle\int_0^1 f(t)\,dt$`,
    String.raw`$\displaystyle\int_{-1}^x f(t)\,dt - \int_{-1}^0 f(t)\,dt$`
  ],
  correct: [0, 2, 5],
  expl: String.raw`A) È la funzione integrale di punto iniziale $0$. C) Funzione integrale più una costante. F) Per l'additività è uguale ad A.
  <br>B) Ha derivata $-f(x)$. D) Ha derivata $2f(2x)$. E) È un numero (una costante), con derivata $0$.` }

);

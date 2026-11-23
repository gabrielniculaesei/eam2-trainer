/* Capitolo 2 (equazioni differenziali): risposta multipla e più risposte giuste, nello stile delle prove.
   Schema: CONTRIBUTING.md. Ogni calcolo ha un campo chk (sympy) controllato da pnpm verify. */
(window.QUESTIONS = window.QUESTIONS || []).push(

/* ---------------- generalità ---------------- */

{ id: "c2-gen-004",
  cap: 2,
  topic: "generalita",
  type: "mcq",
  diff: 1,
  src: "Ordine di un'equazione differenziale",
  q: String.raw`L'ordine dell'equazione differenziale $y''' + (y')^4 = x^5$ è`,
  options: [
    "$4$",
    "$5$",
    "$3$",
    "$7$"
  ],
  correct: 2,
  expl: String.raw`L'ordine è quello della **derivata di ordine massimo** che compare: $y'''$, quindi $3$.
  <br>A) $4$ è l'esponente di $y'$: riguarda la linearità (l'equazione non è lineare), non l'ordine.
  <br>B) L'esponente di $x$ nel termine noto non c'entra.
  <br>D) Non si sommano gli ordini delle derivate.` },

{ id: "c2-gen-005",
  cap: 2,
  topic: "generalita",
  type: "mcq",
  diff: 1,
  src: "Definizione di soluzione",
  q: String.raw`Una soluzione dell'equazione differenziale $y'' + a(x)y' + b(x)y = f(x)$ in un intervallo $I$ è`,
  options: [
    "un numero reale che verifica l'equazione",
    String.raw`una funzione derivabile due volte in $I$ che verifica l'equazione in ogni punto di $I$`,
    "l'insieme di tutte le funzioni che verificano l'equazione",
    String.raw`una funzione che verifica l'equazione in almeno un punto di $I$`
  ],
  correct: 1,
  expl: String.raw`L'incognita di un'equazione differenziale è una **funzione**: deve avere le derivate che compaiono e soddisfare l'uguaglianza **per ogni** $x \in I$.
  <br>A) Le soluzioni non sono numeri.
  <br>C) Questo è l'integrale generale, cioè l'insieme di tutte le soluzioni.
  <br>D) Un solo punto non basta.` },

{ id: "c2-gen-006",
  cap: 2,
  topic: "generalita",
  type: "mcq",
  diff: 1,
  src: "Verificare che una funzione è soluzione",
  q: String.raw`Quale delle seguenti funzioni è soluzione dell'equazione differenziale $y'' + 4y = 0$?`,
  options: [
    String.raw`$y(x) = e^{2x}$`,
    String.raw`$y(x) = \sin 4x$`,
    String.raw`$y(x) = e^{-2x}$`,
    String.raw`$y(x) = \cos 2x$`
  ],
  correct: 3,
  expl: String.raw`$y = \cos 2x$: $y'' = -4\cos 2x$, quindi $y'' + 4y = 0$.
  <br>A) e C) $y'' = 4e^{\pm 2x}$, quindi $y'' + 4y = 8e^{\pm 2x} \ne 0$: risolvono $y'' - 4y = 0$.
  <br>B) $y'' = -16\sin 4x$: risolve $y'' + 16y = 0$.`,
  chk: "simplify(diff(cos(2*x), x, 2) + 4*cos(2*x)) == 0 and simplify(diff(exp(2*x), x, 2) + 4*exp(2*x)) != 0 and simplify(diff(sin(4*x), x, 2) + 4*sin(4*x)) != 0" },

{ id: "c2-gen-007",
  cap: 2,
  topic: "generalita",
  type: "mcq",
  diff: 1,
  src: "Classificazione di un'equazione differenziale",
  q: String.raw`L'equazione differenziale $y' + x^2y = \sin x$ è`,
  options: [
    "lineare del primo ordine e omogenea",
    "non lineare, perché compare il prodotto x²y",
    "lineare del primo ordine e non omogenea",
    "lineare del secondo ordine, perché compare x²"
  ],
  correct: 2,
  expl: String.raw`È del tipo $y' + a(x)y = f(x)$ con $a(x) = x^2$ e $f(x) = \sin x \ne 0$: lineare, primo ordine, **non omogenea**.
  <br>A) Il termine noto $\sin x$ non è identicamente nullo.
  <br>B) $x^2$ è un coefficiente (funzione di $x$): l'equazione resta di primo grado in $y$.
  <br>D) L'ordine dipende dalle derivate di $y$, non dalle potenze di $x$.` },

/* ---------------- lineari del primo ordine ---------------- */

{ id: "c2-primo-002",
  cap: 2,
  topic: "primo_ordine",
  type: "mcq",
  diff: 1,
  src: "Omogenea del primo ordine",
  q: String.raw`Siano $a$ continua nell'intervallo $I$ e $A$ una primitiva di $a$. L'integrale generale dell'equazione omogenea $y' + a(x)y = 0$ è`,
  options: [
    String.raw`$y(x) = k\,e^{A(x)}$, $k \in \mathbb{R}$`,
    String.raw`$y(x) = k\,e^{-A(x)}$, $k \in \mathbb{R}$`,
    String.raw`$y(x) = k\,e^{-a(x)}$, $k \in \mathbb{R}$`,
    String.raw`$y(x) = e^{-A(x)} + k$, $k \in \mathbb{R}$`
  ],
  correct: 1,
  expl: String.raw`$D\left(ke^{-A(x)}\right) = -a(x)\,ke^{-A(x)}$, quindi $y' + a(x)y = 0$. E ogni soluzione è di questa forma: $D\left(y\,e^{A(x)}\right) = (y' + ay)e^{A} = 0$.
  <br>A) Errore di segno: risolve $y' - a(x)y = 0$.
  <br>C) All'esponente va una **primitiva** di $a$, non $a$.
  <br>D) La costante moltiplica, non si somma (l'equazione è omogenea: i multipli di una soluzione sono soluzioni).`,
  chk: "simplify(diff(Symbol('k')*exp(-Function('A')(x)), x) + diff(Function('A')(x), x)*Symbol('k')*exp(-Function('A')(x))) == 0" },

{ id: "c2-primo-003",
  cap: 2,
  topic: "primo_ordine",
  type: "mcq",
  diff: 1,
  src: "Lineare del primo ordine a coefficiente costante",
  q: String.raw`L'integrale generale dell'equazione $y' + 2y = 4$ è`,
  options: [
    String.raw`$y(x) = 2 + k\,e^{-2x}$, $k \in \mathbb{R}$`,
    String.raw`$y(x) = 2 + k\,e^{2x}$, $k \in \mathbb{R}$`,
    String.raw`$y(x) = 4 + k\,e^{-2x}$, $k \in \mathbb{R}$`,
    String.raw`$y(x) = k\,e^{-2x}$, $k \in \mathbb{R}$`
  ],
  correct: 0,
  expl: String.raw`$a(x) = 2$, $A(x) = 2x$. Omogenea: $ke^{-2x}$. Variazione della costante: $k'(x) = 4e^{2x}$, $k(x) = 2e^{2x}$, quindi l'integrale particolare è $2e^{2x}e^{-2x} = 2$.
  <br>B) Segno sbagliato nell'esponente.
  <br>C) $y = 4$ non è soluzione: $0 + 8 \ne 4$.
  <br>D) È solo l'integrale generale dell'omogenea.`,
  chk: "simplify(diff(2 + Symbol('k')*exp(-2*x), x) + 2*(2 + Symbol('k')*exp(-2*x)) - 4) == 0" },

{ id: "c2-primo-004",
  cap: 2,
  topic: "primo_ordine",
  type: "mcq",
  diff: 2,
  src: "Lineare del primo ordine con coefficiente variabile",
  q: String.raw`L'integrale generale dell'equazione $y' - \dfrac{y}{x} = x$ in $]0,+\infty[$ è`,
  options: [
    String.raw`$y(x) = \dfrac{k}{x} + x^2$, $k \in \mathbb{R}$`,
    String.raw`$y(x) = kx + \dfrac{x^2}{2}$, $k \in \mathbb{R}$`,
    String.raw`$y(x) = k + x^2$, $k \in \mathbb{R}$`,
    String.raw`$y(x) = kx + x^2$, $k \in \mathbb{R}$`
  ],
  correct: 3,
  expl: String.raw`$a(x) = -\frac1x$, $A(x) = -\log x$, $e^{-A(x)} = x$. Omogenea: $kx$. Variazione della costante: $k'(x) = x\,e^{A(x)} = x\cdot\frac1x = 1$, $k(x) = x$. Quindi $y = kx + x\cdot x = kx + x^2$.
  <br>A) Si è usato $e^{A(x)}$ al posto di $e^{-A(x)}$.
  <br>B) Errore nel calcolo di $k(x)$: $\int 1\,dx = x$.
  <br>C) La soluzione dell'omogenea è $kx$, non $k$.`,
  chk: "simplify(diff(Symbol('k')*x + x**2, x) - (Symbol('k')*x + x**2)/x - x) == 0" },

{ id: "c2-primo-005",
  cap: 2,
  topic: "primo_ordine",
  type: "mcq",
  diff: 1,
  src: "Problema di Cauchy del primo ordine",
  q: String.raw`La soluzione del problema di Cauchy $y' = 3y$, $y(0) = 2$ è`,
  options: [
    String.raw`$y(x) = 3e^{2x}$`,
    String.raw`$y(x) = e^{3x} + 1$`,
    String.raw`$y(x) = 2e^{3x}$`,
    String.raw`$y(x) = 2e^{-3x}$`
  ],
  correct: 2,
  expl: String.raw`$y' - 3y = 0$: $a = -3$, $A = -3x$, integrale generale $ke^{3x}$. Da $y(0) = k = 2$ segue $y = 2e^{3x}$.
  <br>A) Sono stati scambiati coefficiente e valore iniziale.
  <br>B) Vale $2$ in $0$, ma $y' = 3e^{3x} \ne 3y$.
  <br>D) Errore di segno: risolve $y' = -3y$.`,
  chk: "simplify(diff(2*exp(3*x), x) - 3*2*exp(3*x)) == 0 and (2*exp(3*x)).subs(x, 0) == 2" },

{ id: "c2-primo-006",
  cap: 2,
  topic: "primo_ordine",
  type: "mcq",
  diff: 3,
  src: "Variazione della costante (dimostrazione)",
  q: String.raw`Per l'equazione $y' + a(x)y = f(x)$ si cerca una soluzione della forma $y(x) = k(x)\,e^{-A(x)}$, con $A$ primitiva di $a$. Sostituendo nell'equazione si ottiene`,
  options: [
    String.raw`$k'(x) = f(x)\,e^{A(x)}$`,
    String.raw`$k'(x) = f(x)\,e^{-A(x)}$`,
    String.raw`$k(x) = f(x)\,e^{A(x)}$`,
    String.raw`$k'(x)e^{-A(x)} - a(x)k(x)e^{-A(x)} = f(x)$`
  ],
  correct: 0,
  expl: String.raw`$y' = k'e^{-A} - a\,k\,e^{-A}$; sommando $a\,y = a\,k\,e^{-A}$ i termini con $k$ si cancellano e resta $k'(x)e^{-A(x)} = f(x)$, cioè $k'(x) = f(x)e^{A(x)}$.
  <br>B) Si è diviso per $e^{A}$ invece che per $e^{-A}$.
  <br>C) Si ottiene la derivata $k'$, non $k$: poi $k$ è una primitiva.
  <br>D) È solo $y'$: manca il termine $a(x)y$, che cancella $-a\,k\,e^{-A}$.`,
  chk: "simplify(diff(Function('k')(x)*exp(-Function('A')(x)), x) + diff(Function('A')(x), x)*Function('k')(x)*exp(-Function('A')(x)) - diff(Function('k')(x), x)*exp(-Function('A')(x))) == 0" },

{ id: "c2-primo-007",
  cap: 2,
  topic: "primo_ordine",
  type: "mcq",
  diff: 2,
  src: "Intervallo di definizione delle soluzioni",
  q: String.raw`Siano $a$ e $f$ continue nell'intervallo $I$. Le soluzioni dell'equazione $y' + a(x)y = f(x)$ sono definite`,
  options: [
    String.raw`solo in un intorno del punto iniziale $x_0$`,
    String.raw`nei punti di $I$ in cui $f(x) \ne 0$`,
    String.raw`in tutto $\mathbb{R}$`,
    String.raw`in tutto l'intervallo $I$`
  ],
  correct: 3,
  expl: String.raw`La formula $y = e^{-A(x)}\left(k + \int f(x)e^{A(x)}\,dx\right)$ ha senso in tutto $I$, perché $a$ e $f$ continue in $I$ hanno primitive in $I$.
  <br>A) Per le lineari le soluzioni sono globali, non solo locali.
  <br>B) $f$ può annullarsi senza problemi.
  <br>C) Fuori da $I$ i coefficienti possono non essere definiti (es. $a(x) = \frac1x$ con $I = ]0,+\infty[$).` },

/* ---------------- struttura dell'integrale generale ---------------- */

{ id: "c2-struct-002",
  cap: 2,
  topic: "struttura",
  type: "mcq",
  diff: 1,
  src: "Combinazioni lineari di soluzioni dell'omogenea",
  q: String.raw`Siano $y_1$ e $y_2$ soluzioni dell'equazione omogenea $y'' + a(x)y' + b(x)y = 0$. Allora $3y_1 - 2y_2$`,
  options: [
    "è soluzione dell'omogenea",
    String.raw`è soluzione dell'omogenea solo se $y_1$ e $y_2$ sono indipendenti`,
    String.raw`è soluzione dell'equazione con termine noto $3 - 2 = 1$`,
    String.raw`non è soluzione, perché i coefficienti $3$ e $-2$ non hanno somma nulla`
  ],
  correct: 0,
  expl: String.raw`L'operatore $L(y) = y'' + ay' + by$ è **lineare**: $L(3y_1 - 2y_2) = 3L(y_1) - 2L(y_2) = 0$. Ogni combinazione lineare di soluzioni dell'omogenea è soluzione dell'omogenea.
  <br>B) L'indipendenza non serve.
  <br>C) e D) Mescolano i coefficienti della combinazione con il termine noto: per l'omogenea vanno bene tutti.`,
  chk: "(lambda L: simplify(L(3*Function('u')(x) - 2*Function('v')(x)) - 3*L(Function('u')(x)) + 2*L(Function('v')(x))) == 0)(lambda y: diff(y, x, 2) + Function('a')(x)*diff(y, x) + Function('b')(x)*y)" },

{ id: "c2-struct-003",
  cap: 2,
  topic: "struttura",
  type: "mcq",
  diff: 2,
  src: "Simulazione P.I. 2025 (somma di soluzioni)",
  q: String.raw`Siano $y_1$ e $y_2$ due soluzioni dell'equazione $y'' + a(x)y' + b(x)y = f(x)$. Allora $y_1 + y_2$ è soluzione dell'equazione`,
  options: [
    String.raw`$y'' + a(x)y' + b(x)y = f(x)$`,
    String.raw`$y'' + a(x)y' + b(x)y = 0$`,
    String.raw`$y'' + a(x)y' + b(x)y = 2f(x)$`,
    String.raw`$y'' + 2a(x)y' + 2b(x)y = f(x)$`
  ],
  correct: 2,
  expl: String.raw`Per la linearità $L(y_1 + y_2) = L(y_1) + L(y_2) = f + f = 2f$.
  <br>A) Vale solo se $f \equiv 0$.
  <br>B) La **differenza** $y_1 - y_2$ risolve l'omogenea, non la somma.
  <br>D) I coefficienti dell'equazione non cambiano: cambia il termine noto.` },

{ id: "c2-struct-004",
  cap: 2,
  topic: "struttura",
  type: "mcq",
  diff: 1,
  src: "Simulazione P.I. 2025 (completa più omogenea)",
  q: String.raw`Siano $\bar y$ una soluzione di $y'' + a(x)y' + b(x)y = f(x)$ e $z$ una soluzione dell'omogenea associata. Allora $\bar y + z$`,
  options: [
    "risolve l'omogenea associata",
    String.raw`risolve l'equazione con termine noto $2f(x)$`,
    String.raw`risolve l'equazione completa solo se $z \equiv 0$`,
    "risolve l'equazione completa"
  ],
  correct: 3,
  expl: String.raw`$L(\bar y + z) = L(\bar y) + L(z) = f + 0 = f$. È il motivo per cui l'integrale generale della completa è "un integrale particolare più l'integrale generale dell'omogenea".
  <br>A) Darebbe $f$, non $0$.
  <br>B) Il termine $2f$ viene sommando due soluzioni della **completa**.
  <br>C) Vale per ogni $z$ soluzione dell'omogenea.` },

{ id: "c2-struct-005",
  cap: 2,
  topic: "struttura",
  type: "mcq",
  diff: 1,
  src: "Dimensione dello spazio delle soluzioni",
  q: String.raw`Siano $a$ e $b$ continue nell'intervallo $I$. L'insieme delle soluzioni dell'equazione omogenea $y'' + a(x)y' + b(x)y = 0$ è`,
  options: [
    "uno spazio vettoriale di dimensione infinita",
    "uno spazio vettoriale di dimensione 1",
    "un insieme formato da al più due funzioni",
    "uno spazio vettoriale di dimensione 2"
  ],
  correct: 3,
  expl: String.raw`È uno spazio vettoriale (combinazioni lineari di soluzioni sono soluzioni) e ha dimensione pari all'**ordine** dell'equazione: esistono due soluzioni indipendenti e ogni soluzione è loro combinazione lineare.
  <br>A) Bastano due soluzioni indipendenti per ottenerle tutte.
  <br>B) Dimensione $1$ è il caso del primo ordine.
  <br>C) Le soluzioni sono infinite (tutti i multipli di una soluzione non nulla).` },

{ id: "c2-struct-006",
  cap: 2,
  topic: "struttura",
  type: "mcq",
  diff: 2,
  src: "Integrale generale della completa",
  q: String.raw`Siano $y_1$, $y_2$ soluzioni indipendenti dell'omogenea associata a $y'' + a(x)y' + b(x)y = f(x)$ e $\bar y$ una soluzione della completa. L'integrale generale della completa è`,
  options: [
    String.raw`$k_1y_1 + k_2y_2$, $k_1, k_2 \in \mathbb{R}$`,
    String.raw`$k_1y_1 + k_2y_2 + \bar y$, $k_1, k_2 \in \mathbb{R}$`,
    String.raw`$k_1y_1 + k_2y_2 + k_3\bar y$, $k_1, k_2, k_3 \in \mathbb{R}$`,
    String.raw`$\bar y + k$, $k \in \mathbb{R}$`
  ],
  correct: 1,
  expl: String.raw`Se $y$ risolve la completa, $y - \bar y$ risolve l'omogenea, quindi $y - \bar y = k_1y_1 + k_2y_2$.
  <br>A) È l'integrale generale dell'omogenea.
  <br>C) $k_3\bar y$ risolve l'equazione con termine noto $k_3f$: il coefficiente di $\bar y$ deve essere $1$.
  <br>D) Aggiungere una costante non dà in generale una soluzione: si aggiungono soluzioni dell'**omogenea**.` },

/* ---------------- Wronskiano ---------------- */

{ id: "c2-wron-001",
  cap: 2,
  topic: "wronskiano",
  type: "mcq",
  diff: 1,
  src: "Calcolo del Wronskiano",
  q: String.raw`Il Wronskiano delle funzioni $y_1(x) = e^x$ e $y_2(x) = x\,e^x$ è`,
  options: [
    "$0$",
    String.raw`$x\,e^{2x}$`,
    String.raw`$e^{2x}$`,
    String.raw`$(1 + 2x)\,e^{2x}$`
  ],
  correct: 2,
  expl: String.raw`$W = \begin{vmatrix} e^x & xe^x \\ e^x & (1+x)e^x \end{vmatrix} = (1+x)e^{2x} - xe^{2x} = e^{2x}$, mai nullo: le due funzioni sono indipendenti.
  <br>A) Sarebbe $0$ se una fosse multipla dell'altra.
  <br>B) È il solo prodotto $y_2\,y_1'$.
  <br>D) Errore di segno: il Wronskiano è $y_1y_2' - y_2y_1'$.`,
  chk: "simplify(exp(x)*diff(x*exp(x), x) - x*exp(x)*diff(exp(x), x) - exp(2*x)) == 0" },

{ id: "c2-wron-002",
  cap: 2,
  topic: "wronskiano",
  type: "mcq",
  diff: 1,
  src: "Calcolo del Wronskiano (radici complesse)",
  q: String.raw`Il Wronskiano delle funzioni $y_1(x) = \cos 2x$ e $y_2(x) = \sin 2x$ è`,
  options: [
    "$1$",
    "$2$",
    "$0$",
    String.raw`$\cos 4x$`
  ],
  correct: 1,
  expl: String.raw`$W = \cos 2x \cdot 2\cos 2x - \sin 2x \cdot(-2\sin 2x) = 2(\cos^2 2x + \sin^2 2x) = 2$.
  <br>A) Manca il fattore $2$ delle derivate.
  <br>C) Le funzioni non sono proporzionali.
  <br>D) Errore di segno: $2(\cos^2 2x - \sin^2 2x) = 2\cos 4x$, e manca anche il $2$.`,
  chk: "simplify(cos(2*x)*diff(sin(2*x), x) - sin(2*x)*diff(cos(2*x), x)) == 2" },

{ id: "c2-wron-003",
  cap: 2,
  topic: "wronskiano",
  type: "mcq",
  diff: 2,
  src: "P.I. 2025: il Wronskiano è identicamente nullo o mai nullo",
  q: String.raw`Siano $y_1$, $y_2$ soluzioni di $y'' + a(x)y' + b(x)y = 0$ ($a$, $b$ continue in $I$) e sia $W(x_0) = 0$ in un punto $x_0 \in I$. Allora`,
  options: [
    String.raw`$W \equiv 0$ in $I$, e $y_1$, $y_2$ sono dipendenti`,
    String.raw`$W$ si annulla soltanto in $x_0$`,
    String.raw`$y_1$ e $y_2$ sono indipendenti, perché $W$ non è identicamente nullo`,
    String.raw`non si può dire nulla senza calcolare $W$ negli altri punti`
  ],
  correct: 0,
  expl: String.raw`Per le soluzioni di un'omogenea il Wronskiano è **identicamente nullo oppure mai nullo**: se si annulla in un punto, si annulla ovunque e le soluzioni sono dipendenti.
  <br>B) e C) Sarebbero possibili per funzioni qualsiasi, non per soluzioni della stessa omogenea.
  <br>D) Basta un punto, per il teorema citato.` },

{ id: "c2-wron-004",
  cap: 2,
  topic: "wronskiano",
  type: "mcq",
  diff: 3,
  src: "Wronskiano di funzioni che non sono soluzioni di una stessa omogenea",
  q: String.raw`Le funzioni $y_1(x) = x$ e $y_2(x) = x^2$ hanno Wronskiano $W(x) = x^2$, che si annulla in $0$ ma non altrove. Che cosa se ne deduce?`,
  options: [
    String.raw`$y_1$ e $y_2$ sono linearmente dipendenti in $\mathbb{R}$`,
    String.raw`il teorema "$W$ identicamente nullo o mai nullo" è falso`,
    String.raw`$x$ e $x^2$ sono soluzioni di un'omogenea $y'' + a(x)y' + b(x)y = 0$ con $a$, $b$ continue in $\mathbb{R}$`,
    String.raw`$x$ e $x^2$ non possono essere entrambe soluzioni di un'omogenea $y'' + a(x)y' + b(x)y = 0$ con $a$, $b$ continue in un intervallo contenente $0$`
  ],
  correct: 3,
  expl: String.raw`$W = x\cdot 2x - x^2\cdot 1 = x^2$: nullo in $0$, non nullo altrove. Se fossero soluzioni di una stessa omogenea con coefficienti continui, $W$ sarebbe identicamente nullo o mai nullo: **assurdo**.
  <br>A) Non sono proporzionali, quindi sono indipendenti.
  <br>B) Il teorema vale per le **soluzioni** di un'omogenea, non per funzioni qualsiasi.
  <br>C) È proprio ciò che si esclude.`,
  chk: "simplify(x*diff(x**2, x) - x**2*diff(x, x) - x**2) == 0" },

/* ---------------- coefficienti costanti ---------------- */

{ id: "c2-coef-004",
  cap: 2,
  topic: "coeff_costanti",
  type: "mcq",
  diff: 1,
  src: "Equazione caratteristica con discriminante positivo",
  q: String.raw`L'integrale generale dell'equazione $y'' - 5y' + 6y = 0$ è`,
  options: [
    String.raw`$y(x) = k_1e^{-2x} + k_2e^{-3x}$`,
    String.raw`$y(x) = k_1e^{2x} + k_2e^{3x}$`,
    String.raw`$y(x) = (k_1 + k_2x)\,e^{2x}$`,
    String.raw`$y(x) = k_1e^{2x} + k_2x\,e^{3x}$`
  ],
  correct: 1,
  expl: String.raw`Eq. caratteristica $\alpha^2 - 5\alpha + 6 = 0$, radici reali distinte $2$ e $3$: soluzioni indipendenti $e^{2x}$ ed $e^{3x}$.
  <br>A) Segni delle radici sbagliati: sono le radici di $\alpha^2 + 5\alpha + 6$.
  <br>C) Il fattore $x$ serve solo con radice **doppia**.
  <br>D) Stesso errore: entrambe le radici sono semplici.`,
  chk: "set(solve(Symbol('a')**2 - 5*Symbol('a') + 6, Symbol('a'))) == {2, 3}" },

{ id: "c2-coef-005",
  cap: 2,
  topic: "coeff_costanti",
  type: "mcq",
  diff: 1,
  src: "Equazione caratteristica con discriminante nullo",
  q: String.raw`L'integrale generale dell'equazione $y'' + 6y' + 9y = 0$ è`,
  options: [
    String.raw`$y(x) = k_1e^{-3x} + k_2e^{3x}$`,
    String.raw`$y(x) = (k_1 + k_2x)\,e^{3x}$`,
    String.raw`$y(x) = k_1e^{-3x} + k_2e^{-3x}$`,
    String.raw`$y(x) = (k_1 + k_2x)\,e^{-3x}$`
  ],
  correct: 3,
  expl: String.raw`$\alpha^2 + 6\alpha + 9 = (\alpha + 3)^2$: radice $-3$ **doppia**, soluzioni indipendenti $e^{-3x}$ e $xe^{-3x}$.
  <br>A) $3$ non è radice.
  <br>B) Segno della radice sbagliato.
  <br>C) $k_1e^{-3x} + k_2e^{-3x} = (k_1 + k_2)e^{-3x}$: è una sola soluzione, non due indipendenti.`,
  chk: "simplify(diff(x*exp(-3*x), x, 2) + 6*diff(x*exp(-3*x), x) + 9*x*exp(-3*x)) == 0" },

{ id: "c2-coef-006",
  cap: 2,
  topic: "coeff_costanti",
  type: "mcq",
  diff: 2,
  src: "Equazione caratteristica con discriminante negativo",
  q: String.raw`L'integrale generale dell'equazione $y'' + 4y' + 13y = 0$ è`,
  options: [
    String.raw`$y(x) = e^{2x}(k_1\cos 3x + k_2\sin 3x)$`,
    String.raw`$y(x) = e^{-3x}(k_1\cos 2x + k_2\sin 2x)$`,
    String.raw`$y(x) = e^{-2x}(k_1\cos 3x + k_2\sin 3x)$`,
    String.raw`$y(x) = k_1e^{-2x} + k_2e^{3x}$`
  ],
  correct: 2,
  expl: String.raw`$\alpha = \frac{-4 \pm \sqrt{16 - 52}}{2} = -2 \pm 3i$, quindi $\beta = -2$, $\gamma = 3$: soluzioni $e^{-2x}\cos 3x$ ed $e^{-2x}\sin 3x$.
  <br>A) Segno di $\beta$ sbagliato.
  <br>B) Parte reale e parte immaginaria scambiate.
  <br>D) Parte reale e immaginaria usate come se fossero due radici reali.`,
  chk: "simplify(diff(exp(-2*x)*sin(3*x), x, 2) + 4*diff(exp(-2*x)*sin(3*x), x) + 13*exp(-2*x)*sin(3*x)) == 0 and simplify(diff(exp(-2*x)*cos(3*x), x, 2) + 4*diff(exp(-2*x)*cos(3*x), x) + 13*exp(-2*x)*cos(3*x)) == 0" },

{ id: "c2-coef-007",
  cap: 2,
  topic: "coeff_costanti",
  type: "mcq",
  diff: 2,
  src: "Dall'integrale generale all'equazione",
  q: String.raw`L'integrale generale di un'equazione omogenea a coefficienti costanti del secondo ordine è $y(x) = k_1e^{x} + k_2e^{-4x}$. L'equazione è`,
  options: [
    String.raw`$y'' + 3y' - 4y = 0$`,
    String.raw`$y'' - 3y' - 4y = 0$`,
    String.raw`$y'' + 3y' + 4y = 0$`,
    String.raw`$y'' - 4y = 0$`
  ],
  correct: 0,
  expl: String.raw`Le radici dell'eq. caratteristica devono essere $1$ e $-4$: $(\alpha - 1)(\alpha + 4) = \alpha^2 + 3\alpha - 4$.
  <br>B) Ha radici $-1$ e $4$ (segni scambiati).
  <br>C) Ha $\Delta = 9 - 16 < 0$: radici complesse.
  <br>D) Ha radici $\pm 2$.`,
  chk: "expand((Symbol('a') - 1)*(Symbol('a') + 4)) == Symbol('a')**2 + 3*Symbol('a') - 4" },

{ id: "c2-coef-008",
  cap: 2,
  topic: "coeff_costanti",
  type: "mcq",
  diff: 2,
  src: "Omogenea di ordine 3",
  q: String.raw`L'integrale generale dell'equazione $y''' - y' = 0$ è`,
  options: [
    String.raw`$y(x) = k_1x + k_2e^x + k_3e^{-x}$`,
    String.raw`$y(x) = k_1e^x + k_2e^{-x}$`,
    String.raw`$y(x) = (k_1 + k_2x + k_3x^2)\,e^x$`,
    String.raw`$y(x) = k_1 + k_2e^x + k_3e^{-x}$`
  ],
  correct: 3,
  expl: String.raw`$\alpha^3 - \alpha = \alpha(\alpha - 1)(\alpha + 1)$: radici semplici $0$, $1$, $-1$, soluzioni $1$, $e^x$, $e^{-x}$.
  <br>A) La radice $0$ semplice dà $e^{0x} = 1$, non $x$.
  <br>B) L'ordine è $3$: servono tre soluzioni indipendenti.
  <br>C) Corrisponderebbe alla radice $1$ tripla.`,
  chk: "all(simplify(diff(y, x, 3) - diff(y, x)) == 0 for y in [1 + 0*x, exp(x), exp(-x)])" },

{ id: "c2-coef-009",
  cap: 2,
  topic: "coeff_costanti",
  type: "mcq",
  diff: 1,
  src: "Lezione 05/11 (errore alla lavagna sull'omogenea)",
  q: String.raw`L'integrale generale dell'equazione $y'' + y = 0$ è`,
  options: [
    String.raw`$y(x) = k_1e^x + k_2e^{-x}$`,
    String.raw`$y(x) = k_1\cos x + k_2\sin x$`,
    String.raw`$y(x) = \cos x + i\sin x$`,
    String.raw`$y(x) = k_1\cos x + k_2x\cos x$`
  ],
  correct: 1,
  expl: String.raw`$\alpha^2 + 1 = 0$, radici $\pm i$ ($\beta = 0$, $\gamma = 1$): soluzioni reali indipendenti $\cos x$ e $\sin x$.
  <br>A) Sono le soluzioni di $y'' - y = 0$.
  <br>C) È una sola funzione, e complessa: l'integrale generale è l'insieme delle combinazioni **reali** di $\cos x$ e $\sin x$.
  <br>D) $x\cos x$ comparirebbe con radici doppie.`,
  chk: "simplify(diff(sin(x), x, 2) + sin(x)) == 0 and simplify(diff(cos(x), x, 2) + cos(x)) == 0" },

/* ---------------- metodo di somiglianza ---------------- */

{ id: "c2-somi-004",
  cap: 2,
  topic: "somiglianza",
  type: "mcq",
  diff: 1,
  src: "Forma dell'integrale particolare (s = 0)",
  q: String.raw`Una soluzione dell'equazione differenziale $y'' - 3y' + 2y = e^{5x}$ è del tipo`,
  options: [
    String.raw`$\bar y = a\,x\,e^{5x}$`,
    String.raw`$\bar y = (ax + b)\,e^{5x}$`,
    String.raw`$\bar y = a\,x^2e^{5x}$`,
    String.raw`$\bar y = a\,e^{5x}$`
  ],
  correct: 3,
  expl: String.raw`$f(x) = e^{5x}p(x)$ con $h = 5$ e $p = 1$ ($m = 0$). Le radici dell'eq. caratteristica sono $1$ e $2$: $h$ non è radice, quindi $s = 0$ e $\bar y = e^{5x}q(x)$ con $q$ di grado $0$.
  <br>A) e C) Il fattore $x^s$ serve solo se $h$ è radice.
  <br>B) $m = 0$: il polinomio $q$ ha grado $0$.`,
  chk: "simplify(diff(exp(5*x)/12, x, 2) - 3*diff(exp(5*x)/12, x) + 2*exp(5*x)/12 - exp(5*x)) == 0" },

{ id: "c2-somi-005",
  cap: 2,
  topic: "somiglianza",
  type: "mcq",
  diff: 2,
  src: "Forma dell'integrale particolare (s = 1)",
  q: String.raw`Una soluzione dell'equazione differenziale $y'' - 3y' + 2y = x\,e^{2x}$ è del tipo`,
  options: [
    String.raw`$\bar y = (ax + b)\,e^{2x}$`,
    String.raw`$\bar y = x(ax + b)\,e^{2x}$`,
    String.raw`$\bar y = x^2(ax + b)\,e^{2x}$`,
    String.raw`$\bar y = a\,x\,e^{2x}$`
  ],
  correct: 1,
  expl: String.raw`$h = 2$, $m = 1$. Le radici sono $1$ e $2$: $h = 2$ è radice **semplice**, quindi $s = 1$ e $\bar y = x\,e^{2x}(ax + b)$.
  <br>A) Ignora che $h$ è radice: sostituendo, il termine $be^{2x}$ si annulla e non si riesce a ottenere $xe^{2x}$.
  <br>C) $s = 2$ servirebbe con radice doppia.
  <br>D) Il polinomio $q$ deve essere completo, di grado $m = 1$: $ax + b$, non $ax$ (qui moltiplicato per $x^s$).`,
  chk: "(lambda y: solve(Poly(expand(simplify((diff(y, x, 2) - 3*diff(y, x) + 2*y)/exp(2*x) - x)), x).coeffs(), [Symbol('a'), Symbol('b')]))(x*(Symbol('a')*x + Symbol('b'))*exp(2*x)) == {Symbol('a'): Rational(1, 2), Symbol('b'): -1}" },

{ id: "c2-somi-006",
  cap: 2,
  topic: "somiglianza",
  type: "mcq",
  diff: 2,
  src: "Integrale particolare con radice doppia (s = 2)",
  q: String.raw`Un integrale particolare dell'equazione $y'' - 4y' + 4y = 3e^{2x}$ è`,
  options: [
    String.raw`$\bar y = 3x^2e^{2x}$`,
    String.raw`$\bar y = \frac32\,x\,e^{2x}$`,
    String.raw`$\bar y = \frac32\,x^2e^{2x}$`,
    String.raw`$\bar y = 3e^{2x}$`
  ],
  correct: 2,
  expl: String.raw`$(\alpha - 2)^2 = 0$: $h = 2$ è radice doppia, $s = 2$, $\bar y = a\,x^2e^{2x}$. Sostituendo si ottiene $2a\,e^{2x} = 3e^{2x}$, cioè $a = \frac32$.
  <br>A) Manca la divisione per $2$.
  <br>B) e D) Con $s = 1$ o $s = 0$ si ottiene un'equazione impossibile: $xe^{2x}$ ed $e^{2x}$ risolvono l'omogenea.`,
  chk: "simplify(diff(Rational(3, 2)*x**2*exp(2*x), x, 2) - 4*diff(Rational(3, 2)*x**2*exp(2*x), x) + 4*Rational(3, 2)*x**2*exp(2*x) - 3*exp(2*x)) == 0" },

{ id: "c2-somi-007",
  cap: 2,
  topic: "somiglianza",
  type: "mcq",
  diff: 2,
  src: "Termine noto polinomiale con radice nulla",
  q: String.raw`Un integrale particolare dell'equazione $y'' + y' = x$ è`,
  options: [
    String.raw`$\bar y = \dfrac{x^2}{2} - x$`,
    String.raw`$\bar y = x - 1$`,
    String.raw`$\bar y = \dfrac{x^2}{2} + x$`,
    String.raw`$\bar y = \dfrac{x^2}{2}$`
  ],
  correct: 0,
  expl: String.raw`$f(x) = x = e^{0x}x$: $h = 0$, $m = 1$. Radici di $\alpha^2 + \alpha$: $0$ e $-1$, quindi $s = 1$ e $\bar y = x(ax + b)$. Sostituendo: $2a + 2ax + b = x$, da cui $a = \frac12$, $b = -1$.
  <br>B) Con $s = 0$: $\bar y = ax + b$ dà $a = x$, impossibile; inoltre $D(x-1) = 1 \ne x$.
  <br>C) Errore di segno su $b$.
  <br>D) Manca il termine in $x$: $\bar y'' + \bar y' = 1 + x$.`,
  chk: "simplify(diff(x**2/2 - x, x, 2) + diff(x**2/2 - x, x) - x) == 0" },

{ id: "c2-somi-008",
  cap: 2,
  topic: "somiglianza",
  type: "mcq",
  diff: 2,
  src: "Integrale particolare con risonanza (s = 1)",
  q: String.raw`Un integrale particolare dell'equazione $y'' - y = e^{x}$ è`,
  options: [
    String.raw`$\bar y = \frac12\,e^{x}$`,
    String.raw`$\bar y = x\,e^{x}$`,
    String.raw`$\bar y = -\frac12\,x\,e^{x}$`,
    String.raw`$\bar y = \frac12\,x\,e^{x}$`
  ],
  correct: 3,
  expl: String.raw`Radici $\pm1$: $h = 1$ è radice semplice, $s = 1$, $\bar y = a\,xe^x$. $\bar y'' = a(x + 2)e^x$, quindi $\bar y'' - \bar y = 2a\,e^x = e^x$ e $a = \frac12$.
  <br>A) Con $s = 0$: $e^x$ risolve l'omogenea, $\bar y'' - \bar y = 0$.
  <br>B) Manca la divisione per $2$.
  <br>C) Errore di segno.`,
  chk: "simplify(diff(x*exp(x)/2, x, 2) - x*exp(x)/2 - exp(x)) == 0" },

{ id: "c2-somi-009",
  cap: 2,
  topic: "somiglianza",
  type: "mcq",
  diff: 3,
  src: "P.I. 24/11/2023 (sovrapposizione)",
  q: String.raw`Per trovare un integrale particolare dell'equazione $y'' - y' - 6y = x\,e^{-2x} + 2x\,e^{x}$ si cerca`,
  options: [
    String.raw`$\bar y = (ax + b)\,e^{-2x} + (cx + d)\,e^{x}$`,
    String.raw`$\bar y = x(ax + b)\,e^{-2x} + x(cx + d)\,e^{x}$`,
    String.raw`$\bar y = (ax + b)\left(e^{-2x} + e^{x}\right)$`,
    String.raw`$\bar y = x(ax + b)\,e^{-2x} + (cx + d)\,e^{x}$`
  ],
  correct: 3,
  expl: String.raw`Principio di **sovrapposizione**: si cerca un integrale particolare per ciascun addendo e si sommano. Radici di $\alpha^2 - \alpha - 6$: $3$ e $-2$.
  <br>Per $xe^{-2x}$: $h = -2$ è radice semplice, $s = 1$. Per $2xe^{x}$: $h = 1$ non è radice, $s = 0$.
  <br>A) Dimentica $s = 1$ nel primo addendo. B) Mette $s = 1$ anche dove non serve. C) Usa lo stesso polinomio per due esponenziali diversi.`,
  chk: "set(solve(Symbol('a')**2 - Symbol('a') - 6, Symbol('a'))) == {3, -2}" },

/* ---------------- seno e coseno ---------------- */

{ id: "c2-sinc-002",
  cap: 2,
  topic: "seno_coseno",
  type: "mcq",
  diff: 2,
  src: "Termine noto con seno (metodo della docente)",
  q: String.raw`Per trovare un integrale particolare di $y'' + 4y = \sin 2x$ con il metodo visto a lezione si risolve $y'' + 4y = e^{2ix}$ e poi`,
  options: [
    String.raw`se ne prende la parte reale, con $s = 1$ perché $2i$ è radice dell'eq. caratteristica`,
    String.raw`se ne prende la parte immaginaria, con $s = 1$ perché $2i$ è radice dell'eq. caratteristica`,
    String.raw`se ne prende la parte immaginaria, con $s = 0$ perché $2i$ non è reale`,
    String.raw`se ne prende il modulo, con $s = 0$`
  ],
  correct: 1,
  expl: String.raw`$\sin 2x = \operatorname{Im}(e^{2ix})$: si prende la **parte immaginaria** della soluzione complessa. Le radici di $\alpha^2 + 4$ sono $\pm 2i$, e $h = 2i$ è radice semplice: $s = 1$, $\bar z = a\,x\,e^{2ix}$.
  <br>A) La parte reale serve per $\cos 2x$.
  <br>C) Anche le radici complesse contano per $s$: si confronta $h$ con le radici.
  <br>D) Il modulo non risolve l'equazione.` },

{ id: "c2-sinc-003",
  cap: 2,
  topic: "seno_coseno",
  type: "mcq",
  diff: 2,
  src: "Termine noto con coseno, senza risonanza",
  q: String.raw`Un integrale particolare dell'equazione $y'' + y = \cos 2x$ è`,
  options: [
    String.raw`$\bar y = \frac13\cos 2x$`,
    String.raw`$\bar y = -\frac13\cos 2x$`,
    String.raw`$\bar y = -\frac13\sin 2x$`,
    String.raw`$\bar y = -\frac15\cos 2x$`
  ],
  correct: 1,
  expl: String.raw`Si risolve $z'' + z = e^{2ix}$: $h = 2i$ non è radice ($\pm i$), $s = 0$, $\bar z = a\,e^{2ix}$. Sostituendo: $(-4 + 1)a = 1$, $a = -\frac13$. Parte reale: $-\frac13\cos 2x$.
  <br>A) Errore di segno: $(2i)^2 = -4$.
  <br>C) È la parte immaginaria (servirebbe per $\sin 2x$).
  <br>D) Si è calcolato $-4 - 1$ invece di $-4 + 1$.`,
  chk: "simplify(diff(-cos(2*x)/3, x, 2) - cos(2*x)/3 - cos(2*x)) == 0" },

{ id: "c2-sinc-004",
  cap: 2,
  topic: "seno_coseno",
  type: "mcq",
  diff: 3,
  src: "Termine noto con seno, con risonanza",
  q: String.raw`Un integrale particolare dell'equazione $y'' + y = \sin x$ è`,
  options: [
    String.raw`$\bar y = -\frac{x}{2}\cos x$`,
    String.raw`$\bar y = \frac{x}{2}\sin x$`,
    String.raw`$\bar y = -\frac12\cos x$`,
    String.raw`$\bar y = \frac{x}{2}\cos x$`
  ],
  correct: 0,
  expl: String.raw`$z'' + z = e^{ix}$: $h = i$ è radice semplice, $s = 1$, $\bar z = a\,x\,e^{ix}$. Sostituendo: $2ia = 1$, $a = -\frac i2$. $\bar z = -\frac i2\,x(\cos x + i\sin x) = \frac x2\sin x - i\,\frac x2\cos x$. Parte **immaginaria**: $-\frac x2\cos x$.
  <br>B) È la parte reale.
  <br>C) Con $s = 0$: $\cos x$ risolve l'omogenea.
  <br>D) Errore di segno in $a = \frac{1}{2i} = -\frac i2$.`,
  chk: "simplify(diff(-x*cos(x)/2, x, 2) - x*cos(x)/2 - sin(x)) == 0" },

{ id: "c2-sinc-005",
  cap: 2,
  topic: "seno_coseno",
  type: "mcq",
  diff: 1,
  src: "Parte reale e parte immaginaria",
  q: String.raw`Il termine noto è $f(x) = e^{hx}\cos bx$ e si risolve l'equazione con termine noto $e^{(h + ib)x}$. L'integrale particolare cercato è`,
  options: [
    "la soluzione complessa trovata, così com'è",
    "la parte immaginaria della soluzione complessa",
    "la parte reale della soluzione complessa",
    "il modulo della soluzione complessa"
  ],
  correct: 2,
  expl: String.raw`$e^{hx}\cos bx = \operatorname{Re}\left(e^{(h+ib)x}\right)$. Poiché i coefficienti sono **reali**, la parte reale di una soluzione con termine noto complesso risolve l'equazione con la parte reale del termine noto.
  <br>A) È una funzione complessa: risolve l'equazione con termine noto $e^{(h+ib)x}$.
  <br>B) Serve per $e^{hx}\sin bx$.
  <br>D) Il modulo non è lineare: non si conserva l'equazione.` },

/* ---------------- problemi di Cauchy ---------------- */

{ id: "c2-cauchy-001",
  cap: 2,
  topic: "cauchy",
  type: "mcq",
  diff: 1,
  src: "Esistenza e unicità per il problema di Cauchy",
  q: String.raw`Il problema di Cauchy $y'' + y = 0$, $y(0) = 0$, $y'(0) = 0$ ha`,
  options: [
    "infinite soluzioni, del tipo k sin x",
    "nessuna soluzione",
    "due soluzioni, cos x e sin x",
    "solo la soluzione identicamente nulla"
  ],
  correct: 3,
  expl: String.raw`La funzione nulla è soluzione, e per il teorema di **esistenza e unicità** è l'unica.
  <br>A) $(k\sin x)'$ in $0$ vale $k$: le condizioni impongono $k = 0$.
  <br>B) L'esistenza è garantita (coefficienti continui).
  <br>C) $\cos 0 = 1 \ne 0$ e $(\sin x)'(0) = 1 \ne 0$.` },

{ id: "c2-cauchy-002",
  cap: 2,
  topic: "cauchy",
  type: "mcq",
  diff: 2,
  src: "Problema di Cauchy per un'omogenea",
  q: String.raw`La soluzione del problema di Cauchy $y'' - y = 0$, $y(0) = 2$, $y'(0) = 0$ è`,
  options: [
    String.raw`$y(x) = 2e^{x}$`,
    String.raw`$y(x) = e^{x} + e^{-x}$`,
    String.raw`$y(x) = e^{x} - e^{-x}$`,
    String.raw`$y(x) = 2e^{-x}$`
  ],
  correct: 1,
  expl: String.raw`Integrale generale $k_1e^x + k_2e^{-x}$. Condizioni: $k_1 + k_2 = 2$, $k_1 - k_2 = 0$, quindi $k_1 = k_2 = 1$.
  <br>A) e D) Valgono $2$ in $0$, ma la derivata in $0$ vale $\pm 2$.
  <br>C) Vale $0$ in $0$.`,
  chk: "(lambda y: simplify(diff(y, x, 2) - y) == 0 and y.subs(x, 0) == 2 and diff(y, x).subs(x, 0) == 0)(exp(x) + exp(-x))" },

{ id: "c2-cauchy-003",
  cap: 2,
  topic: "cauchy",
  type: "mcq",
  diff: 1,
  src: "Errore tipico nei problemi di Cauchy",
  q: String.raw`Nel problema di Cauchy per $y'' + ay' + by = f(x)$, $y(x_0) = y_0$, $y'(x_0) = y_1$, le condizioni iniziali si impongono`,
  options: [
    String.raw`all'integrale generale dell'omogenea associata, e poi si aggiunge $\bar y$`,
    String.raw`all'integrale particolare $\bar y$`,
    "all'integrale generale della completa",
    String.raw`all'eq. caratteristica, per trovare $k_1$ e $k_2$`
  ],
  correct: 2,
  expl: String.raw`Si scrive **prima** l'integrale generale della completa, $y = k_1y_1 + k_2y_2 + \bar y$, e **poi** si impongono le condizioni per ricavare $k_1$, $k_2$.
  <br>A) Errore frequente: aggiungendo $\bar y$ dopo, i valori in $x_0$ cambiano e le condizioni non valgono più.
  <br>B) $\bar y$ non ha costanti libere.
  <br>D) L'eq. caratteristica dà le radici, non le costanti.` },

{ id: "c2-cauchy-004",
  cap: 2,
  topic: "cauchy",
  type: "mcq",
  diff: 2,
  src: "Problema di Cauchy con radice nulla",
  q: String.raw`La soluzione del problema di Cauchy $y'' - 2y' = 0$, $y(0) = 1$, $y'(0) = 4$ è`,
  options: [
    String.raw`$y(x) = 4e^{2x} - 3$`,
    String.raw`$y(x) = 1 + 4x$`,
    String.raw`$y(x) = -1 + 2e^{-2x}$`,
    String.raw`$y(x) = 2e^{2x} - 1$`
  ],
  correct: 3,
  expl: String.raw`Radici $0$ e $2$: $y = k_1 + k_2e^{2x}$, $y' = 2k_2e^{2x}$. Da $y'(0) = 2k_2 = 4$: $k_2 = 2$; da $y(0) = k_1 + 2 = 1$: $k_1 = -1$.
  <br>A) Si è dimenticato il fattore $2$ nella derivata.
  <br>B) Rispetta le condizioni ma non l'equazione: $0 - 8 \ne 0$.
  <br>C) Segno dell'esponente sbagliato (e $y'(0) = -4$).`,
  chk: "(lambda y: simplify(diff(y, x, 2) - 2*diff(y, x)) == 0 and y.subs(x, 0) == 1 and diff(y, x).subs(x, 0) == 4)(2*exp(2*x) - 1)" },

{ id: "c2-malthus-002",
  cap: 2,
  topic: "malthus",
  type: "mcq",
  diff: 1,
  src: "Modello di Malthus",
  q: String.raw`La soluzione del modello di Malthus $N'(t) = \varepsilon N(t)$, $N(0) = N_0$ è`,
  options: [
    String.raw`$N(t) = N_0\,e^{\varepsilon t}$`,
    String.raw`$N(t) = e^{\varepsilon t} + N_0$`,
    String.raw`$N(t) = N_0\,e^{-\varepsilon t}$`,
    String.raw`$N(t) = N_0(1 + \varepsilon t)$`
  ],
  correct: 0,
  expl: String.raw`È una lineare omogenea del primo ordine: $N' - \varepsilon N = 0$, integrale generale $ke^{\varepsilon t}$; da $N(0) = k = N_0$.
  <br>B) $N(0) = 1 + N_0$, e non risolve l'equazione.
  <br>C) Segno sbagliato: $A(t) = -\varepsilon t$, quindi $e^{-A} = e^{\varepsilon t}$.
  <br>D) È solo l'approssimazione lineare per $t$ piccolo.`,
  chk: "(lambda N: simplify(diff(N, t) - Symbol('e')*N) == 0 and N.subs(t, 0) == Symbol('N0'))(Symbol('N0')*exp(Symbol('e')*t))" },

/* ---------------- più risposte giuste ---------------- */

{ id: "c2-gen-008",
  cap: 2,
  topic: "generalita",
  type: "multi",
  diff: 1,
  src: "Stile esempio di prova 2026/27, quesito 4",
  q: "Fra le seguenti equazioni differenziali individuare quelle lineari.",
  options: [
    String.raw`$y'' + e^x y = x$`,
    String.raw`$y' = y^2$`,
    String.raw`$x\,y'' - y' = 0$`,
    String.raw`$y' + \cos y = 0$`,
    String.raw`$y''' - 2y = \sin x$`,
    String.raw`$(y')^2 + y = 1$`
  ],
  correct: [0, 2, 4],
  expl: String.raw`A, C, E sono di **primo grado** in $y$ e nelle sue derivate; i coefficienti ($e^x$, $x$) e i termini noti possono dipendere da $x$ in modo qualunque (C, dove $x \ne 0$, si scrive $y'' - \frac1x y' = 0$).
  <br>B) $y^2$. D) $\cos y$. F) $(y')^2$.` },

{ id: "c2-sep-001",
  cap: 2,
  topic: "separabili",
  type: "multi",
  diff: 1,
  daVerificare: true,
  src: "P.I. 24/11/2023, primo turno (variabili separabili)",
  q: String.raw`Fra le seguenti equazioni differenziali individuare quelle a variabili separabili, cioè della forma $y' = a(x)\,b(y)$.`,
  options: [
    String.raw`$y' = x\,y^2$`,
    String.raw`$y' = e^{x + y}$`,
    String.raw`$y' = x + y$`,
    String.raw`$y' = (1 + y^2)\sin x$`,
    String.raw`$y' = \sin(xy)$`
  ],
  correct: [0, 1, 3],
  expl: String.raw`A) $a(x) = x$, $b(y) = y^2$. B) $e^{x+y} = e^x\,e^y$. D) $a(x) = \sin x$, $b(y) = 1 + y^2$.
  <br>C) $x + y$ è una somma, non un prodotto (è però lineare). E) $\sin(xy)$ non si spezza in un prodotto.` },

{ id: "c2-coef-010",
  cap: 2,
  topic: "coeff_costanti",
  type: "multi",
  diff: 2,
  src: "Soluzioni di un'omogenea con radice doppia",
  q: String.raw`Fra le seguenti funzioni individuare quelle che sono soluzioni dell'equazione $y'' - 2y' + y = 0$.`,
  options: [
    String.raw`$e^{x}$`,
    String.raw`$x\,e^{x}$`,
    String.raw`$e^{-x}$`,
    String.raw`$3e^{x} - x\,e^{x}$`,
    String.raw`$x^2e^{x}$`,
    "la funzione identicamente nulla"
  ],
  correct: [0, 1, 3, 5],
  expl: String.raw`$(\alpha - 1)^2 = 0$: radice $1$ doppia, integrale generale $(k_1 + k_2x)e^x$. Ci stanno $e^x$, $xe^x$, $3e^x - xe^x$ e anche la funzione nulla ($k_1 = k_2 = 0$).
  <br>C) $-1$ non è radice. E) $x^2e^x$ servirebbe con radice tripla.`,
  chk: "all(simplify(diff(y, x, 2) - 2*diff(y, x) + y) == 0 for y in [exp(x), x*exp(x), 3*exp(x) - x*exp(x)]) and all(simplify(diff(y, x, 2) - 2*diff(y, x) + y) != 0 for y in [exp(-x), x**2*exp(x)])" },

{ id: "c2-struct-007",
  cap: 2,
  topic: "struttura",
  type: "multi",
  diff: 2,
  src: "Simulazione P.I. 2025 (differenza di soluzioni)",
  q: String.raw`Siano $y_1$ e $y_2$ due soluzioni dell'equazione $y'' + a(x)y' + b(x)y = f(x)$, con $f$ non identicamente nulla. Fra le seguenti funzioni individuare quelle che risolvono l'**omogenea associata**.`,
  options: [
    String.raw`$y_1 - y_2$`,
    String.raw`$y_2 - y_1$`,
    String.raw`$y_1 + y_2$`,
    String.raw`$2y_1 - y_2$`,
    String.raw`$\dfrac{y_1 - y_2}{2}$`,
    String.raw`$3y_1$`
  ],
  correct: [0, 1, 4],
  expl: String.raw`Per la linearità $L(c_1y_1 + c_2y_2) = (c_1 + c_2)f$: si ottiene l'omogenea quando $c_1 + c_2 = 0$. È il caso di A, B, E.
  <br>C) $L = 2f$. D) $L = 2f - f = f$: risolve la completa. F) $L = 3f$.` },

{ id: "c2-somi-010",
  cap: 2,
  topic: "somiglianza",
  type: "multi",
  diff: 2,
  src: "Quando serve il fattore x (s = 1)",
  q: String.raw`Si considera l'equazione $y'' - 4y = f(x)$. Fra i seguenti termini noti individuare quelli per cui, nel metodo di somiglianza, si deve prendere $s = 1$.`,
  options: [
    String.raw`$f(x) = e^{2x}$`,
    String.raw`$f(x) = x\,e^{-2x}$`,
    String.raw`$f(x) = e^{4x}$`,
    String.raw`$f(x) = x^2$`,
    String.raw`$f(x) = 3e^{-2x}$`,
    String.raw`$f(x) = \cos 2x$`
  ],
  correct: [0, 1, 4],
  expl: String.raw`Radici di $\alpha^2 - 4$: $\pm 2$, semplici. $s = 1$ quando $h$ è una di queste: $h = 2$ (A) o $h = -2$ (B, E).
  <br>C) $h = 4$. D) $h = 0$. F) $h = 2i$, che non è radice: $s = 0$.`,
  chk: "set(solve(Symbol('a')**2 - 4, Symbol('a'))) == {2, -2}" }

);

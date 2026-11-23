/* Capitolo 1 (integrali): risposta multipla e più risposte giuste, dalla banca iniziale verificata.
   Schema: CONTRIBUTING.md. Ogni calcolo ha un campo chk (sympy) controllato da pnpm verify. */
(window.QUESTIONS = window.QUESTIONS || []).push(

{ id: "c1-funzint-001",
  cap: 1,
  topic: "funzione_integrale",
  type: "mcq",
  diff: 1,
  src: "Esempio di prova 2026/27, quesito 2",
  q: String.raw`Sia $f$ una funzione continua in $[a,b]$. Una primitiva di $f$ è`,
  options: [
    String.raw`$\displaystyle\int_a^b f(t)\,dt$`,
    String.raw`$\displaystyle\int_a^x f(t)\,dt$`,
    String.raw`$\displaystyle\int f(t)\,dt$`,
    String.raw`$\displaystyle\int_x^b f(t)\,dt$`
  ],
  correct: 1,
  expl: String.raw`$\int_a^x f(t)\,dt$ è la **funzione integrale** di punto iniziale $a$: per il teorema di derivazione della funzione integrale ha derivata $f(x)$, quindi è una primitiva.
  <br>A) $\int_a^b f(t)\,dt$ è un **numero**, non una funzione di $x$.
  <br>C) $\int f(t)\,dt$ è l'integrale indefinito, cioè l'**insieme** di tutte le primitive, non una primitiva.
  <br>D) $\int_x^b f(t)\,dt = -\int_b^x f(t)\,dt$ ha derivata $-f(x)$: è una primitiva di $-f$.` },

{ id: "c1-riemann-001",
  cap: 1,
  topic: "riemann",
  type: "mcq",
  diff: 1,
  src: "P.I. 24/11/2023, secondo turno",
  q: String.raw`Sia $f : [a,b] \to \mathbb{R}$ una funzione continua. L'integrale $\displaystyle\int_a^b f(x)\,dx$ rappresenta`,
  options: [
    "una funzione",
    "un numero",
    "un insieme",
    "un'area"
  ],
  correct: 1,
  expl: String.raw`L'integrale di Riemann è l'elemento di separazione fra gli insiemi delle somme inferiori e superiori: è un **numero** reale.
  <br>Non è un'area in generale: coincide con l'area del rettangoloide **solo se $f \ge 0$** (se $f \le 0$ l'area è $-\int_a^b f$).
  <br>Non è una funzione (lo è $\int_a^x f(t)\,dt$) né un insieme (lo è $\int f(x)\,dx$).` },

{ id: "c1-indef-001",
  cap: 1,
  topic: "indefinito",
  type: "mcq",
  diff: 1,
  src: "Lezione 08/10, definizione di integrale indefinito",
  q: String.raw`Sia $f : (a,b) \to \mathbb{R}$. L'integrale indefinito $\displaystyle\int f(x)\,dx$ è`,
  options: [
    String.raw`un numero reale, che dipende dagli estremi $a$ e $b$ dell'intervallo`,
    String.raw`una funzione, cioè l'unica primitiva di $f$ in $(a,b)$`,
    "un insieme di funzioni, sempre non vuoto e con infiniti elementi",
    "un insieme di funzioni, vuoto oppure con infiniti elementi"
  ],
  correct: 3,
  expl: String.raw`Per definizione $\int f(x)\,dx$ è l'**insieme delle primitive** di $f$. Se $f$ ha una primitiva $F$, le primitive sono tutte e sole le $F + k$, $k \in \mathbb{R}$: infinite. Se $f$ non ha primitive (es. la funzione che vale $-1$ per $x < 0$ e $1$ per $x \ge 0$) l'insieme è **vuoto**.
  <br>B) Non esiste "la" primitiva: ce ne sono infinite.
  <br>C) Può essere vuoto.` },

{ id: "c1-prim-001",
  cap: 1,
  topic: "primitive",
  type: "mcq",
  diff: 2,
  src: "Lezione 06/10, funzione senza primitive",
  q: String.raw`Sia $f(x) = -1$ per $x < 0$ e $f(x) = 1$ per $x \ge 0$. Allora $f$`,
  options: [
    String.raw`ha come primitive in $\mathbb{R}$ le funzioni $|x| + k$, perché $|x|$ ha derivata $f(x)$ per $x \ne 0$`,
    String.raw`non ha primitive in $\mathbb{R}$, perché una funzione dotata di primitive deve essere continua`,
    String.raw`non ha primitive in $\mathbb{R}$: una primitiva sarebbe $|x| + k$, non derivabile in $0$`,
    String.raw`ha primitive in $\mathbb{R}$, perché ne ha in $]-\infty,0[$ e in $[0,+\infty[$ e basta raccordarle`
  ],
  correct: 2,
  expl: String.raw`Se $F$ fosse una primitiva in $\mathbb{R}$, sarebbe $F = -x + k_1$ per $x < 0$ e $F = x + k_2$ per $x \ge 0$. $F$ derivabile $\Rightarrow$ continua in $0$ $\Rightarrow k_1 = k_2$, quindi $F = |x| + k$: **assurdo**, perché $|x|$ non è derivabile in $0$.
  <br>B) La motivazione è sbagliata: la continuità è **sufficiente ma non necessaria** per avere primitive (esempio: $2x\sin\frac1x - \cos\frac1x$ con $f(0)=0$ ha primitive ma non è continua).
  <br>A) $|x|$ non è derivabile in $0$, quindi non è primitiva in $\mathbb{R}$.
  <br>D) Avere primitive sui due pezzi non basta: bisogna poterle raccordare in modo derivabile.` },

{ id: "c1-funzint-002",
  cap: 1,
  topic: "funzione_integrale",
  type: "mcq",
  diff: 1,
  src: "Lezione 08/10, esercizi sulla funzione integrale",
  q: String.raw`Sia $F(x) = \displaystyle\int_x^3 e^{t^2}\,dt$. Allora $F'(x) =$`,
  options: [
    String.raw`$e^{9} - e^{x^2}$`,
    String.raw`$e^{x^2}$`,
    String.raw`$-2x\,e^{x^2}$`,
    String.raw`$-e^{x^2}$`
  ],
  correct: 3,
  expl: String.raw`L'estremo variabile è quello **inferiore**: $F(x) = -\int_3^x e^{t^2}\,dt$, e per il teorema di derivazione della funzione integrale $F'(x) = -e^{x^2}$.
  <br>A) Confonde $F'$ con un'integrazione. B) Dimentica il segno. C) Deriva $e^{x^2}$ invece di applicare il teorema.`,
  chk: "simplify(diff(Integral(exp(t**2),(t,x,3)),x) + exp(x**2)) == 0" },

{ id: "c1-funzint-003",
  cap: 1,
  topic: "funzione_integrale",
  type: "mcq",
  diff: 2,
  src: "Dispensa cap. 1, esempio 6; Lezione 08/10",
  q: String.raw`Sia $F(x) = \displaystyle\int_1^{x^3} \frac{\sin t}{t}\,dt$ per $x > 0$. Allora $F'(x) =$`,
  options: [
    String.raw`$\dfrac{\sin x^3}{x^3}$`,
    String.raw`$\dfrac{\sin x}{x}\cdot 3x^2$`,
    String.raw`$\dfrac{\sin x^3}{x^3}\cdot 3x^2$`,
    String.raw`$\dfrac{\sin x^3}{x^3} - \sin 1$`
  ],
  correct: 2,
  expl: String.raw`$F$ è **composta** dalla funzione integrale $G(y) = \int_1^y \frac{\sin t}{t}\,dt$ e da $y = x^3$. Quindi $F'(x) = G'(x^3)\cdot 3x^2 = \frac{\sin x^3}{x^3}\cdot 3x^2$.
  <br>A) Manca la derivata della funzione interna. B) Calcola l'integranda nel punto sbagliato. D) Il primo estremo è costante: non contribuisce.`,
  chk: "simplify(diff(Integral(sin(t)/t,(t,1,x**3)),x) - 3*x**2*sin(x**3)/x**3) == 0" },

{ id: "c1-funzint-004",
  cap: 1,
  topic: "funzione_integrale",
  type: "mcq",
  diff: 2,
  src: "Dispensa cap. 1, esempio 7; Lezione 08/10",
  q: String.raw`Sia $F(x) = \displaystyle\int_{x^4}^{\log x} \frac{\sin t}{t}\,dt$ per $x > 1$. Allora $F'(x) =$`,
  options: [
    String.raw`$\dfrac{\sin(\log x)}{\log x}\cdot\dfrac1x - \dfrac{\sin x^4}{x^4}\cdot 4x^3$`,
    String.raw`$\dfrac{\sin(\log x)}{\log x} - \dfrac{\sin x^4}{x^4}$`,
    String.raw`$\dfrac{\sin x^4}{x^4}\cdot 4x^3 - \dfrac{\sin(\log x)}{\log x}\cdot\dfrac1x$`,
    String.raw`$\dfrac{\sin(\log x)}{\log x}\cdot\dfrac1x + \dfrac{\sin x^4}{x^4}\cdot 4x^3$`
  ],
  correct: 0,
  expl: String.raw`Entrambi gli estremi sono variabili: si spezza in un punto fisso (es. $2$): $F(x) = -\int_2^{x^4}\frac{\sin t}{t}dt + \int_2^{\log x}\frac{\sin t}{t}dt$. Derivando ciascun pezzo come funzione composta si ottiene la A.
  <br>Regola pratica: $\frac{d}{dx}\int_{a(x)}^{b(x)} f(t)\,dt = f(b(x))\,b'(x) - f(a(x))\,a'(x)$.
  <br>B) Mancano le derivate delle funzioni interne. C) Segni scambiati. D) Il contributo dell'estremo inferiore va col meno.`,
  chk: "simplify(diff(Integral(sin(t)/t,(t,x**4,log(x))),x) - (sin(log(x))/log(x)/x - sin(x**4)/x**4*4*x**3)) == 0" },

{ id: "c1-prop-001",
  cap: 1,
  topic: "proprieta",
  type: "mcq",
  diff: 1,
  src: "Lezione 06/10, teorema della media",
  q: String.raw`Sia $f$ continua in $[a,b]$, con minimo $m$ e massimo $M$. Nella dimostrazione del teorema della media, per passare da $m \le \frac{1}{b-a}\int_a^b f(x)\,dx \le M$ all'esistenza di $c \in [a,b]$ con $\int_a^b f(x)\,dx = f(c)(b-a)$ si usa`,
  options: [
    String.raw`il teorema di Lagrange applicato alla funzione $f$`,
    "il teorema di esistenza dei valori intermedi",
    "il teorema di Heine-Cantor sull'uniforme continuità",
    "il teorema di Rolle applicato alla funzione integrale"
  ],
  correct: 1,
  expl: String.raw`Il numero $\frac{1}{b-a}\int_a^b f$ è compreso fra il minimo e il massimo di una funzione continua su un intervallo: per il **teorema dei valori intermedi** è un valore assunto da $f$, cioè esiste $c$ con $f(c) = \frac{1}{b-a}\int_a^b f$.
  <br>Weierstrass serve prima (per avere $m$ e $M$); Heine-Cantor serve per la contiguità delle somme; Lagrange e Rolle non c'entrano.` },

{ id: "c1-riemann-002",
  cap: 1,
  topic: "riemann",
  type: "mcq",
  diff: 1,
  src: "Dispensa cap. 1, proprietà della media",
  q: String.raw`Sia $f$ continua in $[a,b]$ con minimo $m$ e massimo $M$, e sia $D = \{a; b\}$. Allora`,
  options: [
    String.raw`$s(f,D) = f(a)(b-a)$ e $S(f,D) = f(b)(b-a)$`,
    String.raw`$s(f,D) = S(f,D) = \int_a^b f(x)\,dx$`,
    String.raw`$s(f,D) = m(b-a)$ e $S(f,D) = M(b-a)$`,
    String.raw`$s(f,D) = m$ e $S(f,D) = M$`
  ],
  correct: 2,
  expl: String.raw`Con la decomposizione banale c'è un solo intervallo, $[a,b]$, di ampiezza $b - a$: la somma inferiore usa il minimo, la superiore il massimo. È il passaggio chiave della **prima versione del teorema della media**, perché $s(f,D) \le \int_a^b f \le S(f,D)$.
  <br>A) $f(a)$ e $f(b)$ non sono in generale minimo e massimo. B) Vale solo se $f$ è costante. D) Manca l'ampiezza $b - a$.` },

{ id: "c1-parti-001",
  cap: 1,
  topic: "parti",
  type: "mcq",
  diff: 1,
  src: "Lezione 13/10, integrazione per parti",
  q: String.raw`Per calcolare $\displaystyle\int x^2e^x\,dx$ per parti, la scelta conveniente è`,
  options: [
    String.raw`FF $= x^2$, FD $= e^x$: il grado scende a ogni passo`,
    String.raw`FF $= e^x$, FD $= x^2$: si passa a $\int \frac{x^3}{3}e^x\,dx$, più semplice`,
    String.raw`FF $= x$, FD $= xe^x$: il grado scende di uno`,
    String.raw`conviene la sostituzione $t = x^2$, perché compare $x^2$`
  ],
  correct: 0,
  expl: String.raw`Con FF $= x^2$ e FD $= e^x$: $\int x^2e^x\,dx = x^2e^x - 2\int xe^x\,dx$, e dopo un altro passo si arriva a $e^x(x^2 - 2x + 2) + k$.
  <br>B) È una scelta lecita ma **non conviene**: il grado sale.
  <br>C) Non si conosce una primitiva immediata di $xe^x$. D) Manca il fattore $2x$ per la sostituzione.`,
  chk: "simplify(diff(exp(x)*(x**2-2*x+2),x) - x**2*exp(x)) == 0" },

{ id: "c1-sost-001",
  cap: 1,
  topic: "sostituzione",
  type: "mcq",
  diff: 2,
  src: "Lezione 20/10 (in rosso: \"si fa con la prima formula!!\")",
  q: "Quale fra i seguenti integrali si calcola con la **seconda** formula di integrazione per sostituzione (come fatto a lezione)?",
  options: [
    String.raw`$\displaystyle\int \frac{\log x + 1}{x}\,dx$`,
    String.raw`$\displaystyle\int \frac{e^x}{e^{2x}+1}\,dx$`,
    String.raw`$\displaystyle\int \frac{x+3}{\sqrt{x-1}}\,dx$`,
    String.raw`$\displaystyle\int x\cos(x^2+5)\,dx$`
  ],
  correct: 2,
  expl: String.raw`La seconda formula si usa per i radicali $\sqrt{ax+b}$ e $\sqrt{\frac{ax+b}{cx+d}}$: si pone $\sqrt{x-1} = t$, $x = g(t) = t^2 + 1$, con $g$ derivabile e invertibile.
  <br>A, B, D contengono già la derivata della funzione interna ($\frac1x$, $e^x$, $2x$ a meno di costanti): si fanno con la **prima** formula.` },

{ id: "c1-sost-002",
  cap: 1,
  topic: "sostituzione",
  type: "mcq",
  diff: 2,
  src: "Lezione 13/10, errore da non fare (in rosso)",
  q: String.raw`Uno studente scrive: "$\displaystyle\int 2x\,e^{x^2}\,dx = \int e^t\,dt = e^t + k$". Cosa c'è di sbagliato?`,
  options: [
    "Niente: il risultato è corretto e completo",
    String.raw`Doveva integrare per parti con FD $= e^{x^2}$`,
    String.raw`Non ha ricomposto con $g(x) = x^2$: il risultato è $e^{x^2} + k$`,
    String.raw`Manca un fattore $\frac12$: il risultato corretto è $\frac12e^{x^2} + k$`
  ],
  correct: 2,
  expl: String.raw`La prima formula di sostituzione dice $\int f(g(x))g'(x)\,dx = \left[\int f(t)\,dt\right]_{t=g(x)}$: le primitive di $f$ vanno **composte con $g$**. Scrivere $e^t + k$ lascia il risultato nella variabile sbagliata.
  <br>D) Il fattore $2x$ è proprio $g'(x)$: non serve nessun $\frac12$.`,
  chk: "simplify(diff(exp(x**2),x) - 2*x*exp(x**2)) == 0" },

{ id: "c1-raz-001",
  cap: 1,
  topic: "razionali",
  type: "mcq",
  diff: 1,
  src: "Lezione 15/10, funzioni razionali fratte",
  q: String.raw`$\displaystyle\int \frac{dx}{x^2+9} =$`,
  options: [
    String.raw`$\arctan\dfrac x3 + k$`,
    String.raw`$\dfrac19\arctan\dfrac x3 + k$`,
    String.raw`$\log(x^2+9) + k$`,
    String.raw`$\dfrac13\arctan\dfrac x3 + k$`
  ],
  correct: 3,
  expl: String.raw`$\int\frac{dx}{x^2+\gamma^2} = \frac1\gamma\arctan\frac x\gamma + k$, qui $\gamma = 3$. Si ottiene raccogliendo $\gamma^2$: $\frac{1}{\gamma^2}\cdot\frac{1}{(x/\gamma)^2+1}$, e $\frac1\gamma$ è la derivata di $\frac x\gamma$.
  <br>A) Manca $\frac13$. B) $\frac19$ è il fattore raccolto, ma un $\frac13$ si "usa" come derivata della funzione interna. C) Il numeratore non è la derivata del denominatore.`,
  chk: "simplify(diff(atan(x/3)/3,x) - 1/(x**2+9)) == 0" },

{ id: "c1-raz-002",
  cap: 1,
  topic: "razionali",
  type: "mcq",
  diff: 1,
  src: "Lezione 15/10, decomposizione in fratti semplici",
  q: String.raw`La funzione $\dfrac{2x+3}{(x^2+2)(x-1)}$ si decompone in fratti semplici nella forma`,
  options: [
    String.raw`$\dfrac{A}{x^2+2} + \dfrac{B}{x-1}$`,
    String.raw`$\dfrac{Ax+B}{x^2+2} + \dfrac{C}{x-1}$`,
    String.raw`$\dfrac{A}{x-\sqrt2} + \dfrac{B}{x+\sqrt2} + \dfrac{C}{x-1}$`,
    String.raw`$\dfrac{Ax+B}{x^2+2} + \dfrac{Cx+D}{x-1}$`
  ],
  correct: 1,
  expl: String.raw`Un fattore di primo grado $(x-1)$ dà $\frac{C}{x-1}$; un fattore di secondo grado con $\Delta < 0$ come $x^2 + 2$ dà $\frac{Ax+B}{x^2+2}$ (numeratore di primo grado).
  <br>A) Al numeratore del fattore di secondo grado serve $Ax + B$. C) $x^2 + 2$ non ha radici reali. D) Sopra un fattore di primo grado va una costante.` },

{ id: "c1-raz-003",
  cap: 1,
  topic: "razionali",
  type: "mcq",
  diff: 2,
  src: "Dispensa cap. 1, esempio 16",
  q: String.raw`Quanti fratti semplici compaiono nella decomposizione di una funzione razionale propria con denominatore $x^3(x-2)(x^2+5)(x^2+1)^2$?`,
  options: [
    "4",
    "5",
    "6",
    "7"
  ],
  correct: 3,
  expl: String.raw`$x^3$ dà 3 fratti ($\frac{A_1}{x}, \frac{A_2}{x^2}, \frac{A_3}{x^3}$); $(x-2)$ ne dà 1; $(x^2+5)$ ne dà 1; $(x^2+1)^2$ ne dà 2 ($\frac{B_1x+C_1}{x^2+1}$ e $\frac{B_2x+C_2}{(x^2+1)^2}$). Totale $3 + 1 + 1 + 2 = 7$.` },

{ id: "c1-trig-001",
  cap: 1,
  topic: "trigonometrici",
  type: "mcq",
  diff: 1,
  src: "Lezione 15/10, polinomi trigonometrici",
  q: String.raw`Per calcolare $\displaystyle\int \cos^3x\,\sin^2x\,dx$ conviene`,
  options: [
    String.raw`usare le formule di bisezione per entrambi i fattori, $\cos^2x$ e $\sin^2x$`,
    String.raw`isolare un fattore $\cos x$, scrivere $\cos^2x = 1 - \sin^2x$ e porre $t = \sin x$`,
    String.raw`integrare per parti con FD $= \cos^3x$ e FF $= \sin^2x$`,
    String.raw`isolare un fattore $\sin x$, scrivere il resto in $\cos x$ e porre $t = \cos x$`
  ],
  correct: 1,
  expl: String.raw`Regola della docente: se **almeno un esponente è dispari**, si isola un fattore di quella funzione e si sostituisce. Qui $\cos^3 x\sin^2 x = \cos x(1-\sin^2x)\sin^2x$, quindi $\left[\int (t^2 - t^4)\,dt\right]_{t=\sin x} = \frac{\sin^3x}{3} - \frac{\sin^5x}{5} + k$.
  <br>A) La bisezione si usa quando **entrambi** gli esponenti sono pari. D) $\sin$ ha esponente pari: isolandolo resterebbe $\sin x$ e non si scrive tutto in $\cos x$.`,
  chk: "simplify(diff(sin(x)**3/3 - sin(x)**5/5,x) - cos(x)**3*sin(x)**2) == 0" },

{ id: "c1-def-001",
  cap: 1,
  topic: "definiti",
  type: "mcq",
  diff: 2,
  src: "Lezione 22/10, integrali definiti con valore assoluto",
  q: String.raw`$\displaystyle\int_2^{-4} |x|(x-2)\,dx =$`,
  options: [
    String.raw`$-\dfrac{116}{3}$`,
    String.raw`$\dfrac{116}{3}$`,
    String.raw`$\dfrac{124}{3}$`,
    String.raw`$\dfrac{4}{3}$`
  ],
  correct: 1,
  expl: String.raw`Per la proprietà additiva si spezza in $0$, dove cambia il segno di $|x|$: $\int_2^0 (x^2-2x)\,dx + \int_0^{-4}(-x^2+2x)\,dx = \left[\frac{x^3}{3} - x^2\right]_2^0 + \left[-\frac{x^3}{3} + x^2\right]_0^{-4} = \frac43 + \frac{112}{3} = \frac{116}{3}$.
  <br>Attenzione: gli estremi vanno **da $2$ a $-4$**, e su $[-4,0]$ si ha $|x| = -x$.`,
  chk: "integrate(Abs(x)*(x-2),(x,2,-4)) == Rational(116,3)" },

{ id: "c1-abs-001",
  cap: 1,
  topic: "valore_assoluto",
  type: "mcq",
  diff: 1,
  src: "Lezione 15/10, primitive con valore assoluto",
  q: String.raw`Nella ricerca di una primitiva $F$ in $]-\infty,+\infty[$ di una funzione con valore assoluto, perché si impone che i rami di $F$ abbiano lo stesso limite nel punto di raccordo?`,
  options: [
    String.raw`Perché $f$ è continua, quindi anche le sue primitive lo sono`,
    String.raw`Perché $F$, essendo primitiva in $]-\infty,+\infty[$, è derivabile e quindi continua`,
    String.raw`Perché lo richiede la condizione $F(x_0) = y_0$ assegnata nel testo`,
    String.raw`Per convenzione: si potrebbero anche scegliere $k_1$ e $k_2$ indipendenti`
  ],
  correct: 1,
  expl: String.raw`$F$ deve avere derivata $f$ in **tutto** $\mathbb{R}$, quindi è derivabile, quindi continua. La continuità nel punto di raccordo è ciò che **lega le costanti** dei rami ($k_2$ in funzione di $k_1$). Solo dopo si usa $F(x_0) = y_0$ per fissare l'ultima costante.
  <br>A) La continuità di $f$ garantisce l'esistenza di primitive, ma il vincolo sulle costanti viene dalla continuità di $F$.
  <br>D) Con costanti indipendenti $F$ avrebbe un salto e non sarebbe derivabile nel raccordo.` },

{ id: "c1-indef-002",
  cap: 1,
  topic: "indefinito",
  type: "mcq",
  diff: 2,
  src: "Dispensa cap. 1, osservazione 2",
  q: String.raw`La proprietà di omogeneità $\int kf(x)\,dx = k\int f(x)\,dx$ richiede $k \ne 0$ perché, se $k = 0$,`,
  options: [
    "il primo membro contiene tutte le costanti, il secondo solo la funzione nulla",
    "il primo membro è l'insieme vuoto, il secondo no",
    String.raw`la funzione $0\cdot f$ non è dotata di primitive in $(a,b)$`,
    String.raw`i due membri coincidono, ma la dimostrazione divide per $k$`
  ],
  correct: 0,
  expl: String.raw`$\int 0\,dx$ è l'insieme delle primitive della funzione nulla, cioè **tutte le costanti**; invece $0\cdot\int f(x)\,dx$ è l'insieme ottenuto moltiplicando per $0$ le primitive di $f$, cioè **solo la funzione nulla**. I due insiemi sono diversi, quindi la tesi è falsa.
  <br>D) Non coincidono: è proprio per questo che l'ipotesi serve.` }

);

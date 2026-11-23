/* Completamento: dimostrazioni guidate con spazi vuoti.
   Schema: CONTRIBUTING.md. Ogni calcolo ha un campo chk (sympy) controllato da pnpm verify. */
(window.QUESTIONS = window.QUESTIONS || []).push(

{ id: "c1-cloze-001",
  cap: 1,
  topic: "proprieta",
  type: "cloze",
  diff: 1,
  src: "Esempio di prova 2026/27, quesito 1",
  q: "Completare gli spazi vuoti.",
  text: String.raw`Sia $f$ una funzione continua in $[a,b]$ e siano $m$ ed $M$ rispettivamente il minimo ed il massimo di $f$ in $[a,b]$. Si ha allora
  $$ {{1}} \le \int_a^b f(x)\,dx \le {{2}} $$
  infatti, considerata la decomposizione $D = $ {{3}} si ha $s(f,D) = $ {{4}} e $S(f,D) = $ {{5}}, quindi la tesi segue dal fatto che $\int_a^b f(x)\,dx$ è l'elemento di separazione fra gli insiemi {{6}}.`,
  gaps: [
    { opts: [
        String.raw`$m(b-a)$`,
        String.raw`$m$`,
        String.raw`$f(a)(b-a)$`,
        String.raw`$0$`
      ],
      correct: 0 },
    { opts: [
        String.raw`$M$`,
        String.raw`$M(b-a)$`,
        String.raw`$f(b)(b-a)$`,
        String.raw`$M(b-a)^2$`
      ],
      correct: 1 },
    { opts: [
        String.raw`$\{a; b\}$`,
        String.raw`$\{m; M\}$`,
        String.raw`$[a,b]$`,
        String.raw`$\{a; \frac{a+b}{2}; b\}$`
      ],
      correct: 0 },
    { opts: [
        String.raw`$M(b-a)$`,
        String.raw`$m(b-a)$`,
        String.raw`$m$`,
        String.raw`$f(a)(b-a)$`
      ],
      correct: 1 },
    { opts: [
        String.raw`$M(b-a)$`,
        String.raw`$m(b-a)$`,
        String.raw`$M$`,
        String.raw`$f(b)(b-a)$`
      ],
      correct: 0 },
    { opts: [
        "delle somme inferiori e delle somme superiori",
        String.raw`dei minimi e dei massimi di $f$`,
        String.raw`delle primitive di $f$`,
        "dei plurirettangoli"
      ],
      correct: 0 }
  ],
  expl: String.raw`Con $D = \{a; b\}$ c'è un solo intervallo: $s(f,D) = m(b-a)$, $S(f,D) = M(b-a)$. Poiché l'integrale separa somme inferiori e superiori, $s(f,D) \le \int_a^b f \le S(f,D)$.` },

{ id: "c1-cloze-002",
  cap: 1,
  topic: "funzione_integrale",
  type: "cloze",
  diff: 2,
  src: "Lezione 08/10, formula fondamentale del calcolo integrale (P.I. 2025, compito B)",
  q: "Completare la dimostrazione della formula fondamentale del calcolo integrale.",
  text: String.raw`Sia $f : (\alpha,\beta) \to \mathbb{R}$ continua, $F$ una sua primitiva e $a, b \in (\alpha,\beta)$. La funzione $G(x) = \int_a^x f(t)\,dt$ è una primitiva di $f$ per {{1}}. Quindi esiste $k \in \mathbb{R}$ tale che $F(x) = G(x) + k$ per ogni $x$, per {{2}}. Per $x = a$ si ottiene $k = $ {{3}}, perché $G(a) = $ {{4}}. Per $x = b$ si ottiene $F(b) = \int_a^b f(x)\,dx + F(a)$, cioè la tesi.`,
  gaps: [
    { opts: [
        "il teorema di derivazione della funzione integrale",
        "il teorema della media",
        "la proprietà additiva",
        "il teorema di Lagrange"
      ],
      correct: 0 },
    { opts: [
        "la caratterizzazione delle primitive (due primitive differiscono per una costante)",
        "il teorema di Heine-Cantor",
        "la proprietà di omogeneità",
        "il teorema dei valori intermedi"
      ],
      correct: 0 },
    { opts: [
        String.raw`$F(b)$`,
        String.raw`$F(a)$`,
        String.raw`$0$`,
        String.raw`$f(a)$`
      ],
      correct: 1 },
    { opts: [
        String.raw`$0$`,
        String.raw`$F(a)$`,
        String.raw`$f(a)$`,
        String.raw`$1$`
      ],
      correct: 0 }
  ],
  expl: String.raw`Schema: integrale definito $\to$ funzione integrale $\to$ è una primitiva $\to$ differisce da $F$ per una costante $\to$ si valuta in $a$ e in $b$.` },

{ id: "c1-cloze-003",
  cap: 1,
  topic: "parti",
  type: "cloze",
  diff: 1,
  src: "Lezione 13/10, integrazione per parti (simulazione AL 2025)",
  q: "Completare la dimostrazione della formula di integrazione indefinita per parti.",
  text: String.raw`Siano $f, g$ derivabili in $(a,b)$ e $f'g$ dotata di primitive. Per la regola di derivazione del prodotto $f(x)g'(x) = $ {{1}} $- f'(x)g(x)$. Il primo addendo ha come primitiva {{2}}, il secondo ha primitive per ipotesi: per la proprietà {{3}} anche $fg'$ è dotata di primitive e $\int f(x)g'(x)\,dx = $ {{4}}.`,
  gaps: [
    { opts: [
        String.raw`$D[f(x)g(x)]$`,
        String.raw`$f'(x)g'(x)$`,
        String.raw`$D[f(x)]\,g(x)$`,
        String.raw`$f(x)g(x)$`
      ],
      correct: 0 },
    { opts: [
        String.raw`$f(x)g(x)$`,
        String.raw`$f'(x)g(x)$`,
        String.raw`$f(x)g'(x)$`,
        String.raw`$\frac{f(x)g(x)}{2}$`
      ],
      correct: 0 },
    { opts: [
        "distributiva (decomposizione in somma)",
        "di omogeneità",
        "della media",
        "additiva"
      ],
      correct: 0 },
    { opts: [
        String.raw`$f(x)g(x) - \int f'(x)g(x)\,dx$`,
        String.raw`$f(x)g(x) + \int f'(x)g(x)\,dx$`,
        String.raw`$f'(x)g(x) - \int f(x)g'(x)\,dx$`,
        String.raw`$\int f(x)\,dx\cdot\int g'(x)\,dx$`
      ],
      correct: 0 }
  ],
  expl: String.raw`$f$ si chiama **fattore finito** (FF), $g'$ **fattore differenziale** (FD).` },

{ id: "c2-cloze-001",
  cap: 2,
  topic: "wronskiano",
  type: "cloze",
  diff: 2,
  src: "P.I. 2025, compito A (quarta versione); Lezione 27/10",
  q: "Completare la dimostrazione: il Wronskiano di due soluzioni è identicamente nullo o sempre diverso da zero.",
  text: String.raw`Siano $y_1, y_2$ soluzioni di $y'' + a_1(x)y' + a_2(x)y = 0$ e $W(x) = $ {{1}}. Derivando, $W'(x) = $ {{2}}. Poiché $y_i'' = $ {{3}} per $i = 1,2$, sostituendo si ottiene $W'(x) = $ {{4}}. Quindi $W$ è soluzione dell'equazione del primo ordine $y' + a_1(x)y = 0$, e perciò $W(x) = ke^{-A_1(x)}$ con $A_1$ primitiva di $a_1$: se $k = 0$ è identicamente nullo, se $k \ne 0$ {{5}}.`,
  gaps: [
    { opts: [
        String.raw`$y_1y_2' - y_2y_1'$`,
        String.raw`$y_1y_2 - y_1'y_2'$`,
        String.raw`$y_1y_2'' - y_2y_1''$`,
        String.raw`$y_1'y_2 + y_1y_2'$`
      ],
      correct: 0 },
    { opts: [
        String.raw`$y_1y_2'' - y_2y_1''$`,
        String.raw`$y_1'y_2' - y_2'y_1'$`,
        String.raw`$y_1'y_2'' - y_2'y_1''$`,
        String.raw`$y_1''y_2'' $`
      ],
      correct: 0 },
    { opts: [
        String.raw`$-a_1(x)y_i' - a_2(x)y_i$`,
        String.raw`$a_1(x)y_i' + a_2(x)y_i$`,
        String.raw`$-a_2(x)y_i' - a_1(x)y_i$`,
        String.raw`$0$`
      ],
      correct: 0 },
    { opts: [
        String.raw`$-a_1(x)W(x)$`,
        String.raw`$a_1(x)W(x)$`,
        String.raw`$-a_2(x)W(x)$`,
        String.raw`$0$`
      ],
      correct: 0 },
    { opts: [
        "non si annulla mai",
        "è costante",
        "si annulla in un solo punto",
        "è positivo"
      ],
      correct: 0 }
  ],
  expl: String.raw`Nel calcolo di $W'$ i termini $y_1'y_2'$ si cancellano, e sostituendo $y_i''$ si cancellano anche i termini con $a_2$. Resta $W' = -a_1W$.` },

{ id: "c2-cloze-002",
  cap: 2,
  topic: "struttura",
  type: "cloze",
  diff: 1,
  src: "Simulazione P.I. 2025, canale AL, T1",
  q: "Completare la dimostrazione.",
  text: String.raw`Data $y'' + a(x)y' + b(x)y = f(x)$, l'equazione omogenea ad essa associata è {{1}}. Se $y_1$ e $y_2$ sono soluzioni dell'equazione completa e $w = y_1 - y_2$, allora $w'' + a(x)w' + b(x)w = $ {{2}} $= $ {{3}}, quindi $w$ è soluzione {{4}}.`,
  gaps: [
    { opts: [
        String.raw`$y'' + a(x)y' + b(x)y = 0$`,
        String.raw`$y'' = f(x)$`,
        String.raw`$y'' + a(x)y' = 0$`,
        String.raw`$a(x)y' + b(x)y = f(x)$`
      ],
      correct: 0 },
    { opts: [
        String.raw`$(y_1'' + a y_1' + b y_1) - (y_2'' + a y_2' + b y_2)$`,
        String.raw`$(y_1'' - y_2'') + a(y_1' + y_2') + b(y_1 + y_2)$`,
        String.raw`$y_1'' - y_2''$`,
        String.raw`$(y_1 - y_2)''$`
      ],
      correct: 0 },
    { opts: [
        String.raw`$f(x) - f(x) = 0$`,
        String.raw`$2f(x)$`,
        String.raw`$f(x)$`,
        String.raw`$-f(x)$`
      ],
      correct: 0 },
    { opts: [
        "dell'equazione omogenea",
        "dell'equazione completa",
        "di entrambe",
        "di nessuna delle due"
      ],
      correct: 0 }
  ],
  expl: String.raw`Si usa solo la **linearità** della derivata: $(y_1 - y_2)' = y_1' - y_2'$, e si raggruppano i termini di $y_1$ e di $y_2$.` },

{ id: "c2-cloze-003",
  cap: 2,
  topic: "coeff_costanti",
  type: "cloze",
  diff: 2,
  src: "P.I. 2025, compito A (seconda versione); Lezione 29/10",
  q: "Completare la dimostrazione: se l'equazione caratteristica ha due soluzioni reali e distinte, l'equazione ammette due soluzioni indipendenti.",
  text: String.raw`Sia $y'' + ay' + by = 0$ con $a, b \in \mathbb{R}$. La sua equazione caratteristica è {{1}}. Se ha due soluzioni reali $\alpha_1 \ne \alpha_2$, le funzioni {{2}} sono soluzioni dell'equazione. Il loro Wronskiano è $W(x) = $ {{3}}, che è diverso da zero per ogni $x$ perché {{4}}. Quindi le soluzioni sono indipendenti.`,
  gaps: [
    { opts: [
        String.raw`$\alpha^2 + a\alpha + b = 0$`,
        String.raw`$\alpha^2 + b\alpha + a = 0$`,
        String.raw`$a\alpha^2 + b\alpha = 0$`,
        String.raw`$e^{\alpha x} = 0$`
      ],
      correct: 0 },
    { opts: [
        String.raw`$e^{\alpha_1x}$ e $e^{\alpha_2x}$`,
        String.raw`$e^{\alpha_1x}$ e $xe^{\alpha_1x}$`,
        String.raw`$\alpha_1x$ e $\alpha_2x$`,
        String.raw`$\cos\alpha_1x$ e $\sin\alpha_2x$`
      ],
      correct: 0 },
    { opts: [
        String.raw`$e^{(\alpha_1+\alpha_2)x}(\alpha_2 - \alpha_1)$`,
        String.raw`$e^{(\alpha_1+\alpha_2)x}(\alpha_1 + \alpha_2)$`,
        String.raw`$e^{2\alpha_1x}$`,
        String.raw`$\alpha_1\alpha_2e^{(\alpha_1-\alpha_2)x}$`
      ],
      correct: 0 },
    { opts: [
        String.raw`l'esponenziale non si annulla mai e $\alpha_1 \ne \alpha_2$`,
        String.raw`$a$ e $b$ sono reali`,
        String.raw`$\alpha_1$ e $\alpha_2$ sono positivi`,
        String.raw`$\Delta = 0$`
      ],
      correct: 0 }
  ],
  expl: String.raw`$W = \begin{vmatrix} e^{\alpha_1x} & e^{\alpha_2x} \\ \alpha_1e^{\alpha_1x} & \alpha_2e^{\alpha_2x}\end{vmatrix} = e^{\alpha_1x}e^{\alpha_2x}(\alpha_2 - \alpha_1)$.`,
  chk: "simplify(Matrix([[exp(Symbol('p')*x),exp(Symbol('q')*x)],[Symbol('p')*exp(Symbol('p')*x),Symbol('q')*exp(Symbol('q')*x)]]).det() - exp((Symbol('p')+Symbol('q'))*x)*(Symbol('q')-Symbol('p'))) == 0" }

);

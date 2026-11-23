/* Completamenti delle dimostrazioni ★ (uno per teorema), nello stile del
   quesito 1 dell'esempio di prova 2026/27. Le opzioni di ogni spazio sono
   mostrate in ordine mescolato (fisso per domanda). */
(window.QUESTIONS = window.QUESTIONS || []).push(

{ id: "c1-cloze-004", cap: 1, topic: "primitive", type: "cloze", diff: 1,
  src: "Lezione 06/10, caratterizzazione delle primitive",
  q: "Completare la dimostrazione della caratterizzazione delle primitive.",
  text: String.raw`Sia $F$ una primitiva di $f$ nell'intervallo $(a,b)$. Se $k \in \mathbb{R}$, la funzione $F + k$ è derivabile e $(F + k)' = $ {{1}}, quindi è una primitiva di $f$. Viceversa, se $G$ è un'altra primitiva, la funzione $H = G - F$ ha derivata {{2}} in $(a,b)$; poiché $(a,b)$ è {{3}}, per {{4}} $H$ è costante, cioè $G = F + k$.`,
  gaps: [
    { opts: [String.raw`$f + k$`, String.raw`$f$`, String.raw`$F$`, String.raw`$kf$`], correct: 1 },
    { opts: [String.raw`$f$`, String.raw`$2f$`, String.raw`identicamente nulla`, String.raw`costante non nulla`], correct: 2 },
    { opts: ["un intervallo", "un insieme limitato", "un insieme chiuso", "un insieme simmetrico"], correct: 0 },
    { opts: ["il teorema dei valori intermedi", "il teorema di Weierstrass", "il teorema fondamentale del calcolo integrale", "il teorema sulle funzioni a derivata nulla (conseguenza di Lagrange)"], correct: 3 }
  ],
  expl: String.raw`L'ipotesi "intervallo" è essenziale: in $\mathbb{R}\setminus\{0\}$ ci sono primitive di $\frac1x$ che non differiscono per una costante.` },

{ id: "c1-cloze-005", cap: 1, topic: "primitive", type: "cloze", diff: 2,
  src: "Lezione 06/10, funzione senza primitive",
  q: String.raw`Sia $f(x) = -1$ per $x < 0$ e $f(x) = 1$ per $x \ge 0$. Completare la dimostrazione del fatto che $f$ non ha primitive in $\mathbb{R}$.`,
  text: String.raw`Supponiamo per assurdo che $F$ sia una primitiva di $f$ in $\mathbb{R}$. In $[0,+\infty[$ anche $x$ è una primitiva, quindi $F(x) = x + k$; in $]-\infty,0[$ si ha $F(x) = $ {{1}}. Poiché $F$ è {{2}}, è continua in $0$, quindi {{3}}. Allora $F(x) = $ {{4}} per ogni $x$, e questo è assurdo perché {{5}}.`,
  gaps: [
    { opts: [String.raw`$x + c$`, String.raw`$-x + c$`, String.raw`$-1 + c$`, String.raw`$c$`], correct: 1 },
    { opts: ["limitata", "integrabile", "derivabile", "monotona"], correct: 2 },
    { opts: [String.raw`$c = -k$`, String.raw`$c = 0$`, String.raw`$k = 0$`, String.raw`$c = k$`], correct: 3 },
    { opts: [String.raw`$|x| + k$`, String.raw`$x + k$`, String.raw`$-|x| + k$`, String.raw`$x|x| + k$`], correct: 0 },
    { opts: [String.raw`$|x|$ non è continua in $0$`, String.raw`$|x|$ non è derivabile in $0$`, String.raw`$f$ non è continua in $0$`, String.raw`$|x|$ non è limitata`], correct: 1 }
  ],
  expl: String.raw`Il ragionamento è lo stesso degli esercizi con il valore assoluto: le primitive dei due rami vanno raccordate con la continuità. Qui però il raccordo produce una funzione **non derivabile**.` },

{ id: "c1-cloze-006", cap: 1, topic: "riemann", type: "cloze", diff: 3,
  src: "Lezione 06/10, contiguità delle somme (appello 15/02/2024)",
  q: "Completare la dimostrazione: se $f$ è continua in $[a,b]$, gli insiemi delle somme inferiori e superiori sono contigui.",
  text: String.raw`Basta provare che per ogni $\varepsilon > 0$ esiste una decomposizione $D$ con {{1}}. Fissato $\varepsilon$, per {{2}} $f$ è uniformemente continua, quindi esiste $\delta > 0$ tale che $|x' - x''| < \delta \Rightarrow |f(x') - f(x'')| < $ {{3}}. Presa $D$ di ampiezza minore di $\delta$, in ogni intervallo $f(z_i) - f(y_i)$ è minore della stessa quantità, quindi $S(f,D) - s(f,D) = \sum_{i=1}^n (f(z_i) - f(y_i))(x_i - x_{i-1}) < $ {{4}}.`,
  gaps: [
    { opts: [String.raw`$s(f,D) = S(f,D)$`, String.raw`$S(f,D) - s(f,D) < \varepsilon$`, String.raw`$S(f,D) < \varepsilon$`, String.raw`$|D| < \varepsilon$`], correct: 1 },
    { opts: ["il teorema di Weierstrass", "il teorema della media", "il teorema di Heine-Cantor", "il teorema di Lagrange"], correct: 2 },
    { opts: [String.raw`$\varepsilon$`, String.raw`$\delta$`, String.raw`$\frac{\varepsilon}{b-a}$`, String.raw`$\varepsilon(b-a)$`], correct: 2 },
    { opts: [String.raw`$\varepsilon$`, String.raw`$\frac{\varepsilon}{b-a}$`, String.raw`$\varepsilon\,\delta$`, String.raw`$n\,\varepsilon$`], correct: 0 }
  ],
  expl: String.raw`La somma delle lunghezze $x_i - x_{i-1}$ è $b - a$, che si semplifica con il denominatore di $\frac{\varepsilon}{b-a}$.` },

{ id: "c1-cloze-007", cap: 1, topic: "proprieta", type: "cloze", diff: 2,
  src: "Lezione 08/10, proprietà additiva (esercizio di lezione)",
  q: String.raw`Supposta vera la proprietà additiva per $a < c < b$, completare la dimostrazione nel caso $c < a < b$.`,
  text: String.raw`Poiché $c < a < b$, il caso già noto applicato ai punti $c, a, b$ dà $\int_c^b f = $ {{1}}. Quindi $\int_a^b f = \int_c^b f - \int_c^a f$, e poiché $-\int_c^a f = $ {{2}} per {{3}}, si ottiene $\int_a^b f = \int_a^c f + \int_c^b f$.`,
  gaps: [
    { opts: [String.raw`$\int_c^a f + \int_a^b f$`, String.raw`$\int_a^c f + \int_a^b f$`, String.raw`$\int_c^a f - \int_a^b f$`, String.raw`$\int_a^b f - \int_c^a f$`], correct: 0 },
    { opts: [String.raw`$\int_c^a f$`, String.raw`$\int_a^c f$`, String.raw`$0$`, String.raw`$\int_c^b f$`], correct: 1 },
    { opts: ["la proprietà di monotonia", "il teorema della media", String.raw`la definizione di $\int_a^b f$ con $a > b$`, "la proprietà distributiva"], correct: 2 }
  ],
  expl: String.raw`Con la convenzione $\int_a^b f = -\int_b^a f$ la formula additiva vale per **qualunque** ordine di $a$, $b$, $c$.` },

{ id: "c1-cloze-008", cap: 1, topic: "proprieta", type: "cloze", diff: 1,
  src: "Lezione 06/10, proprietà di monotonia",
  q: "Completare la dimostrazione della proprietà di monotonia.",
  text: String.raw`1) Sia $f \ge 0$ continua in $[a,b]$. Per ogni decomposizione $D$ i minimi di $f$ sono {{1}}, quindi $s(f,D) \ge 0$; poiché l'integrale è {{2}} ogni somma inferiore, $\int_a^b f \ge 0$. 2) Se $f \le g$, si applica la 1) alla funzione {{3}} e si usa {{4}}, ottenendo $\int_a^b f \le \int_a^b g$.`,
  gaps: [
    { opts: [String.raw`$> 0$`, String.raw`$\le 0$`, String.raw`$\ge 0$`, String.raw`nulli`], correct: 2 },
    { opts: ["minore o uguale di", "maggiore o uguale di", "uguale a", "il doppio di"], correct: 1 },
    { opts: [String.raw`$f - g$`, String.raw`$g - f$`, String.raw`$f + g$`, String.raw`$fg$`], correct: 1 },
    { opts: ["la proprietà distributiva", "il teorema della media", "la proprietà additiva", "il teorema di Heine-Cantor"], correct: 0 }
  ],
  expl: String.raw`Attenzione: $f \ge 0$ dà $\int \ge 0$, non $> 0$ (si ha $= 0$ solo se $f \equiv 0$).` },

{ id: "c1-cloze-009", cap: 1, topic: "funzione_integrale", type: "cloze", diff: 1,
  src: "Lezione 08/10, due funzioni integrali differiscono per una costante",
  q: String.raw`Siano $F(x) = \int_{x_0}^x f(t)\,dt$ e $G(x) = \int_{x_1}^x f(t)\,dt$, con $f$ continua. Completare la dimostrazione del fatto che $F - G$ è costante.`,
  text: String.raw`Per {{1}} si ha $F(x) = \int_{x_0}^{x_1} f(t)\,dt + $ {{2}} $= \int_{x_0}^{x_1} f(t)\,dt + G(x)$, e $\int_{x_0}^{x_1} f(t)\,dt$ è {{3}}.`,
  gaps: [
    { opts: ["la proprietà di monotonia", "la proprietà additiva", "il teorema della media", "la formula fondamentale"], correct: 1 },
    { opts: [String.raw`$\int_{x_1}^x f(t)\,dt$`, String.raw`$\int_x^{x_1} f(t)\,dt$`, String.raw`$\int_{x_0}^x f(t)\,dt$`, String.raw`$f(x)$`], correct: 0 },
    { opts: [String.raw`una funzione di $x$`, String.raw`uguale a $0$`, String.raw`un numero che non dipende da $x$`, String.raw`una primitiva di $f$`], correct: 2 }
  ],
  expl: String.raw`La costante è proprio $\int_{x_0}^{x_1} f$: l'area accumulata fra i due punti iniziali.` },

{ id: "c1-cloze-010", cap: 1, topic: "funzione_integrale", type: "cloze", diff: 2,
  src: "Lezione 08/10, derivazione della funzione integrale (simulazione MZ 2025)",
  q: "Completare la dimostrazione del teorema di derivazione della funzione integrale.",
  text: String.raw`Sia $F(x) = \int_{x_0}^x f(t)\,dt$ con $f$ continua, e sia $c$ fissato. Per $x \ne c$, per la proprietà additiva il rapporto incrementale è $r(x) = $ {{1}}. Se $x > c$, per {{2}} esiste $y \in [c,x]$ tale che $r(x) = f(y)$; lo stesso vale se $x < c$, con $y \in [x,c]$. Per $x \to c$ si ha {{3}}, quindi per {{4}} $\lim_{x \to c} r(x) = f(c)$.`,
  gaps: [
    { opts: [String.raw`$\frac{1}{x - c}\int_c^x f(t)\,dt$`, String.raw`$\int_c^x f(t)\,dt$`, String.raw`$\frac{f(x) - f(c)}{x - c}$`, String.raw`$\frac{1}{x - c}\int_{x_0}^x f(t)\,dt$`], correct: 0 },
    { opts: ["il teorema di Lagrange", "il teorema della media", "il teorema di Rolle", "il teorema di Weierstrass"], correct: 1 },
    { opts: [String.raw`$y \to x_0$`, String.raw`$y \to +\infty$`, String.raw`$y \to c$`, String.raw`$y \to 0$`], correct: 2 },
    { opts: [String.raw`la derivabilità di $f$`, String.raw`la continuità di $f$ in $c$`, String.raw`la monotonia di $f$`, String.raw`la limitatezza di $f$`], correct: 1 }
  ],
  expl: String.raw`$y$ è sempre compreso fra $c$ e $x$: quando $x \to c$ anche $y \to c$ (carabinieri). La continuità di $f$ serve all'ultimo passo.` },

{ id: "c1-cloze-011", cap: 1, topic: "misura", type: "cloze", diff: 3,
  src: "Lezione 08/10, area del rettangoloide",
  q: String.raw`Sia $f \ge 0$ continua in $[a,b]$ e $R_f$ il suo rettangoloide. Completare la dimostrazione del fatto che l'area di $R_f$ è $\int_a^b f$.`,
  text: String.raw`Data una decomposizione $D$, i rettangoli di base $[x_{i-1},x_i]$ e altezza il minimo di $f$ formano un plurirettangolo {{1}} $R_f$, di area {{2}}; quelli con altezza il massimo formano un plurirettangolo che contiene $R_f$, di area $S(f,D)$. Poiché le somme inferiori e superiori sono {{3}}, anche gli insiemi delle aree dei plurirettangoli interni ed esterni lo sono, e l'unico elemento di separazione è {{4}}.`,
  gaps: [
    { opts: ["contenuto in", "che contiene", "disgiunto da", "uguale a"], correct: 0 },
    { opts: [String.raw`$S(f,D)$`, String.raw`$s(f,D)$`, String.raw`$m(b-a)$`, String.raw`$\int_a^b f$`], correct: 1 },
    { opts: ["separate", "uguali", "contigue", "limitate"], correct: 2 },
    { opts: [String.raw`$S(f,D)$`, String.raw`$M(b-a)$`, String.raw`$\int_a^b f(x)\,dx$`, String.raw`$\sup_D s(f,D) - \inf_D S(f,D)$`], correct: 2 }
  ],
  expl: String.raw`Le somme di Riemann sono **aree di plurirettangoli**: per questo l'integrale di una funzione non negativa misura il rettangoloide.` },

{ id: "c1-cloze-012", cap: 1, topic: "indefinito", type: "cloze", diff: 2,
  src: "Lezione 13/10, proprietà di omogeneità (P.I. 2025, compito B)",
  q: String.raw`Completare la dimostrazione della proprietà di omogeneità $\int kf(x)\,dx = k\int f(x)\,dx$, con $k \ne 0$.`,
  text: String.raw`Se $F \in \int kf(x)\,dx$, allora $F' = kf$; posto $G = $ {{1}} si ha $G' = f$, quindi $F = kG$ appartiene a {{2}}. Viceversa, se $F = kG$ con $G$ primitiva di $f$, allora $F' = $ {{3}}, cioè $F \in \int kf(x)\,dx$. Se fosse $k = 0$, il primo membro sarebbe {{4}}, mentre il secondo conterrebbe solo la funzione nulla.`,
  gaps: [
    { opts: [String.raw`$kF$`, String.raw`$F - k$`, String.raw`$\frac{F}{k}$`, String.raw`$F'$`], correct: 2 },
    { opts: [String.raw`$k\int f(x)\,dx$`, String.raw`$\int kf(x)\,dx$`, String.raw`$\int f(x)\,dx$`, String.raw`$\int \frac{f(x)}{k}\,dx$`], correct: 0 },
    { opts: [String.raw`$f$`, String.raw`$kG$`, String.raw`$k + f$`, String.raw`$kf$`], correct: 3 },
    { opts: ["l'insieme vuoto", "l'insieme di tutte le costanti", "la sola funzione nulla", String.raw`l'insieme delle primitive di $f$`], correct: 1 }
  ],
  expl: String.raw`Uguaglianza fra **insiemi**: si dimostra con la doppia inclusione. La divisione per $k$ è il punto in cui serve $k \ne 0$.` },

{ id: "c1-cloze-013", cap: 1, topic: "sostituzione", type: "cloze", diff: 1,
  src: "Lezione 13/10, prima formula di sostituzione (P.I. 2025, compito B)",
  q: "Completare la dimostrazione della prima formula di integrazione per sostituzione.",
  text: String.raw`Siano $g$ derivabile in $(a,b)$ a valori in $(\alpha,\beta)$ e $f$ dotata di primitive in $(\alpha,\beta)$. Sia $F$ una primitiva di $f$ e $G(x) = $ {{1}}. Per {{2}}, $G'(x) = $ {{3}}, quindi $G$ è una primitiva di $f(g(x))g'(x)$. Dunque $\int f(g(x))g'(x)\,dx = G(x) + k = $ {{4}}.`,
  gaps: [
    { opts: [String.raw`$F(x)g(x)$`, String.raw`$F(g(x))$`, String.raw`$g(F(x))$`, String.raw`$F(x) + g(x)$`], correct: 1 },
    { opts: ["la regola di derivazione della funzione composta", "la regola di derivazione del prodotto", "il teorema di Lagrange", "il teorema della media"], correct: 0 },
    { opts: [String.raw`$f(g(x))$`, String.raw`$f(x)g'(x)$`, String.raw`$F'(x)g'(x)$`, String.raw`$f(g(x))\,g'(x)$`], correct: 3 },
    { opts: [String.raw`$\left[\int f(t)\,dt\right]_{t = g(x)}$`, String.raw`$\int f(t)\,dt$`, String.raw`$\left[\int f(t)\,dt\right]_{t = x}$`, String.raw`$g(x)\int f(t)\,dt$`], correct: 0 }
  ],
  expl: String.raw`Errore tipico: fermarsi a $\int f(t)\,dt$ senza **ricomporre** con $g$.` },

{ id: "c1-cloze-014", cap: 1, topic: "sostituzione", type: "cloze", diff: 2,
  src: "Lezione 20/10, seconda formula di sostituzione",
  q: "Completare la dimostrazione della seconda formula di integrazione per sostituzione.",
  text: String.raw`Sia $f$ dotata di primitive in $(a,b)$ e $g : (c,d) \to (a,b)$ derivabile, {{1}}, con immagine $(a,b)$. Per {{2}} si ha $\int f(g(t))g'(t)\,dt = \left[\int f(x)\,dx\right]_{x = g(t)}$. Componendo entrambi i membri con {{3}} si ottiene $\int f(x)\,dx = $ {{4}}.`,
  gaps: [
    { opts: ["limitata", "invertibile", "crescente e positiva", "continua"], correct: 1 },
    { opts: ["la prima formula di sostituzione", "la formula di integrazione per parti", "la formula fondamentale", "la proprietà di omogeneità"], correct: 0 },
    { opts: [String.raw`$t = g(x)$`, String.raw`$x = g(t)$`, String.raw`$t = g^{-1}(x)$`, String.raw`$t = g'(x)$`], correct: 2 },
    { opts: [String.raw`$\left[\int f(g(t))g'(t)\,dt\right]_{t = g(x)}$`, String.raw`$\int f(g(t))\,dt$`, String.raw`$\left[\int f(t)\,dt\right]_{t = g^{-1}(x)}$`, String.raw`$\left[\int f(g(t))g'(t)\,dt\right]_{t = g^{-1}(x)}$`], correct: 3 }
  ],
  expl: String.raw`Senza l'invertibilità di $g$ non si potrebbe "tornare" alla variabile $x$.` },

{ id: "c2-cloze-004", cap: 2, topic: "primo_ordine", type: "cloze", diff: 2,
  src: "Lezione 20/10, integrale generale dell'omogenea del primo ordine",
  q: String.raw`Completare la dimostrazione: le soluzioni di $y' + a(x)y = 0$ sono le funzioni $ke^{-A(x)}$.`,
  text: String.raw`La funzione nulla è soluzione. Sia $y$ una soluzione mai nulla: essendo continua ha {{1}}, e $\frac{y'(x)}{y(x)} = -a(x)$. Il primo membro è la derivata di {{2}}; detta $A$ una primitiva di $a$, le funzioni $\log|y|$ e $-A$ hanno la stessa derivata in un intervallo, quindi {{3}}. Ne segue $y(x) = $ {{4}}, $k \ne 0$.`,
  gaps: [
    { opts: ["derivata costante", "segno costante", "un massimo", "un asintoto"], correct: 1 },
    { opts: [String.raw`$e^{y(x)}$`, String.raw`$\frac{1}{y(x)}$`, String.raw`$\log|y(x)|$`, String.raw`$y(x)^2$`], correct: 2 },
    { opts: [String.raw`$\log|y(x)| = -A(x) + c$`, String.raw`$\log|y(x)| = A(x) + c$`, String.raw`$\log|y(x)| = -A(x)$`, String.raw`$y(x) = -A(x) + c$`], correct: 0 },
    { opts: [String.raw`$ke^{A(x)}$`, String.raw`$-kA(x)$`, String.raw`$k - A(x)$`, String.raw`$ke^{-A(x)}$`], correct: 3 }
  ],
  expl: String.raw`Una soluzione è nulla ovunque oppure non si annulla mai: $ke^{-A}$ con $k \ne 0$ non tende mai a $0$ in un punto dell'intervallo.` },

{ id: "c2-cloze-005", cap: 2, topic: "primo_ordine", type: "cloze", diff: 2,
  src: "Lezione 20/10, variazione della costante",
  q: String.raw`Completare il metodo di variazione della costante per $y' + a(x)y = f(x)$, con $A$ primitiva di $a$.`,
  text: String.raw`Si cerca una soluzione del tipo $\bar y(x) = $ {{1}}. Si ha $\bar y' = k'e^{-A} - $ {{2}}, e sostituendo nell'equazione i termini con $k(x)$ si cancellano. Resta $k'(x) = $ {{3}}, quindi $k$ è una primitiva di questa funzione. L'integrale generale è $y = $ {{4}}.`,
  gaps: [
    { opts: [String.raw`$k\,e^{A(x)}$`, String.raw`$k(x)e^{-A(x)}$`, String.raw`$k(x) + e^{-A(x)}$`, String.raw`$k(x)A(x)$`], correct: 1 },
    { opts: [String.raw`$a(x)k(x)e^{-A(x)}$`, String.raw`$A(x)k(x)e^{-A(x)}$`, String.raw`$k(x)e^{-A(x)}$`, String.raw`$a(x)e^{A(x)}$`], correct: 0 },
    { opts: [String.raw`$f(x)e^{-A(x)}$`, String.raw`$f(x)A(x)$`, String.raw`$f(x)e^{A(x)}$`, String.raw`$\frac{f(x)}{a(x)}$`], correct: 2 },
    { opts: [String.raw`$ke^{A(x)} + k(x)e^{A(x)}$`, String.raw`$k(x)e^{-A(x)}$`, String.raw`$ke^{-A(x)}$`, String.raw`$ke^{-A(x)} + k(x)e^{-A(x)}$`], correct: 3 }
  ],
  expl: String.raw`Integrale generale $=$ integrale particolare $+$ integrale generale dell'omogenea associata.` },

{ id: "c2-cloze-006", cap: 2, topic: "wronskiano", type: "cloze", diff: 2,
  src: "Lezione 27/10, Teor. 1 (P.I. 2025, compito A)",
  q: "Completare la dimostrazione: un'equazione lineare omogenea del secondo ordine ha due soluzioni indipendenti.",
  text: String.raw`Fissato $x_0$, sia $y_1$ la soluzione del problema di Cauchy con $y(x_0) = 1$, $y'(x_0) = 0$ e $y_2$ quella con $y(x_0) = $ {{1}}, $y'(x_0) = $ {{2}}. Esse esistono per {{3}}. Si ha $W(x_0) = $ {{4}} $\ne 0$, quindi per il teorema sul Wronskiano $W(x) \ne 0$ per ogni $x$ e le soluzioni sono indipendenti.`,
  gaps: [
    { opts: [String.raw`$1$`, String.raw`$0$`, String.raw`$-1$`, String.raw`$x_0$`], correct: 1 },
    { opts: [String.raw`$0$`, String.raw`$x_0$`, String.raw`$1$`, String.raw`$2$`], correct: 2 },
    { opts: ["il teorema di esistenza e unicità del problema di Cauchy", "il principio di sovrapposizione", "la regola di Cramer", "il teorema dell'equazione caratteristica"], correct: 0 },
    { opts: [String.raw`$0$`, String.raw`$-1$`, String.raw`$2$`, String.raw`$\begin{vmatrix} 1 & 0 \\ 0 & 1\end{vmatrix} = 1$`], correct: 3 }
  ],
  expl: String.raw`I dati iniziali sono i "vettori della base": il Wronskiano in $x_0$ è il determinante dell'identità.` },

{ id: "c2-cloze-007", cap: 2, topic: "wronskiano", type: "cloze", diff: 3,
  src: "Lezione 27/10, Teor. 2 (P.I. 2025, compito A)",
  q: String.raw`Siano $y_1, y_2$ soluzioni indipendenti di un'omogenea del secondo ordine e $z$ una sua soluzione. Completare la dimostrazione del fatto che $z = k_1y_1 + k_2y_2$.`,
  text: String.raw`Fissato $x_0$, cerchiamo $w = k_1y_1 + k_2y_2$ con $w(x_0) = z(x_0)$ e $w'(x_0) = z'(x_0)$: è un sistema lineare in $k_1, k_2$ il cui determinante è {{1}}, diverso da zero perché {{2}}. Per {{3}} il sistema ha una e una sola soluzione. Allora $w$ e $z$ risolvono lo stesso problema di Cauchy, quindi per {{4}} $z = w$.`,
  gaps: [
    { opts: [String.raw`$y_1(x_0)y_2(x_0)$`, String.raw`$W(x_0)$`, String.raw`$z(x_0)$`, String.raw`$1$`], correct: 1 },
    { opts: [String.raw`$y_1, y_2$ sono indipendenti`, String.raw`$z$ non è nulla`, String.raw`$x_0 \ne 0$`, String.raw`i coefficienti sono costanti`], correct: 0 },
    { opts: ["il teorema di Lagrange", "la regola di Cramer", "il principio di sovrapposizione", "il teorema della media"], correct: 1 },
    { opts: ["l'esistenza", "il principio di identità dei polinomi", "l'unicità della soluzione del problema di Cauchy", "il teorema sul Wronskiano"], correct: 2 }
  ],
  expl: String.raw`Il teorema di esistenza e unicità si usa due volte nella teoria: esistenza nel Teor. 1, **unicità** qui.` },

{ id: "c2-cloze-008", cap: 2, topic: "coeff_costanti", type: "cloze", diff: 1,
  src: "Lezione 29/10, equazione caratteristica",
  q: String.raw`Completare la dimostrazione: $e^{\alpha x}$ è soluzione di $y'' + ay' + by = 0$ se e solo se $\alpha^2 + a\alpha + b = 0$.`,
  text: String.raw`Se $y = e^{\alpha x}$, allora $y' = $ {{1}} e $y'' = $ {{2}}. Sostituendo e raccogliendo si ottiene $e^{\alpha x}\cdot\big($ {{3}} $\big) = 0$. Poiché {{4}}, l'uguaglianza vale per ogni $x$ se e solo se $\alpha^2 + a\alpha + b = 0$.`,
  gaps: [
    { opts: [String.raw`$e^{\alpha x}$`, String.raw`$\alpha e^{\alpha x}$`, String.raw`$x e^{\alpha x}$`, String.raw`$\alpha e^{x}$`], correct: 1 },
    { opts: [String.raw`$\alpha^2e^{\alpha x}$`, String.raw`$2\alpha e^{\alpha x}$`, String.raw`$\alpha e^{\alpha x}$`, String.raw`$\alpha^2 e^{2\alpha x}$`], correct: 0 },
    { opts: [String.raw`$\alpha^2 + a + b$`, String.raw`$\alpha^2 + a\alpha + b$`, String.raw`$2\alpha + a$`, String.raw`$\alpha + a\alpha^2 + b$`], correct: 1 },
    { opts: [String.raw`$\alpha \ne 0$`, String.raw`$a, b$ sono costanti`, String.raw`$e^{\alpha x}$ non si annulla mai`, String.raw`$\Delta > 0$`], correct: 2 }
  ],
  expl: String.raw`L'equazione differenziale diventa un'equazione **algebrica**: l'equazione caratteristica.` }

);

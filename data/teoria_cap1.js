/* Teoria, capitolo 1: integrali. Albero capitolo -> sezioni -> nodi.
   Testi scritti con parole nostre seguendo i passaggi logici delle lezioni
   e delle dispense 2026/27 (che non vanno copiate). Schema: CONTRIBUTING.md.
   dimRichiesta = dimostrazione da saper scrivere (segnata con ★ nella teoria). */
(window.TEORIA = window.TEORIA || []).push({
  id: "cap1", cap: 1, label: "Integrali",
  intro: String.raw`Dalle **primitive** (funzioni di cui conosciamo la derivata) all'**integrale di Riemann** (un numero costruito con somme di rettangoli), e al ponte fra i due: la **funzione integrale** e la **formula fondamentale**. Poi i metodi di integrazione e l'esercizio più frequente della prova: la primitiva di una funzione con valore assoluto.`,
  children: [

  /* ======================= PRIMITIVE ======================= */
  { id: "s-primitive", label: "Primitive", topic: "primitive", children: [

    { id: "d-primitiva", label: "Primitiva", topic: "primitive", kind: "definizione",
      idea: String.raw`Una primitiva è la risposta alla domanda "di chi è la derivata $f$?". Come conoscere la velocità di un'auto istante per istante e chiedersi dove si trova: la posizione si ricostruisce, ma solo a meno del punto di partenza.`,
      enunciato: { ip: String.raw`$f : (a,b) \to \mathbb{R}$.`, ts: String.raw`Una funzione $F : (a,b) \to \mathbb{R}$ si dice **primitiva** di $f$ in $(a,b)$ se è derivabile in $(a,b)$ e $F'(x) = f(x)$ per ogni $x \in (a,b)$.` },
      esempio: String.raw`$F(x) = \sin x$ è una primitiva di $\cos x$ in $\mathbb{R}$; lo è anche $\sin x + 7$. $F(x) = \log|x|$ è primitiva di $\frac1x$ in $]0,+\infty[$ e in $]-\infty,0[$, ma **non** in $\mathbb{R} \setminus \{0\}$ come "unico intervallo", perché non è un intervallo.`,
      errori: [String.raw`Dimenticare che la definizione è **su un intervallo**: tutte le proprietà successive (in particolare la caratterizzazione) lo usano.`] },

    { id: "t-caratt-primitive", label: "Caratterizzazione delle primitive", topic: "primitive", kind: "teorema", dimRichiesta: true,
      idea: String.raw`Due primitive della stessa funzione hanno la stessa derivata, quindi la loro differenza ha derivata nulla: in un intervallo è costante. Graficamente le primitive sono **la stessa curva traslata in verticale**.`,
      enunciato: { ip: String.raw`$F$ è una primitiva di $f$ nell'intervallo $(a,b)$.`, ts: String.raw`Tutte e sole le primitive di $f$ in $(a,b)$ sono le funzioni $F(x) + k$, al variare di $k \in \mathbb{R}$.` },
      dim: [
        { passo: String.raw`**Le $F + k$ sono primitive.** Posto $G(x) = F(x) + k$, $G$ è derivabile e $G'(x) = F'(x) + 0 = f(x)$ per ogni $x \in (a,b)$.`, perche: String.raw`Derivata di una somma e derivata di una costante.` },
        { passo: String.raw`**Non ce ne sono altre.** Sia $G$ una qualunque primitiva di $f$ e poniamo $H(x) = G(x) - F(x)$. $H$ è derivabile e $H'(x) = f(x) - f(x) = 0$ per ogni $x \in (a,b)$.`, perche: String.raw`Differenza di funzioni derivabili.` },
        { passo: String.raw`$H$ ha derivata identicamente nulla nell'**intervallo** $(a,b)$, quindi è costante: esiste $k$ con $G(x) - F(x) = k$, cioè $G = F + k$.`, perche: String.raw`Teorema sulle funzioni a derivata nulla, conseguenza di Lagrange: presi $x_1 < x_2$, $H(x_2) - H(x_1) = H'(c)(x_2 - x_1) = 0$.` }
      ],
      esempio: String.raw`Le primitive di $2x$ in $\mathbb{R}$ sono tutte e sole $x^2 + k$. Se ci serve quella con $F(1) = 5$: $1 + k = 5$, quindi $F(x) = x^2 + 4$.`,
      esame: String.raw`È la base di ogni esercizio di primitive con condizione e della formula fondamentale (dove si usa al primo passo).`,
      errori: [String.raw`Applicarlo su un insieme che **non è un intervallo**: $\log|x|$ e $\log|x| + 1$ per $x > 0$, $\log|x| + 2$ per $x < 0$ sono entrambe primitive di $\frac1x$ in $\mathbb{R}\setminus\{0\}$, ma non differiscono per una costante.`, String.raw`Citare "Rolle" o "il teorema fondamentale": il risultato che serve è quello sulle funzioni a **derivata nulla** (da Lagrange).`],
      cloze: "c1-cloze-004" },

    { id: "t-senza-primitive", label: "Una funzione senza primitive", topic: "primitive", kind: "esempio", dimRichiesta: true,
      idea: String.raw`Una funzione con un salto non può essere la derivata di nessuno: le "primitive dei due pezzi" non si possono incollare in modo derivabile. È lo stesso ragionamento degli esercizi con il valore assoluto, ma qui l'incollatura fallisce.`,
      enunciato: { ip: String.raw`$f(x) = -1$ per $x < 0$, $f(x) = 1$ per $x \ge 0$.`, ts: String.raw`$f$ **non** è dotata di primitive in $]-\infty, +\infty[$.` },
      dim: [
        { passo: String.raw`Per assurdo, sia $F$ una primitiva di $f$ in $\mathbb{R}$. Allora $F$ è primitiva di $f$ anche in $[0,+\infty[$ e in $]-\infty,0[$.`, perche: String.raw`La restrizione di una primitiva a un sottointervallo è ancora una primitiva.` },
        { passo: String.raw`In $[0,+\infty[$ un'altra primitiva è $x$, quindi $F(x) = x + k$; in $]-\infty, 0[$ un'altra primitiva è $-x$, quindi $F(x) = -x + c$.`, perche: String.raw`Caratterizzazione delle primitive, applicata su ciascuno dei due intervalli.` },
        { passo: String.raw`$F$ è derivabile, quindi continua in $0$: $\lim_{x\to0^-} F(x) = F(0)$, cioè $c = k$.`, perche: String.raw`Derivabile $\Rightarrow$ continua.` },
        { passo: String.raw`Allora $F(x) = |x| + k$ in tutto $\mathbb{R}$, e $|x|$ dovrebbe essere derivabile in $0$: **assurdo**.`, perche: String.raw`$|x|$ ha derivata sinistra $-1$ e destra $1$ in $0$.` }
      ],
      grafico: "g-segno",
      esame: String.raw`Controesempio classico: una funzione **integrabile** (anche limitata) può non avere primitive. Utile per i V/F su "integrale indefinito vuoto".`,
      errori: [String.raw`Concludere "non ha primitive perché non è continua": la continuità è sufficiente, **non necessaria** (vedi l'esempio successivo).`],
      cloze: "c1-cloze-005" },

    { id: "o-noncontinua-primitive", label: "Funzione non continua dotata di primitive", topic: "primitive", kind: "osservazione",
      idea: String.raw`Esiste una funzione discontinua che è comunque una derivata: la discontinuità "oscillante" di $\cos\frac1x$ è permessa, un salto no.`,
      enunciato: { ip: String.raw`$f(x) = 2x\sin\frac1x - \cos\frac1x$ per $x \ne 0$, $f(0) = 0$.`, ts: String.raw`$f$ non è continua in $0$, ma $F(x) = x^2\sin\frac1x$ (con $F(0) = 0$) è una sua primitiva in $\mathbb{R}$.` },
      testo: String.raw`Per $x \ne 0$ si deriva con le regole: $F'(x) = 2x\sin\frac1x + x^2\cos\frac1x\cdot\left(-\frac1{x^2}\right) = f(x)$. In $0$ si usa il rapporto incrementale: $\frac{F(x) - F(0)}{x} = x\sin\frac1x \to 0 = f(0)$. Ma $\lim_{x\to0} f(x)$ non esiste, perché $\cos\frac1x$ oscilla.`,
      esame: String.raw`Controesempio per l'implicazione "$f$ dotata di primitive $\Rightarrow$ $f$ continua" (falsa).` }
  ]},

  /* ======================= RIEMANN ======================= */
  { id: "s-riemann", label: "Integrale di Riemann", topic: "riemann", children: [

    { id: "d-somme", label: "Decomposizioni e somme di Riemann", topic: "riemann", kind: "definizione",
      idea: String.raw`Per misurare l'area sotto una curva la "pavimentiamo" con rettangoli: quelli alti quanto il **minimo** di $f$ stanno sotto la curva, quelli alti quanto il **massimo** la coprono. Più i rettangoli sono stretti, più le due stime si avvicinano.`,
      enunciato: { ip: String.raw`$f : [a,b] \to \mathbb{R}$ continua.`, ts: String.raw`Una **decomposizione** di $[a,b]$ è un insieme $D = \{x_0; x_1; \dots; x_n\}$ con $a = x_0 < x_1 < \dots < x_n = b$ (i **capisaldi**); la sua **ampiezza** è la massima lunghezza $x_i - x_{i-1}$. In ogni $I_i = [x_{i-1}, x_i]$ siano $y_i$, $z_i$ punti di minimo e di massimo di $f$ (Weierstrass). Si chiamano somma inferiore e superiore
      $$s(f,D) = \sum_{i=1}^n f(y_i)(x_i - x_{i-1}), \qquad S(f,D) = \sum_{i=1}^n f(z_i)(x_i - x_{i-1}).$$` },
      testo: String.raw`Al variare di $D$ si ottengono due insiemi numerici: $\underline{S}$ (somme inferiori) e $\overline{S}$ (somme superiori). Si prova che ogni somma inferiore è $\le$ di ogni somma superiore, anche relative a decomposizioni diverse: i due insiemi sono **separati**, quindi $\sup \underline S \le \inf \overline S$.`,
      grafico: "g-riemann",
      errori: [String.raw`Confondere i rettangoli: $s(f,D)$ usa il **minimo** in ogni intervallo, non il valore nell'estremo sinistro.`] },

    { id: "t-contigue", label: "Le somme inferiori e superiori sono contigue", topic: "riemann", kind: "teorema", dimRichiesta: true,
      idea: String.raw`Se $f$ è continua, restringendo abbastanza i rettangoli lo scarto fra rettangoli "sotto" e "sopra" diventa piccolo quanto vogliamo. Il motivo è l'**uniforme continuità**: una sola tolleranza $\delta$ va bene in tutto $[a,b]$.`,
      enunciato: { ip: String.raw`$f$ continua in $[a,b]$.`, ts: String.raw`Gli insiemi $\underline S$ e $\overline S$ delle somme inferiori e superiori sono **contigui**: $\sup \underline S = \inf \overline S$.` },
      dim: [
        { passo: String.raw`Gli insiemi sono già separati: basta provare che per ogni $\varepsilon > 0$ esiste una decomposizione $D$ con $S(f,D) - s(f,D) < \varepsilon$.`, perche: String.raw`Caratterizzazione degli insiemi contigui: due insiemi separati sono contigui se e solo se contengono elementi vicini quanto si vuole.` },
        { passo: String.raw`Fissato $\varepsilon > 0$: $f$ è **uniformemente continua** in $[a,b]$, quindi in corrispondenza di $\frac{\varepsilon}{b-a}$ esiste $\delta > 0$ tale che $|x' - x''| < \delta \Rightarrow |f(x') - f(x'')| < \frac{\varepsilon}{b-a}$.`, perche: String.raw`Teorema di Heine-Cantor: continua su un intervallo chiuso e limitato $\Rightarrow$ uniformemente continua.` },
        { passo: String.raw`Scegliamo $D$ di ampiezza minore di $\delta$. In ogni $I_i$ i punti $y_i, z_i$ distano meno di $\delta$, quindi $f(z_i) - f(y_i) < \frac{\varepsilon}{b-a}$.`, perche: String.raw`$y_i, z_i \in I_i$, che è lungo meno di $\delta$.` },
        { passo: String.raw`$S(f,D) - s(f,D) = \sum_{i=1}^n \big(f(z_i) - f(y_i)\big)(x_i - x_{i-1}) < \frac{\varepsilon}{b-a}\sum_{i=1}^n (x_i - x_{i-1}) = \frac{\varepsilon}{b-a}(b-a) = \varepsilon$.`, perche: String.raw`La somma delle lunghezze degli intervalli è $b - a$.` }
      ],
      grafico: "g-riemann",
      esame: String.raw`Chiesto nell'appello del 15/02/2024 e nel recupero capp. 1-2.`,
      errori: [String.raw`Usare la sola continuità (con un $\delta$ che dipende dal punto): serve l'**uniforme** continuità.`, String.raw`Dimenticare di dividere $\varepsilon$ per $b - a$: alla fine non si ottiene $\varepsilon$.`],
      video: ["yt:F5lrPbvXMgg"],
      cloze: "c1-cloze-006" },

    { id: "d-integrale", label: "Integrale definito", topic: "riemann", kind: "definizione",
      idea: String.raw`L'integrale è **il numero** "incastrato" fra tutte le stime per difetto e tutte quelle per eccesso.`,
      enunciato: { ip: String.raw`$f$ continua in $[a,b]$.`, ts: String.raw`L'**integrale definito** $\int_a^b f(x)\,dx$ è l'unico elemento di separazione fra $\underline S$ e $\overline S$. Si pone inoltre $\int_a^a f = 0$ e, se $a > b$, $\int_a^b f = -\int_b^a f$.` },
      testo: String.raw`È un **numero**: la variabile $x$ è muta ($\int_a^b f(x)\,dx = \int_a^b f(t)\,dt$). Coincide con un'area solo se $f \ge 0$.`,
      esame: String.raw`P.I. 24/11/2023: "$\int_a^b f(x)\,dx$ rappresenta: una funzione, un numero, un insieme, un'area".`,
      errori: [String.raw`Chiamarlo "area" senza condizioni: se $f$ cambia segno l'integrale **non** è l'area.`] }
  ]},

  /* ======================= PROPRIETÀ ======================= */
  { id: "s-proprieta", label: "Proprietà dell'integrale definito", topic: "proprieta", children: [

    { id: "t-additiva", label: "Proprietà additiva", topic: "proprieta", kind: "proprieta", dimRichiesta: true,
      idea: String.raw`Percorrere $[a,b]$ è come percorrere $[a,c]$ e poi $[c,b]$. La convenzione $\int_b^a = -\int_a^b$ fa funzionare la formula **qualunque** sia l'ordine dei tre punti, anche quando $c$ sta fuori.`,
      enunciato: { ip: String.raw`$f$ continua nell'intervallo $I$, $a, b, c \in I$.`, ts: String.raw`$$\int_a^b f(x)\,dx = \int_a^c f(x)\,dx + \int_c^b f(x)\,dx.$$` },
      dim: [
        { passo: String.raw`Il caso $a < c < b$ si prova con le somme (si usano le decomposizioni che contengono $c$) e lo assumiamo.`, perche: String.raw`Caso base dimostrato a lezione.` },
        { passo: String.raw`Se due dei tre punti coincidono la tesi è immediata (per esempio $c = a$: $\int_a^a f = 0$).`, perche: String.raw`Definizione $\int_a^a f = 0$.` },
        { passo: String.raw`Esempio di caso diverso: $c < a < b$. Applicando il caso base ai punti ordinati $c < a < b$: $\int_c^b f = \int_c^a f + \int_a^b f$.`, perche: String.raw`Caso base con i ruoli scambiati.` },
        { passo: String.raw`Quindi $\int_a^b f = \int_c^b f - \int_c^a f = \int_a^c f + \int_c^b f$.`, perche: String.raw`$-\int_c^a f = \int_a^c f$ per definizione.` },
        { passo: String.raw`Gli altri ordinamenti ($6$ in tutto) si trattano allo stesso modo: si scrive il caso base con i punti in ordine crescente e si ricava l'integrale che serve.`, perche: String.raw`Stesso ragionamento.` }
      ],
      esempio: String.raw`$\int_{-3}^1 |x|(x+1)\,dx = \int_{-3}^0 (-x^2 - x)\,dx + \int_0^1 (x^2 + x)\,dx = -\frac92 + \frac56 = -\frac{11}{3}$: si spezza dove cambia la formula di $|x|$.`,
      esame: String.raw`Esercizio di lezione; si usa in tutte le dimostrazioni sulla funzione integrale e negli integrali definiti con valore assoluto.`,
      errori: [String.raw`Pensare che serva $a < c < b$: vale per **ogni** ordine.`],
      cloze: "c1-cloze-007" },

    { id: "t-distributiva", label: "Proprietà distributiva (linearità)", topic: "proprieta", kind: "proprieta",
      enunciato: { ip: String.raw`$f, g$ continue in $[a,b]$, $\alpha, \beta \in \mathbb{R}$.`, ts: String.raw`$$\int_a^b \big(\alpha f(x) + \beta g(x)\big)\,dx = \alpha\int_a^b f(x)\,dx + \beta\int_a^b g(x)\,dx.$$` },
      testo: String.raw`Si usa per spezzare un integrale in pezzi più semplici e nella dimostrazione della seconda proprietà di monotonia.` },

    { id: "t-monotonia", label: "Proprietà di monotonia", topic: "proprieta", kind: "proprieta", dimRichiesta: true,
      idea: String.raw`Una funzione che sta sopra un'altra racchiude "più area con segno". Ma attenzione: $f \ge 0$ dà $\int \ge 0$, **non** $> 0$.`,
      enunciato: { ip: String.raw`$f, g$ continue in $[a,b]$.`, ts: String.raw`1) Se $f(x) \ge 0$ per ogni $x$, allora $\int_a^b f \ge 0$, e $\int_a^b f = 0$ se e solo se $f \equiv 0$.<br>2) Se $f(x) \le g(x)$ per ogni $x$, allora $\int_a^b f \le \int_a^b g$.` },
      dim: [
        { passo: String.raw`**1)** Per ogni decomposizione $D$ i minimi $f(y_i)$ sono $\ge 0$, quindi $s(f,D) \ge 0$; poiché l'integrale è $\ge$ di ogni somma inferiore, $\int_a^b f \ge s(f,D) \ge 0$.`, perche: String.raw`L'integrale separa somme inferiori e superiori.` },
        { passo: String.raw`Se $f$ non è identicamente nulla, esiste $x_0$ con $f(x_0) > 0$, e per continuità $f(x) > \frac{f(x_0)}{2}$ in un intervallo $[\alpha,\beta] \ni x_0$ di lunghezza positiva.`, perche: String.raw`Teorema della permanenza del segno.` },
        { passo: String.raw`Spezzando $[a,b]$ in $[a,\alpha]$, $[\alpha,\beta]$, $[\beta,b]$: i due pezzi esterni sono $\ge 0$ e quello centrale è $\ge \frac{f(x_0)}{2}(\beta - \alpha) > 0$, quindi $\int_a^b f > 0$.`, perche: String.raw`Additività e punto 1 sui pezzi; prima versione della media sul pezzo centrale.` },
        { passo: String.raw`**2)** $g - f \ge 0$, quindi per la 1) $\int_a^b (g - f) \ge 0$, cioè $\int_a^b g - \int_a^b f \ge 0$.`, perche: String.raw`Proprietà distributiva.` }
      ],
      esame: String.raw`V/F ricorrente: "se $f \ge 0$ allora $\int_a^b f > 0$" (falso) e implicazione "$\int \ge 0 \Rightarrow f \ge 0$" (falsa).`,
      errori: [String.raw`Scrivere $> 0$ invece di $\ge 0$.`, String.raw`Credere al viceversa: $\int_{-1}^2 x\,dx = \frac32 \ge 0$ ma $x$ non è $\ge 0$ ovunque.`],
      cloze: "c1-cloze-008" },

    { id: "t-media", label: "Teorema della media", topic: "proprieta", kind: "teorema", dimRichiesta: true,
      idea: String.raw`Immagina la regione sotto il grafico come **sabbia**: se la spiani sopra $[a,b]$ ottieni un rettangolo con la stessa area. La sua altezza, il **valore medio** di $f$, è compresa fra minimo e massimo, e quindi (essendo $f$ continua) è un valore che $f$ assume davvero in qualche punto $c$.`,
      enunciato: { ip: String.raw`$f$ continua in $[a,b]$, con minimo $m$ e massimo $M$.`, ts: String.raw`**(1)** $m(b-a) \le \int_a^b f(x)\,dx \le M(b-a)$.<br>**(2)** Esiste $c \in [a,b]$ tale che $\int_a^b f(x)\,dx = f(c)(b-a)$.<br>Le due affermazioni sono equivalenti.` },
      dim: [
        { passo: String.raw`$m$ ed $M$ esistono.`, perche: String.raw`Teorema di Weierstrass: $f$ continua su $[a,b]$ chiuso e limitato.` },
        { passo: String.raw`**(1)** Prendiamo la decomposizione banale $D = \{a; b\}$: c'è un solo intervallo, $[a,b]$, quindi $s(f,D) = m(b-a)$ e $S(f,D) = M(b-a)$.`, perche: String.raw`Definizione di somma inferiore e superiore con un solo intervallo.` },
        { passo: String.raw`Poiché $\int_a^b f$ è l'elemento di separazione fra le somme inferiori e le superiori, $s(f,D) \le \int_a^b f \le S(f,D)$: è la (1).`, perche: String.raw`Definizione di integrale.` },
        { passo: String.raw`**(1) $\Rightarrow$ (2)** Dividendo per $b - a > 0$: $m \le \frac{1}{b-a}\int_a^b f(x)\,dx \le M$.`, perche: String.raw`Dividere per un numero positivo conserva le disuguaglianze.` },
        { passo: String.raw`Il numero $\frac{1}{b-a}\int_a^b f$ sta fra il minimo e il massimo di una funzione continua su un intervallo, quindi è un valore assunto: esiste $c \in [a,b]$ con $f(c) = \frac{1}{b-a}\int_a^b f$. Moltiplicando per $b - a$ si ha la (2).`, perche: String.raw`Teorema dei **valori intermedi**.` },
        { passo: String.raw`**(2) $\Rightarrow$ (1)** Da $m \le f(c) \le M$, moltiplicando per $b - a > 0$: $m(b-a) \le f(c)(b-a) = \int_a^b f \le M(b-a)$.`, perche: String.raw`$m$ ed $M$ sono minimo e massimo, $c \in [a,b]$.` }
      ],
      grafico: "g-media",
      esempio: String.raw`$f(x) = x^2$ in $[0,3]$: $\int_0^3 x^2\,dx = 9$, quindi $f(c)\cdot 3 = 9$, $c^2 = 3$, $c = \sqrt3 \in [0,3]$. Controllo della (1): $0 \cdot 3 \le 9 \le 9 \cdot 3$.`,
      esame: String.raw`**P.I. 9/12/2025, compito B** (dimostrazione) ed **esempio di prova 2026/27, quesito 1** (completamento: $m(b-a)$, $M(b-a)$, $D = \{a; b\}$, $s(f,D)$, $S(f,D)$, "elemento di separazione fra gli insiemi delle somme inferiori e superiori").`,
      errori: [String.raw`Scrivere $m \le \int_a^b f \le M$: manca $(b - a)$.`, String.raw`Citare Lagrange o Rolle per trovare $c$: serve il teorema dei **valori intermedi** (Weierstrass serve prima, per $m$ e $M$).`, String.raw`Dire che $c$ è unico: per $f(x) = \sin x$ in $[0, 2\pi]$ il valore medio è $0$ e ci sono tre punti $c$.`],
      video: ["yt:N-GkcIlCyOo"],
      cloze: "c1-cloze-001" }
  ]},

  /* ======================= FUNZIONE INTEGRALE ======================= */
  { id: "s-funzint", label: "Funzione integrale e teoremi fondamentali", topic: "funzione_integrale", children: [

    { id: "d-funzione-integrale", label: "Funzione integrale", topic: "funzione_integrale", kind: "definizione",
      idea: String.raw`Fissato un punto di partenza $x_0$, a ogni $x$ associamo **l'area con segno accumulata** da $x_0$ a $x$: è come il contachilometri parziale azzerato in $x_0$.`,
      enunciato: { ip: String.raw`$f : (\alpha,\beta) \to \mathbb{R}$ continua, $x_0 \in (\alpha,\beta)$.`, ts: String.raw`La **funzione integrale** di punto iniziale $x_0$ è $F(x) = \int_{x_0}^x f(t)\,dt$, $x \in (\alpha,\beta)$. Si ha $F(x_0) = 0$.` },
      grafico: "g-funz-int",
      errori: [String.raw`Usare $x$ anche come variabile di integrazione: si scrive $\int_{x_0}^x f(t)\,dt$.`] },

    { id: "t-due-funzint", label: "Due funzioni integrali differiscono per una costante", topic: "funzione_integrale", kind: "teorema", dimRichiesta: true,
      idea: String.raw`Due contachilometri azzerati in punti diversi segnano sempre la stessa differenza: il tratto fra i due punti di partenza.`,
      enunciato: { ip: String.raw`$f : (\alpha,\beta) \to \mathbb{R}$ continua, $x_0, x_1 \in (\alpha,\beta)$, $F$ e $G$ funzioni integrali di punto iniziale $x_0$ e $x_1$.`, ts: String.raw`Esiste $c \in \mathbb{R}$ tale che $F(x) = G(x) + c$ per ogni $x \in (\alpha,\beta)$.` },
      dim: [
        { passo: String.raw`Per definizione $F(x) = \int_{x_0}^x f(t)\,dt$ e $G(x) = \int_{x_1}^x f(t)\,dt$.`, perche: String.raw`Definizione di funzione integrale.` },
        { passo: String.raw`$F(x) = \int_{x_0}^{x_1} f(t)\,dt + \int_{x_1}^x f(t)\,dt = \int_{x_0}^{x_1} f(t)\,dt + G(x)$.`, perche: String.raw`Proprietà **additiva** (vale per ogni ordine dei punti).` },
        { passo: String.raw`Il primo addendo è un numero che non dipende da $x$: è la costante $c$.`, perche: String.raw`Integrale definito fra estremi fissi.` }
      ],
      esame: String.raw`Teorema breve, utile anche come passo nei V/F sulle funzioni integrali.`,
      cloze: "c1-cloze-009" },

    { id: "t-derivazione", label: "Teorema di derivazione della funzione integrale", topic: "funzione_integrale", kind: "teorema", dimRichiesta: true,
      idea: String.raw`Se allunghi di poco l'intervallo, l'area aggiunta è circa un rettangolino di base $x - c$ e altezza $f(c)$. Il rapporto "area aggiunta / base" tende quindi a $f(c)$: la velocità con cui cresce l'area è l'altezza del grafico.`,
      enunciato: { ip: String.raw`$f : (\alpha,\beta) \to \mathbb{R}$ continua, $F(x) = \int_{x_0}^x f(t)\,dt$.`, ts: String.raw`$F$ è derivabile in $(\alpha,\beta)$ e $F'(x) = f(x)$ per ogni $x$.` },
      dim: [
        { passo: String.raw`Fissiamo $c \in (\alpha,\beta)$ e per $x \ne c$ consideriamo il rapporto incrementale $r(x) = \frac{F(x) - F(c)}{x - c}$.`, perche: String.raw`Definizione di derivata.` },
        { passo: String.raw`$F(x) - F(c) = \int_{x_0}^x f - \int_{x_0}^c f = \int_c^x f(t)\,dt$, quindi $r(x) = \frac{1}{x-c}\int_c^x f(t)\,dt$.`, perche: String.raw`Proprietà additiva.` },
        { passo: String.raw`Se $x > c$, applicando il teorema della media a $f$ su $[c,x]$ esiste $y \in [c,x]$ con $\int_c^x f = f(y)(x - c)$, quindi $r(x) = f(y)$.`, perche: String.raw`Teorema della media (seconda versione).` },
        { passo: String.raw`Se $x < c$: $r(x) = \frac{-\int_x^c f}{x - c} = \frac{\int_x^c f}{c - x}$ e, come prima, esiste $y \in [x,c]$ con $r(x) = f(y)$.`, perche: String.raw`$\int_c^x = -\int_x^c$ e teorema della media su $[x,c]$.` },
        { passo: String.raw`In entrambi i casi $y$ è compreso fra $c$ e $x$, quindi per $x \to c$ anche $y \to c$, e $\lim_{x\to c} r(x) = \lim_{y \to c} f(y) = f(c)$.`, perche: String.raw`Teorema dei carabinieri per $y$; **continuità** di $f$ in $c$.` }
      ],
      grafico: "g-funz-int",
      esempio: String.raw`$F(x) = \int_0^x e^{t^2}\,dt$ ha $F'(x) = e^{x^2}$, anche se $e^{t^2}$ non ha primitive elementari.`,
      esame: String.raw`**Simulazione P.I. 2025, canale MZ** e recupero del 19/02/2025.`,
      errori: [String.raw`Trattare solo il caso $x > c$: servono **entrambi** i lati.`, String.raw`Dimenticare dove si usa la continuità di $f$: è nell'ultimo passo (e nel teorema della media).`],
      video: ["yt:F5lrPbvXMgg"],
      cloze: "c1-cloze-010" },

    { id: "t-fondamentale", label: "Teorema fondamentale del calcolo integrale", topic: "funzione_integrale", kind: "teorema",
      idea: String.raw`Ogni funzione continua è la derivata di qualcuno: della sua funzione integrale.`,
      enunciato: { ip: String.raw`$f$ continua nell'intervallo $(\alpha,\beta)$.`, ts: String.raw`$f$ è dotata di primitive in $(\alpha,\beta)$ (per esempio ogni sua funzione integrale).` },
      testo: String.raw`Segue subito dal teorema di derivazione della funzione integrale. La continuità è condizione **sufficiente**, non necessaria.`,
      esame: String.raw`P.I. 24/11/2023: "definizione di primitiva e condizione sufficiente per l'esistenza".` },

    { id: "t-formula-fond", label: "Formula fondamentale del calcolo integrale", topic: "funzione_integrale", kind: "teorema", dimRichiesta: true,
      idea: String.raw`Per sapere quanta strada hai fatto fra le ore $a$ e $b$ non serve sommare le velocità istante per istante: basta leggere la posizione alla fine e all'inizio. Qui la posizione è una primitiva.`,
      enunciato: { ip: String.raw`$f : (\alpha,\beta) \to \mathbb{R}$ continua, $F$ una sua primitiva, $a, b \in (\alpha,\beta)$.`, ts: String.raw`$$\int_a^b f(x)\,dx = F(b) - F(a) = \big[F(x)\big]_a^b.$$` },
      dim: [
        { passo: String.raw`$G(x) = \int_a^x f(t)\,dt$ è una primitiva di $f$.`, perche: String.raw`Teorema di derivazione della funzione integrale.` },
        { passo: String.raw`Esiste $k$ con $F(x) = G(x) + k$ per ogni $x$.`, perche: String.raw`Caratterizzazione delle primitive (due primitive differiscono per una costante).` },
        { passo: String.raw`Per $x = a$: $F(a) = G(a) + k = 0 + k$, quindi $k = F(a)$.`, perche: String.raw`$G(a) = \int_a^a f = 0$.` },
        { passo: String.raw`Per $x = b$: $F(b) = \int_a^b f(x)\,dx + F(a)$, che è la tesi.`, perche: String.raw`Sostituzione di $x = b$.` }
      ],
      esempio: String.raw`$\int_1^2 x^2e^x\,dx$: prima la primitiva $e^x(x^2 - 2x + 2)$, poi la formula: $2e^2 - e$.`,
      esame: String.raw`**P.I. 9/12/2025, compito B** e appelli 2024.`,
      errori: [String.raw`Negli esercizi: integrare per sostituzione "portandosi dietro gli estremi". La docente vuole **prima** la primitiva (integrale indefinito), **poi** la formula fondamentale.`],
      video: ["yt:F5lrPbvXMgg"],
      cloze: "c1-cloze-002" },

    { id: "m-derivata-funzint", label: "Derivare una funzione integrale con estremi variabili", topic: "funzione_integrale", kind: "metodo",
      idea: String.raw`Se l'estremo è $x^3$ invece di $x$, la funzione integrale è "composta" con $x^3$: si deriva con la regola della catena.`,
      testo: String.raw`**Schema.** Se gli estremi sono funzioni di $x$, si spezza in un punto fisso $p$ e si deriva ogni pezzo come funzione composta:
      $$\frac{d}{dx}\int_{a(x)}^{b(x)} f(t)\,dt = \frac{d}{dx}\left[\int_p^{b(x)} f - \int_p^{a(x)} f\right] = f\big(b(x)\big)\,b'(x) - f\big(a(x)\big)\,a'(x).$$
      Casi frequenti: $\frac{d}{dx}\int_x^3 f = -f(x)$ (estremo variabile in basso: segno meno); $\frac{d}{dx}\int_1^{x^3} f = f(x^3)\cdot 3x^2$.`,
      esempio: String.raw`$F(x) = \int_{x^4}^{\log x} \frac{\sin t}{t}\,dt$ per $x > 1$: $F'(x) = \frac{\sin(\log x)}{\log x}\cdot\frac1x - \frac{\sin x^4}{x^4}\cdot 4x^3$.`,
      errori: [String.raw`Dimenticare la derivata della funzione interna ($3x^2$, $\frac1x$).`, String.raw`Segno: il contributo dell'estremo **inferiore** va col meno.`] },

    { id: "m-primitiva-condizione", label: "Primitiva con condizione tramite la funzione integrale", topic: "funzione_integrale", kind: "metodo",
      testo: String.raw`La primitiva $F$ di $f$ continua con $F(x_0) = y_0$ è $F(x) = y_0 + \int_{x_0}^x f(t)\,dt$: è una primitiva (derivazione della funzione integrale) e in $x_0$ vale $y_0 + 0$. Funziona anche quando $f$ non ha primitive elementari, come $e^{x^2}$ o $\frac{\sin x}{x}$.`,
      esempio: String.raw`La primitiva di $e^{x^2}$ in $\mathbb{R}$ che vale $3$ in $1$ è $F(x) = 3 + \int_1^x e^{t^2}\,dt$.` }
  ]},

  /* ======================= MISURA ======================= */
  { id: "s-misura", label: "Misura di Peano-Jordan e aree", topic: "misura", children: [

    { id: "d-peano-jordan", label: "Misura di Peano-Jordan", topic: "misura", kind: "definizione",
      idea: String.raw`Per misurare una figura la confrontiamo con figure fatte di rettangoli: quelle **dentro** danno stime per difetto, quelle che la **contengono** stime per eccesso. Se le due stime si incontrano, la figura ha un'area.`,
      enunciato: { ip: String.raw`$A \subset \mathbb{R}^2$ limitato.`, ts: String.raw`Un **plurirettangolo** è un'unione finita di rettangoli con lati paralleli agli assi e interni disgiunti. Sia $\underline{A}$ l'insieme delle aree dei plurirettangoli contenuti in $A$ e $\overline{A}$ quello delle aree dei plurirettangoli che contengono $A$: sono separati. $A$ è **misurabile** (dotato di area) se sono contigui, e l'area è l'elemento di separazione.` },
      testo: String.raw`**Un insieme non misurabile.** $A = [0,1]^2 \cup \big(([0,1]\cap\mathbb{Q}) \times ([1,2]\cap\mathbb{Q})\big)$: ogni plurirettangolo contenuto in $A$ sta (a meno dei bordi) nel quadrato $[0,1]^2$, perché la parte "razionale" non contiene rettangoli; ogni plurirettangolo che contiene $A$ deve coprire tutto $[0,1]\times[0,2]$, perché i razionali sono densi. Quindi $\sup\underline{A} = 1$ e $\inf\overline{A} = 2$.`,
      grafico: "g-misura" },

    { id: "t-rettangoloide", label: "Area del rettangoloide", topic: "misura", kind: "teorema", dimRichiesta: true,
      idea: String.raw`I rettangoli delle somme inferiori sono plurirettangoli **dentro** la regione, quelli delle somme superiori la **contengono**: le somme di Riemann sono proprio aree di plurirettangoli.`,
      enunciato: { ip: String.raw`$f$ continua in $[a,b]$ con $f(x) \ge 0$; $R_f = \{(x,y) : a \le x \le b,\ 0 \le y \le f(x)\}$ (rettangoloide).`, ts: String.raw`$R_f$ è misurabile e la sua area è $\int_a^b f(x)\,dx$.` },
      dim: [
        { passo: String.raw`$R_f$ è limitato: è contenuto nel rettangolo $[a,b] \times [0,M]$, con $M$ massimo di $f$.`, perche: String.raw`Weierstrass.` },
        { passo: String.raw`Data una decomposizione $D$, i rettangoli $[x_{i-1},x_i] \times [0, f(y_i)]$ formano un plurirettangolo **contenuto** in $R_f$, di area $s(f,D)$.`, perche: String.raw`$f(y_i)$ è il minimo di $f$ in $[x_{i-1},x_i]$.` },
        { passo: String.raw`I rettangoli $[x_{i-1},x_i] \times [0, f(z_i)]$ formano un plurirettangolo che **contiene** $R_f$, di area $S(f,D)$.`, perche: String.raw`$f(z_i)$ è il massimo.` },
        { passo: String.raw`Quindi $\underline{S} \subseteq \underline{A}$ e $\overline{S} \subseteq \overline{A}$. Poiché $\underline S$ e $\overline S$ sono contigui, per ogni $\varepsilon$ ci sono un elemento di $\underline A$ e uno di $\overline A$ a distanza minore di $\varepsilon$: anche $\underline A$ e $\overline A$ sono contigui.`, perche: String.raw`Teorema sulle somme contigue; caratterizzazione dei contigui.` },
        { passo: String.raw`L'unico elemento di separazione fra $\underline A$ e $\overline A$ separa anche $\underline S$ e $\overline S$, quindi è $\int_a^b f$.`, perche: String.raw`Unicità dell'elemento di separazione fra insiemi contigui.` }
      ],
      grafico: "g-riemann",
      cloze: "c1-cloze-011" },

    { id: "o-aree", label: "Aree di domini normali e funzioni negative", topic: "misura", kind: "osservazione",
      testo: String.raw`<ul><li>Se $g \le f$ in $[a,b]$, l'area del dominio normale $\{a \le x \le b,\ g(x) \le y \le f(x)\}$ è $\int_a^b \big(f(x) - g(x)\big)\,dx$.</li><li>Se $f \le 0$, l'area fra il grafico e l'asse $x$ è $-\int_a^b f(x)\,dx$.</li><li>Se $f$ cambia segno, l'area è $\int_a^b |f(x)|\,dx$: si spezza nei punti in cui $f$ si annulla.</li></ul>`,
      esempio: String.raw`Area fra $y = x$ e $y = x^2$ in $[0,1]$: $\int_0^1 (x - x^2)\,dx = \frac16$.` }
  ]},

  /* ======================= INTEGRALE INDEFINITO ======================= */
  { id: "s-indefinito", label: "Integrale indefinito", topic: "indefinito", children: [

    { id: "d-indefinito", label: "Integrale indefinito", topic: "indefinito", kind: "definizione",
      idea: String.raw`Tre oggetti con nomi simili: $\int_a^b f$ è un **numero**, $\int_a^x f$ è una **funzione**, $\int f$ è un **insieme** di funzioni.`,
      enunciato: { ip: String.raw`$f : (a,b) \to \mathbb{R}$.`, ts: String.raw`L'**integrale indefinito** $\int f(x)\,dx$ è l'insieme delle primitive di $f$ in $(a,b)$. Se $F$ è una primitiva, $\int f(x)\,dx = F(x) + k$, $k \in \mathbb{R}$.` },
      testo: String.raw`È vuoto (se $f$ non ha primitive) oppure ha infiniti elementi: mai uno solo.`,
      esame: String.raw`V/F della prova del 29/01/2025: "$\int f(x)\,dx$ può essere formato da un solo elemento" (falso).` },

    { id: "t-omogeneita", label: "Proprietà di omogeneità", topic: "indefinito", kind: "proprieta", dimRichiesta: true,
      idea: String.raw`Moltiplicare la funzione per $k$ moltiplica per $k$ le primitive. È un'uguaglianza fra **insiemi**, quindi si dimostra con la doppia inclusione; con $k = 0$ i due insiemi sono diversi.`,
      enunciato: { ip: String.raw`$f$ dotata di primitive in $(a,b)$, $k \in \mathbb{R}$, $k \ne 0$.`, ts: String.raw`i) $kf$ è dotata di primitive in $(a,b)$; ii) $\int kf(x)\,dx = k\int f(x)\,dx$, dove a destra c'è l'insieme dei prodotti di $k$ per le primitive di $f$.` },
      dim: [
        { passo: String.raw`**i)** Se $G$ è una primitiva di $f$, allora $(kG)' = kf$: $kG$ è una primitiva di $kf$.`, perche: String.raw`Derivata del prodotto per una costante.` },
        { passo: String.raw`**Primo $\subseteq$ secondo.** Sia $F \in \int kf$, cioè $F' = kf$. Posto $G = \frac{F}{k}$ (qui serve $k \ne 0$), si ha $G' = f$: $G$ è primitiva di $f$ e $F = kG \in k\int f$.`, perche: String.raw`Divisione per $k \ne 0$.` },
        { passo: String.raw`**Secondo $\subseteq$ primo.** Sia $F \in k\int f$: $F = kG$ con $G' = f$. Allora $F' = kf$, cioè $F \in \int kf$.`, perche: String.raw`Derivata del prodotto per una costante.` },
        { passo: String.raw`**Perché $k \ne 0$.** Con $k = 0$ il primo membro è $\int 0\,dx$, l'insieme di **tutte le costanti**; il secondo è $0\cdot\int f$, formato dalla **sola funzione nulla**.`, perche: String.raw`Caratterizzazione delle primitive della funzione nulla.` }
      ],
      esame: String.raw`**P.I. 9/12/2025, compito B**.`,
      errori: [String.raw`Dimostrare solo una inclusione.`, String.raw`Non saper spiegare perché $k = 0$ è escluso.`],
      cloze: "c1-cloze-012" },

    { id: "t-distributiva-indef", label: "Proprietà distributiva e decomposizione in somma", topic: "indefinito", kind: "proprieta",
      enunciato: { ip: String.raw`$f, g$ dotate di primitive in $(a,b)$; $h, k$ non entrambi nulli.`, ts: String.raw`$hf + kg$ è dotata di primitive e $\int (hf + kg)\,dx = h\int f\,dx + k\int g\,dx$; inoltre, se $F$ è una primitiva di $f$, $\int (hf + kg)\,dx = hF(x) + k\int g\,dx$.` },
      testo: String.raw`È il "metodo di integrazione per decomposizione in somma": si spezza l'integranda in pezzi di cui si conoscono le primitive.` },

    { id: "m-immediati", label: "Integrali immediati e forma composta", topic: "indefinito", kind: "metodo",
      testo: String.raw`Oltre alla tabella delle primitive elementari, la docente usa molto le **forme composte**, che vengono dalla prima formula di sostituzione:
      $$\int [f(x)]^\alpha f'(x)\,dx = \frac{[f(x)]^{\alpha+1}}{\alpha+1} + k\ (\alpha \ne -1), \qquad \int \frac{f'(x)}{f(x)}\,dx = \log|f(x)| + k,$$
      $$\int e^{f(x)}f'(x)\,dx = e^{f(x)} + k, \qquad \int \frac{f'(x)}{1 + f(x)^2}\,dx = \arctan f(x) + k.$$
      Se manca una costante si "aggiusta" con l'omogeneità: $\int e^{cx}\,dx = \frac1c\int ce^{cx}\,dx = \frac{e^{cx}}{c} + k$.`,
      esempio: String.raw`$\int \frac{\log x + 3}{x(\log^2x + 1)}\,dx = \frac12\log(\log^2x + 1) + 3\arctan(\log x) + k$ (appello 03/09/2026).`,
      errori: [String.raw`Scrivere $\log f(x)$ senza valore assoluto quando $f$ può essere negativa.`] }
  ]},

  /* ======================= METODI ======================= */
  { id: "s-metodi", label: "Metodi di integrazione", topic: "parti", children: [

    { id: "t-parti", label: "Integrazione per parti", topic: "parti", kind: "teorema", dimRichiesta: true,
      idea: String.raw`È la regola di derivazione del prodotto "letta al contrario": si sposta la derivata da un fattore all'altro, sperando che il nuovo integrale sia più semplice.`,
      enunciato: { ip: String.raw`$f, g$ derivabili in $(a,b)$ e $f'g$ dotata di primitive in $(a,b)$.`, ts: String.raw`i) $fg'$ è dotata di primitive; ii) $\int f(x)g'(x)\,dx = f(x)g(x) - \int f'(x)g(x)\,dx$.<br>$f$ si chiama **fattore finito** (FF), $g'$ **fattore differenziale** (FD).` },
      dim: [
        { passo: String.raw`Per la regola del prodotto $D[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)$, quindi $f(x)g'(x) = D[f(x)g(x)] - f'(x)g(x)$.`, perche: String.raw`Derivata del prodotto.` },
        { passo: String.raw`$D[fg]$ ha come primitiva $fg$; $f'g$ ha primitive per ipotesi.`, perche: String.raw`Definizione di primitiva; ipotesi.` },
        { passo: String.raw`La differenza di due funzioni dotate di primitive ha primitive: vale la i), e per decomposizione in somma $\int fg' = fg - \int f'g$.`, perche: String.raw`Proprietà **distributiva** dell'integrale indefinito.` }
      ],
      esame: String.raw`**Simulazione P.I. 2025, canale AL**.`,
      cloze: "c1-cloze-003" },

    { id: "m-parti", label: "Per parti: come scegliere FF e FD", topic: "parti", kind: "metodo",
      testo: String.raw`<ul><li>$x^n e^{bx}$, $x^n\cos bx$, $x^n\sin bx$: FF $= x^n$ (il grado **scende** a ogni passo).</li><li>$\log x$, $\arctan x$, $x^k\log x$: FF $= \log x$ (o $\arctan x$), FD $= 1$ oppure $x^k$.</li><li>**Integrali ciclici**: se dopo due passaggi ricompare l'integrale di partenza, $\int f = g + c\int f$ con $c \ne 1$, si risolve come un'equazione: $\int f = \frac{1}{1-c}g + k$. Esempio: $\int e^x\cos x\,dx = \frac{e^x(\sin x + \cos x)}{2} + k$.</li><li>$I_n = \int\frac{dx}{(1+x^2)^n}$: si scrive $\frac{1}{(1+x^2)^n} = \frac{1 + x^2 - x^2}{(1+x^2)^n}$ e si integra per parti il pezzo con $x^2$.</li></ul>`,
      esempio: String.raw`$\int x^2e^x\,dx = x^2e^x - 2\int xe^x\,dx = e^x(x^2 - 2x + 2) + k$. Con $x^4$: $e^x(x^4 - 4x^3 + 12x^2 - 24x + 24) + k$.`,
      errori: [String.raw`Scegliere FF $= e^x$ con un polinomio: il grado sale.`, String.raw`Nei calcoli ripetuti perdere un termine (alla lavagna, in $\int e^xx^4$, era sparito $12x^2$).`] },

    { id: "t-sost1", label: "Prima formula di integrazione per sostituzione", topic: "sostituzione", kind: "teorema", dimRichiesta: true,
      idea: String.raw`Se nell'integranda vedi una funzione composta $f(g(x))$ **moltiplicata per la derivata della funzione interna** $g'(x)$, sei davanti alla derivata di $F(g(x))$.`,
      enunciato: { ip: String.raw`$g : (a,b) \to (\alpha,\beta)$ derivabile, $f : (\alpha,\beta) \to \mathbb{R}$ dotata di primitive.`, ts: String.raw`i) $f(g(x))g'(x)$ è dotata di primitive in $(a,b)$; ii) $$\int f(g(x))\,g'(x)\,dx = \left[\int f(t)\,dt\right]_{t = g(x)},$$ dove a destra c'è l'insieme delle primitive di $f$ composte con $g$.` },
      dim: [
        { passo: String.raw`Sia $F$ una primitiva di $f$ e poniamo $G(x) = F(g(x))$.`, perche: String.raw`$f$ ha primitive per ipotesi.` },
        { passo: String.raw`$G'(x) = F'(g(x))\,g'(x) = f(g(x))\,g'(x)$: $G$ è una primitiva di $f(g(x))g'(x)$, e vale la i).`, perche: String.raw`Derivata della funzione **composta**.` },
        { passo: String.raw`Il primo membro è quindi $G(x) + k$; il secondo è $\big[F(t) + k\big]_{t=g(x)} = F(g(x)) + k = G(x) + k$. I due insiemi coincidono.`, perche: String.raw`Caratterizzazione delle primitive.` }
      ],
      esame: String.raw`**P.I. 9/12/2025, compito B**.`,
      errori: [String.raw`**Non ricomporre** con $g$: scrivere $e^t + k$ invece di $e^{x^2} + k$ (in rosso negli appunti).`, String.raw`Dimenticare il fattore $g'(x)$: $\int f(g(x))\,dx$ **non** è $\left[\int f(t)\,dt\right]_{t=g(x)}$.`],
      cloze: "c1-cloze-013" },

    { id: "t-sost2", label: "Seconda formula di integrazione per sostituzione", topic: "sostituzione", kind: "teorema", dimRichiesta: true,
      idea: String.raw`Si cambia variabile "dall'altra parte": si pone $x = g(t)$, si integra in $t$ e si torna indietro con l'inversa. Per tornare indietro **serve** che $g$ sia invertibile.`,
      enunciato: { ip: String.raw`$f : (a,b) \to \mathbb{R}$ dotata di primitive, $g : (c,d) \to \mathbb{R}$ derivabile, invertibile, con immagine $(a,b)$.`, ts: String.raw`$$\int f(x)\,dx = \left[\int f(g(t))\,g'(t)\,dt\right]_{t = g^{-1}(x)}.$$` },
      dim: [
        { passo: String.raw`Applichiamo la prima formula alla funzione $f(g(t))g'(t)$: $\int f(g(t))g'(t)\,dt = \left[\int f(x)\,dx\right]_{x = g(t)}$.`, perche: String.raw`Prima formula di sostituzione (ruoli di $x$ e $t$ scambiati).` },
        { passo: String.raw`Componiamo entrambi i membri con $t = g^{-1}(x)$: poiché $g(g^{-1}(x)) = x$, a destra si ritrovano le primitive di $f$ in $x$, cioè la tesi.`, perche: String.raw`$g$ invertibile.` }
      ],
      esame: String.raw`Dimostrazione da lezione (L5); negli esercizi si usa solo per $\sqrt{ax+b}$ e $\sqrt{\frac{ax+b}{cx+d}}$.`,
      errori: [String.raw`Non controllare che $g$ sia **invertibile** e che la sua immagine sia **tutto** l'intervallo in cui si integra.`],
      cloze: "c1-cloze-014" },

    { id: "m-sost-esercizi", label: "Sostituzione negli esercizi", topic: "sostituzione", kind: "metodo",
      testo: String.raw`<ul><li>**Prima formula**: si riconosce $g'(x)$ nell'integranda. Trucchi: moltiplicare e dividere per una costante; "moltiplicare e dividere per $e^x$" in $\int\frac{dx}{e^x + 1} = \int\frac{e^x}{e^x(e^x+1)}\,dx$, poi $t = e^x$.</li><li>**Razionalizzazione** con $e^x$ e $\tan x$: $t = e^x$ (oppure $t = \tan x$) trasforma l'integranda in una funzione razionale di $t$. Si usa la **prima** formula.</li><li>**Seconda formula**: solo per i radicali $\sqrt{ax+b}$ e $\sqrt{\frac{ax+b}{cx+d}}$. Si pone il radicale uguale a $t$, si ricava $x = g(t)$, si studia **dominio**, intervallo, invertibilità di $g$, e si calcola $g'(t)$.</li></ul>`,
      esempio: String.raw`$\int\frac{x+3}{\sqrt{x-1}}\,dx$: $t = \sqrt{x-1}$, $x = g(t) = t^2 + 1$ con $t > 0$ (invertibile), $g'(t) = 2t$: $\int \frac{t^2 + 4}{t}\,2t\,dt = \frac23t^3 + 8t + k$, quindi $\frac23(x-1)^{3/2} + 8\sqrt{x-1} + k$.`,
      errori: [String.raw`Per $\sqrt{\frac{x+3}{x-1}}$ il dominio è $]-\infty,-3] \cup\, ]1,+\infty[$ e $g'(t) = \frac{-8t}{(t^2-1)^2}$ (alla lavagna c'erano dominio e segno sbagliati).`] },

    { id: "m-trigonometrici", label: "Polinomi trigonometrici", topic: "trigonometrici", kind: "metodo",
      testo: String.raw`Per $\int \cos^m x\,\sin^n x\,dx$:
      <ul><li>**almeno un esponente dispari**: si isola un fattore di quella funzione e si scrive il resto con l'altra ($\cos^2 x = 1 - \sin^2 x$), poi si sostituisce ($t = \sin x$ se si è isolato $\cos x$);</li><li>**entrambi pari**: formule di bisezione $\cos^2x = \frac{1 + \cos 2x}{2}$, $\sin^2 x = \frac{1 - \cos 2x}{2}$.</li></ul>
      I prodotti $\sin\alpha x\cos\beta x$ **non** sono in programma.`,
      esempio: String.raw`$\int\cos^3x\sin^2x\,dx = \left[\int(t^2 - t^4)\,dt\right]_{t=\sin x} = \frac{\sin^3x}{3} - \frac{\sin^5x}{5} + k$.<br>$\int \sin^2 x\,dx = \frac{x}{2} - \frac{\sin 2x}{4} + k$.` },

    { id: "m-razionali", label: "Funzioni razionali fratte", topic: "razionali", kind: "metodo",
      testo: String.raw`<ol><li>Se il grado del numeratore è $\ge$ di quello del denominatore, **prima la divisione**.</li><li>Si scompone il denominatore e si scrivono i **fratti semplici**: $\frac{A}{x - \alpha}$ per ogni fattore lineare, $\frac{A_1}{x-\alpha} + \frac{A_2}{(x-\alpha)^2}$ per un fattore al quadrato, $\frac{Bx + C}{x^2 + px + q}$ per un fattore di secondo grado con $\Delta < 0$.</li><li>Per $\int\frac{ax + b}{x^2 + px + q}\,dx$ tre casi: $\Delta > 0$ (due fratti con logaritmi), $\Delta = 0$ (logaritmo e $-\frac{1}{x - \alpha}$), $\Delta < 0$ (si fa comparire la derivata del denominatore, poi **completamento dei quadrati** e $\int\frac{dx}{x^2 + \gamma^2} = \frac1\gamma\arctan\frac x\gamma + k$).</li></ol>
      Fratti con esponente maggiore di $2$ non sono in programma.`,
      esempio: String.raw`$\int\frac{dx}{x^2 + 2x + 5} = \int\frac{dx}{(x+1)^2 + 4} = \frac12\arctan\frac{x+1}{2} + k$.`,
      errori: [String.raw`Dimenticare la divisione quando la frazione non è propria.`, String.raw`Dimenticare $\frac1\gamma$ davanti all'arcotangente.`, String.raw`Segno sbagliato nel completamento dei quadrati.`],
      video: ["yt:MAMZ0GWD0is"] },

    { id: "m-valore-assoluto", label: "Primitive con valore assoluto e condizione", topic: "valore_assoluto", kind: "metodo",
      idea: String.raw`È **l'esercizio più frequente** della prova. Ogni ramo ha la sua costante; la **continuità** nei raccordi le lega fra loro; la condizione $F(x_0) = y_0$ fissa l'ultima.`,
      testo: String.raw`<ol><li>**Scrivi $f$ a tratti** studiando il segno dell'argomento del valore assoluto.</li><li>**Primitive di ogni ramo**, ognuna con la sua costante ($k_1$, $k_2$, ...).</li><li>**Continuità nei punti di raccordo**: $F$ è primitiva in tutto l'intervallo, quindi derivabile, quindi continua. Uguagliando i limiti dei rami nel punto di raccordo si esprime $k_2$ in funzione di $k_1$.</li><li>**Condizione $F(x_0) = y_0$ sul ramo che contiene $x_0$**: si trova l'ultima costante.</li><li>**Controllo**: $F(x_0)$ deve valere $y_0$, e i rami devono coincidere nel raccordo.</li></ol>
      Anche con due raccordi ($|x^2 - a^2|$), con esponenziali ($e^{|x-a| + bx}$, $|x - a|e^{bx}$, $x^2e^{|x^3|}$) e su intervalli limitati ($[0,4]$, $[-1,4]$).`,
      grafico: "g-abs",
      esempio: String.raw`Esempio di prova 2026/27: $F$ primitiva di $|x+2| + 3x$ con $F(0) = 5$. Per $x < -2$: $f = 2x - 2$, $F = x^2 - 2x + k_1$; per $x \ge -2$: $f = 4x + 2$, $F = 2x^2 + 2x + k_2$. Continuità in $-2$: $8 + k_1 = 4 + k_2$, cioè $k_2 = k_1 + 4$. $0$ sta nel secondo ramo: $k_2 = 5$, quindi $k_1 = 1$.`,
      esame: String.raw`Uscito in **tutte** le P.I. (compito A del 2025 in quattro versioni, simulazioni, esempio 2026/27) e in molti appelli.`,
      errori: [String.raw`Imporre $F(x_0) = y_0$ **prima** di aver legato le costanti, o sul ramo sbagliato.`, String.raw`Non saper spiegare **perché** si impone la continuità ($F$ derivabile $\Rightarrow$ continua).`, String.raw`Errori aritmetici nelle costanti: alla lavagna è capitato due volte ($k = \frac{13}{3}$ invece di $\frac83$; $k = -\frac{28}{3}$ invece di $-\frac{26}{3}$). Controlla sempre $F(x_0)$.`],
      video: ["yt:0uUMkKiPNSc"] },

    { id: "m-definiti", label: "Calcolo di integrali definiti", topic: "definiti", kind: "metodo",
      testo: String.raw`<ol><li>**Prima la primitiva** (con i metodi dell'integrale indefinito), **poi la formula fondamentale**. La docente lo sottolinea: sarebbe un errore applicare i metodi di integrazione indefinita portandosi dietro gli estremi.</li><li>Con il valore assoluto: si spezza con la **proprietà additiva** nei punti dove cambia la formula.</li><li>Estremi "al contrario" ($\int_2^{-4}$): si lasciano così, la formula fondamentale funziona lo stesso.</li></ol>`,
      esempio: String.raw`$\int_2^{-4}|x|(x - 2)\,dx = \left[\frac{x^3}{3} - x^2\right]_2^0 + \left[-\frac{x^3}{3} + x^2\right]_0^{-4} = \frac43 + \frac{112}{3} = \frac{116}{3}$.`,
      errori: [String.raw`Usare $|x| = x$ anche dove $x < 0$.`] }
  ]}
  ]
});

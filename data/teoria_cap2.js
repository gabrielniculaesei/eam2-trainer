/* Teoria, capitolo 2: equazioni differenziali lineari.
   Testi scritti con parole nostre seguendo i passaggi delle lezioni e delle
   dispense 2026/27. Schema: CONTRIBUTING.md. */
(window.TEORIA = window.TEORIA || []).push({
  id: "cap2", cap: 2, label: "Equazioni differenziali",
  intro: String.raw`Un'equazione differenziale chiede una **funzione** conoscendo una relazione fra lei e le sue derivate. Studiamo le **lineari**: prima quelle del primo ordine (variazione della costante), poi quelle di ordine $n$ (Wronskiano, soluzioni indipendenti), infine quelle a **coefficienti costanti** con il metodo di somiglianza, che è quello degli esercizi d'esame.`,
  children: [

  /* ======================= GENERALITÀ ======================= */
  { id: "s-generalita", label: "Generalità e problema di Cauchy", topic: "generalita", children: [

    { id: "d-eqdiff", label: "Equazione differenziale, soluzione, problema di Cauchy", topic: "generalita", kind: "definizione",
      idea: String.raw`Un'equazione "normale" ha per incognita un numero; una differenziale ha per incognita una **funzione**. Il problema di Cauchy aggiunge le "condizioni di partenza", come posizione e velocità iniziali di un corpo, e seleziona una sola soluzione.`,
      enunciato: { ip: String.raw`$F$ funzione reale definita in $A \subseteq \mathbb{R}^{n+1}$.`, ts: String.raw`L'equazione $y^{(n)} = F(x, y, y', \dots, y^{(n-1)})$ (**forma normale**, ordine $n$) è il problema di trovare funzioni $y$ derivabili $n$ volte in un intervallo, con i punti $(x, y(x), \dots, y^{(n-1)}(x))$ in $A$, che verificano l'uguaglianza per ogni $x$. Il **problema di Cauchy** aggiunge $n$ condizioni nello stesso punto: $y(x_0) = y_0$, $y'(x_0) = y_0'$, ..., $y^{(n-1)}(x_0) = y_0^{(n-1)}$.` },
      testo: String.raw`L'**integrale generale** è l'insieme di tutte le soluzioni; ogni soluzione si chiama anche **integrale particolare**. Le condizioni del problema di Cauchy sono **tante quanto l'ordine**.`,
      errori: [String.raw`Pensare che la soluzione sia un numero: è una **funzione**.`] },

    { id: "d-lineare", label: "Equazione lineare", topic: "generalita", kind: "definizione",
      idea: String.raw`"Lineare" vuol dire che $y, y', y'', \dots$ compaiono **al primo grado**, ciascuno moltiplicato per una funzione della sola $x$. Su $x$ non c'è nessuna restrizione.`,
      enunciato: { ip: String.raw`$a_1, \dots, a_n, f$ continue nell'intervallo $(\alpha,\beta)$.`, ts: String.raw`$y^{(n)} + a_1(x)y^{(n-1)} + \dots + a_{n-1}(x)y' + a_n(x)y = f(x)$ si dice **lineare** di ordine $n$; le $a_i$ sono i coefficienti, $f$ il **termine noto**. Se $f \equiv 0$ è **omogenea**; l'**omogenea associata** ha gli stessi coefficienti e termine noto nullo.` },
      esempio: String.raw`Lineari: $y'' + 3(\sin x)y' - y = \log x$; $y'' - 2x^3y' + (\tan x)y = \frac{1}{\log x}$. Non lineari: $y'' + \cos y' = 0$, $y'' - 2y' + \sqrt y = 2x$, $y''y' = y$, $y' = e^y$.`,
      esame: String.raw`**Esempio di prova 2026/27, quesito 4** (individuare le lineari fra cinque) e P.I. 24/11/2023.`,
      errori: [String.raw`Scartare un'equazione perché ha coefficienti "strani" come $\tan x$ o $\frac{1}{\log x}$: conta solo come compaiono $y$ e le sue derivate.`] }
  ]},

  /* ======================= PRIMO ORDINE ======================= */
  { id: "s-primo", label: "Lineari del primo ordine", topic: "primo_ordine", children: [

    { id: "t-osservazioni-primo", label: "Struttura delle soluzioni: osservazioni i)-v)", topic: "primo_ordine", kind: "proprieta", dimRichiesta: true,
      idea: String.raw`L'operatore $y \mapsto y' + a(x)y$ "rispetta" somme e multipli. Per questo tutte le soluzioni della completa sono **una soluzione fissata più tutte quelle dell'omogenea**, come tutte le rette parallele a una data si ottengono traslandola.`,
      enunciato: { ip: String.raw`$y' + a(x)y = f(x)$ (completa) e $y' + a(x)y = 0$ (omogenea associata), $a, f$ continue in $(\alpha,\beta)$.`, ts: String.raw`i) la funzione nulla risolve l'omogenea; ii) se $y$ risolve l'omogenea, anche $ky$; iii) se $y, z$ risolvono l'omogenea, anche $y + z$; iv) se $y$ risolve la completa e $z$ l'omogenea, $y + z$ risolve la completa; v) se $y, z$ risolvono la completa, $y - z$ risolve l'omogenea.<br>**Conseguenza**: integrale generale della completa $= \bar y\ +$ integrale generale dell'omogenea.` },
      dim: [
        { passo: String.raw`i)-iii): si sostituisce. Per esempio per iii) con $w = y + z$: $w' + aw = (y' + ay) + (z' + az) = 0 + 0 = 0$.`, perche: String.raw`Linearità della derivata.` },
        { passo: String.raw`iv) Con $w = y + z$: $w' + aw = (y' + ay) + (z' + az) = f + 0 = f$.`, perche: String.raw`$y$ completa, $z$ omogenea.` },
        { passo: String.raw`v) Con $w = y - z$: $w' + aw = (y' + ay) - (z' + az) = f - f = 0$.`, perche: String.raw`$y$, $z$ entrambe soluzioni della completa.` },
        { passo: String.raw`Conseguenza: fissata una soluzione $\bar y$, per iv) ogni $\bar y + z$ ($z$ omogenea) è soluzione; per v) ogni soluzione $y$ si scrive $\bar y + (y - \bar y)$ con $y - \bar y$ omogenea.`, perche: String.raw`iv) e v).` }
      ],
      esame: String.raw`**Simulazioni P.I. 2025 (AL e MZ)** e **esempio 2026/27, quesito 6** (anche per l'ordine $n$).`,
      errori: [String.raw`Dire che la somma di due soluzioni della **completa** risolve la completa: risolve l'equazione con termine noto $2f$.`],
      cloze: "c2-cloze-002" },

    { id: "t-omog-primo", label: "Integrale generale dell'omogenea del primo ordine", topic: "primo_ordine", kind: "teorema", dimRichiesta: true,
      idea: String.raw`$y' = -a(x)y$ dice che la velocità di crescita è proporzionale al valore stesso: soluzioni esponenziali. E una soluzione non può "toccare zero" senza essere nulla dappertutto.`,
      enunciato: { ip: String.raw`$a$ continua in $(\alpha,\beta)$, $A$ una primitiva di $a$.`, ts: String.raw`Le soluzioni di $y' + a(x)y = 0$ sono tutte e sole le funzioni $y(x) = ke^{-A(x)}$, $k \in \mathbb{R}$.` },
      dim: [
        { passo: String.raw`La funzione nulla è soluzione. Sia $y$ una soluzione che **non si annulla mai**: essendo continua, ha segno costante.`, perche: String.raw`Teorema degli zeri (una funzione continua che cambia segno si annulla).` },
        { passo: String.raw`Dividendo per $y$: $\frac{y'(x)}{y(x)} = -a(x)$. Il primo membro è la derivata di $\log|y(x)|$.`, perche: String.raw`Derivata di $\log|g|$ è $\frac{g'}{g}$.` },
        { passo: String.raw`$\log|y|$ e $-A$ hanno la stessa derivata nell'intervallo, quindi $\log|y(x)| = -A(x) + c$, cioè $|y(x)| = e^ce^{-A(x)}$ e $y(x) = ke^{-A(x)}$ con $k \ne 0$.`, perche: String.raw`Caratterizzazione delle primitive; $y$ ha segno costante.` },
        { passo: String.raw`Con $k = 0$ si ritrova la soluzione nulla. Non ci sono soluzioni che si annullano solo in qualche punto: una funzione $ke^{-A(x)}$ con $k \ne 0$ non tende mai a $0$ per $x$ che tende a un punto dell'intervallo.`, perche: String.raw`Continuità: una soluzione nulla in un punto e non nulla altrove sarebbe, vicino a quel punto, del tipo $ke^{-A}$ con limite $\ne 0$.` }
      ],
      grafico: "g-campo",
      esempio: String.raw`$y' + (\sin x)y = 0$: $A(x) = -\cos x$, integrale generale $y = ke^{\cos x}$.`,
      errori: [String.raw`Segno di $A$: le soluzioni sono $ke^{-A}$, non $ke^{A}$.`],
      cloze: "c2-cloze-004" },

    { id: "t-variazione", label: "Variazione della costante (metodo di Lagrange)", topic: "primo_ordine", kind: "metodo", dimRichiesta: true,
      idea: String.raw`Le soluzioni dell'omogenea sono $ke^{-A}$. Per la completa proviamo a "lasciar variare" la costante: $k(x)e^{-A(x)}$. Sostituendo, i termini con $k(x)$ si cancellano e resta un'equazione semplicissima per $k'$.`,
      enunciato: { ip: String.raw`$y' + a(x)y = f(x)$ con $a, f$ continue in $(\alpha,\beta)$, $A$ primitiva di $a$.`, ts: String.raw`Un integrale particolare è $\bar y(x) = k(x)e^{-A(x)}$ con $k$ primitiva di $f(x)e^{A(x)}$. L'integrale generale è $y(x) = ke^{-A(x)} + k(x)e^{-A(x)}$, $k \in \mathbb{R}$.` },
      dim: [
        { passo: String.raw`Cerchiamo una soluzione $\bar y(x) = k(x)e^{-A(x)}$ con $k$ derivabile.`, perche: String.raw`Stessa forma dell'integrale dell'omogenea.` },
        { passo: String.raw`$\bar y' = k'e^{-A} - A'ke^{-A} = k'e^{-A} - a\,ke^{-A}$. Sostituendo: $k'e^{-A} - a\,ke^{-A} + a\,ke^{-A} = f$.`, perche: String.raw`Derivata del prodotto e della composta; $A' = a$.` },
        { passo: String.raw`I termini con $k$ si cancellano: $k'(x) = f(x)e^{A(x)}$, quindi $k$ è una primitiva di $fe^{A}$ (esiste perché $fe^A$ è continua).`, perche: String.raw`Teorema fondamentale del calcolo integrale.` },
        { passo: String.raw`Per le osservazioni iv)-v), l'integrale generale è $\bar y$ più l'integrale generale dell'omogenea: $y = ke^{-A} + k(x)e^{-A}$.`, perche: String.raw`Struttura delle soluzioni.` }
      ],
      esempio: String.raw`$y' + \frac yx = \log(x^2+4)$ in $]0,+\infty[$: $A = \log x$, $e^{A} = x$, $k'(x) = x\log(x^2+4)$, $k(x) = \frac{(x^2+4)(\log(x^2+4) - 1)}{2}$; integrale generale $y = \frac kx + \frac{(x^2+4)(\log(x^2+4) - 1)}{2x}$.`,
      esame: String.raw`Problemi di Cauchy del primo ordine negli appelli (recupero 19/02/2025).`,
      errori: [String.raw`Scrivere $k' = fe^{-A}$ (segno sbagliato).`, String.raw`Dimenticare l'intervallo: con $a(x) = \frac1x$ si lavora in $]0,+\infty[$ (o in $]-\infty,0[$).`],
      video: ["yt:0lvvGwISfSo"],
      cloze: "c2-cloze-005" },

    { id: "m-primo-ordine", label: "Schema per gli esercizi del primo ordine", topic: "primo_ordine", kind: "metodo",
      testo: String.raw`<ol><li>Scrivi l'equazione nella forma $y' + a(x)y = f(x)$ e fissa l'**intervallo** in cui $a$ e $f$ sono continue.</li><li>**Omogenea associata**: $A$ primitiva di $a$, soluzioni $ke^{-A(x)}$.</li><li>**Integrale particolare**: $\bar y = k(x)e^{-A(x)}$ con $k' = f e^{A}$.</li><li>**Integrale generale**: $y = ke^{-A} + \bar y$.</li><li>**Condizione** $y(x_0) = y_0$: si ricava $k$.</li></ol>` },

    { id: "o-malthus", label: "Modello di Malthus", topic: "malthus", kind: "esempio",
      idea: String.raw`Una popolazione che cresce in proporzione a quanti individui ci sono già: più siamo, più nasciamo.`,
      enunciato: { ip: String.raw`$N(t)$ numero di individui, $\varepsilon$ potenziale biologico (natalità meno mortalità).`, ts: String.raw`$N'(t) = \varepsilon N(t)$, $N(0) = N_0$ ha soluzione $N(t) = N_0e^{\varepsilon t}$.` },
      testo: String.raw`È un'omogenea del primo ordine con $a(t) = -\varepsilon$. Se $\varepsilon > 0$ la popolazione cresce esponenzialmente, se $\varepsilon < 0$ si estingue, se $\varepsilon = 0$ resta costante.`,
      grafico: "g-malthus" }
  ]},

  /* ======================= ORDINE N ======================= */
  { id: "s-ordine-n", label: "Lineari di ordine n: struttura", topic: "struttura", children: [

    { id: "t-esistenza-unicita", label: "Esistenza e unicità per il problema di Cauchy", topic: "struttura", kind: "teorema",
      enunciato: { ip: String.raw`$a_1, \dots, a_n, f$ continue in $(\alpha,\beta)$, $x_0 \in (\alpha,\beta)$, $y_0, \dots, y_0^{(n-1)} \in \mathbb{R}$.`, ts: String.raw`Il problema di Cauchy per l'equazione lineare di ordine $n$ ha **una e una sola** soluzione, definita in tutto $(\alpha,\beta)$.` },
      testo: String.raw`Non si dimostra, ma si usa due volte nelle dimostrazioni dei teoremi sulle soluzioni indipendenti: per l'**esistenza** (Teor. 1) e per l'**unicità** (Teor. 2).` },

    { id: "o-proprieta-n", label: "Proprietà delle soluzioni e sovrapposizione", topic: "struttura", kind: "proprieta",
      testo: String.raw`Come al primo ordine (stessa verifica per sostituzione):
      <ul><li>completa $+$ omogenea $=$ completa; completa $-$ completa $=$ omogenea;</li><li>ogni combinazione lineare $hy + kz$ di soluzioni dell'omogenea è soluzione dell'omogenea: le soluzioni formano uno **spazio vettoriale**;</li><li>**principio di sovrapposizione**: se $y$ risolve l'equazione con termine noto $f$ e $z$ quella con termine noto $g$, allora $c_1y + c_2z$ risolve quella con termine noto $c_1f + c_2g$;</li><li>**termine noto complesso** $f = u + iv$: $y = w + iz$ è soluzione se e solo se $w$ risolve l'equazione con termine noto $u$ e $z$ quella con termine noto $v$.</li></ul>`,
      esame: String.raw`**Esempio 2026/27, quesito 6**: se $y_1$ risolve $y'' + ay' + by = f$ e $y_2$ risolve $y'' + ay' + by = g$, $y_1 - y_2$ risolve l'equazione con termine noto $f - g$.` },

    { id: "t-wronskiano", label: "Wronskiano: identicamente nullo o mai nullo", topic: "wronskiano", kind: "teorema", dimRichiesta: true,
      idea: String.raw`Il Wronskiano misura se due soluzioni "puntano in direzioni diverse" (come due vettori non paralleli). Il teorema dice che questa proprietà **non cambia lungo l'intervallo**: o vale ovunque o da nessuna parte, perché $W$ stesso risolve un'equazione del primo ordine, e le soluzioni $ke^{-A}$ o sono nulle o non si annullano mai.`,
      enunciato: { ip: String.raw`$y_1, y_2$ soluzioni dell'omogenea $y'' + a_1(x)y' + a_2(x)y = 0$, con $a_1, a_2$ continue in $(\alpha,\beta)$; $W(x) = \begin{vmatrix} y_1 & y_2 \\ y_1' & y_2' \end{vmatrix} = y_1y_2' - y_2y_1'$.`, ts: String.raw`Vale una e una sola delle due: a) $W(x) = 0$ per ogni $x \in (\alpha,\beta)$; b) $W(x) \ne 0$ per ogni $x \in (\alpha,\beta)$.` },
      dim: [
        { passo: String.raw`Deriviamo $W = y_1y_2' - y_2y_1'$: $W' = y_1'y_2' + y_1y_2'' - y_2'y_1' - y_2y_1'' = y_1y_2'' - y_2y_1''$.`, perche: String.raw`Derivata del prodotto; i termini $y_1'y_2'$ si cancellano.` },
        { passo: String.raw`Poiché $y_1, y_2$ sono soluzioni, $y_i'' = -a_1(x)y_i' - a_2(x)y_i$ per $i = 1, 2$.`, perche: String.raw`Si ricava $y''$ dall'equazione.` },
        { passo: String.raw`Sostituendo: $W' = y_1(-a_1y_2' - a_2y_2) - y_2(-a_1y_1' - a_2y_1) = -a_1(y_1y_2' - y_2y_1') = -a_1(x)W(x)$.`, perche: String.raw`I termini con $a_2$ si cancellano.` },
        { passo: String.raw`Quindi $W$ risolve l'equazione del primo ordine omogenea $y' + a_1(x)y = 0$, perciò $W(x) = ke^{-A_1(x)}$ con $A_1$ primitiva di $a_1$.`, perche: String.raw`Integrale generale dell'omogenea del primo ordine.` },
        { passo: String.raw`Se $k = 0$, $W$ è identicamente nullo; se $k \ne 0$, $W$ non si annulla mai, perché l'esponenziale è sempre positivo.`, perche: String.raw`$e^{-A_1(x)} > 0$.` }
      ],
      grafico: "g-wronsk",
      esempio: String.raw`$y'' - y = 0$ con $y_1 = e^x$, $y_2 = e^{-x}$: $W = e^x(-e^{-x}) - e^{-x}e^x = -2$, mai nullo. Con $y_1 = e^x$, $y_2 = 2e^x$: $W \equiv 0$.`,
      esame: String.raw`**P.I. 9/12/2025, compito A** (anche come completamento). In generale per ordine $n$ si dimostra lo stesso con $W' = -a_1W$; a lezione basta il caso $n = 2$.`,
      errori: [String.raw`Concludere "$W(x_0) = 0$ in un punto, quindi le soluzioni sono indipendenti altrove": se si annulla in un punto è **identicamente nullo**.`, String.raw`Applicarlo a funzioni qualsiasi: serve che siano **soluzioni della stessa omogenea** (per $x$ e $x^2$ in $\mathbb{R}$ il Wronskiano $x^2$ si annulla solo in $0$).`],
      cloze: "c2-cloze-001" },

    { id: "d-indipendenti", label: "Soluzioni indipendenti", topic: "wronskiano", kind: "definizione",
      enunciato: { ip: String.raw`$y_1, \dots, y_n$ soluzioni dell'omogenea di ordine $n$.`, ts: String.raw`Si dicono **indipendenti** se il loro Wronskiano (determinante delle funzioni e delle derivate fino all'ordine $n-1$) è diverso da zero in ogni punto. Si prova che indipendenti equivale a **linearmente indipendenti**.` } },

    { id: "t-teor1", label: "Teor. 1: esistono n soluzioni indipendenti", topic: "wronskiano", kind: "teorema", dimRichiesta: true,
      idea: String.raw`Costruiamo le soluzioni "su misura" scegliendo i dati iniziali come i vettori della base canonica: in $x_0$ il Wronskiano è il determinante della matrice identità.`,
      enunciato: { ip: String.raw`Equazione lineare omogenea di ordine $n$ con coefficienti continui in $(\alpha,\beta)$.`, ts: String.raw`Esistono $n$ soluzioni indipendenti.` },
      dim: [
        { passo: String.raw`Fissiamo $x_0 \in (\alpha,\beta)$. Per $i = 0, \dots, n-1$ consideriamo il problema di Cauchy $(P_i)$: l'equazione omogenea con $y^{(i)}(x_0) = 1$ e $y^{(j)}(x_0) = 0$ per $j \ne i$.`, perche: String.raw`Scelta dei dati iniziali.` },
        { passo: String.raw`Ogni $(P_i)$ ha una e una sola soluzione $y_{i+1}$ definita in $(\alpha,\beta)$.`, perche: String.raw`Teorema di **esistenza** e unicità.` },
        { passo: String.raw`Il Wronskiano delle $n$ soluzioni in $x_0$ è il determinante della matrice identità: $W(x_0) = 1 \ne 0$.`, perche: String.raw`La colonna $i$ contiene i dati iniziali di $(P_i)$.` },
        { passo: String.raw`Il Wronskiano non è identicamente nullo, quindi non si annulla mai: le soluzioni sono indipendenti.`, perche: String.raw`Teorema sul Wronskiano (o nullo ovunque o mai nullo).` }
      ],
      esame: String.raw`**P.I. 9/12/2025, compito A**; appelli 30/01/2024 e 29/01/2025. Nel caso $n = 2$: $y_1$ con $y(x_0) = 1$, $y'(x_0) = 0$ e $y_2$ con $y(x_0) = 0$, $y'(x_0) = 1$.`,
      errori: [String.raw`Concludere da $W(x_0) \ne 0$ senza citare il teorema del Wronskiano.`],
      cloze: "c2-cloze-006" },

    { id: "t-teor2", label: "Teor. 2: ogni soluzione è combinazione lineare di n indipendenti", topic: "wronskiano", kind: "teorema", dimRichiesta: true,
      idea: String.raw`Data una soluzione qualunque, cerchiamo una combinazione delle $y_i$ con gli **stessi dati iniziali**: il sistema per le costanti ha determinante $W(x_0) \ne 0$, quindi si risolve. Poi l'unicità del problema di Cauchy dice che le due funzioni coincidono.`,
      enunciato: { ip: String.raw`$y_1, \dots, y_n$ soluzioni indipendenti dell'omogenea di ordine $n$.`, ts: String.raw`Tutte e sole le soluzioni dell'omogenea sono le funzioni $\sum_{i=1}^n k_iy_i(x)$, $k_i \in \mathbb{R}$.` },
      dim: [
        { passo: String.raw`Ogni combinazione lineare di soluzioni è soluzione.`, perche: String.raw`Proprietà delle soluzioni dell'omogenea.` },
        { passo: String.raw`Viceversa, sia $z$ una soluzione. Fissato $x_0$, $z$ risolve il problema di Cauchy con dati $z(x_0), z'(x_0), \dots, z^{(n-1)}(x_0)$.`, perche: String.raw`Ovvio: è una soluzione con quei dati.` },
        { passo: String.raw`Cerchiamo $w = \sum k_iy_i$ con gli stessi dati: $\sum_i k_iy_i^{(j)}(x_0) = z^{(j)}(x_0)$ per $j = 0, \dots, n-1$. È un sistema lineare $n \times n$ nelle $k_i$ con determinante $W(x_0) \ne 0$, quindi ha una e una sola soluzione.`, perche: String.raw`Soluzioni indipendenti; **regola di Cramer**.` },
        { passo: String.raw`$w$ e $z$ risolvono lo stesso problema di Cauchy, quindi $z = w = \sum k_iy_i$.`, perche: String.raw`**Unicità** del problema di Cauchy.` }
      ],
      esame: String.raw`**P.I. 9/12/2025, compito A**; appello 30/01/2024.`,
      errori: [String.raw`Dimenticare l'ultimo passo: senza l'**unicità** non si conclude che $z = w$.`],
      cloze: "c2-cloze-007" },

    { id: "o-dimensione", label: "Dimensione dello spazio e integrale generale della completa", topic: "struttura", kind: "osservazione",
      testo: String.raw`Dal Teor. 2: lo spazio delle soluzioni dell'omogenea di ordine $n$ ha **dimensione $n$**. Per la completa: se $\bar y$ è un integrale particolare e $y_1, \dots, y_n$ sono indipendenti, l'integrale generale è $y = \bar y + \sum k_iy_i$.`,
      esame: String.raw`V/F: "le soluzioni della completa formano uno spazio vettoriale" (falso: la funzione nulla non è soluzione se $f \not\equiv 0$).` }
  ]},

  /* ======================= COEFFICIENTI COSTANTI ======================= */
  { id: "s-coeff-costanti", label: "Coefficienti costanti", topic: "coeff_costanti", children: [

    { id: "t-caratteristica", label: "Equazione caratteristica", topic: "coeff_costanti", kind: "teorema", dimRichiesta: true,
      idea: String.raw`L'esponenziale è la funzione che, derivata, "resta se stessa per un fattore". Sostituendo $e^{\alpha x}$ l'equazione differenziale diventa un'equazione **algebrica** in $\alpha$.`,
      enunciato: { ip: String.raw`$y^{(n)} + a_1y^{(n-1)} + \dots + a_ny = 0$ con $a_i \in \mathbb{R}$, $\alpha \in \mathbb{C}$.`, ts: String.raw`$e^{\alpha x}$ è soluzione se e solo se $\alpha$ risolve l'**equazione caratteristica** $\alpha^n + a_1\alpha^{n-1} + \dots + a_n = 0$.` },
      dim: [
        { passo: String.raw`Le derivate di $y = e^{\alpha x}$ sono $y^{(k)} = \alpha^ke^{\alpha x}$.`, perche: String.raw`Derivata dell'esponenziale (anche con $\alpha$ complesso).` },
        { passo: String.raw`Sostituendo e raccogliendo: $e^{\alpha x}(\alpha^n + a_1\alpha^{n-1} + \dots + a_n) = 0$ per ogni $x$.`, perche: String.raw`Raccoglimento.` },
        { passo: String.raw`$e^{\alpha x}$ non si annulla mai, quindi l'uguaglianza vale se e solo se $\alpha^n + a_1\alpha^{n-1} + \dots + a_n = 0$.`, perche: String.raw`Legge di annullamento del prodotto.` }
      ],
      testo: String.raw`**Regola generale.** Una radice reale $\alpha$ di molteplicità $r$ dà $e^{\alpha x}, xe^{\alpha x}, \dots, x^{r-1}e^{\alpha x}$; una coppia $\beta \pm i\gamma$ di molteplicità $s$ dà $x^je^{\beta x}\cos\gamma x$ e $x^je^{\beta x}\sin\gamma x$ per $j = 0, \dots, s-1$. In tutto $n$ soluzioni indipendenti.`,
      cloze: "c2-cloze-008" },

    { id: "t-tre-casi", label: "Ordine 2: soluzioni indipendenti nei tre casi", topic: "coeff_costanti", kind: "teorema", dimRichiesta: true,
      idea: String.raw`Il segno del discriminante decide la "forma" delle soluzioni: due esponenziali, un esponenziale "rinforzato" da $x$, oppure oscillazioni smorzate o amplificate. In ogni caso il Wronskiano è un esponenziale per una costante non nulla.`,
      enunciato: { ip: String.raw`$y'' + ay' + by = 0$, $a, b \in \mathbb{R}$, equazione caratteristica $\alpha^2 + a\alpha + b = 0$, $\Delta = a^2 - 4b$.`, ts: String.raw`$\Delta > 0$, radici $\alpha_1 \ne \alpha_2$: $e^{\alpha_1x}, e^{\alpha_2x}$.<br>$\Delta = 0$, radice doppia $\alpha$: $e^{\alpha x}, xe^{\alpha x}$.<br>$\Delta < 0$, radici $\beta \pm i\gamma$: $e^{\beta x}\cos\gamma x,\ e^{\beta x}\sin\gamma x$.<br>In ogni caso le due soluzioni sono indipendenti.` },
      dim: [
        { passo: String.raw`$\Delta > 0$: sono soluzioni per il teorema dell'equazione caratteristica; $W = e^{\alpha_1x}\alpha_2e^{\alpha_2x} - e^{\alpha_2x}\alpha_1e^{\alpha_1x} = e^{(\alpha_1+\alpha_2)x}(\alpha_2 - \alpha_1) \ne 0$.`, perche: String.raw`$\alpha_1 \ne \alpha_2$ ed esponenziale positivo.` },
        { passo: String.raw`$\Delta = 0$: $\alpha = -\frac a2$. Per $y = xe^{\alpha x}$: $y'' + ay' + by = e^{\alpha x}\big[x(\alpha^2 + a\alpha + b) + (2\alpha + a)\big] = 0$.`, perche: String.raw`$\alpha$ è radice e $2\alpha + a = 0$.` },
        { passo: String.raw`$W = e^{\alpha x}(e^{\alpha x} + \alpha xe^{\alpha x}) - xe^{\alpha x}\alpha e^{\alpha x} = e^{2\alpha x} \ne 0$.`, perche: String.raw`Calcolo diretto.` },
        { passo: String.raw`$\Delta < 0$: $e^{(\beta + i\gamma)x} = e^{\beta x}(\cos\gamma x + i\sin\gamma x)$ è una soluzione complessa dell'omogenea, quindi parte reale e parte immaginaria sono soluzioni.`, perche: String.raw`Formula di Eulero; proprietà del termine noto complesso (qui nullo).` },
        { passo: String.raw`$W = \gamma e^{2\beta x} \ne 0$ perché $\gamma \ne 0$.`, perche: String.raw`Calcolo diretto, usando $\cos^2 + \sin^2 = 1$.` }
      ],
      grafico: "g-caratt",
      esame: String.raw`**P.I. 9/12/2025, compito A** (caso $\Delta > 0$). Anche come completamento.`,
      errori: [String.raw`Per $\Delta < 0$ scrivere $\cos x + i\sin x$ come soluzioni (alla lavagna è capitato): le soluzioni reali sono $e^{\beta x}\cos\gamma x$ ed $e^{\beta x}\sin\gamma x$, e l'integrale generale è $k_1e^{\beta x}\cos\gamma x + k_2e^{\beta x}\sin\gamma x$.`],
      video: ["yt:GyMpzshZJkE"],
      cloze: "c2-cloze-003" },

    { id: "m-omogenee", label: "Omogenee a coefficienti costanti negli esercizi", topic: "coeff_costanti", kind: "metodo",
      testo: String.raw`<ol><li>Scrivi l'**equazione caratteristica** sostituendo $y^{(k)} \to \alpha^k$.</li><li>Trova le radici con la loro molteplicità (per ordine $3$ o $4$: raccoglimento, Ruffini).</li><li>Scrivi $n$ soluzioni con la regola generale e l'integrale generale $\sum k_iy_i$.</li></ol>`,
      esempio: String.raw`$y''' - 4y'' + 4y' = 0$: $\alpha(\alpha - 2)^2 = 0$, radici $0$ e $2$ (doppia): $y = k_1 + k_2e^{2x} + k_3xe^{2x}$.<br>$y'' + y' + 2y = 0$: $\alpha = -\frac12 \pm i\frac{\sqrt7}{2}$: $y = e^{-x/2}\left(k_1\cos\frac{\sqrt7}{2}x + k_2\sin\frac{\sqrt7}{2}x\right)$.`,
      errori: [String.raw`Dimenticare la radice $\alpha = 0$ quando manca il termine in $y$: dà la soluzione costante.`, String.raw`Nel PC $y'' - y' = 3x+1$ l'omogenea è $k_1 + k_2e^x$, non $k_1 + k_2x$ (errore alla lavagna).`] }
  ]},

  /* ======================= SOMIGLIANZA ======================= */
  { id: "s-somiglianza", label: "Equazioni complete: metodo di somiglianza", topic: "somiglianza", children: [

    { id: "m-somiglianza", label: "Metodo di somiglianza", topic: "somiglianza", kind: "metodo",
      idea: String.raw`Se il termine noto è "esponenziale per polinomio", cerchiamo una soluzione **dello stesso tipo**. L'unica sorpresa: se l'esponenziale è già soluzione dell'omogenea, serve un fattore $x^s$ in più (risonanza).`,
      testo: String.raw`Termine noto $f(x) = e^{hx}p(x)$ con $p$ polinomio di grado $m$.
      <ol><li>Individua $h$ (attento: $\frac{x+1}{e^x} = e^{-x}(x+1)$, quindi $h = -1$; un polinomio da solo ha $h = 0$).</li><li>$s$ = molteplicità di $h$ come radice dell'equazione caratteristica ($s = 0$ se non è radice).</li><li>Cerca $\bar y = e^{hx}x^sq(x)$ con $q$ polinomio **completo** di grado $m$ a coefficienti incogniti.</li><li>Deriva, sostituisci, **semplifica l'esponenziale**, e usa il **principio di identità dei polinomi**.</li></ol>`,
      grafico: "g-somiglianza",
      esempio: String.raw`$y'' - 2y' - 3y = xe^{3x}$: radici $3$ e $-1$; $h = 3$ radice semplice, $s = 1$, $m = 1$: $\bar y = e^{3x}(ax^2 + bx)$. Sostituendo si trova $a = \frac18$, $b = -\frac1{16}$.`,
      esame: String.raw`**Esempio 2026/27, quesito 5** (forma della soluzione); i problemi di Cauchy del **compito B 2025** hanno quasi sempre risonanza ($s = 1$ o $s = 2$).`,
      errori: [String.raw`Non controllare se $h$ è radice (quindi $s$ sbagliato).`, String.raw`Scrivere $q$ incompleto ($ax$ invece di $ax + b$).`, String.raw`Errori di calcolo nei coefficienti: alla lavagna $y'' - 8y' = x^2e^{2x}$ dava $c = -\frac5{72}$ invece di $-\frac{7}{216}$, e $y'' + 5y' + 4y = xe^{-x}$ dava segni sbagliati ($a = \frac16$, $b = -\frac19$).`],
      video: ["yt:SJmQRlVOMRk"] },

    { id: "m-seno-coseno", label: "Termine noto con seno e coseno", topic: "seno_coseno", kind: "metodo",
      idea: String.raw`$\cos bx$ e $\sin bx$ sono parte reale e immaginaria di $e^{ibx}$: si risolve **una sola** equazione con un esponenziale complesso e poi si prende la parte giusta.`,
      testo: String.raw`<ol><li>Scrivi $p(x)\cos bx = \mathrm{Re}\big(p(x)e^{ibx}\big)$ e $p(x)\sin bx = \mathrm{Im}\big(p(x)e^{ibx}\big)$.</li><li>Risolvi con la somiglianza l'equazione con termine noto $p(x)e^{ibx}$: $h = ib$ (controlla se è radice!).</li><li>Prendi la **parte reale** (per il coseno) o la **parte immaginaria** (per il seno) della soluzione trovata.</li></ol>
      La docente usa **sempre** questa strada, non la forma $A\cos bx + B\sin bx$. Servono i numeri complessi: vedi il nodo di ripasso.`,
      esempio: String.raw`$y'' + y = (x+4)e^{2ix}$ (parte immaginaria di $y'' + y = (x+4)\sin 2x$): $h = 2i$ non è radice, $\bar y = (ax + b)e^{2ix}$, si trova $a = -\frac13$, $b = -\frac43 - \frac49i$; la parte immaginaria è $-\frac13x\sin 2x - \frac43\sin 2x - \frac49\cos 2x$.`,
      errori: [String.raw`Prendere la parte reale quando il termine noto ha il seno (o viceversa).`, String.raw`Con $y'' + y = \cos x$, $h = i$ **è** radice: $s = 1$.`] },

    { id: "m-sovrapposizione", label: "Sovrapposizione: termini noti sommati", topic: "somiglianza", kind: "metodo",
      testo: String.raw`Se $f = f_1 + f_2$ (per esempio $\frac{x}{e^{2x}} + 2xe^x$), si trova un integrale particolare $\bar y_1$ con termine noto $f_1$ e uno $\bar y_2$ con $f_2$; allora $\bar y = \bar y_1 + \bar y_2$. Ogni pezzo ha il suo $h$ e il suo $s$.`,
      esempio: String.raw`P.I. 24/11/2023: $y'' - y' - 6y = \frac{x}{e^{2x}} + 2xe^x$. Per il primo pezzo $h = -2$ è radice ($s = 1$), per il secondo $h = 1$ non lo è ($s = 0$).` },

    { id: "m-cauchy", label: "Problemi di Cauchy", topic: "cauchy", kind: "metodo",
      testo: String.raw`<ol><li>Integrale generale dell'**omogenea associata**.</li><li>**Integrale particolare** con la somiglianza (ed eventualmente la sovrapposizione).</li><li>Integrale generale della **completa**: $y = \bar y + k_1y_1 + k_2y_2$.</li><li>Calcola $y'$ e imponi le condizioni **all'integrale generale della completa**: sistema nelle $k_i$.</li><li>Controlla $y(x_0)$ e $y'(x_0)$.</li></ol>Le condizioni possono essere in $x_0 \ne 0$ (per esempio $y(1) = 2e^3$): conviene allora scrivere le costanti in modo comodo.`,
      esempio: String.raw`$y'' - 9y = \frac{2}{e^{3x}}$, $y(0) = 1$, $y'(0) = \frac23$: omogenea $k_1e^{3x} + k_2e^{-3x}$; $h = -3$ radice semplice, $\bar y = axe^{-3x}$ con $a = -\frac13$; condizioni: $k_1 + k_2 = 1$, $3k_1 - 3k_2 - \frac13 = \frac23$, quindi $k_1 = \frac23$, $k_2 = \frac13$.`,
      esame: String.raw`**Compito B della P.I. 2025** (quattro versioni), simulazioni, molti appelli.`,
      errori: [String.raw`Imporre le condizioni all'**omogenea** invece che all'integrale generale della completa.`] },

    { id: "m-pc-integrale", label: "Problema di Cauchy e integrale della soluzione", topic: "cauchy", kind: "metodo",
      testo: String.raw`Esercizio che collega i due capitoli: si risolve il problema di Cauchy e poi si calcola un integrale definito della soluzione (prima la primitiva, poi la formula fondamentale).`,
      esempio: String.raw`$g$ soluzione di $y'' - y = (x+2)e^x$, $y(0) = 0$, $y'(0) = \frac74$: $g(x) = e^x\left(\frac{x^2}{4} + \frac{3x}{4} + \frac12\right) - \frac12e^{-x}$ e $\int_0^1 g(x)\,dx = \frac34e + \frac1{2e} - \frac34$.` }
  ]},

  /* ======================= SEPARABILI ======================= */
  { id: "s-separabili", label: "Variabili separabili (da confermare)", topic: "separabili", daVerificare: true, children: [

    { id: "d-separabili", label: "Equazioni a variabili separabili", topic: "separabili", kind: "definizione", daVerificare: true,
      idea: String.raw`Quando la derivata è "un pezzo che dipende solo da $x$ per un pezzo che dipende solo da $y$", si possono separare le variabili e integrare ciascun membro per conto suo.`,
      enunciato: { ip: String.raw`$a$ continua in un intervallo $I$, $b$ continua in un intervallo $J$.`, ts: String.raw`$y' = a(x)\,b(y)$ si dice a **variabili separabili**. Gli zeri di $b$ danno soluzioni costanti; dove $b(y) \ne 0$ si scrive $\frac{y'}{b(y)} = a(x)$ e si integra.` },
      testo: String.raw`Le dispense 2026/27 trattano solo le equazioni **lineari**. La P.I. del 2023 chiedeva di **riconoscerle** in un elenco, e compaiono nell'appello del 09/09/2024: verifica a lezione se fanno parte del programma di quest'anno.`,
      esempio: String.raw`$y' = xy^2$ è separabile ($a(x) = x$, $b(y) = y^2$); $y' = x + y$ non lo è (ma è lineare).` }
  ]}
  ]
});

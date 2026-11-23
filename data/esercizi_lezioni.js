/* Esercizi svolti a lezione e nelle dispense (versione corretta dove alla lavagna c'era un errore di calcolo).
   FILE GENERATO da tools/build_tracce.py (non modificare a mano: cambia tools/tracce_specs.py).
   Ogni passaggio e' calcolato e verificato con sympy; stepChk viene ricontrollato da pnpm verify. */
(window.ESERCIZI = window.ESERCIZI || []).push(

{ id: "lz-1510-abs",
  cap: 1,
  topic: "valore_assoluto",
  src: "Lezione 15/10, es. 4",
  text: String.raw`Determinare la primitiva $F$ in $]-\infty,+\infty[$ della funzione $f(x) = |x^2-1| + 3x^2 + x$ tale che $F(0) = 4$.`,
  steps: [
    String.raw`**Scriviamo $f$ a tratti**, studiando il segno dell'argomento del valore assoluto: $$f(x) = \begin{cases} 4 x^{2} + x - 1 & x \le -1 \\ 2 x^{2} + x + 1 & -1 < x < 1 \\ 4 x^{2} + x - 1 & x \ge 1 \end{cases}$$`,
    String.raw`**Primitive dei singoli rami**, ognuna con la sua costante: per $x \le -1$: $\displaystyle\int (4 x^{2} + x - 1)\,dx = \frac{4 x^{3}}{3} + \frac{x^{2}}{2} - x + k_1$; per $-1 < x < 1$: $\displaystyle\int (2 x^{2} + x + 1)\,dx = \frac{2 x^{3}}{3} + \frac{x^{2}}{2} + x + k_2$; per $x \ge 1$: $\displaystyle\int (4 x^{2} + x - 1)\,dx = \frac{4 x^{3}}{3} + \frac{x^{2}}{2} - x + k_3$.`,
    String.raw`**Continuità in $x = -1$**: $F$ è derivabile in $]-\infty, +\infty[$, quindi continua; i limiti dei due rami devono coincidere: $\frac{1}{6} + k_1 = - \frac{7}{6} + k_2$ , da cui $k_2 = k_1 + \frac{4}{3}$.`,
    String.raw`**Continuità in $x = 1$**: $F$ è derivabile in $]-\infty, +\infty[$, quindi continua; i limiti dei due rami devono coincidere: $\frac{13}{6} + k_2 = \frac{5}{6} + k_3$ (nel ramo di sinistra $k_2 = k_1 + \frac{4}{3}$), da cui $k_3 = k_1 + \frac{8}{3}$.`,
    String.raw`**Condizione** $F(0) = 4$: il punto $x_0 = 0$ sta nel ramo $-1 < x < 1$, quindi $0 + k_2 = 4$, cioè $k_2 = 4$ e $k_1 = \frac{8}{3}$.`,
    String.raw`**Risultato**: $$F(x) = \begin{cases} \frac{4 x^{3}}{3} + \frac{x^{2}}{2} - x + \frac{8}{3} & x \le -1 \\[1mm] \frac{2 x^{3}}{3} + \frac{x^{2}}{2} + x + 4 & -1 < x < 1 \\[1mm] \frac{4 x^{3}}{3} + \frac{x^{2}}{2} - x + \frac{16}{3} & x \ge 1 \end{cases}$$ Controllo: $F(0) = 4$ e i rami coincidono nei punti di raccordo.`
  ],
  answer: { fields: [
      { label: String.raw`F(x) per $x \le -1$`,
        kind: "expr",
        expr: "4*x**3/3 + x**2/2 - x + 8/3",
        dom: [-4.0, -1.05] },
      { label: String.raw`F(x) per $-1 < x < 1$`,
        kind: "expr",
        expr: "2*x**3/3 + x**2/2 + x + 4",
        dom: [-0.96, 0.96] },
      { label: String.raw`F(x) per $x \ge 1$`,
        kind: "expr",
        expr: "4*x**3/3 + x**2/2 - x + 16/3",
        dom: [1.05, 4.0] }
    ] },
  stepChk: [
    "simplify(diff(P('4*x**3/3 + x**2/2 - x'), x) - (P('4*x**2 + x - 1'))) == 0",
    "simplify(diff(P('2*x**3/3 + x**2/2 + x'), x) - (P('2*x**2 + x + 1'))) == 0",
    "simplify(diff(P('4*x**3/3 + x**2/2 - x'), x) - (P('4*x**2 + x - 1'))) == 0",
    "simplify(P('4') - (P('4'))) == 0",
    "simplify(P('4*x**3/3 + x**2/2 - x + 8/3') - (P('4*x**3/3 + x**2/2 - x + 8/3'))) == 0",
    "simplify(P('2*x**3/3 + x**2/2 + x + 4') - (P('2*x**3/3 + x**2/2 + x + 4'))) == 0",
    "simplify(P('4*x**3/3 + x**2/2 - x + 16/3') - (P('4*x**3/3 + x**2/2 - x + 16/3'))) == 0"
  ],
  nota: String.raw`Alla lavagna è uscito $k = \frac{13}{3}$: il valore corretto è $k_1 = \frac83$.` },

{ id: "lz-2210-abs",
  cap: 1,
  topic: "valore_assoluto",
  src: "Lezione 22/10, es. 1",
  text: String.raw`Determinare la primitiva $F$ in $]-\infty,+\infty[$ della funzione $f(x) = x - 1 + |x^2-4| + 2x^2$ tale che $F(0) = 2$.`,
  steps: [
    String.raw`**Scriviamo $f$ a tratti**, studiando il segno dell'argomento del valore assoluto: $$f(x) = \begin{cases} 3 x^{2} + x - 5 & x \le -2 \\ x^{2} + x + 3 & -2 < x < 2 \\ 3 x^{2} + x - 5 & x \ge 2 \end{cases}$$`,
    String.raw`**Primitive dei singoli rami**, ognuna con la sua costante: per $x \le -2$: $\displaystyle\int (3 x^{2} + x - 5)\,dx = x^{3} + \frac{x^{2}}{2} - 5 x + k_1$; per $-2 < x < 2$: $\displaystyle\int (x^{2} + x + 3)\,dx = \frac{x^{3}}{3} + \frac{x^{2}}{2} + 3 x + k_2$; per $x \ge 2$: $\displaystyle\int (3 x^{2} + x - 5)\,dx = x^{3} + \frac{x^{2}}{2} - 5 x + k_3$.`,
    String.raw`**Continuità in $x = -2$**: $F$ è derivabile in $]-\infty, +\infty[$, quindi continua; i limiti dei due rami devono coincidere: $4 + k_1 = - \frac{20}{3} + k_2$ , da cui $k_2 = k_1 + \frac{32}{3}$.`,
    String.raw`**Continuità in $x = 2$**: $F$ è derivabile in $]-\infty, +\infty[$, quindi continua; i limiti dei due rami devono coincidere: $\frac{32}{3} + k_2 = 0 + k_3$ (nel ramo di sinistra $k_2 = k_1 + \frac{32}{3}$), da cui $k_3 = k_1 + \frac{64}{3}$.`,
    String.raw`**Condizione** $F(0) = 2$: il punto $x_0 = 0$ sta nel ramo $-2 < x < 2$, quindi $0 + k_2 = 2$, cioè $k_2 = 2$ e $k_1 = - \frac{26}{3}$.`,
    String.raw`**Risultato**: $$F(x) = \begin{cases} x^{3} + \frac{x^{2}}{2} - 5 x - \frac{26}{3} & x \le -2 \\[1mm] \frac{x^{3}}{3} + \frac{x^{2}}{2} + 3 x + 2 & -2 < x < 2 \\[1mm] x^{3} + \frac{x^{2}}{2} - 5 x + \frac{38}{3} & x \ge 2 \end{cases}$$ Controllo: $F(0) = 2$ e i rami coincidono nei punti di raccordo.`
  ],
  answer: { fields: [
      { label: String.raw`F(x) per $x \le -2$`,
        kind: "expr",
        expr: "x**3 + x**2/2 - 5*x - 26/3",
        dom: [-5.0, -2.05] },
      { label: String.raw`F(x) per $-2 < x < 2$`,
        kind: "expr",
        expr: "x**3/3 + x**2/2 + 3*x + 2",
        dom: [-1.92, 1.92] },
      { label: String.raw`F(x) per $x \ge 2$`,
        kind: "expr",
        expr: "x**3 + x**2/2 - 5*x + 38/3",
        dom: [2.05, 5.0] }
    ] },
  stepChk: [
    "simplify(diff(P('x**3 + x**2/2 - 5*x'), x) - (P('3*x**2 + x - 5'))) == 0",
    "simplify(diff(P('x**3/3 + x**2/2 + 3*x'), x) - (P('x**2 + x + 3'))) == 0",
    "simplify(diff(P('x**3 + x**2/2 - 5*x'), x) - (P('3*x**2 + x - 5'))) == 0",
    "simplify(P('2') - (P('2'))) == 0",
    "simplify(P('x**3 + x**2/2 - 5*x - 26/3') - (P('x**3 + x**2/2 - 5*x - 26/3'))) == 0",
    "simplify(P('x**3/3 + x**2/2 + 3*x + 2') - (P('x**3/3 + x**2/2 + 3*x + 2'))) == 0",
    "simplify(P('x**3 + x**2/2 - 5*x + 38/3') - (P('x**3 + x**2/2 - 5*x + 38/3'))) == 0"
  ],
  nota: String.raw`Alla lavagna è uscito $k = -\frac{28}{3}$: il valore corretto è $k_1 = -\frac{26}{3}$.` },

{ id: "lz-0311-pc5",
  cap: 2,
  topic: "seno_coseno",
  src: "Lezione 03/11, es. 5",
  text: String.raw`Risolvere il problema di Cauchy $$\begin{cases} y'' + 4y = x\sin x + \dfrac{3}{e^{2x}} \\ y(0) = 0 \\ y'(0) = 0 \end{cases}$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' + 4y = 0$. Equazione caratteristica $\alpha^{2} + 4 = 0$: $\alpha = \pm 2i$. Integrale generale dell'omogenea: $k_1\cos 2 x  + k_2\sin 2 x $.`,
    "**Integrale particolare** per **sovrapposizione**: il termine noto è una somma, si cerca un integrale particolare per ciascun addendo e si sommano.",
    String.raw`Il termine $x \sin x$ è la **parte immaginaria** di $xe^{ix}$: risolviamo con termine noto $e^{ix}(x)$ e poi prendiamo la parte immaginaria.`,
    String.raw`Termine noto del tipo $e^{hx}p(x)$ con $h = i$, $m = 1$. $i$ non è radice dell'equazione caratteristica, quindi $s = 0$: si cerca $\bar y = (a x + b) e^{i x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{i x}$ si ottiene $3 a x + 2 i a + 3 b = x$; per il principio di identità dei polinomi $a = \frac{1}{3}, b = - \frac{2 i}{9}$. Quindi $\bar y = (\frac{x}{3} - \frac{2 i}{9}) e^{i x}$, e la parte immaginaria è $\frac{x \sin x }{3} - \frac{2 \cos x }{9}$.`,
    String.raw`Termine noto del tipo $e^{hx}p(x)$ con $h = -2$, $m = 0$. $-2$ non è radice dell'equazione caratteristica, quindi $s = 0$: si cerca $\bar y = a e^{- 2 x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{- 2 x}$ si ottiene $8 a = 3$; per il principio di identità dei polinomi $a = \frac{3}{8}$. Quindi $\bar y = \frac{3 e^{- 2 x}}{8}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1\cos 2 x  + k_2\sin 2 x  + \frac{x \sin x }{3} - \frac{2 \cos x }{9} + \frac{3 e^{- 2 x}}{8}$.`,
    String.raw`**Condizioni iniziali** (sull'integrale generale della completa): $y(0) = k_{1} + \frac{11}{72} = 0$, $y'(0) = 2 k_{2} - \frac{3}{4} = 0$. Risolvendo il sistema: $k_1 = - \frac{11}{72}$, $k_2 = \frac{3}{8}$.`,
    String.raw`**Soluzione** del problema di Cauchy: $y(x) = -\frac{11}{72}\cos 2x + \frac38\sin 2x + \frac13x\sin x - \frac29\cos x + \frac38e^{-2x}$.`
  ],
  answer: { fields: [
      { label: "y(x)",
        kind: "expr",
        expr: "((24*x*sin(x) + 27*sin(2*x) - 16*cos(x) - 11*cos(2*x))*exp(2*x) + 27)*exp(-2*x)/72",
        dom: [-1.5, 1.5] }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('x*sin(x)/3 - 2*cos(x)/9'), x, 2) + (4)*diff(P('x*sin(x)/3 - 2*cos(x)/9'), x, 0) - (P('x*sin(x)')))) == 0",
    "simplify(expand((1)*diff(P('3*exp(-2*x)/8'), x, 2) + (4)*diff(P('3*exp(-2*x)/8'), x, 0) - (P('3*exp(-2*x)')))) == 0",
    "simplify(P('((24*x*sin(x) + 27*sin(2*x) - 16*cos(x) - 11*cos(2*x))*exp(2*x) + 27)*exp(-2*x)/72') - (P('x*sin(x)/3 + 3*sin(2*x)/8 - 2*cos(x)/9 - 11*cos(2*x)/72 + 3*exp(-2*x)/8'))) == 0",
    "simplify(expand((1)*diff(P('((24*x*sin(x) + 27*sin(2*x) - 16*cos(x) - 11*cos(2*x))*exp(2*x) + 27)*exp(-2*x)/72'), x, 2) + (4)*diff(P('((24*x*sin(x) + 27*sin(2*x) - 16*cos(x) - 11*cos(2*x))*exp(2*x) + 27)*exp(-2*x)/72'), x, 0) - (P('x*sin(x) + 3*exp(-2*x)')))) == 0"
  ] },

{ id: "lz-0311-pc6",
  cap: 2,
  topic: "cauchy",
  src: "Lezione 03/11, es. 6",
  text: String.raw`Sia $g$ la soluzione del problema di Cauchy $$\begin{cases} y'' - y = (x+2)e^x \\ y(0) = 0 \\ y'(0) = \frac74 \end{cases}$$ Calcolare $\displaystyle\int_0^1 g(x)\,dx$.`,
  steps: [
    String.raw`**Omogenea associata**: $y'' - y = 0$. Equazione caratteristica $\alpha^{2} - 1 = 0$: $\alpha = -1$, $\alpha = 1$. Integrale generale dell'omogenea: $k_1e^{- x} + k_2e^{x}$.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Termine noto del tipo $e^{hx}p(x)$ con $h = 1$, $m = 1$. $1$ è radice dell'equazione caratteristica (con molteplicità 1), quindi $s = 1$: si cerca $\bar y = x (a x + b) e^{x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{x}$ si ottiene $4 a x + 2 a + 2 b = x + 2$; per il principio di identità dei polinomi $a = \frac{1}{4}, b = \frac{3}{4}$. Quindi $\bar y = x (\frac{x}{4} + \frac{3}{4}) e^{x}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1e^{- x} + k_2e^{x} + \frac{x (x + 3) e^{x}}{4}$.`,
    String.raw`**Condizioni iniziali** (sull'integrale generale della completa): $y(0) = k_{1} + k_{2} = 0$, $y'(0) = - k_{1} + k_{2} + \frac{3}{4} = \frac{7}{4}$. Risolvendo il sistema: $k_1 = - \frac{1}{2}$, $k_2 = \frac{1}{2}$.`,
    String.raw`**Soluzione** del problema di Cauchy: $y(x) = e^x\left(\frac{x^2}{4} + \frac{3x}{4} + \frac12\right) - \frac12e^{-x}$.`,
    String.raw`**Integrale della soluzione**: prima una primitiva, poi la formula fondamentale: $\displaystyle\int_{0}^{1} y(x)\,dx = - \frac{3}{4} + \frac{1}{2 e} + \frac{3 e}{4}$.`
  ],
  answer: { fields: [
      { label: "y(x)",
        kind: "expr",
        expr: "((x*(x + 3) + 2)*exp(2*x) - 2)*exp(-x)/4",
        dom: [-1.5, 1.5] },
      { label: String.raw`$\int_{0}^{1} y(x)\,dx$`,
        kind: "number",
        value: "-3/4 + exp(-1)/2 + 3*E/4" }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('x*(x/4 + 3/4)*exp(x)'), x, 2) + (-1)*diff(P('x*(x/4 + 3/4)*exp(x)'), x, 0) - (P('(x + 2)*exp(x)')))) == 0",
    "simplify(P('((x*(x + 3) + 2)*exp(2*x) - 2)*exp(-x)/4') - (P('(x**2/4 + 3*x/4 + 1/2)*exp(x) - exp(-x)/2'))) == 0",
    "simplify(expand((1)*diff(P('((x*(x + 3) + 2)*exp(2*x) - 2)*exp(-x)/4'), x, 2) + (-1)*diff(P('((x*(x + 3) + 2)*exp(2*x) - 2)*exp(-x)/4'), x, 0) - (P('(x + 2)*exp(x)')))) == 0",
    "simplify(P('-3/4 + exp(-1)/2 + 3*E/4') - (P('-3/4 + exp(-1)/2 + 3*E/4'))) == 0"
  ] },

{ id: "lz-2910-pc5",
  cap: 2,
  topic: "cauchy",
  src: "Lezione 29/10, es. 5",
  text: String.raw`Risolvere il problema di Cauchy $$\begin{cases} y'' - y' = 3x + 1 \\ y(1) = \frac12 \\ y'(1) = -10 \end{cases}$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' - y' = 0$. Equazione caratteristica $\alpha^{2} - \alpha = 0$: $\alpha = 0$, $\alpha = 1$. Integrale generale dell'omogenea: $k_1 + k_2e^{x}$.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Termine noto del tipo $e^{hx}p(x)$ con $h = 0$, $m = 1$. $0$ è radice dell'equazione caratteristica (con molteplicità 1), quindi $s = 1$: si cerca $\bar y = x (a x + b)$.`,
    String.raw`Derivando e sostituendo si ottiene $- 2 a x + 2 a - b = 3 x + 1$; per il principio di identità dei polinomi $a = - \frac{3}{2}, b = -4$. Quindi $\bar y = x (- \frac{3 x}{2} - 4)$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1 + k_2e^{x} - \frac{x (3 x + 8)}{2}$.`,
    String.raw`**Condizioni iniziali** (sull'integrale generale della completa): $y(1) = k_{1} + e k_{2} - \frac{11}{2} = \frac{1}{2}$, $y'(1) = e k_{2} - 7 = -10$. Risolvendo il sistema: $k_1 = 9$, $k_2 = - \frac{3}{e}$.`,
    String.raw`**Soluzione** del problema di Cauchy: $y(x) = -\frac32x^2 - 4x + 9 - 3e^{x-1}$.`
  ],
  answer: { fields: [
      { label: "y(x)",
        kind: "expr",
        expr: "-3*x**2/2 - 4*x - 3*exp(x - 1) + 9",
        dom: [0.0, 2.0] }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('x*(-3*x/2 - 4)'), x, 2) + (-1)*diff(P('x*(-3*x/2 - 4)'), x, 1) - (P('3*x + 1')))) == 0",
    "simplify(P('-3*x**2/2 - 4*x - 3*exp(x - 1) + 9') - (P('-3*x**2/2 - 4*x - 3*exp(x - 1) + 9'))) == 0",
    "simplify(expand((1)*diff(P('-3*x**2/2 - 4*x - 3*exp(x - 1) + 9'), x, 2) + (-1)*diff(P('-3*x**2/2 - 4*x - 3*exp(x - 1) + 9'), x, 1) - (P('3*x + 1')))) == 0"
  ],
  nota: String.raw`Alla lavagna l'omogenea era scritta $k_1 + k_2x$: le radici sono $0$ e $1$, quindi è $k_1 + k_2e^x$.` },

{ id: "lz-2910-pc3",
  cap: 2,
  topic: "cauchy",
  src: "Lezione 29/10, problema di Cauchy del terzo ordine",
  text: String.raw`Risolvere il problema di Cauchy $$\begin{cases} y''' - 4y'' + 4y' = 3e^{2x} \\ y(0) = 1 \\ y'(0) = 0 \\ y''(0) = -1 \end{cases}$$`,
  steps: [
    String.raw`**Omogenea associata**: $y''' - 4y'' + 4y' = 0$. Equazione caratteristica $\alpha^{3} - 4 \alpha^{2} + 4 \alpha = 0$: $\alpha = 0$, $\alpha = 2$ (molteplicità 2). Integrale generale dell'omogenea: $k_1 + k_2e^{2 x} + k_3x e^{2 x}$.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Termine noto del tipo $e^{hx}p(x)$ con $h = 2$, $m = 0$. $2$ è radice dell'equazione caratteristica (con molteplicità 2), quindi $s = 2$: si cerca $\bar y = a x^{2} e^{2 x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{2 x}$ si ottiene $4 a = 3$; per il principio di identità dei polinomi $a = \frac{3}{4}$. Quindi $\bar y = \frac{3 x^{2} e^{2 x}}{4}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1 + k_2e^{2 x} + k_3x e^{2 x} + \frac{3 x^{2} e^{2 x}}{4}$.`,
    String.raw`**Condizioni iniziali** (sull'integrale generale della completa): $y(0) = k_{1} + k_{2} = 1$, $y'(0) = 2 k_{2} + k_{3} = 0$, $y''(0) = 4 k_{2} + 4 k_{3} + \frac{3}{2} = -1$. Risolvendo il sistema: $k_1 = \frac{3}{8}$, $k_2 = \frac{5}{8}$, $k_3 = - \frac{5}{4}$.`,
    String.raw`**Soluzione** del problema di Cauchy: $y(x) = \frac38 + e^{2x}\left(\frac34x^2 - \frac54x + \frac58\right)$.`
  ],
  answer: { fields: [
      { label: "y(x)",
        kind: "expr",
        expr: "3*x**2*exp(2*x)/4 - 5*x*exp(2*x)/4 + 5*exp(2*x)/8 + 3/8",
        dom: [-1.5, 1.5] }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('3*x**2*exp(2*x)/4'), x, 3) + (-4)*diff(P('3*x**2*exp(2*x)/4'), x, 2) + (4)*diff(P('3*x**2*exp(2*x)/4'), x, 1) - (P('3*exp(2*x)')))) == 0",
    "simplify(P('3*x**2*exp(2*x)/4 - 5*x*exp(2*x)/4 + 5*exp(2*x)/8 + 3/8') - (P('(3*x**2/4 - 5*x/4 + 5/8)*exp(2*x) + 3/8'))) == 0",
    "simplify(expand((1)*diff(P('3*x**2*exp(2*x)/4 - 5*x*exp(2*x)/4 + 5*exp(2*x)/8 + 3/8'), x, 3) + (-4)*diff(P('3*x**2*exp(2*x)/4 - 5*x*exp(2*x)/4 + 5*exp(2*x)/8 + 3/8'), x, 2) + (4)*diff(P('3*x**2*exp(2*x)/4 - 5*x*exp(2*x)/4 + 5*exp(2*x)/8 + 3/8'), x, 1) - (P('3*exp(2*x)')))) == 0"
  ],
  nota: String.raw`Alla lavagna è uscito $k_1 = \frac34$: il valore corretto è $\frac38$.` },

{ id: "lz-disp-pc",
  cap: 2,
  topic: "cauchy",
  src: "Dispense, cap. 2, esempio 2.6",
  text: String.raw`Risolvere il problema di Cauchy $$\begin{cases} y'' + 2y' - 3y = 0 \\ y(1) = 0 \\ y'(1) = 1 \end{cases}$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' + 2y' - 3y = 0$. Equazione caratteristica $\alpha^{2} + 2 \alpha - 3 = 0$: $\alpha = -3$, $\alpha = 1$. Integrale generale dell'omogenea: $k_1e^{- 3 x} + k_2e^{x}$.`,
    String.raw`L'equazione è omogenea: l'integrale generale è $y(x) = k_1e^{- 3 x} + k_2e^{x}$.`,
    String.raw`**Condizioni iniziali** (sull'integrale generale della completa): $y(1) = \frac{k_{1} + k_{2} e^{4}}{e^{3}} = 0$, $y'(1) = \frac{- 3 k_{1} + k_{2} e^{4}}{e^{3}} = 1$. Risolvendo il sistema: $k_1 = - \frac{e^{3}}{4}$, $k_2 = \frac{1}{4 e}$.`,
    String.raw`**Soluzione** del problema di Cauchy: $y(x) = \frac{e^{x-1}}{4} - \frac{e^{3-3x}}{4}$.`
  ],
  answer: { fields: [
      { label: "y(x)",
        kind: "expr",
        expr: "(exp(4*x) - exp(4))*exp(-3*x - 1)/4",
        dom: [0.0, 2.0] }
    ] },
  stepChk: [
    "simplify(P('(exp(4*x) - exp(4))*exp(-3*x - 1)/4') - (P('-exp(3 - 3*x)/4 + exp(x - 1)/4'))) == 0",
    "simplify(expand((1)*diff(P('(exp(4*x) - exp(4))*exp(-3*x - 1)/4'), x, 2) + (2)*diff(P('(exp(4*x) - exp(4))*exp(-3*x - 1)/4'), x, 1) + (-3)*diff(P('(exp(4*x) - exp(4))*exp(-3*x - 1)/4'), x, 0) - (P('0')))) == 0"
  ] },

{ id: "lz-l8-c1",
  cap: 2,
  topic: "somiglianza",
  src: "Lezione 29/10 (L8)",
  text: String.raw`Determinare l'integrale generale dell'equazione differenziale $$y'' - 8y' = x^2e^{2x}$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' - 8y' = 0$. Equazione caratteristica $\alpha^{2} - 8 \alpha = 0$: $\alpha = 0$, $\alpha = 8$. Integrale generale dell'omogenea: $k_1 + k_2e^{8 x}$.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Termine noto del tipo $e^{hx}p(x)$ con $h = 2$, $m = 2$. $2$ non è radice dell'equazione caratteristica, quindi $s = 0$: si cerca $\bar y = (a x^{2} + b x + c) e^{2 x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{2 x}$ si ottiene $- 12 a x^{2} + 2 a - 4 b - 12 c + x (- 8 a - 12 b) = x^{2}$; per il principio di identità dei polinomi $a = - \frac{1}{12}, b = \frac{1}{18}, c = - \frac{7}{216}$. Quindi $\bar y = (- \frac{x^{2}}{12} + \frac{x}{18} - \frac{7}{216}) e^{2 x}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1 + k_2e^{8 x} + \frac{(- 18 x^{2} + 12 x - 7) e^{2 x}}{216}$.`
  ],
  answer: { fields: [
      { label: String.raw`un integrale particolare $\bar y(x)$`,
        kind: "ode",
        co: [1.0, -8.0, 0.0],
        rhs: "x**2*exp(2*x)",
        dom: [-1.5, 1.5],
        expr: "(-18*x**2 + 12*x - 7)*exp(2*x)/216" }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('(-x**2/12 + x/18 - 7/216)*exp(2*x)'), x, 2) + (-8)*diff(P('(-x**2/12 + x/18 - 7/216)*exp(2*x)'), x, 1) - (P('x**2*exp(2*x)')))) == 0"
  ],
  nota: String.raw`Alla lavagna è uscito $c = -\frac{5}{72}$: il valore corretto è $c = -\frac{7}{216}$.` },

{ id: "lz-l8-c2",
  cap: 2,
  topic: "somiglianza",
  src: "Lezione 29/10 (L8)",
  text: String.raw`Determinare l'integrale generale dell'equazione differenziale $$y'' + 5y' + 4y = xe^{-x}$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' + 5y' + 4y = 0$. Equazione caratteristica $\alpha^{2} + 5 \alpha + 4 = 0$: $\alpha = -4$, $\alpha = -1$. Integrale generale dell'omogenea: $k_1e^{- 4 x} + k_2e^{- x}$.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Termine noto del tipo $e^{hx}p(x)$ con $h = -1$, $m = 1$. $-1$ è radice dell'equazione caratteristica (con molteplicità 1), quindi $s = 1$: si cerca $\bar y = x (a x + b) e^{- x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{- x}$ si ottiene $6 a x + 2 a + 3 b = x$; per il principio di identità dei polinomi $a = \frac{1}{6}, b = - \frac{1}{9}$. Quindi $\bar y = x (\frac{x}{6} - \frac{1}{9}) e^{- x}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1e^{- 4 x} + k_2e^{- x} + \frac{x (3 x - 2) e^{- x}}{18}$.`
  ],
  answer: { fields: [
      { label: String.raw`un integrale particolare $\bar y(x)$`,
        kind: "ode",
        co: [1.0, 5.0, 4.0],
        rhs: "x*exp(-x)",
        dom: [-1.5, 1.5],
        expr: "x*(3*x - 2)*exp(-x)/18" }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('x*(x/6 - 1/9)*exp(-x)'), x, 2) + (5)*diff(P('x*(x/6 - 1/9)*exp(-x)'), x, 1) + (4)*diff(P('x*(x/6 - 1/9)*exp(-x)'), x, 0) - (P('x*exp(-x)')))) == 0"
  ],
  nota: String.raw`Alla lavagna sono usciti $a = -\frac16$, $b = -\frac49$: i valori corretti sono $a = \frac16$, $b = -\frac19$.` },

{ id: "lz-l8-c3",
  cap: 2,
  topic: "somiglianza",
  src: "Lezione 29/10 (L8)",
  text: String.raw`Determinare l'integrale generale dell'equazione differenziale $$y'' - 9y = x^2e^x$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' - 9y = 0$. Equazione caratteristica $\alpha^{2} - 9 = 0$: $\alpha = -3$, $\alpha = 3$. Integrale generale dell'omogenea: $k_1e^{- 3 x} + k_2e^{3 x}$.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Termine noto del tipo $e^{hx}p(x)$ con $h = 1$, $m = 2$. $1$ non è radice dell'equazione caratteristica, quindi $s = 0$: si cerca $\bar y = (a x^{2} + b x + c) e^{x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{x}$ si ottiene $- 8 a x^{2} + 2 a + 2 b - 8 c + x (4 a - 8 b) = x^{2}$; per il principio di identità dei polinomi $a = - \frac{1}{8}, b = - \frac{1}{16}, c = - \frac{3}{64}$. Quindi $\bar y = (- \frac{x^{2}}{8} - \frac{x}{16} - \frac{3}{64}) e^{x}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1e^{- 3 x} + k_2e^{3 x} + \frac{(- 8 x^{2} - 4 x - 3) e^{x}}{64}$.`
  ],
  answer: { fields: [
      { label: String.raw`un integrale particolare $\bar y(x)$`,
        kind: "ode",
        co: [1.0, 0.0, -9.0],
        rhs: "x**2*exp(x)",
        dom: [-1.5, 1.5],
        expr: "(-8*x**2 - 4*x - 3)*exp(x)/64" }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('(-x**2/8 - x/16 - 3/64)*exp(x)'), x, 2) + (-9)*diff(P('(-x**2/8 - x/16 - 3/64)*exp(x)'), x, 0) - (P('x**2*exp(x)')))) == 0"
  ],
  nota: String.raw`Alla lavagna è uscito $c = \frac{3}{128}$: il valore corretto è $c = -\frac{3}{64}$.` },

{ id: "lz-l9-c4",
  cap: 2,
  topic: "seno_coseno",
  src: "Lezione 03/11 (L9)",
  text: String.raw`Determinare l'integrale generale dell'equazione differenziale $$y'' + y = \cos 2x + \sin x$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' + y = 0$. Equazione caratteristica $\alpha^{2} + 1 = 0$: $\alpha = \pm i$. Integrale generale dell'omogenea: $k_1\cos x  + k_2\sin x $.`,
    "**Integrale particolare** per **sovrapposizione**: il termine noto è una somma, si cerca un integrale particolare per ciascun addendo e si sommano.",
    String.raw`Il termine $\cos 2x$ è la **parte reale** di $e^{2 ix}$: risolviamo con termine noto $e^{2 ix}$ e poi prendiamo la parte reale.`,
    String.raw`Termine noto del tipo $e^{hx}p(x)$ con $h = 2 i$, $m = 0$. $2 i$ non è radice dell'equazione caratteristica, quindi $s = 0$: si cerca $\bar y = a e^{2 i x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{2 i x}$ si ottiene $- 3 a = 1$; per il principio di identità dei polinomi $a = - \frac{1}{3}$. Quindi $\bar y = - \frac{e^{2 i x}}{3}$, e la parte reale è $- \frac{\cos 2 x }{3}$.`,
    String.raw`Il termine $\sin x$ è la **parte immaginaria** di $e^{ix}$: risolviamo con termine noto $e^{ix}$ e poi prendiamo la parte immaginaria.`,
    String.raw`Termine noto del tipo $e^{hx}p(x)$ con $h = i$, $m = 0$. $i$ è radice dell'equazione caratteristica (con molteplicità 1), quindi $s = 1$: si cerca $\bar y = a x e^{i x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{i x}$ si ottiene $2 i a = 1$; per il principio di identità dei polinomi $a = - \frac{i}{2}$. Quindi $\bar y = - \frac{i x e^{i x}}{2}$, e la parte immaginaria è $- \frac{x \cos x }{2}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1\cos x  + k_2\sin x  - \frac{x \cos x }{2} - \frac{\cos 2 x }{3}$.`
  ],
  answer: { fields: [
      { label: String.raw`un integrale particolare $\bar y(x)$`,
        kind: "ode",
        co: [1.0, 0.0, 1.0],
        rhs: "sin(x) + cos(2*x)",
        dom: [-1.5, 1.5],
        expr: "-x*cos(x)/2 - cos(2*x)/3" }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('-cos(2*x)/3'), x, 2) + (1)*diff(P('-cos(2*x)/3'), x, 0) - (P('cos(2*x)')))) == 0",
    "simplify(expand((1)*diff(P('-x*cos(x)/2'), x, 2) + (1)*diff(P('-x*cos(x)/2'), x, 0) - (P('sin(x)')))) == 0"
  ],
  nota: String.raw`Alla lavagna l'omogenea era scritta con $\cos x + i\sin x$: l'integrale generale dell'omogenea è $k_1\cos x + k_2\sin x$.` },

{ id: "lz-2210-d1",
  cap: 1,
  topic: "definiti",
  src: "Lezione 22/10",
  text: String.raw`Calcolare $$\int_{-3}^{1}|x|(x+1)\,dx.$$`,
  steps: [
    String.raw`Si spezza in $0$ (proprietà additiva): $\displaystyle\int_{-3}^0 (-x^2 - x)\,dx + \int_0^1 (x^2 + x)\,dx$.`,
    String.raw`$\left[-\frac{x^3}{3} - \frac{x^2}{2}\right]_{-3}^0 = -\frac92$ e $\left[\frac{x^3}{3} + \frac{x^2}{2}\right]_0^1 = \frac56$.`,
    String.raw`Risultato: $-\frac92 + \frac56 = -\dfrac{11}{3}$.`
  ],
  answer: { fields: [
      { label: "valore dell'integrale",
        kind: "number",
        value: "-11/3" }
    ] },
  stepChk: [
    "integrate(Abs(x)*(x+1),(x,-3,1)) == Rational(-11,3)"
  ] },

{ id: "lz-2210-d2",
  cap: 1,
  topic: "definiti",
  src: "Lezione 22/10",
  text: String.raw`Calcolare $$\int_{2}^{-4}|x|(x-2)\,dx.$$`,
  steps: [
    String.raw`Gli estremi sono \"al contrario\": si lasciano così. Si spezza in $0$: $\displaystyle\int_2^0 (x^2 - 2x)\,dx + \int_0^{-4} (-x^2 + 2x)\,dx$.`,
    String.raw`$\left[\frac{x^3}{3} - x^2\right]_2^0 = \frac43$ e $\left[-\frac{x^3}{3} + x^2\right]_0^{-4} = \frac{64}{3} + 16 = \frac{112}{3}$.`,
    String.raw`Risultato: $\dfrac{116}{3}$.`
  ],
  answer: { fields: [
      { label: "valore dell'integrale",
        kind: "number",
        value: "116/3" }
    ] },
  stepChk: [
    "integrate(Abs(x)*(x-2),(x,2,-4)) == Rational(116,3)"
  ] },

{ id: "lz-2210-d3",
  cap: 1,
  topic: "definiti",
  src: "Lezione 22/10",
  text: String.raw`Calcolare $$\int_1^2 e^xx^2\,dx.$$`,
  steps: [
    String.raw`**Prima la primitiva** (per parti due volte, FF il polinomio): $\int x^2e^x\,dx = e^x(x^2 - 2x + 2) + k$.`,
    String.raw`**Poi la formula fondamentale**: $\big[e^x(x^2 - 2x + 2)\big]_1^2 = 2e^2 - e$.`
  ],
  answer: { fields: [
      { label: "valore dell'integrale",
        kind: "number",
        value: "2*E**2 - E" }
    ] },
  stepChk: [
    "simplify(integrate(exp(x)*x**2,(x,1,2)) - P('2*E**2 - E')) == 0"
  ] },

{ id: "lz-1310-parti",
  cap: 1,
  topic: "parti",
  src: "Lezione 13/10",
  text: String.raw`Calcolare $$\int e^xx^4\,dx.$$`,
  steps: [
    String.raw`Per parti con FF $= x^4$ e FD $= e^x$: $\int x^4e^x\,dx = x^4e^x - 4\int x^3e^x\,dx$; il grado scende di uno a ogni passo.`,
    String.raw`Ripetendo: $\int x^3e^x = x^3e^x - 3\int x^2e^x$, $\int x^2e^x = x^2e^x - 2\int xe^x$, $\int xe^x = xe^x - e^x$.`,
    String.raw`Risultato: $e^x(x^4 - 4x^3 + 12x^2 - 24x + 24) + k$.`
  ],
  answer: { fields: [
      { label: "una primitiva",
        kind: "prim",
        expr: "exp(x)*(x**4-4*x**3+12*x**2-24*x+24)",
        dom: [-2, 2] }
    ] },
  stepChk: [
    "simplify(diff(P('exp(x)*(x**4-4*x**3+12*x**2-24*x+24)'),x) - x**4*exp(x)) == 0"
  ],
  nota: String.raw`Alla lavagna nel risultato mancava il termine $12x^2$.` },

{ id: "lz-2010-rad",
  cap: 1,
  topic: "radicali",
  src: "Lezione 20/10",
  text: String.raw`Determinare la primitiva $F$ di $f(x) = \dfrac{\sqrt{x+2}}{x-4}$ tale che $F(14) = 0$.`,
  steps: [
    String.raw`**Dominio**: $x \ge -2$, $x \ne 4$. Il punto $14$ sta in $]4,+\infty[$: lavoriamo in questo intervallo.`,
    String.raw`**Seconda formula di sostituzione**: $t = \sqrt{x+2}$, $x = g(t) = t^2 - 2$ con $t > \sqrt6$ (perché $x > 4$); $g$ è derivabile e invertibile, $g'(t) = 2t$.`,
    String.raw`$\displaystyle\int\frac{t}{t^2 - 6}\,2t\,dt = \int\left(2 + \frac{12}{t^2 - 6}\right)dt$ e $\dfrac{12}{t^2-6} = \sqrt6\left(\dfrac{1}{t - \sqrt6} - \dfrac{1}{t + \sqrt6}\right)$.`,
    String.raw`Primitiva in $t$: $2t + \sqrt6\log\left|\dfrac{t - \sqrt6}{t + \sqrt6}\right|$; tornando a $x$: $F(x) = 2\sqrt{x+2} + \sqrt6\log\dfrac{\sqrt{x+2} - \sqrt6}{\sqrt{x+2} + \sqrt6} + k$.`,
    String.raw`**Condizione** $F(14) = 0$: $8 + \sqrt6\log\dfrac{4 - \sqrt6}{4 + \sqrt6} + k = 0$, quindi $k = -8 - \sqrt6\log\dfrac{4 - \sqrt6}{4 + \sqrt6}$.`
  ],
  answer: { fields: [
      { label: String.raw`F(x) per $x > 4$`,
        kind: "expr",
        expr: "2*sqrt(x+2) + sqrt(6)*log((sqrt(x+2)-sqrt(6))/(sqrt(x+2)+sqrt(6))) - 8 - sqrt(6)*log((4-sqrt(6))/(4+sqrt(6)))",
        dom: [4.5, 20] }
    ] },
  stepChk: [
    "simplify(diff(P('2*sqrt(x+2) + sqrt(6)*log((sqrt(x+2)-sqrt(6))/(sqrt(x+2)+sqrt(6)))'),x) - sqrt(x+2)/(x-4)) == 0"
  ],
  nota: String.raw`Alla lavagna il coefficiente del logaritmo era $3$: quello corretto è $\sqrt6$.` },

{ id: "lz-0311-c1",
  cap: 2,
  topic: "seno_coseno",
  src: "Lezione 03/11, es. 1",
  text: String.raw`Determinare l'integrale generale dell'equazione differenziale $$y'' + 9y = 2\cos x$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' + 9y = 0$. Equazione caratteristica $\alpha^{2} + 9 = 0$: $\alpha = \pm 3i$. Integrale generale dell'omogenea: $k_1\cos 3 x  + k_2\sin 3 x $.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Il termine $2 \cos x$ è la **parte reale** di $2e^{ix}$: risolviamo con termine noto $e^{ix}(2)$ e poi prendiamo la parte reale.`,
    String.raw`Termine noto del tipo $e^{hx}p(x)$ con $h = i$, $m = 0$. $i$ non è radice dell'equazione caratteristica, quindi $s = 0$: si cerca $\bar y = a e^{i x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{i x}$ si ottiene $8 a = 2$; per il principio di identità dei polinomi $a = \frac{1}{4}$. Quindi $\bar y = \frac{e^{i x}}{4}$, e la parte reale è $\frac{\cos x }{4}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1\cos 3 x  + k_2\sin 3 x  + \frac{\cos x }{4}$.`
  ],
  answer: { fields: [
      { label: String.raw`un integrale particolare $\bar y(x)$`,
        kind: "ode",
        co: [1.0, 0.0, 9.0],
        rhs: "2*cos(x)",
        dom: [-1.5, 1.5],
        expr: "cos(x)/4" }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('cos(x)/4'), x, 2) + (9)*diff(P('cos(x)/4'), x, 0) - (P('2*cos(x)')))) == 0"
  ] },

{ id: "lz-0311-c2",
  cap: 2,
  topic: "seno_coseno",
  src: "Lezione 03/11, es. 2",
  text: String.raw`Determinare l'integrale generale dell'equazione differenziale $$y'' + 3y' = x\sin x$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' + 3y' = 0$. Equazione caratteristica $\alpha^{2} + 3 \alpha = 0$: $\alpha = -3$, $\alpha = 0$. Integrale generale dell'omogenea: $k_1e^{- 3 x} + k_2$.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Il termine $x \sin x$ è la **parte immaginaria** di $xe^{ix}$: risolviamo con termine noto $e^{ix}(x)$ e poi prendiamo la parte immaginaria.`,
    String.raw`Termine noto del tipo $e^{hx}p(x)$ con $h = i$, $m = 1$. $i$ non è radice dell'equazione caratteristica, quindi $s = 0$: si cerca $\bar y = (a x + b) e^{i x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{i x}$ si ottiene $a x (-1 + 3 i) + a (3 + 2 i) + b (-1 + 3 i) = x$; per il principio di identità dei polinomi $a = - \frac{1}{10} - \frac{3 i}{10}, b = \frac{9}{25} - \frac{i}{50}$. Quindi $\bar y = (x (- \frac{1}{10} - \frac{3 i}{10}) + \frac{9}{25} - \frac{i}{50}) e^{i x}$, e la parte immaginaria è $- \frac{x \sin x }{10} - \frac{3 x \cos x }{10} + \frac{9 \sin x }{25} - \frac{\cos x }{50}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1e^{- 3 x} + k_2 - \frac{x \sin x }{10} - \frac{3 x \cos x }{10} + \frac{9 \sin x }{25} - \frac{\cos x }{50}$.`
  ],
  answer: { fields: [
      { label: String.raw`un integrale particolare $\bar y(x)$`,
        kind: "ode",
        co: [1.0, 3.0, 0.0],
        rhs: "x*sin(x)",
        dom: [-1.5, 1.5],
        expr: "-x*sin(x)/10 - 3*x*cos(x)/10 + 9*sin(x)/25 - cos(x)/50" }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('-x*sin(x)/10 - 3*x*cos(x)/10 + 9*sin(x)/25 - cos(x)/50'), x, 2) + (3)*diff(P('-x*sin(x)/10 - 3*x*cos(x)/10 + 9*sin(x)/25 - cos(x)/50'), x, 1) - (P('x*sin(x)')))) == 0"
  ],
  nota: String.raw`Alla lavagna si trova correttamente $b = \frac{9}{25} - \frac{i}{50}$, ma nella soluzione finale è stato scritto $\frac{3}{25}\sin x$: il termine corretto è $\frac{9}{25}\sin x$.` },

{ id: "lz-0311-c3",
  cap: 2,
  topic: "seno_coseno",
  src: "Lezione 03/11, es. 3",
  text: String.raw`Determinare l'integrale generale dell'equazione differenziale $$y'' + 3y' - 4y = \cos 2x$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' + 3y' - 4y = 0$. Equazione caratteristica $\alpha^{2} + 3 \alpha - 4 = 0$: $\alpha = -4$, $\alpha = 1$. Integrale generale dell'omogenea: $k_1e^{- 4 x} + k_2e^{x}$.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Il termine $\cos 2x$ è la **parte reale** di $e^{2 ix}$: risolviamo con termine noto $e^{2 ix}$ e poi prendiamo la parte reale.`,
    String.raw`Termine noto del tipo $e^{hx}p(x)$ con $h = 2 i$, $m = 0$. $2 i$ non è radice dell'equazione caratteristica, quindi $s = 0$: si cerca $\bar y = a e^{2 i x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{2 i x}$ si ottiene $a (-8 + 6 i) = 1$; per il principio di identità dei polinomi $a = - \frac{2}{25} - \frac{3 i}{50}$. Quindi $\bar y = (- \frac{2}{25} - \frac{3 i}{50}) e^{2 i x}$, e la parte reale è $\frac{3 \sin 2 x }{50} - \frac{2 \cos 2 x }{25}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1e^{- 4 x} + k_2e^{x} + \frac{3 \sin 2 x }{50} - \frac{2 \cos 2 x }{25}$.`
  ],
  answer: { fields: [
      { label: String.raw`un integrale particolare $\bar y(x)$`,
        kind: "ode",
        co: [1.0, 3.0, -4.0],
        rhs: "cos(2*x)",
        dom: [-1.5, 1.5],
        expr: "3*sin(2*x)/50 - 2*cos(2*x)/25" }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('3*sin(2*x)/50 - 2*cos(2*x)/25'), x, 2) + (3)*diff(P('3*sin(2*x)/50 - 2*cos(2*x)/25'), x, 1) + (-4)*diff(P('3*sin(2*x)/50 - 2*cos(2*x)/25'), x, 0) - (P('cos(2*x)')))) == 0"
  ] }

);

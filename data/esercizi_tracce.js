/* Esercizi d'esame (P.I., simulazioni, appelli) dei capitoli 1 e 2, con soluzione a passi.
   FILE GENERATO da tools/build_tracce.py (non modificare a mano: cambia tools/tracce_specs.py).
   Ogni passaggio e' calcolato e verificato con sympy; stepChk viene ricontrollato da pnpm verify. */
(window.ESERCIZI = window.ESERCIZI || []).push(

{ id: "tr-pi25-a1",
  cap: 1,
  topic: "valore_assoluto",
  src: "P.I. 9/12/2025, compito A (prima versione)",
  text: String.raw`Determinare la primitiva $F$ in $]-\infty,+\infty[$ della funzione $f(x) = |x-1|e^{2x}$ tale che $F(\frac12) = e$.`,
  steps: [
    String.raw`**Scriviamo $f$ a tratti**, studiando il segno dell'argomento del valore assoluto: $$f(x) = \begin{cases} (1 - x) e^{2 x} & x < 1 \\ (x - 1) e^{2 x} & x \ge 1 \end{cases}$$`,
    String.raw`**Primitive dei singoli rami**, ognuna con la sua costante (per parti, con FF il polinomio e FD $e^{2x}$): per $x < 1$: $\displaystyle\int (1 - x) e^{2 x}\,dx = \frac{(3 - 2 x) e^{2 x}}{4} + k_1$; per $x \ge 1$: $\displaystyle\int (x - 1) e^{2 x}\,dx = \frac{(2 x - 3) e^{2 x}}{4} + k_2$.`,
    String.raw`**Continuità in $x = 1$**: $F$ è derivabile in $]-\infty, +\infty[$, quindi continua; i limiti dei due rami devono coincidere: $\frac{e^{2}}{4} + k_1 = - \frac{e^{2}}{4} + k_2$ , da cui $k_2 = k_1 + \frac{e^{2}}{2}$.`,
    String.raw`**Condizione** $F(\frac{1}{2}) = e$: il punto $x_0 = \frac{1}{2}$ sta nel ramo $x < 1$, quindi $\frac{e}{2} + k_1 = e$, cioè $k_1 = \frac{e}{2}$.`,
    String.raw`**Risultato**: $$F(x) = \begin{cases} \dfrac{(3-2x)e^{2x}}{4} + \dfrac e2 & x < 1 \\[1mm] \dfrac{(2x-3)e^{2x}}{4} + \dfrac e2 + \dfrac{e^2}{2} & x \ge 1 \end{cases}$$ Controllo: $F(\frac{1}{2}) = e$ e i rami coincidono nei punti di raccordo.`
  ],
  answer: { fields: [
      { label: String.raw`F(x) per $x < 1$`,
        kind: "expr",
        expr: "(3 - 2*x)*exp(2*x)/4 + E/2",
        dom: [-2.0, 0.95] },
      { label: String.raw`F(x) per $x \ge 1$`,
        kind: "expr",
        expr: "(2*x - 3)*exp(2*x)/4 + E*(1 + E)/2",
        dom: [1.05, 4.0] }
    ] },
  stepChk: [
    "simplify(diff(P('(3 - 2*x)*exp(2*x)/4'), x) - (P('(1 - x)*exp(2*x)'))) == 0",
    "simplify(diff(P('(2*x - 3)*exp(2*x)/4'), x) - (P('(x - 1)*exp(2*x)'))) == 0",
    "simplify(P('E') - (P('E'))) == 0",
    "simplify(P('(3 - 2*x)*exp(2*x)/4 + E/2') - (P('(3 - 2*x)*exp(2*x)/4 + E/2'))) == 0",
    "simplify(P('(2*x - 3)*exp(2*x)/4 + E*(1 + E)/2') - (P('(2*x - 3)*exp(2*x)/4 + E/2 + exp(2)/2'))) == 0"
  ] },

{ id: "tr-pi25-a2",
  cap: 1,
  topic: "valore_assoluto",
  src: "P.I. 9/12/2025, compito A (seconda versione)",
  text: String.raw`Determinare la primitiva $F$ in $]-\infty,+\infty[$ della funzione $f(x) = |x-2|e^{2x}$ tale che $F(\frac12) = 3e$.`,
  steps: [
    String.raw`**Scriviamo $f$ a tratti**, studiando il segno dell'argomento del valore assoluto: $$f(x) = \begin{cases} (2 - x) e^{2 x} & x < 2 \\ (x - 2) e^{2 x} & x \ge 2 \end{cases}$$`,
    String.raw`**Primitive dei singoli rami**, ognuna con la sua costante (per parti): per $x < 2$: $\displaystyle\int (2 - x) e^{2 x}\,dx = \frac{(5 - 2 x) e^{2 x}}{4} + k_1$; per $x \ge 2$: $\displaystyle\int (x - 2) e^{2 x}\,dx = \frac{(2 x - 5) e^{2 x}}{4} + k_2$.`,
    String.raw`**Continuità in $x = 2$**: $F$ è derivabile in $]-\infty, +\infty[$, quindi continua; i limiti dei due rami devono coincidere: $\frac{e^{4}}{4} + k_1 = - \frac{e^{4}}{4} + k_2$ , da cui $k_2 = k_1 + \frac{e^{4}}{2}$.`,
    String.raw`**Condizione** $F(\frac{1}{2}) = 3 e$: il punto $x_0 = \frac{1}{2}$ sta nel ramo $x < 2$, quindi $e + k_1 = 3 e$, cioè $k_1 = 2 e$.`,
    String.raw`**Risultato**: $$F(x) = \begin{cases} \dfrac{(5-2x)e^{2x}}{4} + 2e & x < 2 \\[1mm] \dfrac{(2x-5)e^{2x}}{4} + 2e + \dfrac{e^4}{2} & x \ge 2 \end{cases}$$ Controllo: $F(\frac{1}{2}) = 3 e$ e i rami coincidono nei punti di raccordo.`
  ],
  answer: { fields: [
      { label: String.raw`F(x) per $x < 2$`,
        kind: "expr",
        expr: "(5 - 2*x)*exp(2*x)/4 + 2*E",
        dom: [-1.0, 1.95] },
      { label: String.raw`F(x) per $x \ge 2$`,
        kind: "expr",
        expr: "(2*x - 5)*exp(2*x)/4 + E*(4 + exp(3))/2",
        dom: [2.05, 5.0] }
    ] },
  stepChk: [
    "simplify(diff(P('(5 - 2*x)*exp(2*x)/4'), x) - (P('(2 - x)*exp(2*x)'))) == 0",
    "simplify(diff(P('(2*x - 5)*exp(2*x)/4'), x) - (P('(x - 2)*exp(2*x)'))) == 0",
    "simplify(P('3*E') - (P('3*E'))) == 0",
    "simplify(P('(5 - 2*x)*exp(2*x)/4 + 2*E') - (P('(5 - 2*x)*exp(2*x)/4 + 2*E'))) == 0",
    "simplify(P('(2*x - 5)*exp(2*x)/4 + E*(4 + exp(3))/2') - (P('(2*x - 5)*exp(2*x)/4 + 2*E + exp(4)/2'))) == 0"
  ] },

{ id: "tr-pi25-a3",
  cap: 1,
  topic: "valore_assoluto",
  src: "P.I. 9/12/2025, compito A (terza versione)",
  text: String.raw`Determinare la primitiva $F$ in $]-\infty,+\infty[$ della funzione $f(x) = e^{|x-2| + 2x}$ tale che $F(0) = 2e^2$.`,
  steps: [
    String.raw`**Scriviamo $f$ a tratti**, studiando il segno dell'argomento del valore assoluto: $$f(x) = \begin{cases} e^{x + 2} & x < 2 \\ e^{3 x - 2} & x \ge 2 \end{cases}$$`,
    String.raw`**Primitive dei singoli rami**, ognuna con la sua costante: per $x < 2$: $\displaystyle\int e^{x + 2}\,dx = e^{x + 2} + k_1$; per $x \ge 2$: $\displaystyle\int e^{3 x - 2}\,dx = \frac{e^{3 x - 2}}{3} + k_2$.`,
    String.raw`**Continuità in $x = 2$**: $F$ è derivabile in $]-\infty, +\infty[$, quindi continua; i limiti dei due rami devono coincidere: $e^{4} + k_1 = \frac{e^{4}}{3} + k_2$ , da cui $k_2 = k_1 + \frac{2 e^{4}}{3}$.`,
    String.raw`**Condizione** $F(0) = 2 e^{2}$: il punto $x_0 = 0$ sta nel ramo $x < 2$, quindi $e^{2} + k_1 = 2 e^{2}$, cioè $k_1 = e^{2}$.`,
    String.raw`**Risultato**: $$F(x) = \begin{cases} e^{x+2} + e^2 & x < 2 \\[1mm] \dfrac{e^{3x-2}}{3} + e^2 + \dfrac23e^4 & x \ge 2 \end{cases}$$ Controllo: $F(0) = 2 e^{2}$ e i rami coincidono nei punti di raccordo.`
  ],
  answer: { fields: [
      { label: String.raw`F(x) per $x < 2$`,
        kind: "expr",
        expr: "exp(x + 2) + exp(2)",
        dom: [-1.0, 1.95] },
      { label: String.raw`F(x) per $x \ge 2$`,
        kind: "expr",
        expr: "exp(3*x - 2)/3 + exp(2) + 2*exp(4)/3",
        dom: [2.05, 5.0] }
    ] },
  stepChk: [
    "simplify(diff(P('exp(x + 2)'), x) - (P('exp(x + 2)'))) == 0",
    "simplify(diff(P('exp(3*x - 2)/3'), x) - (P('exp(3*x - 2)'))) == 0",
    "simplify(P('2*exp(2)') - (P('2*exp(2)'))) == 0",
    "simplify(P('exp(x + 2) + exp(2)') - (P('exp(x + 2) + exp(2)'))) == 0",
    "simplify(P('exp(3*x - 2)/3 + exp(2) + 2*exp(4)/3') - (P('exp(3*x - 2)/3 + exp(2) + 2*exp(4)/3'))) == 0"
  ] },

{ id: "tr-pi25-a4",
  cap: 1,
  topic: "valore_assoluto",
  src: "P.I. 9/12/2025, compito A (quarta versione)",
  text: String.raw`Determinare la primitiva $F$ in $]-\infty,+\infty[$ della funzione $f(x) = e^{|x-1| + 3x}$ tale che $F(0) = \frac32e$.`,
  steps: [
    String.raw`**Scriviamo $f$ a tratti**, studiando il segno dell'argomento del valore assoluto: $$f(x) = \begin{cases} e^{2 x + 1} & x < 1 \\ e^{4 x - 1} & x \ge 1 \end{cases}$$`,
    String.raw`**Primitive dei singoli rami**, ognuna con la sua costante: per $x < 1$: $\displaystyle\int e^{2 x + 1}\,dx = \frac{e^{2 x + 1}}{2} + k_1$; per $x \ge 1$: $\displaystyle\int e^{4 x - 1}\,dx = \frac{e^{4 x - 1}}{4} + k_2$.`,
    String.raw`**Continuità in $x = 1$**: $F$ è derivabile in $]-\infty, +\infty[$, quindi continua; i limiti dei due rami devono coincidere: $\frac{e^{3}}{2} + k_1 = \frac{e^{3}}{4} + k_2$ , da cui $k_2 = k_1 + \frac{e^{3}}{4}$.`,
    String.raw`**Condizione** $F(0) = \frac{3 e}{2}$: il punto $x_0 = 0$ sta nel ramo $x < 1$, quindi $\frac{e}{2} + k_1 = \frac{3 e}{2}$, cioè $k_1 = e$.`,
    String.raw`**Risultato**: $$F(x) = \begin{cases} \dfrac{e^{2x+1}}{2} + e & x < 1 \\[1mm] \dfrac{e^{4x-1}}{4} + e + \dfrac{e^3}{4} & x \ge 1 \end{cases}$$ Controllo: $F(0) = \frac{3 e}{2}$ e i rami coincidono nei punti di raccordo.`
  ],
  answer: { fields: [
      { label: String.raw`F(x) per $x < 1$`,
        kind: "expr",
        expr: "exp(2*x + 1)/2 + E",
        dom: [-2.0, 0.95] },
      { label: String.raw`F(x) per $x \ge 1$`,
        kind: "expr",
        expr: "exp(4*x - 1)/4 + E + exp(3)/4",
        dom: [1.05, 4.0] }
    ] },
  stepChk: [
    "simplify(diff(P('exp(2*x + 1)/2'), x) - (P('exp(2*x + 1)'))) == 0",
    "simplify(diff(P('exp(4*x - 1)/4'), x) - (P('exp(4*x - 1)'))) == 0",
    "simplify(P('3*E/2') - (P('3*E/2'))) == 0",
    "simplify(P('exp(2*x + 1)/2 + E') - (P('exp(2*x + 1)/2 + E'))) == 0",
    "simplify(P('exp(4*x - 1)/4 + E + exp(3)/4') - (P('exp(4*x - 1)/4 + E + exp(3)/4'))) == 0"
  ] },

{ id: "tr-sim25-al-a",
  cap: 1,
  topic: "valore_assoluto",
  src: "Simulazione P.I. 2025, canale AL",
  text: String.raw`Determinare la primitiva $F$ in $]-\infty,+\infty[$ della funzione $f(x) = e^{|x+3| + 2x}$ tale che $F(0) = \frac43e^{-3}$.`,
  steps: [
    String.raw`**Scriviamo $f$ a tratti**, studiando il segno dell'argomento del valore assoluto: $$f(x) = \begin{cases} e^{x - 3} & x < -3 \\ e^{3 x + 3} & x \ge -3 \end{cases}$$`,
    String.raw`**Primitive dei singoli rami**, ognuna con la sua costante: per $x < -3$: $\displaystyle\int e^{x - 3}\,dx = e^{x - 3} + k_1$; per $x \ge -3$: $\displaystyle\int e^{3 x + 3}\,dx = \frac{e^{3 x + 3}}{3} + k_2$.`,
    String.raw`**Continuità in $x = -3$**: $F$ è derivabile in $]-\infty, +\infty[$, quindi continua; i limiti dei due rami devono coincidere: $e^{-6} + k_1 = \frac{1}{3 e^{6}} + k_2$ , da cui $k_2 = k_1 + \frac{2}{3 e^{6}}$.`,
    String.raw`**Condizione** $F(0) = \frac{4}{3 e^{3}}$: il punto $x_0 = 0$ sta nel ramo $x \ge -3$, quindi $\frac{e^{3}}{3} + k_2 = \frac{4}{3 e^{3}}$, cioè $k_2 = \frac{4 - e^{6}}{3 e^{3}}$ e $k_1 = \frac{- e^{9} - 2 + 4 e^{3}}{3 e^{6}}$.`,
    String.raw`**Risultato**: $$F(x) = \begin{cases} e^{x - 3} + \frac{- e^{9} - 2 + 4 e^{3}}{3 e^{6}} & x < -3 \\[1mm] \frac{e^{3 x + 3}}{3} + \frac{4 - e^{6}}{3 e^{3}} & x \ge -3 \end{cases}$$ Controllo: $F(0) = \frac{4}{3 e^{3}}$ e i rami coincidono nei punti di raccordo.`
  ],
  answer: { fields: [
      { label: String.raw`F(x) per $x < -3$`,
        kind: "expr",
        expr: "exp(x - 3) + (-exp(9) - 2 + 4*exp(3))*exp(-6)/3",
        dom: [-6.0, -3.05] },
      { label: String.raw`F(x) per $x \ge -3$`,
        kind: "expr",
        expr: "exp(3*x + 3)/3 + (4 - exp(6))*exp(-3)/3",
        dom: [-2.95, 0.0] }
    ] },
  stepChk: [
    "simplify(diff(P('exp(x - 3)'), x) - (P('exp(x - 3)'))) == 0",
    "simplify(diff(P('exp(3*x + 3)/3'), x) - (P('exp(3*x + 3)'))) == 0",
    "simplify(P('(4 - exp(6))*exp(-3)/3 + exp(3)/3') - (P('4*exp(-3)/3'))) == 0",
    "simplify(P('exp(x - 3) + (-exp(9) - 2 + 4*exp(3))*exp(-6)/3') - (P('exp(x - 3) - exp(3)/3 - 2*exp(-6)/3 + 4*exp(-3)/3'))) == 0",
    "simplify(P('exp(3*x + 3)/3 + (4 - exp(6))*exp(-3)/3') - (P('exp(3*x + 3)/3 - exp(3)/3 + 4*exp(-3)/3'))) == 0"
  ] },

{ id: "tr-sim25-mz-a",
  cap: 1,
  topic: "valore_assoluto",
  src: "Simulazione P.I. 2025, canale MZ",
  text: String.raw`Determinare la primitiva $F$ in $]-\infty,+\infty[$ della funzione $f(x) = |x-4|e^{4x}$ tale che $F(\frac14) = 2e$.`,
  steps: [
    String.raw`**Scriviamo $f$ a tratti**, studiando il segno dell'argomento del valore assoluto: $$f(x) = \begin{cases} (4 - x) e^{4 x} & x < 4 \\ (x - 4) e^{4 x} & x \ge 4 \end{cases}$$`,
    String.raw`**Primitive dei singoli rami**, ognuna con la sua costante (per parti): per $x < 4$: $\displaystyle\int (4 - x) e^{4 x}\,dx = \frac{(17 - 4 x) e^{4 x}}{16} + k_1$; per $x \ge 4$: $\displaystyle\int (x - 4) e^{4 x}\,dx = \frac{(4 x - 17) e^{4 x}}{16} + k_2$.`,
    String.raw`**Continuità in $x = 4$**: $F$ è derivabile in $]-\infty, +\infty[$, quindi continua; i limiti dei due rami devono coincidere: $\frac{e^{16}}{16} + k_1 = - \frac{e^{16}}{16} + k_2$ , da cui $k_2 = k_1 + \frac{e^{16}}{8}$.`,
    String.raw`**Condizione** $F(\frac{1}{4}) = 2 e$: il punto $x_0 = \frac{1}{4}$ sta nel ramo $x < 4$, quindi $e + k_1 = 2 e$, cioè $k_1 = e$.`,
    String.raw`**Risultato**: $$F(x) = \begin{cases} \dfrac{(17-4x)e^{4x}}{16} + e & x < 4 \\[1mm] \dfrac{(4x-17)e^{4x}}{16} + e + \dfrac{e^{16}}{8} & x \ge 4 \end{cases}$$ Controllo: $F(\frac{1}{4}) = 2 e$ e i rami coincidono nei punti di raccordo.`
  ],
  answer: { fields: [
      { label: String.raw`F(x) per $x < 4$`,
        kind: "expr",
        expr: "(17 - 4*x)*exp(4*x)/16 + E",
        dom: [1.0, 3.95] },
      { label: String.raw`F(x) per $x \ge 4$`,
        kind: "expr",
        expr: "(4*x - 17)*exp(4*x)/16 + E + exp(16)/8",
        dom: [4.05, 7.0] }
    ] },
  stepChk: [
    "simplify(diff(P('(17 - 4*x)*exp(4*x)/16'), x) - (P('(4 - x)*exp(4*x)'))) == 0",
    "simplify(diff(P('(4*x - 17)*exp(4*x)/16'), x) - (P('(x - 4)*exp(4*x)'))) == 0",
    "simplify(P('2*E') - (P('2*E'))) == 0",
    "simplify(P('(17 - 4*x)*exp(4*x)/16 + E') - (P('(17 - 4*x)*exp(4*x)/16 + E'))) == 0",
    "simplify(P('(4*x - 17)*exp(4*x)/16 + E + exp(16)/8') - (P('(4*x - 17)*exp(4*x)/16 + E + exp(16)/8'))) == 0"
  ] },

{ id: "tr-es2627-q3",
  cap: 1,
  topic: "valore_assoluto",
  src: "Esempio di prova 2026/27, quesito 3",
  text: String.raw`Determinare la primitiva $F$ in $]-\infty,+\infty[$ della funzione $f(x) = |x+2| + 3x$ tale che $F(0) = 5$.`,
  steps: [
    String.raw`**Scriviamo $f$ a tratti**, studiando il segno dell'argomento del valore assoluto: $$f(x) = \begin{cases} 2 x - 2 & x < -2 \\ 4 x + 2 & x \ge -2 \end{cases}$$`,
    String.raw`**Primitive dei singoli rami**, ognuna con la sua costante: per $x < -2$: $\displaystyle\int (2 x - 2)\,dx = x^{2} - 2 x + k_1$; per $x \ge -2$: $\displaystyle\int (4 x + 2)\,dx = 2 x^{2} + 2 x + k_2$.`,
    String.raw`**Continuità in $x = -2$**: $F$ è derivabile in $]-\infty, +\infty[$, quindi continua; i limiti dei due rami devono coincidere: $8 + k_1 = 4 + k_2$ , da cui $k_2 = k_1 + 4$.`,
    String.raw`**Condizione** $F(0) = 5$: il punto $x_0 = 0$ sta nel ramo $x \ge -2$, quindi $0 + k_2 = 5$, cioè $k_2 = 5$ e $k_1 = 1$.`,
    String.raw`**Risultato**: $$F(x) = \begin{cases} x^{2} - 2 x + 1 & x < -2 \\[1mm] 2 x^{2} + 2 x + 5 & x \ge -2 \end{cases}$$ Controllo: $F(0) = 5$ e i rami coincidono nei punti di raccordo.`
  ],
  answer: { fields: [
      { label: String.raw`F(x) per $x < -2$`,
        kind: "expr",
        expr: "x**2 - 2*x + 1",
        dom: [-5.0, -2.05] },
      { label: String.raw`F(x) per $x \ge -2$`,
        kind: "expr",
        expr: "2*x**2 + 2*x + 5",
        dom: [-1.95, 1.0] }
    ] },
  stepChk: [
    "simplify(diff(P('x**2 - 2*x'), x) - (P('2*x - 2'))) == 0",
    "simplify(diff(P('2*x**2 + 2*x'), x) - (P('4*x + 2'))) == 0",
    "simplify(P('5') - (P('5'))) == 0",
    "simplify(P('x**2 - 2*x + 1') - (P('x**2 - 2*x + 1'))) == 0",
    "simplify(P('2*x**2 + 2*x + 5') - (P('2*x**2 + 2*x + 5'))) == 0"
  ] },

{ id: "tr-pi23-1-a",
  cap: 1,
  topic: "valore_assoluto",
  src: "P.I. 24/11/2023, primo turno",
  text: String.raw`Determinare la primitiva $F$ in $[-1,4]$ della funzione $f(x) = \dfrac{|x-1| + 3}{x^2+4}$ tale che $F(0) = \log 2$.`,
  steps: [
    String.raw`**Scriviamo $f$ a tratti**, studiando il segno dell'argomento del valore assoluto: $$f(x) = \begin{cases} \frac{4 - x}{x^{2} + 4} & -1 \le x < 1 \\ \frac{x + 2}{x^{2} + 4} & 1 \le x \le 4 \end{cases}$$`,
    String.raw`**Primitive dei singoli rami**, ognuna con la sua costante (si spezza in due integrali: uno con la derivata del denominatore, uno con l'arcotangente): per $-1 \le x < 1$: $\displaystyle\int \frac{4 - x}{x^{2} + 4}\,dx = - \frac{\log(x^{2} + 4)}{2} + 2 \arctan(\frac{x}{2}) + k_1$; per $1 \le x \le 4$: $\displaystyle\int \frac{x + 2}{x^{2} + 4}\,dx = \frac{\log(x^{2} + 4)}{2} + \arctan(\frac{x}{2}) + k_2$.`,
    String.raw`**Continuità in $x = 1$**: $F$ è derivabile in $[-1, 4]$, quindi continua; i limiti dei due rami devono coincidere: $- \frac{\log(5)}{2} + 2 \arctan(\frac{1}{2}) + k_1 = \arctan(\frac{1}{2}) + \frac{\log(5)}{2} + k_2$ , da cui $k_2 = k_1  - \log(5) + \arctan(\frac{1}{2})$.`,
    String.raw`**Condizione** $F(0) = \log(2)$: il punto $x_0 = 0$ sta nel ramo $-1 \le x < 1$, quindi $- \frac{\log(4)}{2} + k_1 = \log(2)$, cioè $k_1 = \log(4)$.`,
    String.raw`**Risultato**: $$F(x) = \begin{cases} - \frac{\log(x^{2} + 4)}{2} + 2 \arctan(\frac{x}{2}) + \log(4) & -1 \le x < 1 \\[1mm] \frac{\log(x^{2} + 4)}{2} + \arctan(\frac{x}{2}) - \log(5) + \arctan(\frac{1}{2}) + 2 \log(2) & 1 \le x \le 4 \end{cases}$$ Controllo: $F(0) = \log(2)$ e i rami coincidono nei punti di raccordo.`
  ],
  answer: { fields: [
      { label: String.raw`F(x) per $-1 \le x < 1$`,
        kind: "expr",
        expr: "-log(x**2 + 4)/2 + 2*atan(x/2) + log(4)",
        dom: [-0.96, 0.96] },
      { label: String.raw`F(x) per $1 \le x \le 4$`,
        kind: "expr",
        expr: "log(x**2 + 4)/2 + atan(x/2) - log(5) + atan(1/2) + 2*log(2)",
        dom: [1.06, 3.94] }
    ] },
  stepChk: [
    "simplify(diff(P('-log(x**2 + 4)/2 + 2*atan(x/2)'), x) - (P('(4 - x)/(x**2 + 4)'))) == 0",
    "simplify(diff(P('log(x**2 + 4)/2 + atan(x/2)'), x) - (P('(x + 2)/(x**2 + 4)'))) == 0",
    "simplify(P('log(4)/2') - (P('log(2)'))) == 0",
    "simplify(P('-log(x**2 + 4)/2 + 2*atan(x/2) + log(4)') - (P('-log(x**2 + 4)/2 + 2*atan(x/2) + 2*log(2)'))) == 0",
    "simplify(P('log(x**2 + 4)/2 + atan(x/2) - log(5) + atan(1/2) + 2*log(2)') - (P('log(x**2 + 4)/2 + atan(x/2) - log(5) + atan(1/2) + 2*log(2)'))) == 0"
  ],
  daVerificare: true,
  nota: String.raw`Testo letto da un PDF con formule spezzate (la condizione con $\log 2$ conferma questa lettura).` },

{ id: "tr-pi23-2-a",
  cap: 1,
  topic: "valore_assoluto",
  src: "P.I. 24/11/2023, secondo turno",
  text: String.raw`Determinare la primitiva $F$ in $[-1,3]$ della funzione $f(x) = \dfrac{|x-2| + 4}{x^2+9}$ tale che $F(0) = \log 3$.`,
  steps: [
    String.raw`**Scriviamo $f$ a tratti**, studiando il segno dell'argomento del valore assoluto: $$f(x) = \begin{cases} \frac{6 - x}{x^{2} + 9} & -1 \le x < 2 \\ \frac{x + 2}{x^{2} + 9} & 2 \le x \le 3 \end{cases}$$`,
    String.raw`**Primitive dei singoli rami**, ognuna con la sua costante: per $-1 \le x < 2$: $\displaystyle\int \frac{6 - x}{x^{2} + 9}\,dx = - \frac{\log(x^{2} + 9)}{2} + 2 \arctan(\frac{x}{3}) + k_1$; per $2 \le x \le 3$: $\displaystyle\int \frac{x + 2}{x^{2} + 9}\,dx = \frac{\log(x^{2} + 9)}{2} + \frac{2 \arctan(\frac{x}{3})}{3} + k_2$.`,
    String.raw`**Continuità in $x = 2$**: $F$ è derivabile in $[-1, 3]$, quindi continua; i limiti dei due rami devono coincidere: $- \frac{\log(13)}{2} + 2 \arctan(\frac{2}{3}) + k_1 = \frac{2 \arctan(\frac{2}{3})}{3} + \frac{\log(13)}{2} + k_2$ , da cui $k_2 = k_1  - \log(13) + \frac{4 \arctan(\frac{2}{3})}{3}$.`,
    String.raw`**Condizione** $F(0) = \log(3)$: il punto $x_0 = 0$ sta nel ramo $-1 \le x < 2$, quindi $- \frac{\log(9)}{2} + k_1 = \log(3)$, cioè $k_1 = \log(9)$.`,
    String.raw`**Risultato**: $$F(x) = \begin{cases} - \frac{\log(x^{2} + 9)}{2} + 2 \arctan(\frac{x}{3}) + \log(9) & -1 \le x < 2 \\[1mm] \frac{\log(x^{2} + 9)}{2} + \frac{2 \arctan(\frac{x}{3})}{3} - \log(13) + \frac{4 \arctan(\frac{2}{3})}{3} + 2 \log(3) & 2 \le x \le 3 \end{cases}$$ Controllo: $F(0) = \log(3)$ e i rami coincidono nei punti di raccordo.`
  ],
  answer: { fields: [
      { label: String.raw`F(x) per $-1 \le x < 2$`,
        kind: "expr",
        expr: "-log(x**2 + 9)/2 + 2*atan(x/3) + log(9)",
        dom: [-0.94, 1.94] },
      { label: String.raw`F(x) per $2 \le x \le 3$`,
        kind: "expr",
        expr: "log(x**2 + 9)/2 + 2*atan(x/3)/3 - log(13) + 4*atan(2/3)/3 + 2*log(3)",
        dom: [2.02, 2.98] }
    ] },
  stepChk: [
    "simplify(diff(P('-log(x**2 + 9)/2 + 2*atan(x/3)'), x) - (P('(6 - x)/(x**2 + 9)'))) == 0",
    "simplify(diff(P('log(x**2 + 9)/2 + 2*atan(x/3)/3'), x) - (P('(x + 2)/(x**2 + 9)'))) == 0",
    "simplify(P('log(9)/2') - (P('log(3)'))) == 0",
    "simplify(P('-log(x**2 + 9)/2 + 2*atan(x/3) + log(9)') - (P('-log(x**2 + 9)/2 + 2*atan(x/3) + 2*log(3)'))) == 0",
    "simplify(P('log(x**2 + 9)/2 + 2*atan(x/3)/3 - log(13) + 4*atan(2/3)/3 + 2*log(3)') - (P('log(x**2 + 9)/2 + 2*atan(x/3)/3 - log(13) + 4*atan(2/3)/3 + 2*log(3)'))) == 0"
  ],
  daVerificare: true,
  nota: "Testo letto da un PDF con formule spezzate." },

{ id: "tr-app300124-a1",
  cap: 1,
  topic: "valore_assoluto",
  src: "Appello 30/01/2024 (prima versione)",
  text: String.raw`Determinare la primitiva $F$ in $[0,4]$ della funzione $f(x) = |x^2-1| - 2x + 3$ tale che $F(2) = 1$.`,
  steps: [
    String.raw`**Scriviamo $f$ a tratti**, studiando il segno dell'argomento del valore assoluto: $$f(x) = \begin{cases} - x^{2} - 2 x + 4 & 0 \le x < 1 \\ x^{2} - 2 x + 2 & 1 \le x \le 4 \end{cases}$$`,
    String.raw`**Primitive dei singoli rami**, ognuna con la sua costante: per $0 \le x < 1$: $\displaystyle\int (- x^{2} - 2 x + 4)\,dx = - \frac{x^{3}}{3} - x^{2} + 4 x + k_1$; per $1 \le x \le 4$: $\displaystyle\int (x^{2} - 2 x + 2)\,dx = \frac{x^{3}}{3} - x^{2} + 2 x + k_2$.`,
    String.raw`**Continuità in $x = 1$**: $F$ è derivabile in $[0, 4]$, quindi continua; i limiti dei due rami devono coincidere: $\frac{8}{3} + k_1 = \frac{4}{3} + k_2$ , da cui $k_2 = k_1 + \frac{4}{3}$.`,
    String.raw`**Condizione** $F(2) = 1$: il punto $x_0 = 2$ sta nel ramo $1 \le x \le 4$, quindi $\frac{8}{3} + k_2 = 1$, cioè $k_2 = - \frac{5}{3}$ e $k_1 = -3$.`,
    String.raw`**Risultato**: $$F(x) = \begin{cases} - \frac{x^{3}}{3} - x^{2} + 4 x - 3 & 0 \le x < 1 \\[1mm] \frac{x^{3}}{3} - x^{2} + 2 x - \frac{5}{3} & 1 \le x \le 4 \end{cases}$$ Controllo: $F(2) = 1$ e i rami coincidono nei punti di raccordo.`
  ],
  answer: { fields: [
      { label: String.raw`F(x) per $0 \le x < 1$`,
        kind: "expr",
        expr: "-x**3/3 - x**2 + 4*x - 3",
        dom: [0.02, 0.98] },
      { label: String.raw`F(x) per $1 \le x \le 4$`,
        kind: "expr",
        expr: "x**3/3 - x**2 + 2*x - 5/3",
        dom: [1.06, 3.94] }
    ] },
  stepChk: [
    "simplify(diff(P('-x**3/3 - x**2 + 4*x'), x) - (P('-x**2 - 2*x + 4'))) == 0",
    "simplify(diff(P('x**3/3 - x**2 + 2*x'), x) - (P('x**2 - 2*x + 2'))) == 0",
    "simplify(P('1') - (P('1'))) == 0",
    "simplify(P('-x**3/3 - x**2 + 4*x - 3') - (P('-x**3/3 - x**2 + 4*x - 3'))) == 0",
    "simplify(P('x**3/3 - x**2 + 2*x - 5/3') - (P('x**3/3 - x**2 + 2*x - 5/3'))) == 0"
  ] },

{ id: "tr-app300124-a2",
  cap: 1,
  topic: "valore_assoluto",
  src: "Appello 30/01/2024 (seconda versione)",
  text: String.raw`Determinare la primitiva $F$ in $[0,4]$ della funzione $f(x) = |x^2-4| + x - 2$ tale che $F(3) = \frac92$.`,
  steps: [
    String.raw`**Scriviamo $f$ a tratti**, studiando il segno dell'argomento del valore assoluto: $$f(x) = \begin{cases} - x^{2} + x + 2 & 0 \le x < 2 \\ x^{2} + x - 6 & 2 \le x \le 4 \end{cases}$$`,
    String.raw`**Primitive dei singoli rami**, ognuna con la sua costante: per $0 \le x < 2$: $\displaystyle\int (- x^{2} + x + 2)\,dx = - \frac{x^{3}}{3} + \frac{x^{2}}{2} + 2 x + k_1$; per $2 \le x \le 4$: $\displaystyle\int (x^{2} + x - 6)\,dx = \frac{x^{3}}{3} + \frac{x^{2}}{2} - 6 x + k_2$.`,
    String.raw`**Continuità in $x = 2$**: $F$ è derivabile in $[0, 4]$, quindi continua; i limiti dei due rami devono coincidere: $\frac{10}{3} + k_1 = - \frac{22}{3} + k_2$ , da cui $k_2 = k_1 + \frac{32}{3}$.`,
    String.raw`**Condizione** $F(3) = \frac{9}{2}$: il punto $x_0 = 3$ sta nel ramo $2 \le x \le 4$, quindi $- \frac{9}{2} + k_2 = \frac{9}{2}$, cioè $k_2 = 9$ e $k_1 = - \frac{5}{3}$.`,
    String.raw`**Risultato**: $$F(x) = \begin{cases} - \frac{x^{3}}{3} + \frac{x^{2}}{2} + 2 x - \frac{5}{3} & 0 \le x < 2 \\[1mm] \frac{x^{3}}{3} + \frac{x^{2}}{2} - 6 x + 9 & 2 \le x \le 4 \end{cases}$$ Controllo: $F(3) = \frac{9}{2}$ e i rami coincidono nei punti di raccordo.`
  ],
  answer: { fields: [
      { label: String.raw`F(x) per $0 \le x < 2$`,
        kind: "expr",
        expr: "-x**3/3 + x**2/2 + 2*x - 5/3",
        dom: [0.04, 1.96] },
      { label: String.raw`F(x) per $2 \le x \le 4$`,
        kind: "expr",
        expr: "x**3/3 + x**2/2 - 6*x + 9",
        dom: [2.04, 3.96] }
    ] },
  stepChk: [
    "simplify(diff(P('-x**3/3 + x**2/2 + 2*x'), x) - (P('-x**2 + x + 2'))) == 0",
    "simplify(diff(P('x**3/3 + x**2/2 - 6*x'), x) - (P('x**2 + x - 6'))) == 0",
    "simplify(P('9/2') - (P('9/2'))) == 0",
    "simplify(P('-x**3/3 + x**2/2 + 2*x - 5/3') - (P('-x**3/3 + x**2/2 + 2*x - 5/3'))) == 0",
    "simplify(P('x**3/3 + x**2/2 - 6*x + 9') - (P('x**3/3 + x**2/2 - 6*x + 9'))) == 0"
  ] },

{ id: "tr-app150726-a",
  cap: 1,
  topic: "valore_assoluto",
  src: "Appello 15/07/2026 (= Lezione 27/10, es. 4)",
  text: String.raw`Determinare la primitiva $F$ in $]-\infty,+\infty[$ della funzione $f(x) = x^2e^{|x^3| + 2}$ tale che $F(1) = \frac43e^3$.`,
  steps: [
    String.raw`**Scriviamo $f$ a tratti**, studiando il segno dell'argomento del valore assoluto: $$f(x) = \begin{cases} x^{2} e^{2 - x^{3}} & x < 0 \\ x^{2} e^{x^{3} + 2} & x \ge 0 \end{cases}$$`,
    String.raw`**Primitive dei singoli rami**, ognuna con la sua costante (prima formula di sostituzione con $t = x^3$): per $x < 0$: $\displaystyle\int x^{2} e^{2 - x^{3}}\,dx = - \frac{e^{2 - x^{3}}}{3} + k_1$; per $x \ge 0$: $\displaystyle\int x^{2} e^{x^{3} + 2}\,dx = \frac{e^{x^{3} + 2}}{3} + k_2$.`,
    String.raw`**Continuità in $x = 0$**: $F$ è derivabile in $]-\infty, +\infty[$, quindi continua; i limiti dei due rami devono coincidere: $- \frac{e^{2}}{3} + k_1 = \frac{e^{2}}{3} + k_2$ , da cui $k_2 = k_1  - \frac{2 e^{2}}{3}$.`,
    String.raw`**Condizione** $F(1) = \frac{4 e^{3}}{3}$: il punto $x_0 = 1$ sta nel ramo $x \ge 0$, quindi $\frac{e^{3}}{3} + k_2 = \frac{4 e^{3}}{3}$, cioè $k_2 = e^{3}$ e $k_1 = (\frac{2}{3} + e) e^{2}$.`,
    String.raw`**Risultato**: $$F(x) = \begin{cases} -\dfrac13e^{2-x^3} + \dfrac23e^2 + e^3 & x < 0 \\[1mm] \dfrac13e^{x^3+2} + e^3 & x \ge 0 \end{cases}$$ Controllo: $F(1) = \frac{4 e^{3}}{3}$ e i rami coincidono nei punti di raccordo.`
  ],
  answer: { fields: [
      { label: String.raw`F(x) per $x < 0$`,
        kind: "expr",
        expr: "-exp(2 - x**3)/3 + (2/3 + E)*exp(2)",
        dom: [-3.0, -0.05] },
      { label: String.raw`F(x) per $x \ge 0$`,
        kind: "expr",
        expr: "exp(x**3 + 2)/3 + exp(3)",
        dom: [0.05, 3.0] }
    ] },
  stepChk: [
    "simplify(diff(P('-exp(2 - x**3)/3'), x) - (P('x**2*exp(2 - x**3)'))) == 0",
    "simplify(diff(P('exp(x**3 + 2)/3'), x) - (P('x**2*exp(x**3 + 2)'))) == 0",
    "simplify(P('4*exp(3)/3') - (P('4*exp(3)/3'))) == 0",
    "simplify(P('-exp(2 - x**3)/3 + (2/3 + E)*exp(2)') - (P('-exp(2 - x**3)/3 + 2*exp(2)/3 + exp(3)'))) == 0",
    "simplify(P('exp(x**3 + 2)/3 + exp(3)') - (P('exp(x**3 + 2)/3 + exp(3)'))) == 0"
  ] },

{ id: "tr-app180226-a",
  cap: 1,
  topic: "valore_assoluto",
  src: "Appello 18/02/2026",
  text: String.raw`Determinare la primitiva $F$ in $]-\infty,+\infty[$ della funzione $f(x) = e^{x - |x-2|}$ tale che $F(1) = \frac32e^2$.`,
  steps: [
    String.raw`**Scriviamo $f$ a tratti**, studiando il segno dell'argomento del valore assoluto: $$f(x) = \begin{cases} e^{2 x - 2} & x < 2 \\ e^{2} & x \ge 2 \end{cases}$$`,
    String.raw`**Primitive dei singoli rami**, ognuna con la sua costante: per $x < 2$: $\displaystyle\int e^{2 x - 2}\,dx = \frac{e^{2 x - 2}}{2} + k_1$; per $x \ge 2$: $\displaystyle\int e^{2}\,dx = x e^{2} + k_2$.`,
    String.raw`**Continuità in $x = 2$**: $F$ è derivabile in $]-\infty, +\infty[$, quindi continua; i limiti dei due rami devono coincidere: $\frac{e^{2}}{2} + k_1 = 2 e^{2} + k_2$ , da cui $k_2 = k_1  - \frac{3 e^{2}}{2}$.`,
    String.raw`**Condizione** $F(1) = \frac{3 e^{2}}{2}$: il punto $x_0 = 1$ sta nel ramo $x < 2$, quindi $\frac{1}{2} + k_1 = \frac{3 e^{2}}{2}$, cioè $k_1 = - \frac{1}{2} + \frac{3 e^{2}}{2}$.`,
    String.raw`**Risultato**: $$F(x) = \begin{cases} \frac{e^{2 x - 2}}{2} - \frac{1}{2} + \frac{3 e^{2}}{2} & x < 2 \\[1mm] x e^{2} - \frac{1}{2} & x \ge 2 \end{cases}$$ Controllo: $F(1) = \frac{3 e^{2}}{2}$ e i rami coincidono nei punti di raccordo.`
  ],
  answer: { fields: [
      { label: String.raw`F(x) per $x < 2$`,
        kind: "expr",
        expr: "exp(2*x - 2)/2 - 1/2 + 3*exp(2)/2",
        dom: [-1.0, 1.95] },
      { label: String.raw`F(x) per $x \ge 2$`,
        kind: "expr",
        expr: "x*exp(2) - 1/2",
        dom: [2.05, 5.0] }
    ] },
  stepChk: [
    "simplify(diff(P('exp(2*x - 2)/2'), x) - (P('exp(2*x - 2)'))) == 0",
    "simplify(diff(P('x*exp(2)'), x) - (P('exp(2)'))) == 0",
    "simplify(P('3*exp(2)/2') - (P('3*exp(2)/2'))) == 0",
    "simplify(P('exp(2*x - 2)/2 - 1/2 + 3*exp(2)/2') - (P('exp(2*x - 2)/2 - 1/2 + 3*exp(2)/2'))) == 0",
    "simplify(P('x*exp(2) - 1/2') - (P('x*exp(2) - 1/2'))) == 0"
  ] },

{ id: "tr-app140425-a",
  cap: 1,
  topic: "valore_assoluto",
  src: "Appello 14/04/2025",
  text: String.raw`Determinare la primitiva $F$ in $[0,8]$ della funzione $f(x) = \log(|x-2| + 3)$ tale che $F(e^2-1) = e^2$.`,
  steps: [
    String.raw`**Scriviamo $f$ a tratti**, studiando il segno dell'argomento del valore assoluto: $$f(x) = \begin{cases} \log(5 - x) & 0 \le x < 2 \\ \log(x + 1) & 2 \le x \le 8 \end{cases}$$`,
    String.raw`**Primitive dei singoli rami**, ognuna con la sua costante (per parti con FF il logaritmo e FD $1$): per $0 \le x < 2$: $\displaystyle\int \log(5 - x)\,dx = - x + (x - 5) \log(5 - x) + k_1$; per $2 \le x \le 8$: $\displaystyle\int \log(x + 1)\,dx = - x + (x + 1) \log(x + 1) + k_2$.`,
    String.raw`**Continuità in $x = 2$**: $F$ è derivabile in $[0, 8]$, quindi continua; i limiti dei due rami devono coincidere: $- 3 \log(3) - 2 + k_1 = -2 + 3 \log(3) + k_2$ , da cui $k_2 = k_1  - \log(729)$.`,
    String.raw`**Condizione** $F(-1 + e^{2}) = e^{2}$: il punto $x_0 = -1 + e^{2}$ sta nel ramo $2 \le x \le 8$, quindi $1 + e^{2} + k_2 = e^{2}$, cioè $k_2 = -1$ e $k_1 = -1 + 6 \log(3)$.`,
    String.raw`**Risultato**: $$F(x) = \begin{cases} - x + (x - 5) \log(5 - x) - 1 + 6 \log(3) & 0 \le x < 2 \\[1mm] - x + (x + 1) \log(x + 1) - 1 & 2 \le x \le 8 \end{cases}$$ Controllo: $F(-1 + e^{2}) = e^{2}$ e i rami coincidono nei punti di raccordo.`
  ],
  answer: { fields: [
      { label: String.raw`F(x) per $0 \le x < 2$`,
        kind: "expr",
        expr: "-x + (x - 5)*log(5 - x) - 1 + 6*log(3)",
        dom: [0.04, 1.96] },
      { label: String.raw`F(x) per $2 \le x \le 8$`,
        kind: "expr",
        expr: "-x + (x + 1)*log(x + 1) - 1",
        dom: [2.12, 7.88] }
    ] },
  stepChk: [
    "simplify(diff(P('-x + (x - 5)*log(5 - x)'), x) - (P('log(5 - x)'))) == 0",
    "simplify(diff(P('-x + (x + 1)*log(x + 1)'), x) - (P('log(x + 1)'))) == 0",
    "simplify(P('exp(2)') - (P('exp(2)'))) == 0",
    "simplify(P('-x + (x - 5)*log(5 - x) - 1 + 6*log(3)') - (P('-x + (x - 5)*log(5 - x) - 1 + 6*log(3)'))) == 0",
    "simplify(P('-x + (x + 1)*log(x + 1) - 1') - (P('-x + (x + 1)*log(x + 1) - 1'))) == 0"
  ] },

{ id: "tr-app170925-a",
  cap: 1,
  topic: "parti",
  src: "Appello 17/09/2025",
  text: String.raw`Determinare la primitiva $F$ in $]-\infty,+\infty[$ della funzione $f(x) = x\cos^2x + x^2\sin x$ tale che $F(\frac\pi2) = \frac{\pi^2}{16}$.`,
  steps: [
    String.raw`**Primitive** di $f$ in $]-\infty, +\infty[$ (bisezione $\cos^2x = \frac{1+\cos 2x}{2}$ e poi per parti): $\displaystyle\int f(x)\,dx = - x^{2} \cos x  + \frac{x^{2}}{4} + 2 x \sin x  + \frac{x \sin 2 x }{4} + 2 \cos x  + \frac{\cos 2 x }{8} + \frac{1}{8} + k$.`,
    String.raw`**Condizione** $F(\frac{\pi}{2}) = \frac{\pi^{2}}{16}$: $\frac{\pi^{2}}{16} + \pi + k = \frac{\pi^{2}}{16}$, quindi $k = - \pi$.`,
    String.raw`**Risultato**: $F(x) = -x^2\cos x + 2x\sin x + 2\cos x + \dfrac{x^2}{4} + \dfrac x4\sin 2x + \dfrac18\cos 2x - \pi + \dfrac18$.`
  ],
  answer: { fields: [
      { label: "F(x)",
        kind: "expr",
        expr: "-x**2*cos(x) + x**2/4 + 2*x*sin(x) + x*sin(2*x)/4 + 2*cos(x) + cos(2*x)/8 - pi + 1/8",
        dom: [-2.0, 2.0] }
    ] },
  stepChk: [
    "simplify(diff(P('-x**2*cos(x) + x**2/4 + 2*x*sin(x) + x*sin(2*x)/4 + 2*cos(x) + cos(2*x)/8 + 1/8'), x) - (P('x*(x*sin(x) + cos(x)**2)'))) == 0",
    "simplify(P('pi**2/16') - (P('pi**2/16'))) == 0",
    "simplify(P('-x**2*cos(x) + x**2/4 + 2*x*sin(x) + x*sin(2*x)/4 + 2*cos(x) + cos(2*x)/8 - pi + 1/8') - (P('-x**2*cos(x) + x**2/4 + 2*x*sin(x) + x*sin(2*x)/4 + 2*cos(x) + cos(2*x)/8 - pi + 1/8'))) == 0"
  ] },

{ id: "tr-pi25-b1",
  cap: 2,
  topic: "cauchy",
  src: "P.I. 9/12/2025, compito B (prima versione)",
  text: String.raw`Risolvere il problema di Cauchy $$\begin{cases} y'' - y = \dfrac{x+1}{e^x} \\ y(0) = 1 \\ y'(0) = -\frac34 \end{cases}$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' - y = 0$. Equazione caratteristica $\alpha^{2} - 1 = 0$: $\alpha = -1$, $\alpha = 1$. Integrale generale dell'omogenea: $k_1e^{- x} + k_2e^{x}$.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Termine noto del tipo $e^{hx}p(x)$ con $h = -1$, $m = 1$. $-1$ è radice dell'equazione caratteristica (con molteplicità 1), quindi $s = 1$: si cerca $\bar y = x (a x + b) e^{- x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{- x}$ si ottiene $- 4 a x + 2 a - 2 b = x + 1$; per il principio di identità dei polinomi $a = - \frac{1}{4}, b = - \frac{3}{4}$. Quindi $\bar y = x (- \frac{x}{4} - \frac{3}{4}) e^{- x}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1e^{- x} + k_2e^{x} - \frac{x (x + 3) e^{- x}}{4}$.`,
    String.raw`**Condizioni iniziali** (sull'integrale generale della completa): $y(0) = k_{1} + k_{2} = 1$, $y'(0) = - k_{1} + k_{2} - \frac{3}{4} = - \frac{3}{4}$. Risolvendo il sistema: $k_1 = \frac{1}{2}$, $k_2 = \frac{1}{2}$.`,
    String.raw`**Soluzione** del problema di Cauchy: $y(x) = \frac12e^x + e^{-x}\left(-\frac{x^2}{4} - \frac{3x}{4} + \frac12\right)$.`
  ],
  answer: { fields: [
      { label: "y(x)",
        kind: "expr",
        expr: "(-x*(x + 3) + 2*exp(2*x) + 2)*exp(-x)/4",
        dom: [-1.5, 1.5] }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('x*(-x/4 - 3/4)*exp(-x)'), x, 2) + (-1)*diff(P('x*(-x/4 - 3/4)*exp(-x)'), x, 0) - (P('(x + 1)*exp(-x)')))) == 0",
    "simplify(P('(-x*(x + 3) + 2*exp(2*x) + 2)*exp(-x)/4') - (P('(-x**2/4 - 3*x/4 + 1/2)*exp(-x) + exp(x)/2'))) == 0",
    "simplify(expand((1)*diff(P('(-x*(x + 3) + 2*exp(2*x) + 2)*exp(-x)/4'), x, 2) + (-1)*diff(P('(-x*(x + 3) + 2*exp(2*x) + 2)*exp(-x)/4'), x, 0) - (P('(x + 1)*exp(-x)')))) == 0"
  ] },

{ id: "tr-pi25-b2",
  cap: 2,
  topic: "cauchy",
  src: "P.I. 9/12/2025, compito B (seconda versione)",
  text: String.raw`Risolvere il problema di Cauchy $$\begin{cases} y'' - 9y = \dfrac{2}{e^{3x}} \\ y(0) = 1 \\ y'(0) = \frac23 \end{cases}$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' - 9y = 0$. Equazione caratteristica $\alpha^{2} - 9 = 0$: $\alpha = -3$, $\alpha = 3$. Integrale generale dell'omogenea: $k_1e^{- 3 x} + k_2e^{3 x}$.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Termine noto del tipo $e^{hx}p(x)$ con $h = -3$, $m = 0$. $-3$ è radice dell'equazione caratteristica (con molteplicità 1), quindi $s = 1$: si cerca $\bar y = a x e^{- 3 x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{- 3 x}$ si ottiene $- 6 a = 2$; per il principio di identità dei polinomi $a = - \frac{1}{3}$. Quindi $\bar y = - \frac{x e^{- 3 x}}{3}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1e^{- 3 x} + k_2e^{3 x} - \frac{x e^{- 3 x}}{3}$.`,
    String.raw`**Condizioni iniziali** (sull'integrale generale della completa): $y(0) = k_{1} + k_{2} = 1$, $y'(0) = - 3 k_{1} + 3 k_{2} - \frac{1}{3} = \frac{2}{3}$. Risolvendo il sistema: $k_1 = \frac{1}{3}$, $k_2 = \frac{2}{3}$.`,
    String.raw`**Soluzione** del problema di Cauchy: $y(x) = \frac23e^{3x} + \frac13e^{-3x} - \frac13xe^{-3x}$.`
  ],
  answer: { fields: [
      { label: "y(x)",
        kind: "expr",
        expr: "(-x + 2*exp(6*x) + 1)*exp(-3*x)/3",
        dom: [-1.5, 1.5] }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('-x*exp(-3*x)/3'), x, 2) + (-9)*diff(P('-x*exp(-3*x)/3'), x, 0) - (P('2*exp(-3*x)')))) == 0",
    "simplify(P('(-x + 2*exp(6*x) + 1)*exp(-3*x)/3') - (P('-x*exp(-3*x)/3 + 2*exp(3*x)/3 + exp(-3*x)/3'))) == 0",
    "simplify(expand((1)*diff(P('(-x + 2*exp(6*x) + 1)*exp(-3*x)/3'), x, 2) + (-9)*diff(P('(-x + 2*exp(6*x) + 1)*exp(-3*x)/3'), x, 0) - (P('2*exp(-3*x)')))) == 0"
  ] },

{ id: "tr-pi25-b3",
  cap: 2,
  topic: "cauchy",
  src: "P.I. 9/12/2025, compito B (terza versione)",
  text: String.raw`Risolvere il problema di Cauchy $$\begin{cases} y'' - y = e^x(x+2) \\ y(0) = -1 \\ y'(0) = \frac74 \end{cases}$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' - y = 0$. Equazione caratteristica $\alpha^{2} - 1 = 0$: $\alpha = -1$, $\alpha = 1$. Integrale generale dell'omogenea: $k_1e^{- x} + k_2e^{x}$.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Termine noto del tipo $e^{hx}p(x)$ con $h = 1$, $m = 1$. $1$ è radice dell'equazione caratteristica (con molteplicità 1), quindi $s = 1$: si cerca $\bar y = x (a x + b) e^{x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{x}$ si ottiene $4 a x + 2 a + 2 b = x + 2$; per il principio di identità dei polinomi $a = \frac{1}{4}, b = \frac{3}{4}$. Quindi $\bar y = x (\frac{x}{4} + \frac{3}{4}) e^{x}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1e^{- x} + k_2e^{x} + \frac{x (x + 3) e^{x}}{4}$.`,
    String.raw`**Condizioni iniziali** (sull'integrale generale della completa): $y(0) = k_{1} + k_{2} = -1$, $y'(0) = - k_{1} + k_{2} + \frac{3}{4} = \frac{7}{4}$. Risolvendo il sistema: $k_1 = -1$, $k_2 = 0$.`,
    String.raw`**Soluzione** del problema di Cauchy: $y(x) = e^x\left(\frac{x^2}{4} + \frac{3x}{4}\right) - e^{-x}$.`
  ],
  answer: { fields: [
      { label: "y(x)",
        kind: "expr",
        expr: "(x*(x + 3)*exp(2*x) - 4)*exp(-x)/4",
        dom: [-1.5, 1.5] }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('x*(x/4 + 3/4)*exp(x)'), x, 2) + (-1)*diff(P('x*(x/4 + 3/4)*exp(x)'), x, 0) - (P('(x + 2)*exp(x)')))) == 0",
    "simplify(P('(x*(x + 3)*exp(2*x) - 4)*exp(-x)/4') - (P('(x**2/4 + 3*x/4)*exp(x) - exp(-x)'))) == 0",
    "simplify(expand((1)*diff(P('(x*(x + 3)*exp(2*x) - 4)*exp(-x)/4'), x, 2) + (-1)*diff(P('(x*(x + 3)*exp(2*x) - 4)*exp(-x)/4'), x, 0) - (P('(x + 2)*exp(x)')))) == 0"
  ] },

{ id: "tr-pi25-b4",
  cap: 2,
  topic: "cauchy",
  src: "P.I. 9/12/2025, compito B (quarta versione)",
  text: String.raw`Risolvere il problema di Cauchy $$\begin{cases} y'' - 4y = e^{2x}(2x+3) \\ y(0) = 0 \\ y'(0) = \frac{13}{8} \end{cases}$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' - 4y = 0$. Equazione caratteristica $\alpha^{2} - 4 = 0$: $\alpha = -2$, $\alpha = 2$. Integrale generale dell'omogenea: $k_1e^{- 2 x} + k_2e^{2 x}$.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Termine noto del tipo $e^{hx}p(x)$ con $h = 2$, $m = 1$. $2$ è radice dell'equazione caratteristica (con molteplicità 1), quindi $s = 1$: si cerca $\bar y = x (a x + b) e^{2 x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{2 x}$ si ottiene $8 a x + 2 a + 4 b = 2 x + 3$; per il principio di identità dei polinomi $a = \frac{1}{4}, b = \frac{5}{8}$. Quindi $\bar y = x (\frac{x}{4} + \frac{5}{8}) e^{2 x}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1e^{- 2 x} + k_2e^{2 x} + \frac{x (2 x + 5) e^{2 x}}{8}$.`,
    String.raw`**Condizioni iniziali** (sull'integrale generale della completa): $y(0) = k_{1} + k_{2} = 0$, $y'(0) = - 2 k_{1} + 2 k_{2} + \frac{5}{8} = \frac{13}{8}$. Risolvendo il sistema: $k_1 = - \frac{1}{4}$, $k_2 = \frac{1}{4}$.`,
    String.raw`**Soluzione** del problema di Cauchy: $y(x) = e^{2x}\left(\frac{x^2}{4} + \frac{5x}{8} + \frac14\right) - \frac14e^{-2x}$.`
  ],
  answer: { fields: [
      { label: "y(x)",
        kind: "expr",
        expr: "((x*(2*x + 5) + 2)*exp(4*x) - 2)*exp(-2*x)/8",
        dom: [-1.5, 1.5] }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('x*(x/4 + 5/8)*exp(2*x)'), x, 2) + (-4)*diff(P('x*(x/4 + 5/8)*exp(2*x)'), x, 0) - (P('(2*x + 3)*exp(2*x)')))) == 0",
    "simplify(P('((x*(2*x + 5) + 2)*exp(4*x) - 2)*exp(-2*x)/8') - (P('(x**2/4 + 5*x/8 + 1/4)*exp(2*x) - exp(-2*x)/4'))) == 0",
    "simplify(expand((1)*diff(P('((x*(2*x + 5) + 2)*exp(4*x) - 2)*exp(-2*x)/8'), x, 2) + (-4)*diff(P('((x*(2*x + 5) + 2)*exp(4*x) - 2)*exp(-2*x)/8'), x, 0) - (P('(2*x + 3)*exp(2*x)')))) == 0"
  ] },

{ id: "tr-sim25-al-b",
  cap: 2,
  topic: "cauchy",
  src: "Simulazione P.I. 2025, canale AL",
  text: String.raw`Risolvere il problema di Cauchy $$\begin{cases} y'' - 4y' + 4y = e^{2x}(x+1) \\ y(0) = 3 \\ y'(0) = -1 \end{cases}$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' - 4y' + 4y = 0$. Equazione caratteristica $\alpha^{2} - 4 \alpha + 4 = 0$: $\alpha = 2$ (molteplicità 2). Integrale generale dell'omogenea: $k_1e^{2 x} + k_2x e^{2 x}$.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Termine noto del tipo $e^{hx}p(x)$ con $h = 2$, $m = 1$. $2$ è radice dell'equazione caratteristica (con molteplicità 2), quindi $s = 2$: si cerca $\bar y = x^{2} (a x + b) e^{2 x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{2 x}$ si ottiene $6 a x + 2 b = x + 1$; per il principio di identità dei polinomi $a = \frac{1}{6}, b = \frac{1}{2}$. Quindi $\bar y = x^{2} (\frac{x}{6} + \frac{1}{2}) e^{2 x}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1e^{2 x} + k_2x e^{2 x} + \frac{x^{2} (x + 3) e^{2 x}}{6}$.`,
    String.raw`**Condizioni iniziali** (sull'integrale generale della completa): $y(0) = k_{1} = 3$, $y'(0) = 2 k_{1} + k_{2} = -1$. Risolvendo il sistema: $k_1 = 3$, $k_2 = -7$.`,
    String.raw`**Soluzione** del problema di Cauchy: $y(x) = e^{2x}\left(\frac{x^3}{6} + \frac{x^2}{2} - 7x + 3\right)$.`
  ],
  answer: { fields: [
      { label: "y(x)",
        kind: "expr",
        expr: "(x**2*(x + 3) - 42*x + 18)*exp(2*x)/6",
        dom: [-1.5, 1.5] }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('x**2*(x/6 + 1/2)*exp(2*x)'), x, 2) + (-4)*diff(P('x**2*(x/6 + 1/2)*exp(2*x)'), x, 1) + (4)*diff(P('x**2*(x/6 + 1/2)*exp(2*x)'), x, 0) - (P('(x + 1)*exp(2*x)')))) == 0",
    "simplify(P('(x**2*(x + 3) - 42*x + 18)*exp(2*x)/6') - (P('(x**3/6 + x**2/2 - 7*x + 3)*exp(2*x)'))) == 0",
    "simplify(expand((1)*diff(P('(x**2*(x + 3) - 42*x + 18)*exp(2*x)/6'), x, 2) + (-4)*diff(P('(x**2*(x + 3) - 42*x + 18)*exp(2*x)/6'), x, 1) + (4)*diff(P('(x**2*(x + 3) - 42*x + 18)*exp(2*x)/6'), x, 0) - (P('(x + 1)*exp(2*x)')))) == 0"
  ] },

{ id: "tr-sim25-mz-b",
  cap: 2,
  topic: "cauchy",
  src: "Simulazione P.I. 2025, canale MZ",
  text: String.raw`Risolvere il problema di Cauchy $$\begin{cases} y'' - 2y' + y = e^{2x}(x^2+3) \\ y(0) = 2 \\ y'(0) = 1 \end{cases}$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' - 2y' + y = 0$. Equazione caratteristica $\alpha^{2} - 2 \alpha + 1 = 0$: $\alpha = 1$ (molteplicità 2). Integrale generale dell'omogenea: $k_1e^{x} + k_2x e^{x}$.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Termine noto del tipo $e^{hx}p(x)$ con $h = 2$, $m = 2$. $2$ non è radice dell'equazione caratteristica, quindi $s = 0$: si cerca $\bar y = (a x^{2} + b x + c) e^{2 x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{2 x}$ si ottiene $a x^{2} + 2 a + 2 b + c + x (4 a + b) = x^{2} + 3$; per il principio di identità dei polinomi $a = 1, b = -4, c = 9$. Quindi $\bar y = (x^{2} - 4 x + 9) e^{2 x}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1e^{x} + k_2x e^{x} + (x^{2} - 4 x + 9) e^{2 x}$.`,
    String.raw`**Condizioni iniziali** (sull'integrale generale della completa): $y(0) = k_{1} + 9 = 2$, $y'(0) = k_{1} + k_{2} + 14 = 1$. Risolvendo il sistema: $k_1 = -7$, $k_2 = -6$.`,
    String.raw`**Soluzione** del problema di Cauchy: $y(x) = e^{2x}(x^2 - 4x + 9) - e^x(6x + 7)$.`
  ],
  answer: { fields: [
      { label: "y(x)",
        kind: "expr",
        expr: "(-6*x + (x**2 - 4*x + 9)*exp(x) - 7)*exp(x)",
        dom: [-1.5, 1.5] }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('(x**2 - 4*x + 9)*exp(2*x)'), x, 2) + (-2)*diff(P('(x**2 - 4*x + 9)*exp(2*x)'), x, 1) + (1)*diff(P('(x**2 - 4*x + 9)*exp(2*x)'), x, 0) - (P('(x**2 + 3)*exp(2*x)')))) == 0",
    "simplify(P('(-6*x + (x**2 - 4*x + 9)*exp(x) - 7)*exp(x)') - (P('-(6*x + 7)*exp(x) + (x**2 - 4*x + 9)*exp(2*x)'))) == 0",
    "simplify(expand((1)*diff(P('(-6*x + (x**2 - 4*x + 9)*exp(x) - 7)*exp(x)'), x, 2) + (-2)*diff(P('(-6*x + (x**2 - 4*x + 9)*exp(x) - 7)*exp(x)'), x, 1) + (1)*diff(P('(-6*x + (x**2 - 4*x + 9)*exp(x) - 7)*exp(x)'), x, 0) - (P('(x**2 + 3)*exp(2*x)')))) == 0"
  ] },

{ id: "tr-rec150224-b",
  cap: 2,
  topic: "cauchy",
  src: "Recupero 15/02/2024",
  text: String.raw`Risolvere il problema di Cauchy $$\begin{cases} y'' - y' - 2y = \dfrac{2x+1}{e^x} \\ y(0) = 1 \\ y'(0) = \frac59 \end{cases}$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' - y' - 2y = 0$. Equazione caratteristica $\alpha^{2} - \alpha - 2 = 0$: $\alpha = -1$, $\alpha = 2$. Integrale generale dell'omogenea: $k_1e^{- x} + k_2e^{2 x}$.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Termine noto del tipo $e^{hx}p(x)$ con $h = -1$, $m = 1$. $-1$ è radice dell'equazione caratteristica (con molteplicità 1), quindi $s = 1$: si cerca $\bar y = x (a x + b) e^{- x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{- x}$ si ottiene $- 6 a x + 2 a - 3 b = 2 x + 1$; per il principio di identità dei polinomi $a = - \frac{1}{3}, b = - \frac{5}{9}$. Quindi $\bar y = x (- \frac{x}{3} - \frac{5}{9}) e^{- x}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1e^{- x} + k_2e^{2 x} - \frac{x (3 x + 5) e^{- x}}{9}$.`,
    String.raw`**Condizioni iniziali** (sull'integrale generale della completa): $y(0) = k_{1} + k_{2} = 1$, $y'(0) = - k_{1} + 2 k_{2} - \frac{5}{9} = \frac{5}{9}$. Risolvendo il sistema: $k_1 = \frac{8}{27}$, $k_2 = \frac{19}{27}$.`,
    String.raw`**Soluzione** del problema di Cauchy: $y(x) = \frac{19}{27}e^{2x} + e^{-x}\left(-\frac{x^2}{3} - \frac{5x}{9} + \frac{8}{27}\right)$.`
  ],
  answer: { fields: [
      { label: "y(x)",
        kind: "expr",
        expr: "(-3*x*(3*x + 5) + 19*exp(3*x) + 8)*exp(-x)/27",
        dom: [-1.5, 1.5] }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('x*(-x/3 - 5/9)*exp(-x)'), x, 2) + (-1)*diff(P('x*(-x/3 - 5/9)*exp(-x)'), x, 1) + (-2)*diff(P('x*(-x/3 - 5/9)*exp(-x)'), x, 0) - (P('(2*x + 1)*exp(-x)')))) == 0",
    "simplify(P('(-3*x*(3*x + 5) + 19*exp(3*x) + 8)*exp(-x)/27') - (P('(-x**2/3 - 5*x/9 + 8/27)*exp(-x) + 19*exp(2*x)/27'))) == 0",
    "simplify(expand((1)*diff(P('(-3*x*(3*x + 5) + 19*exp(3*x) + 8)*exp(-x)/27'), x, 2) + (-1)*diff(P('(-3*x*(3*x + 5) + 19*exp(3*x) + 8)*exp(-x)/27'), x, 1) + (-2)*diff(P('(-3*x*(3*x + 5) + 19*exp(3*x) + 8)*exp(-x)/27'), x, 0) - (P('(2*x + 1)*exp(-x)')))) == 0"
  ] },

{ id: "tr-app260624-b",
  cap: 2,
  topic: "cauchy",
  src: "Appello 26/06/2024",
  text: String.raw`Risolvere il problema di Cauchy $$\begin{cases} y'' - 6y' + 9y = e^{3x}(x+4) \\ y(1) = 2e^3 \\ y'(1) = e^3 \end{cases}$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' - 6y' + 9y = 0$. Equazione caratteristica $\alpha^{2} - 6 \alpha + 9 = 0$: $\alpha = 3$ (molteplicità 2). Integrale generale dell'omogenea: $k_1e^{3 x} + k_2x e^{3 x}$.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Termine noto del tipo $e^{hx}p(x)$ con $h = 3$, $m = 1$. $3$ è radice dell'equazione caratteristica (con molteplicità 2), quindi $s = 2$: si cerca $\bar y = x^{2} (a x + b) e^{3 x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{3 x}$ si ottiene $6 a x + 2 b = x + 4$; per il principio di identità dei polinomi $a = \frac{1}{6}, b = 2$. Quindi $\bar y = x^{2} (\frac{x}{6} + 2) e^{3 x}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1e^{3 x} + k_2x e^{3 x} + \frac{x^{2} (x + 12) e^{3 x}}{6}$.`,
    String.raw`**Condizioni iniziali** (sull'integrale generale della completa): $y(1) = (k_{1} + k_{2} + \frac{13}{6}) e^{3} = 2 e^{3}$, $y'(1) = (3 k_{1} + 4 k_{2} + 11) e^{3} = e^{3}$. Risolvendo il sistema: $k_1 = \frac{28}{3}$, $k_2 = - \frac{19}{2}$.`,
    String.raw`**Soluzione** del problema di Cauchy: $y(x) = e^{3x}\,\frac{x^3 + 12x^2 - 57x + 56}{6}$.`
  ],
  answer: { fields: [
      { label: "y(x)",
        kind: "expr",
        expr: "(x**2*(x + 12) - 57*x + 56)*exp(3*x)/6",
        dom: [0.0, 2.0] }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('x**2*(x/6 + 2)*exp(3*x)'), x, 2) + (-6)*diff(P('x**2*(x/6 + 2)*exp(3*x)'), x, 1) + (9)*diff(P('x**2*(x/6 + 2)*exp(3*x)'), x, 0) - (P('(x + 4)*exp(3*x)')))) == 0",
    "simplify(P('(x**2*(x + 12) - 57*x + 56)*exp(3*x)/6') - (P('(x**3 + 12*x**2 - 57*x + 56)*exp(3*x)/6'))) == 0",
    "simplify(expand((1)*diff(P('(x**2*(x + 12) - 57*x + 56)*exp(3*x)/6'), x, 2) + (-6)*diff(P('(x**2*(x + 12) - 57*x + 56)*exp(3*x)/6'), x, 1) + (9)*diff(P('(x**2*(x + 12) - 57*x + 56)*exp(3*x)/6'), x, 0) - (P('(x + 4)*exp(3*x)')))) == 0"
  ] },

{ id: "tr-app240626-b",
  cap: 2,
  topic: "cauchy",
  src: "Appello 24/06/2026",
  text: String.raw`Risolvere il problema di Cauchy $$\begin{cases} y'' - y = \dfrac{x+1}{e^x} \\ y(0) = 0 \\ y'(0) = -\frac34 \end{cases}$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' - y = 0$. Equazione caratteristica $\alpha^{2} - 1 = 0$: $\alpha = -1$, $\alpha = 1$. Integrale generale dell'omogenea: $k_1e^{- x} + k_2e^{x}$.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Termine noto del tipo $e^{hx}p(x)$ con $h = -1$, $m = 1$. $-1$ è radice dell'equazione caratteristica (con molteplicità 1), quindi $s = 1$: si cerca $\bar y = x (a x + b) e^{- x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{- x}$ si ottiene $- 4 a x + 2 a - 2 b = x + 1$; per il principio di identità dei polinomi $a = - \frac{1}{4}, b = - \frac{3}{4}$. Quindi $\bar y = x (- \frac{x}{4} - \frac{3}{4}) e^{- x}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1e^{- x} + k_2e^{x} - \frac{x (x + 3) e^{- x}}{4}$.`,
    String.raw`**Condizioni iniziali** (sull'integrale generale della completa): $y(0) = k_{1} + k_{2} = 0$, $y'(0) = - k_{1} + k_{2} - \frac{3}{4} = - \frac{3}{4}$. Risolvendo il sistema: $k_1 = 0$, $k_2 = 0$.`,
    String.raw`**Soluzione** del problema di Cauchy: $y(x) = -\frac{x^2 + 3x}{4}e^{-x}$.`
  ],
  answer: { fields: [
      { label: "y(x)",
        kind: "expr",
        expr: "-x*(x + 3)*exp(-x)/4",
        dom: [-1.5, 1.5] }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('x*(-x/4 - 3/4)*exp(-x)'), x, 2) + (-1)*diff(P('x*(-x/4 - 3/4)*exp(-x)'), x, 0) - (P('(x + 1)*exp(-x)')))) == 0",
    "simplify(P('-x*(x + 3)*exp(-x)/4') - (P('(-x**2/4 - 3*x/4)*exp(-x)'))) == 0",
    "simplify(expand((1)*diff(P('-x*(x + 3)*exp(-x)/4'), x, 2) + (-1)*diff(P('-x*(x + 3)*exp(-x)/4'), x, 0) - (P('(x + 1)*exp(-x)')))) == 0"
  ] },

{ id: "tr-app230926-b",
  cap: 2,
  topic: "cauchy",
  src: "Appello 23/09/2026",
  text: String.raw`Risolvere il problema di Cauchy $$\begin{cases} y'' - 2y' + y = xe^x \\ y(0) = 2 \\ y'(0) = 3 \end{cases}$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' - 2y' + y = 0$. Equazione caratteristica $\alpha^{2} - 2 \alpha + 1 = 0$: $\alpha = 1$ (molteplicità 2). Integrale generale dell'omogenea: $k_1e^{x} + k_2x e^{x}$.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Termine noto del tipo $e^{hx}p(x)$ con $h = 1$, $m = 1$. $1$ è radice dell'equazione caratteristica (con molteplicità 2), quindi $s = 2$: si cerca $\bar y = x^{2} (a x + b) e^{x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{x}$ si ottiene $6 a x + 2 b = x$; per il principio di identità dei polinomi $a = \frac{1}{6}, b = 0$. Quindi $\bar y = \frac{x^{3} e^{x}}{6}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1e^{x} + k_2x e^{x} + \frac{x^{3} e^{x}}{6}$.`,
    String.raw`**Condizioni iniziali** (sull'integrale generale della completa): $y(0) = k_{1} = 2$, $y'(0) = k_{1} + k_{2} = 3$. Risolvendo il sistema: $k_1 = 2$, $k_2 = 1$.`,
    String.raw`**Soluzione** del problema di Cauchy: $y(x) = e^x\left(\frac{x^3}{6} + x + 2\right)$.`
  ],
  answer: { fields: [
      { label: "y(x)",
        kind: "expr",
        expr: "(x**3/6 + x + 2)*exp(x)",
        dom: [-1.5, 1.5] }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('x**3*exp(x)/6'), x, 2) + (-2)*diff(P('x**3*exp(x)/6'), x, 1) + (1)*diff(P('x**3*exp(x)/6'), x, 0) - (P('x*exp(x)')))) == 0",
    "simplify(P('(x**3/6 + x + 2)*exp(x)') - (P('(x**3/6 + x + 2)*exp(x)'))) == 0",
    "simplify(expand((1)*diff(P('(x**3/6 + x + 2)*exp(x)'), x, 2) + (-2)*diff(P('(x**3/6 + x + 2)*exp(x)'), x, 1) + (1)*diff(P('(x**3/6 + x + 2)*exp(x)'), x, 0) - (P('x*exp(x)')))) == 0"
  ] },

{ id: "tr-app031225-b",
  cap: 2,
  topic: "cauchy",
  src: "Appello 03/12/2025",
  text: String.raw`Risolvere il problema di Cauchy $$\begin{cases} y'' - 4y' + 4y = x \\ y(0) = \frac54 \\ y'(0) = \frac94 \end{cases}$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' - 4y' + 4y = 0$. Equazione caratteristica $\alpha^{2} - 4 \alpha + 4 = 0$: $\alpha = 2$ (molteplicità 2). Integrale generale dell'omogenea: $k_1e^{2 x} + k_2x e^{2 x}$.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Termine noto del tipo $e^{hx}p(x)$ con $h = 0$, $m = 1$. $0$ non è radice dell'equazione caratteristica, quindi $s = 0$: si cerca $\bar y = a x + b$.`,
    String.raw`Derivando e sostituendo si ottiene $4 a x - 4 a + 4 b = x$; per il principio di identità dei polinomi $a = \frac{1}{4}, b = \frac{1}{4}$. Quindi $\bar y = \frac{x}{4} + \frac{1}{4}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1e^{2 x} + k_2x e^{2 x} + \frac{x}{4} + \frac{1}{4}$.`,
    String.raw`**Condizioni iniziali** (sull'integrale generale della completa): $y(0) = k_{1} + \frac{1}{4} = \frac{5}{4}$, $y'(0) = 2 k_{1} + k_{2} + \frac{1}{4} = \frac{9}{4}$. Risolvendo il sistema: $k_1 = 1$, $k_2 = 0$.`,
    String.raw`**Soluzione** del problema di Cauchy: $y(x) = e^{2x} + \frac x4 + \frac14$.`
  ],
  answer: { fields: [
      { label: "y(x)",
        kind: "expr",
        expr: "x/4 + exp(2*x) + 1/4",
        dom: [-1.5, 1.5] }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('x/4 + 1/4'), x, 2) + (-4)*diff(P('x/4 + 1/4'), x, 1) + (4)*diff(P('x/4 + 1/4'), x, 0) - (P('x')))) == 0",
    "simplify(P('x/4 + exp(2*x) + 1/4') - (P('x/4 + exp(2*x) + 1/4'))) == 0",
    "simplify(expand((1)*diff(P('x/4 + exp(2*x) + 1/4'), x, 2) + (-4)*diff(P('x/4 + exp(2*x) + 1/4'), x, 1) + (4)*diff(P('x/4 + exp(2*x) + 1/4'), x, 0) - (P('x')))) == 0"
  ] },

{ id: "tr-foglio-b1",
  cap: 2,
  topic: "cauchy",
  src: "Esercizi sulle equazioni differenziali (foglio)",
  text: String.raw`Risolvere il problema di Cauchy $$\begin{cases} y'' + y' - 6y = e^{2x}(2x+3) \\ y(0) = 1 \\ y'(0) = \frac{13}{25} \end{cases}$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' + y' - 6y = 0$. Equazione caratteristica $\alpha^{2} + \alpha - 6 = 0$: $\alpha = -3$, $\alpha = 2$. Integrale generale dell'omogenea: $k_1e^{- 3 x} + k_2e^{2 x}$.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Termine noto del tipo $e^{hx}p(x)$ con $h = 2$, $m = 1$. $2$ è radice dell'equazione caratteristica (con molteplicità 1), quindi $s = 1$: si cerca $\bar y = x (a x + b) e^{2 x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{2 x}$ si ottiene $10 a x + 2 a + 5 b = 2 x + 3$; per il principio di identità dei polinomi $a = \frac{1}{5}, b = \frac{13}{25}$. Quindi $\bar y = x (\frac{x}{5} + \frac{13}{25}) e^{2 x}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1e^{- 3 x} + k_2e^{2 x} + \frac{x (5 x + 13) e^{2 x}}{25}$.`,
    String.raw`**Condizioni iniziali** (sull'integrale generale della completa): $y(0) = k_{1} + k_{2} = 1$, $y'(0) = - 3 k_{1} + 2 k_{2} + \frac{13}{25} = \frac{13}{25}$. Risolvendo il sistema: $k_1 = \frac{2}{5}$, $k_2 = \frac{3}{5}$.`,
    String.raw`**Soluzione** del problema di Cauchy: $y(x) = e^{2x}\left(\frac{x^2}{5} + \frac{13x}{25} + \frac35\right) + \frac25e^{-3x}$.`
  ],
  answer: { fields: [
      { label: "y(x)",
        kind: "expr",
        expr: "((x*(5*x + 13) + 15)*exp(5*x) + 10)*exp(-3*x)/25",
        dom: [-1.5, 1.5] }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('x*(x/5 + 13/25)*exp(2*x)'), x, 2) + (1)*diff(P('x*(x/5 + 13/25)*exp(2*x)'), x, 1) + (-6)*diff(P('x*(x/5 + 13/25)*exp(2*x)'), x, 0) - (P('(2*x + 3)*exp(2*x)')))) == 0",
    "simplify(P('((x*(5*x + 13) + 15)*exp(5*x) + 10)*exp(-3*x)/25') - (P('(x**2/5 + 13*x/25 + 3/5)*exp(2*x) + 2*exp(-3*x)/5'))) == 0",
    "simplify(expand((1)*diff(P('((x*(5*x + 13) + 15)*exp(5*x) + 10)*exp(-3*x)/25'), x, 2) + (1)*diff(P('((x*(5*x + 13) + 15)*exp(5*x) + 10)*exp(-3*x)/25'), x, 1) + (-6)*diff(P('((x*(5*x + 13) + 15)*exp(5*x) + 10)*exp(-3*x)/25'), x, 0) - (P('(2*x + 3)*exp(2*x)')))) == 0"
  ] },

{ id: "tr-foglio-b2",
  cap: 2,
  topic: "seno_coseno",
  src: "Esercizi sulle equazioni differenziali (foglio)",
  text: String.raw`Risolvere il problema di Cauchy $$\begin{cases} y'' - 2y' = \cos x \\ y\left(\frac\pi2\right) = \frac35 \\ y'\left(\frac\pi2\right) = 0 \end{cases}$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' - 2y' = 0$. Equazione caratteristica $\alpha^{2} - 2 \alpha = 0$: $\alpha = 0$, $\alpha = 2$. Integrale generale dell'omogenea: $k_1 + k_2e^{2 x}$.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Il termine $\cos x$ è la **parte reale** di $e^{ix}$: risolviamo con termine noto $e^{ix}$ e poi prendiamo la parte reale.`,
    String.raw`Termine noto del tipo $e^{hx}p(x)$ con $h = i$, $m = 0$. $i$ non è radice dell'equazione caratteristica, quindi $s = 0$: si cerca $\bar y = a e^{i x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{i x}$ si ottiene $a (-1 - 2 i) = 1$; per il principio di identità dei polinomi $a = - \frac{1}{5} + \frac{2 i}{5}$. Quindi $\bar y = (- \frac{1}{5} + \frac{2 i}{5}) e^{i x}$, e la parte reale è $- \frac{2 \sin x }{5} - \frac{\cos x }{5}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1 + k_2e^{2 x} - \frac{2 \sin x }{5} - \frac{\cos x }{5}$.`,
    String.raw`**Condizioni iniziali** (sull'integrale generale della completa): $y(\frac{\pi}{2}) = k_{1} + k_{2} e^{\pi} - \frac{2}{5} = \frac{3}{5}$, $y'(\frac{\pi}{2}) = 2 k_{2} e^{\pi} + \frac{1}{5} = 0$. Risolvendo il sistema: $k_1 = \frac{11}{10}$, $k_2 = - \frac{1}{10 e^{\pi}}$.`,
    String.raw`**Soluzione** del problema di Cauchy: $y(x) = \frac{11}{10} - \frac25\sin x - \frac15\cos x - \frac{1}{10}e^{2x-\pi}$.`
  ],
  answer: { fields: [
      { label: "y(x)",
        kind: "expr",
        expr: "((-4*sin(x) - 2*cos(x) + 11)*exp(pi) - exp(2*x))*exp(-pi)/10",
        dom: [0.5707963267948966, 2.5707963267948966] }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('-2*sin(x)/5 - cos(x)/5'), x, 2) + (-2)*diff(P('-2*sin(x)/5 - cos(x)/5'), x, 1) - (P('cos(x)')))) == 0",
    "simplify(P('((-4*sin(x) - 2*cos(x) + 11)*exp(pi) - exp(2*x))*exp(-pi)/10') - (P('-exp(2*x - pi)/10 - 2*sin(x)/5 - cos(x)/5 + 11/10'))) == 0",
    "simplify(expand((1)*diff(P('((-4*sin(x) - 2*cos(x) + 11)*exp(pi) - exp(2*x))*exp(-pi)/10'), x, 2) + (-2)*diff(P('((-4*sin(x) - 2*cos(x) + 11)*exp(pi) - exp(2*x))*exp(-pi)/10'), x, 1) - (P('cos(x)')))) == 0"
  ] },

{ id: "tr-foglio-b3",
  cap: 2,
  topic: "seno_coseno",
  src: "Esercizi sulle equazioni differenziali (foglio)",
  text: String.raw`Risolvere il problema di Cauchy $$\begin{cases} y'' - 2y' - 3y = e^{3x}(x+2) + \sin x \\ y(\pi) = \frac56 \\ y'(\pi) = 0 \end{cases}$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' - 2y' - 3y = 0$. Equazione caratteristica $\alpha^{2} - 2 \alpha - 3 = 0$: $\alpha = -1$, $\alpha = 3$. Integrale generale dell'omogenea: $k_1e^{- x} + k_2e^{3 x}$.`,
    "**Integrale particolare** per **sovrapposizione**: il termine noto è una somma, si cerca un integrale particolare per ciascun addendo e si sommano.",
    String.raw`Termine noto del tipo $e^{hx}p(x)$ con $h = 3$, $m = 1$. $3$ è radice dell'equazione caratteristica (con molteplicità 1), quindi $s = 1$: si cerca $\bar y = x (a x + b) e^{3 x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{3 x}$ si ottiene $8 a x + 2 a + 4 b = x + 2$; per il principio di identità dei polinomi $a = \frac{1}{8}, b = \frac{7}{16}$. Quindi $\bar y = x (\frac{x}{8} + \frac{7}{16}) e^{3 x}$.`,
    String.raw`Il termine $\sin x$ è la **parte immaginaria** di $e^{ix}$: risolviamo con termine noto $e^{ix}$ e poi prendiamo la parte immaginaria.`,
    String.raw`Termine noto del tipo $e^{hx}p(x)$ con $h = i$, $m = 0$. $i$ non è radice dell'equazione caratteristica, quindi $s = 0$: si cerca $\bar y = a e^{i x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{i x}$ si ottiene $a (-4 - 2 i) = 1$; per il principio di identità dei polinomi $a = - \frac{1}{5} + \frac{i}{10}$. Quindi $\bar y = (- \frac{1}{5} + \frac{i}{10}) e^{i x}$, e la parte immaginaria è $- \frac{\sin x }{5} + \frac{\cos x }{10}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1e^{- x} + k_2e^{3 x} + \frac{x (2 x + 7) e^{3 x}}{16} - \frac{\sin x }{5} + \frac{\cos x }{10}$.`,
    String.raw`**Condizioni iniziali** (sull'integrale generale della completa): $y(\pi) = \frac{k_{1} + \frac{(80 k_{2} e^{3 \pi} - 8 + 5 \pi (2 \pi + 7) e^{3 \pi}) e^{\pi}}{80}}{e^{\pi}} = \frac{5}{6}$, $y'(\pi) = \frac{- 80 k_{1} + 240 k_{2} e^{4 \pi} + 16 e^{\pi} + 35 e^{4 \pi} + 30 \pi^{2} e^{4 \pi} + 125 \pi e^{4 \pi}}{80 e^{\pi}} = 0$. Risolvendo il sistema: $k_1 = \frac{3 e^{\pi}}{4} + \frac{7 e^{4 \pi}}{64} + \frac{\pi e^{4 \pi}}{16}$, $k_2 = \frac{- 480 \pi e^{3 \pi} - 120 \pi^{2} e^{3 \pi} - 105 e^{3 \pi} + 176}{960 e^{3 \pi}}$.`,
    String.raw`**Soluzione** del problema di Cauchy: $y(x) = \frac{(12 (5 x (2 x + 7) e^{3 x} - 16 \sin x  + 8 \cos x ) e^{x + 3 \pi} + (- 480 \pi e^{3 \pi} - 120 \pi^{2} e^{3 \pi} - 105 e^{3 \pi} + 176) e^{4 x} + 15 (48 + 7 e^{3 \pi} + 4 \pi e^{3 \pi}) e^{4 \pi}) e^{- x - 3 \pi}}{960}$.`
  ],
  answer: { fields: [
      { label: "y(x)",
        kind: "expr",
        expr: "(12*(5*x*(2*x + 7)*exp(3*x) - 16*sin(x) + 8*cos(x))*exp(x + 3*pi) + (-480*pi*exp(3*pi) - 120*pi**2*exp(3*pi) - 105*exp(3*pi) + 176)*exp(4*x) + 15*(48 + 7*exp(3*pi) + 4*pi*exp(3*pi))*exp(4*pi))*exp(-x - 3*pi)/960",
        dom: [2.141592653589793, 4.141592653589793] }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('x*(x/8 + 7/16)*exp(3*x)'), x, 2) + (-2)*diff(P('x*(x/8 + 7/16)*exp(3*x)'), x, 1) + (-3)*diff(P('x*(x/8 + 7/16)*exp(3*x)'), x, 0) - (P('(x + 2)*exp(3*x)')))) == 0",
    "simplify(expand((1)*diff(P('-sin(x)/5 + cos(x)/10'), x, 2) + (-2)*diff(P('-sin(x)/5 + cos(x)/10'), x, 1) + (-3)*diff(P('-sin(x)/5 + cos(x)/10'), x, 0) - (P('sin(x)')))) == 0",
    "simplify(expand((1)*diff(P('(12*(5*x*(2*x + 7)*exp(3*x) - 16*sin(x) + 8*cos(x))*exp(x + 3*pi) + (-480*pi*exp(3*pi) - 120*pi**2*exp(3*pi) - 105*exp(3*pi) + 176)*exp(4*x) + 15*(48 + 7*exp(3*pi) + 4*pi*exp(3*pi))*exp(4*pi))*exp(-x - 3*pi)/960'), x, 2) + (-2)*diff(P('(12*(5*x*(2*x + 7)*exp(3*x) - 16*sin(x) + 8*cos(x))*exp(x + 3*pi) + (-480*pi*exp(3*pi) - 120*pi**2*exp(3*pi) - 105*exp(3*pi) + 176)*exp(4*x) + 15*(48 + 7*exp(3*pi) + 4*pi*exp(3*pi))*exp(4*pi))*exp(-x - 3*pi)/960'), x, 1) + (-3)*diff(P('(12*(5*x*(2*x + 7)*exp(3*x) - 16*sin(x) + 8*cos(x))*exp(x + 3*pi) + (-480*pi*exp(3*pi) - 120*pi**2*exp(3*pi) - 105*exp(3*pi) + 176)*exp(4*x) + 15*(48 + 7*exp(3*pi) + 4*pi*exp(3*pi))*exp(4*pi))*exp(-x - 3*pi)/960'), x, 0) - (P('(x + 2)*exp(3*x) + sin(x)')))) == 0"
  ],
  daVerificare: true,
  nota: String.raw`Nel foglio della docente la prima condizione è stampata "$y(0\pi) = \frac56$" (refuso): qui è letta come $y(\pi)$, coerente con la seconda condizione.` },

{ id: "tr-pi23-1-c",
  cap: 2,
  topic: "somiglianza",
  src: "P.I. 24/11/2023, primo turno",
  text: String.raw`Determinare l'integrale generale dell'equazione differenziale $$y'' - y' - 6y = \frac{x}{e^{2x}} + 2xe^x$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' - y' - 6y = 0$. Equazione caratteristica $\alpha^{2} - \alpha - 6 = 0$: $\alpha = -2$, $\alpha = 3$. Integrale generale dell'omogenea: $k_1e^{- 2 x} + k_2e^{3 x}$.`,
    "**Integrale particolare** per **sovrapposizione**: il termine noto è una somma, si cerca un integrale particolare per ciascun addendo e si sommano.",
    String.raw`Termine noto del tipo $e^{hx}p(x)$ con $h = -2$, $m = 1$. $-2$ è radice dell'equazione caratteristica (con molteplicità 1), quindi $s = 1$: si cerca $\bar y = x (a x + b) e^{- 2 x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{- 2 x}$ si ottiene $- 10 a x + 2 a - 5 b = x$; per il principio di identità dei polinomi $a = - \frac{1}{10}, b = - \frac{1}{25}$. Quindi $\bar y = x (- \frac{x}{10} - \frac{1}{25}) e^{- 2 x}$.`,
    String.raw`Termine noto del tipo $e^{hx}p(x)$ con $h = 1$, $m = 1$. $1$ non è radice dell'equazione caratteristica, quindi $s = 0$: si cerca $\bar y = (a x + b) e^{x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{x}$ si ottiene $- 6 a x + a - 6 b = 2 x$; per il principio di identità dei polinomi $a = - \frac{1}{3}, b = - \frac{1}{18}$. Quindi $\bar y = (- \frac{x}{3} - \frac{1}{18}) e^{x}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1e^{- 2 x} + k_2e^{3 x} + (- \frac{x (5 x + 2)}{50} + \frac{(- 150 x - 25) e^{3 x}}{450}) e^{- 2 x}$.`
  ],
  answer: { fields: [
      { label: String.raw`un integrale particolare $\bar y(x)$`,
        kind: "ode",
        co: [1.0, -1.0, -6.0],
        rhs: "2*x*exp(x) + x*exp(-2*x)",
        dom: [-1.5, 1.5],
        expr: "(-x*(5*x + 2)/50 + (-150*x - 25)*exp(3*x)/450)*exp(-2*x)" }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('x*(-x/10 - 1/25)*exp(-2*x)'), x, 2) + (-1)*diff(P('x*(-x/10 - 1/25)*exp(-2*x)'), x, 1) + (-6)*diff(P('x*(-x/10 - 1/25)*exp(-2*x)'), x, 0) - (P('x*exp(-2*x)')))) == 0",
    "simplify(expand((1)*diff(P('(-x/3 - 1/18)*exp(x)'), x, 2) + (-1)*diff(P('(-x/3 - 1/18)*exp(x)'), x, 1) + (-6)*diff(P('(-x/3 - 1/18)*exp(x)'), x, 0) - (P('2*x*exp(x)')))) == 0"
  ] },

{ id: "tr-pi23-2-c",
  cap: 2,
  topic: "somiglianza",
  src: "P.I. 24/11/2023, secondo turno",
  text: String.raw`Determinare l'integrale generale dell'equazione differenziale $$y'' - 3y' - 4y = \frac{x}{e^{x}} + 3xe^{2x}$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' - 3y' - 4y = 0$. Equazione caratteristica $\alpha^{2} - 3 \alpha - 4 = 0$: $\alpha = -1$, $\alpha = 4$. Integrale generale dell'omogenea: $k_1e^{- x} + k_2e^{4 x}$.`,
    "**Integrale particolare** per **sovrapposizione**: il termine noto è una somma, si cerca un integrale particolare per ciascun addendo e si sommano.",
    String.raw`Termine noto del tipo $e^{hx}p(x)$ con $h = -1$, $m = 1$. $-1$ è radice dell'equazione caratteristica (con molteplicità 1), quindi $s = 1$: si cerca $\bar y = x (a x + b) e^{- x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{- x}$ si ottiene $- 10 a x + 2 a - 5 b = x$; per il principio di identità dei polinomi $a = - \frac{1}{10}, b = - \frac{1}{25}$. Quindi $\bar y = x (- \frac{x}{10} - \frac{1}{25}) e^{- x}$.`,
    String.raw`Termine noto del tipo $e^{hx}p(x)$ con $h = 2$, $m = 1$. $2$ non è radice dell'equazione caratteristica, quindi $s = 0$: si cerca $\bar y = (a x + b) e^{2 x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{2 x}$ si ottiene $- 6 a x + a - 6 b = 3 x$; per il principio di identità dei polinomi $a = - \frac{1}{2}, b = - \frac{1}{12}$. Quindi $\bar y = (- \frac{x}{2} - \frac{1}{12}) e^{2 x}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1e^{- x} + k_2e^{4 x} + (- \frac{x (5 x + 2)}{50} + \frac{(- 150 x - 25) e^{3 x}}{300}) e^{- x}$.`
  ],
  answer: { fields: [
      { label: String.raw`un integrale particolare $\bar y(x)$`,
        kind: "ode",
        co: [1.0, -3.0, -4.0],
        rhs: "x*(3*exp(3*x) + 1)*exp(-x)",
        dom: [-1.5, 1.5],
        expr: "(-x*(5*x + 2)/50 + (-150*x - 25)*exp(3*x)/300)*exp(-x)" }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('x*(-x/10 - 1/25)*exp(-x)'), x, 2) + (-3)*diff(P('x*(-x/10 - 1/25)*exp(-x)'), x, 1) + (-4)*diff(P('x*(-x/10 - 1/25)*exp(-x)'), x, 0) - (P('x*exp(-x)')))) == 0",
    "simplify(expand((1)*diff(P('(-x/2 - 1/12)*exp(2*x)'), x, 2) + (-3)*diff(P('(-x/2 - 1/12)*exp(2*x)'), x, 1) + (-4)*diff(P('(-x/2 - 1/12)*exp(2*x)'), x, 0) - (P('3*x*exp(2*x)')))) == 0"
  ] },

{ id: "tr-app290125-c",
  cap: 2,
  topic: "somiglianza",
  src: "Appello 29/01/2025",
  text: String.raw`Determinare l'integrale generale dell'equazione differenziale $$y'' - y' - 2y = xe^{-x}$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' - y' - 2y = 0$. Equazione caratteristica $\alpha^{2} - \alpha - 2 = 0$: $\alpha = -1$, $\alpha = 2$. Integrale generale dell'omogenea: $k_1e^{- x} + k_2e^{2 x}$.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Termine noto del tipo $e^{hx}p(x)$ con $h = -1$, $m = 1$. $-1$ è radice dell'equazione caratteristica (con molteplicità 1), quindi $s = 1$: si cerca $\bar y = x (a x + b) e^{- x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{- x}$ si ottiene $- 6 a x + 2 a - 3 b = x$; per il principio di identità dei polinomi $a = - \frac{1}{6}, b = - \frac{1}{9}$. Quindi $\bar y = x (- \frac{x}{6} - \frac{1}{9}) e^{- x}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1e^{- x} + k_2e^{2 x} - \frac{x (3 x + 2) e^{- x}}{18}$.`
  ],
  answer: { fields: [
      { label: String.raw`un integrale particolare $\bar y(x)$`,
        kind: "ode",
        co: [1.0, -1.0, -2.0],
        rhs: "x*exp(-x)",
        dom: [-1.5, 1.5],
        expr: "-x*(3*x + 2)*exp(-x)/18" }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('x*(-x/6 - 1/9)*exp(-x)'), x, 2) + (-1)*diff(P('x*(-x/6 - 1/9)*exp(-x)'), x, 1) + (-2)*diff(P('x*(-x/6 - 1/9)*exp(-x)'), x, 0) - (P('x*exp(-x)')))) == 0"
  ] },

{ id: "tr-app030725-c",
  cap: 2,
  topic: "somiglianza",
  src: "Appello 03/07/2025",
  text: String.raw`Determinare l'integrale generale dell'equazione differenziale $$y'' - 2y' + y = xe^x$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' - 2y' + y = 0$. Equazione caratteristica $\alpha^{2} - 2 \alpha + 1 = 0$: $\alpha = 1$ (molteplicità 2). Integrale generale dell'omogenea: $k_1e^{x} + k_2x e^{x}$.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Termine noto del tipo $e^{hx}p(x)$ con $h = 1$, $m = 1$. $1$ è radice dell'equazione caratteristica (con molteplicità 2), quindi $s = 2$: si cerca $\bar y = x^{2} (a x + b) e^{x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{x}$ si ottiene $6 a x + 2 b = x$; per il principio di identità dei polinomi $a = \frac{1}{6}, b = 0$. Quindi $\bar y = \frac{x^{3} e^{x}}{6}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1e^{x} + k_2x e^{x} + \frac{x^{3} e^{x}}{6}$.`
  ],
  answer: { fields: [
      { label: String.raw`un integrale particolare $\bar y(x)$`,
        kind: "ode",
        co: [1.0, -2.0, 1.0],
        rhs: "x*exp(x)",
        dom: [-1.5, 1.5],
        expr: "x**3*exp(x)/6" }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('x**3*exp(x)/6'), x, 2) + (-2)*diff(P('x**3*exp(x)/6'), x, 1) + (1)*diff(P('x**3*exp(x)/6'), x, 0) - (P('x*exp(x)')))) == 0"
  ] },

{ id: "tr-rec190225-p1",
  cap: 2,
  topic: "primo_ordine",
  src: "Recupero 19/02/2025 (= Lezione 22/10, es. 3)",
  text: String.raw`Risolvere il problema di Cauchy $$\begin{cases} y' + \dfrac yx = \log(x^2+4) \\ y\left(\sqrt{e^2-4}\right) = \sqrt{e^2-4} \end{cases}$$`,
  steps: [
    String.raw`**Intervallo**: $a(x) = \frac1x$ e $f(x) = \log(x^2+4)$ sono continue in $]0,+\infty[$, che contiene $x_0 = \sqrt{e^2-4}$: lavoriamo lì.`,
    String.raw`**Omogenea associata** $y' + \frac yx = 0$: $A(x) = \log x$ è una primitiva di $a$, quindi le soluzioni sono $ke^{-\log x} = \dfrac kx$.`,
    String.raw`**Variazione della costante**: $\bar y = \dfrac{k(x)}{x}$ con $k'(x) = f(x)e^{A(x)} = x\log(x^2+4)$.`,
    String.raw`$\displaystyle\int x\log(x^2+4)\,dx = \frac12\int 2x\log(x^2+4)\,dx = \frac12\left[\int\log t\,dt\right]_{t=x^2+4} = \frac12\big[t\log t - t\big]_{t = x^2+4}$, quindi $k(x) = \dfrac{(x^2+4)\big(\log(x^2+4) - 1\big)}{2}$ (prima formula di sostituzione, poi per parti con FD $= 1$).`,
    String.raw`**Integrale generale**: $y(x) = \dfrac kx + \dfrac{(x^2+4)\big(\log(x^2+4) - 1\big)}{2x}$.`,
    String.raw`**Condizione**: in $x_0 = \sqrt{e^2-4}$ si ha $x_0^2 + 4 = e^2$ e $\log(x_0^2+4) = 2$, quindi $y(x_0) = \dfrac{k}{x_0} + \dfrac{e^2}{2x_0} = x_0$, cioè $k = x_0^2 - \dfrac{e^2}{2} = \dfrac{e^2 - 8}{2}$.`,
    String.raw`**Soluzione**: $$y(x) = \frac{(x^2+4)\big(\log(x^2+4) - 1\big)}{2x} + \frac{e^2 - 8}{2x}.$$`
  ],
  answer: { fields: [
      { label: "y(x)",
        kind: "expr",
        expr: "((x**2+4)*(log(x**2+4)-1) + E**2 - 8)/(2*x)",
        dom: [0.5, 4] }
    ] },
  stepChk: [
    "simplify(diff(P('((x**2+4)*(log(x**2+4)-1)+E**2-8)/(2*x)'),x) + P('((x**2+4)*(log(x**2+4)-1)+E**2-8)/(2*x**2)') - log(x**2+4)) == 0",
    "simplify(diff(P('(x**2+4)*(log(x**2+4)-1)/2'),x) - x*log(x**2+4)) == 0"
  ] },

{ id: "tr-foglio-p1",
  cap: 2,
  topic: "primo_ordine",
  src: "Esercizi sulle equazioni differenziali (foglio)",
  text: String.raw`Risolvere il problema di Cauchy $$\begin{cases} y' - e^xy = e^x \\ y(0) = e \end{cases}$$`,
  steps: [
    String.raw`Forma $y' + a(x)y = f(x)$ con $a(x) = -e^x$, $f(x) = e^x$, continue in $\mathbb{R}$.`,
    String.raw`**Omogenea associata**: $A(x) = -e^x$, soluzioni $ke^{-A(x)} = ke^{e^x}$.`,
    String.raw`**Variazione della costante**: $\bar y = k(x)e^{e^x}$ con $k'(x) = f(x)e^{A(x)} = e^xe^{-e^x}$, quindi $k(x) = -e^{-e^x}$ (forma composta) e $\bar y = -1$.`,
    String.raw`**Integrale generale**: $y = ke^{e^x} - 1$.`,
    String.raw`**Condizione** $y(0) = ke - 1 = e$, quindi $k = 1 + \frac1e$.`,
    String.raw`**Soluzione**: $y(x) = \left(1 + \frac1e\right)e^{e^x} - 1$.`
  ],
  answer: { fields: [
      { label: "y(x)",
        kind: "expr",
        expr: "(1+1/E)*exp(exp(x)) - 1",
        dom: [-1, 1] }
    ] },
  stepChk: [
    "simplify(diff(P('(1+1/E)*exp(exp(x))-1'),x) - exp(x)*P('(1+1/E)*exp(exp(x))-1') - exp(x)) == 0"
  ],
  daVerificare: true,
  nota: String.raw`Nel foglio della docente l'equazione è stampata "$y'e^xy = e^x$", senza segno fra $y'$ ed $e^xy$ (refuso): qui è letta come $y' - e^xy = e^x$.` },

{ id: "tr-app290125-d",
  cap: 1,
  topic: "definiti",
  src: "Appello 29/01/2025 (= Lezione 27/10, es. 3)",
  text: String.raw`Calcolare $$\int_0^1 \frac{\log(x^2+3x+2)}{(2x+3)^2}\,dx.$$`,
  steps: [
    String.raw`**Prima la primitiva.** Per parti con FF $= \log(x^2+3x+2)$ e FD $= \frac{1}{(2x+3)^2}$, di cui una primitiva è $-\frac{1}{2(2x+3)}$.`,
    String.raw`$\displaystyle\int \frac{\log(x^2+3x+2)}{(2x+3)^2}\,dx = -\frac{\log(x^2+3x+2)}{2(2x+3)} + \int\frac{2x+3}{x^2+3x+2}\cdot\frac{1}{2(2x+3)}\,dx = -\frac{\log(x^2+3x+2)}{2(2x+3)} + \frac12\int\frac{dx}{(x+1)(x+2)}$.`,
    String.raw`Fratti semplici: $\frac{1}{(x+1)(x+2)} = \frac{1}{x+1} - \frac{1}{x+2}$, quindi una primitiva è $F(x) = -\dfrac{\log(x^2+3x+2)}{2(2x+3)} + \dfrac12\log\dfrac{x+1}{x+2}$ (in $[0,1]$ gli argomenti sono positivi).`,
    String.raw`**Poi la formula fondamentale**: $F(1) = -\frac{\log 6}{10} + \frac12\log\frac23$, $F(0) = -\frac{\log 2}{6} + \frac12\log\frac12$.`,
    String.raw`$F(1) - F(0) = \dfrac{16}{15}\log 2 - \dfrac35\log 3$.`
  ],
  answer: { fields: [
      { label: "valore dell'integrale",
        kind: "number",
        value: "16*log(2)/15 - 3*log(3)/5" }
    ] },
  stepChk: [
    "simplify(diff(P('-log(x**2+3*x+2)/(2*(2*x+3)) + log((x+1)/(x+2))/2'),x) - log(x**2+3*x+2)/(2*x+3)**2) == 0",
    "simplify(integrate(log(x**2+3*x+2)/(2*x+3)**2,(x,0,1)) - P('16*log(2)/15 - 3*log(3)/5')) == 0"
  ] },

{ id: "tr-app260624-d",
  cap: 1,
  topic: "definiti",
  src: "Appello 26/06/2024",
  text: String.raw`Calcolare $$\int_{1/e}^{e} |x\log x|\,dx.$$`,
  steps: [
    String.raw`$x\log x < 0$ in $\left]\frac1e, 1\right[$ e $> 0$ in $]1, e[$: per la **proprietà additiva** $\displaystyle\int_{1/e}^e |x\log x|\,dx = -\int_{1/e}^1 x\log x\,dx + \int_1^e x\log x\,dx$.`,
    String.raw`**Primitiva** (per parti, FF $= \log x$, FD $= x$): $G(x) = \dfrac{x^2}{2}\log x - \dfrac{x^2}{4}$.`,
    String.raw`$G(1) = -\frac14$, $G(e) = \frac{e^2}{4}$, $G\left(\frac1e\right) = -\frac{1}{2e^2} - \frac{1}{4e^2} = -\frac{3}{4e^2}$.`,
    String.raw`Risultato: $-\big(G(1) - G(\tfrac1e)\big) + G(e) - G(1) = \dfrac{e^2}{4} + \dfrac12 - \dfrac{3}{4e^2}$.`
  ],
  answer: { fields: [
      { label: "valore dell'integrale",
        kind: "number",
        value: "E**2/4 + 1/2 - 3/(4*E**2)" }
    ] },
  stepChk: [
    "simplify(diff(P('x**2*log(x)/2 - x**2/4'),x) - x*log(x)) == 0",
    "simplify(-integrate(x*log(x),(x,1/E,1)) + integrate(x*log(x),(x,1,E)) - P('E**2/4 + 1/2 - 3/(4*E**2)')) == 0"
  ] },

{ id: "tr-app250324-d",
  cap: 1,
  topic: "definiti",
  src: "Appello 25/03/2024",
  text: String.raw`Calcolare $$\int_{-1}^{2} |x|\,x^2e^{3x^2}\,dx.$$`,
  steps: [
    String.raw`Si spezza in $0$: $\displaystyle\int_{-1}^2 |x|x^2e^{3x^2}\,dx = -\int_{-1}^0 x^3e^{3x^2}\,dx + \int_0^2 x^3e^{3x^2}\,dx$.`,
    String.raw`**Primitiva**: con $t = x^2$, $\displaystyle\int x^3e^{3x^2}\,dx = \frac12\left[\int te^{3t}\,dt\right]_{t=x^2} = \frac12\left[e^{3t}\left(\frac t3 - \frac19\right)\right]_{t=x^2} = \frac{e^{3x^2}(3x^2 - 1)}{18}$ (prima formula, poi per parti).`,
    String.raw`Con $G(x) = \frac{e^{3x^2}(3x^2-1)}{18}$: $G(0) = -\frac1{18}$, $G(-1) = \frac{e^3}{9}$, $G(2) = \frac{11}{18}e^{12}$.`,
    String.raw`Risultato: $\big(G(-1) - G(0)\big) + \big(G(2) - G(0)\big) = \dfrac19 + \dfrac{e^3}{9} + \dfrac{11}{18}e^{12}$.`
  ],
  answer: { fields: [
      { label: "valore dell'integrale",
        kind: "number",
        value: "1/9 + E**3/9 + 11*E**12/18" }
    ] },
  stepChk: [
    "simplify(diff(P('exp(3*x**2)*(3*x**2-1)/18'),x) - x**3*exp(3*x**2)) == 0"
  ],
  daVerificare: true,
  nota: "Testo letto da un PDF con formule spezzate." },

{ id: "tr-app030926-d1",
  cap: 1,
  topic: "parti",
  src: "Appello 03/09/2026",
  text: String.raw`Calcolare $$\int \frac{\log(x+3)}{x^2}\,dx.$$`,
  steps: [
    String.raw`Per parti con FF $= \log(x+3)$ e FD $= \frac1{x^2}$, di cui una primitiva è $-\frac1x$: $\displaystyle\int\frac{\log(x+3)}{x^2}\,dx = -\frac{\log(x+3)}{x} + \int\frac{dx}{x(x+3)}$.`,
    String.raw`Fratti semplici: $\frac{1}{x(x+3)} = \frac13\left(\frac1x - \frac{1}{x+3}\right)$.`,
    String.raw`Risultato: $\displaystyle -\frac{\log(x+3)}{x} + \frac13\log\left|\frac{x}{x+3}\right| + k$.`
  ],
  answer: { fields: [
      { label: String.raw`una primitiva (per $x > 0$)`,
        kind: "prim",
        expr: "-log(x+3)/x + log(x/(x+3))/3",
        dom: [0.5, 4] }
    ] },
  stepChk: [
    "simplify(diff(P('-log(x+3)/x + log(x/(x+3))/3'), x) - log(x+3)/x**2) == 0"
  ] },

{ id: "tr-app030926-d2",
  cap: 1,
  topic: "sostituzione",
  src: "Appello 03/09/2026",
  text: String.raw`Calcolare $$\int \frac{\log x + 3}{x(\log^2x + 1)}\,dx.$$`,
  steps: [
    String.raw`Compare $\frac1x$, derivata di $\log x$: **prima formula di sostituzione** con $t = \log x$: $\displaystyle\int\frac{\log x + 3}{x(\log^2 x + 1)}\,dx = \left[\int\frac{t + 3}{t^2 + 1}\,dt\right]_{t = \log x}$.`,
    String.raw`$\displaystyle\int\frac{t+3}{t^2+1}\,dt = \frac12\int\frac{2t}{t^2+1}\,dt + 3\int\frac{dt}{t^2+1} = \frac12\log(t^2+1) + 3\arctan t + k$.`,
    String.raw`Ricomponendo con $t = \log x$: $\dfrac12\log(\log^2x + 1) + 3\arctan(\log x) + k$.`
  ],
  answer: { fields: [
      { label: "una primitiva",
        kind: "prim",
        expr: "log(log(x)**2+1)/2 + 3*atan(log(x))",
        dom: [0.5, 4] }
    ] },
  stepChk: [
    "simplify(diff(P('log(log(x)**2+1)/2 + 3*atan(log(x))'), x) - (log(x)+3)/(x*(log(x)**2+1))) == 0"
  ] },

{ id: "fg-ind-01",
  cap: 1,
  topic: "sostituzione",
  src: "Foglio di esercizi sugli integrali 2026/27, integrali indefiniti",
  text: String.raw`Determinare $$\int \frac{3\log^4x - \log^3x + \log^2x + 2\log x}{x}\,dx.$$`,
  steps: [
    String.raw`Compare $\frac1x$, derivata di $\log x$: **prima formula di sostituzione** con $t = \log x$.`,
    String.raw`$\displaystyle\left[\int (3t^4 - t^3 + t^2 + 2t)\,dt\right]_{t=\log x} = \frac35\log^5x - \frac14\log^4x + \frac13\log^3x + \log^2x + k$.`
  ],
  answer: { fields: [
      { label: "una primitiva",
        kind: "prim",
        expr: "3*log(x)**5/5 - log(x)**4/4 + log(x)**3/3 + log(x)**2",
        dom: [0.5, 4] }
    ] },
  stepChk: [
    "all(abs((diff(P('3*log(x)**5/5 - log(x)**4/4 + log(x)**3/3 + log(x)**2'), x) - (P('(3*log(x)**4 - log(x)**3 + log(x)**2 + 2*log(x))/x'))).subs(x, Rational(v)).evalf(30)) < 1e-12 for v in ['0.60', '2.26', '3.90'])"
  ] },

{ id: "fg-ind-02",
  cap: 1,
  topic: "razionali",
  src: "Foglio di esercizi sugli integrali 2026/27, integrali indefiniti",
  text: String.raw`Determinare $$\int \frac{\log x + 1}{x\log x\,(\log^2x + 9)}\,dx.$$`,
  steps: [
    String.raw`Con $t = \log x$ (prima formula): $\displaystyle\left[\int\frac{t+1}{t(t^2+9)}\,dt\right]_{t=\log x}$.`,
    String.raw`Fratti semplici: $\dfrac{t+1}{t(t^2+9)} = \dfrac{1}{9t} + \dfrac{-\frac19t + 1}{t^2+9}$.`,
    String.raw`$\displaystyle\int = \frac19\log|t| - \frac{1}{18}\log(t^2+9) + \frac13\arctan\frac t3 + k$, quindi $\dfrac19\log|\log x| - \dfrac1{18}\log(\log^2x + 9) + \dfrac13\arctan\dfrac{\log x}{3} + k$.`
  ],
  answer: { fields: [
      { label: "una primitiva",
        kind: "prim",
        expr: "log(log(x))/9 - log(log(x)**2+9)/18 + atan(log(x)/3)/3",
        dom: [1.5, 6] }
    ] },
  stepChk: [
    "all(abs((diff(P('log(log(x))/9 - log(log(x)**2+9)/18 + atan(log(x)/3)/3'), x) - (P('(log(x)+1)/(x*log(x)*(log(x)**2+9))'))).subs(x, Rational(v)).evalf(30)) < 1e-12 for v in ['1.60', '3.76', '5.90'])"
  ],
  daVerificare: true,
  nota: String.raw`Nel foglio il numeratore è stampato \"$\log + 1$\" (manca la $x$): qui è letto come $\log x + 1$.` },

{ id: "fg-ind-03",
  cap: 1,
  topic: "trigonometrici",
  src: "Foglio di esercizi sugli integrali 2026/27, integrali indefiniti",
  text: String.raw`Determinare $$\int \sin x\,(\cos^5x - \sin^2x + 3\cos x)\,dx.$$`,
  steps: [
    String.raw`Si spezza: $\int\sin x\cos^5x\,dx - \int\sin^3x\,dx + 3\int\sin x\cos x\,dx$.`,
    String.raw`$\int\sin x\cos^5x\,dx = -\frac{\cos^6x}{6}$ (forma composta); $\int\sin^3 x\,dx = \int\sin x(1 - \cos^2x)\,dx = -\cos x + \frac{\cos^3x}{3}$ (esponente dispari: si isola $\sin x$); $3\int\sin x\cos x\,dx = \frac32\sin^2x$.`,
    String.raw`Risultato: $-\dfrac{\cos^6x}{6} + \cos x - \dfrac{\cos^3x}{3} + \dfrac32\sin^2x + k$.`
  ],
  answer: { fields: [
      { label: "una primitiva",
        kind: "prim",
        expr: "-cos(x)**6/6 + cos(x) - cos(x)**3/3 + 3*sin(x)**2/2",
        dom: [-2, 2] }
    ] },
  stepChk: [
    "all(abs((diff(P('-cos(x)**6/6 + cos(x) - cos(x)**3/3 + 3*sin(x)**2/2'), x) - (P('sin(x)*(cos(x)**5 - sin(x)**2 + 3*cos(x))'))).subs(x, Rational(v)).evalf(30)) < 1e-12 for v in ['-1.90', '0.01', '1.90'])"
  ] },

{ id: "fg-ind-04",
  cap: 1,
  topic: "trigonometrici",
  src: "Foglio di esercizi sugli integrali 2026/27, integrali indefiniti",
  text: String.raw`Determinare $$\int \cos^4x\,\sin^3x\,dx.$$`,
  steps: [
    String.raw`$\sin x$ ha esponente dispari: si isola un fattore $\sin x$ e si scrive $\sin^2x = 1 - \cos^2x$: $\int\cos^4x(1 - \cos^2x)\sin x\,dx$.`,
    String.raw`Con $t = \cos x$: $\displaystyle-\left[\int(t^4 - t^6)\,dt\right]_{t=\cos x} = \frac{\cos^7x}{7} - \frac{\cos^5x}{5} + k$.`
  ],
  answer: { fields: [
      { label: "una primitiva",
        kind: "prim",
        expr: "cos(x)**7/7 - cos(x)**5/5",
        dom: [-2, 2] }
    ] },
  stepChk: [
    "all(abs((diff(P('cos(x)**7/7 - cos(x)**5/5'), x) - (P('cos(x)**4*sin(x)**3'))).subs(x, Rational(v)).evalf(30)) < 1e-12 for v in ['-1.90', '0.01', '1.90'])"
  ] },

{ id: "fg-ind-05",
  cap: 1,
  topic: "trigonometrici",
  src: "Foglio di esercizi sugli integrali 2026/27, integrali indefiniti",
  text: String.raw`Determinare $$\int \sin^2x\,\cos^4x\,dx.$$`,
  steps: [
    String.raw`Esponenti entrambi pari: **bisezione**. $\sin^2x\cos^4x = (\sin x\cos x)^2\cos^2x = \frac{\sin^22x}{4}\cdot\frac{1 + \cos 2x}{2} = \frac18\big(\sin^22x + \sin^22x\cos2x\big)$.`,
    String.raw`$\int\sin^2 2x\,dx = \frac x2 - \frac{\sin 4x}{8}$ (ancora bisezione) e $\int\sin^22x\cos 2x\,dx = \frac{\sin^32x}{6}$ (forma composta).`,
    String.raw`Risultato: $\dfrac{x}{16} - \dfrac{\sin 4x}{64} + \dfrac{\sin^32x}{48} + k$.`
  ],
  answer: { fields: [
      { label: "una primitiva",
        kind: "prim",
        expr: "x/16 - sin(4*x)/64 + sin(2*x)**3/48",
        dom: [-2, 2] }
    ] },
  stepChk: [
    "all(abs((diff(P('x/16 - sin(4*x)/64 + sin(2*x)**3/48'), x) - (P('sin(x)**2*cos(x)**4'))).subs(x, Rational(v)).evalf(30)) < 1e-12 for v in ['-1.90', '0.01', '1.90'])"
  ] },

{ id: "fg-ind-06",
  cap: 1,
  topic: "radicali",
  src: "Foglio di esercizi sugli integrali 2026/27, integrali indefiniti",
  text: String.raw`Determinare $$\int \frac{e^{2x} + e^x}{e^{2x} + 3e^x - 10}\,dx.$$`,
  steps: [
    String.raw`**Razionalizzazione** con $t = e^x$ (moltiplicando e dividendo per $e^x$): $\displaystyle\left[\int\frac{t + 1}{t^2 + 3t - 10}\,dt\right]_{t = e^x}$.`,
    String.raw`$t^2 + 3t - 10 = (t-2)(t+5)$ e $\dfrac{t+1}{(t-2)(t+5)} = \dfrac{3/7}{t-2} + \dfrac{4/7}{t+5}$.`,
    String.raw`Risultato: $\dfrac37\log|e^x - 2| + \dfrac47\log(e^x + 5) + k$.`
  ],
  answer: { fields: [
      { label: "una primitiva",
        kind: "prim",
        expr: "3*log(exp(x)-2)/7 + 4*log(exp(x)+5)/7",
        dom: [1, 3] }
    ] },
  stepChk: [
    "all(abs((diff(P('3*log(exp(x)-2)/7 + 4*log(exp(x)+5)/7'), x) - (P('(exp(2*x)+exp(x))/(exp(2*x)+3*exp(x)-10)'))).subs(x, Rational(v)).evalf(30)) < 1e-12 for v in ['1.10', '2.01', '2.90'])"
  ] },

{ id: "fg-ind-07",
  cap: 1,
  topic: "radicali",
  src: "Foglio di esercizi sugli integrali 2026/27, integrali indefiniti",
  text: String.raw`Determinare $$\int \frac{e^x + 6}{e^{2x} + 2e^x - 3}\,dx.$$`,
  steps: [
    String.raw`Con $t = e^x$: $\displaystyle\int\frac{e^x + 6}{e^{2x} + 2e^x - 3}\,dx = \int\frac{(e^x + 6)\,e^x}{e^x(e^{2x} + 2e^x - 3)}\,dx = \left[\int\frac{t + 6}{t(t-1)(t+3)}\,dt\right]_{t=e^x}$.`,
    String.raw`Fratti semplici: $\dfrac{t+6}{t(t-1)(t+3)} = -\dfrac2t + \dfrac{7/4}{t-1} + \dfrac{1/4}{t+3}$.`,
    String.raw`Risultato: $-2x + \dfrac74\log|e^x - 1| + \dfrac14\log(e^x + 3) + k$.`
  ],
  answer: { fields: [
      { label: "una primitiva",
        kind: "prim",
        expr: "-2*x + 7*log(exp(x)-1)/4 + log(exp(x)+3)/4",
        dom: [0.5, 3] }
    ] },
  stepChk: [
    "all(abs((diff(P('-2*x + 7*log(exp(x)-1)/4 + log(exp(x)+3)/4'), x) - (P('(exp(x)+6)/(exp(2*x)+2*exp(x)-3)'))).subs(x, Rational(v)).evalf(30)) < 1e-12 for v in ['0.60', '1.76', '2.90'])"
  ] },

{ id: "fg-ind-08",
  cap: 1,
  topic: "radicali",
  src: "Foglio di esercizi sugli integrali 2026/27, integrali indefiniti",
  text: String.raw`Determinare $$\int \frac{\tan x + 3}{\tan^2x + 9}\,dx.$$`,
  steps: [
    String.raw`**Razionalizzazione** con $t = \tan x$ in $\left]-\frac\pi2,\frac\pi2\right[$: $dt = (1 + t^2)\,dx$, quindi $\displaystyle\left[\int\frac{t + 3}{(t^2+9)(t^2+1)}\,dt\right]_{t=\tan x}$.`,
    String.raw`Fratti semplici: $\dfrac{t+3}{(t^2+9)(t^2+1)} = \dfrac{\frac18t + \frac38}{t^2+1} - \dfrac{\frac18t + \frac38}{t^2+9}$.`,
    String.raw`$\displaystyle\int = \frac1{16}\log(t^2+1) + \frac38\arctan t - \frac1{16}\log(t^2+9) - \frac18\arctan\frac t3 + k$.`,
    String.raw`Con $t = \tan x$ (e $\arctan(\tan x) = x$ nell'intervallo): $\dfrac1{16}\log\dfrac{\tan^2x + 1}{\tan^2x + 9} + \dfrac38x - \dfrac18\arctan\dfrac{\tan x}{3} + k$.`
  ],
  answer: { fields: [
      { label: "una primitiva",
        kind: "prim",
        expr: "log((tan(x)**2+1)/(tan(x)**2+9))/16 + 3*x/8 - atan(tan(x)/3)/8",
        dom: [-1.2, 1.2] }
    ] },
  stepChk: [
    "all(abs((diff(P('log((tan(x)**2+1)/(tan(x)**2+9))/16 + 3*x/8 - atan(tan(x)/3)/8'), x) - (P('(tan(x)+3)/(tan(x)**2+9)'))).subs(x, Rational(v)).evalf(30)) < 1e-12 for v in ['-1.10', '0.01', '1.10'])"
  ] },

{ id: "fg-ind-09",
  cap: 1,
  topic: "sostituzione",
  src: "Foglio di esercizi sugli integrali 2026/27, integrali indefiniti",
  text: String.raw`Determinare $$\int \frac{x^3}{\sqrt{x^4+6}}\,dx.$$`,
  steps: [
    String.raw`Forma composta: $\displaystyle\frac14\int(x^4+6)^{-1/2}\,4x^3\,dx = \frac14\cdot\frac{(x^4+6)^{1/2}}{1/2} + k = \frac{\sqrt{x^4+6}}{2} + k$.`
  ],
  answer: { fields: [
      { label: "una primitiva",
        kind: "prim",
        expr: "sqrt(x**4+6)/2",
        dom: [-2, 2] }
    ] },
  stepChk: [
    "all(abs((diff(P('sqrt(x**4+6)/2'), x) - (P('x**3/sqrt(x**4+6)'))).subs(x, Rational(v)).evalf(30)) < 1e-12 for v in ['-1.90', '0.01', '1.90'])"
  ] },

{ id: "fg-ind-10",
  cap: 1,
  topic: "sostituzione",
  src: "Foglio di esercizi sugli integrali 2026/27, integrali indefiniti",
  text: String.raw`Determinare $$\int x^2e^{x^3+1}\,dx.$$`,
  steps: [
    String.raw`Forma composta ($3x^2$ è la derivata di $x^3 + 1$): $\displaystyle\frac13\int e^{x^3+1}\,3x^2\,dx = \frac{e^{x^3+1}}{3} + k$.`
  ],
  answer: { fields: [
      { label: "una primitiva",
        kind: "prim",
        expr: "exp(x**3+1)/3",
        dom: [-1.5, 1.5] }
    ] },
  stepChk: [
    "all(abs((diff(P('exp(x**3+1)/3'), x) - (P('x**2*exp(x**3+1)'))).subs(x, Rational(v)).evalf(30)) < 1e-12 for v in ['-1.40', '0.01', '1.40'])"
  ] },

{ id: "fg-ind-11",
  cap: 1,
  topic: "parti",
  src: "Foglio di esercizi sugli integrali 2026/27, integrali indefiniti",
  text: String.raw`Determinare $$\int x^3\cos x\,dx.$$`,
  steps: [
    String.raw`Per parti tre volte, FF il polinomio: $\int x^3\cos x\,dx = x^3\sin x - 3\int x^2\sin x\,dx$, $\int x^2\sin x = -x^2\cos x + 2\int x\cos x$, $\int x\cos x = x\sin x + \cos x$.`,
    String.raw`Risultato: $x^3\sin x + 3x^2\cos x - 6x\sin x - 6\cos x + k$.`
  ],
  answer: { fields: [
      { label: "una primitiva",
        kind: "prim",
        expr: "x**3*sin(x) + 3*x**2*cos(x) - 6*x*sin(x) - 6*cos(x)",
        dom: [-3, 3] }
    ] },
  stepChk: [
    "all(abs((diff(P('x**3*sin(x) + 3*x**2*cos(x) - 6*x*sin(x) - 6*cos(x)'), x) - (P('x**3*cos(x)'))).subs(x, Rational(v)).evalf(30)) < 1e-12 for v in ['-2.90', '0.01', '2.90'])"
  ] },

{ id: "fg-ind-12",
  cap: 1,
  topic: "parti",
  src: "Foglio di esercizi sugli integrali 2026/27, integrali indefiniti",
  text: String.raw`Determinare $$\int x^4\sin x\,dx.$$`,
  steps: [
    "Per parti quattro volte, FF il polinomio (il grado scende di uno a ogni passo).",
    String.raw`Risultato: $-x^4\cos x + 4x^3\sin x + 12x^2\cos x - 24x\sin x - 24\cos x + k$.`
  ],
  answer: { fields: [
      { label: "una primitiva",
        kind: "prim",
        expr: "-x**4*cos(x) + 4*x**3*sin(x) + 12*x**2*cos(x) - 24*x*sin(x) - 24*cos(x)",
        dom: [-3, 3] }
    ] },
  stepChk: [
    "all(abs((diff(P('-x**4*cos(x) + 4*x**3*sin(x) + 12*x**2*cos(x) - 24*x*sin(x) - 24*cos(x)'), x) - (P('x**4*sin(x)'))).subs(x, Rational(v)).evalf(30)) < 1e-12 for v in ['-2.90', '0.01', '2.90'])"
  ] },

{ id: "fg-ind-13",
  cap: 1,
  topic: "parti",
  src: "Foglio di esercizi sugli integrali 2026/27, integrali indefiniti",
  text: String.raw`Determinare $$\int e^x\sin^2x\,dx.$$`,
  steps: [
    String.raw`Bisezione: $e^x\sin^2x = \frac{e^x}{2} - \frac{e^x\cos 2x}{2}$.`,
    String.raw`$\int e^x\cos 2x\,dx$ è **ciclico**: per parti due volte si ritrova l'integrale di partenza e si ricava $\int e^x\cos 2x\,dx = \frac{e^x(\cos 2x + 2\sin 2x)}{5}$.`,
    String.raw`Risultato: $e^x\left(\dfrac12 - \dfrac{\cos 2x}{10} - \dfrac{\sin 2x}{5}\right) + k$.`
  ],
  answer: { fields: [
      { label: "una primitiva",
        kind: "prim",
        expr: "exp(x)*(1/2 - cos(2*x)/10 - sin(2*x)/5)",
        dom: [-2, 2] }
    ] },
  stepChk: [
    "all(abs((diff(P('exp(x)*(1/2 - cos(2*x)/10 - sin(2*x)/5)'), x) - (P('exp(x)*sin(x)**2'))).subs(x, Rational(v)).evalf(30)) < 1e-12 for v in ['-1.90', '0.01', '1.90'])"
  ] },

{ id: "fg-ind-14",
  cap: 1,
  topic: "parti",
  src: "Foglio di esercizi sugli integrali 2026/27, integrali indefiniti",
  text: String.raw`Determinare $$\int e^xx^8\,dx.$$`,
  steps: [
    "Per parti otto volte con FF il polinomio: a ogni passo si deriva il polinomio e cambia il segno.",
    String.raw`Risultato: $e^x(x^8 - 8x^7 + 56x^6 - 336x^5 + 1680x^4 - 6720x^3 + 20160x^2 - 40320x + 40320) + k$.`
  ],
  answer: { fields: [
      { label: "una primitiva",
        kind: "prim",
        expr: "exp(x)*(x**8 - 8*x**7 + 56*x**6 - 336*x**5 + 1680*x**4 - 6720*x**3 + 20160*x**2 - 40320*x + 40320)",
        dom: [-1, 1] }
    ] },
  stepChk: [
    "all(abs((diff(P('exp(x)*(x**8 - 8*x**7 + 56*x**6 - 336*x**5 + 1680*x**4 - 6720*x**3 + 20160*x**2 - 40320*x + 40320)'), x) - (P('exp(x)*x**8'))).subs(x, Rational(v)).evalf(30)) < 1e-12 for v in ['-0.90', '0.01', '0.90'])"
  ] },

{ id: "fg-ind-15",
  cap: 1,
  topic: "parti",
  src: "Foglio di esercizi sugli integrali 2026/27, integrali indefiniti",
  text: String.raw`Determinare $$\int \log(x+3)\,dx.$$`,
  steps: [
    String.raw`Per parti con FF $= \log(x+3)$ e FD $= 1$ (scegliendo come primitiva di $1$ la funzione $x + 3$): $(x+3)\log(x+3) - \int dx$.`,
    String.raw`Risultato: $(x+3)\log(x+3) - x + k$.`
  ],
  answer: { fields: [
      { label: "una primitiva",
        kind: "prim",
        expr: "(x+3)*log(x+3) - x",
        dom: [-2, 3] }
    ] },
  stepChk: [
    "all(abs((diff(P('(x+3)*log(x+3) - x'), x) - (P('log(x+3)'))).subs(x, Rational(v)).evalf(30)) < 1e-12 for v in ['-1.90', '0.51', '2.90'])"
  ] },

{ id: "fg-ind-16",
  cap: 1,
  topic: "parti",
  src: "Foglio di esercizi sugli integrali 2026/27, integrali indefiniti",
  text: String.raw`Determinare $$\int \log^4x\,dx.$$`,
  steps: [
    String.raw`Per parti con FF $= \log^4x$, FD $= 1$: $\int\log^4x\,dx = x\log^4x - 4\int\log^3x\,dx$, e si ripete.`,
    String.raw`Risultato: $x(\log^4x - 4\log^3x + 12\log^2x - 24\log x + 24) + k$.`
  ],
  answer: { fields: [
      { label: "una primitiva",
        kind: "prim",
        expr: "x*(log(x)**4 - 4*log(x)**3 + 12*log(x)**2 - 24*log(x) + 24)",
        dom: [0.5, 4] }
    ] },
  stepChk: [
    "all(abs((diff(P('x*(log(x)**4 - 4*log(x)**3 + 12*log(x)**2 - 24*log(x) + 24)'), x) - (P('log(x)**4'))).subs(x, Rational(v)).evalf(30)) < 1e-12 for v in ['0.60', '2.26', '3.90'])"
  ] },

{ id: "fg-ind-17",
  cap: 1,
  topic: "parti",
  src: "Foglio di esercizi sugli integrali 2026/27, integrali indefiniti",
  text: String.raw`Determinare $$\int \log x^4\,dx.$$`,
  steps: [
    String.raw`Per $x > 0$: $\log x^4 = 4\log x$, e $\int\log x\,dx = x\log x - x$ (per parti con FD $= 1$).`,
    String.raw`Risultato: $4x(\log x - 1) + k$.`
  ],
  answer: { fields: [
      { label: "una primitiva",
        kind: "prim",
        expr: "4*x*(log(x) - 1)",
        dom: [0.5, 4] }
    ] },
  stepChk: [
    "all(abs((diff(P('4*x*(log(x) - 1)'), x) - (P('log(x**4)'))).subs(x, Rational(v)).evalf(30)) < 1e-12 for v in ['0.60', '2.26', '3.90'])"
  ] },

{ id: "fg-ind-18",
  cap: 1,
  topic: "sostituzione",
  src: "Foglio di esercizi sugli integrali 2026/27, integrali indefiniti",
  text: String.raw`Determinare $$\int x^2\log(x^3+3)\,dx.$$`,
  steps: [
    String.raw`Prima formula con $t = x^3$: $\displaystyle\frac13\left[\int\log(t + 3)\,dt\right]_{t = x^3}$.`,
    String.raw`$\int\log(t+3)\,dt = (t+3)\log(t+3) - t$, quindi il risultato è $\dfrac{(x^3+3)\log(x^3+3) - x^3}{3} + k$.`
  ],
  answer: { fields: [
      { label: "una primitiva",
        kind: "prim",
        expr: "((x**3+3)*log(x**3+3) - x**3)/3",
        dom: [-1, 2] }
    ] },
  stepChk: [
    "all(abs((diff(P('((x**3+3)*log(x**3+3) - x**3)/3'), x) - (P('x**2*log(x**3+3)'))).subs(x, Rational(v)).evalf(30)) < 1e-12 for v in ['-0.90', '0.51', '1.90'])"
  ] },

{ id: "fg-ind-19",
  cap: 1,
  topic: "parti",
  src: "Foglio di esercizi sugli integrali 2026/27, integrali indefiniti",
  text: String.raw`Determinare $$\int x^2\log(x+3)\,dx.$$`,
  steps: [
    String.raw`Per parti con FF $= \log(x+3)$ e FD $= x^2$ (primitiva scelta: $\frac{x^3 + 27}{3}$, che si semplifica con $x + 3$).`,
    String.raw`$\displaystyle\int x^2\log(x+3)\,dx = \frac{x^3 + 27}{3}\log(x+3) - \frac13\int(x^2 - 3x + 9)\,dx$.`,
    String.raw`Risultato: $\dfrac{x^3 + 27}{3}\log(x+3) - \dfrac{x^3}{9} + \dfrac{x^2}{2} - 3x + k$.`
  ],
  answer: { fields: [
      { label: "una primitiva",
        kind: "prim",
        expr: "(x**3+27)*log(x+3)/3 - x**3/9 + x**2/2 - 3*x",
        dom: [-2, 3] }
    ] },
  stepChk: [
    "all(abs((diff(P('(x**3+27)*log(x+3)/3 - x**3/9 + x**2/2 - 3*x'), x) - (P('x**2*log(x+3)'))).subs(x, Rational(v)).evalf(30)) < 1e-12 for v in ['-1.90', '0.51', '2.90'])"
  ] },

{ id: "fg-ind-20",
  cap: 1,
  topic: "radicali",
  src: "Foglio di esercizi sugli integrali 2026/27, integrali indefiniti",
  text: String.raw`Determinare $$\int \frac{x+2}{\sqrt{x-3}}\,dx.$$`,
  steps: [
    String.raw`**Seconda formula**: $t = \sqrt{x - 3}$, $x = g(t) = t^2 + 3$ con $t > 0$ ($g$ invertibile), $g'(t) = 2t$.`,
    String.raw`$\displaystyle\int\frac{t^2 + 5}{t}\,2t\,dt = \frac23t^3 + 10t + k$.`,
    String.raw`Risultato: $\dfrac23(x-3)\sqrt{x-3} + 10\sqrt{x-3} + k = \dfrac{2(x + 12)\sqrt{x-3}}{3} + k$.`
  ],
  answer: { fields: [
      { label: "una primitiva",
        kind: "prim",
        expr: "2*(x+12)*sqrt(x-3)/3",
        dom: [3.5, 8] }
    ] },
  stepChk: [
    "all(abs((diff(P('2*(x+12)*sqrt(x-3)/3'), x) - (P('(x+2)/sqrt(x-3)'))).subs(x, Rational(v)).evalf(30)) < 1e-12 for v in ['3.60', '5.76', '7.90'])"
  ] },

{ id: "fg-ind-21",
  cap: 1,
  topic: "radicali",
  src: "Foglio di esercizi sugli integrali 2026/27, integrali indefiniti",
  text: String.raw`Determinare $$\int \frac{\sqrt{x+1}}{x+5}\,dx.$$`,
  steps: [
    String.raw`**Seconda formula**: $t = \sqrt{x+1}$, $x = t^2 - 1$, $t \ge 0$, $dx = 2t\,dt$.`,
    String.raw`$\displaystyle\int\frac{t}{t^2+4}\,2t\,dt = \int\left(2 - \frac{8}{t^2 + 4}\right)dt = 2t - 4\arctan\frac t2 + k$.`,
    String.raw`Risultato: $2\sqrt{x+1} - 4\arctan\dfrac{\sqrt{x+1}}{2} + k$.`
  ],
  answer: { fields: [
      { label: "una primitiva",
        kind: "prim",
        expr: "2*sqrt(x+1) - 4*atan(sqrt(x+1)/2)",
        dom: [0, 6] }
    ] },
  stepChk: [
    "all(abs((diff(P('2*sqrt(x+1) - 4*atan(sqrt(x+1)/2)'), x) - (P('sqrt(x+1)/(x+5)'))).subs(x, Rational(v)).evalf(30)) < 1e-12 for v in ['0.10', '3.01', '5.90'])"
  ] },

{ id: "fg-ind-22",
  cap: 1,
  topic: "radicali",
  src: "Foglio di esercizi sugli integrali 2026/27, integrali indefiniti",
  text: String.raw`Determinare $$\int \frac{x - \sqrt{x+1}}{x+3}\,dx.$$`,
  steps: [
    String.raw`**Seconda formula**: $t = \sqrt{x+1}$, $x = t^2 - 1$, $dx = 2t\,dt$: $\displaystyle\int\frac{t^2 - 1 - t}{t^2 + 2}\,2t\,dt$.`,
    String.raw`Divisione: $\dfrac{2t^3 - 2t^2 - 2t}{t^2 + 2} = 2t - 2 + \dfrac{-6t + 4}{t^2 + 2}$.`,
    String.raw`$\displaystyle\int = t^2 - 2t - 3\log(t^2 + 2) + 2\sqrt2\arctan\frac{t}{\sqrt2} + k$.`,
    String.raw`Risultato: $x + 1 - 2\sqrt{x+1} - 3\log(x+3) + 2\sqrt2\arctan\sqrt{\dfrac{x+1}{2}} + k$.`
  ],
  answer: { fields: [
      { label: "una primitiva",
        kind: "prim",
        expr: "x + 1 - 2*sqrt(x+1) - 3*log(x+3) + 2*sqrt(2)*atan(sqrt((x+1)/2))",
        dom: [0, 6] }
    ] },
  stepChk: [
    "all(abs((diff(P('x + 1 - 2*sqrt(x+1) - 3*log(x+3) + 2*sqrt(2)*atan(sqrt((x+1)/2))'), x) - (P('(x - sqrt(x+1))/(x+3)'))).subs(x, Rational(v)).evalf(30)) < 1e-12 for v in ['0.10', '3.01', '5.90'])"
  ] },

{ id: "fg-ind-23",
  cap: 1,
  topic: "radicali",
  src: "Foglio di esercizi sugli integrali 2026/27, integrali indefiniti",
  text: String.raw`Determinare $$\int \frac{2x + 3 - \sqrt x}{x - 2}\,dx.$$`,
  steps: [
    String.raw`**Seconda formula**: $t = \sqrt x$, $x = t^2$, $dx = 2t\,dt$ (lavoriamo in $]2,+\infty[$, cioè $t > \sqrt2$): $\displaystyle\int\frac{2t^2 + 3 - t}{t^2 - 2}\,2t\,dt$.`,
    String.raw`Divisione: $\dfrac{4t^3 - 2t^2 + 6t}{t^2 - 2} = 4t - 2 + \dfrac{14t - 4}{t^2 - 2}$, e $\dfrac{14t - 4}{t^2-2} = 7\cdot\dfrac{2t}{t^2-2} - \dfrac{4}{t^2 - 2}$, con $\dfrac{4}{t^2-2} = \sqrt2\left(\dfrac1{t - \sqrt2} - \dfrac1{t + \sqrt2}\right)$.`,
    String.raw`$\displaystyle\int = 2t^2 - 2t + 7\log|t^2 - 2| - \sqrt2\log\left|\frac{t - \sqrt2}{t + \sqrt2}\right| + k$.`,
    String.raw`Risultato: $2x - 2\sqrt x + 7\log|x - 2| - \sqrt2\log\left|\dfrac{\sqrt x - \sqrt2}{\sqrt x + \sqrt2}\right| + k$.`
  ],
  answer: { fields: [
      { label: "una primitiva",
        kind: "prim",
        expr: "2*x - 2*sqrt(x) + 7*log(x-2) - sqrt(2)*log((sqrt(x)-sqrt(2))/(sqrt(x)+sqrt(2)))",
        dom: [2.5, 7] }
    ] },
  stepChk: [
    "all(abs((diff(P('2*x - 2*sqrt(x) + 7*log(x-2) - sqrt(2)*log((sqrt(x)-sqrt(2))/(sqrt(x)+sqrt(2)))'), x) - (P('(2*x + 3 - sqrt(x))/(x-2)'))).subs(x, Rational(v)).evalf(30)) < 1e-12 for v in ['2.60', '4.76', '6.90'])"
  ] },

{ id: "fg-ind-24",
  cap: 1,
  topic: "radicali",
  src: "Foglio di esercizi sugli integrali 2026/27, integrali indefiniti",
  text: String.raw`Determinare $$\int \sqrt{\frac{x+4}{x-1}}\,dx.$$`,
  steps: [
    String.raw`**Dominio**: $x \le -4$ oppure $x > 1$. Lavoriamo in $]1,+\infty[$.`,
    String.raw`**Seconda formula**: $t = \sqrt{\frac{x+4}{x-1}}$, $x = g(t) = \dfrac{t^2 + 4}{t^2 - 1} = 1 + \dfrac{5}{t^2-1}$ con $t > 1$ ($g$ invertibile), $g'(t) = -\dfrac{10t}{(t^2-1)^2}$.`,
    String.raw`$\displaystyle\int t\cdot\frac{-10t}{(t^2-1)^2}\,dt = -10\int\frac{t^2}{(t-1)^2(t+1)^2}\,dt$ e $\dfrac{t^2}{(t-1)^2(t+1)^2} = \dfrac14\left(\dfrac{1}{t-1} + \dfrac{1}{(t-1)^2} - \dfrac{1}{t+1} + \dfrac{1}{(t+1)^2}\right)$.`,
    String.raw`$\displaystyle\int = -\frac52\log\frac{t-1}{t+1} + \frac{5t}{t^2 - 1} + k$, e $\dfrac{5t}{t^2-1} = t(x - 1) = \sqrt{(x+4)(x-1)}$.`,
    String.raw`Risultato: $\sqrt{(x+4)(x-1)} - \dfrac52\log\dfrac{t - 1}{t + 1} + k$ con $t = \sqrt{\dfrac{x+4}{x-1}}$.`
  ],
  answer: { fields: [
      { label: "una primitiva",
        kind: "prim",
        expr: "sqrt((x+4)*(x-1)) - 5*log((sqrt((x+4)/(x-1))-1)/(sqrt((x+4)/(x-1))+1))/2",
        dom: [1.5, 7] }
    ] },
  stepChk: [
    "all(abs((diff(P('sqrt((x+4)*(x-1)) - 5*log((sqrt((x+4)/(x-1))-1)/(sqrt((x+4)/(x-1))+1))/2'), x) - (P('sqrt((x+4)/(x-1))'))).subs(x, Rational(v)).evalf(30)) < 1e-12 for v in ['1.60', '4.26', '6.90'])"
  ] },

{ id: "fg-abs-a",
  cap: 1,
  topic: "valore_assoluto",
  src: "Foglio di esercizi sugli integrali 2026/27, es. 2a",
  text: String.raw`Determinare la primitiva $F$ in $]-\infty,+\infty[$ della funzione $f(x) = x^2 + 2|x-3| + x$ tale che $F(0) = 1$.`,
  steps: [
    String.raw`**Scriviamo $f$ a tratti**, studiando il segno dell'argomento del valore assoluto: $$f(x) = \begin{cases} x^{2} - x + 6 & x < 3 \\ x^{2} + 3 x - 6 & x \ge 3 \end{cases}$$`,
    String.raw`**Primitive dei singoli rami**, ognuna con la sua costante: per $x < 3$: $\displaystyle\int (x^{2} - x + 6)\,dx = \frac{x^{3}}{3} - \frac{x^{2}}{2} + 6 x + k_1$; per $x \ge 3$: $\displaystyle\int (x^{2} + 3 x - 6)\,dx = \frac{x^{3}}{3} + \frac{3 x^{2}}{2} - 6 x + k_2$.`,
    String.raw`**Continuità in $x = 3$**: $F$ è derivabile in $]-\infty, +\infty[$, quindi continua; i limiti dei due rami devono coincidere: $\frac{45}{2} + k_1 = \frac{9}{2} + k_2$ , da cui $k_2 = k_1 + 18$.`,
    String.raw`**Condizione** $F(0) = 1$: il punto $x_0 = 0$ sta nel ramo $x < 3$, quindi $0 + k_1 = 1$, cioè $k_1 = 1$.`,
    String.raw`**Risultato**: $$F(x) = \begin{cases} \frac{x^{3}}{3} - \frac{x^{2}}{2} + 6 x + 1 & x < 3 \\[1mm] \frac{x^{3}}{3} + \frac{3 x^{2}}{2} - 6 x + 19 & x \ge 3 \end{cases}$$ Controllo: $F(0) = 1$ e i rami coincidono nei punti di raccordo.`
  ],
  answer: { fields: [
      { label: String.raw`F(x) per $x < 3$`,
        kind: "expr",
        expr: "x**3/3 - x**2/2 + 6*x + 1",
        dom: [0.0, 2.95] },
      { label: String.raw`F(x) per $x \ge 3$`,
        kind: "expr",
        expr: "x**3/3 + 3*x**2/2 - 6*x + 19",
        dom: [3.05, 6.0] }
    ] },
  stepChk: [
    "simplify(diff(P('x**3/3 - x**2/2 + 6*x'), x) - (P('x**2 - x + 6'))) == 0",
    "simplify(diff(P('x**3/3 + 3*x**2/2 - 6*x'), x) - (P('x**2 + 3*x - 6'))) == 0",
    "simplify(P('1') - (P('1'))) == 0"
  ] },

{ id: "fg-abs-b",
  cap: 1,
  topic: "valore_assoluto",
  src: "Foglio di esercizi sugli integrali 2026/27, es. 2b",
  text: String.raw`Determinare la primitiva $F$ in $]-\infty,+\infty[$ della funzione $f(x) = x^2 - |x-1| + 2x + 3$ tale che $F(-1) = \frac76$.`,
  steps: [
    String.raw`**Scriviamo $f$ a tratti**, studiando il segno dell'argomento del valore assoluto: $$f(x) = \begin{cases} x^{2} + 3 x + 2 & x < 1 \\ x^{2} + x + 4 & x \ge 1 \end{cases}$$`,
    String.raw`**Primitive dei singoli rami**, ognuna con la sua costante: per $x < 1$: $\displaystyle\int (x^{2} + 3 x + 2)\,dx = \frac{x^{3}}{3} + \frac{3 x^{2}}{2} + 2 x + k_1$; per $x \ge 1$: $\displaystyle\int (x^{2} + x + 4)\,dx = \frac{x^{3}}{3} + \frac{x^{2}}{2} + 4 x + k_2$.`,
    String.raw`**Continuità in $x = 1$**: $F$ è derivabile in $]-\infty, +\infty[$, quindi continua; i limiti dei due rami devono coincidere: $\frac{23}{6} + k_1 = \frac{29}{6} + k_2$ , da cui $k_2 = k_1  -1$.`,
    String.raw`**Condizione** $F(-1) = \frac{7}{6}$: il punto $x_0 = -1$ sta nel ramo $x < 1$, quindi $- \frac{5}{6} + k_1 = \frac{7}{6}$, cioè $k_1 = 2$.`,
    String.raw`**Risultato**: $$F(x) = \begin{cases} \frac{x^{3}}{3} + \frac{3 x^{2}}{2} + 2 x + 2 & x < 1 \\[1mm] \frac{x^{3}}{3} + \frac{x^{2}}{2} + 4 x + 1 & x \ge 1 \end{cases}$$ Controllo: $F(-1) = \frac{7}{6}$ e i rami coincidono nei punti di raccordo.`
  ],
  answer: { fields: [
      { label: String.raw`F(x) per $x < 1$`,
        kind: "expr",
        expr: "x**3/3 + 3*x**2/2 + 2*x + 2",
        dom: [-2.0, 0.95] },
      { label: String.raw`F(x) per $x \ge 1$`,
        kind: "expr",
        expr: "x**3/3 + x**2/2 + 4*x + 1",
        dom: [1.05, 4.0] }
    ] },
  stepChk: [
    "simplify(diff(P('x**3/3 + 3*x**2/2 + 2*x'), x) - (P('x**2 + 3*x + 2'))) == 0",
    "simplify(diff(P('x**3/3 + x**2/2 + 4*x'), x) - (P('x**2 + x + 4'))) == 0",
    "simplify(P('7/6') - (P('7/6'))) == 0"
  ] },

{ id: "fg-abs-c",
  cap: 1,
  topic: "valore_assoluto",
  src: "Foglio di esercizi sugli integrali 2026/27, es. 2c",
  text: String.raw`Determinare la primitiva $F$ in $]-\infty,+\infty[$ della funzione $f(x) = 2x^2 - |x^2-4| - 2x$ tale che $F(3) = 0$.`,
  steps: [
    String.raw`**Scriviamo $f$ a tratti**, studiando il segno dell'argomento del valore assoluto: $$f(x) = \begin{cases} x^{2} - 2 x + 4 & x < -2 \\ 3 x^{2} - 2 x - 4 & -2 \le x < 2 \\ x^{2} - 2 x + 4 & x \ge 2 \end{cases}$$`,
    String.raw`**Primitive dei singoli rami**, ognuna con la sua costante: per $x < -2$: $\displaystyle\int (x^{2} - 2 x + 4)\,dx = \frac{x^{3}}{3} - x^{2} + 4 x + k_1$; per $-2 \le x < 2$: $\displaystyle\int (3 x^{2} - 2 x - 4)\,dx = x^{3} - x^{2} - 4 x + k_2$; per $x \ge 2$: $\displaystyle\int (x^{2} - 2 x + 4)\,dx = \frac{x^{3}}{3} - x^{2} + 4 x + k_3$.`,
    String.raw`**Continuità in $x = -2$**: $F$ è derivabile in $]-\infty, +\infty[$, quindi continua; i limiti dei due rami devono coincidere: $- \frac{44}{3} + k_1 = -4 + k_2$ , da cui $k_2 = k_1  - \frac{32}{3}$.`,
    String.raw`**Continuità in $x = 2$**: $F$ è derivabile in $]-\infty, +\infty[$, quindi continua; i limiti dei due rami devono coincidere: $-4 + k_2 = \frac{20}{3} + k_3$ (nel ramo di sinistra $k_2 = k_1 + - \frac{32}{3}$), da cui $k_3 = k_1  - \frac{64}{3}$.`,
    String.raw`**Condizione** $F(3) = 0$: il punto $x_0 = 3$ sta nel ramo $x \ge 2$, quindi $12 + k_3 = 0$, cioè $k_3 = -12$ e $k_1 = \frac{28}{3}$.`,
    String.raw`**Risultato**: $$F(x) = \begin{cases} \frac{x^{3}}{3} - x^{2} + 4 x + \frac{28}{3} & x < -2 \\[1mm] x^{3} - x^{2} - 4 x - \frac{4}{3} & -2 \le x < 2 \\[1mm] \frac{x^{3}}{3} - x^{2} + 4 x - 12 & x \ge 2 \end{cases}$$ Controllo: $F(3) = 0$ e i rami coincidono nei punti di raccordo.`
  ],
  answer: { fields: [
      { label: String.raw`F(x) per $x < -2$`,
        kind: "expr",
        expr: "x**3/3 - x**2 + 4*x + 28/3",
        dom: [-5.0, -2.05] },
      { label: String.raw`F(x) per $-2 \le x < 2$`,
        kind: "expr",
        expr: "x**3 - x**2 - 4*x - 4/3",
        dom: [-1.92, 1.92] },
      { label: String.raw`F(x) per $x \ge 2$`,
        kind: "expr",
        expr: "x**3/3 - x**2 + 4*x - 12",
        dom: [2.05, 5.0] }
    ] },
  stepChk: [
    "simplify(diff(P('x**3/3 - x**2 + 4*x'), x) - (P('x**2 - 2*x + 4'))) == 0",
    "simplify(diff(P('x**3 - x**2 - 4*x'), x) - (P('3*x**2 - 2*x - 4'))) == 0",
    "simplify(diff(P('x**3/3 - x**2 + 4*x'), x) - (P('x**2 - 2*x + 4'))) == 0",
    "simplify(P('0') - (P('0'))) == 0"
  ] },

{ id: "fg-abs-d",
  cap: 1,
  topic: "valore_assoluto",
  src: "Foglio di esercizi sugli integrali 2026/27, es. 2d",
  text: String.raw`Determinare la primitiva $F$ in $]-\infty,+\infty[$ della funzione $f(x) = 3x - |1-x^2| + 2x^2$ tale che $F(2) = 3$.`,
  steps: [
    String.raw`**Scriviamo $f$ a tratti**, studiando il segno dell'argomento del valore assoluto: $$f(x) = \begin{cases} x^{2} + 3 x + 1 & x < -1 \\ 3 x^{2} + 3 x - 1 & -1 \le x < 1 \\ x^{2} + 3 x + 1 & x \ge 1 \end{cases}$$`,
    String.raw`**Primitive dei singoli rami**, ognuna con la sua costante: per $x < -1$: $\displaystyle\int (x^{2} + 3 x + 1)\,dx = \frac{x^{3}}{3} + \frac{3 x^{2}}{2} + x + k_1$; per $-1 \le x < 1$: $\displaystyle\int (3 x^{2} + 3 x - 1)\,dx = x^{3} + \frac{3 x^{2}}{2} - x + k_2$; per $x \ge 1$: $\displaystyle\int (x^{2} + 3 x + 1)\,dx = \frac{x^{3}}{3} + \frac{3 x^{2}}{2} + x + k_3$.`,
    String.raw`**Continuità in $x = -1$**: $F$ è derivabile in $]-\infty, +\infty[$, quindi continua; i limiti dei due rami devono coincidere: $\frac{1}{6} + k_1 = \frac{3}{2} + k_2$ , da cui $k_2 = k_1  - \frac{4}{3}$.`,
    String.raw`**Continuità in $x = 1$**: $F$ è derivabile in $]-\infty, +\infty[$, quindi continua; i limiti dei due rami devono coincidere: $\frac{3}{2} + k_2 = \frac{17}{6} + k_3$ (nel ramo di sinistra $k_2 = k_1 + - \frac{4}{3}$), da cui $k_3 = k_1  - \frac{8}{3}$.`,
    String.raw`**Condizione** $F(2) = 3$: il punto $x_0 = 2$ sta nel ramo $x \ge 1$, quindi $\frac{32}{3} + k_3 = 3$, cioè $k_3 = - \frac{23}{3}$ e $k_1 = -5$.`,
    String.raw`**Risultato**: $$F(x) = \begin{cases} \frac{x^{3}}{3} + \frac{3 x^{2}}{2} + x - 5 & x < -1 \\[1mm] x^{3} + \frac{3 x^{2}}{2} - x - \frac{19}{3} & -1 \le x < 1 \\[1mm] \frac{x^{3}}{3} + \frac{3 x^{2}}{2} + x - \frac{23}{3} & x \ge 1 \end{cases}$$ Controllo: $F(2) = 3$ e i rami coincidono nei punti di raccordo.`
  ],
  answer: { fields: [
      { label: String.raw`F(x) per $x < -1$`,
        kind: "expr",
        expr: "x**3/3 + 3*x**2/2 + x - 5",
        dom: [-4.0, -1.05] },
      { label: String.raw`F(x) per $-1 \le x < 1$`,
        kind: "expr",
        expr: "x**3 + 3*x**2/2 - x - 19/3",
        dom: [-0.96, 0.96] },
      { label: String.raw`F(x) per $x \ge 1$`,
        kind: "expr",
        expr: "x**3/3 + 3*x**2/2 + x - 23/3",
        dom: [1.05, 4.0] }
    ] },
  stepChk: [
    "simplify(diff(P('x**3/3 + 3*x**2/2 + x'), x) - (P('x**2 + 3*x + 1'))) == 0",
    "simplify(diff(P('x**3 + 3*x**2/2 - x'), x) - (P('3*x**2 + 3*x - 1'))) == 0",
    "simplify(diff(P('x**3/3 + 3*x**2/2 + x'), x) - (P('x**2 + 3*x + 1'))) == 0",
    "simplify(P('3') - (P('3'))) == 0"
  ] },

{ id: "fg-abs-e",
  cap: 1,
  topic: "valore_assoluto",
  src: "Foglio di esercizi sugli integrali 2026/27, es. 2e",
  text: String.raw`Determinare la primitiva $F$ in $]-\infty,+\infty[$ della funzione $f(x) = \log(2x^2 + |x-1|)$ tale che $F(2) = \frac34\log 2$.`,
  steps: [
    String.raw`**Scriviamo $f$ a tratti**, studiando il segno dell'argomento del valore assoluto: $$f(x) = \begin{cases} \log(2 x^{2} - x + 1) & x < 1 \\ \log(2 x^{2} + x - 1) & x \ge 1 \end{cases}$$`,
    String.raw`**Primitive dei singoli rami**, ognuna con la sua costante (per parti con FD $= 1$; per $x < 1$ resta una razionale con $\Delta < 0$, per $x \ge 1$ il trinomio si scompone in $(2x-1)(x+1)$): per $x < 1$: $\displaystyle\int \log(2 x^{2} - x + 1)\,dx = x \log(2 x^{2} - x + 1) - 2 x - \frac{\log(2 x^{2} - x + 1)}{4} + \frac{\sqrt{7} \arctan(\frac{\sqrt{7} (4 x - 1)}{7})}{2} + k_1$; per $x \ge 1$: $\displaystyle\int \log(2 x^{2} + x - 1)\,dx = x \log(2 x^{2} + x - 1) - 2 x + \log(x + 1) - \frac{\log(2 x - 1)}{2} + k_2$.`,
    String.raw`**Continuità in $x = 1$**: $F$ è derivabile in $]-\infty, +\infty[$, quindi continua; i limiti dei due rami devono coincidere: $-2 + \frac{3 \log(2)}{4} + \frac{\sqrt{7} \arctan(\frac{3 \sqrt{7}}{7})}{2} + k_1 = -2 + 2 \log(2) + k_2$ , da cui $k_2 = k_1  - \frac{5 \log(2)}{4} + \frac{\sqrt{7} \arctan(\frac{3 \sqrt{7}}{7})}{2}$.`,
    String.raw`**Condizione** $F(2) = \frac{3 \log(2)}{4}$: il punto $x_0 = 2$ sta nel ramo $x \ge 1$, quindi $-4 + \frac{\log(3)}{2} + 2 \log(9) + k_2 = \frac{3 \log(2)}{4}$, cioè $k_2 = - \frac{9 \log(3)}{2} + \frac{3 \log(2)}{4} + 4$ e $k_1 = - \frac{9 \log(3)}{2} - \frac{\sqrt{7} \arctan(\frac{3 \sqrt{7}}{7})}{2} + 2 \log(2) + 4$.`,
    String.raw`**Risultato**: $$F(x) = \begin{cases} x \log(2 x^{2} - x + 1) - 2 x - \frac{\log(2 x^{2} - x + 1)}{4} + \frac{\sqrt{7} \arctan(\frac{\sqrt{7} (4 x - 1)}{7})}{2} - \frac{9 \log(3)}{2} - \frac{\sqrt{7} \arctan(\frac{3 \sqrt{7}}{7})}{2} + 2 \log(2) + 4 & x < 1 \\[1mm] x \log(2 x^{2} + x - 1) - 2 x + \log(x + 1) - \frac{\log(2 x - 1)}{2} - \frac{9 \log(3)}{2} + \frac{3 \log(2)}{4} + 4 & x \ge 1 \end{cases}$$ Controllo: $F(2) = \frac{3 \log(2)}{4}$ e i rami coincidono nei punti di raccordo.`
  ],
  answer: { fields: [
      { label: String.raw`F(x) per $x < 1$`,
        kind: "expr",
        expr: "x*log(2*x**2 - x + 1) - 2*x - log(2*x**2 - x + 1)/4 + sqrt(7)*atan(sqrt(7)*(4*x - 1)/7)/2 - 9*log(3)/2 - sqrt(7)*atan(3*sqrt(7)/7)/2 + 2*log(2) + 4",
        dom: [-2.0, 0.95] },
      { label: String.raw`F(x) per $x \ge 1$`,
        kind: "expr",
        expr: "x*log(2*x**2 + x - 1) - 2*x + log(x + 1) - log(2*x - 1)/2 - 9*log(3)/2 + 3*log(2)/4 + 4",
        dom: [1.05, 4.0] }
    ] },
  stepChk: [
    "simplify(diff(P('x*log(2*x**2 - x + 1) - 2*x - log(2*x**2 - x + 1)/4 + sqrt(7)*atan(sqrt(7)*(4*x - 1)/7)/2'), x) - (P('log(2*x**2 - x + 1)'))) == 0",
    "simplify(diff(P('x*log(2*x**2 + x - 1) - 2*x + log(x + 1) - log(2*x - 1)/2'), x) - (P('log(2*x**2 + x - 1)'))) == 0",
    "simplify(P('-4*log(3) + 3*log(2)/4 + 2*log(9)') - (P('3*log(2)/4'))) == 0"
  ],
  diff: 3 },

{ id: "fg-abs-g",
  cap: 1,
  topic: "valore_assoluto",
  src: "Foglio di esercizi sugli integrali 2026/27, es. 2g",
  text: String.raw`Determinare la primitiva $F$ in $]-\infty,+\infty[$ della funzione $f(x) = 2x^2 + |x^2-4| - 2x + 1$ tale che $F(0) = \frac13$.`,
  steps: [
    String.raw`**Scriviamo $f$ a tratti**, studiando il segno dell'argomento del valore assoluto: $$f(x) = \begin{cases} 3 x^{2} - 2 x - 3 & x < -2 \\ x^{2} - 2 x + 5 & -2 \le x < 2 \\ 3 x^{2} - 2 x - 3 & x \ge 2 \end{cases}$$`,
    String.raw`**Primitive dei singoli rami**, ognuna con la sua costante: per $x < -2$: $\displaystyle\int (3 x^{2} - 2 x - 3)\,dx = x^{3} - x^{2} - 3 x + k_1$; per $-2 \le x < 2$: $\displaystyle\int (x^{2} - 2 x + 5)\,dx = \frac{x^{3}}{3} - x^{2} + 5 x + k_2$; per $x \ge 2$: $\displaystyle\int (3 x^{2} - 2 x - 3)\,dx = x^{3} - x^{2} - 3 x + k_3$.`,
    String.raw`**Continuità in $x = -2$**: $F$ è derivabile in $]-\infty, +\infty[$, quindi continua; i limiti dei due rami devono coincidere: $-6 + k_1 = - \frac{50}{3} + k_2$ , da cui $k_2 = k_1 + \frac{32}{3}$.`,
    String.raw`**Continuità in $x = 2$**: $F$ è derivabile in $]-\infty, +\infty[$, quindi continua; i limiti dei due rami devono coincidere: $\frac{26}{3} + k_2 = -2 + k_3$ (nel ramo di sinistra $k_2 = k_1 + \frac{32}{3}$), da cui $k_3 = k_1 + \frac{64}{3}$.`,
    String.raw`**Condizione** $F(0) = \frac{1}{3}$: il punto $x_0 = 0$ sta nel ramo $-2 \le x < 2$, quindi $0 + k_2 = \frac{1}{3}$, cioè $k_2 = \frac{1}{3}$ e $k_1 = - \frac{31}{3}$.`,
    String.raw`**Risultato**: $$F(x) = \begin{cases} x^{3} - x^{2} - 3 x - \frac{31}{3} & x < -2 \\[1mm] \frac{x^{3}}{3} - x^{2} + 5 x + \frac{1}{3} & -2 \le x < 2 \\[1mm] x^{3} - x^{2} - 3 x + 11 & x \ge 2 \end{cases}$$ Controllo: $F(0) = \frac{1}{3}$ e i rami coincidono nei punti di raccordo.`
  ],
  answer: { fields: [
      { label: String.raw`F(x) per $x < -2$`,
        kind: "expr",
        expr: "x**3 - x**2 - 3*x - 31/3",
        dom: [-5.0, -2.05] },
      { label: String.raw`F(x) per $-2 \le x < 2$`,
        kind: "expr",
        expr: "x**3/3 - x**2 + 5*x + 1/3",
        dom: [-1.92, 1.92] },
      { label: String.raw`F(x) per $x \ge 2$`,
        kind: "expr",
        expr: "x**3 - x**2 - 3*x + 11",
        dom: [2.05, 5.0] }
    ] },
  stepChk: [
    "simplify(diff(P('x**3 - x**2 - 3*x'), x) - (P('3*x**2 - 2*x - 3'))) == 0",
    "simplify(diff(P('x**3/3 - x**2 + 5*x'), x) - (P('x**2 - 2*x + 5'))) == 0",
    "simplify(diff(P('x**3 - x**2 - 3*x'), x) - (P('3*x**2 - 2*x - 3'))) == 0",
    "simplify(P('1/3') - (P('1/3'))) == 0"
  ] },

{ id: "fg-def-1",
  cap: 1,
  topic: "definiti",
  src: "Foglio di esercizi sugli integrali 2026/27, integrali definiti",
  text: String.raw`Calcolare $$\int_{-2}^{2}|x|\log\frac{1}{x+3}\,dx.$$`,
  steps: [
    String.raw`$\log\frac1{x+3} = -\log(x+3)$. Spezzando in $0$: $\displaystyle\int_{-2}^0 x\log(x+3)\,dx - \int_0^2 x\log(x+3)\,dx$ (per $x < 0$, $-|x| = x$).`,
    String.raw`**Primitiva** di $x\log(x+3)$, per parti con FF $= \log(x+3)$ e FD $= x$ (primitiva scelta $\frac{x^2 - 9}{2}$): $G(x) = \dfrac{x^2-9}{2}\log(x+3) - \displaystyle\int\frac{x - 3}{2}\,dx = \dfrac{x^2-9}{2}\log(x+3) - \dfrac{x^2}{4} + \dfrac{3x}{2}$.`,
    String.raw`$G(0) = -\frac92\log3$, $G(-2) = -4$, $G(2) = -\frac52\log 5 + 2$.`,
    String.raw`Risultato: $\big(G(0) - G(-2)\big) - \big(G(2) - G(0)\big) = 2 - 9\log 3 + \dfrac52\log 5$.`
  ],
  answer: { fields: [
      { label: "valore dell'integrale",
        kind: "number",
        value: "2 - 9*log(3) + 5*log(5)/2" }
    ] },
  stepChk: [
    "simplify(diff(P('(x**2-9)*log(x+3)/2 - x**2/4 + 3*x/2'),x) - x*log(x+3)) == 0",
    "simplify(integrate(x*log(x+3),(x,-2,0)) - integrate(x*log(x+3),(x,0,2)) - P('2 - 9*log(3) + 5*log(5)/2')) == 0"
  ] },

{ id: "fg-def-2",
  cap: 1,
  topic: "definiti",
  src: "Foglio di esercizi sugli integrali 2026/27, integrali definiti",
  text: String.raw`Calcolare $$\int_{-3}^{4}|x^2-1|\,dx.$$`,
  steps: [
    String.raw`$x^2 - 1 \ge 0$ per $|x| \ge 1$: $\displaystyle\int_{-3}^{-1}(x^2-1)\,dx + \int_{-1}^1(1 - x^2)\,dx + \int_1^4(x^2-1)\,dx$.`,
    String.raw`Con la primitiva $\frac{x^3}{3} - x$: i tre pezzi valgono $\frac{20}{3}$, $\frac43$ e $18$.`,
    String.raw`Risultato: $26$.`
  ],
  answer: { fields: [
      { label: "valore dell'integrale",
        kind: "number",
        value: "26" }
    ] },
  stepChk: [
    "integrate(x**2-1,(x,-3,-1)) + integrate(1-x**2,(x,-1,1)) + integrate(x**2-1,(x,1,4)) == 26"
  ] },

{ id: "fg-def-3",
  cap: 1,
  topic: "definiti",
  src: "Foglio di esercizi sugli integrali 2026/27, integrali definiti",
  text: String.raw`Calcolare $$\int_0^\pi\frac{|\cos x|}{\sin^2x + 1}\,dx.$$`,
  steps: [
    String.raw`$\cos x \ge 0$ in $\left[0,\frac\pi2\right]$ e $\le 0$ in $\left[\frac\pi2,\pi\right]$: $\displaystyle\int_0^{\pi/2}\frac{\cos x}{1 + \sin^2x}\,dx - \int_{\pi/2}^\pi\frac{\cos x}{1 + \sin^2x}\,dx$.`,
    String.raw`**Primitiva** (forma composta, $\cos x$ è la derivata di $\sin x$): $\arctan(\sin x)$.`,
    String.raw`$\big[\arctan\sin x\big]_0^{\pi/2} - \big[\arctan\sin x\big]_{\pi/2}^{\pi} = \frac\pi4 - \left(0 - \frac\pi4\right) = \dfrac\pi2$.`
  ],
  answer: { fields: [
      { label: "valore dell'integrale",
        kind: "number",
        value: "pi/2" }
    ] },
  stepChk: [
    "simplify(diff(atan(sin(x)),x) - cos(x)/(1+sin(x)**2)) == 0"
  ] },

{ id: "fg-tan-1",
  cap: 1,
  topic: "funzione_integrale",
  src: "Foglio di esercizi sugli integrali 2026/27, esercizio sulla tangente",
  text: String.raw`Scrivere l'equazione della tangente al grafico di $F(x) = \displaystyle\int_0^x (t^2 - 1)\,dt$ nel punto $x = 4$ (in due modi).`,
  steps: [
    String.raw`La tangente è $y = F(4) + F'(4)(x - 4)$.`,
    String.raw`**Primo modo**: si calcola $F$: $F(x) = \left[\frac{t^3}{3} - t\right]_0^x = \frac{x^3}{3} - x$, quindi $F'(x) = x^2 - 1$.`,
    String.raw`**Secondo modo**: per il teorema di derivazione della funzione integrale $F'(x) = x^2 - 1$ senza calcolare $F$.`,
    String.raw`$F(4) = \frac{64}{3} - 4 = \frac{52}{3}$, $F'(4) = 15$: tangente $y = 15(x - 4) + \dfrac{52}{3}$, cioè $y = 15x - \dfrac{128}{3}$.`
  ],
  answer: { fields: [
      { label: String.raw`tangente: $y =$`,
        kind: "expr",
        expr: "15*x - 128/3",
        dom: [0, 8] }
    ] },
  stepChk: [
    "integrate(t**2-1,(t,0,4)) == Rational(52,3)"
  ] },

{ id: "fg-tan-2",
  cap: 1,
  topic: "funzione_integrale",
  src: "Foglio di esercizi sugli integrali 2026/27, esercizio sulla tangente",
  text: String.raw`Scrivere l'equazione della tangente al grafico di $F(x) = \displaystyle\int_1^x \sqrt{t+3}\,dt$ nel punto $x = 5$ (in due modi).`,
  steps: [
    String.raw`**Primo modo**: $F(x) = \left[\frac23(t+3)^{3/2}\right]_1^x = \frac23(x+3)^{3/2} - \frac{16}{3}$, e $F'(x) = \sqrt{x+3}$.`,
    String.raw`**Secondo modo**: teorema di derivazione della funzione integrale, $F'(x) = \sqrt{x+3}$.`,
    String.raw`$F(5) = \frac23\cdot 8^{3/2} - \frac{16}3 = \frac{32\sqrt2 - 16}{3}$, $F'(5) = \sqrt8 = 2\sqrt2$.`,
    String.raw`Tangente: $y = 2\sqrt2\,(x - 5) + \dfrac{32\sqrt2 - 16}{3}$.`
  ],
  answer: { fields: [
      { label: String.raw`tangente: $y =$`,
        kind: "expr",
        expr: "2*sqrt(2)*(x-5) + (32*sqrt(2)-16)/3",
        dom: [0, 8] }
    ] },
  stepChk: [
    "simplify(integrate(sqrt(t+3),(t,1,5)) - (32*sqrt(2)-16)/3) == 0"
  ] },

{ id: "fg-tan-3",
  cap: 1,
  topic: "funzione_integrale",
  src: "Foglio di esercizi sugli integrali 2026/27, esercizio sulla tangente",
  text: String.raw`Scrivere l'equazione della tangente al grafico di $F(x) = \displaystyle\int_0^x e^{t^2}\,dt$ nel punto $x = 4$.`,
  steps: [
    String.raw`$e^{t^2}$ non ha primitive elementari: si può fare **in un solo modo**, con il teorema di derivazione della funzione integrale: $F'(x) = e^{x^2}$, quindi $F'(4) = e^{16}$.`,
    String.raw`$F(4) = \int_0^4 e^{t^2}\,dt$ è un numero che resta indicato così.`,
    String.raw`Tangente: $y = \displaystyle\int_0^4 e^{t^2}\,dt + e^{16}(x - 4)$.`
  ],
  answer: { fields: [
      { label: "coefficiente angolare della tangente",
        kind: "number",
        value: "exp(16)" }
    ] },
  stepChk: [
    "diff(Integral(exp(t**2),(t,0,x)),x).subs(x,4) == exp(16)"
  ] },

{ id: "fg-cond-1",
  cap: 1,
  topic: "funzione_integrale",
  src: "Foglio di esercizi sugli integrali 2026/27, primitive con condizione",
  text: String.raw`Trovare la funzione $F$, primitiva di $f(x) = x^3 + 2x$ in $]-\infty,+\infty[$, tale che $F(1) = 2$ (in due modi).`,
  steps: [
    String.raw`**Primo modo**: le primitive sono $\frac{x^4}{4} + x^2 + k$; da $F(1) = \frac14 + 1 + k = 2$ si ha $k = \frac34$.`,
    String.raw`**Secondo modo**: con la funzione integrale, $F(x) = 2 + \displaystyle\int_1^x (t^3 + 2t)\,dt = 2 + \left[\frac{t^4}{4} + t^2\right]_1^x$.`,
    String.raw`Risultato (uguale nei due modi): $F(x) = \dfrac{x^4}{4} + x^2 + \dfrac34$.`
  ],
  answer: { fields: [
      { label: "F(x)",
        kind: "expr",
        expr: "x**4/4 + x**2 + 3/4",
        dom: [-2, 2] }
    ] },
  stepChk: [
    "simplify(2 + integrate(t**3+2*t,(t,1,x)) - P('x**4/4 + x**2 + 3/4')) == 0"
  ] },

{ id: "fg-cond-3",
  cap: 1,
  topic: "funzione_integrale",
  src: "Foglio di esercizi sugli integrali 2026/27, primitive con condizione",
  text: String.raw`Trovare la funzione $F$, primitiva di $f(x) = e^{-x^2}$ in $]-\infty,+\infty[$, tale che $F(3) = 1$.`,
  steps: [
    String.raw`$e^{-x^2}$ è continua, quindi ha primitive (teorema fondamentale), ma non elementari: si può fare **in un solo modo**.`,
    String.raw`$F(x) = 1 + \displaystyle\int_3^x e^{-t^2}\,dt$: è una primitiva (derivazione della funzione integrale) e $F(3) = 1 + 0 = 1$.`
  ],
  answer: { fields: [] },
  stepChk: [] },

{ id: "fg-ode-01",
  cap: 2,
  topic: "somiglianza",
  src: "Foglio di esercizi sulle equazioni differenziali, es. 1",
  text: String.raw`Determinare l'integrale generale dell'equazione differenziale $$y'' - y' - 2y = e^{3x}(2x+1)$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' - y' - 2y = 0$. Equazione caratteristica $\alpha^{2} - \alpha - 2 = 0$: $\alpha = -1$, $\alpha = 2$. Integrale generale dell'omogenea: $k_1e^{- x} + k_2e^{2 x}$.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Termine noto del tipo $e^{hx}p(x)$ con $h = 3$, $m = 1$. $3$ non è radice dell'equazione caratteristica, quindi $s = 0$: si cerca $\bar y = (a x + b) e^{3 x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{3 x}$ si ottiene $4 a x + 5 a + 4 b = 2 x + 1$; per il principio di identità dei polinomi $a = \frac{1}{2}, b = - \frac{3}{8}$. Quindi $\bar y = (\frac{x}{2} - \frac{3}{8}) e^{3 x}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1e^{- x} + k_2e^{2 x} + \frac{(4 x - 3) e^{3 x}}{8}$.`
  ],
  answer: { fields: [
      { label: String.raw`un integrale particolare $\bar y(x)$`,
        kind: "ode",
        co: [1.0, -1.0, -2.0],
        rhs: "(2*x + 1)*exp(3*x)",
        dom: [-1.5, 1.5],
        expr: "(4*x - 3)*exp(3*x)/8" }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('(x/2 - 3/8)*exp(3*x)'), x, 2) + (-1)*diff(P('(x/2 - 3/8)*exp(3*x)'), x, 1) + (-2)*diff(P('(x/2 - 3/8)*exp(3*x)'), x, 0) - (P('(2*x + 1)*exp(3*x)')))) == 0"
  ] },

{ id: "fg-ode-02",
  cap: 2,
  topic: "somiglianza",
  src: "Foglio di esercizi sulle equazioni differenziali, es. 1",
  text: String.raw`Determinare l'integrale generale dell'equazione differenziale $$y'' - y' - 2y = e^{2x}(2x+1)$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' - y' - 2y = 0$. Equazione caratteristica $\alpha^{2} - \alpha - 2 = 0$: $\alpha = -1$, $\alpha = 2$. Integrale generale dell'omogenea: $k_1e^{- x} + k_2e^{2 x}$.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Termine noto del tipo $e^{hx}p(x)$ con $h = 2$, $m = 1$. $2$ è radice dell'equazione caratteristica (con molteplicità 1), quindi $s = 1$: si cerca $\bar y = x (a x + b) e^{2 x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{2 x}$ si ottiene $6 a x + 2 a + 3 b = 2 x + 1$; per il principio di identità dei polinomi $a = \frac{1}{3}, b = \frac{1}{9}$. Quindi $\bar y = x (\frac{x}{3} + \frac{1}{9}) e^{2 x}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1e^{- x} + k_2e^{2 x} + \frac{x (3 x + 1) e^{2 x}}{9}$.`
  ],
  answer: { fields: [
      { label: String.raw`un integrale particolare $\bar y(x)$`,
        kind: "ode",
        co: [1.0, -1.0, -2.0],
        rhs: "(2*x + 1)*exp(2*x)",
        dom: [-1.5, 1.5],
        expr: "x*(3*x + 1)*exp(2*x)/9" }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('x*(x/3 + 1/9)*exp(2*x)'), x, 2) + (-1)*diff(P('x*(x/3 + 1/9)*exp(2*x)'), x, 1) + (-2)*diff(P('x*(x/3 + 1/9)*exp(2*x)'), x, 0) - (P('(2*x + 1)*exp(2*x)')))) == 0"
  ] },

{ id: "fg-ode-03",
  cap: 2,
  topic: "somiglianza",
  src: "Foglio di esercizi sulle equazioni differenziali, es. 1",
  text: String.raw`Determinare l'integrale generale dell'equazione differenziale $$y'' - 4y' + 4y = e^{2x}(2x+1)$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' - 4y' + 4y = 0$. Equazione caratteristica $\alpha^{2} - 4 \alpha + 4 = 0$: $\alpha = 2$ (molteplicità 2). Integrale generale dell'omogenea: $k_1e^{2 x} + k_2x e^{2 x}$.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Termine noto del tipo $e^{hx}p(x)$ con $h = 2$, $m = 1$. $2$ è radice dell'equazione caratteristica (con molteplicità 2), quindi $s = 2$: si cerca $\bar y = x^{2} (a x + b) e^{2 x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{2 x}$ si ottiene $6 a x + 2 b = 2 x + 1$; per il principio di identità dei polinomi $a = \frac{1}{3}, b = \frac{1}{2}$. Quindi $\bar y = x^{2} (\frac{x}{3} + \frac{1}{2}) e^{2 x}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1e^{2 x} + k_2x e^{2 x} + \frac{x^{2} (2 x + 3) e^{2 x}}{6}$.`
  ],
  answer: { fields: [
      { label: String.raw`un integrale particolare $\bar y(x)$`,
        kind: "ode",
        co: [1.0, -4.0, 4.0],
        rhs: "(2*x + 1)*exp(2*x)",
        dom: [-1.5, 1.5],
        expr: "x**2*(2*x + 3)*exp(2*x)/6" }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('x**2*(x/3 + 1/2)*exp(2*x)'), x, 2) + (-4)*diff(P('x**2*(x/3 + 1/2)*exp(2*x)'), x, 1) + (4)*diff(P('x**2*(x/3 + 1/2)*exp(2*x)'), x, 0) - (P('(2*x + 1)*exp(2*x)')))) == 0"
  ] },

{ id: "fg-ode-04",
  cap: 2,
  topic: "somiglianza",
  src: "Foglio di esercizi sulle equazioni differenziali, es. 1",
  text: String.raw`Determinare l'integrale generale dell'equazione differenziale $$y'' + 2y' + 3y = e^{2x}x^2$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' + 2y' + 3y = 0$. Equazione caratteristica $\alpha^{2} + 2 \alpha + 3 = 0$: $\alpha = -1 \pm \sqrt{2}i$. Integrale generale dell'omogenea: $k_1e^{- x} \cos \sqrt{2} x  + k_2e^{- x} \sin \sqrt{2} x $.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Termine noto del tipo $e^{hx}p(x)$ con $h = 2$, $m = 2$. $2$ non è radice dell'equazione caratteristica, quindi $s = 0$: si cerca $\bar y = (a x^{2} + b x + c) e^{2 x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{2 x}$ si ottiene $11 a x^{2} + 2 a + 6 b + 11 c + x (12 a + 11 b) = x^{2}$; per il principio di identità dei polinomi $a = \frac{1}{11}, b = - \frac{12}{121}, c = \frac{50}{1331}$. Quindi $\bar y = (\frac{x^{2}}{11} - \frac{12 x}{121} + \frac{50}{1331}) e^{2 x}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1e^{- x} \cos \sqrt{2} x  + k_2e^{- x} \sin \sqrt{2} x  + \frac{(121 x^{2} - 132 x + 50) e^{2 x}}{1331}$.`
  ],
  answer: { fields: [
      { label: String.raw`un integrale particolare $\bar y(x)$`,
        kind: "ode",
        co: [1.0, 2.0, 3.0],
        rhs: "x**2*exp(2*x)",
        dom: [-1.5, 1.5],
        expr: "(121*x**2 - 132*x + 50)*exp(2*x)/1331" }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('(x**2/11 - 12*x/121 + 50/1331)*exp(2*x)'), x, 2) + (2)*diff(P('(x**2/11 - 12*x/121 + 50/1331)*exp(2*x)'), x, 1) + (3)*diff(P('(x**2/11 - 12*x/121 + 50/1331)*exp(2*x)'), x, 0) - (P('x**2*exp(2*x)')))) == 0"
  ] },

{ id: "fg-ode-05",
  cap: 2,
  topic: "seno_coseno",
  src: "Foglio di esercizi sulle equazioni differenziali, es. 1",
  text: String.raw`Determinare l'integrale generale dell'equazione differenziale $$y'' + 25y = \cos(5x)$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' + 25y = 0$. Equazione caratteristica $\alpha^{2} + 25 = 0$: $\alpha = \pm 5i$. Integrale generale dell'omogenea: $k_1\cos 5 x  + k_2\sin 5 x $.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Il termine $\cos 5x$ è la **parte reale** di $e^{5 ix}$: risolviamo con termine noto $e^{5 ix}$ e poi prendiamo la parte reale.`,
    String.raw`Termine noto del tipo $e^{hx}p(x)$ con $h = 5 i$, $m = 0$. $5 i$ è radice dell'equazione caratteristica (con molteplicità 1), quindi $s = 1$: si cerca $\bar y = a x e^{5 i x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{5 i x}$ si ottiene $10 i a = 1$; per il principio di identità dei polinomi $a = - \frac{i}{10}$. Quindi $\bar y = - \frac{i x e^{5 i x}}{10}$, e la parte reale è $\frac{x \sin 5 x }{10}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1\cos 5 x  + k_2\sin 5 x  + \frac{x \sin 5 x }{10}$.`
  ],
  answer: { fields: [
      { label: String.raw`un integrale particolare $\bar y(x)$`,
        kind: "ode",
        co: [1.0, 0.0, 25.0],
        rhs: "cos(5*x)",
        dom: [-1.5, 1.5],
        expr: "x*sin(5*x)/10" }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('x*sin(5*x)/10'), x, 2) + (25)*diff(P('x*sin(5*x)/10'), x, 0) - (P('cos(5*x)')))) == 0"
  ] },

{ id: "fg-ode-06",
  cap: 2,
  topic: "seno_coseno",
  src: "Foglio di esercizi sulle equazioni differenziali, es. 1",
  text: String.raw`Determinare l'integrale generale dell'equazione differenziale $$y'' + 25y = \cos x$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' + 25y = 0$. Equazione caratteristica $\alpha^{2} + 25 = 0$: $\alpha = \pm 5i$. Integrale generale dell'omogenea: $k_1\cos 5 x  + k_2\sin 5 x $.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Il termine $\cos x$ è la **parte reale** di $e^{ix}$: risolviamo con termine noto $e^{ix}$ e poi prendiamo la parte reale.`,
    String.raw`Termine noto del tipo $e^{hx}p(x)$ con $h = i$, $m = 0$. $i$ non è radice dell'equazione caratteristica, quindi $s = 0$: si cerca $\bar y = a e^{i x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{i x}$ si ottiene $24 a = 1$; per il principio di identità dei polinomi $a = \frac{1}{24}$. Quindi $\bar y = \frac{e^{i x}}{24}$, e la parte reale è $\frac{\cos x }{24}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1\cos 5 x  + k_2\sin 5 x  + \frac{\cos x }{24}$.`
  ],
  answer: { fields: [
      { label: String.raw`un integrale particolare $\bar y(x)$`,
        kind: "ode",
        co: [1.0, 0.0, 25.0],
        rhs: "cos(x)",
        dom: [-1.5, 1.5],
        expr: "cos(x)/24" }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('cos(x)/24'), x, 2) + (25)*diff(P('cos(x)/24'), x, 0) - (P('cos(x)')))) == 0"
  ] },

{ id: "fg-ode-07",
  cap: 2,
  topic: "somiglianza",
  src: "Foglio di esercizi sulle equazioni differenziali, es. 1",
  text: String.raw`Determinare l'integrale generale dell'equazione differenziale $$y'' + 25y = (x+1)e^{5x}$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' + 25y = 0$. Equazione caratteristica $\alpha^{2} + 25 = 0$: $\alpha = \pm 5i$. Integrale generale dell'omogenea: $k_1\cos 5 x  + k_2\sin 5 x $.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Termine noto del tipo $e^{hx}p(x)$ con $h = 5$, $m = 1$. $5$ non è radice dell'equazione caratteristica, quindi $s = 0$: si cerca $\bar y = (a x + b) e^{5 x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{5 x}$ si ottiene $50 a x + 10 a + 50 b = x + 1$; per il principio di identità dei polinomi $a = \frac{1}{50}, b = \frac{2}{125}$. Quindi $\bar y = (\frac{x}{50} + \frac{2}{125}) e^{5 x}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1\cos 5 x  + k_2\sin 5 x  + \frac{(5 x + 4) e^{5 x}}{250}$.`
  ],
  answer: { fields: [
      { label: String.raw`un integrale particolare $\bar y(x)$`,
        kind: "ode",
        co: [1.0, 0.0, 25.0],
        rhs: "(x + 1)*exp(5*x)",
        dom: [-1.5, 1.5],
        expr: "(5*x + 4)*exp(5*x)/250" }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('(x/50 + 2/125)*exp(5*x)'), x, 2) + (25)*diff(P('(x/50 + 2/125)*exp(5*x)'), x, 0) - (P('(x + 1)*exp(5*x)')))) == 0"
  ] },

{ id: "fg-ode-08",
  cap: 2,
  topic: "seno_coseno",
  src: "Foglio di esercizi sulle equazioni differenziali, es. 1",
  text: String.raw`Determinare l'integrale generale dell'equazione differenziale $$y'' + y = (x+1)\sin x$$`,
  steps: [
    String.raw`**Omogenea associata**: $y'' + y = 0$. Equazione caratteristica $\alpha^{2} + 1 = 0$: $\alpha = \pm i$. Integrale generale dell'omogenea: $k_1\cos x  + k_2\sin x $.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Il termine $x + 1 \sin x$ è la **parte immaginaria** di $x + 1e^{ix}$: risolviamo con termine noto $e^{ix}(x + 1)$ e poi prendiamo la parte immaginaria.`,
    String.raw`Termine noto del tipo $e^{hx}p(x)$ con $h = i$, $m = 1$. $i$ è radice dell'equazione caratteristica (con molteplicità 1), quindi $s = 1$: si cerca $\bar y = x (a x + b) e^{i x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{i x}$ si ottiene $4 i a x + 2 a + 2 i b = x + 1$; per il principio di identità dei polinomi $a = - \frac{i}{4}, b = \frac{1}{4} - \frac{i}{2}$. Quindi $\bar y = x (- \frac{i x}{4} + \frac{1}{4} - \frac{i}{2}) e^{i x}$, e la parte immaginaria è $\frac{x (- x \cos x  + \sin x  - 2 \cos x )}{4}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1\cos x  + k_2\sin x  + \frac{x (- x \cos x  + \sin x  - 2 \cos x )}{4}$.`
  ],
  answer: { fields: [
      { label: String.raw`un integrale particolare $\bar y(x)$`,
        kind: "ode",
        co: [1.0, 0.0, 1.0],
        rhs: "(x + 1)*sin(x)",
        dom: [-1.5, 1.5],
        expr: "x*(-x*cos(x) + sin(x) - 2*cos(x))/4" }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('x*(-x*cos(x) + sin(x) - 2*cos(x))/4'), x, 2) + (1)*diff(P('x*(-x*cos(x) + sin(x) - 2*cos(x))/4'), x, 0) - (P('x*sin(x) + sin(x)')))) == 0"
  ] },

{ id: "fg-ode-09",
  cap: 2,
  topic: "somiglianza",
  src: "Foglio di esercizi sulle equazioni differenziali, es. 1",
  text: String.raw`Determinare l'integrale generale dell'equazione differenziale $$y''' - 4y' = \frac{2x+1}{e^{2x}}$$`,
  steps: [
    String.raw`**Omogenea associata**: $y''' - 4y' = 0$. Equazione caratteristica $\alpha^{3} - 4 \alpha = 0$: $\alpha = -2$, $\alpha = 0$, $\alpha = 2$. Integrale generale dell'omogenea: $k_1e^{- 2 x} + k_2 + k_3e^{2 x}$.`,
    String.raw`**Integrale particolare** (metodo di somiglianza). Termine noto del tipo $e^{hx}p(x)$ con $h = -2$, $m = 1$. $-2$ è radice dell'equazione caratteristica (con molteplicità 1), quindi $s = 1$: si cerca $\bar y = x (a x + b) e^{- 2 x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{- 2 x}$ si ottiene $16 a x - 12 a + 8 b = 2 x + 1$; per il principio di identità dei polinomi $a = \frac{1}{8}, b = \frac{5}{16}$. Quindi $\bar y = x (\frac{x}{8} + \frac{5}{16}) e^{- 2 x}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1e^{- 2 x} + k_2 + k_3e^{2 x} + \frac{x (2 x + 5) e^{- 2 x}}{16}$.`
  ],
  answer: { fields: [
      { label: String.raw`un integrale particolare $\bar y(x)$`,
        kind: "ode",
        co: [1.0, 0.0, -4.0, 0.0],
        rhs: "(2*x + 1)*exp(-2*x)",
        dom: [-1.5, 1.5],
        expr: "x*(2*x + 5)*exp(-2*x)/16" }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('x*(x/8 + 5/16)*exp(-2*x)'), x, 3) + (-4)*diff(P('x*(x/8 + 5/16)*exp(-2*x)'), x, 1) - (P('(2*x + 1)*exp(-2*x)')))) == 0"
  ] },

{ id: "fg-ode-10",
  cap: 2,
  topic: "somiglianza",
  src: "Foglio di esercizi sulle equazioni differenziali, es. 1",
  text: String.raw`Determinare l'integrale generale dell'equazione differenziale $$y''' - 4y'' = 2x + 3e^{4x} + (5x+1)e^x$$`,
  steps: [
    String.raw`**Omogenea associata**: $y''' - 4y'' = 0$. Equazione caratteristica $\alpha^{3} - 4 \alpha^{2} = 0$: $\alpha = 0$ (molteplicità 2), $\alpha = 4$. Integrale generale dell'omogenea: $k_1 + k_2x + k_3e^{4 x}$.`,
    "**Integrale particolare** per **sovrapposizione**: il termine noto è una somma, si cerca un integrale particolare per ciascun addendo e si sommano.",
    String.raw`Termine noto del tipo $e^{hx}p(x)$ con $h = 0$, $m = 1$. $0$ è radice dell'equazione caratteristica (con molteplicità 2), quindi $s = 2$: si cerca $\bar y = x^{2} (a x + b)$.`,
    String.raw`Derivando e sostituendo si ottiene $- 24 a x + 6 a - 8 b = 2 x$; per il principio di identità dei polinomi $a = - \frac{1}{12}, b = - \frac{1}{16}$. Quindi $\bar y = x^{2} (- \frac{x}{12} - \frac{1}{16})$.`,
    String.raw`Termine noto del tipo $e^{hx}p(x)$ con $h = 4$, $m = 0$. $4$ è radice dell'equazione caratteristica (con molteplicità 1), quindi $s = 1$: si cerca $\bar y = a x e^{4 x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{4 x}$ si ottiene $16 a = 3$; per il principio di identità dei polinomi $a = \frac{3}{16}$. Quindi $\bar y = \frac{3 x e^{4 x}}{16}$.`,
    String.raw`Termine noto del tipo $e^{hx}p(x)$ con $h = 1$, $m = 1$. $1$ non è radice dell'equazione caratteristica, quindi $s = 0$: si cerca $\bar y = (a x + b) e^{x}$.`,
    String.raw`Derivando, sostituendo e semplificando $e^{x}$ si ottiene $- 3 a x - 5 a - 3 b = 5 x + 1$; per il principio di identità dei polinomi $a = - \frac{5}{3}, b = \frac{22}{9}$. Quindi $\bar y = (\frac{22}{9} - \frac{5 x}{3}) e^{x}$.`,
    String.raw`**Integrale generale** della completa: $y(x) = k_1 + k_2x + k_3e^{4 x} - \frac{x^{2} (4 x + 3)}{48} + \frac{3 x e^{4 x}}{16} + \frac{(22 - 15 x) e^{x}}{9}$.`
  ],
  answer: { fields: [
      { label: String.raw`un integrale particolare $\bar y(x)$`,
        kind: "ode",
        co: [1.0, -4.0, 0.0, 0.0],
        rhs: "2*x + (5*x + 1)*exp(x) + 3*exp(4*x)",
        dom: [-1.5, 1.5],
        expr: "-x**2*(4*x + 3)/48 + 3*x*exp(4*x)/16 + (22 - 15*x)*exp(x)/9" }
    ] },
  stepChk: [
    "simplify(expand((1)*diff(P('x**2*(-x/12 - 1/16)'), x, 3) + (-4)*diff(P('x**2*(-x/12 - 1/16)'), x, 2) - (P('2*x')))) == 0",
    "simplify(expand((1)*diff(P('3*x*exp(4*x)/16'), x, 3) + (-4)*diff(P('3*x*exp(4*x)/16'), x, 2) - (P('3*exp(4*x)')))) == 0",
    "simplify(expand((1)*diff(P('(22/9 - 5*x/3)*exp(x)'), x, 3) + (-4)*diff(P('(22/9 - 5*x/3)*exp(x)'), x, 2) - (P('(5*x + 1)*exp(x)')))) == 0"
  ] }

);

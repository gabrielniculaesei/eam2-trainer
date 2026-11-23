/* Prerequisiti (capitolo 0): ripasso di numeri complessi, Analisi 1,
   determinanti. Non entrano nella simulazione d'esame. */
(window.TEORIA = window.TEORIA || []).push({
  id: "cap0", cap: 0, label: "Prerequisiti",
  intro: String.raw`Gli strumenti di Analisi 1 e di algebra che le dimostrazioni usano di continuo. Se in un passo leggi "per Lagrange" o "per Heine-Cantor" e non ricordi cosa dice, è qui.`,
  children: [

  { id: "s-complessi", label: "Numeri complessi", topic: "complessi", children: [
    { id: "r-complessi", label: "Numeri complessi: quello che serve", topic: "complessi", kind: "osservazione",
      idea: String.raw`I complessi servono in due punti: le radici dell'equazione caratteristica con $\Delta < 0$ e il termine noto con seno e coseno (via $e^{ibx}$).`,
      testo: String.raw`<ul><li>**Forma algebrica** $z = a + ib$ con $i^2 = -1$; parte reale $a$, parte immaginaria $b$.</li><li>**Coniugato** $\bar z = a - ib$; $z\bar z = a^2 + b^2 = |z|^2$.</li><li>**Divisione**: si moltiplica sopra e sotto per il coniugato del denominatore: $\frac{1}{a + ib} = \frac{a - ib}{a^2 + b^2}$.</li><li>**Formula di Eulero**: $e^{i\theta} = \cos\theta + i\sin\theta$, quindi $e^{(\beta + i\gamma)x} = e^{\beta x}(\cos\gamma x + i\sin\gamma x)$, $\cos\theta = \mathrm{Re}\,e^{i\theta}$, $\sin\theta = \mathrm{Im}\,e^{i\theta}$.</li><li>**Secondo grado con $\Delta < 0$**: $\alpha^2 + a\alpha + b = 0$ ha radici $-\frac a2 \pm i\frac{\sqrt{-\Delta}}{2}$.</li></ul>`,
      esempio: String.raw`$\frac{1}{3 + 4i} = \frac{3 - 4i}{25}$. $\alpha^2 + 2\alpha + 5 = 0$: $\alpha = -1 \pm 2i$. $(2 + i)e^{ix}$ ha parte reale $2\cos x - \sin x$ e parte immaginaria $\cos x + 2\sin x$.`,
      errori: [String.raw`Prendere la parte reale "a occhio" senza moltiplicare prima per $\cos x + i\sin x$.`] }
  ]},

  { id: "s-analisi1", label: "Ripasso di Analisi 1", topic: "ripasso_an1", children: [
    { id: "r-lagrange", label: "Lagrange e funzioni a derivata nulla", topic: "ripasso_an1", kind: "teorema",
      enunciato: { ip: String.raw`$g$ continua in $[x_1,x_2]$ e derivabile in $]x_1,x_2[$.`, ts: String.raw`Esiste $c \in\, ]x_1,x_2[$ con $g(x_2) - g(x_1) = g'(c)(x_2 - x_1)$. **Conseguenza**: se $g' = 0$ in tutto un **intervallo**, $g$ è costante.` },
      testo: String.raw`Si usa nella caratterizzazione delle primitive e ogni volta che si dice "due funzioni con la stessa derivata differiscono per una costante".` },
    { id: "r-weierstrass", label: "Weierstrass e valori intermedi", topic: "ripasso_an1", kind: "teorema",
      enunciato: { ip: String.raw`$f$ continua in $[a,b]$.`, ts: String.raw`**Weierstrass**: $f$ ha minimo $m$ e massimo $M$. **Valori intermedi**: $f$ assume ogni valore compreso fra $m$ ed $M$.` },
      testo: String.raw`Nel teorema della media Weierstrass dà $m$ e $M$, i valori intermedi danno il punto $c$.` },
    { id: "r-heine", label: "Uniforme continuità e Heine-Cantor", topic: "ripasso_an1", kind: "teorema",
      idea: String.raw`Continua: per ogni punto c'è una tolleranza $\delta$ adatta. **Uniformemente** continua: c'è un'unica $\delta$ che va bene ovunque.`,
      enunciato: { ip: String.raw`$f$ continua in $[a,b]$ (chiuso e limitato).`, ts: String.raw`$f$ è uniformemente continua: per ogni $\varepsilon > 0$ esiste $\delta > 0$ tale che $|x' - x''| < \delta \Rightarrow |f(x') - f(x'')| < \varepsilon$ per **ogni** $x', x'' \in [a,b]$.` },
      testo: String.raw`Serve nella dimostrazione della contiguità delle somme. Non vale su intervalli aperti: $\frac1x$ in $]0,1]$ è continua ma non uniformemente.` },
    { id: "r-separati", label: "Insiemi separati e contigui", topic: "ripasso_an1", kind: "definizione",
      enunciato: { ip: String.raw`$A, B \subseteq \mathbb{R}$ non vuoti.`, ts: String.raw`Sono **separati** se $a \le b$ per ogni $a \in A$, $b \in B$; allora $\sup A \le \inf B$ e ogni numero di $[\sup A, \inf B]$ è un **elemento di separazione**. Sono **contigui** se $\sup A = \inf B$, cioè se l'elemento di separazione è unico; equivale a: per ogni $\varepsilon > 0$ esistono $a \in A$, $b \in B$ con $b - a < \varepsilon$.` } },
    { id: "r-composta", label: "Derivata della funzione composta", topic: "ripasso_an1", kind: "teorema",
      enunciato: { ip: String.raw`$g$ derivabile in $x$, $F$ derivabile in $g(x)$.`, ts: String.raw`$\big(F(g(x))\big)' = F'(g(x))\,g'(x)$.` },
      testo: String.raw`È il cuore della prima formula di sostituzione e della derivata di $\int_a^{b(x)} f(t)\,dt$.` }
  ]},

  { id: "s-determinanti", label: "Determinanti e regola di Cramer", topic: "determinanti", children: [
    { id: "r-determinanti", label: "Determinanti 2×2 e 3×3, regola di Cramer", topic: "determinanti", kind: "metodo",
      testo: String.raw`<ul><li>$\begin{vmatrix} a & b \\ c & d \end{vmatrix} = ad - bc$.</li><li>$3\times3$: regola di Sarrus o sviluppo lungo una riga.</li><li>**Cramer**: un sistema lineare $n \times n$ con determinante della matrice dei coefficienti **diverso da zero** ha una e una sola soluzione; $x_i = \frac{\det A_i}{\det A}$, dove $A_i$ si ottiene sostituendo la colonna $i$ con i termini noti.</li></ul>
      Si usa nel Teor. 2 (il sistema per le costanti ha determinante $W(x_0)$), nei problemi di Cauchy e nella ricerca dei fratti semplici.`,
      esempio: String.raw`$\begin{cases} k_1 + k_2 = 1 \\ 3k_1 - 3k_2 = 1 \end{cases}$: $\det = -6$, $k_1 = \frac{-3 - 1}{-6} = \frac23$, $k_2 = \frac{1 - 3}{-6} = \frac13$.` }
  ]}
  ]
});

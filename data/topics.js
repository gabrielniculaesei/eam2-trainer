/* Capitoli e topic: sono dati, non codice. Per aggiungere i capitoli 3 e 4
   basta aggiungere qui le voci e caricare i nuovi file dati in index.html.
   cap 0 = prerequisiti (non entrano nella simulazione d'esame). */
window.CAPITOLI = {
  0: "Prerequisiti",
  1: "Integrali",
  2: "Equazioni differenziali"
};

/* capitoli che entrano nella prova intermedia (usato da esame e "oggi") */
window.CAPITOLI_PI = [1, 2];

window.TOPICS = {
  // cap. 1
  primitive: { cap: 1, label: "Primitive" },
  riemann: { cap: 1, label: "Integrale di Riemann" },
  proprieta: { cap: 1, label: "Proprietà dell'integrale definito" },
  funzione_integrale: { cap: 1, label: "Funzione integrale e teoremi fondamentali" },
  misura: { cap: 1, label: "Misura di Peano-Jordan e aree" },
  indefinito: { cap: 1, label: "Integrale indefinito e proprietà" },
  parti: { cap: 1, label: "Integrazione per parti" },
  sostituzione: { cap: 1, label: "Integrazione per sostituzione" },
  trigonometrici: { cap: 1, label: "Polinomi trigonometrici" },
  razionali: { cap: 1, label: "Funzioni razionali fratte" },
  radicali: { cap: 1, label: "Razionalizzazione e radicali" },
  valore_assoluto: { cap: 1, label: "Primitive con valore assoluto" },
  definiti: { cap: 1, label: "Calcolo di integrali definiti" },
  // cap. 2
  generalita: { cap: 2, label: "Generalità e problema di Cauchy" },
  primo_ordine: { cap: 2, label: "Lineari del primo ordine" },
  struttura: { cap: 2, label: "Struttura dell'integrale generale" },
  wronskiano: { cap: 2, label: "Wronskiano e soluzioni indipendenti" },
  coeff_costanti: { cap: 2, label: "Omogenee a coefficienti costanti" },
  somiglianza: { cap: 2, label: "Metodo di somiglianza" },
  seno_coseno: { cap: 2, label: "Termine noto con seno e coseno" },
  cauchy: { cap: 2, label: "Problemi di Cauchy" },
  separabili: { cap: 2, label: "Variabili separabili", daVerificare: true },
  malthus: { cap: 2, label: "Modello di Malthus" },
  // prerequisiti
  complessi: { cap: 0, label: "Numeri complessi" },
  ripasso_an1: { cap: 0, label: "Ripasso di Analisi 1" },
  determinanti: { cap: 0, label: "Determinanti e regola di Cramer" }
};

/* nomi leggibili dei tipi di domanda */
window.QTYPES = {
  mcq: "risposta multipla",
  multi: "più risposte giuste",
  vf: "vero o falso",
  cloze: "completamento",
  impl: "implicazioni",
  errore: "trova l'errore"
};

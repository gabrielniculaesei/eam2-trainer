# EAM2 Trainer

Web app per prepararsi alla **prova intermedia di Elementi di Analisi Matematica 2** (CdL in Informatica, Università di Catania, a.a. 2026/27): integrali ed equazioni differenziali, con i metodi, le notazioni e il linguaggio delle lezioni.

**Progetto di studenti, non ufficiale. Fa fede il materiale della docente.**

## Cosa c'è

- **Teoria**: il programma dei capitoli 1 e 2 come un libro. Per ogni argomento: l'idea intuitiva, definizioni ed enunciati con ipotesi e tesi, il **grafico interattivo** dentro la pagina, la **dimostrazione passo per passo** (con il perché di ogni passo, anche da scoprire un passo alla volta), dove è uscito all'esame, gli errori tipici. I nomi di teoremi e definizioni citati nel testo sono **collegamenti**, e in fondo a ogni pagina ci sono "usa" (con i richiami delle definizioni) e "serve per".
- **Dimostrazioni**: i teoremi da saper dimostrare, nell'ordine del programma, con quattro modi di allenarsi: leggi e ripeti, riordina i passi, completa gli spazi vuoti, scrivi e confronta con la lista dei passi.
- **Esercizi**: tracce delle prove e degli appelli, esercizi delle lezioni e dei fogli, svolti con il metodo della docente; risposta controllata (anche espressioni, confrontate numericamente). **Generatori** di varianti con numeri sempre nuovi e un link condivisibile.
- **Quiz**: risposta multipla, più risposte giuste, vero o falso, completamento di dimostrazioni, implicazioni con controesempio, trova l'errore. Ogni risposta ha la spiegazione, anche delle opzioni sbagliate.
- **Grafici**: somme di Riemann, funzione integrale, teorema della media, plurirettangoli di Peano-Jordan, primitive con valore assoluto, campo di direzioni, Wronskiano, equazione caratteristica, metodo di somiglianza, modello di Malthus.
- **Simulazione della prova**: sei quesiti pescati da tutto il programma con la forma dell'esempio pubblicato (teorici e tecnici), oppure il formato della P.I. 2025 e dell'esame completo. Timer, correzione separata di teoria e tecnica, voto indicativo.
- **Progressi** per argomento, export e import dei dati (restano nel browser).

Ogni calcolo è verificato con il calcolo simbolico (sympy): risposte delle domande, passi degli esercizi svolti, 300 varianti per ogni generatore.

## Uso in locale

Nessun build step: basta un server statico qualsiasi (funziona anche aprendo `index.html`).

```bash
pnpm install     # solo strumenti di sviluppo (KaTeX per il lint)
pnpm serve       # server statico locale
pnpm test        # test unitari (node:test)
pnpm verify      # lint dei contenuti + controlli sympy (serve python3 con sympy)
pnpm vendor      # ricopia KaTeX in vendor/katex
```

Deploy: qualunque hosting statico (per Vercel: preset "Other", nessun build command, cartella di output la radice).

## Segnalare un errore

Sotto ogni domanda, esercizio e pagina di teoria c'è **Segnala un errore**: apre una issue precompilata con l'id del contenuto. Per contribuire con nuove domande o esercizi vedi [CONTRIBUTING.md](CONTRIBUTING.md).

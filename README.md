# EAM2 Trainer

Web app per prepararsi alla **prova intermedia di Elementi di Analisi Matematica 2** (CdL in Informatica, Università di Catania, a.a. 2026/27): integrali ed equazioni differenziali, con domande, metodi e notazione delle lezioni.

**Progetto di studenti, non ufficiale. Fa fede il materiale della docente.**

## Cosa c'è (in costruzione)

- **Quiz** con tutti i tipi di domanda della prova: risposta multipla, più risposte giuste, vero o falso, completamento di dimostrazioni, implicazioni con controesempio, trova l'errore. Ogni risposta ha la spiegazione, anche delle opzioni sbagliate.
- **Statistiche** per argomento, errori da rifare, export/import del progresso.
- In arrivo: teoria, dimostrazioni con ripasso dilazionato, esercizi d'esame svolti, grafici interattivi, simulazione della P.I.

## Uso in locale

Nessun build step: basta un server statico (o aprire `index.html`).

```bash
pnpm install     # solo strumenti di sviluppo (KaTeX per il lint)
pnpm serve       # http://localhost:5173/
pnpm test        # test unitari (node:test)
pnpm verify      # lint dei contenuti + controlli sympy (serve python3 con sympy)
pnpm vendor      # ricopia KaTeX in vendor/katex
```

## Segnalare un errore

Sotto ogni domanda c'è **Segnala un errore**: apre una issue precompilata con l'id del contenuto.

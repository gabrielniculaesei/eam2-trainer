# Contribuire a EAM2 Trainer

Grazie! Correzioni, domande ed esercizi nuovi sono benvenuti. Prima di aprire una pull request leggi le regole qui sotto: servono a mantenere i contenuti **corretti** e **fedeli allo stile del corso**.

## Regole sui contenuti

1. **Solo tipi già visti.** Ogni domanda o esercizio deve essere di un tipo già visto a lezione, nelle dispense o nelle prove: si possono cambiare numeri e funzioni, non la struttura. Un argomento non ancora confermato a lezione si marca `daVerificare: true` (in app compare "da confermare a lezione").
2. **Notazione della docente.** `\log` e non `\ln`; intervalli `]a, b[`; $\left[\int f(t)\,dt\right]_{t=g(x)}$ per la sostituzione; FF/FD per parti; "integrale generale", "integrale particolare", "omogenea associata", "equazione caratteristica"; $h$, $s$, $m$ nel metodo di somiglianza; seno e coseno passando per $e^{ibx}$ e parte reale/immaginaria; primo ordine con la variazione della costante e $A$ primitiva di $a$; negli integrali definiti prima la primitiva, poi la formula fondamentale.
3. **Ogni calcolo è verificato.** Una domanda la cui risposta dipende da un calcolo ha un campo `chk`: un'espressione Python/sympy che deve valere `True` (vedi sotto). Se il controllo fallisce, il contenuto non entra.
4. **Niente copia delle dispense.** Le dispense sono destinate agli studenti del corso: spiegazioni e dimostrazioni vanno scritte con parole proprie, seguendo gli stessi passaggi logici. Enunciati e formule vanno bene. Le tracce d'esame (domande brevi) si possono riportare, con la data come fonte. Mai nomi di studenti.
5. **Stile.** Italiano, frasi brevi, passaggi chiave in `**grassetto**`, formule sempre in LaTeX. Niente trattino lungo: usa virgole, due punti o parentesi. Nelle domande a risposta multipla la spiegazione dice perché la giusta è giusta **e** perché ogni altra opzione è sbagliata; niente "tutte le precedenti".

## Dove stanno i dati

I contenuti sono file JavaScript in `data/` che aggiungono elementi a variabili globali (`window.QUESTIONS`, `window.TEORIA`, `window.ESERCIZI`, `window.GENERATORI`) e sono caricati da `index.html` con `<script defer>`. Un file nuovo va aggiunto anche a `index.html` (il lint lo controlla). Le stringhe con LaTeX si scrivono come `` String.raw`...` ``, così i backslash non vanno raddoppiati; `$...$` per le formule nel testo, `$$...$$` per quelle in display.

### Domande (`data/mcq_*.js`, `vf.js`, `cloze*.js`, `implicazioni.js`, `errori.js`)

Campi comuni:

```js
{ id: "c1-razionali-007",      // cN-argomento-NNN, univoco e stabile (le statistiche si agganciano all'id)
  cap: 1, topic: "razionali",   // topic: una chiave di data/topics.js
  type: "mcq",                  // mcq | multi | vf | cloze | impl | errore
  diff: 1,                      // 1 base, 2 medio, 3 difficile
  src: "Lezione 15/10, es. 4",  // da dove viene o a cosa si ispira
  q: String.raw`...`,           // testo (HTML + LaTeX)
  expl: String.raw`...`,        // spiegazione mostrata dopo la risposta
  chk: "..." }                  // controllo sympy, obbligatorio se c'è un calcolo
```

Campi per tipo:

- `mcq`: `options` (4, dalla A alla D) e `correct` (indice da 0). Il lint controlla che la risposta giusta sia distribuita fra A, B, C, D e che non sia quasi sempre la più lunga.
- `multi`: `options` (da 4 a 8) e `correct` (array di indici).
- `vf`: `items: [{ s, v: true|false, why }]`.
- `cloze`: `text` con i segnaposto `{{1}}`, `{{2}}`... e `gaps: [{ opts: [...], correct }]`.
- `impl`: `options` (le due implicazioni), `correct`, `dim` (dimostrazione di quella vera), `controesempio`.
- `errore`: `steps` (lo svolgimento), `wrong` (indice del passo sbagliato), `fix`.

### Il campo `chk`

È valutato da `tools/check_bank.py` con `from sympy import *` e `x`, `t` simboli reali. `P('...')` legge una stringa con frazioni esatte. Esempi:

```js
chk: "simplify(diff(x*sin(x) + cos(x), x) - x*cos(x)) == 0"
chk: "integrate(Abs(x**3), (x, -1, 2)) == Rational(17, 4)"
```

Per provarne uno al volo: `python3 tools/check_bank.py -e "integrate(x, (x, 0, 1)) == Rational(1, 2)"`.

### Teoria (`data/teoria_cap*.js`, `prerequisiti.js`)

Albero capitolo → sezione → nodo. Un nodo:

```js
{ id: "t-media", label: "Teorema della media", topic: "proprieta",
  kind: "teorema",            // teorema | definizione | proprieta | metodo | esempio | osservazione
  dimRichiesta: true,         // dimostrazione da saper scrivere (★)
  idea: String.raw`...`,      // 1-2 frasi con un'analogia concreta
  enunciato: { ip: String.raw`...`, ts: String.raw`...` },
  dim: [{ passo: String.raw`...`, perche: String.raw`...` }],
  grafico: "g-media",         // id di un grafico in js/grafici.js (facoltativo)
  cloze: "c1-cloze-004",      // domanda di completamento collegata (facoltativo)
  esempio, esame, errori: [...], video: ["yt:..."],
  usa: ["d-integrale"] }      // collegamenti espliciti (facoltativo)
```

I collegamenti fra nodi sono riconosciuti anche in automatico: le espressioni con cui i testi citano un nodo ("teorema della media", "caratterizzazione delle primitive"...) sono elencate in `ALIAS` in `js/teoria.js`.

### Esercizi svolti (`data/esercizi_tracce.js`, `data/esercizi_lezioni.js`)

Questi due file sono **generati**: non modificarli a mano. Le specifiche sono in `tools/tracce_specs.py` (testo, risultato atteso, eventuali note); `python3 tools/build_tracce.py` ricalcola con sympy tutti i passaggi, li confronta con il risultato atteso e riscrive i file.

### Generatori (`data/generatori_*.js`)

`{ id, cap, topic, title, gen(rng) → { text, steps, answer, verify, chk } }`. Le varianti si costruiscono **al contrario** (prima radici e costanti, poi i dati del problema), così i numeri vengono puliti. `tools/verify_generators.mjs` ne prova 300 per generatore.

## Prima della pull request

```bash
pnpm test      # test unitari
pnpm verify    # lint dei dati, KaTeX, generatori, controlli sympy
```

Entrambi devono passare. Controlla poi a mano la parte toccata nel browser (`pnpm serve`), anche a larghezza di telefono.

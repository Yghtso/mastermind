# Gioco Mastermind

Questo è un semplice esempio del gioco Mastermind realizzato in JavaScript, HTML e CSS. L'obiettivo del gioco è indovinare un codice nascosto entro un numero specificato di tentativi. Il codice consiste in una sequenza di pedine colorate e, dopo ogni tentativo, il giocatore riceve un feedback che indica quanti colori sono corretti e nella posizione giusta, oltre a quanti colori sono corretti ma nella posizione sbagliata.

## Indice

- [Caratteristiche](#caratteristiche)
- [Introduzione](#introduzione)
- [Panoramica del Codice](#panoramica-del-codice)
- [Punti Critici nel Codice](#punti-critici-nel-codice)
- [Licenza](#licenza)

## Caratteristiche

- Opzioni di colore multiple: rosso, blu, verde, giallo, viola e arancione.
- Livelli di difficoltà configurabili che determinano il numero massimo di tentativi.
- Feedback su ogni tentativo riguardo al numero di colori e posizioni corrette.
- Interfaccia utente intuitiva con selezione di colori e visualizzazione dei tentativi.

## Introduzione

1. Apri il file `index.html` in un browser web per giocare.

2. Seleziona il livello di difficoltà, poi inizia il gioco e prova a indovinare la combinazione di colori.

## Panoramica del Codice

La funzionalità principale del gioco è definita nel file `script.js`. Di seguito sono elencate le funzioni chiave che guidano la logica del gioco:

- **`initializeGame()`**: Configura l'ambiente di gioco, genera una soluzione unica e ripristina lo stato del gioco.
- **`generateUniqueSolution(length)`**: Crea una soluzione randomizzata di colori unici in base alla lunghezza specificata.
- **`evaluateGuess(guess)`**: Confronta il tentativo del giocatore con la soluzione e fornisce feedback sulla correttezza del tentativo.
- **`displayGuess(guess, feedback)`**: Aggiorna il pannello di gioco per mostrare il tentativo del giocatore e il feedback corrispondente.
- **`setupColorButtons()`**: Inizializza i pulsanti di selezione dei colori per consentire all'utente di scegliere i colori per il proprio tentativo.

## Punti Critici nel Codice

1. **Generazione della Soluzione Unica**:
   - La funzione `generateUniqueSolution()` crea una soluzione randomizzata mescolando l'array dei colori e facendone un sottoarray della lunghezza desiderata. Questo assicura che non ci siano colori duplicati nella soluzione.
   - **Possibile Miglioramento**: Implementare un meccanismo per evitare la selezione dello stesso colore se `codeLength` supera il numero di colori disponibili.

2. **Logica di Valutazione del Tentativo**:
   - La funzione `evaluateGuess()` separa efficacemente il conteggio dei colori correttamente posizionati dal conteggio dei colori corretti ma posizionati male.
   - Utilizza due passaggi sui tentativi, che è efficiente, ma potrebbe essere ulteriormente ottimizzata utilizzando strutture dati come mappe per tracciare le occorrenze.

3. **Gestione dell'Input Utente**:
   - Il gioco impedisce all'utente di inviare un tentativo fino a quando non è selezionato esattamente il numero richiesto di colori. Questo è un buon passo di validazione, ma potrebbe essere ulteriormente migliorato con un feedback utente migliore.
   - Le funzioni `handleColorClick()` e `handleReplaceColor()` gestiscono efficacemente la selezione e la sostituzione dei colori. Tuttavia, potrebbero beneficiare di segnali visivi più chiari per indicare la modalità di sostituzione.

4. **Interfaccia Utente Dinamica**:
   - L'interfaccia si aggiorna dinamicamente in base alle interazioni dell'utente, come la visualizzazione dei colori selezionati e del feedback dopo ogni tentativo.
   - **Possibile Miglioramento**: Considerare di aggiungere animazioni per un feedback visivo per migliorare l'esperienza utente.

5. **Ripristino del Gioco**:
   - Il gioco si ripristina correttamente dopo ogni sessione di gioco, consentendo più tentativi senza ricaricare la pagina.
   - Le versioni future potrebbero includere una funzionalità di tracciamento del punteggio per registrare le prestazioni dell'utente su più partite.


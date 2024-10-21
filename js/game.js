// Configurazione del gioco
const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
let secretCode = generateSecretCode();
let currentRow = 0;
let selectedColors = [];

// Genera la combinazione segreta
function generateSecretCode() {
    let code = [];
    for (let i = 0; i < 4; i++) {
        code.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    console.log("Combinazione segreta:", code); // Per debug
    return code;
}

// Inizializza il tabellone
const gameBoard = document.getElementById("game-board");
for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < 4; j++) {
        const hole = document.createElement("div");
        hole.classList.add("hole");
        row.appendChild(hole);
    }
    gameBoard.appendChild(row);
}

// Seleziona un colore
document.querySelectorAll('.color-ball').forEach(ball => {
    ball.addEventListener('click', function() {
        if (selectedColors.length < 4) {
            selectedColors.push(this.dataset.color);
            updateCurrentRow();
        }
    });
});

// Aggiorna la riga corrente con i colori selezionati
function updateCurrentRow() {
    const row = gameBoard.children[currentRow];
    const holes = row.getElementsByClassName('hole');
    for (let i = 0; i < selectedColors.length; i++) {
        holes[i].style.backgroundColor = selectedColors[i];
    }
}

// Conferma il tentativo
document.getElementById('submit-guess').addEventListener('click', function() {
    if (selectedColors.length === 4) {
        checkGuess(selectedColors);
        currentRow++;
        selectedColors = [];
    }
});

// Controlla il tentativo
function checkGuess(guess) {
    let feedback = { correctPosition: 0, correctColor: 0 };

    // Copia la combinazione segreta per non modificarla durante i controlli
    let tempCode = [...secretCode];

    // Controllo colori nella posizione giusta
    for (let i = 0; i < 4; i++) {
        if (guess[i] === tempCode[i]) {
            feedback.correctPosition++;
            tempCode[i] = null; // Elimina il colore già controllato
        }
    }

    // Controllo colori giusti ma nella posizione sbagliata
    for (let i = 0; i < 4; i++) {
        if (tempCode.includes(guess[i]) && guess[i] !== secretCode[i]) {
            feedback.correctColor++;
            tempCode[tempCode.indexOf(guess[i])] = null;
        }
    }

    alert(`Posizioni corrette: ${feedback.correctPosition}, Colori giusti: ${feedback.correctColor}`);

    if (feedback.correctPosition === 4) {
        alert("Hai vinto! Hai indovinato la combinazione segreta!");
        resetGame();
    } else if (currentRow === 9) {
        alert("Hai perso! La combinazione segreta era: " + secretCode.join(', '));
        resetGame();
    }
}

// Resetta il gioco
function resetGame() {
    currentRow = 0;
    selectedColors = [];
    secretCode = generateSecretCode();

    // Ripristina il tabellone
    document.querySelectorAll('.hole').forEach(hole => {
        hole.style.backgroundColor = 'white';
    });
}


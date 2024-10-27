let numberOfAttempts;

const maxNumberOfAttemps = 10;

const easyNumberOfAttempts = 10;
const mediumNumberOfAttemps = 7;
const hardNumberOfAttempts = 5;

const gameboard = document.getElementById("boardgame");

const colorsInGuesses = 4; 

function getParametreByName(name) {
    const url = window.location.href;
    const regex = new RegExp('[?&]' + name + '=([^&#]*)');
    const results = regex.exec(url);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function initializeGame() {
    let difficulty = getParametreByName("difficulty");
    if(difficulty == "easy") {
        numberOfAttempts = easyNumberOfAttempts;
    } else if (difficulty == "medium") {
        numberOfAttempts = mediumNumberOfAttemps;
    } else if(difficulty == "hard") {
        numberOfAttempts = hardNumberOfAttempts;
    }
}

initializeGame();
for (let attempt = 0; attempt < numberOfAttempts; attempt++) {
    let row = document.createElement('div');
    for (let slot = 0; slot < colorsInGuesses; slot++) {
        let slot = document.createElement('div');
        slot.classList.add("ball");
        slot.classList.add("ms-2");
        slot.classList.add("me-2");
        row.appendChild(slot);
    }
    gameboard.appendChild(row);
}

let numberOfAttempts;

const maxNumberOfAttemps = 10;

const easyNumberOfAttempts = 10;
const mediumNumberOfAttemps = 7;
const hardNumberOfAttempts = 5;

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

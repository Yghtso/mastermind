const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
let solution = [];
let guesses = [];
let codeLength = 4;
let selectedColors = [];
let replaceMode = true;
let replaceIndex = null;
let maxAttempts = 12;
let remainingAttempts;

function initializeGame() {
  solution = generateUniqueSolution(codeLength);
  console.log("Soluzione (testing):", solution);

  document.getElementById("game-board").innerHTML = "";
  document.getElementById("feedback").innerText = "";
  guesses = [];
  selectedColors = [];
  replaceMode = true;
  remainingAttempts = maxAttempts;
  displaySelectedColors();

  document.getElementById("color-buttons").classList.remove("d-none");
}

function generateUniqueSolution(length) {
  const shuffledColors = [...colors].sort(() => 0.5 - Math.random());
  return shuffledColors.slice(0, length);
}

function displayGuess(guess, feedback) {
  const gameBoard = document.getElementById("game-board");
  
  const row = document.createElement("div");
  row.className = "guess-row";
  
  guess.forEach(color => {
    const colorBlock = document.createElement("div");
    colorBlock.className = "guess";
    colorBlock.style.backgroundColor = color;
    row.appendChild(colorBlock);
  });
  
  const feedbackRow = document.createElement("div");
  feedbackRow.className = "feedback";
  
  feedback.forEach(feedbackType => {
    const indicator = document.createElement("div");
    indicator.className = "indicator " + feedbackType;
    feedbackRow.appendChild(indicator);
  });
  
  gameBoard.appendChild(row);
  gameBoard.appendChild(feedbackRow);
}

function evaluateGuess(guess) {
  let correctPosition = 0;
  let correctColor = 0;
  
  const solutionCopy = [...solution];
  const guessCopy = [...guess];
  
  for (let i = 0; i < codeLength; i++) {
    if (guess[i] === solutionCopy[i]) {
      correctPosition++;
      guessCopy[i] = solutionCopy[i] = null;
    }
  }
  
  for (let i = 0; i < codeLength; i++) {
    if (guessCopy[i] && solutionCopy.includes(guessCopy[i])) {
      correctColor++;
      solutionCopy[solutionCopy.indexOf(guessCopy[i])] = null;
    }
  }
  
  const feedback = [
    ...Array(correctPosition).fill("correct-position"),
    ...Array(correctColor).fill("correct-color")
  ];
  
  displayGuess(guess, feedback);
  
  return correctPosition === codeLength;
}

document.getElementById("submit-guess").addEventListener("click", () => {
  if (selectedColors.length !== codeLength) {
    alert(`Seleziona precisamente ${codeLength} colori.`);
    return;
  }

  guesses.push([...selectedColors]);
  remainingAttempts--;

  if (evaluateGuess(selectedColors)) {
    document.getElementById("feedback").innerText = "Bravo, hai vinto";
    document.getElementById("color-buttons").classList.add("d-none");
  } else if (remainingAttempts <= 0) {
    document.getElementById("feedback").innerText = `Game Over! La combinazione corretta era : ${solution.join(", ")}.`;
    document.getElementById("color-buttons").classList.add("d-none");
  } else {
    document.getElementById("feedback").innerText = `Tentativi mancanti: ${remainingAttempts}`;
  }

  selectedColors = [];
  displaySelectedColors();
});

function displaySelectedColors() {
  const selectedColorsDiv = document.getElementById("selected-colors");
  selectedColorsDiv.innerHTML = "";

  selectedColors.forEach((color, index) => {
    const colorBlock = document.createElement("div");
    colorBlock.className = "selected-color";
    colorBlock.style.backgroundColor = color;
    colorBlock.addEventListener("click", () => handleReplaceColor(index));
    selectedColorsDiv.appendChild(colorBlock);
  });
}

function setupColorButtons() {
  const colorButtonsDiv = document.querySelector(".color-options");
  colorButtonsDiv.innerHTML = "";

  colors.forEach(color => {
    const colorButton = document.createElement("div");
    colorButton.className = "color-button";
    colorButton.style.backgroundColor = color;
    colorButton.addEventListener("click", () => handleColorClick(color));
    colorButtonsDiv.appendChild(colorButton);
  });
}

function handleColorClick(color) {
  if (replaceMode && replaceIndex !== null) {
    selectedColors[replaceIndex] = color;
    replaceMode = false;
    replaceIndex = null;
  } else if (selectedColors.length < codeLength && !selectedColors.includes(color)) {
    selectedColors.push(color);
  }
  displaySelectedColors();
}

function handleReplaceColor(index) {
  replaceMode = true;
  replaceIndex = index;
}

document.getElementById("remove-color").addEventListener("click", () => {
  selectedColors.pop();
  displaySelectedColors();
});

document.getElementById("start-game").addEventListener("click", () => {
  maxAttempts = parseInt(document.getElementById("difficulty").value);
  initializeGame();
});

setupColorButtons();
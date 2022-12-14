const CHOICES = ["rock", "paper", "scissors"];

let playerHealth = document.getElementById("player-health");
let playerChoice;
const playerMoves = document.querySelectorAll(".player .move");

let computerHealth = document.getElementById("computer-health");
let computerChoice;
const computerMoves = document.querySelectorAll(".computer .move");

function game() {
    playerMoves.forEach((element) => {
        element.addEventListener("click", getPlayerChoice);
    }) 
}

function resetStyle() {
    playerMoves.forEach((element) => {
        element.style.boxShadow = "";
    })
    computerMoves.forEach((element) => {
        element.style.boxShadow = "";
    })
}

function getPlayerChoice() {
    resetStyle();
    
    playerChoice = CHOICES.findIndex((value) => {
        return value == this.getAttribute("id");
    })
    this.style.boxShadow = ".1px .1px 20px rgba(0, 255, 21, 0.8)";

    getComputerChoice();
    appendResults(verifyChoices());
    
    if (playerHealth.innerText <= 0 || computerHealth.innerText <= 0) {
        playerMoves.forEach((element) => {
            element.removeEventListener("click", getPlayerChoice);
        }) 
        resetStyle();
        appendPlayAgain();
    }
}

function getComputerChoice() {
    computerChoice = Math.floor(Math.random() * 3);
    let move = document.querySelector(".computer #"+CHOICES[computerChoice]);
    move.style.boxShadow = ".1px .1px 20px rgba(0, 255, 21, 0.8)";
}

function verifyChoices() {
    const VICTORYCONDITIONS = [CHOICES[1], CHOICES[2], CHOICES[0]];

    if (playerChoice == computerChoice) {
        return "Tie";
    }

    if (CHOICES[computerChoice] == VICTORYCONDITIONS[playerChoice]) {
        playerHealth.innerText -= 20;
        return "Computer Victory!";
    }

    if (CHOICES[playerChoice] == VICTORYCONDITIONS[computerChoice]) {
        computerHealth.innerText -= 20;
        return "Player Victory!";
    }
}

function appendResults(result) {
    let resultText = document.getElementById("result");
    let divResults = document.getElementById("game-results");
    if (!resultText) {
        resultText = document.createElement("h1");
        resultText.innerText = result;
        resultText.setAttribute("id", "result");
        divResults.appendChild(resultText);
    } else {
        resultText.innerText = result;
    }
}

function appendPlayAgain() {
    let divResults = document.getElementById("game-results");
    if (playerHealth.innerText <= 0 || computerHealth.innerText <= 0) {
        let playAgain = document.createElement("a");
        playAgain.style.cursor = "pointer";
        let text = document.createElement("h2");
        text.innerText = "Play Again";
        divResults.appendChild(playAgain);
        playAgain.appendChild(text);

        playAgain.addEventListener("click", () => window.location.reload());
    }
}

game();
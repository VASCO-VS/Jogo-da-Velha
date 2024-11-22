const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const playerTurn = document.getElementById("player");
const winnerText = document.getElementById("winner");
const winnerPlayer = document.getElementById("winner-player");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute("data-index");

    if (board[index] !== "" || !isGameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    checkWinner();
    switchPlayer();
}

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerTurn.textContent = currentPlayer;
}

function checkWinner() {
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            isGameActive = false;
            winnerText.style.display = "block";
            winnerPlayer.textContent = currentPlayer;
            return;
        }
    }

    if (!board.includes("")) {
        isGameActive = false;
        winnerText.style.display = "block";
        winnerPlayer.textContent = "Empate!";
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = "X";
    playerTurn.textContent = currentPlayer;
    winnerText.style.display = "none";

    cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
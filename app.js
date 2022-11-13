//form

//display the input for player 2's name when game type is multiplayer

function hide(id, elementValue) {
    let option = id.value;
    if(option === "0"){
    document.getElementById(id).style.display = elementValue.value == 1 ? 'none' : 'block';
    } else {
        document.getElementById(id).style.display = elementValue.value == 1 ? 'block' : 'none';
    }
}

//show entered player names

function displayNames(){
    let playerOne = document.getElementById("nameX").value;
    let playerTwo = document.getElementById("nameO").value;
    document.getElementById("player-X").innerHTML = playerOne;
    document.getElementById("player-O").innerHTML = playerTwo;
    if(playerTwo === ""){
        document.getElementById("player-O").innerHTML = "Computer";
    }
}

//overlay off or on

function off() {
    document.getElementById("overlay").style.display = "none";
} 

function on() {
    document.getElementById("overlay").style.display = "block";
} 

//game

//change game type depending on drop down menu selection
// document.getElementById("game-type").onchange = changeListener;

//tally counters for wins
const xTallies = document.getElementById("x-tallies");
const oTallies = document.getElementById("o-tallies");

//gameboard cells
const boxes = Array.from(document.getElementsByClassName("box"));

//player's turn display
const turn = document.getElementById("turn");

const replayButton = document.getElementById("replay-btn");
const winner = document.getElementById("display-winner");
let currentPlayer = 'X';
let active = true;

const xWon = "X Wins";
const oWon = "O Wins";
const tie = "Tie";

let board = ['', '', '', 
             '', '', '', 
             '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//initialize game

function game(){
    // changeListener();
    boxes.forEach(box => box.addEventListener("click", boxSelected));
}

boxes.forEach((box, index) => {
    turn.innerText = "Player " + currentPlayer + "'s turn";
    box.addEventListener('click', () => boxSelected(box, index));
});

function boxSelected(box, index){
    if (isBoxEmpty(box) && active) {
        box.innerText = currentPlayer;
        box.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        switchPlayer();
        result();
        // computer(); couldn't figure out how to toggle between single and multiplayer with the input button
    }
}

//randomly place the other mark into empty box

function computer() {
    let emptyBoxes = [];
    let random;
    boxes.forEach(function(box){
        if (box.innerText == '') {
            emptyBoxes.push(box);
        }
    });
    random = Math.ceil(Math.random() * emptyBoxes.length) - 1;
    emptyBoxes[random].innerText = currentPlayer;
    result();
    switchPlayer();
}

//check win conditions and display winner

function result() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        displayWin(currentPlayer === 'X' ? oWon : xWon);
        turn.style.display = "none";
        active = false;
        return;
    }
    if (!board.includes('')){
        displayWin(tie);
        turn.style.display = "none";
        active = false;
    }
}

function displayWin(type) {
    switch (type){
        case oWon:
            winner.innerHTML = "Player O Wins!"
            turn.style.display = "none";
            oTallies.append("|");
            break;
            case xWon:
            winner.innerHTML = "Player X Wins!"
            turn.style.display = "none";
            xTallies.append("|");
            break;
            case tie:
            winner.innerText = 'Tie'
    }
};

function isBoxEmpty(box) {
    if (box.innerText === 'X' || box.innerText === 'O'){
        return false;
    }
    return true;
};

function updateBoard (index){
    board[index] = currentPlayer;
}

function switchPlayer() {
    turn.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turn.innerText = "Player " + currentPlayer + "'s turn";
    turn.classList.add(`player${currentPlayer}`);
}
    
function resetBoard() {
    turn.style.display = "block";
    board = ['', '', '', '', '', '', '', '', ''];
    active = true;
    winner.innerHTML = "";
    switchPlayer();
    boxes.forEach(box => {box.innerText = '';
        box.classList.remove('playerX');
        box.classList.remove('playerO');
    });
}

replayButton.addEventListener('click', resetBoard);

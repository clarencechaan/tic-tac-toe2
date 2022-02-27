const board = document.querySelector('#board');
const xName = document.querySelector('#x-name');
const oName = document.querySelector('#o-name');

const gameBoard = (() => {

    let board = ['','','','','','','','',''];

    function newGame() {
        board = ['','','','','','','','',''];
        console.log(board);
        currentPlayer = playerX;
        displayController.clearDisplay();
        displayController.highlightCurrentPlayer();
    }

    function getBoard() {
        return board;
    }

    function markSpot(marker, spot) {
        if (!board[spot] && gameStatus() === "ONGOING") {
            board[spot] = marker;
            displayController.renderDisplay();
            console.log(gameStatus());
            if (gameStatus() !== 'ONGOING') {
                displayController.displayGameOutcome();
                return;
            }
            switchPlayers();
            displayController.highlightCurrentPlayer();
        }
    }

    function switchPlayers() {
        if (currentPlayer == playerX) {
            currentPlayer = playerO;
        } else {
            currentPlayer = playerX;
        }
    }

    // returns "ONGING", "X WINS", "Y WINS", or "TIE"
    function gameStatus() {
        // return winner if 3 in a row
        if (board[0] && board[0] === board[1] && board[1] === board[2]
            || board[3] && board[3] === board[4] && board[4] === board[5]
            || board[6] && board[6] === board[7] && board[7] === board[8]
            || board[0] && board[0] === board[3] && board[3] === board[6]
            || board[1] && board[1] === board[4] && board[4] === board[7]
            || board[2] && board[2] === board[5] && board[5] === board[8]
            || board[0] && board[0] === board[4] && board[4] === board[8]
            || board[2] && board[2] === board[4] && board[4] === board[6]) {
                return currentPlayer.marker + ' WINS';
        // return TIE if board is full
        } else if (!board.includes('')) {
            return "TIE";
        // return ONGOING if no winner and no tie
        } else {
            return "ONGOING";
        }
    }

    return { getBoard, markSpot , newGame, gameStatus}

})();


const displayController = (() => {

    const winnerLabel = document.querySelector('#winner-label');

    function renderDisplay() {
        for (let i = 0; i < 9; i++) {
            const cell = document.querySelector(`#board > div:nth-child(${i+1})`);
            cell.textContent = gameBoard.getBoard()[i];
        }
    }

    function clearDisplay() {
        for (let i = 0; i < 9; i++) {
            const cell = document.querySelector(`#board > div:nth-child(${i+1})`);
            cell.textContent = '';
        }
        winnerLabel.innerHTML = '<br>';
    }

    function displayGameOutcome() {
        if (gameBoard.gameStatus() === 'X WINS' || gameBoard.gameStatus() === 'O WINS') {
            winnerLabel.textContent = currentPlayer.name + ' wins the game!';
        } else if (gameBoard.gameStatus() === 'TIE') {
            winnerLabel.textContent = 'Tie game!'
        }
    }

    function highlightCurrentPlayer() {
        if (currentPlayer === playerX) {
            xName.classList.add('current-player')
            oName.classList.remove('current-player')
        } else {
            xName.classList.remove('current-player')
            oName.classList.add('current-player')
        }
    }

    return { renderDisplay, clearDisplay, highlightCurrentPlayer, displayGameOutcome }
})();


const Player = (name, marker) => {

    function playMove(spot) {
        gameBoard.markSpot(marker, spot);
    }

    function setName(name) {
        this.name = name;
    }

    return { playMove, name, marker, setName}
}

const playerX = Player('Player X', 'X');
const playerO = Player('Player O', 'O');
let currentPlayer = playerX;

// add event listeners to each cell
for (let i = 0; i < 9; i++) {
    board.children.item(i).addEventListener('click', () => {
        currentPlayer.playMove(i);
    });
}

// add event listener to new game button
const newGameBtn = document.querySelector('button');
newGameBtn.onclick = gameBoard.newGame;

// add event listener to player name inputs
xName.addEventListener('change', () => playerX.setName(xName.value));
oName.addEventListener('change', () => playerO.setName(oName.value));
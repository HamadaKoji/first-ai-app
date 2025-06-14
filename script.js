class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        
        this.cells = document.querySelectorAll('.cell');
        this.currentPlayerDisplay = document.getElementById('current-player');
        this.gameStatus = document.getElementById('game-status');
        this.resetButton = document.getElementById('reset-button');
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });
        
        this.resetButton.addEventListener('click', () => this.resetGame());
    }
    
    handleCellClick(index) {
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }
        
        this.board[index] = this.currentPlayer;
        this.updateBoard();
        this.checkResult();
    }
    
    updateBoard() {
        this.cells.forEach((cell, index) => {
            cell.textContent = this.board[index];
            cell.className = 'cell';
            if (this.board[index] === 'X') {
                cell.classList.add('x');
            } else if (this.board[index] === 'O') {
                cell.classList.add('o');
            }
        });
    }
    
    checkResult() {
        let roundWon = false;
        let winningCombination = [];
        
        for (let i = 0; i < this.winningConditions.length; i++) {
            const [a, b, c] = this.winningConditions[i];
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                roundWon = true;
                winningCombination = [a, b, c];
                break;
            }
        }
        
        if (roundWon) {
            this.announceWinner(winningCombination);
            return;
        }
        
        if (!this.board.includes('')) {
            this.announceDraw();
            return;
        }
        
        this.changePlayer();
    }
    
    announceWinner(winningCombination) {
        this.gameStatus.textContent = `プレイヤー ${this.currentPlayer} の勝利！`;
        this.gameActive = false;
        this.currentPlayerDisplay.textContent = '';
        
        winningCombination.forEach(index => {
            this.cells[index].classList.add('winner');
        });
    }
    
    announceDraw() {
        this.gameStatus.textContent = '引き分け！';
        this.gameActive = false;
        this.currentPlayerDisplay.textContent = '';
    }
    
    changePlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.currentPlayerDisplay.textContent = `プレイヤー ${this.currentPlayer} の番です`;
    }
    
    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.currentPlayerDisplay.textContent = `プレイヤー ${this.currentPlayer} の番です`;
        this.gameStatus.textContent = '';
        this.updateBoard();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});
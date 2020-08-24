class Score {
  constructor(size, max) {
    this.size = size;
    this.moves = max * this.size;
    this.startingScore = this.moves;
    this.scoreDisplay = document.querySelector('.score-display');
    this.scoreDisplay.textContent = this.moves;
    this.winDisplay = document.querySelector('.win-display');
    this.winDisplay.textContent = '';
  }
  update() {
    this.scoreDisplay.textContent = --this.moves;
  }
  checkForWin(winStatus) {
    if (winStatus == true) {
      this.winDisplay.textContent = `Well done!, you won in ${this.startingScore - this.moves} moves, with a score of ${this.moves}`;
    }
  }
}
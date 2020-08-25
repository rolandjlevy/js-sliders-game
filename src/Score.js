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
  update(blocks) {
    this.scoreDisplay.textContent = --this.moves;
    const winStatus = blocks.every((item, index) => item.currentNum == item.div.id);
    if (winStatus == true) {
      // show form elements
      this.winDisplay.textContent = `Well done!, you won in ${this.total} moves, with a score of ${this.moves}`;
    }
  }
}
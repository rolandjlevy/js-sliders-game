class Score {
  constructor(size, max) {
    this.size = size;
    this.moves = max * this.size;
    this.startingScore = this.moves;
    this.scoreDisplay = document.querySelector('.score-display');
    this.scoreDisplay.textContent = this.moves;
    this.playerName = document.querySelector('#player-name');
    this.playerNameError = document.querySelector('.error-message');
    this.playerNameError.classList.remove('show');
    this.addScoreForm = document.querySelector('#add-score-form');
    this.addScoreForm.style.display = 'none';
    this.winDisplay = document.querySelector('.win-display');
    this.winDisplay.innerHTML = '';
  }
  update(blocks) {
    this.scoreDisplay.textContent = --this.moves;
    const winStatus = blocks.every((item, index) => item.currentNum == item.div.id);
    if (winStatus == true) {
      const total = this.startingScore - this.moves;
      this.addScoreForm.style.display = 'initial';
      this.playerName.focus();
      this.winDisplay.innerHTML = `<span>Well done! you won in <strong>${total}</strong> moves, with a score of <strong>${this.moves}</strong>. Please add your name or Repl username to the leader board:</span>`;
    }
  }
}
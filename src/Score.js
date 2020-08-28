class Score {
  constructor(size, max) {
    this.moves = max * size;
    this.setUpHTMLElems();
    this.init();
  }
  setUpHTMLElems() {
    this.scoreDisplay = document.querySelector('.score-display');
    this.playerName = document.querySelector('#player-name');
    this.playerNameError = document.querySelector('.error-message');
    this.addScoreForm = document.querySelector('#add-score-form');
    this.winDisplay = document.querySelector('.win-display');
  }
  init() {
    this.startingScore = this.moves;
    this.scoreDisplay.textContent = this.moves;
    this.addScoreForm.style.display = 'none';
    this.playerNameError.classList.remove('show');
  }
  update(blocks) {
    this.scoreDisplay.textContent = --this.moves;
    const winStatus = blocks.every((item, index) => item.currentNum == item.div.id);
    if (winStatus == true) {
      const total = this.startingScore - this.moves;
      this.addScoreForm.style.display = 'initial';
      this.playerName.focus();
      this.winDisplay.innerHTML = `<span>Well done! you won in <strong>${total}</strong> moves, with a score of <span class="moves">${this.moves}</span>. Please add your name or Repl username to the Leader Board:</span>`;
    }
  }
}
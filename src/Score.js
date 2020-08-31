class Score {
  constructor(size, max) {
    this.moves = max * size;
    this.setUpHTMLElems();
    this.init();
  }
  setUpHTMLElems() {
    this.scoreDisplay = document.querySelector('.score-display');
    this.playerNameWrapper = document.querySelector('.player-name-wrapper');
    this.addScoreForm = document.querySelector('#add-score-form');
    this.winDisplay = document.querySelector('.win-display');
  }
  init() {
    this.startingScore = this.currentMoves;
    this.scoreDisplay.textContent = this.startingScore;
    this.addScoreForm.style.display = 'none';
    this.playerNameWrapper.innerHTML = '';
  }
  get currentMoves() {
    return this.moves;
  }
  update(blocks) {
    this.scoreDisplay.textContent = --this.moves;
    const winStatus = blocks.every((item, index) => item.currentNum == item.div.id);
    if (winStatus == true) {
      const total = this.startingScore - this.currentMoves;
      this.addScoreForm.style.display = 'initial';
      this.winDisplay.innerHTML = `<span>Well done! you won in <strong>${total}</strong> moves, with a score of <span class="moves">${this.currentMoves}</span>. Please add your name or Repl username to the Leader Board:</span>`;
      this.playerNameWrapper.innerHTML = `<input id="player-name" type="text" class="m-b-10" required placeholder="Your name..." maxlength="20"><label for="player-name" class="error-message"></label>`;
      const playerName = document.querySelector('#player-name');
      playerName.focus();
    }
  }
}
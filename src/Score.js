class Score {
  constructor(size, scoreFactor) {
    this.updateScore = scoreFactor * size;
    this.scoreFactor = scoreFactor;
    this.setUpHTMLElems();
    this.init();
  }
  set updateScore(n) {
    this.moves = n;
  }
  get currentMoves() {
    return this.moves;
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
  update(blocks) {
    this.updateScore = this.currentMoves - 1;
    this.scoreDisplay.textContent = this.currentMoves;
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
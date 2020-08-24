class Score {
  constructor(size, max) {
    this.size = size;
    this.max = max;
    this.moves = this.max * this.size;
    this.display = document.querySelector('.score-display');
    this.display.textContent = this.moves;
  }
  update() {
    this.display.textContent = --this.moves;
  }
}
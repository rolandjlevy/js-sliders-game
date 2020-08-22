class Score {
  constructor(max) {
    this.moves = max;
    this.display = document.querySelector('.display');
    this.display.textContent = this.moves;
  }
  update() {
    this.display.textContent = --this.moves;
  }
}
class Game {
  constructor(size, main) {
    this.main = main;
    this.size = size;
    this.currentNums = Array.from(Array(size * size).keys()).map(num => num + 1);
    this.shuffleCount = 0;
  }
  createDivs() {
    this.main.innerHTML = '';
    let counter = 0;
    while (counter++ < this.size * this.size) {
      const div = document.createElement('div');
      this.main.appendChild(div);
    }
    this.divs = document.querySelectorAll('main > div');
  }
  createGrid(blockSize, borderSize) {
    this.main.classList.remove('show');
    const wh = this.size * blockSize + this.size * borderSize * 2;
    this.main.style.width = `${wh}px`;
    this.main.style.height = `${wh}px`;
    this.main.classList.add('show');
  }
  getCurrentNum() {
    const rand = Math.floor(Math.random() * this.currentNums.length);
    return this.currentNums.splice(rand, 1).shift();
  }
}
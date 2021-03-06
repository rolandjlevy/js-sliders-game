export class Game {
  constructor(size, s) {
    this.main = document.querySelector('main');
    this.size = size;
    this.currentNums = Array.from(Array(size * size).keys()).map(num => num + 1);
    this.shuffleCount = 0;
    this.s = s;
  }
  createGrid(blockSize, borderSize) {
    this.main.classList.remove('show');
    const wh = this.size * blockSize + this.size * borderSize * 2;
    this.main.style.width = `${wh}px`;
    this.main.style.height = `${wh}px`;
    this.main.classList.add('show');
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
  getCurrentNum() {
    const rand = Math.floor(Math.random() * this.currentNums.length);
    return this.currentNums.splice(rand, 1).shift();
  }
  shuffle(blocks, gameSize, shuffleDisplay, shuffleLength) {
    gameSize.disabled = true;
    shuffleDisplay.classList.remove('hide');
    const shuffleID = setInterval(() => {
      const rand = Math.round(Math.random() * (blocks.length - 1));
      blocks[rand].div.click();
      const remaining = Number(shuffleLength - this.shuffleCount).toLocaleString();
      shuffleDisplay.textContent = `Initializer countdown: ${remaining}`;
      if (this.shuffleCount >= shuffleLength) {
        shuffleDisplay.classList.add('hide');
        gameSize.disabled = false;
        clearInterval(shuffleID);
      }
      this.shuffleCount++;
    }, 0.1);
  }
}
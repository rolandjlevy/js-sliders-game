export class Game {
  constructor(size, s, $, $$) {
    this.s = s;
    this.$ = $;
    this.$$ = $$;
    this.size = size;
    this.currentNums = Array.from(Array(size * size).keys()).map(
      (num) => num + 1
    );
    this.shuffleCount = 0;
    this.shuffleLengths = {
      size_2: 50,
      size_3: 200,
      size_4: 700,
      size_5: 1350,
      size_6: 2500
    };
  }
  createGrid(blockSize, borderSize) {
    this.$('main').classList.remove('show');
    const wh = this.size * blockSize + this.size * borderSize * 2;
    this.$('main').style.width = `${wh}px`;
    this.$('main').style.height = `${wh}px`;
    this.$('main').classList.add('show');
  }
  createDivs() {
    this.$('main').innerHTML = '';
    let counter = 0;
    while (counter++ < this.size * this.size) {
      const div = document.createElement('div');
      this.$('main').appendChild(div);
    }
    this.divs = this.$$('main > div');
  }
  getCurrentNum() {
    const rand = Math.floor(Math.random() * this.currentNums.length);
    return this.currentNums.splice(rand, 1).shift();
  }
  shuffle(blocks) {
    const shuffleLength = this.shuffleLengths[`size_${this.size}`];
    const shuffleDisplay = this.$('.shuffle-display');
    this.$('#game-size').disabled = true;
    shuffleDisplay.classList.remove('hide');
    const shuffleID = setInterval(() => {
      const rand = Math.round(Math.random() * (blocks.length - 1));
      blocks[rand].div.click();
      const remaining = Number(
        shuffleLength - this.shuffleCount
      ).toLocaleString();
      shuffleDisplay.textContent = `Initializer countdown: ${remaining}`;
      if (this.shuffleCount >= shuffleLength) {
        shuffleDisplay.classList.add('hide');
        this.$('#game-size').disabled = false;
        clearInterval(shuffleID);
      }
      this.shuffleCount++;
    }, 0.1);
  }
}

class Blocks {
  constructor(size, score) {
    this.size = size
    this.score = score;
    this.blocks = [];
    this.blankId = this.size * this.size;
    this.currentNums = Array.from(Array(this.size * this.size).keys());
    this.createDivs();
    this.init();
  }
  createDivs() {
    const main = document.querySelector('main');
    main.innerHTML = '';
    let counter = 0;
    while (counter++ < this.size * this.size) {
      const div = document.createElement('div');
      main.appendChild(div);
    }
    this.divs = document.querySelectorAll('main > div');
  }
  init() {
    this.divs.forEach((div, index) => {
      const currentNum = this.getCurrentNum();
      div.id = index + 1;
      div.textContent = Number(currentNum) + 1;
      this.addSwapEvent(div);
      const obj = {
        x: (index % this.size) + 1,
        y: Math.floor(index / this.size) + 1,
        div,
        blank: false,
        currentNum: Number(currentNum) + 1
      }
      if (obj.currentNum == this.blankId) {
        obj.div.textContent = '';
        obj.div.classList.toggle('blank');
        obj.blank = true;
      } else if (obj.currentNum == div.id) {
        obj.div.classList.toggle('correct');
      }
      this.blocks.push(obj);
    });
  }
  getCurrentNum() {
    const rand = Math.floor(Math.random() * this.currentNums.length);
    return this.currentNums.splice(rand, 1);
  }
  validMove(a, b) {
    return (a.x + 1 == b.x && a.y == b.y || 
            a.x - 1 == b.x && a.y == b.y || 
            a.y + 1 == b.y && a.x == b.x || 
            a.y - 1 == b.y && a.x == b.x);
  }
  addSwapEvent(div) {
    div.addEventListener('click', (e) => {
      const id = e.target.id;
      const bl = this.blocks.find(item => item.blank);
      const cr = this.blocks.find(item => item.div.id == id);
      
      if (this.validMove(cr, bl)) {
        cr.div.textContent = '';
        cr.div.classList.add('blank');
        cr.div.classList.remove('correct');
        cr.blank = true;

        bl.div.textContent = cr.currentNum;
        bl.div.classList.remove('blank');
        bl.blank = false;

        bl.currentNum = cr.currentNum;

        if (bl.currentNum == bl.div.id) {
          bl.div.classList.add('correct');
        }

        this.score.update();

      }
    }, false);
  }
}
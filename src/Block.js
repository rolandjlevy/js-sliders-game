class Block {
  constructor({index, size, div, currentNum}) {
    this.x = (index % size) + 1;
    this.y = Math.floor(index / size) + 1;
    this.div = div;
    this.div.id = index + 1;
    this.currentNum = currentNum;
    this.div.textContent = currentNum;
    this.blank = false;
    this.blankId = size * size;
    this.init();
  }
  init() {
    if (this.currentNum == this.blankId) {
      this.div.textContent = '';
      this.div.classList.toggle('blank');
      this.blank = true;
    } else if (this.currentNum == this.div.id) {
      this.div.classList.toggle('correct');
    }
  }
  addSwapEvent(div, blocks, score) {
    div.addEventListener('click', (e) => {
      const id = e.target.id;
      const bl = blocks.find(item => item.blank);
      const cr = blocks.find(item => item.div.id == id);
      if (this.validMove(cr, bl)) {
        const blankCurrentNum = bl.currentNum;
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
        cr.currentNum = blankCurrentNum;
        score.update();
        const winStatus = blocks.every((item, index) => item.currentNum == item.div.id);
        score.checkForWin(winStatus);
      }
    }, false);
  }
  validMove(a, b) {
    return (a.x + 1 == b.x && a.y == b.y || 
            a.x - 1 == b.x && a.y == b.y || 
            a.y + 1 == b.y && a.x == b.x || 
            a.y - 1 == b.y && a.x == b.x);
  }
}
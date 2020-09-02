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
    this.size = size;
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
  addSwapEvent(div, blocks, score, game) {
    div.addEventListener('click', (e) => {
      const id = e.target.id;
      const bl = blocks.find(item => item.blank);
      const cr = blocks.find(item => item.div.id == id);
      if (game.shuffleCount > (score.scoreFactor/5) * Math.pow(this.size, 3)) {
        this.validTest(cr, bl, id);
      }
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
        if (game.shuffleCount > (score.scoreFactor/5) * Math.pow(this.size, 3)) {
          score.update(blocks);
        }
      }
    }, false);
  }
  validTest(a, b, id) {
    // return range of available and valid blocks in relation to blankCurrentNum

    console.log(this.validRange(a, b));

    // const n = Number(num);
    // const size = Number(this.size);
    // const obj = {
    //   top: n - size, 
    //   right: n + 1,
    //   bottom: n + size,
    //   left: n - 1
    // };
    // console.log({obj});
    // return obj;
  }
  validMove(a, b) {
    return (a.x + 1 == b.x && a.y == b.y || 
            a.x - 1 == b.x && a.y == b.y || 
            a.y + 1 == b.y && a.x == b.x || 
            a.y - 1 == b.y && a.x == b.x);
  }
  validRange(a, b) {
    return {
      right:  a.x + 1 == b.x && a.y == b.y ? 1 : 0, 
      left:   a.x - 1 == b.x && a.y == b.y ? 1 : 0, 
      top:    a.y + 1 == b.y && a.x == b.x ? 1 : 0, 
      bottom: a.y - 1 == b.y && a.x == b.x ? 1 : 0
    };
  }
}
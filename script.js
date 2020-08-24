const maxScore = 100;
const main = document.querySelector('main');
const body = document.querySelector('body');
const blockSize = getComputedStyle(body).getPropertyValue('--block-size');
const borderSize = getComputedStyle(body).getPropertyValue('--border-size');

function startGame(size) {
  const score = new Score(maxScore);
  const game = new Game(size, main);
  game.createGrid(blockSize, borderSize);
  game.createDivs();
  const blocks = [];
  game.divs.forEach((div, index) => {
    const obj = new Block({index, size, div, currentNum:game.getCurrentNum()});
    obj.addSwapEvent(div, blocks, score);
    blocks.push(obj);
  });
}

function selectGameSize(elem) {
  let size = 3;
  if (elem) {
    const index = elem.selectedIndex;
    size = elem.options[index].value;
  }
  startGame(size);
}

selectGameSize();
let score;
const scoreFactor = 150;
const main = document.querySelector('main');
const body = document.querySelector('body');
const gameSize = document.querySelector('#game-size');
const blockSize = getComputedStyle(body).getPropertyValue('--block-size');
const borderSize = getComputedStyle(body).getPropertyValue('--border-size');

function startGame() {
  const size = gameSize.value;
  score = new Score(size, scoreFactor);
  const blocks = [];
  const game = new Game(size, main);
  game.createGrid(blockSize, borderSize);
  game.createDivs();
  game.divs.forEach((div, index) => {
    const block = new Block({index, size, div, currentNum:game.getCurrentNum()});
    block.addSwapEvent(div, blocks, score);
    blocks.push(block);
  });
}

startGame();
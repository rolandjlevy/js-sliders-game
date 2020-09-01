let blocks;
let score;
const scoreFactor = 150;
const main = document.querySelector('main');
const body = document.querySelector('body');
const gameSize = document.querySelector('#game-size');
const helpDisplay = document.querySelector('.help');
const shuffleDisplay = document.querySelector('.shuffle-display');
const blockSize = getComputedStyle(body).getPropertyValue('--block-size');
const borderSize = getComputedStyle(body).getPropertyValue('--border-size');

function startGame() {
  if (!shuffleDisplay.classList.contains('hide')) return;
  const size = gameSize.value;
  score = new Score(size, scoreFactor);
  const game = new Game(size, main);
  game.createGrid(blockSize, borderSize);
  game.createDivs();
  blocks = [];
  game.divs.forEach((div, index) => {
    const block = new Block({index, size, div, currentNum:index + 1});
    block.addSwapEvent(div, blocks, score, game);
    blocks.push(block);
  });
  const shuffleLength = (scoreFactor/5) * Math.pow(size, 3);
  shuffleDisplay.classList.remove('hide');
  gameSize.disabled = true;
  shuffle(blocks, game, shuffleLength);
}

function shuffle(blocks, game, shuffleLength) {
  const shuffleID = setInterval(() => {
    const rand = Math.round(Math.random() * (blocks.length - 1));
    blocks[rand].div.click();
    const remaining = Number(shuffleLength - game.shuffleCount).toLocaleString();
    shuffleDisplay.textContent = `Initializer countdown: ${remaining}`;
    if (game.shuffleCount >= shuffleLength) {
      shuffleDisplay.classList.add('hide');
      gameSize.disabled = false;
      clearInterval(shuffleID);
    }
    game.shuffleCount++;
  }, 1);
}

function toggleHelp(state) {
  helpDisplay.classList[state]('show');
}

startGame();
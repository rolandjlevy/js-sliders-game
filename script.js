import { Block } from './src/Block.js';
import { Game } from './src/Game.js';
import { Score } from './src/Score.js';

const body = document.querySelector('body');
const gameSize = document.querySelector('#game-size');
const helpDisplay = document.querySelector('.help');
const shuffleDisplay = document.querySelector('.shuffle-display');
const blockSize = getComputedStyle(body).getPropertyValue('--block-size');
const borderSize = getComputedStyle(body).getPropertyValue('--border-size');

window.startGame = function() {
  if (!shuffleDisplay.classList.contains('hide')) return;
  const size = gameSize.value;
  const scoreFactor = 150;
  window.score = new Score(size, scoreFactor);
  const game = new Game(size);
  game.createGrid(blockSize, borderSize);
  game.createDivs();
  const blocks = [];
  game.divs.forEach((div, index) => {
    const block = new Block({index, size, div, currentNum:index + 1});
    block.addSwapEvent(div, blocks, score, game);
    blocks.push(block);
  });
  const shuffleLength = (scoreFactor/5) * Math.pow(size, 3);
  game.shuffle(blocks, gameSize, shuffleDisplay, shuffleLength)
}

window.toggleHelp = function(state) {
  helpDisplay.classList[state]('show');
}

startGame();
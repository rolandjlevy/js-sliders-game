import { Block } from "./src/Block.js";
import { Game } from "./src/Game.js";
import { Score } from "./src/Score.js";

const $ = (elem) => document.querySelector(elem);
const $$ = (elem) => document.querySelectorAll(elem);

const blockSize = getComputedStyle($("body")).getPropertyValue("--block-size");
const borderSize = getComputedStyle($("body")).getPropertyValue(
  "--border-size"
);

window.startGame = () => {
  if (!$(".shuffle-display").classList.contains("hide")) return;
  const size = $("#game-size").value;
  const scoreFactor = 150;
  const score = new Score(size, scoreFactor, $);
  window.game = new Game(size, score, $, $$);
  window.num = 13;
  game.createGrid(blockSize, borderSize);
  game.createDivs();
  const blocks = [];
  game.divs.forEach((div, index) => {
    const block = new Block({ index, size, div, currentNum: index + 1 });
    block.addSwapEvent(div, blocks, score, game);
    blocks.push(block);
  });
  game.shuffle(blocks);
};

window.toggleHelp = (state) => {
  $(".help").classList[state]("show");
};

startGame();

document.querySelector("#year").textContent = new Date().getFullYear();

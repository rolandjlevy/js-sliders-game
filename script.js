// blocks
const blocks = [];
const SIZE = 3;
let blankId = SIZE * SIZE;
const divs = document.querySelectorAll('main > div');

// scoring
let moves = 100;
const display = document.querySelector('.display');
display.textContent = moves;

// grid
const body = document.querySelector('body');
const main = document.querySelector('main');
const blockSize = getComputedStyle(body).getPropertyValue('--block-size');
const borderSize = getComputedStyle(body).getPropertyValue('--border-size');
main.classList.add('show');
const wh = SIZE * blockSize + SIZE * borderSize * 2;
main.style.width = `${wh}px`;
main.style.height = `${wh}px`;

// blocks
const currentNums = Array.from(Array(SIZE * SIZE).keys());
const getCurrentNum = () => {
  const rand = Math.floor(Math.random() * currentNums.length);
  return currentNums.splice(rand, 1);
}

// blocks
divs.forEach((div, index) => {
  const currentNum = getCurrentNum();
  div.id = index + 1;
  div.textContent = Number(currentNum) + 1;
  div.addEventListener('click', swap);
  const obj = {
    x: (index % SIZE) + 1,
    y: Math.floor(index / SIZE) + 1,
    div,
    blank: false,
    currentNum: Number(currentNum) + 1
  }
  if (obj.currentNum == blankId) {
    obj.div.textContent = '';
    obj.div.classList.toggle('blank');
    obj.blank = true;
  }
  blocks.push(obj);
});

// blocks > either blank, incorrect or correct
function swap(e) {
  const id = e.target.id;
  const bl = blocks.find(item => item.blank);
  const cr = blocks.find(item => item.div.id == id);
  
  if (cr.x + 1 == bl.x && cr.y == bl.y || 
      cr.x - 1 == bl.x && cr.y == bl.y || 
      cr.y + 1 == bl.y && cr.x == bl.x || 
      cr.y - 1 == bl.y && cr.x == bl.x) {
        
    display.textContent = --moves;

    // make current block blank
    cr.div.textContent = '';
    cr.div.classList.add('blank');
    cr.div.classList.remove('correct');
    cr.blank = true;

    // make old blank block purple or green
    bl.div.textContent = cr.currentNum;
    bl.div.classList.remove('blank');
    bl.blank = false;

    bl.currentNum = cr.currentNum;

    if (bl.currentNum == bl.div.id) {
      bl.div.classList.add('correct');
    }
  }
}

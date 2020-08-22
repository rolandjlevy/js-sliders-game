const blocks = [];
const SIZE = 3;
let moves = 100;
let blankId = SIZE * SIZE;

const body = document.querySelector('body');
const main = document.querySelector('main');
const divs = document.querySelectorAll('main > div');
const display = document.querySelector('.display');

const blockSize = getComputedStyle(body).getPropertyValue('--block-size');

display.textContent = moves;
main.classList.add('show');
main.style.width = `${SIZE * blockSize + SIZE * 2}px`;
main.style.height = `${SIZE * blockSize + SIZE * 2}px`;

const currentNums = Array.from(Array(SIZE * SIZE).keys());
const getCurrentNum = () => {
  const rand = Math.floor(Math.random() * currentNums.length);
  return currentNums.splice(rand, 1);
}

divs.forEach((div, index) => {
  const currentNum = getCurrentNum();
  div.id = index + 1;
  div.textContent = Number(currentNum) + 1;
  div.addEventListener('click', slide);
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

function slide(e) {
  const id = e.target.id;
  const bl = blocks.find(item => item.blank);
  const cr = blocks.find(item => item.div.id == id);
  
  if (cr.x + 1 == bl.x && cr.y == bl.y || 
      cr.x - 1 == bl.x && cr.y == bl.y || 
      cr.y + 1 == bl.y && cr.x == bl.x || 
      cr.y - 1 == bl.y && cr.x == bl.x) {
        
    display.textContent = --moves;

    cr.div.textContent = '';
    cr.div.classList.toggle('blank');
    cr.blank = true;

    bl.div.textContent = cr.currentNum;
    bl.div.classList.toggle('blank');
    bl.blank = false;

    bl.currentNum = cr.currentNum;

    if (bl.currentNum == bl.div.id) {
      console.log('correct');
      // bl.div.classList.add('correct');
    }
    // console.log('bl.currentNum', bl.currentNum, 'bl.div.id', bl.div.id)
  }
}

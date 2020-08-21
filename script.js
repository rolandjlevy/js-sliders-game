const divs = document.querySelectorAll('main > div');

const blocks = [];
const SIZE = 3;
let blankId = SIZE * SIZE;

const randomNum = (n) => Math.floor(Math.random() * n);
const currentNums = Array.from(Array(SIZE * SIZE).keys());

divs.forEach((div, index) => {
  const rand = randomNum(currentNums.length);
  const currentNum = currentNums.splice(rand, 1);
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

    cr.div.textContent = '';
    cr.div.classList.toggle('blank');
    cr.blank = true;

    bl.div.textContent = cr.currentNum;
    bl.div.classList.toggle('blank');
    bl.blank = false;

    bl.currentNum = cr.currentNum;
    
  }
}

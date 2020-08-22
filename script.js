
let size = 3;

function refresh(elem) {
  if (elem) {
    const index = elem.selectedIndex;
    size = elem.options[index].value;
  }
  const grid = new Grid(size);
  const score = new Score(100);
  const blocks = new Blocks(size, score);
}

refresh();
class Grid {
  constructor(size) {
    const body = document.querySelector('body');
    const main = document.querySelector('main');
    const blockSize = getComputedStyle(body).getPropertyValue('--block-size');
    const borderSize = getComputedStyle(body).getPropertyValue('--border-size');
    main.classList.add('show');
    const wh = size * blockSize + size * borderSize * 2;
    main.style.width = `${wh}px`;
    main.style.height = `${wh}px`;
  }
}
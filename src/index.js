import GameOfLife from './app/GameOfLife';
import './scss/main.scss';

function createEmptyBoard() {
  const section = document.createElement('section');
  section.id = 'board';
  return section;
}

// show/hide instructions
document.getElementById('toggle').addEventListener('click', () => {
  document.getElementById('instructions').classList.toggle('hidden');
});

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();

  // clear existing board on re-submitting board dimensions
  const board = document.getElementById('board');
  const boardParent = board.parentElement;
  // remove board if initialized
  if (board.children.length) {
    board.remove();
    boardParent.appendChild(createEmptyBoard());
  }

  const width = document.getElementById('boardWidth');
  const height = document.getElementById('boardHeight');
  const game = new GameOfLife(parseInt(width.value), parseInt(height.value));
  game.init();

  // clear form
  width.value = '';
  height.value = '';

  // buttons
  const play = document.getElementById('play');
  const pause = document.getElementById('pause');
  const reset = document.getElementById('reset');
  // enable play button
  play.disabled = false;

  play.addEventListener('click', () => {
    // enable play and reset buttons
    pause.disabled = false;
    reset.disabled = false;

    const interval = setInterval(() => game.printNextGeneration(), 100);

    // reset
    reset.addEventListener('click', () => {
      clearInterval(interval);
      game.reset();
    });

    // pause
    pause.addEventListener('click', () => {
      clearInterval(interval);
    });
  });
});

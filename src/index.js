import GameOfLife from './app/GameOfLife';
import patterns from './app/patterns';
import { evaluateBoard } from './app/utils/evaluateBoard';
import './scss/main.scss';

// buttons
const puls = document.getElementById('pulsar');
const gun = document.getElementById('gun');
const inf = document.getElementById('infinite');
const play = document.getElementById('play');
const pause = document.getElementById('pause');
const reset = document.getElementById('reset');

// initialize globals
let game;
let interval;
// ToDo - allow user to input game speed

// generates predefined pattern
[puls, gun, inf].forEach(btn => {
  btn.addEventListener('click', () => {
    const pattern = btn.dataset.pattern;
    evaluateBoard(pattern);

    game = new GameOfLife(90, 60);
    game.generatePattern(patterns[pattern]);

    interval && clearInterval(interval);
    play.disabled = false;
  });
});

play.addEventListener('click', () => {
  pause.disabled = false;
  reset.disabled = false;

  interval = setInterval(() => game.printNextGeneration(), 100);

  // reset
  reset.addEventListener('click', () => {
    clearInterval(interval);
    game && game.reset();
  });

  // pause
  pause.addEventListener('click', () => {
    clearInterval(interval);
  });
});

// form submit logic
document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  interval && clearInterval(interval);

  const width = document.getElementById('boardWidth');
  const height = document.getElementById('boardHeight');

  // remove board if it already exists
  evaluateBoard();

  // good to go - initialize empty game
  game = new GameOfLife(parseInt(width.value), parseInt(height.value));
  game && game.init();

  // clear form
  width.value = '';
  height.value = '';

  // enable play button
  play.disabled = false;
});

// show/hide instructions
document.getElementById('toggle').addEventListener('click', () => {
  document.getElementById('instructions').classList.toggle('hidden');
});

const widthInput = document.getElementById('boardWidth');

function setBoardMaxWidth() {
  const containerWidth = parseInt(
    document.querySelector('.container').clientWidth
  );
  const boardMaxWidth = (containerWidth - (containerWidth % 100)) / 10;
  if (boardMaxWidth <= 90) {
    widthInput.placeholder = `width (10 - ${boardMaxWidth})`;
    widthInput.max = boardMaxWidth;
  } else {
    widthInput.placeholder = 'width (10 - 90)';
    widthInput.max = 90;
  }
  return boardMaxWidth;
}

const media = window.matchMedia('(min-width: 768px) and (max-width: 1015px)');

// change input placeholder and min/max values
media.addListener(media => {
  if (media.matches) {
    setBoardMaxWidth();
  }
});
window.addEventListener('load', () => setBoardMaxWidth());
window.addEventListener('resize', () => {
  const boardMaxWidth = setBoardMaxWidth();
});

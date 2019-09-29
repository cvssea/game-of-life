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
let boardMaxWidth;
// ToDo - allow user to input game speed

function patterEventCb() {
  const pattern = this.dataset.pattern;
  evaluateBoard(pattern);

  if (window.innerWidth < 768) {
    game = new GameOfLife(20, 20);
    game.generateMobilePulsar(patterns.mobilePulsar, interval);
    puls.style.display = 'none';
  } else {
    game = new GameOfLife(90, 60);
    game.generatePattern(patterns[pattern]);
    interval && clearInterval(interval);
    play.disabled = false;
  }
}

puls.addEventListener('touchend', patterEventCb);

// on screens < 768
// add touch listener to board
if (window.innerWidth < 768) {
  document.getElementById('board').addEventListener('touchend', () => {
    if (game) {
      if (interval) {
        clearInterval(interval);
        interval = null;
      } else {
        interval = setInterval(() => game.printNextGeneration(), 100);
      }
    }
  });
}

// generates predefined pattern
[puls, gun, inf].forEach(btn => {
  btn.addEventListener('click', patterEventCb);
});

play.addEventListener('click', () => {
  pause.disabled = false;
  reset.disabled = false;

  interval = setInterval(() => game.printNextGeneration(), 100);

  // reset
  reset.addEventListener('click', () => {
    clearInterval(interval);
    game && game.reset();
    play.disabled = false;
  });

  // pause
  pause.addEventListener('click', () => {
    clearInterval(interval);
    play.disabled = false;
  });
  play.disabled = true;
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
const media = window.matchMedia('(min-width: 768px) and (max-width: 1015px)');

function setBoardMaxWidth() {
  const containerWidth = parseInt(
    document.querySelector('.container').clientWidth
  );
  boardMaxWidth = (containerWidth - (containerWidth % 100)) / 10;

  // updates info on client
  if (boardMaxWidth <= 90) {
    widthInput.placeholder = `width (10 - ${boardMaxWidth})`;
    widthInput.max = boardMaxWidth;
  } else {
    widthInput.placeholder = 'width (10 - 90)';
    widthInput.max = 90;
    boardMaxWidth = 90;
  }

  // while resizing / refreshing page
  // if game, set null, redraw board
  if (game && boardMaxWidth < 90) {
    game = null;
    evaluateBoard();
  }
}

// change input placeholder and min/max values
window.addEventListener('load', () => {
  setBoardMaxWidth();
  media.addListener(media => {
    media.matches && setBoardMaxWidth();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      if (game) {
        game.reset();
        interval && clearInterval(interval);
      }

      evaluateBoard();
      setBoardMaxWidth();
    }
  });
});

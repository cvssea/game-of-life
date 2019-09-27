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

// clicking on pattern buttons generates specific pattern
[puls, gun, inf].forEach(btn => {
  btn.addEventListener('click', () => {
    evaluateBoard();

    const pattern = btn.dataset.pattern;
    game = new GameOfLife(90, 60);
    game.generatePattern(patterns[pattern]);

    interval && clearInterval(interval);
    play.disabled = false;
  });
});

play.addEventListener('click', () => {
  pause.disabled = false;
  reset.disabled = false;

  interval = setInterval(() => game.printNextGeneration(), 250);

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

import GameOfLife from './app/GameOfLife';
import './scss/style.scss';

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  const width = parseInt(document.getElementById('boardWidth').value);
  const height = parseInt(document.getElementById('boardHeight').value);
  const game = new GameOfLife(width, height);
  game.createBoard();
  document.querySelector('.actions').classList.remove('hidden');

  document.getElementById('play').addEventListener('click', () => {
    const interval = setInterval(() => game.printNextGeneration(), 500);
    document.getElementById('pause').addEventListener('click', () => {
      clearInterval(interval);
    });
  });
});

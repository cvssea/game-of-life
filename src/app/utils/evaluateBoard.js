export function createEmptyBoard() {
  const section = document.createElement('section');
  section.id = 'board';
  return section;
}

// creates a new board if one is already initialized
// board must be evaluated before new GameOfLife()
export function evaluateBoard() {
  const board = document.getElementById('board');
  const parent = board.parentElement;
  if (board.children.length) {
    board.remove();
    parent.appendChild(createEmptyBoard());
  }
}

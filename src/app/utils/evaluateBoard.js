function addDataset(element, name, value) {
  element.dataset[name] = value;
}

function createEmptyBoard(pattern) {
  const section = document.createElement('section');
  section.id = 'board';
  return section;
}

// creates a new board if one is already initialized
// board must be evaluated before new GameOfLife()
export function evaluateBoard(pattern) {
  const board = document.getElementById('board');
  const parent = board.parentElement;

  if (pattern) addDataset(board, 'pattern', pattern);

  if (board.children.length) {
    board.remove();
    parent.appendChild(createEmptyBoard());
  }
}

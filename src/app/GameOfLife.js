import { toggleClass } from './utils/toggleClass';

class GameOfLife {
  constructor(boardWidth, boardHeight) {
    this.width = boardWidth;
    this.height = boardHeight;
    this.board = document.getElementById('board');
    this.cells = [];
  }

  setWidth(width) {
    this.width = width;
  }

  createBoard(x = 10, y = 10) {
    // set board dimensions
    this.board.style.width = `${this.width * x}px`;
    this.board.style.height = `${this.height * y}px`;

    // generate cells
    const numCells = this.width * this.height;
    for (let i = 0; i < numCells; i++) {
      const cell = document.createElement('div');
      this.board.appendChild(cell);
      this.cells.push(cell);
    }

    // add event listener to cells
    this.cells.forEach(cell => {
      cell.addEventListener('click', toggleClass);
    });
  }

  getCellByCoord(x, y) {
    return this.cells[x + y * this.width];
  }

  setCellState(x, y, state) {
    const cell = this.getCellByCoord(x, y);
    state === 'live'
      ? cell.classList.add('live')
      : cell.classList.remove('live');
    return cell;
  }

  generatePattern(pattern) {
    this.createBoard();
    pattern.forEach(idx => {
      const { x, y } = this.getCellCoord(idx);
      this.setCellState(x, y, 'live');
    });
  }

  generateMobilePulsar(pattern, interval) {
    this.createBoard(20, 20);
    pattern.forEach(idx => {
      const { x, y } = this.getCellCoord(idx);
      this.setCellState(x, y, 'live');
    });

    //remove event listeners
    this.cells.forEach(cell => cell.removeEventListener('click', toggleClass));
  }

  getCellNeighbours(x, y) {
    const neighbours = [
      { nx: x - 1, ny: y - 1 },
      { nx: x, ny: y - 1 },
      { nx: x + 1, ny: y - 1 },
      { nx: x - 1, ny: y },
      { nx: x + 1, ny: y },
      { nx: x - 1, ny: y + 1 },
      { nx: x, ny: y + 1 },
      { nx: x + 1, ny: y + 1 },
    ];
    return neighbours
      .map(n => this.getCellByCoord(n.nx, n.ny))
      .filter(n => n !== undefined);
  }

  computeCellNextState(x, y) {
    const cell = this.getCellByCoord(x, y);
    const isAlive = cell.classList.contains('live');
    const liveNbrs = this.getCellNeighbours(x, y).filter(n =>
      n.classList.contains('live')
    ).length;

    // cell is alive
    if (isAlive && (liveNbrs < 2 || liveNbrs > 3)) return 0;
    if (isAlive && (liveNbrs === 2 || liveNbrs === 3)) return 1;

    // cell is dead
    if (!isAlive && liveNbrs === 3) return 1;

    // cell is dead and has < 3 nbrs - stays dead
    return 0;
  }

  getCellCoord(index) {
    let x = index % this.width;
    let y = (-x + index) / this.width;
    return { x, y };
  }

  computeNextGeneration() {
    return this.cells.map((cell, idx) => {
      const { x, y } = this.getCellCoord(idx);
      return this.computeCellNextState(x, y);
    });
  }

  printNextGeneration() {
    const nextGeneration = this.computeNextGeneration().map((state, idx) => {
      const { x, y } = this.getCellCoord(idx);
      if (state) {
        return this.setCellState(x, y, 'live');
      } else {
        return this.setCellState(x, y, '');
      }
    });
    this.cells = nextGeneration;
  }

  init() {
    this.createBoard();
  }

  reset() {
    const extinctCells = this.cells.map((cell, idx) => {
      const { x, y } = this.getCellCoord(idx);
      return this.setCellState(x, y, '');
    });
    this.cells = extinctCells;
  }
}

export default GameOfLife;

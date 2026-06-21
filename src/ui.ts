import { COLUMNS, ROWS } from './types';

export function renderEmptyGrid(root: HTMLElement): void {
  const board = document.createElement('div');
  board.className = 'board';

  for (let col = 0; col < COLUMNS; col++) {
    const column = document.createElement('div');
    column.className = 'column';

    for (let row = ROWS - 1; row >= 0; row--) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      column.appendChild(cell);
    }

    board.appendChild(column);
  }

  root.appendChild(board);
}

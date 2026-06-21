import { COLUMNS, ROWS } from './types';
import type { Board } from './types';

export function renderEmptyGrid(root: HTMLElement): void {
  const board = document.createElement('div');
  board.className = 'board';

  for (let col = 0; col < COLUMNS; col++) {
    const column = document.createElement('div');
    column.className = 'column';
    column.dataset.column = String(col);

    for (let row = ROWS - 1; row >= 0; row--) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      column.appendChild(cell);
    }

    board.appendChild(column);
  }

  root.appendChild(board);
}

export function renderBoard(root: HTMLElement, board: Board): void {
  const columns = root.querySelectorAll<HTMLElement>('.column');

  columns.forEach((columnEl, col) => {
    const cells = columnEl.querySelectorAll<HTMLElement>('.cell');

    cells.forEach((cellEl, displayIndex) => {
      const row = ROWS - 1 - displayIndex;
      const cellState = board[col]?.[row];
      cellEl.classList.remove('red', 'yellow');

      if (cellState === 'red' || cellState === 'yellow') {
        cellEl.classList.add(cellState);
      }
    });
  });
}

export function onColumnClick(root: HTMLElement, handler: (column: number) => void): void {
  root.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const columnEl = target.closest<HTMLElement>('.column');

    if (!columnEl || !columnEl.dataset.column) {
      return;
    }

    handler(Number(columnEl.dataset.column));
  });
}

import { COLUMNS, ROWS } from './types';
import type { Board } from './types';
import type { Score } from './score';

export interface ColorPair {
  player1: { name: string; color: string };
  player2: { name: string; color: string };
}

export const COLOR_PAIRS: readonly ColorPair[] = [
  { player1: { name: 'Red', color: '#e53935' }, player2: { name: 'Yellow', color: '#fdd835' } },
  { player1: { name: 'Blue', color: '#1e88e5' }, player2: { name: 'Orange', color: '#fb8c00' } },
  { player1: { name: 'Green', color: '#43a047' }, player2: { name: 'Purple', color: '#8e24aa' } },
];

export function renderColorSelector(
  root: HTMLElement,
  pairs: readonly ColorPair[],
  selectedIndex: number,
  onChange: (index: number) => void,
): void {
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'color-selector';

  const legend = document.createElement('legend');
  legend.textContent = 'Colors';
  fieldset.appendChild(legend);

  pairs.forEach((pair, index) => {
    const label = document.createElement('label');
    label.className = 'color-option';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'color-pair';
    input.value = String(index);
    input.checked = index === selectedIndex;
    input.addEventListener('change', () => {
      if (input.checked) {
        onChange(index);
      }
    });

    const swatches = document.createElement('span');
    swatches.className = 'color-swatches';

    [pair.player1.color, pair.player2.color].forEach((color) => {
      const swatch = document.createElement('span');
      swatch.className = 'color-swatch';
      swatch.style.backgroundColor = color;
      swatches.appendChild(swatch);
    });

    label.appendChild(input);
    label.appendChild(swatches);
    label.append(`${pair.player1.name} / ${pair.player2.name}`);
    fieldset.appendChild(label);
  });

  root.appendChild(fieldset);
}

export function setColorSelectorLocked(root: HTMLElement, locked: boolean): void {
  const fieldset = root.querySelector<HTMLFieldSetElement>('.color-selector');

  if (fieldset) {
    fieldset.disabled = locked;
  }
}

export function applyColorPair(root: HTMLElement, pair: ColorPair): void {
  root.style.setProperty('--player1-color', pair.player1.color);
  root.style.setProperty('--player2-color', pair.player2.color);
}

export function renderScore(root: HTMLElement, score: Score, pair: ColorPair): void {
  let scoreboard = root.querySelector<HTMLElement>('.scoreboard');

  if (!scoreboard) {
    scoreboard = document.createElement('div');
    scoreboard.className = 'scoreboard';
    root.appendChild(scoreboard);
  }

  scoreboard.innerHTML = '';

  (
    [
      [pair.player1.color, score.red],
      [pair.player2.color, score.yellow],
    ] as const
  ).forEach(([color, count]) => {
    const entry = document.createElement('span');
    entry.className = 'score-entry';

    const swatch = document.createElement('span');
    swatch.className = 'color-swatch';
    swatch.style.backgroundColor = color;

    const value = document.createElement('span');
    value.className = 'score-value';
    value.textContent = String(count);

    entry.appendChild(swatch);
    entry.appendChild(value);
    scoreboard.appendChild(entry);
  });
}

export function renderTitle(root: HTMLElement): void {
  const title = document.createElement('h1');
  title.className = 'title';
  title.textContent = 'Connect Four';

  root.appendChild(title);
}

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

export function renderEndScreen(root: HTMLElement, message: string): void {
  const endScreen = document.createElement('div');
  endScreen.className = 'end-screen';
  endScreen.textContent = message;

  root.appendChild(endScreen);
}

export function clearEndScreen(root: HTMLElement): void {
  root.querySelectorAll('.end-screen').forEach((endScreen) => endScreen.remove());
}

export function renderControls(
  root: HTMLElement,
  onNewGame: () => void,
  onRematch: () => void,
): void {
  const controls = document.createElement('div');
  controls.className = 'controls';

  const resetButton = document.createElement('button');
  resetButton.className = 'reset-button';
  resetButton.textContent = 'New game';
  resetButton.addEventListener('click', onNewGame);
  controls.appendChild(resetButton);

  const rematchButton = document.createElement('button');
  rematchButton.className = 'rematch-button hidden';
  rematchButton.textContent = 'Rematch';
  rematchButton.addEventListener('click', onRematch);
  controls.appendChild(rematchButton);

  root.appendChild(controls);
}

export function setRematchVisible(root: HTMLElement, visible: boolean): void {
  const rematchButton = root.querySelector<HTMLButtonElement>('.rematch-button');

  if (rematchButton) {
    rematchButton.classList.toggle('hidden', !visible);
  }
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

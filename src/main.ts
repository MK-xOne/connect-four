import './style.css';
import { dropToken } from './board';
import { COLUMNS, ROWS } from './types';
import type { Board, GameState, Player } from './types';
import { onColumnClick, renderBoard, renderEmptyGrid } from './ui';

const root = document.querySelector<HTMLDivElement>('#app');

if (!root) {
  throw new Error('#app element not found');
}

function emptyBoard(): Board {
  return Array.from({ length: COLUMNS }, () => Array<'empty'>(ROWS).fill('empty'));
}

function otherPlayer(player: Player): Player {
  return player === 'red' ? 'yellow' : 'red';
}

const state: GameState = {
  board: emptyBoard(),
  currentPlayer: 'red',
  winner: null,
};

renderEmptyGrid(root);
renderBoard(root, state.board);

onColumnClick(root, (column) => {
  try {
    state.board = dropToken(state.board, column, state.currentPlayer);
  } catch {
    return;
  }

  state.currentPlayer = otherPlayer(state.currentPlayer);
  renderBoard(root, state.board);
});

import './style.css';
import { dropToken, isFull } from './board';
import { COLUMNS, ROWS } from './types';
import type { Board, GameState, Player } from './types';
import {
  clearEndScreen,
  onColumnClick,
  renderBoard,
  renderEmptyGrid,
  renderEndScreen,
  renderResetButton,
} from './ui';
import { checkWin } from './win';

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

function createInitialState(): GameState {
  return {
    board: emptyBoard(),
    currentPlayer: 'red',
    winner: null,
  };
}

let state: GameState = createInitialState();

renderResetButton(root, () => {
  state = createInitialState();
  clearEndScreen(root);
  renderBoard(root, state.board);
});

renderEmptyGrid(root);
renderBoard(root, state.board);

onColumnClick(root, (column) => {
  if (state.winner) {
    return;
  }

  try {
    state.board = dropToken(state.board, column, state.currentPlayer);
  } catch {
    return;
  }

  renderBoard(root, state.board);

  const winner = checkWin(state.board);

  if (winner) {
    state.winner = winner;
    renderEndScreen(root, `${winner === 'red' ? 'Red' : 'Yellow'} wins`);
    return;
  }

  if (isFull(state.board)) {
    state.winner = 'draw';
    renderEndScreen(root, 'Draw');
    return;
  }

  state.currentPlayer = otherPlayer(state.currentPlayer);
});

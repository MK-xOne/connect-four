import './style.css';
import { dropToken, isFull } from './board';
import { createScore, recordWin } from './score';
import type { Score } from './score';
import { COLUMNS, ROWS } from './types';
import type { Board, GameState, Player } from './types';
import {
  applyColorPair,
  clearEndScreen,
  COLOR_PAIRS,
  onColumnClick,
  renderBoard,
  renderColorSelector,
  renderControls,
  renderEmptyGrid,
  renderEndScreen,
  renderScore,
  renderTitle,
  setColorSelectorLocked,
  setRematchVisible,
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
let selectedColorIndex = 0;
let colorsLocked = false;
let score: Score = createScore();

function currentColorPair() {
  return COLOR_PAIRS[selectedColorIndex];
}

function playerName(player: Player): string {
  const pair = currentColorPair();
  return player === 'red' ? pair.player1.name : pair.player2.name;
}

renderTitle(root);

renderColorSelector(root, COLOR_PAIRS, selectedColorIndex, (index) => {
  selectedColorIndex = index;
  applyColorPair(root, currentColorPair());
  renderScore(root, score, currentColorPair());
});

const rematch = (): void => {
  state = createInitialState();
  setRematchVisible(root, false);
  clearEndScreen(root);
  renderBoard(root, state.board);
};

renderControls(
  root,
  () => {
    state = createInitialState();
    colorsLocked = false;
    score = createScore();
    setColorSelectorLocked(root, false);
    setRematchVisible(root, false);
    clearEndScreen(root);
    renderBoard(root, state.board);
    renderScore(root, score, currentColorPair());
  },
  rematch,
);

applyColorPair(root, currentColorPair());
renderEmptyGrid(root);
renderBoard(root, state.board);
renderScore(root, score, currentColorPair());

onColumnClick(root, (column) => {
  if (state.winner) {
    return;
  }

  try {
    state.board = dropToken(state.board, column, state.currentPlayer);
  } catch {
    return;
  }

  if (!colorsLocked) {
    colorsLocked = true;
    setColorSelectorLocked(root, true);
  }

  renderBoard(root, state.board);

  const winner = checkWin(state.board);

  if (winner) {
    state.winner = winner;
    score = recordWin(score, winner);
    renderScore(root, score, currentColorPair());
    renderEndScreen(root, `${playerName(winner)} wins`);
    setRematchVisible(root, true);
    return;
  }

  if (isFull(state.board)) {
    state.winner = 'draw';
    renderEndScreen(root, 'Draw');
    setRematchVisible(root, true);
    return;
  }

  state.currentPlayer = otherPlayer(state.currentPlayer);
});

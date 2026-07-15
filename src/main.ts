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
  dropHeldPiece,
  onColumnClick,
  renderBoard,
  renderColorSelector,
  renderControls,
  renderEmptyGrid,
  renderEndScreen,
  renderFooter,
  renderHeldPiece,
  renderScore,
  renderTitle,
  setColorSelectorLocked,
  setHeldPieceActive,
  setHeldPieceColor,
  setRematchVisible,
  setupHeldPieceTracking,
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
let inputLocked = false;

function currentColorPair() {
  return COLOR_PAIRS[selectedColorIndex];
}

function playerName(player: Player): string {
  const pair = currentColorPair();
  return player === 'red' ? pair.player1.name : pair.player2.name;
}

function heldPieceColorFor(player: Player): string {
  const pair = currentColorPair();
  return player === 'red' ? pair.player1.color : pair.player2.color;
}

const syncHeldPiece = (): void => {
  if (state.winner) {
    setHeldPieceActive(root, false);
    return;
  }

  setHeldPieceActive(root, true);
  setHeldPieceColor(root, heldPieceColorFor(state.currentPlayer));
};

renderTitle(root);

renderColorSelector(root, COLOR_PAIRS, selectedColorIndex, (index) => {
  selectedColorIndex = index;
  applyColorPair(root, currentColorPair());
  renderScore(root, score, currentColorPair());
  syncHeldPiece();
});

const rematch = (): void => {
  state = createInitialState();
  inputLocked = false;
  setRematchVisible(root, false);
  clearEndScreen(root);
  renderBoard(root, state.board);
  syncHeldPiece();
};

renderControls(
  root,
  () => {
    state = createInitialState();
    inputLocked = false;
    colorsLocked = false;
    score = createScore();
    setColorSelectorLocked(root, false);
    setRematchVisible(root, false);
    clearEndScreen(root);
    renderBoard(root, state.board);
    renderScore(root, score, currentColorPair());
    syncHeldPiece();
  },
  rematch,
);

applyColorPair(root, currentColorPair());
renderHeldPiece(root);
renderEmptyGrid(root);
renderBoard(root, state.board);
renderScore(root, score, currentColorPair());
setupHeldPieceTracking(root);
syncHeldPiece();
renderFooter(root);

onColumnClick(root, (column) => {
  if (state.winner || inputLocked) {
    return;
  }

  const previousColumn = state.board[column];
  let newBoard: Board;

  try {
    newBoard = dropToken(state.board, column, state.currentPlayer);
  } catch {
    return;
  }

  const droppingPlayer = state.currentPlayer;
  const newColumn = newBoard[column];
  const row = newColumn!.findIndex((cell, index) => cell !== previousColumn?.[index]);

  const finishDrop = (): void => {
    state.board = newBoard;
    renderBoard(root, state.board);

    if (!colorsLocked) {
      colorsLocked = true;
      setColorSelectorLocked(root, true);
    }

    const winner = checkWin(state.board);

    if (winner) {
      state.winner = winner;
      score = recordWin(score, winner);
      renderScore(root, score, currentColorPair());
      renderEndScreen(root, `${playerName(winner)} wins`);
      setRematchVisible(root, true);
      syncHeldPiece();
      inputLocked = false;
      return;
    }

    if (isFull(state.board)) {
      state.winner = 'draw';
      renderEndScreen(root, 'Draw');
      setRematchVisible(root, true);
      syncHeldPiece();
      inputLocked = false;
      return;
    }

    state.currentPlayer = otherPlayer(droppingPlayer);
    syncHeldPiece();
    inputLocked = false;
  };

  inputLocked = true;
  dropHeldPiece(root, column, row, finishDrop);
});

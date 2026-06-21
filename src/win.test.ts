import { describe, expect, it } from 'vitest';
import { checkWin } from './win';
import { COLUMNS, ROWS } from './types';
import type { Board } from './types';

function emptyBoard(): Board {
  return Array.from({ length: COLUMNS }, () => Array<'empty'>(ROWS).fill('empty'));
}

describe('checkWin', () => {
  it('returns null for an empty board', () => {
    expect(checkWin(emptyBoard())).toBeNull();
  });

  it('detects a horizontal four-in-a-row', () => {
    const board = emptyBoard();
    board[0][0] = 'red';
    board[1][0] = 'red';
    board[2][0] = 'red';
    board[3][0] = 'red';

    expect(checkWin(board)).toBe('red');
  });

  it('detects a vertical four-in-a-row', () => {
    const board = emptyBoard();
    board[0][0] = 'yellow';
    board[0][1] = 'yellow';
    board[0][2] = 'yellow';
    board[0][3] = 'yellow';

    expect(checkWin(board)).toBe('yellow');
  });

  it('detects a diagonal four-in-a-row going up-to-the-right', () => {
    const board = emptyBoard();
    board[0][0] = 'red';
    board[1][1] = 'red';
    board[2][2] = 'red';
    board[3][3] = 'red';

    expect(checkWin(board)).toBe('red');
  });

  it('detects a diagonal four-in-a-row going up-to-the-left', () => {
    const board = emptyBoard();
    board[3][0] = 'yellow';
    board[2][1] = 'yellow';
    board[1][2] = 'yellow';
    board[0][3] = 'yellow';

    expect(checkWin(board)).toBe('yellow');
  });

  it('does not call three in a horizontal row a win', () => {
    const board = emptyBoard();
    board[0][0] = 'red';
    board[1][0] = 'red';
    board[2][0] = 'red';

    expect(checkWin(board)).toBeNull();
  });

  it('does not call three in a vertical column a win', () => {
    const board = emptyBoard();
    board[0][0] = 'red';
    board[0][1] = 'red';
    board[0][2] = 'red';

    expect(checkWin(board)).toBeNull();
  });

  it('does not call three on the up-to-the-right diagonal a win', () => {
    const board = emptyBoard();
    board[0][0] = 'red';
    board[1][1] = 'red';
    board[2][2] = 'red';

    expect(checkWin(board)).toBeNull();
  });

  it('does not call three on the up-to-the-left diagonal a win', () => {
    const board = emptyBoard();
    board[3][0] = 'red';
    board[2][1] = 'red';
    board[1][2] = 'red';

    expect(checkWin(board)).toBeNull();
  });

  it('does not count tokens that wrap across the board edge as a line', () => {
    const board = emptyBoard();
    board[5][0] = 'red';
    board[6][0] = 'red';
    board[0][1] = 'red';
    board[1][1] = 'red';

    expect(checkWin(board)).toBeNull();
  });

  it('does not call four mixed-color tokens in a line a win', () => {
    const board = emptyBoard();
    board[0][0] = 'red';
    board[1][0] = 'red';
    board[2][0] = 'yellow';
    board[3][0] = 'red';

    expect(checkWin(board)).toBeNull();
  });

  it('returns null for a full board with no line of four', () => {
    const board: Board = [
      ['yellow', 'yellow', 'yellow', 'red', 'yellow', 'red'],
      ['yellow', 'red', 'yellow', 'yellow', 'red', 'yellow'],
      ['red', 'red', 'red', 'yellow', 'red', 'red'],
      ['red', 'yellow', 'yellow', 'red', 'red', 'red'],
      ['yellow', 'red', 'red', 'red', 'yellow', 'red'],
      ['red', 'yellow', 'yellow', 'yellow', 'red', 'yellow'],
      ['yellow', 'yellow', 'red', 'yellow', 'yellow', 'red'],
    ];

    expect(checkWin(board)).toBeNull();
  });
});

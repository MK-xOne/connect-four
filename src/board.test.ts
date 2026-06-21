import { describe, expect, it } from 'vitest';
import { dropToken, isFull } from './board';
import { COLUMNS, ROWS } from './types';
import type { Board } from './types';

function emptyBoard(): Board {
  return Array.from({ length: COLUMNS }, () => Array<'empty'>(ROWS).fill('empty'));
}

describe('dropToken', () => {
  it('lands a token on the lowest empty cell of a column', () => {
    const board = emptyBoard();

    const result = dropToken(board, 0, 'red');

    expect(result[0][0]).toBe('red');
    expect(result[0].slice(1)).toEqual(Array(ROWS - 1).fill('empty'));
  });

  it('does not mutate the original board', () => {
    const board = emptyBoard();

    dropToken(board, 0, 'red');

    expect(board[0][0]).toBe('empty');
  });

  it('stacks tokens within a column on top of previous ones', () => {
    let board = emptyBoard();

    board = dropToken(board, 2, 'red');
    board = dropToken(board, 2, 'yellow');
    board = dropToken(board, 2, 'red');

    expect(board[2][0]).toBe('red');
    expect(board[2][1]).toBe('yellow');
    expect(board[2][2]).toBe('red');
    expect(board[2][3]).toBe('empty');
  });

  it('rejects a drop into a full column', () => {
    let board = emptyBoard();

    for (let i = 0; i < ROWS; i++) {
      board = dropToken(board, 3, i % 2 === 0 ? 'red' : 'yellow');
    }

    expect(() => dropToken(board, 3, 'red')).toThrow(/full/);
  });
});

describe('isFull', () => {
  it('returns false for an empty board', () => {
    expect(isFull(emptyBoard())).toBe(false);
  });

  it('returns false when at least one cell is empty', () => {
    let board = emptyBoard();
    board = dropToken(board, 0, 'red');

    expect(isFull(board)).toBe(false);
  });

  it('returns true when every cell is filled', () => {
    let board = emptyBoard();

    for (let col = 0; col < COLUMNS; col++) {
      for (let row = 0; row < ROWS; row++) {
        board = dropToken(board, col, 'red');
      }
    }

    expect(isFull(board)).toBe(true);
  });
});

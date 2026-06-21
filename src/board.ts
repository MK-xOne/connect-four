import type { Board, Player } from './types';

export function dropToken(board: Board, column: number, player: Player): Board {
  const targetColumn = board[column];

  if (targetColumn === undefined) {
    throw new Error(`column ${column} is out of bounds`);
  }

  const row = targetColumn.indexOf('empty');

  if (row === -1) {
    throw new Error(`column ${column} is full`);
  }

  return board.map((col, colIndex) => {
    if (colIndex !== column) {
      return col;
    }

    return col.map((cell, rowIndex) => (rowIndex === row ? player : cell));
  });
}

export function isFull(board: Board): boolean {
  return board.every((column) => column.every((cell) => cell !== 'empty'));
}

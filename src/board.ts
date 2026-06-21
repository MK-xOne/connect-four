import type { Board, Player } from './types';

export function createEmptyBoard(): Board {
  throw new Error('not implemented');
}

export function getDropRow(_board: Board, _column: number): number | null {
  throw new Error('not implemented');
}

export function dropPiece(_board: Board, _column: number, _player: Player): Board {
  throw new Error('not implemented');
}

export function isBoardFull(_board: Board): boolean {
  throw new Error('not implemented');
}

export const COLUMNS = 7;
export const ROWS = 6;

export type Cell = 'empty' | 'red' | 'yellow';

export type Player = 'red' | 'yellow';

// board[col][row], row 0 = bottom of the column
export type Board = Cell[][];

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | 'draw' | null;
}

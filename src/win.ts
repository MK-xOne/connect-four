import type { Board, Player } from './types';
import { COLUMNS, ROWS } from './types';

const DIRECTIONS: ReadonlyArray<readonly [number, number]> = [
  [1, 0],
  [0, 1],
  [1, 1],
  [1, -1],
];

export function checkWin(board: Board): Player | null {
  for (let col = 0; col < COLUMNS; col++) {
    for (let row = 0; row < ROWS; row++) {
      const cell = board[col][row];

      if (cell === 'empty') {
        continue;
      }

      for (const [deltaCol, deltaRow] of DIRECTIONS) {
        let connected = true;

        for (let step = 1; step < 4; step++) {
          const nextCol = col + deltaCol * step;
          const nextRow = row + deltaRow * step;

          if (
            nextCol < 0 ||
            nextCol >= COLUMNS ||
            nextRow < 0 ||
            nextRow >= ROWS ||
            board[nextCol][nextRow] !== cell
          ) {
            connected = false;
            break;
          }
        }

        if (connected) {
          return cell;
        }
      }
    }
  }

  return null;
}

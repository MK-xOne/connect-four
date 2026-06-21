import type { Player } from './types';

export interface Score {
  red: number;
  yellow: number;
}

export function createScore(): Score {
  return { red: 0, yellow: 0 };
}

export function recordWin(score: Score, player: Player): Score {
  return { ...score, [player]: score[player] + 1 };
}

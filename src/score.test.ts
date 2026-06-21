import { describe, expect, it } from 'vitest';
import { createScore, recordWin } from './score';

describe('createScore', () => {
  it('starts at 0-0', () => {
    expect(createScore()).toEqual({ red: 0, yellow: 0 });
  });
});

describe('recordWin', () => {
  it('increments only the winning player (red)', () => {
    const score = recordWin(createScore(), 'red');

    expect(score).toEqual({ red: 1, yellow: 0 });
  });

  it('increments only the winning player (yellow)', () => {
    const score = recordWin(createScore(), 'yellow');

    expect(score).toEqual({ red: 0, yellow: 1 });
  });

  it('accumulates multiple wins for each player', () => {
    let score = createScore();
    score = recordWin(score, 'red');
    score = recordWin(score, 'red');
    score = recordWin(score, 'yellow');
    score = recordWin(score, 'red');

    expect(score).toEqual({ red: 3, yellow: 1 });
  });

  it('does not mutate the input score', () => {
    const score = createScore();

    recordWin(score, 'red');

    expect(score).toEqual({ red: 0, yellow: 0 });
  });
});

describe('reset', () => {
  it('returns a fresh 0-0 score, independent of prior wins', () => {
    let score = createScore();
    score = recordWin(score, 'red');
    score = recordWin(score, 'yellow');

    const reset = createScore();

    expect(reset).toEqual({ red: 0, yellow: 0 });
    expect(score).toEqual({ red: 1, yellow: 1 });
  });
});

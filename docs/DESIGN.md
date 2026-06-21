# Connect Four — DESIGN
A title reading "Connect Four" sits above the board.

## Concept
Two players take turns dropping tokens into a 7-wide, 6-tall grid. Tokens fall to
the lowest empty cell in their column. First to line up four of their color in a
row — horizontal, vertical, or diagonal — wins.

## Core loop
Click a column → token drops to the lowest empty cell → check for win or draw →
switch player.

## Rules
- Board: 7 columns × 6 rows.
- Two players, hotseat (same keyboard/mouse): red and yellow.
- A move drops a token into a chosen column; it lands on the lowest empty cell.
- A full column cannot be played.
- Win: four of the same color in a line — horizontal, vertical, or either diagonal.
- Draw: board full with no winner.
- The two token colors are chosen from a small set of preset pairs before play begins; the selection is disabled during an active game and re-enabled on New game / reset.

## Definition of done
Four in a row shows a win screen naming the winner; a full board with no winner
shows a draw screen; a reset button starts a new game from any state. When all
three behave correctly, v1 is finished and shipped. Ugly is allowed. Shipped is
the goal.

## Module structure
- `src/types.ts` — Cell, Player, Board, GameState shapes. No logic.
- `src/board.ts` — pure: `dropToken(board, col, player)`, `isFull(board)`.
- `src/win.ts` — pure: `checkWin(board)`, scanning all four directions. Vitest target.
- `src/ui.ts` — render the grid, wire column clicks, render end screens.
- `src/main.ts` — Vite entry: holds state, switches turns, ties UI to logic.

## Tech
TypeScript · Vite (dev/build) · Vitest (tests) · ESLint + Prettier · git → GitHub.
The pure logic in `board.ts` and `win.ts` is unit-tested. UI is not.

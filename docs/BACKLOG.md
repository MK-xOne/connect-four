# Connect Four — BACKLOG

One item ≈ one session ≈ one commit. Work top to bottom. Status: TODO / DOING / DONE.
You own this list. Claude Code only checks off the item it just finished — it never
reorders, adds, or starts an item that isn't marked DOING.

1. [DONE] Scaffold + empty grid — Vite + TS project runs; `ui.ts` renders a static empty 7×6 grid.
2. [DONE] dropToken + tests — `board.ts` `dropToken` and `isFull`, with Vitest covering gravity and full-column cases.
3. [DONE] Click to place + turn switch — clicking a column drops the current player's token; turn alternates.
4. [DONE] checkWin + tests — `win.ts` `checkWin` covering horizontal, vertical, both diagonals, and no-win.
5. [DONE] Win / draw screens — four-in-a-row names the winner; a full board shows a draw.
6. [DONE] Reset button — starts a fresh game from any state. This item finishes v1.
7. [DONE] Game title — a "Connect Four" heading above the board.
8. [TODO] Color selection — before a game starts, the player picks from a few preset color pairs. The choice is locked once the first token is placed and stays locked until reset/New game.

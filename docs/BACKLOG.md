# Connect Four — BACKLOG

One item ≈ one session ≈ one commit. Work top to bottom. Status: TODO / DOING / DONE.
You own this list. Claude Code only checks off the item it just finished — it never
reorders, adds, or starts an item that isn't marked DOING.

1. [DONE] Scaffold + empty grid — Vite + TS project runs; `ui.ts` renders a static empty 7×6 grid.
2. [DONE] dropToken + tests — `board.ts` `dropToken` and `isFull`, with Vitest covering gravity and full-column cases.
3. [DONE] Click to place + turn switch — clicking a column drops the current player's token; turn alternates.
4. [DOING] checkWin + tests — `win.ts` `checkWin` covering horizontal, vertical, both diagonals, and no-win.
5. [TODO] Win / draw screens — four-in-a-row names the winner; a full board shows a draw.
6. [TODO] Reset button — starts a fresh game from any state. This item finishes v1.

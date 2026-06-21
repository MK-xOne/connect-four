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
8. [DONE] Color selection — before a game starts, the player picks from a few preset color pairs. The choice is locked once the first token is placed and stays locked until reset/New game.
9. [DONE] Visual style tokens — define a modern, clean palette, type scale, spacing, and surface treatment; document them as named tokens in docs/STYLE.md and as CSS variables. No UI changes this item.
10. [DONE] Apply visual style — restyle the title, New game button, color selector, and board frame to the documented tokens. UI chrome only; the game token color pairs are unchanged.
11. [DONE] Selector swatches — each preset color option shows two discs in that pair's colors. Presentation only; selector behavior/lock unchanged.
12. [DONE] Rematch — on game end, a Rematch control starts a fresh board with the same colors, without reopening color selection. New game still does the full reset.
13. [DONE] Score tally — an in-memory win counter per player, shown near the board. A win increments it; Rematch carries it over; New game zeroes it. The counter logic is pure and gets Vitest tests. No persistence — the tally clears on page reload.
14. [DONE] Center the board — the board is horizontally centered in the layout. Pure layout, no behavior change.
15. [DOING] Above-board held piece — a piece in the CURRENT player's color sits above the board. It idles with a gentle left–right glide and moves to track the column under the pointer. Presentation only: reads current player and selected colors; no game-logic change. (prefers-reduced-motion: no idle glide.)
16. [TODO] Drop animation — clicking a column drops the held piece, which animates falling from its above-board position down to its landing cell. Input is locked during the fall; the win/draw check runs ONLY after the piece lands. Reuses the item-15 held piece (same object). (prefers-reduced-motion: instant placement.)
17. [TODO] Win display over board — the win/draw result text shows as a centered card OVER the board, with the board still visible behind it. Rematch/New game buttons stay where they are.

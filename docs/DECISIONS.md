# Connect Four — DECISIONS

## Decided
- Hotseat two-player only. Logic stays pure; no UI framework — vanilla TS + Vite.
- Standard 7×6 board, four-in-a-row win.
- Tests cover `board.ts` and `win.ts` only. UI is verified by playing it.
- Color pairs are a fixed preset list (not a free color picker), chosen pre-game, locked during play.
- The UI uses a documented modern token set (see docs/STYLE.md); game token color pairs remain a separate, locked gameplay decision.
- An in-memory score tally is kept; it does NOT persist across reloads.
- Pieces animate: the held piece idles with a gentle left-right glide and tracks the pointer above the board (item 15), then falls into place when a column is clicked (item 16). The piece above the board and the falling piece are the same object — no separate animation rig. `prefers-reduced-motion` disables both the idle glide and the fall, in which case placement is instant.

## Rejected (do not reintroduce)
- AI / computer opponent — the biggest scope trap for this game. Out of v1.
- Online / multiplayer / networking.
- Save / load / persistence — unchanged by the score tally, which is in-memory only and does not reopen this.
- Free/custom color picking; changing colors mid-game.

If any of these comes back up mid-build, it gets logged here with a reason. It does
not go into the code or the backlog.

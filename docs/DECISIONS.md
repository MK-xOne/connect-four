# Connect Four — DECISIONS

## Decided
- Hotseat two-player only. Logic stays pure; no UI framework — vanilla TS + Vite.
- Standard 7×6 board, four-in-a-row win.
- Tests cover `board.ts` and `win.ts` only. UI is verified by playing it.
- Color pairs are a fixed preset list (not a free color picker), chosen pre-game, locked during play.

## Rejected (do not reintroduce)
- AI / computer opponent — the biggest scope trap for this game. Out of v1.
- Drop animation — visual polish, not needed to finish.
- Score across multiple games / match play.
- Themes or styling beyond "legible."
- Online / multiplayer / networking.
- Save / load / persistence.
- Free/custom color picking; changing colors mid-game.

If any of these comes back up mid-build, it gets logged here with a reason. It does
not go into the code or the backlog.

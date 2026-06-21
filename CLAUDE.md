# Working agreement — Connect Four

This is a small, finishable game. The goal is to ship v1, not to make it elegant or
extensible. Ugly-and-shipped beats clever-and-stalled.

## Read first, every session
- `docs/DESIGN.md` — what the game is. Source of truth.
- `docs/BACKLOG.md` — the ordered task list.
- `docs/DECISIONS.md` — including the Rejected list.

## Hard rule on the spec docs
These four files are MY source of truth, not yours to invent. If any of them is
missing, empty, or unreadable, STOP and tell me. Do not draft, guess, or
reconstruct them yourself under any circumstances.

## Rules for every session
- Work on exactly ONE backlog item — the one marked DOING. Do not start others.
- Never reintroduce anything in the Rejected section of `docs/DECISIONS.md`.
- Keep `board.ts` and `win.ts` pure: no DOM, no UI, no side effects.
- Before declaring an item done, all of these must pass:
  `npm run typecheck`, `npm test`, `npm run lint`.
- When done: I commit (you may stage). I mark the item DONE; you check off only the
  item you just finished. You do not reorder or add backlog items.
- If a task turns out bigger than one session, STOP and tell me to split it in the
  backlog rather than expanding the session.

# Connect Four — STYLE

Named design tokens for the UI chrome (title, buttons, selector, board frame).
Game token color pairs are a separate, locked gameplay decision (see DECISIONS.md)
and are not covered here. Filled in during backlog item 9.

Tokens are defined as CSS custom properties in a single `:root` block at the top
of `src/style.css`. They are reusable across future projects, not specific to
this game's components.

## Palette

| Token | Value | Use for |
|---|---|---|
| `--color-bg` | `#14182c` | Page background (the `body`). |
| `--color-surface` | `#1f2542` | Default surface for chrome containers — board frame, selector panel. |
| `--color-surface-raised` | `#2a3158` | A surface that should read as "above" `--color-surface` — e.g. a hovered/raised card or panel. |
| `--color-text` | `#f4f5fb` | Primary text on dark surfaces (titles, body copy, end-screen text). |
| `--color-text-muted` | `#a6acc8` | Secondary/de-emphasized text — labels, hints, disabled-state copy. |
| `--color-border` | `#3a4274` | Hairline borders on surfaces (selector outline, dividers). |
| `--color-accent` | `#5b6ee8` | Interactive accent — primary buttons, focus rings, active states. |
| `--color-accent-text` | `#ffffff` | Text/icon color placed on top of `--color-accent`. |

## Typography

| Token | Value | Use for |
|---|---|---|
| `--font-family` | `system-ui, -apple-system, "Segoe UI", sans-serif` | All UI text. System font stack — no web font loading. |
| `--font-size-sm` | `0.875rem` | Small/secondary text — labels, captions. |
| `--font-size-base` | `1rem` | Body text, buttons, selector options. |
| `--font-size-lg` | `1.25rem` | Emphasized text — end-screen messages. |
| `--font-size-xl` | `2rem` | The page title. |

## Spacing

A single scale used for padding, margin, and gap, so rhythm stays consistent.

| Token | Value | Use for |
|---|---|---|
| `--space-xs` | `0.25rem` | Tight gaps — e.g. between a swatch and its label. |
| `--space-sm` | `0.5rem` | Default small gap — board cell/column gaps, compact padding. |
| `--space-md` | `1rem` | Default spacing between stacked elements (title to board, button padding). |
| `--space-lg` | `1.5rem` | Separation between major sections. |
| `--space-xl` | `2rem` | Outer page padding. |

## Surfaces/Elevation

| Token | Value | Use for |
|---|---|---|
| `--radius` | `0.5rem` | Standard corner radius for chrome containers and buttons (not game cells, which stay circular). |
| `--shadow-sm` | `0 1px 2px rgba(0, 0, 0, 0.3)` | Subtle lift for flat chrome elements — buttons, selector. |
| `--shadow-md` | `0 4px 12px rgba(0, 0, 0, 0.35)` | Stronger lift for the most prominent surface — the board frame. |

## Usage

- Backgrounds: `--color-bg` for the page, `--color-surface` for chrome containers (board frame, selector), `--color-surface-raised` for anything that should sit visually above a surface.
- Text: `--color-text` by default, `--color-text-muted` for secondary copy.
- Borders: `--color-border` for hairlines on surfaces.
- Interactive elements (buttons, active selector states): `--color-accent` background with `--color-accent-text` foreground.
- Spacing and sizing should pull from the scales above rather than introducing new ad hoc values.
- Surface containers get `--radius` and a shadow (`--shadow-sm` for minor chrome, `--shadow-md` for the board frame) to read as "raised" above the background.
- These tokens style UI chrome only. The game token colors (red/yellow, blue/orange, green/purple) are a locked, separate gameplay decision — never reassign or rename them to match this palette.

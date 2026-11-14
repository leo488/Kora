# Koraa’ website design system

The rules every page follows. If something on the site breaks one of these, it is a bug. The code that enforces them is `src/system.css` (loaded last) and the theme tokens at the top of `src/App.css`.

## 1. Colour

| Token | Dark (default) | Light | Used for |
|---|---|---|---|
| `--bg` | `#0b0b0b` | `#f4f3ef` | Page ground |
| `--surface` | `#171717` | `#e6e5e0` | Image slots, raised panels |
| `--text-h` | `#ffffff` | `#1e1e1e` | Headings, lead text, buttons |
| `--text` | white at 62% | ink at 72% | Secondary text, labels |
| `--border` / `--border-strong` | white 12% / 40% | ink 14% / 40% | Rules, outlines |
| `--accent-ink` | Plantain `#d7f24b` | Koraa Blue `#1a2db7` | Focus ring, progress, the one thing to notice |

- Brand colours: Koraa Blue `#1a2db7`, Lagoon `#052275`, Ink `#0a0a0a`, Paper `#ffffff`, Plantain `#d7f24b`. Jollof `#ff5a36` is for errors only.
- Never Blue on Ink. Never Plantain on Paper. No opacity on brand colours, the logo or text.
- Gradients (Blue Hour, Plantain Glow, Zobo Heat, Studio Day) are full-bleed grounds. Only the logo, the star or one large number sits on them. No body text.

## 2. Type

One family: Host Grotesk.

| Role | Size | Weight | Tracking |
|---|---|---|---|
| Statement (page opener) | `clamp(30px, 3.6vw, 60px)` | 600 | -0.035em |
| Section heading | `clamp(34px, 3.6vw, 56px)` | 600 | -0.025em |
| Lead paragraph | `clamp(18px, 1.5vw, 22px)` | 500 | -0.025em |
| Body | 18px (16px on phone) | 500 | -0.015em |
| Label | 12 to 13px, uppercase | 600 | +0.08em |

- Body copy uses the headings' tight tracking. No loose letter spacing anywhere except uppercase labels.
- Headings are never italic. No text under 12px.
- The home page opens with one bold statement and no title above it.

## 3. Buttons

One shape: the pill (`border-radius: 999px`). There are no square buttons.

| Kind | Class | Use |
|---|---|---|
| Solid | `kora-pill is-solid` | The main action. Turns Plantain on hover. |
| Outline | `kora-pill is-outline` | The second action, Back, Close. |
| Nav pill | `kora-pill` inside `.kora-pills` | The floating navigation only. |

Two sizes only:
- Nav: 15px text, `7px 16px` padding (smaller on phones).
- Page (`is-large`): 16px text, `10px 20px` padding. Every button in the page, the footer, the modals and the brand test uses this size.

One solid button per group. Icon buttons (copy, theme) are 36px circles with the outline treatment.

## 4. Layout

- One gutter: 24px on desktop, 18px on phones. Everything aligns to it.
- Sections are separated by a 1px `--border` rule, not by boxes or cards.
- Images: rows 16:9, cards 4:3, portrait slot 4:5. Every image flares where it meets the bottom of the screen.
- No rounded cards, no drop shadows, no decorative shapes. The only shapes are the star and the apostrophe.

## 5. Forms

- Inputs are an underline, not a box. 18px text, label above in 14px.
- Choices are chips: pills with an outline, filled when selected.
- Errors sit under the field with a Jollof bar on the left, and say what to do.
- Focus is always visible: Plantain on dark, Blue on light.

## 6. Contact

- Every page ends with the same contact block: heading, one lead line, two buttons (Start a project, Take the brand test), then one bold email with a copy button.
- "Start a project" and every "Book A Call" open the same three-step brief in a modal.

## 7. Motion

- Things rise from behind a mask. Nothing fades in.
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`. Short moves 0.2s, reveals 0.35 to 0.9s.
- The logo intro plays on every page load. The star turns; it never loops.
- Everything respects reduced-motion.

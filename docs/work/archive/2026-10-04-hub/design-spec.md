# Design spec — hub

Extracted on 2026-10-04 from `design/contraptions.pen` with the Pencil MCP tools. Subagents read this file, never the `.pen` (it's only accessible through the Pencil MCP). Texts come from `content/copy.md`, which wins over the design wherever the two differ.

Two boards: **Desktop — Home** (1440 wide, about 6080 tall) and **Mobile — Home** (390 wide, about 5020 tall). Both: background `bg`, content clipped at the page edge.

## Tokens

| Token | Value | Use |
|---|---|---|
| `bg` | `#0A0A0A` | Page |
| `bg-raised` | `#141414` | About section |
| `ink` | `#F2F0EB` | Primary text |
| `ink-dim` | `#9A978F` | Secondary text, labels |
| `line` | `#2A2A2A` | 1px dividers |
| `acc-quadra` | `#2F7BFF` | |
| `acc-maestro` | `#FFB000` | |
| `acc-devflow` | `#C6FF3D` | |
| `acc-datobar` | `#FF3D8B` | |
| `acc-condates` | `#9D7BFF` | |
| (no token) | `#3A3A3A` | Slot border |
| (no token) | `#2EE59D` | Trama dot |
| (no token) | `#0A0A0A` | Text on accent panels (= `bg`) |

Fonts (Google Fonts): `font-head` Bricolage Grotesque (700, 800), `font-body` Instrument Sans (400), `font-mono` Fragment Mono (400).

**Mono label** style, used everywhere unless noted: Fragment Mono 13px, letter-spacing 0.5px, `ink-dim`. Uppercase is in the text itself, not a CSS transform.

## Sections, in order

Desktop side gutter 64px, mobile 24px.

### Nav
- D: height 72, padding 28/64, brand left, links right, gap 32. M: padding 20/24, gap 16.
- Brand "spleenteo.com" mono 13 `ink`. Links mono 13 `ink-dim`: Contraptions → `#contraptions`, About → `#about`, GitHub → https://github.com/spleenteo.

### Hero
- D: vertical, gap 40, padding 120/64/140/64. M: gap 24, padding 56/24/72/24.
- Kicker: mono label.
- Title "Contraptions": Bricolage 700, `ink`, line-height 0.9. D 184px, letter-spacing −6px. M 64px, −2px.
- Hero Row. D: horizontal, space-between, bottom-aligned: Lede (max-width 620) left, Accent Strip right. M: vertical, gap 24.
- Lede: Instrument Sans, `ink`, line-height 1.35. D 28px, M 20px.
- Accent Strip: five rectangles in accent order (quadra, maestro, devflow, datobar, condates). D 44×10, gap 10. M 32×8, gap 8.
- Byline: mono label.

### Contraptions (`id="contraptions"`)
- List Header: title left, count right, 1px `line` bottom border. D: one line, padding 0/64, 40px from section top. M: stacked, gap 6, padding 0/24/12/24.
- D: 140px between header and first row, 140px between rows, about 160px after the last one. M: vertical, gap 72, section padding 24/0/80/0.

#### Desktop row (height 660)
- Two columns: the panel on one side, the text block (width 565) on the other, vertically centred.
- **Odd rows** (01 Quadra, 03 devflow, 05 Condates): panel on the left, rotated **−10°**. **Even rows** (02 Maestro, 04 Dato bar): panel on the right, rotated **+10°**.
- Panel: 780×500 before rotation, fill = the card's accent, clips its content. Its rotated bounding box (about 855×628) sticks out **140px** past the page edge. The page clips the overflow, with no horizontal scroll.
- Text block: 64px from the opposite page edge. Left-panel rows: text starts at x≈811. Right-panel rows: text starts at x=64.

#### Panel contents (coordinates are inside the unrotated 780×500 panel)
- **Index** ("01"…"05"): Bricolage 800, 300px, letter-spacing −14px, line-height 1, colour `#0A0A0A`, top at y=−40 (bleeds off the top of the panel). Left-panel rows: x=190. Right-panel rows: x=300.
- **Mark** (Quadra and Maestro only): 240×240, radius 54, shadow `0 20px 50px #00000055`. Quadra at (480, 200). Maestro at (70, 220).
- **Panel Label** (mono 13 `#0A0A0A`, y=452): in the design it reads "[ mark · to prepare in the repo ]" or "[ screenshot / demo loop ]". **Not rendered** on panels without a mark (devflow, Dato bar, Condates), as the brief says. On Quadra: see Open points.

#### Text block (desktop, vertical, gap 22)
- Kind: mono 13, letter-spacing 0.5, **accent colour**.
- Name: Bricolage 700, 64px, letter-spacing −2, line-height 1, `ink`.
- One-liner: Instrument Sans 24px, line-height 1.35, `ink`.
- Why: Instrument Sans 17px, line-height 1.6, `ink-dim`.
- Meta Row: 1px `line` top border, padding-top 18, space-between. Meta (mono 13 `ink-dim`, no letter-spacing) left, Link (mono 13, accent colour, ends with " →") right.

#### Mobile row (no rotation)
- Vertical, gap 28, padding 0/24. **Panel first, then text.**
- Panel: full width (342 at 390), height 220, accent fill, clips its content. Index 140px, letter-spacing −6, at (20, −18). Mark 120×120, radius 28, at (200, 70), same shadow. Label mono 11 at y=190, with the same rule as desktop.
- Text block: gap 14. Kind mono 13. Name 40px, letter-spacing −1. One-liner 19px. Why 16px. Meta Row stacked vertically, gap 8.

### Made for me
- D: padding 0/64/120/64. M: 0/24/80/24.
- Header: mono label "MADE FOR ME · NOT FOR SALE, NOT FOR SIGN-UP" (wraps on mobile, line-height 1.5), then a 24px spacer.
- Each item has a 1px `line` top border. D: horizontal, gap 40, padding 26/0, centred: dot 28×28 radius 7, name (Bricolage 700, 32px, −1, width 260), desc (Instrument Sans 18px, line-height 1.5, `ink-dim`). M: vertical, gap 8, padding 20/0, name 26px, desc 16px.
- Slacky: the dot is the icon `slacky-icon.png`. Trama: the dot is a solid `#2EE59D`. Neither has a link.

### Slot (empty on purpose)
- Wrapper. D: padding 0/64/140/64. M: 0/24/80/24.
- Box: 1px `#3A3A3A` border, radius 2, vertical, gap 14. Padding D 56, M 28.
- Kicker: mono label. Note: Instrument Sans `ink-dim`, line-height 1.4, D 22px, M 18px.

### About (`id="about"`)
- Background `bg-raised`. D: horizontal, gap 96, padding 120/64. Kicker "ABOUT" (width 260) left, body right. M: vertical, gap 20, padding 72/24.
- Body: vertical, gap 32. Text: Instrument Sans `ink`, line-height 1.45. D 26px with max-width 820, M 20px.
- Contacts: mono 15, letter-spacing 0.5, `ink`, each ending with " →". D in a row, gap 40. M stacked, gap 12.

### Footer
- D: padding 32/64, left/right space-between. M: stacked, gap 8, padding 28/24.
- Mono labels: "spleenteo · Firenze" and "© 2026 Matteo Papadopoulos".

## Assets

| File | Where |
|---|---|
| `design/assets/quadra-icon.png` (1024²) | Quadra mark |
| `design/assets/maestro-icon-1024.png` (1024²); also `maestro-icon.svg` | Maestro mark |
| `design/assets/slacky-icon.png` (512²) | Slacky dot |

## Breakpoints

The design only has 390 and 1440. In between it's our call: switch from the mobile layout to the desktop one around 960px, and scale the large type with `clamp()` so it never overflows. Documented in the V1 plan.

## Open points: settled by the user on 2026-10-04

Decisions: 1, no label on Quadra either. 2, main link plus a second link "repo →" where a repo exists, with the label = the main address without `https://`. Condates is shortened to `datocms.com/marketplace →`. 3, no x.com.

Original text:

1. **Quadra label**: in the design Quadra has a mark and also the label "[ screenshot / demo loop ]", a placeholder. Proposal: don't render it either.
2. **Link labels**: the design shows `github.com/spleenteo/<name> →`. For Quadra and Maestro, `copy.md` has the github.io page as the main link and the repo in parentheses. Proposal: the `href` is the main link and the label shows that same address, without `https://`.
3. **x.com/spleenteo**: it appears among the About contacts in the design, but not in `copy.md`. Proposal: leave it out, since `copy.md` wins.

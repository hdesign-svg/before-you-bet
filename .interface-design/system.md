# Before You Bet — Design System v2

## Intent

**Who:** Susan. Sunday morning, phone in hand, panicking. She hasn't placed her bets, doesn't understand the jargon. She's not a degen — she wants to participate but feels lost. She doesn't have 30 minutes. She has 30 seconds.

**What she must do:** Scan the week's games. Find the ones she cares about. Get a plain-English verdict. Feel confident enough to act.

**What this should feel like:** Sports broadcast intelligence — bold, fun, confident. Like the pre-game show gave her a personal briefing. Not a fintech dashboard, not a newspaper, not a sportsbook. The feeling of having an unfair advantage wrapped in something that still feels like game day.

**Emotional arc:** Panic → Relief → Confidence → Action.

**Reference apps:** NFL, NBA, Premier League, FotMob, F1, ESPN, Bleacher Report — bold typography, team color surfaces, colored cards for key info, header strips.

---

## Visual Direction

**Light-mode first.** White canvas. Midnight navy and warm coral earn their presence through intentional, concentrated moments — not spread everywhere.

### How Brand Color Appears

**Midnight Navy (#0f1729)**
- Header strip at the top of the UI — establishes authority
- Section header backgrounds (slate labels, broadcast windows)
- Detail view nav bars
- Footer or bottom nav if needed
- Text color for primary ink (--ink maps to midnight)

**Warm Coral (#FF6B5A)**
- Insight card surface — the verdict moment, the reason she came
- CTA buttons, action moments
- Confidence indicators, lean fills
- Badge/tag backgrounds for key callouts
- NOT used for status (live/error/caution are separate)

### Surfaces & Depth

- **Canvas:** Cool neutral gray (#f4f5f7) — subtle separation from white cards, no warmth
- **Cards:** Pure white (#ffffff) with shadow — lifted off canvas
- **Brand surfaces:** Midnight navy with white text — headers, strips
- **Accent surfaces:** Coral with white text — insight cards, verdicts
- **Shadows over borders** — cards float, they don't sit in boxes. Shadows allowed and encouraged.

### Constraints
- No green as brand color (sportsbook)
- No gold/amber as brand color (gambling)
- Coral is for VALUE moments (verdicts, insights, CTAs), not decoration
- Midnight is for AUTHORITY moments (headers, nav), not backgrounds everywhere

---

## Typography

**Display: Big Shoulders Display** (700–900, uppercase)
- Athletic, institutional, broadcast energy
- Used for: section headers, scores, stat numbers, wordmark, slate labels
- Push it — large sizes, uppercase, tracked. This is the sports energy.

**Body: Outfit** (300–700)
- Geometric sans, friendly, modern
- Used for: UI text, insights, body copy, labels, metadata
- Lower weights (300–400) for supporting text, heavier (600–700) for emphasis

### Type Scale

| Token | Size | Role |
|-------|------|------|
| --text-xs | 11px | Fine print, timestamps |
| --text-sm | 13px | Labels, metadata, supporting |
| --text-base | 15px | Body text, game headlines |
| --text-lg | 17px | Emphasized body, subheads |
| --text-xl | 20px | Component headers |
| --text-2xl | 24px | Section headers (display) |
| --text-3xl | 32px | Hero text, large section heads |
| --text-4xl | 40px | Stat numbers, scores |
| --text-5xl | 56px | Hero stat callouts |

### Typography Patterns
- **Section headers:** Big Shoulders, uppercase, --text-2xl to --text-3xl, letter-spacing 0.02em
- **Stat numbers:** Big Shoulders, --text-4xl+, tabular nums
- **Card titles:** Outfit 600–700, --text-lg to --text-xl
- **Body/insight text:** Outfit 400, --text-base
- **Metadata/labels:** Outfit 500, --text-sm, uppercase, letter-spacing 0.04em

---

## Spacing

Base unit: 4px. Same scale as v1.

| Token | Value | Usage |
|-------|-------|-------|
| --sp-1 | 4px | Micro: icon gaps, inline |
| --sp-2 | 8px | Tight: compact components |
| --sp-3 | 12px | Component: padding, gaps |
| --sp-4 | 16px | Standard: card padding, list gaps |
| --sp-6 | 24px | Section: between groups |
| --sp-8 | 32px | Major: between sections |
| --sp-12 | 48px | Page: header spacing |
| --sp-16 | 64px | Layout: major divisions |

---

## Depth Strategy

**Shadows + surface color.** Cards sit on the canvas; they float.

| Token | Usage |
|-------|-------|
| --shadow-sm | Subtle lift: list items on hover, badges |
| --shadow-md | Standard cards: game strips, player cards |
| --shadow-lg | Featured cards: insight card, detail panels |
| --shadow-xl | Overlays, modals, bottom sheets |

Borders are optional reinforcement, not the primary depth mechanism. Use --rule for subtle separators within cards (between rows), not as card outlines.

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| --r-sm | 6px | Buttons, badges, inputs |
| --r-md | 10px | Cards, game strips |
| --r-lg | 14px | Featured cards, panels |
| --r-xl | 20px | Hero cards, overlays |

Slightly rounder than v1 — approachable, sports-app feel. Not pill-shaped.

---

## Component Patterns

### App Header (midnight strip)
Midnight navy background, full-width. Wordmark, navigation if needed.
- White text on midnight
- Compact height — not a hero, just authority
- Establishes "you're in the product" feeling

### Slate Header (broadcast window label)
Groups games by time window. The "THURSDAY NIGHT", "SUNDAY EARLY" etc.
- Big Shoulders Display, uppercase, --text-xl to --text-2xl
- Can be midnight navy background strip OR bold text on canvas
- Clear visual break between groups

### Game Strip (list item)
The primary scannable object. One game = one tappable row.
- White card surface, --shadow-md, --r-md
- Time | Logos | Team names | Headline
- Headline IS the product — plain-English insight preview
- Hover: shadow lifts (--shadow-lg), subtle scale
- Logos carry team identity (no team-color decoration on list)

### Insight Card (verdict moment — CORAL)
The crown jewel. Why Susan came. Verdict-first.
- **Coral background (#FF6B5A), white text**
- Lead with the actionable takeaway
- Supporting bullets are punchy, scannable
- Large enough to feel like THE moment, not buried
- --shadow-lg, --r-lg
- This card should feel like a gift — "here's your answer"

### Game Detail Hero
The matchup showcase at top of detail view.
- Explore team-color split backgrounds (like NFL/NBA apps)
- Large logos, team abbreviations in Big Shoulders Display
- Time/date/venue metadata below
- This is where team identity gets its moment

### Player Card
Within detail view or players list.
- White card, --shadow-md
- Headshot, name (Outfit 600), position badge
- Verdict line, projection with range
- Compact but readable

### Stat Blocks
For comparison data (head-to-head, team stats).
- 2-column grid of white cards
- Big Shoulders Display for the numbers (--text-4xl)
- Label above or below in Outfit --text-sm
- Like the Premier League record cards: bold number, clean label

### Status Indicators
- **Upcoming:** Time in --font-mono
- **Live:** Green dot (pulsing) + score, --live color
- **Final:** Muted treatment, --final color

---

## Hierarchy Strategy

- **List view = SCAN.** White cards on warm canvas. Logos pop. Headlines readable. Find your game in seconds. Relief.
- **Detail view = READ + DELIGHT.** Hero with team color personality. Coral insight card delivers the verdict. Stats confirm. Confidence.

---

## Anti-Patterns

- No dark mode as default (opt-in only)
- No team color in list view (logos carry identity there)
- No sportsbook visual language ($ symbols, odds-heavy UI)
- No cold/gray/clinical aesthetic
- No generic fintech/dashboard energy
- No accent color on everything — coral is reserved for value moments
- No tiny, timid typography — Big Shoulders should feel bold and athletic
- No flat cards without shadows on white backgrounds (they'll disappear)

# Design System — Before You Bet

*Typography, color, spacing, and component foundations.*

---

## Typography

### Recommended Pairing: Montagu Slab + Figtree

**Headlines: Montagu Slab**
A variable slab serif with weight and optical size axes. Draws on 19th-century slab tradition but with compressed, upward-energetic proportions — athletic and confident without being aggressive. The optical size axis automatically adjusts contrast for display vs. text sizes. Available on Google Fonts.

**Body / UI: Figtree**
A geometric sans-serif with variable weight (300–900). Designed by Erik D. Kennedy (Learn UI Design). Clean and balanced on screen without the coldness of Inter or the overexposure of Poppins. Warm geometry with precision.

**Why this pairing:** Montagu Slab gives the product editorial authority — it looks like a publication, not an app. Figtree keeps the UI modern, readable, and crafted. Together they say: "this was built by someone who cares about design" — exactly the signal a portfolio case study needs.

**Alternative pairings considered:**
- Spectral + Plus Jakarta Sans — more Bloomberg/financial, slightly less sporty
- Zilla Slab + Manrope — safest option, slightly less distinctive

### Type Scale

| Token | Size | Weight | Font | Use |
|-------|------|--------|------|-----|
| `display` | 36px / 2.25rem | 700 | Montagu Slab | Page titles ("Before You Bet") |
| `heading-1` | 28px / 1.75rem | 700 | Montagu Slab | Section headers ("The Story") |
| `heading-2` | 22px / 1.375rem | 600 | Montagu Slab | Card titles, player names |
| `heading-3` | 18px / 1.125rem | 600 | Montagu Slab | Sub-headers, labels |
| `body-lg` | 17px / 1.0625rem | 400 | Figtree | Primary content (stories, insights) |
| `body` | 15px / 0.9375rem | 400 | Figtree | Standard body text |
| `body-sm` | 13px / 0.8125rem | 400 | Figtree | Secondary text, metadata |
| `caption` | 11px / 0.6875rem | 500 | Figtree | Timestamps, labels, tags |
| `tab` | 15px / 0.9375rem | 600 | Figtree | Tab labels (Matchups, Players) |
| `stat` | 20px / 1.25rem | 600 | Figtree | Odds, spreads, key numbers |

### Line Heights
- Headlines: 1.2
- Body: 1.6
- Captions: 1.4

---

## Color

### Palette Philosophy
Light-mode first. Extreme restraint. No green (sportsbook), no gold (gambling). The palette should signal *clarity and trust*, not *action and risk*.

### Core Palette

| Token | Hex | Use |
|-------|-----|-----|
| `background` | `#FAFAF8` | Page background — warm off-white, not sterile |
| `surface` | `#FFFFFF` | Cards, elevated containers |
| `surface-alt` | `#F2F1EE` | Secondary backgrounds, section breaks |
| `text-primary` | `#1A1A1A` | Headlines, primary content |
| `text-secondary` | `#5C5C5C` | Supporting text, metadata |
| `text-tertiary` | `#8E8E8E` | Placeholders, timestamps |
| `border` | `#E5E4E1` | Card borders, dividers |
| `border-subtle` | `#EDEDEB` | Light separators within cards |

### Accent Color

| Token | Hex | Use |
|-------|-----|-----|
| `accent` | `#2A5BD7` | Primary accent — deep blue. Links, active tab, CTAs |
| `accent-hover` | `#1E47A8` | Hover state |
| `accent-light` | `#EBF0FA` | Accent background (active tab bg, selected states) |

**Why deep blue:** It signals intelligence and trust without veering into sportsbook territory. It's the color of Bloomberg, Financial Times digital, and premium information products. It contrasts well on a warm white background.

### Semantic Colors

| Token | Hex | Use |
|-------|-----|-----|
| `positive` | `#1A8754` | Favorable signal, confidence indicator |
| `caution` | `#C17D10` | Mixed signal, moderate confidence |
| `negative` | `#C4392D` | Risk indicator, concern |
| `info` | `#2A5BD7` | Informational (same as accent) |

### Position Colors (Player Spotlight)

| Token | Hex | Position |
|-------|-----|----------|
| `pos-qb` | `#7C5CCC` | Quarterback — purple |
| `pos-rb` | `#2BA8B8` | Running back — teal |
| `pos-wr` | `#45A862` | Wide receiver — green |
| `pos-te` | `#D97048` | Tight end — coral |

*Used as left-border accents on player cards and position tags. Follows the FantasyPros convention that's become industry-standard.*

---

## Spacing

### Spacing Scale (4px base)

| Token | Value | Use |
|-------|-------|-----|
| `space-1` | 4px | Tight internal padding, icon gaps |
| `space-2` | 8px | Inline element spacing |
| `space-3` | 12px | Small component padding |
| `space-4` | 16px | Standard component padding |
| `space-5` | 24px | Section padding, card padding |
| `space-6` | 32px | Between sections |
| `space-7` | 48px | Major section breaks |
| `space-8` | 64px | Page-level spacing |

### Layout

| Token | Value | Use |
|-------|-------|-----|
| `max-width` | 680px | Content max-width (mobile-first, readable measure) |
| `card-radius` | 12px | Card border-radius |
| `card-padding` | 24px | Internal card padding |
| `page-gutter` | 20px | Left/right page margin (mobile) |

---

## Component Patterns

### Game Card (Matchups tab)
- White surface, 1px border (`border`)
- 12px border-radius
- 24px padding
- Teams at top (heading-2), spread right-aligned (stat weight)
- Date/time below teams (caption, text-tertiary)
- One-line insight at bottom (body, text-secondary, italic)
- Full card tappable

### Player Spotlight Card (Game detail)
- White surface, left border accent (4px, position color)
- Player name (heading-2), position tag (caption, position color bg)
- Team + matchup context (body-sm, text-secondary)
- 4 insight fields as labeled rows
- Field labels (heading-3): "What's Going On", etc.
- Field content (body-lg)

### Player Card — Condensed (Players tab)
- Compact version of Player Spotlight
- Name + position + team + matchup on one line
- Condensed insight (body-sm)
- "Add to list" button or remove affordance

### Consolidated Insight (Players tab)
- Visually distinct container — accent-light background
- Rounded, generous padding
- Heading: "Based on your selections" (heading-2)
- Insight content (body-lg, text-primary)
- Appears/updates dynamically as players are added

### Tab Bar (Matchups | Players)
- Horizontal, pinned below header
- Active tab: text in accent color, bottom border 2px accent
- Inactive tab: text-secondary, no border
- Font: tab token (Figtree 600, 15px)

### The Takeaway (Game detail)
- Full-width block, surface-alt background
- Body-lg text, Montagu Slab (heading weight — this is the one place body content uses the serif)
- Generous padding (space-6 top/bottom)
- Feels like a pull quote — visually distinct from the rest of the page

---

## Motion

- **Transitions:** 200ms ease for color/opacity changes
- **Tab switch:** Crossfade, 150ms
- **Card hover (desktop):** Subtle lift — 2px translateY, light shadow
- **Consolidated insight appearance:** Fade in + slight slide up, 300ms
- **No gambling-style motion:** No pulsing, no confetti, no shake, no glow

---

## Dark Mode

Not in MVP scope. The light-mode-first decision is a deliberate design positioning choice — we're not a sportsbook. If added later, map the warm palette to a true dark scheme (not just inverted), following ESPN Fantasy's 2025 approach of purpose-mapped dark pairs.

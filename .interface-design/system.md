# Before You Bet — Design System

Extracted from codebase. Editorial Brutalism × Sports Luxury.

---

## Typography

### Families
| Role    | Family           | Fallback                    |
|---------|------------------|-----------------------------|
| Display | Instrument Serif | Georgia, serif              |
| Body    | Geist            | -apple-system, sans-serif   |

### Display Scale (Instrument Serif)
| Use           | Size | Weight | Extras             |
|---------------|------|--------|---------------------|
| Hero name     | 64px | 400    | text-wrap: balance  |
| Card headline | 28px | 400    | text-wrap: balance  |
| Wordmark      | 22px | 400    | —                   |
| Card title    | 20px | 400    | —                   |
| Team label    | 18px | 400    | —                   |
| Player name   | 16px | 400    | —                   |

### Body Scale (Geist)
| Use         | Size | Weight | Extras                          |
|-------------|------|--------|---------------------------------|
| Body        | 15px | 400    | line-height: 1.6, text-wrap: pretty |
| Subtitle    | 14px | 400    | —                               |
| Verdict     | 13px | 400    | —                               |
| Card time   | 13px | 500    | font-variant-numeric: tabular-nums |
| Small       | 12px | 400    | —                               |
| Badge       | 11px | 600    | uppercase, letter-spacing: 0.08em |
| Footer      | 10px | 400    | —                               |

---

## Color

### Surfaces
| Token          | Value   | Use                    |
|----------------|---------|------------------------|
| `--bg`         | #F5F2ED | Page background        |
| `--bg-warm`    | #EDE9E1 | Hover/active surface   |
| `--surface`    | #FFFFFF | Cards                  |
| `--surface-dim`| #F0EDE7 | Subdued surface        |

### Ink (4-level hierarchy)
| Token             | Value   | Use              |
|-------------------|---------|------------------|
| `--ink`           | #111111 | Primary text     |
| `--ink-secondary` | #555555 | Supporting text  |
| `--ink-tertiary`  | #999999 | Tertiary/meta    |
| `--ink-ghost`     | #BBBBBB | Placeholder      |
| `--ink-inverse`   | #FFFFFF | On dark surfaces |

### Borders
| Token          | Value   | Use            |
|----------------|---------|----------------|
| `--rule`       | #E0DDD6 | Default border |
| `--rule-strong`| #C5C1B8 | Emphasized     |

### Accent
No fixed accent color. Team colors are injected dynamically via inline `linear-gradient(135deg, awayColor, homeColor)`.

---

## Spacing

Base unit: **4px**

| Token     | Value |
|-----------|-------|
| `--sp-1`  | 4px   |
| `--sp-2`  | 8px   |
| `--sp-3`  | 12px  |
| `--sp-4`  | 16px  |
| `--sp-5`  | 20px  |
| `--sp-6`  | 24px  |
| `--sp-8`  | 32px  |
| `--sp-10` | 40px  |
| `--sp-12` | 48px  |
| `--sp-16` | 64px  |
| `--sp-20` | 80px  |
| `--sp-24` | 96px  |

---

## Radii

| Token    | Value | Use                     |
|----------|-------|-------------------------|
| `--r-sm` | 6px   | Badges, small elements  |
| `--r-md` | 12px  | Cards, inputs           |
| `--r-lg` | 16px  | Large cards             |
| `--r-xl` | 24px  | Hero elements           |

---

## Depth

**Strategy: Borders-primary, shadows on floating cards only.**

Borders are the default depth mechanism. Box shadows appear only on elevated content cards (detail view).

### Shadow Scale
| Level   | Value                                                                                   |
|---------|-----------------------------------------------------------------------------------------|
| Tier 1  | `0 1px 3px rgba(0,0,0,0.08)`                                                          |
| Tier 2  | `0 4px 12px rgba(0,0,0,0.06)`                                                         |
| Tier 3  | `0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06), 0 24px 48px rgba(0,0,0,0.04)` |
| Hover   | `0 4px 12px rgba(0,0,0,0.06)` (player card lift)                                      |

---

## Motion

### Principles
- Compositor-only properties: `transform`, `opacity`
- No `border-color`, `background-color`, or layout-triggering transitions
- All motion respects `prefers-reduced-motion: reduce`

### Timing
| Token               | Value |
|----------------------|-------|
| `--duration-fast`    | 150ms |
| `--duration-normal`  | 300ms |
| `--duration-slow`    | 500ms |
| `--ease-out`         | ease-out |

### Stagger Patterns
| Pattern       | Delay  | Use              |
|---------------|--------|------------------|
| Card stagger  | 60ms   | Grid card reveal |
| Bullet stagger| 80ms   | Rundown items    |

### Keyframe Animations
| Name       | Properties                        | Duration | Use             |
|------------|-----------------------------------|----------|-----------------|
| `fadeUp`   | opacity 0→1, translateY 12px→0   | 400ms    | Card entrance   |
| `slideIn`  | opacity 0→1, translateX -10px→0  | 350ms    | Bullet entrance |
| `logoReveal`| opacity 0→1, scale 0.8→1        | 500ms    | Hero logo       |

---

## Layout

### Containment
| Token              | Value  | Use               |
|--------------------|--------|-------------------|
| `--max-w`          | 1100px | Page container    |
| `--max-w-content`  | 720px  | Content column    |

### Grid
- Game cards: `repeat(auto-fill, minmax(280px, 1fr))`
- Player grid: 2-column at desktop, stacks at mobile
- Responsive breakpoints: 900px, 640px

### Responsive Strategy
| Breakpoint | Grid   | Hero logos | Headline |
|------------|--------|-----------|----------|
| > 900px    | 3-col  | 72px      | 28px     |
| 640–900px  | 2-col  | 56px      | 22px     |
| < 640px    | 1-col  | 48px      | 20px     |

---

## Component Patterns

### Game Card (button)
- Background: `var(--surface)`
- Border: `1px solid var(--rule)`
- Radius: `var(--r-md)` (12px)
- Overflow: hidden (for gradient strip)
- Hover: `translateY(-2px)`, border → `var(--rule-strong)`, shadow tier 1
- Active: `translateY(0)`
- Gradient strip: 3px top bar, team colors

### Content Card (detail view)
- Background: `rgba(255, 255, 255, 0.95)`
- Backdrop-filter: `blur(8px)`
- Radius: `var(--r-lg)` (16px)
- Shadow: tier 3 (three-layer)
- Padding: `var(--sp-8)` (32px), reduces at mobile

### Badge (position label)
- Font: 11px, weight 600, uppercase
- Letter-spacing: 0.08em
- Background: `var(--surface-dim)`
- Padding: 2px 8px
- Radius: `var(--r-sm)` (6px)

### Back Button
- Gap: 6px
- Hover: arrow nudges left 2px (`translateX(-2px)`)
- Transition: transform 150ms ease-out

---

## Accessibility

- Focus: `2px solid var(--ink)`, offset 2px, radius `var(--r-sm)`
- All game cards have descriptive `aria-label`
- Decorative elements use `aria-hidden="true"`
- Detail view has visually-hidden `<h1>` via `.srOnly`
- Escape key closes detail, focus restores to trigger card
- `prefers-reduced-motion` kills all animation/transition

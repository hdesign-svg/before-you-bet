# Competitive UI Analysis — Before You Bet

*What works, what doesn't, and where the design opportunity lives.*

---

## Products Analyzed

| Product | Category | Design Vibe |
|---------|----------|------------|
| DraftKings | Sportsbook | Utilitarian trading floor — dark, dense, number-forward |
| FanDuel | Sportsbook | Cleaner trading floor — dark, slightly more breathing room |
| Underdog Fantasy | DFS/Pick'em | Modern consumer app — dark + yellow, one-card-at-a-time |
| The Athletic | Sports journalism | Premium editorial — black + orange slab serif, type-driven |
| Bleacher Report | Sports media | Editorial + video-forward — gold accent, multi-typeface |
| ESPN Fantasy | Fantasy sports | Information-rich utility — red accent, modular redesign in 2025 |
| FantasyPros | Fantasy analytics | Data-dense utility — position color coding, Poppins, rounded corners |
| Action Network | Betting content | Editorial + analytics — light mode, cream + green, three-typeface system |

---

## Patterns That Work (Proven)

1. **Pill-button odds selection** — tap to add, visual state change. Industry standard.
2. **Bottom tab navigation** on mobile — 5-tab max. Universal.
3. **Position color coding** — QB purple, RB cyan, WR green, TE pink. Understood language.
4. **Progressive disclosure** — summary visible, drill for detail. Right answer for dense data.
5. **Dark mode default for betting** — signals "this is serious money."
6. **Type scale with purpose** — 4-5 clear size stops, not 15 random sizes.
7. **Verdict-first in comparison tools** — start/sit tools that lead with the answer outperform data dumps.

---

## Gaps Nobody Fills

1. **No contextual narrative on player data.** Every product shows the line. None explain *why* the line is what it is in plain language.
2. **No "before you bet" moment.** Sportsbooks optimize for frictionless placement. Nothing slows you down *thoughtfully*.
3. **No player comparison designed for decisions.** Start/sit tools present more data, not clearer recommendations. No confidence scoring.
4. **No injury/weather context at the point of decision.** You have to leave the betting app to get it.
5. **No trust-first design.** Every betting product looks like a betting product. Nobody has designed to be the "trustworthy advisor."

---

## What Makes Premium vs. Cheap

### Premium signals
- **Custom or distinctive typography** — The Athletic's slab serif is identifiable by headline alone
- **Color restraint** — 1-2 accent colors used with intent (The Athletic: black + orange; Action Network: cream + green)
- **Whitespace as design choice** — premium products let content breathe
- **Curated data** — insight over information dump
- **Consistent elevation hierarchy** — knowing when to card, list, table, or modal
- **Motion that communicates** — not decorative, functional

### Cheap signals
- Default Poppins/Roboto with no personality
- Gradient backgrounds, green glow effects
- Too many font weights without a system
- Odds styled to emphasize dollar amounts over probability
- Modal overuse for inline content

---

## Before You Bet — Design Positioning

Based on this analysis, Before You Bet should:

### 1. Be light-mode first
Every sportsbook is dark. Before You Bet isn't a sportsbook — it's an advisor. Light mode signals *reading and thinking*, not *placing bets*. It immediately looks different from everything else Susan has on her phone.

### 2. Lead with typography, not color
The Athletic proves this works in sports. One distinctive typeface used consistently is worth more than a complex color system. Consider a strong serif or slab serif for headlines (authority, editorial trust) paired with a clean sans-serif for body (readability, modern). This is the single highest-leverage design decision.

### 3. Use extreme color restraint
One brand accent color. No green (sportsbook association). No gold (gambling association). Consider a deep blue or a warm neutral accent. Use color for function (position coding on players, confidence indicators) not decoration.

### 4. Lower information density than competitors
Susan doesn't need 40 data points. She needs 4 clear insights. The design should have generous whitespace, one idea per section, and no scrolling within cards. If it looks like a stats page, we've failed.

### 5. Lead with the verdict
Borrow the start/sit pattern but improve it: verdict → confidence level → one plain-English reason → supporting detail (optional). The Takeaway should be the first thing Susan notices, not the last thing she scrolls to (consider this for the Players tab especially).

### 6. Design the "consolidated insight" as the hero moment
The Players tab's consolidated insight is the product's signature interaction. This should feel like a moment — visually distinct, clearly computed, and unlike anything on any competing product. It's the "smart friend" summarizing your parlay.

### 7. No gambling visual language
No pulsing animations, no "potential winnings" displays, no confetti, no green-for-money. The visual language should say *clarity* and *confidence*, not *excitement* and *risk*. If it could appear in a financial wellness app, the tone is right.

---

## Reference Products by Attribute

| What to reference | Product |
|------------------|---------|
| Typography-driven brand identity | The Athletic |
| Editorial feel in a data product | Action Network |
| Light-mode sports product | Action Network |
| Position color coding for players | FantasyPros |
| Clean consumer app feel | Underdog Fantasy |
| Type + whitespace = premium | The Athletic |
| Verdict-first comparison UX | FantasyPros (start/sit) |
| What NOT to do (density, jargon) | DraftKings |

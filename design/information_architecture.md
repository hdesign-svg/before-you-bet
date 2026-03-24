# Information Architecture — Before You Bet

*How the system's objects map to pages, sections, and user flows.*

---

## Site Map

```
/ (Homepage)
├── Header: "Before You Bet" + Week context (Week 12, Nov 19–25)
├── Tab: Matchups (default)
│   ├── Game Card → /games/chiefs-at-bills
│   ├── Game Card → /games/cowboys-at-commanders
│   └── Game Card → /games/eagles-at-rams
├── Tab: Players
│   ├── Search bar: "Search for a player"
│   ├── Players List (ephemeral, session-scoped)
│   │   ├── Player Card (condensed)
│   │   ├── Player Card (condensed)
│   │   └── Player Card (condensed)
│   └── Consolidated Insight (computed from grouped players)
└── Footer

/games/[slug] (Game Detail)
├── Header: Matchup (Team vs Team), spread, date/time, last updated
├── Section 1: The Story
├── Section 2: What the Odds Really Say
├── Section 3: Key Players That Matter
│   ├── [Team A Name]
│   │   ├── Player Spotlight (QB)
│   │   ├── Player Spotlight (RB)
│   │   └── Player Spotlight (WR/TE)
│   └── [Team B Name]
│       ├── Player Spotlight (QB)
│       ├── Player Spotlight (RB)
│       └── Player Spotlight (WR/TE)
├── Section 4: The Takeaway
└── Back to weekly slate
```

---

## Object → Page Mapping

| Object | Page | Representation | Priority |
|--------|------|----------------|----------|
| Week | Homepage | Header context — week number, date range, season | Framing |
| Game | Homepage (Matchups tab) | Game card — teams, spread, one-line insight | Primary navigation |
| Game | Game detail | Full page — all 4 sections | Core experience |
| Team | Homepage + Game detail | Team name, record, logo/color — always in pairs | Context |
| Player Spotlight | Game detail (Section 3) | Full player card — 4 insight fields, grouped by team | Supporting detail |
| Player Spotlight | Homepage (Players tab) | Condensed card — searchable, add to check list | Alternative surface |
| Players List | Homepage (Players tab) | Ephemeral group — session-scoped, no persistence | Interactive tool |
| Consolidated Insight | Homepage (Players tab) | Computed summary based on grouped players | Decision support |

---

## Navigation & Flow

### Two User Intents, One Homepage

The homepage serves two distinct intents through tabs:

**Matchups tab (default):** "I want to understand a game before I bet on it."
```
Matchups tab → scan game cards → tap a game → read 4 sections → understand → leave
```

**Players tab:** "I want to evaluate a few players before I build a parlay."
```
Players tab → search a player → add to list → search another → read consolidated insight → leave
```

### Navigation Elements
- **Homepage tabs:** Matchups | Players — toggle between views, no page reload
- **Homepage → Game:** Game card is the CTA. Entire card is tappable.
- **Game → Homepage:** Back link at top. "← Week 12" to maintain context.
- **Game → Game:** No direct game-to-game navigation. User returns to homepage. (Deliberate constraint — one game at a time.)

### Exit Points
- **From Matchups flow:** After reading The Takeaway, Susan goes to her sportsbook with clarity.
- **From Players flow:** After reading the Consolidated Insight, Susan goes to build her parlay.

---

## Content Hierarchy

### Homepage — Matchups Tab
1. **Week context** (where am I in the season)
2. **Game cards** (what games matter this week)
3. **One-line insight per card** (why should I care about this one)

### Homepage — Players Tab
1. **Search bar** (find a player)
2. **Players list** (the players I'm evaluating)
3. **Individual player cards** (condensed insights per player)
4. **Consolidated insight** (the "so what?" for this group)

### Game Detail Page
1. **Matchup header** — who's playing, spread, date/time, last updated (orient me)
2. **The Story** — what's the narrative (engage me)
3. **What the Odds Really Say** — translate the numbers (educate me)
4. **Key Players That Matter** — who matters on each team (inform me)
5. **The Takeaway** — what's the bottom line (empower me)

---

## Design Implications

- **Tab-based homepage.** Two views, same page. No extra routes. State lives in the tab toggle.
- **Mobile-first.** Susan is on her phone at brunch. Both tabs must work as scrollable columns.
- **Card-based matchups.** Each game card is self-contained with enough info to decide whether to tap in.
- **Linear game page.** No tabs, no accordions. Top-to-bottom. Trust the narrative.
- **Players is ephemeral.** No account, no saving. Build it, read it, leave. Refresh clears the list.
- **Search is fast and forgiving.** Susan types "maho" and sees "Patrick Mahomes, QB, Chiefs." One tap to add.
- **Consolidated insight is computed.** It updates as players are added/removed. This is the "smart friend" moment — the product synthesizes, not just lists.

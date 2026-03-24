# OOUX Object Model — Before You Bet

*Defines the system's core objects, their attributes, metadata, CTAs, and relationships using Object-Oriented UX principles.*

---

## Core Objects

### 1. Week (Top-Level Container)

The temporal container that scopes everything. Users always enter the product in the context of a specific NFL week.

| | |
|---|---|
| **Attributes** | Week number, season year, date range (e.g., "Nov 19–25"), status (upcoming / in-progress / complete) |
| **Metadata** | Number of games, featured game flag |
| **CTAs** | Browse games |
| **Where it surfaces** | Homepage header, navigation context |

---

### 2. Game (Primary Object)

The central object of the product. Every page, insight, and player rolls up to a Game. This is what Susan came to understand.

| | |
|---|---|
| **Attributes** | Matchup (away team @ home team), date/time, spread, over/under, moneyline, venue |
| **Metadata** | Slug (URL), featured flag, game status |
| **CTAs** | View game detail, share game |
| **Where it surfaces** | Homepage game card → Game detail page |

**Nested content (local to Game):**
- The Story (narrative context)
- Odds Translation (plain-English breakdown of spread, over/under, moneyline)
- The Takeaway (single sentence summary)

> **Design decision:** The Story, Odds Translation, and Takeaway are *attributes of Game*, not standalone objects. They don't exist outside the context of a specific game, they have no independent CTAs, and they're always displayed together. Promoting them to objects would over-complicate the system without benefit.

---

### 3. Team

An NFL team. Teams exist independently of games but surface *in the context of* a game within this product.

| | |
|---|---|
| **Attributes** | Name, city, abbreviation, record (W-L), logo/color |
| **Metadata** | Conference, division |
| **CTAs** | None in MVP (no team detail pages) |
| **Where it surfaces** | Game card (both teams), Game detail page header |

**Relationship to Game:** A Game always has exactly two Teams (home, away). This is a **junction relationship** — the Game-Team junction carries positional context (home/away).

---

### 4. Player Spotlight (Context-Dependent Object)

A key player highlighted within a specific game. This is not a full player profile — it's a *player in context*. The same player could appear in multiple games with completely different insights.

| | |
|---|---|
| **Attributes** | Name, position, team, headshot |
| **Metadata** | Injury status, game-specific role |
| **CTAs** | None in MVP |
| **Where it surfaces** | Game detail page, Section 3 ("Key Players That Matter") |

**Player Spotlight content (local attributes):**
- What's Going On — current situation/context
- What It Means — impact on this specific game
- Expectation — projected performance in plain English
- Why It Matters — relevance to bettors

> **Design decision:** Player Spotlight is a **context-dependent child of Game**, not a standalone Player object. In this product, a player only matters in the context of a specific matchup. We don't need player profile pages, career stats, or cross-game history. This keeps the system focused on the decision moment.

---

### 5. Players List (Ephemeral Object)

A temporary, session-scoped container that holds Player Spotlights the user has selected across multiple games. It exists only during the session — no persistence, no account, no URL.

| | |
|---|---|
| **Attributes** | List of selected Player Spotlights |
| **Metadata** | Player count, session-scoped (no persistence) |
| **CTAs** | Add player (via search), Remove player, Clear all |
| **Where it surfaces** | Homepage — Players tab |

**Computed content (local to Players List):**
- Consolidated Insight — a synthesized summary based on the grouped players, evaluating the strength and risk of the combination

> **Design decision:** The Players List is an **ephemeral container** — it has no ID, no URL, and doesn't persist. It's a tool, not a record. This keeps the product accountless while enabling a powerful interactive feature. The Consolidated Insight is computed from the child Player Spotlights, not stored as independent content.

---

## Object Relationships

```
Week (parent)
 └── has many → Game (primary object)
                  ├── has two → Team (via junction: home/away)
                  ├── has many → Player Spotlight (child, 5-6 per game, split by team)
                  ├── has one → The Story (local attribute)
                  ├── has one → Odds Translation (local attribute)
                  └── has one → The Takeaway (local attribute)

Team (independent)
 └── has many → Player Spotlight (scoped to game context)

Players List (ephemeral)
 └── has many → Player Spotlight (selected across games)
 └── has one → Consolidated Insight (computed local attribute)
```

### Relationship types:
- **Week → Game**: Parent/child. Games are always scoped to a week.
- **Game → Team**: Junction (many-to-many with context). The junction carries home/away designation.
- **Game → Player Spotlight**: Parent/child. Player Spotlights only exist within a game.
- **Team → Player Spotlight**: Inheritance. A Player Spotlight inherits team identity but is scoped to the game.
- **Players List → Player Spotlight**: Selection. Ephemeral grouping — same objects, different surface. No new content created.
- **Players List → Consolidated Insight**: Computed. Generated from the grouped players' attributes.

---

## Object Hierarchy (Tree)

```
Before You Bet
├── Week 12 (2024 NFL Season)
│   ├── Game: Chiefs @ Bills
│   │   ├── Team: Kansas City Chiefs (away)
│   │   ├── Team: Buffalo Bills (home)
│   │   ├── The Story: "Two AFC heavyweights meet in..."
│   │   ├── Odds Translation: "Vegas thinks Buffalo wins by..."
│   │   ├── Player Spotlight: Patrick Mahomes (QB, KC)
│   │   ├── Player Spotlight: Kareem Hunt (RB, KC)
│   │   ├── Player Spotlight: Travis Kelce (TE, KC)
│   │   ├── Player Spotlight: Josh Allen (QB, BUF)
│   │   ├── Player Spotlight: James Cook (RB, BUF)
│   │   ├── Player Spotlight: Khalil Shakir (WR, BUF)
│   │   └── The Takeaway: "..."
│   ├── Game: Cowboys @ Commanders
│   └── Game: Eagles @ Rams
│
└── Players List (ephemeral, session-scoped)
    ├── Selected: Patrick Mahomes
    ├── Selected: CeeDee Lamb
    ├── Selected: Saquon Barkley
    └── Consolidated Insight: "You're mixing a strong QB in a
        tight game with a WR limited by his backup QB and a
        dominant RB. Barkley is the safest pick here — Lamb
        is the risk."
```

---

## Decisions & Rationale

| Question | Decision | Why |
|----------|----------|-----|
| Are insights a standalone object? | No — they're local attributes of Game and Player Spotlight | They have no independent identity, no CTAs, and never surface outside their parent context |
| Does "The Takeaway" need its own object? | No — it's a Game attribute | One sentence, no CTAs, always coupled to the game |
| Are odds/lines their own object? | No — they're Game attributes, translated via Odds Translation | In the MVP, odds don't need independent behavior. They're inputs to the translation layer |
| Is Player Spotlight the same as Player? | No — it's a context-dependent child | A Player profile would imply cross-game data. Player Spotlight is scoped to one game's narrative |
| Should Players List persist? | No — ephemeral, session-scoped | Persistence requires accounts. The value is in the moment of decision, not in history. |
| Should Consolidated Insight be pre-written? | No — computed from grouped players | Every combination of players is unique. The insight adapts to the selection. |
| Should players on the Players tab link to game detail? | Yes — tapping a player's matchup context links to the full game page | Bridges the two intents without duplicating content |

---

## What This Model Enables

- **Two intents, one system.** Matchups tab for game bettors, Players tab for parlay/fantasy users. Same underlying Player Spotlight objects, different surfaces.
- **No new content needed for Players.** Player Spotlights already exist — the tab just re-surfaces them with search and grouping.
- **Scalable.** Add games by adding Game objects with their children. Add players to the searchable pool automatically.
- **Future extensibility.** Players List could persist with accounts. Consolidated Insights could become shareable. The foundation supports growth without refactoring.

# Content Model — Before You Bet

*What content lives where, what shape it takes, and why. This model ensures every piece of content has a clear purpose, consistent structure, and defined relationship to the OOUX object model.*

---

## Content Types

### Game Card Insight
- **Parent object:** Game
- **Where:** Homepage game card
- **Length:** 1 sentence (max ~15 words)
- **Voice:** Punchy, intriguing
- **Purpose:** Give Susan a reason to click into this game
- **Example:** *"Buffalo's defense has been dominant, but Mahomes owns primetime."*

### The Story
- **Parent object:** Game (local attribute)
- **Where:** Game detail page, Section 1
- **Length:** 2-3 sentences
- **Voice:** Narrative, conversational — like a friend catching you up
- **Purpose:** Set the stage. Why should Susan care about this game?
- **Inputs:** Team records, recent form, rivalry context, stakes (playoff implications, division game, etc.)
- **Example:** *"The Chiefs roll into Buffalo riding a 5-game win streak, but the Bills haven't lost at home since Week 3. This is the game of the week — two teams that'll likely meet again in January."*

### Odds Translation
- **Parent object:** Game (local attribute)
- **Where:** Game detail page, Section 2
- **Length:** 3-4 bullet points
- **Voice:** Explanatory, confident — teacher mode
- **Purpose:** Translate spread, over/under, and moneyline into plain English
- **Structure per bullet:**
  - **The line** (what the number is)
  - **The translation** (what it means in English)
  - **The implication** (what it suggests about how the game will play out)
- **Example:**
  - *"Bills -3.5 → Vegas thinks Buffalo wins by about a field goal. It's close — this isn't a blowout pick."*
  - *"Over/Under 48.5 → They expect a lot of scoring. Both offenses are elite, and neither defense has been shutting teams down lately."*

### Player Spotlight
- **Parent object:** Player Spotlight (child of Game)
- **Where:** Game detail page, Section 3
- **Length:** 4 attributes per player, 5-6 players per game (split across both teams, covering QB/RB/WR/TE)
- **Voice:** Direct, actionable — no fluff
- **Purpose:** Tell Susan which players matter for this game and why — especially for player parlays
- **Structure per player:**
  | Field | Purpose | Example |
  |-------|---------|---------|
  | What's Going On | Current situation/context | *"Mahomes has thrown 12 TDs and 0 INTs in his last 4 games."* |
  | What It Means | Impact on this specific game | *"He's in peak form against a Bills secondary that's been giving up big plays."* |
  | Expectation | Projected performance, plain English | *"Expect a big game — 280+ yards and 2-3 touchdowns is realistic."* |
  | Why It Matters | Relevance to Susan's decision | *"If you're considering a Chiefs bet, Mahomes' form is the main reason to feel good about it."* |

### The Takeaway
- **Parent object:** Game (local attribute)
- **Where:** Game detail page, Section 4
- **Length:** 1-2 sentences (max ~30 words)
- **Voice:** Bold, clear, actionable — Susan-level simple
- **Purpose:** The "aha" moment. The thing Susan says to her son later: "I read that..."
- **Example:** *"Coin-flip game. Allen is playing better, but you never bet against Mahomes when it matters. Lean Bills at home — but keep the bet small."*

---

## Content Relationships to OOUX Objects

```
Game
├── Game Card Insight (1:1 — homepage representation)
├── The Story (1:1 — local attribute)
├── Odds Translation (1:1 — local attribute, multiple bullets)
├── Player Spotlights (1:many — 5-6 per game, split by team)
│   ├── What's Going On
│   ├── What It Means
│   ├── Expectation
│   └── Why It Matters
└── The Takeaway (1:1 — local attribute)
```

---

## Content Rules
1. No stat without context — every number needs a "so what?"
2. No jargon without translation — if Susan doesn't know the term, explain it inline
3. No opinion without reasoning — confidence comes from evidence, not assertion
4. No section without a "so what?" — if it doesn't help Susan decide, cut it
5. No filler — every sentence earns its place

## Content Volume (MVP)
- 3 games × 1 game card insight = **3 insights**
- 3 games × 1 story = **3 stories**
- 3 games × 3 odds bullets = **9 odds translations**
- 3 games × 6 players × 4 fields = **~72 player spotlight fields**
- 3 games × 1 takeaway = **3 takeaways**
- 3 games × 1 last-updated timestamp = **3 timestamps**
- **Total: ~90 pieces of content**

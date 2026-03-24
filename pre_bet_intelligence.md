# Before You Bet — Portfolio MVP

> “Help people I care about stop losing money on bad sports bets.”

## Project Overview
A clarity layer that translates complex sports data into simple, actionable understanding — so beginner bettors can make informed decisions instead of emotional ones.

This is a **design-forward, content-driven product**. Not a sportsbook. Not a stats database. Not a generic AI tool.

---

## Primary User — "Susan"
**The beginner bettor about to lose money.**
Someone who watches football, enjoys the social side of betting, and places $10-$20 bets multiple times a week — but doesn’t speak the language of odds, lines, and spreads. She’s not reckless. She’s under-informed. She doesn’t need more data. She needs clarity.

---

## Product Principles
1. No accounts — zero friction to value
2. No input required — the product leads, the user follows
3. Curated, not exhaustive — less is more
4. Plain English only — no jargon without translation
5. Every section answers “So what?”
6. Opinionated but not absolute — confident, not reckless
7. Premium editorial feel — trust through craft

---

## MVP Scope
- **Sport:** NFL (mock data from a past week)
- **Pages:**
  - Homepage with two tabs: Matchups + Players
  - Game detail pages (3 games)

---

## Homepage
- Title: **Before You Bet**
- Subtitle: *”Understand what actually matters before you place a bet.”*
- **Matchups tab (default):** Weekly slate with game cards. Each card: teams, spread, one-line insight.
- **Players tab:** Search for players across all games, add them to a temporary check list, get a consolidated insight on the group. Designed for parlay and prop bet evaluation.

---

## Game Page Structure (4 sections)

### 1. The Story
Short narrative context for the matchup. Who’s hot, who’s struggling, what’s at stake.

### 2. What the Odds Really Say
Translate the spread, over/under, and key lines into plain English. This is the product’s differentiator.

### 3. Key Players That Matter
For each key player:
- What’s going on
- What it means for this game
- Expectation
- Why it matters for bettors

### 4. The Takeaway
One clear sentence. The “aha” moment.

---

## Design Direction
- Premium, minimal, modern
- Strong typography as the primary design element
- Clean spacing and hierarchy
- Editorial + fintech feel
- Layout driven by content needs, not trends

---

## Tone
- Clear
- Confident
- Simple
- Human

---

## Tech
- Next.js (App Router)
- Static pages
- Hardcoded/mock data
- Deploy on Vercel

Routes:
- `/` → homepage
- `/games/[slug]` → game detail pages

---

## Constraints
- No auth
- No backend
- No live data
- No betting calculator
- No dashboards

---

## Success Criteria
The product should feel like a real, scalable platform that makes complex sports decisions feel simple and clear at a glance.

# OOUX Object Model Diagram — Before You Bet

```mermaid
graph LR
    WEEK["<b>WEEK</b>
    ─────────────
    <b>Attributes</b>
    – week number
    – season year
    – date range
    – status
    ─────────────
    <b>CTAs</b>
    – Browse matchups
    ─────────────
    <b>Surface</b>
    – Homepage header"]

    GAME["<b>GAME ★ Primary</b>
    ─────────────
    <b>Attributes</b>
    – matchup
    – date / time
    – venue
    – edge (0–100)
    – pick (away / home / toss-up)
    – predicted score
    – last updated
    ─────────────
    <b>CTAs</b>
    – View game detail
    – Share game
    ─────────────
    <b>Local Content</b>
    – The Takeaway
    – The Story
    ─────────────
    <b>Surface</b>
    – Matchups tab → Detail page"]

    TEAM["<b>TEAM</b>
    ─────────────
    <b>Attributes</b>
    – name
    – city
    – abbreviation
    – record
    – logo / color
    – conference
    – division
    ─────────────
    <b>CTAs</b>
    – None (MVP)
    ─────────────
    <b>Surface</b>
    – Game card
    – Detail header"]

    PLAYER["<b>PLAYER SPOTLIGHT</b>
    ─────────────
    <b>Attributes</b>
    – name
    – position
    – team
    – headshot
    – injury status
    ─────────────
    <b>CTAs</b>
    – Add to check list
    ─────────────
    <b>Local Content</b>
    – What's Going On
    – What It Means
    – Expectation
    – Why It Matters
    ─────────────
    <b>Surface</b>
    – Detail Section 3
    – Players tab"]

    CHECKLIST["<b>PLAYERS LIST</b>
    <i>(ephemeral)</i>
    ─────────────
    <b>Attributes</b>
    – selected players
    – player count
    ─────────────
    <b>CTAs</b>
    – Add player (search)
    – Remove player
    – Clear all
    ─────────────
    <b>Computed Content</b>
    – Consolidated Insight
    ─────────────
    <b>Surface</b>
    – Players tab"]

    WEEK -- "has many · parent → child" --> GAME
    GAME -- "has two · junction: home/away" --> TEAM
    GAME -- "has 5-6 · parent → child" --> PLAYER
    TEAM -. "inherits team · inheritance" .-> PLAYER
    PLAYER -- "selected into · ephemeral" --> CHECKLIST

    classDef object fill:#f0f0f0,stroke:#333,stroke-width:2px,color:#1e1e1e
    class WEEK,GAME,TEAM,PLAYER,CHECKLIST object
```

## Legend

| Section | OOUX Meaning |
| --- | --- |
| **Attributes** | Data the object holds |
| **CTAs** | Call to Action — what the user can do with this object |
| **Local Content** | Nested content scoped to this object only |
| **Computed Content** | Generated dynamically from grouped child objects |
| **Surface** | Where this object appears in the UI |

## Relationship Key

| Line Style | OOUX Relationship | Meaning |
| --- | --- | --- |
| Solid → | Parent → Child | One parent owns many children |
| Solid → | Junction | Many-to-many with positional context |
| Solid → | Ephemeral selection | Object selected into a temporary container |
| Dashed ⇢ | Inheritance | Child inherits identity from another object |

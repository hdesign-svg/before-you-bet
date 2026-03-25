"use client";

import { useState } from "react";
import { games, WEEK, type Game } from "@/data/games";
import { teams } from "@/data/teams";
import GameDrawer from "./components/GameDrawer";
import styles from "./page.module.css";

const confidenceLabel: Record<string, string> = {
  lean: "Lean",
  like: "Like",
  love: "Love",
};

const confidenceColor: Record<string, string> = {
  lean: "var(--text-tertiary)",
  like: "var(--caution)",
  love: "var(--positive)",
};

// Group games by timeslot
function groupBySlot(gameList: Game[]) {
  const slots: { label: string; games: Game[] }[] = [];
  const slotMap: Record<string, Game[]> = {};
  const slotLabels: Record<string, string> = {};

  for (const game of gameList) {
    const key = `${game.date} · ${game.time}`;
    if (!slotMap[key]) {
      slotMap[key] = [];
      // Determine day label
      if (game.date.startsWith("Thu")) slotLabels[key] = "Thursday";
      else if (game.date.startsWith("Mon")) slotLabels[key] = "Monday";
      else if (game.time.includes("1:00")) slotLabels[key] = "Sunday Early";
      else if (game.time.includes("4:")) slotLabels[key] = "Sunday Afternoon";
      else if (game.time.includes("8:20")) slotLabels[key] = "Sunday Night";
      else slotLabels[key] = game.date;
    }
    slotMap[key].push(game);
  }

  // Merge into ordered slots with deduped labels
  const seenLabels = new Set<string>();
  for (const key of Object.keys(slotMap)) {
    const label = slotLabels[key];
    if (seenLabels.has(label)) {
      // Append to existing slot with same label
      const existing = slots.find((s) => s.label === label);
      if (existing) existing.games.push(...slotMap[key]);
    } else {
      seenLabels.add(label);
      slots.push({ label, games: slotMap[key] });
    }
  }

  return slots;
}

export default function HomePage() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const slots = groupBySlot(games);

  return (
    <>
      <div className={styles.page}>
        {/* Branded header */}
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.logoMark}>
              <span className={styles.logoIcon}>◆</span>
            </div>
            <div>
              <h1 className={styles.title}>Before You Bet</h1>
              <p className={styles.subtitle}>
                Plain-English betting intelligence
              </p>
            </div>
          </div>
          <div className={styles.weekBadge}>
            <span className={styles.weekLabel}>
              Week {WEEK.number}
            </span>
            <span className={styles.weekDates}>{WEEK.dateRange}</span>
            <span className={styles.updatedBadge}>
              Updated {WEEK.lastUpdated}
            </span>
          </div>
        </header>

        {/* Tab Bar */}
        <nav className={styles.tabBar}>
          <button className={`${styles.tab} ${styles.tabActive}`}>
            Matchups
          </button>
          <button className={styles.tab}>Players</button>
        </nav>

        {/* Game grid by timeslot */}
        <main className={styles.main}>
          {slots.map((slot) => (
            <section key={slot.label} className={styles.slotSection}>
              <div className={styles.slotHeader}>
                <h2 className={styles.slotLabel}>{slot.label}</h2>
                <span className={styles.slotCount}>
                  {slot.games.length} game{slot.games.length > 1 ? "s" : ""}
                </span>
              </div>
              <div className={styles.gameGrid}>
                {slot.games.map((game) => {
                  const away = teams[game.awayAbbr];
                  const home = teams[game.homeAbbr];
                  return (
                    <button
                      key={game.slug}
                      className={styles.gameCard}
                      onClick={() => setSelectedGame(game)}
                    >
                      {/* Team color bar */}
                      <div className={styles.teamColorBar}>
                        <div
                          className={styles.teamColorHalf}
                          style={{ background: away?.color || "#ccc" }}
                        />
                        <div
                          className={styles.teamColorHalf}
                          style={{ background: home?.color || "#ccc" }}
                        />
                      </div>

                      {/* Matchup */}
                      <div className={styles.cardBody}>
                        <div className={styles.matchupRow}>
                          <div className={styles.teamBlock}>
                            <span className={styles.teamAbbr}>
                              {game.awayAbbr}
                            </span>
                            <span className={styles.teamName}>
                              {away?.name || ""}
                            </span>
                          </div>
                          <span className={styles.atSymbol}>@</span>
                          <div className={styles.teamBlock}>
                            <span className={styles.teamAbbr}>
                              {game.homeAbbr}
                            </span>
                            <span className={styles.teamName}>
                              {home?.name || ""}
                            </span>
                          </div>
                        </div>

                        {/* Spread + time */}
                        <div className={styles.cardMeta}>
                          <span className={styles.spreadBadge}>
                            {game.spread}
                          </span>
                          {game.network && (
                            <span className={styles.networkBadge}>
                              {game.network}
                            </span>
                          )}
                        </div>

                        {/* Confidence + insight */}
                        <div className={styles.cardInsight}>
                          <span
                            className={styles.confidenceDot}
                            style={{
                              background:
                                confidenceColor[game.confidence] || "#ccc",
                            }}
                            title={confidenceLabel[game.confidence]}
                          />
                          <p className={styles.insightText}>{game.insight}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </main>

        <footer className={styles.footer}>
          <p>
            Before You Bet is not a sportsbook. Content is for informational
            purposes only.
          </p>
        </footer>
      </div>

      {/* Game detail drawer */}
      <GameDrawer
        game={selectedGame}
        onClose={() => setSelectedGame(null)}
      />
    </>
  );
}

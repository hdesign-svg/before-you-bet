"use client";

import { useState } from "react";
import Image from "next/image";
import { games, WEEK, type Game } from "@/data/games";
import { teams } from "@/data/teams";
import GameDrawer from "./components/GameDrawer";
import styles from "./page.module.css";

// Group games by day slot
function groupByDay(gameList: Game[]) {
  const order = ["Thursday", "Sunday Early", "Sunday Afternoon", "Sunday Night", "Monday"];
  const map: Record<string, Game[]> = {};

  for (const game of gameList) {
    let label: string;
    if (game.date.startsWith("Thu")) label = "Thursday";
    else if (game.date.startsWith("Mon")) label = "Monday";
    else if (game.time.includes("8:20") || game.time.includes("8:15")) {
      label = game.date.startsWith("Thu") ? "Thursday" : game.date.startsWith("Mon") ? "Monday" : "Sunday Night";
    } else if (game.time.includes("4:")) label = "Sunday Afternoon";
    else label = "Sunday Early";

    if (!map[label]) map[label] = [];
    map[label].push(game);
  }

  return order.filter((l) => map[l]).map((label) => ({ label, games: map[label] }));
}

export default function HomePage() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const slots = groupByDay(games);

  return (
    <>
      <div className={styles.page}>
        {/* ── Masthead ── */}
        <header className={styles.masthead}>
          <h1 className={styles.brandName}>Before You Bet</h1>
          <p className={styles.tagline}>Cut through the noise.</p>
        </header>

        {/* ── Week context bar ── */}
        <div className={styles.contextBar}>
          <div className={styles.contextLeft}>
            <span className={styles.weekLabel}>Week {WEEK.number}</span>
            <span className={styles.weekDates}>{WEEK.dateRange}</span>
          </div>
          <span className={styles.updatedPill}>
            Updated {WEEK.lastUpdated}
          </span>
        </div>

        {/* ── Tab Bar ── */}
        <nav className={styles.tabBar}>
          <button className={`${styles.tab} ${styles.tabActive}`}>
            Matchups
          </button>
          <button className={styles.tab}>Players</button>
        </nav>

        {/* ── Game grid ── */}
        <main className={styles.main}>
          {slots.map((slot) => (
            <section key={slot.label} className={styles.daySection}>
              <h2 className={styles.dayLabel}>{slot.label}</h2>
              <div className={styles.grid}>
                {slot.games.map((game, i) => {
                  const away = teams[game.awayAbbr];
                  const home = teams[game.homeAbbr];
                  return (
                    <button
                      key={game.slug}
                      className={styles.card}
                      onClick={() => setSelectedGame(game)}
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      {/* Team logos + matchup */}
                      <div className={styles.matchup}>
                        <div className={styles.team}>
                          <Image
                            src={away?.logo || ""}
                            alt={away?.name || game.awayAbbr}
                            width={48}
                            height={48}
                            className={styles.teamLogo}
                            unoptimized
                          />
                          <span className={styles.teamAbbr}>{game.awayAbbr}</span>
                        </div>
                        <span className={styles.vs}>@</span>
                        <div className={styles.team}>
                          <Image
                            src={home?.logo || ""}
                            alt={home?.name || game.homeAbbr}
                            width={48}
                            height={48}
                            className={styles.teamLogo}
                            unoptimized
                          />
                          <span className={styles.teamAbbr}>{game.homeAbbr}</span>
                        </div>
                      </div>

                      {/* Spread + time */}
                      <div className={styles.cardFooter}>
                        <span className={styles.spread}>{game.spread}</span>
                        <span className={styles.time}>{game.time}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </main>

        <footer className={styles.footer}>
          <p>Not a sportsbook. For informational purposes only.</p>
        </footer>
      </div>

      {/* Game drawer */}
      <GameDrawer game={selectedGame} onClose={() => setSelectedGame(null)} />
    </>
  );
}

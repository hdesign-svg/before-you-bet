"use client";

import { useState } from "react";
import Image from "next/image";
import { games, WEEK, type Game } from "@/data/games";
import { teams } from "@/data/teams";
import GameModal from "./components/GameModal";
import styles from "./page.module.css";

function groupByDay(gameList: Game[]) {
  const order = ["Thursday", "Sunday Early", "Sunday Afternoon", "Sunday Night", "Monday"];
  const map: Record<string, Game[]> = {};

  for (const game of gameList) {
    let label: string;
    if (game.date.startsWith("Thu")) label = "Thursday";
    else if (game.date.startsWith("Mon")) label = "Monday";
    else if (game.time.includes("8:20") || game.time.includes("8:15")) {
      label = game.date.startsWith("Mon") ? "Monday" : "Sunday Night";
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
          <p className={styles.tagline}>
            Understand every game in 60 seconds.
          </p>
        </header>

        {/* ── Week bar ── */}
        <div className={styles.weekBar}>
          <div className={styles.weekLeft}>
            <span className={styles.weekNum}>Week {WEEK.number}</span>
            <span className={styles.weekDates}>{WEEK.dateRange}</span>
          </div>
          <span className={styles.updated}>Updated {WEEK.lastUpdated}</span>
        </div>

        {/* ── Tabs ── */}
        <nav className={styles.tabs}>
          <button className={`${styles.tab} ${styles.tabActive}`}>
            Matchups
          </button>
          <button className={styles.tab}>Players</button>
        </nav>

        {/* ── Games ── */}
        <main className={styles.main}>
          {slots.map((slot) => (
            <section key={slot.label} className={styles.dayGroup}>
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
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div className={styles.logos}>
                        <div className={styles.teamSide}>
                          <Image
                            src={away?.logo || ""}
                            alt={away?.name || game.awayAbbr}
                            width={44}
                            height={44}
                            className={styles.logo}
                            unoptimized
                          />
                          <span className={styles.abbr}>{game.awayAbbr}</span>
                        </div>
                        <span className={styles.at}>@</span>
                        <div className={styles.teamSide}>
                          <Image
                            src={home?.logo || ""}
                            alt={home?.name || game.homeAbbr}
                            width={44}
                            height={44}
                            className={styles.logo}
                            unoptimized
                          />
                          <span className={styles.abbr}>{game.homeAbbr}</span>
                        </div>
                      </div>
                      <div className={styles.cardMeta}>
                        <span className={styles.spread}>{game.spread}</span>
                        <span className={styles.dot}>·</span>
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

      <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { games, WEEK, type Game } from "@/data/games";
import { teams } from "@/data/teams";
import { Sun, Moon } from "lucide-react";
import GameDrawer from "./components/GameDrawer";
import styles from "./page.module.css";

function groupByDay(gameList: Game[]) {
  const order = [
    "Thursday Night",
    "Sunday Early",
    "Sunday Afternoon",
    "Sunday Night",
    "Monday Night",
  ];
  const map: Record<string, Game[]> = {};

  for (const game of gameList) {
    let label: string;
    if (game.date.startsWith("Thu")) label = "Thursday Night";
    else if (game.date.startsWith("Mon")) label = "Monday Night";
    else if (game.time.includes("8:20") || game.time.includes("8:15")) {
      label = game.date.startsWith("Mon") ? "Monday Night" : "Sunday Night";
    } else if (game.time.includes("4:")) label = "Sunday Afternoon";
    else label = "Sunday Early";

    if (!map[label]) map[label] = [];
    map[label].push(game);
  }

  return order.filter((l) => map[l]).map((label) => ({ label, games: map[label] }));
}

export default function HomePage() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const slots = groupByDay(games);

  useEffect(() => {
    const saved = localStorage.getItem("byb-theme");
    if (saved === "light") setTheme("light");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("byb-theme", next);
  };

  return (
    <>
      <div className={styles.page}>
        {/* ── Header ── */}
        <header className={styles.header}>
          <div>
            <h1 className={styles.brandName}>Before You Bet</h1>
            <p className={styles.tagline}>Understand your bets in minutes.</p>
          </div>
          <button
            className={styles.themeBtn}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </header>

        {/* ── Week + updated ── */}
        <div className={styles.weekRow}>
          <div className={styles.weekLeft}>
            <span className={styles.weekLabel}>Week {WEEK.number}</span>
            <span className={styles.weekDates}>{WEEK.dateRange}</span>
          </div>
          <span className={styles.updated}>
            <span className={styles.dot} />
            {WEEK.lastUpdated}
          </span>
        </div>

        {/* ── Tabs ── */}
        <nav className={styles.tabs}>
          <button className={`${styles.tab} ${styles.tabActive}`}>Matchups</button>
          <button className={styles.tab}>Players</button>
        </nav>

        {/* ── Game grid ── */}
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
                      style={{ animationDelay: `${i * 40}ms` }}
                    >
                      <div className={styles.cardTeams}>
                        <div className={styles.cardSide}>
                          <Image
                            src={away?.logo || ""}
                            alt={away?.name || game.awayAbbr}
                            width={40}
                            height={40}
                            className={styles.cardLogo}
                            unoptimized
                          />
                          <span className={styles.cardAbbr}>{game.awayAbbr}</span>
                        </div>
                        <span className={styles.cardAt}>@</span>
                        <div className={styles.cardSide}>
                          <Image
                            src={home?.logo || ""}
                            alt={home?.name || game.homeAbbr}
                            width={40}
                            height={40}
                            className={styles.cardLogo}
                            unoptimized
                          />
                          <span className={styles.cardAbbr}>{home?.abbr || game.homeAbbr}</span>
                        </div>
                      </div>

                      <div className={styles.cardInfo}>
                        <span className={styles.cardSpread}>{game.spread}</span>
                        <span className={styles.cardTime}>{game.time}</span>
                      </div>

                      <p className={styles.cardInsight}>{game.insight}</p>
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

      <GameDrawer game={selectedGame} onClose={() => setSelectedGame(null)} />
    </>
  );
}

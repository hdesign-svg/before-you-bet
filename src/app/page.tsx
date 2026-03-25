"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { games, WEEK, type Game } from "@/data/games";
import { teams } from "@/data/teams";
import {
  Sun,
  Moon,
  CircleDot,
  Clock,
  ChevronRight,
} from "lucide-react";
import GameDrawer from "./components/GameDrawer";
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
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const slots = groupByDay(games);

  useEffect(() => {
    const saved = localStorage.getItem("byb-theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("byb-theme", next);
  };

  return (
    <>
      <div className={styles.page}>
        {/* ── Masthead ── */}
        <header className={styles.masthead}>
          <div className={styles.mastheadTop}>
            <div>
              <h1 className={styles.brandName}>
                <span className={styles.brandIcon}>&#9632;</span>
                Before You Bet
              </h1>
              <p className={styles.tagline}>Understand your bets in minutes.</p>
            </div>
            <button
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </header>

        {/* ── Week bar ── */}
        <div className={styles.weekBar}>
          <div className={styles.weekLeft}>
            <span className={styles.weekBadge}>Week {WEEK.number}</span>
            <span className={styles.weekDates}>{WEEK.dateRange}</span>
          </div>
          <div className={styles.syncBadge}>
            <span className={styles.syncDot} />
            <span className={styles.syncText}>Synced {WEEK.lastUpdated}</span>
          </div>
        </div>

        {/* ── Tabs ── */}
        <nav className={styles.tabs}>
          <button className={`${styles.tab} ${styles.tabActive}`}>
            <CircleDot size={14} />
            Matchups
          </button>
          <button className={styles.tab}>
            Players
          </button>
        </nav>

        {/* ── Games ── */}
        <main className={styles.main}>
          {slots.map((slot) => (
            <section key={slot.label} className={styles.dayGroup}>
              <h2 className={styles.dayLabel}>
                <Clock size={12} />
                {slot.label}
              </h2>
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
                      <div className={styles.cardInner}>
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
                          <div className={styles.vsBlock}>
                            <span className={styles.at}>@</span>
                          </div>
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

                        <div className={styles.cardChips}>
                          <span className={styles.chipSpread}>{game.spread}</span>
                          <span className={styles.chipTime}>{game.time}</span>
                        </div>

                        <p className={styles.cardInsight}>{game.insight}</p>
                      </div>

                      <div className={styles.cardFooter}>
                        <span className={styles.readMore}>Read breakdown</span>
                        <ChevronRight size={14} className={styles.readMoreIcon} />
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

      <GameDrawer game={selectedGame} onClose={() => setSelectedGame(null)} />
    </>
  );
}

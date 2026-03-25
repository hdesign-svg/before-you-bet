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

  // Featured game = first game
  const featured = games[0];
  const featAway = teams[featured.awayAbbr];
  const featHome = teams[featured.homeAbbr];

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
        {/* ── Top bar ── */}
        <header className={styles.topBar}>
          <div className={styles.brand}>
            <h1 className={styles.brandName}>Before You Bet</h1>
            <span className={styles.weekPill}>Week {WEEK.number}</span>
          </div>
          <div className={styles.topRight}>
            <span className={styles.updated}>
              <span className={styles.updatedDot} />
              {WEEK.lastUpdated}
            </span>
            <button
              className={styles.themeBtn}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </header>

        {/* ── Featured hero ── */}
        <section
          className={styles.hero}
          onClick={() => setSelectedGame(featured)}
        >
          <div className={styles.heroContent}>
            <span className={styles.heroLabel}>Featured Matchup</span>
            <div className={styles.heroMatchup}>
              <div className={styles.heroTeam}>
                <Image
                  src={featAway?.logo || ""}
                  alt={featAway?.name || featured.awayAbbr}
                  width={72}
                  height={72}
                  className={styles.heroLogo}
                  unoptimized
                />
                <div className={styles.heroTeamInfo}>
                  <span className={styles.heroAbbr}>{featured.awayAbbr}</span>
                  <span className={styles.heroCity}>{featAway?.city} {featAway?.name}</span>
                </div>
              </div>
              <div className={styles.heroVs}>
                <span className={styles.heroSpread}>{featured.spread}</span>
                <span className={styles.heroTime}>{featured.date} · {featured.time}</span>
              </div>
              <div className={styles.heroTeam}>
                <Image
                  src={featHome?.logo || ""}
                  alt={featHome?.name || featured.homeAbbr}
                  width={72}
                  height={72}
                  className={styles.heroLogo}
                  unoptimized
                />
                <div className={styles.heroTeamInfo}>
                  <span className={styles.heroAbbr}>{featured.homeAbbr}</span>
                  <span className={styles.heroCity}>{featHome?.city} {featHome?.name}</span>
                </div>
              </div>
            </div>
            <p className={styles.heroInsight}>{featured.insight}</p>
          </div>
          <span className={styles.heroCta}>Read breakdown →</span>
        </section>

        {/* ── Tabs ── */}
        <nav className={styles.tabs}>
          <button className={`${styles.tab} ${styles.tabActive}`}>Matchups</button>
          <button className={styles.tab}>Players</button>
        </nav>

        {/* ── Horizontal scroll rows ── */}
        <main className={styles.main}>
          {slots.map((slot) => (
            <section key={slot.label} className={styles.row}>
              <div className={styles.rowHeader}>
                <h2 className={styles.rowLabel}>{slot.label}</h2>
                <span className={styles.rowCount}>{slot.games.length} games</span>
              </div>
              <div className={styles.scroll}>
                {slot.games.map((game, i) => {
                  const away = teams[game.awayAbbr];
                  const home = teams[game.homeAbbr];
                  if (game.slug === featured.slug) return null;
                  return (
                    <button
                      key={game.slug}
                      className={styles.tile}
                      onClick={() => setSelectedGame(game)}
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <div className={styles.tileTeams}>
                        <div className={styles.tileSide}>
                          <Image
                            src={away?.logo || ""}
                            alt={away?.name || game.awayAbbr}
                            width={40}
                            height={40}
                            className={styles.tileLogo}
                            unoptimized
                          />
                          <span className={styles.tileAbbr}>{game.awayAbbr}</span>
                        </div>
                        <span className={styles.tileAt}>@</span>
                        <div className={styles.tileSide}>
                          <Image
                            src={home?.logo || ""}
                            alt={home?.name || game.homeAbbr}
                            width={40}
                            height={40}
                            className={styles.tileLogo}
                            unoptimized
                          />
                          <span className={styles.tileAbbr}>{game.homeAbbr}</span>
                        </div>
                      </div>
                      <div className={styles.tileMeta}>
                        <span className={styles.tileSpread}>{game.spread}</span>
                        <span className={styles.tileDot}>·</span>
                        <span className={styles.tileTime}>{game.time}</span>
                      </div>
                      <p className={styles.tileInsight}>{game.insight}</p>
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

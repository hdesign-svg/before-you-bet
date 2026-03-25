"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { games, WEEK, type Game, type PlayerSpotlight } from "@/data/games";
import { teams } from "@/data/teams";
import { Sun, Moon } from "lucide-react";
import styles from "./page.module.css";

function groupByDay(gameList: Game[]) {
  const order = ["Thursday Night", "Sunday Early", "Sunday Afternoon", "Sunday Night", "Monday Night"];
  const map: Record<string, Game[]> = {};
  for (const game of gameList) {
    let label: string;
    if (game.date.startsWith("Thu")) label = "Thursday Night";
    else if (game.date.startsWith("Mon")) label = "Monday Night";
    else if (game.time.includes("8:20") || game.time.includes("8:15"))
      label = game.date.startsWith("Mon") ? "Monday Night" : "Sunday Night";
    else if (game.time.includes("4:")) label = "Sunday Afternoon";
    else label = "Sunday Early";
    if (!map[label]) map[label] = [];
    map[label].push(game);
  }
  return order.filter((l) => map[l]).map((label) => ({ label, games: map[label] }));
}

function PlayerCard({ player }: { player: PlayerSpotlight }) {
  return (
    <div className={styles.playerCard}>
      <div className={styles.playerHeader}>
        <span className={styles.playerName}>{player.name}</span>
        <span className={styles.playerPos}>{player.position}</span>
      </div>
      <p className={styles.playerVerdict}>{player.verdict}</p>
      <p className={styles.playerDetail}>{player.detail}</p>
      <div className={styles.playerProj}>
        <span className={styles.projLabel}>Projection</span>
        <span className={styles.projVal}>{player.expectation}</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [selected, setSelected] = useState<Game | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const detailRef = useRef<HTMLDivElement>(null);
  const slots = groupByDay(games);

  useEffect(() => {
    if (localStorage.getItem("byb-theme") === "light") setTheme("light");
  }, []);

  useEffect(() => {
    if (selected && detailRef.current) detailRef.current.scrollTop = 0;
  }, [selected]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "light") document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("byb-theme", next);
  };

  const sel = selected;
  const away = sel ? teams[sel.awayAbbr] : null;
  const home = sel ? teams[sel.homeAbbr] : null;

  return (
    <div className={styles.shell}>
      {/* ════════ LEFT: Game list ════════ */}
      <aside className={styles.sidebar}>
        <header className={styles.sideHeader}>
          <div>
            <h1 className={styles.brand}>Before You Bet</h1>
            <p className={styles.tagline}>Understand your bets in minutes</p>
          </div>
          <button className={styles.themeBtn} onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </header>

        <div className={styles.sideInfo}>
          <span className={styles.weekLabel}>Week {WEEK.number}</span>
          <span className={styles.weekDates}>{WEEK.dateRange}</span>
          <span className={styles.syncDot} />
        </div>

        <nav className={styles.gameList}>
          {slots.map((slot) => (
            <div key={slot.label} className={styles.slotGroup}>
              <h2 className={styles.slotLabel}>{slot.label}</h2>
              {slot.games.map((game) => {
                const a = teams[game.awayAbbr];
                const h = teams[game.homeAbbr];
                const active = sel?.slug === game.slug;
                return (
                  <button
                    key={game.slug}
                    className={`${styles.gameRow} ${active ? styles.gameRowActive : ""}`}
                    onClick={() => setSelected(game)}
                  >
                    <div className={styles.gameTeams}>
                      <Image src={a?.logo || ""} alt={game.awayAbbr} width={28} height={28} className={styles.gameLogo} unoptimized />
                      <span className={styles.gameAbbr}>{game.awayAbbr}</span>
                      <span className={styles.gameAt}>@</span>
                      <span className={styles.gameAbbr}>{game.homeAbbr}</span>
                      <Image src={h?.logo || ""} alt={game.homeAbbr} width={28} height={28} className={styles.gameLogo} unoptimized />
                    </div>
                    <div className={styles.gameMeta}>
                      <span className={styles.gameSpread}>{game.spread}</span>
                      <span className={styles.gameTime}>{game.time}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <footer className={styles.sideFooter}>
          <p>Not a sportsbook. Informational only.</p>
        </footer>
      </aside>

      {/* ════════ RIGHT: Detail panel ════════ */}
      <main className={styles.detail} ref={detailRef}>
        {!sel ? (
          <div className={styles.empty}>
            <h2 className={styles.emptyTitle}>Select a game</h2>
            <p className={styles.emptyText}>Choose a matchup from the left to see the full breakdown.</p>
          </div>
        ) : (
          <article className={styles.breakdown}>
            {/* ── Matchup header ── */}
            <header className={styles.matchupHeader}>
              <div className={styles.matchupTeam}>
                <Image src={away?.logo || ""} alt={sel.awayAbbr} width={64} height={64} className={styles.matchupLogo} unoptimized />
                <div className={styles.matchupTeamInfo}>
                  <span className={styles.matchupAbbr}>{sel.awayAbbr}</span>
                  <span className={styles.matchupCity}>{away?.city} {away?.name}</span>
                </div>
              </div>
              <div className={styles.matchupCenter}>
                <span className={styles.matchupSpread}>{sel.spread}</span>
                <span className={styles.matchupMeta}>{sel.date} · {sel.time}</span>
                <span className={styles.matchupOU}>O/U {sel.overUnder}</span>
              </div>
              <div className={styles.matchupTeam}>
                <Image src={home?.logo || ""} alt={sel.homeAbbr} width={64} height={64} className={styles.matchupLogo} unoptimized />
                <div className={styles.matchupTeamInfo}>
                  <span className={styles.matchupAbbr}>{sel.homeAbbr}</span>
                  <span className={styles.matchupCity}>{home?.city} {home?.name}</span>
                </div>
              </div>
            </header>

            {/* ── The Bottom Line ── */}
            <section className={styles.takeaway}>
              <span className={styles.takeawayTag}>The Bottom Line</span>
              <p className={styles.takeawayText}>{sel.takeaway}</p>
            </section>

            {/* ── Content grid ── */}
            <div className={styles.contentGrid}>
              {/* Story */}
              <section className={styles.contentBlock}>
                <h3 className={styles.blockTitle}>The Story</h3>
                <p className={styles.blockBody}>{sel.story}</p>
              </section>

              {/* Numbers */}
              <section className={styles.contentBlock}>
                <h3 className={styles.blockTitle}>What the Numbers Mean</h3>
                <div className={styles.oddsList}>
                  {sel.oddsExplained.map((line, i) => (
                    <p key={i} className={styles.oddsLine}>{line}</p>
                  ))}
                </div>
              </section>
            </div>

            {/* ── Players ── */}
            <section className={styles.playersSection}>
              <h3 className={styles.blockTitle}>Players to Watch</h3>
              <div className={styles.playersGrid}>
                {sel.awayPlayers.length > 0 && (
                  <div className={styles.playersCol}>
                    <h4 className={styles.teamGroupLabel}>{away?.city} {away?.name}</h4>
                    {sel.awayPlayers.map((p) => <PlayerCard key={p.name} player={p} />)}
                  </div>
                )}
                {sel.homePlayers.length > 0 && (
                  <div className={styles.playersCol}>
                    <h4 className={styles.teamGroupLabel}>{home?.city} {home?.name}</h4>
                    {sel.homePlayers.map((p) => <PlayerCard key={p.name} player={p} />)}
                  </div>
                )}
              </div>
            </section>

            {/* ── Detail footer ── */}
            <footer className={styles.detailFooter}>
              <span className={styles.syncDot} />
              <span>Updated {sel.lastUpdated}</span>
            </footer>
          </article>
        )}
      </main>
    </div>
  );
}

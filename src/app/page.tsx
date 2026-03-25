"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { games, WEEK, type Game, type PlayerSpotlight } from "@/data/games";
import { teams } from "@/data/teams";
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

function PlayerRow({ player }: { player: PlayerSpotlight }) {
  return (
    <div className={styles.playerRow}>
      <div className={styles.playerTop}>
        <span className={styles.playerName}>{player.name}</span>
        <span className={styles.playerPos}>{player.position}</span>
      </div>
      <p className={styles.playerVerdict}>{player.verdict}</p>
      <span className={styles.playerProj}>{player.projection}</span>
    </div>
  );
}

export default function HomePage() {
  const [selected, setSelected] = useState<Game | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const slots = groupByDay(games);

  useEffect(() => {
    if (selected && detailRef.current) detailRef.current.scrollTop = 0;
  }, [selected]);

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
        </header>

        <div className={styles.sideInfo}>
          <span className={styles.weekLabel}>Week {WEEK.number}</span>
          <span className={styles.weekDates}>{WEEK.dateRange}</span>
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
                    <span className={styles.gameTime}>{game.date} · {game.time}</span>
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
            <h2 className={styles.emptyTitle}>Your bets, explained simply.</h2>
            <p className={styles.emptyText}>
              Pick a game on the left and we'll break it down in plain English — who's likely to win,
              which players to watch, and whether the numbers in your betting app actually make sense.
            </p>
            <p className={styles.emptySubtext}>No jargon. No confusion. Just clarity before you place a bet.</p>
          </div>
        ) : (
          <article className={styles.breakdown}>
            {/* ── Matchup header ── */}
            <header className={styles.matchupHeader}>
              <div className={styles.matchupTeam}>
                <Image src={away?.logo || ""} alt={sel.awayAbbr} width={56} height={56} className={styles.matchupLogo} unoptimized />
                <div className={styles.matchupTeamInfo}>
                  <span className={styles.matchupAbbr}>{sel.awayAbbr}</span>
                  <span className={styles.matchupCity}>{away?.city} {away?.name}</span>
                </div>
              </div>
              <div className={styles.matchupCenter}>
                <span className={styles.matchupAt}>at</span>
                <span className={styles.matchupMeta}>{sel.date} · {sel.time}</span>
              </div>
              <div className={styles.matchupTeam}>
                <Image src={home?.logo || ""} alt={sel.homeAbbr} width={56} height={56} className={styles.matchupLogo} unoptimized />
                <div className={styles.matchupTeamInfo}>
                  <span className={styles.matchupAbbr}>{sel.homeAbbr}</span>
                  <span className={styles.matchupCity}>{home?.city} {home?.name}</span>
                </div>
              </div>
            </header>

            {/* ── Headline + Rundown (unified section) ── */}
            <section className={styles.insight}>
              <h2 className={styles.headline}>{sel.headline}</h2>
              <ul className={styles.rundown}>
                {sel.rundown.map((bullet, i) => (
                  <li key={i} className={styles.rundownItem}>{bullet}</li>
                ))}
              </ul>
            </section>

            {/* ── Players ── */}
            <section className={styles.playersSection}>
              <h3 className={styles.sectionTitle}>Players to Watch</h3>
              <div className={styles.playersGrid}>
                {sel.awayPlayers.length > 0 && (
                  <div className={styles.playersCol}>
                    <h4 className={styles.teamGroupLabel}>{away?.city} {away?.name}</h4>
                    {sel.awayPlayers.map((p) => <PlayerRow key={p.name} player={p} />)}
                  </div>
                )}
                {sel.homePlayers.length > 0 && (
                  <div className={styles.playersCol}>
                    <h4 className={styles.teamGroupLabel}>{home?.city} {home?.name}</h4>
                    {sel.homePlayers.map((p) => <PlayerRow key={p.name} player={p} />)}
                  </div>
                )}
              </div>
            </section>

            {/* ── Footer ── */}
            <footer className={styles.detailFooter}>
              <span>Updated {sel.lastUpdated}</span>
            </footer>
          </article>
        )}
      </main>
    </div>
  );
}

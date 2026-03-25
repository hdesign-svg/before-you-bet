"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { games, WEEK, type Game, type PlayerSpotlight } from "@/data/games";
import { teams } from "@/data/teams";
import { getPlayerHeadshot } from "@/data/players";
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

/** Blend a hex color toward white by a given amount (0–1) */
function lighten(hex: string, amount: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const nr = Math.round(r + (255 - r) * amount);
  const ng = Math.round(g + (255 - g) * amount);
  const nb = Math.round(b + (255 - b) * amount);
  return `rgb(${nr}, ${ng}, ${nb})`;
}

function PlayerRow({ player }: { player: PlayerSpotlight }) {
  const headshot = getPlayerHeadshot(player.name);
  return (
    <div className={styles.playerRow}>
      <div className={styles.playerTop}>
        {headshot && (
          <Image src={headshot} alt={player.name} width={44} height={32} className={styles.playerHeadshot} unoptimized />
        )}
        <div className={styles.playerMeta}>
          <span className={styles.playerName}>{player.name}</span>
          <span className={styles.playerPos}>{player.position}</span>
        </div>
      </div>
      <p className={styles.playerVerdict}>{player.verdict}</p>
      <div className={styles.playerProjWrap}>
        <span className={styles.playerProj}>{player.projection}</span>
      </div>
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

  // Build gradient from both teams' colors
  const gradientStyle = useMemo(() => {
    if (!away || !home) return {};
    const c1 = lighten(away.color, 0.35);
    const c2 = lighten(home.color, 0.35);
    return {
      background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
    };
  }, [away, home]);

  return (
    <div className={styles.shell}>
      {/* ════════ LEFT: Game list ════════ */}
      <aside className={styles.sidebar}>
        <header className={styles.sideHeader}>
          <h1 className={styles.brand}>Before You Bet</h1>
          <p className={styles.tagline}>Plain-English game breakdowns</p>
        </header>

        <div className={styles.sideInfo}>
          <span className={styles.weekLabel}>Week {WEEK.number}</span>
          <span className={styles.weekDivider}>/</span>
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
                      <Image src={a?.logo || ""} alt={game.awayAbbr} width={24} height={24} className={styles.gameLogo} unoptimized />
                      <span className={styles.gameAbbr}>{game.awayAbbr}</span>
                      <span className={styles.gameAt}>@</span>
                      <span className={styles.gameAbbr}>{game.homeAbbr}</span>
                      <Image src={h?.logo || ""} alt={game.homeAbbr} width={24} height={24} className={styles.gameLogo} unoptimized />
                    </div>
                    <span className={styles.gameTime}>{game.time}</span>
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
      <main
        className={styles.detail}
        ref={detailRef}
        style={sel ? gradientStyle : undefined}
      >
        {!sel ? (
          <div className={styles.empty}>
            <span className={styles.emptyEmoji}>🧠</span>
            <h2 className={styles.emptyTitle}>Know what you&apos;re betting on.</h2>
            <p className={styles.emptyText}>
              Pick any game and we&apos;ll tell you what&apos;s actually going on — in words you already understand.
              No spreads, no jargon, no guessing.
            </p>
            <div className={styles.emptyFeatures}>
              <span>✓ Plain-English breakdowns</span>
              <span>✓ Player projections</span>
              <span>✓ Updated before kickoff</span>
            </div>
          </div>
        ) : (
          <article className={styles.breakdown}>
            {/* ── Matchup header ── */}
            <header className={styles.matchupHeader}>
              <div className={styles.matchupTeam}>
                <Image src={away?.logo || ""} alt={sel.awayAbbr} width={56} height={56} className={styles.matchupLogo} unoptimized />
                <div className={styles.matchupTeamInfo}>
                  <span className={styles.matchupName}>{away?.city}</span>
                  <span className={styles.matchupName}>{away?.name}</span>
                </div>
              </div>
              <div className={styles.matchupCenter}>
                <span className={styles.matchupAt}>at</span>
                <span className={styles.matchupMeta}>{sel.date}</span>
                <span className={styles.matchupMeta}>{sel.time}</span>
              </div>
              <div className={styles.matchupTeam}>
                <Image src={home?.logo || ""} alt={sel.homeAbbr} width={56} height={56} className={styles.matchupLogo} unoptimized />
                <div className={styles.matchupTeamInfo}>
                  <span className={styles.matchupName}>{home?.city}</span>
                  <span className={styles.matchupName}>{home?.name}</span>
                </div>
              </div>
            </header>

            {/* ── Headline + Rundown ── */}
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
              <h3 className={styles.sectionTitle}>Players to watch</h3>
              <div className={styles.playersGrid}>
                {sel.awayPlayers.length > 0 && (
                  <div className={styles.playersCol}>
                    <h4 className={styles.teamGroupLabel}>{away?.name}</h4>
                    {sel.awayPlayers.map((p) => <PlayerRow key={p.name} player={p} />)}
                  </div>
                )}
                {sel.homePlayers.length > 0 && (
                  <div className={styles.playersCol}>
                    <h4 className={styles.teamGroupLabel}>{home?.name}</h4>
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

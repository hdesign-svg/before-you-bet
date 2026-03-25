"use client";
/**
 * VARIANT C: Split-Panel Dashboard
 * Inspired by: Linear × Stripe
 * Axis: Interaction model — persistent sidebar list + inline detail panel
 * Key idea: Select a game from the left, see the breakdown on the right without navigating away
 */
import { useState } from "react";
import Image from "next/image";
import { FIXTURE_GAMES_LIST, FIXTURE_TEAMS, FIXTURE_GAME, FIXTURE_WEEK } from "../data/fixtures";

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100dvh",
    background: "#F5F2ED",
    fontFamily: '"Geist", -apple-system, sans-serif',
    color: "#111",
    display: "flex",
  },
  // Sidebar
  sidebar: {
    width: 360,
    borderRight: "1px solid #E0DDD6",
    background: "#FAFAF7",
    display: "flex",
    flexDirection: "column" as const,
    height: "100dvh",
    position: "sticky" as const,
    top: 0,
    overflowY: "auto" as const,
  },
  sidebarHeader: {
    padding: "24px 20px 16px",
    borderBottom: "1px solid #E0DDD6",
  },
  wordmark: {
    fontFamily: '"Instrument Serif", Georgia, serif',
    fontSize: 22,
    fontWeight: 400,
    fontStyle: "italic",
    letterSpacing: "-0.02em",
  },
  weekMeta: {
    fontSize: 11,
    color: "#999",
    marginTop: 4,
    fontWeight: 500,
  },
  gameList: {
    flex: 1,
    overflowY: "auto" as const,
  },
  gameItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 20px",
    borderBottom: "1px solid #F0EDE7",
    cursor: "pointer",
    transition: "background 100ms",
    background: "transparent",
    width: "100%",
    textAlign: "left" as const,
    border: "none",
    font: "inherit",
    color: "inherit",
  },
  gameItemActive: {
    background: "#F5F2ED",
    borderLeft: "3px solid #111",
    paddingLeft: 17,
  },
  itemGradient: {
    width: 3,
    height: 36,
    borderRadius: 2,
    flexShrink: 0,
  },
  itemTeams: {
    flex: 1,
  },
  itemMatchup: {
    fontFamily: '"Instrument Serif", Georgia, serif',
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 1.3,
  },
  itemTime: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
    fontVariantNumeric: "tabular-nums",
  },
  itemChevron: {
    color: "#CCC",
    fontSize: 14,
  },
  // Detail panel
  detail: {
    flex: 1,
    overflowY: "auto" as const,
    height: "100dvh",
  },
  detailEmpty: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color: "#BBB",
    fontSize: 14,
    fontStyle: "italic",
  },
  detailHeader: {
    padding: "40px 40px 32px",
    borderBottom: "1px solid #E0DDD6",
  },
  detailMatchup: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    marginBottom: 20,
  },
  detailLogo: {
    width: 48,
    height: 48,
    objectFit: "contain" as const,
  },
  detailAt: {
    fontFamily: '"Instrument Serif", Georgia, serif',
    fontSize: 16,
    fontStyle: "italic",
    color: "#BBB",
  },
  detailHeadline: {
    fontFamily: '"Instrument Serif", Georgia, serif',
    fontSize: 26,
    fontWeight: 400,
    fontStyle: "italic",
    lineHeight: 1.25,
    maxWidth: 560,
  },
  detailTime: {
    fontSize: 12,
    color: "#999",
    marginTop: 8,
  },
  detailBody: {
    padding: "32px 40px 64px",
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.12em",
    color: "#999",
    marginBottom: 12,
  },
  bulletList: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column" as const,
    gap: 8,
    marginBottom: 40,
  },
  bullet: {
    fontSize: 14,
    lineHeight: 1.65,
    color: "#555",
    padding: "12px 16px",
    background: "#fff",
    borderRadius: 8,
    borderLeft: "2px solid #E0DDD6",
  },
  playerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "12px 0",
    borderBottom: "1px solid #F0EDE7",
  },
  playerName: {
    fontFamily: '"Instrument Serif", Georgia, serif',
    fontSize: 15,
    fontWeight: 400,
  },
  playerPos: {
    fontSize: 10,
    fontWeight: 600,
    color: "#999",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
  },
  playerVerdict: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
    lineHeight: 1.5,
    maxWidth: 400,
  },
  playerProjection: {
    fontSize: 12,
    fontWeight: 600,
    color: "#111",
    fontVariantNumeric: "tabular-nums",
    textAlign: "right" as const,
    whiteSpace: "nowrap" as const,
  },
};

export default function VariantC() {
  const [selected, setSelected] = useState(0);
  const ft = FIXTURE_TEAMS;
  const game = FIXTURE_GAMES_LIST[selected];
  const a = ft[game.away as keyof typeof ft];
  const h = ft[game.home as keyof typeof ft];

  // Use detailed fixture for first game, simplified for others
  const detail = selected === 0 ? FIXTURE_GAME : null;

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h1 style={styles.wordmark}>Before You Bet</h1>
          <p style={styles.weekMeta}>Week {FIXTURE_WEEK.number} &middot; {FIXTURE_WEEK.dateRange}</p>
        </div>
        <div style={styles.gameList}>
          {FIXTURE_GAMES_LIST.map((g, i) => {
            const ga = ft[g.away as keyof typeof ft];
            const gh = ft[g.home as keyof typeof ft];
            const isActive = i === selected;
            return (
              <button
                key={g.slug}
                style={{ ...styles.gameItem, ...(isActive ? styles.gameItemActive : {}) }}
                onClick={() => setSelected(i)}
              >
                <div style={{ ...styles.itemGradient, background: `linear-gradient(to bottom, ${ga.color}, ${gh.color})` }} />
                <div style={styles.itemTeams}>
                  <p style={styles.itemMatchup}>{ga.city} {ga.name} at {gh.city} {gh.name}</p>
                  <p style={styles.itemTime}>{g.date} &middot; {g.time}</p>
                </div>
                <span style={styles.itemChevron}>&rsaquo;</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Detail panel */}
      <main style={styles.detail}>
        <div style={styles.detailHeader}>
          <div style={styles.detailMatchup}>
            <Image src={a.logo} alt="" width={48} height={48} style={styles.detailLogo} unoptimized />
            <span style={styles.detailAt}>at</span>
            <Image src={h.logo} alt="" width={48} height={48} style={styles.detailLogo} unoptimized />
          </div>
          <h2 style={styles.detailHeadline}>{game.headline}</h2>
          <p style={styles.detailTime}>{game.date} &middot; {game.time}</p>
        </div>

        <div style={styles.detailBody}>
          {detail ? (
            <>
              <p style={styles.sectionLabel}>The Rundown</p>
              <ul style={styles.bulletList}>
                {detail.rundown.map((b, i) => (
                  <li key={i} style={styles.bullet}>{b}</li>
                ))}
              </ul>

              <p style={styles.sectionLabel}>Players to Watch</p>
              {[...detail.awayPlayers, ...detail.homePlayers].map((p) => (
                <div key={p.name} style={styles.playerRow}>
                  <div>
                    <p style={styles.playerName}>{p.name}</p>
                    <span style={styles.playerPos}>{p.position}</span>
                    <p style={styles.playerVerdict}>{p.verdict}</p>
                  </div>
                  <span style={styles.playerProjection}>{p.projection}</span>
                </div>
              ))}
            </>
          ) : (
            <p style={{ color: "#999", fontStyle: "italic" }}>
              Detailed breakdown available for the featured game. Select Chiefs at Bills to see the full rundown.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

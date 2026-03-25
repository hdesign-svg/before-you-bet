"use client";
/**
 * VARIANT B: Scoreboard-Inspired Cards
 * Inspired by: ESPN × Linear
 * Axis: Layout model — horizontal scoreboard-style cards with inline preview
 * Key idea: Cards feel like live scoreboards, stacked vertically for scanning
 */
import Image from "next/image";
import { FIXTURE_GAMES_LIST, FIXTURE_TEAMS, FIXTURE_WEEK } from "../data/fixtures";

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100dvh",
    background: "#111",
    fontFamily: '"Geist", -apple-system, sans-serif',
    color: "#fff",
  },
  header: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "48px 24px 40px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  wordmark: {
    fontFamily: '"Instrument Serif", Georgia, serif',
    fontSize: 32,
    fontWeight: 400,
    fontStyle: "italic",
    letterSpacing: "-0.02em",
    color: "#fff",
  },
  subtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.4)",
    marginTop: 8,
  },
  weekPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    color: "rgba(255,255,255,0.5)",
    background: "rgba(255,255,255,0.06)",
    padding: "6px 12px",
    borderRadius: 100,
    marginTop: 16,
  },
  list: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "24px 24px 64px",
    display: "flex",
    flexDirection: "column" as const,
    gap: 12,
  },
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 12,
    overflow: "hidden",
    cursor: "pointer",
    transition: "border-color 150ms ease-out, background 150ms ease-out",
  },
  cardInner: {
    display: "flex",
    alignItems: "stretch",
  },
  gradientBar: {
    width: 4,
    flexShrink: 0,
  },
  cardContent: {
    flex: 1,
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
  matchup: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    minWidth: 160,
    flexShrink: 0,
  },
  teamStack: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  logo: {
    width: 28,
    height: 28,
    objectFit: "contain" as const,
  },
  abbr: {
    fontFamily: '"Instrument Serif", Georgia, serif',
    fontSize: 18,
    fontWeight: 400,
  },
  at: {
    fontSize: 10,
    color: "rgba(255,255,255,0.25)",
    fontWeight: 600,
  },
  divider: {
    width: 1,
    alignSelf: "stretch" as const,
    background: "rgba(255,255,255,0.08)",
  },
  headline: {
    fontFamily: '"Instrument Serif", Georgia, serif',
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 1.45,
    color: "rgba(255,255,255,0.7)",
    flex: 1,
  },
  meta: {
    fontSize: 11,
    color: "rgba(255,255,255,0.3)",
    fontVariantNumeric: "tabular-nums",
    textAlign: "right" as const,
    minWidth: 80,
    flexShrink: 0,
  },
};

export default function VariantB() {
  const ft = FIXTURE_TEAMS;

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.wordmark}>Before You Bet</h1>
        <p style={styles.subtitle}>Plain-English game intelligence for people who don&rsquo;t speak betting.</p>
        <div style={styles.weekPill}>
          <span>Week {FIXTURE_WEEK.number}</span>
          <span>&middot;</span>
          <span>{FIXTURE_WEEK.dateRange}</span>
        </div>
      </header>

      <div style={styles.list}>
        {FIXTURE_GAMES_LIST.map((g) => {
          const a = ft[g.away as keyof typeof ft];
          const h = ft[g.home as keyof typeof ft];
          return (
            <div key={g.slug} style={styles.card}>
              <div style={styles.cardInner}>
                <div style={{ ...styles.gradientBar, background: `linear-gradient(to bottom, ${a.color}, ${h.color})` }} />
                <div style={styles.cardContent}>
                  <div style={styles.matchup}>
                    <div style={styles.teamStack}>
                      <Image src={a.logo} alt="" width={28} height={28} style={styles.logo} unoptimized />
                      <span style={styles.abbr}>{a.abbr}</span>
                    </div>
                    <span style={styles.at}>@</span>
                    <div style={styles.teamStack}>
                      <span style={styles.abbr}>{h.abbr}</span>
                      <Image src={h.logo} alt="" width={28} height={28} style={styles.logo} unoptimized />
                    </div>
                  </div>
                  <div style={styles.divider} />
                  <p style={styles.headline}>{g.headline}</p>
                  <div style={{ ...styles.divider, display: "none" }} />
                  <span style={styles.meta}>{g.date}<br />{g.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

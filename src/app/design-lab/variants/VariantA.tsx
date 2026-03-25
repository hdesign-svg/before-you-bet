"use client";
/**
 * VARIANT A: Editorial Magazine Layout
 * Inspired by: The Athletic × Apple
 * Axis: Information hierarchy — hero feature game + supporting grid
 * Key idea: Lead with one marquee matchup, stack the rest below
 */
import Image from "next/image";
import { FIXTURE_GAMES_LIST, FIXTURE_TEAMS, FIXTURE_WEEK } from "../data/fixtures";

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100dvh",
    background: "#F5F2ED",
    fontFamily: '"Geist", -apple-system, sans-serif',
    color: "#111",
  },
  header: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "48px 24px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  wordmark: {
    fontFamily: '"Instrument Serif", Georgia, serif',
    fontSize: "clamp(36px, 5vw, 56px)",
    fontWeight: 400,
    fontStyle: "italic",
    letterSpacing: "-0.03em",
    lineHeight: 1,
  },
  weekLabel: {
    fontSize: 12,
    fontWeight: 500,
    color: "#999",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
  },
  // Hero — featured game
  hero: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "40px 24px",
  },
  heroCard: {
    position: "relative" as const,
    borderRadius: 20,
    overflow: "hidden",
    color: "#fff",
    padding: "48px 40px",
    display: "flex",
    flexDirection: "column" as const,
    gap: 24,
    minHeight: 320,
  },
  heroOverlay: {
    position: "absolute" as const,
    inset: 0,
    background: "linear-gradient(135deg, rgba(0,0,0,0.55), rgba(0,0,0,0.3))",
    zIndex: 1,
  },
  heroContent: {
    position: "relative" as const,
    zIndex: 2,
  },
  heroMatchup: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    marginBottom: 16,
  },
  heroTeamLogo: {
    width: 56,
    height: 56,
    objectFit: "contain" as const,
    filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))",
  },
  heroAt: {
    fontFamily: '"Instrument Serif", Georgia, serif',
    fontSize: 18,
    fontStyle: "italic",
    opacity: 0.5,
  },
  heroHeadline: {
    fontFamily: '"Instrument Serif", Georgia, serif',
    fontSize: "clamp(24px, 3.5vw, 36px)",
    fontWeight: 400,
    lineHeight: 1.2,
    maxWidth: 600,
  },
  heroMeta: {
    fontSize: 13,
    opacity: 0.6,
    fontWeight: 500,
  },
  heroBadge: {
    display: "inline-block",
    fontSize: 10,
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.12em",
    background: "rgba(255,255,255,0.2)",
    backdropFilter: "blur(8px)",
    padding: "4px 12px",
    borderRadius: 100,
  },
  // Grid
  gridSection: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 24px 64px",
  },
  gridLabel: {
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.12em",
    color: "#999",
    marginBottom: 16,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: 16,
  },
  card: {
    background: "#fff",
    borderRadius: 14,
    border: "1px solid #E0DDD6",
    padding: 0,
    overflow: "hidden",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column" as const,
  },
  cardTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    borderBottom: "1px solid #F0EDE7",
  },
  cardTeams: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  cardLogo: {
    width: 24,
    height: 24,
    objectFit: "contain" as const,
  },
  cardAbbr: {
    fontFamily: '"Instrument Serif", Georgia, serif',
    fontSize: 18,
    fontWeight: 400,
  },
  cardVs: {
    fontSize: 10,
    color: "#BBB",
    fontWeight: 600,
  },
  cardTime: {
    fontSize: 12,
    color: "#999",
    fontVariantNumeric: "tabular-nums",
  },
  cardBody: {
    padding: "16px 20px 20px",
  },
  cardHeadline: {
    fontFamily: '"Instrument Serif", Georgia, serif',
    fontSize: 17,
    fontWeight: 400,
    lineHeight: 1.4,
    color: "#333",
  },
};

export default function VariantA() {
  const featured = FIXTURE_GAMES_LIST[0];
  const rest = FIXTURE_GAMES_LIST.slice(1);
  const ft = FIXTURE_TEAMS;

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.wordmark}>Before You Bet</h1>
        <span style={styles.weekLabel}>Week {FIXTURE_WEEK.number} &middot; {FIXTURE_WEEK.dateRange}</span>
      </header>

      {/* Hero featured game */}
      <div style={styles.hero}>
        <div
          style={{
            ...styles.heroCard,
            background: `linear-gradient(135deg, ${ft[featured.away as keyof typeof ft].color}, ${ft[featured.home as keyof typeof ft].color})`,
          }}
        >
          <div style={styles.heroOverlay} />
          <div style={styles.heroContent}>
            <span style={styles.heroBadge}>Featured Matchup</span>
            <div style={{ ...styles.heroMatchup, marginTop: 20 }}>
              <Image src={ft[featured.away as keyof typeof ft].logo} alt="" width={56} height={56} style={styles.heroTeamLogo} unoptimized />
              <span style={styles.heroAt}>at</span>
              <Image src={ft[featured.home as keyof typeof ft].logo} alt="" width={56} height={56} style={styles.heroTeamLogo} unoptimized />
            </div>
            <h2 style={styles.heroHeadline}>{featured.headline}</h2>
            <p style={{ ...styles.heroMeta, marginTop: 12 }}>{featured.date} &middot; {featured.time}</p>
          </div>
        </div>
      </div>

      {/* Remaining games */}
      <div style={styles.gridSection}>
        <p style={styles.gridLabel}>More Games This Week</p>
        <div style={styles.grid}>
          {rest.map((g) => {
            const a = ft[g.away as keyof typeof ft];
            const h = ft[g.home as keyof typeof ft];
            return (
              <div key={g.slug} style={styles.card}>
                <div style={styles.cardTop}>
                  <div style={styles.cardTeams}>
                    <Image src={a.logo} alt="" width={24} height={24} style={styles.cardLogo} unoptimized />
                    <span style={styles.cardAbbr}>{a.abbr}</span>
                    <span style={styles.cardVs}>@</span>
                    <span style={styles.cardAbbr}>{h.abbr}</span>
                    <Image src={h.logo} alt="" width={24} height={24} style={styles.cardLogo} unoptimized />
                  </div>
                  <span style={styles.cardTime}>{g.time}</span>
                </div>
                <div style={styles.cardBody}>
                  <p style={styles.cardHeadline}>{g.headline}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

"use client";
/**
 * VARIANT E: Bold Typographic Poster
 * Inspired by: The Athletic × Editorial Brutalism pushed further
 * Axis: Expressive direction — oversized type, dramatic color blocks, visual confidence
 * Key idea: Feels like a sports magazine cover, not a web app
 */
import Image from "next/image";
import { FIXTURE_GAMES_LIST, FIXTURE_TEAMS, FIXTURE_WEEK } from "../data/fixtures";

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100dvh",
    background: "#111",
    fontFamily: '"Geist", -apple-system, sans-serif',
    color: "#fff",
    overflow: "hidden",
  },
  hero: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "64px 32px 48px",
    display: "flex",
    flexDirection: "column" as const,
    gap: 8,
  },
  weekTag: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.15em",
    color: "rgba(255,255,255,0.3)",
  },
  massiveWordmark: {
    fontFamily: '"Instrument Serif", Georgia, serif',
    fontSize: "clamp(60px, 10vw, 120px)",
    fontWeight: 400,
    fontStyle: "italic",
    letterSpacing: "-0.04em",
    lineHeight: 0.9,
    background: "linear-gradient(135deg, #fff 60%, rgba(255,255,255,0.4))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.35)",
    maxWidth: 400,
    lineHeight: 1.5,
    marginTop: 8,
  },
  // Game strips
  stripSection: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 32px 64px",
  },
  strip: {
    display: "flex",
    alignItems: "stretch",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    cursor: "pointer",
    transition: "background 150ms",
    position: "relative" as const,
  },
  stripGradient: {
    width: 4,
    flexShrink: 0,
  },
  stripContent: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    padding: "20px 24px",
    gap: 24,
  },
  stripIndex: {
    fontFamily: '"Instrument Serif", Georgia, serif',
    fontSize: 32,
    fontWeight: 400,
    color: "rgba(255,255,255,0.12)",
    width: 40,
    textAlign: "center" as const,
    flexShrink: 0,
  },
  stripLogos: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    flexShrink: 0,
  },
  stripLogo: {
    width: 32,
    height: 32,
    objectFit: "contain" as const,
  },
  stripTeams: {
    fontFamily: '"Instrument Serif", Georgia, serif',
    fontSize: 20,
    fontWeight: 400,
    minWidth: 180,
    flexShrink: 0,
  },
  stripHeadline: {
    fontSize: 14,
    lineHeight: 1.5,
    color: "rgba(255,255,255,0.5)",
    flex: 1,
  },
  stripTime: {
    fontSize: 11,
    color: "rgba(255,255,255,0.25)",
    fontVariantNumeric: "tabular-nums",
    textAlign: "right" as const,
    minWidth: 80,
    flexShrink: 0,
  },
  stripArrow: {
    color: "rgba(255,255,255,0.15)",
    fontSize: 20,
    marginLeft: 8,
    flexShrink: 0,
  },
  // Footer
  footer: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 32px 48px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    paddingTop: 24,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.2)",
  },
  footerDate: {
    fontSize: 11,
    color: "rgba(255,255,255,0.15)",
    fontVariantNumeric: "tabular-nums",
  },
};

export default function VariantE() {
  const ft = FIXTURE_TEAMS;

  return (
    <div style={styles.page}>
      <header style={styles.hero}>
        <span style={styles.weekTag}>Week {FIXTURE_WEEK.number} &middot; NFL</span>
        <h1 style={styles.massiveWordmark}>Before<br />You Bet</h1>
        <p style={styles.subtitle}>
          Plain-English game intelligence for people who don&rsquo;t speak betting.
        </p>
      </header>

      <div style={styles.stripSection}>
        {FIXTURE_GAMES_LIST.map((g, i) => {
          const a = ft[g.away as keyof typeof ft];
          const h = ft[g.home as keyof typeof ft];
          return (
            <div key={g.slug} style={styles.strip}>
              <div style={{ ...styles.stripGradient, background: `linear-gradient(to bottom, ${a.color}, ${h.color})` }} />
              <div style={styles.stripContent}>
                <span style={styles.stripIndex}>{String(i + 1).padStart(2, "0")}</span>
                <div style={styles.stripLogos}>
                  <Image src={a.logo} alt="" width={32} height={32} style={styles.stripLogo} unoptimized />
                  <Image src={h.logo} alt="" width={32} height={32} style={styles.stripLogo} unoptimized />
                </div>
                <span style={styles.stripTeams}>{a.abbr} @ {h.abbr}</span>
                <p style={styles.stripHeadline}>{g.headline}</p>
                <span style={styles.stripTime}>{g.date}<br />{g.time}</span>
                <span style={styles.stripArrow}>&rarr;</span>
              </div>
            </div>
          );
        })}
      </div>

      <footer style={styles.footer}>
        <span style={styles.footerText}>Not a sportsbook. Informational only.</span>
        <span style={styles.footerDate}>Updated {FIXTURE_WEEK.lastUpdated}</span>
      </footer>
    </div>
  );
}

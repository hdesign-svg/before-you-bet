"use client";
/**
 * VARIANT D: Card-Forward with Inline Expansion
 * Inspired by: Apple × Stripe
 * Axis: Interaction model — cards expand inline to show detail, no full-page takeover
 * Key idea: Click to expand in place, see breakdown without losing grid context
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
  },
  header: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "48px 24px 32px",
    textAlign: "center" as const,
  },
  wordmark: {
    fontFamily: '"Instrument Serif", Georgia, serif',
    fontSize: 48,
    fontWeight: 400,
    fontStyle: "italic",
    letterSpacing: "-0.03em",
    lineHeight: 1,
  },
  subtitle: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
  },
  divider: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "0 24px",
  },
  dividerLine: {
    height: 1,
    background: "#E0DDD6",
  },
  list: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "24px 24px 64px",
    display: "flex",
    flexDirection: "column" as const,
    gap: 12,
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    border: "1px solid #E0DDD6",
    overflow: "hidden",
    cursor: "pointer",
    transition: "box-shadow 200ms ease-out, transform 200ms ease-out",
  },
  cardExpanded: {
    boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
    cursor: "default",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    padding: "20px 24px",
    gap: 16,
  },
  gradientDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    flexShrink: 0,
  },
  teams: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  logo: {
    width: 28,
    height: 28,
    objectFit: "contain" as const,
  },
  teamName: {
    fontFamily: '"Instrument Serif", Georgia, serif',
    fontSize: 17,
    fontWeight: 400,
  },
  at: {
    fontSize: 10,
    color: "#BBB",
    fontWeight: 600,
  },
  headline: {
    flex: 2,
    fontSize: 14,
    color: "#555",
    lineHeight: 1.5,
  },
  time: {
    fontSize: 12,
    color: "#999",
    fontVariantNumeric: "tabular-nums",
    flexShrink: 0,
  },
  chevron: {
    color: "#CCC",
    fontSize: 18,
    transition: "transform 200ms ease-out",
    flexShrink: 0,
  },
  // Expanded detail
  expandBody: {
    borderTop: "1px solid #F0EDE7",
    padding: "24px 24px 28px",
    paddingLeft: 48,
    display: "flex",
    flexDirection: "column" as const,
    gap: 20,
  },
  expandHeadline: {
    fontFamily: '"Instrument Serif", Georgia, serif',
    fontSize: 22,
    fontWeight: 400,
    fontStyle: "italic",
    lineHeight: 1.3,
    color: "#111",
  },
  bulletGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 8,
  },
  bullet: {
    fontSize: 13,
    lineHeight: 1.55,
    color: "#555",
    padding: "10px 14px",
    background: "#F5F2ED",
    borderRadius: 8,
  },
  playerChips: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap" as const,
  },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "#F5F2ED",
    borderRadius: 100,
    padding: "6px 14px 6px 6px",
    fontSize: 13,
  },
  chipAvatar: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    background: "#E0DDD6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 10,
    fontWeight: 700,
    color: "#999",
  },
};

export default function VariantD() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const ft = FIXTURE_TEAMS;

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.wordmark}>Before You Bet</h1>
        <p style={styles.subtitle}>Week {FIXTURE_WEEK.number} &middot; {FIXTURE_WEEK.dateRange}</p>
      </header>

      <div style={styles.divider}><div style={styles.dividerLine} /></div>

      <div style={styles.list}>
        {FIXTURE_GAMES_LIST.map((g) => {
          const a = ft[g.away as keyof typeof ft];
          const h = ft[g.home as keyof typeof ft];
          const isOpen = expanded === g.slug;
          const detail = g.slug === "chiefs-at-bills" ? FIXTURE_GAME : null;

          return (
            <div
              key={g.slug}
              style={{ ...styles.card, ...(isOpen ? styles.cardExpanded : {}) }}
              onClick={() => !isOpen && setExpanded(g.slug)}
            >
              <div style={styles.cardHeader}>
                <div style={{ ...styles.gradientDot, background: `linear-gradient(135deg, ${a.color}, ${h.color})` }} />
                <div style={styles.teams}>
                  <Image src={a.logo} alt="" width={28} height={28} style={styles.logo} unoptimized />
                  <span style={styles.teamName}>{a.abbr}</span>
                  <span style={styles.at}>@</span>
                  <span style={styles.teamName}>{h.abbr}</span>
                  <Image src={h.logo} alt="" width={28} height={28} style={styles.logo} unoptimized />
                </div>
                <p style={styles.headline}>{g.headline}</p>
                <span style={styles.time}>{g.time}</span>
                <span
                  style={{ ...styles.chevron, transform: isOpen ? "rotate(90deg)" : "rotate(0)" }}
                  onClick={(e) => { if (isOpen) { e.stopPropagation(); setExpanded(null); } }}
                >
                  &rsaquo;
                </span>
              </div>

              {isOpen && detail && (
                <div style={styles.expandBody}>
                  <h3 style={styles.expandHeadline}>{detail.headline}</h3>
                  <div style={styles.bulletGrid}>
                    {detail.rundown.map((b, i) => (
                      <p key={i} style={styles.bullet}>{b}</p>
                    ))}
                  </div>
                  <div style={styles.playerChips}>
                    {[...detail.awayPlayers, ...detail.homePlayers].map((p) => (
                      <span key={p.name} style={styles.chip}>
                        <span style={styles.chipAvatar}>{p.position}</span>
                        {p.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

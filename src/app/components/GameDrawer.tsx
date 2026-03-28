"use client";

import { useEffect, useRef } from "react";
import { type Game, type PlayerSpotlight } from "@/data/games";
import { teams } from "@/data/teams";
import styles from "./GameDrawer.module.css";

const positionColors: Record<string, string> = {
  QB: "var(--pos-qb)",
  RB: "var(--pos-rb)",
  WR: "var(--pos-wr)",
  TE: "var(--pos-te)",
};

const confidenceConfig: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  lean: {
    label: "Lean",
    color: "var(--text-secondary)",
    bg: "var(--surface-alt)",
  },
  like: {
    label: "Like",
    color: "#7D5A00",
    bg: "#FEF3CD",
  },
  love: {
    label: "Love",
    color: "#0D5E3A",
    bg: "#D1F2E0",
  },
};

function PlayerCard({ player }: { player: PlayerSpotlight }) {
  const borderColor = positionColors[player.position] || "var(--border)";

  return (
    <div className={styles.playerCard} style={{ borderLeftColor: borderColor }}>
      <div className={styles.playerTop}>
        <span className={styles.playerName}>{player.name}</span>
        <span
          className={styles.posTag}
          style={{ background: borderColor, color: "#fff" }}
        >
          {player.position}
        </span>
      </div>
      <p className={styles.playerVerdict}>{player.verdict}</p>
      <p className={styles.playerExpectation}>
        <span className={styles.expectLabel}>Projection:</span>{" "}
        {player.projection}
      </p>
    </div>
  );
}

export default function GameDrawer({
  game,
  onClose,
}: {
  game: Game | null;
  onClose: () => void;
}) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (game) {
      document.addEventListener("keydown", handler);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [game, onClose]);

  if (!game) return null;

  const away = teams[game.awayAbbr];
  const home = teams[game.homeAbbr];
  const conf = confidenceConfig.lean;

  return (
    <>
      {/* Overlay */}
      <div className={styles.overlay} onClick={onClose} />

      {/* Drawer */}
      <div className={styles.drawer} ref={drawerRef}>
        {/* Close button */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          ✕
        </button>

        {/* Drawer header */}
        <header className={styles.drawerHeader}>
          {/* Team color bar */}
          <div className={styles.teamColorBar}>
            <div
              className={styles.teamColorHalf}
              style={{ background: away?.color || "#ccc" }}
            />
            <div
              className={styles.teamColorHalf}
              style={{ background: home?.color || "#ccc" }}
            />
          </div>

          <div className={styles.headerContent}>
            <div className={styles.matchupDisplay}>
              <div className={styles.teamDisplay}>
                <span className={styles.teamAbbrLg}>{game.awayAbbr}</span>
                <span className={styles.teamFullName}>
                  {away?.city} {away?.name}
                </span>
              </div>
              <span className={styles.atLg}>@</span>
              <div className={styles.teamDisplay}>
                <span className={styles.teamAbbrLg}>{game.homeAbbr}</span>
                <span className={styles.teamFullName}>
                  {home?.city} {home?.name}
                </span>
              </div>
            </div>

            <div className={styles.gameMeta}>
              <span>{game.date} · {game.time}</span>
            </div>
          </div>
        </header>

        {/* THE TAKEAWAY — first thing you see */}
        <section className={styles.takeaway}>
          <div className={styles.takeawayHeader}>
            <h2 className={styles.takeawayTitle}>The Takeaway</h2>
            <span
              className={styles.confidenceBadge}
              style={{ background: conf.bg, color: conf.color }}
            >
              {conf.label}
            </span>
          </div>
          <p className={styles.takeawayText}>{game.takeaway}</p>
        </section>

        {/* The Story — collapsible context */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>The Story</h3>
          <p className={styles.bodyText}>{game.story}</p>
        </section>

        {/* Players */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Key Players</h3>

          {game.awayPlayers.length > 0 && (
            <>
              <h4 className={styles.teamLabel}>
                {away?.city} {away?.name}
              </h4>
              <div className={styles.playerList}>
                {game.awayPlayers.map((p) => (
                  <PlayerCard key={p.name} player={p} />
                ))}
              </div>
            </>
          )}

          {game.homePlayers.length > 0 && (
            <>
              <h4 className={styles.teamLabel}>
                {home?.city} {home?.name}
              </h4>
              <div className={styles.playerList}>
                {game.homePlayers.map((p) => (
                  <PlayerCard key={p.name} player={p} />
                ))}
              </div>
            </>
          )}
        </section>

        {/* Footer */}
        <footer className={styles.drawerFooter}>
          <p>Last updated: {game.lastUpdated}</p>
          <p>Content is for informational purposes only.</p>
        </footer>
      </div>
    </>
  );
}

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { type Game, type PlayerSpotlight } from "@/data/games";
import { teams } from "@/data/teams";
import styles from "./GameDrawer.module.css";

const confidenceConfig: Record<string, { label: string; emoji: string }> = {
  lean: { label: "Lean", emoji: "→" },
  like: { label: "Like", emoji: "↗" },
  love: { label: "Love", emoji: "✦" },
};

function PlayerCard({ player }: { player: PlayerSpotlight }) {
  return (
    <div className={styles.playerCard}>
      <div className={styles.playerHeader}>
        <span className={styles.playerName}>{player.name}</span>
        <span className={styles.playerPos}>{player.position}</span>
      </div>
      <p className={styles.playerVerdict}>{player.verdict}</p>
      <p className={styles.playerDetail}>{player.detail}</p>
      <div className={styles.playerProjection}>
        <span className={styles.projLabel}>Projection</span>
        <span className={styles.projValue}>{player.expectation}</span>
      </div>
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
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Open/close lifecycle
  useEffect(() => {
    if (game) {
      setVisible(true);
      setClosing(false);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [game]);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setVisible(false);
      onClose();
    }, 280);
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (visible) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [visible, handleClose]);

  if (!visible || !game) return null;

  const away = teams[game.awayAbbr];
  const home = teams[game.homeAbbr];
  const conf = confidenceConfig[game.confidence] || confidenceConfig.lean;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${closing ? styles.backdropOut : ""}`}
        onClick={handleClose}
      />

      {/* Drawer panel */}
      <div
        className={`${styles.drawer} ${closing ? styles.drawerOut : ""}`}
        ref={drawerRef}
      >
        {/* Close button */}
        <button className={styles.close} onClick={handleClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* ── Header: Logos + matchup ── */}
        <header className={styles.header}>
          <div className={styles.headerMatchup}>
            <div className={styles.headerTeam}>
              <Image
                src={away?.logo || ""}
                alt={away?.name || game.awayAbbr}
                width={56}
                height={56}
                className={styles.headerLogo}
                unoptimized
              />
              <span className={styles.headerAbbr}>{game.awayAbbr}</span>
              <span className={styles.headerCity}>{away?.city}</span>
            </div>
            <div className={styles.headerVs}>
              <span className={styles.headerAt}>@</span>
              <span className={styles.headerSpread}>{game.spread}</span>
            </div>
            <div className={styles.headerTeam}>
              <Image
                src={home?.logo || ""}
                alt={home?.name || game.homeAbbr}
                width={56}
                height={56}
                className={styles.headerLogo}
                unoptimized
              />
              <span className={styles.headerAbbr}>{game.homeAbbr}</span>
              <span className={styles.headerCity}>{home?.city}</span>
            </div>
          </div>
          <p className={styles.headerMeta}>
            {game.date} · {game.time} · O/U {game.overUnder}
          </p>
        </header>

        {/* ── THE TAKEAWAY — dark hero block ── */}
        <section className={styles.takeaway}>
          <div className={styles.takeawayLabel}>
            <span>The Takeaway</span>
            <span className={styles.confBadge}>
              {conf.emoji} {conf.label}
            </span>
          </div>
          <p className={styles.takeawayText}>{game.takeaway}</p>
        </section>

        {/* ── Scrollable content ── */}
        <div className={styles.content}>
          {/* The Story */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>The Story</h3>
            <p className={styles.bodyText}>{game.story}</p>
          </section>

          {/* What the Odds Say */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>What the Odds Say</h3>
            <div className={styles.oddsList}>
              {game.oddsExplained.map((line, i) => (
                <div key={i} className={styles.oddsItem}>
                  <span className={styles.oddsBullet} />
                  <p>{line}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Key Players */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Key Players</h3>

            {game.awayPlayers.length > 0 && (
              <div className={styles.teamGroup}>
                <h4 className={styles.teamGroupLabel}>
                  {away?.city} {away?.name}
                </h4>
                {game.awayPlayers.map((p) => (
                  <PlayerCard key={p.name} player={p} />
                ))}
              </div>
            )}

            {game.homePlayers.length > 0 && (
              <div className={styles.teamGroup}>
                <h4 className={styles.teamGroupLabel}>
                  {home?.city} {home?.name}
                </h4>
                {game.homePlayers.map((p) => (
                  <PlayerCard key={p.name} player={p} />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Footer */}
        <footer className={styles.drawerFooter}>
          <p>Updated {game.lastUpdated}</p>
        </footer>
      </div>
    </>
  );
}

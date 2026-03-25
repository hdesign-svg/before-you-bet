"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { type Game, type PlayerSpotlight } from "@/data/games";
import { teams } from "@/data/teams";
import styles from "./GameModal.module.css";

function PlayerCard({ player }: { player: PlayerSpotlight }) {
  return (
    <div className={styles.playerCard}>
      <div className={styles.playerTop}>
        <span className={styles.playerName}>{player.name}</span>
        <span className={styles.playerPos}>{player.position}</span>
      </div>
      <p className={styles.verdict}>{player.verdict}</p>
      <p className={styles.detail}>{player.detail}</p>
      <div className={styles.projection}>
        <span className={styles.projLabel}>Projection</span>
        <span className={styles.projVal}>{player.expectation}</span>
      </div>
    </div>
  );
}

export default function GameModal({
  game,
  onClose,
}: {
  game: Game | null;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

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
    }, 250);
  }, [onClose]);

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

  return (
    <div className={`${styles.overlay} ${closing ? styles.overlayOut : ""}`}>
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={handleClose} />

      {/* Modal */}
      <div className={`${styles.modal} ${closing ? styles.modalOut : ""}`}>
        {/* Close */}
        <button className={styles.close} onClick={handleClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M13.5 4.5L4.5 13.5M4.5 4.5l9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* ── Header ── */}
        <header className={styles.header}>
          <div className={styles.matchup}>
            <div className={styles.teamCol}>
              <Image
                src={away?.logo || ""}
                alt={away?.name || game.awayAbbr}
                width={52}
                height={52}
                className={styles.teamLogo}
                unoptimized
              />
              <span className={styles.teamAbbr}>{game.awayAbbr}</span>
              <span className={styles.teamCity}>{away?.city}</span>
            </div>
            <div className={styles.vs}>
              <span className={styles.atSign}>@</span>
              <span className={styles.spreadVal}>{game.spread}</span>
            </div>
            <div className={styles.teamCol}>
              <Image
                src={home?.logo || ""}
                alt={home?.name || game.homeAbbr}
                width={52}
                height={52}
                className={styles.teamLogo}
                unoptimized
              />
              <span className={styles.teamAbbr}>{game.homeAbbr}</span>
              <span className={styles.teamCity}>{home?.city}</span>
            </div>
          </div>
          <p className={styles.meta}>
            {game.date} · {game.time} · O/U {game.overUnder}
          </p>
        </header>

        {/* ── TAKEAWAY hero ── */}
        <section className={styles.takeaway}>
          <span className={styles.takeawayLabel}>The Takeaway</span>
          <p className={styles.takeawayText}>{game.takeaway}</p>
        </section>

        {/* ── Scrollable body ── */}
        <div className={styles.body}>
          {/* Story */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>The Story</h3>
            <p className={styles.bodyText}>{game.story}</p>
          </section>

          {/* Odds */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>What the Odds Say</h3>
            <div className={styles.oddsList}>
              {game.oddsExplained.map((line, i) => (
                <div key={i} className={styles.oddsItem}>
                  <span className={styles.oddsDot} />
                  <p>{line}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Players */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Key Players</h3>

            {game.awayPlayers.length > 0 && (
              <div className={styles.teamGroup}>
                <h4 className={styles.teamGroupName}>{away?.city} {away?.name}</h4>
                {game.awayPlayers.map((p) => (
                  <PlayerCard key={p.name} player={p} />
                ))}
              </div>
            )}

            {game.homePlayers.length > 0 && (
              <div className={styles.teamGroup}>
                <h4 className={styles.teamGroupName}>{home?.city} {home?.name}</h4>
                {game.homePlayers.map((p) => (
                  <PlayerCard key={p.name} player={p} />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Footer */}
        <footer className={styles.modalFooter}>
          <p>Updated {game.lastUpdated}</p>
        </footer>
      </div>
    </div>
  );
}

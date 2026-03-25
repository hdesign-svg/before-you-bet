"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { type Game, type PlayerSpotlight } from "@/data/games";
import { teams } from "@/data/teams";
import { X } from "lucide-react";
import styles from "./GameDrawer.module.css";

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

export default function GameDrawer({
  game,
  onClose,
}: {
  game: Game | null;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (game) {
      setVisible(true);
      setClosing(false);
      setCollapsed(false);
      document.body.style.overflow = "hidden";
      if (bodyRef.current) bodyRef.current.scrollTop = 0;
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
    }, 260);
  }, [onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (visible) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [visible, handleClose]);

  const handleScroll = useCallback(() => {
    if (!bodyRef.current) return;
    setCollapsed(bodyRef.current.scrollTop > 50);
  }, []);

  if (!visible || !game) return null;

  const away = teams[game.awayAbbr];
  const home = teams[game.homeAbbr];

  return (
    <div className={`${styles.overlay} ${closing ? styles.overlayOut : ""}`}>
      <div className={styles.backdrop} onClick={handleClose} />

      <div className={`${styles.drawer} ${closing ? styles.drawerOut : ""}`}>
        {/* ── Header ── */}
        <header className={`${styles.header} ${collapsed ? styles.headerSmall : ""}`}>
          <div className={styles.matchup}>
            <div className={`${styles.teamCol} ${collapsed ? styles.teamColSmall : ""}`}>
              <Image
                src={away?.logo || ""}
                alt={away?.name || game.awayAbbr}
                width={48}
                height={48}
                className={`${styles.logo} ${collapsed ? styles.logoSmall : ""}`}
                unoptimized
              />
              <span className={`${styles.abbr} ${collapsed ? styles.abbrSmall : ""}`}>
                {game.awayAbbr}
              </span>
            </div>

            <div className={styles.center}>
              <span className={`${styles.spread} ${collapsed ? styles.spreadSmall : ""}`}>
                {game.spread}
              </span>
              {!collapsed && (
                <span className={styles.gameMeta}>
                  {game.date} · {game.time} · O/U {game.overUnder}
                </span>
              )}
            </div>

            <div className={`${styles.teamCol} ${collapsed ? styles.teamColSmall : ""}`}>
              <Image
                src={home?.logo || ""}
                alt={home?.name || game.homeAbbr}
                width={48}
                height={48}
                className={`${styles.logo} ${collapsed ? styles.logoSmall : ""}`}
                unoptimized
              />
              <span className={`${styles.abbr} ${collapsed ? styles.abbrSmall : ""}`}>
                {game.homeAbbr}
              </span>
            </div>
          </div>

          <button className={styles.close} onClick={handleClose} aria-label="Close">
            <X size={16} />
          </button>
        </header>

        {/* ── Scrollable body ── */}
        <div className={styles.body} ref={bodyRef} onScroll={handleScroll}>
          {/* The Bottom Line — typographic hero */}
          <section className={styles.takeaway}>
            <span className={styles.takeawayLabel}>The Bottom Line</span>
            <p className={styles.takeawayText}>{game.takeaway}</p>
          </section>

          {/* The Story */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>The Story</h3>
            <p className={styles.bodyText}>{game.story}</p>
          </section>

          {/* What the Numbers Mean */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>What the Numbers Mean</h3>
            <div className={styles.oddsList}>
              {game.oddsExplained.map((line, i) => (
                <div key={i} className={styles.oddsItem}>
                  <p>{line}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Players to Watch */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Players to Watch</h3>

            {game.awayPlayers.length > 0 && (
              <div className={styles.teamGroup}>
                <h4 className={styles.teamGroupName}>
                  {away?.city} {away?.name}
                </h4>
                {game.awayPlayers.map((p) => (
                  <PlayerCard key={p.name} player={p} />
                ))}
              </div>
            )}

            {game.homePlayers.length > 0 && (
              <div className={styles.teamGroup}>
                <h4 className={styles.teamGroupName}>
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
          <span className={styles.dot} />
          <span>Updated {game.lastUpdated}</span>
        </footer>
      </div>
    </div>
  );
}

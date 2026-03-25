"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { type Game, type PlayerSpotlight } from "@/data/games";
import { teams } from "@/data/teams";
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
      // Reset scroll position when opening
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
    }, 280);
  }, [onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (visible) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [visible, handleClose]);

  // iOS-style: collapse header on scroll
  const handleScroll = useCallback(() => {
    if (!bodyRef.current) return;
    const scrollTop = bodyRef.current.scrollTop;
    setCollapsed(scrollTop > 40);
  }, []);

  if (!visible || !game) return null;

  const away = teams[game.awayAbbr];
  const home = teams[game.homeAbbr];

  return (
    <div className={`${styles.overlay} ${closing ? styles.overlayOut : ""}`}>
      <div className={styles.backdrop} onClick={handleClose} />

      <div className={`${styles.drawer} ${closing ? styles.drawerOut : ""}`}>
        {/* Close */}
        <button className={styles.close} onClick={handleClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <path d="M13.5 4.5L4.5 13.5M4.5 4.5l9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* ── Header — collapses on scroll ── */}
        <header className={`${styles.header} ${collapsed ? styles.headerCollapsed : styles.headerExpanded}`}>
          <div className={`${styles.matchup} ${collapsed ? styles.matchupCollapsed : ""}`}>
            <div className={`${styles.teamCol} ${collapsed ? styles.teamColCollapsed : ""}`}>
              <Image
                src={away?.logo || ""}
                alt={away?.name || game.awayAbbr}
                width={48}
                height={48}
                className={`${styles.teamLogo} ${collapsed ? styles.teamLogoCollapsed : styles.teamLogoExpanded}`}
                unoptimized
              />
              <span className={`${styles.teamAbbr} ${collapsed ? styles.teamAbbrCollapsed : styles.teamAbbrExpanded}`}>
                {game.awayAbbr}
              </span>
              <span className={`${styles.teamCity} ${collapsed ? styles.teamCityHidden : ""}`}>
                {away?.city}
              </span>
            </div>
            <div className={`${styles.vs} ${collapsed ? styles.vsCollapsed : ""}`}>
              <span className={`${styles.atSign} ${collapsed ? styles.atSignCollapsed : ""}`}>@</span>
              <span className={`${styles.spreadVal} ${collapsed ? styles.spreadValCollapsed : ""}`}>
                {game.spread}
              </span>
            </div>
            <div className={`${styles.teamCol} ${collapsed ? styles.teamColCollapsed : ""}`}>
              <Image
                src={home?.logo || ""}
                alt={home?.name || game.homeAbbr}
                width={48}
                height={48}
                className={`${styles.teamLogo} ${collapsed ? styles.teamLogoCollapsed : styles.teamLogoExpanded}`}
                unoptimized
              />
              <span className={`${styles.teamAbbr} ${collapsed ? styles.teamAbbrCollapsed : styles.teamAbbrExpanded}`}>
                {game.homeAbbr}
              </span>
              <span className={`${styles.teamCity} ${collapsed ? styles.teamCityHidden : ""}`}>
                {home?.city}
              </span>
            </div>
          </div>
          <p className={`${styles.meta} ${collapsed ? styles.metaHidden : ""}`}>
            {game.date} · {game.time} · O/U {game.overUnder}
          </p>
        </header>

        {/* ── Bottom line / What to know ── */}
        <section className={styles.takeaway}>
          <span className={styles.takeawayLabel}>The Bottom Line</span>
          <p className={styles.takeawayText}>{game.takeaway}</p>
        </section>

        {/* ── Scrollable body ── */}
        <div className={styles.body} ref={bodyRef} onScroll={handleScroll}>
          {/* Story */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>The Story</h3>
            <p className={styles.bodyText}>{game.story}</p>
          </section>

          {/* Odds */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>What the Numbers Mean</h3>
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
            <h3 className={styles.sectionTitle}>Players to Watch</h3>

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
        <footer className={styles.drawerFooter}>
          <p>Updated {game.lastUpdated}</p>
        </footer>
      </div>
    </div>
  );
}

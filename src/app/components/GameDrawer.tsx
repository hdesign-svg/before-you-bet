"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { type Game, type PlayerSpotlight } from "@/data/games";
import { teams } from "@/data/teams";
import {
  X,
  Lightbulb,
  BookOpen,
  BarChart3,
  Users,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
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
        <TrendingUp size={12} />
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
    }, 280);
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
    setCollapsed(bodyRef.current.scrollTop > 40);
  }, []);

  if (!visible || !game) return null;

  const away = teams[game.awayAbbr];
  const home = teams[game.homeAbbr];

  return (
    <div className={`${styles.overlay} ${closing ? styles.overlayOut : ""}`}>
      <div className={styles.backdrop} onClick={handleClose} />

      <div className={`${styles.drawer} ${closing ? styles.drawerOut : ""}`}>
        {/* ── Header — collapses on scroll ── */}
        <header className={`${styles.header} ${collapsed ? styles.headerCollapsed : styles.headerExpanded}`}>
          {/* Close button - always right-aligned in header flow */}
          <div className={styles.headerRow}>
            <div className={`${styles.matchup} ${collapsed ? styles.matchupSmall : ""}`}>
              {/* Away */}
              <div className={`${styles.teamCol} ${collapsed ? styles.teamColSmall : ""}`}>
                <Image
                  src={away?.logo || ""}
                  alt={away?.name || game.awayAbbr}
                  width={48}
                  height={48}
                  className={`${styles.teamLogo} ${collapsed ? styles.teamLogoSmall : ""}`}
                  unoptimized
                />
                <div className={styles.teamText}>
                  <span className={`${styles.teamAbbr} ${collapsed ? styles.teamAbbrSmall : ""}`}>
                    {game.awayAbbr}
                  </span>
                  {!collapsed && <span className={styles.teamCity}>{away?.city}</span>}
                </div>
              </div>

              {/* VS center */}
              <div className={`${styles.vsCenter} ${collapsed ? styles.vsCenterSmall : ""}`}>
                <span className={styles.atLabel}>@</span>
                <span className={`${styles.spreadChip} ${collapsed ? styles.spreadChipSmall : ""}`}>
                  {game.spread}
                </span>
              </div>

              {/* Home */}
              <div className={`${styles.teamCol} ${collapsed ? styles.teamColSmall : ""}`}>
                <Image
                  src={home?.logo || ""}
                  alt={home?.name || game.homeAbbr}
                  width={48}
                  height={48}
                  className={`${styles.teamLogo} ${collapsed ? styles.teamLogoSmall : ""}`}
                  unoptimized
                />
                <div className={styles.teamText}>
                  <span className={`${styles.teamAbbr} ${collapsed ? styles.teamAbbrSmall : ""}`}>
                    {game.homeAbbr}
                  </span>
                  {!collapsed && <span className={styles.teamCity}>{home?.city}</span>}
                </div>
              </div>
            </div>

            <button className={styles.close} onClick={handleClose} aria-label="Close">
              <X size={16} />
            </button>
          </div>

          {!collapsed && (
            <div className={styles.headerMeta}>
              <span className={styles.metaChip}>{game.date}</span>
              <span className={styles.metaChip}>{game.time}</span>
              <span className={styles.metaChip}>O/U {game.overUnder}</span>
            </div>
          )}
        </header>

        {/* ── Scrollable body — takeaway hero is first thing ── */}
        <div className={styles.body} ref={bodyRef} onScroll={handleScroll}>
          {/* HERO: The Bottom Line */}
          <section className={styles.hero}>
            <div className={styles.heroIcon}>
              <Lightbulb size={20} />
            </div>
            <div className={styles.heroContent}>
              <span className={styles.heroLabel}>The Bottom Line</span>
              <p className={styles.heroText}>{game.takeaway}</p>
            </div>
          </section>

          {/* Story */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <BookOpen size={16} />
              The Story
            </h3>
            <p className={styles.bodyText}>{game.story}</p>
          </section>

          {/* Odds */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <BarChart3 size={16} />
              What the Numbers Mean
            </h3>
            <div className={styles.oddsList}>
              {game.oddsExplained.map((line, i) => (
                <div key={i} className={styles.oddsItem}>
                  <span className={styles.oddsNum}>{i + 1}</span>
                  <p>{line}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Players */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <Users size={16} />
              Players to Watch
            </h3>

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

        {/* Footer — sync status */}
        <footer className={styles.drawerFooter}>
          <div className={styles.footerSync}>
            <CheckCircle2 size={13} />
            <span>Updated {game.lastUpdated}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

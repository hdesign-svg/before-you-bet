"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { games, WEEK, type Game, type PlayerSpotlight } from "@/data/games";
import { teams } from "@/data/teams";
import { getPlayerHeadshot } from "@/data/players";
import s from "./page.module.css";

/* ─── Helpers ─── */

function groupByDay(list: Game[]) {
  const order = [
    "Thursday",
    "Sunday Early",
    "Sunday Late",
    "Sunday Night",
    "Monday Night",
  ];
  const map: Record<string, Game[]> = {};
  for (const g of list) {
    let label: string;
    if (g.date.startsWith("Thu")) label = "Thursday";
    else if (g.date.startsWith("Mon")) label = "Monday Night";
    else if (g.time.includes("8:20") || g.time.includes("8:15"))
      label = g.date.startsWith("Mon") ? "Monday Night" : "Sunday Night";
    else if (g.time.includes("4:")) label = "Sunday Late";
    else label = "Sunday Early";
    (map[label] ??= []).push(g);
  }
  return order.filter((l) => map[l]).map((label) => ({ label, games: map[label] }));
}

/* ─── Sub-components ─── */

function PlayerCard({ player }: { player: PlayerSpotlight }) {
  const src = getPlayerHeadshot(player.name);
  return (
    <div className={s.playerCard}>
      <div className={s.playerHead}>
        {src && (
          <Image
            src={src}
            alt={player.name}
            width={48}
            height={35}
            className={s.headshot}
            unoptimized
          />
        )}
        <div>
          <p className={s.playerName}>{player.name}</p>
          <span className={s.posBadge}>{player.position}</span>
        </div>
      </div>
      <p className={s.verdict}>{player.verdict}</p>
      <p className={s.projection}>{player.projection}</p>
    </div>
  );
}

/* ─── Main Page ─── */

export default function Page() {
  const [active, setActive] = useState<Game | null>(null);
  const detailRef = useRef<HTMLElement>(null);
  const backBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const slots = useMemo(() => groupByDay(games), []);

  const open = useCallback((g: Game, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setActive(g);
    window.scrollTo({ top: 0 });
  }, []);

  const close = useCallback(() => {
    const trigger = triggerRef.current;
    setActive(null);
    // Restore focus to the card that opened detail
    requestAnimationFrame(() => trigger?.focus());
  }, []);

  // Keyboard: Escape to close detail
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && active) close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close]);

  // Focus the back button when detail opens
  useEffect(() => {
    if (active && backBtnRef.current) backBtnRef.current.focus();
  }, [active]);

  const away = active ? teams[active.awayAbbr] : null;
  const home = active ? teams[active.homeAbbr] : null;

  /* ─────────── DETAIL VIEW ─────────── */
  if (active && away && home) {
    const gradBg = `linear-gradient(135deg, ${away.color} 0%, ${home.color} 100%)`;

    return (
      <main className={s.detailView} style={{ background: gradBg }} ref={detailRef} aria-label={`${away.city} ${away.name} at ${home.city} ${home.name}`}>
        {/* Back */}
        <nav className={s.detailNav}>
          <button ref={backBtnRef} className={s.backBtn} onClick={close}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>All Games</span>
          </button>
        </nav>

        {/* Matchup hero */}
        <header className={s.hero}>
          <h1 className={s.srOnly}>{away.city} {away.name} at {home.city} {home.name}</h1>
          <div className={s.heroTeam}>
            <Image src={away.logo} alt={`${away.city} ${away.name} logo`} width={72} height={72} className={s.heroLogo} unoptimized />
            <span className={s.heroCity}>{away.city}</span>
            <span className={s.heroName}>{away.name}</span>
          </div>
          <div className={s.heroMid}>
            <span className={s.heroAt}>at</span>
            <span className={s.heroTime}>{active.date}</span>
            <span className={s.heroTime}>{active.time}</span>
          </div>
          <div className={s.heroTeam}>
            <Image src={home.logo} alt={`${home.city} ${home.name} logo`} width={72} height={72} className={s.heroLogo} unoptimized />
            <span className={s.heroCity}>{home.city}</span>
            <span className={s.heroName}>{home.name}</span>
          </div>
        </header>

        {/* Content cards on gradient */}
        <div className={s.detailContent}>
          {/* Insight card */}
          <section className={s.card}>
            <h2 className={s.cardHeadline}>{active.headline}</h2>
            <ul className={s.bullets}>
              {active.rundown.map((b, i) => (
                <li key={i} className={s.bullet}>{b}</li>
              ))}
            </ul>
          </section>

          {/* Players card */}
          <section className={s.card}>
            <h3 className={s.cardTitle}>Players to Watch</h3>
            <div className={s.playerGrid}>
              {active.awayPlayers.length > 0 && (
                <div className={s.teamCol}>
                  <h4 className={s.teamLabel}>{away.name}</h4>
                  {active.awayPlayers.map((p) => (
                    <PlayerCard key={p.name} player={p} />
                  ))}
                </div>
              )}
              {active.homePlayers.length > 0 && (
                <div className={s.teamCol}>
                  <h4 className={s.teamLabel}>{home.name}</h4>
                  {active.homePlayers.map((p) => (
                    <PlayerCard key={p.name} player={p} />
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        <footer className={s.detailFooter}>
          <span>Updated {active.lastUpdated}</span>
        </footer>
      </main>
    );
  }

  /* ─────────── GRID VIEW ─────────── */
  return (
    <main className={s.gridView}>
      {/* Header */}
      <header className={s.header}>
        <div className={s.headerLeft}>
          <h1 className={s.wordmark}>Before You Bet</h1>
          <p className={s.subtitle}>
            Plain-English game intelligence for people who don&apos;t speak betting.
          </p>
        </div>
        <div className={s.headerRight}>
          <span className={s.weekBadge}>Week {WEEK.number}</span>
          <span className={s.weekDate}>{WEEK.dateRange}</span>
        </div>
      </header>

      {/* Game slots */}
      {slots.map((slot) => (
        <section key={slot.label} className={s.slot}>
          <h2 className={s.slotLabel}>{slot.label}</h2>
          <div className={s.grid}>
            {slot.games.map((game, idx) => {
              const a = teams[game.awayAbbr];
              const h = teams[game.homeAbbr];
              const grad = `linear-gradient(135deg, ${a.color}, ${h.color})`;
              return (
                <button
                  key={game.slug}
                  className={s.gameCard}
                  onClick={(e) => open(game, e.currentTarget)}
                  style={{ animationDelay: `${idx * 60}ms` }}
                  aria-label={`${a.city} ${a.name} at ${h.city} ${h.name}, ${game.time}`}
                >
                  <div className={s.cardGradientStrip} style={{ background: grad }} aria-hidden="true" />
                  <div className={s.cardBody}>
                    <div className={s.cardMatchup}>
                      <div className={s.cardTeam}>
                        <Image src={a.logo} alt="" width={32} height={32} className={s.cardLogo} unoptimized />
                        <span className={s.cardAbbr}>{a.abbr}</span>
                      </div>
                      <span className={s.cardVs} aria-hidden="true">@</span>
                      <div className={s.cardTeam}>
                        <span className={s.cardAbbr}>{h.abbr}</span>
                        <Image src={h.logo} alt="" width={32} height={32} className={s.cardLogo} unoptimized />
                      </div>
                    </div>
                    <time className={s.cardTime} dateTime={game.time}>{game.time}</time>
                    <p className={s.cardPreview}>{game.headline}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      ))}

      <footer className={s.gridFooter}>
        <p>Not a sportsbook. Informational only. Updated {WEEK.lastUpdated}.</p>
      </footer>
    </main>
  );
}

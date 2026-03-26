"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { games, WEEK, type Game, type PlayerSpotlight } from "@/data/games";
import { teams } from "@/data/teams";
import { getPlayerHeadshot } from "@/data/players";
import s from "./page.module.css";

/* ─── Helpers ─── */

function groupBySlate(list: Game[]) {
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
      label = "Sunday Night";
    else if (g.time.includes("4:")) label = "Sunday Late";
    else label = "Sunday Early";
    (map[label] ??= []).push(g);
  }
  return order.filter((l) => map[l]).map((label) => ({ label, games: map[label] }));
}

function parseTime(raw: string) {
  const match = raw.match(/^(\d+:\d+)\s*(.*)$/);
  if (!match) return { time: raw, period: "" };
  return { time: match[1], period: match[2] };
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
  const [closing, setClosing] = useState(false);
  const [tab, setTab] = useState<"games" | "players">("games");
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const slates = useMemo(() => groupBySlate(games), []);

  const open = useCallback((g: Game, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setActive(g);
    document.body.style.overflow = "hidden";
  }, []);

  const close = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setActive(null);
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    }, 280);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && active && !closing) close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, closing, close]);

  useEffect(() => {
    if (active && closeBtnRef.current) closeBtnRef.current.focus();
  }, [active]);

  const away = active ? teams[active.awayAbbr] : null;
  const home = active ? teams[active.homeAbbr] : null;

  /* ─────────── LIST VIEW ─────────── */
  return (
    <main className={s.gridView}>
      {/* ─── Modal Overlay ─── */}
      {active && away && home && (
        <div
          className={`${s.overlay} ${closing ? s.overlayClosing : ""}`}
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          role="dialog"
          aria-modal="true"
          aria-label={`${away.city} ${away.name} at ${home.city} ${home.name}`}
        >
          <div ref={modalRef} className={`${s.modal} ${closing ? s.modalClosing : ""}`}>
            {/* Close button */}
            <button ref={closeBtnRef} className={s.closeBtn} onClick={close} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* Matchup hero */}
            <header className={s.hero}>
              <h2 className={s.srOnly}>{away.city} {away.name} at {home.city} {home.name}</h2>
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

            {/* Content */}
            <div className={s.detailContent}>
              {/* Insight card — coral */}
              <section className={s.insightCard}>
                <div className={s.insightLabel}>Quick Take</div>
                <h2 className={s.cardHeadline}>{active.headline}</h2>
                <ul className={s.bullets}>
                  {active.rundown.map((b, i) => (
                    <li key={i} className={s.bullet}>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Players card — white */}
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
          </div>
        </div>
      )}
      <a href="#games" className={s.srOnly}>Skip to games</a>

      {/* App Header — Midnight Strip */}
      <header className={s.header}>
        <div className={s.headerInner}>
          <div className={s.headerBrand}>
            <h1 className={s.wordmark}>Before You Bet</h1>
            <p className={s.subtitle}>
              Plain-English game intelligence for people who don{'\u2019'}t speak betting.
            </p>
          </div>
          <nav className={s.headerTabs} role="tablist">
            <button
              className={`${s.headerTab} ${tab === "games" ? s.headerTabActive : ""}`}
              role="tab"
              aria-selected={tab === "games"}
              onClick={() => setTab("games")}
            >
              Games
            </button>
            <button
              className={`${s.headerTab} ${tab === "players" ? s.headerTabActive : ""}`}
              role="tab"
              aria-selected={tab === "players"}
              onClick={() => setTab("players")}
            >
              Players
            </button>
          </nav>
        </div>
      </header>

      {/* Game Strips by Slate */}
      {slates.map((slate, slateIdx) => (
        <div key={slate.label} className={s.stripSection} id={slateIdx === 0 ? "games" : undefined}>
          <div className={s.slateHeader}>
            <span className={s.slateLabel}>{slate.label}</span>
          </div>

          {slate.games.map((game, idx) => {
            const a = teams[game.awayAbbr];
            const h = teams[game.homeAbbr];
            const { time, period } = parseTime(game.time);

            return (
              <button
                key={game.slug}
                className={s.strip}
                onClick={(e) => open(game, e.currentTarget)}
                style={{ animationDelay: `${(slateIdx * 3 + idx) * 60}ms` }}
                aria-label={`${a.city} ${a.name} at ${h.city} ${h.name}, ${game.time}`}
              >
                <div className={s.stripContent}>
                  <div className={s.stripStatus}>
                    <span className={s.statusTime}>{time}</span>
                    <span className={s.statusPeriod}>{period}</span>
                  </div>
                  <div className={s.stripLogos}>
                    <Image src={a.logo} alt="" width={32} height={32} className={s.stripLogo} unoptimized />
                    <Image src={h.logo} alt="" width={32} height={32} className={s.stripLogo} unoptimized />
                  </div>
                  <span className={s.stripTeams}>{a.abbr} @ {h.abbr}</span>
                  <p className={s.stripHeadline}>{game.headline}</p>
                  <span className={s.stripArrow} aria-hidden="true">&rarr;</span>
                </div>
              </button>
            );
          })}
        </div>
      ))}

      <footer className={s.gridFooter}>
        <p>Not a sportsbook. Informational only.</p>
        <p>Updated {WEEK.lastUpdated}</p>
      </footer>
    </main>
  );
}

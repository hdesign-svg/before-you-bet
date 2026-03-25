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

/** Parse "4:25 PM ET" → { time: "4:25", period: "PM ET" } */
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
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const detailRef = useRef<HTMLElement>(null);
  const backBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const slates = useMemo(() => groupBySlate(games), []);

  const scrollRef = useRef(0);

  // Apply theme to html element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const open = useCallback((g: Game, trigger: HTMLButtonElement) => {
    scrollRef.current = window.scrollY;
    triggerRef.current = trigger;
    setActive(g);
    window.scrollTo({ top: 0 });
  }, []);

  const close = useCallback(() => {
    const trigger = triggerRef.current;
    const scrollY = scrollRef.current;
    setActive(null);
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollY });
      trigger?.focus();
    });
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

  /* ─────────── STRIP LIST VIEW ─────────── */
  return (
    <main className={s.gridView}>
      <a href="#games" className={s.srOnly}>Skip to games</a>

      {/* Hero Header */}
      <header className={s.header}>
        <div className={s.headerTop}>
          <span className={s.weekTag}>Week {WEEK.number} · NFL</span>
          <button
            className={s.themeToggle}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
        <h1 className={s.wordmark}>Before<br />You Bet</h1>
        <p className={s.subtitle}>
          Plain-English game intelligence for people who don{'\u2019'}t speak betting.
        </p>
      </header>

      {/* Game Strips by Slate */}
      {slates.map((slate, slateIdx) => (
        <div key={slate.label} className={s.stripSection} id={slateIdx === 0 ? "games" : undefined}>
          <div className={s.slateHeader}>
            <span className={s.slateLabel}>{slate.label}</span>
            <div className={s.slateLine} />
          </div>

          {slate.games.map((game, idx) => {
            const a = teams[game.awayAbbr];
            const h = teams[game.homeAbbr];
            const grad = `linear-gradient(to bottom, ${a.color}, ${h.color})`;
            const { time, period } = parseTime(game.time);

            return (
              <button
                key={game.slug}
                className={s.strip}
                onClick={(e) => open(game, e.currentTarget)}
                style={{ animationDelay: `${(slateIdx * 3 + idx) * 60}ms` }}
                aria-label={`${a.city} ${a.name} at ${h.city} ${h.name}, ${game.time}`}
              >
                <div className={s.stripGradient} style={{ background: grad }} aria-hidden="true" />
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

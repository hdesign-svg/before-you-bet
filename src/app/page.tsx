"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { games, WEEK, type Game } from "@/data/games";
import { teams } from "@/data/teams";
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

/* ─── Main Page ─── */

export default function Page() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [tab, setTab] = useState<"games" | "players">("games");
  const slates = useMemo(() => groupBySlate(games), []);

  const toggle = (slug: string) => {
    setExpanded((prev) => (prev === slug ? null : slug));
  };

  return (
    <main className={s.page}>
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

      {/* Game Card Grid */}
      <div className={s.content}>
        {slates.map((slate, slateIdx) => (
          <section key={slate.label} className={s.slateSection} id={slateIdx === 0 ? "games" : undefined}>
            <div className={s.slateHeader}>
              <span className={s.slateLabel}>{slate.label}</span>
            </div>

            <div className={s.cardGrid}>
              {slate.games.map((game, idx) => {
                const a = teams[game.awayAbbr];
                const h = teams[game.homeAbbr];
                const { time, period } = parseTime(game.time);
                const isOpen = expanded === game.slug;

                return (
                  <article
                    key={game.slug}
                    className={`${s.gameCard} ${isOpen ? s.gameCardExpanded : ""}`}
                    style={{ animationDelay: `${(slateIdx * 3 + idx) * 60}ms` }}
                  >
                    {/* Card header — always visible, clickable */}
                    <button
                      className={s.cardTrigger}
                      onClick={() => toggle(game.slug)}
                      aria-expanded={isOpen}
                      aria-label={`${a.city} ${a.name} at ${h.city} ${h.name}, ${game.time}`}
                    >
                      <div className={s.cardMatchup}>
                        <div className={s.cardTeam}>
                          <Image src={a.logo} alt="" width={40} height={40} className={s.cardLogo} unoptimized />
                          <span className={s.cardAbbr}>{a.abbr}</span>
                        </div>
                        <div className={s.cardMid}>
                          <span className={s.cardTime}>{time}</span>
                          <span className={s.cardPeriod}>{period}</span>
                        </div>
                        <div className={s.cardTeam}>
                          <Image src={h.logo} alt="" width={40} height={40} className={s.cardLogo} unoptimized />
                          <span className={s.cardAbbr}>{h.abbr}</span>
                        </div>
                      </div>
                      <p className={s.cardHeadline}>{game.headline}</p>
                    </button>

                    {/* Expanded intel — slides open */}
                    {isOpen && (
                      <div className={s.cardIntel}>
                        <div className={s.intelLabel}>Quick Take</div>
                        <ul className={s.intelBullets}>
                          {game.rundown.map((b, i) => (
                            <li key={i} className={s.intelBullet}>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                        <div className={s.intelFooter}>
                          <span>Updated {game.lastUpdated}</span>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        ))}

        <footer className={s.pageFooter}>
          <p>Not a sportsbook. Informational only.</p>
          <p>Updated {WEEK.lastUpdated}</p>
        </footer>
      </div>
    </main>
  );
}

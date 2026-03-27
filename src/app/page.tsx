"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown, Zap, Info, Search, Trophy, Users } from "lucide-react";
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

/* ─── Slate icon mapping ─── */
const slateIcon: Record<string, string> = {
  "Thursday": "THU",
  "Sunday Early": "SUN",
  "Sunday Late": "SUN",
  "Sunday Night": "SNF",
  "Monday Night": "MNF",
};

/* ─── Main Page ─── */

export default function Page() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [tab, setTab] = useState<"games" | "players">("games");
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);
  const slates = useMemo(() => groupBySlate(games), []);

  useEffect(() => {
    const threshold = 10;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 60) { setHeaderHidden(false); }
      else if (y - lastScrollY.current > threshold) { setHeaderHidden(true); }
      else if (lastScrollY.current - y > threshold) { setHeaderHidden(false); }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = (slug: string) => {
    setExpanded((prev) => (prev === slug ? null : slug));
  };

  return (
    <main className={s.page}>
      <a href="#games" className={s.srOnly}>Skip to games</a>

      {/* Sticky Header */}
      <header className={`${s.header} ${headerHidden ? s.headerHidden : ""}`}>
        <div className={`${s.container} ${s.headerInner}`}>
          <div className={s.headerBrand}>
            <h1 className={s.wordmark}>Before You Bet</h1>
            <p className={s.subtitle}>
              Don{'\u2019'}t bet blind
            </p>
          </div>
          <div className={s.headerSearch}>
            <Search size={14} className={s.headerSearchIcon} />
            <span className={s.headerSearchPlaceholder}>Search games or players...</span>
          </div>
        </div>
      </header>

      {/* Content Tabs + Card Grid */}
      <div className={s.container}>
        <div className={s.contentBar}>
          <nav className={s.contentTabs} role="tablist">
            <button
              className={`${s.contentTab} ${tab === "games" ? s.contentTabActive : ""}`}
              role="tab"
              aria-selected={tab === "games"}
              onClick={() => setTab("games")}
            >
              <Trophy size={14} className={s.tabIcon} />
              Games
            </button>
            <button
              className={`${s.contentTab} ${tab === "players" ? s.contentTabActive : ""}`}
              role="tab"
              aria-selected={tab === "players"}
              onClick={() => setTab("players")}
            >
              <Users size={14} className={s.tabIcon} />
              Players
            </button>
          </nav>
          <span className={s.contentWeek}>Week {WEEK.number} &middot; {WEEK.dateRange}</span>
        </div>
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
                  <div
                    key={game.slug}
                    className={`${s.gameCard} ${isOpen ? s.gameCardExpanded : ""}`}
                    style={{ animationDelay: `${(slateIdx * 3 + idx) * 50}ms` }}
                  >
                    {/* Card matchup zone */}
                    <div className={s.cardMatchupZone}>
                      <div className={s.cardMatchup}>
                        <div className={s.cardTeam}>
                          <div className={s.cardLogoBg}>
                            <Image src={a.logo} alt="" width={52} height={52} className={s.cardLogo} unoptimized />
                          </div>
                          <span className={s.cardAbbr}>{a.abbr}</span>
                          <span className={s.cardCity}>{a.city}</span>
                        </div>
                        <div className={s.cardMid}>
                          <span className={s.cardVs}>VS</span>
                          <span className={s.cardTime}>{time}</span>
                          <span className={s.cardPeriod}>{period}</span>
                        </div>
                        <div className={s.cardTeam}>
                          <div className={s.cardLogoBg}>
                            <Image src={h.logo} alt="" width={52} height={52} className={s.cardLogo} unoptimized />
                          </div>
                          <span className={s.cardAbbr}>{h.abbr}</span>
                          <span className={s.cardCity}>{h.city}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card body — clickable */}
                    <button
                      className={s.cardBody}
                      onClick={() => toggle(game.slug)}
                      aria-expanded={isOpen}
                      aria-label={`${a.city} ${a.name} at ${h.city} ${h.name}, ${game.time}`}
                    >
                      <p className={s.cardHeadline}>{game.headline}</p>
                      <span className={s.cardCta}>
                        <Zap size={12} className={s.ctaIcon} />
                        {isOpen ? "Close" : "Quick Take"}
                        <ChevronDown size={12} className={`${s.cardChevron} ${isOpen ? s.cardChevronOpen : ""}`} />
                      </span>
                    </button>

                    {/* Expanded intel — absolute overlay */}
                    {isOpen && (
                      <div className={s.cardIntel}>
                        <div className={s.intelInner}>
                          <div className={s.intelHeader}>
                            <Zap size={14} className={s.intelIcon} />
                            <span className={s.intelLabel}>Quick Take</span>
                          </div>
                          <ul className={s.intelBullets}>
                            {game.rundown.map((b, i) => (
                              <li key={i} className={s.intelBullet}>
                                {b}
                              </li>
                            ))}
                          </ul>
                          <div className={s.intelFooter}>
                            <Info size={10} className={s.intelFooterIcon} />
                            <span>Updated {game.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}

      </div>

      <footer className={s.pageFooter}>
        <div className={`${s.container} ${s.footerInner}`}>
          <p className={s.footerDisclaimer}>Not a sportsbook. Informational only.</p>
          <hr className={s.footerDivider} />
          <a className={s.footerLink} href="/about">About Before You Bet</a>
        </div>
      </footer>
    </main>
  );
}

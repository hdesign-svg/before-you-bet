"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown, Search, Calendar, TrendingUp, Shield, ArrowRight } from "lucide-react";
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
              <Calendar size={14} className={s.tabIcon} />
              Games
            </button>
            <button
              className={`${s.contentTab} ${tab === "players" ? s.contentTabActive : ""}`}
              role="tab"
              aria-selected={tab === "players"}
              onClick={() => setTab("players")}
            >
              <TrendingUp size={14} className={s.tabIcon} />
              Players
            </button>
          </nav>
          <span className={s.contentWeek}>
            <span className={s.weekLabel}>Week {WEEK.number}</span>
            <span className={s.weekRange}>&middot; {WEEK.dateRange}</span>
          </span>
        </div>
        {slates.map((slate, slateIdx) => (
          <section key={slate.label} className={s.slateSection} id={slateIdx === 0 ? "games" : undefined}>
            <div className={s.slateHeader}>
              <span className={s.slateLabel}>{slate.label}</span>
            </div>

            <div className={s.gameList}>
              {slate.games.map((game, idx) => {
                const a = teams[game.awayAbbr];
                const h = teams[game.homeAbbr];
                const { time, period } = parseTime(game.time);
                const isOpen = expanded === game.slug;
                const allPlayers = [...game.awayPlayers, ...game.homePlayers];
                const pickLabel =
                  game.pick === "away" ? a.abbr :
                  game.pick === "home" ? h.abbr : null;

                return (
                  <article
                    key={game.slug}
                    className={s.gameRow}
                    style={{ animationDelay: `${(slateIdx * 3 + idx) * 50}ms` }}
                  >
                    <div className={s.rowMain}>
                      {/* Matchup */}
                      <div className={s.rowMatchup}>
                        <div className={s.rowTeams}>
                          <div className={s.rowTeam}>
                            <Image src={a.logo} alt="" width={32} height={32} className={s.rowLogo} unoptimized />
                            <span className={s.rowAbbr}>{a.abbr}</span>
                          </div>
                          <span className={s.rowAt}>@</span>
                          <div className={s.rowTeam}>
                            <Image src={h.logo} alt="" width={32} height={32} className={s.rowLogo} unoptimized />
                            <span className={s.rowAbbr}>{h.abbr}</span>
                          </div>
                        </div>
                        <span className={s.rowTime}>{time} <span className={s.rowPeriod}>{period}</span></span>
                      </div>

                      {/* Verdict + confidence */}
                      <div className={s.rowVerdict}>
                        <span className={s.verdictText}>{game.verdict}</span>
                        <span className={`${s.confidenceBadge} ${s[`confidence_${game.confidence.replace("-", "")}`]}`}>
                          <Shield size={10} />
                          {game.confidence === "lock" ? "Lock" : game.confidence === "lean" ? "Lean" : "Toss-Up"}
                        </span>
                      </div>

                      {/* Factor tags */}
                      <div className={s.rowFactors}>
                        {game.factors.map((f, i) => (
                          <span key={i} className={s.factorTag}>{f}</span>
                        ))}
                      </div>

                      {/* Pick + expand */}
                      <div className={s.rowEnd}>
                        {pickLabel && (
                          <span className={s.pickBadge}>
                            <ArrowRight size={10} />
                            {pickLabel}
                          </span>
                        )}
                        <button
                          className={s.rowExpand}
                          onClick={() => toggle(game.slug)}
                          aria-expanded={isOpen}
                          aria-label={`${isOpen ? "Hide" : "Show"} key players`}
                        >
                          Players
                          <ChevronDown size={10} className={`${s.rowChevron} ${isOpen ? s.rowChevronOpen : ""}`} />
                        </button>
                      </div>
                    </div>

                    {/* Expandable player section */}
                    {isOpen && (
                      <div className={s.rowPlayers}>
                        {allPlayers.map((p, i) => (
                          <div key={i} className={s.playerCard}>
                            <div className={s.playerHeader}>
                              <span className={s.playerName}>{p.name}</span>
                              <span className={s.playerMeta}>{p.position} · {p.team}</span>
                            </div>
                            <p className={s.playerVerdict}>{p.verdict}</p>
                            <p className={s.playerProjection}>{p.projection}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </article>
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

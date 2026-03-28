"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown, Search, Calendar, TrendingUp } from "lucide-react";
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

                const awayEdge = game.pick === "away" ? game.edge : 100 - game.edge;
                const homeEdge = 100 - awayEdge;

                return (
                  <article
                    key={game.slug}
                    className={s.gameRow}
                    style={{ animationDelay: `${(slateIdx * 3 + idx) * 50}ms` }}
                  >
                    {/* Top: matchup + time */}
                    <div className={s.rowHeader}>
                      <div className={s.rowTeams}>
                        <div className={s.rowTeam}>
                          <Image src={a.logo} alt="" width={32} height={32} className={s.rowLogo} unoptimized />
                          <div className={s.teamInfo}>
                            <span className={s.rowAbbr}>{a.abbr}</span>
                            <span className={s.rowRecord}>{a.record}</span>
                          </div>
                        </div>
                        <span className={s.rowAt}>@</span>
                        <div className={s.rowTeam}>
                          <Image src={h.logo} alt="" width={32} height={32} className={s.rowLogo} unoptimized />
                          <div className={s.teamInfo}>
                            <span className={s.rowAbbr}>{h.abbr}</span>
                            <span className={s.rowRecord}>{h.record}</span>
                          </div>
                        </div>
                      </div>
                      <span className={s.rowTime}>{time} <span className={s.rowPeriod}>{period}</span></span>
                    </div>

                    {/* Middle: takeaway + story */}
                    <div className={s.rowNarrative}>
                      <p className={s.rowTakeaway}>{game.takeaway}</p>
                      <p className={s.rowStory}>{game.story}</p>
                    </div>

                    {/* Bottom: visual signals — horizontal row */}
                    <div className={s.rowSignals}>
                      {/* Edge meter — tug of war */}
                      <div className={s.edgeMeter}>
                        <span className={s.edgeLabel}>{a.abbr}</span>
                        <div className={s.edgeTrack}>
                          <div
                            className={s.edgeFillAway}
                            style={{ width: `${awayEdge}%` }}
                          />
                          <div
                            className={s.edgeFillHome}
                            style={{ width: `${homeEdge}%` }}
                          />
                        </div>
                        <span className={s.edgeLabel}>{h.abbr}</span>
                      </div>

                      {/* Predicted score */}
                      <div className={s.predictedScore}>
                        <span className={s.scoreLabel}>Predicted</span>
                        <div className={s.scoreNumbers}>
                          <span className={`${s.scoreTeam} ${game.predictedScore.away > game.predictedScore.home ? s.scoreWinner : ""}`}>
                            {a.abbr} {game.predictedScore.away}
                          </span>
                          <span className={s.scoreDash}>–</span>
                          <span className={`${s.scoreTeam} ${game.predictedScore.home > game.predictedScore.away ? s.scoreWinner : ""}`}>
                            {game.predictedScore.home} {h.abbr}
                          </span>
                        </div>
                      </div>

                      {/* Players expand */}
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

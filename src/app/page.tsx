"use client";

import { useState, useMemo, useEffect, useRef, useCallback, useLayoutEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { games, WEEK, type Game } from "@/data/games";
import { teams } from "@/data/teams";
import s from "./page.module.css";

/* ─── Helpers ─── */

function groupBySlate(list: Game[]) {
  const order = ["Thursday", "Sunday Early", "Sunday Late", "Sunday Night", "Monday Night"];
  const map: Record<string, Game[]> = {};
  for (const g of list) {
    let label: string;
    if (g.date.startsWith("Thu")) label = "Thursday";
    else if (g.date.startsWith("Mon")) label = "Monday Night";
    else if (g.time.includes("8:20") || g.time.includes("8:15")) label = "Sunday Night";
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
  const [activeTab, setActiveTab] = useState<"games" | "bets">("games");
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});
  const flipRectsRef = useRef<Record<string, DOMRect>>({});
  const slates = useMemo(() => groupBySlate(games), []);

  /* Header hide on scroll */
  useEffect(() => {
    const threshold = 10;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 60) setHeaderHidden(false);
      else if (y - lastScrollY.current > threshold) setHeaderHidden(true);
      else if (lastScrollY.current - y > threshold) setHeaderHidden(false);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* FLIP: capture rects before state change, animate after */
  const handleCardClick = useCallback((slug: string) => {
    const rects: Record<string, DOMRect> = {};
    for (const [key, el] of Object.entries(cardRefs.current)) {
      if (el) rects[key] = el.getBoundingClientRect();
    }
    flipRectsRef.current = rects;
    setExpandedSlug((prev) => (prev === slug ? null : slug));
  }, []);

  useLayoutEffect(() => {
    const prevRects = flipRectsRef.current;
    if (!Object.keys(prevRects).length) return;

    const animations: Animation[] = [];

    for (const [slug, el] of Object.entries(cardRefs.current)) {
      if (!el || !prevRects[slug]) continue;
      const newRect = el.getBoundingClientRect();
      const prevRect = prevRects[slug];

      const dx = prevRect.left - newRect.left;
      const dy = prevRect.top - newRect.top;
      const sw = prevRect.width / newRect.width;
      const sh = prevRect.height / newRect.height;

      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5 && Math.abs(sw - 1) < 0.005 && Math.abs(sh - 1) < 0.005) continue;

      const anim = el.animate(
        [
          { transform: `translate(${dx}px, ${dy}px) scale(${sw}, ${sh})`, transformOrigin: "top left" },
          { transform: "none", transformOrigin: "top left" },
        ],
        { duration: 400, easing: "cubic-bezier(0.4, 0, 0.2, 1)", fill: "none" }
      );
      animations.push(anim);
    }

    flipRectsRef.current = {};

    // Scroll expanded card into view after animation
    if (expandedSlug && cardRefs.current[expandedSlug]) {
      const el = cardRefs.current[expandedSlug];
      Promise.all(animations.map((a) => a.finished)).then(() => {
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [expandedSlug]);

  /* ESC to close */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && expandedSlug) handleCardClick(expandedSlug);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [expandedSlug, handleCardClick]);

  return (
    <main className={s.page}>
      <a href="#games" className={s.srOnly}>Skip to games</a>

      {/* ═══ Header ═══ */}
      <header className={`${s.header} ${headerHidden ? s.headerHidden : ""}`}>
        <div className={`${s.container} ${s.headerInner}`}>
          <h1 className={s.wordmark}>Before You Bet</h1>
          <div className={s.headerRight}>
            <span className={s.weekBadge}>Week {WEEK.number}</span>
            <span className={s.lastUpdated}>{WEEK.lastUpdated}</span>
          </div>
        </div>
      </header>

      <div className={s.container}>
        {/* ═══ Tabs ═══ */}
        <nav className={s.tabs} role="tablist">
          <button
            className={`${s.tab} ${activeTab === "games" ? s.tabActive : ""}`}
            role="tab"
            aria-selected={activeTab === "games"}
            onClick={() => setActiveTab("games")}
          >
            Games
          </button>
          <button
            className={`${s.tab} ${activeTab === "bets" ? s.tabActive : ""}`}
            role="tab"
            aria-selected={activeTab === "bets"}
            onClick={() => setActiveTab("bets")}
          >
            Player Bets
          </button>
        </nav>

        {/* ═══ Games Tab ═══ */}
        {activeTab === "games" && (
          <div className={s.gamesContent} id="games">
            {slates.map((slate) => (
              <section key={slate.label}>
                <div className={s.slateLabel}>{slate.label}</div>
                <div className={s.grid}>
                  {slate.games.map((game) => {
                    const a = teams[game.awayAbbr];
                    const h = teams[game.homeAbbr];
                    const isExpanded = expandedSlug === game.slug;
                    const isTossup = game.pick === "toss-up";
                    const edgePct = Math.max(game.edge, 100 - game.edge);
                    const favoredColor = isTossup ? "#A1A1AA" : (game.pick === "away" ? a.color : h.color);
                    const { time, period } = parseTime(game.time);
                    const awayEdge = game.pick === "away" ? game.edge : 100 - game.edge;

                    return (
                      <article
                        key={game.slug}
                        className={`${s.gameCard} ${isExpanded ? s.expanded : ""}`}
                        ref={(el) => { cardRefs.current[game.slug] = el; }}
                      >
                        {/* ── Compact Card ── */}
                        {!isExpanded && (
                          <button
                            className={s.compact}
                            onClick={() => handleCardClick(game.slug)}
                            aria-label={`${a.name} at ${h.name} — ${game.takeaway}`}
                          >
                            <div className={s.compactMatchup}>
                              <Image src={a.logo} alt="" width={28} height={28} className={s.compactLogo} unoptimized />
                              <span className={s.compactAt}>@</span>
                              <Image src={h.logo} alt="" width={28} height={28} className={s.compactLogo} unoptimized />
                            </div>
                            <p className={s.compactVerdict}>{game.takeaway}</p>
                            <div className={s.compactFooter}>
                              <span className={s.compactDate}>{game.date}</span>
                              <div className={s.compactEdge}>
                                {!isTossup ? (
                                  <span className={s.compactPick} style={{ background: favoredColor }}>
                                    {game.pick === "away" ? a.abbr : h.abbr} {edgePct}%
                                  </span>
                                ) : (
                                  <span className={s.compactTossup}>Toss-up</span>
                                )}
                              </div>
                            </div>
                          </button>
                        )}

                        {/* ── Expanded Card ── */}
                        {isExpanded && (
                          <div className={s.expandedInner}>
                            <button
                              className={s.closeBtn}
                              onClick={() => handleCardClick(game.slug)}
                              aria-label="Close"
                            >
                              <X size={18} />
                            </button>

                            {/* Gradient matchup header */}
                            <div
                              className={`${s.matchupStrip} ${isTossup ? s.tossup : ""}`}
                              style={!isTossup ? { background: `linear-gradient(135deg, ${a.color} 0%, ${h.color} 100%)` } : undefined}
                            >
                              <div className={`${s.teamSide} ${s.away}`}>
                                <Image src={a.logo} alt="" width={40} height={40} className={s.teamLogo} unoptimized />
                                <div className={s.teamDetails}>
                                  <div className={s.teamName}>{a.name}</div>
                                  <div className={s.teamRecord}>{a.record}</div>
                                </div>
                              </div>
                              <div className={s.predCenter}>
                                <div className={s.predLabel}>Predicted</div>
                                <div className={s.predScores}>
                                  <span className={`${s.predNum} ${game.predictedScore.away >= game.predictedScore.home ? s.predFavored : ""}`}>
                                    {game.predictedScore.away}
                                  </span>
                                  <span className={s.predDash}>–</span>
                                  <span className={`${s.predNum} ${game.predictedScore.home >= game.predictedScore.away ? s.predFavored : ""}`}>
                                    {game.predictedScore.home}
                                  </span>
                                </div>
                              </div>
                              <div className={`${s.teamSide} ${s.home}`}>
                                <Image src={h.logo} alt="" width={40} height={40} className={s.teamLogo} unoptimized />
                                <div className={s.teamDetails}>
                                  <div className={s.teamName}>{h.name}</div>
                                  <div className={s.teamRecord}>{h.record}</div>
                                </div>
                              </div>
                            </div>

                            {/* Detail body */}
                            <div className={s.detailBody}>
                              {/* Verdict + Story */}
                              <div className={s.detailSection} style={{ animationDelay: "0.05s" }}>
                                <p className={s.detailVerdict}>{game.takeaway}</p>
                                <p className={s.detailStory}>{game.story}</p>
                              </div>

                              {/* Edge */}
                              <div className={s.detailSection} style={{ animationDelay: "0.1s" }}>
                                <h3 className={s.detailLabel}>The Edge</h3>
                                <div className={s.edgeRow}>
                                  <span className={`${s.edgeTeam} ${game.pick === "away" ? s.edgeFavored : ""}`}>{a.abbr}</span>
                                  <div className={s.edgeTrack}>
                                    {!isTossup && (
                                      <div
                                        className={s.edgeFill}
                                        style={{
                                          left: game.pick === "away" ? 0 : undefined,
                                          right: game.pick === "home" ? 0 : undefined,
                                          width: `${edgePct}%`,
                                          background: favoredColor,
                                        }}
                                      />
                                    )}
                                    <div
                                      className={s.edgeDot}
                                      style={{ left: `${awayEdge}%`, background: favoredColor }}
                                    />
                                  </div>
                                  <span className={s.edgePct}>{edgePct}%</span>
                                  <span className={`${s.edgeTeam} ${game.pick === "home" ? s.edgeFavored : ""}`}>{h.abbr}</span>
                                </div>
                              </div>

                              {/* Quick hits */}
                              <div className={s.detailSection} style={{ animationDelay: "0.15s" }}>
                                <h3 className={s.detailLabel}>Need to Know</h3>
                                <ol className={s.quickHits}>
                                  {game.quickHits.map((hit, i) => (
                                    <li key={i} className={s.quickHit}>
                                      <span className={s.quickHitNum}>{i + 1}</span>
                                      <span>{hit}</span>
                                    </li>
                                  ))}
                                </ol>
                              </div>

                              {/* Players */}
                              <div className={s.detailSection} style={{ animationDelay: "0.2s" }}>
                                <h3 className={s.detailLabel}>Key Players</h3>
                                <div className={s.playerCards}>
                                  {[...game.awayPlayers, ...game.homePlayers].map((p, i) => (
                                    <div key={i} className={s.playerCard}>
                                      <img
                                        src={p.headshotUrl}
                                        alt={p.name}
                                        className={s.playerHeadshot}
                                      />
                                      <div className={s.playerInfo}>
                                        <div className={s.playerHeader}>
                                          <span className={s.playerName}>{p.name}</span>
                                          <span className={s.playerBadge}>{p.position}</span>
                                        </div>
                                        <p className={s.playerVerdict}>{p.verdict}</p>
                                        <p className={s.playerProjection}>{p.projection}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className={s.detailFooter}>
                                <span>{game.date} · {time} {period}</span>
                                <span>Updated: {game.lastUpdated}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* ═══ Player Bets Tab ═══ */}
        {activeTab === "bets" && (
          <div className={s.betsContent}>
            <div className={s.betsPlaceholder}>
              <p className={s.betsPlaceholderTitle}>Player Bets</p>
              <p className={s.betsPlaceholderText}>Search and add players to get AI-powered prop and parlay projections.</p>
            </div>
          </div>
        )}
      </div>

      {/* ═══ Footer ═══ */}
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

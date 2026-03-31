"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ChevronUp } from "lucide-react";
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
  const detailRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});
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

  const toggleCard = useCallback((slug: string) => {
    setExpandedSlug((prev) => {
      const next = prev === slug ? null : slug;
      if (next) {
        // Scroll the card into view after the panel opens
        requestAnimationFrame(() => {
          setTimeout(() => {
            cardRefs.current[next]?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 50);
        });
      }
      return next;
    });
  }, []);

  /* ESC to close */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && expandedSlug) setExpandedSlug(null);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [expandedSlug]);

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
            {slates.map((slate, slateIdx) => (
              <section key={slate.label}>
                <div className={s.slateLabel}>{slate.label}</div>
                <div className={s.grid}>
                  {slate.games.map((game, idx) => {
                    const a = teams[game.awayAbbr];
                    const h = teams[game.homeAbbr];
                    const isTossup = game.pick === "toss-up";
                    const edgePct = Math.max(game.edge, 100 - game.edge);
                    const favoredColor = isTossup ? "#A1A1AA" : (game.pick === "away" ? a.color : h.color);
                    const isExpanded = expandedSlug === game.slug;
                    const { time, period } = parseTime(game.time);
                    const awayEdge = game.pick === "away" ? game.edge : 100 - game.edge;
                    const homeEdge = 100 - awayEdge;

                    return [
                      /* ── Compact Card ── */
                      <button
                        key={game.slug}
                        className={`${s.compact} ${isExpanded ? s.compactActive : ""}`}
                        ref={(el) => { cardRefs.current[game.slug] = el; }}
                        style={{ animationDelay: `${(slateIdx * 3 + idx) * 40}ms` }}
                        onClick={() => toggleCard(game.slug)}
                        aria-expanded={isExpanded}
                        aria-controls={`detail-${game.slug}`}
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
                      </button>,

                      /* ── Inline Detail Panel (accordion) ── */
                      <div
                        key={`detail-${game.slug}`}
                        id={`detail-${game.slug}`}
                        className={`${s.detailWrapper} ${isExpanded ? s.detailOpen : ""}`}
                        ref={(el) => { detailRefs.current[game.slug] = el; }}
                      >
                        <div className={s.detailInner}>
                          <div className={s.detailContent}>
                            {/* Close / collapse */}
                            <button
                              className={s.collapseBtn}
                              onClick={() => toggleCard(game.slug)}
                              aria-label="Collapse"
                            >
                              <ChevronUp size={16} />
                              <span>Collapse</span>
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
                              <div className={s.detailSection}>
                                <p className={s.detailVerdict}>{game.takeaway}</p>
                                <p className={s.detailStory}>{game.story}</p>
                              </div>

                              {/* Edge */}
                              <div className={s.detailSection}>
                                <h3 className={s.detailLabel}>The Edge</h3>
                                <div className={s.edgeBlend}>
                                  {game.pick !== "toss-up" ? (
                                    <div className={s.edgePickBlock}>
                                      <span className={s.edgePickAbbr} style={{ color: favoredColor }}>
                                        {game.pick === "away" ? a.abbr : h.abbr}
                                      </span>
                                      <span className={s.edgePickLabel}>
                                        {game.edge >= 60 ? "Our pick" : "Slight edge"}
                                      </span>
                                    </div>
                                  ) : (
                                    <div className={s.edgePickBlock}>
                                      <span className={s.edgePickDash}>—</span>
                                      <span className={s.edgePickLabel}>Toss-up</span>
                                    </div>
                                  )}
                                  <div className={s.edgeDetail}>
                                    <div className={s.edgeTrackRow}>
                                      <span className={s.edgeAbbrLabel}>{a.abbr}</span>
                                      <div className={s.edgeTrack}>
                                        <div
                                          className={s.edgeFillLeft}
                                          style={{
                                            width: `${awayEdge}%`,
                                            background: `linear-gradient(90deg, ${a.color}, ${a.color}cc)`,
                                          }}
                                        />
                                        <div className={s.edgeNeedle} style={{ left: `${awayEdge}%` }} />
                                        <div
                                          className={s.edgeFillRight}
                                          style={{
                                            width: `${homeEdge}%`,
                                            background: `linear-gradient(90deg, ${h.color}cc, ${h.color})`,
                                          }}
                                        />
                                      </div>
                                      <span className={s.edgeAbbrLabel}>{h.abbr}</span>
                                    </div>
                                    <p className={s.edgeDesc}>
                                      {game.pick === "toss-up"
                                        ? "Genuine coin flip. We don\u2019t have a confident pick on this one."
                                        : `${game.pick === "away" ? a.city : h.city} holds a ${Math.max(awayEdge, homeEdge)}\u2013${Math.min(awayEdge, homeEdge)} edge in this matchup.`}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Quick hits */}
                              <div className={s.detailSection}>
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
                              <div className={s.detailSection}>
                                <h3 className={s.detailLabel}>Key Players</h3>
                                <div className={s.playerCards}>
                                  {[...game.awayPlayers, ...game.homePlayers].map((p, i) => (
                                    <div key={i} className={s.playerCard}>
                                      <img src={p.headshotUrl} alt={p.name} className={s.playerHeadshot} />
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

                              <p className={s.detailFooterText}>
                                {game.date} · {time} {period} · Updated: {game.lastUpdated}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>,
                    ];
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

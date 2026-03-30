"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Search, Calendar, TrendingUp, Zap, X } from "lucide-react";
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
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [modalRect, setModalRect] = useState<DOMRect | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [tab, setTab] = useState<"games" | "players">("games");
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});
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

  const openModal = useCallback((game: Game, slug: string) => {
    const el = cardRefs.current[slug];
    if (el) {
      setModalRect(el.getBoundingClientRect());
    }
    setActiveGame(game);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setModalOpen(true));
    });
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setTimeout(() => {
      setActiveGame(null);
      setModalRect(null);
      document.body.style.overflow = "";
    }, 350);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeGame) closeModal();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [activeGame, closeModal]);

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

            <div className={s.cardGrid}>
              {slate.games.map((game, idx) => {
                const a = teams[game.awayAbbr];
                const h = teams[game.homeAbbr];
                const { time, period } = parseTime(game.time);

                return (
                  <article
                    key={game.slug}
                    className={s.card}
                    ref={(el) => { cardRefs.current[game.slug] = el; }}
                    style={{ animationDelay: `${(slateIdx * 3 + idx) * 60}ms` }}
                  >
                    {/* Team matchup — horizontal */}
                    <div className={s.cardMatchup}>
                      <div className={s.cardTeam}>
                        <Image src={a.logo} alt="" width={40} height={40} className={s.cardLogo} unoptimized />
                        <div className={s.cardTeamInfo}>
                          <span className={s.cardAbbr}>{a.abbr}</span>
                          <span className={s.cardRecord}>{a.record}</span>
                        </div>
                      </div>
                      <div className={s.cardVs}>
                        <span className={s.cardAt}>@</span>
                        <span className={s.cardTime}>{time} <span className={s.cardPeriod}>{period}</span></span>
                      </div>
                      <div className={s.cardTeam}>
                        <Image src={h.logo} alt="" width={40} height={40} className={s.cardLogo} unoptimized />
                        <div className={s.cardTeamInfo}>
                          <span className={s.cardAbbr}>{h.abbr}</span>
                          <span className={s.cardRecord}>{h.record}</span>
                        </div>
                      </div>
                    </div>

                    {/* Takeaway + truncated story */}
                    <div className={s.cardBody}>
                      <p className={s.cardTakeaway}>{game.takeaway}</p>
                      <p className={s.cardStory}>{game.story}</p>
                    </div>

                    {/* CTA button */}
                    <div className={s.cardFooter}>
                      <button
                        className={s.cardCta}
                        onClick={() => openModal(game, game.slug)}
                      >
                        <Zap size={14} className={s.ctaIcon} />
                        Quick insights
                      </button>
                    </div>
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

      {/* ═══ MODAL ═══ */}
      {activeGame && (() => {
        const game = activeGame;
        const a = teams[game.awayAbbr];
        const h = teams[game.homeAbbr];
        const { time, period } = parseTime(game.time);
        const awayEdge = game.pick === "away" ? game.edge : 100 - game.edge;
        const homeEdge = 100 - awayEdge;
        const allPlayers = [...game.awayPlayers, ...game.homePlayers];

        return (
          <>
            <div
              className={`${s.overlay} ${modalOpen ? s.overlayOpen : ""}`}
              onClick={closeModal}
            />
            <div
              className={`${s.modal} ${modalOpen ? s.modalOpen : ""}`}
              style={
                !modalOpen && modalRect
                  ? {
                      top: modalRect.top,
                      left: modalRect.left,
                      width: modalRect.width,
                      height: modalRect.height,
                    }
                  : undefined
              }
            >
              {/* Close */}
              <button className={s.modalClose} onClick={closeModal} aria-label="Close">
                <X size={20} />
              </button>

              <div className={s.modalScroll}>
                {/* Modal header */}
                <div className={s.modalHeader}>
                  <div className={s.modalMatchup}>
                    <div className={s.modalTeam}>
                      <Image src={a.logo} alt="" width={48} height={48} className={s.modalLogo} unoptimized />
                      <div className={s.modalTeamInfo}>
                        <span className={s.modalAbbr}>{a.abbr}</span>
                        <span className={s.modalTeamName}>{a.city} {a.name}</span>
                        <span className={s.modalRecord}>{a.record}</span>
                      </div>
                    </div>
                    <div className={s.modalVs}>
                      <span className={s.modalAt}>@</span>
                      <span className={s.modalTime}>{time} <span className={s.modalPeriod}>{period}</span></span>
                    </div>
                    <div className={s.modalTeam}>
                      <Image src={h.logo} alt="" width={48} height={48} className={s.modalLogo} unoptimized />
                      <div className={s.modalTeamInfo}>
                        <span className={s.modalAbbr}>{h.abbr}</span>
                        <span className={s.modalTeamName}>{h.city} {h.name}</span>
                        <span className={s.modalRecord}>{h.record}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Takeaway */}
                <div className={s.modalSection}>
                  <p className={s.modalTakeaway}>{game.takeaway}</p>
                  <p className={s.modalStory}>{game.story}</p>
                </div>

                {/* Edge meter — V1+V4 blend */}
                <div className={s.modalSection}>
                  <h3 className={s.modalLabel}>The Edge</h3>
                  <div className={s.edgeBlend}>
                    {game.pick !== "toss-up" ? (
                      <div className={s.edgePick}>
                        <span
                          className={s.edgePickAbbr}
                          style={{ color: game.pick === "away" ? a.color : h.color }}
                        >
                          {game.pick === "away" ? a.abbr : h.abbr}
                        </span>
                        <span className={s.edgePickLabel}>
                          {game.edge >= 60 ? "Our pick" : "Slight edge"}
                        </span>
                      </div>
                    ) : (
                      <div className={s.edgePick}>
                        <span className={s.edgePickDash}>—</span>
                        <span className={s.edgePickLabel}>Toss-up</span>
                      </div>
                    )}
                    <div className={s.edgeDetail}>
                      <div className={s.edgeTrackRow}>
                        <span className={s.edgeAbbr}>{a.abbr}</span>
                        <div className={s.edgeTrack}>
                          <div
                            className={s.edgeFill}
                            style={{
                              width: `${awayEdge}%`,
                              background: `linear-gradient(90deg, ${a.color}, ${a.color}cc)`,
                            }}
                          />
                          <div className={s.edgeNeedle} style={{ left: `${awayEdge}%` }} />
                          <div
                            className={s.edgeFill}
                            style={{
                              width: `${homeEdge}%`,
                              background: `linear-gradient(90deg, ${h.color}cc, ${h.color})`,
                            }}
                          />
                        </div>
                        <span className={s.edgeAbbr}>{h.abbr}</span>
                      </div>
                      <p className={s.edgeDesc}>
                        {game.pick === "toss-up"
                          ? "Genuine coin flip. We don\u2019t have a confident pick on this one."
                          : `${game.pick === "away" ? `${a.city}` : `${h.city}`} holds a ${Math.max(awayEdge, homeEdge)}\u2013${Math.min(awayEdge, homeEdge)} edge in this matchup.`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Predicted score */}
                <div className={s.modalSection}>
                  <h3 className={s.modalLabel}>Predicted Score</h3>
                  <div className={s.modalScoreboard}>
                    <div className={`${s.modalScoreCell} ${game.predictedScore.away > game.predictedScore.home ? s.modalScoreWin : ""}`}>
                      <span className={s.modalScoreAbbr}>{a.abbr}</span>
                      <span className={s.modalScoreNum}>{game.predictedScore.away}</span>
                    </div>
                    <span className={s.modalScoreDash} />
                    <div className={`${s.modalScoreCell} ${game.predictedScore.home > game.predictedScore.away ? s.modalScoreWin : ""}`}>
                      <span className={s.modalScoreAbbr}>{h.abbr}</span>
                      <span className={s.modalScoreNum}>{game.predictedScore.home}</span>
                    </div>
                  </div>
                </div>

                {/* Quick hits — numbered */}
                <div className={s.modalSection}>
                  <h3 className={s.modalLabel}>Need to Know</h3>
                  <ol className={s.quickHits}>
                    {game.quickHits.map((hit, i) => (
                      <li key={i} className={s.quickHit}>
                        <span className={s.quickHitNum}>{i + 1}</span>
                        <span>{hit}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Players — with avatars */}
                <div className={s.modalSection}>
                  <h3 className={s.modalLabel}>Key Players</h3>
                  <div className={s.modalPlayers}>
                    {allPlayers.map((p, i) => (
                      <div key={i} className={s.modalPlayerCard}>
                        <div className={s.playerAvatar}>
                          <span className={s.playerInitials}>
                            {p.name.split(" ").map(n => n[0]).join("")}
                          </span>
                        </div>
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

                <p className={s.modalFooter}>Last updated: {game.lastUpdated}</p>
              </div>
            </div>
          </>
        );
      })()}
    </main>
  );
}

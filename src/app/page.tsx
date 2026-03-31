"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Search, X, Zap } from "lucide-react";
import { games, WEEK, type Game } from "@/data/games";
import { teams } from "@/data/teams";
import s from "./page.module.css";

/* ─── Focus trap for modal ─── */
function useFocusTrap(active: boolean, containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!active || !containerRef.current) return;
    const container = containerRef.current;
    const focusable = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) focusable[0].focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    container.addEventListener("keydown", trap);
    return () => container.removeEventListener("keydown", trap);
  }, [active, containerRef]);
}

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

/* ─── Sample players for Build Your Bet (static for now) ─── */
const SAMPLE_PLAYERS = [
  { name: "Patrick Mahomes", pos: "QB", team: "KC", color: "#E31837", headshotUrl: "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3139477.png&h=96&w=96" },
  { name: "Justin Jefferson", pos: "WR", team: "MIN", color: "#4F2683", headshotUrl: "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4262921.png&h=96&w=96" },
  { name: "Saquon Barkley", pos: "RB", team: "PHI", color: "#004C54", headshotUrl: "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3929630.png&h=96&w=96" },
];

/* ─── Main Page ─── */

export default function Page() {
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [modalRect, setModalRect] = useState<DOMRect | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const slates = useMemo(() => groupBySlate(games), []);

  useFocusTrap(modalOpen, modalRef);

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

  const openModal = useCallback((game: Game, slug: string, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
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
      triggerRef.current?.focus();
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

      {/* ═══ Sticky Header ═══ */}
      <header className={`${s.header} ${headerHidden ? s.headerHidden : ""}`}>
        <div className={`${s.container} ${s.headerInner}`}>
          <h1 className={s.wordmark}>Before You Bet</h1>
          <div className={s.headerRight}>
            <span className={s.weekBadge}>Week {WEEK.number}</span>
            <span className={s.lastUpdated}>{WEEK.lastUpdated}</span>
            <button className={s.searchBtn} aria-label="Search games or players">
              <Search size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* ═══ Two-Column Layout ═══ */}
      <div className={`${s.container} ${s.layout}`}>

        {/* ── Games Column ── */}
        <div className={s.gamesCol} id="games">
          {slates.map((slate, slateIdx) => (
            <section key={slate.label}>
              <div className={s.slateLabel}>{slate.label}</div>

              {slate.games.map((game, idx) => {
                const a = teams[game.awayAbbr];
                const h = teams[game.homeAbbr];
                const { time, period } = parseTime(game.time);
                const isTossup = game.pick === "toss-up";
                const awayEdge = game.pick === "away" ? game.edge : 100 - game.edge;
                const edgePct = Math.max(game.edge, 100 - game.edge);
                const favoredSide = game.pick;
                const dotPosition = game.pick === "away" ? awayEdge : awayEdge;
                const favoredColor = isTossup ? "#A1A1AA" : (game.pick === "away" ? a.color : h.color);

                return (
                  <article
                    key={game.slug}
                    className={s.gameCard}
                    ref={(el) => { cardRefs.current[game.slug] = el; }}
                    style={{ animationDelay: `${(slateIdx * 3 + idx) * 40}ms` }}
                  >
                    {/* Gradient matchup strip */}
                    <div
                      className={`${s.matchupStrip} ${isTossup ? s.tossup : ""}`}
                      style={!isTossup ? { background: `linear-gradient(135deg, ${a.color} 0%, ${h.color} 100%)` } : undefined}
                    >
                      <div className={`${s.teamSide} ${s.away}`}>
                        <Image src={a.logo} alt="" width={36} height={36} className={s.teamLogo} unoptimized />
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
                        <Image src={h.logo} alt="" width={36} height={36} className={s.teamLogo} unoptimized />
                        <div className={s.teamDetails}>
                          <div className={s.teamName}>{h.name}</div>
                          <div className={s.teamRecord}>{h.record}</div>
                        </div>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className={s.cardBody}>
                      <p className={s.verdict}>{game.takeaway}</p>

                      {/* Edge scale */}
                      <div className={s.edgeRow}>
                        <span className={`${s.edgeTeam} ${game.pick === "away" ? s.edgeFavored : ""}`}>{a.abbr}</span>
                        <div className={s.edgeTrack} role="img" aria-label={`${a.abbr} ${awayEdge}%, ${h.abbr} ${100 - awayEdge}%`}>
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
                            style={{
                              left: `${dotPosition}%`,
                              background: favoredColor,
                            }}
                          />
                        </div>
                        <span className={s.edgePct}>{edgePct}%</span>
                        <span className={`${s.edgeTeam} ${game.pick === "home" ? s.edgeFavored : ""}`}>{h.abbr}</span>
                      </div>

                      {/* Footer */}
                      <div className={s.cardFooter}>
                        <span className={s.gameDateTime}>{game.date} · {time} {period}</span>
                        <button
                          className={s.viewBtn}
                          onClick={(e) => openModal(game, game.slug, e.currentTarget)}
                        >
                          Full breakdown <span className={s.viewArrow}>→</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>
          ))}
        </div>

        {/* ── Build Your Bet Column ── */}
        <aside className={s.betCol}>
          <div className={s.betHeader}>
            <div className={s.betTitle}>Build Your Bet</div>
            <div className={s.betSubtitle}>Add players for prop & parlay insights</div>
          </div>
          <div className={s.betBody}>
            <div className={s.playerSearchWrap}>
              <Search size={14} className={s.playerSearchIcon} aria-hidden="true" />
              <input className={s.playerSearch} type="text" placeholder="Search players..." />
            </div>
            <div className={s.selectedLabel}>Your Players ({SAMPLE_PLAYERS.length})</div>
            {SAMPLE_PLAYERS.map((p) => (
              <div key={p.name} className={s.playerChip}>
                <img
                  className={s.playerAvatar}
                  src={p.headshotUrl}
                  alt={p.name}
                />
                <div className={s.playerMeta}>
                  <div className={s.playerChipName}>{p.name}</div>
                  <div className={s.playerChipPos}>
                    <span className={s.teamDot} style={{ background: p.color }} />
                    {p.pos} · {p.team}
                  </div>
                </div>
                <button className={s.removeBtn} aria-label={`Remove ${p.name}`}>×</button>
              </div>
            ))}
          </div>
          <div className={s.betFooter}>
            <button className={s.insightBtn}>
              Get Insights <span className={s.playerCount}>{SAMPLE_PLAYERS.length}</span>
            </button>
            <div className={s.insightHint}>AI-powered prop & parlay projections</div>
          </div>
        </aside>
      </div>

      {/* ═══ Footer ═══ */}
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
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-label={`${a.city} ${a.name} at ${h.city} ${h.name} — Game insights`}
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
              <button className={s.modalClose} onClick={closeModal} aria-label="Close">
                <X size={20} aria-hidden="true" />
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

                {/* Edge meter */}
                <div className={s.modalSection}>
                  <h3 className={s.modalLabel}>The Edge</h3>
                  <div className={s.edgeBlend}>
                    {game.pick !== "toss-up" ? (
                      <div className={s.edgePickBlock}>
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
                      <div className={s.edgePickBlock}>
                        <span className={s.edgePickDash}>—</span>
                        <span className={s.edgePickLabel}>Toss-up</span>
                      </div>
                    )}
                    <div className={s.edgeDetail}>
                      <div className={s.edgeTrackRow}>
                        <span className={s.edgeAbbrLabel}>{a.abbr}</span>
                        <div className={s.modalEdgeTrack} role="img" aria-label={`${a.abbr} ${awayEdge}%, ${h.abbr} ${homeEdge}%`}>
                          <div
                            className={s.modalEdgeFill}
                            style={{
                              width: `${awayEdge}%`,
                              background: `linear-gradient(90deg, ${a.color}, ${a.color}cc)`,
                            }}
                          />
                          <div className={s.edgeNeedle} style={{ left: `${awayEdge}%` }} />
                          <div
                            className={s.modalEdgeFill}
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

                {/* Quick hits */}
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

                {/* Players */}
                <div className={s.modalSection}>
                  <h3 className={s.modalLabel}>Key Players</h3>
                  <div className={s.modalPlayers}>
                    {allPlayers.map((p, i) => (
                      <div key={i} className={s.modalPlayerCard}>
                        <div className={s.modalPlayerAvatar}>
                          <img
                            src={p.headshotUrl}
                            alt={p.name}
                            className={s.modalPlayerHeadshot}
                          />
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

                <p className={s.modalFooterText}>Last updated: {game.lastUpdated}</p>
              </div>
            </div>
          </>
        );
      })()}
    </main>
  );
}

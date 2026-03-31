"use client";

import { games, type Game } from "@/data/games";
import { teams } from "@/data/teams";
import styles from "./lab.module.css";

const sample = games.slice(0, 4);
const featured = games[0];

function parseTime(raw: string) {
  const match = raw.match(/^(\d+:\d+)\s*(.*)$/);
  if (!match) return { time: raw, period: "" };
  return { time: match[1], period: match[2] };
}

/* ═══════════════════════════════════════════════
   VARIANT A — Sports Broadcast Energy
   ESPN/NFL app: bold type, team color surfaces,
   horizontal matchup with score prominence
   ═══════════════════════════════════════════════ */
function VariantA() {
  return (
    <div className={styles.vA}>
      <header className={styles.vA_header}>
        <h1 className={styles.vA_wordmark}>Before You Bet</h1>
        <span className={styles.vA_week}>Week 12</span>
      </header>
      <div className={styles.vA_grid}>
        {sample.map((game) => {
          const a = teams[game.awayAbbr];
          const h = teams[game.homeAbbr];
          const { time, period } = parseTime(game.time);
          return (
            <div key={game.slug} className={styles.vA_card}>
              <div className={styles.vA_teamStrip} style={{ background: `linear-gradient(135deg, ${a.color}, ${h.color})` }}>
                <div className={styles.vA_teamSide}>
                  <img src={a.logo} alt="" className={styles.vA_logo} />
                  <span className={styles.vA_abbr}>{a.abbr}</span>
                </div>
                <div className={styles.vA_vs}>
                  <span className={styles.vA_score}>{game.predictedScore.away}</span>
                  <span className={styles.vA_dash}>–</span>
                  <span className={styles.vA_score}>{game.predictedScore.home}</span>
                </div>
                <div className={styles.vA_teamSide}>
                  <span className={styles.vA_abbr}>{h.abbr}</span>
                  <img src={h.logo} alt="" className={styles.vA_logo} />
                </div>
              </div>
              <div className={styles.vA_body}>
                <p className={styles.vA_takeaway}>{game.takeaway}</p>
                <div className={styles.vA_meta}>
                  <span className={styles.vA_time}>{game.date} · {time} {period}</span>
                  {game.pick !== "toss-up" && (
                    <span className={styles.vA_edge} style={{ color: game.pick === "away" ? a.color : h.color }}>
                      {game.pick === "away" ? a.abbr : h.abbr} {game.edge}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   VARIANT B — Premium Intelligence
   Bloomberg/Stripe: refined surfaces, data density,
   sophisticated typography, subtle depth
   ═══════════════════════════════════════════════ */
function VariantB() {
  return (
    <div className={styles.vB}>
      <header className={styles.vB_header}>
        <div>
          <h1 className={styles.vB_wordmark}>Before You Bet</h1>
          <p className={styles.vB_sub}>NFL Week 12 Intelligence Brief</p>
        </div>
      </header>
      <div className={styles.vB_grid}>
        {sample.map((game) => {
          const a = teams[game.awayAbbr];
          const h = teams[game.homeAbbr];
          const awayEdge = game.pick === "away" ? game.edge : 100 - game.edge;
          return (
            <div key={game.slug} className={styles.vB_card}>
              <div className={styles.vB_matchRow}>
                <div className={styles.vB_teamCol}>
                  <img src={a.logo} alt="" className={styles.vB_logo} />
                  <div>
                    <span className={styles.vB_name}>{a.city} {a.name}</span>
                    <span className={styles.vB_record}>{a.record}</span>
                  </div>
                </div>
                <div className={styles.vB_at}>at</div>
                <div className={styles.vB_teamCol}>
                  <img src={h.logo} alt="" className={styles.vB_logo} />
                  <div>
                    <span className={styles.vB_name}>{h.city} {h.name}</span>
                    <span className={styles.vB_record}>{h.record}</span>
                  </div>
                </div>
              </div>
              <div className={styles.vB_edgeBar}>
                <div className={styles.vB_edgeFill} style={{ width: `${awayEdge}%`, background: a.color }} />
              </div>
              <p className={styles.vB_takeaway}>{game.takeaway}</p>
              <div className={styles.vB_footer}>
                <span className={styles.vB_date}>{game.date}</span>
                <button className={styles.vB_cta}>View analysis →</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   VARIANT C — Mobile-First App
   FotMob/F1: compact strips, swipeable feel,
   tight information density, native app energy
   ═══════════════════════════════════════════════ */
function VariantC() {
  return (
    <div className={styles.vC}>
      <header className={styles.vC_header}>
        <h1 className={styles.vC_wordmark}>BYB</h1>
        <div className={styles.vC_pills}>
          <span className={`${styles.vC_pill} ${styles.vC_pillActive}`}>Games</span>
          <span className={styles.vC_pill}>Players</span>
          <span className={styles.vC_pill}>Picks</span>
        </div>
      </header>
      <div className={styles.vC_slateLabel}>Thursday Night</div>
      <div className={styles.vC_list}>
        {sample.map((game) => {
          const a = teams[game.awayAbbr];
          const h = teams[game.homeAbbr];
          const { time } = parseTime(game.time);
          return (
            <div key={game.slug} className={styles.vC_strip}>
              <div className={styles.vC_time}>{time}</div>
              <div className={styles.vC_teams}>
                <div className={styles.vC_teamRow}>
                  <img src={a.logo} alt="" className={styles.vC_logo} />
                  <span className={styles.vC_abbr}>{a.abbr}</span>
                  <span className={styles.vC_rec}>{a.record}</span>
                  <span className={styles.vC_predScore}>{game.predictedScore.away}</span>
                </div>
                <div className={styles.vC_teamRow}>
                  <img src={h.logo} alt="" className={styles.vC_logo} />
                  <span className={styles.vC_abbr}>{h.abbr}</span>
                  <span className={styles.vC_rec}>{h.record}</span>
                  <span className={styles.vC_predScore}>{game.predictedScore.home}</span>
                </div>
              </div>
              <div className={styles.vC_insight}>
                <p className={styles.vC_take}>{game.takeaway}</p>
                {game.pick !== "toss-up" && (
                  <span className={styles.vC_badge} style={{ background: game.pick === "away" ? a.color : h.color }}>
                    {game.pick === "away" ? a.abbr : h.abbr}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   VARIANT D — Editorial Sports
   The Athletic/SI: story-forward, magazine layout,
   featured game hero, editorial typography
   ═══════════════════════════════════════════════ */
function VariantD() {
  const ft = featured;
  const a = teams[ft.awayAbbr];
  const h = teams[ft.homeAbbr];
  const rest = sample.slice(1);

  return (
    <div className={styles.vD}>
      <header className={styles.vD_header}>
        <h1 className={styles.vD_wordmark}>Before You Bet</h1>
        <p className={styles.vD_edition}>Week 12 Edition</p>
      </header>
      <div className={styles.vD_hero}>
        <div className={styles.vD_heroLogos}>
          <img src={a.logo} alt="" className={styles.vD_heroLogo} />
          <span className={styles.vD_heroVs}>vs</span>
          <img src={h.logo} alt="" className={styles.vD_heroLogo} />
        </div>
        <h2 className={styles.vD_heroTitle}>{ft.takeaway}</h2>
        <p className={styles.vD_heroStory}>{ft.story}</p>
        <div className={styles.vD_heroMeta}>
          <span>{ft.date} · {ft.time}</span>
          {ft.pick !== "toss-up" && <span className={styles.vD_heroPick}>Our pick: {ft.pick === "away" ? a.city : h.city}</span>}
        </div>
      </div>
      <div className={styles.vD_label}>More Games</div>
      <div className={styles.vD_grid}>
        {rest.map((game) => {
          const ga = teams[game.awayAbbr];
          const gh = teams[game.homeAbbr];
          return (
            <div key={game.slug} className={styles.vD_card}>
              <div className={styles.vD_matchup}>
                <img src={ga.logo} alt="" className={styles.vD_logo} />
                <span className={styles.vD_vs2}>at</span>
                <img src={gh.logo} alt="" className={styles.vD_logo} />
              </div>
              <p className={styles.vD_take}>{game.takeaway}</p>
              <span className={styles.vD_date}>{game.date}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   VARIANT E — Game Day Dashboard
   Dense data, scoreboard energy, real-time feel,
   stat-forward with confidence meters
   ═══════════════════════════════════════════════ */
function VariantE() {
  return (
    <div className={styles.vE}>
      <header className={styles.vE_header}>
        <h1 className={styles.vE_wordmark}>BYB</h1>
        <div className={styles.vE_headerRight}>
          <span className={styles.vE_week}>WK 12</span>
          <span className={styles.vE_updated}>Updated 6:15 PM</span>
        </div>
      </header>
      <div className={styles.vE_table}>
        <div className={styles.vE_tableHead}>
          <span>Matchup</span>
          <span>Predicted</span>
          <span>Edge</span>
          <span>Pick</span>
        </div>
        {sample.map((game) => {
          const a = teams[game.awayAbbr];
          const h = teams[game.homeAbbr];
          const awayEdge = game.pick === "away" ? game.edge : 100 - game.edge;
          return (
            <div key={game.slug} className={styles.vE_row}>
              <div className={styles.vE_matchup}>
                <div className={styles.vE_teamLine}>
                  <img src={a.logo} alt="" className={styles.vE_logo} />
                  <span className={styles.vE_abbr}>{a.abbr}</span>
                </div>
                <div className={styles.vE_teamLine}>
                  <img src={h.logo} alt="" className={styles.vE_logo} />
                  <span className={styles.vE_abbr}>{h.abbr}</span>
                </div>
              </div>
              <div className={styles.vE_scores}>
                <span className={game.predictedScore.away > game.predictedScore.home ? styles.vE_win : ""}>{game.predictedScore.away}</span>
                <span className={game.predictedScore.home > game.predictedScore.away ? styles.vE_win : ""}>{game.predictedScore.home}</span>
              </div>
              <div className={styles.vE_edgeCell}>
                <div className={styles.vE_edgeBar}>
                  <div className={styles.vE_edgeFill} style={{ width: `${awayEdge}%`, background: a.color }} />
                </div>
                <span className={styles.vE_edgePct}>{Math.max(awayEdge, 100 - awayEdge)}%</span>
              </div>
              <div className={styles.vE_pickCell}>
                {game.pick !== "toss-up" ? (
                  <span className={styles.vE_pickBadge} style={{ background: game.pick === "away" ? a.color : h.color }}>
                    {game.pick === "away" ? a.abbr : h.abbr}
                  </span>
                ) : (
                  <span className={styles.vE_tossup}>—</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   DESIGN LAB PAGE
   ═══════════════════════════════════════════════ */
export default function DesignLabPage() {
  return (
    <div className={styles.lab}>
      <div className={styles.labHeader}>
        <h1 className={styles.labTitle}>Design Lab — Full Page Exploration</h1>
        <p className={styles.labDesc}>5 distinct directions. Each explores a different energy. Click elements to leave feedback.</p>
      </div>

      <div className={styles.labGrid}>
        <section className={styles.labVariant} data-variant="A">
          <div className={styles.labVariantHeader}>
            <span className={styles.labVariantTag}>A</span>
            <div>
              <h2 className={styles.labVariantName}>Sports Broadcast</h2>
              <p className={styles.labVariantDesc}>ESPN/NFL energy. Team color gradients, predicted scores prominent, bold matchup strips.</p>
            </div>
          </div>
          <div className={styles.labVariantBody}>
            <VariantA />
          </div>
        </section>

        <section className={styles.labVariant} data-variant="B">
          <div className={styles.labVariantHeader}>
            <span className={styles.labVariantTag}>B</span>
            <div>
              <h2 className={styles.labVariantName}>Premium Intelligence</h2>
              <p className={styles.labVariantDesc}>Bloomberg/Stripe refined. Full team names, inline edge bars, sophisticated CTA.</p>
            </div>
          </div>
          <div className={styles.labVariantBody}>
            <VariantB />
          </div>
        </section>

        <section className={styles.labVariant} data-variant="C">
          <div className={styles.labVariantHeader}>
            <span className={styles.labVariantTag}>C</span>
            <div>
              <h2 className={styles.labVariantName}>Mobile-First App</h2>
              <p className={styles.labVariantDesc}>FotMob/F1 density. Compact strips, pill navigation, score-forward layout.</p>
            </div>
          </div>
          <div className={styles.labVariantBody}>
            <VariantC />
          </div>
        </section>

        <section className={styles.labVariant} data-variant="D">
          <div className={styles.labVariantHeader}>
            <span className={styles.labVariantTag}>D</span>
            <div>
              <h2 className={styles.labVariantName}>Editorial Sports</h2>
              <p className={styles.labVariantDesc}>The Athletic/SI feel. Featured hero game, story-forward, magazine hierarchy.</p>
            </div>
          </div>
          <div className={styles.labVariantBody}>
            <VariantD />
          </div>
        </section>

        <section className={styles.labVariant} data-variant="E">
          <div className={styles.labVariantHeader}>
            <span className={styles.labVariantTag}>E</span>
            <div>
              <h2 className={styles.labVariantName}>Game Day Dashboard</h2>
              <p className={styles.labVariantDesc}>Dense data table. Scoreboard energy, edge meters, at-a-glance picks.</p>
            </div>
          </div>
          <div className={styles.labVariantBody}>
            <VariantE />
          </div>
        </section>
      </div>
    </div>
  );
}

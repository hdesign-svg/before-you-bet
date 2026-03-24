import Link from "next/link";
import { notFound } from "next/navigation";
import { games, getGameBySlug, type PlayerSpotlight } from "@/data/games";
import styles from "./page.module.css";

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

const positionColors: Record<string, string> = {
  QB: "var(--pos-qb)",
  RB: "var(--pos-rb)",
  WR: "var(--pos-wr)",
  TE: "var(--pos-te)",
};

function PlayerCard({ player }: { player: PlayerSpotlight }) {
  const borderColor = positionColors[player.position] || "var(--border)";

  return (
    <div className={styles.playerCard} style={{ borderLeftColor: borderColor }}>
      <div className={styles.playerHeader}>
        <h3 className={styles.playerName}>{player.name}</h3>
        <span
          className={styles.positionTag}
          style={{
            background: borderColor,
            color: "#fff",
          }}
        >
          {player.position}
        </span>
      </div>
      <p className={styles.playerTeam}>{player.team}</p>

      <div className={styles.insightFields}>
        <div className={styles.insightField}>
          <h4 className={styles.fieldLabel}>What&apos;s Going On</h4>
          <p className={styles.fieldContent}>{player.whatsGoingOn}</p>
        </div>
        <div className={styles.insightField}>
          <h4 className={styles.fieldLabel}>What It Means</h4>
          <p className={styles.fieldContent}>{player.whatItMeans}</p>
        </div>
        <div className={styles.insightField}>
          <h4 className={styles.fieldLabel}>Expectation</h4>
          <p className={styles.fieldContent}>{player.expectation}</p>
        </div>
        <div className={styles.insightField}>
          <h4 className={styles.fieldLabel}>Why It Matters</h4>
          <p className={styles.fieldContent}>{player.whyItMatters}</p>
        </div>
      </div>
    </div>
  );
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  return (
    <div className={styles.page}>
      {/* Back nav */}
      <nav className={styles.backNav}>
        <Link href="/" className={styles.backLink}>
          ← All Matchups
        </Link>
      </nav>

      {/* Game header */}
      <header className={styles.gameHeader}>
        <h1 className={styles.gameTitle}>
          {game.awayTeam}
          <span className={styles.at}> @ </span>
          {game.homeTeam}
        </h1>
        <p className={styles.gameMeta}>
          {game.date} · {game.time}
          {game.network ? ` · ${game.network}` : ""} ·{" "}
          <span className={styles.spreadInline}>{game.spread}</span>
        </p>
        <p className={styles.lastUpdated}>
          Last updated: {game.lastUpdated}
        </p>
      </header>

      {/* Section 1: The Story */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Story</h2>
        <p className={styles.storyText}>{game.story}</p>
      </section>

      {/* Section 2: What the Odds Really Say */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What the Odds Really Say</h2>
        <ul className={styles.oddsList}>
          {game.oddsExplained.map((line, i) => (
            <li key={i} className={styles.oddsItem}>
              {line}
            </li>
          ))}
        </ul>
      </section>

      {/* Section 3: Key Players */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Key Players That Matter</h2>

        <h3 className={styles.teamLabel}>{game.awayTeam}</h3>
        <div className={styles.playerList}>
          {game.awayPlayers.map((player) => (
            <PlayerCard key={player.name} player={player} />
          ))}
        </div>

        <h3 className={styles.teamLabel}>{game.homeTeam}</h3>
        <div className={styles.playerList}>
          {game.homePlayers.map((player) => (
            <PlayerCard key={player.name} player={player} />
          ))}
        </div>
      </section>

      {/* Section 4: The Takeaway */}
      <section className={styles.takeaway}>
        <h2 className={styles.takeawayTitle}>The Takeaway</h2>
        <p className={styles.takeawayText}>{game.takeaway}</p>
      </section>

      <footer className={styles.footer}>
        <p>
          Before You Bet is not a sportsbook. Content is for informational
          purposes only.
        </p>
      </footer>
    </div>
  );
}

import Link from "next/link";
import { games, WEEK } from "@/data/games";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Before You Bet</h1>
        <p className={styles.weekContext}>
          Week {WEEK.number} · {WEEK.dateRange}
        </p>
      </header>

      <nav className={styles.tabBar}>
        <button className={`${styles.tab} ${styles.tabActive}`}>
          Matchups
        </button>
        <button className={styles.tab}>Players</button>
      </nav>

      <section className={styles.gameList}>
        {games.map((game) => (
          <Link
            key={game.slug}
            href={`/games/${game.slug}`}
            className={styles.gameCardLink}
          >
            <article className={styles.gameCard}>
              <div className={styles.gameCardTop}>
                <div className={styles.matchup}>
                  <div className={styles.matchupTeams}>
                    {game.awayAbbr} {game.awayTeam.split(" ").pop()}
                    <span className={styles.at}> @ </span>
                    {game.homeAbbr} {game.homeTeam.split(" ").pop()}
                  </div>
                  <div className={styles.matchupMeta}>
                    {game.date} · {game.time}
                    {game.network ? ` · ${game.network}` : ""}
                  </div>
                </div>
                <span className={styles.spreadBadge}>{game.spread}</span>
              </div>
              <p className={styles.gameCardInsight}>"{game.insight}"</p>
            </article>
          </Link>
        ))}
      </section>

      <footer className={styles.footer}>
        <p>Last updated: {WEEK.lastUpdated}</p>
        <p>
          Before You Bet is not a sportsbook. Content is for informational
          purposes only.
        </p>
      </footer>
    </div>
  );
}

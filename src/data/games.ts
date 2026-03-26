export type PlayerSpotlight = {
  name: string;
  position: "QB" | "RB" | "WR" | "TE";
  team: string;
  verdict: string;
  projection: string;
};

export type Game = {
  slug: string;
  awayAbbr: string;
  homeAbbr: string;
  date: string;
  time: string;
  headline: string;
  rundown: string[];
  awayPlayers: PlayerSpotlight[];
  homePlayers: PlayerSpotlight[];
  lastUpdated: string;
};

export const WEEK = {
  number: 12,
  dateRange: "Nov 19–25",
  lastUpdated: "Sat, Nov 23 · 6:15 PM ET",
};

export const games: Game[] = [
  // ── THURSDAY ──
  {
    slug: "steelers-at-browns",
    awayAbbr: "PIT",
    homeAbbr: "CLE",
    date: "Thu, Nov 21",
    time: "8:15 PM ET",
    headline: "Pittsburgh is the better team and this should be a low-scoring, ugly game.",
    rundown: [
      "Pittsburgh has been winning with defense all season — they're 8-2 and very hard to score against.",
      "Cleveland is 2-8 and just doesn't have the offense to keep up.",
      "Thursday night games tend to be sloppy because teams have less time to prepare. Expect a grind.",
      "Pittsburgh should win, but probably by a small margin — this won't be a blowout.",
    ],
    awayPlayers: [
      { name: "Russell Wilson", position: "QB", team: "PIT", verdict: "Should have a decent game but won't need to throw much.", projection: "180–220 passing yards, 1 TD" },
      { name: "Najee Harris", position: "RB", team: "PIT", verdict: "Expect him to carry the load — Pittsburgh will try to run the clock out.", projection: "22 carries, 85–100 yards, 1 TD" },
    ],
    homePlayers: [
      { name: "Jameis Winston", position: "QB", team: "CLE", verdict: "Unpredictable — could make a great play or a terrible mistake on any throw.", projection: "210–250 yards, 1 TD, 2 turnovers" },
      { name: "Jerry Jeudy", position: "WR", team: "CLE", verdict: "Cleveland's best pass-catcher, but Pittsburgh's defense is elite.", projection: "5–7 catches, 55–70 yards" },
    ],
    lastUpdated: "Wednesday, Nov 20 · 4:00 PM ET",
  },

  // ── SUNDAY EARLY ──
  {
    slug: "cowboys-at-commanders",
    awayAbbr: "DAL",
    homeAbbr: "WAS",
    date: "Sun, Nov 24",
    time: "1:00 PM ET",
    headline: "Washington should win this easily — Dallas has lost five straight and looks like they've given up.",
    rundown: [
      "Dallas is starting a backup quarterback, which is the biggest reason everyone expects them to lose.",
      "Washington's rookie QB Jayden Daniels has been one of the best stories in football this year — he's the real deal.",
      "This is a rivalry game, so Dallas might keep it closer than expected on pride alone.",
      "Washington is a heavy favorite — this is one of the safer picks of the week.",
    ],
    awayPlayers: [
      { name: "Cooper Rush", position: "QB", team: "DAL", verdict: "A backup who won't make enough plays to win on the road.", projection: "180–210 yards, 1 TD, 1–2 turnovers" },
      { name: "CeeDee Lamb", position: "WR", team: "DAL", verdict: "Great player, but a backup QB limits what he can do.", projection: "5–7 catches, 55–75 yards" },
    ],
    homePlayers: [
      { name: "Jayden Daniels", position: "QB", team: "WAS", verdict: "Talented rookie who can beat you throwing and running — a nightmare to defend.", projection: "230–260 yards, 1–2 TDs, 40+ rushing yards" },
      { name: "Terry McLaurin", position: "WR", team: "WAS", verdict: "Having a great year and facing one of the worst defenses in the league.", projection: "6–8 catches, 80–100 yards, 1 TD" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "vikings-at-bears",
    awayAbbr: "MIN",
    homeAbbr: "CHI",
    date: "Sun, Nov 24",
    time: "1:00 PM ET",
    headline: "Minnesota's defense is one of the best in football and Chicago's young quarterback isn't ready for it.",
    rundown: [
      "Minnesota is 8-2 with a defense that's been shutting down young quarterbacks all year.",
      "Chicago's Caleb Williams is a talented rookie, but he makes mistakes under pressure — and Minnesota brings a lot of pressure.",
      "This should be a comfortable Minnesota win unless Williams has a breakout game.",
      "Expect a fairly low-scoring game — both defenses are tough.",
    ],
    awayPlayers: [
      { name: "Sam Darnold", position: "QB", team: "MIN", verdict: "Having the best season of his career with great players around him.", projection: "230–260 yards, 2 TDs" },
      { name: "Justin Jefferson", position: "WR", team: "MIN", verdict: "Arguably the best receiver in football — defenses can't stop him even when they focus on him.", projection: "6–9 catches, 90–120 yards" },
    ],
    homePlayers: [
      { name: "Caleb Williams", position: "QB", team: "CHI", verdict: "Talented but still learning — this is a really tough matchup for a rookie.", projection: "190–230 yards, 1 TD, 1–2 turnovers" },
      { name: "DJ Moore", position: "WR", team: "CHI", verdict: "Williams' go-to target. He'll get chances because Chicago will be playing from behind.", projection: "6–8 catches, 65–85 yards" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "titans-at-texans",
    awayAbbr: "TEN",
    homeAbbr: "HOU",
    date: "Sun, Nov 24",
    time: "1:00 PM ET",
    headline: "Houston is a legitimate contender playing at home against a rebuilding team — this should be straightforward.",
    rundown: [
      "Houston is 7-4 and has established themselves as the best team in their division.",
      "Tennessee is 2-8 and playing out the season with a young quarterback who's still developing.",
      "Houston should be able to win this comfortably at home.",
      "The only question is how big the margin gets in the second half.",
    ],
    awayPlayers: [
      { name: "Will Levis", position: "QB", team: "TEN", verdict: "Has a big arm but makes risky decisions — not a good combo against a good defense.", projection: "200–240 yards, 1 TD, 1–2 turnovers" },
      { name: "Tony Pollard", position: "RB", team: "TEN", verdict: "Tennessee's best player on offense — he keeps them competitive.", projection: "16–20 carries, 70–85 yards" },
    ],
    homePlayers: [
      { name: "C.J. Stroud", position: "QB", team: "HOU", verdict: "A rising star at home against a weak defense — he should have a big day.", projection: "260–290 yards, 2–3 TDs" },
      { name: "Nico Collins", position: "WR", team: "HOU", verdict: "Having a breakout year — fast, strong, and Stroud's favorite target.", projection: "5–8 catches, 80–110 yards, 1 TD" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "patriots-at-dolphins",
    awayAbbr: "NE",
    homeAbbr: "MIA",
    date: "Sun, Nov 24",
    time: "1:00 PM ET",
    headline: "Miami's offense is back to full strength and New England simply doesn't have the talent to keep up.",
    rundown: [
      "Miami's star quarterback Tua is healthy again and their offense is one of the most explosive in football.",
      "New England is in full rebuild mode with a rookie quarterback who doesn't have much help around him.",
      "Miami at home with their speed advantage should be too much for the Patriots.",
      "This is one of the more lopsided matchups on the schedule this week.",
    ],
    awayPlayers: [
      { name: "Drake Maye", position: "QB", team: "NE", verdict: "A promising rookie, but limited by the talent around him.", projection: "200–230 yards, 1 TD, 1 turnover" },
    ],
    homePlayers: [
      { name: "Tua Tagovailoa", position: "QB", team: "MIA", verdict: "Back from injury and clicking — when healthy, this offense is dangerous.", projection: "270–300 yards, 2–3 TDs" },
      { name: "Tyreek Hill", position: "WR", team: "MIA", verdict: "The fastest player in football against a young, overmatched defense.", projection: "5–8 catches, 90–130 yards, 1 TD" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "buccaneers-at-giants",
    awayAbbr: "TB",
    homeAbbr: "NYG",
    date: "Sun, Nov 24",
    time: "1:00 PM ET",
    headline: "Tampa Bay's offense is clicking and the Giants are one of the weakest teams in the league.",
    rundown: [
      "Baker Mayfield is having a career year for Tampa Bay and their offense has been tough to stop.",
      "The Giants have been one of the worst teams in football on both sides of the ball.",
      "Tampa should win this without much trouble.",
      "New York hasn't been competitive against any good team this season.",
    ],
    awayPlayers: [
      { name: "Baker Mayfield", position: "QB", team: "TB", verdict: "Playing with confidence and making all the right throws this season.", projection: "260–290 yards, 2 TDs" },
      { name: "Mike Evans", position: "WR", team: "TB", verdict: "Consistent veteran who should have a field day against a weak secondary.", projection: "5–7 catches, 75–100 yards, 1 TD" },
    ],
    homePlayers: [
      { name: "Tommy DeVito", position: "QB", team: "NYG", verdict: "Plays hard but the talent gap between these teams is just too big.", projection: "180–220 yards, 1 TD, 1 turnover" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "panthers-at-chiefs",
    awayAbbr: "CAR",
    homeAbbr: "KC",
    date: "Sun, Nov 24",
    time: "1:00 PM ET",
    headline: "Kansas City is the best team in football hosting one of the worst — there's a huge talent gap here.",
    rundown: [
      "The Chiefs are 9-1 and have the best quarterback in football in Patrick Mahomes.",
      "Carolina is 2-8 and has been the worst team in the NFL for most of the season.",
      "Kansas City should be able to win this easily, even without their best effort.",
      "The only question is how quickly the Chiefs build a lead and start resting players.",
    ],
    awayPlayers: [
      { name: "Bryce Young", position: "QB", team: "CAR", verdict: "Struggling behind a bad offensive line against one of the best defenses in the league.", projection: "170–200 yards, 0–1 TD, 1–2 turnovers" },
    ],
    homePlayers: [
      { name: "Patrick Mahomes", position: "QB", team: "KC", verdict: "Won't need to do much — should cruise to a comfortable win.", projection: "240–270 yards, 2 TDs" },
      { name: "Travis Kelce", position: "TE", team: "KC", verdict: "Good chance for a big game against Carolina's weak defense at that position.", projection: "6–8 catches, 70–90 yards, 1 TD" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "colts-at-lions",
    awayAbbr: "IND",
    homeAbbr: "DET",
    date: "Sun, Nov 24",
    time: "1:00 PM ET",
    headline: "Detroit might be the best team in football right now — Indianapolis will compete but probably can't keep up.",
    rundown: [
      "Detroit is 9-1 and their offense has been putting up huge numbers at home.",
      "Indianapolis is a scrappy team that fights hard, but they don't have the firepower to match Detroit score-for-score.",
      "Expect a lot of points — Detroit's offense has been scoring 30+ regularly.",
      "Detroit should pull away in the second half.",
    ],
    awayPlayers: [
      { name: "Anthony Richardson", position: "QB", team: "IND", verdict: "An incredible athlete, but still inconsistent as a passer.", projection: "200–240 yards, 1–2 TDs, 40+ rushing yards" },
    ],
    homePlayers: [
      { name: "Jared Goff", position: "QB", team: "DET", verdict: "Quietly having one of the best seasons of any quarterback this year.", projection: "280–310 yards, 3 TDs" },
      { name: "Jahmyr Gibbs", position: "RB", team: "DET", verdict: "One of the most exciting players in football — scores from anywhere on the field.", projection: "15 carries, 80+ yards, 4 catches, 1–2 TDs" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },

  // ── SUNDAY AFTERNOON ──
  {
    slug: "chiefs-at-bills",
    awayAbbr: "KC",
    homeAbbr: "BUF",
    date: "Sun, Nov 24",
    time: "4:25 PM ET",
    headline: "This is the game of the week — two of the best teams in football in a game that could decide who gets home-field advantage later.",
    rundown: [
      "Both teams are among the best in football — Kansas City is 9-1 and Buffalo is 9-2.",
      "Buffalo has a slight edge playing at home, where they've been dominant this year.",
      "Josh Allen is playing at an MVP level, but you can never count out Patrick Mahomes.",
      "This is genuinely a coin flip — if you're betting on it, don't put too much on the line.",
    ],
    awayPlayers: [
      { name: "Patrick Mahomes", position: "QB", team: "KC", verdict: "The best big-game quarterback alive — always dangerous even on the road.", projection: "250–280 yards, 1–2 TDs" },
      { name: "Travis Kelce", position: "TE", team: "KC", verdict: "Has been quiet this season, but always shows up in the biggest moments.", projection: "5–7 catches, 50–70 yards" },
    ],
    homePlayers: [
      { name: "Josh Allen", position: "QB", team: "BUF", verdict: "Having an MVP-caliber season and is nearly unstoppable at home.", projection: "270–300 yards, 2–3 TDs, 30+ rushing yards" },
      { name: "James Cook", position: "RB", team: "BUF", verdict: "If he gets going early, Buffalo controls the pace of the game.", projection: "14–18 carries, 65–85 yards" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "packers-at-49ers",
    awayAbbr: "GB",
    homeAbbr: "SF",
    date: "Sun, Nov 24",
    time: "4:25 PM ET",
    headline: "A rematch of last year's playoffs — both teams need this win badly and it could genuinely go either way.",
    rundown: [
      "This is basically a 50/50 game — San Francisco has a tiny home-field edge.",
      "Both offenses are explosive, so expect a high-scoring, entertaining game.",
      "Green Bay is young and improving fast. San Francisco is dealing with injuries but still loaded with talent.",
      "This could easily be the most fun game to watch this week.",
    ],
    awayPlayers: [
      { name: "Jordan Love", position: "QB", team: "GB", verdict: "Growing into a star — has the arm talent and the playmakers to keep up with anyone.", projection: "260–290 yards, 2–3 TDs" },
      { name: "Josh Jacobs", position: "RB", team: "GB", verdict: "Physical runner who wears defenses down as the game goes on.", projection: "18–22 carries, 75–95 yards" },
    ],
    homePlayers: [
      { name: "Brock Purdy", position: "QB", team: "SF", verdict: "One of the most efficient passers in football when his protection holds up.", projection: "260–280 yards, 2 TDs" },
      { name: "Christian McCaffrey", position: "RB", team: "SF", verdict: "If he plays (game-time decision), San Francisco's offense goes to another level.", projection: "15–20 touches, 80–110 total yards if active" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "broncos-at-raiders",
    awayAbbr: "DEN",
    homeAbbr: "LV",
    date: "Sun, Nov 24",
    time: "4:05 PM ET",
    headline: "Denver's defense and solid rookie quarterback should be enough to handle a Raiders team going nowhere.",
    rundown: [
      "Denver has a strong defense and their rookie QB Bo Nix has been surprisingly good — smart and steady.",
      "Las Vegas is 2-8 and has been one of the most disappointing teams this season.",
      "Denver should win this fairly comfortably.",
      "Don't expect a lot of points — both defenses are decent but the offenses are limited.",
    ],
    awayPlayers: [
      { name: "Bo Nix", position: "QB", team: "DEN", verdict: "Smart rookie who doesn't make big mistakes — perfect for a defense-first team.", projection: "220–250 yards, 1–2 TDs" },
    ],
    homePlayers: [
      { name: "Aidan O'Connell", position: "QB", team: "LV", verdict: "A backup-level player on a bad team. Limited ability to change the outcome.", projection: "200–230 yards, 1 TD, 1 turnover" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "seahawks-at-cardinals",
    awayAbbr: "SEA",
    homeAbbr: "ARI",
    date: "Sun, Nov 24",
    time: "4:05 PM ET",
    headline: "A true coin flip between two inconsistent teams — hard to feel confident picking either side.",
    rundown: [
      "Both teams are around .500 and fighting for a playoff spot, but neither has been consistent.",
      "Geno Smith and Kyler Murray are both capable of great games and terrible ones.",
      "If you're betting on this game, keep it small — it's genuinely unpredictable.",
      "Home-field advantage gives Arizona a very slight edge, but that's about it.",
    ],
    awayPlayers: [
      { name: "Geno Smith", position: "QB", team: "SEA", verdict: "Can be brilliant or invisible — you never know which version shows up.", projection: "240–270 yards, 2 TDs, 1 turnover" },
    ],
    homePlayers: [
      { name: "Kyler Murray", position: "QB", team: "ARI", verdict: "Healthy and dangerous — his ability to run makes Arizona unpredictable.", projection: "230–260 yards, 1–2 TDs, 30+ rushing yards" },
      { name: "Marvin Harrison Jr.", position: "WR", team: "ARI", verdict: "Talented rookie still finding consistency — some weeks he dominates, some he disappears.", projection: "4–7 catches, 60–90 yards" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "ravens-at-chargers",
    awayAbbr: "BAL",
    homeAbbr: "LAC",
    date: "Sun, Nov 24",
    time: "4:25 PM ET",
    headline: "Baltimore's offense has been nearly unstoppable, but the Chargers at home are no pushover — expect a close, high-scoring game.",
    rundown: [
      "Baltimore has one of the most dangerous offenses in football with Lamar Jackson and Derrick Henry.",
      "The Chargers have been disciplined and tough under their new coach — Justin Herbert is playing great.",
      "Baltimore has a slight edge overall, but this game could easily go either way.",
      "Expect both teams to score a lot — this is two good offenses going at it.",
    ],
    awayPlayers: [
      { name: "Lamar Jackson", position: "QB", team: "BAL", verdict: "The favorite for MVP — he can beat you throwing and running, and right now he's doing both.", projection: "260–290 yards, 2–3 TDs, 50+ rushing yards" },
      { name: "Derrick Henry", position: "RB", team: "BAL", verdict: "Still one of the most powerful runners in football at age 30.", projection: "20–24 carries, 90–120 yards, 1 TD" },
    ],
    homePlayers: [
      { name: "Justin Herbert", position: "QB", team: "LAC", verdict: "One of the best arms in football, and he's been more efficient this year than ever.", projection: "260–280 yards, 2 TDs" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },

  // ── SUNDAY NIGHT ──
  {
    slug: "eagles-at-rams",
    awayAbbr: "PHI",
    homeAbbr: "LAR",
    date: "Sun, Nov 24",
    time: "8:20 PM ET",
    headline: "Philadelphia's running game has been dominant all season, and the Rams' defense doesn't have the bodies to stop it.",
    rundown: [
      "Philadelphia has won 7 straight games and their running back Saquon Barkley is having a historic season.",
      "The Rams' defense has been gutted by injuries — they're one of the worst at stopping the run.",
      "Los Angeles can score through the air with Stafford, so the game might stay close-ish, but Philadelphia should win.",
      "Philadelphia is the clear favorite here — this is one of the more confident picks of the week.",
    ],
    awayPlayers: [
      { name: "Saquon Barkley", position: "RB", team: "PHI", verdict: "The best player in football right now — this could be his biggest game of the season.", projection: "25+ carries, 130–160 yards, 1–2 TDs" },
      { name: "Jalen Hurts", position: "QB", team: "PHI", verdict: "Doesn't need to throw much when the run game is this good — efficient and dangerous near the goal line.", projection: "200–230 yards, 1 pass TD, 1 rushing TD" },
    ],
    homePlayers: [
      { name: "Matthew Stafford", position: "QB", team: "LAR", verdict: "The main reason this game might be closer than expected — he's smart and battles hard.", projection: "260–290 yards, 2 TDs" },
      { name: "Puka Nacua", position: "WR", team: "LAR", verdict: "The Rams' biggest playmaker — expect a lot of targets because LA will need to pass to keep up.", projection: "7–9 catches, 90–110 yards" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },

  // ── MONDAY NIGHT ──
  {
    slug: "ravens-at-bengals",
    awayAbbr: "BAL",
    homeAbbr: "CIN",
    date: "Mon, Nov 25",
    time: "8:15 PM ET",
    headline: "Two of the most talented offenses in football going head-to-head — this should be the most entertaining game of the week.",
    rundown: [
      "Baltimore has Lamar Jackson and Derrick Henry — their running game has been historically good.",
      "Cincinnati has Joe Burrow and Ja'Marr Chase — their passing game is equally dangerous.",
      "Baltimore has a slight edge because their rushing attack is so hard to stop, but Burrow at home is scary.",
      "Expect a lot of points from both sides — this is appointment television.",
    ],
    awayPlayers: [
      { name: "Lamar Jackson", position: "QB", team: "BAL", verdict: "The most dangerous player in football right now — can beat you in every way.", projection: "270–300 yards, 2–3 TDs, 50+ rushing yards" },
      { name: "Derrick Henry", position: "RB", team: "BAL", verdict: "Physical and relentless — wears down the defense as the game goes on.", projection: "20–25 carries, 100–130 yards, 1 TD" },
    ],
    homePlayers: [
      { name: "Joe Burrow", position: "QB", team: "CIN", verdict: "One of the best quarterbacks in football — at home, under the lights, he's at his best.", projection: "280–310 yards, 3 TDs" },
      { name: "Ja'Marr Chase", position: "WR", team: "CIN", verdict: "The best receiver in football right now — leads the league in yards, touchdowns, and catches.", projection: "7–10 catches, 100–130 yards, 1–2 TDs" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
];

function espnHeadshot(id: number): string {
  return `https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${id}.png&h=96&w=96`;
}

export type PlayerSpotlight = {
  name: string;
  position: "QB" | "RB" | "WR" | "TE";
  team: string;
  headshotUrl: string;
  verdict: string;
  projection: string;
};

export type Game = {
  slug: string;
  awayAbbr: string;
  homeAbbr: string;
  date: string;
  time: string;
  takeaway: string;
  story: string;
  edge: number;
  pick: "away" | "home" | "toss-up";
  predictedScore: { away: number; home: number };
  quickHits: string[];
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
    takeaway: "Pittsburgh likely wins a low-scoring grind",
    story: "Pittsburgh's elite defense at 8-2 should control a Cleveland team that's 2-8 and can't move the ball. Thursday games are always sloppy, which favors the better team.",
    edge: 72,
    pick: "away",
    predictedScore: { away: 20, home: 13 },
    quickHits: [
      "Thursday games tend to be sloppy — favors the better team",
      "Pittsburgh's defense is top 3 in the league",
      "Cleveland can't score consistently this year",
    ],
    awayPlayers: [
      { name: "Russell Wilson", position: "QB", team: "PIT", headshotUrl: espnHeadshot(14881), verdict: "Should have a decent game but won't need to throw much.", projection: "180–220 passing yards, 1 TD" },
      { name: "Najee Harris", position: "RB", team: "PIT", headshotUrl: espnHeadshot(4241457), verdict: "Expect him to carry the load — Pittsburgh will try to run the clock out.", projection: "22 carries, 85–100 yards, 1 TD" },
    ],
    homePlayers: [
      { name: "Jameis Winston", position: "QB", team: "CLE", headshotUrl: espnHeadshot(2969939), verdict: "Unpredictable — could make a great play or a terrible mistake on any throw.", projection: "210–250 yards, 1 TD, 2 turnovers" },
      { name: "Jerry Jeudy", position: "WR", team: "CLE", headshotUrl: espnHeadshot(4360438), verdict: "Cleveland's best pass-catcher, but Pittsburgh's defense is elite.", projection: "5–7 catches, 55–70 yards" },
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
    takeaway: "Washington is the clear favorite here",
    story: "Dallas is starting a backup QB and has lost five straight. Washington's rookie Jayden Daniels has been electric — this is one of the safest picks of the week.",
    edge: 88,
    pick: "home",
    predictedScore: { away: 14, home: 28 },
    quickHits: [
      "Dallas is on a 5-game losing streak",
      "Washington's rookie QB has been one of the best stories this year",
      "One of the safest picks of the week",
    ],
    awayPlayers: [
      { name: "Cooper Rush", position: "QB", team: "DAL", headshotUrl: espnHeadshot(3122840), verdict: "A backup who won't make enough plays to win on the road.", projection: "180–210 yards, 1 TD, 1–2 turnovers" },
      { name: "CeeDee Lamb", position: "WR", team: "DAL", headshotUrl: espnHeadshot(4241389), verdict: "Great player, but a backup QB limits what he can do.", projection: "5–7 catches, 55–75 yards" },
    ],
    homePlayers: [
      { name: "Jayden Daniels", position: "QB", team: "WAS", headshotUrl: espnHeadshot(4432577), verdict: "Talented rookie who can beat you throwing and running — a nightmare to defend.", projection: "230–260 yards, 1–2 TDs, 40+ rushing yards" },
      { name: "Terry McLaurin", position: "WR", team: "WAS", headshotUrl: espnHeadshot(3932905), verdict: "Having a great year and facing one of the worst defenses in the league.", projection: "6–8 catches, 80–100 yards, 1 TD" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "vikings-at-bears",
    awayAbbr: "MIN",
    homeAbbr: "CHI",
    date: "Sun, Nov 24",
    time: "1:00 PM ET",
    takeaway: "Minnesota's defense likely smothers Chicago",
    story: "Minnesota is 8-2 with a top-5 defense that feasts on young QBs. Chicago's rookie Caleb Williams is talented but makes mistakes under heavy pressure.",
    edge: 75,
    pick: "away",
    predictedScore: { away: 24, home: 14 },
    quickHits: [
      "Minnesota's defense feasts on rookie QBs",
      "Chicago has struggled to protect their quarterback",
      "Minnesota is 8-2 and playing at an elite level",
    ],
    awayPlayers: [
      { name: "Sam Darnold", position: "QB", team: "MIN", headshotUrl: espnHeadshot(3912547), verdict: "Having the best season of his career with great players around him.", projection: "230–260 yards, 2 TDs" },
      { name: "Justin Jefferson", position: "WR", team: "MIN", headshotUrl: espnHeadshot(4262921), verdict: "Arguably the best receiver in football — defenses can't stop him even when they focus on him.", projection: "6–9 catches, 90–120 yards" },
    ],
    homePlayers: [
      { name: "Caleb Williams", position: "QB", team: "CHI", headshotUrl: espnHeadshot(4429013), verdict: "Talented but still learning — this is a really tough matchup for a rookie.", projection: "190–230 yards, 1 TD, 1–2 turnovers" },
      { name: "DJ Moore", position: "WR", team: "CHI", headshotUrl: espnHeadshot(3116164), verdict: "Williams' go-to target. He'll get chances because Chicago will be playing from behind.", projection: "6–8 catches, 65–85 yards" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "titans-at-texans",
    awayAbbr: "TEN",
    homeAbbr: "HOU",
    date: "Sun, Nov 24",
    time: "1:00 PM ET",
    takeaway: "Houston should handle this comfortably at home",
    story: "Houston is 7-4 and the clear division leader with a star QB in Stroud. Tennessee is 2-8 and rebuilding — the talent gap is significant here.",
    edge: 85,
    pick: "home",
    predictedScore: { away: 14, home: 27 },
    quickHits: [
      "Houston's QB is a rising star playing at home",
      "Tennessee's QB makes too many risky throws",
      "Big talent gap between these two teams",
    ],
    awayPlayers: [
      { name: "Will Levis", position: "QB", team: "TEN", headshotUrl: espnHeadshot(4361741), verdict: "Has a big arm but makes risky decisions — not a good combo against a good defense.", projection: "200–240 yards, 1 TD, 1–2 turnovers" },
      { name: "Tony Pollard", position: "RB", team: "TEN", headshotUrl: espnHeadshot(4047650), verdict: "Tennessee's best player on offense — he keeps them competitive.", projection: "16–20 carries, 70–85 yards" },
    ],
    homePlayers: [
      { name: "C.J. Stroud", position: "QB", team: "HOU", headshotUrl: espnHeadshot(4432169), verdict: "A rising star at home against a weak defense — he should have a big day.", projection: "260–290 yards, 2–3 TDs" },
      { name: "Nico Collins", position: "WR", team: "HOU", headshotUrl: espnHeadshot(4360310), verdict: "Having a breakout year — fast, strong, and Stroud's favorite target.", projection: "5–8 catches, 80–110 yards, 1 TD" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "patriots-at-dolphins",
    awayAbbr: "NE",
    homeAbbr: "MIA",
    date: "Sun, Nov 24",
    time: "1:00 PM ET",
    takeaway: "Miami's speed advantage is likely too much",
    story: "Tua is healthy and Miami's offense is explosive again. New England is rebuilding with a rookie QB who doesn't have much help — this is a big mismatch.",
    edge: 86,
    pick: "home",
    predictedScore: { away: 13, home: 31 },
    quickHits: [
      "Miami's fastest players are healthy again",
      "New England is rebuilding — not built to win right now",
      "Expect a lot of points from Miami's offense",
    ],
    awayPlayers: [
      { name: "Drake Maye", position: "QB", team: "NE", headshotUrl: espnHeadshot(4432682), verdict: "A promising rookie, but limited by the talent around him.", projection: "200–230 yards, 1 TD, 1 turnover" },
    ],
    homePlayers: [
      { name: "Tua Tagovailoa", position: "QB", team: "MIA", headshotUrl: espnHeadshot(4241479), verdict: "Back from injury and clicking — when healthy, this offense is dangerous.", projection: "270–300 yards, 2–3 TDs" },
      { name: "Tyreek Hill", position: "WR", team: "MIA", headshotUrl: espnHeadshot(3116389), verdict: "The fastest player in football against a young, overmatched defense.", projection: "5–8 catches, 90–130 yards, 1 TD" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "buccaneers-at-giants",
    awayAbbr: "TB",
    homeAbbr: "NYG",
    date: "Sun, Nov 24",
    time: "1:00 PM ET",
    takeaway: "Tampa Bay should cruise through this one",
    story: "Baker Mayfield is having a career year and Tampa's offense is clicking. The Giants at 2-8 haven't been competitive against any good team this season.",
    edge: 84,
    pick: "away",
    predictedScore: { away: 27, home: 16 },
    quickHits: [
      "Tampa's QB is having a career-best year",
      "The Giants haven't beaten a good team all season",
      "Tampa's offense has been clicking on all cylinders",
    ],
    awayPlayers: [
      { name: "Baker Mayfield", position: "QB", team: "TB", headshotUrl: espnHeadshot(3052587), verdict: "Playing with confidence and making all the right throws this season.", projection: "260–290 yards, 2 TDs" },
      { name: "Mike Evans", position: "WR", team: "TB", headshotUrl: espnHeadshot(2976499), verdict: "Consistent veteran who should have a field day against a weak secondary.", projection: "5–7 catches, 75–100 yards, 1 TD" },
    ],
    homePlayers: [
      { name: "Tommy DeVito", position: "QB", team: "NYG", headshotUrl: espnHeadshot(4373622), verdict: "Plays hard but the talent gap between these teams is just too big.", projection: "180–220 yards, 1 TD, 1 turnover" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "panthers-at-chiefs",
    awayAbbr: "CAR",
    homeAbbr: "KC",
    date: "Sun, Nov 24",
    time: "1:00 PM ET",
    takeaway: "Kansas City is expected to win easily",
    story: "The Chiefs are 9-1 with Mahomes — the best QB in football. Carolina at 2-8 is the worst team in the league. This is as lopsided as it gets.",
    edge: 92,
    pick: "home",
    predictedScore: { away: 10, home: 31 },
    quickHits: [
      "This is the biggest mismatch of the week",
      "Carolina is the worst team in the league right now",
      "Kansas City's defense alone could win this game",
    ],
    awayPlayers: [
      { name: "Bryce Young", position: "QB", team: "CAR", headshotUrl: espnHeadshot(4429025), verdict: "Struggling behind a bad offensive line against one of the best defenses in the league.", projection: "170–200 yards, 0–1 TD, 1–2 turnovers" },
    ],
    homePlayers: [
      { name: "Patrick Mahomes", position: "QB", team: "KC", headshotUrl: espnHeadshot(3139477), verdict: "Won't need to do much — should cruise to a comfortable win.", projection: "240–270 yards, 2 TDs" },
      { name: "Travis Kelce", position: "TE", team: "KC", headshotUrl: espnHeadshot(2519036), verdict: "Good chance for a big game against Carolina's weak defense at that position.", projection: "6–8 catches, 70–90 yards, 1 TD" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "colts-at-lions",
    awayAbbr: "IND",
    homeAbbr: "DET",
    date: "Sun, Nov 24",
    time: "1:00 PM ET",
    takeaway: "Detroit likely pulls away in the second half",
    story: "Detroit is 9-1 with an offense scoring 30+ regularly at home. Indianapolis fights hard but doesn't have the firepower to keep up score-for-score.",
    edge: 78,
    pick: "home",
    predictedScore: { away: 20, home: 34 },
    quickHits: [
      "Detroit's offense is scoring 30+ points regularly",
      "Indianapolis can't keep up in a shootout",
      "Detroit is dominant at home this season",
    ],
    awayPlayers: [
      { name: "Anthony Richardson", position: "QB", team: "IND", headshotUrl: espnHeadshot(4429084), verdict: "An incredible athlete, but still inconsistent as a passer.", projection: "200–240 yards, 1–2 TDs, 40+ rushing yards" },
    ],
    homePlayers: [
      { name: "Jared Goff", position: "QB", team: "DET", headshotUrl: espnHeadshot(3046779), verdict: "Quietly having one of the best seasons of any quarterback this year.", projection: "280–310 yards, 3 TDs" },
      { name: "Jahmyr Gibbs", position: "RB", team: "DET", headshotUrl: espnHeadshot(4429795), verdict: "One of the most exciting players in football — scores from anywhere on the field.", projection: "15 carries, 80+ yards, 4 catches, 1–2 TDs" },
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
    takeaway: "This could genuinely go either way",
    story: "Two of the best teams in football — KC is 9-1 and Buffalo is 9-2. Both QBs are playing at an MVP level. Buffalo has a slight home-field edge, but that's about it.",
    edge: 52,
    pick: "toss-up",
    predictedScore: { away: 24, home: 27 },
    quickHits: [
      "Two of the best teams in football facing off",
      "Both QBs are playing at an MVP level",
      "Home field is the only real difference-maker",
    ],
    awayPlayers: [
      { name: "Patrick Mahomes", position: "QB", team: "KC", headshotUrl: espnHeadshot(3139477), verdict: "The best big-game quarterback alive — always dangerous even on the road.", projection: "250–280 yards, 1–2 TDs" },
      { name: "Travis Kelce", position: "TE", team: "KC", headshotUrl: espnHeadshot(2519036), verdict: "Has been quiet this season, but always shows up in the biggest moments.", projection: "5–7 catches, 50–70 yards" },
    ],
    homePlayers: [
      { name: "Josh Allen", position: "QB", team: "BUF", headshotUrl: espnHeadshot(3918298), verdict: "Having an MVP-caliber season and is nearly unstoppable at home.", projection: "270–300 yards, 2–3 TDs, 30+ rushing yards" },
      { name: "James Cook", position: "RB", team: "BUF", headshotUrl: espnHeadshot(4361579), verdict: "If he gets going early, Buffalo controls the pace of the game.", projection: "14–18 carries, 65–85 yards" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "packers-at-49ers",
    awayAbbr: "GB",
    homeAbbr: "SF",
    date: "Sun, Nov 24",
    time: "4:25 PM ET",
    takeaway: "Slight edge to San Francisco at home",
    story: "A playoff rematch with two explosive offenses. Green Bay is young and improving fast, while San Francisco has injuries but remains loaded with talent.",
    edge: 55,
    pick: "toss-up",
    predictedScore: { away: 24, home: 27 },
    quickHits: [
      "Playoff rematch — both teams remember last time",
      "Green Bay's young roster is improving fast",
      "San Francisco has key injuries but still loaded",
    ],
    awayPlayers: [
      { name: "Jordan Love", position: "QB", team: "GB", headshotUrl: espnHeadshot(4241463), verdict: "Growing into a star — has the arm talent and the playmakers to keep up with anyone.", projection: "260–290 yards, 2–3 TDs" },
      { name: "Josh Jacobs", position: "RB", team: "GB", headshotUrl: espnHeadshot(4047365), verdict: "Physical runner who wears defenses down as the game goes on.", projection: "18–22 carries, 75–95 yards" },
    ],
    homePlayers: [
      { name: "Brock Purdy", position: "QB", team: "SF", headshotUrl: espnHeadshot(4361411), verdict: "One of the most efficient passers in football when his protection holds up.", projection: "260–280 yards, 2 TDs" },
      { name: "Christian McCaffrey", position: "RB", team: "SF", headshotUrl: espnHeadshot(3117251), verdict: "If he plays (game-time decision), San Francisco's offense goes to another level.", projection: "15–20 touches, 80–110 total yards if active" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "broncos-at-raiders",
    awayAbbr: "DEN",
    homeAbbr: "LV",
    date: "Sun, Nov 24",
    time: "4:05 PM ET",
    takeaway: "Denver's defense likely decides this one",
    story: "Denver has a strong defense and their smart rookie QB Bo Nix avoids mistakes. Las Vegas is 2-8 and going nowhere — expect a comfortable Denver win.",
    edge: 74,
    pick: "away",
    predictedScore: { away: 21, home: 14 },
    quickHits: [
      "Denver's defense has been one of the best this season",
      "Las Vegas has no answer on offense",
      "Denver's rookie QB plays smart, mistake-free football",
    ],
    awayPlayers: [
      { name: "Bo Nix", position: "QB", team: "DEN", headshotUrl: espnHeadshot(4432811), verdict: "Smart rookie who doesn't make big mistakes — perfect for a defense-first team.", projection: "220–250 yards, 1–2 TDs" },
    ],
    homePlayers: [
      { name: "Aidan O'Connell", position: "QB", team: "LV", headshotUrl: espnHeadshot(4361418), verdict: "A backup-level player on a bad team. Limited ability to change the outcome.", projection: "200–230 yards, 1 TD, 1 turnover" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "seahawks-at-cardinals",
    awayAbbr: "SEA",
    homeAbbr: "ARI",
    date: "Sun, Nov 24",
    time: "4:05 PM ET",
    takeaway: "Hard to feel confident picking either side",
    story: "Both teams hover around .500 with inconsistent QBs who can look brilliant or invisible on any given week. Home field gives Arizona a tiny edge.",
    edge: 50,
    pick: "toss-up",
    predictedScore: { away: 23, home: 24 },
    quickHits: [
      "Both QBs are wildly inconsistent week to week",
      "Neither team has separated from the pack",
      "True coin-flip game — home field is the tiebreaker",
    ],
    awayPlayers: [
      { name: "Geno Smith", position: "QB", team: "SEA", headshotUrl: espnHeadshot(15168), verdict: "Can be brilliant or invisible — you never know which version shows up.", projection: "240–270 yards, 2 TDs, 1 turnover" },
    ],
    homePlayers: [
      { name: "Kyler Murray", position: "QB", team: "ARI", headshotUrl: espnHeadshot(3917315), verdict: "Healthy and dangerous — his ability to run makes Arizona unpredictable.", projection: "230–260 yards, 1–2 TDs, 30+ rushing yards" },
      { name: "Marvin Harrison Jr.", position: "WR", team: "ARI", headshotUrl: espnHeadshot(4432902), verdict: "Talented rookie still finding consistency — some weeks he dominates, some he disappears.", projection: "4–7 catches, 60–90 yards" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "ravens-at-chargers",
    awayAbbr: "BAL",
    homeAbbr: "LAC",
    date: "Sun, Nov 24",
    time: "4:25 PM ET",
    takeaway: "Baltimore's firepower likely gives them the edge",
    story: "Baltimore has Lamar Jackson (the MVP favorite) and Derrick Henry running over everyone. The Chargers are tough and disciplined, but Baltimore has more weapons.",
    edge: 65,
    pick: "away",
    predictedScore: { away: 28, home: 24 },
    quickHits: [
      "Baltimore has the MVP favorite at QB",
      "Their running game has been historically good",
      "The Chargers are tough but have fewer weapons",
    ],
    awayPlayers: [
      { name: "Lamar Jackson", position: "QB", team: "BAL", headshotUrl: espnHeadshot(3916387), verdict: "The favorite for MVP — he can beat you throwing and running, and right now he's doing both.", projection: "260–290 yards, 2–3 TDs, 50+ rushing yards" },
      { name: "Derrick Henry", position: "RB", team: "BAL", headshotUrl: espnHeadshot(3043078), verdict: "Still one of the most powerful runners in football at age 30.", projection: "20–24 carries, 90–120 yards, 1 TD" },
    ],
    homePlayers: [
      { name: "Justin Herbert", position: "QB", team: "LAC", headshotUrl: espnHeadshot(4038524), verdict: "One of the best arms in football, and he's been more efficient this year than ever.", projection: "260–280 yards, 2 TDs" },
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
    takeaway: "Philadelphia expected to dominate on the ground",
    story: "Philly has won 7 straight and Saquon Barkley is having a historic rushing season. The Rams' injury-gutted defense can't stop the run.",
    edge: 82,
    pick: "away",
    predictedScore: { away: 30, home: 21 },
    quickHits: [
      "Philly has won 7 straight games",
      "Their star running back is having a historic season",
      "The Rams' defense is gutted by injuries",
    ],
    awayPlayers: [
      { name: "Saquon Barkley", position: "RB", team: "PHI", headshotUrl: espnHeadshot(3929630), verdict: "The best player in football right now — this could be his biggest game of the season.", projection: "25+ carries, 130–160 yards, 1–2 TDs" },
      { name: "Jalen Hurts", position: "QB", team: "PHI", headshotUrl: espnHeadshot(4040715), verdict: "Doesn't need to throw much when the run game is this good — efficient and dangerous near the goal line.", projection: "200–230 yards, 1 pass TD, 1 rushing TD" },
    ],
    homePlayers: [
      { name: "Matthew Stafford", position: "QB", team: "LAR", headshotUrl: espnHeadshot(12483), verdict: "The main reason this game might be closer than expected — he's smart and battles hard.", projection: "260–290 yards, 2 TDs" },
      { name: "Puka Nacua", position: "WR", team: "LAR", headshotUrl: espnHeadshot(4430086), verdict: "The Rams' biggest playmaker — expect a lot of targets because LA will need to pass to keep up.", projection: "7–9 catches, 90–110 yards" },
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
    takeaway: "Baltimore's run game likely tips the balance",
    story: "Two of the most talented offenses in football. Baltimore has a historically good rushing attack with Lamar and Henry, while Cincinnati's passing game with Burrow and Chase is equally dangerous.",
    edge: 62,
    pick: "away",
    predictedScore: { away: 31, home: 27 },
    quickHits: [
      "Two of the most talented offenses in the league",
      "Baltimore's running game vs. Cincinnati's passing game",
      "Expect a lot of points — both teams can score fast",
    ],
    awayPlayers: [
      { name: "Lamar Jackson", position: "QB", team: "BAL", headshotUrl: espnHeadshot(3916387), verdict: "The most dangerous player in football right now — can beat you in every way.", projection: "270–300 yards, 2–3 TDs, 50+ rushing yards" },
      { name: "Derrick Henry", position: "RB", team: "BAL", headshotUrl: espnHeadshot(3043078), verdict: "Physical and relentless — wears down the defense as the game goes on.", projection: "20–25 carries, 100–130 yards, 1 TD" },
    ],
    homePlayers: [
      { name: "Joe Burrow", position: "QB", team: "CIN", headshotUrl: espnHeadshot(3915511), verdict: "One of the best quarterbacks in football — at home, under the lights, he's at his best.", projection: "280–310 yards, 3 TDs" },
      { name: "Ja'Marr Chase", position: "WR", team: "CIN", headshotUrl: espnHeadshot(4362628), verdict: "The best receiver in football right now — leads the league in yards, touchdowns, and catches.", projection: "7–10 catches, 100–130 yards, 1–2 TDs" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
];

export type PlayerSpotlight = {
  name: string;
  position: "QB" | "RB" | "WR" | "TE";
  team: string;
  verdict: string; // One punchy line — the "so what?"
  detail: string; // 1-2 sentences of context
  expectation: string; // Projected stat line
};

export type Game = {
  slug: string;
  awayAbbr: string;
  homeAbbr: string;
  date: string;
  time: string;
  network?: string;
  spread: string;
  overUnder: string;
  insight: string; // One-line card insight
  takeaway: string; // The verdict — shown FIRST in detail view
  story: string;
  oddsExplained: string[];
  awayPlayers: PlayerSpotlight[];
  homePlayers: PlayerSpotlight[];
  lastUpdated: string;
};

export const WEEK = {
  number: 12,
  dateRange: "Nov 19–25, 2024",
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
    network: "Prime",
    spread: "PIT -3.5",
    overUnder: "36.5",
    insight: "Thursday night AFC North grudge match — expect ugly, physical football.",
    takeaway: "Pittsburgh's defense travels. This will be low-scoring and sloppy. Lean Steelers, take the under.",
    story: "Two proud AFC North defenses meet on a short week. The Steelers are 8-2 and grinding out wins with defense and Russell Wilson's deep ball. The Browns are 2-8 and going nowhere, but their defensive front still shows up for divisional games. Thursday night division games are historically brutal and low-scoring.",
    oddsExplained: [
      "Steelers -3.5 → Pittsburgh wins by a field goal or more. Close but not dominant.",
      "Over/Under 36.5 → One of the lowest totals of the week. Vegas expects a defensive struggle.",
      "This is a classic Thursday night ugly game. Don't expect fireworks.",
    ],
    awayPlayers: [
      { name: "Russell Wilson", position: "QB", team: "PIT", verdict: "Efficient but capped. The run game does the heavy lifting.", detail: "Wilson has revitalized Pittsburgh's passing game with his deep ball, but on a short week, expect a conservative game plan. 15-20 attempts.", expectation: "180-220 yards, 1 TD" },
      { name: "Najee Harris", position: "RB", team: "PIT", verdict: "Workhorse role in a game they want to grind out.", detail: "Harris gets 20+ carries when Pittsburgh is protecting a lead. Cleveland's run defense has been soft.", expectation: "22 carries, 85-100 yards, 1 TD" },
    ],
    homePlayers: [
      { name: "Jameis Winston", position: "QB", team: "CLE", verdict: "Boom-or-bust. He'll make one great throw and one terrible one.", detail: "Winston replaced Deshaun Watson and has been entertaining but chaotic. Pittsburgh's defense forces turnovers.", expectation: "210-250 yards, 1 TD, 2 INT" },
      { name: "Jerry Jeudy", position: "WR", team: "CLE", verdict: "The only receiving threat worth watching.", detail: "Jeudy has been Cleveland's most consistent weapon, but Pittsburgh's secondary is elite.", expectation: "5-7 catches, 55-70 yards" },
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
    network: "FOX",
    spread: "WAS -10.5",
    overUnder: "44.5",
    insight: "Dallas is in freefall and Washington is surging — this spread is massive for a rivalry game.",
    takeaway: "Washington should roll. The only real question is whether 10.5 is too many points in a rivalry game. Bet the Commanders if you're confident, but if you're nervous about the spread, just take the moneyline.",
    story: "This is a rivalry game that doesn't feel like one. The Cowboys have lost 5 straight and look like a team that's quit on the season. Meanwhile, rookie QB Jayden Daniels has Washington at 7-4 and in the playoff hunt. A double-digit spread in a division game tells you everything.",
    oddsExplained: [
      "Commanders -10.5 → Vegas expects Washington to win by nearly two touchdowns. Huge for a rivalry.",
      "Over/Under 44.5 → Moderate. Washington scores, then it gets boring in the second half.",
      "Moneyline: Commanders -550 / Cowboys +400 → Washington is a heavy favorite.",
    ],
    awayPlayers: [
      { name: "Cooper Rush", position: "QB", team: "DAL", verdict: "Career backup in a hostile environment. This is why the spread is so big.", detail: "Rush is filling in for injured Dak Prescott. Conservative play with mistakes under pressure.", expectation: "180-210 yards, 1 TD, 1-2 turnovers" },
      { name: "CeeDee Lamb", position: "WR", team: "DAL", verdict: "Elite talent capped by a backup QB. Be careful with his props.", detail: "Lamb's production has dipped with Rush. Defenses key on him since there's no other threat.", expectation: "5-7 catches, 55-75 yards" },
      { name: "Rico Dowdle", position: "RB", team: "DAL", verdict: "Serviceable but not a game-changer. If the run stalls, Dallas is in trouble.", detail: "Lead back by default. Washington's front seven is physical enough to shut it down.", expectation: "12-16 carries, 40-60 yards" },
    ],
    homePlayers: [
      { name: "Jayden Daniels", position: "QB", team: "WAS", verdict: "Dual-threat rookie against a defense that can't stop mobile QBs. Mismatch.", detail: "Best first-year QB in the league — 2,100+ yards passing, 450+ rushing. This is a get-right game.", expectation: "230-260 yards, 1-2 TDs, 40+ rushing yards" },
      { name: "Brian Robinson Jr.", position: "RB", team: "WAS", verdict: "Clock-killer. If Washington leads early, Robinson eats the second half.", detail: "Solid and physical, averaging 4+ yards per carry. Workload game.", expectation: "18-22 carries, 75-95 yards, 1 TD" },
      { name: "Terry McLaurin", position: "WR", team: "WAS", verdict: "Career year matchup against the league's worst secondary. Over on yards.", detail: "On pace for 1,100+ yards. Cowboys can't stop big plays downfield.", expectation: "6-8 catches, 80-100 yards, 1 TD" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "vikings-at-bears",
    awayAbbr: "MIN",
    homeAbbr: "CHI",
    date: "Sun, Nov 24",
    time: "1:00 PM ET",
    network: "FOX",
    spread: "MIN -3.5",
    overUnder: "40.5",
    insight: "Minnesota's defense is elite. Caleb Williams is still learning. This could get uncomfortable for Chicago.",
    takeaway: "Vikings defense dominates rookies. Minnesota covers unless Williams has the game of his life. Like the Vikings.",
    story: "The Vikings' defense is one of the best in football, and they're about to face a rookie QB still figuring things out. Caleb Williams has shown flashes but also looks lost under pressure. Minnesota's pass rush will test him.",
    oddsExplained: [
      "Vikings -3.5 → Minnesota wins by a field goal+. Close-ish, but Vikings are clearly better.",
      "Over/Under 40.5 → Low scoring expected. Both defenses are physical.",
      "Minnesota's defense has been a nightmare for young QBs this year.",
    ],
    awayPlayers: [
      { name: "Sam Darnold", position: "QB", team: "MIN", verdict: "Career renaissance. Efficient with weapons around him.", detail: "Darnold is playing the best football of his career in Kevin O'Connell's system.", expectation: "230-260 yards, 2 TDs" },
      { name: "Justin Jefferson", position: "WR", team: "MIN", verdict: "Best receiver in football. Chicago will double him and he'll still produce.", detail: "On pace for 1,400+ yards. He's matchup-proof.", expectation: "6-9 catches, 90-120 yards" },
    ],
    homePlayers: [
      { name: "Caleb Williams", position: "QB", team: "CHI", verdict: "Talented but raw. Minnesota's pass rush will speed up his clock.", detail: "Flashes of brilliance mixed with rookie mistakes. This is a tough draw.", expectation: "190-230 yards, 1 TD, 1-2 INT" },
      { name: "DJ Moore", position: "WR", team: "CHI", verdict: "Williams' best weapon. Volume will be there out of necessity.", detail: "Moore is the safety valve when pressure comes. Consistent target share.", expectation: "6-8 catches, 65-85 yards" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "titans-at-texans",
    awayAbbr: "TEN",
    homeAbbr: "HOU",
    date: "Sun, Nov 24",
    time: "1:00 PM ET",
    network: "CBS",
    spread: "HOU -8.5",
    overUnder: "43.5",
    insight: "Houston is a legit contender. Tennessee is figuring out life with a new QB.",
    takeaway: "Texans at home against a rebuilding team. Houston should handle this. Love the Texans.",
    story: "Houston is 7-4 and establishing themselves as the AFC South's best team. The Titans are 2-8 and playing out the string with Will Levis still developing. This should be a comfortable home win.",
    oddsExplained: [
      "Texans -8.5 → Houston by more than a touchdown. Vegas sees a mismatch.",
      "Over/Under 43.5 → Moderate. Houston's offense can score but may coast.",
      "Tennessee hasn't shown they can keep up with playoff-caliber teams.",
    ],
    awayPlayers: [
      { name: "Will Levis", position: "QB", team: "TEN", verdict: "Inconsistent. Great arm, but turnover-prone under pressure.", detail: "Levis has upside but Houston's defense is the wrong matchup for a QB who forces throws.", expectation: "200-240 yards, 1 TD, 1-2 INT" },
      { name: "Tony Pollard", position: "RB", team: "TEN", verdict: "Tennessee's best offensive weapon. Volume keeps them in it.", detail: "Pollard is averaging 4.5 yards per carry and catches passes. He's the offense.", expectation: "16-20 carries, 70-85 yards, 3 catches" },
    ],
    homePlayers: [
      { name: "C.J. Stroud", position: "QB", team: "HOU", verdict: "Sophomore star at home against a bad defense. Should carve them up.", detail: "Stroud has been excellent in Year 2. Accurate, poised, and has weapons everywhere.", expectation: "260-290 yards, 2-3 TDs" },
      { name: "Nico Collins", position: "WR", team: "HOU", verdict: "Breakout season. If healthy, he's a matchup nightmare.", detail: "Collins has become Stroud's #1 target with elite size-speed combo.", expectation: "5-8 catches, 80-110 yards, 1 TD" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "patriots-at-dolphins",
    awayAbbr: "NE",
    homeAbbr: "MIA",
    date: "Sun, Nov 24",
    time: "1:00 PM ET",
    network: "CBS",
    spread: "MIA -7",
    overUnder: "46.5",
    insight: "Tua is back and Miami's offense looks dangerous again. New England is rebuilding.",
    takeaway: "Miami at home with Tua healthy. Patriots don't have the firepower. Take the Dolphins.",
    story: "Tua Tagovailoa is back from injury and the Dolphins' offense is clicking again. The Patriots are in full rebuild mode with Drake Maye learning on the job. Miami's speed advantage is massive.",
    oddsExplained: [
      "Dolphins -7 → Miami by a touchdown. Comfortable favorite at home.",
      "Over/Under 46.5 → Higher total, expecting Miami's offense to produce.",
      "New England is playing for draft position at this point.",
    ],
    awayPlayers: [
      { name: "Drake Maye", position: "QB", team: "NE", verdict: "Rookie with potential but limited weapons. Hard to trust on the road.", detail: "Maye has shown arm talent but the supporting cast is thin.", expectation: "200-230 yards, 1 TD, 1 INT" },
    ],
    homePlayers: [
      { name: "Tua Tagovailoa", position: "QB", team: "MIA", verdict: "Back and dealing. When healthy, this offense is explosive.", detail: "Tua's accuracy and Hill/Waddle make Miami's passing game the league's most dangerous.", expectation: "270-300 yards, 2-3 TDs" },
      { name: "Tyreek Hill", position: "WR", team: "MIA", verdict: "The fastest player in football against a young secondary. Trouble.", detail: "Hill can take the top off any defense. New England's corners are overmatched.", expectation: "5-8 catches, 90-130 yards, 1 TD" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "buccaneers-at-giants",
    awayAbbr: "TB",
    homeAbbr: "NYG",
    date: "Sun, Nov 24",
    time: "1:00 PM ET",
    network: "FOX",
    spread: "TB -5.5",
    overUnder: "41.5",
    insight: "Baker Mayfield keeps proving doubters wrong. The Giants keep proving theirs right.",
    takeaway: "Tampa's offense is too much for this Giants team. Buccaneers cover comfortably.",
    story: "Baker Mayfield is having a career year and the Bucs are in the NFC South race. The Giants are one of the worst teams in the league, struggling on both sides of the ball.",
    oddsExplained: [
      "Bucs -5.5 → Tampa wins by nearly a touchdown.",
      "Over/Under 41.5 → Moderate. Tampa scores, Giants try to keep up.",
      "The Giants haven't been competitive against good teams this year.",
    ],
    awayPlayers: [
      { name: "Baker Mayfield", position: "QB", team: "TB", verdict: "Playing with confidence. Career year in this offense.", detail: "Mayfield is making all the throws and has great chemistry with Evans and Godwin.", expectation: "260-290 yards, 2 TDs" },
      { name: "Mike Evans", position: "WR", team: "TB", verdict: "Reliable as ever. Should feast against a porous secondary.", detail: "Evans is a red-zone machine and the Giants can't match up with his size.", expectation: "5-7 catches, 75-100 yards, 1 TD" },
    ],
    homePlayers: [
      { name: "Tommy DeVito", position: "QB", team: "NYG", verdict: "Fan favorite but limited. Hard to see the Giants keeping pace.", detail: "DeVito plays hard but the talent gap is real.", expectation: "180-220 yards, 1 TD, 1 INT" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "panthers-at-chiefs",
    awayAbbr: "CAR",
    homeAbbr: "KC",
    date: "Sun, Nov 24",
    time: "1:00 PM ET",
    network: "CBS",
    spread: "KC -11",
    overUnder: "43.5",
    insight: "Mahomes at home against the league's worst team. This should be quick.",
    takeaway: "Chiefs handle business. Carolina doesn't belong on this field. Take KC and move on.",
    story: "The 9-1 Chiefs host the 2-8 Panthers in a massive mismatch. Kansas City is resting for the playoffs, but even on autopilot they should cruise here. Bryce Young is still trying to find his footing.",
    oddsExplained: [
      "Chiefs -11 → KC by nearly two touchdowns. Major mismatch.",
      "Over/Under 43.5 → Moderate. Chiefs score early, coast late.",
      "Carolina has been the NFL's worst team for most of this season.",
    ],
    awayPlayers: [
      { name: "Bryce Young", position: "QB", team: "CAR", verdict: "Struggling. The worst matchup for a QB who needs clean pockets.", detail: "Young has been sacked more than any QB this season. KC's defense will feast.", expectation: "170-200 yards, 0-1 TD, 1-2 INT" },
    ],
    homePlayers: [
      { name: "Patrick Mahomes", position: "QB", team: "KC", verdict: "Won't need to be great. Efficient day against an overmatched defense.", detail: "Mahomes in cruise control is still better than most QBs at full throttle.", expectation: "240-270 yards, 2 TDs" },
      { name: "Travis Kelce", position: "TE", team: "KC", verdict: "Could have a vintage game against Carolina's weak linebacker coverage.", detail: "Kelce has been quiet this year but this is the matchup to break out.", expectation: "6-8 catches, 70-90 yards, 1 TD" },
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
    network: "CBS",
    spread: "BUF -2.5",
    overUnder: "46.5",
    insight: "Two AFC heavyweights collide — this is the game that could decide home field in January.",
    takeaway: "Coin-flip game. Allen is playing better, but you never bet against Mahomes when it matters. Lean Bills at home — but keep the bet small.",
    story: "The Chiefs come to Buffalo riding a 9-1 record, but they haven't been blowing anyone away — they keep finding ways to win close games. The Bills are 9-2 and dominant at home. These two teams have met in the playoffs three of the last four years.",
    oddsExplained: [
      "Bills -2.5 → Vegas thinks Buffalo wins, but barely. A field goal is the difference.",
      "Over/Under 46.5 → Moderately high-scoring. Both offenses can produce, both defenses are elite.",
      "Moneyline: Bills -140 / Chiefs +120 → Buffalo is the slight favorite.",
    ],
    awayPlayers: [
      { name: "Patrick Mahomes", position: "QB", team: "KC", verdict: "Clean Mahomes wins anywhere. Sloppy Mahomes loses here.", detail: "Efficient but not spectacular — 16 TDs, 9 INTs. Against this defense, turnovers are the biggest risk.", expectation: "250-280 yards, 1-2 TDs" },
      { name: "Kareem Hunt", position: "RB", team: "KC", verdict: "Keeps the offense balanced. If he disappears, KC becomes one-dimensional.", detail: "Steady lead back averaging 60-70 rushing yards per game.", expectation: "15-18 carries, 55-75 yards" },
      { name: "Travis Kelce", position: "TE", team: "KC", verdict: "Quiet stat lines, but when it's the 4th quarter of a tight game — Mahomes finds Kelce.", detail: "On pace for his lowest yardage in years, but still the safety valve.", expectation: "5-7 catches, 50-70 yards" },
    ],
    homePlayers: [
      { name: "Josh Allen", position: "QB", team: "BUF", verdict: "MVP-caliber season. Best player on the field. At home, nearly unstoppable.", detail: "2,500+ yards, 19 TDs, 3 INTs. Also a weapon on the ground with 300+ rushing yards.", expectation: "270-300 yards, 2-3 TDs, 30+ rush yards" },
      { name: "James Cook", position: "RB", team: "BUF", verdict: "If Cook gets going early, Buffalo controls the tempo and keeps Mahomes off the field.", detail: "One of the more efficient backs in the league — 5+ yards per carry, catches passes.", expectation: "14-18 carries, 65-85 yards, 3-4 catches" },
      { name: "Khalil Shakir", position: "WR", team: "BUF", verdict: "Allen's most reliable target. Quietly has great games. Consistent prop option.", detail: "Emerged as the go-to receiver — crisp routes from the slot.", expectation: "5-8 catches, 60-80 yards" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "packers-at-49ers",
    awayAbbr: "GB",
    homeAbbr: "SF",
    date: "Sun, Nov 24",
    time: "4:25 PM ET",
    network: "FOX",
    spread: "SF -1.5",
    overUnder: "48.5",
    insight: "Playoff rematch with playoff implications. Both teams need this one badly.",
    takeaway: "Pick'em game. San Francisco at home is the tiebreaker, but Green Bay is dangerous. Lean 49ers, but this could go either way.",
    story: "A rematch of last year's divisional round. The 49ers are dealing with injuries but still have the talent to beat anyone. The Packers are young, fast, and improving every week under Jordan Love.",
    oddsExplained: [
      "49ers -1.5 → Basically a pick'em. Home field is the edge.",
      "Over/Under 48.5 → High total. Both offenses are explosive.",
      "This is one of the best games on the slate. Could go either way.",
    ],
    awayPlayers: [
      { name: "Jordan Love", position: "QB", team: "GB", verdict: "Growing into a star. Has the arm and the playmakers to keep up.", detail: "Love has been sharp since returning from early-season injury. Chemistry with his young receivers is clicking.", expectation: "260-290 yards, 2-3 TDs" },
      { name: "Josh Jacobs", position: "RB", team: "GB", verdict: "Physical runner who wears defenses down. Key to controlling clock.", detail: "Jacobs gives Green Bay a dimension they lacked last year.", expectation: "18-22 carries, 75-95 yards" },
    ],
    homePlayers: [
      { name: "Brock Purdy", position: "QB", team: "SF", verdict: "Elite when protected. If the line holds, he picks apart any defense.", detail: "Purdy's efficiency numbers are among the best in the league. Quick reads, accurate throws.", expectation: "260-280 yards, 2 TDs" },
      { name: "Christian McCaffrey", position: "RB", team: "SF", verdict: "If CMC plays, 49ers' offense goes to another level. Game-time decision.", detail: "The NFL's most versatile back — runs, catches, blocks. His presence changes everything.", expectation: "15-20 touches, 80-110 total yards if active" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "broncos-at-raiders",
    awayAbbr: "DEN",
    homeAbbr: "LV",
    date: "Sun, Nov 24",
    time: "4:05 PM ET",
    network: "CBS",
    spread: "DEN -5.5",
    overUnder: "41.5",
    insight: "Bo Nix is ahead of schedule. The Raiders are going nowhere fast.",
    takeaway: "Denver's defense and Nix's efficiency should be enough. Like the Broncos.",
    story: "The Broncos are in the wild card hunt behind a strong defense and Bo Nix's surprising rookie year. The Raiders are 2-8 and rudderless, cycling through quarterbacks and missing key players.",
    oddsExplained: [
      "Broncos -5.5 → Denver wins by nearly a touchdown. Road favorites in a division game.",
      "Over/Under 41.5 → Low scoring expected. Two defenses, limited offenses.",
      "Vegas is a tough place to play, but the Raiders aren't giving anyone a home-field edge this year.",
    ],
    awayPlayers: [
      { name: "Bo Nix", position: "QB", team: "DEN", verdict: "Smart rookie who doesn't make big mistakes. Perfect for this system.", detail: "Nix won't wow you with arm talent but he protects the ball and moves the chains.", expectation: "220-250 yards, 1-2 TDs" },
    ],
    homePlayers: [
      { name: "Aidan O'Connell", position: "QB", team: "LV", verdict: "Game manager on a bad team. Limited upside.", detail: "O'Connell can be functional but has no margin for error with this roster.", expectation: "200-230 yards, 1 TD, 1 INT" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },

  // ── SUNDAY AFTERNOON CONT ──
  {
    slug: "colts-at-lions",
    awayAbbr: "IND",
    homeAbbr: "DET",
    date: "Sun, Nov 24",
    time: "1:00 PM ET",
    network: "CBS",
    spread: "DET -7.5",
    overUnder: "50.5",
    insight: "Detroit is the best team in the NFC. Indianapolis is feisty but outgunned.",
    takeaway: "Lions are a machine right now. Indy will compete but Detroit's offense is too much. Like the Lions.",
    story: "The Lions are 9-1 and arguably the best team in football. Their offense is relentless — they score from everywhere. The Colts are a scrappy 5-6 team that fights but doesn't have the ceiling to keep up in a shootout.",
    oddsExplained: [
      "Lions -7.5 → Detroit by a touchdown+. They're dominant at home.",
      "Over/Under 50.5 → Highest total on the board. Expect points.",
      "Detroit's offense has scored 30+ in most home games this year.",
    ],
    awayPlayers: [
      { name: "Anthony Richardson", position: "QB", team: "IND", verdict: "Freak athlete, still raw. Boom-or-bust every week.", detail: "Richardson's physical tools are elite but his decision-making is inconsistent.", expectation: "200-240 yards, 1-2 TDs, 40+ rush yards" },
    ],
    homePlayers: [
      { name: "Jared Goff", position: "QB", team: "DET", verdict: "Surgeon. Quietly having an MVP-worthy season in this offense.", detail: "Goff's accuracy in the short-to-intermediate game is elite. He doesn't turn it over.", expectation: "280-310 yards, 3 TDs" },
      { name: "Jahmyr Gibbs", position: "RB", team: "DET", verdict: "The most electric back in football. Scores from anywhere on the field.", detail: "Gibbs is a matchup nightmare — explosive as a runner and a receiver.", expectation: "15 carries, 80+ yards, 4 catches, 1-2 TDs" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "ravens-at-chargers",
    awayAbbr: "BAL",
    homeAbbr: "LAC",
    date: "Sun, Nov 24",
    time: "4:25 PM ET",
    network: "CBS",
    spread: "BAL -3",
    overUnder: "49.5",
    insight: "Lamar vs. Herbert. Two elite QBs in a game with huge playoff implications.",
    takeaway: "Lamar is playing at an MVP level and Baltimore's offense is nearly impossible to stop. Lean Ravens, but Herbert at home is no joke.",
    story: "Two of the best QBs in football meet in a game that could decide AFC seeding. The Ravens' offense with Lamar Jackson and Derrick Henry has been devastating. The Chargers under Jim Harbaugh have been disciplined and tough.",
    oddsExplained: [
      "Ravens -3 → Baltimore by a field goal. Close game expected.",
      "Over/Under 49.5 → High scoring. Both offenses are legit.",
      "This could be a playoff preview. Neither team can afford a loss.",
    ],
    awayPlayers: [
      { name: "Lamar Jackson", position: "QB", team: "BAL", verdict: "MVP frontrunner. Unstoppable when the run game and pass game are both clicking.", detail: "Lamar is doing things no other QB can do — elite arm, elite legs, elite reads.", expectation: "260-290 yards, 2-3 TDs, 50+ rush yards" },
      { name: "Derrick Henry", position: "RB", team: "BAL", verdict: "Ageless destroyer. Paired with Lamar, this run game is unfair.", detail: "Henry is averaging 5+ yards per carry and still breaking tackles at 30.", expectation: "20-24 carries, 90-120 yards, 1 TD" },
    ],
    homePlayers: [
      { name: "Justin Herbert", position: "QB", team: "LAC", verdict: "Elite arm talent in a system that's finally maximizing it.", detail: "Herbert under Harbaugh has been more efficient and less turnover-prone.", expectation: "260-280 yards, 2 TDs" },
      { name: "J.K. Dobbins", position: "RB", team: "LAC", verdict: "Revenge game against his former team. Running hard this year.", detail: "Dobbins has been the Chargers' best offensive addition. Physical and fast.", expectation: "16-20 carries, 70-90 yards" },
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
    network: "NBC",
    spread: "PHI -3",
    overUnder: "48.5",
    insight: "Philly's run game has been unstoppable — can the Rams' thin defense slow them down?",
    takeaway: "Philly's run game should dominate. The Rams can score enough to keep it interesting, but not enough to win. Take the Eagles, and don't overthink it.",
    story: "The Eagles are one of the hottest teams in football, winners of 7 straight behind a rushing attack that's been bulldozing everyone. Saquon Barkley is having a historic season. The Rams are 5-5 with a defense gutted by injuries.",
    oddsExplained: [
      "Eagles -3 → Philly by a field goal. Tighter than you'd expect for a team on a 7-game streak.",
      "Over/Under 48.5 → High scoring. Rams can't stop the run, and their offense can score through the air.",
      "Moneyline: Eagles -155 / Rams +130 → Clear favorite, but not a blowout line.",
    ],
    awayPlayers: [
      { name: "Jalen Hurts", position: "QB", team: "PHI", verdict: "Efficient, not flashy. Low passing numbers mean the game plan is working.", detail: "10 rushing TDs this season. He's the closer who punches it in at the goal line.", expectation: "200-230 yards, 1 pass TD, 1 rush TD" },
      { name: "Saquon Barkley", position: "RB", team: "PHI", verdict: "Best player in football right now. This matchup could be his biggest game.", detail: "1,300+ rushing yards, 6+ yards per carry. Rams allow the 5th-most rushing yards in the league.", expectation: "25+ carries, 130-160 yards, 1-2 TDs" },
      { name: "A.J. Brown", position: "WR", team: "PHI", verdict: "Insurance policy. If the Rams stack the box, Brown makes them pay deep.", detail: "Reliable deep threat who keeps defenses honest. Modest but safe prop play.", expectation: "4-6 catches, 65-85 yards" },
    ],
    homePlayers: [
      { name: "Matthew Stafford", position: "QB", team: "LAR", verdict: "Why the spread is only 3. If the Rams cover, it's because Stafford carried them.", detail: "Smart, quick release. Keeping the Rams competitive despite a patchwork defense.", expectation: "260-290 yards, 2 TDs" },
      { name: "Puka Nacua", position: "WR", team: "LAR", verdict: "The Rams' entire big-play threat. Over on his receiving yards is one of the sharper plays.", detail: "Explosive since returning from knee injury. Will get volume because LA will be trailing.", expectation: "7-9 catches, 90-110 yards" },
      { name: "Kyren Williams", position: "RB", team: "LAR", verdict: "If he can't run, the Rams become one-dimensional. Tough day expected.", detail: "Inconsistent production against a Philly front seven that's much better than its reputation.", expectation: "14-18 carries, 45-65 yards" },
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
    network: "ESPN",
    spread: "BAL -2.5",
    overUnder: "51.5",
    insight: "AFC North fireworks. Lamar vs. Burrow is appointment television.",
    takeaway: "This game will be electric. Burrow at home is dangerous, but Lamar + Henry is a cheat code. Lean Ravens, but enjoy the show.",
    story: "Two of the most talented QBs in football meet on Monday Night Football. The Ravens' rushing attack with Lamar and Henry has been historic. The Bengals' passing offense with Burrow and Chase is equally lethal. Something has to give.",
    oddsExplained: [
      "Ravens -2.5 → Baltimore is the slight road favorite. They're the better team right now.",
      "Over/Under 51.5 → Highest total of the week. Fireworks expected.",
      "Both teams have the offense to score 30+. This could be the game of the week.",
    ],
    awayPlayers: [
      { name: "Lamar Jackson", position: "QB", team: "BAL", verdict: "MVP playing at peak level. The most dangerous player in football.", detail: "Lamar's combination of arm talent and rushing ability is unmatched. Cincy has struggled to contain him.", expectation: "270-300 yards, 2-3 TDs, 50+ rush yards" },
      { name: "Derrick Henry", position: "RB", team: "BAL", verdict: "Battering ram. Wears down Cincinnati's undersized front.", detail: "Henry's power running paired with Lamar's read-option is unfair.", expectation: "20-25 carries, 100-130 yards, 1 TD" },
    ],
    homePlayers: [
      { name: "Joe Burrow", position: "QB", team: "CIN", verdict: "When he's healthy and dealing, he's as good as anyone. Prime-time Burrow is real.", detail: "Burrow has been elite in the second half of the season. His chemistry with Chase is electric.", expectation: "280-310 yards, 3 TDs" },
      { name: "Ja'Marr Chase", position: "WR", team: "CIN", verdict: "Best receiver in football right now. On pace for the triple crown.", detail: "Chase is dominating — leading the league in yards, TDs, and catches. He's unguardable.", expectation: "7-10 catches, 100-130 yards, 1-2 TDs" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "seahawks-at-cardinals",
    awayAbbr: "SEA",
    homeAbbr: "ARI",
    date: "Sun, Nov 24",
    time: "4:05 PM ET",
    network: "FOX",
    spread: "SEA -1",
    overUnder: "47.5",
    insight: "NFC West division game. Both teams fighting for a wild card spot.",
    takeaway: "True toss-up. Both teams are mediocre and inconsistent. If you bet this, keep it small. Slight lean Seattle.",
    story: "A division game between two .500 teams fighting for playoff relevance. Geno Smith has been up and down, and Kyler Murray is healthy but the Cardinals' defense is inconsistent.",
    oddsExplained: [
      "Seahawks -1 → Basically a pick'em. Road team barely favored.",
      "Over/Under 47.5 → Moderate-to-high. Both teams can score but can also give up points.",
      "This is the kind of game that's hard to predict. Flip a coin.",
    ],
    awayPlayers: [
      { name: "Geno Smith", position: "QB", team: "SEA", verdict: "Capable but inconsistent. Great one week, invisible the next.", detail: "Smith can light it up when the line protects him, but he's been under pressure all year.", expectation: "240-270 yards, 2 TDs, 1 INT" },
      { name: "Kenneth Walker III", position: "RB", team: "SEA", verdict: "Explosive when healthy. Gives Seattle a physical dimension.", detail: "Walker's burst is elite. If Seattle establishes the run, they control this game.", expectation: "16-20 carries, 70-90 yards" },
    ],
    homePlayers: [
      { name: "Kyler Murray", position: "QB", team: "ARI", verdict: "Healthy and dangerous. His legs make Arizona unpredictable.", detail: "Murray's dual-threat ability stretches defenses. At home, he's been solid.", expectation: "230-260 yards, 1-2 TDs, 30+ rush yards" },
      { name: "Marvin Harrison Jr.", position: "WR", team: "ARI", verdict: "Rookie adjusting. Flashes of dominance mixed with quiet games.", detail: "Harrison has the talent to take over any game but consistency is still developing.", expectation: "4-7 catches, 60-90 yards" },
    ],
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
];

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

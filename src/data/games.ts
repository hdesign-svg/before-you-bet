export type PlayerSpotlight = {
  name: string;
  position: "QB" | "RB" | "WR" | "TE";
  team: string;
  whatsGoingOn: string;
  whatItMeans: string;
  expectation: string;
  whyItMatters: string;
};

export type Game = {
  slug: string;
  awayTeam: string;
  awayAbbr: string;
  homeTeam: string;
  homeAbbr: string;
  date: string;
  time: string;
  network?: string;
  spread: string;
  overUnder: string;
  moneyline: string;
  insight: string;
  story: string;
  oddsExplained: string[];
  awayPlayers: PlayerSpotlight[];
  homePlayers: PlayerSpotlight[];
  takeaway: string;
  lastUpdated: string;
};

export const WEEK = {
  number: 12,
  dateRange: "Nov 19–25, 2024",
  lastUpdated: "Sat, Nov 23 · 6:15 PM ET",
};

export const games: Game[] = [
  {
    slug: "chiefs-at-bills",
    awayTeam: "Kansas City Chiefs",
    awayAbbr: "KC",
    homeTeam: "Buffalo Bills",
    homeAbbr: "BUF",
    date: "Sun, Nov 24",
    time: "4:25 PM ET",
    spread: "BUF -2.5",
    overUnder: "46.5",
    moneyline: "Bills -140 / Chiefs +120",
    insight:
      "Two AFC heavyweights collide — this is the game that could decide home field in January.",
    story:
      "The Chiefs come to Buffalo riding a 9-1 record, but they haven't been blowing anyone away — they keep finding ways to win close games. The Bills are 9-2 and dominant at home, where they've been nearly unbeatable this season. These two teams have met in the playoffs three of the last four years, and this regular-season matchup feels like a preview of what's coming in January. The winner gets a major edge in the race for the #1 seed.",
    oddsExplained: [
      "Bills -2.5 → Vegas thinks Buffalo wins, but barely. A field goal is the difference. This game could go either way, and the oddsmakers know it.",
      "Over/Under 46.5 → They expect a moderately high-scoring game. Both offenses can put up points, but both defenses are elite too — don't expect a shootout.",
      "Moneyline: Bills -140 / Chiefs +120 → If you just want to pick a winner, Buffalo is the slight favorite. A $10 bet on the Chiefs pays $22 if they win.",
    ],
    awayPlayers: [
      {
        name: "Patrick Mahomes",
        position: "QB",
        team: "KC Chiefs",
        whatsGoingOn:
          "Mahomes has been efficient but not spectacular this year — 2,200+ yards, 16 TDs, 9 INTs. More picks than usual, but he still finds ways to win close games.",
        whatItMeans:
          "Against this Bills defense, turnovers are the biggest risk. He doesn't need to be flashy, but he can't give the ball away.",
        expectation:
          "250-280 passing yards, 1-2 TDs. The question is whether he throws a costly pick.",
        whyItMatters:
          "Clean Mahomes = Chiefs can win anywhere. Sloppy Mahomes = Buffalo makes him pay.",
      },
      {
        name: "Kareem Hunt",
        position: "RB",
        team: "KC Chiefs",
        whatsGoingOn:
          "Hunt has taken over as the lead back and has been steady — averaging 60-70 rushing yards per game with consistent red-zone opportunities.",
        whatItMeans:
          "The Chiefs need the run game to keep Buffalo's pass rush honest. If Hunt can grind out 3-4 yards per carry, it opens up play-action for Mahomes.",
        expectation:
          "15-18 carries, 55-75 yards, and a chance at a goal-line TD.",
        whyItMatters:
          "Hunt isn't a star, but if he disappears, it means the Chiefs are one-dimensional — and that's a losing formula against this defense.",
      },
      {
        name: "Travis Kelce",
        position: "TE",
        team: "KC Chiefs",
        whatsGoingOn:
          "Kelce has been quieter than usual — on pace for his lowest yardage in years. But he's still Mahomes' most trusted target when the game is on the line.",
        whatItMeans:
          "He may not light up the stat sheet, but in the fourth quarter of a tight game, Mahomes is looking for Kelce.",
        expectation:
          "5-7 catches, 50-70 yards. Not the primary weapon, but the safety valve.",
        whyItMatters:
          "Don't expect a blowup game. But if this comes down to the wire, Kelce is the guy who shows up. Temper prop expectations but know his ceiling is always there.",
      },
    ],
    homePlayers: [
      {
        name: "Josh Allen",
        position: "QB",
        team: "BUF Bills",
        whatsGoingOn:
          "Allen is having an MVP-caliber season — 2,500+ yards, 19 TDs, just 3 INTs. He's also a weapon on the ground with 300+ rushing yards.",
        whatItMeans:
          "He's the best player on the field in this game. At home, he's been nearly unstoppable. The Chiefs need to contain both his arm and his legs.",
        expectation:
          "270-300 passing yards, 2-3 TDs, 30+ rushing yards. He shows up biggest in big games.",
        whyItMatters:
          "Allen is the main reason the Bills are favored. Betting Buffalo means betting Allen outplays Mahomes at home. That's been a good bet this season.",
      },
      {
        name: "James Cook",
        position: "RB",
        team: "BUF Bills",
        whatsGoingOn:
          "Cook has been one of the more efficient backs in the league — averaging 5+ yards per carry and catching passes out of the backfield. He's a dual-threat the Chiefs have to account for.",
        whatItMeans:
          "Buffalo's offense is dangerous because they can run it and throw it. Cook keeps the defense honest and takes pressure off Allen.",
        expectation:
          "14-18 carries, 65-85 yards, and 3-4 catches. He could be a sneaky factor in this game.",
        whyItMatters:
          "If Cook gets going early, it means Buffalo is controlling the tempo and keeping Mahomes off the field. That's a bad sign for Kansas City.",
      },
      {
        name: "Khalil Shakir",
        position: "WR",
        team: "BUF Bills",
        whatsGoingOn:
          "Shakir has emerged as Allen's most reliable target — running crisp routes from the slot and making tough catches in traffic. He's been the steadiest pass-catcher on the team.",
        whatItMeans:
          "With Stefon Diggs gone, Shakir has filled the void as the go-to receiver. He won't burn you deep, but he'll move the chains all game.",
        expectation:
          "5-8 catches, 60-80 yards. Expect a lot of short-to-intermediate work.",
        whyItMatters:
          "Shakir is the kind of player who quietly has a great game. If you're looking at receiving props for the Bills, he's the most consistent option.",
      },
    ],
    takeaway:
      "Coin-flip game. Allen is playing better, but you never bet against Mahomes when it matters. If you have to pick, lean Bills at home — but keep the bet small.",
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "cowboys-at-commanders",
    awayTeam: "Dallas Cowboys",
    awayAbbr: "DAL",
    homeTeam: "Washington Commanders",
    homeAbbr: "WAS",
    date: "Sun, Nov 24",
    time: "1:00 PM ET",
    spread: "WAS -10.5",
    overUnder: "44.5",
    moneyline: "Commanders -550 / Cowboys +400",
    insight:
      "Dallas is in freefall and Washington is surging — this spread is massive for a rivalry game.",
    story:
      "This is a rivalry game that doesn't feel like one. The Cowboys have lost 5 straight and look like a team that's quit on the season — their defense can't stop anyone, and Dak Prescott is out with a hamstring injury. Meanwhile, the Commanders are the NFL's biggest surprise. Rookie QB Jayden Daniels has Washington at 7-4 and in the playoff hunt for the first time in years. A double-digit spread in a division game tells you everything about where these two franchises are right now.",
    oddsExplained: [
      "Commanders -10.5 → Vegas expects Washington to win by nearly two touchdowns. That's huge for a division rivalry — it means the oddsmakers see a mismatch, not a competitive game.",
      "Over/Under 44.5 → A moderate total. Washington's offense should score, but this might turn into a snooze once the Commanders pull ahead in the second half.",
      "Moneyline: Commanders -550 / Cowboys +400 → Washington is a heavy favorite. A $10 bet on Dallas pays $50, but the books clearly don't think that's happening.",
    ],
    awayPlayers: [
      {
        name: "Cooper Rush",
        position: "QB",
        team: "DAL Cowboys",
        whatsGoingOn:
          "Rush is filling in for the injured Dak Prescott. He's a career backup asked to carry an offense that was already struggling. The results have been rough.",
        whatItMeans:
          "The Cowboys' ceiling is limited. Rush can manage a game if the defense holds up, but this defense isn't holding up for anyone.",
        expectation:
          "180-210 passing yards, 1 TD, 1-2 turnovers. Conservative play with mistakes under pressure.",
        whyItMatters:
          "This is why the spread is so large. The gap between Daniels and Rush is enormous. If you're thinking about Dallas, ask yourself: do you trust Cooper Rush in a hostile environment?",
      },
      {
        name: "CeeDee Lamb",
        position: "WR",
        team: "DAL Cowboys",
        whatsGoingOn:
          "Lamb has been one of the best receivers in the NFL, but his production has dipped with Rush at QB. He's not getting the same quality of throws, and defenses are keying on him since there's no other threat.",
        whatItMeans:
          "Even great receivers need a quarterback who can get them the ball. Rush's limitations cap Lamb's upside in a way Dak's never did.",
        expectation:
          "5-7 catches, 55-75 yards. He'll be competitive but won't hit his usual ceiling.",
        whyItMatters:
          "Be careful with Lamb props this week. The talent is there but the quarterback situation holds him back. Under on receiving yards might be the smarter play.",
      },
      {
        name: "Rico Dowdle",
        position: "RB",
        team: "DAL Cowboys",
        whatsGoingOn:
          "Dowdle has become the lead back almost by default — Ezekiel Elliott is washed and Tony Pollard left in free agency. Dowdle is serviceable but not a game-changer.",
        whatItMeans:
          "Dallas will try to run the ball to keep this from getting out of hand, but Washington's front seven is physical enough to shut it down.",
        expectation: "12-16 carries, 40-60 yards. Not a lot to work with.",
        whyItMatters:
          "If the run game stalls early, Dallas is forced into Rush throwing the ball more — and that's when things get ugly.",
      },
    ],
    homePlayers: [
      {
        name: "Jayden Daniels",
        position: "QB",
        team: "WAS Commanders",
        whatsGoingOn:
          "The rookie from LSU has been the best first-year QB in the league — 2,100+ yards, 9 TDs passing, plus 450+ rushing yards. He makes plays with his legs when the pocket breaks down.",
        whatItMeans:
          "Against a Cowboys defense getting torched by everyone, Daniels should have plenty of room. This is a get-right game for Washington's offense.",
        expectation:
          "230-260 passing yards, 1-2 passing TDs, 40+ rushing yards. He won't need to be heroic — just efficient.",
        whyItMatters:
          "Daniels' dual-threat ability against this defense is the main reason to feel good about Washington covering. Dallas hasn't been able to contain mobile QBs all season.",
      },
      {
        name: "Brian Robinson Jr.",
        position: "RB",
        team: "WAS Commanders",
        whatsGoingOn:
          "Robinson has been a solid, physical runner — not flashy, but consistent. He's averaging 4+ yards per carry and getting the bulk of the early-down work.",
        whatItMeans:
          "If Washington gets an early lead (which is likely), Robinson is going to eat up clock in the second half. That's bad news for Dallas trying to come back.",
        expectation: "18-22 carries, 75-95 yards, 1 TD. A workload game.",
        whyItMatters:
          "Robinson props could have value here. When Washington is ahead, they lean on the run game, and this is a defense that can't stop it.",
      },
      {
        name: "Terry McLaurin",
        position: "WR",
        team: "WAS Commanders",
        whatsGoingOn:
          "McLaurin is having a career year alongside Daniels — on pace for 1,100+ yards and has become the go-to red-zone target. He consistently gets open on intermediate and deep routes.",
        whatItMeans:
          "The Cowboys' secondary has been one of the worst in the league at stopping big plays. McLaurin is going to get opportunities downfield.",
        expectation:
          "6-8 catches, 80-100 yards, 1 TD. This is a matchup he should dominate.",
        whyItMatters:
          "If you're looking at player props, McLaurin over his receiving yards number is one of the more confident options this week. The matchup is that good.",
      },
    ],
    takeaway:
      "Washington should roll. The only real question is whether 10.5 is too many points in a rivalry game. Bet the Commanders if you're confident, but if you're nervous about the spread, just take the moneyline.",
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
  {
    slug: "eagles-at-rams",
    awayTeam: "Philadelphia Eagles",
    awayAbbr: "PHI",
    homeTeam: "Los Angeles Rams",
    homeAbbr: "LAR",
    date: "Sun, Nov 24",
    time: "8:20 PM ET",
    network: "SNF",
    spread: "PHI -3",
    overUnder: "48.5",
    moneyline: "Eagles -155 / Rams +130",
    insight:
      "Philly's run game has been unstoppable — can the Rams' thin defense slow them down?",
    story:
      "The Eagles are one of the hottest teams in football, winners of 7 straight behind a rushing attack that's been bulldozing everyone. Saquon Barkley is having a historic season, and Jalen Hurts is playing the most efficient football of his career. The Rams are 5-5 and fighting for a playoff spot, but their defense has been gutted by injuries — missing multiple starters in the secondary and along the defensive line. This Sunday Night Football matchup has the feel of a team that can't be stopped versus a team that can't stop anyone.",
    oddsExplained: [
      "Eagles -3 → Vegas sees Philly winning by a field goal. A relatively tight spread for a team on a 7-game streak, which tells you the oddsmakers respect the Rams' offense enough to keep it close.",
      "Over/Under 48.5 → They expect a high-scoring game. The Rams' defense can't stop the run, and when the Rams have the ball, they can move it through the air.",
      "Moneyline: Eagles -155 / Rams +130 → Philly is the clear favorite, but this isn't a blowout line. A $10 bet on the Rams pays $23.",
    ],
    awayPlayers: [
      {
        name: "Jalen Hurts",
        position: "QB",
        team: "PHI Eagles",
        whatsGoingOn:
          "Hurts has been incredibly efficient during the win streak — not big numbers, but the right reads, protected ball, and punishing runs in the red zone. He has 10 rushing TDs this season.",
        whatItMeans:
          "He doesn't need to throw for 300 yards to win. The offense runs through Barkley and the ground game, and Hurts is the closer who punches it in at the goal line.",
        expectation:
          "200-230 passing yards, 1 passing TD, 1 rushing TD. Efficient, not flashy.",
        whyItMatters:
          "If you see low passing numbers from Hurts, that actually means the game plan is working. Don't mistake quiet stats for a bad performance — it means the run game is dominating.",
      },
      {
        name: "Saquon Barkley",
        position: "RB",
        team: "PHI Eagles",
        whatsGoingOn:
          "Barkley is having the best season of his career — over 1,300 rushing yards, averaging 6+ yards per carry. He's been the most dominant offensive player in the NFL.",
        whatItMeans:
          "The Rams allow the 5th-most rushing yards in the league. This is the exact matchup where Barkley could go for 150+. The Eagles will feed him early and often.",
        expectation:
          "25+ carries, 130-160 yards, 1-2 TDs. This could be his biggest game of the year.",
        whyItMatters:
          "Barkley is the engine. If he gets going early, the Rams are playing from behind — and their depleted defense doesn't have the depth to adjust. Betting Philly means betting Barkley runs wild.",
      },
      {
        name: "A.J. Brown",
        position: "WR",
        team: "PHI Eagles",
        whatsGoingOn:
          "Brown has been steady all season — a reliable deep threat who keeps defenses from stacking the box against the run. He's the Eagles' best downfield weapon.",
        whatItMeans:
          "Even in a run-first offense, Brown keeps the Rams honest. If LA loads up to stop Barkley, Brown is the guy who makes them pay over the top.",
        expectation:
          "4-6 catches, 65-85 yards. He won't get huge volume but his catches will be high-impact.",
        whyItMatters:
          "Brown is the insurance policy. If the Rams somehow slow down Barkley (unlikely), Brown gives Philly a Plan B. For props, he's a modest but safe play.",
      },
    ],
    homePlayers: [
      {
        name: "Matthew Stafford",
        position: "QB",
        team: "LA Rams",
        whatsGoingOn:
          "Stafford is still one of the smartest quarterbacks in the league — he reads defenses quickly and gets the ball out fast. He's keeping the Rams competitive despite a patchwork defense.",
        whatItMeans:
          "The Rams' best chance to keep this close is Stafford moving the ball through the air. He has the weapons to score, even if the defense can't get stops.",
        expectation:
          "260-290 passing yards, 2 TDs. He'll likely be throwing a lot in the second half if they fall behind.",
        whyItMatters:
          "Stafford is why the spread is only 3. If the Rams cover, it'll be because Stafford kept the offense churning. Over on his passing yards could be a solid play.",
      },
      {
        name: "Puka Nacua",
        position: "WR",
        team: "LA Rams",
        whatsGoingOn:
          "Nacua missed time earlier with a knee injury but has been explosive since returning. He's Stafford's top target and one of the most dynamic receivers in the league when healthy.",
        whatItMeans:
          "The Rams' best chance is through the air, and Nacua is the most dangerous weapon. If he wins his one-on-one matchups, LA's offense can score.",
        expectation:
          "7-9 catches, 90-110 yards. He's going to get volume because the Rams will likely be trailing and throwing.",
        whyItMatters:
          "Even if you're betting Eagles, Nacua is why the spread is tight. He's the Rams' entire big-play threat. Over on his receiving yards is one of the sharper plays this week.",
      },
      {
        name: "Kyren Williams",
        position: "RB",
        team: "LA Rams",
        whatsGoingOn:
          "Williams has been the Rams' lead back all season, but his production has been inconsistent. Some weeks he's explosive, others he's bottled up.",
        whatItMeans:
          "Philly's run defense is much better than their reputation. Williams is going to have a hard time finding lanes against this front seven.",
        expectation:
          "14-18 carries, 45-65 yards. A tough day on the ground.",
        whyItMatters:
          "If Williams can't run, the Rams become completely one-dimensional. That puts all the pressure on Stafford and makes the Eagles easier to bet on.",
      },
    ],
    takeaway:
      "Philly's run game should dominate. The Rams can score enough to keep it interesting, but not enough to win. Take the Eagles, and don't overthink it.",
    lastUpdated: "Saturday, Nov 23 · 6:15 PM ET",
  },
];

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

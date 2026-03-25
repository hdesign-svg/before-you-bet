// Shared fixture data for all design variants
export const FIXTURE_GAME = {
  slug: "chiefs-at-bills",
  awayAbbr: "KC",
  homeAbbr: "BUF",
  date: "Sun Jan 26",
  time: "6:30 PM ET",
  headline: "Allen\u2019s arm vs. Mahomes\u2019 magic\u2014a rematch built on broken records",
  lastUpdated: "Jan 24, 2025",
  rundown: [
    "Both QBs threw 4+ TDs in their last meeting. This is a shootout waiting to happen.",
    "Buffalo\u2019s defense has allowed the fewest rushing yards in the NFL this season.",
    "Kansas City hasn\u2019t lost back-to-back games since 2021. They\u2019re 8-1 as underdogs under Mahomes.",
    "Wind advisory for Orchard Park\u2014could limit deep passing and favor the ground game."
  ],
  awayPlayers: [
    { name: "Patrick Mahomes", position: "QB", verdict: "The GOAT debate fuel. 3 TDs in his last 4 road playoff games.", projection: "280 yds / 3 TD / 0 INT" },
    { name: "Travis Kelce", position: "TE", verdict: "Playoff Kelce is a different animal. Expect 8+ targets.", projection: "7 rec / 85 yds / 1 TD" },
    { name: "Isiah Pacheco", position: "RB", verdict: "Fresh legs after missing time. Buffalo\u2019s run D is elite though.", projection: "14 car / 52 yds / 0 TD" }
  ],
  homePlayers: [
    { name: "Josh Allen", position: "QB", verdict: "MVP finalist. 12 TDs, 0 INTs in his last 4 home playoff games.", projection: "310 yds / 3 TD / 1 INT" },
    { name: "James Cook", position: "RB", verdict: "Averaging 5.1 YPC in the playoffs. KC allows 4.8 YPC on the road.", projection: "18 car / 88 yds / 1 TD" },
    { name: "Dalton Kincaid", position: "TE", verdict: "Emerging as Allen\u2019s safety valve. 6 catches in each of his last 3.", projection: "6 rec / 65 yds / 0 TD" }
  ]
};

export const FIXTURE_TEAMS = {
  KC: { abbr: "KC", city: "Kansas City", name: "Chiefs", color: "#E31837", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/kc.png" },
  BUF: { abbr: "BUF", city: "Buffalo", name: "Bills", color: "#00338D", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/buf.png" },
  PHI: { abbr: "PHI", city: "Philadelphia", name: "Eagles", color: "#004C54", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/phi.png" },
  DAL: { abbr: "DAL", city: "Dallas", name: "Cowboys", color: "#003594", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/dal.png" },
  SF: { abbr: "SF", city: "San Francisco", name: "49ers", color: "#AA0000", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/sf.png" },
  DET: { abbr: "DET", city: "Detroit", name: "Lions", color: "#0076B6", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/det.png" }
};

export const FIXTURE_GAMES_LIST = [
  { slug: "chiefs-at-bills", away: "KC", home: "BUF", time: "6:30 PM ET", date: "Sun Jan 26", headline: "Allen\u2019s arm vs. Mahomes\u2019 magic\u2014a rematch built on broken records" },
  { slug: "eagles-at-49ers", away: "PHI", home: "SF", time: "3:00 PM ET", date: "Sun Jan 26", headline: "Hurts returns to the scene of last year\u2019s heartbreak\u2014with a vengeance" },
  { slug: "cowboys-at-lions", away: "DAL", home: "DET", time: "1:00 PM ET", date: "Sun Jan 26", headline: "Detroit\u2019s dream season meets Dallas\u2019s road warrior streak" },
  { slug: "chiefs-at-49ers", away: "KC", home: "SF", time: "4:25 PM ET", date: "Thu Jan 23", headline: "Super Bowl rematch preview\u2014both teams look sharper than February" },
  { slug: "bills-at-eagles", away: "BUF", home: "PHI", time: "8:20 PM ET", date: "Sun Jan 26", headline: "Two MVP candidates, one prime-time stage, zero margin for error" },
  { slug: "lions-at-cowboys", away: "DET", home: "DAL", time: "1:00 PM ET", date: "Mon Jan 27", headline: "Can Goff silence the doubters on the road? Dallas says no." }
];

export const FIXTURE_WEEK = {
  number: 21,
  dateRange: "Jan 23\u2013Jan 27, 2025",
  lastUpdated: "Jan 24, 2025"
};

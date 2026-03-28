export type TeamInfo = {
  abbr: string;
  name: string;
  city: string;
  logo: string;
  color: string;      // Primary brand color
  colorAlt: string;   // Secondary/contrast color
  record: string;
};

function espnLogo(id: string): string {
  return `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/${id}.png&h=120&w=120`;
}

export const teams: Record<string, TeamInfo> = {
  KC:  { abbr: "KC",  name: "Chiefs",     city: "Kansas City",   logo: espnLogo("kc"),  color: "#E31837", colorAlt: "#FFB81C", record: "9-1" },
  BUF: { abbr: "BUF", name: "Bills",      city: "Buffalo",       logo: espnLogo("buf"), color: "#00338D", colorAlt: "#C60C30", record: "9-2" },
  DAL: { abbr: "DAL", name: "Cowboys",    city: "Dallas",        logo: espnLogo("dal"), color: "#003594", colorAlt: "#869397", record: "3-7" },
  WAS: { abbr: "WAS", name: "Commanders", city: "Washington",    logo: espnLogo("wsh"), color: "#5A1414", colorAlt: "#FFB612", record: "7-4" },
  PHI: { abbr: "PHI", name: "Eagles",     city: "Philadelphia",  logo: espnLogo("phi"), color: "#004C54", colorAlt: "#A5ACAF", record: "8-2" },
  LAR: { abbr: "LAR", name: "Rams",       city: "Los Angeles",   logo: espnLogo("lar"), color: "#003594", colorAlt: "#FFA300", record: "5-5" },
  SF:  { abbr: "SF",  name: "49ers",      city: "San Francisco", logo: espnLogo("sf"),  color: "#AA0000", colorAlt: "#B3995D", record: "5-5" },
  GB:  { abbr: "GB",  name: "Packers",    city: "Green Bay",     logo: espnLogo("gb"),  color: "#203731", colorAlt: "#FFB612", record: "7-3" },
  DET: { abbr: "DET", name: "Lions",      city: "Detroit",       logo: espnLogo("det"), color: "#0076B6", colorAlt: "#B0B7BC", record: "9-1" },
  IND: { abbr: "IND", name: "Colts",      city: "Indianapolis",  logo: espnLogo("ind"), color: "#002C5F", colorAlt: "#A2AAAD", record: "5-6" },
  MIA: { abbr: "MIA", name: "Dolphins",   city: "Miami",         logo: espnLogo("mia"), color: "#008E97", colorAlt: "#FC4C02", record: "5-5" },
  LV:  { abbr: "LV",  name: "Raiders",    city: "Las Vegas",     logo: espnLogo("lv"),  color: "#000000", colorAlt: "#A5ACAF", record: "2-8" },
  BAL: { abbr: "BAL", name: "Ravens",     city: "Baltimore",     logo: espnLogo("bal"), color: "#241773", colorAlt: "#9E7C0C", record: "7-4" },
  CIN: { abbr: "CIN", name: "Bengals",    city: "Cincinnati",    logo: espnLogo("cin"), color: "#FB4F14", colorAlt: "#000000", record: "4-7" },
  PIT: { abbr: "PIT", name: "Steelers",   city: "Pittsburgh",    logo: espnLogo("pit"), color: "#FFB612", colorAlt: "#101820", record: "8-2" },
  HOU: { abbr: "HOU", name: "Texans",     city: "Houston",       logo: espnLogo("hou"), color: "#03202F", colorAlt: "#A71930", record: "7-4" },
  TEN: { abbr: "TEN", name: "Titans",     city: "Tennessee",     logo: espnLogo("ten"), color: "#0C2340", colorAlt: "#4B92DB", record: "2-8" },
  MIN: { abbr: "MIN", name: "Vikings",    city: "Minnesota",     logo: espnLogo("min"), color: "#4F2683", colorAlt: "#FFC62F", record: "8-2" },
  CHI: { abbr: "CHI", name: "Bears",      city: "Chicago",       logo: espnLogo("chi"), color: "#0B162A", colorAlt: "#C83803", record: "4-6" },
  TB:  { abbr: "TB",  name: "Buccaneers", city: "Tampa Bay",     logo: espnLogo("tb"),  color: "#D50A0A", colorAlt: "#34302B", record: "5-5" },
  NYG: { abbr: "NYG", name: "Giants",     city: "New York",      logo: espnLogo("nyg"), color: "#0B2265", colorAlt: "#A71930", record: "2-8" },
  CAR: { abbr: "CAR", name: "Panthers",   city: "Carolina",      logo: espnLogo("car"), color: "#0085CA", colorAlt: "#101820", record: "2-8" },
  SEA: { abbr: "SEA", name: "Seahawks",   city: "Seattle",       logo: espnLogo("sea"), color: "#002244", colorAlt: "#69BE28", record: "5-5" },
  ARI: { abbr: "ARI", name: "Cardinals",  city: "Arizona",       logo: espnLogo("ari"), color: "#97233F", colorAlt: "#000000", record: "6-4" },
  NO:  { abbr: "NO",  name: "Saints",     city: "New Orleans",   logo: espnLogo("no"),  color: "#D3BC8D", colorAlt: "#101820", record: "4-7" },
  CLE: { abbr: "CLE", name: "Browns",     city: "Cleveland",     logo: espnLogo("cle"), color: "#311D00", colorAlt: "#FF3C00", record: "2-8" },
  DEN: { abbr: "DEN", name: "Broncos",    city: "Denver",        logo: espnLogo("den"), color: "#FB4F14", colorAlt: "#002244", record: "6-5" },
  ATL: { abbr: "ATL", name: "Falcons",    city: "Atlanta",       logo: espnLogo("atl"), color: "#A71930", colorAlt: "#000000", record: "6-5" },
  JAX: { abbr: "JAX", name: "Jaguars",    city: "Jacksonville",  logo: espnLogo("jax"), color: "#006778", colorAlt: "#D7A22A", record: "2-9" },
  NYJ: { abbr: "NYJ", name: "Jets",       city: "New York",      logo: espnLogo("nyj"), color: "#125740", colorAlt: "#000000", record: "3-8" },
  NE:  { abbr: "NE",  name: "Patriots",   city: "New England",   logo: espnLogo("ne"),  color: "#002244", colorAlt: "#C60C30", record: "3-8" },
  LAC: { abbr: "LAC", name: "Chargers",   city: "Los Angeles",   logo: espnLogo("lac"), color: "#0080C6", colorAlt: "#FFC20E", record: "7-3" },
};

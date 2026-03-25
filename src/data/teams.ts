export type TeamInfo = {
  abbr: string;
  name: string;
  city: string;
  logo: string; // ESPN CDN team logo URL
};

function espnLogo(id: string): string {
  return `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/${id}.png&h=120&w=120`;
}

export const teams: Record<string, TeamInfo> = {
  KC: { abbr: "KC", name: "Chiefs", city: "Kansas City", logo: espnLogo("kc") },
  BUF: { abbr: "BUF", name: "Bills", city: "Buffalo", logo: espnLogo("buf") },
  DAL: { abbr: "DAL", name: "Cowboys", city: "Dallas", logo: espnLogo("dal") },
  WAS: { abbr: "WAS", name: "Commanders", city: "Washington", logo: espnLogo("wsh") },
  PHI: { abbr: "PHI", name: "Eagles", city: "Philadelphia", logo: espnLogo("phi") },
  LAR: { abbr: "LAR", name: "Rams", city: "Los Angeles", logo: espnLogo("lar") },
  SF: { abbr: "SF", name: "49ers", city: "San Francisco", logo: espnLogo("sf") },
  GB: { abbr: "GB", name: "Packers", city: "Green Bay", logo: espnLogo("gb") },
  DET: { abbr: "DET", name: "Lions", city: "Detroit", logo: espnLogo("det") },
  IND: { abbr: "IND", name: "Colts", city: "Indianapolis", logo: espnLogo("ind") },
  MIA: { abbr: "MIA", name: "Dolphins", city: "Miami", logo: espnLogo("mia") },
  LV: { abbr: "LV", name: "Raiders", city: "Las Vegas", logo: espnLogo("lv") },
  BAL: { abbr: "BAL", name: "Ravens", city: "Baltimore", logo: espnLogo("bal") },
  CIN: { abbr: "CIN", name: "Bengals", city: "Cincinnati", logo: espnLogo("cin") },
  PIT: { abbr: "PIT", name: "Steelers", city: "Pittsburgh", logo: espnLogo("pit") },
  HOU: { abbr: "HOU", name: "Texans", city: "Houston", logo: espnLogo("hou") },
  TEN: { abbr: "TEN", name: "Titans", city: "Tennessee", logo: espnLogo("ten") },
  MIN: { abbr: "MIN", name: "Vikings", city: "Minnesota", logo: espnLogo("min") },
  CHI: { abbr: "CHI", name: "Bears", city: "Chicago", logo: espnLogo("chi") },
  TB: { abbr: "TB", name: "Buccaneers", city: "Tampa Bay", logo: espnLogo("tb") },
  NYG: { abbr: "NYG", name: "Giants", city: "New York", logo: espnLogo("nyg") },
  CAR: { abbr: "CAR", name: "Panthers", city: "Carolina", logo: espnLogo("car") },
  SEA: { abbr: "SEA", name: "Seahawks", city: "Seattle", logo: espnLogo("sea") },
  ARI: { abbr: "ARI", name: "Cardinals", city: "Arizona", logo: espnLogo("ari") },
  NO: { abbr: "NO", name: "Saints", city: "New Orleans", logo: espnLogo("no") },
  CLE: { abbr: "CLE", name: "Browns", city: "Cleveland", logo: espnLogo("cle") },
  DEN: { abbr: "DEN", name: "Broncos", city: "Denver", logo: espnLogo("den") },
  ATL: { abbr: "ATL", name: "Falcons", city: "Atlanta", logo: espnLogo("atl") },
  JAX: { abbr: "JAX", name: "Jaguars", city: "Jacksonville", logo: espnLogo("jax") },
  NYJ: { abbr: "NYJ", name: "Jets", city: "New York", logo: espnLogo("nyj") },
  NE: { abbr: "NE", name: "Patriots", city: "New England", logo: espnLogo("ne") },
  LAC: { abbr: "LAC", name: "Chargers", city: "Los Angeles", logo: espnLogo("lac") },
};

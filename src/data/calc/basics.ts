import { ParsedPlayer, BasicStats } from "../types.js";

export function copyBasics(p: ParsedPlayer) {
  const basicStats: BasicStats = {
    FTM: Number(p["FTM"]),
    FTA: Number(p["FTA"]),
    TwoPM: Number(p["2PM"]),
    TwoPA: Number(p["2PA"]),
    ThreePM: Number(p["3PM"]),
    ThreePA: Number(p["3PA"]),
    REB: Number(p["REB"]),
    BLK: Number(p["BLK"]),
    AST: Number(p["AST"]),
    STL: Number(p["STL"]),
    TOV: Number(p["TOV"]),
  };
  return basicStats;
}

export function calculateBasics(gp: number, bs: BasicStats) {
  const basicStats: BasicStats = {
    FTM: bs.FTM / gp,
    FTA: bs.FTA / gp,
    TwoPM: bs.TwoPM / gp,
    TwoPA: bs.TwoPA / gp,
    ThreePM: bs.ThreePM / gp,
    ThreePA: bs.ThreePA / gp,
    REB: bs.REB / gp,
    BLK: bs.BLK / gp,
    AST: bs.AST / gp,
    STL: bs.STL / gp,
    TOV: bs.TOV / gp,
  };
  return basicStats;
}

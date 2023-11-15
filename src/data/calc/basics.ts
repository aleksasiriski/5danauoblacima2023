import { BasicStats } from "../types.js";
import { ParsedPlayer } from "../parsedTypes.js";

export function calculateBasics(p: ParsedPlayer) {
  const basicStats: BasicStats = {
    FTM: Number(p.FTM),
    FTA: Number(p.FTA),
    TwoPM: Number(p["2PM"]),
    TwoPA: Number(p["2PA"]),
    ThreePM: Number(p["3PM"]),
    ThreePA: Number(p["3PA"]),
    REB: Number(p.REB),
    BLK: Number(p.BLK),
    AST: Number(p.AST),
    STL: Number(p.STL),
    TOV: Number(p.TOV),
  };
  return basicStats;
}

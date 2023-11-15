import { Position } from "./types.js";

type ParsedPlayer = {
  PLAYER: string;
  POSITION: Position;
  FTM: number;
  FTA: number;
  "2PM": number;
  "2PA": number;
  "3PM": number;
  "3PA": number;
  REB: number;
  BLK: number;
  AST: number;
  STL: number;
  TOV: number;
};

type ParsedCSV = {
  data: [ParsedPlayer];
  error: [];
  meta: {};
};

export type { ParsedPlayer, ParsedCSV };

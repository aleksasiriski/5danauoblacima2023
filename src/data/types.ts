type Position = "PG" | "SG" | "SF" | "PF" | "C";

type BasicStats = {
  FTM: number;
  FTA: number;
  TwoPM: number;
  TwoPA: number;
  ThreePM: number;
  ThreePA: number;
  REB: number;
  BLK: number;
  AST: number;
  STL: number;
  TOV: number;
};

type DerivativeStats = {
  FTPerc: number;
  TwoPPerc: number;
  ThreePPerc: number;
  PTS: number;
  VAL: number;
  eFGPerc: number;
  TSPerc: number;
  hASTPerc: number;
};

type Player = {
  NAME: string;
  POSITION: Position;
  BASIC_STATS: BasicStats;
  DERIVATIVE_STATS: DerivativeStats;
};

export type { Position, BasicStats, DerivativeStats, Player };

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

export type { ParsedPlayer };

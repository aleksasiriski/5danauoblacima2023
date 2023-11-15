type Position = "PG" | "SG" | "SF" | "PF" | "C";

type Player = {
  PLAYER: String;
  POSITION: Position;
  FTM: Number;
  FTA: Number;
  "2PM": Number;
  "2PA": Number;
  "3PM": Number;
  "3PA": Number;
  REB: Number;
  BLK: Number;
  AST: Number;
  STL: Number;
  TOV: Number;
};

type Parsed = {
  data: [Player];
  error: [];
  meta: {};
};

export type { Position, Player, Parsed };

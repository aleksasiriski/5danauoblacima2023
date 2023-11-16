import { expect, test } from "vitest";
import { copyBasics, calculateBasics } from "./basics.js";
import { ParsedPlayer, BasicStats } from "../types.js";

test("copies basic stats from parsed player", async () => {
  const parsedPlayer: ParsedPlayer = {
    PLAYER: "Test",
    POSITION: "C",
    FTM: 4.0,
    FTA: 5.5,
    "2PM": 4.5,
    "2PA": 6.0,
    "3PM": 4.5,
    "3PA": 6.0,
    REB: 5.5,
    BLK: 1.5,
    AST: 1.0,
    STL: 0.0,
    TOV: 1.5,
  };
  const expectedBasicStats: BasicStats = {
    FTM: 4.0,
    FTA: 5.5,
    TwoPM: 4.5,
    TwoPA: 6.0,
    ThreePM: 4.5,
    ThreePA: 6.0,
    REB: 5.5,
    BLK: 1.5,
    AST: 1.0,
    STL: 0.0,
    TOV: 1.5,
  };
  expect(copyBasics(parsedPlayer)).toStrictEqual(expectedBasicStats);
});

test("calculates average basic stats from basic stats sum", async () => {
  const gamesPlayed: number = 3;
  const basicStatsSum: BasicStats = {
    FTM: 10.0,
    FTA: 5.5,
    TwoPM: 4.5,
    TwoPA: 6.0,
    ThreePM: 4.5,
    ThreePA: 6.0,
    REB: 5.5,
    BLK: 1.5,
    AST: 1.0,
    STL: 0.0,
    TOV: 1.5,
  };
  const expectedBasicStats: BasicStats = {
    FTM: 3.3333333333333335,
    FTA: 1.8333333333333333,
    TwoPM: 1.5,
    TwoPA: 2,
    ThreePM: 1.5,
    ThreePA: 2,
    REB: 1.8333333333333333,
    BLK: 0.5,
    AST: 0.3333333333333333,
    STL: 0.0,
    TOV: 0.5,
  };
  expect(calculateBasics(gamesPlayed, basicStatsSum)).toStrictEqual(
    expectedBasicStats
  );
});

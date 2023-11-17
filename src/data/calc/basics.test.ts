import { expect, test } from "vitest";
import { copyBasics, calculateBasics, sumBasics } from "./basics.js";
import { ParsedPlayer, BasicStats, Player } from "../types.js";

test("copies basic stats from parsed player", async () => {
  const players: Player[] = [
    {
      NAME: "Test",
      POSITION: "C",
      GAMES_PLAYED: 1,
      BASIC_STATS_SUM: {
        FTM: 4,
        FTA: 5.5,
        TwoPM: 4.5,
        TwoPA: 6,
        ThreePM: 4.5,
        ThreePA: 6,
        REB: 5.5,
        BLK: 1.5,
        AST: 1,
        STL: 0,
        TOV: 1.5,
      },
    },
    {
      NAME: "Test",
      POSITION: "C",
      GAMES_PLAYED: 1,
      BASIC_STATS_SUM: {
        FTM: 2,
        FTA: 3.5,
        TwoPM: 6.5,
        TwoPA: 1,
        ThreePM: 8.3,
        ThreePA: 13.1,
        REB: 7.5,
        BLK: 2.5,
        AST: 5,
        STL: 9,
        TOV: 0,
      },
    },
  ];
  const expectedPlayer: Player = {
    NAME: "Test",
    POSITION: "C",
    GAMES_PLAYED: 2,
    BASIC_STATS_SUM: {
      FTM: 6,
      FTA: 9,
      TwoPM: 11,
      TwoPA: 7,
      ThreePM: 12.8,
      ThreePA: 19.1,
      REB: 13,
      BLK: 4,
      AST: 6,
      STL: 9,
      TOV: 1.5,
    },
  };
  expect(sumBasics(players[0], players[1])).toStrictEqual(expectedPlayer);
});

test("copies basic stats from parsed player", async () => {
  const parsedPlayer: ParsedPlayer = {
    PLAYER: "Test",
    POSITION: "C",
    FTM: 4,
    FTA: 5.5,
    "2PM": 4.5,
    "2PA": 6,
    "3PM": 4.5,
    "3PA": 6,
    REB: 5.5,
    BLK: 1.5,
    AST: 1,
    STL: 0,
    TOV: 1.5,
  };
  const expectedBasicStats: BasicStats = {
    FTM: 4,
    FTA: 5.5,
    TwoPM: 4.5,
    TwoPA: 6,
    ThreePM: 4.5,
    ThreePA: 6,
    REB: 5.5,
    BLK: 1.5,
    AST: 1,
    STL: 0,
    TOV: 1.5,
  };
  expect(copyBasics(parsedPlayer)).toStrictEqual(expectedBasicStats);
});

test("calculates average basic stats from basic stats sum", async () => {
  const gamesPlayed: number = 3;
  const basicStatsSum: BasicStats = {
    FTM: 10,
    FTA: 5.5,
    TwoPM: 4.5,
    TwoPA: 6,
    ThreePM: 4.5,
    ThreePA: 6,
    REB: 5.5,
    BLK: 1.5,
    AST: 1,
    STL: 0,
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
    STL: 0,
    TOV: 0.5,
  };
  expect(calculateBasics(gamesPlayed, basicStatsSum)).toStrictEqual(
    expectedBasicStats
  );
});

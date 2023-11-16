import { expect, test } from "vitest";
import { printPlayer } from "./print.js";
import { BasicStats, DerivativeStats, Player } from "../data/types.js";

test("prints API from player and stats", () => {
  const basicStats: BasicStats = {
    FTM: 4.0,
    FTA: 5.542131,
    TwoPM: 4.5111,
    TwoPA: 5.0,
    ThreePM: 4.87899,
    ThreePA: 6.0,
    REB: 5.5,
    BLK: 1.5,
    AST: 1.0,
    STL: 0.0,
    TOV: 1.5,
  };
  const derivativeStats: DerivativeStats = {
    FTPerc: 72.72727272727273,
    TwoPPerc: 75.0,
    ThreePPerc: 75.0,
    PTS: 26.5,
    VAL: 28.5,
    eFGPerc: 93.75,
    TSPerc: 90.67579127459366,
    hASTPerc: 5.843681519357195,
  };
  const player: Player = {
    NAME: "Test",
    POSITION: "PG",
    GAMES_PLAYED: 1,
    BASIC_STATS_SUM: basicStats,
    BASIC_STATS: basicStats,
    DERIVATIVE_STATS: derivativeStats,
  };

  const expectedPrint = {
    playerName: "Test",
    gamesPlayed: 1,
    traditional: {
      freeThrows: {
        attempts: 5.5,
        made: 4,
        shootingPercentage: 72.7,
      },
      twoPoints: {
        attempts: 5,
        made: 4.5,
        shootingPercentage: 75,
      },
      threePoints: {
        attempts: 6,
        made: 4.9,
        shootingPercentage: 75,
      },
      points: 26.5,
      rebounds: 5.5,
      blocks: 1.5,
      assists: 1,
      steals: 0,
      turnovers: 1.5,
    },
    advanced: {
      valorization: 28.5,
      effectiveFieldGoalPercentage: 93.8,
      trueShootingPercentage: 90.7,
      hollingerAssistRatio: 5.8,
    },
  };
  expect(printPlayer(player, basicStats, derivativeStats)).toStrictEqual(
    expectedPrint
  );
});

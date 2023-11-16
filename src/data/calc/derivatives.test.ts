import { expect, test } from "vitest";
import { calculateDerivatives } from "./derivatives.js";
import { BasicStats, DerivativeStats } from "../types.js";

test("calculates derivative stats from basic stats", async () => {
  const basicStats: BasicStats = {
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
  const expectedDerivativeStats: DerivativeStats = {
    FTPerc: 72.72727272727273,
    TwoPPerc: 75.0,
    ThreePPerc: 75.0,
    PTS: 26.5,
    VAL: 28.5,
    eFGPerc: 93.75,
    TSPerc: 90.67579127459366,
    hASTPerc: 5.843681519357195,
  };
  expect(await calculateDerivatives(basicStats)).toStrictEqual(
    expectedDerivativeStats
  );
});

import { BasicStats, DerivativeStats } from "../types.js";

async function calculateFTPerc(basicStats: BasicStats) {
  const { FTM, FTA } = basicStats;
  return (FTM / FTA) * 100;
}

async function calculateTwoPPerc(basicStats: BasicStats) {
  const { TwoPM, TwoPA } = basicStats;
  return (TwoPM / TwoPA) * 100;
}

async function calculateThreePPerc(basicStats: BasicStats) {
  const { ThreePM, ThreePA } = basicStats;
  return (ThreePM / ThreePA) * 100;
}

async function calculatePTS(basicStats: BasicStats) {
  const { FTM, TwoPM, ThreePM } = basicStats;
  return FTM + 2 * TwoPM + 3 * ThreePM;
}

async function calculateVAL(basicStats: BasicStats) {
  const { FTM, FTA, TwoPM, TwoPA, ThreePM, ThreePA, REB, BLK, AST, STL, TOV } =
    basicStats;
  return (
    FTM +
    2 * TwoPM +
    3 * ThreePM +
    REB +
    BLK +
    AST +
    STL -
    (FTA - FTM + TwoPA - TwoPM + ThreePA - ThreePM + TOV)
  );
}

async function calculateeFGPerc(basicStats: BasicStats) {
  const { TwoPM, TwoPA, ThreePM, ThreePA } = basicStats;
  return ((TwoPM + ThreePM + 0.5 * ThreePM) / (TwoPA + ThreePA)) * 100;
}

async function calculatehASTPerc(basicStats: BasicStats) {
  const { FTA, TwoPA, ThreePA, AST, TOV } = basicStats;
  return (AST / (TwoPA + ThreePA + 0.475 * FTA + AST + TOV)) * 100;
}

async function calculateTSPerc(PTS: number, basicStats: BasicStats) {
  const { FTA, TwoPA, ThreePA } = basicStats;
  return (PTS / (2 * (TwoPA + ThreePA + 0.475 * FTA))) * 100;
}

export async function calculateDerivatives(basicStats: BasicStats) {
  const FTPerc = calculateFTPerc(basicStats);
  const TwoPPerc = calculateTwoPPerc(basicStats);
  const ThreePPerc = calculateThreePPerc(basicStats);
  const PTS = calculatePTS(basicStats);
  const VAL = calculateVAL(basicStats);
  const eFGPerc = calculateeFGPerc(basicStats);
  const hASTPerc = calculatehASTPerc(basicStats);
  const TSPerc = calculateTSPerc(await PTS, basicStats);

  const derivativeStats: DerivativeStats = {
    FTPerc: await FTPerc,
    TwoPPerc: await TwoPPerc,
    ThreePPerc: await ThreePPerc,
    PTS: await PTS,
    VAL: await VAL,
    eFGPerc: await eFGPerc,
    TSPerc: await TSPerc,
    hASTPerc: await hASTPerc,
  };

  return derivativeStats;
}

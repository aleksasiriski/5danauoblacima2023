import { BasicStats, DerivativeStats } from "../types.js";

function calculateFTPerc(basicStats: BasicStats) {
  const { FTM, FTA } = basicStats;
  return (FTM / FTA) * 100;
}

function calculateTwoPPerc(basicStats: BasicStats) {
  const { TwoPM, TwoPA } = basicStats;
  return (TwoPM / TwoPA) * 100;
}

function calculateThreePPerc(basicStats: BasicStats) {
  const { ThreePM, ThreePA } = basicStats;
  return (ThreePM / ThreePA) * 100;
}

function calculatePTS(basicStats: BasicStats) {
  const { FTM, TwoPM, ThreePM } = basicStats;
  return FTM + 2 * TwoPM + 3 * ThreePM;
}

function calculateVAL(basicStats: BasicStats) {
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

function calculateeFGPerc(basicStats: BasicStats) {
  const { TwoPM, TwoPA, ThreePM, ThreePA } = basicStats;
  return ((TwoPM + ThreePM + 0.5 * ThreePM) / (TwoPA + ThreePA)) * 100;
}

function calculateTSPerc(PTS: number, basicStats: BasicStats) {
  const { FTA, TwoPA, ThreePA } = basicStats;
  return (PTS / (2 * (TwoPA + ThreePA + 0.475 * FTA))) * 100;
}

function calculatehASTPerc(basicStats: BasicStats) {
  const { FTA, TwoPA, ThreePA, AST, TOV } = basicStats;
  return (AST / (TwoPA + ThreePA + 0.475 * FTA + AST + TOV)) * 100;
}

export function calculateDerivatives(basicStats: BasicStats) {
  const FTPerc = calculateFTPerc(basicStats);
  const TwoPPerc = calculateTwoPPerc(basicStats);
  const ThreePPerc = calculateThreePPerc(basicStats);
  const PTS = calculatePTS(basicStats);
  const VAL = calculateVAL(basicStats);
  const eFGPerc = calculateeFGPerc(basicStats);
  const TSPerc = calculateTSPerc(PTS, basicStats);
  const hASTPerc = calculatehASTPerc(basicStats);

  const derivativeStats: DerivativeStats = {
    FTPerc: FTPerc,
    TwoPPerc: TwoPPerc,
    ThreePPerc: ThreePPerc,
    PTS: PTS,
    VAL: VAL,
    eFGPerc: eFGPerc,
    TSPerc: TSPerc,
    hASTPerc: hASTPerc,
  };

  return derivativeStats;
}

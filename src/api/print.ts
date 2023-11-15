import { Redis } from "ioredis";

import { Player } from "../data/types.js";
import { updatePlayer } from "../data/cache.js";

import { calculateBasics } from "../data/calc/basics.js";
import { calculateDerivatives } from "../data/calc/derivatives.js";
import { round } from "../data/calc/round.js";

export async function printPlayer(redis: Redis, player: Player) {
  let shouldSetNewPlayer = false;

  if (player.BASIC_STATS === undefined) {
    player.BASIC_STATS = calculateBasics(
      player.GAMES_PLAYED,
      player.BASIC_STATS_SUM
    );
    shouldSetNewPlayer = true;
  }

  if (player.DERIVATIVE_STATS === undefined) {
    player.DERIVATIVE_STATS = await calculateDerivatives(player.BASIC_STATS);
    shouldSetNewPlayer = true;
  }

  if (shouldSetNewPlayer) {
    await updatePlayer(redis, player);
  }

  const { FTM, FTA, TwoPM, TwoPA, ThreePM, ThreePA, REB, BLK, AST, STL, TOV } =
    player.BASIC_STATS;

  const { FTPerc, TwoPPerc, ThreePPerc, PTS, VAL, eFGPerc, TSPerc, hASTPerc } =
    player.DERIVATIVE_STATS;

  return {
    playerName: player.NAME,
    gamesPlayed: player.GAMES_PLAYED,
    traditional: {
      freeThrows: {
        attempts: round(FTA),
        made: round(FTM),
        shootingPercentage: round(FTPerc),
      },
      twoPoints: {
        attempts: round(TwoPA),
        made: round(TwoPM),
        shootingPercentage: round(TwoPPerc),
      },
      threePoints: {
        attempts: round(ThreePA),
        made: round(ThreePM),
        shootingPercentage: round(ThreePPerc),
      },
      points: round(PTS),
      rebounds: round(REB),
      blocks: round(BLK),
      assists: round(AST),
      steals: round(STL),
      turnovers: round(TOV),
    },
    advanced: {
      valorization: round(VAL),
      effectiveFieldGoalPercentage: round(eFGPerc),
      trueShootingPercentage: round(TSPerc),
      hollingerAssistRatio: round(hASTPerc),
    },
  };
}

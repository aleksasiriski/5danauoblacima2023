import { FastifyInstance } from "fastify";

import { Player } from "../data/types.js";

async function routes(fastify: FastifyInstance, options: any) {
  fastify.get("/:playerFullName", async (request: any, reply: any) => {
    const player: string = request.params.playerFullName;
    const { redis } = fastify;

    const playerJSON = await redis.get(player, (err, val) => {
      if (err) {
        console.error(`getting player ${player} from redis failed: ${err}`);
        return { message: err };
      } else {
        return val;
      }
    });

    if (playerJSON !== null) {
      const player: Player = JSON.parse(String(playerJSON));

      const {
        FTM,
        FTA,
        TwoPM,
        TwoPA,
        ThreePM,
        ThreePA,
        REB,
        BLK,
        AST,
        STL,
        TOV,
      } = player.BASIC_STATS;
      const {
        FTPerc,
        TwoPPerc,
        ThreePPerc,
        PTS,
        VAL,
        eFGPerc,
        TSPerc,
        hASTPerc,
      } = player.DERIVATIVE_STATS;

      return {
        playerName: player.NAME,
        gamesPlayed: player.GAMES_PLAYED,
        traditional: {
          freeThrows: {
            attempts: FTA,
            made: FTM,
            shootingPercentage: FTPerc,
          },
          twoPoints: {
            attempts: TwoPA,
            made: TwoPM,
            shootingPercentage: TwoPPerc,
          },
          threePoints: {
            attempts: ThreePA,
            made: ThreePM,
            shootingPercentage: ThreePPerc,
          },
          points: PTS,
          rebounds: REB,
          blocks: BLK,
          assists: AST,
          steals: STL,
          turnovers: TOV,
        },
        advanced: {
          valorization: VAL,
          effectiveFieldGoalPercentage: eFGPerc,
          trueShootingPercentage: TSPerc,
          hollingerAssistRatio: hASTPerc,
        },
      };
    } else {
      return { message: playerJSON };
    }
  });
}

export const statsPlayerRoutes = routes;

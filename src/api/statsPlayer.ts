import { FastifyInstance } from "fastify";

import { Player } from "../data/types.js";
import { printPlayer } from "./print.js";

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
      const response = await printPlayer(redis, player);
      return response;
    } else {
      return { response: playerJSON };
    }
  });
}

export const statsPlayerRoutes = routes;

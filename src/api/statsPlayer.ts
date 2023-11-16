import { FastifyInstance } from "fastify";

import { Player } from "../data/types.js";
import { calculateAndPrintPlayer } from "./print.js";

async function routes(fastify: FastifyInstance, options: any) {
  fastify.get("/:playerFullName", async (request: any, reply: any) => {
    const playerName: string = request.params.playerFullName;
    const { redis } = fastify;

    const playerJSON = await redis.get(playerName, (err, val) => {
      if (err) {
        console.error(`getting player ${playerName} from redis failed: ${err}`);
        return { message: err };
      } else {
        return val;
      }
    });

    if (playerJSON !== null) {
      const player: Player = JSON.parse(String(playerJSON));
      const response = await calculateAndPrintPlayer(redis, player);
      return response;
    } else {
      reply.statusCode = 404;
      return { explanation: "Player not found" };
    }
  });
}

export const statsPlayerRoutes = routes;

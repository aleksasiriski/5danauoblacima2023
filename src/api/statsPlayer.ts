import { FastifyInstance } from "fastify";

import { Player } from "../data/types.js";
import { calculateAndPrintPlayer } from "./print.js";
import { getPlayer } from "../data/cache.js";

async function routes(fastify: FastifyInstance, options: any) {
  fastify.get("/:playerFullName", async (request: any, reply: any) => {
    const playerName: string = request.params.playerFullName;
    const { redis } = fastify;

    const player: Player | null = await getPlayer(redis, playerName);
    if (player) {
      const response = await calculateAndPrintPlayer(redis, player);
      return response;
    } else {
      reply.statusCode = 404;
      return { explanation: "Player not found" };
    }
  });
}

export const statsPlayerRoutes = routes;

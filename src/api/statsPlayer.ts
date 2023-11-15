// Load data into memory
import { playersArray } from "../data/load.js";

async function routes(fastify, options) {
  fastify.get("/:playerFullName", async (request, reply) => {
    const player = request.params.playerFullName;
    return { message: playersArray };
  });
}

export const statsPlayerRoutes = routes;

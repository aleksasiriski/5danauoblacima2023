async function routes(fastify, options) {
  fastify.get("/:playerFullName", async (request, reply) => {
    const player = request.params.playerFullName;
    const { redis } = fastify;
    redis.get("csv", (err: Error, val: string) => {
      if (err) {
        console.error(`getting player ${player} from redis failed: ${err}`);
        return { message: err };
      } else {
        const playersArray = JSON.parse(val);
        return { players: playersArray };
      }
    });
  });
}

export const statsPlayerRoutes = routes;

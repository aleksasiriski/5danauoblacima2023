import Fastify from "fastify";

async function routes(fastify: Fastify.FastifyInstance, options: any) {
  fastify.get("/:playerFullName", async (request: any, reply: any) => {
    const player: string = request.params.playerFullName;
    const { redis } = fastify;

    const playersJSON = await redis.get(player, (err, val) => {
      if (err) {
        console.error(`getting player ${player} from redis failed: ${err}`);
        return { message: err };
      } else {
        return val;
      }
    });

    if (playersJSON !== null) {
      return { players: JSON.parse(String(playersJSON)) };
    } else {
      return { message: playersJSON };
    }
  });
}

export const statsPlayerRoutes = routes;

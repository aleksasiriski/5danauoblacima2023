import Fastify from "fastify";

import { stringify } from "./stringify.js";
import { playersArray } from "./load.js";

export async function loadDataIntoRedis(fastify: Fastify.FastifyInstance) {
  const { redis } = fastify;
  await redis.set("csv", stringify(playersArray), (err) => {
    console.error(`load data into redis failed: ${err}`);
  });
}

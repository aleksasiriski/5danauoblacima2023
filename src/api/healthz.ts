import { FastifyInstance } from "fastify";

async function routes(fastify: FastifyInstance, options: any) {
  fastify.get("/", async (request: any, reply: any) => {
    return { status: "ready" };
  });
  fastify.get("/redis", async (request: any, reply: any) => {
    const { redis } = fastify;

    if (redis.status == "ready") {
      return { status: redis.status };
    } else {
      reply.statusCode = 503;
      return { status: redis.status };
    }
  });
}

export const healthzRoutes = routes;

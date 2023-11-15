import Fastify from "fastify";

async function routes(fastify: Fastify.FastifyInstance, options: any) {
  fastify.get("/", async (request: any, reply: any) => {
    return { status: "ready" };
  });
  fastify.get("/redis", async (request: any, reply: any) => {
    const { redis } = fastify;
    return { status: redis.status };
  });
}

export const healthzRoutes = routes;

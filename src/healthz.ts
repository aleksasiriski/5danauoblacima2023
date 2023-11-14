async function routes(fastify, options) {
  fastify.get("/", async (request, reply) => {
    return { status: "ready" };
  });
  fastify.get("/redis", async (request, reply) => {
    const { redis } = fastify;
    return { status: redis.status };
  });
}

export const healthzRoutes = routes;

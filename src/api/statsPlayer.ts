async function routes(fastify, options) {
  fastify.get("/:playerFullName", async (request, reply) => {
    return { playerFullName: request.params.playerFullName };
  });
}

export const statsPlayerRoutes = routes;

// ESM
import Fastify from "fastify";
const fastify = Fastify({
  logger: true,
});

// Redis
import fastifyRedis from "@fastify/redis";
fastify.register(fastifyRedis, {
  url: import.meta.env.VITE_REDIS_URL || "redis://localhost:6379",
});

// Healthz endpoint
import { healthzRoutes } from "./healthz.js";
fastify.register(healthzRoutes, { prefix: "/healthz" });

// API endpoint
import { statsPlayerRoutes } from "./api/statsPlayer.js";
fastify.register(statsPlayerRoutes, { prefix: "/stats/player" });

// Startup
if (import.meta.env.PROD) {
  const envPort = import.meta.env.VITE_PORT;
  fastify.listen(
    { port: envPort || 3000, host: "::" },
    function (err, address) {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }
      console.log("Listening on: " + address);
    }
  );
}

export const viteNodeApp = fastify;

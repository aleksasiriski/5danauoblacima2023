// Load data from CSV into redis
const redisUrl = import.meta.env.VITE_REDIS_URL || "redis://localhost:6379";
import { loadDataIntoRedis } from "./data/cache.js";

/* this could be run without await,
   which would load the data in the background
   and would allow the API to start accepting
   connections earlier */
await loadDataIntoRedis(redisUrl);

// ESM
import { fastify } from "fastify";
const app = fastify({
  logger: true,
});

// Shared redis connection
import { fastifyRedis } from "@fastify/redis";
app.register(fastifyRedis, {
  url: redisUrl,
});

// Healthz endpoint
import { healthzRoutes } from "./api/healthz.js";
app.register(healthzRoutes, { prefix: "/healthz" });

// API endpoint
import { statsPlayerRoutes } from "./api/statsPlayer.js";
app.register(statsPlayerRoutes, { prefix: "/stats/player" });

// Startup
if (import.meta.env.PROD) {
  const envPort = import.meta.env.VITE_PORT;
  app.listen({ port: envPort || 3000, host: "::" }, function (err, address) {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    console.log("Listening on: " + address);
  });
}

export const viteNodeApp = app;

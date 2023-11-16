// Load data from CSV into redis
const redisUrl =
  import.meta.env.VITE_REDIS_URL ||
  process.env.REDIS_URL ||
  "redis://localhost:6379";
import { loadDataIntoRedis } from "./data/cache.js";

/* this can be run without await
   which loads the data in the background
   and allows the API to start accepting
   connections earlier */
loadDataIntoRedis(redisUrl);

// ESM
import { fastify } from "fastify";
const app = fastify({
  logger: import.meta.env.PROD ? false : true,
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
  const envPort = import.meta.env.VITE_PORT || process.env.PORT || 3000;
  app.listen({ port: envPort, host: "::" }, function (err, address) {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    console.log("Listening on: " + address);
  });
}

// Handle interrupt
process.on("SIGTERM", () => {
  console.info("SIGTERM signal received.");
  console.log("Closing http server.");
  app.close(() => {
    console.log("Http server closed.");
  });
});

export const viteNodeApp = app;

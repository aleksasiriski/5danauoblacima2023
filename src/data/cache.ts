import { Redis } from "ioredis";
import { playersArray } from "./load.js";

export async function loadDataIntoRedis(redisUrl: string) {
  const redis = new Redis(redisUrl);

  for (const p of playersArray) {
    await redis.set(p.NAME, JSON.stringify(p), (err) => {
      if (err) {
        console.error(`setting player ${p.NAME} to redis failed: ${err}`);
        return { message: err };
      }
    });
  }
}

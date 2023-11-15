import { Redis } from "ioredis";

import { loadAndParseCSV } from "./load.js";
import { Player } from "./types.js";

/* this could be called directly from
   createNewPlayer to speed up loading into redis
*/
async function setNewPlayer(redis: Redis, p: Player) {
  return redis.set(p.NAME, JSON.stringify(p), (err) => {
    if (err) {
      console.error(`setting player ${p.NAME} to redis failed: ${err}`);
    }
  });
}

export async function loadDataIntoRedis(redisUrl: string) {
  const playersArray = await loadAndParseCSV();
  const redis = new Redis(redisUrl);

  const okProm: Promise<"OK">[] = [];
  for (const p of playersArray) {
    okProm.push(setNewPlayer(redis, p));
  }

  await Promise.all(okProm);
  await redis.quit();
}

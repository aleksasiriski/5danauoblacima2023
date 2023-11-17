import { Redis } from "ioredis";

import { loadAndParseCSV } from "./load.js";
import { Player } from "./types.js";
import { sumBasics } from "./calc/basics.js";

/* this could be called directly from
   createNewPlayer to speed up loading into redis
   but have to watch out for race conditions
*/
export async function setNewPlayer(redis: Redis, p: Player) {
  await redis.watch(p.NAME);
  await redis.get(p.NAME, (err, val) => {
    if (err) {
      console.error(`getting player ${p.NAME} from redis failed: ${err}`);
      return { message: err };
    } else {
      if (val !== null) {
        const oldP: Player = JSON.parse(String(val));
        p = sumBasics(p, oldP);
      }
    }
  });
  await redis
    .multi()
    .set(p.NAME, JSON.stringify(p), (err) => {
      if (err) {
        console.error(`setting player ${p.NAME} to redis failed: ${err}`);
      }
    })
    .exec();
}

export async function updatePlayer(redis: Redis, p: Player) {
  await redis.set(p.NAME, JSON.stringify(p), (err) => {
    if (err) {
      console.error(`setting player ${p.NAME} to redis failed: ${err}`);
    }
  });
}

export async function loadDataIntoRedis(redisUrl: string) {
  const playersArray = await loadAndParseCSV();
  const redis = new Redis(redisUrl);
  await redis.flushdb();

  // commented because of race conditions
  // const setProm: Promise<void>[] = [];
  for (const p of playersArray) {
    await setNewPlayer(redis, p);
    // setProm.push(setNewPlayer(redis, p));
  }

  // await Promise.all(setProm);
  await redis.quit();
}

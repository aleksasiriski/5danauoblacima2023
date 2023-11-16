import { Redis } from "ioredis";

import { loadAndParseCSV } from "./load.js";
import { Player } from "./types.js";

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

        const {
          FTM,
          FTA,
          TwoPM,
          TwoPA,
          ThreePM,
          ThreePA,
          REB,
          BLK,
          AST,
          STL,
          TOV,
        } = oldP.BASIC_STATS_SUM;

        p.GAMES_PLAYED += oldP.GAMES_PLAYED;
        p.BASIC_STATS_SUM.FTM += FTM;
        p.BASIC_STATS_SUM.FTA += FTA;
        p.BASIC_STATS_SUM.TwoPM += TwoPM;
        p.BASIC_STATS_SUM.TwoPA += TwoPA;
        p.BASIC_STATS_SUM.ThreePM += ThreePM;
        p.BASIC_STATS_SUM.ThreePA += ThreePA;
        p.BASIC_STATS_SUM.REB += REB;
        p.BASIC_STATS_SUM.BLK += BLK;
        p.BASIC_STATS_SUM.AST += AST;
        p.BASIC_STATS_SUM.STL += STL;
        p.BASIC_STATS_SUM.TOV += TOV;
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

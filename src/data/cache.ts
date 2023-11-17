import { Redis } from "ioredis";

import { loadAndParseCSV } from "./load.js";
import { Player } from "./types.js";
import { sumBasics } from "./calc/basics.js";

/* this could be called directly from
   createNewPlayer to speed up loading into redis
   but have to watch out for race conditions
*/
export async function setNewPlayer(redis: Redis, player: Player) {
  await redis.watch(player.NAME);
  await redis.get(player.NAME, (err, val) => {
    if (err) {
      console.error(`getting player ${player.NAME} from redis failed`, err);
    } else if (val) {
      const oldPlayer: Player = JSON.parse(val);
      player = sumBasics(player, oldPlayer);
    }
  });
  await redis
    .multi()
    .set(player.NAME, JSON.stringify(player), (err) => {
      if (err) {
        console.error(`setting player ${player.NAME} to redis failed`, err);
      }
    })
    .exec();
}

export async function getPlayer(redis: Redis, playerName: string) {
  const playerJSON = await redis.get(playerName, (err, val) => {
    if (err) {
      console.error(`getting player ${playerName} from redis failed`, err);
    } else {
      return val;
    }
  });

  if (playerJSON) {
    const player: Player = JSON.parse(playerJSON);
    return player;
  } else {
    return null;
  }
}

export async function updatePlayer(redis: Redis, player: Player) {
  await redis.set(player.NAME, JSON.stringify(player), (err) => {
    if (err) {
      console.error(`setting player ${player.NAME} to redis failed`, err);
    }
  });
}

export async function loadDataIntoRedis(redisUrl: string) {
  const playersArray = await loadAndParseCSV();
  const redis = new Redis(redisUrl);

  //! this should be omitted in production
  await redis.flushdb();

  /* commented because of race conditions */
  // const setProm: Promise<void>[] = [];
  for (const p of playersArray) {
    await setNewPlayer(redis, p);
    // setProm.push(setNewPlayer(redis, p));
  }

  // await Promise.all(setProm);

  // close connection after loading data
  await redis.quit();
}

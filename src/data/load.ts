import { readFileSync } from "fs";
import papa from "papaparse"; // sadly papa must use default import

import { ParsedPlayer, Player } from "./types.js";
import { copyBasics } from "./calc/basics.js";

function loadCsv(inputFile: string) {
  const file = readFileSync(inputFile, "utf8");
  const parsedCsv: papa.ParseResult<ParsedPlayer> = papa.parse(file, {
    header: true,
  });
  return parsedCsv.data;
}

async function createNewPlayer(p: ParsedPlayer) {
  const basicStats = copyBasics(p);

  const newPlayer: Player = {
    NAME: p.PLAYER,
    POSITION: p.POSITION,
    GAMES_PLAYED: 1,
    BASIC_STATS_SUM: basicStats,
  };

  return newPlayer;
}

export async function loadAndParseCSV(inputFile: string = "./data/input.csv") {
  const parsedPlayers = loadCsv(inputFile);
  const playersProm: Promise<Player>[] = [];

  for (const p of parsedPlayers) {
    playersProm.push(createNewPlayer(p));
  }

  const players = await Promise.all(playersProm);
  return players;
}

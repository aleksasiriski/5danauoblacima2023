import { readFileSync } from "fs";
import { parse, ParseResult } from "papaparse";

import { ParsedPlayer, Player } from "./types.js";

import { calculateBasics } from "./calc/basics.js";
import { calculateDerivatives } from "./calc/derivatives.js";

function loadCsv(inputFile: string) {
  const file = readFileSync(inputFile, "utf8");
  const parsedCsv: ParseResult<ParsedPlayer> = parse(file, {
    header: true,
    complete: (result) => console.dir(result.data),
  });
  return parsedCsv.data;
}

async function createNewPlayer(p: ParsedPlayer) {
  const basicStats = calculateBasics(p);
  const derivativeStats = calculateDerivatives(basicStats);

  const newPlayer: Player = {
    NAME: p.PLAYER,
    POSITION: p.POSITION,
    GAMES_PLAYED: -1, //todo: impl
    BASIC_STATS: basicStats,
    DERIVATIVE_STATS: await derivativeStats,
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

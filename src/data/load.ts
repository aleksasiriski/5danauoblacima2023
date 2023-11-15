import { readFileSync } from "fs";
import { parse, ParseResult } from "papaparse";

import { ParsedPlayer, Player } from "./types.js";

import { calculateBasics } from "./calc/basics.js";
import { calculateDerivatives } from "./calc/derivatives.js";

async function loadCsv(inputFile: string) {
  const file = readFileSync(inputFile, "utf8");
  const parsedCsv: ParseResult<ParsedPlayer> = parse(file, {
    header: true,
    complete: (result) => console.dir(result.data),
  });
  return parsedCsv.data;
}

async function loadAndParse(inputFile: string = "./data/input.csv") {
  const parsedPlayers = await loadCsv(inputFile);
  let players: Player[] = [];

  for (const p of parsedPlayers) {
    const basicStats = calculateBasics(p);
    const derivativeStats = calculateDerivatives(basicStats);

    const newPlayer: Player = {
      NAME: p.PLAYER,
      POSITION: p.POSITION,
      BASIC_STATS: basicStats,
      DERIVATIVE_STATS: derivativeStats,
    };

    players.push(newPlayer);
  }

  return players;
}

export const playersArray = await loadAndParse();

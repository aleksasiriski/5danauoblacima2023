import fs from "fs";
import Papa from "papaparse";

import { ParsedCSV } from "./parsedTypes.js";
import { Player } from "./types.js";

import { calculateBasics } from "./calc/basics.js";
import { calculateDerivatives } from "./calc/derivatives.js";

const csvPath: string = "./data/input.csv";
const papaPromise = (importFile: string) =>
  new Promise<ParsedCSV>((resolve, reject) => {
    const file = fs.createReadStream(importFile);
    Papa.parse(file, {
      header: true,
      complete: function (results) {
        resolve(results);
      },
      error: function (error) {
        reject(error);
      },
    });
  });

async function loadAndParse() {
  const parsedCsv = await papaPromise(csvPath);
  const parsedPlayers = parsedCsv.data;
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

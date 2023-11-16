import { expect, test } from "vitest";
import { loadAndParseCSV } from "./load.js";
import { Player } from "./types.js";

test("loads default CSV file", async () => {
  const expectedPlayers: Player[] = [
    {
      NAME: "Luyanda Yohance",
      POSITION: "PG",
      GAMES_PLAYED: 1,
      BASIC_STATS_SUM: {
        FTM: 6,
        FTA: 6,
        TwoPM: 0,
        TwoPA: 4,
        ThreePM: 4,
        ThreePA: 4,
        REB: 1,
        BLK: 1,
        AST: 4,
        STL: 2,
        TOV: 2,
      },
    },
    {
      NAME: "Jaysee Nkrumah",
      POSITION: "PF",
      GAMES_PLAYED: 1,
      BASIC_STATS_SUM: {
        FTM: 0,
        FTA: 4,
        TwoPM: 2,
        TwoPA: 2,
        ThreePM: 2,
        ThreePA: 4,
        REB: 2,
        BLK: 1,
        AST: 2,
        STL: 0,
        TOV: 1,
      },
    },
    {
      NAME: "Nkosinathi Cyprian",
      POSITION: "SF",
      GAMES_PLAYED: 1,
      BASIC_STATS_SUM: {
        FTM: 2,
        FTA: 6,
        TwoPM: 3,
        TwoPA: 9,
        ThreePM: 0,
        ThreePA: 4,
        REB: 4,
        BLK: 2,
        AST: 1,
        STL: 0,
        TOV: 2,
      },
    },
  ];
  expect(await loadAndParseCSV("./data/test.csv")).toStrictEqual(
    expectedPlayers
  );
});

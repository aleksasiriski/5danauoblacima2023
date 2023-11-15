import fs from "fs";
import Papa from "papaparse";
import { Parsed } from "./types.js";

const csvPath: string = "./data/input.csv";
const papaPromise = (importFile: string) =>
  new Promise<Parsed>((resolve, reject) => {
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

export const playersArray = (await papaPromise(csvPath)).data;

import fastJson from "fast-json-stringify";

export const stringify = fastJson({
  title: "Players Array Schema",
  type: "array",
  items: {
    type: "object",
    properties: {
      PLAYER: { type: "string" },
      POSITION: { type: "string" },
      FTM: { type: "number" },
      FTA: { type: "number" },
      "2PM": { type: "number" },
      "2PA": { type: "number" },
      "3PM": { type: "number" },
      "3PA": { type: "number" },
      REB: { type: "number" },
      BLK: { type: "number" },
      AST: { type: "number" },
      STL: { type: "number" },
      TOV: { type: "number" },
    },
    required: [
      "PLAYER",
      "POSITION",
      "FTM",
      "FTA",
      "2PM",
      "2PA",
      "3PM",
      "3PA",
      "REB",
      "BLK",
      "AST",
      "STL",
      "TOV",
    ],
  },
});

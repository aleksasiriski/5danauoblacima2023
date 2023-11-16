import { expect, test } from "vitest";
import { round } from "./round.js";

test("rounds 1.23456 to equal 1.2", () => {
  expect(round(1.23456)).toBe(1.2);
});

test("rounds 5.678 to equal 5.7", () => {
  expect(round(5.678)).toBe(5.7);
});

test("rounds 5.0 to equal 5", () => {
  expect(round(3.0)).toBe(3);
});

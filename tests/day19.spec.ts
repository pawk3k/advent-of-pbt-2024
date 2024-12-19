import fc from "fast-check";
import findOptimalPacking from "./advent-day-19.mjs";
import { test } from "vitest";
import { b } from "vitest/dist/chunks/suite.B2jumIFP.js";

// declare findOptimalPacking(weights: number[]): number[][];
const schema = fc.array(
  fc.integer({
    min: 1,
    max: 10,
  }),
  { minLength: 1 }
);

test("helping Santa", () => {
  fc.assert(
    fc.property(schema, (input) => {
      const trips = findOptimalPacking(input);
      const actualNumOfTrips = trips.length;
      const sum = trips.flat().reduce((a, b) => a + b);
      const expectedNumOfTrips = sum / 10 + (sum % 10 === 0 ? 1 : 0);

      if (actualNumOfTrips < expectedNumOfTrips) {
        throw new Error(
          `We have an error here ${actualNumOfTrips} ${expectedNumOfTrips}`
        );
      }
    })
  );
});

import fc from "fast-check";
import fastPostOfficeFinderEmulator from "./advent-day-04.mjs";
import { expect, test } from "vitest";

const positionSchema = fc.record({
  x: fc.nat({ max: 10_000 }),
  y: fc.nat({ max: 1_000 }),
});

const schema = fc.tuple(positionSchema, positionSchema);

test("helping Santa", () => {
  fc.assert(
    fc.property(schema, ([initial, target]) => {
      expect(fastPostOfficeFinderEmulator(initial, target)).toBeLessThanOrEqual(
        14
      );
    })
  );
});

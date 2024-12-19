import fc from "fast-check";
import planFastTravel from "./advent-day-12.mjs";
import { test } from "vitest";

// declare type Track = { from: string; to: string; distance: number };
// declare planFastTravel(departure: string, destination: string, tracks: Track[]): Track[] | undefined;
test("helping Santa", () => {
  fc.assert(
    fc.property(fc.constant("noop"), (noop) => {
      planFastTravel();
    })
  );
});

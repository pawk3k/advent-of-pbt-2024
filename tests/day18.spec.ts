import fc from "fast-check";
import findOptimalJourney from "./advent-day-18.mjs";
import { expect, test } from "vitest";

type House = { x: number; y: number };
//  declare findOptimalJourney(houses: House[]): House[];
//Journey planner
// Every year, Santa embarks on his magical journey, visiting houses around the world. Optimizing his route to minimize the total distance traveled has always been critical—every extra kilometer risks potential delays.

// This year, Santa asked the elves to develop an algorithm to plan the optimal journey for his sleigh. The goal: calculate the shortest possible route starting from Santa's house (at (0, 0)), visiting all the houses on his delivery list, and then returning to Santa's house.

// Santa’s sleigh system has been designed as follows:

// Santa enters the list of all houses he needs to visit. Each house is represented by a pair of coordinates (x, y) where x (respectively y) is an integer value between 0 and 1000.
// The sleigh calculates the shortest route starting at Santa's house, visiting each house and then returning to Santa's house.
// The distance between two locations is determined using Santa's unique measurement: Math.abs(houseA.x - houseB.x) + Math.abs(houseA.y - houseB.y).

// Hands on
// The elves claim they’ve nailed it this year—Santa should be faster than ever! But Santa is skeptical about their coding skills. He’s counting on you to rigorously test their algorithm and uncover any bugs before Christmas Eve.

// Can you find an issue in their implementation and save Christmas? 🎄✨

const houseSchema = fc.record({
  x: fc.integer({ min: 1, max: 1000 }),
  y: fc.integer({ min: 1, max: 1000 }),
});

const schema = fc.uniqueArray(houseSchema, {
  size: "+1",
  minLength: 3,
  selector(v) {
    return `${v.x}${v.y}`;
  },
});
const SANTA_START_AND_FINISH_HOUSE_NUMBER = 2;

test("helping Santa", () => {
  fc.assert(
    fc.property(schema, (input) => {
      const actualOptimalJourney = findOptimalJourney(input);

      expect(actualOptimalJourney.length).toBe(
        input.length + SANTA_START_AND_FINISH_HOUSE_NUMBER
      );

      expect(new Set(actualOptimalJourney).size).toBe(
        input.length + SANTA_START_AND_FINISH_HOUSE_NUMBER
      );
    })
  );
});

import fc from "fast-check";
import findPlaceForSanta from "./advent-day-11.mjs";
import { test } from "vitest";

// declare type MarketMap = boolean[][];
// declare type RequestedSize = { width: number; height: number };
// declare type Location= { x: number; y: number };
// declare function findPlaceForSanta(map: MarketMap, requestedArea: RequestedSize): Location | undefined;

const mapArbitrary = fc.array(fc.array(fc.boolean(), { minLength: 1 }), {
  minLength: 1,
});

const schema = mapArbitrary.chain((map) => {
  const mapWidth = map[0].length;
  const mapHeight = map.length;

  const requestedSpace = fc.record({
    width: fc.integer({ min: 1, max: mapWidth }),
    height: fc.integer({ min: 1, max: mapHeight }),
  });

  return fc.tuple(fc.constant(map), requestedSpace);
});

test("helping Santa", () => {
  fc.assert(
    fc.property(schema, ([myMap, requestedSize]) => {
      const result = findPlaceForSanta(myMap, requestedSize);

      // No space found
      if (!result) {
        return;
      }

      // Success:
      // Property 0: No negative cordinates
      if (result.x < 0 || result.y < 0) {
        throw new Error("Negative cordinates are not allowed");
      }

      // Property 1: If there is a result it must fit into the map bounds
      const mapBoundsX = myMap[0].length;
      const mapBoundsY = myMap.length;
      if (result.x >= mapBoundsX || result.y >= mapBoundsY) {
        throw new Error("We have an error here");
      }

      // If the there is enough room for it the location should exist
      const rows = myMap.map((row) =>
        row.map((item) => (item ? "." : "x")).join("")
      );

      if (!rows.some((row) => row.includes(".".repeat(requestedSize.width)))) {
        throw new Error(`No enough space on width
               ${requestedSize.width},${requestedSize.height}
               \n
               ${myMap
                 .map((row) => row.map((i) => (i ? "." : "x")).join(""))
                 .join("\n")}
               location: ${result.x} ${result.y}

          `);
      }
      // I was to lazy to write it for columns as well

      // Property 2: If there is a result area all items in it should be free
      for (let y = result.y; y < result.y + requestedSize.height; y++) {
        for (let x = result.x; x < result.x + requestedSize.width; x++) {
          if (myMap[y][x] !== true) {
            throw new Error(
              `
              ${requestedSize.width},${requestedSize.height}
                ${myMap
                  .map((row) => row.map((i) => (i ? "." : "x")).join(""))
                  .join("\n")}
              location: ${result.x} ${result.y}`
            );
          }
        }
      }
    }),
    {
      numRuns: 100000,
      verbose: true,
    }
  );
});

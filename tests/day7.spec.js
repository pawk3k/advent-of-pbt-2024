import fc from "fast-check";
import simplifyLocation from "./advent-day-07.mjs";
import { test } from "vitest";
import path from "path";

const inventoryRegex = /^\/\d+(?:\/\.|\/{1,2}|\/\.\.|\/-?\d+)*\/?$/;
const schema = fc.stringMatching(inventoryRegex);

// declare function simplifyLocation(sourceLocation: string): string;
test("helping Santa", () => {
  fc.assert(
    fc.property(schema, (inputPath) => {
      const trimmed = inputPath.trim();
      const actual = simplifyLocation(trimmed);

      let expected;
      // I guess it what it meant that corrupted inputs
      try {
        expected = path.resolve(inputPath);
      } catch (error) {
        return true;
      }

      // To not get into local /
      if (expected.length === 1) return;

      if (actual.at(-1) === "/") {
        throw Error(`${actual} Paths must not end with a slash.`);
      }

      // No two or more consecutive slashes are allowed.
      if (actual.includes("//")) {
        throw Error(
          `${actual} No two or more consecutive slashes are allowed.`
        );
      }
      if (actual.includes(".")) {
        throw Error(
          `${actual} // . and .. boxes must be resolved or removed entirely.`
        );
      }
      // . and .. boxes must be resolved or removed entirely.
      // Corrupted paths must not be modified.
    })
  );
});

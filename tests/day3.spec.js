// @ts-check
import fc from "fast-check";
import { expect, test } from "vitest";
import isWordIncludedInLetter from "./advent-day-03.mjs";

test("helping Santa", () => {
  fc.assert(
    fc.property(
      fc.string().filter((e) => e.trim().length > 0),
      fc.string().filter((e) => e.trim().length > 0),
      fc.string().filter((e) => e.trim().length > 0),
      (a, b, c) => {
        const actual = isWordIncludedInLetter(a + b + c, b);
        const expected = (a + b + c).includes(b);
        expect(expected).toBe(actual);
      }
    )
  );
});

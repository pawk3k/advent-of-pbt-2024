import fc from "fast-check";
import { expect, test } from "vitest";
import isProbablyEnchantedWordV2 from "./advent-day-10.mjs";

const schema = fc.string({ unit: "grapheme", minLength: 3 });

// declare isProbablyEnchantedWord(word: string): boolean;
test("helping Santa", () => {
  fc.assert(
    fc.property(schema, (input) => {
      const trimmedInput = input.trim();

      if (trimmedInput.length === 0) return;
      const actual = isProbablyEnchantedWordV2(trimmedInput);

      const chars = Array.from(trimmedInput);

      let symmetry = true;
      for (let i = 0; i < Math.floor(chars.length / 2); i++) {
        if (chars[i] !== chars[chars.length - 1 - i]) {
          symmetry = false;
        }
      }

      if (actual && !symmetry) {
        throw Error("We have an error");
      }

      if (symmetry && !actual) {
        throw Error("Reverse error");
      }
    }),
    {
      numRuns: 100000,
    }
  );
});

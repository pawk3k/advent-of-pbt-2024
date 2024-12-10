import fc from "fast-check";
import { test } from "vitest";
import isProbablyEnchantedWord from "./advent-day-09.mjs";

const schema = fc.string();

// declare isProbablyEnchantedWord(word: string): boolean;
test("helping Santa", () => {
  fc.assert(
    fc.property(schema, (input) => {
      const trimmedInput = input.trim();

      const actual = isProbablyEnchantedWord(trimmedInput);

      if (
        actual &&
        trimmedInput.split("").reverse().join("") !== trimmedInput
      ) {
        throw Error(`We have a problem ${trimmedInput}`);
      }
    })
  );
});

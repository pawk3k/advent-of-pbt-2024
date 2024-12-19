import fc from "fast-check";
import buildSantaURLOfChild from "./advent-day-13.mjs";
import { test } from "vitest";

// declare buildSantaURLOfChild(firstName: string, lastName: string, birthDateTimestamp: number): string;

const schema = fc.tuple(fc.string(), fc.string(), fc.date());

test("helping Santa", () => {
  fc.assert(
    fc.property(schema, ([firstName, lastName, birthDate]) => {
      const result = buildSantaURLOfChild(
        firstName.trim(),
        lastName.trim(),
        birthDate.valueOf()
      );
      console.log(result, birthDate.valueOf());
      // new URL(`kek + ${result}`);
      new URL(result);
      // Check if URL is valid
    }),
    {
      numRuns: 100000,
    }
  );
});

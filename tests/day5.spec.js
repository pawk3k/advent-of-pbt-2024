import fc from "fast-check";
import isSecurityKey from "./advent-day-05.mjs";
import { expect, test } from "vitest";

test("helping Santa with security keys", () => {
  fc.assert(
    fc.property(fc.integer({ min: 2, max: 2147483647 }), (num) => {
      if (!isSecurityKey(num)) return;

      let factorCount = 0;
      let n = num;

      for (let i = 2; i <= Math.sqrt(num); i++) {
        while (n % i === 0) {
          factorCount++;
          n /= i;
        }
      }

      if (n > 1) factorCount++;
      expect(factorCount).toBe(2);
    })
  );
});

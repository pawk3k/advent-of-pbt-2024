import fc from "fast-check";
import { expect, test } from "vitest";
import { dropLettersFromDuplicatedSenders } from "./day2";

const schema = fc.array(
  fc.record({
    id: fc.string(),
  })
);

test("helping Santa", () => {
  fc.assert(
    fc.property(schema, (letters) => {
      const deduplicated = dropLettersFromDuplicatedSenders(letters);
      const expectedLength = new Set(letters.map((letter) => letter.id)).size;
      expect(deduplicated.length).toBe(expectedLength);
    })
  );
});

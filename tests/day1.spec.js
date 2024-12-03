import fc from "fast-check";
import { expect, test } from "vitest";

const schema = fc.array(
  fc.record({
    age: fc.integer({ min: 7, max: 77 }),
    name: fc.stringMatching(/^[a-z]+$/),
  })
);
test("should generate random functions", () => {
  fc.assert(
    fc.property(schema, (letters) => {
      const sortedData = sortLetters(letters);
      for (let i = 1; i < letters.length; ++i) {
        if (
          sortedData[i - 1].age === sortedData[i].age &&
          sortedData[i - 1].name !== sortedData[i].name
        ) {
          expect(
            sortedData[i - 1].name.localeCompare(sortedData[i].name)
          ).toEqual(-1);
        } else {
          expect(sortedData[i - 1].age).toBeLessThan(sortedData[i].age);
        }
      }
    })
  );
});

function sortLetters(letters) {
  return letters;
}

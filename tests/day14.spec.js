import fc from "fast-check";
import buildCompressor from "./advent-day-14.mjs";
import { test } from "vitest";

// declare type Compressor = { compress: (text: string) => string; decompress: (compressed: string) => string };
// declare function buildCompressor();
test("helping Santa", () => {
  fc.assert(
    fc.property(fc.stringMatching(/^[a-zA-Z]+$/), (input) => {
      const { compress, decompress } = buildCompressor();
      const compressed = compress(input);
      const decompressed = decompress(compressed);

      if (decompressed.length !== input.length) {
        throw new Error(
          `Compressed ${decompressed} string is longer than original ${input}`
        );
      }

      if (input !== decompressed) {
        throw new Error(`Ooops we have an error ${input}`);
      }
    }),
    {
      numRuns: 10000,
    }
  );
});

test("compressing and decompressing empty string", () => {
  fc.assert(
    fc.property(fc.constant(""), (input) => {
      const { compress, decompress } = buildCompressor();
      const compressed = compress(input);
      const decompressed = decompress(compressed);

      if (input !== decompressed) {
        throw new Error(`Ooops we have an error ${input}`);
      }
    }),
    {
      numRuns: 10000,
    }
  );
});

test("compressing and decompressing with numbers", () => {
  fc.assert(
    fc.property(
      fc.stringOf(fc.char().filter((c) => /[a-zA-Z]/.test(c))),
      (input) => {
        const { compress, decompress } = buildCompressor();
        const compressed = compress(input);
        const decompressed = decompress(compressed);

        if (input !== decompressed) {
          throw new Error(`Ooops we have an error ${input}`);
        }
      }
    ),
    {
      numRuns: 10000,
    }
  );
});

test("compressing and decompressing with mixed characters", () => {
  fc.assert(
    fc.property(
      fc.stringOf(fc.char().filter((c) => /[a-zA-Z]/.test(c))),
      (input) => {
        const { compress, decompress } = buildCompressor();
        const compressed = compress(input);
        const decompressed = decompress(compressed);

        if (input !== decompressed) {
          throw new Error(`Ooops we have an error ${input}`);
        }
      }
    ),
    {
      numRuns: 10000,
    }
  );
});

test("finding edge cases", () => {
  fc.assert(
    fc.property(
      fc.stringOf(fc.char().filter((c) => /[a-zA-Z]/.test(c))),
      (input) => {
        const { compress, decompress } = buildCompressor();
        const compressed = compress(input);
        const decompressed = decompress(compressed);

        if (input !== decompressed) {
          throw new Error(`Ooops we have an error with input: ${input}`);
        }
      }
    ),
    {
      numRuns: 10000,
    }
  );
});

test("multiple compression rounds should be stable", () => {
  fc.assert(
    fc.property(fc.stringMatching(/^[a-zA-Z]+$/), (input) => {
      const { compress, decompress } = buildCompressor();
      const firstCompress = compress(input);
      const secondCompress = compress(decompress(firstCompress));
      return firstCompress === secondCompress;
    }),
    { numRuns: 1000 }
  );
});

test("compress and decompress stability over multiple rounds", () => {
  fc.assert(
    fc.property(
      fc.stringMatching(/^[a-zA-Z]+$/),
      fc.integer({ min: 1, max: 10 }),
      (input, rounds) => {
        const { compress, decompress } = buildCompressor();
        let compressed = compress(input);
        for (let i = 0; i < rounds; i++) {
          compressed = compress(decompress(compressed));
        }
        const decompressed = decompress(compressed);
        if (input !== decompressed) {
          throw new Error(
            `Ooops we have an error after ${rounds} rounds with input: ${input}`
          );
        }
      }
    ),
    { numRuns: 10000 }
  );
});

test("compressing and decompressing repeated characters", () => {
  fc.assert(
    fc.property(
      fc.array(
        fc.tuple(
          fc.char().filter((c) => /[a-zA-Z]/.test(c)),
          fc.integer({
            min: 1,
            max: 100,
          })
        ),
        { minLength: 1, maxLength: 10 }
      ),
      (patterns) => {
        const input = patterns
          .map(([char, count]) => char.repeat(count))
          .join("");

        const { compress, decompress } = buildCompressor();
        const compressed = compress(input);
        const decompressed = decompress(compressed);

        if (input !== decompressed) {
          throw new Error(
            `Failed with input: ${input}\nCompressed: ${compressed}\nDecompressed: ${decompressed}`
          );
        }
      }
    ),
    {
      numRuns: 1000,
    }
  );
});

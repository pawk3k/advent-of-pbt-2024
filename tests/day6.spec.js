import fc from "fast-check";
import nextBarcode from "./advent-day-06.mjs";
import { expect, test } from "vitest";

// declare type Unit = '✉️'|'🧺'|'🎄'|'🔔'|'🕯️'|'⭐'|'🦌'|'⛄'|'🛷'|'❄️'|'🎿'|'✨'|'🤩'|'🥳'|'🎈'|'🪀'|'🎮'|'🎲'|'♟️'|'💝'|'🎀'|'🧦'|'🎅'|'🤶'|'🎁';

const units = [
  "✉️",
  "🧺",
  "🎄",
  "🔔",
  "🕯️",
  "⭐",
  "🦌",
  "⛄",
  "🛷",
  "❄️",
  "🎿",
  "✨",
  "🤩",
  "🥳",
  "🎈",
  "🪀",
  "🎮",
  "🎲",
  "♟️",
  "💝",
  "🎀",
  "🧦",
  "🎅",
  "🤶",
  "🎁",
];

const schema = fc.array(fc.integer({ max: units.length, min: 1 }), {
  minLength: 2,
});

test("helping Santa", () => {
  fc.assert(
    fc.property(schema, (emojiIndices) => {
      const emojiArray = emojiIndices.map((index) => units[index]);
      const initialLastEmoji = emojiIndices.at(-1);
      const actual = nextBarcode(emojiArray);

      const lastEmoji = actual.at(-1);
      const lastEmojiIndex = units.indexOf(lastEmoji);
      if (lastEmojiIndex === initialLastEmoji % units.length) {
        throw Error(`here is error initial: ${emojiArray} actual: ${actual}`);
      }
    })
  );
});

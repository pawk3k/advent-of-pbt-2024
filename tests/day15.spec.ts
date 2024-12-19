import fc, { commands } from "fast-check";
import createShelf from "./advent-day-15.mjs";
import { assert, test } from "vitest";

declare type Shelf = {
  put: () => number;
  pop: () => number;
  isEmpty: () => boolean;
};

type Model = { length: number };

class PutCommand implements fc.Command<Model, Shelf> {
  check(m: Readonly<Model>): boolean {
    return true;
  }
  run(m: Model, r: Shelf): void {
    r.put(); // impact the system
    ++m.length; // impact the model
  }
  toString(): string {
    return `put`;
  }
}

class PopCommand implements fc.Command<Model, Shelf> {
  check(m: Readonly<Model>): boolean {
    return m.length > 0;
  }
  run(m: Model, r: Shelf): void {
    r.pop();
    --m.length;
  }
  toString = () => "pop";
}
class IsEmptyCommand implements fc.Command<Model, Shelf> {
  check = (m: Readonly<Model>) => true;
  run(m: Model, r: Shelf): void {
    const actual = r.isEmpty();
    const expected = m.length === 0;
    assert.equal(actual, expected);
  }
  toString = () => "isEmpty";
}

test("Model based", () => {
  const allCommands = [
    fc.constant(new PutCommand()),
    fc.constant(new PopCommand()),
    fc.constant(new IsEmptyCommand()),
  ];

  // run everything
  fc.assert(
    fc.property(fc.commands(allCommands, { size: "+1" }), (cmds) => {
      const setup = () => ({ model: { length: 0 }, real: createShelf() });

      fc.modelRun(setup, cmds);
    })
  );
});

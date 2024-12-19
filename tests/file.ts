type Parse<T> = T extends `let ${infer VariableName} = "${infer Value}"`
  ? [VariableName, Value]
  : never;

type Whitespace = " " | "\n" | "\t" | "\r";

// Helper to normalize multiple whitespaces into single space
type NormalizeWhitespace<S extends string> =
  S extends `${infer First}${Whitespace}${Whitespace}${infer Rest}`
    ? NormalizeWhitespace<`${First} ${Rest}`>
    : S extends `${infer First}${Whitespace}${infer Rest}`
    ? `${First} ${Rest}`
    : S;

// Helper type for accumulating results
type SplitAcc<
  S extends string,
  Acc extends string[] = []
> = NormalizeWhitespace<S> extends `${infer First} ${infer Rest}`
  ? First extends ""
    ? SplitAcc<Rest, Acc>
    : SplitAcc<Rest, [First, ...Acc]>
  : S extends ""
  ? Acc
  : [S, ...Acc];

// Main split function that initializes accumulator
type SplitByWhitespace<S extends string> = Reverse<SplitAcc<S>>;

// Helper to reverse array type
type Reverse<T extends any[]> = T extends [...infer Rest, infer Last]
  ? [Last, ...Reverse<Rest>]
  : [];

// Test cases
type Test1 = SplitByWhitespace<"hello   world">; // ["hello", "world"]
type Test2 = SplitByWhitespace<"hello\n\n\tworld">; // ["hello", "world"]
type Test3 = SplitByWhitespace<"a   b     c">; // ["a", "b", "c"]

// Example usage:
type Result = SplitByWhitespace<'let x \t = "hello"'>; // ['let', 'x', '=', '"hello"']

// For your specific case:
type ParseLetStatement<S extends string> =
  S extends `let ${infer Name} = "${infer Value}"`
    ? { variableName: Name; value: Value }
    : never;

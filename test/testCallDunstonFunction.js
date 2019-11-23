const assert = require("assert");
const lib = require("../src/lib.js");
const callDunstonFunction = lib.callDunstonFunction;

describe("callDunstonFunction", () => {
  it("should move a val to a", () => {
    const actual = callDunstonFunction([["20", "mov", "a,5"]]);
    const expected = "a,b,c,d\n5,0,0,0\nEQ,NE,GT,LT\n0,0,0,0\nprn\n0";
    assert.deepStrictEqual(actual, expected);
  });
  it("should move a val to b", () => {
    const actual = callDunstonFunction([["20", "mov", "b,5"]]);
    const expected = "a,b,c,d\n0,5,0,0\nEQ,NE,GT,LT\n0,0,0,0\nprn\n0";
    assert.deepStrictEqual(actual, expected);
  });
  it("should move a val to c", () => {
    const actual = callDunstonFunction([["20", "mov", "c,5"]]);
    const expected = "a,b,c,d\n0,0,5,0\nEQ,NE,GT,LT\n0,0,0,0\nprn\n0";
    assert.deepStrictEqual(actual, expected);
  });
  it("should move a val to d", () => {
    const actual = callDunstonFunction([["20", "mov", "d,5"]]);
    const expected = "a,b,c,d\n0,0,0,5\nEQ,NE,GT,LT\n0,0,0,0\nprn\n0";
    assert.deepStrictEqual(actual, expected);
  });
});

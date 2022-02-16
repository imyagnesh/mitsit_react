import * as React from "react";

const sum = (a: number, b: number): number => a + b;

test("should sum two numbers", () => {
  expect(sum(1, 2)).toBe(3);
});

it("add two numbers", () => {
  expect(sum(4, 2)).toBe(6);
});

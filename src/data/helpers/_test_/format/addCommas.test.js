import { addCommas } from "../../format";

test("it adds commas to a positive int", () => {
  expect(addCommas(1000)).toBe("1,000");
});

test("it adds commas to a negative int", () => {
  expect(addCommas(-10000)).toBe("-10,000");
});

test("it adds commas to a positive float", () => {
  expect(addCommas(70000.728778)).toBe("70,000.728778");
});

test("it adds commas to a negative float", () => {
  expect(addCommas(-789987.728778)).toBe("-789,987.728778");
});
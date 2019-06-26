import { normalize } from "../../mixins";

test('return a normalized value', () => {
  expect(normalize(10, 10)).toBe(1);
});

test('return a normalized negative value', () => {
  expect(normalize(-3, -10)).toBe(0.3);
});
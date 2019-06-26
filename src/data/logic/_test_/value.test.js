import { valueScore } from "../value";

test('value score returns correct value', () => {
  expect(valueScore(1, 10, 5)).toBe(0.5)
});
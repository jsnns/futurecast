import { normalizeOn } from "../../mixins";

test('it normalizes collection values', () => {
  const collection = [
    { value: 10 },
    { value: 5 },
    { value: 8 }
  ];

  expect(normalizeOn(collection, 'value')).toEqual([
    { value: 1 },
    { value: .5 },
    { value: .8 }
  ])
});
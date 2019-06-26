import { sortKeys } from "../../createCsv";
import _ from "lodash";

test('it sorts special keys first', () => {
  const keys = _.shuffle(["id", "display", "category", "subcategory", 'lulz']);
  expect(sortKeys(keys)).toEqual(["id", "display", "category", "subcategory", 'lulz'])
});

test('it can handle numeric keys', () => {
  const keys = [10, "id", 12];
  expect(sortKeys(keys)).toEqual(["id", 10, 12])
});

test('it can handle boolean keys', () => {
  const keys = [false, "id", true];
  expect(sortKeys(keys)).toEqual(["id", false, true])
});
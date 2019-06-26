import { getCsvKeys } from "../../createCsv";

test("returns a list of keys", () => {
  const keys = getCsvKeys([
    {
      test1: true,
      test2: true
    },
    {
      test3: true,
      test4: true
    }
  ]);

  expect(keys).toEqual(["test1", "test2", "test3", "test4"]);
});

test("it removes duplicates", () => {
  const keys = getCsvKeys([
    {
      test1: true,
      test2: true
    },
    {
      test1: true,
      test2: true
    }
  ])

  expect(keys).toEqual(['test1', 'test2'])
});

test('it throws when passed an object', () => {
  expect(() => getCsvKeys({'test1': true})).toThrow()
});

test('it throws when not passed a string', () => {
  expect(() => getCsvKeys('testdata')).toThrow()
});

test('it filters out strings', () => {
  const keys = getCsvKeys(['test1', 'test2']);
  expect(keys).toEqual([])
});

test('it throws when not passed a int', () => {
  expect(() => getCsvKeys(100)).toThrow()
});

test('returns empty array when no keys exist', () => {
  const keys = getCsvKeys([100, 1001, 'test1']);
  expect(keys).toEqual([])
});
import { getBalances } from "../getBalances";
import "@babel/polyfill";

let today = new Date();
let getDate = days => {
  return (new Date(today).setDate(today.getDate() + days));
};

let getString = days => {
  return new Date(getDate(days)).toDateString();
};

const transactions = [{
  start: today,
  name: "savings",
  category: "savings",
  interval_days: 2,
  interval_months: 0,
  value: -10
}, {
  start: getDate(2),
  name: "income",
  category: "income",
  interval_days: 1,
  interval_months: 0,
  value: 10
}, {
  start: getDate(2),
  name: "once",
  category: "once",
  interval_months: 0,
  interval_days: 0,
  value: 100
}, {
  start: getDate(4),
  name: "once",
  category: "once",
  interval_months: 0,
  interval_days: 0,
  value: -100
}];

const expectedValue = [
  { balance: 0, date: getString(0), minimum: 0 },
  { balance: 0, date: getString(1), minimum: 0 },
  { balance: 110, date: getString(2), minimum: 30 },
  { balance: 120, date: getString(3), minimum: 30 },
  { balance: 30, date: getString(4), minimum: 30 }
];

test("it returns all balances", () => {
  const bals = getBalances(transactions, 0, 5);
  expect(bals).toEqual(expectedValue)
});

test("handles a number-like string for days", () => {
  const bals = getBalances(transactions, 0, "5");

  expect(bals).toEqual(expectedValue)
});

test("throws error with a word-like string for days", () => {
  expect(() => getBalances(transactions, 0, "words")).toThrow()
});
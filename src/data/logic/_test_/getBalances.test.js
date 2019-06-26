import { getBalances } from "../getBalances";

let today = new Date();
let getDate = days => {
  return (new Date(today).setDate(today.getDate() + days));
};

let getString = days => {
  return new Date(getDate(days)).toDateString();
};

const transactions = [{
  start: today,
  name: "Test Tx",
  interval_days: 1,
  interval_months: 0,
  value: 10
}, {
  start: getDate(2),
  name: "Test Tx2",
  interval_days: 2,
  interval_months: 0,
  value: -5
}];

test("it returns all balances", () => {
  const bals = getBalances(transactions, 0, 5);

  const expectedValue = [
    { balance: 0, date: getString(0), minimum: 0 },
    { balance: 10, date: getString(1), minimum: 10 },
    { balance: 15, date: getString(2), minimum: 15 },
    { balance: 25, date: getString(3), minimum: 25 },
    { balance: 30, date: getString(4), minimum: 30 }
  ];

  expect(bals).toEqual(expectedValue)
});
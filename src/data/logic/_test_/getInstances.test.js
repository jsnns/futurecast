import { getInstances } from "../getInstances";

let today = new Date();
let getDate = days => {
  return (new Date(today).setDate(today.getDate() + days));
};

test("returns instances", () => {
  let today = getDate(0);
  const transaction = {
    start: today,
    name: "Test Tx",
    interval_days: 2,
    interval_months: 0,
    value: 10
  };

  const expectedValue = [
    {
      date: new Date(getDate(2)),
      start: Number(getDate(0)),
      name: "Test Tx",
      interval_days: 2,
      interval_months: 0,
      value: 10,
      key: `Test Tx+${new Date(getDate(2))}`
    },
    {
      date: new Date(getDate(4)),
      start: Number(getDate(0)),
      name: "Test Tx",
      interval_days: 2,
      interval_months: 0,
      value: 10,
      key: `Test Tx+${new Date(getDate(4))}`
    }
  ];


  const instances = getInstances(4, transaction).sort();
  expect(instances)
    .toEqual(expectedValue.sort());

});
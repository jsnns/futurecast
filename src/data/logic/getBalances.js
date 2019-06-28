import { mapGetInstances } from "./";

export function getBalances(transactions, startingBalance, days) {
  if (typeof(days) === "string") {
    days = Number(days);
    if (isNaN(days)) {
      throw Error("Days must be a number.")
    }
  }


  let currentDate = new Date();
  let endDate = new Date();
  days += 30;
  endDate = endDate.setDate(endDate.getDate() + days);
  let balance = startingBalance;
  let instances = transactions.flatMap(mapGetInstances(days));

  let balances = [];

  const addDay = () => currentDate.setDate(currentDate.getDate() + 1);

  while (currentDate < endDate) {
    for (let i in instances) {
      let instance = instances[i];
      if (instance.date.toDateString() === currentDate.toDateString()) {
        balance += instance.value;
      }
    }
    balances.push({
      balance: balance,
      date: currentDate.toDateString()
    });
    addDay();
  }

  let dayBalances = balances.map(a => a.balance);
  for (let i in balances) {
    let justFuture = dayBalances.slice(Number(i));
    justFuture = justFuture.sort((a, b) => {
      if (a > b) return 1;
      if (b > a) return -1;
      return 0;
    });
    balances[i].minimum = justFuture[0];
  }

  return balances.slice(0, days - 30);
}

import { mapGetInstances } from "./";

export function getBalances(transactions, startingBalance, days) {
  // parameter validation
  if (typeof(days) === "string") {
    days = Number(days);
    if (isNaN(days)) {
      throw Error("Days must be a number.")
    }
  }

  // initial state configuration
  let balance = startingBalance;

  let currentDate = new Date();
  let endDate = new Date();
  days += 30;
  endDate = endDate.setDate(endDate.getDate() + days);

  let instances = transactions.flatMap(mapGetInstances(days));

  let balances = [];

  const addDay = () => currentDate.setDate(currentDate.getDate() + 1);

  do {
    for (let i in instances) {
      let instance = instances[i];
      if (instance.date.toDateString() === currentDate.toDateString()) {
        // dont change balance for savings txs
        if (instance.category !== "savings") {
          balance += instance.value;
        }
      }
    }

    // add a new date to list of balances
    balances.push({
      balance: balance,
      date: currentDate.toDateString()
    });

    addDay();
  }

  while (currentDate < endDate);

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

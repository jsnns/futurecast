export default function getInstances(days = 30, transaction) {
  const instances = [];

  const today = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + days);

  let date = new Date(transaction.start);

  if (
    transaction.start &&
    !transaction.end &&
    transaction.interval_days === 0 &&
    transaction.interval_months === 0
  ) {
    return [{ ...transaction, date: new Date(transaction.start) }];
  }

  // generate list of instances
  while (true) {
    // break if past requested days
    if (date > endDate) break;

    // break if no interval since it would go forever
    if (!transaction.interval_days && !transaction.interval_months) break;

    // break if the transaction should end
    if (date > new Date(transaction.end) && transaction.end) break;

    // only include instances from after today
    if (date >= today) {
      instances.push({ ...transaction, date: new Date(date), key: `${transaction.name}+${new Date(date)}` });
    }

    date.setDate(date.getDate() + transaction.interval_days);
    date.setMonth(date.getMonth() + transaction.interval_months);
  }

  return instances;
}

// used in .flatMap and .map on an array of transactions
export function mapGetInstances(days) {
  return transaction => getInstances(days, transaction);
}

export function getInstancesArray(transactions, days) {
  return transactions.flatMap(mapGetInstances(days));
}

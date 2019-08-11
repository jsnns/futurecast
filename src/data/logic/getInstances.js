export function getInstances(days = 30, transaction, backwards = 0) {
  const instances = [];

  const today = new Date();
  if (backwards > 0) {
    today.setDate(today.getDate() - backwards);
  }
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
    // noinspection JSUnresolvedVariable
    if (!transaction.interval_days && !transaction.interval_months) break;

    // break if the transactions should end
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
export function mapGetInstances(days, backwards) {
  return transaction => getInstances(days, transaction, backwards);
}

export function getInstancesArray(transactions, days, backwards) {
  return transactions.flatMap(mapGetInstances(days, backwards));
}

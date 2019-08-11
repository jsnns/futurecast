import _ from "lodash";

export function getBudget(transactions) {
  let budget = {};

  transactions.forEach(transaction => {
    let category = transaction.category;
    if (category === "once") return;

    if (!budget[category]) budget[category] = 0;

    let occurrence_scaler =
      transaction.interval_months * 28 + transaction.interval_days;

    occurrence_scaler = 28 / occurrence_scaler;

    budget[transaction.category] += Math.floor(
      transaction.value * occurrence_scaler
    );
  });

  return Object.keys(budget).map(category => (
    {
      category,
      value: budget[category]
    }
  ));
}

export function getBudgetStats(transactions) {
  const budget = getBudget(transactions);

  return {
    expenses: _(budget).filter(cat => cat.category !== 'savings').map('value').filter(a => a < 0).sum(),
    income: _(budget).map('value').filter(a => a > 0).sum(),
    savings: Math.abs(_(budget).filter(cat => cat.category === 'savings').map('value').sum())
  };
}
export function getBudget(transactions) {
	let budget = {};

	transactions.forEach(transaction => {
		let category = transaction.category;

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

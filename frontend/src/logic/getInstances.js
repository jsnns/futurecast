export default function getInstances(days, transaction) {
	if (!days) days = 30;

	const instances = [];
	const endDate = new Date();
	const today = new Date();
	let date = new Date(transaction.start);

	endDate.setDate(endDate.getDate() + days);

	if (
		transaction.start &&
		!transaction.end &&
		transaction.interval_days === 0 &&
		transaction.interval_months === 0
	)
		return [{ ...transaction, date: new Date(transaction.start) }];

	while (true) {
		if (date > endDate) break;
		if (!transaction.interval_days && !transaction.interval_months) break;
		if (date > new Date(transaction.end) && transaction.end) break;

		if (date > today) {
			// make sure we don't include instances from before today
			instances.push({ ...transaction, date: new Date(date) });
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

export function toCurrency(x) {
	const isNegative = x < 0;
	const sign = isNegative ? "$-" : " $";
	x = Math.abs(x);
	return sign + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

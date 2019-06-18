export const addCommas = int =>
	(int > 0 ? "" : "-") + Math.abs(int)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const addSign = int => `$${int}`;

export const toCurrency = int => addSign(addCommas(int));

export const addSign = int => {
	int = Number(int);
	if (int >= 0) return `$${Math.abs(int)}`;
	else return `$-${Math.abs(int)}`;
};

export const addCommas = int =>
	Math.abs(int)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const toCurrency = int => addSign(addCommas(int));

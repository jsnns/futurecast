// comparison functions for Array.prototype.sort
// docs on Mozilla's website
export const cmp = {
	ascending: (a, b) => {
		if (a > b) return 1;
		else if (b > a) return -1;
		return 0;
	},

	descending: (a, b) => {
		if (a > b) return -1;
		else if (b > a) return 1;
		return 0;
	}
};

export const math = {

};


export const sortAscendingByKey = (array, key) =>
	array.sort((a, b) => cmp.ascending(a[key], b[key]));

export const sortDecendingByKey = (array, key) =>
	array.sort((a, b) => cmp.descending(a[key], b[key]));

export const sortAscending = array => array.sort(cmp.ascending);

export const sortDecending = array => array.sort(cmp.descending);

export const getMinimum = array => sortAscending(array)[0];

export const getMaximum = array => sortDecending(array)[0];

export const getKey = (array, key) => array.map(a => a[key]);

export const sumArray = array => array.reduce(add, 0);

export const getMean = array => sumArray(array) / array.length;

export const add = (a, b) => a + b;

export const noramlize = (value, maximum) => value/maximum;

export const normalizeArray = (array, key) => {
	const max = getMaximum(getKey(array, key));
	return array.map(el => {
		el[key] = noramlize(el[key], max);
		return el;
	});
};

export const standardDeviations = (array) => {
	let mean = getMean(array);
	let numerator = 0;

	for (let i in array) {
		numerator += (array[i] - mean)^2;
	}

	return Math.sqrt(numerator/array.length);
};
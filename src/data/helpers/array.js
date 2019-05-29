export const compareAscending = (a, b) => {
	if (a > b) return 1;
	else if (b > a) return -1;
	return 0;
};

export const sortAscendingByKey = (array, key) =>
	array.sort((a, b) => compareAscending(a[key], b[key]));

export const sortAscending = array => array.sort(compareAscending);

export const getMinimum = array => sortAscending(array)[0];

export const getKey = (array, key) => array.map(a => a[key]);

export const sumArray = array => array.reduce(add, 0);

export const add = (a, b) => a + b;

export function sortAscending(array) {
	return array.sort((a, b) => {
		if (a > b) return 1;
		else if (b > a) return -1;
		return 0;
	});
}

export function sortAscendingByKey(array, key) {
	return array.sort((a, b) => {
		if (a[key] > b[key]) return 1;
		else if (b[key] > a[key]) return -1;
		return 0;
	});
}

export function getMinimum(array) {
	return sortAscending(array)[0];
}

export function getKey(array, key) {
	return array.map(a => a[key]);
}

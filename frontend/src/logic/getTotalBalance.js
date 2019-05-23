const add = (a, b) => a + b;
const balances = a => a.balance;

export function getTotalBalance(accounts) {
	if (!accounts || accounts.length < 1) return 0;
	return accounts.map(balances).reduce(add);
}

import * as stats from "../getStats";

test("getMinimumBalance returns minimum balance", () => {
    const balances = [{ balance: 75 }, { balance: -100 }, { balance: 0 }, { balance: -75 }];
    expect(stats.getMinBalance(balances)).toBe(-100)
});

test("getSavingsRate returns correct savings rate", () => {
    expect(stats.getSavingsRate(100, 50)).toBe(0.5);
    expect(stats.getSavingsRate(100, -25)).toBe(0.75);
});

test("getFIREGoal returns the correct FIRE goal", () => {
    expect(stats.getFIREGoal(-1000)).toBe(3e5);
    expect(stats.getFIREGoal(2000)).toBe(6e5);
});

test("getChange finds correct change in balance", () => {
    const balances = [{ balance: 2 }, { balance: -3 }, { balance: 2 }, { balance: -5 }];
    expect(stats.getChange(balances, 4)).toBe(-1)
});
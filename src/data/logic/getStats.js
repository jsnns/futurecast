import _ from "lodash";
import {getBalances} from "./getBalances";
import {getBudgetStats} from "./getBudget";
import {toCurrency} from "../helpers";

/**
 * Get minimum balance from a list of balances
 * @param balances
 * @returns {number}
 */
export function getMinBalance(balances) {
    return _(balances).minBy("balance").balance;
}

/**
 * Get the savings rate as defined by (income - expenses) / income
 * @param income
 * @param expenses
 * @returns {number}
 */
export function getSavingsRate(income, expenses) {
    return (income - Math.abs(expenses)) / income;
}

/**
 * Get the FIRE goal as defined by (expenses * 12 * 25)
 * @param monthlyExpenses
 * @returns {number}
 */
export function getFIREGoal(monthlyExpenses) {
    return Math.abs(monthlyExpenses) * 12 * 25;
}

/**
 * Get the change in balance over a specific timeframe
 *
 * This returns the difference in the mean of the
 * first and last two day window within a given timeframe.
 *
 * @param balances
 * @param timeFrame
 * @returns {number}
 */
export function getChange(balances, timeFrame) {
    const firstDay = _(balances.slice(0, 2)).map("balance").mean();
    const lastDay = _(balances.slice(timeFrame - 2, timeFrame)).map("balance").mean();

    return lastDay - firstDay;
}

export function getStats(accounts, transactions, timeFrame) {

    const currentBalance = _(accounts).map("balance").sum();
    const balances = getBalances(transactions, currentBalance, timeFrame);
    const {expenses} = getBudgetStats(transactions);

    return [
        {
            label: "FIRE Goal",
            value: toCurrency(getFIREGoal(expenses))
        },
        {
            label: "30 Day Change",
            value: getChange(balances, 30),
            currency: true
        },
        {
            label: "365 Day Change",
            value: getChange(balances, 365),
            currency: true
        }
    ];
}
import _ from "lodash";
import {getBalances} from "./getBalances";
import {getBudgetStats} from "./getBudget";
import {toCurrency} from "../helpers";

export function getMinBalance(balances) {
    return _(balances).minBy("balance").balance;
}

export function getSavingsRate(income, expenses) {
    return (income + expenses) / income;
}

export function getFIREGoal(expenses) {
    return Math.abs(expenses) * 12 * 25;
}

export function getChange(balances, timeFrame) {
    const firstDay = _(balances.slice(0, 2)).map("balance").mean();
    const lastDay = _(balances.slice(timeFrame - 2, timeFrame)).map("balance").mean();

    return lastDay - firstDay;
}

export function getStats(accounts, transactions, timeFrame) {

    const currentBalance = _(accounts).map("balance").sum();
    const balances = getBalances(transactions, currentBalance, timeFrame);
    const {income, expenses} = getBudgetStats(transactions);

    return [
        {
            label: "Minimum Balance",
            value: getMinBalance(balances),
            currency: true
        },
        {
            label: "Savings Rate",
            value: getSavingsRate(income, expenses),
            percentage: true
        },
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
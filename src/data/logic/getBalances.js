import {mapGetInstances} from "./";
import _ from "lodash";

/**
 * Get an array of balances from a set of transactions for a specific number of days
 * @param transactions Array
 * @param startingBalance Number
 * @param days Number
 * @returns {Array<{balance: Number, minimum: Number, date: Date}>}
 */
export function getBalances(transactions, startingBalance, days) {
    // parameter validation
    if (typeof (days) === "string") {
        days = Number(days);
        if (isNaN(days)) {
            throw Error("Days must be a number.")
        }
    }

    // initial state configuration
    let balances = [];
    let balance = startingBalance;
    let currentDate = new Date();

    // initialize endDate to today + days
    let endDate = new Date();
        endDate = endDate.setDate(endDate.getDate() + days);

    // add a buffer to date range for calculations, ie when displayed in chart
    days += 30;

    // get each instance of each transaction, their order doesn't matter here
    let transactionInstances = transactions.flatMap(mapGetInstances(days));

    const addOneToCurrentDate = () => currentDate.setDate(currentDate.getDate() + 1);

    /*
     * for each day between currentDate and endDate:
     *  - add the value of each day's transaction to the balance
     *  - add the point-in-time balance to the array of balances
     *  - increment the day
     */
    while (currentDate < endDate) {
        // add value of each transaction to the balance
        for (let i in transactionInstances) {
            const instance = transactionInstances[i];
            if (instance.date.toDateString() === currentDate.toDateString()) {
                balance += getSumValue(instance);
            }
        }

        // add a new date to list of balances
        balances.push({
            balance: balance,
            date: currentDate.toDateString()
        });

        // add 1 to currentDate
        addOneToCurrentDate();
    }


    // get minimum balances for the days
    for (let i in balances) {
        let futureBalances = _(balances).map('balance').value().slice(Number(i));
        futureBalances = futureBalances.sort((a, b) => a > b ? 1 : -1);
        balances[i].minimum = futureBalances[0];
    }

    // return balances - the 30 we added for minimum balance calculation
    return balances.slice(0, days - 30);
}

function getSumValue(instance) {
  if (instance.category === "savings")
    return 0;

  return instance.value;
}


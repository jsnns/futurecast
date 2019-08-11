import React, {Component} from "react";
import {Box} from "grommet";

import {client} from "../../client";
import {getBalances, getBudgetStats} from "../../data/logic";
import gql from "graphql-tag";
import _ from "lodash";
import Stat from "../_shared_/Stat";
import {toCurrency} from "../../data/helpers";

const GET_TRANSACTIONS = gql`
    {
        users {
            transactions {
                id
                value
                start
                end
                interval_days
                interval_months
                category
            }
            accounts {
                balance
            }
        }
    }
`;

class StatsTables extends Component {
    state = {stats: []};

    render() {
        const {stats} = this.state;

        return (
            <Box gap={"small"}>
                <Box direction="row" gap={"medium"}>
                    {stats.map(stat => <Stat notCurrency={stat.notCurrency} label={stat.label} value={stat.value}/>)}
                </Box>
            </Box>
        );
    }

    componentWillMount = async () => {
        client
            .query({query: GET_TRANSACTIONS})
            .then(({data, loading, error}) => {
                if (loading) console.log("Loading...");
                if (error) console.log(`Error! ${error}`);
                if (data) {

                    const {transactions, accounts} = data.users[0];
                    const currentBalance = _(accounts).map("balance").sum();
                    const balances = getBalances(transactions, currentBalance, 365);
                    const { income, expenses, savings } = getBudgetStats(transactions);

                    const savingsRate = ((Math.abs(income) - Math.abs(expenses)) + savings) / Math.abs(income);

                    debugger;

                    this.setState({
                        stats: [
                            {
                                label: "Minimum Balance",
                                value: _(balances).minBy("balance").balance
                            },
                            {
                                label: "Savings Rate",
                                value:  (savingsRate * 100).toFixed(1) + "%",
                                notCurrency: true
                            },
                            {
                                label: "FIRE Goal",
                                value: toCurrency(Math.abs(expenses) * 12 * 25),
                                notCurrency: true
                            }
                        ]
                    });
                }
            });
    };
}

export default StatsTables;

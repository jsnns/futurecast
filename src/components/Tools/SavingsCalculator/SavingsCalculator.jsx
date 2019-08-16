import React, {useState} from "react";
import {Box, RangeInput, Heading, Table, TableRow, TableCell, TableBody} from "grommet";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import {getBudgetStats} from "../../../data/logic";
import Currency from "../../_shared_/Currency";
import _ from "lodash";

let query = gql`
    {
        transactions {
            id
            value
            name
            start
            end
            category
            interval_days
            interval_months
        }
    }
`;

const SavingsCalculator = () => {
    const [savingsRate, setSavingsRate] = useState(0.6);
    const [max401k, setMax401k] = useState(500);

    return (
        <Query query={query}>
            {({error, data, loading}) => {
                if (error) return `Error! ${error.message}`;
                if (loading) return `Loading...`;

                let {income, expenses, savings} = getBudgetStats(data.transactions);
                const moneyAfterExpenses = income + expenses;

                let current401kTransactions = _(data.transactions).filter(tx => tx.name === "401k").value();
                let current401kSpending = 0;


                if (current401kTransactions.length > 0) {
                    current401kSpending = Math.abs(current401kTransactions[0].value * (28 / current401kTransactions[0].interval_days));

                    if (max401k !== current401kSpending) {
                        setMax401k(current401kSpending);
                    }
                }

                savings = savings - current401kSpending;

                const currentSavingsRate = savings/income;

                if (savingsRate !== currentSavingsRate) {
                    setSavingsRate(currentSavingsRate);
                }

                const retirement = current401kSpending;
                const spending = moneyAfterExpenses - savings;

                return <Box pad={"small"}>
                    <Heading level={4} margin={"small"}>
                        Parameters
                    </Heading>
                    <Box pad={"small"} background={"dark-1"}>
                        <Heading level={4} margin={"none"}>
                            Savings Rate
                        </Heading>
                        <RangeInput
                            margin={"none"}
                            value={savingsRate}
                            min={0}
                            max={1}
                            step={0.05}
                            onChange={e => setSavingsRate(e.target.value)}
                        />
                        {(savingsRate * 100).toFixed(0)}%
                    </Box>


                    <Heading level={4} margin={"small"}>
                        Monthly Allowances
                    </Heading>
                    <Box pad={"small"} background={"dark-1"}>
                        <Table margin={"none"} cellPadding={"none"}>
                            <TableBody>
                                <TableRow>
                                    <TableCell pad={"none"}>401k</TableCell>
                                    <TableCell><Currency value={retirement}/></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell pad={"none"}>Savings</TableCell>
                                    <TableCell><Currency value={savings}/></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell pad={"none"}>Spending</TableCell>
                                    <TableCell><Currency value={spending}/></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </Box>;


            }}
        </Query>
    );
};

export default SavingsCalculator;
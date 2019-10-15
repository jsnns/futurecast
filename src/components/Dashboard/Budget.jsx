import React, {Component} from "react";
import gql from "graphql-tag";

import PieWithTable from "../_shared_/PieWithTable";
import {Box} from "grommet";
import {colors} from "../../constants";
import {client} from "../../client";
import {getBudget, getBudgetStats} from "../../data/logic";

import _ from "lodash";
import Stat from "../_shared_/Stat";
import {getSavingsRate} from "../../data/logic/getStats";

const GET_TRANSACTIONS = gql`
    {
		user_reports(where: {id: {_eq: "${window.localStorage.getItem('session:user_report')}"}}) {
			reportByReport {
				transactions {
						id
						category
						value
						interval_days
						interval_months
				}
			}
		}
    }
`;

class Budget extends Component {
    state = {data: {}, table: [], stats: {income: 0, expenses: 0, savings: 0}};

    render() {
        const {data, table, stats} = this.state;

        return <Box>
            <Box style={{width: "100%"}} background={"dark-2"} pad={"small"} round>
                <Box direction={"row"} gap={"medium"} pad={{left: "small"}}>
                    <Stat label={"Expenses"} value={stats.expenses} currency/>
                    <Stat label={"Income"} value={stats.income} currency/>
                    <Stat label={"Savings"} value={stats.savings} currency/>
                    <Stat label={"Savings Rate"} value={getSavingsRate(stats.income, stats.expenses)} percentage />
                </Box>
            </Box>
            <PieWithTable pieData={data} tableData={table}/>
        </Box>;
    }

    chartDataFromBudget = (budget, transactions) => {
        budget = budget
            .sort((a, b) => a.value - b.value)
            .filter(a => a.category !== "once");

        let labels = [];
        let values = [];
        let table = [];
        let sliceColors = [];

        let stats = getBudgetStats(transactions);

        for (let i in budget) {
            let {value, category} = budget[i];

            if (category === "income") {
                category = "leftover";
                value = _(budget).map("value").sum();
                sliceColors.push("rgba(0, 0, 0, 0)");
            } else {
                sliceColors.push(colors[i]);
            }

            labels.push(category);
            values.push(Math.abs(value)); // makes piechart show postive numbers
            table.push({value, category});
        }

        this.setState({
            stats,
            data: {
                labels,
                datasets: [
                    {
                        data: values,
                        backgroundColor: sliceColors,
                        borderWidth: 0
                    }
                ]
            },
            table
        });
    };

    componentWillMount = () => {
        client
            .query({query: GET_TRANSACTIONS})
            .then(({data, error, loading}) => {
                if (loading) return "loading...";
					 if (error) return `Error! ${error}`;

					 data = data.user_reports[0].reportByReport

                this.chartDataFromBudget(getBudget(data.transactions), data.transactions);
            });
    };

}

export default Budget;

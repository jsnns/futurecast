import React, {Component} from "react";
import {Box} from "grommet";

import {client} from "../../client";
import gql from "graphql-tag";
import Stat from "../_shared_/Stat";
import {getStats} from "../../data/logic/getStats";

const GET_TRANSACTIONS = gql`
    {
		user_reports(where: {id: {_eq: "${window.localStorage.getItem('session:user_report')}"}}) {
			reportByReport {
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
    }
`;

class StatsTables extends Component {
    state = {stats: []};

    render() {
        const {stats} = this.state;

        return (
            <Box gap={"small"}>
                <Box direction="row" gap={"medium"}>
                    {stats.map(stat => <Stat currency={stat.currency} percentage={stat.percentage} label={stat.label}
                                             value={stat.value}/>)}
                </Box>
            </Box>
        );
    }

    componentWillMount = async () => {
        client.query({query: GET_TRANSACTIONS})
            .then(({data, loading, error}) => {
                if (loading) console.log("Loading...");
                if (error) console.log(`Error! ${error}`);

                if (data) {
                    const {transactions, accounts} = data.user_reports[0].reportByReport;
                    this.setState({
                        stats: getStats(accounts, transactions, 365)
                    });
                }
            });
    };
}

export default StatsTables;

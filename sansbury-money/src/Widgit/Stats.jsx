import React, { Component } from "react";

import gql from "graphql-tag";
import { client } from "../routes";
import { Box, Heading, Text } from "grommet";

import { getBalances } from "../logic";
import * as _ from "../helpers";

class StatsTables extends Component {
	state = { stats: [] };

	componentWillMount = async () => {
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
					}
					accounts {
						balance
					}
				}
			}
		`;

		client
			.query({ query: GET_TRANSACTIONS })
			.then(({ data, loading, error }) => {
				if (loading) console.log("Loading...");
				if (error) console.log(`Error! ${error}`);
				if (data) {
					const { transactions, accounts } = data.users[0];
					const currentBalance = _.sumArray(
						_.getKey(accounts, "balance")
					);
					const balances = getBalances(
						transactions,
						currentBalance,
						365
					);
					const stats = [
						{
							label: "Minimum Balance",
							value: _.toCurrency(
								_.getMinimum(_.getKey(balances, "balance"))
							)
						},
						{
							label: "Current Balance",
							value: _.toCurrency(currentBalance)
						}
					];

					this.setState({ stats });
				}
			});
	};

	render() {
		const { stats } = this.state;

		return (
			<Box className="table">
				<Box direction="row" background="brand" pad="medium">
					{stats.map(stat => (
						<Box key={stat.label} direction="column" basis="small">
							<Heading
								style={{
									fontFamily: "Abril Fatface",
									fontSize: "21pt"
								}}
								level={3}
								margin="none"
							>
								{stat.value}
							</Heading>
							<Text margin="none" style={{ fontFamily: "Lato" }}>
								{stat.label}
							</Text>
						</Box>
					))}
				</Box>
			</Box>
		);
	}
}

export default StatsTables;

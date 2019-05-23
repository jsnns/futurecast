import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import gql from "graphql-tag";
import { Box, Text, RangeInput } from "grommet";

import { client } from "../routes";
import { getBalances } from "../logic";
import * as _ from "../helpers";

class Balance extends Component {
	state = {
		data: {},
		transactions: [],
		accounts: [],
		runwayData: {},
		mins: [],
		labels: [],
		days: 30,
		balanceQuery: null
	};

	componentWillMount() {
		this.fetchData();
		if (window.innerWidth < 755) {
			this.setState({
				mobile: true
			});
		}
	}

	fetchData = async () => {
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
					this.getData(
						data.users[0].transactions,
						data.users[0].accounts,
						this.state.days
					);
				}
			});
	};

	getData = (transactions, accounts, days) => {
		this.setState({ days });

		const startingBalance = _.sumArray(_.getKey(accounts, "balance"));
		const data = getBalances(transactions, startingBalance, days);

		const balances = _.getKey(data, "balance");
		const mins = _.getKey(data, "minimum");
		const labels = _.getKey(data, "date");

		const chartData = {
			mins,
			labels,
			data: {
				labels: labels,
				datasets: [
					{
						label: "Min Balance",
						backgroundColor: "#FF1A66",
						borderColor: "#FF1A66",
						pointRadius: 1,
						fill: false,
						lineTension: 0,
						data: mins
					},
					{
						label: "Balance",
						backgroundColor: "#1AB399",
						borderColor: "#1AB399",
						pointRadius: 1,
						fill: false,
						lineTension: 0,
						data: balances
					}
				]
			}
		};

		this.setState({ accounts, transactions, ...chartData });
	};

	updateData = e => {
		const { transactions, accounts } = this.state;
		this.getData(transactions, accounts, Number(e.target.value));
	};

	render() {
		const { data, days } = this.state;

		return (
			<Box>
				<Box pad="small">
					<Text>Number of Days</Text>
					<Box pad="small">
						<RangeInput
							min={2}
							max={600}
							step={10}
							value={days}
							onChange={this.updateData}
						/>
					</Box>
				</Box>
				<Box
					pad="small"
					height="medium"
					style={{ position: "relative" }}
				>
					<Line
						data={data}
						options={{
							pointHitDetectionRadius: 5,
							bezierCurve: false,
							scaleBeginAtZero: true,
							maintainAspectRatio: false
						}}
					/>
				</Box>
			</Box>
		);
	}
}

export default Balance;

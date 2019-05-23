import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import { colors } from "../constants";
import { client } from "../routes";
import gql from "graphql-tag";

import { Box, Table, TableBody, TableRow, TableCell } from "grommet";

function getBudget(transactions) {
	let budget = {};

	transactions.forEach(transaction => {
		let category = transaction.category;

		if (!budget[category]) budget[category] = 0;
		let occurrence_scaler =
			transaction.interval_months * 28 + transaction.interval_days;
		occurrence_scaler = 28 / occurrence_scaler;

		budget[transaction.category] += Math.floor(
			transaction.value * occurrence_scaler
		);
	});

	return Object.keys(budget).map(category => {
		return { category, value: budget[category] };
	});
}

class Budget extends Component {
	state = {
		data: {},
		table: []
	};

	chartDataFromBudget = budget => {
		budget = budget
			.sort((a, b) => a.value - b.value)
			.filter(a => a.value < 0)
			.filter(a => a.category !== "once");

		let labels = [];
		let values = [];
		let table = [];

		for (let i in budget) {
			let { value, category } = budget[i];
			labels.push(category);
			values.push(value);
			table.push({ value, category });
		}

		this.setState({
			data: {
				labels,
				datasets: [
					{
						data: values,
						backgroundColor: colors
							.slice(0, values.length)
							.reverse(),
						borderWidth: 0
					}
				]
			},
			table
		});
	};

	componentWillMount() {
		if (window.innerWidth < 500) {
			this.setState({
				mobile: true
			});
		}

		const GET_TRANSACTIONS = gql`
			{
				transactions {
					id
					category
					value
					interval_days
					interval_months
				}
			}
		`;

		client
			.query({ query: GET_TRANSACTIONS })
			.then(({ data, error, loading }) => {
				if (loading) return "loading...";
				if (error) return `Error! ${error}`;
				this.chartDataFromBudget(getBudget(data.transactions));
			});
	}

	render() {
		const { data, table } = this.state;
		console.log(data);
		return (
			<Box flex="shrink" direction="row-responsive" wrap>
				<Box pad={{ left: "large", top: "small" }} height="medium">
					{data && (
						<Pie
							data={data}
							options={{
								maintainAspectRatio: false,
								legend: {
									position: "top",
									labels: {
										boxWidth: 12
									}
								}
							}}
						/>
					)}
				</Box>
				<Box pad="medium" direction="row" justify="center">
					<Table>
						<TableBody>
							{table.map(row => (
								<TableRow key={row.value + row.category}>
									<TableCell
										style={{
											fontFamily: "Lato",
											fontSize: "12pt",
											textTransform: "uppercase",
											opacity: 0.6
										}}
									>
										{row.category}
									</TableCell>
									<TableCell
										style={{
											fontFamily: "Abril Fatface",
											fontSize: "14pt"
										}}
									>
										{Math.abs(row.value)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Box>
			</Box>
		);
	}
}

export default Budget;

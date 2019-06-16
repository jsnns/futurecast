import React, { Component } from "react";
import gql from "graphql-tag";

import PieWithTable from "../shared/PieWithTable";
import { Box } from "grommet";
import { colors } from "../../constants";
import { client } from "../../routes";
import { getBudget } from "../../data/logic";

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
			values.push(Math.abs(value)); // makes piechart show postive numbers
			table.push({ value, category });
		}

		this.setState({
			data: {
				labels,
				datasets: [
					{
						data: values,
						backgroundColor: colors.slice(0, values.length).reverse(),
						borderWidth: 0
					}
				]
			},
			table
		});
	};

	componentWillMount = () => {
		client
			.query({ query: GET_TRANSACTIONS })
			.then(({ data, error, loading }) => {
				if (loading) return "loading...";
				if (error) return `Error! ${error}`;

				this.chartDataFromBudget(getBudget(data.transactions));
			});
	};

	render() {
		const { data, table } = this.state;
		return <Box alignSelf={"center"}>
			<PieWithTable pieData={data} tableData={table} />
		</Box>
	}
}

export default Budget;

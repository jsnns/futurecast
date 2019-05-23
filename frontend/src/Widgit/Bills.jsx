import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { mapGetInstances } from "../logic/getInstances";
import { Box, DataTable, Text } from "grommet";
import { toCurrency } from "../logic";

const GET_TRANSACTIONS = gql`
	{
		transactions {
			category
			name
			value
			start
			end
			interval_days
			interval_months
		}
	}
`;

const BillsTable = () => {
	return (
		<Box>
			<Box pad="small" fill>
				<Query query={GET_TRANSACTIONS}>
					{({ loading, error, data }) => {
						if (loading) return "Loading...";
						if (error) return `Error! ${error.message}`;

						let transactions = data.transactions.flatMap(
							mapGetInstances(90)
						);

						transactions = transactions.sort((a, b) => {
							// sort by date
							if (a.date > b.date) return 1;
							if (b.date > a.date) return -1;

							// sort by value
							return a.value;
						});

						return (
							<DataTable
								columns={[
									{
										property: "name",
										header: "Name",
										primary: true
									},
									{
										property: "value",
										header: "Value",
										render: datum => (
											<Text
												color={
													datum.value > 0
														? "status-ok"
														: "status-critical"
												}
												style={{
													fontFamily: "monospace"
												}}
											>
												{toCurrency(datum.value)}
											</Text>
										)
									},
									{
										property: "date",
										header: "Date",
										sortable: true,
										render: datum =>
											new Date(datum.date).toDateString()
									}
								]}
								data={transactions}
							/>
						);
					}}
				</Query>
			</Box>
		</Box>
	);
};

export default BillsTable;

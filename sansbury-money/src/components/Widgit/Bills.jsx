import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Box, DataTable, Text } from "grommet";

import { getInstancesArray } from "../../data/logic";
import { sortAscendingByKey } from "../../data/helpers/array";
import { toCurrency } from "../../data/helpers/format";

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
	const dataTableColumns = [
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
					color={datum.value > 0 ? "status-ok" : "status-critical"}
					style={{ fontFamily: "monospace" }}
					children={toCurrency(datum.value)}
				/>
			)
		},
		{
			property: "date",
			header: "Date",
			sortable: true,
			render: datum => new Date(datum.date).toDateString()
		}
	];
	return (
		<Box>
			<Box pad="small" fill>
				<Query query={GET_TRANSACTIONS}>
					{({ loading, error, data }) => {
						if (loading) return "Loading...";
						if (error) return `Error! ${error.message}`;

						let { transactions } = data;

						transactions = sortAscendingByKey(
							getInstancesArray(transactions, 45),
							"date"
						);

						return (
							<DataTable
								columns={dataTableColumns}
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

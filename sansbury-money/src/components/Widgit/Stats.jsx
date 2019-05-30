import React, { Component } from "react";
import { Box, Heading, Text, Button } from "grommet";

import { client } from "../../routes";
import { getBalances } from "../../data/logic";
import gql from "graphql-tag";
import * as _ from "../../data/helpers";
import { auth } from "../../routes"

import { Edit as EditIcon, UserSettings, Logout } from "grommet-icons";


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

class StatsTables extends Component {
	state = { stats: [] };

	componentWillMount = async () => {
		client
			.query({ query: GET_TRANSACTIONS })
			.then(({ data, loading, error }) => {
				if (loading) console.log("Loading...");
				if (error) console.log(`Error! ${error}`);
				if (data) {
					const { transactions, accounts } = data.users[0];
					const currentBalance = _.sumArray(_.getKey(accounts, "balance"));
					const balances = getBalances(transactions, currentBalance, 365);

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
			<Box pad='none'>
				<Box pad="none" direction="row" background="#1B998B" pad="medium">
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
					<Box direction="row" padding='large' align='end'>
						<Button icon={<EditIcon />} label="Edit" href="/edit" />
						<Button icon={<UserSettings />} label='Profile' href='/profile' />
						<Button icon={<Logout />} label='logout' onClick={auth.logout} />
					</Box>
				</Box>
			</Box>
		);
	}
}

export default StatsTables;

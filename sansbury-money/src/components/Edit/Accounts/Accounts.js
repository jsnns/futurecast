import React, { Component } from "react";
import { Subscription } from "react-apollo";
import { Box, TextInput, Text, Button } from "grommet";
import { Add } from "grommet-icons";

import gql from "graphql-tag";

import { client, auth } from "../../../routes";

const GET_ACCOUNTS = gql`
	subscription {
		accounts {
			id
			name
			balance
		}
	}
`;

class EditAccounts extends Component {
	state = {
		acs: [],
		updatedAcs: [],
		updating: null
	};

	changeAc = (id, key) => {
		return e => {
			const UPDATE_TRANSACTION = gql`
				mutation {
				update_accounts(where: {id: {_eq: "${id}"}}, _set: {${key}: "${
				e.target.value
			}"}) {
					returning {
					id
					}
				}
				}
			`;
			client
				.mutate({ mutation: UPDATE_TRANSACTION })
				.then(({ error }) => console.log(error));
		};
	};

	markAccountDoneUpdating(i) {
		let { updatedAcs } = this.state;
		updatedAcs = updatedAcs.filter(ii => i !== ii);
		this.setState({ updatedAcs });
	}

	render() {
		return (
			<Box pad="medium">
				<Box margin="small">
					<Button
						icon={<Add />}
						style={{ width: 50 }}
						primary
						onClick={() => {
							client
								.mutate({
									mutation: gql`
                        mutation {
                          insert_accounts(
                            objects: { owner: "${auth.user_id}" }
                          ) {
                            returning {
                              id
                            }
                          }
                        }
                      `
								})
								.then(() => console.log("made new tx"));
						}}
					/>
				</Box>
				<Box direction="row-responsive" wrap>
					<Subscription subscription={GET_ACCOUNTS}>
						{({ error, data, loading }) => {
							if (loading) return "Loading...";
							if (error) return `Error! ${error.message}`;
							return data.accounts.map(ac => {
								let i = ac.id;
								return (
									<Box pad="small" basis="1/2">
										<Box
											style={{ position: "relative" }}
											pad="small"
											background="neutral-3"
											elevation="small"
											key={ac.name}
											round
										>
											<Box
												direction="row"
												pad={{
													left: "small",
													right: "small"
												}}
											>
												<Text
													style={{
														fontFamily: "Abril Fatface",
														fontSize: "18pt",
														opacity: 0.99,
														marginTop: 3,
														marginRight: 4
													}}
												>
													$
												</Text>
												<TextInput
													plain
													defaultValue={ac.balance}
													style={{
														fontFamily: "Abril Fatface",
														fontSize: "22pt",
														opacity: 0.99,
														padding: 0,
														width: 100
													}}
													onChange={this.changeAc(i, "balance")}
												/>
											</Box>
											<TextInput
												plain
												defaultValue={ac.name}
												style={{
													fontFamily: "Alegreya",
													fontSize: "16pt",
													width: 200,
													paddingTop: 0,
													paddingBottom: 0
												}}
												onChange={this.changeAc(i, "name")}
											/>
										</Box>
									</Box>
								);
							});
						}}
					</Subscription>
				</Box>
			</Box>
		);
	}
}

export default EditAccounts;

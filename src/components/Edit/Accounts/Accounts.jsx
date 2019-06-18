import React, { Component } from "react";
import {Anchor, Box, Button, DataTable, Text} from "grommet";
import { client, auth }from "../../../routes"
import gql from "graphql-tag";
import {Subscription} from "react-apollo";
import EditAccountModal from "./EditAccountModal";
import {Edit} from "grommet-icons";

const GET_SUBSCRIPTIONS = gql`
	subscription {
		accounts {
			id
			name
			balance
		}
	}
`;

class Accounts extends Component {
    state = { account: null };

    render = () => {
        return (
            <Box>
                <EditAccountModal edit={this.edit} onClose={this.closeModal} account={this.state.account} />

                <Button onClick={this.newAccount} label="New" />

                <Subscription subscription={GET_SUBSCRIPTIONS}>
                    {({ loading, error, data }) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;

                        return <DataTable
                            primaryKey={"id"}
                            sortable={true}
                            columns={[
                                {
                                    header: "Name",
                                    property: "name"
                                },
                                {
                                    header: "Price",
                                    property: "balance"
                                },
                                {
                                    header: "",
                                    render: datum => <Text>
                                        <Anchor onClick={() => this.openModal(datum)} label={<Edit/>} />
                                    </Text>
                                }
                            ]}
                            data={data.accounts}
                        />
                    }}
                </Subscription>
            </Box>
        )
    };

    openModal = account => this.setState({account});

    closeModal = () => this.setState({account: null});

    edit = key => {
        const { account } = this.state;

        return e => {
            account[key] = e.target.value;
            this.setState({account});
            this.updateAccount(account.id, key, e.target.value);
        };
    };

    updateAccount = (id, key, value) => client.mutate({mutation: gql`
        mutation {
          update_accounts(where: {id: {_eq: "${id}"}}, _set: {${key}: "${value}"}) {
            returning {
              id
            }
          }
        }
    `});

    newAccount = () => client.mutate({mutation: gql`
        mutation {
          insert_accounts(objects: {owner: "${auth.user_id}"}) {
            returning {
              id
            }
          }
        }
    `})
}

export default Accounts;
import React, { Component } from "react";
import {Anchor, Box, Button, DataTable, Text} from "grommet";
import { client, auth }from "../../../routes"
import gql from "graphql-tag";
import {Subscription} from "react-apollo";
import EditSubscriptionModal from "./EditSubscriptionModal";
import {Edit} from "grommet-icons";

const GET_SUBSCRIPTIONS = gql`
	subscription {
		subscriptions {
			id
			name
			price
			category
			yearly
			owner
			usefulness
		}
	}
`;

class Subscriptions extends Component {
    state = {
        subscription: null
    };

    edit = key => {
        const { subscription } = this.state;

        return e => {
            const UPDATE_TRANSACTION = gql`
				mutation {
				  update_subscriptions(where: {id: {_eq: "${subscription.id}"}}, _set: {${key}: "${
                e.target.value
                }"}) {
					returning {
					  id
					}
				  }
				}
			`;
            subscription[key] = e.target.value;
            client
                .mutate({ mutation: UPDATE_TRANSACTION })
                .then(transaction => this.setState({ subscription }));
            this.setState({ subscription });
        };
    }

    render = () => {
        return (
            <Box>
                <EditSubscriptionModal edit={this.edit} onClose={this.closeModal} subscription={this.state.subscription} />

                <Button onClick={this.newSubscription} label="New"></Button>
                <Subscription subscription={GET_SUBSCRIPTIONS}>
                    {({ loading, error, data, networkStatus }) => {
                        if (loading) return 'loading';
                        if (error) return `Error! ${error.message}`;

                        console.log(data)

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
                                    property: "price"
                                },
                                {
                                    header: "Category",
                                    property: "category"
                                },
                                {
                                    header: "Usefulness",
                                    property: "usefulness"
                                },
                                {
                                    header: "",
                                    render: datum => <Text>
                                        <Anchor onClick={() => this.openModal(datum)} label={<Edit/>} />
                                    </Text>
                                }
                            ]}
                            data={data.subscriptions}
                        />
                    }}
                </Subscription>
            </Box>
        )
    };

    openModal = subscription => this.setState({subscription});
    closeModal = () => this.setState({subscription: null});

    updateSubscription = (id, key, value) => client.mutate({mutation: gql`
        mutation {
          update_subscriptions(where: {id: {_eq: "${id}"}}, _set: {${key}: "${value}"}) {
            returning {
              id
            }
          }
        }
    `});

    newSubscription = () => client.mutate({mutation: gql`
        mutation {
          insert_subscriptions(objects: {owner: "${auth.user_id}"}) {
            returning {
              id
            }
          }
        }
    `})
}

export default Subscriptions;
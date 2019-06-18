import React, {Component} from 'react';

import gql from 'graphql-tag';
import {Subscription} from 'react-apollo';

import {Anchor, Box, Button, DataTable, Text} from 'grommet';
import {Edit, Trash} from 'grommet-icons';
import EditTransactionModal from './EditTransaction';
import {auth, client} from '../../../routes';

const GET_TRANSACTIONS = gql`
	subscription {
		transactions {
			id
			value
			name
			start
			end
			category
			interval_days
			interval_months
		}
	}
`;

class EditTxs extends Component {
    state = {
        income: [],
        expenses: [],
        allIncome: [],
        allExpenses: [],
        nullTxs: [],
        selectedTx: null
    };

    constructor(props) {
        super(props);
        this.openEditModal = this.openEditModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateTx = this.updateTx.bind(this);
    }

    openEditModal(tx) {
        this.setState({selectedTx: tx});
    }

    closeModal() {
        this.setState({selectedTx: null});
    }

    async trashTransaction(id) {
        const DELETE_TRANSACTION = gql`
		  mutation {
			delete_transactions(where: { id: { _eq: "${id}" } }) {
			  returning {
				id
			  }
			}
		  }
		`;
        return client.mutate({mutation: DELETE_TRANSACTION});
    }

    updateTx(key) {
        const {selectedTx} = this.state;
        return e => {
            const UPDATE_TRANSACTION = gql`
				mutation {
				  update_transactions(where: {id: {_eq: "${selectedTx.id}"}}, _set: {${key}: "${
                e.target.value
                }"}) {
					returning {
					  id
					}
				  }
				}
			`;
            client
                .mutate({mutation: UPDATE_TRANSACTION})
                .then(transaction => this.setState({selectedTx}));
            selectedTx[key] = e.target.value;
            this.setState({selectedTx});
        };
    }

    render() {
        const {selectedTx} = this.state;

        return (
            <Box pad='none' margin={"none"}>
                <EditTransactionModal
                    onClose={this.closeModal}
                    onSubmit={this.pushTx}
                    onEdit={this.updateTx}
                    transaction={selectedTx}
                />
                <Button
                    label={"New"}
                    onClick={() => {
                        client
                            .mutate({
                                mutation: gql`
									mutation {
									  insert_transactions(
										objects: { owner: "${auth.user_id}" }
									  ) {
										returning {
										  id
										}
									  }
									}
								`
                            })
                            .then(() => console.log('made new tx'));
                    }}
                />
                <Box pad={"none"} margin={"none"}>
                    <Subscription subscription={GET_TRANSACTIONS}>
                        {({loading, error, data, networkStatus}) => {
                            if (loading) return 'loading';
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
                                        header: "Value",
                                        property: "value"
                                    },
                                    {
                                        header: "Category",
                                        property: "category"
                                    },
                                    {
                                        header: "",
                                        render: datum => <Text>
                                            <Anchor onClick={() => this.openEditModal(datum)} label={<Edit/>}/>
                                        </Text>
                                    },
                                    {
                                        header: "",
                                        render: datum => <Text>
                                            <Anchor onClick={() => this.trashTransaction(datum.id)} label={<Trash/>}/>
                                        </Text>
                                    }
                                ]}
                                data={data.transactions}
                            />
                        }}
                    </Subscription>
                </Box>
            </Box>
        );
    }
}

export default EditTxs;

import React, { Component } from "react";
import gql from "graphql-tag";
import { Subscription } from "react-apollo";
import { Anchor, Box, Button, DataTable, Text } from "grommet";
import { Edit, Trash } from "grommet-icons";

import { auth } from "../../../routes";
import { client } from "../../../apollo";
import EditTransactionModal from "./EditTransaction";

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

class EditTransactions extends Component {
  state = {
    income: [],
    expenses: [],
    allIncome: [],
    allExpenses: [],
    nullTxs: [],
    selectedTx: null
  };

  render() {
    const { selectedTx } = this.state;

    return (
      <Box pad='none' margin={"none"}>
        <EditTransactionModal
          onClose={this.closeModal}
          onSubmit={() => {
          }}
          update={this.edit}
          transaction={selectedTx}
        />

        <Button label={"New"} onClick={this.newTransaction}/>
        <Box pad={"none"} margin={"none"}>
          <Subscription subscription={GET_TRANSACTIONS}>
            {({ loading, error, data, networkStatus }) => {
              if (loading) return "Loading...";
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
                      <Anchor onClick={() => this.deleteTransaction(datum.id)} label={<Trash/>}/>
                    </Text>
                  }
                ]}
                data={data.transactions}
              />;
            }}
          </Subscription>
        </Box>
      </Box>
    );
  }

  openEditModal = tx => this.setState({ selectedTx: tx });

  closeModal = () => this.setState({ selectedTx: null });

  deleteTransaction = async id => client.mutate({
    mutation: gql`
        mutation {
            delete_transactions(where: { id: { _eq: "${id}" } }) {
                returning {
                    id
                }
            }
        }
    `
  });

  updateTransaction = (id, key, value) => client.mutate({
    mutation: gql`
        mutation {
            update_transaction(where: {id: {_eq: "${id}"}}, _set: {${key}: "${value}"}) {
                returning {
                    id
                }
            }
        }
    `
  });

  edit = key => {
    const { selectedTx } = this.state;

    return e => {
      selectedTx[key] = e.target.value;
      this.setState({ selectedTx });
      this.updateTransaction(selectedTx.id, key, e.target.value);
    };
  };

  newTransaction = () => client.mutate({
    mutation: gql`
        mutation {
            insert_transactions(objects: { owner: "${auth.user_id}" }) {
                returning {
                    id
                }
            }
        }
    `
  });
}

export default EditTransactions;

import React, { Component } from "react";
import gql from "graphql-tag";
import { Subscription } from "react-apollo";
import { Anchor, Box, Button, DataTable, Text } from "grommet";
import { Edit, Trash } from "grommet-icons";

import { auth } from "../../routes";
import { client } from "../../apollo";
import EditModal from "./EditModal";

class EditGraphql extends Component {
  state = {
    income: [],
    expenses: [],
    allIncome: [],
    allExpenses: [],
    nullTxs: [],
    object: null
  };

  render() {
    const { object } = this.state;
    const { subscription, columns, fields, table } = this.props;

    return (
      <Box pad='none' margin={"none"}>
        <EditModal
          onClose={this.closeModal}
          update={this.edit}
          onSubmit={() => {}}
          object={object}
          fields={fields}
        />

        <Button label={"New"} onClick={this.new}/>

        <Box pad={"none"} margin={"none"}>
          <Subscription subscription={subscription}>
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;

              return <DataTable
                primaryKey={"id"}
                sortable={true}
                columns={[
                  ...columns,
                  {
                    header: "",
                    render: datum => <Text>
                      <Anchor onClick={() => this.openEditModal(datum)} label={<Edit/>}/>
                    </Text>
                  },
                  {
                    header: "",
                    render: datum => <Text>
                      <Anchor onClick={() => this.delete(datum.id)} label={<Trash/>}/>
                    </Text>
                  }
                ]}
                data={data[table]}
              />;
            }}
          </Subscription>
        </Box>
      </Box>
    );
  }

  openEditModal = tx => this.setState({ object: tx });

  closeModal = () => this.setState({ object: null });

  delete = async id => client.mutate({
    mutation: gql`
        mutation {
            delete_${this.props.table}(where: { id: { _eq: "${id}" } }) {
                returning {
                    id
                }
            }
        }
    `
  });

  update = (id, key, value) => client.mutate({
    mutation: gql`
        mutation {
            update_${this.props.table}(where: {id: {_eq: "${id}"}}, _set: {${key}: "${value}"}) {
                returning {
                    id
                }
            }
        }
    `
  });

  edit = key => {
    const { object } = this.state;

    return e => {
      object[key] = e.target.value;
      this.setState({ object });
      this.update(object.id, key, e.target.value);
    };
  };

  new = () => client.mutate({
    mutation: gql`
        mutation {
            insert_${this.props.table}(objects: { owner: "${auth.user_id}" }) {
                returning {
                    id
                }
            }
        }
    `
  });
}

export default EditGraphql;

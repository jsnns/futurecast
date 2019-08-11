import React, {Component} from "react";
import gql from "graphql-tag";
import {Subscription} from "react-apollo";
import {Anchor, Box, Button, DataTable} from "grommet";
import {Edit, Trash} from "grommet-icons";

import {auth} from "../../routes";
import {client} from "../../client";
import EditModal from "../_shared_/EditModal";
import {Add} from "grommet-icons"

class EditGraphql extends Component {
    state = {object: null};

    render() {
        const {object} = this.state;
        const {subscription, columns, fields, table} = this.props;

        return (
            <Box pad='none' margin={"none"}>
                <EditModal
                    onClose={this.closeModal}
                    update={this.edit}
                    onSubmit={() => {
                    }}
                    object={object}
                    fields={fields}
                />

                <Box direction={"row"} alignSelf={"end"} style={{position: "relative", top: -40}}>
                    <Button icon={<Add/>} label={"New"} onClick={this.new}/>
                </Box>

                <Box pad={"none"} margin={"none"}>
                    <Subscription subscription={subscription}>
                        {({loading, error, data}) => {
                            if (loading) return "Loading...";
                            if (error) return `Error! ${error.message}`;

                            return <div style={{width: "100%"}}>
                                <DataTable
                                    style={{backgroundColor: "rgba(0, 0, 0, 0)"}}
                                    groupBy={"category"}
                                    primaryKey={"id"}
                                    columns={[
                                        ...columns,
                                        {
                                            header: "",
                                            render: datum => <div style={{height: 25}}>
                                                {datum.id && <Anchor
                                                    onClick={() => this.openEditModal(datum)}
                                                    label={<Edit />}
                                                />}
                                            </div>
                                        },
                                        {
                                            header: "",
                                            render: datum => <div style={{height: 25}}>
                                                {datum.id && <Anchor
                                                    onClick={() => this.delete(datum.id)}
                                                    label={<Trash />}
                                                />}
                                            </div>
                                        }
                                    ]}
                                    data={data[table]}
                                />
                            </div>;
                        }}
                    </Subscription>
                </Box>
            </Box>
        );
    }

    openEditModal = tx => this.setState({object: tx});

    closeModal = () => this.setState({object: null});

    edit = key => {
        const {object} = this.state;

        return e => {
            object[key] = e.target.value;
            this.setState({object});
            this.update(object.id, key, e.target.value);
        };
    };

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

    new = () => {
        return client.mutate({
            mutation: gql`
                mutation {
                    insert_${this.props.table}(objects: { owner: "${auth.user_id}" }) {
                    returning {
                        id
                    }
                }
                }
            `
        }).then(({data}) => {
            let key = `insert_${this.props.table}`;
            let tx = data[key].returning[0];
            this.openEditModal(tx);
        })
    }
}

export default EditGraphql;

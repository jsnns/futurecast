import React, { Component } from "react";
import { Anchor, Box, Button, DataTable, Text } from "grommet";
import { auth } from "../../../routes";
import { client } from "../../../apollo";
import gql from "graphql-tag";
import EditWishlistModal from "./EditWishlistModal";
import { Edit, Trash } from "grommet-icons";
import { Subscription } from "react-apollo";

const GET_WISHES = gql`
    subscription {
        wishes {
            id
            name
            price
            category
            owner
            usefulness
        }
    }
`;

class WishesList extends Component {
    state = { wishes: null };

    render = () => {
        return (
            <Box>
                <EditWishlistModal
                    edit={this.edit}
                    onClose={this.closeModal}
                    wish={this.state.wishes}
                />

                <Button onClick={this.newWishes} label="New" />

                <Subscription subscription={GET_WISHES}>
                    {({ loading, error, data, networkStatus }) => {
                        if (loading) return "Loading...";
                        if (error) return `Error! ${error.message}`;

                        console.log(data);

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
                                        <Anchor onClick={() => this.openModal(datum)} label={<Edit />} />
                                    </Text>
                                },
                                {
                                    header: "",
                                    render: datum => <Text>
                                        <Anchor onClick={() => this.deleteWishes(datum.id)} label={<Trash />} />
                                    </Text>
                                }
                            ]}
                            data={data.wishes}
                        />;
                    }}
                </Subscription>
            </Box>
        );
    };

    updateWishes = (id, key, value) => client.mutate({
        mutation: gql`
        mutation {
            update_wishes(where: {id: {_eq: "${id}"}}, _set: {${key}: "${value}"}) {
                returning {
                    id
                }
            }
        }
    `
    });

    newWishes = () => client.mutate({
        mutation: gql`
        mutation {
            insert_wishes(objects: {owner: "${auth.user_id}"}) {
                returning {
                    id
                }
            }
        }
    `
    });

    edit = key => {
        const { wishes } = this.state;

        return e => {
            wishes[key] = e.target.value;
            this.setState({ selectedTx: wishes });
            this.updateWishes(wishes.id, key, e.target.value);
        };
    };

    deleteWishes = async id => client.mutate({
        mutation: gql`
        mutation {
            delete_wishes(where: { id: { _eq: "${id}" } }) {
                returning {
                    id
                }
            }
        }
    `
    });

    openModal = wishes => this.setState({ wishes });

    closeModal = () => this.setState({ wishes: null });
}

export default WishesList;
import React, { Component } from "react";
import { Anchor, Box, Button, DataTable, Text, TextInput } from "grommet";
import { auth } from "../../../routes";
import { client } from "../../../client";
import gql from "graphql-tag";
import { Subscription } from "react-apollo";
import EditWishHelpModal from "./EditWishHelpModal";
import { Edit, Trash } from "grommet-icons";

const GET_SUBSCRIPTIONS = gql`
    subscription {
        wishes_help_item {
            id
            owner
            name
            price
            category
            usefulness
            durability
        }
    }
`;

class WishHelpTab1 extends Component {
    state = { wish: null };

    render = () => {
        return (
            <Box>
                <TextInput
                    placeholder="New Catagory"
                ></TextInput>
                <Button
                    label="Calculate"
                ></Button>
                <EditWishHelpModal
                    edit={this.edit}
                    onClose={this.closeModal}
                    wish={this.state.wish}
                />

                <Button
                    onClick={this.newWish}
                    label="New" />
                <br />
                <Subscription subscription={GET_SUBSCRIPTIONS}>
                    {({ loading, error, data }) => {
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
                                    header: "Durability",
                                    property: "durability"
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
                                        <Anchor onClick={() => this.deleteWish(datum.id)} label={<Trash />} />
                                    </Text>
                                }
                            ]}
                            data={data.wishes_help_item}
                        />;
                    }}
                </Subscription>
            </Box>
        );
    };

    openModal = wish => this.setState({ wish });

    closeModal = () => this.setState({ wish: null });

    updateWish = (id, key, value) => client.mutate({
        mutation: gql`
        mutation {
            update_wishes_help_item(where: {id: {_eq: "${id}"}}, _set: {${key}: "${value}"}) {
                returning {
                    id
                }
            }
        }
    `
    });

    newWish = () => client.mutate({
        mutation: gql`
        mutation {
            insert_wishes_help_item(objects: {owner: "${auth.user_id}"}) {
                returning {
                    id
                }
            }
        }
    `
    });

    edit = key => {
        const { wish } = this.state;

        return e => {
            wish[key] = e.target.value;
            this.setState({ wish });
            this.updateWish(wish.id, key, e.target.value);
        };
    };

    deleteWish = async id => client.mutate({
        mutation: gql`
        mutation {
            delete_wishes_help_item(where: { id: { _eq: "${id}" } }) {
                returning {
                    id
                }
            }
        }
    `
    });

}

export default WishHelpTab1;

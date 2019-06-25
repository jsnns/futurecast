import React from "react";
// noinspection ES6CheckImport
import PropTypes from "prop-types";

import { auth } from "../../../routes";
import { client } from "../../../apollo";
import gql from "graphql-tag";
import { Subscription } from "react-apollo";

import { Box, Heading, TextInput, DataTable, CheckBox } from "grommet";
import { Dialog } from "../../shared/Dialog";

const GET_SUBSCRIPTIONS = gql`
    subscription {
        wishes_help_item {
            id
            owner
            category
        }
    }
`;


const EditWishHelpModal = ({ onClose, edit, wish }) => {

    if (!wish) return <div />;

    return (
        <Dialog open={!!wish} onClose={onClose}>
            <Box pad="small">

                {/* Editable Header */}
                <TextInput
                    plain
                    style={{ fontFamily: "Alegreya", fontSize: "24pt" }}
                    value={wish.name}
                    placeholder="Name"
                    onChange={edit("name")}
                />

                <Box pad="small" gap="small">
                    <Box flex={"grow"} gap={"small"}>
                        <Heading level={4} margin={"none"}>
                            Price
            </Heading>
                        <TextInput
                            value={wish.price}
                            onChange={edit("price")}
                        />
                    </Box>
                </Box>

                <Box pad="small" gap="small">
                    <Box flex={"grow"} gap={"small"}>
                        <Heading level={4} margin={"none"}>
                            Category
            </Heading>
                        <TextInput
                            value={wish.category}
                            onChange={edit("category")}
                        />
                    </Box>
                </Box>



                <Box pad="small" gap="small">
                    <Box flex={"grow"} gap={"small"}>
                        <Heading level={4} margin={"none"}>
                            Uesfulness
            </Heading>
                        <TextInput
                            value={wish.usefulness}
                            onChange={edit("usefulness")}
                        />
                    </Box>
                </Box>
                <Box pad="small" gap="small">
                    <Box flex={"grow"} gap={"small"}>
                        <Heading level={4} margin={"none"}>
                            Durability
            </Heading>
                        <TextInput
                            value={wish.duraility}
                            onChange={edit("durability")}
                        />
                    </Box>
                </Box>

                <Subscription subscription={GET_SUBSCRIPTIONS}>
                    {({ loading, error, data }) => {
                        if (loading) return "Loading...";
                        if (error) return `Error! ${error.message}`;

                        return <DataTable
                            primaryKey={"id"}
                            sortable={true}
                            columns={[
                                {
                                    header: "category",
                                    property: "category"
                                }
                            ]}
                            data={data.wishes_help_item}
                        />;
                    }}
                </Subscription>
            </Box>
        </Dialog>
    );
};

EditWishHelpModal.propTypes = {
    wish: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired
};

export default EditWishHelpModal;

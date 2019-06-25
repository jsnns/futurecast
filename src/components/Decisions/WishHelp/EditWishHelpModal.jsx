import React from "react";
import PropTypes from "prop-types";

import { Box, Heading, TextInput } from "grommet";
import { Dialog } from "../../_shared_/Dialog";

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

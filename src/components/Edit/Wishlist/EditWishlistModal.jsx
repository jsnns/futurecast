import React from "react";
import PropTypes from "prop-types";

import { Box, CheckBox, Heading, TextInput } from "grommet";
import { Dialog } from "../../shared/Dialog";

const EditWishlistModal = ({ onClose, edit, wish }) => {

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

                {/* Fields */}
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
                    <Box flex={"grow"} gap={"small"}>
                        <Heading level={4} margin={"none"}>
                            Category
                        </Heading>
                        <TextInput
                            value={wish.category}
                            onChange={edit("category")}
                        />
                    </Box>

                    <Box pad={"small"} gap={"small"}>
                        <Heading level={4} margin={"none"}>
                            Usefulness
                        </Heading>
                        <TextInput type={"number"} value={wish.usefulness} onChange={edit("usefulness")} />
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
};

EditWishlistModal.propTypes = {
    wishes: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired
};

export default EditWishlistModal;

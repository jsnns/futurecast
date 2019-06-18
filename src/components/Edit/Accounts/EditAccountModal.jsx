import React from "react";
import PropTypes from "prop-types";

import {Box, Heading, TextInput} from "grommet";
import {Dialog} from "../../shared/Dialog";

const EditAccountModal = ({account, edit, onClose}) => {

    if (!account) return <div/>;

    return (
        <Dialog open={!!account} onClose={onClose}>
                <Box pad="small">
                    <TextInput
                        plain
                        style={{fontFamily: "Alegreya", fontSize: "24pt"}}
                        value={account.name}
                        placeholder="Name"
                        onChange={edit("name")}
                    />

                    <Box pad="small" gap="small">
                        <Box flex={"grow"} gap={"small"}>
                            <Heading level={4} margin={"none"}>
                                Balance
                            </Heading>
                            <TextInput
                                value={account.balance}
                                onChange={edit("balance")}
                            />
                        </Box>
                    </Box>
                </Box>
        </Dialog>
    );
};

EditAccountModal.propTypes = {
    account: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired
};

export default EditAccountModal;

import React, {Component} from "react";
import PropTypes from "prop-types";

import {Modal} from "@material-ui/core";
import {Box, Heading, TextInput} from "grommet";

class EditAccountModal extends Component {
    render() {
        const {account, edit, onClose} = this.props;

        if (!account) return <div/>;

        return (
            <Modal open={!!account} onClose={onClose}>
                <Box
                    margin={{
                        top: "medium",
                        bottom: "medium",
                        left: "xlarge",
                        right: "xlarge"
                    }}
                    pad="small"
                    background="dark-1"
                    round
                    elevation="large"
                    gap="small"
                >
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
                </Box>
            </Modal>
        );
    }
}

EditAccountModal.propTypes = {
    account: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired
};

export default EditAccountModal;

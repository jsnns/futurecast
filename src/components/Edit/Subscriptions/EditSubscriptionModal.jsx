import React, {Component} from "react";
import PropTypes from "prop-types";

import {Modal} from "@material-ui/core";
import {Box, CheckBox, Heading, TextInput} from "grommet";

class EditSubscriptionModal extends Component {
    render() {
        const {subscription, edit, onClose} = this.props;

        if (!subscription) return <div/>;

        return (
            <Modal open={!!subscription} onClose={onClose}>
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
                            value={subscription.name}
                            placeholder="Name"
                            onChange={edit("name")}
                        />
                        <Box pad="small" gap="small">
                            <Box flex={"grow"} gap={"small"}>
                                <Heading level={4} margin={"none"}>
                                    Price
                                </Heading>
                                <TextInput
                                    value={subscription.price}
                                    onChange={edit("price")}
                                />
                            </Box>
                            <Box flex={"grow"} gap={"small"}>
                                <Heading level={4} margin={"none"}>
                                    Category
                                </Heading>
                                <TextInput
                                    value={subscription.category}
                                    onChange={edit("category")}
                                />
                            </Box>
                        </Box>
                        <Box pad={"small"} gap={"small"}>
                            <Heading level={4} margin={"none"}>
                                Yearly
                            </Heading>
                            <CheckBox checked={subscription.yearly} onChange={({target}) => edit("yearly")({target: {value: target.checked}})} />
                        </Box>
                        <Box pad={"small"} gap={"small"}>
                            <Heading level={4} margin={"none"}>
                                Usefulness
                            </Heading>
                            <TextInput type={"number"} value={subscription.usefulness} onChange={edit("usefulness")} />
                        </Box>
                    </Box>
                </Box>
            </Modal>
        );
    }
}

EditSubscriptionModal.propTypes = {
    subscription: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired
};

export default EditSubscriptionModal;

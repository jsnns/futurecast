import React, {Component} from "react";
import PropTypes from "prop-types";

import {Modal} from "@material-ui/core";
import {Box, Heading, TextInput} from "grommet";

class EditTransactionModal extends Component {
    update = key => {
        return this.props.onEdit(key);
    };

    render() {
        const {transaction} = this.props;

        if (!transaction) return <div/>;

        return (
            <Modal open={!!transaction} onClose={this.props.onClose}>
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
                            value={transaction.name}
                            placeholder="Name"
                            onChange={this.update("name")}
                        />
                        <Box pad="small" gap="small">
                            <Box flex={"grow"} gap={"small"}>
                                <Heading level={4} margin={"none"}>
                                    Value
                                </Heading>
                                <TextInput
                                    value={transaction.value}
                                    placeholder="Value"
                                    onChange={this.update("value")}
                                />
                            </Box>
                            <Box flex={"grow"} gap={"small"}>
                                <Heading level={4} margin={"none"}>
                                    Category
                                </Heading>
                                <TextInput
                                    value={transaction.category}
                                    placeholder="Category"
                                    onChange={this.update("category")}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box pad="small">
                        <Box pad="small" direction="row" gap="small">
                            <Box flex={"grow"} gap={"small"}>
                                <Heading level={4} margin={"none"}>
                                    Start Date
                                </Heading>
                                <TextInput
                                    defaultValue={transaction.start}
                                    placeholder="yyyy-mm-dd"
                                    onChange={this.update("start")}
                                />
                            </Box>
                            <Box flex={"grow"} gap={"small"}>
                                <Heading level={4} margin={"none"}>
                                    End Date
                                </Heading>
                                <TextInput
                                    defaultValue={transaction.end}
                                    placeholder="yyyy-mm-dd"
                                    onChange={this.update("end")}
                                />
                            </Box>
                        </Box>
                        <Box pad="small" direction="row" gap="small">
                            <Box flex={"grow"} gap={"small"}>
                                <Heading level={4} margin={"none"}>
                                    Interval Days
                                </Heading>
                                <TextInput
                                    defaultValue={transaction.interval_days}
                                    placeholder="Days"
                                    onChange={this.update("interval_days")}
                                />
                            </Box>
                            <Box flex={"grow"} gap={"small"}>
                                <Heading level={4} margin={"none"}>
                                    Interval Months
                                </Heading>
                                <TextInput
                                    defaultValue={transaction.interval_months}
                                    placeholder="Months"
                                    onChange={this.update("interval_months")}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        );
    }
}

EditTransactionModal.propTypes = {
    transaction: PropTypes.object,
    onClose: PropTypes.func.isRequired
};

export default EditTransactionModal;

import React from "react";
import PropTypes from "prop-types";

import {Box, Heading, TextInput} from "grommet";
import {Dialog} from "../../shared/Dialog";

const EditTransactionModal = ({ transaction, onClose, update }) => {

	if (!transaction) return <div/>;

	return (
		<Dialog onClose={onClose} open={!!transaction}>
            <Box pad="small">

                {/* Name Header */}
                <TextInput
                    plain
                    style={{fontFamily: "Alegreya", fontSize: "24pt"}}
                    value={transaction.name}
                    placeholder="Name"
                    onChange={update("name")}
                />

                {/* First Row of Fields */}
                <Box pad="small" gap="small">
                    <Box flex={"grow"} gap={"small"}>
                        <Heading level={4} margin={"none"}>
                            Value
                        </Heading>
                        <TextInput
                            value={transaction.value}
                            placeholder="Value"
                            onChange={update("value")}
                        />
                    </Box>
                    <Box flex={"grow"} gap={"small"}>
                        <Heading level={4} margin={"none"}>
                            Category
                        </Heading>
                        <TextInput
                            value={transaction.category}
                            placeholder="Category"
                            onChange={update("category")}
                        />
                    </Box>
                </Box>

                {/* Second Row of Fields */}
                <Box pad="small" direction="row" gap="small">
                    <Box flex={"grow"} gap={"small"}>
                        <Heading level={4} margin={"none"}>
                            Start Date
                        </Heading>
                        <TextInput
                            defaultValue={transaction.start}
                            placeholder="yyyy-mm-dd"
                            onChange={update("start")}
                        />
                    </Box>
                    <Box flex={"grow"} gap={"small"}>
                        <Heading level={4} margin={"none"}>
                            End Date
                        </Heading>
                        <TextInput
                            defaultValue={transaction.end}
                            placeholder="yyyy-mm-dd"
                            onChange={update("end")}
                        />
                    </Box>
                </Box>

                {/* Second Row of Fields */}
                <Box pad="small" direction="row" gap="small">
                    <Box flex={"grow"} gap={"small"}>
                        <Heading level={4} margin={"none"}>
                            Interval Days
                        </Heading>
                        <TextInput
                            defaultValue={transaction.interval_days}
                            placeholder="Days"
                            onChange={update("interval_days")}
                        />
                    </Box>
                    <Box flex={"grow"} gap={"small"}>
                        <Heading level={4} margin={"none"}>
                            Interval Months
                        </Heading>
                        <TextInput
                            defaultValue={transaction.interval_months}
                            placeholder="Months"
                            onChange={update("interval_months")}
                        />
                    </Box>
                </Box>
            </Box>
		</Dialog>
	);
};

EditTransactionModal.propTypes = {
	transaction: PropTypes.object,
	onClose: PropTypes.func.isRequired
};

export default EditTransactionModal;

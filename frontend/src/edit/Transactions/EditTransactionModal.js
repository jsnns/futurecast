import React, { Component } from "react";
import PropTypes from "prop-types";

import { Modal } from "@material-ui/core";
import { Box, TextInput } from "grommet";

class EditTransactionModal extends Component {
	update = key => {
		return this.props.onEdit(key);
	};

	render() {
		const { transaction } = this.props;

		if (!transaction) return <div />;

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
							style={{ fontFamily: "Alegreya", fontSize: "24pt" }}
							value={transaction.name}
							placeholder="Name"
							onChange={this.update("name")}
						/>
						<Box pad="small" gap="small">
							<TextInput
								value={transaction.value}
								placeholder="Value"
								onChange={this.update("value")}
							/>
							<TextInput
								value={transaction.category}
								placeholder="Category"
								onChange={this.update("category")}
							/>
						</Box>
					</Box>
					<Box pad="small">
						<Box pad="small" direction="row" gap="small">
							<TextInput
								defaultValue={transaction.start}
								placeholder="Start"
								onChange={this.update("start")}
							/>
							<TextInput
								defaultValue={transaction.end}
								placeholder="End"
								onChange={this.update("end")}
							/>
						</Box>
						<Box pad="small" direction="row" gap="small">
							<TextInput
								defaultValue={transaction.interval_days}
								placeholder="Days"
								onChange={this.update("interval_days")}
							/>
							<TextInput
								defaultValue={transaction.interval_months}
								placeholder="Months"
								onChange={this.update("interval_months")}
							/>
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

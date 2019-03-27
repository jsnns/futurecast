import React, { Component } from "react";
import PropTypes from "prop-types";
import EditTxSchedule from "./EditSchedule";

import { Modal } from "@material-ui/core";
import { Box, Button, TextInput } from "grommet";

class EditTransactionModal extends Component {
  constructor(props) {
    super(props);

    this.update = this.update.bind(this);
  }

  update(key) {
    return this.props.onEdit(key);
  }

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
              <TextInput
                value={transaction.monthly_value}
                placeholder="Monthly Value"
                onChange={this.update("monthly_value")}
              />
            </Box>
          </Box>
          <EditTxSchedule
            updateSchedule={this.update("schedule")}
            schedule={transaction.schedule}
          />
          <Box pad="medium" justify="center" width="1/3" direction="row">
            <Button
              label="Submit"
              onClick={() => this.props.onSubmit(transaction)}
            />
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

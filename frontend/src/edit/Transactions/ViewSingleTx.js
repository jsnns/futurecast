import React, { Component } from "react";

import { deleteTransaction } from "../../api";
import { Box, Text, Button } from "grommet";
import { Close } from "grommet-icons";
import OutsideAlerter from "../../components/OutsideClickAlerter";

import "../../wiggle.css";
import AsyncButton from "../../components/AsyncButton";

class ViewSingleTx extends Component {
  constructor() {
    super();
    this.state = { wiggleDelete: false };
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleButtonRelease = this.handleButtonRelease.bind(this);
    this.clearWiggle = this.clearWiggle.bind(this);
    this.trashTransaction = this.trashTransaction.bind(this);
  }

  clearWiggle() {
    this.setState({ wiggleDelete: false });
  }

  handleButtonPress() {
    this.buttonPressTimer = setTimeout(
      () => this.setState({ wiggleDelete: true }),
      1500
    );
  }

  handleButtonRelease() {
    clearTimeout(this.buttonPressTimer);
    if (!this.state.wiggleDelete) {
      this.props.openEditModal(this.props.tx);
    }
  }

  async trashTransaction() {
    const { tx } = this.props;
    return deleteTransaction(tx._id.$oid);
  }

  render() {
    const { tx, refresh } = this.props;
    const { wiggleDelete } = this.state;

    return (
      <OutsideAlerter onClick={this.clearWiggle}>
        <Box
          pad={{
            top: "medium",
            bottom: "small",
            left: "medium",
            right: "medium"
          }}
          className={wiggleDelete ? "wiggle" : ""}
          background={tx.value > 0 ? "status-ok" : "status-critical"}
          elevation="small"
          margin="small"
          onMouseDown={this.handleButtonPress}
          onMouseUp={this.handleButtonRelease}
          round
        >
          <AsyncButton
            icon={<Close />}
            shown={this.state.wiggleDelete}
            onClick={this.trashTransaction}
            done={refresh}
            top={-125}
            left={90}
          />
          <Text
            margin={{ bottom: "xsmall" }}
            style={{
              fontFamily: "Abril Fatface",
              fontSize: "22pt",
              opacity: 0.99
            }}
          >
            ${Math.abs(tx.value)}
          </Text>
          <Text style={{ fontFamily: "Alegreya", fontSize: "16pt" }}>
            {tx.name}
          </Text>
          <Text style={{ fontFamily: "Lato", fontSize: "10pt", opacity: 0.7 }}>
            {(tx.category || "").toUpperCase()}
          </Text>
        </Box>
      </OutsideAlerter>
    );
  }
}

export default ViewSingleTx;

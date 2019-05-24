import React, { Component } from "react";

import { Box, Text } from "grommet";
import { Close } from "grommet-icons";

import "../../../styles/wiggle.css";
import OutsideAlerter from "../../shared/OutsideClickAlerter";
import AsyncButton from "../../shared/AsyncButton";
import { client } from "../../../routes";
import gql from "graphql-tag";

class ViewSingleTx extends Component {
	constructor(props) {
		super(props);
		this.state = {
			wiggleDelete: false,
			error: null
		};

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
			this.props.openEditModal(this.props.transaction);
		}
	}

	async trashTransaction() {
		const { transaction } = this.props;
		const DELETE_TRANSACTION = gql`
      mutation {
        delete_transactions(where: { id: { _eq: "${transaction.id}" } }) {
          returning {
            id
          }
        }
      }
    `;
		return client.mutate({ mutation: DELETE_TRANSACTION });
	}

	render() {
		const { refresh, transaction } = this.props;
		const { wiggleDelete, error } = this.state;

		if (error) return JSON.stringify(error);
		if (transaction === null) return "loading";

		return (
			<OutsideAlerter onClick={this.clearWiggle}>
				<Box
					pad="medium"
					elevation="medium"
					margin="7px"
					className={wiggleDelete ? "wiggle" : ""}
					background={
						!transaction.value
							? "dark-2"
							: transaction.value > 0
							? "status-ok"
							: "status-critical"
					}
					onMouseDown={this.handleButtonPress}
					onMouseUp={this.handleButtonRelease}
					round
				>
					<AsyncButton
						icon={<Close />}
						shown={this.state.wiggleDelete}
						onClick={this.trashTransaction}
					/>
					<Text
						margin={{ bottom: "xsmall" }}
						style={{
							fontFamily: "Abril Fatface",
							fontSize: "22pt",
							opacity: 0.99
						}}
					>
						${Math.abs(transaction.value)}
					</Text>
					<Text style={{ fontFamily: "Alegreya", fontSize: "16pt" }}>
						{transaction.name}
					</Text>
					<Text
						style={{
							fontFamily: "Lato",
							fontSize: "10pt",
							opacity: 0.7
						}}
					>
						{(transaction.category || "").toUpperCase()}
					</Text>
				</Box>
			</OutsideAlerter>
		);
	}
}

export default ViewSingleTx;

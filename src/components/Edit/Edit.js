import React, { Component } from "react";

import { Box } from "grommet";

import EditTransactions from "./Transactions/Transactions";
import EditAccounts from "./Accounts/Accounts";
import DashboardWidget from "../shared/DashboardWidget";
import Subscriptions from "./Subscriptions/Subscriptions";
import Header from "../shared/Header";


class Edit extends Component {
	state = {
		txs: [],
		schedule: {},
		accounts: [],
		edit: 0
	};

	changeSchedule(key, interval) {
		if (interval) {
			return value => {
				const { selected } = this.state;
				if (!selected.schedule.interval) selected.schedule.interval = {};

				selected.schedule.interval[key] = Number(value.target.value);
				this.setState({ selected });
			};
		}
		return value => {
			const { selected } = this.state;
			if (!selected.schedule) selected.schedule = {};
			selected.schedule[key] = value;
			this.setState({ selected });
		};
	}

	render() {
		const { selected } = this.state;

		if (selected) {
			if (!selected.schedule) {
				selected.schedule = {};
			}
			if (!selected.schedule.start) {
				selected.schedule.start = 0;
			}
		}

		return (
			<Box>
				<Header></Header>
				<Box direction="row-responsive">
					<DashboardWidget title="Transactions" basis="1/2">
						<EditTransactions />
					</DashboardWidget>
					<DashboardWidget title="Accounts" basis="1/2">
						<EditAccounts />
					</DashboardWidget>
				</Box>
				<Box direction="row-responsive">
					<DashboardWidget title="Subscriptions" basis={"1/2"}>
						<Subscriptions />
					</DashboardWidget>
				</Box>
			</Box>
		);
	}
}

export default Edit;

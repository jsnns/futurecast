import React from "react";

import Budget from "./components/Widgit/Budget";
import Balance from "./components/Widgit/Balance";
import Bills from "./components/Widgit/Bills";
import Ask from "./components/Widgit/Ask";

import { Box } from "grommet";

import "./styles/fonts.css";
import DashboardWidget from "./components/shared/DashboardWidget";
import Subscriptions from "./components/Widgit/Subscriptions";
import Header from "./components/shared/Header";

const Report = () => {
	return (
		<Box pad="none">
			<Header></Header>


			<Box direction="row-responsive" wrap>
				<Box basis="2/3" flex="grow" >
					<DashboardWidget title="Balance" basis="auto" >
						<Balance />
					</DashboardWidget>
					<DashboardWidget title="Bills" basis="auto">
						<Bills />
					</DashboardWidget>
				</Box>

				<Box basis="1/3" >
					<DashboardWidget title="Ask" basis="auto">
						<Ask />
					</DashboardWidget>
					<DashboardWidget title="Budget" basis="auto">
						<Budget />
					</DashboardWidget>
					<DashboardWidget title="Subscriptions" basis="auto">
						<Subscriptions />
					</DashboardWidget>
				</Box>
			</Box>
		</Box>
	);
};

export default Report;

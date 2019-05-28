import React from "react";

import Budget from "./components/Widgit/Budget";
import Balance from "./components/Widgit/Balance";
import Bills from "./components/Widgit/Bills";
import Ask from "./components/Widgit/Ask";
import Stats from "./components/Widgit/Stats";

import { Box, Button } from "grommet";
import { Edit as EditIcon, Refresh } from "grommet-icons";

import "./styles/fonts.css";
import DashboardWidget from "./components/shared/DashboardWidget";

const Report = () => {
	return (
		<Box>
			<Stats />

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
				</Box>
			</Box>
		</Box>
	);
};

export default Report;

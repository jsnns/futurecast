import React from "react";

import Budget from "./components/Widgit/Budget";
import Balance from "./components/Widgit/Balance";
import Bills from "./components/Widgit/Bills";
import Ask from "./components/Widgit/Ask";
import Stats from "./components/Widgit/Stats";

import {Box, Button} from "grommet";

import "./styles/fonts.css";
import DashboardWidget from "./components/shared/DashboardWidget";
import {Edit as EditIcon, Logout, UserSettings} from "grommet-icons/es6";
import {auth} from "./routes";

const Report = () => {
	return (
		<Box pad="none">
			<Box direction={"row-responsive"} pad={"medium"}>
				<Box flex={"grow"}>
					<Stats />
				</Box>
				<Box direction="row" alignSelf="center" gap={"small"}>
					<Button primary icon={<EditIcon />} label="Edit" href="/edit" />
					<Button primary icon={<UserSettings />} label='Profile' href='/profile' />
					<Button primary icon={<Logout />} label='logout' onClick={auth.logout} />
				</Box>
			</Box>


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

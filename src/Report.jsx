import React from "react";

import Budget from "./components/Dashboard/Budget";
import Balance from "./components/Dashboard/Balance";
import Bills from "./components/Dashboard/Bills";

import { Box } from "grommet";

import DashboardWidget from "./components/_shared_/DashboardWidget";
import Subscriptions from "./components/Dashboard/Subscriptions";
import Header from "./components/_shared_/Header";
import DashboardSection from "./components/_shared_/DashboardSection";
import DownloadTransactions from "./components/_shared_/DownloadTransactions";

const Report = () => {
  return (
    <Box pad="none">
      <Header/>
      <Box direction="row-responsive" wrap>

        <DownloadTransactions />

        <DashboardSection direction={"column"} basis={"1/3"}>
          <DashboardWidget title="Budget" basis="1/1">
            <Budget/>
          </DashboardWidget>

          <DashboardWidget title="Subscriptions" basis="1/1">
            <Subscriptions/>
          </DashboardWidget>
        </DashboardSection>

        <DashboardSection direction={"column"} basis={"2/3"}>
          <DashboardWidget title="Balance" basis="1/1">
            <Balance/>
          </DashboardWidget>
          <DashboardWidget title="Bills" basis="1/1">
            <Bills/>
          </DashboardWidget>
        </DashboardSection>
      </Box>
    </Box>
  );
};

export default Report;

import React from "react";

import Budget from "./components/Widgit/Budget";
import Balance from "./components/Widgit/Balance";
import Bills from "./components/Widgit/Bills";
import Wishlist from "./components/Widgit/WishList";


import { Box } from "grommet";

import "./styles/fonts.css";
import DashboardWidget from "./components/shared/DashboardWidget";
import Subscriptions from "./components/Widgit/Subscriptions";
import Header from "./components/shared/Header";
import DashboardSection from "./components/shared/DashboardSection";

const Report = () => {
  return (
    <Box pad="none">
      <Header />
      <Box direction="row-responsive" wrap>

        <DashboardSection direction={"column"} basis={"1/3"}>
          <DashboardWidget title="Budget" basis="1/1">
            <Budget />
          </DashboardWidget>

          <DashboardWidget title="Subscriptions" basis="1/1">
            <Subscriptions />
          </DashboardWidget>
        </DashboardSection>

        <DashboardSection direction={"column"} basis={"2/3"}>
          <DashboardWidget title="Balance" basis="1/1">
            <Balance />
          </DashboardWidget>
          <DashboardWidget title="Bills" basis="1/1">
            <Bills />
          </DashboardWidget>
          <DashboardWidget title="WishList" basis="1/1">
            <Wishlist />
          </DashboardWidget>
        </DashboardSection>
      </Box>
    </Box>
  );
};

export default Report;

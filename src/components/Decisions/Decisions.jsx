import React, { Component } from "react";

import { Box } from "grommet";
import Header from "../_shared_/Header";
import WishHelp from "./Wishes/Wishes";
import Ask from "./Ask";
import DashboardWidget from "../_shared_/DashboardWidget";
import SavingsCalculator from "./SavingsCalculator/SavingsCalculator";


class Decisions extends Component {
  render() {
    return (
      <Box>
        <Header></Header>
        <Box direction="row-responsive">
          <DashboardWidget title="Ask" basis="1/3">
            <Ask/>
          </DashboardWidget>
          <DashboardWidget title="Wish Help" basis="2/3">
            <WishHelp/>
          </DashboardWidget>
        </Box>
        <Box direction="row-responsive">
          <DashboardWidget title="Savings Calculator" basis="2/3">
            <SavingsCalculator/>
          </DashboardWidget>
        </Box>
      </Box>
    );
  }
}

export default Decisions;
import React, { Component } from "react";
import { Box, Tab, Tabs } from "grommet";
import WishHelpTab1 from "./WishHelpTab1";
import WishHelpTab2 from "./WishHelpTab2";

class WishHelp extends Component {
  render() {
    return (
      <Box>
        <Tabs>
          <Tab title='tab 1'>
            <WishHelpTab1/>
          </Tab>
          <Tab title='tab 2'>
            <WishHelpTab2/>
          </Tab>
        </Tabs>
      </Box>
    );
  }
}

export default WishHelp;

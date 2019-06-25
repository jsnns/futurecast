import React, { Component } from "react";

import { Box } from "grommet";
import Header from "../shared/Header"
import WishHelp from "./WishHelp/WishHelp";
import Ask from "./Ask";
import DashboardWidget from "../shared/DashboardWidget";


class Decisions extends Component {
    render() {
        return (
            <Box>
                <Header></Header>
                <Box direction="row-responsive">
                    <DashboardWidget title="Ask" basis="1/3">
                        <Ask />
                    </DashboardWidget>
                    <DashboardWidget title="Wish Help" basis="2/3">
                        <WishHelp />
                    </DashboardWidget>
                </Box>
            </Box>
        )
    }
}

export default Decisions;
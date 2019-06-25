import React, { Component } from "react";

import { Box } from "grommet";
import Header from "../_shared_/Header"
import WishHelp from "./WishHelp/WishHelp";
import Ask from "./Ask";
import DashboardWidget from "../_shared_/DashboardWidget";


class Decisions extends Component {
    render() {
        return (
            <Box>
                <Header></Header>
                <Box direction="row-responsive">
                    <DashboardWidget title="Ask" basis="1/2">
                        <Ask />
                    </DashboardWidget>
                    <DashboardWidget title="Wish Help" basis="1/2">
                        <WishHelp />
                    </DashboardWidget>
                </Box>
            </Box>
        )
    }
}

export default Decisions;
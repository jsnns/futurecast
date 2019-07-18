import React, {Component} from "react";

import {Box, Tabs, Tab} from "grommet";
import Header from "../_shared_/Header";
import WishHelp from "./Wishes/Wishes";
import DashboardWidget from "../_shared_/DashboardWidget";
import SavingsCalculator from "./SavingsCalculator/SavingsCalculator";
import EditGraphql from "../Edit/EditGraphql";
import wishes from "../Edit/types/wishes";


class Decisions extends Component {
    render() {
        return (
            <Box>
                <Header/>
                <Box direction="row-responsive">

                    <DashboardWidget title="Wish Help" basis="2/3">
                        <Tabs>
                            <Tab title="Edit">
                                <Box pad={"small"}>
                                    <EditGraphql
                                        table="wishes"
                                        subscription={wishes.query}
                                        columns={wishes.columns}
                                        fields={wishes.fields}
                                    />
                                </Box>
                            </Tab>
                            <Tab title="Analysis">
                                <Box pad={"small"}>
                                    <WishHelp/>
                                </Box>
                            </Tab>
                        </Tabs>
                    </DashboardWidget>

                    <DashboardWidget title="Savings Calculator" basis="2/3">
                        <SavingsCalculator/>
                    </DashboardWidget>
                </Box>
            </Box>
        );
    }
}

export default Decisions;
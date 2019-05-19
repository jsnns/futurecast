import React from "react";

import Budget from "./pods/Budget";
import Balance from "./pods/Balance";
import Bills from "./pods/Bills";

import { Box, Button } from "grommet";
import { Edit as EditIcon, Refresh } from "grommet-icons";
import { update } from "./api";

import "./css.css";
import DashboardWidget from "./components/DashboardWidget";
import Ask from "./pods/Ask";
import Runway from "./pods/Runway";

const Report = () => {
  const reload = () => window.location.reload();

  return (
    <Box>
      <Box pad="small" direction="column">
        <Box direction="row" gap="small">
          <Button icon={<EditIcon />} label="Edit" href="/edit" />
          <Button
            icon={<Refresh />}
            label="Refresh"
            onClick={() => {
              update().then(reload);
            }}
          />
        </Box>

        <Box direction="row-responsive" wrap>
          <Box basis="2/3" flex="grow">
            <DashboardWidget title="Balance" basis="auto">
              <Balance />
            </DashboardWidget>
            <DashboardWidget title="Runway" basis="auto">
              <Runway />
            </DashboardWidget>
          </Box>

          <Box basis="1/3">
            <DashboardWidget title="Ask" basis="auto">
              <Ask />
            </DashboardWidget>
            <DashboardWidget title="Budget" basis="auto">
              <Budget />
            </DashboardWidget>
            <DashboardWidget title="Bills" basis="auto">
              <Bills />
            </DashboardWidget>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Report;

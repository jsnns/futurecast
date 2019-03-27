import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router";

import Budget from "./pods/Budget";
import Balance from "./pods/Balance";
import StatsTables from "./pods/Stats";
import Bills from "./pods/Bills";
import Edit from "./edit";

import { Box, Grommet, Button } from "grommet";
import { Edit as EditIcon, Refresh } from "grommet-icons";
import { update } from "./api";

import "./css.css";
import DashboardWidget from "./components/DashboardWidget";
import Ask from "./pods/Ask";
import Runway from "./pods/Runway";

const Report = ({ match, url }) => {
  return (
    <Box>
      <Box pad="none" direction="column">
        <Box>
          <Box direction="column" pad="none">
            <Box pad="small" direction="row" gap="small">
              <Button icon={<EditIcon />} label="Edit" href="/edit" />
              <Button
                icon={<Refresh />}
                label="Refresh"
                onClick={() => {
                  update().then(() => window.location.reload());
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box pad="small" direction="row-responsive" wrap>
          <Box>
            <DashboardWidget title="Balance" basis="auto">
              <Balance />
            </DashboardWidget>
            <DashboardWidget title="Runway" basis="auto">
              <Runway />
            </DashboardWidget>
          </Box>

          <Box>
            <DashboardWidget title="Ask" basis="1/4">
              <Ask />
            </DashboardWidget>
            <DashboardWidget title="Bills" basis="auto">
              <Bills />
            </DashboardWidget>
          </Box>

          <DashboardWidget title="Budget" basis="auto">
            <Budget />
          </DashboardWidget>
        </Box>
      </Box>
    </Box>
  );
};

class App extends Component {
  state = { url: process.env.REACT_APP_API_HOST };

  render() {
    console.log(this.state.url);
    return (
      <BrowserRouter>
        <Grommet plain={true} full>
          <StatsTables />
          <Route
            exact
            path="/"
            component={({ match }) => (
              <Report match={match} url={this.state.url} />
            )}
          />
          <Route exact path="/edit" component={Edit} />
        </Grommet>
      </BrowserRouter>
    );
  }
}

export default App;

import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router";

import Budget from "./pods/Budget";
import Balance from "./pods/Balance";
import StatsTables from "./pods/Stats";
import Bills from "./pods/Bills";
import Edit from "./edit";

import { Box, Grommet, Heading, Button } from "grommet";
import { Edit as EditIcon, Refresh } from "grommet-icons";
import { update } from "./api";

import "./css.css";
import DashboardWidget from "./components/DashboardWidget";

const Report = ({ match, url }) => {
  let report = match.params.report;

  return (
    <Grommet plain={true} full>
      <Box pad="none" margin="none" direction="column">
        <Box pad="none" margin="none">
          <Box direction="column" margin="none" pad="none">
            <StatsTables report={report} />
            <Box pad="small" direction="row">
              <Button icon={<EditIcon />} label="Edit" href="/edit" />
              <Button
                margin={{ left: "small" }}
                icon={<Refresh />}
                label="Refresh"
                onClick={() => {
                  update().then(() => window.location.reload());
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box margin="small" direction="row-responsive" wrap>
          <DashboardWidget title="Balance" basis="auto">
            <Balance report={report} />
          </DashboardWidget>
          <DashboardWidget title="Budget" basis="auto">
            <Budget report={report} />
          </DashboardWidget>
          <DashboardWidget title="Bills" basis="auto">
            <Bills report={report} />
          </DashboardWidget>
        </Box>
      </Box>
    </Grommet>
  );
};

class App extends Component {
  state = { url: process.env.REACT_APP_API_HOST };

  render() {
    console.log(this.state.url);
    return (
      <BrowserRouter>
        <div>
          <Route
            exact
            path="/"
            component={({ match }) => (
              <Report match={match} url={this.state.url} />
            )}
          />
          <Route exact path="/edit" component={Edit} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

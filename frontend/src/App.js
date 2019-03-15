import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router";

import Budget from "./pods/Budget";
import Balance from "./pods/Balance";
import StatsTables from "./pods/Stats";
import Bills from "./pods/Bills";
import Edit from "./edit";

import { Box, Grommet, Heading, Button } from "grommet";
import { Edit as EditIcon } from "grommet-icons";

import "./css.css";

const Report = ({ match, url }) => {
  let report = match.params.report;

  return (
    <Grommet plain>
      <Box pad="none" margin="none" direction="column" basis="full">
        <Box pad="none" margin="none">
          <Box direction="column" margin="none" pad="none">
            <StatsTables report={report} />
            <Box pad="small" direction="row">
              <Button icon={<EditIcon />} label="Edit" href="/edit" />
            </Box>
          </Box>
        </Box>
        <Box basis="full" direction="column">
          <Box margin="small">
            <Balance report={report} />
            <Budget report={report} />
            <Bills report={report} />
          </Box>
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

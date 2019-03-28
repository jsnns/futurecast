import React, { Component } from "react";
import { Grommet } from "grommet";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router";

import StatsTables from "./pods/Stats";
import Edit from "./edit";
import Report from "./Report";

import "./css.css";

class App extends Component {
  state = { url: process.env.REACT_APP_API_HOST };

  render() {
    console.log(this.state.url);
    return (
      <div style={{ overflowY: "scroll", WebkitOverflowScrolling: "touch" }}>
        <BrowserRouter>
          <Grommet plain={true} full>
            <StatsTables />
            <Route exact path="/" component={Report} />
            <Route exact path="/edit" component={Edit} />
          </Grommet>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

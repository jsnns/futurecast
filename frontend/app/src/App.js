import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import Budget from "./pods/Budget";
import Balance from "./pods/Balance";
import StatsTables from "./pods/Table";
import Bills from "./pods/Bills";

import "./css.css";

const Report = ({ match, url }) => {

  let report = match.params.report;
  let title = `Finances as of Today: ${report}`

  return (
    <div>
      <h1>{title}</h1>
      <div>
        <Balance report={report}/>
        <Budget report={report}/>
      </div>
      <div>
        <StatsTables report={report}/>
        <Bills report={report}/>
      </div>
    </div>
  )
}

class App extends Component {
  state = {url: process.env.REACT_APP_API_HOST}

  render() {
    console.log(this.state.url)
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/:report" component={({ match }) => <Report match={match} url={this.state.url}></Report>} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
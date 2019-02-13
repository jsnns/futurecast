import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import Budget from "./pods/Budget";
import Balance from "./pods/Balance";
import StatsTables from "./pods/Table";
import Bills from "./pods/Bills";

import "./css.css";

const Report = ({ match, url }) => {

  let report = "reality";
  let title = "Finances as of Today"
  if (match.params.year && match.params.month && match.params.day) {
    report = [match.params.year, match.params.month, match.params.day]
    title = `Finances as of ${report[0]}/${report[1]}/${report[2]}`
  }

  return (
    <div>
      <h1>{title}</h1>
      <div>
        <Balance url={url} time={report} />
        <Budget url={url} time={report} />
      </div>

      <StatsTables url={url} time={report} />
      <Bills url={url} time={report} />
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
          <Route exact path="/" component={({ match }) => <Report match={match} url={this.state.url}></Report>} />
          <Route path="/:year/:month/:day" component={({ match }) => <Report match={match} url={this.state.url}></Report>} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
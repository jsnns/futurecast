import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import Budget from "./pods/Budget";
import Balance from "./pods/Balance";
import StatsTables from "./pods/Table";

const Report = ({ match }) => {

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
        <Budget time={report}></Budget>
        <Balance time={report}></Balance>
      </div>

      <StatsTables time={report}></StatsTables> 
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Report} />
          <Route path="/:year/:month/:day" component={Report} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
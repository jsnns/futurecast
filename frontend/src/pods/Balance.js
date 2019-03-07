import React, { Component } from "react";
import { Line } from "react-chartjs";

import { getBalance } from "../api"

class Balance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      days: "180"
    };
    this.getData = this.getData.bind(this)
  }

  getData(days) {
    const { report } = this.props
    getBalance(report)
      .then(data => {
        const balances = data.map(day => {
          return day.balance
        }).slice(0, Number(days) || Infinity);
        const labels = data.map(day => {
          return day.day.substr(0, 11)
        }).slice(0, Number(days) || Infinity)
        this.setState({
          data: {
            labels: labels,
            datasets: [{
              label: "Balance",
              fillColor: "rgba(151,187,205,0.1)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(151,187,205,1)",
              data: balances
            }]
          }
        });
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentWillMount() {
    let days = "180"
    if (window.innerWidth < 755) {
      days = 14
      this.setState({
        mobile: true
      })
    }
    this.getData(days)
  }
  
  render() {
    const { data, mobile } = this.state;

    return (
      <div className="balance">
        <h2>Balances</h2>
        <select onChange={e => this.getData(e.target.value)}>
          <option value={0}></option>
          <option value={14}>2 Weeks</option>
          <option value={30}>1 Month</option>
          <option value={60}>2 Months</option>
          <option value={365}>1 Year</option>
        </select>
        <input onChange={(e) => this.getData(e.target.value)}></input>
        <Line
          update
          redraw
          data={data}
          style={{
            width: mobile ? window.innerWidth * .95 : window.innerWidth * .75,
            height: mobile ? 200 : 300
          }}
          options={{
            pointHitDetectionRadius: 1,
            bezierCurve: false,
            scaleBeginAtZero: true
          }} />
      </div>
    );
  }
}

export default Balance;
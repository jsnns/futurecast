import React, { Component } from "react";
import { Line } from "react-chartjs-2";

import { getBalance } from "../api";
import { Select, MenuItem, Input } from "@material-ui/core";

class Balance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      days: "180"
    };
    this.getData = this.getData.bind(this);
  }

  getData(days) {
    const { report } = this.props;
    getBalance(report)
      .then(data => {
        const balances = data
          .map(day => {
            return day.balance;
          })
          .slice(0, Number(days) || Infinity)
          .map(bal => bal.toFixed(0));
        const labels = data
          .map(day => {
            return day.day.substr(0, 11);
          })
          .slice(0, Number(days) || Infinity);
        this.setState({
          days,
          data: {
            labels: labels,
            datasets: [
              {
                label: "Balance",
                backgroundColor: "#1AB399",
                borderColor: "#99E6E6",
                pointRadius: 2,
                fill: false,
                lineTension: 0,
                data: balances
              }
            ]
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillMount() {
    let days = 60;
    if (window.innerWidth < 755) {
      days = 14;
      this.setState({
        mobile: true
      });
    }
    this.getData(days);
  }

  render() {
    const { data, mobile, days } = this.state;

    return (
      <div className="balance">
        <h2>Balances</h2>
        <Select value={days || 60} onChange={e => this.getData(e.target.value)}>
          <MenuItem value={60}>2 Months</MenuItem>
          <MenuItem value={14}>2 Weeks</MenuItem>
          <MenuItem value={30}>1 Month</MenuItem>
          <MenuItem value={365}>1 Year</MenuItem>
        </Select>
        <Input
          style={{ marginLeft: 10 }}
          onChange={e => this.getData(e.target.value)}
        />
        <Line
          data={data}
          width={mobile ? window.innerWidth * 0.95 : window.innerWidth * 0.75}
          height={mobile ? 200 : 300}
          options={{
            pointHitDetectionRadius: 1,
            bezierCurve: false,
            scaleBeginAtZero: true
          }}
        />
      </div>
    );
  }
}

export default Balance;

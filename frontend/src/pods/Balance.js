import React, { Component } from "react";
import { Line } from "react-chartjs-2";

import { getBalance } from "../api";
import { Box, Heading, Select, TextInput } from "grommet";

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
                pointRadius: 1,
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
      <Box basis="full" direction="column">
        <Box pad="none" height="none" direction="row">
          <Heading margin="none">Balance</Heading>
        </Box>
        <Box pad="small" height="none" direction="row">
          <Select
            options={[14, 30, 60, 365]}
            value={days || 60}
            onChange={e => this.getData(e.value)}
          />
          <TextInput
            style={{ marginLeft: 10 }}
            onChange={e => this.getData(e.target.value)}
          />
        </Box>
        <Box basis="full" direction="row" pad="small" height="medium">
          <Line
            data={data}
            options={{
              pointHitDetectionRadius: 1,
              bezierCurve: false,
              scaleBeginAtZero: true,
              maintainAspectRatio: false
            }}
          />
        </Box>
      </Box>
    );
  }
}

export default Balance;

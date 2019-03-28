import React, { Component } from "react";
import { Line } from "react-chartjs-2";

import { getBalance } from "../api";
import { Box, Text, RangeInput } from "grommet";

class Balance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      runwayData: {},
      mins: [],
      labels: [],
      days: "180",
      balanceQuery: null
    };
    this.getData = this.getData.bind(this);
  }

  async getData(days) {
    const { report } = this.props;
    const data = await getBalance(report);

    const balances = data
      .map(day => day.balance)
      .slice(0, Number(days) || Infinity)
      .map(bal => bal.toFixed(0));

    const mins = data
      .map(day => day.minimum)
      .slice(0, Number(days) || Infinity)
      .map(bal => bal.toFixed(0));

    const labels = data
      .map(day => day.day.substr(0, 11))
      .slice(0, Number(days) || Infinity);

    this.setState({
      days,
      mins,
      labels,
      data: {
        labels: labels,
        datasets: [
          {
            label: "Min Balance",
            backgroundColor: "#FF1A66",
            borderColor: "#FF1A66",
            pointRadius: 1,
            fill: false,
            lineTension: 0,
            data: mins
          },
          {
            label: "Balance",
            backgroundColor: "#1AB399",
            borderColor: "#1AB399",
            pointRadius: 1,
            fill: false,
            lineTension: 0,
            data: balances
          }
        ]
      }
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
    const { data, days } = this.state;

    return (
      <Box>
        <Box pad="small">
          <Text>Number of Days</Text>
          <Box pad="small">
            <RangeInput
              min={2}
              max={600}
              step={10}
              value={days}
              onChange={e => this.getData(e.target.value)}
            />
          </Box>
        </Box>
        <Box pad="small" height="medium" style={{ position: "relative" }}>
          <Line
            data={data}
            options={{
              pointHitDetectionRadius: 5,
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

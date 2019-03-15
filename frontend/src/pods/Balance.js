import React, { Component } from "react";
import { Line } from "react-chartjs-2";

import { getBalance } from "../api";
import { Box, Heading, Select, TextInput, Text } from "grommet";

class Balance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      mins: [],
      labels: [],
      days: "180",
      balanceQuery: null
    };
    this.getData = this.getData.bind(this);
    this.queryBalanceValue = this.queryBalanceValue.bind(this);
  }

  queryBalanceValue(value) {
    let mins = this.state.mins.filter(bal => bal >= Number(value));
    let index = this.state.mins.indexOf(mins[0]);

    if (index === -1) return this.setState({ balanceQuery: null });
    if (!value) return this.setState({ balanceQuery: null });

    this.setState({ balanceQuery: this.state.labels[index] });
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

    const zeros = data
      .map(day => day.zero_balance)
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
            label: "Minimum Balances",
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
          },
          {
            label: "Zero Balances",
            backgroundColor: "#E6FF80",
            borderColor: "#E6FF80",
            pointRadius: 1,
            fill: false,
            lineTension: 0,
            data: zeros
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
      <Box basis="full" direction="column">
        <Box pad="none" height="none" direction="row">
          <Heading margin="none">Balance</Heading>
        </Box>
        <Box pad="small" height="none" direction="row">
          <Box direction="row" pad={{ right: "medium" }}>
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
          <Box direction="row">
            <TextInput
              width="small"
              placeholder="Balance on Day"
              onChange={e => this.queryBalanceValue(e.target.value)}
            />
            <Text margin={{ left: "small" }}>
              {this.state.balanceQuery || ""}
            </Text>
          </Box>
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
import React, { Component } from "react";
import { Line } from "react-chartjs-2";

import { getBalance } from "../api";
import { Box, Heading, Select, TextInput, Text } from "grommet";

class Runway extends Component {
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

    const runway = data
      .map(day => day.runway_length)
      .slice(0, Number(days) || Infinity);

    const labels = data
      .map(day => day.day.substr(0, 11))
      .slice(0, Number(days) || Infinity);

    this.setState({
      days,
      labels,
      runwayData: {
        labels: labels,
        datasets: [
          {
            label: "Runway mos.",
            backgroundColor: "#3466e7",
            borderColor: "#3466e7",
            pointRadius: 1,
            fill: false,
            lineTension: 0,
            data: runway
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
    const { data, days, runwayData } = this.state;

    return (
      <Box>
        <Box direction="row-responsive" wrap>
          <Box pad="small" direction="row">
            <Select
              style={{ width: 200 }}
              options={[14, 30, 60, 365]}
              value={days || 60}
              onChange={e => this.getData(e.value)}
            />
            <Box width={200} pad={{ left: "small" }}>
              <TextInput
                placeholder="Days to Show"
                onChange={e => this.getData(e.target.value)}
              />
            </Box>
          </Box>
        </Box>
        <Box height="medium">
          <Line
            data={runwayData}
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

export default Runway;

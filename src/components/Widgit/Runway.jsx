import React, { Component } from "react";
import { Line } from "react-chartjs-2";

import { Box, RangeInput, Text } from "grommet";

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

    const data = [];
    // await getBalance(report);

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
    const { runwayData } = this.state;

    return (
      <Box>
        <Box pad="small">
          <Text>Number of Days</Text>
          <Box pad="small">
            <RangeInput
              min={2}
              max={600}
              step={10}
              value={this.state.days}
              onChange={e => this.getData(e.target.value)}
            />
          </Box>
        </Box>
        <Box pad="small" height="medium" style={{ position: "relative" }}>
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

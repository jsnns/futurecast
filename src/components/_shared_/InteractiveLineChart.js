import React from "react";
import { Line } from "react-chartjs-2";
import { Box, RangeInput, Text } from "grommet";
import { toCurrency } from "../../data/helpers";

const InteractiveLineChart = ({ value, updateValue, data }) => (
  <Box animation={{
    "type": "fadeIn",
    "delay": 0,
    "duration": 1000
  }}>
    <Box pad="small">
      <Text>Number of Days</Text>
      <Box pad="small">
        <RangeInput
          min={2}
          max={356 * 2}
          step={5}
          value={value}
          onChange={updateValue}
        />
      </Box>
    </Box>
    <Box height="medium" animation={{
      "type": "fadeIn",
      "delay": 1500,
      "duration": 1000
    }}>
      <Line
        data={data}
        options={{
          pointHitDetectionRadius: 5,
          bezierCurve: false,
          scaleBeginAtZero: true,
          maintainAspectRatio: false,
          tooltips: {},
          scales: {
            xAxes: [
              {
                type: "time",
                time: {
                  unit: "month"
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  // Include a dollar sign in the ticks
                  callback: toCurrency
                }
              }
            ]
          }
        }}
      />
    </Box>
  </Box>
);

export default InteractiveLineChart;

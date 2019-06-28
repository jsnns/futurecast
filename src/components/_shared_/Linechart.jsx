import React from "react";
import { Line } from "react-chartjs-2";
import { Box } from "grommet";
import { toCurrency } from "../../data/helpers";

const Linechart = ({ data }) => {
  return (
    <Box animation={{
      "type": "fadeIn",
      "delay": 0,
      "duration": 1000
    }}>
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
};

export default Linechart;

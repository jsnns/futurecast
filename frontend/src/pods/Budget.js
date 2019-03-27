import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

import { getBudget } from "../api";
import {
  Box,
  Heading,
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell
} from "grommet";

var colorArray = [
  "#FF6633",
  "#FFB399",
  "#FFFF99",
  "#E6B333",
  "#00B3E6",
  "#3366E6",
  "#FF33FF",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF"
];

class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      table: []
    };
  }
  componentWillMount() {
    if (window.innerWidth < 500) {
      this.setState({
        mobile: true
      });
    }
    const { report } = this.props;
    getBudget(report)
      .then(data => {
        let total = 0;
        let budgetCategories = data;
        let labels = [];
        let values = [];
        let colors = [];

        budgetCategories = budgetCategories
          .sort((a, b) => {
            return a[2] - b[2];
          })
          .forEach((category, i) => {
            total += category[2];
            values.push(Number((category[2] * 100).toFixed(2)));
            labels.push(category[0].toUpperCase());
            colors.push(colorArray[i]);
          });

        // values.push(Number(((1 - total) * 100).toFixed(2)));
        // labels.push("FREE");
        // colors.push("#fff");

        this.setState({
          data: {
            labels,
            datasets: [{ data: values, backgroundColor: colors }]
          },
          table: data.sort((a, b) => Number(a[1]) - Number(b[1]))
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const { data, table } = this.state;

    return (
      <Box>
        <Box wrap direction="row-responsive">
          <Box pad="small" basis="1/2" alignSelf="start" height="medium">
            <Pie
              data={data}
              options={{
                segmentStrokeWidth: 0,
                maintainAspectRatio: false,
                legend: {
                  position: "bottom"
                }
              }}
            />
          </Box>
          <Box pad="medium" direction="row" basis="1/2" justify="center">
            <Table>
              <TableBody>
                {table.map(row => (
                  <TableRow>
                    <TableCell
                      style={{
                        fontFamily: "Lato",
                        fontSize: "12pt",
                        textTransform: "uppercase",
                        opacity: 0.6
                      }}
                    >
                      {row[0]}
                    </TableCell>
                    <TableCell
                      style={{ fontFamily: "Abril Fatface", fontSize: "14pt" }}
                    >
                      {Math.abs(Number(row[1]))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Budget;

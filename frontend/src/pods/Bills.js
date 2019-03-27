import React, { Component } from "react";

import { getBills } from "../api";
import {
  Box,
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  Text,
  Heading,
  RangeInput
} from "grommet";

function numberWithCommas(x) {
  const isNegative = x < 0;
  const sign = isNegative ? "$ -" : "$ ";
  x = Math.abs(x);
  return sign + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class BillsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      days: 14
    };

    this.getData = this.getData.bind(this);
  }

  async getData(days) {
    this.setState({ days });
    let data = await getBills(days);
    data = data.sort((a, b) => {
      return a.date - b.date;
    });
    this.setState({ data });
  }

  componentWillMount() {
    this.getData(14);
  }

  render() {
    const { data } = this.state;
    return (
      <Box>
        <Box pad="small">
          <Text>Number of Days</Text>
          <Box
            pad={{
              left: "medium",
              right: "medium",
              top: "small",
              bottom: "small"
            }}
          >
            <RangeInput
              min={14}
              max={50}
              value={this.state.days}
              onChange={e => this.getData(e.target.value)}
            />
          </Box>
        </Box>
        <Box pad="small" fill>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Value</TableCell>
                <TableCell align="right">Date</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map(tx => {
                return (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {tx.name}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ fontFamily: "monospace", fontSize: 16 }}
                    >
                      <Text
                        color={tx.value < 0 ? "status-critical" : "status-ok"}
                      >
                        {numberWithCommas(tx.value)}
                      </Text>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {new Date(tx.date * 1000).toDateString()}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Box>
    );
  }
}

export default BillsTable;

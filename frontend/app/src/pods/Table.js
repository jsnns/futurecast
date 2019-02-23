import React, { Component } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { getStats } from "../api"

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class StatsTables extends Component {
  constructor(props) {
    super(props)
    this.state = { data: [] };
  }
  componentWillMount() {
    const { report } = this.props
    getStats(report)
      .then(data => {
        this.setState({ data });
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    const { data } = this.state;
    return (
      <div className="table">
        <h2>Stats</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Stat</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(data).map(d => (
              <TableRow key={d}>
                <TableCell component="th" scope="row">
                  {d}
                </TableCell>
                  <TableCell align="right" style={{fontFamily: "monospace", fontSize: 16}}>${numberWithCommas(data[d])}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default StatsTables;